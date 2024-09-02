export type TService = {
  _id?:string  |undefined,
  key?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
} | undefined;
