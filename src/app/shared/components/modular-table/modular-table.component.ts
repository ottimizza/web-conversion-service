import { Component, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModularTableConfig } from './models/ModularTableConfig';
import { ModularTableContent, modularTableInit } from './models/ModularTableContent';

@Component({
  selector: 'app-mod-table',
  templateUrl: './modular-table.component.html'
})
export class ModularTableComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() config = new ModularTableConfig();
  @Input() content = modularTableInit();

  @Output() map: HTMLDivElement[][];

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('É necessário informar um');
    }
    this._map();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._map();
  }

  private _map() {}

}
