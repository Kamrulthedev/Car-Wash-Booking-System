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
  } | undefined;
  
  export type TResponce<T> = {
    data?: T;
    error: TError;
    meta?: Tmeta;
    success: boolean;
    message?: string;
  } | undefined;
  
  
  export type TResponceRedux<T> = TResponce<T> & BaseQueryApi;