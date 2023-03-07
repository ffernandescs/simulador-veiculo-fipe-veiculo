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

  @Output() marcaResults: TypesResults | null = null;
  @Output() valorVeiculo: string = '';
  @Output() statusValor: string = '';
  @Output() statusPercentual: number = 0;
  @Output() statusPercentualInt: number = 0;
  @Output() statusPercentualText: string = ''

  valorFIPE:string = '';

  @Output() loading: boolean = false;
  @Output() desfocarGridResults: boolean = false


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

  resetForm() {
    this.disableAllFields()
    this.disableConsultar = true
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
        this.momentForm.get('valor')?.setValue('');
        this.momentForm.get('marca')?.setValue('');
        this.momentForm.get('modelo')?.setValue('');
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.setValue('');
        this.disableLimpar = true
        this.disableConsultar = true;
      }
    });

    this.momentForm.get('marca')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('modelo')?.enable();
      } else {
        this.momentForm.get('modelo')?.disable();
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('valor')?.disable();
        this.momentForm.get('modelo')?.setValue('');
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.setValue('');
        this.disableConsultar = true;

      }
    });

    this.momentForm.get('modelo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('ano')?.enable();
      } else {
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('valor')?.disable();
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.setValue('');
        this.disableConsultar = true;

      }
    });

    this.momentForm.get('ano')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('valor')?.enable();
      } else {
        this.momentForm.get('valor')?.disable();

        this.disableConsultar = true;
      }
    });

    this.momentForm.get('valor')?.valueChanges.subscribe((value) => {
      if (value) {
        this.disableConsultar = false;
      }
    });

  }

  /* Função onMarcaVeiculoChange capitura o valor ao selecionar o Select Tipo,
  atraveis da variavel tipoVeiculo e passa por parametro atraveis da funcao getMarca
  onde e preenchida a api: API_PATH}/{tipoVeiculo}/marcas
  que ira retornar a lista de marcas de acordo com o tipo*/
  onMarcaVeiculoChange(){
    if (this.tipoVeiculoSelect) {
      this.apiService.getMarca(this.tipoVeiculoSelect)
        .subscribe(data => {
          this.marcas = data;
      })
    }
  }

 /* Função onModeloVeiculoChange capitura o valor ao selecionar o Select Marca,
  atraveis da variavel tipoMarcaloSelect e passa por parametro atraveis da funcao getModeloVeiculo
  junto com a variavel tipoVeiculoSelect onde e preenchida a api:
  API_PATH}/{tipoVeiculo}/marcas/{tipoVeiculo}/{codMArca}/modelos
  que ira retornar a lista de modelos de acordo com a marca*/

  onModeloVeiculoChange() {
    if (this.tipoMarcaloSelect) {
      this.apiService.getModeloVeiculo(this.tipoVeiculoSelect, this.tipoMarcaloSelect)
        .subscribe(data => {
          this.modelos = data.modelos;
      });
    }
  }

  /* Função onAnoVeiculoChange capitura o valor ao selecionar o Select Modelos,
  atraveis da variavel tipoModelSelect e passa por parametro atraveis da funcao getAnoVeiculo
  junto com a variavel tipoVeiculoSelect e tipoMarcaloSelect onde e preenchida a api:
  API_PATH}/{tipoVeiculo}/marcas/{tipoVeiculo}/{codMArca}/modelos/{codModelo}/anos
  que ira retornar a lista de anos de acordo com o modelo*/

  onAnoVeiculoChange() {
    if (this.tipoModelSelect) {
      this.apiService.getAnoVeiculo(this.tipoVeiculoSelect, this.tipoMarcaloSelect, this.tipoModelSelect)
        .subscribe(data => {
          this.anos = data;
        });
    }
  }

 /* Função calcResult capitura o valor ao selecionar o Select Marca,
  atraveis da variavel tipoMarcaloSelect e passa por parametro atraveis da funcao getModeloVeiculo
  junto com a variavel tipoVeiculoSelect onde e preenchida a api:
  API_PATH}/{tipoVeiculo}/marcas/{tipoVeiculo}/{codMArca}/modelos
  que ira retornar a lista de modelos de acordo com a marca*/


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

  /* Função onResultsVeicul passa para a função getResultados atraveis de parametros
  todos os valores selecionados nos selects atraveis dos parametros tipoVeiculoSelect,
  tipoMarcaloSelect, tipoModelSelect e tipoAnoloSelect e faz a consulta na api:
  API_PATH}/{tipoVeiculo}/marcas/{tipoVeiculo}/{codMArca}/modelos/{codAno}
  que ira retornar a lista de resultados de acordo com os valores de pesquisa.
  Tambem criei uma condicao de tela para quando a largura for menor que 992px
  ao clicar no botao consultar ele rola o scroll para a tela de resultados
  e em seguida ira chamar a função calcular*/
  onResultsVeicul() {

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

