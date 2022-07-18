import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

import { Store } from '@ngrx/store';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

 usuarios:Usuario[]=[];
 loading:boolean = false;
 error:any;


  ngOnInit(): void {

    this.store.select('usuarios').subscribe(({users,loading,error}) =>{
      this.usuarios  =users;
      this.loading = loading;
      this.error =error;

    })

    this.store.dispatch(cargarUsuarios())


  }

}
