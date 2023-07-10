import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@shop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'shop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products!: Product[];

  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.productsService.deleteProduct(id).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Delete',
            detail: 'Product successfully deleted',
          });
          this.getProducts();
        }),
    });
  }
  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
}
