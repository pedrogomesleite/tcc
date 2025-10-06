package com.tcc.deverzin.rest.controller;

import com.tcc.deverzin.model.dto.auth.LoginDto;
import com.tcc.deverzin.model.dto.auth.SingUpDto;
import com.tcc.deverzin.model.dto.auth.TokenResponseDto;
import com.tcc.deverzin.rest.service.AlunoService;
import com.tcc.deverzin.rest.service.ProfessorService;
import com.tcc.deverzin.rest.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final TokenService tokenService;
    private final AlunoService alunoService;
    private final ProfessorService professorService;

    public AuthController(TokenService tokenService, AlunoService alunoService, ProfessorService professorService) {
        this.tokenService = tokenService;
        this.alunoService = alunoService;
        this.professorService = professorService;
    }

    @PostMapping("/professor/signup")
    public ResponseEntity<HttpStatus> professorSingup(@RequestBody SingUpDto signup) {
        var professor = professorService.singUp(signup);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/aluno/signup")
    public ResponseEntity<HttpStatus> alunoSignup(@RequestBody SingUpDto signup) {
        var aluno = alunoService.singUp(signup);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/professor/login")
    public ResponseEntity<TokenResponseDto> professorLogin(@RequestBody LoginDto loginDto) {
        var professor = professorService.authenticate(loginDto.email(), loginDto.senha());
        var authentication = new UsernamePasswordAuthenticationToken(professor.getEmail(), professor.getSenha());
        String token = tokenService.gerarProfessorToken(authentication);
        return ResponseEntity.ok(new TokenResponseDto(token));
    }

    @PostMapping("/aluno/login")
    public ResponseEntity<TokenResponseDto> alunoLogin(@RequestBody LoginDto loginDto) {
        var aluno = alunoService.authenticate(loginDto.email(), loginDto.senha());
        var authentication = new UsernamePasswordAuthenticationToken(aluno.getEmail(), aluno.getSenha());
        String token = tokenService.gerarAlunoToken(authentication);
        return ResponseEntity.ok(new TokenResponseDto(token));
    }
}
