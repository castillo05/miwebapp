import { PostService } from './../service/post.service';
import { UserService } from './../service/user.service';
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Post } from '../models/post';

@Component({
	selector: 'post-list',
	templateUrl:'../views/post-list.html',
	providers:[UserService,PostService]
})

export class PostListComponent implements OnInit{
    public titulo:string;
    public posts:Post[];
	public identity;
    public token;
    public next_page;
	public prev_page;
	public alertmessage;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
        private _userService:UserService,
        private _postService:PostService

	){
        this.titulo= 'Publicaciones';
        this.next_page=1;
		this.prev_page=1;
	
	}

	ngOnInit()
	{
		console.log('PostListComponent cargado');
		//Consegur el listado de artista
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();

		console.log(this.identity);
		console.log(this.token);
        this.getPost();
    }
    
    getPost(){
        this._route.params.forEach((params:Params)=>{
            let page=+params['page'];
            if (!page) {
                page=1  
            } else {
                this.next_page=page+1;
				this.prev_page=page-1;

				if (this.prev_page==0) {
					this.prev_page=1;
                }
                

            }

            this._postService.getPosts(this.token,page).subscribe(
                response=>{
                if (!response.posts) {
                    this._router.navigate(['/']);
                } else {
                    this.posts=response.posts;
                }
            },error=>{
                var errorMessage = <any>error;
                
                var body = JSON.parse(error._body);
                this.alertmessage = body.message;
                if (errorMessage !=null) { 
                this.alertmessage=body.message; 
                console.log(error);
                }
            }
        
        );

        });
    }

}