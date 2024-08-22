interface RatingsProps {
  Source: string;
  Value: string;
}

export interface FilmPreviewProps {
  data: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Language: string;
    Awards: 'N/A',
    Poster: string;
    Ratings: RatingsProps[];
    imdbRating: string;
    imdbID: string;
  };
}
