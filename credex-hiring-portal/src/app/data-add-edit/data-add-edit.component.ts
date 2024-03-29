import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollegesService } from '../../app/modules/colleges.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-add-edit',
  templateUrl: './data-add-edit.component.html',
  styleUrls: ['./data-add-edit.component.scss']
})
export class DataAddEditComponent implements OnInit {
  empForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private empService: CollegesService,
    private dialogRef: MatDialogRef<DataAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.empForm = this.fb.group({
    collegeId : '',
    collegeName : '',
    location : '',
    courseOffered : '',
    contact : '',
    currentAccrediation : '',
    action : ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateCollege(this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('College detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toastr.warning('Something went wrong.');
            },
          });
      } else {
        this.empService.addCollege(this.empForm.value).subscribe({
          
          next: (val: any) => {
            this.toastr.success('College added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.warning('Something went wrong.');
          },
        });
      }
    }
  }
}