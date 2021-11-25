import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';
import { Page } from './page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl :string =environment.apiUrl;
  constructor(private http : HttpClient) { };

  public getAllProduct () : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/all`);
  }

  public getProductPage (page :number) : Observable<Page> {
    return this.http.get<Page>(`${this.apiUrl}/product/${page}`);
  }

  public addProduct (obj : Product) : Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product/add/`,obj);
  }

  public editProduct (obj : Product) : Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/product/update/`,obj);
  }

  public delProduct (id : number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/delete/${id}`);
  }

  public search (obj: Product) : Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/product/findmulti`,obj);
  }

}
