package com.pichau.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Produto {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonInclude(Include.NON_NULL)
	@NotNull
	private String nome;
	
	@JsonInclude(Include.NON_NULL)
	@NotNull
	private BigDecimal precoAntes;
	
	@JsonInclude(Include.NON_NULL)
	@NotNull
	private BigDecimal preco;

	
	private Long imagem;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public BigDecimal getPrecoAntes() {
		return precoAntes;
	}

	public void setPrecoAntes(BigDecimal precoAntes) {
		this.precoAntes = precoAntes;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public Long getImagem() {
		return imagem;
	}

	public void setImagem(Long imagem) {
		this.imagem = imagem;
	}


}
