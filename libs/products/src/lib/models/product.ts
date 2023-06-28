import { Category } from './category';

export class Product {
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: [string];
  brand?: string;
  price?: string;
  category?: string | Category;
  countInStock?: string;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: Date;
}
