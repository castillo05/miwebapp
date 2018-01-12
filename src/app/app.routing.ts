import { PostListComponent } from './components/post-list.component';
import { SobremiComponent } from './components/sobremi.component';
import { AppComponent } from './app.component';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import { AdminComponent } from './components/admin.component';
import { PostDetailsComponent } from './components/post-details.component';



const appRoutes: Routes=[

    {path: '', component:HomeComponent},
    {path:'posts/:page',component:PostListComponent},
    {path:'post-detalle',component:PostDetailsComponent},
    {path: 'admin', component:AdminComponent},
    {path: 'sobremi',component:SobremiComponent},    
	{path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);
