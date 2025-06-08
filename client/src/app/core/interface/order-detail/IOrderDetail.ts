import { IPublishing } from './IPublishing';
import { IUser } from './IUser';
import { IBuyer } from './IBuyer';
import { ISeller } from './ISeller';
import { ISale } from './ISale';
import { ISaleDet } from './ISaleDet';
import { IPayload } from './IPayload';


export interface IOrderDetail {
  item: IPublishing;
  customer: IUser;
  buyer: IBuyer;
  seller: ISeller;
  sale: ISale;
  saleDetail: ISaleDet;
  payload: IPayload;
  total: number;
  contactInfo: {
    email: string;
    phone: string;
  };
}