import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
formBuilder=inject(FormBuilder)
messageService=inject(MessagesService);
authService=inject(AuthService)
router =inject(Router);

  form=this.formBuilder.group({
    email:[''],
    password:['']
  })

  async onLogin() {
    try {
      const {email ,password}=this.form.value;
      if(!email || !password){
       return  this.messageService.showMessage('Fill the message and the password','error')
      }
     await this.authService.login(email,password);
      await  this.router.navigate(['/home']);




    }
    catch (err){
      this.messageService.showMessage('Error while logging in','error')
      console.error(err)
    }

  }
}
