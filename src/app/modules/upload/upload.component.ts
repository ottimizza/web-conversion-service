import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConversionService } from '@app/http/conversion.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastService } from '@app/services/toast.service';

export interface IFileInputStatus {
    name: string;
    value: string;
}

export enum FileInputStatus {
    WAITING = 0,
    UPLOADING = 1,
    CONVERTING = 2,
    DOWNLOADING = 3,
    FINISHED = 4
}

export class FileInput {
    name: string;
    file: File;
    status: FileInputStatus;
    percentage = 0;

    conversionStatus: 'waiting' | 'processing' | 'finished';
    conversionResult: string;
    conversionName: string;

    public statusText() {
        switch (this.status) {
            case FileInputStatus.WAITING:
                return 'Aguardando';
            case FileInputStatus.UPLOADING:
                return 'Enviando';
            case FileInputStatus.CONVERTING:
                return 'Convertendo';
            case FileInputStatus.DOWNLOADING:
                return 'Baixando';
            case FileInputStatus.FINISHED:
                return 'Finalizado';
        }
    }
}

export interface FileInputMap { [key: string]: FileInput; }

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

    objectKeys = Object.keys;

    public currentPage: 0 | 1 = 0;

    @ViewChild('fileInput')
    public fileInputElement: ElementRef;

    @ViewChild('container')
    public contentElement: ElementRef;

    public sideIsOpened = false;

    public conversions: Array<any> = new Array<any>();

    public content: string;

    public percentage = 0;

    // Objeto contendo todos os arquivos selecionados para conversão.
    // Chave é nome do arquivo, valor são os dados do arquivo.
    public files: any = {};

    constructor(private conversion: ConversionService, private toast: ToastService) { }

    public toggleConfiguration() {
        this.contentElement.nativeElement.classList.toggle('hidden');
    }

    public get(filename: string): FileInput {
        return this.files[filename] as FileInput || new FileInput();
    }

    public remove(filename: string): void {
        delete this.files[filename];
    }

    public preview(filename: string): void {
        this.content = this.get(filename).conversionResult;
        this.currentPage = 1;
    }

    public download(filename: string) {
        const blob = new Blob([this.get(filename).conversionResult], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // window.open(url, '_blank');
        const element = document.createElement('a');
        element.href = url;
        element.download = this.get(filename).conversionName;
        document.body.appendChild(element);
        element.click();
    }

    public reupload(filename: string): void {
        this.get(filename).status = FileInputStatus.WAITING;
        this.get(filename).percentage = 0;
        this.get(filename).conversionResult = '';
        this.get(filename).conversionStatus = 'waiting';

        this.upload(filename);
    }




    public onFileChanged(event) {
        [...this.fileInputElement.nativeElement.files]
            .forEach((inputFile: File) => {
                this.files[inputFile.name] = {
                    name: inputFile.name,
                    file: inputFile,
                    status: FileInputStatus.WAITING,
                    conversionStatus: 'waiting'
                } as FileInput;
            });
        this.fileInputElement.nativeElement.value = '';
    }

    public percentageValue(filename: string) {
        return this.get(filename).percentage || 0;
    }
    public statusText(filename: string, status: FileInputStatus): string {
        switch (status) {
            case FileInputStatus.WAITING:
                return 'Aguardando';
            case FileInputStatus.UPLOADING:
                return 'Enviando';
            case FileInputStatus.CONVERTING:
                return 'Convertendo';
            case FileInputStatus.DOWNLOADING:
                return 'Baixando';
            case FileInputStatus.FINISHED:
                return 'Finalizado';
        }
    }



    public upload(filename: string) {
        const config = window.localStorage.getItem('config');

        const fileInput: FileInput = this.get(filename);
        this.get(filename).conversionStatus = 'processing';

        this.conversion.upload(fileInput.file, config).subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentage = Math.round(30 * event.loaded / event.total);

                this.get(filename).status = FileInputStatus.UPLOADING;
                this.get(filename).percentage = percentage;

                if (percentage === 30) {
                    this.get(filename).status = FileInputStatus.CONVERTING;
                }
            } else if (event.type === HttpEventType.DownloadProgress) {
                const percentage = Math.round(100 * event.loaded / event.total);

                this.get(filename).status = FileInputStatus.DOWNLOADING;
                this.get(filename).percentage = percentage;
            } else if (event.type === HttpEventType.ResponseHeader) {
                const percentage = Math.round(60 * event.loaded / event.total);

                this.get(filename).status = FileInputStatus.CONVERTING;
                this.get(filename).percentage = percentage;
            } else if (event instanceof HttpResponse) {
                this.get(filename).status = FileInputStatus.FINISHED;

                this.get(filename).conversionStatus = 'finished';
                this.get(filename).conversionResult = event.body;
                this.get(filename).conversionName = filename.replace('.pdf', '.csv').replace('.PDF', '.csv');

                const body = JSON.parse(event.body);
                if (body.error) {
                  this.toast.show(`Falha ao converter arquivo: ${body.error}!`, 'danger');
                }
            }
        }, err => {
          this.toast.show('Falha ao converter arquivo!', 'danger');
          throw err;
        });
    }

    private downloadb(data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    }


    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) { return '0 Bytes'; }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    //
    //
    // F
    private store(filename: string, content: string) {
        window.localStorage.setItem(filename, content);
    }

}
