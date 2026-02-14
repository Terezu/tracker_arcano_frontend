import 'zone.js'; // Necessário para o Angular funcionar corretamente
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Importante: aponta para 'app.ts' e não 'app.component'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
