import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from '../environments/environment.prod';
import { TypesMarcas } from '../interfaces/type/TypesMarcas';
import { Observable } from 'rxjs';
import { TypesModelos } from '../interfaces/type/TypesModelos';
import { TypesAnos } from '../interfaces/type/TypesAnos';
import { TypesResults } from '../interfaces/type/TypesResults';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getMarca(tipoVeiculo: string): Observable<any> {
    return this.httpClient.get<TypesMarcas[]>(`${API_PATH}${tipoVeiculo}/marcas`)
  }

  getModeloVeiculo(tipoVeiculo: string, codMArca: string): Observable<any> {
    return this.httpClient.get<TypesModelos[]>(`${API_PATH}${tipoVeiculo}/marcas/${codMArca}/modelos`)
  }

  getAnoVeiculo(tipoVeiculo: string, codMArca: string, codModelo: number): Observable<any> {
    return this.httpClient.get<TypesAnos[]>(`${API_PATH}${tipoVeiculo}/marcas/${codMArca}/modelos/${codModelo}/anos`)
  }

  getResultados(tipoVeiculo: string, codMArca: string, codModelo: number, codAno: string): Observable<any> {
    return this.httpClient.get<TypesResults[]>(`${API_PATH}${tipoVeiculo}/marcas/${codMArca}/modelos/${codModelo}/anos/${codAno}`)
  }


}
