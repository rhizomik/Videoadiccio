import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-email',
  templateUrl: './dialog-box-email.component.html',
  styleUrls: ['./dialog-box-email.component.css']
})
export class DialogBoxEmailComponent implements OnInit {

  form: FormGroup;

  submitted = false;

  constructor(public dialogRef: MatDialogRef<DialogBoxEmailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
    });
  }

  get fields() {
    return this.form.controls;
  }

  send() {
    this.submitted = true;

    if (this.form.valid) {
      this.dialogRef.close({
        email: this.fields.email.value,
        state: true
      });
    }
  }

}
