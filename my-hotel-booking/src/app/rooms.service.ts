import { Injectable } from '@angular/core';
import { Room } from './models/room';

@Injectable({ providedIn: 'root' })
export class RoomsService {

  rooms: Room[] = [
  { id: 1, name: 'Single Room', type: 'Single', price: 50, available: true, rating: 4 },
  { id: 2, name: 'Double Room', type: 'Double', price: 80, available: false, rating: 3 },
  { id: 3, name: 'Suite Room', type: 'Suite', price: 150, available: true, rating: 5 },
  { id: 4, name: 'Economy Single', type: 'Single', price: 40, available: true, rating: 3.5 },
  { id: 5, name: 'Family Double', type: 'Double', price: 110, available: true, rating: 4.2 },
  { id: 6, name: 'Luxury Suite', type: 'Suite', price: 220, available: false, rating: 4.8 }
];
  getRooms() {
    return this.rooms;
  }

  getAvailableRooms() {
    return this.rooms.filter(r => r.available);
  }
}