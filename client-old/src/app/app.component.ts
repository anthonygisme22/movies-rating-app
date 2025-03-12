import { Component, OnInit } from '@angular/core';
import { MoviesService, AllMovie } from './services/movies.service';

@Component({
  selector: 'app-root',
  // ❌ No "standalone: true" here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // optional
})
export class AppComponent implements OnInit {
  title = 'My Angular Movies App';
  movies: AllMovie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    // Example call to fetch all movies
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }
}
