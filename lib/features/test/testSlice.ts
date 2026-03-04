import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Question {
  id: number
  question: string
  type: "multiple-choice" | "true-false" | "fill-blank"
  options: string[]
  correctAnswer: string
  explanation: string
  topic: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface Test {
  id: string
  title: string
  subject: string
  questions: Question[]
  timeLimit: number
  difficulty: string
  description: string
}

export interface TestSession {
  testId: string
  startTime: number
  endTime?: number
  answers: Record<number, string>
  currentQuestion: number
  isCompleted: boolean
  score?: number
  timeSpent?: number
}

interface TestState {
  availableTests: Test[]
  currentTest: Test | null
  currentSession: TestSession | null
  testHistory: TestSession[]
  isLoading: boolean
  error: string | null
}

const initialState: TestState = {
  availableTests: [],
  currentTest: null,
  currentSession: null,
  testHistory: [],
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchTests = createAsyncThunk("test/fetchTests", async (subject?: string, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock test data
    const mockTests: Test[] = [
      {
        id: "1",
        title: "Mathematics Foundation Test",
        subject: "Mathematics",
        timeLimit: 45,
        difficulty: "Beginner",
        description: "Perfect for students starting their 11+ mathematics journey",
        questions: [
          {
            id: 1,
            question: "What is 15% of 240?",
            type: "multiple-choice",
            options: ["24", "36", "40", "48"],
            correctAnswer: "36",
            explanation: "To find 15% of 240: (15/100) × 240 = 0.15 × 240 = 36",
            topic: "Percentages",
            difficulty: "beginner",
          },
          // Add more questions...
        ],
      },
      // Add more tests...
    ]

    return subject ? mockTests.filter((test) => test.subject.toLowerCase().includes(subject.toLowerCase())) : mockTests
  } catch (error) {
    return rejectWithValue("Failed to fetch tests")
  }
})

export const startTest = createAsyncThunk("test/startTest", async (testId: string, { rejectWithValue }) => {
  try {
    // Simulate API call to get test details
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock test data - in real app, fetch from API
    const mockTest: Test = {
      id: testId,
      title: "Mathematics Foundation Test",
      subject: "Mathematics",
      timeLimit: 45,
      difficulty: "Beginner",
      description: "Perfect for students starting their 11+ mathematics journey",
      questions: [
        {
          id: 1,
          question: "What is 15% of 240?",
          type: "multiple-choice",
          options: ["24", "36", "40", "48"],
          correctAnswer: "36",
          explanation: "To find 15% of 240: (15/100) × 240 = 0.15 × 240 = 36",
          topic: "Percentages",
          difficulty: "beginner",
        },
        {
          id: 2,
          question: "If a train travels 180 miles in 3 hours, what is its average speed?",
          type: "multiple-choice",
          options: ["50 mph", "60 mph", "70 mph", "80 mph"],
          correctAnswer: "60 mph",
          explanation: "Speed = Distance ÷ Time = 180 ÷ 3 = 60 mph",
          topic: "Speed, Distance, Time",
          difficulty: "beginner",
        },
      ],
    }

    return mockTest
  } catch (error) {
    return rejectWithValue("Failed to start test")
  }
})

export const submitTest = createAsyncThunk("test/submitTest", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { test: TestState }
    const session = state.test.currentSession
    const test = state.test.currentTest

    if (!session || !test) {
      throw new Error("No active test session")
    }

    // Calculate score
    let correctAnswers = 0
    test.questions.forEach((question) => {
      if (session.answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / test.questions.length) * 100)
    const timeSpent = Date.now() - session.startTime

    // Simulate API call to save results
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { score, timeSpent }
  } catch (error) {
    return rejectWithValue("Failed to submit test")
  }
})

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    createTestSession: (state, action: PayloadAction<string>) => {
      state.currentSession = {
        testId: action.payload,
        startTime: Date.now(),
        answers: {},
        currentQuestion: 0,
        isCompleted: false,
      }
    },
    updateAnswer: (state, action: PayloadAction<{ questionId: number; answer: string }>) => {
      if (state.currentSession) {
        state.currentSession.answers[action.payload.questionId] = action.payload.answer
      }
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      if (state.currentSession) {
        state.currentSession.currentQuestion = action.payload
      }
    },
    completeTest: (state, action: PayloadAction<{ score: number; timeSpent: number }>) => {
      if (state.currentSession) {
        state.currentSession.isCompleted = true
        state.currentSession.endTime = Date.now()
        state.currentSession.score = action.payload.score
        state.currentSession.timeSpent = action.payload.timeSpent

        // Add to history
        state.testHistory.push({ ...state.currentSession })
      }
    },
    clearCurrentTest: (state) => {
      state.currentTest = null
      state.currentSession = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tests cases
      .addCase(fetchTests.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.isLoading = false
        state.availableTests = action.payload
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Start test cases
      .addCase(startTest.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(startTest.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTest = action.payload
      })
      .addCase(startTest.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Submit test cases
      .addCase(submitTest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.currentSession) {
          state.currentSession.isCompleted = true
          state.currentSession.endTime = Date.now()
          state.currentSession.score = action.payload.score
          state.currentSession.timeSpent = action.payload.timeSpent

          // Add to history
          state.testHistory.push({ ...state.currentSession })
        }
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { createTestSession, updateAnswer, setCurrentQuestion, completeTest, clearCurrentTest, clearError } =
  testSlice.actions

export default testSlice.reducer
