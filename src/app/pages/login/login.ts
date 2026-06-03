import { Component, inject, signal } from '@angular/core'; // 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login { 
  username: string = "";
  password: string = "";
  message = signal(""); 

  authService = inject(AuthService);

  register() : void {
    
  }
}