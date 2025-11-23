package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.request.TurmaRequest;
import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.base.PageResult;
import com.tcc.deverzin.rest.repository.TurmaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TurmaService extends BaseService<Turma> {
    private final TurmaRepository turmaRepository;

    private final AlunoService alunoService;

    private final ProfessorService professorService;

    private final AtividadeService atividadeService;

    private int codigoLength = 8;

    public TurmaService(TurmaRepository turmaRepository, AlunoService alunoService, ProfessorService professorService, AtividadeService atividadeService) {
        this.turmaRepository = turmaRepository;
        this.alunoService = alunoService;
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

    public PageResult<Turma> listarPaginado(Integer first, Integer rows, String sortField, Integer sortOrder, Long id) {
        int page = 0;
        int size = (rows != null && rows > 0) ? rows : 10;
        if (first != null && rows != null && rows > 0) {
            page = first / rows;
        }

        Pageable pageable;
        if (sortField != null && !sortField.isEmpty()) {
            Sort.Direction dir = (sortOrder != null && sortOrder < 0) ? Sort.Direction.DESC : Sort.Direction.ASC;
            pageable = PageRequest.of(page, size, Sort.by(dir, sortField));
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<Turma> p = turmaRepository.findAll(pageable, id);
        return new PageResult<>(p.getContent(), p.getTotalElements());
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

    public Turma adicionarAlunoNaTurma(String codigo, Long id) {
        var aluno = alunoService.buscar(id);
        var turma = getByCodigo(codigo);
        aluno.getTurmas().add(turma);
        alunoService.salvar(aluno);
        return turma;
    }
}
