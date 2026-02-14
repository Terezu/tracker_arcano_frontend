import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Deck, DeckStats } from '../models/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'http://localhost:8080/decks';

  constructor(private http: HttpClient) { }

  salvar(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck).pipe(
      catchError(this.handleError)
    );
  }

  registrarPartida(deckId: number, wins: number, losses: number, arquetipoAdversario: string) {
    const payload = {
      qtdVitorias: wins,
      qtdDerrotas: losses,
      arquetipoAdversario: arquetipoAdversario
    };
    return this.http.post(`${this.apiUrl}/${deckId}/partidas`, payload);
  }

  getEstatisticas(id: number): Observable<DeckStats> {
    return this.http.get<DeckStats>(`${this.apiUrl}/${id}/stats`);
  }

  listar(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  atualizarDeck(id: number, deckAtualizado: any) {
    return this.http.put(`${this.apiUrl}/${id}`, deckAtualizado);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
