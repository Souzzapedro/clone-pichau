package com.pichau.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pichau.model.Produto;
import com.pichau.repository.ProdutoRepository;
import com.pichau.service.exception.ProdutoNaoEncontradaException;


@Service
public class ProdutoService {

	@Autowired
	public ProdutoRepository produtoRepository;
	
	public List<Produto> listar() {
		return produtoRepository.findAll();
	}
	
	public Produto salvar(Produto produto) {
		produto.setId(null);
		return produtoRepository.save(produto);
	}
	
	public Produto buscar(Long id) {
		Produto produto = produtoRepository.findById(id).orElse(null);
		
		if(produto == null) {
			throw new ProdutoNaoEncontradaException("A Produto não pode ser encontrado");
		}else {
			return produto;
		}
	}
	
	public List<Produto> pesquisar(String nome) {
		return produtoRepository.findByNomeContaining(nome);
	}
	
	public void editar(Produto produto) {
		verificarExistencia(produto.getId());
	    produtoRepository.save(produto);
	}
	
	public void deletar(Long id) {
		verificarExistencia(id);
		produtoRepository.deleteById(id);
	}
	
	private void verificarExistencia(Long id) {
		buscar(id);
	}
	
}
