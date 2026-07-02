import Link from 'next/link'

import { FOOTER_DATA } from '@/constants'

export const Footer = () => {
  return (
    <div className="bg-background z-50 w-full p-4 text-gray-200 backdrop-blur-sm sm:p-6 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 md:justify-around">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="flex min-w-[150px] flex-col items-center justify-start sm:min-w-[180px] md:min-w-[200px]"
            >
              <h3 className="text-base font-bold sm:text-lg">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="my-3 flex flex-row items-center sm:my-4"
                >
                  {Icon && <Icon />}
                  <span className="ml-1.5 text-sm sm:text-base">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 mb-4 text-center text-sm sm:mt-8 sm:mb-0 sm:text-base">
          &copy; ArkeA {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  )
}
