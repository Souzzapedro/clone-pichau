import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private API = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any[]>(this.API).pipe(take(1));
  }

  salvar(produto: any): Observable<any> {
    return this.http.post<any>(this.API, produto);
  }

  editar(produto: any): Observable<any> {
    return this.http.put<any>(`${this.API}/${produto.id}`, produto);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }

  getProdutoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  getProdutosPorNome(nome: string) {
    return this.http.get<any>(`${this.API}/nome/${nome}`);
  }


  uploadImagem(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/imagens', formData);
  }
  getImagem(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/imagens/${id}`);
  }
  getImagemView(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/imagens/${id}/view`);
  }
  getImagensByProduto(idProduto: number) {
    return this.http.get(`http://localhost:8080/imagens/produto/${idProduto}`);
  }
  getImagens(){
    return this.http.get(`http://localhost:8080/imagens`);
  }
}
