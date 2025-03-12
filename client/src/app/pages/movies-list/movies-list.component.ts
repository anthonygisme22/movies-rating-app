import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { RouterModule } from '@angular/router';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class MoviesListComponent implements OnInit {
  movies: AllMovie[] = [];
  filteredMovies: AllMovie[] = [];
  displayedMovies: AllMovie[] = [];
  selectedSort: string = '';
  itemsToShow: number = 6;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        // Create a copy for filtering and display only a subset
        this.filteredMovies = [...data];
        this.displayedMovies = this.filteredMovies.slice(0, this.itemsToShow);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  applyFilters(): void {
    if (this.selectedSort === 'rating_desc') {
      this.filteredMovies = [...this.movies].sort((a, b) => b.rating - a.rating);
    } else if (this.selectedSort === 'rating_asc') {
      this.filteredMovies = [...this.movies].sort((a, b) => a.rating - b.rating);
    } else {
      this.filteredMovies = [...this.movies];
    }
    // Reset the displayed movies based on the new filtered list
    this.displayedMovies = this.filteredMovies.slice(0, this.itemsToShow);
  }

  loadMore(): void {
    this.itemsToShow += 6;
    this.displayedMovies = this.filteredMovies.slice(0, this.itemsToShow);
  }
}
