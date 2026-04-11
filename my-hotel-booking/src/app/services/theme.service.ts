import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private key = 'theme';

  loadTheme() {
    if (localStorage.getItem(this.key) === 'dark') {
      document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem(this.key, 'dark');
    } else {
      localStorage.removeItem(this.key);
    }
  }

  isDark(): boolean {
    return document.body.classList.contains('dark');
  }
}