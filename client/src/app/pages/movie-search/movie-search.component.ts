import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { debounceTime } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material modules for search UI
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule
  ]
})
export class MovieSearchComponent implements OnInit {
  searchControl = new FormControl('');
  movies: AllMovie[] = [];
  filteredMovies: AllMovie[] = [];
  errorMessage: string | null = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching movies';
      }
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.filterMovies(query ?? '');
    });
  }

  filterMovies(query: string): void {
    if (!query) {
      this.filteredMovies = this.movies;
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(lowerQuery)
      );
    }
  }
}
