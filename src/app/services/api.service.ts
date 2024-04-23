import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public httpOptions: any;

  constructor(public http: HttpClient) {}

  /**
   * Realizar el inicio de sesión
   * @param email
   * @param password
   * @returns
   */
  public login(email: any, password: any): Observable<any> {
    return this.http.post(environment.api.url + 'login', {
      email: email,
      password: password,
    });
  }

  /**
   * Obtener datos de entidad desde API
   * @param entity
   * @param id
   * @returns
   */
  public getEntity(entity: string, id?: any): Observable<any> {
    if (id == null) {
      return this.http.get(environment.api.url + entity, this.httpOptions);
    } else {
      return this.http.get(
        environment.api.url + entity + '/' + id,
        this.httpOptions
      );
    }
  }

  /**
   * Agregar entidad a API
   * @param entity
   * @param parametres
   * @returns
   */
  public addEntity(entity: string, parametres?: any): Observable<any> {
    return this.http.post(
      environment.api.url + entity,
      parametres,
      this.httpOptions
    );
  }

  /**
   * Agregar entidad a API usando formularios mediante FormData
   * @param entity
   * @returns
   */
  public addEntityFormData(
    entity: string,
    formData: FormData
  ): Observable<any> {
    return this.http.post(
      environment.api.url + entity,
      formData,
      this.httpOptions
    );
  }

  /**
   * Actualizar entidad existente en API
   * @param entity
   * @param id
   * @param parametres
   * @returns
   */
  public updateEntity(
    entity: string,
    id: number,
    parametres: any
  ): Observable<any> {
    return this.http.put(
      environment.api.url + entity + '/' + id,
      parametres,
      this.httpOptions
    );
  }

  /**
   * Eliminar entidad de API
   * @param entity
   * @param id
   * @returns
   */
  public deleteEntity(
    entity: string,
    id?: number,
    params?: any
  ): Observable<any> {
    if (id == null) {
      return this.http.delete(environment.api.url + entity, this.httpOptions);
    } else {
      return this.http.delete(
        environment.api.url + entity + '/' + id,
        this.httpOptions
      );
    }
  }

  /**
   * Establecer token de autenticación a HTTPHeader
   * @param token
   */
  public setToken(token: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  /**
   * Eliminar el token de autorización HTTP
   */
  public removeToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
