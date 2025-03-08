import { Injectable } from '@angular/core';
import { DataService } from '../helpers/interceptor.service';
import { APPPOINTEMENT } from '../.././app-constants';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  ENV: any = environment;

  constructor(private _dataService: DataService) { }

  uploadImage(file) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.FILE_UPLOAD + APPPOINTEMENT.APIS.IMAGE_UPLOAD, file)
  }
}
