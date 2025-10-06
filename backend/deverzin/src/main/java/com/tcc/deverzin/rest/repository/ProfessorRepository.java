package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Professor;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends BaseRepository<Professor> {

    Professor findByEmail(String email);
}
