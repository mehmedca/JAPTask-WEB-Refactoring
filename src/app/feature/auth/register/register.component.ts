import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { RegisterModel } from '../../../core/models/auth/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] = [];

  constructor(private accountService: AuthService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.minLength(6), Validators.maxLength(12)]],
    })
  }

  register() {
    this.accountService.register(this.registerForm.value as RegisterModel).subscribe(response => {
      this.router.navigateByUrl('/movies');
      this.toastr.success("You have registered successfully!", "Success")
    }, (error: any) => {
      console.log(error.error);
      if(Array.isArray(error.error)){
        error.error.forEach((x: any) => {
          this.validationErrors.push(x.description);
        });
      }
      else {
        this.validationErrors.push(error.error);
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.intitializeForm();
  }

}
