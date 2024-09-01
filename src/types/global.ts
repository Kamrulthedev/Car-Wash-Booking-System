import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
      message: string;
      stack: string;
      success: boolean;
    };
    status: string;
  };
  
  export type Tmeta = {
    limit: number;
    page: number;
    total: boolean;
    totalPage: number;
  };
  
  export type TResponce<T> = {
    data?: T | any;
    error: TError;
    meta?: Tmeta;
    success: boolean;
    message?: string;
  };
  
  
  export type TResponceRedux<T> = TResponce<T> & BaseQueryApi;