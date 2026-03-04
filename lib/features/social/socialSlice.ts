import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface ShareData {
  platform: string
  content: string
  url: string
  timestamp: number
  success: boolean
}

export interface ReferralData {
  code: string
  url: string
  clicks: number
  conversions: number
  rewards: number
}

interface SocialState {
  shareHistory: ShareData[]
  referralData: ReferralData | null
  isSharing: boolean
  error: string | null
}

const initialState: SocialState = {
  shareHistory: [],
  referralData: null,
  isSharing: false,
  error: null,
}

// Async thunks
export const trackShare = createAsyncThunk(
  "social/trackShare",
  async (shareData: Omit<ShareData, "timestamp" | "success">, { rejectWithValue }) => {
    try {
      // Simulate API call to track share
      await new Promise((resolve) => setTimeout(resolve, 300))

      return {
        ...shareData,
        timestamp: Date.now(),
        success: true,
      }
    } catch (error) {
      return rejectWithValue("Failed to track share")
    }
  },
)

export const fetchReferralData = createAsyncThunk(
  "social/fetchReferralData",
  async (userId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock referral data
      const mockReferralData: ReferralData = {
        code: "STUDY2024",
        url: `https://11plusdiy.com/signup?ref=${userId}`,
        clicks: 15,
        conversions: 3,
        rewards: 90, // 3 months free
      }

      return mockReferralData
    } catch (error) {
      return rejectWithValue("Failed to fetch referral data")
    }
  },
)

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    addShare: (state, action: PayloadAction<ShareData>) => {
      state.shareHistory.unshift(action.payload)
      // Keep only last 50 shares
      if (state.shareHistory.length > 50) {
        state.shareHistory = state.shareHistory.slice(0, 50)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Track share cases
      .addCase(trackShare.pending, (state) => {
        state.isSharing = true
        state.error = null
      })
      .addCase(trackShare.fulfilled, (state, action) => {
        state.isSharing = false
        state.shareHistory.unshift(action.payload)
        // Keep only last 50 shares
        if (state.shareHistory.length > 50) {
          state.shareHistory = state.shareHistory.slice(0, 50)
        }
      })
      .addCase(trackShare.rejected, (state, action) => {
        state.isSharing = false
        state.error = action.payload as string
      })
      // Fetch referral data cases
      .addCase(fetchReferralData.fulfilled, (state, action) => {
        state.referralData = action.payload
      })
      .addCase(fetchReferralData.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearError, addShare } = socialSlice.actions
export default socialSlice.reducer
