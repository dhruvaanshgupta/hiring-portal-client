import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegesService {

//   constructor(private _http: HttpClient) {}

//   addCollege(data: any): Observable<any> {
//     return this._http.post('http://localhost:3000/employees', data);
//   }

//   updateCollege(id: number, data: any): Observable<any> {
//     return this._http.put(`http://localhost:3000/employees/${id}`, data);
//   }

//   getCollegesList(): Observable<any> {
//     return this._http.get('http://localhost:3000/employees');
//   }

//   deleteCollege(id: number): Observable<any> {
//     return this._http.delete(`http://localhost:3000/employees/${id}`);
//   }
// }
private COLLEGES_DATA = [
  {
    id: 1,
    Name: 'ABC College',
    Location: 'New York',
    CourseOffered: 'Computer Science',
    Contact: 'abc@example.com',
    CurrentAccrediation: 'Accredited',
  },
  {
    id: 2,
    Name: 'XYZ College',
    Location: 'Los Angeles',
    CourseOffered: 'Business Administration',
    Contact: 'xyz@example.com',
    CurrentAccrediation: 'Not Accredited',
  },
  // add more objects as needed
];

constructor() {}

addCollege(data: any): Observable<any> {
  // This method is not implemented for this example
  return of(null);
}

updateCollege(id: number, data: any): Observable<any> {
  // This method is not implemented for this example
  return of(null);
}

getCollegesList(): Observable<any> {
  return of(this.COLLEGES_DATA);
}

deleteCollege(id: number): Observable<any> {
  // This method is not implemented for this example
  return of(null);
}
}