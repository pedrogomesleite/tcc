import {Tema} from './tema.model';

export interface Atividade {
  id: number | null;
  titulo: string;
  corpo: string;
  tema: Tema | Tema[];
}

export interface AtividadeRequest {
  id: number | null | undefined ;
  titulo: string | null | undefined ;
  corpo: string | null | undefined ;
  tema: string | null | undefined ;
  temas: string[] ;
}
