import Link from 'next/link'

import { FOOTER_DATA } from '@/constants'

export const Footer = () => {
  return (
    <div className="h-full w-full bg-transparent p-[15px] text-gray-200 shadow-lg">
      <div className="m-auto flex w-full flex-col items-center justify-center">
        <div className="flex h-full w-full flex-row flex-wrap items-center justify-around">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="flex h-auto min-w-[200px] flex-col items-center justify-start"
            >
              <h3 className="text-[16px] font-bold">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="my-[15px] flex flex-row items-center"
                >
                  {Icon && <Icon />}
                  <span className="ml-[6px] text-[15px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-center text-[15px]">
          &copy; ArkeA {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  )
}
