import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  { path: "cadastro", component: CadastroComponent },
  { path: "produtos", component: ProdutosComponent },
  { path: '', pathMatch: 'full', redirectTo: '/produtos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
