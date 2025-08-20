import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-show-images',
  imports: [MatGridListModule,NgFor,NgIf],
  templateUrl: './show-images.html',
  styleUrl: './show-images.css',
})
export class ShowImages implements OnInit {
  ngOnInit(): void {
    this.recieveData();
  }
  data = inject(MAT_DIALOG_DATA);

  recieveData() {
    console.log(this.data.images);
  }
}
