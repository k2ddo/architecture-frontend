import Link from 'next/link'

import { HEADER } from './header.data'
import DASHBOARD_PAGES from '@/config/pages-url.config'
import { Montserrat_Alternates } from 'next/font/google'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['latin'],
})

export default function Header() {
  return (
    <header className="bg-white mx-auto rounded-[20px] w-3/4 h-[65px] flex items-center mt-6 shadow-glow">
      <div className="flex justify-between items-center text-[15px] w-full">
        <Link href={DASHBOARD_PAGES.HOME}>
          <div className="bg-orange hover:bg-orange-dark transition-colors rounded-[7px] h-[35px] flex justify-center items-center ml-4">
            <div
              className={`${montserratAlternates.className} text-white font-bold mx-3`}
            >
              АРХИТЕКТУРА
            </div>
          </div>
        </Link>
        <div className="flex mr-10 md:mr-52">
          {HEADER.map((item) => (
            <div
              key={item.link}
              className="text-center hover:text-slate-400 transition-colors first:font-semibold mr-[30px]"
            >
              <Link href={item.link}>{item.name}</Link>
            </div>
          ))}
        </div>
        <Link href={DASHBOARD_PAGES.PROFILE}>
          <div className="bg-orange hover:bg-orange-dark transition-colors rounded-[7px] w-[35px] h-[35px] flex justify-center items-center mr-4">
            <div className="text-white font-bold">A</div>
          </div>
        </Link>
      </div>
    </header>
  )
}
