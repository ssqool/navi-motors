export interface Review {
  author: string
  rating: number
  text: string
  date?: string
  service?: string
}

/** Real Google Maps reviews — selected for the website */
export const reviews: Review[] = [
  {
    author: 'Артем',
    rating: 5,
    text: 'Відмінний сервіс. Все роблять швидко та за гарною ціною. Обслуговую у них три машини протягом року, всім задоволений. Рекомендую.',
    service: 'Постійний клієнт',
  },
  {
    author: 'Sasha',
    rating: 5,
    text: 'Чудовий сервіс. Швидке обслуговування, ввічливий персонал і бездоганна якість робіт за розумною ціною. Відтепер це місце, куди я буду звертатися завжди.',
  },
  {
    author: 'Владислав',
    rating: 5,
    text: 'Швидко підібрали запчастини по хорошій ціні і якісно виконали ремонт вчасно. Рекомендую.',
    service: 'Підбір запчастин',
  },
  {
    author: 'Юра',
    rating: 5,
    text: 'Відмінний сервіс! Хлопці молодці — знайшли поломку і швидко її усунули. Рекомендую.',
    service: 'Діагностика та ремонт',
  },
  {
    author: 'Сергій',
    rating: 5,
    text: 'Відремонтували авто швидко і якісно. Дякую велике за прекрасну роботу!',
    service: 'Ремонт авто',
  },
]

export const reviewStats = {
  averageRating: 4.7,
  totalCount: 12,
  source: 'Google Maps',
} as const
