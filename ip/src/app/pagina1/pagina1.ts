import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../service';
import * as L from 'leaflet';

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

  map: any; 

  // Rimosso "router: any" perché non serve più per questa logica
  constructor(private service: Service) {}

  getMyIp() {
    this.loading = true;
    this.error = '';
    this.data = null;

    this.service.getMyIp().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        // Chiamiamo la mappa
        this.loadMap(res.latitude, res.longitude);
      },
      error: () => {
        this.error = 'Errore durante il recupero dei dati.';
        this.loading = false;
      }
    });
  }

  loadMap(lat: number, lon: number) {
    // 1. Rimuovi mappa precedente
    if (this.map) {
      this.map.remove();
      this.map = null; // Reset della variabile
    }

    // 2. Timeout per attendere l'HTML
    setTimeout(() => {
      
      // CORREZIONE: Usiamo direttamente 'map' perché siamo in Pagina 1
      // Non usare this.router qui, crea solo confusione e bug.
      this.map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      L.marker([lat, lon])
        .addTo(this.map)
        .bindPopup('Posizione rilevata')
        .openPopup();

      // 3. InvalidateSize per correggere il rendering grafico
      setTimeout(() => {
        this.map.invalidateSize(); 
      }, 300);

    }, 100); 
  }
}