import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngFor
import { RouterModule } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck';
import { AuthService } from '../../services/auth.service';
import { DeckFormComponent } from '../deck-form/deck-form'; // Importa o componente do formulário
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DeckFormComponent],
  templateUrl: './deck-list.html', // Nome curto
  styleUrl: './deck-list.scss'     // Nome curto
})
export class DeckListComponent implements OnInit {

  decks: Deck[] = [];

  deckSelecionadoParaEdicao: any = null; // Variável para armazenar o deck selecionado para edição

  constructor(
    private deckService: DeckService, 
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService) {}

  ngOnInit(): void {
    this.carregarDecks();
  }

  irParaEstatisticas(id: number | undefined) {
  if (id) {
    this.router.navigate(['/deck', id, 'stats']);
  } else {
    console.error('Erro: ID do deck está indefinido!');
    }
  }
  
  carregarDecks() {
    this.deckService.listar().subscribe({
      next: (dados: any) => {
        console.log('Decks recebidos do Java:', dados);
        this.decks = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao buscar decks', erro);
      }
    });
  }

  editarDeck(deck: any) {
    this.deckSelecionadoParaEdicao = deck; // Armazena o deck selecionado para edição

    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente para o topo onde o formulário está localizado

    // O formulário será exibido automaticamente porque deckSelecionadoParaEdicao agora tem um valor
  }

  cancelarEdicao() {
    this.deckSelecionadoParaEdicao = null; // Limpa a variável para fechar o formulário
  }

  excluirDeck(id: number, nome: string) {
    if(confirm(`Tem certeza que deseja excluir o deck "${nome}"?`)) {
      this.deckService.excluir(id).subscribe({
        next: () => {
          console.log(`Deck com ID ${id} excluído com sucesso.`);
          this.carregarDecks(); // Recarrega a lista após exclusão
        },
        error: (erro) => {
          console.error(`Erro ao excluir deck com ID ${id}`, erro);
          alert('Ocorreu um erro ao excluir o deck. Por favor, tente novamente.');
        }
      });
    }
  }

  sairDaConta() {
    this.authService.logout();
  }
}
