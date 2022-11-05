/*

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class BackendApiProvider {
  url = 'http://127.0.0.1:8000';
  constructor(private toastctrl: ToastController,
    private http: HttpClient,
    private loadingController: LoadingController) { }


  insertData(myData) {
    let header;

    header = new HttpHeaders({
      "Content-Type": "application/json",
      // "Accept": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded",
    });

    return this.http.post(this.url, myData, {
      headers: header,
    });
  }
  insertFormData(Data) {
    let header;

    header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": "corci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%229067b6add23324d21220d8f7d5c649c0%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%2239.40.231.23%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.29.0%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1656587499%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7D87fb653bf23ba596c9ade5a76135fe0a7557093d"
    });
    return this.http.post(this.url, Data, {
      headers: header,
    });
  }
  login(data:{}){
    return
  }

  wpGetData(action, token?) {
    let header;
    if (token) {
      header = new HttpHeaders({
        "Authorization": "Bearer " + token,
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    } else {
      header = new HttpHeaders();
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    }
    return this.http.post(`${this.url}/${action}`, {
      headers: header,
    });
  }
  getData(action, token?) {
    let header;
    if (token) {
      header = new HttpHeaders({
        "auth-key": token,
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS",
      );
    } else {
      header = new HttpHeaders();
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    }
    return this.http.get(`${this.url}/${action}`, {
      headers: header,
    });
  }



  get(url, token) {
    console.log('token in api ervice====', token);
    let headers
    headers = new Headers();
    headers.append("Authorization", "Bearer 39109f7df56e1CORNERStone9e685066bb852");
    return this.http.get(url, {
      headers: headers
    });
  }
  // waGetData(action,token) {
  //   let header;


  //   // if (token) {
  //   //   console.log('token=',token)
  //   //   header = new HttpHeaders({
  //   //     "Authorization": "Bearer "+token,
  //   //   });
  //   //   console.log('jeadwre=',header)
  //   //   header.append("Access-Control-Allow-Origin", "*");
  //   //   header.append(
  //   //     "Access-Control-Allow-Methods",
  //   //     "POST, GET, DELETE, PUT,OPTIONS"
  //   //   );
  //   // } else {
  //   //   header = new HttpHeaders();
  //   //   header.append("Access-Control-Allow-Origin", "*");
  //   //   header.append(
  //   //     "Access-Control-Allow-Methods",
  //   //     "POST, GET, DELETE, PUT,OPTIONS"
  //   //   );
  //   // }
  //   return this.http.post(`${this.url}/${action}`, {
  //     headers: {
  //       "Authorization": "Bearer "+'53|4GA1yxNOLagRRhMYG48FrtG6CnVlon74H5cjMmo9',
  //       "Cookie": "XSRF-TOKEN=eyJpdiI6IjIyeHh0Zm1OSnF0ZFdGMmU4MnBpbHc9PSIsInZhbHVlIjoieTZ4RjVxZjhWZTVRUjh3bUdGRzZBYkhwNTRkODk5SElsWW93bWR1QXFlbHpSaDlTSWhxeXlETzlEQURxZ1pmNTdCWXZIM09JK29rUS9TQk9FU0ZheWlXajVLYk83K3BObldGQVZ2UFV4TVBhRVhYdHpkMFBnUzBldkNhTWpaNjciLCJtYWMiOiI0OWYwMDMwNmU3MjJmMGY3YWUwYjcxOTlkNjM0ZTZhODRhZmYwMGU4NDYwZGE3OGRlOGEyODcyYWRhMTRiYTk0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik1ROUVsalZXcm55WnFNV2Y5Rkd4TFE9PSIsInZhbHVlIjoieG16Y0tnTEN1SmFPUjFxUTBxbUVuMDc5bUNPaysrbXpVc1VuUjA5QjFIMG1aM1FqQkY5WStPY3N5L2RkY0N3bHlVaWcvcS9TbFdqUUR2TFJsaU9PaUsvUHlHdzU5ZUo4S24rT1RxaFJiOW5sdHR5NDFkT3NCTmF0eVlwZmFsTUgiLCJtYWMiOiI1OTRiNjAzYWFhY2U0ZDI5ODVjNGVmMDFjZjMzMzk0YWZhZGRjODFkOGYxZTgzZmM0MGI5YTA0ODhlZWUyNDliIiwidGFnIjoiIn0%3D",
  //       "Content-Type": "application/json"
  //     }
  //   });
  // }

  getCaptcha(token?) {

    let header;
    if (token) {
      header = new HttpHeaders({
        "auth-key": token,
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS",
      );
    } else {
      header = new HttpHeaders({
        // "content-type":"text/html"
      });
      header.append("Access-Control-Allow-Origin", "*");
      header.append(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT,OPTIONS"
      );
    }
    return this.http.get(`${this.url}`, {
      headers: header,
    });
  }


  presenttoast(message) {
    this.toastctrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(res => res.present());
  }

  async showLoader(content?: string) {

    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

}

*/
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

