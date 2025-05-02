package com.tcc.deverzin.rest.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public abstract class BaseService<ENTITY> {

    public abstract JpaRepository<ENTITY, Long> getRepository();

    public ENTITY salvar(ENTITY entity) {
        return getRepository().save(entity);
    }

    public void deletar(Long id) {
        getRepository().deleteById(id);
    }

    public ENTITY buscar(Long id) {
        return getRepository().findById(id).orElse(null);
    }

    public List<ENTITY> listar() {
        return getRepository().findAll();
    }
}
