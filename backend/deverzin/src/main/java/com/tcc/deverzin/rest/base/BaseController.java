package com.tcc.deverzin.rest.base;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController<ENTITY> {
    public abstract BaseService<ENTITY> getService();

    @GetMapping("/listar")
    public ResponseEntity<List<ENTITY>> listar() {
        return new ResponseEntity<>(getService().listar(), HttpStatus.OK);
    }

    @PostMapping("/salvar")
    public ResponseEntity<ENTITY> salvar(@RequestBody ENTITY entity) {
        return new ResponseEntity<>(getService().salvar(entity), HttpStatus.CREATED);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<ENTITY> buscar(@PathVariable Long id) {
        return new ResponseEntity<>(getService().buscar(id), HttpStatus.OK);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        getService().deletar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
