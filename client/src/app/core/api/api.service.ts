import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { routes } from './endpoints';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
}

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * Reemplaza los parámetros dinámicos en la URL (ej: /users/:id -> /users/123)
   */
  private buildUrl(endpoint: string, params?: { [key: string]: string | number }): string {
    let url = endpoint;
    
    if (params) {
      Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, String(params[key]));
      });
    }
    
    return `${this.baseUrl}${url}`;
  }

  /**
   * Método GET genérico
   */
  get<T = any>(endpoint: string, pathParams?: { [key: string]: string | number }, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, pathParams);
    return this.http.get<T>(url, options);
  }

  /**
   * Método POST genérico
   */
  post<T = any>(endpoint: string, body: any, pathParams?: { [key: string]: string | number }, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, pathParams);
    return this.http.post<T>(url, body, options);
  }

  /**
   * Método PUT genérico
   */
  put<T = any>(endpoint: string, body: any, pathParams?: { [key: string]: string | number }, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, pathParams);
    return this.http.put<T>(url, body, options);
  }

  /**
   * Método PATCH genérico
   */
  patch<T = any>(endpoint: string, body: any, pathParams?: { [key: string]: string | number }, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, pathParams);
    return this.http.patch<T>(url, body, options);
  }

  /**
   * Método DELETE genérico
   */
  delete<T = any>(endpoint: string, pathParams?: { [key: string]: string | number }, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, pathParams);
    return this.http.delete<T>(url, options);
  }

  // ==================== MÉTODOS ESPECÍFICOS DE LA API ====================

  // ==================== AUTH ====================
  login(credentials: { email: string; password: string }) {
    return this.post(routes.login, credentials);
  }

  register(userData: any) {
    return this.post(routes.register, userData);
  }

  forgotPassword(email: { email: string }) {
    return this.post(routes.forgotPassword, email);
  }

  refreshToken(token: { refreshToken: string }) {
    return this.post(routes.refreshToken, token);
  }

  logout() {
    return this.post(routes.logout, {});
  }

  revokeAllTokens() {
    return this.post(routes.revokeAllTokens, {});
  }

  // ==================== USERS ====================
  getUsers() {
    return this.get(routes.getUser);
  }

  updateUser(id: string | number, userData: any) {
    return this.put(routes.updateUser, userData, { id });
  }

  deleteUser() {
    return this.delete(routes.deleteUser);
  }

  // ==================== PUBLICATIONS ====================
  getPublications() {
    return this.get(routes.getPublications);
  }

  createPublication(publicationData: any) {
    return this.post(routes.createPublication, publicationData);
  }

  getPublicationById(id: string | number) {
    return this.get(routes.getPublishingById, { id });
  }

  updatePublication(id: string | number, publicationData: any) {
    return this.put(routes.updatePublication, publicationData, { id });
  }

  deletePublication(id: string | number) {
    return this.delete(routes.deletePublication, { id });
  }

  getPublicationBySellerID(sellerId: string | number) {
    return this.get(routes.getPublicationBySellerID, { sellerId });
  }

  // ==================== SALES ====================
  getSales() {
    return this.get(routes.getSales);
  }

  createSale(saleData: any) {
    return this.post(routes.createSale, saleData);
  }

  updateSale(id: string | number, saleData: any) {
    return this.put(routes.updateSale, saleData, { id });
  }

  // ==================== REVIEWS ====================
  getReviews() {
    return this.get(routes.getReviews);
  }

  getReviewById(id: string | number) {
    return this.get(routes.getReviewById, { id });
  }

  getReviewAverage(productId: string | number) {
    return this.get(routes.getReviewAverage, { id: productId });
  }

  createReview(reviewData: any) {
    return this.post(routes.createReview, reviewData);
  }

  updateReview(reviewData: any) {
    return this.put(routes.updateReview, reviewData);
  }

  // ==================== CHAT ====================
  getChats() {
    return this.get(routes.getChat);
  }

  createChat(chatData: any) {
    return this.post(routes.createChat, chatData);
  }

  getChatByBuyer(buyerId: string | number) {
    return this.get(routes.getchatByBuyer, { id: buyerId });
  }

  getChatBySeller(sellerId: string | number) {
    return this.get(routes.getchatBySeller, { id: sellerId });
  }

  updateChat(id: string | number, chatData: any) {
    return this.put(routes.updateChat, chatData, { id });
  }

  enableChat(id: string | number) {
    return this.put(routes.enableChat, {}, { id });
  }

  disableChat(id: string | number) {
    return this.put(routes.disableChat, {}, { id });
  }

  // ==================== SELLERS ====================
  getSellers() {
    return this.get(routes.getSellers);
  }

  getSellerById(id: string | number) {
    return this.get(routes.getSellerById, { id });
  }

  createSeller(sellerData: any) {
    return this.post(routes.createSeller, sellerData);
  }

  updateSeller(id: string | number, sellerData: any) {
    return this.put(routes.updateSeller, sellerData, { id });
  }

  deleteSeller(id: string | number) {
    return this.delete(routes.deleteSeller, { id });
  }

  // ==================== BUYERS ====================
  getBuyers() {
    return this.get(routes.getBuyers);
  }

  getBuyerById(id: string | number) {
    return this.get(routes.getBuyerById, { id });
  }

  createBuyer(buyerData: any) {
    return this.post(routes.createBuyer, buyerData);
  }

  updateBuyer(id: string | number, buyerData: any) {
    return this.put(routes.updateBuyer, buyerData, { id });
  }

  deleteBuyer(id: string | number) {
    return this.delete(routes.deleteBuyer, { id });
  }

  // ==================== CATALOGOS ====================
  getCategories() {
    return this.get(routes.getCategories);
  }

  getPublishingStatus() {
    return this.get(routes.getPublishingStatus);
  }

  getSaleStatus() {
    return this.get(routes.getSaleStatus);
  }

  getArticleStatus() {
    return this.get(routes.getArticleStatus);
  }

  // ==================== DEPARTMENTS & MUNICIPALITIES ====================
  getDepartments() {
    return this.get(routes.getDepartments);
  }

  getDepartmentById(id: string | number) {
    return this.get(routes.getDepartmentById, { id });
  }

  getMunicipalities() {
    return this.get(routes.getMunicipalities);
  }

  getMunicipalityById(id: string | number) {
    return this.get(routes.getMunicipalityById, { id });
  }

  getMunicipalitiesByDepartment(departmentId: string | number) {
    return this.get(routes.getMunicipalitiesByDepartment, { departmentId });
  }
  // ==================== IMAGES ====================
  postSingleImage(image: any) {
    return this.post(routes.postSingleImage, image);
  }

  postMultipleImages(images: any) {
    return this.post(routes.postMultipleImages, images);
  }

  getImageByName(filename: string) {
    return this.get(routes.getImageByName, { filename });
  }

  deleteImageByName(filename: string) {
    return this.delete(routes.deleteImageByName, { filename });
  }

  getImages() {
    return this.get(routes.getImages);
  } 
}
