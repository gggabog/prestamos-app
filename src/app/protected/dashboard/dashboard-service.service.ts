import { Cliente, ClienteElement, Clientes } from './interfaces/clienteInterface';
import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  private baseUrl: string = environment.baseUrl;
  private _clientes;
  private _cliente;

  get Cliente(){
    return {...this._cliente};
  }
  get Clientes(){
    return {...this._clientes};
  }

  constructor(private http: HttpClient) { }

  getAll(ruta){
    const url = `${this.baseUrl}/${ruta}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if (resp) {
          return resp;
          }
        }
      )
    );
  }

  getTables(ruta){
    const url = `${this.baseUrl}/${ruta}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if (resp) {
          return resp;
          }
        }
      )
    );
  }

  get(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if (resp) {
          return resp;
          }
        }
      )
    );
  }

  add(body,ruta){
    const url = `${this.baseUrl}/${ruta}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.post<any>(url, body, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  put(body,ruta,id){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.put<any>(url, body, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  delete(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.delete<any>(url, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  addPrestamo(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }
  negarPrestamo(id,ruta){
    const url = `${this.baseUrl}/${ruta}/${id}`;
    const headers = new HttpHeaders()
    .set('Authorization','Bearer '+localStorage.getItem('access_token')||'');
    return this.http.get<any>(url, {headers}).pipe(
      tap(resp=>{
        if(resp){
          return resp;
        }
      })
    );
  }

  public downloadPDF(ruta): any {
    const mediaType = 'application/pdf';
    const url = `${this.baseUrl}/${ruta}`;
    this.http.post(url, {location: 'report.pdf'}, { responseType: 'blob' }).subscribe(
        (response) => {
            const blob = new Blob([response], { type: mediaType });
            saveAs(blob, ruta === 'pdfPayments' ? 'pagos.pdf' : 'prestamos.pdf');
        },
        e => { throwError(e); }
    );
}
 public invoice(id,ruta): any{
  const mediaType = 'application/pdf';
  const url = `${this.baseUrl}/${ruta}/${id}`;
  this.http.post(url, {location: 'invoice.pdf'}, { responseType: 'blob' }).subscribe(
      (response) => {
          const blob = new Blob([response], { type: mediaType });
          saveAs(blob, 'factura_'+id+'.pdf');
      },
      e => { throwError(e); }
  );
 }

}
