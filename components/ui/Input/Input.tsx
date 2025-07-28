import { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { inputVariants } from './input-variants'

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, intent, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                <input
                    ref={ref}
                    className={clsx(inputVariants({ intent }), className)}
                    {...props}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        )
    },
)

Input.displayName = 'Input'
