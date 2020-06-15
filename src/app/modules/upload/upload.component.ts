import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversionService } from 'src/app/core/http/conversion.service';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


    @ViewChild('fileInput')
    public fileInputElement: ElementRef;

    public config: any;

    public file: File;

    public opts: any = {
        delimiter: ";",
        pages: "[0,1,2-5]",
        trim: true,
        shrink: false
    };

    public strategies: any[] = [
        { id: 0, name: 'A' },
        { id: 1, name: 'B' },
        { id: 2, name: 'C' },
        { id: 3, name: 'D' },
    ];

    public conversions: Array<any> = new Array<any>();

    constructor(
        private conversion: ConversionService
    ) { }

    public onFileChanged(event) {
        try {
            this.file = this.fileInputElement.nativeElement.files[0];
        } finally {
            this.fileInputElement.nativeElement.value = "";
        }
        console.log(this.file);

    }

    public delimiter(delimiter: string) {
        this.opts.delimiter = delimiter;
        console.log(this.opts.delimiter);

    }

    public upload() {
        this.conversion.upload(this.file, JSON.stringify(this.opts)).subscribe((response) => {
            this.store(this.file.name, response);
            this.download(response)
        });
    }

    private download(data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    // 
    // 
    //
    private get() {
        for (let i = 0; i < window.localStorage.length; i++) {
            this.conversions.push(window.localStorage.key(i));
        }
    }
    private store(filename: string, content: string) {
        window.localStorage.setItem(filename, content);
    }

    ngOnInit() {
        this.get();
    }

}
