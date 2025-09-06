import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product-service';

@Component({
  selector: 'app-order-info',
  imports: [MatTableModule],
  templateUrl: './order-info.html',
  styleUrl: './order-info.css'
})
export class OrderInfo implements OnInit{
  constructor(private productService:ProductService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
   this.getOrderInfo();
  }
  public displayedColumns: string[] = ['id', 'productName', 'name', 'contactNumber', 'amount','status'];
  public orderInfo:any = []

  getOrderInfo(){
    this.productService.getOrderInfo().subscribe({
      next: res => {
        console.log(res);
        this.orderInfo = res;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
