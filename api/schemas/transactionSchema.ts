import { z } from 'zod';

import type { Session } from './sessionSchema';
import type { Wallet } from './walletSchema';

export const newWalletTransaction = z.object({
  credit_card_id: z.string(),
  total_cost: z.number(),
  duration: z.number(),
  currency: z.string(),
  CVV: z.string().length(3),
});

export type NewWalletTransaction = z.infer<typeof newWalletTransaction>;

export const zoneTransactionDetails = z.object({
  car_id: z.string(),
  zone_id: z.string(),
  total_cost: z.number(),
  duration: z.number(),
  currency: z.string(),
});

export type NewZoneTransaction = z.infer<typeof zoneTransactionDetails>;

export const newSMSTransaction = z.object({
  sms_token: z.string(),
  car_id: z.string(),
  zone_id: z.string(),
  total_cost: z.number(),
  duration: z.number(),
  currency: z.string(),
});

export type NewSMSTransaction = z.infer<typeof newSMSTransaction>;

export interface ValidationBody {
  id: string;
  credit_card_id: string;
  car_id: string;
  zone_id: string;
  total_cost: number;
  duration: number;
  currency: string;
}

export interface TransactionDetails {
  credit_card_id: string;
  car_id: string;
  zone_id: string;
  total_cost: number;
  duration: number;
  currency: string;
  CVV: string;
}

export type PaymentInfo = {
  PaymentID?: string;
  ThreeDSVersion?: string;
  ACSULR?: string;
  CReq?: string;
  cPayRefID?: string;
  PaymentStatus?: string;
};

export interface WalletTransactionResponse {
  wallet?: Wallet;
  paymentVerification?: PaymentInfo;
}
export interface ZoneTransactionResponse {
  session?: Session;
}

export function createWalletTransactionBody(
  credit_id: string,
  total_cost: string,
  currencyData: string,
  CVVData: string,
): NewWalletTransaction {
  const numericTotalCost = parseFloat(total_cost);

  const transactionBody = newWalletTransaction.parse({
    credit_card_id: credit_id,
    total_cost: numericTotalCost,
    currency: currencyData,
    CVV: CVVData,
  });

  return transactionBody;
}

export function createZoneTransactionBody(
  car_id: string,
  zone_id: string,
  total_cost: number,
  duration: number,
  currency: string,
): NewZoneTransaction {
  return zoneTransactionDetails.parse({
    car_id,
    zone_id,
    total_cost,
    duration,
    currency,
  });
}

export function createSMSTransactionBody(
  sms_token: string,
  car_id: string,
  zone_id: string,
  total_cost: number,
  duration: number,
  currency: string,
): NewSMSTransaction {
  return newSMSTransaction.parse({
    sms_token,
    car_id,
    zone_id,
    total_cost,
    duration,
    currency,
  });
}
