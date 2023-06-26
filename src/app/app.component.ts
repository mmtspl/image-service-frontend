import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private httpClient: HttpClient) { }

  selectedFile!: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  

  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  

    this.httpClient.post('http://localhost:8080/restapiimageservice/uploadImage', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        }else if (response.status === 208) {
            this.message = 'Duplicate image name found...';
        }else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

  getImage() {
    this.httpClient.get('http://localhost:8080/restapiimageservice/getImageByName/' + this.imageName)
      .subscribe((response) => {
    	  
    	  if (response != null) {
              this.message = 'Image found successfully';
              this.retrieveResonse = response;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            } else {
              this.message = 'Image not found....';
            }
    	  
          
          
          
        }
      );
  }
}