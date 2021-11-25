import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Page } from './page';
import { Product } from './product';
import { ProductService } from './product.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public productAE: any;
  public products: Product[] | undefined;
  public pagination: Page | any;
  public status : boolean = true;
  public first : boolean= true ;
  public last : boolean= false;
  public title = "Product managerment";
  constructor(private productService: ProductService) { }
  public similar: Product | undefined;
  ngOnInit(): void {
    this.getAllProduct(0);
  }

  public getAllProduct(page: number): void {
    this.status=true;
    this.productService.getProductPage(page).subscribe(
      (Response: Page) => {
        this.pagination = Response;
        this.products = this.pagination['content'];
        this.first=this.pagination.first;
        this.last=this.pagination.last;
        console.log(this.pagination);
      },
      (Error: HttpErrorResponse) => {
        alert(Error.message);
      }
    )
  }

  public openModal(product: Product | null, mode: string): void {
    const container = document.getElementById("main-action");
    const button = document.createElement("button");

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addmodal');
    }
    if (mode === 'edit') {
      this.productAE = product;
      button.setAttribute('data-bs-target', '#editmodal');
    }
    if (mode === 'delete') {
      this.productAE = product;
      button.setAttribute('data-bs-target', '#deletemodal');
    }
    container?.appendChild(button);
    button.click();
  }

  public getMessage(){
    alert("Xong");
  }
  public addProduct(addForm: NgForm) {
    this.productService.addProduct(addForm.value).subscribe(
      (Response: Product) => {
        console.log(Response);
        this.getAllProduct(this.pagination.totalPages-1);
        addForm.reset();
      },
      (Error: HttpErrorResponse) => {
        alert(Error.message);
      }
    )
  }
  public editProduct(product: Product) {
    this.productService.editProduct(product).subscribe(
      (Response: Product) => {
        console.log(Response);
        this.getAllProduct(this.pagination.number);
      },
      (Error: HttpErrorResponse) => {
        alert(Error.message);
      }
    )
  }

  public deleteProduct(productId: number) {
    this.productService.delProduct(productId).subscribe(
      (Response: void) => {
        console.log(Response);
        if(this.pagination.size !=1) {
          this.getAllProduct(this.pagination.number);
        }else{
          this.getAllProduct(this.pagination.number-1);
        }
      },
      (Error: HttpErrorResponse) => {
        alert(Error.message);
      }

    )
  }

  public search(pro: Product) {
    this.status=false;
    this.similar = pro;
    console.log(this.similar);
    this.productService.search(this.similar).subscribe(
      (Response: Product[]) => {
        console.log(Response);
        this.products = Response;
      },
      (Error: HttpErrorResponse) => {
        alert(Error.message);
      }
    )
  }

  public refresh() {
    this.similar = undefined;
    this.getAllProduct(0);
  }

  public navproduct(i: number) {
    const index: number = this.pagination.number;
    if (index + i > 0 && index + i < this.pagination.totalPages-1) {
      this.getAllProduct(index+i);
    } else if (index + i == 0) {
      this.getAllProduct(index+i);
    } else if (index + i == this.pagination.totalPages-1) {
      this.getAllProduct(index +i);
    }
  }
}



