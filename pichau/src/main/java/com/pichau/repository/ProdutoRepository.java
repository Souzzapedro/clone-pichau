package com.pichau.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pichau.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

	@Query("SELECT p FROM Produto p WHERE p.nome LIKE %:nome%")
    List<Produto> findByNomeContaining(@Param("nome") String nome);
}
