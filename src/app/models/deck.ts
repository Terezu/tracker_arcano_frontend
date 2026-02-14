export interface Deck {
  id?: number;          // Opcional, pois na criação ainda não existe
  name: string;
  format?: string;      // "Pauper" (será forçado no backend, mas bom ter)
  deckList: string;     // A string crua: "4 Lightning Bolt..."
}

export interface MatchupStats {
  nomeArquetipo: string;
  totalMatches: number;
  matchWins: number;
  matchLosses: number;
  matchWinRate: number;

  totalGames: number;
  gameWins: number;
  gameLosses: number;
  gameWinRate: number;
}

// Interface para receber as estatísticas (opcional por enquanto, mas já deixa pronto)
export interface DeckStats {
  deckName: string;
  listaCartas: string;

  totalMatches: number;
  matchWins: number;
  matchLosses: number;
  matchWinRate: number;
  totalGames: number;
  gameWins: number;
  gameLosses: number;
  gameWinRate: number;
  matchups?: MatchupStats[];
}
