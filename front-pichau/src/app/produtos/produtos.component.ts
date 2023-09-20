import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: any[] = [];
  imagens: any;

  constructor(
    private service: ProdutosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getProdutos();
    this.getImagens();
  }

  getProdutos() {
    this.service.listar().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getImagens() {
    this.service.getImagens().subscribe(
      imagens => {
        const imagensArray = Object.values(imagens);
        this.imagens = imagensArray;
      }
    );
  }

  getFirstImagemProduto(idProduto: number) {
    if(this.imagens) {
      const imagensFiltradas = this.imagens.filter((imagem: any) => imagem.idProduto == idProduto);

      if (imagensFiltradas.length > 0) {
        return this.criarUrlDaImagem(imagensFiltradas[0].dados, this.obterTipoDeArquivo(imagensFiltradas[0].nome));
      } else {
        return "../../assets/img/placeholder-image.jpg";
      }
    }else {
      return "../../assets/img/placeholder-image.jpg";
    }
  }

  criarUrlDaImagem(dadosDaImagem: string, tipoDaImagem: any): SafeUrl {
    const base64Image = `data:${tipoDaImagem};base64,${dadosDaImagem}`;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
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
