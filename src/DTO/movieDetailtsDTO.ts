import { GenreDTO } from "./genreDTO";

export interface movieDetailsDTO {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  genre_id: string;
  genre: GenreDTO;
  movieCast: MovieCast[];
  rating: number | null;
}

export interface MovieCast {
  id: string;
  movie_id: string;
  person_id: string;
  person: Person;
}

export interface Person {
  id: string;
  name: string;
  type: string;
}
