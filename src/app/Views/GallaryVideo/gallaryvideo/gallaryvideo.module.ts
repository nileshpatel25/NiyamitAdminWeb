import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GallaryvideoRoutingModule } from './gallaryvideo-routing.module';
import { GallaryvideolistComponent } from '../gallaryvideolist/gallaryvideolist.component';
import { GallaryvideosearchfilterPipe } from 'src/app/Services/Pipe/gallaryvideosearchfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GallaryvideolistComponent,
    GallaryvideosearchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GallaryvideoRoutingModule,
    NgxPaginationModule
  ]
})
export class GallaryvideoModule { }
