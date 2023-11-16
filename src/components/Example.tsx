import { type ReactNode } from 'react'

type Props = {
  title: string
  actions?: ReactNode
  above?: ReactNode
  children: ReactNode
}

export const Example = ({ title, actions, children, above = null }: Props) => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      {children}
    </div>
  )
}
