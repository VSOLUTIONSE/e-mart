export interface Product {
 id: string
 name: string
 description: string
 price: number
 images: string[] // Changed from single image to multiple images
 category: string
 inStock: boolean
 featured?: boolean
 variants?: string[]
}