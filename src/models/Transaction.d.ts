import { Admin } from "./Admin";
import { Product } from "./Product";

export interface Transaction {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  state: "Out" | "In";
  createdAt?: Date;
  updatedAt?: Date;
  admin?: Admin;
  product?: Product;
}