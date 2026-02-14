import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { DeckStats } from '../../models/deck';
import { FormsModule } from '@angular/forms';

interface CartaVisual {
  qtd: string;
  nome: string;
}

@Component({
  selector: 'app-deck-stats',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './deck-stats.html',
  styleUrl: './deck-stats.scss'
})
export class DeckStatsComponent implements OnInit {

  stats: DeckStats | null = null;
  deckId: number = 0;
  isSaving = false;
  
  // Controle da lista e imagem
  mostrarDecklist: boolean = false;
  imagemDestaque: string | null = null;

  totalMainDeck: number = 0;
  totalSideboard: number = 0;
  
  mainDeck: CartaVisual[] = [];
  sideboard: CartaVisual[] = [];

  oponenteSelecionado: string  | null = null;
  novoOponente: string = '';

  visualizandoGeral: boolean = true; // Controle para alternar entre visão geral e detalhes

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private cdr: ChangeDetectorRef // Injeção do detector
  ) {}

  ngOnInit(): void {
    this.deckId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarEstatisticas();
  }

  // --- MÉTODOS VISUAIS (COM DETECT CHANGES) ---

  alternarDecklist() {
    this.mostrarDecklist = !this.mostrarDecklist;
    this.cdr.detectChanges(); // <--- ADICIONADO: Obriga a tela a atualizar
  }

  mostrarCarta(nome: string) {
    this.imagemDestaque = `http://localhost:8080/api/cartas/imagem/${encodeURIComponent(nome)}`;
    this.cdr.detectChanges();
  }

  esconderCarta() {
    this.imagemDestaque = null;
    this.cdr.detectChanges();
  }

  // --- MÉTODOS DE DADOS ---

  selecionarOponente(oponente: string) {
    this.oponenteSelecionado = oponente;
    this.visualizandoGeral = false; // Vai para a visão de detalhes do oponente
    this.cdr.detectChanges();
  }

  alternarVisualizacaoStats() {
    // Só permite alternar se houver um oponente selecionado para olhar
    if (this.oponenteSelecionado) {
      this.visualizandoGeral = !this.visualizandoGeral;
      this.cdr.detectChanges();
    }
  }

  adicionarOponente() {
    if (this.novoOponente.trim()) {
      this.oponenteSelecionado = this.novoOponente.trim();
      this.novoOponente = '';
      this.cdr.detectChanges();
    }
  }

  carregarEstatisticas() {
    if (this.deckId) {
      this.deckService.getEstatisticas(this.deckId).subscribe({
        next: (dados) => {
          this.stats = dados;
          this.processarListaCartas(dados.listaCartas);
          this.cdr.detectChanges(); // Garante que os dados apareçam assim que chegarem
        },
        error: (erro) => {
          console.error('Erro ao carregar', erro);
        }
      });
    }
  }

  registrarResultado(wins: number, losses: number) {
    if (!this.oponenteSelecionado) {
      alert('Por favor, selecione ou adicione um Deck Oponente antes de registrar o resultado.');
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    // Passando o oponente selecionado pro Service
    this.deckService.registrarPartida(this.deckId, wins, losses, this.oponenteSelecionado).subscribe({
      next: () => {
        this.carregarEstatisticas();
        this.isSaving = false;
        // Mantemos o oponente selecionado caso ele tenha jogado várias partidas seguidas contra o mesmo deck
        this.cdr.detectChanges(); 
      },
      error: () => {
        alert('Erro ao salvar partida.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  processarListaCartas(textoCompleto: string) {
    if (!textoCompleto) return;

    const partes = textoCompleto.split(/Sideboard/i);
    
    this.mainDeck = this.parseLinhas(partes[0]);
    this.totalMainDeck = this.calcularTotalCartas(this.mainDeck); // <- Linha nova

    this.sideboard = partes.length > 1 ? this.parseLinhas(partes[1]) : [];
    this.totalSideboard = this.calcularTotalCartas(this.sideboard); // <- Linha nova
  }

  private calcularTotalCartas(lista: CartaVisual[]): number {
    return lista.reduce((acc, carta) => acc + parseInt(carta.qtd, 10), 0);
  }

  private parseLinhas(texto: string): CartaVisual[] {
    return texto.split('\n')
      .map(linha => linha.trim())
      .filter(linha => linha.length > 0)
      .map(linha => {
        const match = linha.match(/^(\d+)[xX]?\s+(.+)/);
        if (match) {
          return { qtd: match[1], nome: match[2] };
        }
        return { qtd: '1', nome: linha };
      });
  }

  get statsParaExibir(): any {
    if (!this.stats) return null;
    
    // Se o botão geral estiver ativo ou nenhum oponente foi clicado, mostra tudo
    if (this.visualizandoGeral || !this.oponenteSelecionado) {
      return this.stats;
    }
    
    // Se não, procura os dados só daquele oponente na lista
    const matchup = this.stats.matchups?.find(m => m.nomeArquetipo === this.oponenteSelecionado);
    return matchup || this.stats; 
  }
}
