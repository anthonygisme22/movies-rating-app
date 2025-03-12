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
  searchControl = new FormControl('');
  featuredMovies: AllMovie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    // Load some featured movies
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.featuredMovies = data.slice(0, 5);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(query => {
      console.log('Search query:', query);
      // You can navigate to a search page or filter locally
    });
  }
}
