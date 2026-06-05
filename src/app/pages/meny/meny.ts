import { Component, inject, OnInit, signal } from '@angular/core'; 
import { MenuService } from '../../services/menu.service'; 
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-meny',
  imports: [],
  templateUrl: './meny.html',
  styleUrl: './meny.css'
})
export class Meny implements OnInit {
  menuService = inject(MenuService);
  
  // Signal med en tom array som startvärde
  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: (data) => {
        this.menuItems.set(data); //Använder .set() för att spara datan
      },
      error: (err) => {
        console.error('Kunde inte hämta menyn:', err);
      }
    });
  }
}