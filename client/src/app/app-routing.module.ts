import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { UserRatingComponent } from './pages/user-rating/user-rating.component';
import { FavoriteMoviesComponent } from './pages/favorite-movies/favorite-movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },          // Home is default
  { path: 'movies', component: MoviesListComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'search', component: MovieSearchComponent },
  { path: 'reviews', component: UserRatingComponent },
  { path: 'favorites', component: FavoriteMoviesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
