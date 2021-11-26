import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*
    Registrar Pokemon
    @param Pokemon: unPokemon
   */
  registrarPokemon(pokemon: Pokemon){
    return this.http.post(`${this.baseUrl}/pokemons`,  pokemon); 
  }


  /*
    Actualizar Pokemon
    @param id: id del Pokemon
    @param Pokemon: unPokemon
  */
  actualizarPokemon(id: number, pokemon: Pokemon){
    return this.http.put(`${this.baseUrl}/pokemons/${id}`, pokemon);
  }

  /*
    Eliminar Pokemon
    @param id: id del Pokemon
   */
  eliminarPokemon(id: number){
    return this.http.delete(`${this.baseUrl}/pokemons/${id}`);
  }

  /* obtener Pokemon */
  obtenerPokemons(){
    return this.http.get<Pokemon[]>(`${ this.baseUrl }/pokemons/?idAuthor=1`)
  }
}
