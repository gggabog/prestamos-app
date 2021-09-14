/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parseJSON } from 'jquery';
@Component({
  selector: 'app-add-pago',
  host: {
    class:'w-full'
  },
  templateUrl: './add-pago.component.html',
  styleUrls: ['./add-pago.component.scss'],
})
export class AddPagoComponent implements OnInit {

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
    amount_payment: ['', [Validators.required]],
    fk_id_loan: ['', [Validators.required]],
    date_payment: ['', [Validators.required]],
    serial_payment: ['', [Validators.required]],
  });

  prestamos = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {
    this.getPrestamos();
  }

  get loanId() {
    return this.addFrom.get('fk_id_loan');
  }

  changeCustomer(event){
    console.log(event);
  }

  getPrestamos(){
    this.dbService.getAll('loans')
    .subscribe(resp=>{
       this.prestamos = resp.prestamos;
       console.log(this.prestamos);
    });

 }
 eventChange(event){}


  add(){
     const prestamo = JSON.parse(this.loanId.value);
     const monto = this.addFrom.get('amount_payment').value;
     const fecha = this.addFrom.get('date_payment').value;
     const serial = this.addFrom.get('serial_payment').value;
     this.addFrom = this.fb.group({
      fk_id_loan: [prestamo, [Validators.required]],
      amount_payment: [monto, [Validators.required]],
      date_payment: [fecha, [Validators.required]],
    serial_payment: [serial, [Validators.required]],
     });
    this.dbService.add(this.addFrom.value, 'payments')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Registro Agregado'
        });
        this.router.navigateByUrl('/dashboard/pagos');
        window.location.reload();
      }
    });
  }

}
