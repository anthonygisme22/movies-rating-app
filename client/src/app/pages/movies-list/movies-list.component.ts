import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MoviesService, AllMovie } from '../../services/movies.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';

// Angular Material modules used in the template
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule
  ]
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  movies: AllMovie[] = [];
  filteredMovies: AllMovie[] = [];
  selectedSort: string = '';
  dataSource = new MatTableDataSource<AllMovie>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadMovies(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = [...data];
        this.dataSource.data = this.filteredMovies;
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
    this.dataSource.data = this.filteredMovies;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
