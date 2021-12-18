import { Component, OnInit } from '@angular/core';
import {Project} from "../../../domain/project";
import {AuthenticationService} from "../../../services";
import {DevelopersProjectsService} from "../../../services/developers-projects/developers-projects.service";
import {ProjectsService} from "../../../services/projects/projects.service";
import {SosUser} from "../../../domain/sos-user";
import {DeveloperProject} from "../../../domain/developer-project";

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['../../../app.component.css', './join-project.component.css']
})
export class JoinProjectComponent implements OnInit {

    projects:Project[]=[];

    projectsName:string[] = [];
    projectsIsapply:boolean[] = [];

    unassigned: boolean = false;
    currentUser: SosUser = null!;
    userId: number = 0;

  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectsService,
              private developersProjectsService : DevelopersProjectsService
  ) {


  }

  ngOnInit(): void {
      this.currentUser = <SosUser>JSON.parse(<string>localStorage.getItem('currentUser'));
      this.userId = (this.currentUser.id==undefined)?0:this.currentUser.id;
      this.loadProjects();
      this.isAssigned();
  }

    private loadProjects() {
        this.projectService.getAll().then(tmpProjects => {
            this.projects = tmpProjects;
            this.loadProjectNames();
            this.isApply();
        });
    }

    private loadWorkingProject(){

    }

    joinProject(project:Project) {
        //create developerProject
        let devProject:DeveloperProject = {
            idDeveloper : this.userId,
            idProject : project.id,
            isAppliance : true
        }
        //envoyer la requete
        this.developersProjectsService.addDeveloperProject(devProject).then(tmp=>{

            }
        );
        //par sécurité on change la ligne a false pour éviter de faire plusieurs requêtes
        for(let i = 0 ; i<this.projects.length;i++){
            if(this.projects[i].id==project.id){
                this.projectsIsapply[i] = true;
            }
        }
    }

    private loadProjectNames() {
        this.projectsName = [];
        for (let elt of this.projects) {
            this.projectsName.push(elt.name);
        }
    }

    private isAssigned() {
      this.developersProjectsService.getByIdDeveloperIsAppliance(this.userId).then(tmp=>{;
          if(tmp.length!=0){
              this.unassigned=true;
          }
          else{
              this.unassigned=false;
          }
      });
    }

    //allows to know if the project has already had a appliance of this user
    isApply() {
        for(let i = 0 ; i< this.projects.length;i++){
            this.developersProjectsService.getByIdDeveloperIdProject(this.userId,this.projects[i].id).then(tmp=>{
                if(tmp!=null)this.projectsIsapply[i] = true;
                else this.projectsIsapply[i] = false;
            });
        }
    }
}
