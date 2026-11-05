import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section id="nosotros" class="py-24 bg-cream-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="relative animate-fade-up">
            <div class="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Aplicación profesional de extensiones de pestañas"
                class="w-full h-[520px] object-cover"
              />
            </div>
            <div class="absolute -bottom-8 -right-4 sm:right-8 bg-cream-50 rounded-2xl shadow-2xl p-6 max-w-xs animate-float">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-terracota-100/40 flex items-center justify-center">
                  <svg class="w-5 h-5 text-terracota-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p class="font-display text-lg text-coffee-500">Resultados premium</p>
              </div>
              <p class="text-sm text-coffee-300">Materiales de alta calidad y técnicas certificadas.</p>
            </div>
          </div>

          <div class="animate-fade-up" style="animation-delay: 0.15s">
            <p class="text-terracota-300 font-medium text-sm uppercase tracking-widest mb-3">Sobre Cat Lashes</p>
            <h2 class="font-display text-4xl sm:text-5xl text-coffee-500 mb-6 leading-tight">
              Arte y técnica<br />en cada mirada
            </h2>
            <p class="text-coffee-300 leading-relaxed mb-6 text-lg">
              En Cat Lashes nos especializamos en realzar tu belleza natural.
              Cada cita es una experiencia personalizada donde cuidamos cada detalle
              para que salgas sintiéndote única.
            </p>

            <div class="space-y-5">
              @for (feature of features; track feature.title) {
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full bg-terracota-100/30 flex items-center justify-center">
                    <svg class="w-6 h-6 text-terracota-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="feature.icon" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-display text-lg text-coffee-500 mb-1">{{ feature.title }}</h3>
                    <p class="text-coffee-300 text-sm">{{ feature.desc }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  features = [
    {
      title: 'Higiene y seguridad',
      desc: 'Materiales esterilizados y protocolos de seguridad en cada sesión.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      title: 'Técnicas especializadas',
      desc: 'Más de 10 estilos diferentes para encontrar el ideal para tu rostro.',
      icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    },
    {
      title: 'Atención personalizada',
      desc: 'Asesoría para elegir el estilo que mejor se adapte a ti.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
  ];
}
