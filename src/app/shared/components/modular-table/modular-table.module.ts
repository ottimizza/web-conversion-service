import { NgModule } from '@angular/core';
import { ModularTableComponent } from './modular-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ModularTableComponent],
  imports: [CommonModule],
  exports: [ModularTableComponent]
})
export class ModularTableModule {}
