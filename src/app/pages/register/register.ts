import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register { // Denna klass heter Register eftersom det är registreringssidan
  username: string = "";
  password: string = "";
  message = signal("");

  authService = inject(AuthService);

  register() : void {
    // Här lägger du koden från filmen för att anropa din authService sen!
  }
}