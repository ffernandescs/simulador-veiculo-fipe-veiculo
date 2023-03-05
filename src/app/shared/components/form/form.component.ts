import { Component, ViewChild } from '@angular/core';
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

  listaVeiculos = [{nome: "carros"}, {nome: "motos"}, {nome: "caminhoes"}];
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

  momentForm!: FormGroup;

  mensagens = {
    tipo: [
      {tipo: 'required', menssagem: '*O campo é obrigatorio.'}
    ],
    marca: [
      {tipo: 'required', menssagem: '*O campo é obrigatorio.'}
    ],
    modelo: [
      {tipo: 'required', menssagem: '*O campo é obrigatorio.'}
    ],
    ano: [
      {tipo: 'required', menssagem: '*O campo é obrigatorio.'}
    ],
    valor: [
      {tipo: 'required', menssagem: '*O campo é obrigatorio.'}
    ]
  }

  disableLimpar = true;
  disableConsultar = true;




  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.momentForm = this.formBuilder.group({
      tipo: ['', Validators.compose([ Validators.required])],
      marca: ['', Validators.compose([ Validators.required])],
      modelo: ['', Validators.compose([ Validators.required])],
      ano: ['', Validators.compose([ Validators.required])],
      valor: ['', Validators.compose([ Validators.required])]
    })

  }
  ngOnInit(): void {
    this.disableAllFields()
    this.onEnableDisableItemForm()
  }

  disableAllFields() {
    this.momentForm.get('tipo')?.setValue('');
    this.momentForm.get('marca')?.disable();
    this.momentForm.get('modelo')?.disable();
    this.momentForm.get('ano')?.disable();
    this.momentForm.get('valor')?.disable();
  }

  resetForm() {
    this.disableAllFields()
  }

  onEnableDisableItemForm(){
    this.momentForm.get('tipo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('marca')?.enable();
        this.disableLimpar = false

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

    this.momentForm.get('valor')?.valueChanges.subscribe((value) => {
      if (value) {
        this.disableConsultar = false
      } else {

      }
    });



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
    }, 2000);
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

