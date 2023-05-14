import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllModulesSummary } from 'services/modules';

import { Module } from 'types/module';

export const fetchAllModules = createAsyncThunk(
  'modules/fetchAlModules',
  async () => getAllModulesSummary(),
);

export interface ModulesState {
  modules: Module[] | [];
}

const initialState: ModulesState = {
  modules: [],
};

export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state: ModulesState, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllModules.fulfilled, (state, action) => {
      state.modules = action.payload;
    });
  },
});

export const { setModules } = modulesSlice.actions;

export default modulesSlice.reducer;
