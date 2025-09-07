export interface ChallanItem {
  id: string;
  sno: number;
  particulars: string;
  weight: string;
  quantity: string;
}

export interface Challan {
  id: string;
  challanNo: string;
  date: string;
  toMs: string;
  poNo: string;
  place: string;
  items: ChallanItem[];
  notes: string;
}

export enum View {
  NEW = 'new',
  OLD = 'old',
}

export type ApiStatus = 'pending' | 'online' | 'offline';
