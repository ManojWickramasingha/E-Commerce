import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MatTableModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{

public cartDetails:any[] = [];

  constructor(private prodcutService:ProductService, private cdr:ChangeDetectorRef,private router:Router){}
  ngOnInit(): void {
    this.getCartDetail();
  }
  displayedColumns: string[] = ['id', 'name', 'discription', 'discounted Price'];

  getCartDetail(){
    this.prodcutService.getCartDetails().subscribe({
      next: res => {
        console.log(res);
        this.cartDetails = res;
        this.cdr.detectChanges();
      },
      error: err => {}
    })
  }

  checkOut(isSingleProductCheckOut:boolean,productId:number){
    this.router.navigate(['/buyProduct', {'isSingleProductCheckOut':isSingleProductCheckOut, 'id':productId}])
  }

}
