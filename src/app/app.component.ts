import { UserService } from './service/user.service';
import { GLOBAL } from './service/global';
import { User } from './models/user';
import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit {
 
  title = 'JorgeCastilloBlog';
  public identity;
  public token;
  public user:User;
  public url:String;
  public errorMessage;
  public alertMessage;
 

  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router
  )
  
  {
    this.user= new User('','','','','','','');
    this.url=GLOBAL.url;

  }
  ngOnInit(): void {
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();

      console.log(this.identity);
      console.log(this.identity);
    }

    onSubmit(){
      this._userService.singup(this.user).subscribe(response=>{
          let identity=response.user;
          this.identity=identity;
          if (!this.identity._id) {
              alert('El Usuario no esta correctamente logeado');
              console.log(this.identity);
          }else{
              //crear elemento del localStorage
              localStorage.setItem('identity',JSON.stringify(identity));
              //Conseguir el token para enviarlo a cada peticion
              this._userService.singup(this.user,'true').subscribe(response=>{
                  let token=response.token;
                  this.token=token;
                  if (this.token.length<=0) {
                      alert('El Token no se ha generado');
                   }else{
                       //se crea el elemento en el localStorage
                       localStorage.setItem('token',token);
                       this.user = new User('','','','','','','');
                   }
                //    this._router.navigate(['/']);
              },error=>{
                  var errorMessage=<any>error;
                  var body=JSON.stringify(error._body);
                  if (errorMessage!=null) {
                      this.errorMessage=body;
                      console.log(error);
                  }
              }
          );
              
          }
      },error=>{
          var errorMessage=<any>error;
          var body=JSON.stringify(error._body);
          if (errorMessage!=null) {
              this.errorMessage=body;
              console.log(error);
          }
      }
  );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity=null;
    this.token=null;
    this._router.navigate(['/']);
  }


}
