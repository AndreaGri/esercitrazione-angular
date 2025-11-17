import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../service';

import * as L from 'leaflet';

@Component({
  selector: 'app-pagina2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina2.html',
  styleUrls: ['./pagina2.css']
})
export class Pagina2 {
  ip: string = '';
  data: any = null;
  loading = false;
  error = '';
  map: any = null;

  private service = inject(Service);

  getIpData() {
    this.error = '';
    this.data = null;

    const ipTrim = this.ip?.trim();
    if (!ipTrim) {
      this.error = 'Inserisci un indirizzo IP.';
      return;
    }

    this.loading = true;
    this.service.getIpData(ipTrim).subscribe({
      next: (res: any) => {
        if (res && res.success === false) {
          this.error = res.message || 'Indirizzo IP non valido.';
          this.data = null;
        } else {
          this.data = res;

          // carico mappa
          if (res.latitude && res.longitude) {
            this.loadMap(res.latitude, res.longitude);
          }
        }
        this.loading = false;
      },

      error: () => {
        this.error = 'Errore durante la richiesta.';
        this.loading = false;
      }
    });
  }

  loadMap(lat: number, lon: number) {
    // elimina eventuale mappa precedente
    if (this.map) {
      this.map.remove();
    }

    // attende la renderizzazione del div
    setTimeout(() => {
      this.map = L.map('map2').setView([lat, lon], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);

      L.marker([lat, lon])
        .addTo(this.map)
        .bindPopup('Posizione IP trovata')
        .openPopup();
    }, 80);
  }

  clear() {
    this.ip = '';
    this.data = null;
    this.error = '';

    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
