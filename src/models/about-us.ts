import type { RecipeCategory } from './recipe'
import appetizer from '../assets/pixelart/appetizer.png'
import mainDish from '../assets/pixelart/main-dish.png'
import sideDish from '../assets/pixelart/side-dish.png'
import dessert from '../assets/pixelart/dessert.png'
import portrait from '../assets/creator-portrait.jpg'

export type AboutUsContent = {
  heading: string
  paragraphs: string[]
  portraitSrc: string
  portraitAlt: string
  statement: string
  footerMessage: string
}

export type RecipeCategoryLink = {
  label: string
  category: RecipeCategory
  imageSrc: string
  imageAlt: string
  href: string
  sortOrder: number
}

export const aboutUsContent: AboutUsContent = {
  heading: 'A little story behind Renmeshi',
  paragraphs: [
    'Renmeshi was made by Vale and Danno, two people who like making things almost as much as they like eating them.',
    'Cooking and coding became our shared language: small experiments, useful tools, and the occasional beautiful mess on the counter.',
    'The name combines ren, to forge or refine, with meshi, a friendly word for a meal. This is a recipe collection for everyday cravings, built to help dinner feel a little easier.',
  ],
  portraitSrc: portrait,
  portraitAlt: 'Vale and Danno together in their kitchen',
  statement: 'Recipes, pixel art, and code made with care for ordinary hungry days.',
  footerMessage: 'Made for the meals that make a day feel better.',
}

export const recipeCategoryLinks: RecipeCategoryLink[] = [
  { label: 'Appetizer', category: 'Appetizers', imageSrc: appetizer, imageAlt: 'Pixel-art appetizer', href: '#/category/Appetizers', sortOrder: 1 },
  { label: 'Main Dish', category: 'Mains', imageSrc: mainDish, imageAlt: 'Pixel-art main dish', href: '#/category/Mains', sortOrder: 2 },
  { label: 'Side Dish', category: 'Sides', imageSrc: sideDish, imageAlt: 'Pixel-art side dish', href: '#/category/Sides', sortOrder: 3 },
  { label: 'Dessert', category: 'Desserts', imageSrc: dessert, imageAlt: 'Pixel-art dessert', href: '#/category/Desserts', sortOrder: 4 },
]
