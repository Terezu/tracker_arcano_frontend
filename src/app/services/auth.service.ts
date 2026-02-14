import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tracker-arcano-backend.onrender.com/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(dados: any) {
    return this.http.post<any>(this.apiUrl, dados).pipe(
      tap(resposta => {
        sessionStorage.setItem('token_lontras', resposta.token);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token_lontras');
    this.router.navigate(['/login']);
  }

  isAutenticado(): boolean {
    return !!sessionStorage.getItem('token_lontras');
  }
}
