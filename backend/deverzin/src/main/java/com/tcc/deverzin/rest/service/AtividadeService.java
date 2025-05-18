package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.dto.request.AtividadeRequest;
import com.tcc.deverzin.model.entity.Atividade;
import com.tcc.deverzin.model.entity.Tema;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.AtividadeRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AtividadeService extends BaseService<Atividade> {

    private final AtividadeRepository atividadeRepository;

    private final TemaService temaService;

    public AtividadeService(AtividadeRepository atividadeRepository, TemaService temaService) {
        this.atividadeRepository = atividadeRepository;
        this.temaService = temaService;
    }

    public Atividade salvar(AtividadeRequest atividadeRequest) {
        List<Tema> temas = new ArrayList<>();
        if (atividadeRequest.tema() != null) {
            temas.add(temaService.buscarOuCriar(atividadeRequest.tema()));
        }
        if (atividadeRequest.temas() != null) {
            atividadeRequest.temas().forEach(tema -> temas.add(temaService.buscarOuCriar(tema)));
        }
        Atividade atividade = new Atividade();
        atividade.setTitulo(atividadeRequest.titulo());
        atividade.setCorpo(atividadeRequest.corpo());
        atividade.setTemas(temas);
        return super.salvar(atividade);
    }

    @Override
    public JpaRepository<Atividade, Long> getRepository() {
        return atividadeRepository;
    }
}
