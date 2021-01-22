import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ids = '5ffe3ce68c8c81fd078df20a';
 
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
  //////////POSTS///////////
  //Post a booking
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

  //Post a vehicle
  postVehicle(vehicle): Observable<any> {
    return this.http.post(API_URL + 'user/vehicle', {
      Licence: vehicle.Licence,
      id_user: vehicle.id_user,
      engine: vehicle.engine,
      vehicle_type: vehicle.vehicle_type,
      make: vehicle.make,
    },{ responseType: 'text' });
  }

  ////////GETS///////
  getEngineList(): Observable<any> {
    return this.http.get(API_URL + 'user/engine', { responseType: 'text' });
  }

  getVehicleList(): Observable<any> {
    return this.http.get(`${API_URL}user/vehicle-list/${this.ids}`, { responseType: 'text' });
  }


}