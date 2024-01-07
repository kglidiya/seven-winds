import axios, { AxiosResponse } from "axios";
import { eID } from "./constants";
import {
  IDeleteRowResponse,
  IEntityResponse,
  IOutlayRow,
  IOutlayRowRequest,
  IRecalculatedRows,
  ITreeResponse,
} from "./types";

export const BASE_URL = "http://185.244.172.108:8081";

export const checkResponse = <T>(res: AxiosResponse): Promise<T> => {
  if (res.status !== 200) {
    throw new Error();
  } else {
    return res.data;
  }
};

export const createEntity = async () => {
  const res = await axios(`${BASE_URL}/v1/outlay-rows/entity/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse<IEntityResponse>(res);
};

export const getTreeRows = async () => {
  const res = await axios(`${BASE_URL}/v1/outlay-rows/entity/${eID}/row/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse<ITreeResponse[]>(res);
};

export const createRowInEntity = async (body: IOutlayRowRequest) => {
  const res = await axios(
    `${BASE_URL}/v1/outlay-rows/entity/${eID}/row/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    }
  );
  return checkResponse<IRecalculatedRows>(res);
};

export const updateRowInEntity = async (rID: number, body: IOutlayRow) => {
  const res = await axios(
    `${BASE_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    }
  );
  return checkResponse<IRecalculatedRows>(res);
};

export const deleteRowInEntity = async (rID: number) => {
  const res = await axios(
    `${BASE_URL}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return checkResponse<IDeleteRowResponse>(res);
};
