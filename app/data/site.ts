export const siteConfig = {
  name: 'Navi Motors',
  tagline: 'Автосервіс у Києві',
  phone: '+380985355080',
  phoneDisplay: '098 535 50 80',
  address: 'вулиця Віталія Скакуна, 26, Київ, 02000',
  streetAddress: 'вулиця Віталія Скакуна, 26',
  city: 'Київ',
  postalCode: '02000',
  country: 'UA',
  instagram: 'https://www.instagram.com/_navi_motors_/',
  instagramHandle: '@_navi_motors_',
  tiktok: 'https://www.tiktok.com/@_navimotors_',
  tiktokHandle: '@_navimotors_',
  googleMaps:
    'https://www.google.com/maps/place/%D0%A1%D0%A2%D0%9E+%C2%ABNavi+Motors%C2%BB/@50.4366276,30.4030185,17z/data=!3m1!4b1!4m6!3m5!1s0x40d4cd005e8f0d0f:0xc881fc6962c98d03!8m2!3d50.4366276!4d30.4030185!16s%2Fg%2F11y2cgkt2t',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5!2d30.4030185!3d50.4366276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cd005e8f0d0f%3A0xc881fc6962c98d03!2z0JHRgtC10LItIE5hdmkgTW90b3Jz!5e0!3m2!1suk!2sua!4v1',
  googleReviewsUrl:
    'https://www.google.com/maps/place/%D0%A1%D0%A2%D0%9E+%C2%ABNavi+Motors%C2%BB/@50.4366335,30.3982506,732m/data=!3m1!1e3!4m12!1m2!2m1!1snavi+motors!3m8!1s0x40d4cd005e8f0d0f:0xc881fc6962c98d03!8m2!3d50.4366276!4d30.4030185!9m1!1b1!15sCgtuYXZpIG1vdG9yc5IBEGF1dG9fcmVwYWlyX3Nob3DgAQA!16s%2Fg%2F11y2cgkt2t?entry=ttu',
  workingHours: 'Пн–Сб: 10:00–18:00',
  workingHoursSchema: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '18:00' },
  ],
  /** Mock-канали звʼязку — підтвердити у клієнта */
  telegram: 'https://t.me/+380985355080',
  viber: 'viber://chat?number=380985355080',
  email: 'info@navi-motors.com.ua',
  priceRange: '₴₴',
} as const

export const benefits = [
  {
    title: 'Діагностика перед ремонтом',
    description: 'Знаходимо причину проблеми, а не міняємо все підряд.',
  },
  {
    title: 'Погодження вартості',
    description: 'Перед початком робіт клієнт розуміє, що потрібно зробити і скільки це буде коштувати.',
  },
  {
    title: 'Ремонт під ключ',
    description: 'Допомагаємо з діагностикою, підбором запчастин, ремонтом і подальшим обслуговуванням.',
  },
  {
    title: 'Зручний запис',
    description: 'Можна записатись телефоном, через форму на сайті або соціальні мережі.',
  },
] as const
