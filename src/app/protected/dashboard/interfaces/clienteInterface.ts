/* eslint-disable @typescript-eslint/naming-convention */
export interface Clientes {
  message:  string;
  clientes: ClienteElement[];
}
export interface Cliente {
  message:   string;
  cliente:   ClienteElement[];
  prestamos: Prestamo[];
}

export interface ClienteElement {
  id:                          number;
  name_customer:               string;
  cedula_customer:             number;
  address_work_customer:       string;
  address_home_customer:       string;
  extra_address_customer:      string;
  cellphone_customer:          number;
  extra_cellphone_customer:    number;
  register_status_db_customer: number;
  created_at:                  Date;
  updated_at:                  Date;
}

export interface Prestamos {
  message:  string;
  prestamos: Prestamo[];
}
export interface Prestamo {
  id:                      any;
  fk_id_cliente:           any;
  fk_id_cashorder:         any;
  status_loan:             any;
  amount_loan:             any;
  amount_rest_loan:        any;
  debt_loan:               any;
  date_start_loan:         any;
  date_pay_loan:           any;
  interest_rate_loan:      any;
  register_status_db_loan: any;
  created_at:              any;
  updated_at:              any;
}
export interface Pedido {
  id:                      any;
  fk_id_cliente:           any;
  fk_id_cashorder:         any;
  status_cash_order:       any;
  amount_cash_order:             any;
  amount_rest_loan:        any;
  debt_loan:               any;
  date_start_loan:         any;
  date_pay_loan:           any;
  interest_rate_loan:      any;
  register_status_db_loan: any;
  created_at:              any;
  updated_at:              any;
}

export interface Pago {
  id:                      any;
  fk_id_cliente:           any;
  fk_id_loan:         any;
  serial_payment:       any;
  amount_payment:             any;
  amount_rest_loan:        any;
  debt_loan:               any;
  date_start_loan:         any;
  date_payment:           any;
  interest_rate_loan:      any;
  register_status_db_loan: any;
  created_at:              any;
  updated_at:              any;
}

export interface Nota {
  id:                      any;
  fk_id_cliente:           any;
  fk_id_loan:         any;
  note:       any;
  type_note:               any;
  date_start_loan:         any;
  date_payment:           any;
  interest_rate_loan:      any;
  register_status_db_loan: any;
  created_at:              any;
  updated_at:              any;
}

