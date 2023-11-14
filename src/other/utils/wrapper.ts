import { Response } from 'express';

export const response = (
  res: Response,
  data: any,
  msg: string,
  code: number,
  meta?: object,
) => {
  const pagination = {
    msg,
    data,
    meta,
  };
  return meta
    ? res.status(code).json(pagination).end()
    : res.status(code).json({ msg, data }).end();
};

export const metaPagination = (
  totalData: number,
  currentPage: number,
  totalPage: number,
) => {
  return {
    totalData,
    currentPage,
    totalPage,
  };
};
