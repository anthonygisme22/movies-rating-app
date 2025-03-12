import { Component, OnInit } from '@angular/core';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatListModule]
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: AllMovie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    // Retrieve favorite movie IDs from localStorage (stored as an array of numbers)
    const favIdsStr = localStorage.getItem('favoriteMovies');
    let favIds: number[] = [];
    if (favIdsStr) {
      try {
        favIds = JSON.parse(favIdsStr);
      } catch (e) {
        console.error("Failed to parse favoriteMovies from localStorage", e);
      }
    }
    if (!favIds || favIds.length === 0) {
      this.favoriteMovies = [];
      return;
    }
    // Fetch all movies and filter to only those that are favorites
    this.moviesService.getAllMovies().subscribe({
      next: (movies) => {
        this.favoriteMovies = movies.filter(movie => favIds.includes(movie.movieId));
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  removeFavorite(movieId: number): void {
    const favIdsStr = localStorage.getItem('favoriteMovies');
    let favIds: number[] = [];
    if (favIdsStr) {
      try {
        favIds = JSON.parse(favIdsStr);
      } catch (e) {
        console.error("Failed to parse favoriteMovies from localStorage", e);
      }
    }
    favIds = favIds.filter(id => id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favIds));
    this.loadFavorites();
  }
}
