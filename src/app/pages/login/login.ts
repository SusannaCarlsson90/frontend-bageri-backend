import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login { 
  username = signal<string>("");
  password = signal<string>("");
  message = signal<string>("");

  authService = inject(AuthService);
  router = inject(Router);

  login(): void {
 
    const user: User = {
      username: this.username(),
      password: this.password()
    };

   
    this.authService.login(user).subscribe({
      next: (res) => {
        this.message.set("Inloggad! Skickar dig vidare...");
        
       
        this.router.navigate(['/admin']);
      }, 
      error: (err) => {
        this.message.set(err.error?.message ?? "Fel användarnamn eller lösenord.");
      }
    });
  }
}