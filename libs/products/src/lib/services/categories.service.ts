import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { enviroment } from '@env/enviroment.dev'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUri = enviroment.apiUrl + '/categories';
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUri}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiUri}`, {
      ...category,
    });
  }

  deleteCategory(id: string) {
    return this.httpClient.delete<Category>(`${this.apiUri}/${id}`);
  }

  getCategory(id: string) {
    return this.httpClient.get<Category>(`${this.apiUri}/${id}`);
  }

  updateCategory(id: string, update: Category) {
    return this.httpClient.put<Category>(`${this.apiUri}/${id}`, {
      ...update,
    });
  }
}
