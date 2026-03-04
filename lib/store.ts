import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import testReducer from "./features/test/testSlice"
import userProgressReducer from "./features/userProgress/userProgressSlice"
import socialReducer from "./features/social/socialSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    userProgress: userProgressReducer,
    social: socialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
