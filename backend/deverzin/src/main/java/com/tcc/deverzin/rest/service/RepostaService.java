package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.request.RespostaRequest;
import com.tcc.deverzin.model.entity.Resposta;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.base.PageResult;
import com.tcc.deverzin.rest.repository.RespostaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

@Service
public class RepostaService extends BaseService<Resposta> {

    private final RespostaRepository repository;

    private final AlunoService alunoService;

    private final AtividadeService atividadeService;

    private final TurmaService turmaService;

    public RepostaService(RespostaRepository repository, AlunoService alunoService, AtividadeService atividadeService, TurmaService turmaService) {
        this.repository = repository;
        this.alunoService = alunoService;
        this.atividadeService = atividadeService;
        this.turmaService = turmaService;
    }

    public Resposta salvar(RespostaRequest resposta) {
        var resp = new Resposta();
        resp.setAluno(alunoService.buscar(resposta.alunoId()));
        resp.setAtividade(atividadeService.buscar(resposta.atividadeId()));
        resp.setTurma(turmaService.buscar(resposta.turmaId()));
        if (resposta.finalizada()) {
            var agora = new Date();
            resp.setEntrega(agora);
        }
        String codigo = resposta.resposta();
        resp.setCodigoFonte(codigo);
        if (codigo != null) {
            resp.setHash(sha256Hex(codigo));
        } else {
            resp.setHash(null);
        }
        return super.salvar(resp);
    }

    public List<Resposta> getByAlunoAndTurma(Long alunoId, Long turmaId) {
        return repository.findAllByAluno_IdAndTurma_Id(alunoId, turmaId);
    }

    public PageResult<Resposta> listarPaginado(Integer first, Integer rows, String sortField, Integer sortOrder, Long alunoId) {
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

        Page<Resposta> p = repository.findAllByAluno_Id(alunoId, pageable);
        return new PageResult<>(p.getContent(), p.getTotalElements());
    }

    @Override
    public JpaRepository<Resposta, Long> getRepository() {
        return repository;
    }

    private String sha256Hex(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            // SHA-256 is always available in the JVM; wrap as runtime if not
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}
