import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bungalow } from '../models/bungalow';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment.prod';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BungalowService {

  constructor(private httpClient : HttpClient) { }

  getBungalows() : Observable<Bungalow[]> {
    return this.httpClient.get<Bungalow[]>(environment.apiUrl + '/bungalows');
  }

  uploadFile( file: File , id : number ) : Observable<any>  
  {  
    let url = environment.apiUrl + "/uploadImage/" + id ;  
  
    const formdata: FormData = new FormData();  
    
    formdata.append('file', file);  
   
    return this.httpClient.post(url , formdata);  
  }  

  sendBungalow(bungalow:Bungalow) {
    let url = environment.apiUrl + '/bungalow'
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(url, JSON.stringify(bungalow),httpOptions);
    //return this.httpClient.post(url, JSON.stringify(bungalow));
  }

  getBungalow(id: number) : Observable<Bungalow> {
    return this.httpClient.get<Bungalow[]>(environment.apiUrl + '/bungalows').pipe(
      map(bungalows => bungalows.find(bungalow => bungalow.id === id))
    );
  }
}
