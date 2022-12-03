export enum LocationType {
  poi = 'poi',
  stop = 'stop',
  suburb = 'suburb',
  location = 'location',
}

export interface Location {
  id: string;
  isGlobalId: boolean;
  name: string;
  disassembledName: string;
  coord: Array<number>;
  type: LocationType;
  matchQuality: number;
  isBest: boolean;
  productClasses: Array<number>;
  parent: {
    id: string;
    name: string;
    type: string;
  };
  properties: { stopId: string };
}

export enum LegMode {
  CAR = 'car',
  TRAIN = 'train',
}

export interface Trip {
  legMode: LegMode;
  carbonEmission: string;
  distance: string;
}
