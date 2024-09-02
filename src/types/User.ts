export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
