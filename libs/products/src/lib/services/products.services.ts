import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '@env/enviroment.dev';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUri = enviroment.apiUrl + '/products';
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUri}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUri}`, productData);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete<Product>(`${this.apiUri}/${id}`);
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.apiUri}/${id}`);
  }

  updateProduct(id: string, update: FormData) {
    return this.httpClient.put<Product>(`${this.apiUri}/${id}`, {
      ...update,
    });
  }
}
