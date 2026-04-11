import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav class="navbar navbar-dark bg-dark px-3">

    <a class="navbar-brand text-white">StayEase</a>

    <div>
      <a routerLink="/rooms" class="btn btn-outline-light me-2">
        Rooms
      </a>

      <a routerLink="/booking" class="btn btn-outline-light me-2">
        Booking
      </a>

      <button class="btn btn-light" (click)="toggleTheme()">
        {{ themeService.isDark() ? '☀️' : '🌙' }}
      </button>
    </div>

  </nav>
  `
})
export class NavbarComponent implements OnInit {

  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit() {
    this.themeService.loadTheme();
  }
}