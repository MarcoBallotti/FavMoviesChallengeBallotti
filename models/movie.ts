export class Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id!: number;
  original_language?: string;
  original_title?: string;
  overview!: string;
  popularity?: number;
  poster_path?: string;
  release_date?: number;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  genres: any[] = [];
  production_companies: any[] = [];
  spoken_languages: any[] = [];
  runtime: string = '';
  status: string = '';
  budget: number = 0;
}

// for images follow this:
//https://image.tmdb.org/t/p/w500/backdrop_path
