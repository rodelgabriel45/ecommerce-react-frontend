export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}
