package com.tcc.deverzin.model.entity;


import com.tcc.deverzin.model.enuns.Linguagem;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float nota;

    private Float plagio;

    private Date entrega;

    @Column(columnDefinition = "TEXT")
    private String codigoFonte;

    private String hash;

    private Boolean foraPrazo;

    private Linguagem linguagem;

    @ManyToOne
    private Aluno aluno;

    @ManyToOne
    private Atividade atividade;

    @ManyToOne
    private Turma turma;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Float getNota() {
        return nota;
    }

    public void setNota(Float nota) {
        this.nota = nota;
    }

    public String getCodigoFonte() {
        return codigoFonte;
    }

    public void setCodigoFonte(String codigoFonte) {
        this.codigoFonte = codigoFonte;
    }

    public Float getPlagio() {
        return plagio;
    }

    public void setPlagio(Float plagio) {
        this.plagio = plagio;
    }

    public Date getEntrega() {
        return entrega;
    }

    public void setEntrega(Date entrega) {
        this.entrega = entrega;
    }

    public Boolean getForaPrazo() {
        return foraPrazo;
    }

    public void setForaPrazo(Boolean foraPrazo) {
        this.foraPrazo = foraPrazo;
    }

    public Linguagem getLinguagem() {
        return linguagem;
    }

    public void setLinguagem(Linguagem linguagem) {
        this.linguagem = linguagem;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Atividade getAtividade() {
        return atividade;
    }

    public void setAtividade(Atividade atividade) {
        this.atividade = atividade;
    }
}
