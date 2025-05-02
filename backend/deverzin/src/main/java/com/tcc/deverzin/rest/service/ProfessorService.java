package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.entity.Professor;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.ProfessorRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService extends BaseService<Professor> {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Override
    public JpaRepository<Professor, Long> getRepository() {
        return professorRepository;
    }
}
