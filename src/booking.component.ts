import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase, Appointment } from './supabase';
import {
  allServices,
  extensionServices,
  brownExtensionServices,
  lashLiftingServices,
  browServices,
  retoqueServices,
  timeSlots,
  weekdays,
  months,
} from './services.data';

const WHATSAPP_NUMBER = '522205497237';

interface DayCell {
  date: Date;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="agendar" class="py-24 bg-gradient-to-b from-cream-50 to-cream-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-up">
          <p class="text-terracota-300 font-medium text-sm uppercase tracking-widest mb-3">Reservación</p>
          <h2 class="font-display text-4xl sm:text-5xl text-coffee-500 mb-4">Agenda tu cita</h2>
          <p class="text-coffee-300 max-w-2xl mx-auto">
            Lun a Dom, 10:00 &ndash; 16:00 &middot; Cada cita dura 2 horas
          </p>
        </div>

        @if (confirmed()) {
          <div class="max-w-md mx-auto bg-cream-50 rounded-3xl shadow-xl p-8 text-center animate-scale-in">
            <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-display text-2xl text-coffee-500 mb-3">&iexcl;Cita confirmada!</h3>
            <p class="text-coffee-300 mb-6">
              {{ selectedService()?.name }} &mdash; &#36;{{ selectedService()?.price }}<br />
              {{ formatDate(selectedDate()!) }} a las {{ selectedTime() }}
            </p>
            <p class="text-sm text-coffee-200 mb-6">
              Recibirás un mensaje de confirmación de tu cita en máximo 24 horas.
            </p>
            <button
              (click)="resetAll()"
              class="px-6 py-3 rounded-full bg-terracota-300 text-white font-medium hover:bg-terracota-400 transition-colors"
            >
              Agendar otra cita
            </button>
          </div>
        } @else {
          <div class="grid lg:grid-cols-5 gap-8">
            <div class="lg:col-span-3 bg-cream-50 rounded-3xl shadow-lg p-6 sm:p-8 animate-fade-up">
              <div class="flex items-center gap-3 mb-6">
                <span class="w-8 h-8 rounded-full bg-coffee-400 text-cream-50 flex items-center justify-center text-sm font-bold">1</span>
                <h3 class="font-display text-xl text-coffee-500">Elige fecha y hora</h3>
              </div>

              <div class="flex flex-col md:flex-row gap-6 md:gap-8">
              <div class="md:w-[260px] shrink-0">
                <div class="flex items-center justify-between mb-3">
                  <button
                    (click)="prevMonth()"
                    [disabled]="isPrevMonthDisabled()"
                    class="w-8 h-8 rounded-full flex items-center justify-center transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed
                           hover:bg-cream-200 text-coffee-400"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <p class="font-display text-base text-coffee-500">
                    {{ months[currentMonth()] }} {{ currentYear() }}
                  </p>
                  <button
                    (click)="nextMonth()"
                    class="w-8 h-8 rounded-full flex items-center justify-center transition-colors
                           hover:bg-cream-200 text-coffee-400"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-7 gap-1 mb-2">
                  @for (d of ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']; track d) {
                    <div class="text-center text-xs font-medium text-coffee-200 py-1">{{ d }}</div>
                  }
                </div>

                <div class="grid grid-cols-7 gap-1">
                  @for (cell of calendar(); track $index) {
                    <button
                      (click)="selectDate(cell)"
                      [disabled]="!cell.inMonth || cell.isPast"
                      class="aspect-square rounded-full text-sm font-medium transition-all relative
                             disabled:opacity-20 disabled:cursor-not-allowed"
                      [class]="isSelectedDate(cell.date)
                        ? 'bg-terracota-300 text-white shadow-md scale-105'
                        : cell.isToday
                          ? 'border-2 border-terracota-200 text-coffee-500 hover:bg-cream-200'
                          : 'text-coffee-400 hover:bg-cream-200'"
                    >
                      {{ cell.day }}
                      @if (isSelectedDate(cell.date) && cell.inMonth && !cell.isPast) {
                        <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"></span>
                      }
                    </button>
                  }
                </div>
              </div>

              <div class="flex-1 min-w-0 md:border-l md:border-cream-200 md:pl-8">
              @if (selectedDate()) {
                <div>
                  <p class="text-sm text-coffee-300 mb-3">
                    Horarios disponibles para {{ formatDateShort(selectedDate()!) }}
                  </p>

                  @if (loadingSlots()) {
                    <div class="flex items-center gap-2 text-coffee-200">
                      <div class="w-4 h-4 border-2 border-coffee-200 border-t-terracota-300 rounded-full animate-spin"></div>
                      <span class="text-sm">Cargando horarios...</span>
                    </div>
                  } @else {
                    <div class="grid grid-cols-3 gap-2">
                      @for (slot of timeSlots; track slot) {
                        <button
                          (click)="selectTime(slot)"
                          [disabled]="takenSlots().includes(slot)"
                          class="py-3 rounded-xl text-sm font-medium transition-all
                                 disabled:opacity-30 disabled:cursor-not-allowed disabled:line-through"
                          [class]="selectedTime() === slot
                            ? 'bg-coffee-400 text-cream-50 shadow-md'
                            : 'bg-cream-100 text-coffee-400 hover:bg-cream-200 border border-cream-200'"
                        >
                          {{ slot }}
                        </button>
                      }
                    </div>
                    <p class="text-xs text-coffee-200 mt-3">
                      Cada cita tiene una duraci&oacute;n de 2 horas.
                    </p>
                  }
                </div>
              } @else {
                <div class="h-full min-h-[160px] flex items-center justify-center text-center text-coffee-200 text-sm">
                  Selecciona una fecha en el calendario
                </div>
              }
              </div>
              </div>
            </div>

            <div class="lg:col-span-2 bg-cream-50 rounded-3xl shadow-lg p-6 sm:p-8 animate-fade-up" style="animation-delay: 0.1s">
              <div class="flex items-center gap-3 mb-4">
                <span class="w-8 h-8 rounded-full bg-coffee-400 text-cream-50 flex items-center justify-center text-sm font-bold">2</span>
                <h3 class="font-display text-xl text-coffee-500">Servicio</h3>
              </div>

              <select
                [value]="selectedServiceName()"
                (change)="onServiceChange($event)"
                class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-coffee-500
                       focus:outline-none focus:border-terracota-300 transition-colors mb-2"
              >
                <option value="">Selecciona un servicio...</option>
                <optgroup label="Extensiones de pestañas">
                  @for (s of extensionServices; track s.name) {
                    <option [value]="s.name">{{ s.name }} &mdash; &#36;{{ s.price }}</option>
                  }
                </optgroup>
                <optgroup label="Color caf&eacute;">
                  @for (s of brownExtensionServices; track s.name) {
                    <option [value]="s.name">{{ s.name }} &mdash; &#36;{{ s.price }}</option>
                  }
                </optgroup>
                <optgroup label="Lash lifting">
                  @for (s of lashLiftingServices; track s.name) {
                    <option [value]="s.name">{{ s.name }} &mdash; &#36;{{ s.price }}</option>
                  }
                </optgroup>
                <optgroup label="Cejas">
                  @for (s of browServices; track s.name) {
                    <option [value]="s.name">{{ s.name }} &mdash; &#36;{{ s.price }}</option>
                  }
                </optgroup>
                <optgroup label="Retoques">
                  @for (s of retoqueServices; track s.name) {
                    <option [value]="s.name">{{ s.name }} &mdash; &#36;{{ s.price }}</option>
                  }
                </optgroup>
              </select>

              <div class="flex items-center gap-3 mb-6">
                <span class="w-8 h-8 rounded-full bg-coffee-400 text-cream-50 flex items-center justify-center text-sm font-bold">3</span>
                <h3 class="font-display text-xl text-coffee-500">Tus datos</h3>
              </div>

              <form (ngSubmit)="submitBooking()" class="space-y-3">
                <input
                  type="text"
                  [(ngModel)]="formName"
                  name="name"
                  placeholder="Nombre completo"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-coffee-500
                         focus:outline-none focus:border-terracota-300 transition-colors text-sm"
                />
                <input
                  type="tel"
                  [(ngModel)]="formPhone"
                  name="phone"
                  placeholder="Tel&eacute;fono"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-coffee-500
                         focus:outline-none focus:border-terracota-300 transition-colors text-sm"
                />
                <input
                  type="email"
                  [(ngModel)]="formEmail"
                  name="email"
                  placeholder="Correo (opcional)"
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 text-coffee-500
                         focus:outline-none focus:border-terracota-300 transition-colors text-sm"
                />

                @if (selectedService() && selectedDate() && selectedTime()) {
                  <div class="bg-cream-100 rounded-xl p-4 mt-4 animate-fade-in">
                    <p class="text-xs text-coffee-200 uppercase tracking-wide mb-2">Resumen</p>
                    <p class="text-sm text-coffee-500 font-medium">{{ selectedService()?.name }}</p>
                    <p class="text-sm text-coffee-300">{{ formatDate(selectedDate()!) }} &middot; {{ selectedTime() }}</p>
                    <p class="font-display text-xl text-terracota-300 mt-2">&#36;{{ selectedService()?.price }}</p>
                  </div>
                }

                @if (errorMsg()) {
                  <p class="text-sm text-red-600 bg-red-50 rounded-xl p-3 animate-fade-in">{{ errorMsg() }}</p>
                }

                <button
                  type="submit"
                  [disabled]="!canSubmit() || submitting()"
                  class="w-full py-4 rounded-full bg-terracota-300 text-white font-medium transition-all
                         hover:bg-terracota-400 shadow-lg hover:shadow-xl
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:bg-terracota-300 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  @if (submitting()) {
                    <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Confirmando...
                  } @else {
                    Confirmar cita
                  }
                </button>
              </form>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Booking {
  today = new Date();
  currentMonth = signal(this.today.getMonth());
  currentYear = signal(this.today.getFullYear());
  selectedDate = signal<Date | null>(null);
  selectedTime = signal<string | null>(null);
  selectedServiceName = signal<string>('');
  selectedService = computed(() =>
    allServices.find((s) => s.name === this.selectedServiceName()) || null
  );

  loadingSlots = signal(false);
  takenSlots = signal<string[]>([]);
  submitting = signal(false);
  confirmed = signal(false);
  errorMsg = signal<string | null>(null);

  formName = '';
  formPhone = '';
  formEmail = '';

  timeSlots = timeSlots;
  months = months;
  weekdays = weekdays;
  allServices = allServices;
  extensionServices = extensionServices;
  brownExtensionServices = brownExtensionServices;
  lashLiftingServices = lashLiftingServices;
  browServices = browServices;
  retoqueServices = retoqueServices;

  calendar = computed<DayCell[]>(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: DayCell[] = [];
    const todayStr = this.toDateStr(this.today);

    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      cells.push({
        date,
        day: date.getDate(),
        inMonth: false,
        isToday: this.toDateStr(date) === todayStr,
        isPast: date < this.today && this.toDateStr(date) !== todayStr,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateStr = this.toDateStr(date);
      cells.push({
        date,
        day: d,
        inMonth: true,
        isToday: dateStr === todayStr,
        isPast: dateStr < todayStr,
      });
    }

    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      cells.push({
        date,
        day: d,
        inMonth: false,
        isToday: this.toDateStr(date) === todayStr,
        isPast: date < this.today,
      });
    }

    return cells;
  });

  canSubmit = computed(
    () =>
      !!this.selectedDate() &&
      !!this.selectedTime() &&
      !!this.selectedService() &&
      this.formName.trim().length > 0 &&
      this.formPhone.trim().length > 0
  );

  isPrevMonthDisabled = computed(() => {
    const y = this.currentYear();
    const m = this.currentMonth();
    return y < this.today.getFullYear() ||
      (y === this.today.getFullYear() && m <= this.today.getMonth());
  });

  constructor() {
    effect(() => {
      const date = this.selectedDate();
      if (date) {
        this.loadTakenSlots(date);
      } else {
        this.takenSlots.set([]);
      }
    });
  }

  toDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  prevMonth() {
    if (this.isPrevMonthDisabled()) return;
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(y - 1);
    } else {
      this.currentMonth.set(m - 1);
    }
  }

