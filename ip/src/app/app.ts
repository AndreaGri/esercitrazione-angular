import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

// importiamo i componenti
import { Pagina1 } from './pagina1/pagina1';
import { Pagina2 } from './pagina2/pagina2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Pagina1, Pagina2],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { }
