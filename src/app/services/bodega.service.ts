import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bodega} from '../interfaces/bodega.interface';
import { AppSettings } from 'appsettings-json-reader';


@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  // backUrl = AppSettings.readAppSettings().BACK_URL;
    backUrl = 'http://localhost:5288'
  http = inject(HttpClient)

  constructor() { }

  getList():Observable<Bodega[]>{
    console.log(this.backUrl)
    return this.http.get<Bodega[]>(`${this.backUrl}/bodega/lista`);
  }

  add(modelo:Bodega):Observable<Bodega>{
    return this.http.post<Bodega>(`${this.backUrl}/bodega/guardar`,modelo);
  }

  update(CodBodega:string,modelo:Bodega):Observable<Bodega>{
    return this.http.put<Bodega>(`${this.backUrl}/bodega/actualizar/${CodBodega}`,modelo)
  }

  delete(CodBodega:string):Observable<void>{
    return this.http.delete<void>(`${this.backUrl}/bodega/eliminar/${CodBodega}`);
  }
}
