import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  usuarioNoValido = false;

  constructor( private formBuilder: FormBuilder ) {
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
    if (this.form.get('usuario').invalid) {
      this.usuarioNoValido = true;
    } else {
      this.usuarioNoValido = false;
    }
  }

}