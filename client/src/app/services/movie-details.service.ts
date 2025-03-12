import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TMDbMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // Additional fields as needed...
}

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private apiKey: string = environment.tmdbApiKey;
  private baseUrl: string = environment.tmdbBaseUrl;
  private imageBaseUrl: string = environment.tmdbImageBaseUrl;

  constructor(private http: HttpClient) { }

  // Fetch detailed movie info using TMDb movie ID
  getMovieDetails(movieId: number): Observable<TMDbMovieDetail> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<TMDbMovieDetail>(url);
  }

  // Search for a movie by title, optionally filtering by primary release year
  getMovieDetailsByTitle(title: string, year?: number): Observable<TMDbMovieDetail> {
    let searchUrl = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&language=en-US`;
    if (year) {
      searchUrl += `&primary_release_year=${year}`;
    }
    return this.http.get<any>(searchUrl).pipe(
      switchMap(result => {
        if (result.results && result.results.length > 0) {
          const tmdbId = result.results[0].id;
          return this.getMovieDetails(tmdbId);
        } else {
          return throwError(() => new Error('No movie found with that title'));
        }
      })
    );
  }

  // Construct full URL for poster image
  getImageUrl(posterPath: string): string {
    return `${this.imageBaseUrl}${posterPath}`;
  }
}
