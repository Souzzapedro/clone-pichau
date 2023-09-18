package com.pichau.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pichau.model.Produto;
import com.pichau.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	@GetMapping
	public ResponseEntity<List<Produto>> listar() {
		return ResponseEntity.status(HttpStatus.OK).body(produtoService.listar());
	}
	
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody Produto Produto) {
		produtoService.salvar(Produto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(Produto.getId()).toUri();

		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Produto> buscar(@PathVariable("id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(produtoService.buscar(id));
	}

	@GetMapping(value = "/nome/{nome}")
	public ResponseEntity<List<Produto>> pesquisar(@PathVariable("nome") String nome) {
		return ResponseEntity.status(HttpStatus.OK).body(produtoService.pesquisar(nome));
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> editar(@PathVariable("id") Long id, @RequestBody Produto Produto) {
		Produto.setId(id);
		produtoService.editar(Produto);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> remover(@PathVariable("id") Long id) {
		produtoService.deletar(id);
		return ResponseEntity.noContent().build();		
	}
	
}

