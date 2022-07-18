import { Injectable } from '@angular/core';
import { Actions,createEffect,ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';


@Injectable()
export class UsuariosEfects{

    constructor(
        private actions$:Actions,
        private UsuarioService:UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
            ()=> this.UsuarioService.getUsers()
            .pipe(
               map(users  => usuariosActions.cargarUsuariosSuccess({usuarios:users})),
               catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
            )
            )
        )
    );

}