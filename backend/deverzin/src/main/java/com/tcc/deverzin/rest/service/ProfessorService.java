package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.auth.SingUpDto;
import com.tcc.deverzin.model.entity.Aluno;
import com.tcc.deverzin.model.entity.Professor;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService extends BaseService<Professor> {

    private final ProfessorRepository professorRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfessorService(ProfessorRepository professorRepository, PasswordEncoder passwordEncoder) {
        this.professorRepository = professorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Professor singUp(SingUpDto dto) {
        Professor professor = new Professor(dto);
        return salvar(professor);
    }

    public Professor authenticate(String email, String senha) {
        Professor professor = professorRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
        if (professor == null || !passwordEncoder.matches(senha, professor.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }
        return professor;
    }

    public Professor findByEmail(String email) {
        return professorRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public JpaRepository<Professor, Long> getRepository() {
        return professorRepository;
    }
}
