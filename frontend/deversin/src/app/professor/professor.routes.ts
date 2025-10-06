import {Routes} from '@angular/router';

export const professorRoutes: Routes = [
  {
    path: 'criar-exercicio',
    title: 'Criar Exercicio',
    loadComponent: () =>
      import('./exercicio/criar/criar-exercicio.component').then((c) => c.CriarExercicioComponent),
  },
  {
    path: 'turmas',
    title: 'Visualizar Turmas',
    loadComponent: () =>
      import('./turmas/turmas.component').then((c) => c.TurmasComponent),
  },
  {
    path: 'criar-turma',
    title: 'Criar turma',
    loadComponent: () =>
      import('./turmas/criar-turma/criar-turma.component').then((c) => c.CriarTurmaComponent),
  }
]
