import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseIterable} from '../../../model/base.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-input-autocomplete',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-input-autocomplete.component.html',
  standalone: true,
  styleUrl: './text-input-autocomplete.component.scss'
})
export class TextInputAutocompleteComponent {
  @Input() itens: BaseIterable[] = [];
  @Input() placeholder = '';
  @Input() formControlName = '';
  @Input() formGroup: any = null;
  @Input() value: string = '';
  @Input() addBtn: boolean = false;
  @Output() addEvent: EventEmitter<void> = new EventEmitter();

  showItens: BaseIterable[] = [];
  showOp = false;

  selectItem(item: BaseIterable) {
    this.value = item.nome;
    this.formGroup.get(this.formControlName).setValue(item.nome);
    this.showOp = false;
  }

  filterItens(event: any) {
    this.value = event.target.value;
    this.showItens = this.itens.filter(item => item.nome.toLowerCase().includes(this.value.toLowerCase()));
    this.showOp = this.showItens.length > 0;
  }
}
