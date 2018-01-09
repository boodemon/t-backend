import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  modalRef: BsModalRef;
  TemplateRef: any;
  frmTitle: string;
  input:any={};

  constructor(
    private Auth: AuthService,
    private modalService: BsModalService,

  ) { 
    Auth.online();
  }

  ngOnInit() {
  }
  newModal(template: TemplateRef<any>) {
    this.input = {
      image : '',
      name  : '',
      active : false,
    }

    this.frmTitle = 'Add new Category';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
}
