import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';
import { UserRatingComponent } from './pages/user-rating/user-rating.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'reviews', component: UserRatingComponent },
  { path: 'search', component: MovieSearchComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
