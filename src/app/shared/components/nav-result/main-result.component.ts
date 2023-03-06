import { Component, Input } from '@angular/core';
import { TypesResults } from 'src/app/interfaces/type/TypesResults';

@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent {

  @Input() marcaResults: TypesResults | null = null;
  @Input() valorVeiculo: string = '';
  @Input() statusValor: string = '';
  @Input() statusPercentual: number = 0;
  @Input() loading: boolean = false
  @Input() desfocarGridResults: boolean = false;




  percentual = this.statusPercentual
}
