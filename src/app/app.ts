import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('frontendbageri');
  authService = inject(AuthService);
  router = inject(Router); // Hämta in routern så vi kan skicka vidare användaren

  logout() : void {
    this.authService.logout();
    this.router.navigate(['/']); // Skickar användaren till startsidan efter utloggning
  }
}