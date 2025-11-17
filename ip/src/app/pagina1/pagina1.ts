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

  map: any;   // 👈 AGGIUNTO

  constructor(private service: Service) {}

  // Funzione per ottenere i dati del proprio IP
  getMyIp() {
    this.loading = true;
    this.error = '';
    this.data = null;

    this.service.getMyIp().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;

        // AGGIUNTA MAPPA QUI
        this.loadMap(res.latitude, res.longitude);
      },
      error: () => {
        this.error = 'Errore durante il recupero dei dati.';
        this.loading = false;
      }
    });
  }

  // =============================
  //      FUNZIONE MAPPA
  // =============================
  loadMap(lat: number, lon: number) {

  if (this.map) {
    this.map.remove();
  }

  // ASPETTA che Angular mostri il div
  setTimeout(() => {
    this.map = L.map('map').setView([lat, lon], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Posizione rilevata per questo IP')
      .openPopup();

  }, 50);   // <-- Piccolo ritardo per sicurezza
}

}
