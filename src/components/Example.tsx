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
      className="test"
      style={{
        height: '100vh',
        background: 'red',
      }}
    >
      {children}
    </div>
  )
}