  nextMonth() {
    const m = this.currentMonth();
    const y = this.currentYear();
    if (m === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(y + 1);
    } else {
      this.currentMonth.set(m + 1);
    }
  }

  isSelectedDate(date: Date): boolean {
    const sel = this.selectedDate();
    if (!sel) return false;
    return this.toDateStr(date) === this.toDateStr(sel);
  }

  selectDate(cell: DayCell) {
    if (!cell.inMonth || cell.isPast) return;
    this.selectedDate.set(cell.date);
    this.selectedTime.set(null);
    this.errorMsg.set(null);
  }

  selectTime(slot: string) {
    if (this.takenSlots().includes(slot)) return;
    this.selectedTime.set(slot);
    this.errorMsg.set(null);
  }

  onServiceChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedServiceName.set(target.value);
    this.errorMsg.set(null);
  }

  async loadTakenSlots(date: Date) {
    this.loadingSlots.set(true);
    const dateStr = this.toDateStr(date);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', dateStr);

      if (error) throw error;
      this.takenSlots.set(
        (data || []).map((r: { appointment_time: string }) =>
          r.appointment_time.slice(0, 5)
        )
      );
    } catch {
      this.takenSlots.set([]);
    } finally {
      this.loadingSlots.set(false);
    }
  }

  formatDate(d: Date): string {
    return `${weekdays[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
  }

  formatDateShort(d: Date): string {
    return `${d.getDate()} ${months[d.getMonth()].slice(0, 3)}`;
  }

  async submitBooking() {
    if (!this.canSubmit()) return;
    this.submitting.set(true);
    this.errorMsg.set(null);

    const service = this.selectedService();
    const date = this.selectedDate();
    const time = this.selectedTime();

    if (!service || !date || !time) {
      this.errorMsg.set('Faltan datos para agendar.');
      this.submitting.set(false);
      return;
    }

    const appointment: Appointment = {
      name: this.formName.trim(),
      phone: this.formPhone.trim(),
      email: this.formEmail.trim() || null,
      service: service.name,
      service_type: this.getServiceType(service.name),
      price: service.price,
      appointment_date: this.toDateStr(date),
      appointment_time: time,
      status: 'confirmada',
    };

    try {
      const { error } = await supabase
        .from('appointments')
        .insert(appointment);

      if (error) {
        if (error.code === '23505') {
          this.errorMsg.set('Ese horario ya fue reservado. Por favor elige otro.');
          await this.loadTakenSlots(date);
          this.selectedTime.set(null);
        } else {
          this.errorMsg.set('Ocurrió un error al agendar. Intenta de nuevo.');
        }
        this.submitting.set(false);
        return;
      }

      this.confirmed.set(true);
      window.open(this.buildWhatsappUrl(appointment, date, time), '_blank', 'noopener');
    } catch {
      this.errorMsg.set('No se pudo conectar. Verifica tu conexión e intenta de nuevo.');
    } finally {
      this.submitting.set(false);
    }
  }

  buildWhatsappUrl(appointment: Appointment, date: Date, time: string): string {
    const lines = [
      'Hola, quiero confirmar mi cita:',
      `Nombre: ${appointment.name}`,
      `Teléfono: ${appointment.phone}`,
      appointment.email ? `Correo: ${appointment.email}` : null,
      `Servicio: ${appointment.service} (${appointment.price})`,
      `Fecha: ${this.formatDate(date)}`,
      `Hora: ${time}`,
    ].filter((l): l is string => l !== null);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  getServiceType(name: string): string {
    if (name.startsWith('Retoque')) return 'retoque';
    if (name.toLowerCase().includes('lash lifting')) return 'lash_lifting';
    if (name.toLowerCase().includes('laminado')) return 'laminado';
    if (name.toLowerCase().includes('café')) return 'extensiones_cafe';
    return 'extensiones';
  }

  resetAll() {
    this.confirmed.set(false);
    this.selectedDate.set(null);
    this.selectedTime.set(null);
    this.selectedServiceName.set('');
    this.formName = '';
    this.formPhone = '';
    this.formEmail = '';
    this.errorMsg.set(null);
    this.takenSlots.set([]);
  }
}
