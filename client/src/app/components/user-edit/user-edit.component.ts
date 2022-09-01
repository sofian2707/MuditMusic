import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user!: User;
  public identity: any;
  public token: any;
  public alertMessage: any;
  public url: string;
  public filesToUpload: Array<File> = [];
  public exist!: boolean;


  constructor(private UserService: UserService) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this.UserService.getIdentity();
    this.token = this.UserService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.UserService.updateUser(this.user).subscribe({
      next: (response) => {
        //this.user = response.user;
        if (!response.user) {
          this.alertMessage = 'El usuario no se ha actualizado';
        } else {
          //this.user = response.user;

          //Actualizar localStorage
          localStorage.setItem('identity', JSON.stringify(this.user));
          const identityname = document.getElementById('identity_name');
          if (identityname != null) {
            identityname.innerHTML = this.user.name;
          }

          if (!this.filesToUpload) {
            //redireccion
          } else {
            this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload).then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
                const image = document.getElementById('image-logged');
                let image_path = this.url+'get-image-user/'+this.user.image;
                if (image != null) {
                  image.setAttribute('src', image_path);
                }


                
              }

            );
          }

          this.alertMessage = 'El usuario se ha actualizado correctamente';
        }
      },
      error: (error) => {
        var alertMessage: any = error;
        if (alertMessage != null) {
          this.alertMessage = error;
          console.log(alertMessage);
        }
      }
    });
  }




  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files;
    console.log(this.filesToUpload)
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);

    });

  }
















}
