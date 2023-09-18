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

  imagemUrl: any = '';
  imagem: File | undefined;

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
      preco: [null, Validators.required],
      imagem: [null],
    });

  }


  onSubmit() {
    if(this.form.valid){
      if(this.imagem != undefined) {
        const formData: FormData = new FormData();
        formData.append('file', this.imagem)

        console.log(formData);
        this.service.uploadImagem(formData).subscribe(
          resposta => {
            console.log(typeof resposta);
            console.log(resposta);
            this.form.patchValue({
              imagem: resposta,
            });

            this.onCreate();

          }
        )
      }
    }else {
      console.log("Formulario Inválido");
    }
  }


  onCreate() {
    console.log(this.form.value);
    this.service.salvar(this.form.value).subscribe(
      (resposta: any) => {
/*         this.form.reset();
        this.onRemoveImagem(); */
      },
      (error) => {
        console.error('Erro ao adicionar produto: ', error);
      }
    );
  }

  onRemoveImagem() {
    this.imagemUrl = '';
    this.imagem = undefined;
  }

















   // Função para converter data URL em Blob
   dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.displayImage(files[0]);
    }
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagemUrl = e.target.result;
      this.imagem = new File([this.dataURLtoBlob(e.target.result)], file.name);
    };
    reader.readAsDataURL(file);
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
