package com.tcc.deverzin.rest.repository;

import com.tcc.deverzin.model.entity.Atividade;
import com.tcc.deverzin.rest.base.BaseRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtividadeRepository extends BaseRepository<Atividade> {

    @Query(value = """
            select a
            from Atividade a
            left join a.temas t
            where a.titulo like concat('%', :filter, '%')
            or t.nome like concat('%', :filter, '%')
            order by a.id asc
            limit 10
            """)
    List<Atividade> listarComFiltro(@Param("filter") String filtro);
}
