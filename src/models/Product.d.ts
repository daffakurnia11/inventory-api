import { Category } from "./Category"

export interface Product {
  id?: string
  product_name: string
  product_description: string
  product_image: string
  category_id: string
  stock: number
  created_at?: Date
  updated_at?: Date
  category?: Category
}