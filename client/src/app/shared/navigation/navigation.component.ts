import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { AuthenticationService, User } from '../../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ]
})
export class NavigationComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  searchControl = new FormControl('');
  currentUser$: Observable<User | null>;

  constructor(
    public darkModeService: DarkModeService,
    private authService: AuthenticationService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  logout(): void {
    this.authService.logout();
  }
}
