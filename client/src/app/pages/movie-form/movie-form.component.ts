import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode: boolean = false;
  movieId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      year: [null, Validators.required],  // New field for release year
      rating: [null, [Validators.required, Validators.min(0)]],
      bakedScale: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.movieId = +idParam;
      this.moviesService.getMovieById(this.movieId).subscribe({
        next: (data) => {
          this.movieForm.patchValue({
            title: data.title,
            year: data.year,          // Patch the year field
            rating: data.rating,
            bakedScale: data.bakedScale
          });
        },
        error: (err) => {
          console.error('Error fetching movie details:', err);
          this.errorMessage = 'Error fetching movie details.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      return;
    }
    const movieData: AllMovie = {
      movieId: this.movieId ? this.movieId : 0,
      title: this.movieForm.value.title,
      year: this.movieForm.value.year,       // Include the year property
      rating: this.movieForm.value.rating,
      bakedScale: this.movieForm.value.bakedScale
    };

    if (this.isEditMode && this.movieId) {
      this.moviesService.updateMovie(this.movieId, movieData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error updating movie:', err);
          this.errorMessage = 'Error updating movie.';
        }
      });
    } else {
      this.moviesService.createMovie(movieData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error creating movie:', err);
          this.errorMessage = 'Error creating movie.';
        }
      });
    }
  }
}
