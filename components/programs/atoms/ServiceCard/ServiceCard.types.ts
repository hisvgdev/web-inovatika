import { StaticImageData } from "next/image"

export interface ServiceCardProps {
  icon: StaticImageData
  title: string
  description: string
  disabled?: boolean
  href: string;
}