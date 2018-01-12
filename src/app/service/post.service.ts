import{Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import  {GLOBAL} from './global';



    @Injectable()

    export class PostService{
        public url:String;
        public identity;
        public token;

        constructor(private _http:Http){
            this.url=GLOBAL.url;
        }

       getPosts(token,page){
            let headers=new Headers({
                'Content-Type':'application/json',
                'Authorization':token
            });

            let options= new RequestOptions({headers:headers});
            return this._http.get(this.url+'posts/'+page,options).map(res=>res.json());
       }
    }