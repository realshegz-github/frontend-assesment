import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPeople,
  getStarships,
  getFilms,
  getSpecies,
  getPersonById,
  getStarshipById,
  getFilmById,
  getSpeciesById,
} from "./xhr";

export const fetchPeople = createAsyncThunk(
  "data/fetchPeople",
  async (_, { rejectWithValue }) => {
    try {
      return await getPeople();
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchStarships = createAsyncThunk(
  "data/fetchStarships",
  async (_, { rejectWithValue }) => {
    try {
      return await getStarships();
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchFilms = createAsyncThunk(
  "data/fetchFilms",
  async (_, { rejectWithValue }) => {
    try {
      return await getFilms();
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "data/fetchSpecies",
  async (_, { rejectWithValue }) => {
    try {
      return await getSpecies();
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchPersonById = createAsyncThunk(
  "data/fetchPersonById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getPersonById(id);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchStarshipById = createAsyncThunk(
  "data/fetchStarshipById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getStarshipById(id);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchFilmById = createAsyncThunk(
  "data/fetchFilmById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getFilmById(id);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchSpeciesById = createAsyncThunk(
  "data/fetchSpeciesById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getSpeciesById(id);
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
