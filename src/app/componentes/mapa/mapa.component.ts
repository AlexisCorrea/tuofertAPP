import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat=6.2802516;
  lag=-75.62255399999998;
  constructor() { }

  ngOnInit() {
  }

}
