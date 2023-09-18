import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  responsivo = false;
  rotaCadastro = false;

  constructor(private router: Router) {
    this.verificarTamanhoTela(); // Verifique o tamanho da tela quando o componente for carregado

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.verificarTamanhoTela();
      }
    });

  }

  ngOnInit() {
    console.log()
  }


  // Função para verificar o tamanho da tela e atualizar a variável
  verificarTamanhoTela() {
    this.responsivo = window.innerWidth < 1200; // Por exemplo, considere 1200 pixels como o limite para tela pequena
    this.rotaCadastro = this.router.url === '/cadastro';
  }

  // Listener de evento de redimensionamento da janela
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.verificarTamanhoTela();
  }

}
