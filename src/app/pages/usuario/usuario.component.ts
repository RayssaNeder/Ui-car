import { Usuario } from './../../models/Usuario';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListUsuarios: Array<Usuario>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  get cars() {
    return this.usuarioForm.get('cars') as FormArray;
  }

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
    this.usuarioForm.reset();
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


  ListarUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.usuarioService.ListarUsuario()
      .subscribe((response: Array<Usuario>) => {

        this.tableListUsuarios = response;

      }, (error) => console.error(error),
        () => { })

  }

  constructor(public menuService: MenuService, public usuarioService: UsuarioService, public formBuilder: FormBuilder) {
  }


  usuarioForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListarUsuario();

    this.usuarioForm = this.formBuilder.group
      (
        {
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          login: ['', [Validators.required]],
          password: ['', [Validators.required]],
          birthday: ['', [Validators.required]],
          cars: this.formBuilder.array([])

        }
      )
  }


  dadosForm() {
    return this.usuarioForm.controls;
  }


  enviar() {
    debugger
    var dados = this.dadosForm();

    if (this.itemEdicao) {
    this.itemEdicao.firstName = dados["firstName"].value;
      this.itemEdicao.lastName= dados["lastName"].value;
      this.itemEdicao.login= dados["login"].value;
      this.itemEdicao.password= dados["password"].value;
      this.itemEdicao.email= dados["email"].value;
      this.itemEdicao.birthday= dados["birthday"].value;
      this.itemEdicao.phone= dados["phone"].value;



    this.usuarioService.AtualizarUsuario(this.itemEdicao,this.idUsuario )
      .subscribe((response: Usuario) => {

        this.usuarioForm.reset();
        this.ListarUsuario();

      }, (error) => console.error(error),
        () => { })


    } else {

      let item = new Usuario();
      item.firstName = dados["firstName"].value;
      item.lastName = dados["lastName"].value;
      item.login = dados["login"].value;
      item.password = dados["password"].value;
      item.email = dados["email"].value;
      item.birthday = dados["birthday"].value;
      item.phone = dados["phone"].value;

      const carsData = dados["cars"].value;

      item.id = 0;
      item.cars = carsData;

    this.usuarioService.AdicionarUsuario(item)
    .subscribe((response: Usuario) => {

      this.usuarioForm.reset();



    }, (error) => console.error(error),
      () => { })
  }


  }

  itemEdicao: Usuario;
  idUsuario: number;

  edicao(id: number) {
    this.idUsuario = id;
    this.usuarioService.ObterUsuario(id)
      .subscribe((reponse: Usuario) => {

        if (reponse) {
          this.itemEdicao = reponse;
          this.tipoTela = 2;

          var dados = this.dadosForm();
          dados["firstName"].setValue(this.itemEdicao.firstName)
          dados["lastName"].setValue(this.itemEdicao.lastName)
          dados["login"].setValue(this.itemEdicao.login)
          dados["password"].setValue(this.itemEdicao.password)
          dados["email"].setValue(this.itemEdicao.email)
          dados["birthday"].setValue(this.itemEdicao.birthday)
          dados["phone"].setValue(this.itemEdicao.phone)


        }

      },
        (error) => console.error(error),
        () => {

        })
  }


  remocao(id: number) {
    this.idUsuario = id;
    this.usuarioService.DeletarUsuario(this.idUsuario )
      .subscribe((response: Usuario) => {

        this.usuarioForm.reset();
        this.ListarUsuario();

      }, (error) => console.error(error),
        () => { })

  }


  adicionarCarro() {
  const carsFormArray = this.usuarioForm.get('cars') as FormArray;

  // Crie um novo FormGroup para representar um carro
  const novoCarro = this.formBuilder.group({
    year: ['', Validators.required],
    licensePlate: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required]
  });

  // Adicione o novo FormGroup à FormArray de carros
  carsFormArray.push(novoCarro);
}



removerCarro(index: number) {
  // Obtenha o FormArray de carros
  const carsFormArray = this.usuarioForm.get('cars') as FormArray;

  // Remova o carro pelo índice especificado
  carsFormArray.removeAt(index);
}



}
