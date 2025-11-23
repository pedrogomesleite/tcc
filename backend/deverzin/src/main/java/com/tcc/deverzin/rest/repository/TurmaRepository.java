package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TurmaRepository extends BaseRepository<Turma> {

    Boolean existsByCodigo(String codigo);

    Optional<Turma> findByCodigo(String codigo);
    
    List<Turma> findAllByProfessor_Id(Long professorId);

    @Query("SELECT t FROM Aluno a JOIN a.turmas t WHERE a.id = :id")
    Page<Turma> findAll(Pageable pageable, @Param("id") Long id);
}
