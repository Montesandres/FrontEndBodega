import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bodega } from '../../interfaces/bodega.interface';
import { BodegaService } from '../../bodega.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
})
export class DialogEditComponent {
  formBodega: FormGroup;
  tituloAccion: string = 'Nueva Bodega';
  botonAccion: string = 'guardar';
  listaBodegas: Bodega[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private bodegaService: BodegaService,
    @Inject(MAT_DIALOG_DATA) public datosBodega: Bodega
  ) {
    this.formBodega = this.fb.group({
      descripcion: ['', Validators.required],
      propia: [false, Validators.required],
      planta: ['', Validators.required],
      activa: [false, Validators.required],
    });

    this.bodegaService.getList().subscribe({
      next: (dataResponse) => {
        this.listaBodegas = dataResponse;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    if (this.datosBodega) {
      this.formBodega.patchValue({
        descripcion: this.datosBodega.boDscrpcion,
        propia: this.datosBodega.boPrpia == true ? 1 : 0,
        planta: this.datosBodega.boPlnta,
        activa: this.datosBodega.boActva,
      });

      this.tituloAccion = 'Editar Bodega';
      this.botonAccion = 'Actualizar';
    }
  }

  openAlert(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addBodega() {
    const code = this.generateCode(this.formBodega.value.descripcion);

    const modelo: Bodega = {
      boCdgo: code,
      boDscrpcion: this.formBodega.value.descripcion,
      boActva: this.formBodega.value.activa == '1' ? true : false,
      boPlnta: this.formBodega.value.planta,
      boPrpia: this.formBodega.value.propia == '1' ? true : false,
    };

    if (this.datosBodega == null) {
      this.bodegaService.add(modelo).subscribe({
        next: (dataResponse) => {
          this.openAlert('Bodega Creada', 'Listo');
          this.dialogoReferencia.close('creado');
        },
        error: (e) => {
          this.openAlert('Error al crear Bodega', 'Error');
          console.log(e);
        },
      });
    } else {
      this.bodegaService.update(this.datosBodega.boCdgo, modelo).subscribe({
        next: (dataResponse) => {
          this.openAlert('Bodega fue editada con éxito', 'Listo');
          this.dialogoReferencia.close('editado');
        },
        error: (e) => {
          this.openAlert('Error al editar Bodega', 'Error');
          console.log(e);
        },
      });
    }
  }

  generateCode(cadena: string): string {
    const seed = cadena.substring(0, 3);
    const x = Math.floor(Math.random() * 1000);
    return seed + x;
  }
}
