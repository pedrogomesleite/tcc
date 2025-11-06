package com.tcc.deverzin.model.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date criacao;

    private Date prazo;

    private Boolean ativo;

    private String codigo;

    private String titulo;

    private Boolean aceitarForadoPrazo;

    @ManyToOne
    private Professor professor;

    @ManyToMany
    private List<Atividade> atividades;

    public List<Atividade> getAtividades() {
        return atividades;
    }

    public void setAtividades(List<Atividade> atividades) {
        this.atividades = atividades;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCriacao() {
        return criacao;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setCriacao(Date criacao) {
        this.criacao = criacao;
    }

    public Date getPrazo() {
        return prazo;
    }

    public void setPrazo(Date prazo) {
        this.prazo = prazo;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Boolean getAceitarForadoPrazo() {
        return aceitarForadoPrazo;
    }

    public void setAceitarForadoPrazo(Boolean aceitarForadoPrazo) {
        this.aceitarForadoPrazo = aceitarForadoPrazo;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
}
