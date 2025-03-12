import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Import standalone components:
import { NavigationComponent } from './shared/navigation/navigation.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';
import { UserRatingComponent } from './pages/user-rating/user-rating.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';

@NgModule({
  declarations: [
    AppComponent
    // Do NOT declare standalone components here.
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Import standalone components:
    NavigationComponent,
    MoviesListComponent,
    MovieDetailComponent,
    MovieFormComponent,
    UserRatingComponent,
    MovieSearchComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
