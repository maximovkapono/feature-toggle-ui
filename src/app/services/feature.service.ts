import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from './request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private requestService: RequestService) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    technicalName: new FormControl('', Validators.required),
    displayName: new FormControl(''),
    description: new FormControl(''),
    expire: new FormControl(''),
    inverted: new FormControl(false, Validators.required),
    customerIds: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
  });

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      technicalName: '',
      displayName: '',
      description: '',
      expire: '',
      inverted: false,
      customerIds: '',
    });
  }

  getFeatures(): Observable<any> {
    return this.requestService.get('feature_toggle');
  }

  createFeature(feature): Observable<any> {
    return this.requestService.post('feature_toggle/create', feature);
  }

  updateFeature(feature): Observable<any> {
    return this.requestService.post('feature_toggle/update', feature);
  }

  archiveFeature(id): Observable<any> {
    return this.requestService.post('feature_toggle/archive', {id});
  }

  populateForm(feature): void {
    this.form.setValue(feature);
  }
}
