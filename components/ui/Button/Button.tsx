import { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import React, { FC } from 'react'

import { buttonVariants } from './button-variants'

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({ className, intent, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <button
                type="button"
                className={clsx(buttonVariants({ intent }), className)}
                {...props}
            />
        </div>
    )
}

Button.displayName = 'Button'
