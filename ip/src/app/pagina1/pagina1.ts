import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../service';

@Component({
  selector: 'app-pagina1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina1.html',
  styleUrls: ['./pagina1.css']
})
export class Pagina1 {
  ip: string = '';
  data: any;
  loading: boolean = false;
  error: string = '';

  constructor(private service: Service) {}

  // Funzione per ottenere i dati del proprio IP
  getMyIp() {
    this.loading = true;
    this.error = '';
    this.service.getMyIp().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Errore durante il recupero dei dati.';
        this.loading = false;
      }
    });
  }

  
}
