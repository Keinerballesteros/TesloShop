import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@products/interfaces/product.interface.ts';
import { ProductsService } from '@products/services/products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  product: Product | null = null;
  loading = false;
  error: any = null;

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });

    // effect(() => {
    //   if (this.error()) {
    //     this.router.navigate(['/admin/products']);
    //   }
    // });
  }

  loadProduct(id: string) {
    this.loading = true;
    this.error = null;

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

}
