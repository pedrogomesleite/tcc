package com.tcc.deverzin.rest.service;

import com.tcc.deverzin.model.entity.Tema;
import com.tcc.deverzin.rest.base.BaseService;
import com.tcc.deverzin.rest.repository.TemaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TemaService extends BaseService<Tema> {

    private final TemaRepository temaRepository;

    public TemaService(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    public Tema buscarOuCriar(String nome) {
        Tema tema = buscarPorNome(nome);
        if (tema == null) {
            tema = new Tema();
            tema.setNome(nome);
            salvar(tema);
        }
        return tema;
    }

    public Tema buscarPorNome(String nome) {
        return temaRepository.findByNome(nome);
    }

    @Override
    public JpaRepository<Tema, Long> getRepository() {
        return temaRepository;
    }
}
