import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '@products/interfaces/product.interface.ts';
import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { UpperCasePipe, CommonModule } from '@angular/common';
import { PaginationService } from '@/shared/components/pagination/paginacion.service';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";

@Component({
  selector: 'app-gender-page',
  standalone: true,
  imports: [ProductCardComponent, UpperCasePipe, CommonModule, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  page = signal<number>(0);
  products = signal<Product[]>([]);
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);
  paginationService = inject(PaginationService);


   gender = toSignal(
    this.route.params.pipe(map(({ gender }) => gender))
  );

  constructor() {
    effect(() =>{
      const page = this.paginationService.currentPage();
      const genderValue = this.gender();
    if (!genderValue) return;

    this.loadProducts(page, genderValue);
    })
  }

 loadProducts(page: number, gender: string) {
    const limit = 9;
    const offset = (page - 1) * limit;
    this.productService.getProducts({ gender, limit, offset})
        .subscribe({
          next: (resp) => {
            this.page.set(resp.pages);
            this.products.set(resp.products);
          },
          error: (err) => {
            console.error('Error cargando productos', err);
          }
        });
    };
  }














