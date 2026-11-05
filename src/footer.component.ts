import { Component } from '@angular/core';
import { Logo } from './logo.component';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  template: `
    <footer id="contacto" class="bg-coffee-500 text-cream-100 pt-20 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <app-logo [size]="52" />
              <span class="font-display text-2xl">Cat Lashes</span>
            </div>
            <p class="text-cream-200 text-sm leading-relaxed max-w-sm mb-6">
              Estudio especializado en extensiones de pestañas, lash lifting y laminado de ceja.
              Realza tu mirada con nosotras.
            </p>
            <div class="flex gap-3">
              <a href="https://www.instagram.com/cat.lashes.vc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Cat Lashes" class="w-10 h-10 rounded-full bg-coffee-400 hover:bg-terracota-300 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574947205741" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Cat Lashes" class="w-10 h-10 rounded-full bg-coffee-400 hover:bg-terracota-300 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://wa.me/522205497237" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Cat Lashes" class="w-10 h-10 rounded-full bg-coffee-400 hover:bg-terracota-300 flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.741-.982zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-display text-lg mb-4 text-cream-50">Horario</h4>
            <ul class="space-y-2 text-sm text-cream-200">
              <li>Lunes a Viernes</li>
              <li>S&aacute;bado y Domingo</li>
              <li class="pt-2 text-cream-100 font-medium">10:00 &ndash; 16:00</li>
              <li class="text-cream-300 text-xs">Cada cita: 2 horas</li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-lg mb-4 text-cream-50">Explora</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#servicios" class="text-cream-200 hover:text-terracota-200 transition-colors">Servicios</a></li>
              <li><a href="#nosotros" class="text-cream-200 hover:text-terracota-200 transition-colors">Nosotros</a></li>
              <li><a href="#agendar" class="text-cream-200 hover:text-terracota-200 transition-colors">Agendar cita</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-coffee-400 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-cream-300 text-xs">
            &copy; {{ year }} Cat Lashes. Todos los derechos reservados.
          </p>
          <p class="text-cream-300 text-xs">
            Hecho con cariño para tu mirada
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  year = new Date().getFullYear();
}
