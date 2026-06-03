import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user'; // Lägg till denna!

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = "";
  password: string = "";
  message = signal("");

  authService = inject(AuthService);

  register() : void {
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.authService.register(user).subscribe({
      next: (res: any) => this.message.set(res.message || "Konto skapat!"),
      error: (err) => this.message.set(err.error?.message || "Ett fel uppstod.")
    });
  }
}