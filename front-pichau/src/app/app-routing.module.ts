import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoViewComponent } from './produto-view/produto-view.component';

const routes: Routes = [
  { path: "cadastro", component: CadastroComponent },
  { path: "produtos", component: ProdutosComponent },
  { path: "produto/:id", component: ProdutoViewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/produtos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
