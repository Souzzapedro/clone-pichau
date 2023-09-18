package com.pichau.service.exception;

public class ProdutoNaoEncontradaException extends RuntimeException{
	
	public ProdutoNaoEncontradaException(String mensagem) {
		super(mensagem);
	}
	
	public ProdutoNaoEncontradaException(String mensagem, Throwable causa) {
		super(mensagem, causa);
	}
}
