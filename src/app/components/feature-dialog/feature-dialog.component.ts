import {Component, EventEmitter, OnInit} from '@angular/core';
import {FeatureService} from '../../services/feature.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-feature-dialog',
  templateUrl: './feature-dialog.component.html',
  styleUrls: ['./feature-dialog.component.css']
})
export class FeatureDialogComponent implements OnInit {
  onRefresh = new EventEmitter();

  constructor(
    public service: FeatureService,
    public dialogRef: MatDialogRef<FeatureDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.service.form.valid) {
      const fields = {};
      const data = this.service.form.value;
      Object.keys(data).forEach(key => data[key] === '' || data[key] === null ? key : fields[key] = data[key]);
      if (!this.service.form.get('id').value) {
        this.service.createFeature(fields).subscribe(() => {
          this.onRefresh.emit();
        });
      } else {
        this.service.updateFeature(fields).subscribe(() => {
          this.onRefresh.emit();
        });
      }
      this.onClose();
    }
  }
}
