import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";
@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) { }

  open(modalContentComp: any, id: any) {
    const modalRef = this.modalService.open(modalContentComp, {
      centered: true
    });
    modalRef.componentInstance.id = id;
  }
}