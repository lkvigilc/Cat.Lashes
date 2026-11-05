import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Navbar } from './navbar.component';
import { Hero } from './hero.component';
import { Services } from './services.component';
import { About } from './about.component';
import { Booking } from './booking.component';
import { Footer } from './footer.component';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Services, About, Booking, Footer],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-about />
      <app-booking />
    </main>
    <app-footer />
  `,
})
export class App {}

bootstrapApplication(App);
