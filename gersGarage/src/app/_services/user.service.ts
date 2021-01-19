import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'test/admin', { responseType: 'text' });
  }


  //Application addresses
  postBooking(booking): Observable<any> {
    console.log(booking);
    return this.http.post(API_URL + 'user/booking', {
      First_name: booking.First_name,
      Last_name: booking.Last_name,
      Phone: booking.Phone,
      Comments: booking.Comments,
      Status: booking.Status,
      Date : booking.Date,
      Slot : booking.Slot
    });
  }


}