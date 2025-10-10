import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountsService } from './api/accounts.service';
import { AssetsService } from './api/assets.service';
import { BanksService } from './api/banks.service';
import { CounterpartiesService } from './api/counterparties.service';
import { CustomersService } from './api/customers.service';
import { DepositAddressesService } from './api/depositAddresses.service';
import { DepositBankAccountsService } from './api/depositBankAccounts.service';
import { ExecutionsService } from './api/executions.service';
import { ExternalBankAccountsService } from './api/externalBankAccounts.service';
import { ExternalWalletsService } from './api/externalWallets.service';
import { FilesService } from './api/files.service';
import { IdentityVerificationsService } from './api/identityVerifications.service';
import { InternalService } from './api/internal.service';
import { InvoicesService } from './api/invoices.service';
import { PaymentInstructionsService } from './api/paymentInstructions.service';
import { PersonaSessionsService } from './api/personaSessions.service';
import { PlansService } from './api/plans.service';
import { PricesService } from './api/prices.service';
import { QuotesService } from './api/quotes.service';
import { SymbolsService } from './api/symbols.service';
import { TradesService } from './api/trades.service';
import { TransfersService } from './api/transfers.service';
import { WorkflowsService } from './api/workflows.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
