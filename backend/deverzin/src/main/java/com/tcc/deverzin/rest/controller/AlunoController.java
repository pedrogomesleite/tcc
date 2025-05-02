package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.AlunoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aluno")
public class AlunoController extends BaseController<Aluno> {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @Override
    public BaseService<Aluno> getService() {
        return alunoService;
    }
}
