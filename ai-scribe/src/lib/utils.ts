import {twMerge} from 'tailwind-merge'
import {ClassValue, clsx} from "clsx";

//For Merging tailwind classes, allows for conditional classes

export function cn(...inputs:ClassValue[]) {
    return twMerge(clsx(inputs))
}