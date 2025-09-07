import {Routes} from '@angular/router';

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
  },
  {
    path: 'professor',
    loadComponent: () =>
      import('./professor/inicio/inicio.component').then((c) => c.InicioComponent),
    children: [
      {
        path: 'criar-exercicio',
        loadComponent: () =>
          import('./professor/exercicio/criar/criar-exercicio.component').then((c) => c.CriarExercicioComponent),
      },
      {
        path: 'turmas',
        loadComponent: () =>
          import('./professor/turmas/turmas.component').then((c) => c.TurmasComponent),
      }
    ]
  }
];
