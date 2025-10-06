package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.request.TurmaRequest;
import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.TurmaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TurmaService extends BaseService<Turma> {
    private final TurmaRepository turmaRepository;

    private final ProfessorService professorService;

    private final AtividadeService atividadeService;

    public TurmaService(TurmaRepository turmaRepository, ProfessorService professorService, AtividadeService atividadeService) {
        this.turmaRepository = turmaRepository;
        this.professorService = professorService;
        this.atividadeService = atividadeService;
    }

    public Turma salvar(TurmaRequest turmaRequest) {
        var turma = new Turma();
        turma.setCriacao(turmaRequest.criacao());
        turma.setPrazo(turmaRequest.prazo());
        turma.setAtivo(turmaRequest.ativo() != null ? turmaRequest.ativo() : Boolean.TRUE);
        turma.setAceitarForadoPrazo(turmaRequest.aceitarForadoPrazo());
        turma.setProfessor(professorService.buscar(turmaRequest.professor()));
        turma.setAtividades(turmaRequest.atividades().stream().map(atividadeService::buscar).toList());
        return super.salvar(turma);
    }

    @Override
    public JpaRepository<Turma, Long> getRepository() {
        return turmaRepository;
    }
}
