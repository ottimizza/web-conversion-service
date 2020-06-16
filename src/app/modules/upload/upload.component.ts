import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversionService } from '@app/http/conversion.service';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    public currentPage: 'upload' | 'preview' = 'upload';

    @ViewChild('fileInput')
    public fileInputElement: ElementRef;

    public file: File;

    public conversions: Array<any> = new Array<any>();

    public content: string;

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

    public upload() {
        const config = window.localStorage.getItem("config");
        this.conversion.upload(this.file, config).subscribe((response) => {
            // this.store(this.file.name, response);
            this.content = response;
            this.download(response)
        });
    }

    private download(data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
    }


    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
