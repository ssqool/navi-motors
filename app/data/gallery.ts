export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  category: 'facade' | 'box' | 'work' | 'tools' | 'waiting' | 'before-after'
}

/** Local workshop photos (public/images/gallery/). Some are real shots from Navi Motors social media. */
export const galleryImages: GalleryImage[] = [
  {
    id: 'facade',
    src: '/images/gallery/facade.jpg',
    alt: 'Фасад автосервісу Navi Motors у Києві',
    caption: 'Фасад СТО',
    category: 'facade',
  },
  {
    id: 'entrance',
    src: '/images/gallery/entrance.jpg',
    alt: 'Вхід та зона прийому Navi Motors',
    caption: 'Зона прийому',
    category: 'facade',
  },
  {
    id: 'lift',
    src: '/images/gallery/lift.jpg',
    alt: 'Авто на підйомнику в Navi Motors',
    caption: 'Авто на підйомнику',
    category: 'box',
  },
  {
    id: 'diagnostics',
    src: '/images/gallery/mercedes-diagnostics.jpg',
    alt: 'Діагностика Mercedes-Benz в Navi Motors',
    caption: 'Діагностика Mercedes-Benz',
    category: 'work',
  },
  {
    id: 'mechanic',
    src: '/images/gallery/assembly.jpg',
    alt: 'Майстер за роботою в Navi Motors',
    caption: 'Майстер за роботою',
    category: 'work',
  },
  {
    id: 'tools',
    src: '/images/gallery/tools.jpg',
    alt: 'Інструменти та обладнання Navi Motors',
    caption: 'Інструменти',
    category: 'tools',
  },
  {
    id: 'suspension',
    src: '/images/gallery/suspension.jpg',
    alt: 'Ремонт ходової в Navi Motors',
    caption: 'Ремонт ходової',
    category: 'work',
  },
  {
    id: 'brakes',
    src: '/images/gallery/brakes.jpg',
    alt: 'Ремонт гальмівної системи в Navi Motors',
    caption: 'Гальмівна система',
    category: 'work',
  },
  {
    id: 'parts',
    src: '/images/gallery/engine-work.jpg',
    alt: 'Ремонт ГРМ — головка блоку циліндрів у Navi Motors',
    caption: 'Ремонт двигуна',
    category: 'work',
  },
  {
    id: 'waiting',
    src: '/images/gallery/waiting.jpg',
    alt: 'Зона очікування Navi Motors',
    caption: 'Зона очікування',
    category: 'waiting',
  },
  {
    id: 'before',
    src: '/images/gallery/bodywork.jpg',
    alt: 'Кузовні роботи BMW в Navi Motors',
    caption: 'Кузовні роботи',
    category: 'before-after',
  },
  {
    id: 'after',
    src: '/images/gallery/after.jpg',
    alt: 'Авто після ремонту в Navi Motors',
    caption: 'Після ремонту',
    category: 'before-after',
  },
]

export const heroImage = {
  src: '/images/gallery/facade.jpg',
  alt: 'Автосервіс Navi Motors у Києві',
}

/** Hero images for service SEO pages */
export const serviceHeroImages: Record<string, string> = {
  'diagnostyka-avto-kyiv': '/images/gallery/mercedes-diagnostics.jpg',
  'tehnichne-obslugovuvannia-kyiv': '/images/gallery/tools.jpg',
  'remont-hodovoi-kyiv': '/images/gallery/suspension.jpg',
  'remont-galm-kyiv': '/images/gallery/brakes.jpg',
  'remont-dvyguna-kyiv': '/images/gallery/engine-work.jpg',
  'remont-transmisii-kyiv': '/images/gallery/assembly.jpg',
  'remont-rulevoho-upravlinnia-kyiv': '/images/gallery/lift.jpg',
  'perevirka-avto-pered-kupivleiu-kyiv': '/images/gallery/after.jpg',
}
