import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";
@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) { }

  open(modalContentComp: any, id: any,id2:any) {
    const modalRef = this.modalService.open(modalContentComp, {
      centered: true
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.id2 = id2;
  }
}