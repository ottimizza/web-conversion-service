import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConversionService {

    public api: string = 'https://api-conversion-service.herokuapp.com';

    constructor(public http: HttpClient) {}

    public upload(file: File, opts: any): Observable<any> {
        const url = `${this.api}/api/v1/conversions/upload`;
        const form = this.buildFormData(file, opts);

        return this.http.post(url, form, { responseType: 'text'});
    }

    public buildFormData(file: File, opts: any) {
        let formData = new FormData()
        formData.append('file', file);
        formData.append('opts', opts);
        return formData;
    }

}