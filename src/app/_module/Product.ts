import { FileHandle } from "./FileHandle.model";

export interface product{
    name:string,
    description:string,
    discountedPrice: number,
    actualPrice: number,
    productImages:FileHandle[]
}