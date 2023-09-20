package com.pichau.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pichau.model.Imagem;
import com.pichau.repository.ImagemRepository;

@Service
public class ImagemService {

	@Autowired
	private ImagemRepository imagemRepository;

//	public ResponseEntity<?> salvar(MultipartFile file) {
//		List<String> nomesImagemSalvos = new ArrayList<>();
//
//		try {
//			Imagem imagem = new Imagem();
//			imagem.setNome(file.getOriginalFilename());
//			imagem.setDados(file.getBytes());
//
//			imagemRepository.save(imagem);
//
//			nomesImagemSalvos.add(imagem.getNome());
//			System.out.println("Recebendo Imagem: " + file.getOriginalFilename() + " de id: " + imagem.getId());
//			return ResponseEntity.status(HttpStatus.CREATED).body(imagem.getId());
//		} catch (IOException e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao salvar dados " + e);
//		}
//
//	}

	public ResponseEntity<?> salvar(MultipartFile[] files, String idProduto) {
		List<String> nomesImagemSalvos = new ArrayList<>();
		
		for(MultipartFile file : files) {
			try {
				Imagem imagem = new Imagem();
				imagem.setNome(file.getOriginalFilename());
				imagem.setDados(file.getBytes());
				imagem.setIdProduto(idProduto);
				
				imagemRepository.save(imagem);
				
				nomesImagemSalvos.add(imagem.getNome());
				System.out.println("Recebendo Imagem: " + file.getOriginalFilename() + " de id: " + imagem.getId() + " e idProduto: " + imagem.getIdProduto());
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao salvar dados " + e);
			}
			
		}
		
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Upload de " + nomesImagemSalvos.size() + " Imagem concluído com sucesso!");
		response.put("nomesImagemSalvos", nomesImagemSalvos);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	
	public Imagem buscar(Long id) {
		return imagemRepository.findById(id).orElse(null);
	}

}
