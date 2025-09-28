/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  People,
  ApiResponse,
  Starship,
  Film,
  Species,
} from "../types/common.types";
import api from "./axios";

export const getPeople = async (): Promise<People[]> => {
  const response = await api.get<any, ApiResponse<People>>("people/");
  return response.results;
};

export const getStarships = async (): Promise<Starship[]> => {
  const response = await api.get<any, ApiResponse<Starship>>("starships/");
  return response.results;
};

export const getFilms = async (): Promise<Film[]> => {
  const response = await api.get<any, ApiResponse<Film>>("films/");
  return response.results;
};

export const getSpecies = async (): Promise<Species[]> => {
  const response = await api.get<any, ApiResponse<Species>>("species/");
  return response.results;
};

export const getPersonById = async (id: string): Promise<People> => {
  return api.get<any, People>(`people/${id}/`);
};

export const getStarshipById = async (id: string): Promise<Starship> => {
  return api.get<any, Starship>(`starships/${id}/`);
};

export const getFilmById = async (id: string): Promise<Film> => {
  return api.get<any, Film>(`films/${id}/`);
};

export const getSpeciesById = async (id: string): Promise<Species> => {
  return api.get<any, Species>(`species/${id}/`);
};
