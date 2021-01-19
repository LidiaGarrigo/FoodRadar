/* import { AngularFireAuth } from '@angular/fire/auth'; */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm!: FormGroup;
  submitted = false;
  error!: string;
  formGroup: any;
  errorValidator = 0;

  constructor(
    /* public firebaseService: FirebaseService, */
    private fb: FormBuilder,
  /*   private auth: AngularFireAuth, */
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{7,}')]],
    });
  }
  onLogin(){
/*     const {email, password} = this.myForm.value;
    this.auth.signInWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['/user-tabs']))
    .catch((error) => {
      if(error.code === 'auth/user-not-found'){
        this.errorValidator = 1;
      } else if(error.code === 'auth/wrong-password'){
        this.errorValidator = 2;
      }
      this.error = error.message;
      console.log(this.error);
  }); */
  }

  submit(){
    console.log(this.myForm.value);
  }

}
