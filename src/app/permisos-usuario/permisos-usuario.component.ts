import { Component, inject } from '@angular/core';
import { UsuarioPermisoService } from './usuario-permiso.service';
import { UsuarioPermiso } from './interfaces/usuario-permiso.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos-usuario',
  templateUrl: './permisos-usuario.component.html',
  styleUrls: ['./permisos-usuario.component.css'],
})
export class PermisosUsuarioComponent {
  permisosUsuarioService = inject(UsuarioPermisoService);
  route = inject(Router);
  listaPermisos: UsuarioPermiso[] = [];

  ngOnInit(): void {
    this.mostrarPermisos();
  }

  selectionForm = new FormGroup({
    selection: new FormControl<string>('', [Validators.required]),
  });

  mostrarPermisos() {
    this.permisosUsuarioService.getList().subscribe({
      next: (data) => {
        this.listaPermisos = data;
        console.log(this.listaPermisos);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  acceder() {
    const selection = this.selectionForm.value.selection;
    const found = this.listaPermisos.find(
      (permiso) => permiso.upRowid.toString() === selection
    ) ?? {
      upRowid: 0,
      upAdcnar: false,
      upMdfcar: false,
      upBrrar: false,
      upLstar: false,
    };

    localStorage.setItem('upAdcnar', found.upAdcnar.toString());
    localStorage.setItem('upMdfcar', found.upMdfcar.toString());
    localStorage.setItem('upBrrar', found.upBrrar.toString());
    localStorage.setItem('upLstar', found.upLstar.toString());

    this.route.navigate(['bodegas']);
  }
}
