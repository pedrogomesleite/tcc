package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Tema;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TemaRepository extends BaseRepository<Tema> {

    @Query("SELECT t FROM Tema t WHERE LOWER(t.nome) LIKE LOWER(:nome)")
    Tema findByNome(@Param("nome") String nome);
}
