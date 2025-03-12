import { Component, OnInit } from '@angular/core';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule]
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: AllMovie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    // Retrieve favorite movie IDs from localStorage
    const favIdsStr = localStorage.getItem('favoriteMovies');
    let favIds: number[] = [];
    if (favIdsStr) {
      try {
        favIds = JSON.parse(favIdsStr);
      } catch (e) {
        console.error("Error parsing favoriteMovies:", e);
      }
    }
    // Load all movies and filter to only include favorite ones
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.favoriteMovies = data.filter(movie => favIds.includes(movie.movieId));
      },
      error: (err) => {
        console.error("Error fetching movies:", err);
      }
    });
  }
}
