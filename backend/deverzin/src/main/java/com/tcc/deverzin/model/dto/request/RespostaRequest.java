package com.tcc.deverzin.model.dto.request;

public record RespostaRequest(
        String resposta,
        Boolean finalizada,
        Long alunoId,
        Long atividadeId,
        Long turmaId
) {
}
