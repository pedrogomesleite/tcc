package com.tcc.deverzin.rest.service;

import com.auth0.jwt.exceptions.JWTVerificationException;
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

    public String gerarAlunoToken(Authentication authentication) {
        return generateToken(authentication, alunoSecret, "ALUNO");
    }

    public String gerarProfessorToken(Authentication authentication) {
        return generateToken(authentication, professorSecret, "PROFESSOR");
    }

    private String generateToken(Authentication authentication, String secret, String type) {
        return JWT.create()
                .withSubject(authentication.getName())
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