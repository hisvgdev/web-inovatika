import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full rounded-xl border text-sm font-medium placeholder:text-gray-400 focus:outline-none p-6 transition text-black dark:text-white',
  {
    variants: {
      intent: {
        default: 'border-[#262833]',
        black: 'bg-[#13141A] border-none',
        dark: 'bg-transparent border-[#262833] dark:bg-[#262833] dark:border-none',
        light: 'bg-[#D9DCED] text-black border-none placeholder:text-[#262833]',
        error: 'border-red-500 placeholder:text-red-300',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
)
