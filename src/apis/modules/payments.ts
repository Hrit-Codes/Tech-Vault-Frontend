import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

// ─── Types ─────────────────────────────────────────────────

export interface IKhaltiInitiateData {
  paymentUrl: string;
  pidx: string;
}

export interface IKhaltiVerifyData {
  orderId: string;
}

export interface IKhaltiInitiateResponse {
  data: IKhaltiInitiateData;
}

export interface IKhaltiVerifyResponse {
  data: IKhaltiVerifyData;
}

// ─── APIs ──────────────────────────────────────────────────

export const initiateKhalti = (orderId: string) =>
  api
    .post<ApiResponse<IKhaltiInitiateResponse>>(urls.initiateKhalti, { orderId })
    .then((res) => res.data.data.data);

export const verifyKhalti = (pidx: string) =>
  api
    .post<ApiResponse<IKhaltiVerifyResponse>>(urls.verifyKhalti, { pidx })
    .then((res) => res.data.data.data);
