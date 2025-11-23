package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.dto.request.RespostaRequest;
import com.tcc.deverzin.model.entity.Resposta;
import com.tcc.deverzin.rest.base.BaseController;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.base.PageResult;
import com.tcc.deverzin.rest.service.RepostaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resposta")
public class RespostaController extends BaseController<Resposta> {

    private final RepostaService repostaService;

    public RespostaController(RepostaService repostaService) {
        this.repostaService = repostaService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<Resposta> salvar(@RequestBody RespostaRequest respostaRequest) {
        return ResponseEntity.ok(repostaService.salvar(respostaRequest));
    }

    @GetMapping("/aluno/{id}/{turmaId}")
    public ResponseEntity<List<Resposta>> getByAlunoAndTurma(@PathVariable Long id, @PathVariable Long turmaId) {
        return ResponseEntity.ok(repostaService.getByAlunoAndTurma(id, turmaId));
    }

    @GetMapping("/listar-paginado/aluno")
    public ResponseEntity<PageResult<Resposta>> listarPaginado(
            @RequestParam(required = false) Integer first,
            @RequestParam(required = false) Integer rows,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(required = false) Integer id
    ) {
        PageResult<Resposta> result = repostaService.listarPaginado(first, rows, sortField, sortOrder, id.longValue());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public BaseService<Resposta> getService() {
        return repostaService;
    }
}
