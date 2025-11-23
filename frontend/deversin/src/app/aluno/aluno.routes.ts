import {Routes} from '@angular/router';

export const alunoRoutes: Routes = [
  {
    path: '',
    title: 'Início',
    loadComponent: () =>
      import('./list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'entrar-turma',
    title: 'Entrar em turma',
    loadComponent: () =>
      import('./turmas/entrar-turma/entrar-turma.component').then((c) => c.EntrarTurmaComponent),
  },
  {
    path: 'visualizar-turma/:codigo',
    title: 'Visualizar turma',
    loadComponent: () =>
      import('./turmas/turma-view/turma-view.component').then((c) => c.TurmaViewComponent),
  },
  {
    path: 'visualizar-atividade/:id/:turmaId',
    title: 'Visualizar atividade',
    loadComponent: () =>
      import('./exercicios/visualizar-exercicio/visualizar-exercicio.component').then((c) => c.VisualizarExercicioComponent),
  },
  {
    path: 'responder-atividade/:id/:turmaId',
    title: 'Responder atividade',
    loadComponent: () =>
      import('./exercicios/responder-exercicio/responder-exercicio.component').then((c) => c.ResponderExercicioComponent),
  },
  {
    path: 'responder-atividade/:id/:turmaId/:respostaId',
    title: 'Continuar atividade',
    loadComponent: () =>
      import('./exercicios/responder-exercicio/responder-exercicio.component').then((c) => c.ResponderExercicioComponent),
  },
]
