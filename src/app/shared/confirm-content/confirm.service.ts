import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfirmService {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    return this.modalService.open(content).result;
  }
}