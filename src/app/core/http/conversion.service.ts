import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env';

const BASE_URL = `${environment.storageBaseUrl}`;

@Injectable({
    providedIn: 'root'
})
export class ConversionService {

  constructor(public http: HttpClient) { }

  public upload(file: File, opts: any): Observable<any> {
    const url = `${BASE_URL}/api/v1/conversions/upload`;
    const form = this._buildFormData(file, opts);

    return this.http.post(url, form, {
      responseType: 'text', reportProgress: true,
      observe: 'events'
    });
  }

  private _buildFormData(file: File, opts: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('opts', opts);
    return formData;
  }

}
