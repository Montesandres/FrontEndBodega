import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import {Bodega} from './interfaces/bodega.interface';
import {BodegaService} from './bodega.service'
import {DialogEditComponent} from './dialogs/dialog-edit/dialog-edit.component'
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements AfterViewInit {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Es Propia?', 'Planta', 'Esta activa?', 'Acciones'];
  dataSource = new MatTableDataSource<Bodega>();
  upAdcnar = false;
  upMdfcar = false;
  upBrrar = false;
  upLstar = false;

  constructor(private bodegaService:BodegaService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar){}

  ngOnInit():void{
    this.mostratBodegas();
    this.obtenerPermisos();
  }

  obtenerPermisos(){
    this.upAdcnar = localStorage.getItem('upAdcnar') === 'true';
    this.upMdfcar = localStorage.getItem('upMdfcar') === 'true';
    this.upBrrar = localStorage.getItem('upBrrar') === 'true';
    this.upLstar = localStorage.getItem('upLstar') === 'true';
  }

  mostrarDialogoCrear() {
    this.dialog.open(DialogEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe((res)=>{
      if (res === 'creado'){
        this.mostratBodegas();
      }
    })
  }

  mostrarDialogoEditar(bodega:Bodega){
    this.dialog.open(DialogEditComponent,{
      disableClose:true,
      width:"350px",
      data:bodega
    }).afterClosed().subscribe((res)=>{
      if (res === 'editado'){
        this.mostratBodegas();
      }
    })
  }

  mostrarDialogoEliminarBodega(bodega:Bodega){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data:bodega
    }).afterClosed().subscribe((res)=>{
      if (res === 'eliminada'){
        this.bodegaService.delete(bodega.boCdgo).subscribe({
          next:(data)=>{
            this.openAlert("La Bodega fue eliminada",'Listo');
            this.mostratBodegas();
          },
          error:(e)=>(console.log(e))
        })
        this.mostratBodegas();
      }
    })
  }

  
  openAlert(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostratBodegas(){
    this.bodegaService.getList().subscribe({
      next:(data)=>{
        this.dataSource.data = data;
      },error:(e)=>{console.log(e)}
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
