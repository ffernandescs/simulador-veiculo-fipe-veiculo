import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  statusPercentual: string = '';

  valorFIPE:string = '';

  loading: boolean = false;

  formEnviado: boolean = false;

  select2Ativa: boolean = false;

  momentForm!: FormGroup;


  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }
  onMomentForm() {
    this.momentForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      marca: [{value: '', disabled: true}, Validators.required],
      modelo: [{value: '', disabled: true}, Validators.required],
      ano: [{value: '', disabled: true}, Validators.required],
      valor: [{value: '', disabled: true}, Validators.required],
    });
  }
  ngOnInit(): void {
    this.onMomentForm()
    this.onEnableDisableItemForm()

  }

  resetSelects() {
    this.momentForm.get('tipo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('marca')?.enable();
      } else {
        this.momentForm.get('marca')?.disable();
        this.momentForm.get('modelo')?.disable();
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('valor')?.disable();
        this.momentForm.get('marca')?.setValue('');
        this.momentForm.get('modelo')?.setValue('');
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.setValue('');
      }
    });

    console.log('Ola Mundao')
  }


  onEnableDisableItemForm(){
    this.resetSelects()
    this.momentForm.get('marca')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('modelo')?.enable();
      } else {
        this.momentForm.get('modelo')?.disable();
      }

    });
    this.momentForm.get('modelo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('ano')?.enable();
      } else {
        this.momentForm.get('ano')?.disable();
      }
    });
    this.momentForm.get('ano')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('valor')?.enable();
      } else {
        this.momentForm.get('valor')?.disable();
      }
    });
  }


  get tipo() {
    return this.momentForm.get('tipo')
  }

  get marca() {
    return this.momentForm.get('marca')!
  }

  get modelo() {
    return this.momentForm.get('modelo')!
  }

  get ano() {
    return this.momentForm.get('ano')!
  }

  get valor() {
    return this.momentForm.get('valor')!
  }

  onMarcaVeiculoChange(event: any): void {
    const tipoVeiculoSelecionado = event?.target?.value;
    this.tipoVeiculoSelect = tipoVeiculoSelecionado

    if (tipoVeiculoSelecionado) {
      this.apiService.getMarca(tipoVeiculoSelecionado)
        .subscribe(data => {
          this.marcas = data;
        })
    }

    this.select2Ativa = true;
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

  calcResult() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      const inputValor = document.querySelector('#valor') as HTMLInputElement;
      const valor = inputValor.value;
      const calcV = parseFloat(valor.replace(",", "."));
      const valorVenda = parseFloat(this.valorFIPE.replace("R$", "").replace(",", "."));
      console.log(calcV)

      const percentual = ((calcV - valorVenda) / valorVenda) * 100;
      if(percentual > 2) {
        this.statusValor = `Valor de venda acima do mercado:`
        this.statusPercentual = `${this.statusPercentual = percentual.toFixed(1)}%`
      } else if(percentual < -2) {
        this.statusValor = `Valor de venda abaixo do mercado:`
        this.statusPercentual = `${this.statusPercentual = Math.abs(percentual).toFixed(1)}%`
      } else {
        this.statusValor = `Valor de venda dentro da média do mercado:`
        this.statusPercentual = `${this.statusPercentual = Math.abs(percentual).toFixed(1)}%`
      }
      this.valorVeiculo = valor
    }, 1000);
  }

  onFormSubmit() {
    this.formEnviado = true
    this.apiService.getResultados(this.tipoVeiculoSelect, this.tipoMarcaloSelect, this.tipoModelSelect, this.tipoAnoloSelect)
    .subscribe(res => {
      this.marcaResults = res
      this.valorFIPE = res.Valor
    });
    this.calcResult()
  }
}

