package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Tema;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.TemaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tema")
public class TemaController extends BaseController<Tema> {
    private final TemaService temaService;

    public TemaController(TemaService temaService) {
        this.temaService = temaService;
    }

    @Override
    public BaseService<Tema> getService() {
        return temaService;
    }
}
