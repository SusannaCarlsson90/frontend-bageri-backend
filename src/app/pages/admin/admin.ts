import { Component, inject, OnInit, signal } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  menuService = inject(MenuService);

  message = signal("");

  // Lista för att hålla reda på alla rätter som visas under formuläret
  menuItems = signal<MenuItem[]>([]);

  // Håller reda på om vi redigerar ett befintligt bakverk (ID) eller skapar ett nytt (null)

  redigerarId: string | null = null;

  title: string = "";
  description: string = "";
  price: number = 0;
  category: string = "";

  // Denna körs automatiskt när admin-sidan laddas
  ngOnInit(): void {
    this.laddaMeny();
  }

  // Denna funktion hämtar listan från databasen
  laddaMeny(): void {
    this.menuService.getMenuItems().subscribe({
      next: (data) => this.menuItems.set(data), 
      error: (err) => console.error('Kunde inte hämta menyn', err)
    });
  }

  // Körs när man klickar på "Spara i veckomenyn"
  addBakverk(): void {
    const bageriData: MenuItem = {
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category
    };

    if (this.redigerarId) {
      // Om redigerarId finns, kör vi PUT-anropet via vår service
      bageriData._id = this.redigerarId;
      this.menuService.updateMenuItem(this.redigerarId, bageriData).subscribe({
        next: () => {
          this.message.set("Rätten har uppdaterats!");
          this.rensaFormular();
          this.laddaMeny(); // Uppdaterar listan direkt på skärmen
        },
        error: () => this.message.set("Kunde inte uppdatera rätten.")
      });
    } else {
      // Annars skapar vi en helt ny rätt
      this.menuService.addMenuItem(bageriData).subscribe({
        next: (res) => {
          this.message.set("Rätten har lagts till i sortimentet!");
          this.rensaFormular();
          this.laddaMeny(); 
        },
        error: (err) => {
          this.message.set(err.error?.message ?? 'Kunde inte lägga till detta på menyn');
        }
      });
    }
  }

  // Klickar man på ändra, flyttas datan upp till formuläret
  valjBakverkForAndring(item: MenuItem): void {
    this.redigerarId = item._id ?? null;
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
    this.category = item.category;
    this.message.set("Du redigerar just nu: " + item.title);
  }

  // Metod för att ta bort en rätt från listan
  taBortBakverk(id: string | undefined): void {
    if (!id) return;
    
    if (confirm("Är du säker på att du vill ta bort denna rätt?")) {
      this.menuService.deleteMenuItem(id).subscribe({
        next: () => {
          this.message.set("Rätten har raderats.");
          this.laddaMeny(); 
        },
        error: (err) => this.message.set("Kunde inte radera rätten.")
      });
    }
  }

  // Återställer formulärfälten och nollställer redigerings-ID:t
  rensaFormular(): void {
    this.redigerarId = null;
    this.title = "";
    this.description = "";
    this.price = 0;
    this.category = "";
  }
}