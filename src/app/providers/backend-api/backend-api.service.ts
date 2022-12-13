
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
    webAPIUrl = ' http://127.0.0.1:8000';

    constructor(
      private http: HttpClient

      ) {
      this.ngOnInit();
    }

    ngOnInit() {
      console.log('pasa');
    }

    getAll():Observable<any>{
      return this.http.get<any>(this.webAPIUrl+'/api/auth/token-auth-cl/');
    }


    login(credentials) {
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders();
          headers.append('Content-Type', 'application/json');
          var request = { "username": "lguerrero", "password": "anto1013" };
          this.http.post(this.webAPIUrl+'/api/auth/token-auth-cl/', request, {headers: headers})
          .subscribe(
            response => {
              resolve(response);
            },
            exception => {
              reject(exception);
            }
          );
      });
    }

    register(data) {
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders();
          headers.append('Content-Type', 'application/json');
          this.http.post(this.webAPIUrl+'guest/signup', JSON.stringify(data), {headers: headers})
          .subscribe(
            response => {
              resolve(response);
            },
            exception => {
              reject(exception);
            }
          );
      });
    }

    logout(){
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders();
          headers.append('X-Auth-Token', localStorage.getItem('token'));
          this.http.post(this.webAPIUrl+'logout', {}, {headers: headers})
          .subscribe(
            response => {
              resolve(response);
            },
            exception => {
              reject(exception);
            }
          );
      });
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

