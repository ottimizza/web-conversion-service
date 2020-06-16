import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public async setItem(key: string, value: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve(window.localStorage.setItem(key, JSON.stringify(value)));
        }).then(() => {
            return this.getItem(key);
        });
    }

    public async getItem(key: string, defaultValue: any = null) {
        return new Promise<any>((resolve, reject) => {
            resolve(window.localStorage.getItem(key));
        }).then((value) => {
            return !!value ? value : defaultValue;
        });
    }

}