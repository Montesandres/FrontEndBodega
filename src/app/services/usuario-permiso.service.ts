import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioPermiso} from '../interfaces/usuario-permiso.interface';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPermisoService {

  // backUrl = AppSettings.readAppSettings().BACK_URL;
  backUrl = 'http://localhost:5288'
  http = inject(HttpClient)

  constructor() { }

  getList():Observable<UsuarioPermiso[]>{
    return this.http.get<UsuarioPermiso[]>(`${this.backUrl}/usuarioPermiso/lista`);
  }
  
}

