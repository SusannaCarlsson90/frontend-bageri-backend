import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Om } from './pages/om/om';
import { Sortiment } from './pages/sortiment/sortiment';
import { Meny } from './pages/meny/meny';

export const routes: Routes = [
  { path: "", component: Home},
  { path: "admin", component: Admin },
  { path: "login", component: Login},
  { path: "meny", component: Meny},
  { path: "sortiment", component: Sortiment },
  { path: "om", component: Om},
  { path: "**", redirectTo: "", pathMatch: "full" }
];
