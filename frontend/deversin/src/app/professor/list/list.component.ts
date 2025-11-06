import {Component, inject, OnInit} from '@angular/core';
import {ProfessorService} from '../professor.service';
import {CommonModule} from '@angular/common';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {SplitterModule} from 'primeng/splitter';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import {LazyLoadEvent} from 'primeng/api';
import {Chip} from 'primeng/chip';
import {RouterLink} from '@angular/router';

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
  professorService = inject(ProfessorService);

  atividades: any[] = [];
  atividadesTotal: number = 0;
  atividadesLoading: boolean = false;

  turmas: any[] = [];
  turmasTotal: number = 0;
  turmasLoading: boolean = false;


  async getTurmas(event?: TableLazyLoadEvent | { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string }) {
    const options = {
      first: (event as any)?.first ?? 0,
      rows: (event as any)?.rows ?? 10,
      sortField: (event as any)?.sortField,
      sortOrder: (event as any)?.sortOrder,
      filter: (event as any)?.filter
    };

    this.turmasLoading = true;
    try {
      const ret = await this.professorService.listarTurmasPaginado(options);
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
      const ret = await this.professorService.listarAtividadesPaginado(options);
      this.atividades = ret.data || [];
      this.atividadesTotal = ret.totalRecords || 0;
    } finally {
      this.atividadesLoading = false;
    }
  }
}
