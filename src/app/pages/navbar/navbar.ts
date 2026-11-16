import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  date: any;
  shortDay: any;
  firstLetter: string = '';
  isWeekend: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.today();
  }

  today() {
    this.date = new Date();
    this.shortDay = this.date.toLocaleDateString('en-US', { weekday: 'long' });
    this.firstLetter = this.shortDay.charAt(0);
    const day = this.date.getDay();
    this.isWeekend = day === 0 || day === 6;

    console.log(`Today ${this.shortDay}`);
  }
}
