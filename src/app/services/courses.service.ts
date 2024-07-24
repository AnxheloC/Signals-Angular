import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http=inject(HttpClient);

  async loadAllCourses():Promise<Course[]>{
    const courses$=this.http.get<GetCoursesResponse>(`${environment.apiRoot}/courses`);
    const response =await firstValueFrom(courses$);// convert obs to promise dhe e kthen ne promise vleren e pare
    // lastValueFrom(courses$);te fundit port http jan njesoj
    return response.courses;
  }

  async createCourse(course:Partial<Course>):Promise<Course>{
     const course$= this.http.post<Course>(`${environment.apiRoot}/courses`,course)
     return firstValueFrom(course$)
    //await mund te neglizohet ketu sepse nuk kemi try catch block qe te kapi errorin
  }

  async saveCourse(courseId:string,course:Partial<Course>):Promise<Course>{
    const course$= this.http.put<Course>(`${environment.apiRoot}/courses/${courseId}`,course)
    return firstValueFrom(course$)
  }

  async deleteCourse(courseId:string):Promise<any>{
  const delete$=this.http.delete(`${environment.apiRoot}/courses/${courseId}`)
     return await firstValueFrom(delete$)
  }


}
