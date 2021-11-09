import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dashboardService } from '../dashboard-service.service';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  public pagos;
  public prestamos;


  constructor(private dbService: dashboardService,
    private rutaActiva: ActivatedRoute,
    private router: Router) {}

    ngOnInit() {
      this.dbService.getTables('getPagos').subscribe(arg => this.pagos = arg);
      this.dbService.getTables('getPrestamos').subscribe(arg => this.prestamos = arg);
    }

    getAuditorias(ruta){
      this.dbService.downloadPDF(ruta);
    }

  // eslint-disable-next-line @typescript-eslint/member-ordering
    students = [
      {
          name: 'Will Smith',
          gender: 'Male',
          country: 'USA'
      },
      {
          name: 'Jackline Joy',
          gender: 'Female',
          country: 'Sri Lanak'
      },
  ];

}
