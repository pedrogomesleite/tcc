package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Atividade;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.AtividadeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atividade")
public class AtividadeController extends BaseController<Atividade> {

    private final AtividadeService atividadeService;

    public AtividadeController(AtividadeService atividadeService) {
        this.atividadeService = atividadeService;
    }

    @Override
    public BaseService<Atividade> getService() {
        return atividadeService;
    }
}
