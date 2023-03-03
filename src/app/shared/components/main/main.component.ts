import { Component, Input, OnInit } from '@angular/core';
import { TypesResults } from 'src/app/interfaces/type/TypesResults';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  resultados: TypesResults[] = []



  ngOnInit() {
  }
  testeForm() {
    console.log(this.resultados)
  }

}
