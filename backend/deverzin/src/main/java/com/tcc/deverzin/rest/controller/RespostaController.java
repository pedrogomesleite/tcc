package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Resposta;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.RepostaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/resposta")
public class RespostaController extends BaseController<Resposta> {

    private final RepostaService repostaService;

    public RespostaController(RepostaService repostaService) {
        this.repostaService = repostaService;
    }

    @Override
    public BaseService<Resposta> getService() {
        return repostaService;
    }
}
