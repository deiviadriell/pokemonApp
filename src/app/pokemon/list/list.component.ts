import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { MantenimientoComponent } from '../mantenimiento/mantenimiento.component';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public search: string = '';
  pokemonList: Pokemon[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>()
  constructor(private pokemonService:PokemonService,
                private modal: NgbModal,
                private spinner: NgxSpinnerService
                ) { }

  ngOnInit(): void {
   this.obtenerPokemons();
  }
  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
  obtenerPokemons(){
    this.spinner.show();
    this.pokemonService.obtenerPokemons()
    .subscribe( data => {
      this.pokemonList = data;
      this.spinner.hide();
    })
  }
  onSearchPokemon( search: string ) {    
    this.search = search;
  }
  accion(pokemon?: Pokemon){
    const modalRef =this.modal.open(MantenimientoComponent,
        {size: 'lg'}
      );
    modalRef.componentInstance.tituloModal = pokemon ? 'Editar Pokemon' : 'Registrar Pokemon'
    modalRef.componentInstance.pokemonEdit = pokemon
    modalRef.componentInstance.passEntry.subscribe((respuesta: boolean) => { 
      this.obtenerPokemons();
      let message: string = "";
      if(respuesta == true)
          message = 'Correcto.';
      else if(respuesta == false){
        message = 'Problemas en servidor.';
      }
       
      if(respuesta!== null) {
        Swal.fire({
          title: 'Información!',
          text: message,
          icon: 'info',
          timer: 2000,
        });
      }      
    });
  };
  eliminar(pokemon: Pokemon){
    Swal.fire({
      title: 'Información!',
      text: `Está a punto de eliminar el pokemon ${pokemon.name} ¿Está seguro de continuar?`,
      icon: 'info',
      confirmButtonText: 'Confirmar'
    }).then(resolve => {
      if (!resolve.isConfirmed) return
      this.pokemonService.eliminarPokemon(pokemon.id).subscribe(resultado => {        
        this.obtenerPokemons();
        Swal.fire({
          title: 'Información!',
          text: "Operación realizada exitosamente",
          icon: 'info',
          timer: 2000,
        });
      })
    });    
  }
}
