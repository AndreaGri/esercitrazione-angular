import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common'; // Importa DOCUMENT
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { Pagina1 } from './pagina1/pagina1';
import { Pagina2 } from './pagina2/pagina2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Pagina1, Pagina2],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  showButtons = true;
  isDarkMode = false; // Stato della dark mode

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document, // Per manipolare il body
    private renderer: Renderer2
  ) {
    
    // Routing logic (esistente)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showButtons = (event.url === '/' || event.url === '/home');
      }
    });

    // Carica preferenza salvata (Opzionale)
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(this.document.body, 'dark-mode');
    }
  }

  // Funzione Toggle
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
}