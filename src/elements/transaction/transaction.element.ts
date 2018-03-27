import {Component, Input} from '@angular/core';

@Component({
  selector: 'transaction-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionElement {
  @Input() transaction: Transaction;
}
