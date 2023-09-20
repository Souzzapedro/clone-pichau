package com.pichau.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pichau.model.Imagem;
import com.pichau.repository.ImagemRepository;
import com.pichau.service.ImagemService;

@RestController
@RequestMapping("/imagens")
@CrossOrigin(origins = "*")
public class ImagemController {

	@Autowired
	private ImagemService imagemService;	
	
	@Autowired
	private ImagemRepository imagemRepository;

	@PostMapping
	public ResponseEntity<?> salvarImagem(@RequestParam("file") MultipartFile[] files, @RequestParam("idProduto") String idProduto) {
		return imagemService.salvar(files, idProduto);
	}
	
	@GetMapping
	public ResponseEntity<List<Imagem>> listar() {
		return ResponseEntity.status(HttpStatus.OK).body(imagemRepository.findAll());
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> buscar(@PathVariable("id") Long id) {
		Imagem Imagem = imagemService.buscar(id);

		if (Imagem == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(Imagem);
		}
	}

	@GetMapping(value = "/{id}/view")
	public ResponseEntity<?> buscarImagem(@PathVariable("id") Long id) {
		Imagem Imagem = imagemRepository.findById(id).orElse(null);
		
		if (Imagem != null && Imagem.getDados() != null) {
			MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM; 
			
			String tipoMedia = retornaExtencao(Imagem.getNome());
			
			if ("jpeg".equalsIgnoreCase(tipoMedia) || "jpg".equalsIgnoreCase(tipoMedia) || "jfif".equalsIgnoreCase(tipoMedia)) {
				mediaType = MediaType.IMAGE_JPEG;
			} else if ("png".equalsIgnoreCase(tipoMedia)) {
				mediaType = MediaType.IMAGE_PNG;
			} else if ("gif".equalsIgnoreCase(tipoMedia)) {
				mediaType = MediaType.IMAGE_GIF;
			} else if ("pdf".equalsIgnoreCase(tipoMedia)) {
				mediaType = MediaType.APPLICATION_PDF;
			}
			
			return ResponseEntity.ok().contentType(mediaType).body(Imagem.getDados());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping(value = "/produto/{idProduto}")
	public ResponseEntity<List<Imagem>> listarImagensByProduto(@PathVariable("idProduto") String idProduto) {
		return ResponseEntity.status(HttpStatus.OK).body(imagemRepository.findByIdProduto(idProduto));
	}
	

	private String retornaExtencao(String nomeImagem) {
		if (nomeImagem != null && nomeImagem.lastIndexOf(".") != -1) {
			return nomeImagem.substring(nomeImagem.lastIndexOf(".") + 1);
		}
		return null;
	}
}
