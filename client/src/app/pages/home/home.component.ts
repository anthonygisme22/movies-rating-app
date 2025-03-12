import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';
import { MoviesService, AllMovie } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  // Control for the hero search/suggestion input
  suggestionControl = new FormControl('');
  // Dummy suggestions returned by the "AI" (simulate an API call)
  suggestions: string[] = [];
  // Array for featured movies loaded from your API
  featuredMovies: AllMovie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    // Load featured movies (for example, first 5 movies)
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.featuredMovies = data.slice(0, 5);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  // Simulated function to "fetch" suggestions from an AI service
  getSuggestions(): void {
    const prompt = this.suggestionControl.value;
    if (prompt && prompt.trim() !== '') {
      console.log('Fetching suggestions for:', prompt);
      // Replace the below dummy data with an actual API call to OpenAI in the future
      this.suggestions = [
        'The Shawshank Redemption',
        'Inception',
        'Interstellar',
        'The Matrix',
        'The Godfather'
      ];
    } else {
      this.suggestions = [];
    }
  }
}
