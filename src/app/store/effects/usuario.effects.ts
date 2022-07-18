import { Injectable } from '@angular/core';
import { Actions,createEffect,ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';



@Injectable()
export class UsuarioEfects{

    constructor(
        private actions$:Actions,
        private UsuarioService:UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            mergeMap(
            (action)=> this.UsuarioService.getUserId(action.id)
            .pipe(
               map(user  => usuariosActions.cargarUsuarioSuccess({usuario:user})),
               catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })) )
            )
            )
        )
    );

}