export type room = {
  id: number;
  hostId: string;
  courtId: number;
  type: null | string;
  ntrpMin: number;
  ntrpMax: number;
  onOffFlag: boolean;
  startTime: string;
  endTime: string;
  createdDate: string;
};

export type rooms = Array<room>;