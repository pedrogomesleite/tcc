package com.tcc.deverzin.rest.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public PageResult<ENTITY> listarPaginado(Integer first, Integer rows, String sortField, Integer sortOrder) {
        int page = 0;
        int size = (rows != null && rows > 0) ? rows : 10;
        if (first != null && rows != null && rows > 0) {
            page = first / rows;
        }

        Pageable pageable;
        if (sortField != null && !sortField.isEmpty()) {
            Sort.Direction dir = (sortOrder != null && sortOrder < 0) ? Sort.Direction.DESC : Sort.Direction.ASC;
            pageable = PageRequest.of(page, size, Sort.by(dir, sortField));
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<ENTITY> p = getRepository().findAll(pageable);
        return new PageResult<>(p.getContent(), p.getTotalElements());
    }
}
