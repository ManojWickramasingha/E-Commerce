import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import {MatTableModule} from '@angular/material/table'
import { MyOrder } from '../_module/MyOrders.module';


@Component({
  selector: 'app-orders',
  imports: [MatTableModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit{
  public displayedColumns: string[] = ['fullName', 'fullOrder', 'contactNumber', 'amount', 'status'];
  public orderDetails:MyOrder[] = [];
  constructor(private productService:ProductService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getOrderDetails().subscribe({
      next: res => {
        console.log(res);
        this.orderDetails = res;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  markOrderDelivered(orderId:number){
    console.log(orderId);
  }

}
