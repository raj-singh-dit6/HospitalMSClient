import {RequestOptions, Headers} from '@angular/http';

export class FetchRequestOptions{

    public static getRequestOptions(): RequestOptions {
        let sessionKey = localStorage.getItem('sessionKey');
        let user = JSON.parse(localStorage.getItem('user')) || { username: '' };
        let username = user['userName'];
        let options = new RequestOptions({
        headers: new Headers({
            'Authorization': username + ';' + sessionKey,
            'content-type': 'application/json'
        })
        });
        return options;
        } 
}