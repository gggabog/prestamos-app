/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-cliente',
  host: {
    class:'w-full'
  },
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss'],
})
export class AddClienteComponent implements OnInit {

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
    name_customer: ['', [Validators.required]],
    cedula_customer: ['', [Validators.required]],
    address_work_customer: ['', [Validators.required]],
    address_home_customer: ['', [Validators.required]],
    extra_address_customer: ['', [Validators.required]],
    cellphone_customer: ['', [Validators.required]],
    extra_cellphone_customer: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {}

  add(){
    this.dbService.add(this.addFrom.value, 'customer')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario agregado'
        });
        this.router.navigateByUrl('/dashboard/clientes');
        window.location.reload();
      }
    });
  }

}