import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeckListComponent], 
  templateUrl: './app.html', // Note que no seu projeto chama app.html
  styleUrl: './app.scss'     // Note que no seu projeto chama app.scss
})
export class AppComponent {
  title = 'decktracker-web';
}
