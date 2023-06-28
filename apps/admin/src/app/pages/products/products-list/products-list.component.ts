import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@shop/products';

@Component({
  selector: 'shop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products!: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
  deleteProduct(arg0: any) {
    throw new Error('Method not implemented.');
  }
  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
}
