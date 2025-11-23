package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Resposta;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaRepository extends BaseRepository<Resposta> {

    List<Resposta> findAllByAluno_IdAndTurma_Id(Long idAluno, Long idTurma);

    Page<Resposta> findAllByAluno_Id(Long alunoId, Pageable pageable);
}
