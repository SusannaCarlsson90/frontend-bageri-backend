import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

//register
export class Login { 
  username = signal<string>("");
  password = signal<string>("");
  message = signal<string>("");

  authService = inject(AuthService);

  login(): void {
    const user: User = {
      username: this.username(),
      password: this.password()
    };

    this.authService.login(user).subscribe({
      next: (res) => {
        this.message.set("Inloggad! Skickar dig vidare...");
      },
      error: (err) => {
        this.message.set(err.error?.message || "Felaktigt användarnamn/lösenord");
      }
    });
  }
}