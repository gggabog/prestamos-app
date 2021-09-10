/* eslint-disable @angular-eslint/no-host-metadata-property */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-show-pedido',
  host: {
    class:'w-full'
  },
  templateUrl: './show-pedido.component.html',
  styleUrls: ['./show-pedido.component.scss'],
})
export class ShowPedidoComponent implements OnInit {


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

  public pedido = [];
  public cliente = [];
  public montoPrestado;
  public dtOptions: DataTables.Settings = {};
  constructor(private rutaActiva: ActivatedRoute,
              private dbService: dashboardService,
              private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
     this.getPedido(this.rutaActiva.snapshot.params.id);
  }

  getPedido(id){
    this.dbService.get(id, 'cashorder')
    .subscribe(resp=>{
      this.pedido = resp.pedido;
      this.cliente = resp.cliente;
      console.log(resp);
    });
  }
  delete(){
    Swal.fire({
      title: '¿Quiere eliminar este registro?',
      text: 'No puedes revertir esto',
      icon: 'warning',
      // imageUrl: 'https://i.pinimg.com/564x/ac/d4/fb/acd4fb9f575c28020064ba55664cfada.jpg',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {this.dbService.delete(this.rutaActiva.snapshot.params.id, 'cashorder')
      .subscribe(resp=>{
        if(resp.message==='Ok'){
          this.toast.fire({
            icon: 'success',
            title: 'Usuario Actualizado'
          });
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado',
            'success'
          );
          this.router.navigateByUrl('/dashboard/pedidos');
          delay(3000);
          window.location.assign('/dashboard/pedidos');
        }
      });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  aceptar(){Swal.fire({
    title: '¿Quiere aceptar este pedido?',
    text: 'No puedes revertir esto',
    icon: 'warning',
    // imageUrl: 'https://i.pinimg.com/564x/ac/d4/fb/acd4fb9f575c28020064ba55664cfada.jpg',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {this.dbService.addPrestamo(this.rutaActiva.snapshot.params.id, 'cashorderAdd')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario Actualizado'
        });
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado',
          'success'
        );
        this.router.navigateByUrl('/dashboard/pedidos');
        delay(3000);
        window.location.assign('/dashboard/pedidos');
      }
    });
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  });
}



}
