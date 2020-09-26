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
               private router: Router) {
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
      this.router.navigate(['session']);
    }
  }

}
