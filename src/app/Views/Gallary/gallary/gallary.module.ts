import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GallaryRoutingModule } from './gallary-routing.module';
import { GallarylistComponent } from '../gallarylist/gallarylist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GallaryimageComponent } from '../gallaryimage/gallaryimage.component';



@NgModule({
  declarations: [GallarylistComponent,GallaryimageComponent],
  imports: [
    CommonModule,
    GallaryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GallaryModule { }
