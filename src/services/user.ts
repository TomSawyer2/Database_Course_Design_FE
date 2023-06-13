/* eslint-disable no-unused-vars */
import axios from '@/utils/axios';

export interface AddStudentParams {
  name: string;
  sex: string;
  department: string;
  className: string;
  studentId: string;
  telephone: string;
}

export interface AddCourseParams {
  courseName: string;
  maxSelectNum: string;
  resourceIds: number[];
}

export interface AddResourceParams {
  resourceName: string;
  resourceNum: string;
}

export interface AddTeacherParams {
  name: string;
  teacherId: string;
  courseId: string;
}

export enum DeleteType {
  Student = 'student',
  Teacher = 'teacher',
  Course = 'course',
  Resource = 'hard_resource',
}

export interface StudentInfo extends AddStudentParams {
  id: number;
}

// 获取所有学生信息
export async function getStudentInfo() {
  const url = '/api/student/get_all';

  const { data } = await axios.get(url);
  return data;
}

// 获取所有教师信息
export async function getTeacherInfo() {
  const url = '/api/teacher/get_all';

  const { data } = await axios.get(url);
  return data;
}

// 获取所有课程信息
export async function getCourseInfo() {
  const url = '/api/course/get_all';

  const { data } = await axios.get(url);
  return data;
}

// 获取所有硬件资源信息
export async function getResourceInfo() {
  const url = '/api/hard_resource/get_all';

  const { data } = await axios.get(url);
  return data;
}

// 新增学生
export async function addStudent(params: AddStudentParams) {
  const url = '/api/student/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 新增课程
export async function addCourse(params: AddCourseParams) {
  const url = '/api/course/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 新增硬件资源
export async function addResource(params: AddResourceParams) {
  const url = '/api/hard_resource/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 新增教师
export async function addTeacher(params: AddTeacherParams) {
  const url = '/api/teacher/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 删除学生/教师/课程/硬件资源
export async function deleteInfo(id: number, type: DeleteType) {
  const url = `/api/${type}/delete`;

  const { data } = await axios.post(url, { id });
  return data;
}

// 查询学生
export async function searchStudent(filter: StudentInfo) {
  const url = '/api/student/get_by_filter';

  const { data } = await axios.get(url, { params: filter });
  return data;
}
