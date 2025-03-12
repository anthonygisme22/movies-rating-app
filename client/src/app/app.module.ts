import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Import the standalone AppComponent
import { AppComponent } from './app.component';

// Import other standalone components
import { HomeComponent } from './pages/home/home.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { UserRatingComponent } from './pages/user-rating/user-rating.component';
import { FavoriteMoviesComponent } from './pages/favorite-movies/favorite-movies.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  // No declarations, because all are standalone.
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Import all standalone components
    AppComponent,
    HomeComponent,
    MoviesListComponent,
    MovieDetailComponent,
    MovieFormComponent,
    MovieSearchComponent,
    UserRatingComponent,
    FavoriteMoviesComponent,
    NavigationComponent,
    FooterComponent
  ],
  providers: [],
  // Bootstrap the standalone AppComponent
  bootstrap: [AppComponent]
})
export class AppModule { }
