import { Component, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ViewportScroller } from '@angular/common';
import { TypesAnos } from 'src/app/interfaces/type/TypesAnos';
import { TypesMarcas } from 'src/app/interfaces/type/TypesMarcas';
import { TypesModelos } from 'src/app/interfaces/type/TypesModelos';
import { TypesResults } from 'src/app/interfaces/type/TypesResults';

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

  tipoVeiculoSelect: string = ''
  tipoMarcaloSelect: string = ''
  tipoModelSelect: number = 0
  tipoAnoloSelect: string = ''
  valorInput: string = 'R$' + ''
  valoInput2: string = '';

  @Output() marcaResults: TypesResults | null = null;
  @Output() valorVeiculo: string = '';
  @Output() statusValor: string = '';
  @Output() statusPercentual: number = 0;
  @Output() statusPercentualInt: number = 0;
  @Output() statusPercentualText: string = ''

  valorFIPE:string = '';

  @Output() loading: boolean = false;
  @Output() desfocarGridResults: boolean = false

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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller
    ) {
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

  onValorChange(event: string) {
    this.valoInput2 = event
  }

  resetForm() {
    this.disableAllFields()
    this.disableConsultar = true
  }

  onEnableDisableItemForm(){
    this.momentForm.get('tipo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('marca')?.enable();
        this.momentForm.get('marca')?.setValue('');
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
        this.momentForm.get('modelo')?.setValue('');
      } else {
        this.momentForm.get('modelo')?.disable();
      }
    });
    this.momentForm.get('modelo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('ano')?.enable();
        this.momentForm.get('ano')?.setValue('');
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
    this.desfocarGridResults = true

    setTimeout(() => {

      const inputValor = document.querySelector('#valor') as HTMLInputElement;
      const valor = inputValor.value;
      const calcV = parseFloat(valor.replace(",", "."));
      const valorVenda = parseFloat(this.valorFIPE.replace("R$", "").replace(",", "."));

      const percentual = ((calcV - valorVenda) / valorVenda) * 100;
      if(percentual > 2 && percentual == 100) {
        this.statusValor = `Valor de venda acima do mercado`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = this.statusPercentual
        this.statusPercentualText = this.statusPercentual.toFixed(1).toString()

      } else if(percentual < -2) {
        this.statusValor = `Valor de venda abaixo do mercado`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = parseInt(Math.abs(percentual).toFixed(1))
        this.statusPercentualText = this.statusPercentual.toFixed(1).toString()

      } else if(percentual > 100) {
        this.statusValor = `Valor de venda acima do mercado`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = this.statusPercentual
        this.statusPercentualText = `+${this.statusPercentual.toFixed(1).toString()}`
        console.log(this.statusPercentualText)

      }else {
        this.statusValor = `Valor de venda dentro da média do mercado`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = parseInt(Math.abs(percentual).toFixed(1))
        this.statusPercentualText = this.statusPercentual.toFixed(1).toString()
      }
      this.valorVeiculo = `R$ ${valor}`
      this.loading = false;
      this.desfocarGridResults = false
    }, 2000);
  }

  onFormSubmit() {
    this.formEnviado = true
    this.apiService.getResultados(
      this.tipoVeiculoSelect,
      this.tipoMarcaloSelect,
      this.tipoModelSelect,
      this.tipoAnoloSelect)
    .subscribe(res => {
      this.marcaResults = res
      this.valorFIPE = res.Valor
    });

    if (window.innerWidth < 992) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor('resultados')
        }, 2000)
      }
    this.calcResult()
    }
  }

