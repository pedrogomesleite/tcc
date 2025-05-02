package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.entity.Resposta;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.RespostaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class RepostaService extends BaseService<Resposta> {

    private final RespostaRepository repository;

    public RepostaService(RespostaRepository repository) {
        this.repository = repository;
    }

    @Override
    public JpaRepository<Resposta, Long> getRepository() {
        return repository;
    }
}
