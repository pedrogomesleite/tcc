package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.service.AlunoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Aluno>> listar() {
        return new ResponseEntity<>(alunoService.listar(), HttpStatus.OK);
    }

    @PostMapping("/salvar")
    public ResponseEntity<Aluno> salvar(@RequestBody Aluno aluno) {
        return new ResponseEntity<>(alunoService.salvar(aluno), HttpStatus.CREATED);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Aluno> buscar(@PathVariable Long id) {
        return new ResponseEntity<>(alunoService.buscar(id), HttpStatus.OK);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
