import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './components/forum/forum.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneralComponent } from './components/general/general.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AdminInfoComponent } from './components/admin-info/admin-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProgramsComponent,
    ExperiencesComponent,
    ForumComponent,
    FooterComponent,
    UserComponent,
    StatisticsComponent,
    LoginComponent,
    GeneralComponent,
    UserInfoComponent,
    AdminInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
