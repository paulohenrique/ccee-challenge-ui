import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ConsolidateRegion } from '../model/consolidate-region.interface';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public baseApiUrl = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  upload(file): Observable<any> {

    const formData = new FormData();

    formData.append("file", file);

  return this.http.post(this.baseApiUrl, formData)

  }

  importFile(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "job1")
  }

  consolidateRegionDate(param: string = "NE") {
    return this.http.get<ConsolidateRegion>(`${this.baseApiUrl}regiao/${param}`)
  }
  

}
