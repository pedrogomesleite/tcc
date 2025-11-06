package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.request.TurmaRequest;
import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.TurmaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TurmaService extends BaseService<Turma> {
    private final TurmaRepository turmaRepository;

    private final ProfessorService professorService;

    private final AtividadeService atividadeService;

    private int codigoLength = 8;

    public TurmaService(TurmaRepository turmaRepository, ProfessorService professorService, AtividadeService atividadeService) {
        this.turmaRepository = turmaRepository;
        this.professorService = professorService;
        this.atividadeService = atividadeService;
    }

    public Turma salvar(TurmaRequest turmaRequest) {
        var turma = new Turma();
        turma.setCriacao(new Date());
        turma.setPrazo(turmaRequest.prazo());
        turma.setAtivo(turmaRequest.ativo() != null ? turmaRequest.ativo() : Boolean.TRUE);
        turma.setAceitarForadoPrazo(turmaRequest.aceitarForadoPrazo());
        turma.setAtividades(turmaRequest.atividades().stream().map(atividadeService::buscar).toList());
        turma.setTitulo(turmaRequest.titulo());
        if (turmaRequest.id() != null) {
            turma.setId(turmaRequest.id());
        } else {
            int ten = 0;
            do {
                if (ten > 10) codigoLength++;
                ten++;
                turma.setCodigo(gerarCodigoAleatorio());
            } while (turmaRepository.existsByCodigo(turma.getCodigo()));
        }
        return super.salvar(turma);
    }

    public String gerarCodigoAleatorio() {
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder codigo = new StringBuilder();
        for (int i = 0; i < codigoLength; i++) {
            int indice = (int) (Math.random() * caracteres.length());
            codigo.append(caracteres.charAt(indice));
        }
        return codigo.toString();
    }

    public List<Turma> listarPorProfessor(Long professorId) {
        return turmaRepository.findAllByProfessor_Id(professorId);
    }

    public Turma getByCodigo(String codigo) {
        return turmaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada com o código: " + codigo));
    }

    @Override
    public JpaRepository<Turma, Long> getRepository() {
        return turmaRepository;
    }
}
