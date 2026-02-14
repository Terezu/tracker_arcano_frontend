import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  // 1. Troque o localhost por esta URL:
  private apiUrl = 'https://tracker-arcano-backend.onrender.com/decks';

  constructor(private http: HttpClient) {}

  salvarDeck(deck: any) {
    // 2. Pegue o "crachá" (token) que o AuthService guardou
    const token = sessionStorage.getItem('token_lontras');

    // 3. Monte o cabeçalho de autorização
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 4. Envie o deck com o cabeçalho incluído
    return this.http.post(this.apiUrl, deck, { headers });
  }
}
