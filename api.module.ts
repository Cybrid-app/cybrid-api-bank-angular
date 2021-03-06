import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountsService } from './api/accounts.service';
import { AssetsService } from './api/assets.service';
import { BanksService } from './api/banks.service';
import { CustomersService } from './api/customers.service';
import { IdentityRecordsService } from './api/identityRecords.service';
import { PricesService } from './api/prices.service';
import { QuotesService } from './api/quotes.service';
import { SymbolsService } from './api/symbols.service';
import { TradesService } from './api/trades.service';
import { TradingConfigurationsService } from './api/tradingConfigurations.service';
import { VerificationKeysService } from './api/verificationKeys.service';

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
