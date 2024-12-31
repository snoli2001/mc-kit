import { Component, computed, input } from '@angular/core';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'mc-item-advanced-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule],
  templateUrl: './item-advanced-filter.component.html',
  styleUrl: './item-advanced-filter.component.scss'
})
export class ItemAdvancedFilterComponent {
  filters = input.required<Array<MCFilter>>();
  result = input.required<MCResultFilter>();
  isFirst = input.required<boolean>();

  operators = MCResultFilter.getOperators();
  conditions = MCResultFilter.getConditions();
}
