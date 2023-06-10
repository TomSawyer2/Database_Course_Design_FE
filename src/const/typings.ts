/* eslint-disable no-unused-vars */
export type CodeType = 'honey-A' | 'honey-B' | 'hornet-A' | 'hornet-B';

export enum UserPermission {
  Banned = -1,
  User = 0,
  Admin = 1,
}

export enum UserStatus {
  Normal = 0,
  Running = 1,
}

export enum BatchTaskStatus {
  Waiting = 0,
  Running = 1,
  Finished = 2,
  Failed = 3,
  Timeout = 4,
}

export interface BatchTask {
  id: number;
  name?: string;
  userId: number;
  status: BatchTaskStatus;
  containerId?: string;
  codeIdAHoney: number;
  codeIdAHornet: number;
  codeIdBHoney: number;
  codeIdBHornet: number;
  upperGoals: string;
  lowerGoals: string;
  totalRounds: number;
  currentRound: number;
  startTime: string;
  endTime: string;
  timeout: number;
  containerLog?: string;
  confidenceLevel: number;
}
