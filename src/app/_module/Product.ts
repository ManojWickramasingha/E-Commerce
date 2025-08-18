import { FileHandle } from './FileHandle.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  discountedPrice: number;
  actualPrice: number;
  productImages: FileHandle[];
}
