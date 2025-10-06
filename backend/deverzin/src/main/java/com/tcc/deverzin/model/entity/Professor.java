package com.tcc.deverzin.model.entity;

import com.tcc.deverzin.model.dto.auth.SingUpDto;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
public class Professor extends User {

    @OneToMany
    private List<Turma> turmas;

    public Professor(SingUpDto dto) {
        setNome(dto.nome());
        setEmail(dto.email());
        setSenha(dto.senha());
        this.turmas = List.of();
    }

    public Professor() {

    }

    public List<Turma> getTurmas() {
        return turmas;
    }

    public void setTurmas(List<Turma> turmas) {
        this.turmas = turmas;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return super.isEnabled();
    }
}
