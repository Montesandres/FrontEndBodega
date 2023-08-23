import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bodega } from '../../interfaces/bodega.interface';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public datosBodega: Bodega
  ){}

  deleteConfirm(){
    if (this.datosBodega){
      this.dialogoReferencia.close('eliminada');
    }
  }

}
