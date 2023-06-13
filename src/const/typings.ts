/* eslint-disable no-unused-vars */

export interface CourseItem {
  id: number;
  courseName: string;
  maxSelectNum: string;
  selectedNum: string;
  resourceIds: number[];
}

export interface ResourceItem {
  id: number;
  resourceName: string;
  resourceNum: string;
}

export interface StudentItem {
  id: number;
  name: string;
  sex: string;
  studentId: string;
  department: string;
  className: string;
  telephone: string;
  courseIds: number[];
}

export interface TeacherItem {
  id: number;
  name: string;
  teacherId: string;
  courseId: string;
}
