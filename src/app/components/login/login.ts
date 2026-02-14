import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  credenciais = {
    login: '',
    senha: ''
  };
  
  isLoading = false;
  erroLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    if (!this.credenciais.login || !this.credenciais.senha) return;

    this.isLoading = true;
    this.erroLogin = false;

    this.authService.login(this.credenciais).subscribe({
      next: () => {
        // Se deu certo, navega para a lista de Decks!
        this.router.navigate(['/']); 
      },
      error: () => {
        // Se a senha estiver errada, o Java devolve erro e cai aqui
        this.erroLogin = true;
        this.isLoading = false;
      }
    });
  }
}
