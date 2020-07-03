import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, Inject, EventEmitter } from '@angular/core';
import { ModularTableConfig } from './models/ModularTableConfig';
import { ModularTableContent, modularTableInit } from './models/ModularTableContent';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-mod-table',
  templateUrl: './modular-table.component.html'
})
export class ModularTableComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() config = new ModularTableConfig();
  @Input() content = modularTableInit();

  @Output() mapped = new EventEmitter<HTMLDivElement[][]>();

  private header: string[];
  private body: ModularTableContent;
  private footer: string[];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    if (!this.id) {
      throw new Error('É necessário passar um ID para o ModularTableComponent');
    }
    this._change();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._change();
  }

  private _change() {
    const tableSet = this.content;

    this.header = null;
    this.body = null;
    this.footer = null;

    if (this.config.header) {
      this.header = tableSet.shift();
    }
    if (this.config.footer) {
      this.footer = tableSet.pop();
    }
    this.body = tableSet;

    this.map();
  }

  map() {
    const htmlStructure = this.document.getElementById(this.id)
      .querySelector('.table')
      .querySelectorAll('.row') as NodeListOf<HTMLDivElement>;

    const rows: HTMLDivElement[] = [];
    htmlStructure.forEach(el => rows.push(el));

    const map = rows.map(row => {
      const columns = row.querySelectorAll('.col') as NodeListOf<HTMLDivElement>;
      const arr: HTMLDivElement[] = [];
      columns.forEach(col => arr.push(col));
      return arr;
    });

    this.mapped.emit(map);

    const structure: ModularTableContent = [];
    if (this.config.header) {
      structure.concat(this.header.concat([]));
    }
    this.body.forEach(row => structure.concat(row));
    if (this.config.footer) {
      structure.concat([].concat(this.footer));
    }

    return { structure };

  }

}
