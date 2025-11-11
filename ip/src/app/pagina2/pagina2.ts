import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service } from '../service';

@Component({
  selector: 'app-pagina2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina2.html',
  styleUrls: ['./pagina2.css'],
  providers: [Service] // opzionale se Service ha providedIn: 'root'
})
export class Pagina2 {
  ip: string = '';
  data: any = null;
  loading = false;
  error = '';

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
        // ipwho.is ritorna { success: false, message: "..."} in caso di errore/invalid IP
        if (res && res.success === false) {
          this.error = res.message || 'Indirizzo IP non valido o non trovato.';
          this.data = null;
        } else {
          this.data = res;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore API:', err);
        this.error = 'Errore durante la richiesta. Controlla la connessione o riprova.';
        this.loading = false;
      }
    });
  }

  // Facoltativo: pulisce i risultati
  clear() {
    this.ip = '';
    this.data = null;
    this.error = '';
  }
}
