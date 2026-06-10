export interface SocialPost {
  id: string
  platform: 'instagram' | 'tiktok'
  postUrl: string
  thumbnailUrl: string
  alt: string
  caption: string
  profileUrl: string
}

export const socialPosts: SocialPost[] = [
  {
    id: 'ig-1',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/_navi_motors_/p/DQzT_QHCPqn/',
    thumbnailUrl: '/images/social/ig-1.jpg',
    alt: 'Ремонт ГРМ — головка блоку циліндрів у Navi Motors',
    caption: 'Ремонт ГРМ — головка блоку циліндрів',
    profileUrl: 'https://www.instagram.com/_navi_motors_/',
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/_navi_motors_/p/DQL9qGoCARQ/',
    thumbnailUrl: '/images/social/ig-2.jpg',
    alt: 'Volvo — обслуговування в Navi Motors',
    caption: 'Volvo — обслуговування в Navi Motors',
    profileUrl: 'https://www.instagram.com/_navi_motors_/',
  },
  {
    id: 'ig-3',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/_navi_motors_/p/C8Y_P6_MuuQ/',
    thumbnailUrl: '/images/social/ig-3.jpg',
    alt: 'Ремонт BMW — кузовні роботи в Navi Motors',
    caption: 'Ремонт BMW — кузовні роботи',
    profileUrl: 'https://www.instagram.com/_navi_motors_/',
  },
  {
    id: 'ig-4',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/_navi_motors_/p/C0zZPa-LmM-/',
    thumbnailUrl: '/images/social/ig-4.jpg',
    alt: 'Mercedes-Benz — діагностика в Navi Motors',
    caption: 'Mercedes-Benz — діагностика в Navi Motors',
    profileUrl: 'https://www.instagram.com/_navi_motors_/',
  },
  {
    id: 'tt-1',
    platform: 'tiktok',
    postUrl: 'https://www.tiktok.com/@_navimotors_/video/7587372003225652536',
    thumbnailUrl: '/images/social/tt-1.jpg',
    alt: 'Renault — процедура збирання, частина 2',
    caption: 'Renault — процедура збирання, частина 2',
    profileUrl: 'https://www.tiktok.com/@_navimotors_',
  },
  {
    id: 'tt-2',
    platform: 'tiktok',
    postUrl: 'https://www.tiktok.com/@_navimotors_/video/7597338251237543179',
    thumbnailUrl: '/images/social/tt-2.jpg',
    alt: 'Mazda 2.2 diesel 2016 — частина 1',
    caption: 'Mazda 2.2 diesel 2016 — частина 1',
    profileUrl: 'https://www.tiktok.com/@_navimotors_',
  },
]
