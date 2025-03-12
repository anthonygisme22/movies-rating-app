import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService, TMDbMovieDetail } from '../../services/movie-details.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserRatingComponent } from '../user-rating/user-rating.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, UserRatingComponent]
})
export class MovieDetailComponent implements OnInit {
  movie: TMDbMovieDetail | null = null;
  errorMessage: string | null = null;
  posterUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id !== null) {
      this.movieDetailsService.getMovieDetails(id).subscribe({
        next: (data) => {
          this.movie = data;
          if (data.poster_path) {
            this.posterUrl = this.movieDetailsService.getImageUrl(data.poster_path);
          }
        },
        error: (err) => {
          console.error('Error fetching movie detail:', err);
          this.errorMessage = 'Movie not found.';
        }
      });
    } else {
      this.errorMessage = 'Invalid movie ID.';
    }
  }
}
