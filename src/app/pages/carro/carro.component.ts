import { NotificationService } from './../../services/notificacao.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Carro } from './../../models/Carro';
import { CarroService } from './../../services/carro.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListCarros: Array<Carro>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.carroForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }


  ListaCarro() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.carroService.ListaCarro()
      .subscribe((response: Array<Carro>) => {

        this.tableListCarros = response;

      }, (error) => console.error(error),
        () => { })

  }


  constructor(public menuService: MenuService, public carroService: CarroService, public formBuilder: FormBuilder, public authService: AuthService, private notificationService: NotificationService) {
  }


  carroForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaCarro();

    this.carroForm = this.formBuilder.group
      (
        {
          year: ['', [Validators.required]],
          licensePlate: ['', [Validators.required]],
          model: ['', [Validators.required]],
          color: ['', [Validators.required]],


        }
      )
  }


  dadosForm() {
    return this.carroForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadosForm();

    if (this.itemEdicao) {
    this.itemEdicao.licensePlate = dados["licensePlate"].value;
      this.itemEdicao.model= dados["model"].value;
      this.itemEdicao.year= dados["year"].value;
      this.itemEdicao.color= dados["color"].value;


    this.carroService.AtualizarCarro(this.itemEdicao,this.idCarro )
      .subscribe((response: Carro) => {

        this.carroForm.reset();
        this.ListaCarro();

      }, (error) => console.error(error),
        () => { })


    } else {

      let item = new Carro();
      item.licensePlate = dados["licensePlate"].value;
      item.color = dados["color"].value;
      item.model = dados["model"].value;
      item.year = dados["year"].value;

      item.id = 0;

    this.carroService.AdicionarCarro(item)
    .subscribe((response: Carro) => {

      this.carroForm.reset();
      this.notificationService.success('Carro cadastrado com sucesso!');




    }, (error) => console.error(error),
      () => { })
  }


  }

  itemEdicao: Carro;
 idCarro: number;

  edicao(id: number) {
    this.idCarro = id;
    this.carroService.ObterCarro(id)
      .subscribe((reponse: Carro) => {

        if (reponse) {
          this.itemEdicao = reponse;
          this.tipoTela = 2;

          var dados = this.dadosForm();
          dados["color"].setValue(this.itemEdicao.color)
          dados["model"].setValue(this.itemEdicao.model)
          dados["licensePlate"].setValue(this.itemEdicao.licensePlate)
          dados["year"].setValue(this.itemEdicao.year)

        }

      },
        (error) => console.error(error),
        () => {

        })
  }


  remocao(id: number) {
    this.idCarro = id;
    this.carroService.DeletarCarro(this.idCarro )
      .subscribe((response: Carro) => {

        this.carroForm.reset();
        this.ListaCarro();

      }, (error) => console.error(error),
        () => { })

  }



}
