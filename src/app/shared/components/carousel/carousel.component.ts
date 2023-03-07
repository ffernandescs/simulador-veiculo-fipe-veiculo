import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  imagem1 = '../../../../assets/img/img1.png';
  modal: any;

  constructor(private modalService: NgbModal) {}
  openModal(content: any) {
    this.modal = this.modalService.open(content, { centered: true });
  }
}
