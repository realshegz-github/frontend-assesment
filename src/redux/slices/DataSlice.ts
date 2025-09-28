import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilms,
  fetchPeople,
  fetchSpecies,
  fetchStarships,
  fetchPersonById,
  fetchStarshipById,
  fetchFilmById,
  fetchSpeciesById,
} from "../../api/xhrHelpers";
import type { People, Starship, Film, Species } from "../../types/common.types";

interface DataState {
  people: People[];
  starships: Starship[];
  films: Film[];
  species: Species[];
  selectedPerson?: People | null;
  selectedStarship?: Starship | null;
  selectedFilm?: Film | null;
  selectedSpecies?: Species | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  people: [],
  starships: [],
  films: [],
  species: [],
  selectedPerson: null,
  selectedStarship: null,
  selectedFilm: null,
  selectedSpecies: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedPerson = null;
      state.selectedStarship = null;
      state.selectedFilm = null;
      state.selectedSpecies = null;
    },
  },
  extraReducers: (builder) => {
    // === LISTS ===
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch people";
      })

      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.loading = false;
        state.starships = action.payload;
      })

      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload;
      })

      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.species = action.payload;
      });

    // === DETAILS ===
    builder
      .addCase(fetchPersonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPerson = action.payload;
      })
      .addCase(fetchStarshipById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStarship = action.payload;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFilm = action.payload;
      })
      .addCase(fetchSpeciesById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSpecies = action.payload;
      });
  },
});

export const { clearSelected } = dataSlice.actions;
export default dataSlice.reducer;
