import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A URL liberada no nosso Java
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(dados: any) {
    return this.http.post<any>(this.apiUrl, dados).pipe(
      tap(resposta => {
        // Quando o Java devolve o token, nós guardamos no "bolso" do navegador
        sessionStorage.setItem('token_lontras', resposta.token);
      })
    );
  }

  logout() {
    // Joga o crachá fora e manda o usuário de volta pra tela de login
    sessionStorage.removeItem('token_lontras');
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário tem um crachá guardado
  isAutenticado(): boolean {
    return !!sessionStorage.getItem('token_lontras');
  }
}
