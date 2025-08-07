import { PaginationService } from '@/shared/components/pagination/paginacion.service';
import { Component, effect, inject, signal } from '@angular/core';
import { ProductTableComponent } from "@products/components/product-table/product-table.component";
import { Product } from '@products/interfaces/product.interface.ts';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin.page',
  imports: [RouterLink, ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  page = signal<number>(0);
  productPerPage = signal<number>(10);
  products = signal<Product[]>([]);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);


  constructor() {
    effect(() =>{
      const page = this.paginationService.currentPage();
      this.loadProducts(page);
    })
  }

 loadProducts(page: number) {
    const limit = this.productPerPage();
    const offset = (page - 1) * limit;
    this.productsService.getProducts({
      limit, offset
    })
      .subscribe({
        next: (resp) => {
          this.page.set(resp.pages);
          this.products.set(resp.products);
        },
        error: (err) => {
          console.error('Error cargando productos', err);
        }
      });
  }
}
