import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../../services/feature.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FeatureDialogComponent} from '../feature-dialog/feature-dialog.component';

@Component({
  selector: 'app-feature-toggles',
  templateUrl: './feature-toggles.component.html',
  styleUrls: ['./feature-toggles.component.css']
})
export class FeatureTogglesComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['inverted', 'technicalName', 'displayName', 'description', 'expire', 'customerIds', 'actions'];

  constructor(private featureService: FeatureService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listData = new MatTableDataSource();
    this.refresh();
  }

  refresh(): void {
    this.featureService.getFeatures().subscribe(list => {
      this.listData.data = list;
    });
  }

  onCreate(): void {
    this.openDialog();
  }

  onEdit(row: any): void {
    this.featureService.populateForm(row);
    this.openDialog();
  }

  onArchive(id: any): void {
    if (confirm('Archive this record?')) {
      this.featureService.archiveFeature(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  onToggle(feature: any): void {
    const inverted = 'inverted';
    feature[inverted] = !feature[inverted];
    const fields = {};
    Object.keys(feature).forEach(key => feature[key] === '' || feature[key] === null ? key : fields[key] = feature[key]);
    this.featureService.updateFeature(fields).subscribe(() => {
      this.refresh();
    });
  }

  private openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    const ref = this.dialog.open(FeatureDialogComponent, dialogConfig);
    ref.componentInstance.onRefresh.subscribe(() => {
      this.refresh();
    });
  }
}
