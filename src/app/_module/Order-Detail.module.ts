import { ProductQuantity } from './Product-Quantity.module';

export interface OrderDetail {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContactNumber: string;
  productQuantityList: ProductQuantity[];
}
