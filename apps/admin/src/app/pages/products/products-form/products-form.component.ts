import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@shop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'shop-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  products!: Product[];
  editMode = false;
  categories!: Category[];
  imageDisplay!: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productService: ProductsService
  ) {}
  ngOnInit(): void {
    this._initForm();
    this._checkRoute();
    this.getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      images: [''],
      isFeatured: [false],
    });
  }

  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData).subscribe({
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not created',
          life: 500,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category successfully created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  onImageUpload(event: any) {
    const file = event.target?.files[0];
    if (!file) return;
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageDisplay = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const productData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productData.append(key, this.form.controls[key].value);
    });
    this._addProduct(productData);
  }

  onSubmitUpdate() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const productData = new FormData();
    console.log(this.form.controls);
    Object.keys(this.form.controls).map((key) => {
      productData.append(key, this.form.controls[key].value);
      console.log(productData);
    });
    console.log(productData);
    this.productService.updateProduct(this.id, productData).subscribe({
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not updated',
          life: 500,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category successfully updated',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
    });
  }

  _checkRoute() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.id = param['id'];
        this.editMode = true;
        this.productService
          .getProduct(param['id'])
          .subscribe((product: any) => {
            this.form.controls['name'].setValue(product.name);
            this.form.controls['brand'].setValue(product.brand);
            this.form.controls['image'].setValue(product.image);
            this.form.controls['price'].setValue(product.price);
            this.form.controls['isFeatured'].setValue(product.isFeatured);
            this.form.controls['description'].setValue(product.description);
            this.form.controls['richDescription'].setValue(
              product.richDescription
            );
            this.form.controls['category'].setValue(product.category.id);
            this.form.controls['countInStock'].setValue(product.countInStock);
            this.imageDisplay = product.image;
          });
      }
    });
  }
}
