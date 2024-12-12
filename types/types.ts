export interface ICity {
  id: string;
  name: string;
  invoicePrefix: number;
}

export interface IMarket {
  id: string;
  name: string;
  city: ICity;
  dates: string;
  color: string;
  invoicePrefix: number;
}

export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  cityId: string;
  siren: string;
  postalCode?: number;
  city?: string;
  address?: string;
  mail?: string;
  job?: string;
}

export type APIClient = Omit<IClient, 'id'> & Partial<Pick<IClient, 'id'>>;

export enum DynamicUnit {
  NONE = 'none',
  METERS = 'meters',
  HOURS = 'hours',
}
export interface IPricing {
  id: string;
  name: string;
  price: number;
  marketId: string;
  dynamicUnit: DynamicUnit;
}

export interface IBalanceSheet {
  id: string;
  date: Date;
  marketId: string;
}

export enum PaiementMethod {
  CASH = 'cash',
  CHECK = 'check',
  CB = 'cb',
}
export interface IBalanceSheetInvoices {
  id: string;
  balanceSheetId: string;
  clientId: string;
  total: number;
  paiementType: PaiementMethod;
  invoiceId: string;
}
