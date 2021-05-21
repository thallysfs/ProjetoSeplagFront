import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UpdateMicrosoft } from '../models/updates';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  //url = 'http://localhost:3000/value';
  url = 'https://localhost:1081/api/Updates'

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  // Obtem todos os updates
  getUpdates(): Observable<UpdateMicrosoft[]> {
    return this.httpClient.get<UpdateMicrosoft[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

    // Obtem um update pelo id
    getUpdateById(id: number): Observable<UpdateMicrosoft> {
      return this.httpClient.get<UpdateMicrosoft>(this.url + '/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
