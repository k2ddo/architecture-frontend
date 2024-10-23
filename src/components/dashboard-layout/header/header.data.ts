import DASHBOARD_PAGES from '@/config/pages-url.config'
import IHeader from './header.interface'

export const HEADER: IHeader[] = [
  { name: 'Главная страница', link: DASHBOARD_PAGES.HOME },
  { name: 'Вероника', link: DASHBOARD_PAGES.VERONIKA },
  { name: 'Чек-листы', link: DASHBOARD_PAGES.CHECK_LISTS },
  { name: 'Задачи', link: DASHBOARD_PAGES.TASKS },
]
