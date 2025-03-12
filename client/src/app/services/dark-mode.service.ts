import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly darkModeKey = 'darkMode';

  constructor() {
    const isDark = localStorage.getItem(this.darkModeKey) === 'true';
    this.setDarkMode(isDark);
  }

  toggleDarkMode(): void {
    const isDark = document.body.classList.contains('dark-mode');
    this.setDarkMode(!isDark);
  }

  setDarkMode(enabled: boolean): void {
    if (enabled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem(this.darkModeKey, 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem(this.darkModeKey, 'false');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-mode');
  }
}
