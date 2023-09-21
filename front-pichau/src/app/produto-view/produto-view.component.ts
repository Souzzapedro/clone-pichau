import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.scss']
})
export class ProdutoViewComponent implements OnInit {
  produto: any;
  imagens: any[] = [];

  constructor(
    private service: ProdutosService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.service.getProdutoPorId(id).subscribe(
        produto => {
          this.produto = produto
        },
        error => {
          console.error("Erro buscando produto: " + error);
        }
      );

      this.service.getImagensByProduto(id).subscribe(
        imagens => {
          const imagensArray = Object.values(imagens);
          imagensArray.forEach((imagem: any) => {
            this.imagens.push(this.getUrlImagemProduto(imagem));
          });
          console.log(this.imagens);
        }
      );

    });
  }

  getUrlImagemProduto(imagem: any) {
    if(imagem) {
      return this.criarUrlDaImagem(imagem.dados, this.obterTipoDeArquivo(imagem.nome));
    }else {
      return null;
    }
  }
  criarUrlDaImagem(dadosDaImagem: string, tipoDaImagem: any): SafeUrl {
    return `data:${tipoDaImagem};base64,${dadosDaImagem}`;
  }
  obterTipoDeArquivo(nomeDoArquivo: string): string | null {
    if (!nomeDoArquivo) {
      return null;
    }

    const extensao = nomeDoArquivo.match(/\.([^.]+)$/);

    if (extensao && extensao.length > 1) {
      return `image/${extensao[1].toLowerCase()}`;
    }

    return null;
  }
}
