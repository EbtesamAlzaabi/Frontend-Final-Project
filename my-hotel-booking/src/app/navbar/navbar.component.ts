import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        🌙
      </button>
    </div>

  </nav>
  `
})
export class NavbarComponent {

  toggleTheme() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }
}