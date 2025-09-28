// A generic interface for the paginated response from SWAPI
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface People {
  name: string;
  height: string;
  created: string;
  hair_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  starship_class: string;
  passengers: string;
  length: string;
  url: string;
}

export interface Film {
  title: string;
  release_date: string;
  director: string;
  producer: string;
  episode_id: number;
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  created: string;
  eye_colors: string;
  hair_colors: string;
  average_height: string;
  url: string;
}
