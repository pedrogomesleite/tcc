package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.dto.request.TurmaRequest;
import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.service.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turma")
public class TurmaController extends BaseController<Turma> {
    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<Turma> salvar(@RequestBody TurmaRequest entity) {
        return new ResponseEntity<>(turmaService.salvar(entity), HttpStatus.CREATED);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Turma>> listByProfessor(@PathVariable Long id) {
        return ResponseEntity.ok(turmaService.listarPorProfessor(id));
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Turma> getByCodigo(@PathVariable String codigo) {
        Turma turma = turmaService.getByCodigo(codigo);
        return ResponseEntity.ok(turma);
    }

    @Override
    public BaseService<Turma> getService() {
        return turmaService;
    }
}
