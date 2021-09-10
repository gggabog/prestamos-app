/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-prestamo',
  host: {
    class:'w-full'
  },
  templateUrl: './add-prestamo.component.html',
  styleUrls: ['./add-prestamo.component.scss'],
})
export class AddPrestamoComponent implements OnInit {

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  addFrom: FormGroup = this.fb.group({
    amount_loan: ['', [Validators.required]],
    fk_id_cliente: ['', [Validators.required]],
    date_start_loan: ['', [Validators.required]],
    date_pay_loan: ['', [Validators.required]],
    interest_rate_loan: ['', [Validators.required]]
  });

  clientes = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {
    this.getClientes();
  }

  get customerName() {
    return this.addFrom.get('fk_id_cliente');
  }

  changeCustomer(event){
    console.log(event);
  }

  getClientes(){
    this.dbService.getAll('customer')
    .subscribe(resp=>{
       this.clientes = resp.clientes;
       console.log(this.clientes);
    });

 }
 eventChange(event){}


  add(){
     const cliente = JSON.parse(this.customerName.value);
     const monto = this.addFrom.get('amount_loan').value;
     const fechaInicio = this.addFrom.get('date_pay_loan').value;
     const fechaPago = this.addFrom.get('date_start_loan').value;
     const tasa = this.addFrom.get('interest_rate_loan').value;
     this.addFrom = this.fb.group({
      amount_loan: [monto, [Validators.required]],
      fk_id_cliente: [cliente, [Validators.required]],
      date_start_loan: [fechaInicio, [Validators.required]],
      date_pay_loan: [fechaPago, [Validators.required]],
      interest_rate_loan: [tasa, [Validators.required]]
    });
    this.dbService.add(this.addFrom.value, 'loans')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Registro Agregado'
        });
        this.router.navigateByUrl('/dashboard/pedidos');
        window.location.reload();
      }
    });
  }

}
