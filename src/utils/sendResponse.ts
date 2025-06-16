import { Response } from "express";
import { HttpCode, IApiResponse } from "../types/general";

export const sendResponse = <T>(res: Response, status: HttpCode, message: string, data?: T): Response<IApiResponse<T>> => {
  const isSuccess = status >= 200 && status < 300;
  const response: IApiResponse<T> = {
    success: isSuccess,
    status,
    message,
    data: isSuccess ? data : undefined,
    error: !isSuccess ? data : undefined,
  };
  return res.status(status).json(response);
};
