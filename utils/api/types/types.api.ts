export interface GetMeProps {
  user: GetMeUserProps
  subscription?: GetMeUserSubscriptionProps
}

export interface GetMeUserProps {
  created_at: string
  updated_at: string
  email: string
  tg_id: number
  is_verified: boolean
  role: string
  id: string
}

export interface GetMeUserSubscriptionProps {
  id: string
  user_id: string
  tariff_id: string
  payment_id: string
  is_active: boolean
  start_at: string
  end_at: string
}

export interface TariffsProps {
  name: string
  price: number
  duration: string
  is_legal: boolean
  is_trial: boolean
  id: string
}

export interface TrialSubscription {
  created_at: string;
  updated_at: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  id: string;
  user_id: string;
  tariff_id: string;
  payment_id: string;
}

export interface PaymentSubscribePayload {
  amount: number;
  email: string;
  description?: string;
  recurrent: boolean;
  promo_code?: string;
  tariff: PaymentTariff
}

export interface PaymentSubscribeResponse {
  payment: Payment
}

export interface Payment {
  id: string
  status: string
  amount: Amount
  description: string
  recipient: Recipient
  created_at: string
  confirmation: Confirmation
  test: boolean
  paid: boolean
  refundable: boolean
  metadata: Metadata
}

export interface Amount {
  value: string
  currency: string
}

export interface Recipient {
  account_id: string
  gateway_id: string
}

export interface Confirmation {
  type: string
  confirmation_url: string
}

export interface Metadata {
  is_recurrent: string
  tariff_duration: string
  tariff_id: string
}


export interface PaymentTariff {
  id: string;
  duration?: string;
  description?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
};

export interface CreateChatsProps {
  created_at: string
  updated_at: string
  specific: string
  id: string
  is_active: boolean
  detail?: "Payment required"
}