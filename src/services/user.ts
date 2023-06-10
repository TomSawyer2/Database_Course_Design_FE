import { CodeType, UserPermission, UserStatus } from '@/const/typings';
import axios from '@/utils/axios';

export interface RegisterParams {
  username: string;
  password: string;
}

export type LoginParams = RegisterParams;

export interface CodeParams {
  content: string;
  type: CodeType;
  codeId?: number;
  id?: number;
}

export interface RunCodeParams {
  codeIdAHoney: number;
  codeIdAHornet: number;
  codeIdBHoney: number;
  codeIdBHornet: number;
  name: string;
  totalRounds: number;
  timeout: number;
}

export interface CheckStatusParams {
  batchTaskId: number;
}

export interface PageParams {
  page: number;
  pageSize: number;
}

export interface UserInfo {
  id: number;
  username: string;
  permission: UserPermission;
  status: UserStatus;
  batchTaskId?: number | null;
}

// 注册
export async function register(params: RegisterParams) {
  const url = '/api/register';

  const { data } = await axios.post(url, params);
  return data;
}

// 登录
export async function login(params: LoginParams) {
  const url = '/api/login';

  const { data } = await axios.post(url, params);
  return data;
}

// 上传代码
export async function uploadCode(params: CodeParams) {
  const url = '/api/batchTasks/uploadCodeForBatchTasks';

  const { data } = await axios.post(url, params);
  return data;
}

// 运行代码
export async function runCode(params: RunCodeParams) {
  const url = '/api/batchTasks/run';

  const { data } = await axios.post(url, params);
  return data;
}

// 查询状态
export async function checkStatus(params: CheckStatusParams) {
  const url = '/api/batchTasks/status';

  const { data } = await axios.get(url, { params });
  return data;
}

// 取消任务
export async function stopTask(params: CheckStatusParams) {
  const url = '/api/batchTasks/stop';

  const { data } = await axios.post(url, params);
  return data;
}

// 查询结果
export async function checkResult(params: CheckStatusParams) {
  const url = '/api/batchTasks/result';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取历史记录
export async function getHistory(params: PageParams) {
  const url = '/api/batchTasks/history';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取用户信息
export async function getUserInfo() {
  const url = '/api/userInfo';

  const { data } = await axios.get(url);
  return data;
}
