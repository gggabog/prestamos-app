/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-put-prestamo',
  host: {
    class:'w-full'
  },
  templateUrl: './put-prestamo.component.html',
  styleUrls: ['./put-prestamo.component.scss'],
})
export class PutPrestamoComponent implements OnInit {


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

  clientes = [];

  putFrom: FormGroup = this.fb.group({
    amount_loan: ['', [Validators.required]],
    fk_id_cliente: ['', [Validators.required]],
    date_start_loan: ['', [Validators.required]],
    date_pay_loan: ['', [Validators.required]],
    interest_rate_loan: ['', [Validators.required]]
  });

  prestamo: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'loans')
    .subscribe(resp=>{
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.prestamo);
       this.putFrom = this.fb.group({
        amount_loan: [resp.prestamo.amount_loan, [Validators.required]],
        fk_id_cliente: [resp.prestamo.fk_id_cliente, [Validators.required]],
        date_start_loan: [resp.prestamo.date_start_loan, [Validators.required]],
        date_pay_loan: [resp.prestamo.date_pay_loan, [Validators.required]],
        interest_rate_loan: [resp.prestamo.interest_rate_loan, [Validators.required]]
      });

    });
    this.dbService.getAll('customer')
    .subscribe(resp=>{
      this.clientes = resp.clientes;
    });
  }

  get customerName() {
    return this.putFrom.get('fk_cliente_id');
  }

  changeCustomer(event){
    console.log(event);
  }


  put(){
     const cliente = JSON.parse(this.customerName.value);
     const monto = this.putFrom.get('amount_loan').value;
     const fechaInicio = this.putFrom.get('date_pay_loan').value;
     const fechaPago = this.putFrom.get('date_start_loan').value;
     const tasa = this.putFrom.get('interest_rate_loan').value;
    //  console.log('exit');
    //  console.log(cliente);
     this.putFrom = this.fb.group({
      amount_loan: [monto, [Validators.required]],
      fk_id_cliente: [cliente, [Validators.required]],
      date_start_loan: [fechaInicio, [Validators.required]],
      date_pay_loan: [fechaPago, [Validators.required]],
      interest_rate_loan: [tasa, [Validators.required]]
    });
    //  console.log(this.putFrom.value);
    // this.dbService.put(this.putFrom.value, 'loans',this.rutaActiva.snapshot.params.id)
    // .subscribe(resp=>{
    //   if(resp.message==='Ok'){
    //     this.toast.fire({
    //       icon: 'success',
    //       title: 'Registro Actualizado'
    //     });
    //     this.router.navigateByUrl('/dashboard/prestamos');
    //     window.location.reload();
    //   }
    // });
  }

}

