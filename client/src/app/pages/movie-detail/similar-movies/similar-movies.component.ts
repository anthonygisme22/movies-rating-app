import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsService, TMDbMovieDetail } from '../../../services/movie-details.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule]
})
export class SimilarMoviesComponent implements OnInit {
  @Input() movieId!: number;  // movieId must be provided
  similarMovies: TMDbMovieDetail[] = [];
  errorMessage: string | null = null;

  constructor(private movieDetailsService: MovieDetailsService) { }

  ngOnInit(): void {
    this.movieDetailsService.getSimilarMovies(this.movieId).subscribe({
      next: (data) => {
        if (data.results && data.results.length > 0) {
          this.similarMovies = data.results;
        } else {
          this.errorMessage = 'No similar movies found.';
        }
      },
      error: (err) => {
        console.error('Error fetching similar movies:', err);
        this.errorMessage = 'Error fetching similar movies.';
      }
    });
  }
}
