import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  standalone: true,
  imports: [MatButtonModule, RouterModule]
})
export class MovieDetailComponent implements OnInit {
  movie: AllMovie | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id !== null) {
      this.moviesService.getMovieById(id).subscribe({
        next: (data) => {
          this.movie = data;
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
