import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  childAge?: string
  subscriptionType: "free" | "premium"
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
}

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email: credentials.email,
        firstName: "John",
        lastName: "Doe",
        childAge: "10",
        subscriptionType: "premium",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      return { user: mockUser, token: mockToken }
    } catch (error) {
      return rejectWithValue("Login failed. Please check your credentials.")
    }
  },
)

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    userData: {
      firstName: string
      lastName: string
      email: string
      password: string
      childAge: string
    },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        childAge: userData.childAge,
        subscriptionType: "free",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      return { user: mockUser, token: mockToken }
    } catch (error) {
      return rejectWithValue("Signup failed. Please try again.")
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return true
  } catch (error) {
    return rejectWithValue("Logout failed")
  }
})

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    // Simulate token refresh
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newToken = "refreshed-jwt-token-" + Date.now()
    return newToken
  } catch (error) {
    return rejectWithValue("Token refresh failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Refresh token cases
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  },
})

export const { clearError, updateUser, setAuthenticated } = authSlice.actions
export default authSlice.reducer
