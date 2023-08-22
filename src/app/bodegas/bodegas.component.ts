import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import {Bodega} from './interfaces/bodega.interface';
import {BodegaService} from './bodega.service'

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements AfterViewInit {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Es Propia?', 'Planta', 'Esta activa?', 'Acciones'];
  dataSource = new MatTableDataSource<Bodega>();

  constructor(private bodegaService:BodegaService){}

  ngOnInit():void{
    this.mostratEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostratEmpleados(){
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
