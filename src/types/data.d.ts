import exp from "constants";

export type Category = "shoes" | "clothe" | "book";
export type Condition = "new" | "used";

export interface User {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
}

export interface Product {
  id: number;
  category: Category;
  title: string;
  description: string;
  imageUrl: string;
  blurDataUrl: string;
  price: number;
  condition: Condition;
  owner: User;
}

export interface ApiContext {
  apiRootUrl: string;
}
