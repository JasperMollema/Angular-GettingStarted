import {Injectable} from '@angular/core';
import {Product} from './product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'; // Actual url from web service if you have one.
  private products: Observable<Product[]> = new Observable<Product[]>();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    this.products = this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(err => this.handleError(err))
    );
    console.log('Products retrieved: ');
    console.log(this.products);
    return this.products;
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${errorResponse.status}, error message is: ${errorResponse.message}`;
    } else {
      errorMessage = `Server returned code: ${errorResponse.status}, error message is: ${errorResponse.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
