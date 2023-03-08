<h1>Simulador de preço de veículos</h1> 

<p align="center">
  <img src="https://img.shields.io/static/v1?label=angular&message=framework&color=blue&style=for-the-badge&logo=ANGULAR"/>
  <img src="http://img.shields.io/static/v1?label=TypeScript&message=Bootstrap&color=red&style=for-the-badge&logo=typescript"/>
   <img src="http://img.shields.io/static/v1?label=Bootstrap&message=Bootstrap&color=red&style=for-the-badge&logo=bootstrap"/>
  <img src="https://img.shields.io/static/v1?label=Vercel&message=deploy&color=blue&style=for-the-badge&logo=vercel"/>

   <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>

> Status do Projeto: :heavy_check_mark:(concluido)

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Deploy da Aplicação](#layout-ou-deploy-da-aplicação)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação)

:small_blue_diamond: [Detalhes da aplicação](#detalhes-da-aplicação)

:small_blue_diamond: [Linguagens e dependencias](#linguagens-e-dependencias)

:small_blue_diamond: [Problemas gerados ao longo do projeto](#problemas-gerados-ao-longo-do-projeto)


## Descrição do projeto 

<p align="justify">
O projeto proposto pela empresa Flexpag, é um simulador de preço de venda baseado na tabela FIPE. O projeto onsistem em um ambiente em que possa selecionar o tipo
do veiculu, marca do veiculo, modelo do veiculo, ano do veiculo e uma opção para selecionar o valor que deseja vender ou comparar com o valor da tabela FIPE.
  
</p>

## 📋 Soluções para o projeto

:heavy_check_mark: Consumir api com dados da tabela FIPE.

:heavy_check_mark: Listar para cada campo o Tipo, Marca, Modelo e Ano.

:heavy_check_mark: Calcular o percentual de venda.

:heavy_check_mark: Criar condição para menssagem de acordo com o percentual de venda.

:heavy_check_mark: Criar condição de cores de acordo com o percentual de venda.

:heavy_check_mark: Criar maskara para campo input, para digitar valor de venda.


## Funcionalidades

:heavy_check_mark: Pagina inicial de insturção de uso do projeto  

:heavy_check_mark: No simulador todos os campos foram desabilitados, e são habilitados de quando obtem valor selecionado.

:heavy_check_mark: Botão de limpar, onde limpara os dados preenchidos e desabilita os botões. 

:heavy_check_mark: Validação de campos, quando o mesmo estiver vazio apresenta menssagem (*Campo obrigatório).

:heavy_check_mark: Grafio que mede o percentual, com condição criada para mudança de cores de acordo com o valor do percentual

:heavy_check_mark: Condição que muda a cor da menssagem (Valor do veículo abaixo da tabela FIPE...) de acordo com a percentual calculado.

:heavy_check_mark: Estilização com o Bootstrap - navBar, forms, main e footer.

:heavy_check_mark: Maskara no campo input para formatação em moeda - BRL com o NgxCurrency


## Layout ou Deploy da Aplicação

> Link do deploy da aplicação. Exemplo com vercel: [Acessar](https://simulador-veiculo-fipe-veiculo-m6ej-4dzyfxpj2-ffernandescs.vercel.app) 

![image](https://user-images.githubusercontent.com/83374517/223592817-0a127fc9-15b8-4ec0-8a43-c1300b10bffc.png)


## Como rodar a aplicação

No terminal, clone o projeto: 

```
git clone https://github.com/ffernandescs/simulador-veiculo-fipe-veiculo
```

No terminal windows digite

```
cd {nome-da-pasta-do-projeto}
```

Em seguida digite

```
npm install
```

Em seguida digite o comando para rodar a aplicão

```
ng server
```


## Como rodar os testes

Coloque um passo a passo para executar os testes

```
$ npm test, rspec, etc 
```

## Detalhes da aplicação

O projeto simulador consistem em simular o preço de venda de veículos de acordo com a tabela FIPE.
Exemplos: Quero vender um carro, mais quero consultar qual a base de preço na tabela FIPE!

Com esta aplicação voçê conseguer ver o preço de tabela FIPE do seu veiculo e o percentual de venda de acordo com o valor de venda, da pra saber se esta vendendo
abaixo do mercado, acima do mercado ou na média.

A base do projeto sera disponibilizada para uso publico, criei algumas funcionalidades afim de deixar o projeto mais padronizado e dentro do que o mercado exige.

  - Foram criado validação de campos, onde so é possivel consultar as informações caso os valores sejam todos preenchidos.

  - Foi imprementado o botão de limpar dados, para refazer toda a consulta de forma mais agil e pratica.

  - Foi Implememtado uma maskara no campo input, para que seja inserido na tela o valor de moeda de acordo com o que pede o projeto.

  - Foi implementado uma validação de textos que quando não preenchidos informa uma menssagem (*Campo obrigatorio) e muda a cor. Quand o valor for preenchido, o campo fica na cor verde.

  - Foi Implementado um condição de cores de acordo com o percentual de venda
      - Exemplo: 
          * Se o valor for menor que -10%, itens ficam na cor vermelha
          * Se o valor for maior que 10%, itens ficam na cor verde.
          * Se o valor for entre -10% e 10% itens ficam na cor azul
        
  - Foi implementado uma tela de inicial para instrução de como usar a aplicação
  - Foi implementado o loading, para carregamento dos resultados.


## Linguagens e dependencias

- [Angular](https://angular.io/start)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Jquery](https://jquery.com/)
- [NgCircleProgress](https://github.com/bootsoon/ng-circle-progress)
- [NgxCurrency](https://github.com/nbfontana/ngx-currency)


## Problemas gerados ao longo do projeto

Desde a entrega do desafio, forma feito varios testes com a API e até o momento náo apresentou problemas.
Na data de 07-03-2023 as 17:00 quando fui fazer os testes finais a API esta pedindo autenticação.

- [Error - 1](https://user-images.githubusercontent.com/83374517/223601547-6e778450-6ed0-4226-b3f6-3ba2deb86917.png)
- [Error - 2](![image](https://user-images.githubusercontent.com/83374517/223602022-15d14c12-5778-4211-9b44-c3bf4c92cf97.png))

O ambiente ja esta todo configurado para receber os dados da api, inclusive ja foi testado.


Copyright :copyright: 2023 - Simulador de preço de venda de veículos.
