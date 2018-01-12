import { UserService } from './../service/user.service';
import { GLOBAL } from './../service/global';
import { User } from './../models/user';
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
	selector: 'admin',
    templateUrl:'../views/admin.html',
    providers:[UserService]
})

export class AdminComponent implements OnInit{
	public titulo:string;
    public user:User;
    public identity;
    public token;
    public url:String;
    public errorMessage;
    public alertMessage;


	constructor(
		private _route: ActivatedRoute,
        private _router: Router,
        private _userService:UserService
	

	){
		this.titulo= 'Iniciar Session';
        this.user= new User('','','','','','','');
        this.url=GLOBAL.url;
	}

	ngOnInit()
	{
		console.log('AdminComponent cargado');
		//Consegur el listado de artista
        this.identity=this._userService.getIdentity();
        this.token=this._userService.getToken();

        console.log(this.identity);
        console.log(this.token);
        

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
                     this._router.navigate(['/']);
                },error=>{
                    var errorMessage=<any>error;
                    var body=JSON.stringify(error._body);
                    if (errorMessage!=null) {
                        // this.errorMessage=body.message;
                        console.log(error);
                    }
                }
            );
                
            }
        },error=>{
            var errorMessage=<any>error;
            var body=JSON.stringify(error._body);
            if (errorMessage!=null) {
                // this.errorMessage=body.message;
                console.log(error);
            }
        }
    );
    }

}