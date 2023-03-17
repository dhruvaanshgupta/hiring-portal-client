import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../../final-reports.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-final-reports',
  templateUrl: './final-reports.component.html',
  styleUrls: ['./final-reports.component.scss'],
})
export class FinalReportsComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'college_name',
    'score_card',
    'technical_score1',
    'technical_score2',
    'feedback',
    'details',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  input: any;

  constructor(private dialog: MatDialog, private service: ReportService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.service.getReports());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getReportdata();
  }
  userdata: any;
  getReportdata() {
    this.service.getReportData().subscribe((response) => {
      this.userdata = response;
      console.log(this.userdata);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}