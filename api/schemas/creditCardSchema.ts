import { z } from 'zod';

export const createCreditCard = z.object({
  token: z
    .string()
    .length(41, { message: 'Token must be a 41 character string' }),
  foreign_card: z
    .boolean()
    .transform(() => false)
    .default(false),
  last_four_digits: z
    .string()
    .length(4, { message: 'Last four digits must be a 4 character string' }),
  card_type: z
    .string()
    .length(1, { message: 'Card type must be a 1 character string' })
    .refine((type) => ['0', '1', '2', '3', '4'].includes(type), {
      message: 'Invalid card type. Must be one of: 0, 1, 2, 3, or 4.',
    }),
  expiration_date: z
    .string()
    .length(5, { message: 'Expiration date must be a 5 character string' })
    .refine((date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date), {
      message: 'Invalid date format. Use MM/YY format.',
    }),
  blocked: z
    .boolean()
    .transform(() => false)
    .default(false),
});

interface CRefFields {
  cardTokenId: string;
  last4PanDigits: string;
  cardType: string;
  expiryDate: string;
}

export const parseCRef = (CRef: string): CRefFields => {
  if (CRef.length !== 41) {
    throw new Error('Invalid CRef length');
  }

  console.log(CRef);

  return {
    cardTokenId: CRef,
    last4PanDigits: CRef.substring(32, 36),
    cardType: CRef.substring(36, 37),
    expiryDate: CRef.substring(37, 41),
  };
};

interface CreditCardDetails {
  CRef: string;
}

export const createCreditCardBody = (details: CreditCardDetails) => {
  const parsedCRef = parseCRef(details.CRef);

  const expiryDateFormatted = `${parsedCRef.expiryDate.substring(
    2,
    4,
  )}/${parsedCRef.expiryDate.substring(0, 2)}`;

  const body = {
    token: parsedCRef.cardTokenId,
    foreign_card: false,
    last_four_digits: parsedCRef.last4PanDigits,
    card_type: parsedCRef.cardType,
    expiration_date: expiryDateFormatted,
    blocked: false,
  };

  return createCreditCard.parse(body);
};
