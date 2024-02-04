import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { type UserState } from '@/interfaces/user_state.interface';
import { type User } from '@/models/User.interface';
import { type RootState } from '../store';
import AuthService from '@/services/AuthService';
import { responseIsOk } from '@/helpers/request';

const initialState: UserState = {
  user: null,
  token: null
};

export const postTokenThunk = createAsyncThunk(
  'user/setToken',
  async (token: string, thunkApi) => {
    const authService: AuthService = new AuthService();
    const response = await authService.setCookieToken(token);
    const success = responseIsOk(response.success, response.data);
    if (!success) return null;
    return token;
  }
);

export const clearTokenThunk = createAsyncThunk(
  'user/clearToken',
  async (data, thunkApi) => {
    const authService: AuthService = new AuthService();
    const response = await authService.deleteCookieToken();
    if (response.success ?? false) return null;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | null>) => {
      if (action.payload === null) state.user = null;
      else {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    },
    setToken: (state: UserState, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(postTokenThunk.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload !== undefined) {
        state.token = action.payload;
      }
    });
    builder.addCase(clearTokenThunk.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.token = action.payload;
      }
    });
  }
});

export const { setUser, setToken } = userSlice.actions;

export const selectUser = (state: RootState): User | null => state.user.user;
export const selectToken = (state: RootState): string | null =>
  state.user.token;

export default userSlice.reducer;
