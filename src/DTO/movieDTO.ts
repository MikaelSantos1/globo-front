export interface MovieDTO {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  genre_id: string;
  genre: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  movieCast: any[];
}
