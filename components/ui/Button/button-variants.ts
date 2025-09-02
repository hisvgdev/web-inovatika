import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'w-full py-5 rounded-2xl font-semibold  cursor-pointer disabled:bg-[#FDB933]/50 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        default: 'bg-[#FDB933] text-black hover:bg-[#FDB933]/90 transition-all',
        gray: 'bg-[#404455] text-white hover:bg-[#404455]/90 transition-all',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
)
