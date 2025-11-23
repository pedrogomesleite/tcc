package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunoRepository extends BaseRepository<Aluno> {
    Optional<Aluno> findByEmail(String email);
}
