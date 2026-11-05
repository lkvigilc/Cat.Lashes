import { Component } from '@angular/core';
import { Logo } from './logo.component';

@Component({
  selector: 'app-hero',
  imports: [Logo],
  template: `
    <section id="inicio" class="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div class="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Aplicación de extensiones de pestañas"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/80 to-cream-50/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-cream-50/60"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-2xl animate-fade-up">
          <div class="flex items-center gap-4 mb-6">
            <app-logo [size]="64" />
            <span class="font-display text-2xl sm:text-3xl text-coffee-500">Cat Lashes</span>
          </div>

          <p class="inline-block px-4 py-1.5 rounded-full bg-terracota-100/30 text-terracota-300 text-sm font-medium mb-6">
            Estudio de pestañas profesional
          </p>

          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight text-coffee-500 mb-6">
            Tu mirada,<br />
            <span class="italic text-terracota-300">elevada</span>
          </h1>

          <p class="text-lg sm:text-xl text-coffee-300 leading-relaxed mb-8 max-w-xl">
            Extensiones de pestañas, lash lifting y laminado de ceja con
            técnicas especializadas y resultados que enamoran.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#agendar"
              class="px-8 py-4 rounded-full bg-terracota-300 text-white font-medium text-center
                     hover:bg-terracota-400 transition-all shadow-lg hover:shadow-xl
                     hover:-translate-y-0.5 active:translate-y-0"
            >
              Agendar cita
            </a>
            <a
              href="#servicios"
              class="px-8 py-4 rounded-full border-2 border-coffee-300 text-coffee-400 font-medium text-center
                     hover:bg-coffee-300 hover:text-cream-50 transition-all"
            >
              Ver servicios
            </a>
          </div>

          <div class="mt-12 flex items-center gap-8 text-coffee-300">
            <div>
              <p class="font-display text-3xl text-coffee-400">10+</p>
              <p class="text-sm">técnicas</p>
            </div>
            <div class="w-px h-12 bg-coffee-200/40"></div>
            <div>
              <p class="font-display text-3xl text-coffee-400">Lun&ndash;Dom</p>
              <p class="text-sm">10:00 &ndash; 16:00</p>
            </div>
            <div class="w-px h-12 bg-coffee-200/40"></div>
            <div>
              <p class="font-display text-3xl text-coffee-400">2h</p>
              <p class="text-sm">por cita</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <div class="w-6 h-10 border-2 border-coffee-300/50 rounded-full flex justify-center pt-2">
          <div class="w-1 h-2 bg-coffee-300/60 rounded-full animate-float"></div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {}
