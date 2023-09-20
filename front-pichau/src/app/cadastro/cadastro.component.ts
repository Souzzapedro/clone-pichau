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
export class CadastroComponent implements OnInit{

  form!: FormGroup;

  imagens: any[] = [];

  files: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutosService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}


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
    if(this.form.valid){
    console.log(this.form.value);
      // SALVANDO PRODUTO
      this.service.salvar(this.form.value).subscribe(
        (produtoSalvo: any) => {

          // SALVANDO IMAGEM
          if(this.files.length > 0) {
            for(let i = 0; i < this.files.length; i++) {
              console.log("Entrou: "+ produtoSalvo.id);
              const formData: FormData = new FormData();
              formData.append('file', this.files[i]);
              formData.append('idProduto', produtoSalvo.id);

              console.log(formData);
              this.service.uploadImagem(formData).subscribe(res => console.log(res));
            }
          }

          this.form.reset();

        },
        (error) => {
          console.error('Erro ao adicionar produto: ', error);
        }
      );
    }else {
      console.log("Formulario Inválido");
    }
  }


  onCreate() {
    console.log(this.form.value);
    this.service.salvar(this.form.value).subscribe(
      (resposta: any) => {
        this.form.reset();
        this.imagens = [];
      },
      (error) => {
        console.error('Erro ao adicionar produto: ', error);
      }
    );
  }

  onChange(event : any) {
    this.files = event.target.files;
    this.renderizarImagens();
  }

/*   renderizarPrimeiraImagem() {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // O resultado da leitura será a URL da imagem
        //this.imagemUrl = e.target.result;
      };

      // Lê o arquivo como uma URL de dados (base64)
      reader.readAsDataURL(file);
    }
  } */

  renderizarImagens() {
    this.imagens = []; // Limpe o array de URLs antes de renderizar novamente

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Adicione a URL convertida ao array
        this.imagens.push(e.target.result);
      };

      // Lê o arquivo como uma URL de dados (base64)
      reader.readAsDataURL(file);

      console.log(this.imagens);
    }
  }





   // Função para converter data URL em Blob
/*    dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  } */

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      for (let i = 0; i < droppedFiles.length; i++) {
        this.files.push(droppedFiles[i]);
      }
      this.renderizarImagens();
    }

  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

/*   displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagemUrl = e.target.result;
      this.imagem = new File([this.dataURLtoBlob(e.target.result)], file.name);
    };
    reader.readAsDataURL(file);
  } */




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
