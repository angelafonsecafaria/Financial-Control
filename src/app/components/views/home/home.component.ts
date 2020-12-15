import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Transaction } from '../../shared/models/ transaction/ transaction';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public formTransaction: FormGroup;
    public transactions: Array<Transaction> = [];
    public profit: number = 0;
    public debit: number = 0;
    public total: number = 0;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.createForm();
        this.getTransaction();
    }

    public onSubmit(): void {
        console.log(this.formTransaction.value);
        this.transactions.push(this.formTransaction.value)
        this.getTransaction();
    }

    private getTransaction(): void {
        if (this.transactions !== null && this.transactions.length > 0) {
            this.transactions.forEach((transaction: Transaction) => {
                if (transaction.type === 'compra') {
                    this.debit = this.debit + parseInt(transaction.price);
                }
                if (transaction.type === 'venda') {
                    this.profit = this.profit + parseInt(transaction.price);
                }
                this.calculateProfit();
            });
        }
    }

    private calculateProfit(): void {
        if (this.profit > 0) {
            this.total = this.profit - this.debit;
        } else {
            this.total = 0;
        }

        if(this.total < 0){
            this.total = 0;
        }
    }

    private createForm(): void {
        this.formTransaction = this.formBuilder.group({
            type: new FormControl(null),
            merchandise: new FormControl(null),
            price: new FormControl(null),
        });
    }
}
