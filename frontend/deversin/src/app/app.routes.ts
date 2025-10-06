import {Routes} from '@angular/router';
import {professorRoutes} from './professor/professor.routes';
import {alunoRoutes} from './aluno/aluno.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/redirect/redirect.component').then((c) => c.RedirectComponent),
  },
  {
    path: 'aluno',
    loadComponent: () =>
      import('./aluno/turmas/turmas.component').then((c) => c.TurmasComponent),
    children: alunoRoutes,
    title: "Aluno"
  },
  {
    path: 'professor',
    loadComponent: () =>
      import('./professor/inicio/inicio.component').then((c) => c.InicioComponent),
    children: professorRoutes,
    title: "Professor"
  }
];
