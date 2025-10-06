package com.tcc.deverzin.model.dto.request;

import java.util.Date;
import java.util.List;

public record TurmaRequest(
        Date criacao,
        Date prazo,
        Boolean ativo,
        Boolean aceitarForadoPrazo,
        Long professor,
        List<Long> atividades
) {
}
