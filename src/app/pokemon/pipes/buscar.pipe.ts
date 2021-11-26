import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform( pokemons: Pokemon[], search: string = '' ): Pokemon[] {
    const filteredPokemons = pokemons.filter( poke => poke.name.toLowerCase().includes( search.toLowerCase() ) );
    return filteredPokemons;

  }

}