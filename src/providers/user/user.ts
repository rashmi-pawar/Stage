import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class User {

  register: any = 'Authentication/register';
  loginUrl: any = 'Authentication/login';
  socialLoginUrl: any = 'SocialLogin/Login';
  forgot_pass: any = 'Authentication/forgot_pass';
  changepassword: any = 'Authentication/changepassword';
  delete_account: any = 'Authentication/delete_account';
  profile_update: any = 'Authentication/profile_update';
  logoutUrl: any = 'Authentication/logout';
  get_countries: any = 'Authentication/get_countries';
  get_states: any = 'Authentication/get_states';
  get_cities: any = 'Authentication/get_cities';
  forgot_password: any = 'Authentication/forgot_password';
  get_profile_data: any = 'Authentication/getProfileData';
  contact_us: any = 'Authentication/contact_us';
  add_event: any = 'Users/add_event';
  event_list: any = 'Users/event_list';
  add_sapce: any = 'Users/add_sapce';
  space_list: any = 'Users/space_list';
  add_equipment: any = 'Users/add_equipment';
  equipment_list: any = 'Users/equipment_list';
  add_project: any = 'Users/add_project';
  project_list: any = 'Users/project_list';
  homepage_list: any = 'Users/dashboard_list';
  homebanner_list: any = 'Users/banner_list';
  faq_list: any = 'Users/faq_list';
  add_review: any = 'Users/add_reviews';
  category_list: any = 'Users/category_list';
  subcategory_list: any = 'Users/subcategory_list';
  review_list: any = 'Users/review_list';
  searchProject_list: any = 'Users/all_project_list';
  freelancer_list: any = 'Users/all_freelancer_list';
  cancle_project: any = 'Users/cancel_project';
  get_notification_list: any = 'Users/get_notification_list';
  clear_notification: any = 'Users/clear_notification';
  user_hire: any = 'Users/user_hire';
  // booking
  book_equipment: any = 'Booking/equipment_booking';
  book_space: any = 'Booking/space_booking';
  book_event: any = 'Booking/ticket_booking';
  my_posted_project_list: any = 'Users/my_posted_project_list';
  follow_user: any = 'Users/follow_user';
  get_project_details: any = 'Users/get_project_details';
  accept_project_request: any = 'Users/accept_project_request';
  my_hired_project_list: any = 'Users/my_hired_project_list';
  complete_project_status: any = 'Users/complete_project_status';
  my_bookings: any = 'Booking/my_bookings';
  cancel_bookings: any = 'Booking/cancel_bookings';
  get_save_card_list: any = 'Booking/get_save_card_list';
  all_user_list: any = 'Users/all_user_list';
  remove_portfolio: any = 'Authentication/remove_portfolio';
  project_booking: any = 'Booking/project_booking';
  check_user_hire: any = 'Users/check_user_hire';
  check_user_hire_booking: any = 'Users/check_user_hire_booking';
  user_event_booking_list: any = 'Users/user_event_booking_list';

  constructor(public api: Api) { }

  login(data: any) {
    let seq = this.api.post(this.loginUrl, data).share();
    return seq;
  }

  socialLogin(data: any) {
    let seq = this.api.post(this.socialLoginUrl, data).share();
    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.api.post(this.register, accountInfo).share();
    return seq;
  }

  forgotPassword(accountInfo: any) {
    let seq = this.api.post(this.forgot_password, accountInfo).share();
    return seq;
  }
  changePassword(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.changepassword, data, { headers: header }).share();
    return seq;
  }
  deleteAccount(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.delete_account, data, { headers: header }).share();
    return seq;
  }
  updateProfile(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.profile_update, data, { headers: header }).share();
    return seq;
  }
  logout(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.logoutUrl, '', { headers: header }).share();
    return seq;
  }
  contactUs(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.contact_us, data, { headers: header }).share();
    return seq;
  }
  getCountry() {
    let seq = this.api.get(this.get_countries).share();
    return seq;
  }
  getState(data: any) {
    let seq = this.api.post(this.get_states, data).share();
    return seq;
  }
  getCity(data: any) {
    let seq = this.api.post(this.get_cities, data).share();
    return seq;
  }
  addEventData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_event, data, { headers: header }).share();
    return seq;
  }
  getEventList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.event_list, data, { headers: header }).share();
    return seq;
  }
  addSpaceData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_sapce, data, { headers: header }).share();
    return seq;
  }
  getSpaceList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.space_list, data, { headers: header }).share();
    return seq;
  }
  addEquipmentData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_equipment, data, { headers: header }).share();
    return seq;
  }
  getEquipmentList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.equipment_list, data, { headers: header }).share();
    return seq;
  }
  addProjectData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_project, data, { headers: header }).share();
    return seq;
  }
  getProjectList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.project_list, data, { headers: header }).share();
    return seq;
  }

  BookEquipment(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_equipment, data, { headers: header }).share();
    return seq;
  }
  bookSpace(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_space, data, { headers: header }).share();
    return seq;
  }
  bookEvent(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.book_event, data, { headers: header }).share();
    return seq;
  }
  getHomedetail(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.homepage_list, data, { headers: header }).share();
    return seq;
  }
  getHomebanner(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.homebanner_list, '', { headers: header }).share();
    return seq;
  }
  getCategoryList(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.category_list, '', { headers: header }).share();
    return seq;
  }
  faqlist(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.get(this.faq_list, '', { headers: header }).share();
    return seq;
  }
  addReview(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.add_review, data, { headers: header }).share();
    return seq;
  }
  subCatlist(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.subcategory_list, data, { headers: header }).share();
    return seq;
  }
  getReview(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.review_list, data, { headers: header }).share();
    return seq;
  }
  getSearchProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.searchProject_list, data, { headers: header }).share();
    return seq;
  }
  getfreelancerList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.freelancer_list, data, { headers: header }).share();
    return seq;
  }
  cancleProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.cancle_project, data, { headers: header }).share();
    return seq;
  }
  getAllNotificationList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.get_notification_list, data, { headers: header }).share();
    return seq;
  }
  clearNotification(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.clear_notification, data, { headers: header }).share();
    return seq;
  }
  getProfileData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.get_profile_data, data, { headers: header }).share();
    return seq;
  }
  userHire(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.user_hire, data, { headers: header }).share();
    return seq;
  }
  myPostedProjects(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.my_posted_project_list, data, { headers: header }).share();
    return seq;
  }
  followUnfollow(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.follow_user, data, { headers: header }).share();
    return seq;
  }
  getProjectData(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.get_project_details, data, { headers: header }).share();
    return seq;
  }
  acceptProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.accept_project_request, data, { headers: header }).share();
    return seq;
  }
  myHiredProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.my_hired_project_list, data, { headers: header }).share();
    return seq;
  }
  completeProjectStatus(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.complete_project_status, data, { headers: header }).share();
    return seq;
  }
  myBooking(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.my_bookings, data, { headers: header }).share();
    return seq;
  }
  cancleBooking(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.cancel_bookings, data, { headers: header }).share();
    return seq;
  }
  getSaveCardList(token: any) {
    let header = new HttpHeaders({ 'Authorizations': token, 'Content-Type': 'application/json' });
    let seq = this.api.get(this.get_save_card_list, '', { headers: header }).share();
    return seq;
  }
  getUserList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.all_user_list, data, { headers: header }).share();
    return seq;
  }
  removePortfolio(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.remove_portfolio, data, { headers: header }).share();
    return seq;
  }
  BookingProject(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.project_booking, data, { headers: header }).share();
    return seq;
  }
  checkUserHire(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.check_user_hire, data, { headers: header }).share();
    return seq;
  }
  checkUserHireBooked(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.check_user_hire_booking, data, { headers: header }).share();
    return seq;
  }
  userEventBookingList(data: any, token: any) {
    let header = new HttpHeaders({ 'Authorizations': token });
    let seq = this.api.post(this.user_event_booking_list, data, { headers: header }).share();
    return seq;
  }
}
