import { UserService } from './../service/user.service';
import { GLOBAL } from './../service/global';
import { User } from './../models/user';
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
	selector: 'sobremi',
    templateUrl:'../views/sobremi.html',
    providers:[UserService]
})

export class SobremiComponent implements OnInit{
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
		this.titulo= 'Sobre Mi';
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
    
    

}