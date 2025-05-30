import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MCEventModalForm, MCFormModal } from '../form-modal/form-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UntypedFormGroup } from '@angular/forms';
import { Subject, Subscription, take } from 'rxjs';

@Component({
  selector: 'mc-footer-modal-form',
  imports: [CommonModule, ButtonModule],
  templateUrl: './footer-modal-form.component.html',
  styleUrl: './footer-modal-form.component.css'
})
export class MCFooterModalForm implements OnInit, OnDestroy {

  dialogService = inject(DialogService);
  dialogRef = inject(DynamicDialogRef<MCFormModal>);

  isLoading = signal<boolean>(false);

  group?: WritableSignal<UntypedFormGroup|undefined>;

  eventObs?: Subject<MCEventModalForm>;

  eventSubscription?: Subscription;

  ngOnInit(): void {
    this.initConfig();
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }

  onClickCancel() {
    this.eventObs?.next(MCEventModalForm.init('close'));
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.isLoading.set(true);

    let event = new MCEventModalForm();
    event.key = 'submit';
    event.dialog = this.dialogRef;
    if(this.group != undefined){
      event.content = this.group()?.value;
    }

    this.eventObs?.next(event);
  }

  initConfig() {
    let instance: DynamicDialogComponent = this.dialogService.getInstance(this.dialogRef);
    if(instance.data == undefined){
      this.dialogRef.close();
      return;
    }

    this.dialogRef.onChildComponentLoaded
    .pipe(take(1))
    .subscribe((comp) => {
      this.group = comp.formComponent()?.formGroup;
      this.eventObs = comp.getEventObs();
      this.initObs();
    });
  }

  initObs() {
    this.eventSubscription = this.eventObs?.subscribe(event => {
      if(event.key == 'stop-loading') {
        this.isLoading.set(false);
      }
    });
  }
}
