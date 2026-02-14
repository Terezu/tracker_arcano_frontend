import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck';

@Component({
  selector: 'app-deck-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deck-form.html', 
  styleUrl: './deck-form.scss'
})
export class DeckFormComponent implements OnChanges {

  // Recebe o deck que foi clicado lá na tabela (deck-list)
  @Input() deckParaEditar: Deck | null = null;
  
  // Avisa a tabela (deck-list) que terminamos para ela atualizar a tela
  @Output() deckSalvo = new EventEmitter<void>();
  @Output() edicaoCancelada = new EventEmitter<void>();

  deck: Deck = {
    name: '',
    deckList: ''
  };

  isSubmitting = false;

  constructor(private deckService: DeckService) {}

  // Quando o @Input mudar (usuário clicou em Editar na tabela), isso é executado
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deckParaEditar'] && this.deckParaEditar) {
      // Fazemos uma cópia {...} para não alterar a tabela antes de salvar no banco
      this.deck = { ...this.deckParaEditar };
    } else {
      this.limparFormulario();
    }
  }

  salvarDeck() {
    if (!this.deck.name || !this.deck.deckList) {
      alert('Por favor, preencha o nome e a lista do deck.');
      return;
    }

    this.isSubmitting = true;

    // Se o deck tem ID, significa que já existe no banco (Edição)
    if (this.deck.id) {
      this.deckService.atualizarDeck(this.deck.id, this.deck).subscribe({
        next: (deckAtualizado: any) => {
          alert(`Sucesso! Deck "${deckAtualizado.name}" atualizado.`);
          this.finalizarAcao();
        },
        error: (erro) => {
          alert('Erro ao atualizar: ' + (erro.error || erro.message));
          this.isSubmitting = false;
        }
      });
    } 
    // Se não tem ID, é um baralho novo (Criação)
    else {
      this.deckService.salvar(this.deck).subscribe({
        next: (deckSalvo) => {
          alert(`Sucesso! Deck "${deckSalvo.name}" salvo com ID: ${deckSalvo.id}`);
          this.finalizarAcao();
        },
        error: (erro) => {
          alert('Erro ao criar: ' + (erro.error || erro.message));
          this.isSubmitting = false;
        }
      });
    }
  }

  cancelarEdicao() {
    this.limparFormulario();
    this.edicaoCancelada.emit(); // Avisa o deck-list para esconder o modo de edição
  }

  private finalizarAcao() {
    this.limparFormulario();
    this.isSubmitting = false;
    this.deckSalvo.emit(); // Avisa o deck-list para recarregar a tabela
  }

  private limparFormulario() {
    this.deck = { name: '', deckList: '' };
  }
}
