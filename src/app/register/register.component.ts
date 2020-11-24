import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bungalow } from '../models/bungalow';
import { BungalowService } from '../services/bungalow.service';

interface MyObj {
  id: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFiles: FileList;  
  currentFileUpload: File;  
  
  private bungalow = new Bungalow();

  constructor(private bungalowService : BungalowService) { }

  ngOnInit(): void {
  }

  selectFile(event) {  
    const file = event.target.files.item(0);  
   
    if (file.type.match('image.*')) {  
      var size = event.target.files[0].size;  
      // if(size > 1000000)  
      // {  
      //     alert("size must not exceeds 1 MB");  
      //     this.form.get('profileImage').setValue("");  
      // }  
      // else  
      // {  
      //   this.selectedFiles = event.target.files;  
      // }  
      this.selectedFiles = event.target.files;  
    } else {  
      alert('invalid format!');  
    }  
  
  } 

    // create the form object.  
    form = new FormGroup({  
      name : new FormControl('' , Validators.required),  
      description : new FormControl('' , Validators.required),  
      currentPrice : new FormControl('' , Validators.required),
      profileImage : new FormControl()  
    });  
    
    AdminForm(AdminInformation)  
    {  
      this.bungalow.name = this.name.value;  
      this.bungalow.description = this.description.value;  
      this.bungalow.currentprice = this.price.value; 
    
      console.log("bungalow value : ",this.bungalow);  
    
      this.bungalowService.sendBungalow(this.bungalow).subscribe(  
        response => {  
          console.log("result of send bungalow before changing :",response);
           let obj: MyObj = JSON.parse(JSON.stringify(response));
           console.log("obj value  :",obj);
            //let result = response.json(); 
            let result = JSON.parse(JSON.stringify(response));  
            console.log("result of send bungalow after changing :",result);  
            if(result.id > 0 )  
            {  
              console.log("selectedFiles before if test:",this.selectedFiles);
              if(this.selectedFiles != null)  
              {  
                console.log("selectedFiles after if test:",this.selectedFiles);
                this.currentFileUpload = this.selectedFiles.item(0);  
                console.log("this.currentFileUpload : ",this.currentFileUpload);  
    
                this.bungalowService.uploadFile(this.currentFileUpload , result.id).subscribe(  
                    res => {  
                      console.log("res value send !!! : ",res);
                      let objImg: MyObj = JSON.parse(JSON.stringify(res));
                      console.log("objImg value send !!! : ",objImg);
                      let re =JSON.parse(JSON.stringify(res));  
                      //let re = res.json();  
                      
                      console.log("res.json() value send !!! : ",re);
                      // if(re > 0)
                       if(result.id > 0)  
                       {  
                          alert("file upload successfully ");  
                          this.form.get('name').setValue("");  
                          this.form.get('description').setValue("");  
                          this.form.get('currentPrice').setValue("");  
                          this.form.get('profileImage').setValue("");  
                       }  
                       else{  
                          alert("error while uploading fie details");  
                       }  
                    },  
                    err => {  
                        alert("error while uploading fie details");  
                    }  
                );  
    
              }  
            }  
        },  
        error => {  
          console.log("error while saving data in the DB");  
        }  
      );  
    
    }  
    
      get name(){  
        return this.form.get('name');  
      }  
    
      get description(){  
          return this.form.get('description');  
      } 
      
      get price(){  
        return this.form.get('currentPrice');  
    } 

}
