import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatInputModule,
    MatFormFieldModule
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
            rating: data.rating,
            bakedScale: data.bakedScale
          });
        },
        error: (err) => {
          this.errorMessage = 'Error fetching movie details for editing.';
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
      rating: this.movieForm.value.rating,
      bakedScale: this.movieForm.value.bakedScale
    };

    if (this.isEditMode && this.movieId) {
      this.moviesService.updateMovie(this.movieId, movieData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.errorMessage = 'Error updating movie.';
        }
      });
    } else {
      this.moviesService.createMovie(movieData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.errorMessage = 'Error creating movie.';
        }
      });
    }
  }
}
