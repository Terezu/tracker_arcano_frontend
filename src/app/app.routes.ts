import { Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list'; // 1. Importe a Lista
import { DeckStatsComponent } from './components/deck-stats/deck-stats';
import { LoginComponent } from './components/login/login';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DeckListComponent, canActivate: [authGuard] },
  { path: 'deck/:id', component: DeckStatsComponent, canActivate: [authGuard] },
  
  // Se o cara digitar qualquer loucura na URL, manda pro login
  { path: '**', redirectTo: 'login' } 
];
