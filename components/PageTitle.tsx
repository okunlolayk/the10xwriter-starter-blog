import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-ink font-serif text-[32px] leading-[1.1] font-semibold sm:text-4xl md:text-[46px]">
      {children}
    </h1>
  )
}
