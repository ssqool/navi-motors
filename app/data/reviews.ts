import { mockMeta } from './mock'

export interface Review {
  author: string
  rating: number
  text: string
  date: string
  service?: string
}

/** Mock reviews — replace with real Google Maps reviews after client approval */
export const reviews: Review[] = [
  {
    author: 'Олексій К.',
    rating: 5,
    text: 'Звернувся зі стуком у підвісці. Спочатку зробили діагностику, пояснили проблему простими словами і погодили ціну. Ремонт виконали вчасно.',
    date: '12 листопада 2025',
    service: 'Ремонт ходової',
  },
  {
    author: 'Марина В.',
    rating: 5,
    text: 'Робила планове ТО. Все прозоро: що міняють, скільки коштує. Без зайвих робіт. Повернуся знову.',
    date: '28 жовтня 2025',
    service: 'Технічне обслуговування',
  },
  {
    author: 'Дмитро С.',
    rating: 5,
    text: 'Перевіряли авто перед купівлею. Детальний огляд, список зауважень — допомогло прийняти рішення. Дякую!',
    date: '15 вересня 2025',
    service: 'Перевірка перед купівлею',
  },
  {
    author: 'Андрій М.',
    rating: 5,
    text: 'Замінили колодки і диски. Показали старі деталі, пояснили чому саме їх треба міняти. Ціна як домовлялись.',
    date: '3 серпня 2025',
    service: 'Ремонт гальм',
  },
  {
    author: 'Ірина Л.',
    rating: 4,
    text: 'Компʼютерна діагностика знайшла причину, чому горів Check Engine. Ремонт зайняв трохи більше часу, ніж очікувала, але результат є.',
    date: '19 липня 2025',
    service: 'Діагностика авто',
  },
]

export const reviewStats = {
  averageRating: mockMeta.googleRating,
  totalCount: mockMeta.googleReviewCount,
  source: 'Google Maps',
} as const
