import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import {Bodega} from './interfaces/bodega.interface';
import {BodegaService} from './bodega.service'
import {DialogEditComponent} from './dialogs/dialog-edit/dialog-edit.component'

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements AfterViewInit {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Es Propia?', 'Planta', 'Esta activa?', 'Acciones'];
  dataSource = new MatTableDataSource<Bodega>();

  constructor(private bodegaService:BodegaService,
    public dialog: MatDialog){}

  ngOnInit():void{
    this.mostratBodegas();
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
