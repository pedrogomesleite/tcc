package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.base.BaseRepository;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.AlunoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService extends BaseService<Aluno> {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @Override
    public BaseRepository<Aluno> getRepository() {
        return alunoRepository;
    }
}
