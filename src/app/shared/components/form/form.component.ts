import { Component, Output } from '@angular/core';
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
  tipoModelSelect: string = ''
  tipoModelSelectString: string = this.tipoModelSelect.toString()
  tipoAnoloSelect: string = ''

  /*Variavel de resultados, sera enviado para o componente results
  onde sera exibido o resultado do final da consulta na API*/
  @Output() marcaResults: TypesResults | null = null;

  /*Variavel que armazena valor de venda no componente Input
  do formulario*/
  @Output() valorVeiculo: string = '';

  /*Variavel que armazena valor da condição na função calcResult
  onde informa se o valor esta acima, na media ou abaixo da media.*/
  @Output() statusValor: string = '';

  /*Variavel que armazena valor da condição na função calcResult
  onde é calculado o valor do percentual.*/
  @Output() statusPercentual: number = 0;

  /*Variavel que armazena valor da condição na função calcResult
  onde é calculado o valor do percentual mais usando o parseInt para
  receber um valor inteiro, para uso no grafico.*/
  @Output() statusPercentualInt: number = 0;

  /*Variavel que armazena valor da condição na função calcResult
  onde é calculado o valor do percentual, porem utilizado o toString
  para conversão de number para string e em seguida exibir o valor no grafico.*/
  @Output() statusPercentualText: string = ''

  /*Variavel que armazena o valor da tabela FIPE na API, e usado na função
  calcResult para calcular a porcentagem*/
  valorFIPE:string = '';

  /*Variavel para utilização do FormGroup*/
  momentForm!: FormGroup;

  /*Variavel para armazenar dados para ser usado na validação de campos*/
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

  /*Loading para botáo consultar */
  @Output() loading: boolean = false;

  /*Usado junto com o loading para ao clicar em consultar o mesmo desfocar as grid
  ate que os resultados seja carregados. variavel enviado para o componente results*/
  @Output() desfocarGridResults: boolean = false

  /*variavel para mudar estado dos botões, para habilitado ou desabilitado */
  disableLimpar = true;
  disableConsultar = true;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller
    ) {

    /*Usado para criar formulario reativo, com validação de campos*/
    this.momentForm = this.formBuilder.group({
      tipo: ['', Validators.compose([ Validators.required])],
      marca: ['', Validators.compose([ Validators.required])],
      modelo: ['', Validators.compose([ Validators.required])],
      ano: ['', Validators.compose([ Validators.required])],
      valor: ['', Validators.compose([ Validators.required])]
    })
  }

  /*Funçãoo de carregamento de pagina chamando a função onEnableDisableItemForm
  para desabilitar e redefinir os componentes*/
  ngOnInit(): void {
    this.onEnableDisableItemForm()
  }
  /*Nesta função, foi criado uma condiação para habilitar e desabilitar os componentes
  e redefinir os valores padrão dos componenets. Quando clicado em um componente, ele ativa
  o outro e isso de forma crescente e decrescente */
  onEnableDisableItemForm(){
    this.momentForm.get('tipo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('marca')?.enable();
        this.disableLimpar = false
      } else {
        this.momentForm.get('marca')?.disable();
        this.momentForm.get('marca')?.setValue('');
        this.momentForm.get('modelo')?.disable();
        this.momentForm.get('modelo')?.setValue('');
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.disable();
        this.disableLimpar = true
        this.disableConsultar = true;
      }
    });

    this.momentForm.get('marca')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('modelo')?.enable();
        this.disableLimpar = false
      } else {
        this.momentForm.get('modelo')?.disable();
        this.momentForm.get('modelo')?.setValue('');
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.disable();
        this.disableConsultar = true;
      }
    });

    this.momentForm.get('modelo')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('ano')?.enable();
        this.disableLimpar = false
      } else {
        this.momentForm.get('ano')?.disable();
        this.momentForm.get('ano')?.setValue('');
        this.momentForm.get('valor')?.disable();
        this.disableConsultar = true;
      }
    });

    this.momentForm.get('ano')?.valueChanges.subscribe((value) => {
      if (value) {
        this.momentForm.get('valor')?.enable();
        this.disableLimpar = false
      } else {
        this.momentForm.get('valor')?.disable();
        this.momentForm.get('valor')?.setValue('');
        this.disableConsultar = true;
      }
    });

    this.momentForm.get('valor')?.valueChanges.subscribe((value) => {
      if (value) {
        this.disableConsultar = false;
        this.disableConsultar = false;
      }
    });
  }

  /*Nesta função reseta os componentes para os valores padrao
  desabilitando e zerando os valores */
  resetForm() {
    this.onEnableDisableItemForm()
    this.momentForm.get('tipo')?.setValue('');
    this.momentForm.get('marca')?.disable();
    this.momentForm.get('marca')?.setValue('');
    this.momentForm.get('modelo')?.disable();
    this.momentForm.get('modelo')?.setValue('');
    this.momentForm.get('ano')?.disable();
    this.momentForm.get('ano')?.setValue('');
    this.momentForm.get('valor')?.disable();
    this.momentForm.get('valor')?.setValue('');
    this.disableLimpar = true
    this.disableConsultar = true;
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
      this.apiService.getAnoVeiculo(this.tipoVeiculoSelect, this.tipoMarcaloSelect, parseInt(this.tipoModelSelect))
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
      if(percentual >= 10) {
        this.statusValor = `Valor do veículo abaixo da tabela FIPE`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = this.statusPercentual
        this.statusPercentualText = this.statusPercentual.toFixed(1).toString()

      } else if(percentual <= -10) {
        this.statusValor = `Valor do veículo abaixo da tabela FIPE`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = parseInt(Math.abs(percentual).toFixed(1))
        this.statusPercentualText = this.statusPercentual.toFixed(1).toString()

      } else if(percentual > 100) {
        this.statusValor = `Valor acima do mercado`
        this.statusPercentual = parseFloat(percentual.toFixed(1))
        this.statusPercentualInt = this.statusPercentual
        this.statusPercentualText = `+${this.statusPercentual.toFixed(1).toString()}`

      }else {
        this.statusValor = `Valor dentro da média do mercado`
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
      parseInt(this.tipoModelSelect),
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

