import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
//import { AuthenticationHelper } from "./app.authentication";
import {Router, ActivatedRoute} from '@angular/router';
@Injectable()
export class HttpClientHelper {

    // baseUrl: String = 'http://atithi.dev.tudip.com/';
    baseUrl: String = 'http://192.168.253.38:8080/';

    constructor(private http: Http, private router: Router) {
        this.http = http;
    }

    createAuthorizationHeader(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', localStorage.getItem('token'));
        return headers;
    }

    get(url): Observable<any> {
        url = this.baseUrl + url;
        let headers = new Headers();
        headers.append('token',localStorage.getItem('token'));
        return this.http.get(url, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    postPreLogin(url, data): Observable<any> {
        let body = JSON.stringify(data);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleErrorPreLogin);
    }

    post(url, data): Observable<any> {
        let body = JSON.stringify(data);
        let headers = new Headers();
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }


    postByHeader(url, data, header): Observable<any> {
        let body = JSON.stringify(data);
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: header})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    postByHeaderPreLogin(url, data, header): Observable<any> {
        let body = JSON.stringify(data);
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: header})
            .map(this.extractResponse)
            .catch(this.handleErrorPreLogin);
    }

    private extractResponse(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: Response): Observable<any> {
        let result = error.json();
        if (!result || !result.error_message) {
            result.error_message = 'Unexpected Error Occured at server';
        }
        else {
            if (result.error_code == '102' || result.error_code == '103') {
                this.router.navigate(['pages']);
            }
        }
        return Observable.throw(result || 'Server error');
    }

    private handleErrorPreLogin(error: Response): Observable<any> {
        let result = error.json();
        if (!result || !result.error_message) {
            result.error_message = 'Unexpected Error Occured at server';
        }
        return Observable.throw(result || 'Server error');
    }

}
