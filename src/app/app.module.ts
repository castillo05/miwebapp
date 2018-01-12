import { PostDetailsComponent } from './components/post-details.component';
import { Post } from './models/post';
import { SobremiComponent } from './components/sobremi.component';
import { AdminComponent } from './components/admin.component';
import { HomeComponent } from './components/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    SobremiComponent,
    PostListComponent,
    PostDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
