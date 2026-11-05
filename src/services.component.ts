import { Component, signal } from '@angular/core';
import {
  extensionServices,
  brownExtensionServices,
  lashLiftingServices,
  browServices,
} from './services.data';

@Component({
  selector: 'app-services',
  template: `
    <section id="servicios" class="py-24 bg-cream-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-up">
          <p class="text-terracota-300 font-medium text-sm uppercase tracking-widest mb-3">Nuestros servicios</p>
          <h2 class="font-display text-4xl sm:text-5xl text-coffee-500 mb-4">Técnicas y precios</h2>
          <p class="text-coffee-300 max-w-2xl mx-auto">
            Cada servicio está pensado para realzar tu mirada. Precios en pesos mexicanos (MXN).
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (tab of tabs; track tab.id) {
            <button
              (click)="activeTab.set(tab.id)"
              class="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              [class]="activeTab() === tab.id
                ? 'bg-coffee-400 text-cream-50 shadow-md'
                : 'bg-cream-50 text-coffee-400 hover:bg-cream-200 border border-cream-200'"
            >
              {{ tab.label }}
            </button>
          }
        </div>

        @if (activeTab() === 'extensiones') {
          <div class="grid grid-cols-2 gap-4 animate-fade-in">
            @for (s of extensionServices; track s.name) {
              <div (click)="expandedService.set(expandedService() === s.name ? null : s.name)"
                   class="bg-cream-50 rounded-2xl p-4 border border-cream-200 hover:border-terracota-200
                          hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer
                          flex flex-col sm:flex-row items-center gap-6">
                @if (s.image) {
                  <div class="relative shrink-0">
                    <img [src]="s.image" [alt]="'Pestañas ' + s.name" loading="lazy"
                         [class]="expandedService() === s.name
                           ? 'w-[120px] h-[120px] rounded-xl object-cover transition-all'
                           : 'w-[30px] h-[30px] rounded-xl object-cover transition-all'" />
                    @if (expandedService() === s.name) {
                      <button type="button" aria-label="Cerrar imagen"
                              (click)="$event.stopPropagation(); expandedService.set(null)"
                              class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-coffee-500 text-cream-50
                                     flex items-center justify-center shadow-md hover:bg-coffee-400 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    }
                  </div>
                }
                <div class="flex-1 w-full min-w-0 p-2">
                  <h3 class="font-display text-xl text-coffee-500 mb-3 leading-snug">{{ s.name }}</h3>
                  <div class="flex items-end justify-between">
                    <div>
                      <p class="font-display text-2xl text-terracota-300">&#36;{{ s.price }}</p>
                      <p class="text-xs text-coffee-200 mt-1">Retoque &#36;{{ s.touchUp }}</p>
                    </div>
                    <a href="#agendar" class="opacity-0 group-hover:opacity-100 transition-opacity text-terracota-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        }

        @if (activeTab() === 'cafe') {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            @for (s of brownExtensionServices; track s.name) {
              <div class="bg-cream-50 rounded-2xl p-6 border border-cream-200 hover:border-terracota-200
                          hover:shadow-lg transition-all hover:-translate-y-1 group cursor-default">
                <span class="inline-block text-xs px-2 py-0.5 rounded-full bg-coffee-100/30 text-coffee-400 mb-2">Color café</span>
                <h3 class="font-display text-lg text-coffee-500 mb-2 leading-snug">{{ s.name }}</h3>
                <div class="flex items-end justify-between">
                  <div>
                    <p class="font-display text-2xl text-terracota-300">&#36;{{ s.price }}</p>
                    <p class="text-xs text-coffee-200 mt-1">Retoque &#36;{{ s.touchUp }}</p>
                  </div>
                  <a href="#agendar" class="opacity-0 group-hover:opacity-100 transition-opacity text-terracota-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            }
          </div>
        }

        @if (activeTab() === 'lifting') {
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto animate-fade-in">
            @for (s of lashLiftingServices; track s.name) {
              <div class="bg-cream-50 rounded-2xl p-8 border border-cream-200 hover:border-terracota-200
                          hover:shadow-lg transition-all hover:-translate-y-1 cursor-default text-center">
                <h3 class="font-display text-xl text-coffee-500 mb-3">{{ s.name }}</h3>
                <p class="font-display text-3xl text-terracota-300">&#36;{{ s.price }}</p>
              </div>
            }
          </div>
        }

        @if (activeTab() === 'cejas') {
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto animate-fade-in">
            @for (s of browServices; track s.name) {
              <div class="bg-cream-50 rounded-2xl p-8 border border-cream-200 hover:border-terracota-200
                          hover:shadow-lg transition-all hover:-translate-y-1 cursor-default text-center">
                <h3 class="font-display text-xl text-coffee-500 mb-3">{{ s.name }}</h3>
                <p class="font-display text-3xl text-terracota-300">&#36;{{ s.price }}</p>
              </div>
            }
          </div>
        }

        <div class="text-center mt-16">
          <a
            href="#agendar"
            class="inline-block px-10 py-4 rounded-full bg-terracota-300 text-white font-medium
                   hover:bg-terracota-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Reservar mi cita
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  activeTab = signal<'extensiones' | 'cafe' | 'lifting' | 'cejas'>('extensiones');
  expandedService = signal<string | null>(null);

  tabs = [
    { id: 'extensiones' as const, label: 'Extensiones' },
    { id: 'cafe' as const, label: 'Color café' },
    { id: 'lifting' as const, label: 'Lash lifting' },
    { id: 'cejas' as const, label: 'Laminado de ceja' },
  ];

  extensionServices = extensionServices;
  brownExtensionServices = brownExtensionServices;
  lashLiftingServices = lashLiftingServices;
  browServices = browServices;
}
