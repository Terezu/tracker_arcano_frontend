import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Deck, DeckStats } from '../models/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'https://tracker-arcano-backend.onrender.com/decks';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token_lontras');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  salvar(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  listar(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error) {
      errorMessage = typeof error.error === 'string' ? error.error : error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
