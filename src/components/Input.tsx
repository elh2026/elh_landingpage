import React from 'react'

import { cn } from '@/lib/utils'

interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input: React.FC<PropsInput> = ({ label, id, className = '', error, disabled, value, ...rest }) => {
  const isActive = !!value
  const inputId = id || rest.name

  return (
    <div className="relative">
      <input
        id={inputId}
        disabled={disabled}
        value={value}
        placeholder=" "
        className={cn(
          `peer border-mainColor text-md shadow-mainColor block w-full appearance-none rounded-xl border bg-transparent px-6 pt-6 pb-1 shadow-inner focus:ring-0 focus:outline-none ${
            disabled ? 'opacity-40' : 'opacity-100'
          }`,
          className,
        )}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'text-md absolute top-4 left-6 z-10 origin-[0] transform duration-150',
          isActive || rest.placeholder === ''
            ? '-translate-y-3 scale-75'
            : 'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75',
        )}
      >
        {label}
      </label>
      {error && <p className="absolute -bottom-4 left-6 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input
