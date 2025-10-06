package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends BaseRepository<Aluno> {
    Aluno findByEmail(String email);
}