class Token {
  token: string;
}

interface ItemsResponse {
  results: string[];
}

  @Injectable() 
export class BackendApiProvider implements OnInit {
  myToken: string;
  customersObservable: Observable<Token[]>;
  
  
  webAPIUrl = "http://127.0.0.1:8000";
  constructor(
    private http: HttpClient
    ) {
    this.ngOnInit();
  }

  ngOnInit() {
     console.log('pasa');
  }
  login(userData:{}, includeAuth:boolean=true){
    const endpoint = `${this.webAPIUrl}`
    const options = this.getHttpOptions(includeAuth)
    
    //"/api/auth/token-auth-cl/", userData, false
    this.http.get(this.webAPIUrl + '/api/auth/token-auth-cl/' ,options ).subscribe(data => {
      console.log(data.constructor); // OK, data is an instance of ItemsResponse
    //  console.log(data.test); // Linter & compiler error, test is not a property of ItemsResponse
    
    });
    return;
  ;
  }
  getUseHttpClientGetMethod() {
    const params = new HttpParams().set('_page', "1").set('_limit', "2");
    this.customersObservable = this.http.get<Token[]>(this.webAPIUrl, { params });
  }

  GetCustomerByHttpClient_RequestMethod_withParaFromString() {
    const params = new HttpParams({ fromString: '_page=1&_limit=1' });

    this.customersObservable = this.http
      .request<Token[]>("GET", this.webAPIUrl,
      {
        responseType: "json",
        params
      });
  }

  getHttpOptions(includeAuth:boolean=true){
    let myDefaultHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
    if (this.myToken && includeAuth){
      myDefaultHeaders['Authorization'] = `Token ${this.myToken}`
    }
    const httpOptions = {
        headers: new HttpHeaders(myDefaultHeaders)
    }
    return httpOptions
}

  GetCustomerWithHttpHeaders() {
    const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    this.customersObservable = this.http.get<Token[]>(this.webAPIUrl, { headers });
  }

  PostWithParaToken() {
    this.http.post(this.webAPIUrl+"/api/auth/token-auth-cl/",
    {
      "username": "lguerrero",
      "password": "anto1013",
    })
      .subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.http
        .get<Token[]>(this.webAPIUrl);
  }
  PatchWithPara() {
    this.http.patch(this.webAPIUrl+"/1",
      {
        "email": "newcustomer001@email.com"
      })
      .subscribe(
      data => {
        console.log("PUT Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.http
        .get<Token[]>(this.webAPIUrl);
  }
  DeleteWithPara() {
    this.http.delete(this.webAPIUrl+"/1")
      .subscribe(
      data => {
        console.log("PATCH Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.http
        .get<Token[]>(this.webAPIUrl);
  }
  PostWithPara(path,includeAuth:boolean=true) {

   
    const endpoint = `${this.webAPIUrl}${path}`
    const options = this.getHttpOptions(includeAuth)
   
    this.http.post(this.webAPIUrl,
      {
        "username": "lguerrero",
        "password": "anto1013",
      })
      .subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
      );
      this.customersObservable = this.http
        .get<Token[]>(this.webAPIUrl);
  }
}

