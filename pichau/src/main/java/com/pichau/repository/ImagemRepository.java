package com.pichau.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pichau.model.Imagem;

public interface ImagemRepository extends JpaRepository<Imagem, Long>{
 
    List<Imagem> findByIdProduto(String idProduto);

}
