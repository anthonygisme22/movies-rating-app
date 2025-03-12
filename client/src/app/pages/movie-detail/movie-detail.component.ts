import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { MovieDetailsService, TMDbMovieDetail } from '../../services/movie-details.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserRatingComponent } from '../user-rating/user-rating.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SimilarMoviesComponent } from './similar-movies/similar-movies.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    UserRatingComponent,
    LoadingSpinnerComponent,
    MatDialogModule,
    SimilarMoviesComponent
  ]
})
export class MovieDetailComponent implements OnInit {
  internalMovie: AllMovie | null = null;
  movie: TMDbMovieDetail | null = null;
  errorMessage: string | null = null;
  posterUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private movieDetailsService: MovieDetailsService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id !== null) {
      this.moviesService.getMovieById(id).subscribe({
        next: (internalData) => {
          this.internalMovie = internalData;
          this.movieDetailsService.getMovieDetailsByTitle(internalData.title, internalData.year).subscribe({
            next: (externalData) => {
              this.movie = externalData;
              if (externalData.poster_path) {
                this.posterUrl = this.movieDetailsService.getImageUrl(externalData.poster_path);
              }
            },
            error: (err) => {
              console.error('Error fetching external movie detail:', err);
              this.errorMessage = 'Error fetching external movie details.';
            }
          });
        },
        error: (err) => {
          console.error('Error fetching internal movie detail:', err);
          this.errorMessage = 'Internal movie not found.';
        }
      });
    } else {
      this.errorMessage = 'Invalid movie ID.';
    }
  }
}
