import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { throwError } from 'rxjs/internal/observable/throwError';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}

  editdata: any;

  ngOnInit(): void {
    this.service.GetAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getUserById(this.data.usercode).subscribe((res) => {
        this.editdata = res;

        this.registerform.setValue({
          userId: this.data.usercode,
          firstName: this.editdata.firstName,
          lastName: this.editdata.lastName,
          password: this.editdata.password,
          contact: this.editdata.contact,
          emailId: this.editdata.emailId,
          roleId: this.editdata.roleId,
        });
      });
    }
  }

  rolelist: any;

  registerform = this.builder.group({
    userId: this.builder.control(''),
    firstName: this.builder.control(''),
    lastName: this.builder.control(''),
    password: this.builder.control(''),
    contact: this.builder.control(''),
    emailId: this.builder.control(''),
    roleId: this.builder.control('', Validators.required),
  });

  UpdateUser() {
    if (this.registerform.valid) {
      this.service
        .Updateuser(this.registerform.value)
        .pipe(
          tap((res) => {
            if (res || res.code || res.code === 200) {
              this.toastr.success('Updated Successfully.');
            } else {
              this.toastr.warning('Something went wrong.');
            }
          }),
          catchError((error) => {
            this.toastr.warning('Something went wrong.');
            return throwError(error);
          }),
          finalize(() => {
            this.dialog.close();
          })
        )
        .subscribe();
    } else {
      this.toastr.warning('Please Select Role.');
    }
  }
}
