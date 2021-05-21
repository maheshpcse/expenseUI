import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
// var FileSaver = require('file-saver');

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    // how to use FileSaver here ? 
    var data = new Blob([files.item(0)], { });
    // FileSaver.saveAs(data, files.item(0).name);  
  }

}
