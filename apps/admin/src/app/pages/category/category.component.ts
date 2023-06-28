import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@shop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories!: Category[];
  name!: string;
  icon!: string;

  constructor(
    private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Delete',
            detail: 'Category successfully deleted',
          });
          this.getCategories();
        }),
    });
  }

  updateCategory(id: string) {
    this.router.navigateByUrl(`category/form/${id}`);
  }
}
