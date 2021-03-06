import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Validator } from '../../services/auth/validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  signInError: string = '';  // 登录的校验错误
  signUpError: string = '';  // 注册的校验错误
  validator: Validator = new Validator();  // 前端校验器

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  // 从注册页到登录页，从登录页到注册页
  changePage() {
    if (this.router.url == '/login/sign-in')
      this.router.navigate(['/login', 'sign-up']);
    else if (this.router.url == '/login/sign-up')
      this.router.navigate(['/login', 'sign-in']);
  }

  // 注册表单校验
  // flag 标识了哪个 input 被访问，-1 表示全部被访问
  signUpCheck(flag: number, formValue) {
    this.signUpError = this.validator.signUpCheck(flag, formValue);
  }
  // 提交注册表单
  signUpSubmit(formValue) {
    this.signUpError = this.validator.signUpCheck(-1, formValue);
    // 如果没有错误，则提交表单中的用户名和密码
    if (this.signUpError == '') {
      this.authService.signUp(formValue.username, formValue.password)
                      .subscribe((data) => {
        console.log(data);
      });
    }
  }

  // 登录表单校验
  // flag 标识了哪个 input 被访问，-1 表示全部被访问
  signInCheck(flag: number, formValue) {
    this.signInError = this.validator.signInCheck(flag, formValue);
  }
  // 提交登录表单
  signInSubmit(formValue) {
    this.signInError = this.validator.signInCheck(-1, formValue);
    if (this.signInError == '') {
      this.authService.signIn(formValue.username, formValue.password)
                      .subscribe((data) => {
        console.log(data);
      });
    }
  }

}
