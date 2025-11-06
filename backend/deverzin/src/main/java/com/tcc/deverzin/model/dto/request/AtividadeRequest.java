package com.tcc.deverzin.model.dto.request;

import jakarta.annotation.Nonnull;

import java.util.List;

public record AtividadeRequest(
        Long id,
        @Nonnull
        String titulo,
        @Nonnull
        String corpo,
        String tema,
        List<String> temas
) {
}
