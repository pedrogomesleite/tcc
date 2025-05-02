package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Professor;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.ProfessorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class ProfessorController extends BaseController<Professor> {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @Override
    public BaseService<Professor> getService() {
        return professorService;
    }
}
