export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  category: 'facade' | 'box' | 'work' | 'tools' | 'waiting' | 'before-after'
}

export interface HeroPhoto {
  src: string
  alt: string
  /** CSS object-position for background crop */
  position?: string
}

/** Real workshop photos from Navi Motors (public/images/gallery/) */
export const galleryImages: GalleryImage[] = [
  {
    id: 'lift-mercedes',
    src: '/images/gallery/mercedes-on-lift.jpg',
    alt: 'Mercedes-Benz на підйомнику в автосервісі Navi Motors, Київ',
    caption: 'Авто на підйомнику',
    category: 'box',
  },
  {
    id: 'lift-volvo',
    src: '/images/gallery/volvo-on-lift.jpg',
    alt: 'Volvo на підйомнику в Navi Motors — діагностика та обслуговування',
    caption: 'Діагностика на підйомнику',
    category: 'box',
  },
  {
    id: 'lift-suv',
    src: '/images/gallery/suv-on-lift.jpg',
    alt: 'Перевірка ходової на підйомнику в Navi Motors',
    caption: 'Перевірка ходової',
    category: 'box',
  },
  {
    id: 'vw-service',
    src: '/images/gallery/vw-golf-service.jpg',
    alt: 'Volkswagen у боксі Navi Motors — технічне обслуговування',
    caption: 'Технічне обслуговування',
    category: 'work',
  },
  {
    id: 'bmw-engine',
    src: '/images/gallery/bmw-engine-service.jpg',
    alt: 'Ремонт двигуна BMW в автосервісі Navi Motors',
    caption: 'Ремонт двигуна',
    category: 'work',
  },
  {
    id: 'engine-head',
    src: '/images/gallery/engine-cylinder-head.jpg',
    alt: 'Ремонт ГРМ та головки блоку циліндрів у Navi Motors',
    caption: 'Ремонт ГРМ',
    category: 'work',
  },
  {
    id: 'suspension',
    src: '/images/gallery/suspension-coilover.jpg',
    alt: 'Заміна амортизаторів і ремонт підвіски в Navi Motors',
    caption: 'Ремонт ходової',
    category: 'work',
  },
  {
    id: 'complex-repair',
    src: '/images/gallery/tesla-body-repair.jpg',
    alt: 'Складний ремонт авто в майстерні Navi Motors, Київ',
    caption: 'Складний ремонт',
    category: 'work',
  },
]

export const heroImage: HeroPhoto = {
  src: '/images/gallery/mercedes-on-lift.jpg',
  alt: 'Автосервіс Navi Motors у Києві — бокс з підйомником',
  position: 'center 35%',
}

/** Hero backgrounds for main pages */
export const pageHeroImages = {
  home: {
    src: '/images/gallery/vw-golf-service.jpg',
    alt: 'Navi Motors — автосервіс у Києві',
    position: 'center 55%',
  },
  about: {
    src: '/images/gallery/bmw-engine-service.jpg',
    alt: 'Майстерня Navi Motors — ремонт двигуна та складні роботи',
    position: 'center 30%',
  },
  contacts: {
    src: '/images/gallery/vw-golf-service.jpg',
    alt: 'Автосервіс Navi Motors на вул. Віталія Скакуна, 26, Київ',
    position: 'center 55%',
  },
  services: {
    src: '/images/gallery/volvo-on-lift.jpg',
    alt: 'Послуги автосервісу Navi Motors у Києві',
    position: 'center 40%',
  },
} satisfies Record<string, HeroPhoto>

/** Hero backgrounds for individual service pages */
export const serviceHeroImages: Record<string, HeroPhoto> = {
  'diagnostyka-avto-kyiv': {
    src: '/images/gallery/volvo-on-lift.jpg',
    alt: 'Діагностика авто на підйомнику — Navi Motors, Київ',
    position: 'center 40%',
  },
  'tehnichne-obslugovuvannia-kyiv': {
    src: '/images/gallery/vw-golf-service.jpg',
    alt: 'Технічне обслуговування авто — Navi Motors, Київ',
    position: 'center 55%',
  },
  'remont-hodovoi-kyiv': {
    src: '/images/gallery/suspension-coilover.jpg',
    alt: 'Ремонт ходової та підвіски — Navi Motors, Київ',
    position: 'center 45%',
  },
  'remont-galm-kyiv': {
    src: '/images/gallery/suv-on-lift.jpg',
    alt: 'Ремонт гальмівної системи на підйомнику — Navi Motors, Київ',
    position: 'center 35%',
  },
  'remont-dvyguna-kyiv': {
    src: '/images/gallery/engine-cylinder-head.jpg',
    alt: 'Ремонт двигуна та ГРМ — Navi Motors, Київ',
    position: 'center 40%',
  },
  'remont-transmisii-kyiv': {
    src: '/images/gallery/bmw-engine-service.jpg',
    alt: 'Ремонт трансмісії та двигуна — Navi Motors, Київ',
    position: 'center 30%',
  },
  'remont-rulevoho-upravlinnia-kyiv': {
    src: '/images/gallery/mercedes-on-lift.jpg',
    alt: 'Ремонт рульового управління — Navi Motors, Київ',
    position: 'center 35%',
  },
}

export function getServiceHero(slug: string): HeroPhoto {
  return serviceHeroImages[slug] ?? heroImage
}
