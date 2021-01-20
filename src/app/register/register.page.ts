import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  password = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{7,}')]],
      confirmPassword: ['', [Validators.required,
                            Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{7,}')]],
    });
  }
  createUser(){
    const{email, password} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log('RegisterComponent => createUser => user', user);
      this.router.navigate(['/user-tabs']);
    })
    console.log(this.registerForm.value);

  }

}
