import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
import { Observable, catchError, throwError } from 'rxjs';
import { Deck, DeckStats } from '../models/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'https://tracker-arcano-backend.onrender.com/decks';

  constructor(private http: HttpClient) { }

  // Função auxiliar para pegar o token e montar o cabeçalho
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token_lontras');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  salvar(deck: Deck): Observable<Deck> {
    // Passamos o cabeçalho como o terceiro parâmetro
    return this.http.post<Deck>(this.apiUrl, deck, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  registrarPartida(deckId: number, wins: number, losses: number, arquetipoAdversario: string) {
    const payload = {
      qtdVitorias: wins,
      qtdDerrotas: losses,
      arquetipoAdversario: arquetipoAdversario
    };
    return this.http.post(`${this.apiUrl}/${deckId}/partidas`, payload, { headers: this.getHeaders() });
  }

  getEstatisticas(id: number): Observable<DeckStats> {
    return this.http.get<DeckStats>(`${this.apiUrl}/${id}/stats`, { headers: this.getHeaders() });
  }

  listar(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  atualizarDeck(id: number, deckAtualizado: any) {
    return this.http.put(`${this.apiUrl}/${id}`, deckAtualizado, { headers: this.getHeaders() });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
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
