import { Component, computed, input, output } from '@angular/core';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCConditionResult, MCResultFilter } from '../../entities/result';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { MCItemFilter } from '../../entities/item-filter';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'mc-item-advanced-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule, DropdownModule, AutoCompleteModule, MultiSelectModule],
  templateUrl: './item-advanced-filter.component.html',
  styleUrl: './item-advanced-filter.component.scss'
})
export class ItemAdvancedFilterComponent {
  filters = input.required<Array<MCFilter>>();
  result = input.required<MCResultFilter>();
  isFirst = input.required<boolean>();

  clickRemove = output();

  operators = MCResultFilter.getOperators();
  conditions = MCResultFilter.getConditions();
  operatorWhere = [
    { label: 'Where', value: 'where' },
  ];

  typeText = MCTypeFilter.TEXT;
  typeSelect = MCTypeFilter.SELECT;
  typeAutocomplete = MCTypeFilter.AUTOCOMPLETE;
  typeMultiselect = MCTypeFilter.MULTISELECT;

  filteredOptions: Array<MCItemFilter> = [];
  MCConditionResult = MCConditionResult;

  clickAddFilter(): void {
    this.result().childrens!.push(new MCResultFilter());
  }

  clickRemoveFilter(): void {
    this.clickRemove.emit();
  }

  onRefreshColumn() {
    this.result().value = undefined;

    if(this.result().filter?.isShowConditions == false){
      this.result().condition = MCConditionResult.EQUALS;
    }

    if(this.result().filter?.type == this.typeMultiselect){
      this.result().condition = MCConditionResult.IN;
    }
  }

  onFilterAutocomplete(event: AutoCompleteCompleteEvent) {
    this.result().filter!.data.filter!(event.query)
    .subscribe((data: Array<MCItemFilter>) => {
      this.filteredOptions = data;
    });
  }
}
