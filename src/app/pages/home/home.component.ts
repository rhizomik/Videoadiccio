import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  usuarioNoValido = false;

  constructor( private formBuilder: FormBuilder,
               private router: Router, 
               private storageService: StorageService) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  initForm() {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required]
    });
  }

  nuevaSesion() {
    if (this.form.invalid) {
      this.usuarioNoValido = true;
    } else {
      this.usuarioNoValido = false;
      
      this.storageService.resetRelationsHistory();
      this.router.navigate(['session']);
    }
  }

}
