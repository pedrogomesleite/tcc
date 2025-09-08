package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.dto.request.AtividadeRequest;
import com.tcc.deverzin.model.entity.Atividade;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.AtividadeService;
import jakarta.servlet.ServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atividade")
public class AtividadeController extends BaseController<Atividade> {

    private final AtividadeService atividadeService;

    public AtividadeController(AtividadeService atividadeService) {
        this.atividadeService = atividadeService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<Atividade> salvar(@RequestBody AtividadeRequest atividade) {
        return new ResponseEntity<>(atividadeService.salvar(atividade), HttpStatus.CREATED);
    }

    @GetMapping("/listar/{filtro}")
    public ResponseEntity<List<Atividade>> listarComFiltro(@PathVariable String filtro, ServletResponse servletResponse) {
        return ResponseEntity.ok(atividadeService.listarComFiltro(filtro));
    }

    @Override
    public BaseService<Atividade> getService() {
        return atividadeService;
    }
}
