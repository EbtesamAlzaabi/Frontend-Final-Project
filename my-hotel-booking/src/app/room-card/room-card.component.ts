import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent {

  @Input() room!: Room;
  @Output() select = new EventEmitter<Room>();

  selectRoom() {
    this.select.emit(this.room);
  }
}