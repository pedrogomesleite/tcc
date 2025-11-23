import {Routes} from '@angular/router';
import {professorRoutes} from './professor/professor.routes';
import {alunoRoutes} from './aluno/aluno.routes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/redirect/redirect.component').then((c) => c.RedirectComponent),
  },
  {
    path: 'aluno',
    loadComponent: () =>
      import('./aluno/inicio/inicio.component').then((c) => c.InicioComponent),
    children: alunoRoutes,
    canActivate: [authGuard],
    title: "Aluno"
  },
  {
    path: 'professor',
    loadComponent: () =>
      import('./professor/inicio/inicio.component').then((c) => c.InicioComponent),
    children: professorRoutes,
    canActivate: [authGuard],
    title: "Professor"
  },
  {
    path: 'aluno/signup',
    loadComponent: () =>
      import('./public/singup/aluno-singup/aluno-singup.component').then((c) => c.AlunoSingupComponent),
  },
  {
    path: 'aluno/login',
    loadComponent: () =>
      import('./public/login/aluno-login/aluno-login.component').then((c) => c.AlunoLoginComponent),
  },
  {
    path: 'professor/signup',
    loadComponent: () =>
      import('./public/singup/professor-singup/professor-singup.component').then((c) => c.ProfessorSingupComponent),
  },
  {
    path: 'professor/login',
    loadComponent: () =>
      import('./public/login/professor-login/professor-login.component').then((c) => c.ProfessorLoginComponent),
  },
];
