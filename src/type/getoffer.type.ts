export interface GetOffer {
  bcbe?: Bcbe;
  migros?: Migros;
  swisslife?: Swisslife;
  ubs?: Ubs;
}

export interface Bcbe {
  interest_rate: string;
  interest: string;
  additional_cost: string;
  amortization: string;
  mensual_payment: string;
}

export interface Migros {
  "7years": string;
  "7years_interest": string;
  "10years": string;
  "10years_interest": string;
  additional_cost: string;
  amortization: string;
  mensual_payment: string;
}

export interface Swisslife {
  interest_rate: string;
  interest: string;
  additional_cost: string;
  amortization: string;
  mensual_payment: string;
}

export interface Ubs {
  interest_rate: string;
  interest: string;
  additional_cost: string;
  amortization: string;
  mensual_payment: string;
}
