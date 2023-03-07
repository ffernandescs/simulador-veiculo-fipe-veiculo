import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from '../environments/environment';
import { TypesMarcas } from '../interfaces/type/TypesMarcas';
import { Observable } from 'rxjs';
import { TypesModelos } from '../interfaces/type/TypesModelos';
import { TypesAnos } from '../interfaces/type/TypesAnos';
import { TypesResults } from '../interfaces/type/TypesResults';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API = API_PATH

  constructor(private httpClient: HttpClient) { }

  /*Função recebe o valor da variavel lista (listaVeiculos) no component forms
  e passa para api onde retorna a lista de marcas*/
  getMarca(tipoVeiculo: string): Observable<any> {
    console.log(this.httpClient.get<TypesMarcas[]>(`${this.API}${tipoVeiculo}/marcas`))
    return this.httpClient.get<TypesMarcas[]>(`${this.API}${tipoVeiculo}/marcas`)
  }

  /*Função recebe o valor da variavel lista (listaVeiculos) e (marcas)  no component forms
  e passa para api onde retorna a lista de modelos*/
  getModeloVeiculo(tipoVeiculo: string, codMArca: string): Observable<any> {
    return this.httpClient.get<TypesModelos[]>(`${this.API}${tipoVeiculo}/marcas/${codMArca}/modelos`)
  }

  /*Função recebe o valor da variavel lista (listaVeiculos), (marcas) e (modelos)  no component forms
  e passa para api onde retorna a lista de modelos*/
  getAnoVeiculo(tipoVeiculo: string, codMArca: string, codModelo: number): Observable<any> {
    return this.httpClient.get<TypesAnos[]>(`${this.API}${tipoVeiculo}/marcas/${codMArca}/modelos/${codModelo}/anos`)
  }
  /*Função recebe o valor da variavel lista (listaVeiculos), (marcas), (modelos) e (anos) no component forms
  e passa para api onde retorna a lista de modelos*/
  getResultados(tipoVeiculo: string, codMArca: string, codModelo: number, codAno: string): Observable<any> {
    return this.httpClient.get<TypesResults[]>(`${this.API}${tipoVeiculo}/marcas/${codMArca}/modelos/${codModelo}/anos/${codAno}`)
  }


}
