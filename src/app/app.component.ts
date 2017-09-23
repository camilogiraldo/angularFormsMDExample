import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectName = ['Test'];
  submittedForm = false; 
  project = {
    email: '', 
    name: '',
    type: ''
  };

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], this.forbiddenNamesAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('stable')
    });
  }

  forbiddenNames(control: FormControl): {[ s: string]: boolean } { 
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Test'){
            resolve({ 'nameIsForbidden': true });
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }

  onSubmit() {
    this.submittedForm = true;
    this.project.email = this.projectForm.value.email;
    this.project.name = this.projectForm.value.projectName;
    this.project.type = this.projectForm.value.projectStatus;
    this.projectForm.reset();
  }


}
