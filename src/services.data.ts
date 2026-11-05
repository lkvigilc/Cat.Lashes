export interface ServiceItem {
  name: string;
  price: number;
  touchUp?: number;
  color?: 'default' | 'brown';
  image?: string;
}

export const extensionServices: ServiceItem[] = [
  { name: 'Clásicas', price: 500, touchUp: 380, image: 'assets/clasicas.jpeg' },
  { name: 'Híbridas', price: 550, touchUp: 380, image: 'assets/hibridas.jpeg' },
  { name: 'Volumen tecnológico', price: 600, touchUp: 400, image: 'assets/volumen_tecnologico_2.jpeg' },
  { name: 'Efecto rimel', price: 550, touchUp: 380, image: 'assets/efecto_rimel.jpeg' },
  { name: 'Efecto mojado', price: 580, touchUp: 400, image: 'assets/efecto_mojado.jpeg' },
  { name: 'Efecto medusa', price: 680, touchUp: 500, image: 'assets/efecto_medusa.jpeg' },
  { name: 'Efecto aura', price: 550, touchUp: 380 },
  { name: 'Volumen artesanal', price: 700, touchUp: 550, image: 'assets/volumen_artesanal_2.jpeg' },
  { name: 'Hawaianas', price: 500, touchUp: 350, image: 'assets/hawain.jpeg' },
  { name: 'Wispy', price: 580, touchUp: 400, image: 'assets/wispy.jpeg' },
];

export const brownExtensionServices: ServiceItem[] = [
  { name: 'Clásicas café', price: 550, touchUp: 380, color: 'brown' },
  { name: 'Volumen café', price: 600, touchUp: 480, color: 'brown' },
  { name: 'Hawaianas café', price: 550, touchUp: 380, color: 'brown' },
  { name: 'Efecto rimel café', price: 580, touchUp: 400, color: 'brown' },
];

export const lashLiftingServices: ServiceItem[] = [
  { name: 'Lash lifting', price: 400 },
  { name: 'Lash lifting con pigmento', price: 500 },
];

export const browServices: ServiceItem[] = [
  { name: 'Laminado de ceja', price: 200 },
];

export const retoqueServices: ServiceItem[] = [...extensionServices, ...brownExtensionServices]
  .filter((s): s is ServiceItem & { touchUp: number } => s.touchUp !== undefined)
  .map((s) => ({ name: `Retoque ${s.name}`, price: s.touchUp }));

export const allServices = [
  ...extensionServices,
  ...brownExtensionServices,
  ...lashLiftingServices,
  ...browServices,
  ...retoqueServices,
];

export const timeSlots: string[] = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
];

export const weekdays = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles',
  'Jueves', 'Viernes', 'Sábado',
];

export const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
