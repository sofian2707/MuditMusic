import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';
import { UploadService } from 'src/app/services/upload.service';


@Component({
    selector: 'app-song-edit',
    templateUrl: './song-edit.component.html',
    styleUrls: ['./song-edit.component.css'],
    providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit {

    public filesToUpload!: Array<File>;
    public titulo: string;
    public song!: Song;
    public identity;
    public token;
    public url: string;
    public alertMessage: any;
    public errorMessage: any;
    public is_edit: boolean;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private UserService: UserService,
        private SongService: SongService,
        private UploadService: UploadService
    ) {
        this.titulo = 'Editar cancion';
        this.identity = this.UserService.getIdentity();
        this.token = this.UserService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song('', 1, '', '', '', '');
        this.is_edit = true;
    }

    ngOnInit(): void {
        // Sacar la canción a editar
        this.getSong();
    }


    getSong() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.SongService.getSongbyId(this.token, id).subscribe({
                next: (response) => {
                    if (!response.song) {
                        this.router.navigate(['/']);
                    } else {
                        this.song = response.song;
                    }
                },
                error: (error) => {
                    var alertMessage: any = error;
                    if (alertMessage != null) {
                        this.alertMessage = error
                        console.log(alertMessage);
                    }
                }
            }
            )
        })
    }



    onSubmit() {
        console.log(this.song);
        this.route.params.forEach((params: Params) => {
            let id = params['id'];

            this.SongService.editSong(this.token, id, this.song).subscribe({
                next: (response) => {
                    if (!response.song) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.alertMessage = '¡La cancion se ha actualizado correctamente!';
                        setTimeout(() => {
                            this.router.navigate(['/album', response.song.album]);
                          },
                            1500);

                        if (!this.filesToUpload) {
                            this.alertMessage = '¡La cancion se ha actualizado correctamente!';

                            setTimeout(() => {
                                this.router.navigate(['/album', response.song.album]);
                              },
                              1500);
                           
                        } else {
                            // Subir el fichero de audio
                            this.UploadService.makeFileRequest(this.url + 'upload-file-song/' + id, [], this.filesToUpload, this.token, 'file')
                                .then(
                                    (result) => {
                                        setTimeout(() => {
                                            this.router.navigate(['/album', response.song.album]);
                                          },
                                          1500);
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
                        }

                    }
                },
                error: (error) => {
                    var alertMessage: any = error;
                    if (alertMessage != null) {
                        this.alertMessage = error;
                        console.log(alertMessage);
                    }
                }
            })
        })
    }



    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
