import { CommonModule } from '@angular/common';
import { Component, contentChildren, inject, input, signal, viewChild } from '@angular/core';
import { MCApiRestHttpService, MCColumn, MCListResponse } from '@mckit/core';
import { MCConfigFilter, MCFilterButton, MCResultFilter } from '@mckit/filter';
import { MCPageHeadingComponent, MCSearchField } from '@mckit/layout-core';
import { MCTable, MCTdTemplateDirective, MCThTemplateDirective, ShowColumnsButton } from '@mckit/table';
import { MenuItem, MessageService } from 'primeng/api';
import { catchError, Observable, Subscription, tap } from 'rxjs';
import { MCOdata } from '../../entities/mc-odata';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'mc-odata-page',
  imports: [CommonModule, MCPageHeadingComponent, MCSearchField, MCFilterButton, ShowColumnsButton, MCTable, MCThTemplateDirective, MCTdTemplateDirective, ToastModule],
  templateUrl: './odata-page.component.html',
  styleUrl: './odata-page.component.css',
  providers: [MessageService]

})
export class MCOdataPage {
  breadcrumb = input<Array<MenuItem>>();

  title = input<string>();
  subtitle = input<string>();

  key = input<string>();

  hasSearch = input<boolean>(true);

  searchField = viewChild(MCSearchField);

  filters = input<MCConfigFilter>();

  columns = input.required<Array<MCColumn>>();
  hasEditColumns = input<boolean>(true);
  selectedColumns = signal<Array<MCColumn>>([]);

  hasPagination = input<boolean>(true);

  thTemplates = contentChildren(MCThTemplateDirective);
  tdTemplates = contentChildren(MCTdTemplateDirective);

  httpService = input.required<MCApiRestHttpService<any>>();

  data = new MCOdata();

  subscriptionList?: Subscription;

  items = signal<MCListResponse<any>>(new MCListResponse<any>());

  isLoading = signal<boolean>(true);

  messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadItems();
  }

  onSearch(query: string) {
    this.searchField()?.stopLoading();
  }

  onFilter(filters: Array<MCResultFilter>) {
    //console.log(filters);
    //console.log(this.odataConverter.convert(filters));
  }

  onChangeColumns(columns: Array<MCColumn>) {
    let filtered = this.columns().filter((column: MCColumn) => columns.some((c: MCColumn) => c.field === column.field));
    this.selectedColumns.set(filtered);
  }

  requestList(): Observable<MCListResponse<any>> {
    return this.httpService().list(this.data.toString());
  }

  loadItems() {
      this.isLoading.set(true);
      if (this.subscriptionList) {
        this.subscriptionList.unsubscribe();
      }

      this.subscriptionList = this.requestList()
      .pipe(
        catchError((data) => {
          this.messageService.add({ severity: 'error', detail: data.error?.message?.message || data.error.message || data.message || 'Unknown error' });
          this.isLoading.set(false);
          throw data;
        }),
        tap(response => this.items.set(response)),
      )
      .subscribe(() => this.isLoading.set(false));
    }
}
