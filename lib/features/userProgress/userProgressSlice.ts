import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getApiUrl } from "@/lib/api-config"

export interface SubjectProgress {
  subject: string
  totalTests: number
  completedTests: number
  averageScore: number
  bestScore: number
  timeSpent: number // in minutes
  weakTopics: string[]
  strongTopics: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: number
  category: "score" | "streak" | "time" | "completion"
}

export interface StudyStreak {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
}

interface UserProgressState {
  subjectProgress: SubjectProgress[]
  achievements: Achievement[]
  studyStreak: StudyStreak
  totalTestsCompleted: number
  totalTimeStudied: number // in minutes
  overallAverageScore: number
  isLoading: boolean
  error: string | null
}

const initialState: UserProgressState = {
  subjectProgress: [],
  achievements: [],
  studyStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: "",
  },
  totalTestsCompleted: 0,
  totalTimeStudied: 0,
  overallAverageScore: 0,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchUserProgress = createAsyncThunk(
  "userProgress/fetchUserProgress",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl(`/api/user-progress/${userId}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return rejectWithValue(data?.message || "Failed to fetch user progress")
      }

      return await res.json()
    } catch (error) {
      return rejectWithValue("Failed to fetch user progress")
    }
  },
)

export const updateProgress = createAsyncThunk(
  "userProgress/updateProgress",
  async (
    testResult: {
      subject: string
      score: number
      timeSpent: number
      topics: string[]
    },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return testResult
    } catch (error) {
      return rejectWithValue("Failed to update progress")
    }
  },
)

export const unlockAchievement = createAsyncThunk(
  "userProgress/unlockAchievement",
  async (achievement: Achievement, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      return achievement
    } catch (error) {
      return rejectWithValue("Failed to unlock achievement")
    }
  },
)

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    updateStudyStreak: (state) => {
      const today = new Date().toISOString().split("T")[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

      if (state.studyStreak.lastStudyDate === yesterday) {
        state.studyStreak.currentStreak += 1
      } else if (state.studyStreak.lastStudyDate !== today) {
        state.studyStreak.currentStreak = 1
      }

      if (state.studyStreak.currentStreak > state.studyStreak.longestStreak) {
        state.studyStreak.longestStreak = state.studyStreak.currentStreak
      }

      state.studyStreak.lastStudyDate = today
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch progress cases
      .addCase(fetchUserProgress.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.isLoading = false
        state.subjectProgress = action.payload.subjectProgress
        state.achievements = action.payload.achievements
        state.studyStreak = action.payload.studyStreak
        state.totalTestsCompleted = action.payload.totalTestsCompleted
        state.totalTimeStudied = action.payload.totalTimeStudied
        state.overallAverageScore = action.payload.overallAverageScore
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update progress cases
      .addCase(updateProgress.fulfilled, (state, action) => {
        const { subject, score, timeSpent } = action.payload

        // Update subject progress
        const subjectIndex = state.subjectProgress.findIndex((s) => s.subject === subject)
        if (subjectIndex !== -1) {
          const subjectProgress = state.subjectProgress[subjectIndex]
          subjectProgress.completedTests += 1
          subjectProgress.timeSpent += Math.round(timeSpent / 60000) // Convert to minutes

          // Recalculate average score
          const totalScore = subjectProgress.averageScore * (subjectProgress.completedTests - 1) + score
          subjectProgress.averageScore = Math.round(totalScore / subjectProgress.completedTests)

          // Update best score
          if (score > subjectProgress.bestScore) {
            subjectProgress.bestScore = score
          }
        }

        // Update overall stats
        state.totalTestsCompleted += 1
        state.totalTimeStudied += Math.round(timeSpent / 60000)

        // Recalculate overall average
        const totalScore = state.overallAverageScore * (state.totalTestsCompleted - 1) + score
        state.overallAverageScore = Math.round(totalScore / state.totalTestsCompleted)
      })
      // Unlock achievement cases
      .addCase(unlockAchievement.fulfilled, (state, action) => {
        state.achievements.push(action.payload)
      })
  },
})

export const { updateStudyStreak, clearError } = userProgressSlice.actions
export default userProgressSlice.reducer
