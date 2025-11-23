import {Routes} from '@angular/router';

export const professorRoutes: Routes = [

  {
    path: '',
    title: 'Início',
    loadComponent: () =>
      import('./list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'criar-exercicio',
    title: 'Criar Exercicio',
    loadComponent: () =>
      import('./exercicio/criar/criar-exercicio.component').then((c) => c.CriarExercicioComponent),
  },
  {
    path: 'atualizar-exercicio/:id',
    title: 'Atualizar Exercicio',
    loadComponent: () =>
      import('./exercicio/update/update-exercicio.component').then((c) => c.UpdateExercicioComponent),
  },
  {
    path: 'visualizar-exercicio/:id',
    title: 'Visualizar Exercicio',
    loadComponent: () =>
      import('./exercicio/view/view-exercicio.component').then((c) => c.ViewExercicioComponent),
  },
  {
    path: 'turmas',
    title: 'Visualizar Turma',
    loadComponent: () =>
      import('./turmas/visualizar-turma/visualizar-turma.component').then((c) => c.VisualizarTurmaComponent),
  },
  {
    path: 'atualizar-turma/:codigo',
    title: 'Atualizar Turmas',
    loadComponent: () =>
      import('./turmas/editar-turma/editar-turma.component').then((c) => c.EditarTurmaComponent),
  },
  {
    path: 'turma/:codigo',
    title: 'Visualizar Turmas',
    loadComponent: () =>
      import('./turmas/visualizar-turma/visualizar-turma.component').then((c) => c.VisualizarTurmaComponent),
  },
  {
    path: 'criar-turma',
    title: 'Criar turma',
    loadComponent: () =>
      import('./turmas/criar-turma/criar-turma.component').then((c) => c.CriarTurmaComponent),
  }
]
