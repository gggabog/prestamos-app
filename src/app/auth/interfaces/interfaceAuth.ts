/* eslint-disable @typescript-eslint/naming-convention */
export interface auth {
  errors?: [];
  message: string;
  user?: {
       name: string;
       email: string;
       level: string;
    };
    access_token?: string;
}

export interface Usuario {
  id?:  number;
  name: string;
  email: string;
  level: string;
}
