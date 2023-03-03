import { Component, Input } from '@angular/core';
import { TypesAnos } from 'src/app/interfaces/type/TypesAnos';
import { TypesMarcas } from 'src/app/interfaces/type/TypesMarcas';
import { TypesModelos } from 'src/app/interfaces/type/TypesModelos';
import { TypesResults } from 'src/app/interfaces/type/TypesResults';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  listaVeiculos = [{nome: "Carros"}, {nome: "Motos"}, {nome: "Caminhoes"}];
  marcas: TypesMarcas[] = [];
  modelos: TypesModelos[] = []
  anos: TypesAnos[] = []
  marcaResults: TypesResults | null = null;

  tipoVeiculoSelect: string = ''
  tipoMarcaloSelect: string = ''
  tipoModelSelect: number = 0
  tipoAnoloSelect: string = ''

  valorInput: string = 'R$' + ''
  valorVeiculo: string = '';
  statusValor: string = '';

  valorFIPE:string = '';

  loading = false;

  constructor(private apiService: ApiService) { }




  ngOnInit(): void {
  }

  onMarcaVeiculoChange(event: any): void {
    const tipoVeiculoSelecionado = event?.target?.value;
    this.tipoVeiculoSelect = tipoVeiculoSelecionado

    if (tipoVeiculoSelecionado) {
      this.apiService.getMarca(tipoVeiculoSelecionado)
        .subscribe(data => {
          this.marcas = data;
        });
    }

  }

  onModeloVeiculoChange(event: any): void {
    const codMarca = event.target.value;
    this.tipoMarcaloSelect = codMarca

    if (codMarca) {
      this.apiService.getModeloVeiculo(this.tipoVeiculoSelect, codMarca)
        .subscribe(data => {
          this.modelos = data.modelos;
        });
    }
  }

  onAnoVeiculoChange(event: any): void {
    const codModelo = event.target.value;
    this.tipoModelSelect = codModelo

    if (codModelo) {
      this.apiService.getAnoVeiculo(this.tipoVeiculoSelect, this.tipoMarcaloSelect, codModelo)
        .subscribe(data => {
          this.anos = data;
        });
    }
  }

  onResultsVeiculoChange(event: any): void {
    const codAno = event.target.value;
    this.tipoAnoloSelect = codAno

  }

  onButtonClick() {
    this.loading = true

    this.apiService.getResultados(this.tipoVeiculoSelect, this.tipoMarcaloSelect, this.tipoModelSelect, this.tipoAnoloSelect)
    .subscribe(res => {
      this.marcaResults = res
      this.valorFIPE = res.Valor
    });


    setTimeout(() => {
      const inputValor = document.querySelector('#exampleFormControlInput1') as HTMLInputElement;
      const valor = inputValor.value;
      const calcV = parseFloat(valor.replace(",", "."));
      const valorVenda = parseFloat(this.valorFIPE.replace("R$", "").replace(",", "."));
      console.log(calcV)

      const percentual = ((calcV - valorVenda) / valorVenda) * 100;
      if(percentual > 2) {
        this.statusValor = `Valor acima do mercado: ${percentual.toFixed(1)}%`
      } else if(percentual < -2) {
        this.statusValor = `Valor abaixo do mercado: ${Math.abs(percentual).toFixed(1)}%`
      } else {
        this.statusValor = `Valor dentro da média do mercado: ${Math.abs(percentual).toFixed(1)}%`
      }
      this.valorVeiculo = valor
      this.loading = false;

    }, 2000);



  }

  calcular() {


  }








}

