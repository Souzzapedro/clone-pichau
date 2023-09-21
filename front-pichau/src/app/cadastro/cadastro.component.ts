import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProdutosService } from '../shared/produtos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;

  imagens: any[] = [];

  files: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutosService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      precoAntes: [null, Validators.required],
      preco: [null, Validators.required]
    });
  }


  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // SALVANDO PRODUTO
      this.service.salvar(this.form.value).subscribe(
        (produtoSalvo: any) => {

          // SALVANDO IMAGEM
          if (this.files.length > 0) {
            for (let i = 0; i < this.files.length; i++) {
              const formData: FormData = new FormData();
              formData.append('file', this.files[i]);
              formData.append('idProduto', produtoSalvo.id);

              this.service.uploadImagem(formData).subscribe(res => console.log(res));
            }
          }

          this.form.reset();
          this.files = [];
          this.renderizarImagens();
          console.log(this.imagens.length);

        },
        (error) => {
          console.error('Erro ao adicionar produto: ', error);
        }
      );
    } else {
      console.log("Formulario Inválido");
    }
  }





  renderizarImagens() {
    this.imagens = [];

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Adicione a URL convertida ao array
        this.imagens.push(e.target.result);
      };

      // Lê o arquivo como uma URL de dados (base64)
      reader.readAsDataURL(file);
    }
  }

  // Selecionar files
  onChange(event: any) {
    const filesArray: File[] = Array.from(event.target.files);
  
    for (const file of filesArray) {
      if (this.files.length < 6) {
        this.files.push(file);
      } else {
        console.log("Número de imagens excedido");
        break;
      }
    }
  
    this.renderizarImagens();
  }
  
  
  
  // Arrastar e soltar
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const droppedFiles = event.dataTransfer?.files;
    
    if (droppedFiles) {
      for (let i = 0; i < droppedFiles.length; i++) {
        if(this.files.length < 6) {
          this.files.push(droppedFiles[i]);
        }else {
          console.log("Número de imagens excedido");
          break;          
        }
      }
      this.renderizarImagens();
    }
    
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }


  removerImagem(index: number): void {
    if (index >= 0) {
      this.files.splice(index, 1); // Remove o arquivo pelo índice
      this.renderizarImagens();
    }
  }





  // Conversão da imagem base64 para uma url valida
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
