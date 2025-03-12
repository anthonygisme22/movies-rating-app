import { Component, OnInit } from '@angular/core';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule
  ]
})
export class MoviesListComponent implements OnInit {
  movies: AllMovie[] = [];
  filteredMovies: AllMovie[] = [];
  filterForm!: FormGroup;

  constructor(private moviesService: MoviesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the filtering form
    this.filterForm = this.fb.group({
      minRating: [''],
      maxRating: [''],
      year: [''],
      sortBy: ['']
    });

    // Load all movies
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
      },
      error: (err) => console.error('Error fetching movies:', err)
    });

    // Subscribe to changes in the filter form to update filteredMovies
    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { minRating, maxRating, year, sortBy } = this.filterForm.value;
    let result = [...this.movies];

    // Filter by rating
    if (minRating) {
      result = result.filter(movie => movie.rating >= parseFloat(minRating));
    }
    if (maxRating) {
      result = result.filter(movie => movie.rating <= parseFloat(maxRating));
    }
    // Filter by year
    if (year) {
      result = result.filter(movie => movie.year === parseInt(year, 10));
    }
    // Sorting
    if (sortBy === 'rating_desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating_asc') {
      result.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'year_desc') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'year_asc') {
      result.sort((a, b) => a.year - b.year);
    }

    this.filteredMovies = result;
  }
}
