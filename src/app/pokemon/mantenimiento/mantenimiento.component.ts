import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { PokemonService } from '../../shared/services/pokemon.service';
@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  @Input() pokemonEdit?: Pokemon;  
  @Input() tituloModal: string = '';
  @Output() passEntry: EventEmitter<boolean> = new EventEmitter();
  titulo: string = '';
  idPokemon: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>()
  tipos = [
      'water',
      'fire',
      'normal',
      'bug',
      'poison',
    ]
  form: FormGroup = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    image: ['', Validators.required],
    hp: [0, [Validators.required, Validators.min(0)]],
    attack: [0, [Validators.required, Validators.min(0)]],
    defense: [0, [Validators.required, Validators.min(0)]],
    idAuthor: [1, Validators.required],
    type: ['', Validators.required],

  })
  constructor(private fb: FormBuilder,
              private ventanaModal: NgbModal,
              private pokemonService: PokemonService,
              
              ) { }

  ngOnInit(): void {
   if(this.pokemonEdit!=null){
     this.idPokemon = this.pokemonEdit.id;
    this.form.patchValue(this.pokemonEdit);  
   }
  }
  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
    
  }

  campoEsValido( campo: string) {        
    return this.form.controls[campo]?.errors     
    && this.form.controls[campo]?.touched
  }  
  guardar(){
    if(this.form.controls['id']?.value===0){
      this.pokemonService.registrarPokemon(this.form.value).subscribe(data=> {   
        this.passEntry.emit(true);
       },() =>{  
         this.passEntry.emit(false);   
       })
       this.ventanaModal.dismissAll();
    }
    else {
      this.pokemonService.actualizarPokemon(this.idPokemon,this.form.value).subscribe(data => { this.passEntry.emit(true);
      },() =>{  
        this.passEntry.emit(false);   
      })
      this.ventanaModal.dismissAll();
   }
  }
  cancel(){      
    this.ventanaModal.dismissAll();
  }
}
