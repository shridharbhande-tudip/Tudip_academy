import { Injectable, Inject } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientHelper } from '../app.httpClientCall';

import 'rxjs/Rx';
// import localStorage from 'localStorage';

@Injectable()
export class UserService {
  private loginUrl: string = 'api/auth/login';
  private signupUrl: string = 'api/auth/register';
  private viewVisitorUrl:string = 'api/visitors/findAll';

  private httpClient: HttpClientHelper;
  constructor(httpClient: HttpClientHelper,public httpCall:Http) {
    this.httpClient = httpClient;
  
  }

  // For signup service
 
  userLogin(data): Observable<any> {
    return this.httpClient.postPreLogin(this.loginUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }
   getAllVisitor (): Observable<any> {
    
    let url="http://192.168.253.38:8080/api/visitors/findAll";
    console.log("hi view visitors");
    let headers=this.viewVisitorHeader();
    return this.httpCall.get(url,{headers:headers})
        .map(this.extResponse)
        .catch(this.handleError);
  }
viewVisitorHeader():Headers{

   let headers=new Headers();
   headers.append('token',localStorage.getItem('token'));
   return headers;
  }
  userSignup(data): Observable<any> {
      console.log(this.signupUrl);
    return this.httpClient.postPreLogin(this.signupUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  addVisitor (data): Observable<any> {
    let url1 = "http://192.168.253.38:8080/api/visitors/add";
    let headers = new Headers();
    console.log(url1);
    headers.append('Content-Type','application/json');
    headers.append('token',localStorage.getItem('token'));
    return this.httpCall.post(url1, data,{headers:headers})
        .map(this.addvDone)
      .catch(this.handleError);
  }
  deletevis(id): Observable<any> {
      let url = "http://localhost:8080/api/visitors/delete/" + id ;
      console.log(id);
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('token',localStorage.getItem('token'));
      return this.httpCall.delete(url,{headers: headers})
        .map(this.extResponsedelete)
        .catch(this.handleError);
  }
  viewVisitor(): Observable<any> {
    return this.httpClient.get(this.viewVisitorUrl)
      .map(this.extractResponse)
      .catch(this.handleError);
  }
  public extractResponse(res: JSON) {
 let body = res;
    console.log(body);
    return body;
  }
  public extResponsedelete() {
    
  }
 
    public extResponse(res: Response) {
 let body = res;
    console.log(body);
    return body;
  }
  private handleError(error: any) {
    return Observable.throw(error);
  }
  addvDone(){
     console.log("user added");

  }
  updatevisitor(id,result)
  {
     let url="http://atithi.dev.tudip.com/api/visitors/"+id+"?token={"+localStorage.getItem('token')+"}";
      return this.httpCall.post(url, result)
        .map(this.addvDone)
      .catch(this.handleError);

  }
  
}