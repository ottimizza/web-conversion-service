import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

    @Input("content")
    public content;

    public delimiter = "|";

    public preview: string;

    constructor(
    ) { }

    public refresh() {
        const content = this.content;
        let html: string = '<table class="table table-bordered table-hover">';

        const rows: string[] = content.split("\n");

        for (let row of rows) {
            html += "<tr>";
            const cols = row.split(this.delimiter);

            for (let col of cols) {
                html += "<td>";
                html += col;
                html += "</td>";
            }

            html += "</tr>";
        }
        html += "</table>";

        this.preview = html;

    }

    ngOnInit() {
        this.refresh();
    }

}
