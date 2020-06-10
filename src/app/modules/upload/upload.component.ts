import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    public config: any;

    public file: any;

    public strategies: any[] = [
        { id: 0, name: 'A'},
        { id: 1, name: 'B'},
        { id: 2, name: 'C'},
        { id: 3, name: 'D'},
    ];

    constructor() { }

    public send() { }

    ngOnInit() { }

}
