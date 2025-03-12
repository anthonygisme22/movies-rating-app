import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MovieSearchComponent implements OnInit {
  query: string = '';
  allMovies: AllMovie[] = [];
  filteredMovies: AllMovie[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    // Subscribe to query parameter changes
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q') || '';
      this.filterMovies();
    });

    // Load all movies once
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.allMovies = data;
        this.filterMovies();
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  filterMovies(): void {
    if (!this.query) {
      this.filteredMovies = this.allMovies;
    } else {
      const lowerQuery = this.query.toLowerCase();
      this.filteredMovies = this.allMovies.filter(movie =>
        movie.title.toLowerCase().includes(lowerQuery)
      );
    }
  }
}
