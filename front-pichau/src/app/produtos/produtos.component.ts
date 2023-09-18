import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit{

  produtos: any[] = [];

  constructor(
    private service: ProdutosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    this.service.listar()
      .subscribe(
        produtos => {

          // Adicionando a URL valida para as imagens de cada produto.
          produtos.map((produto: any) => {
            if(produto.imagem != null) {

              let dadosImagem: undefined;
              this.service.getImagem(produto.imagem).subscribe(
                res => {

                  const urlImage = this.criarUrlDaImagem(res.dados, this.obterTipoDeArquivo(res.nome));
                  this.produtos.push({ ...produto, urlImage });

                });

            }else {
              this.produtos.push(produto);
            }
          });

          console.log(this.produtos);
        },
        error => {
          console.error(error);
        }
        );
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
