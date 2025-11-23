import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {SplitterModule} from 'primeng/splitter';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import {Chip} from 'primeng/chip';
import {RouterLink} from '@angular/router';
import {AlunoService} from '../aluno.service';
import {TokenService} from '../../public/token.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    TableModule,
    ProgressSpinnerModule,
    ButtonModule,
    Chip,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  alunoService = inject(AlunoService);

  atividades: any[] = [];
  atividadesTotal: number = 0;
  atividadesLoading: boolean = false;

  turmas: any[] = [];
  turmasTotal: number = 0;
  turmasLoading: boolean = false;

  tokenService: TokenService = inject(TokenService);

  async getTurmas(event?: TableLazyLoadEvent | { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string }) {
    const options = {
      first: (event as any)?.first ?? 0,
      rows: (event as any)?.rows ?? 10,
      sortField: (event as any)?.sortField,
      sortOrder: (event as any)?.sortOrder,
      filter: (event as any)?.filter
    };

    this.turmasLoading = true;
    options.filter  = {
      ...options.filter,
      id: this.tokenService
    }
    try {
      const ret = await this.alunoService.listarTurmasPaginado(options);
      this.turmas = ret.data || [];
      this.turmasTotal = ret.totalRecords || 0;
    } finally {
      this.turmasLoading = false;
    }
  }

  async getAtividaes(event?: TableLazyLoadEvent | { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string }) {
    const options = {
      first: (event as any)?.first ?? 0,
      rows: (event as any)?.rows ?? 10,
      sortField: (event as any)?.sortField,
      sortOrder: (event as any)?.sortOrder,
      filter: (event as any)?.filter
    };

    this.atividadesLoading = true;
    try {
      const ret = await this.alunoService.listarRespostasPaginado(options);
      this.atividades = ret.data || [];
      console.log(this.atividades);
      this.atividadesTotal = ret.totalRecords || 0;
    } finally {
      this.atividadesLoading = false;
    }
  }
}
