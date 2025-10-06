package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.auth.SingUpDto;
import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.rest.base.BaseRepository;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.AlunoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AlunoService extends BaseService<Aluno> {

    private final AlunoRepository alunoRepository;
    private final PasswordEncoder passwordEncoder;

    public AlunoService(AlunoRepository alunoRepository, PasswordEncoder passwordEncoder) {
        this.alunoRepository = alunoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Aluno singUp(SingUpDto dto) {
        Aluno aluno = new Aluno(dto);
        return salvar(aluno);
    }

    public Aluno authenticate(String email, String senha) {
        Aluno aluno = alunoRepository.findByEmail(email);
        if (aluno == null || !passwordEncoder.matches(senha, aluno.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }
        return aluno;
    }

    @Override
    public BaseRepository<Aluno> getRepository() {
        return alunoRepository;
    }
}
