import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from '../room-card/room-card.component';
import { RoomsService } from '../rooms.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, FormsModule],
  templateUrl: './rooms-list.component.html'
})
export class RoomsListComponent implements OnInit {

  rooms: any[] = [];
  showAvailableOnly = false;

  constructor(
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rooms = this.roomsService.getRooms();
  }

  toggleAvailable() {
    if (this.showAvailableOnly) {
      this.rooms = this.roomsService.getRooms().filter(r => r.available);
    } else {
      this.rooms = this.roomsService.getRooms();
    }
  }

  onSelectRoom(room: any) {
    localStorage.setItem('bookedRoom', JSON.stringify(room));
    this.router.navigate(['/booking']);
  }
}