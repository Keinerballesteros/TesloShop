import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { of, pipe } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activadedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService)

   request = computed(() => ({
    idSlug: this.activadedRoute.snapshot.params['idSlug'],
  }));

  // loader: equivalente, usando toSignal
  product = toSignal(
  this.request().idSlug
    ? this.productService.getProductBySlug(this.request().idSlug)
    : of(null),
  { initialValue: null }
);
 }
