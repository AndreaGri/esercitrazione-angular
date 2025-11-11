import { Routes } from '@angular/router';
// importiamo i componenti
import { Pagina1 } from './pagina1/pagina1';
import { Pagina2 } from './pagina2/pagina2';

export const routes: Routes = [
  // se l’URL è vuoto, vai su /myip
  { path: '', redirectTo: 'myip', pathMatch: 'full' },

  // se l'URL è /myip mostra il componente Pagina1
  { path: 'myip', component: Pagina1 },

  // se l'URL è /ip mostra il componente Pagina2
  { path: 'ip', component: Pagina2 },
];
