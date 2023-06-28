import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@shop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'shop-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: [ '#fff', Validators.required],
    });

    this._checkRoute();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.categoriesService
      .createCategory({
        icon: this.getCategoryFormIcon(),
        name: this.getCategoryFormName(),
        color: this.getCategoryFormColor(),
      })
      .subscribe({
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
  onSubmitUpdate() {
    const update = {
      name: this.getCategoryFormName(),
      icon: this.getCategoryFormIcon(),
      color: this.getCategoryFormColor(),
    };
    this.categoriesService.updateCategory(this.id, update).subscribe({
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

  getCategoryFormName() {
    return this.form.controls['name'].value;
  }

  getCategoryFormIcon() {
    return this.form.controls['icon'].value;
  }

  getCategoryFormColor() {
    return this.form.controls['color'].value || "#fff";
  }

  _checkRoute() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.id = param['id'];
        this.editMode = true;
        this.categoriesService
          .getCategory(param['id'])
          .subscribe((category) => {
            this.form.controls['name'].setValue(category.name);
            this.form.controls['icon'].setValue(category.icon);
            this.form.controls['color'].setValue(category.color);
          });
      }
    });
  }

  onCancel() {
    this.location.back();
  }
}
