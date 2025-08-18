import { FileHandle } from "./FileHandle.model";

export interface Product{
    name:string,
    description:string,
    discountedPrice: number,
    actualPrice: number,
    productImages:FileHandle[]
}