import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent {

  name: string = '';
  bookedRoom: any;
  bookingSuccess: boolean = false;
  constructor(private location: Location) { }

  ngOnInit() {
    this.bookedRoom = JSON.parse(localStorage.getItem('bookedRoom') || 'null');
  }

  goBack() {
    this.location.back();
  }
  confirmBooking() {
    this.bookingSuccess = true;

    alert("Booking Confirmed ✅");
  }
}