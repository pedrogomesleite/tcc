import {Tema} from './tema.model';

export interface Atividade {
  id: number | null;
  titulo: string;
  corpo: string;
  tema: Tema | Tema[];
}

export interface AtividadeRequest {
  titulo: string | null | undefined ;
  corpo: string | null | undefined ;
  tema: string | null | undefined ;
  temas: string[] ;
}
