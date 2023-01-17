import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ConsolidateRegion } from 'src/app/model/consolidate-region.interface';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { timer} from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  loading: boolean = false;
  file: File = null; 
  consolidateRegionData: ConsolidateRegion;
  regions: any= ['N','NE','L', 'SE', 'S', 'SO', 'O','NO',];
  isSubmitted = false;

  constructor(private fileUploadService: FileUploadService, public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {},
        err => {  
          console.log(err)
        },
        () => {
          this.fileUploadService.importFile().subscribe(() => { console.log("importing file") } );
          this.loading = false; 
        }
    );
  }

  consolidateRegion(sigla: string): void {
    this.fileUploadService.consolidateRegionDate(sigla).subscribe((regionConsolidate) => {
      this.consolidateRegionData = regionConsolidate;
    })
  }

  changeRegion(e: any) {
    this.consolidateRegion(e.target.value);
  }

}
