import { Component, Input, ElementRef, ViewChild, OnInit, Output, EventEmitter } from "@angular/core";
import { FileInput, FileInputStatus, FileInputMap } from '@modules/upload/upload.component';

@Component({
    selector: 'app-files-table',
    templateUrl: './files-table.component.html',
    styleUrls: ['./files-table.component.scss']
})
export class FilesTableComponent implements OnInit {

    public keys = Object.keys;

    @ViewChild('table')
    tableElement: ElementRef;

    @Input('inputFiles')
    inputFiles: FileInputMap;


    @Output('download')
    onDownload: EventEmitter<string> = new EventEmitter<string>();

    @Output('upload')
    onUpload: EventEmitter<string> = new EventEmitter<string>();;

    @Output('preview')
    onPreview: EventEmitter<string> = new EventEmitter<string>();;

    @Output('remove')
    onRemove: EventEmitter<string> = new EventEmitter<string>();;


    constructor() { }

    get(filename: string): FileInput {
        return <FileInput>this.inputFiles[filename] || new FileInput();
    }

    //
    //
    //
    remove(filename: string): void {
        this.onRemove.emit(filename);
    }

    upload(filename: string): void {
        this.onUpload.emit(filename);
    }

    download(filename: string): void {
        this.onDownload.emit(filename);
    }

    preview(filename: string): void {
        this.onPreview.emit(filename);
    }

    //
    //
    //
    formatBytes(filename: string, decimals = 2): string {
        let bytes = this.get(filename).file.size
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    formatName(filename: string): string {
        return filename;
    }

    formatPercentage(filename: string): number {
        return this.get(filename).percentage || 0;
    }

    formatStatus(filename: string): string {
        const fileInput = this.get(filename);
        switch (fileInput.status) {
            case FileInputStatus.WAITING:
                return "Aguardando";
            case FileInputStatus.UPLOADING:
                return "Enviando";
            case FileInputStatus.CONVERTING:
                return "Convertendo";
            case FileInputStatus.DOWNLOADING:
                return "Baixando";
            case FileInputStatus.FINISHED:
                return "Finalizado";
        }
        return '';
    }

    isWaiting(filename: string): boolean {
        return this.get(filename).conversionStatus === 'waiting';
    }

    isProcessing(filename: string): boolean {
        return this.get(filename).conversionStatus === 'processing';
    }

    isFinished(filename: string): boolean {
        return this.get(filename).conversionStatus === 'finished';
    }

    ngOnInit() { }

}
