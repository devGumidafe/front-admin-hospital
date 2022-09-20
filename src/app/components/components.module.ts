import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [

    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [


    ModalImageComponent
  ]
})
export class ComponentsModule { }
