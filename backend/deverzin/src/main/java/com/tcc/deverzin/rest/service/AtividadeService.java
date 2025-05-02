package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.entity.Atividade;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.AtividadeRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class AtividadeService extends BaseService<Atividade> {

    private final AtividadeRepository atividadeRepository;

    public AtividadeService(AtividadeRepository atividadeRepository) {
        this.atividadeRepository = atividadeRepository;
    }

    @Override
    public JpaRepository<Atividade, Long> getRepository() {
        return atividadeRepository;
    }
}
