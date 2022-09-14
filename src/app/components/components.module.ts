import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [
    IncrementComponent,
    DonaComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementComponent,
    DonaComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
