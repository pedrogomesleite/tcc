package com.tcc.deverzin.rest.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface BaseRepository<ENTITY> extends JpaRepository<ENTITY, Long>, Serializable {
}
