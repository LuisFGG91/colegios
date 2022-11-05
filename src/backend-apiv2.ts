import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// observables - async

const ROOT_ENDPOINT = 'http://127.0.0.1:8000'

//http://127.0.0.1:8000/api/auth/login/

@Injectable()
export class BackendApiProvider {
  
  

  constructor(public http:HttpClient , private storage: Storage) {
    console.log('Hello BackendApiProvider Provider');
    
    this.storage.get('authToken').then((val)=>{
      val = 'e6a5546d5c80ca9d397d4c0de58bc09946fdcef2'
      this.myToken = val
    })


  }
  getHttpOptions(includeAuth:boolean=true){
      let myDefaultHeaders = {
          'Content-Type': 'application/json',
      }
      if (this.myToken && includeAuth){
        myDefaultHeaders['Authorization'] = `Token ${this.myToken}`
      }
      const httpOptions = {
          headers: new HttpHeaders(myDefaultHeaders)
      }
      return httpOptions
  }

  login(userData:{}){

      return this.post("/api/auth/token-auth-cl/", userData, false)
  }


  get(path, includeAuth:boolean=false){
      const endpoint = `${ROOT_ENDPOINT}${path}`
      const options = this.getHttpOptions(includeAuth)
      return this.http.get(endpoint, options)
  }

  postWithImage(path, data:{}, imageFile?:File){
     const endpoint = `${ROOT_ENDPOINT}${path}`
     const options = {
         'reportProgress': true,
         'headers': new HttpHeaders(
          {'Authorization': `Token ${this.myToken}`})
     }
     const myFormData = new FormData()
     if (data){
       for (var key in data){
         myFormData.append(key, data[key])
       }
     }
     if (imageFile){
       myFormData.append('image', imageFile, imageFile.name)
     }
     const req = new HttpRequest("post", endpoint, myFormData, options)
     return this.http.request(req)
  }


  post(path, data:{}, includeAuth:boolean=true){

    const endpoint = `${ROOT_ENDPOINT}${path}`
    const options = this.getHttpOptions(includeAuth)
    return this.http.post(endpoint, [ {"username": "lguerrero", "password": "anto1013"} ], options)
}
   put(path, data:{}, includeAuth:boolean=true){
        const endpoint = `${ROOT_ENDPOINT}${path}`
      const options = this.getHttpOptions(includeAuth)
      return this.http.put(endpoint, data, options)
  }
  
}