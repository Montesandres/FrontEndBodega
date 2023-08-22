import { Component } from '@angular/core';
import {BodegaService} from './services/bodega.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndBodega';

  constructor(private bodegaService:BodegaService){}

  ngOnInit() {
    this.prueba();
  }

  prueba(){
    console.log(this.bodegaService.getList());
  }
}
