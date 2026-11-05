import { Component, signal, HostListener } from '@angular/core';
import { Logo } from './logo.component';

@Component({
  selector: 'app-navbar',
  imports: [Logo],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="scrolled()
        ? 'bg-cream-50/95 backdrop-blur-md shadow-sm py-2'
        : 'bg-transparent py-4'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#inicio" class="flex items-center gap-3 group">
          <app-logo [size]="scrolled() ? 40 : 46" />
          <span class="font-display text-xl sm:text-2xl tracking-wide text-coffee-500">
            Cat Lashes
          </span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <a href="#servicios" class="text-sm font-medium text-coffee-400 hover:text-terracota-300 transition-colors">Servicios</a>
          <a href="#nosotros" class="text-sm font-medium text-coffee-400 hover:text-terracota-300 transition-colors">Nosotros</a>
          <a href="#contacto" class="text-sm font-medium text-coffee-400 hover:text-terracota-300 transition-colors">Contacto</a>
          <a
            href="#agendar"
            class="px-5 py-2.5 rounded-full bg-terracota-300 text-white text-sm font-medium
                   hover:bg-terracota-400 transition-all shadow-md hover:shadow-lg
                   hover:-translate-y-0.5 active:translate-y-0"
          >
            Agendar cita
          </a>
        </div>

        <button
          class="md:hidden p-2 rounded-lg hover:bg-cream-100 transition-colors"
          (click)="mobileOpen.set(!mobileOpen())"
          aria-label="Menú"
        >
          <svg class="w-6 h-6 text-coffee-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            @if (!mobileOpen()) {
              <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
            } @else {
              <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
            }
          </svg>
        </button>
      </div>

      @if (mobileOpen()) {
        <div class="md:hidden bg-cream-50 border-t border-cream-200 mt-2 animate-fade-in">
          <div class="px-4 py-4 space-y-2">
            <a href="#servicios" (click)="mobileOpen.set(false)" class="block py-2 text-coffee-400 font-medium hover:text-terracota-300">Servicios</a>
            <a href="#nosotros" (click)="mobileOpen.set(false)" class="block py-2 text-coffee-400 font-medium hover:text-terracota-300">Nosotros</a>
            <a href="#contacto" (click)="mobileOpen.set(false)" class="block py-2 text-coffee-400 font-medium hover:text-terracota-300">Contacto</a>
            <a href="#agendar" (click)="mobileOpen.set(false)" class="block py-3 mt-2 text-center rounded-full bg-terracota-300 text-white font-medium">Agendar cita</a>
          </div>
        </div>
      }
    </nav>
  `,
})
export class Navbar {
  scrolled = signal(false);
  mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 30);
  }
}
