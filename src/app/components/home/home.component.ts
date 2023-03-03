import { Component, Input, OnInit } from '@angular/core';
import { TypesMarcas } from 'src/app/interfaces/type/TypesMarcas';
import { TypesResults } from 'src/app/interfaces/type/TypesResults';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  ngOnInit() {
  }

}
