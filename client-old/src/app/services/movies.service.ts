import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Represents a single movie record from the AllMovies table.
 * Adjust property names/types as needed to match your .NET model.
 */
export interface AllMovie {
  movieId: number;
  title: string;
  rating: number;
  bakedScale: number;
  // Add or remove properties to match your API's AllMovie model
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // This forms the base URL, e.g. http://localhost:5000/api/allmovies
  private readonly apiUrl: string = `${environment.apiUrl}/allmovies`;

  constructor(private http: HttpClient) { }

  /**
   * GET all movies from the API.
   */
  getAllMovies(): Observable<AllMovie[]> {
    return this.http.get<AllMovie[]>(this.apiUrl);
  }

  /**
   * GET a single movie by its ID.
   */
  getMovieById(id: number): Observable<AllMovie> {
    return this.http.get<AllMovie>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST a new movie to the API.
   */
  createMovie(movie: AllMovie): Observable<AllMovie> {
    return this.http.post<AllMovie>(this.apiUrl, movie);
  }

  /**
   * PUT (update) an existing movie by its ID.
   */
  updateMovie(id: number, movie: AllMovie): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, movie);
  }

  /**
   * DELETE a movie by its ID.
   */
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
