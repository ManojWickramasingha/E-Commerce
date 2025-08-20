import { Injectable } from '@angular/core';
import { Product } from '../_module/Product';
import { FileHandle } from '../_module/FileHandle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageProcess {
  constructor(private sanitizer: DomSanitizer) {}

  public createImage(product: Product): Product {
    const productImages: any[] = product.productImages;

    const productImageToFileHandle: FileHandle[] = [];


    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const blob = this.createDataUrlBlob(
        imageFileData.byteImage,
        imageFileData.fileType
      );

      const ImageFile = new File([blob], imageFileData.fileName, {
        type: imageFileData.fileType,
      });

      const finalFile: FileHandle = {
        file: ImageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(ImageFile)
        ),
      };

      productImageToFileHandle.push(finalFile);
    }

    product.productImages = productImageToFileHandle;
    return product;
  }

  public createDataUrlBlob(byteImage:any, imageType:any): Blob {
    const byteString = window.atob(byteImage);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const array8 = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      array8[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([array8], { type: imageType });
    return blob;
  }
}
