import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import {WebSocketService} from "../web-socket.service";
import { ActivatedRoute, RouteReuseStrategy, Params, Router } from '@angular/router';
// import Inputmask from 'inputmask';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('formDirective') myNgForm;
  CompanyContactForm: FormGroup;
  contactRequest: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private webSocketService: WebSocketService) {
  }



  get contactMailAddress() {
    return this.CompanyContactForm.get('contactMailAddress').value;
  }

  get contactPassword() {
    return this.CompanyContactForm.get('contactPassword').value;
  }

  get f() {
    return this.CompanyContactForm.controls;
  }

  formSubmit(formData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    const contactRequest = {
      function: 'SalesManagementLogin',
      LoginInformations: {
        Mail: this.CompanyContactForm.value.contactMailAddress,
        Password : this.CompanyContactForm.value.contactPassword

      }
    };
    console.log(this.CompanyContactForm.invalid);
    console.log(this.contactMailAddress);
    console.log(this.contactPassword);
    if (this.CompanyContactForm.invalid) {
       return;
    }

    this.webSocketService.SendData(JSON.stringify(contactRequest));
    $('#companySub').prop('disabled', true);
    alert('Mesajınız iletilmiştir!');

    // this.router.navigate(['/'], { relativeTo: this.route });
    this.submitted = false;
    formDirective.resetForm();
    this.CompanyContactForm.setErrors(null);
    this.myNgForm.reset();
  }



  ngOnInit() {

    this.webSocketService.setupSocketConnection();
    // tslint:disable-next-line: only-arrow-functions


    $('#contactsub').prop('disabled', false);
    this.CompanyContactForm = this.fb.group({
      contactMailAddress: ['', Validators.required, Validators.email],
      contactPassword: ['', Validators.required]
    });



  }
}
