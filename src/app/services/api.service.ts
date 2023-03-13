import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  prefijo="api";
  nodo="CapacidadServicio/api";

  constructor(private _httpClient: HttpClient) { }

  getQuery(_nombreQuery:string,_paramsQuery:string){
    const nombreQuery = _nombreQuery;
    const paramsQuery = _paramsQuery?`?${_paramsQuery}`:``;
    return this._httpClient.get(`${environment.apiUrl}/${this.nodo}/${nombreQuery}${paramsQuery}`);
  }

  postQuery(_nombreQuery:string,_paramsQuery:string,_dataQuery:any){
    const nombreQuery = _nombreQuery;
    const paramsQuery = _paramsQuery?`?${_paramsQuery}`:``;
    return this._httpClient.post(`${environment.apiUrl}/${this.nodo}/${nombreQuery}${paramsQuery}`,_dataQuery);
  }

  putQuery(){}
  deleteQuery(){}
}
