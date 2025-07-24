import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/interfaces/product.interface.ts';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from '@/shared/components/pagination/paginacion.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  page = signal<number>(0);
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
    const limit = 9;
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
