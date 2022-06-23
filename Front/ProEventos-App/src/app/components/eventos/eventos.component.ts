import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';
import { faEye,faEyeSlash,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  //icones
  faEye=faEye;
  faEyeSlash=faEyeSlash;
  faEdit=faEdit;
  faTrash=faTrash;
  //modal
  modalRef?: BsModalRef;
  //
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public isCollapse = true;
  public widthImg = 150;
  public marginImg = 2;

  public message = '';
  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public changeImagem(){
    this.isCollapse = !this.isCollapse;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}

  public ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    /** list eventos */
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        (this.eventos = eventos), (this.eventosFiltrados = this.eventos);
      },
      error: (error:any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Eventos', 'Erro!')
      },
      complete: ()=> {
        this.spinner.hide();
      }
    });
  }

  //modal
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi deletado com sucesso.', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
