package com.tcc.deverzin.rest.service;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.tcc.deverzin.model.entity.User;
import com.tcc.deverzin.rest.repository.AlunoRepository;
import com.tcc.deverzin.rest.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class TokenService {
    @Value("${jwt.secret.aluno}")
    private String alunoSecret;

    @Value("${jwt.secret.professor}")
    private String professorSecret;

    private final ProfessorRepository professorService;

    private final AlunoRepository alunoService;

    public TokenService(ProfessorRepository professorService, AlunoRepository alunoService) {
        this.professorService = professorService;
        this.alunoService = alunoService;
    }

    public String gerarAlunoToken(Authentication authentication) {
        return generateToken(authentication, alunoSecret, "ALUNO");
    }

    public String gerarProfessorToken(Authentication authentication) {
        return generateToken(authentication, professorSecret, "PROFESSOR");
    }

    private String generateToken(Authentication authentication, String secret, String type) {
        User name = null;

        if (type.equals("PROFESSOR")) {
            name = professorService.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
        } else if (type.equals("ALUNO")) {
            name = alunoService.findByEmail(authentication.getName()).orElseThrow(EntityNotFoundException::new);
        }
        if (name == null) {
            throw new EntityNotFoundException("User not found");
        }

        return JWT.create()
                .withSubject(name.getNome())
                .withClaim("id",name.getId().toString())
                .withClaim("type", type)
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateToken(String token) {
        try {
            String type = JWT.decode(token).getClaim("type").asString();
            String secret = "ALUNO".equals(type) ? alunoSecret : professorSecret;

            return JWT.require(Algorithm.HMAC256(secret))
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}