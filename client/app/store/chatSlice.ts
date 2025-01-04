import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSession } from "../types/chat";

interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSessions: (state, action: PayloadAction<ChatSession[]>) => {
      state.sessions = action.payload;
    },
    setCurrentSession: (state, action: PayloadAction<ChatSession>) => {
      state.currentSession = action.payload;
    },
    addSession: (state, action: PayloadAction<ChatSession>) => {
      state.sessions = [...state.sessions, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSessions,
  setCurrentSession,
  addSession,
  setLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
