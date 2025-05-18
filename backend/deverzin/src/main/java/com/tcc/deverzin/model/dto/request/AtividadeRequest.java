package com.tcc.deverzin.model.dto.request;

import jakarta.annotation.Nonnull;

import java.util.List;

public record AtividadeRequest(
        @Nonnull
        String titulo,
        @Nonnull
        String corpo,
        String tema,
        List<String> temas
) {
}
