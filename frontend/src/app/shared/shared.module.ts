import { MaterialModule } from 'src/app/modules/material/material.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [DeleteDialogComponent]
})
export class SharedModule { }
