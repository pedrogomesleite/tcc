package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.dto.request.TurmaRequest;
import com.tcc.deverzin.model.entity.Turma;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.base.PageResult;
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

    @PostMapping("/{codigo}/{id}")
    public ResponseEntity<Turma> adicionarAlunoNaTurma(@PathVariable String codigo, @PathVariable Long id) {
        Turma turma = turmaService.adicionarAlunoNaTurma(codigo, id);
        return ResponseEntity.ok(turma);
    }

    @GetMapping("/listar-paginado/aluno")
    public ResponseEntity<PageResult<Turma>> listarPaginado(
            @RequestParam(required = false) Integer first,
            @RequestParam(required = false) Integer rows,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(required = false) String id
            ) {
        PageResult<Turma> result = turmaService.listarPaginado(first, rows, sortField, sortOrder, Long.valueOf(id));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public BaseService<Turma> getService() {
        return turmaService;
    }
}
