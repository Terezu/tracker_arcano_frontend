import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private temaClaroAtivo = false;

  constructor() {
    // Quando o site carrega, ele olha no bolso do navegador se o usuário prefere o modo claro
    const temaSalvo = localStorage.getItem('lontras_tema');
    if (temaSalvo === 'claro') {
      this.ativarModoClaro();
    }
  }

  alternarTema() {
    if (this.temaClaroAtivo) {
      this.ativarModoEscuro();
    } else {
      this.ativarModoClaro();
    }
  }

  isTemaClaro() {
    return this.temaClaroAtivo;
  }

  private ativarModoClaro() {
    document.body.classList.add('light-theme');
    localStorage.setItem('lontras_tema', 'claro');
    this.temaClaroAtivo = true;
  }

  private ativarModoEscuro() {
    document.body.classList.remove('light-theme');
    localStorage.setItem('lontras_tema', 'escuro');
    this.temaClaroAtivo = false;
  }
}
