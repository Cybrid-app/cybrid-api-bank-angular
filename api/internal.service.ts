/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](<api_platform_bank_swagger_schema_url>) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Introduction](https://docs.cybrid.xyz/docs/introduction) 2. [Platform Introduction](https://docs.cybrid.xyz/docs/how-is-cybrid-architected) 3. [Testing with Hosted Web Demo App](https://docs.cybrid.xyz/docs/testing-with-hosted-web-demo-app)  In [Getting Started in the Cybrid Sandbox](https://docs.cybrid.xyz/docs/how-do-i-get-started-with-the-sandbox), we walk you through how to use the [Cybrid Sandbox](https://id.sandbox.cybrid.app/) to create a test bank and generate API keys. In [Getting Ready for Trading](https://kb.cybrid.xyz/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), [iOS](https://github.com/Cybrid-app/cybrid-sdk-ios))  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](<api_platform_organization_swagger_ui_url>)   | APIs to manage organizations                                | | [Bank API](<api_platform_bank_swagger_ui_url>)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](<api_idp_swagger_ui_url>)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](<api_idp_url>). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](<api_idp_url>) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API using our [Identities API](<api_idp_swagger_ui_url>).  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` # Example request when using Bank credentials curl -X POST <api_idp_url>/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"<api_platform_bank_scopes>\"   }\' -H \"Content-Type: application/json\"  # When using Organization credentials set `scope` to \'<api_platform_organization_scopes>\' ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization, Bank or Customer token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource              | Read scope (Token Type)                                    | Write scope (Token Type)                      | Execute scope (Token Type)                       | |-----------------------|------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------| | Account               | accounts:read (Organization, Bank, Customer)               |                                               | accounts:execute (Bank, Customer)                | | Bank                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)              | banks:execute (Organization)                     | | Customer              | customers:read (Organization, Bank, Customer)              | customers:write (Bank, Customer)              | customers:execute (Bank)                         | | Counterparty          | counterparties:read (Organization, Bank, Customer)         | counterparties:write (Bank, Customer)         | counterparties:execute (Bank)                    | | Deposit Address       | deposit_addresses:read (Organization, Bank, Customer)      | deposit_addresses:write (Bank, Customer)      | deposit_addresses:execute (Bank, Customer)       | | External Bank Account | external_bank_accounts:read (Organization, Bank, Customer) | external_bank_accounts:write (Bank, Customer) | external_bank_accounts:execute (Bank, Customer)  | | External Wallet       | external_wallet:read (Organization, Bank, Customer)        |                                               | external_wallet:execute (Bank, Customer)         | | Organization          | organizations:read (Organization)                          | organizations:write (Organization)            |                                                  | | User                  | users:read (Organization)                                  |                                               | users:execute (Organization)                     | | Price                 | prices:read (Bank, Customer)                               |                                               |                                                  | | Quote                 | quotes:read (Organization, Bank, Customer)                 |                                               | quotes:execute (Organization, Bank, Customer)    | | Trade                 | trades:read (Organization, Bank, Customer)                 |                                               | trades:execute (Organization, Bank, Customer)    | | Transfer              | transfers:read (Organization, Bank, Customer)              |                                               | transfers:execute (Organization, Bank, Customer) | | Workflow              | workflows:read (Organization, Bank, Customer)              |                                               | workflows:execute (Bank, Customer)               | | Invoice               | invoices:read (Organization, Bank, Customer)               | invoices:write (Bank, Customer)               | invoices:execute (Bank, Customer)                |  ## Available Endpoints  The available APIs for the [Identity](<api_idp_swagger_ui_url>), [Organization](<api_platform_organization_swagger_ui_url>) and [Bank](<api_platform_bank_swagger_ui_url>) API services are listed below:  | API Service  | Model                | API Endpoint Path              | Description                                                                                       | |--------------|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                 | /api/bank_applications         | Create and list banks                                                                             | | Identity     | CustomerToken        | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Identity     | Organization         | /api/organization_applications | Create and list organizations                                                                     | | Identity     | Organization         | /api/users                     | Create and list organization users                                                                | | Organization | Organization         | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Account              | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Asset                | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | Bank                 | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | Customer             | /api/customers                 | Create and list customers                                                                         | | Bank         | Counterparty         | /api/counterparties            | Create and list counterparties                                                                    | | Bank         | DepositAddress       | /api/deposit_addresses         | Create, get and list deposit addresses                                                            | | Bank         | ExternalBankAccount  | /api/external_bank_accounts    | Create, get and list external bank accounts, which connect customer bank accounts to the platform | | Bank         | ExternalWallet       | /api/external_wallets          | Create, get, list and delete external wallets, which connect customer wallets to the platform     | | Bank         | IdentityVerification | /api/identity_verifications    | Create and list identity verifications, which are performed on customers for KYC                  | | Bank         | Invoice              | /api/invoices                  | Create, get, cancel and list invoices                                                             | | Bank         | PaymentInstruction   | /api/payment_instructions      | Create, get and list payment instructions for invoices                                            | | Bank         | Price                | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quote                | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Symbol               | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Trade                | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Transfer             | /api/transfers                 | Create, get and list transfers (e.g., funding, book)                                              | | Bank         | Workflow             | /api/workflows                 | Create, get and list workflows                                                                    |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` typically does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where `Sandbox` is the environment that you would test, prototype and build in prior to moving to `Production`.  An `Organization` can have multiple `banks`, in either `Sandbox` or `Production` environments. A `Sandbox Bank` will be backed by stubbed data and process flows. For instance, funding source transfer processes as well as trades will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amount of simulated fiat currency for testing purposes.  **Customers**  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified (i.e., KYC\'d) in our system before they can play any part on the platform, which means they must have an associated and a passing `Identity Verification`. See the Identity Verifications section for more details on how a customer can be verified.  `Customers` must also have an `Account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.0.0
 * Contact: support@cybrid.app
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { AccountBankModel } from '../model/account';
// @ts-ignore
import { AccountListBankModel } from '../model/accountList';
// @ts-ignore
import { CounterpartyBankModel } from '../model/counterparty';
// @ts-ignore
import { CustomerBankModel } from '../model/customer';
// @ts-ignore
import { CustomerListBankModel } from '../model/customerList';
// @ts-ignore
import { DepositAddressBankModel } from '../model/depositAddress';
// @ts-ignore
import { DepositBankAccountBankModel } from '../model/depositBankAccount';
// @ts-ignore
import { DepositBankAccountListBankModel } from '../model/depositBankAccountList';
// @ts-ignore
import { ErrorResponseBankModel } from '../model/errorResponse';
// @ts-ignore
import { IdentityVerificationBankModel } from '../model/identityVerification';
// @ts-ignore
import { InternalActivityLimitConfigurationBankModel } from '../model/internalActivityLimitConfiguration';
// @ts-ignore
import { InternalActivityLimitConfigurationListBankModel } from '../model/internalActivityLimitConfigurationList';
// @ts-ignore
import { InternalActivityReportBankModel } from '../model/internalActivityReport';
// @ts-ignore
import { InternalBankAccountServiceBankModel } from '../model/internalBankAccountService';
// @ts-ignore
import { InternalBankAccountServiceListBankModel } from '../model/internalBankAccountServiceList';
// @ts-ignore
import { InternalBankBankModel } from '../model/internalBank';
// @ts-ignore
import { InternalBankListBankModel } from '../model/internalBankList';
// @ts-ignore
import { InternalBusinessDetailBankModel } from '../model/internalBusinessDetail';
// @ts-ignore
import { InternalComplianceDecisionBankModel } from '../model/internalComplianceDecision';
// @ts-ignore
import { InternalCountryCodeConfigurationBankModel } from '../model/internalCountryCodeConfiguration';
// @ts-ignore
import { InternalCreateExchangeSettlementApproval202ResponseBankModel } from '../model/internalCreateExchangeSettlementApproval202Response';
// @ts-ignore
import { InternalCryptoAssetConfigurationBankModel } from '../model/internalCryptoAssetConfiguration';
// @ts-ignore
import { InternalCryptoAssetConfigurationListBankModel } from '../model/internalCryptoAssetConfigurationList';
// @ts-ignore
import { InternalCryptoFundingDepositTransferBankModel } from '../model/internalCryptoFundingDepositTransfer';
// @ts-ignore
import { InternalCybridAccountBankModel } from '../model/internalCybridAccount';
// @ts-ignore
import { InternalCybridAccountListBankModel } from '../model/internalCybridAccountList';
// @ts-ignore
import { InternalCybridGasAccountConfigurationBankModel } from '../model/internalCybridGasAccountConfiguration';
// @ts-ignore
import { InternalExchangeAccountBankModel } from '../model/internalExchangeAccount';
// @ts-ignore
import { InternalExchangeBankModel } from '../model/internalExchange';
// @ts-ignore
import { InternalExchangeListBankModel } from '../model/internalExchangeList';
// @ts-ignore
import { InternalExchangeMonitorBankModel } from '../model/internalExchangeMonitor';
// @ts-ignore
import { InternalExchangeOrderBankModel } from '../model/internalExchangeOrder';
// @ts-ignore
import { InternalExchangeOrderListBankModel } from '../model/internalExchangeOrderList';
// @ts-ignore
import { InternalExchangeSettlementBankModel } from '../model/internalExchangeSettlement';
// @ts-ignore
import { InternalExchangeSettlementConfigurationBankModel } from '../model/internalExchangeSettlementConfiguration';
// @ts-ignore
import { InternalExchangeSettlementConfigurationListBankModel } from '../model/internalExchangeSettlementConfigurationList';
// @ts-ignore
import { InternalExchangeSettlementObligationBankModel } from '../model/internalExchangeSettlementObligation';
// @ts-ignore
import { InternalExchangeSettlementPaymentOrderBankModel } from '../model/internalExchangeSettlementPaymentOrder';
// @ts-ignore
import { InternalExchangeSettlementPaymentOrderListBankModel } from '../model/internalExchangeSettlementPaymentOrderList';
// @ts-ignore
import { InternalExecutionBankModel } from '../model/internalExecution';
// @ts-ignore
import { InternalExpectedPaymentBankModel } from '../model/internalExpectedPayment';
// @ts-ignore
import { InternalExpectedPaymentListBankModel } from '../model/internalExpectedPaymentList';
// @ts-ignore
import { InternalExternalBankAccountBankModel } from '../model/internalExternalBankAccount';
// @ts-ignore
import { InternalExternalBankAccountListBankModel } from '../model/internalExternalBankAccountList';
// @ts-ignore
import { InternalExternalWalletBankModel } from '../model/internalExternalWallet';
// @ts-ignore
import { InternalExternalWalletListBankModel } from '../model/internalExternalWalletList';
// @ts-ignore
import { InternalExternalWalletScreeningBankModel } from '../model/internalExternalWalletScreening';
// @ts-ignore
import { InternalFeeChargeBankModel } from '../model/internalFeeCharge';
// @ts-ignore
import { InternalFeeChargeListBankModel } from '../model/internalFeeChargeList';
// @ts-ignore
import { InternalFeeConfigurationBankModel } from '../model/internalFeeConfiguration';
// @ts-ignore
import { InternalFeeConfigurationListBankModel } from '../model/internalFeeConfigurationList';
// @ts-ignore
import { InternalFiatAssetConfigurationBankModel } from '../model/internalFiatAssetConfiguration';
// @ts-ignore
import { InternalFundingDepositTransferBankModel } from '../model/internalFundingDepositTransfer';
// @ts-ignore
import { InternalInternalBankAccountBankModel } from '../model/internalInternalBankAccount';
// @ts-ignore
import { InternalInternalBankAccountConfigurationBankModel } from '../model/internalInternalBankAccountConfiguration';
// @ts-ignore
import { InternalInternalBankAccountListBankModel } from '../model/internalInternalBankAccountList';
// @ts-ignore
import { InternalInternalInvoiceListBankModel } from '../model/internalInternalInvoiceList';
// @ts-ignore
import { InternalInternalWalletBankModel } from '../model/internalInternalWallet';
// @ts-ignore
import { InternalInternalWalletConfigurationBankModel } from '../model/internalInternalWalletConfiguration';
// @ts-ignore
import { InternalInternalWalletGroupBankModel } from '../model/internalInternalWalletGroup';
// @ts-ignore
import { InternalInternalWalletListBankModel } from '../model/internalInternalWalletList';
// @ts-ignore
import { InternalInvoiceBankModel } from '../model/internalInvoice';
// @ts-ignore
import { InternalPayoutSymbolConfigurationBankModel } from '../model/internalPayoutSymbolConfiguration';
// @ts-ignore
import { InternalPersonDetailBankModel } from '../model/internalPersonDetail';
// @ts-ignore
import { InternalPlanBankModel } from '../model/internalPlan';
// @ts-ignore
import { InternalPostAccountBankModel } from '../model/internalPostAccount';
// @ts-ignore
import { InternalPostDepositBankAccountBankModel } from '../model/internalPostDepositBankAccount';
// @ts-ignore
import { InternalPostFeeConfigurationBankModel } from '../model/internalPostFeeConfiguration';
// @ts-ignore
import { InternalPostQuoteBankModel } from '../model/internalPostQuote';
// @ts-ignore
import { InternalQuoteBankModel } from '../model/internalQuote';
// @ts-ignore
import { InternalReconciliationBankModel } from '../model/internalReconciliation';
// @ts-ignore
import { InternalReconciliationListBankModel } from '../model/internalReconciliationList';
// @ts-ignore
import { InternalStageBankModel } from '../model/internalStage';
// @ts-ignore
import { InternalTradeBankModel } from '../model/internalTrade';
// @ts-ignore
import { InternalTradingSymbolConfigurationBankModel } from '../model/internalTradingSymbolConfiguration';
// @ts-ignore
import { InternalTradingSymbolConfigurationListBankModel } from '../model/internalTradingSymbolConfigurationList';
// @ts-ignore
import { InternalTransactionMonitorBankModel } from '../model/internalTransactionMonitor';
// @ts-ignore
import { InternalTransactionsListBankModel } from '../model/internalTransactionsList';
// @ts-ignore
import { InternalTransferBankModel } from '../model/internalTransfer';
// @ts-ignore
import { InternalTransferListBankModel } from '../model/internalTransferList';
// @ts-ignore
import { InternalTransferRailConfigurationBankModel } from '../model/internalTransferRailConfiguration';
// @ts-ignore
import { InternalTransferScreeningBankModel } from '../model/internalTransferScreening';
// @ts-ignore
import { InternalWalletServiceBankModel } from '../model/internalWalletService';
// @ts-ignore
import { InternalWalletServiceListBankModel } from '../model/internalWalletServiceList';
// @ts-ignore
import { PatchInternalAccountBankModel } from '../model/patchInternalAccount';
// @ts-ignore
import { PatchInternalActivityLimitConfigurationBankModel } from '../model/patchInternalActivityLimitConfiguration';
// @ts-ignore
import { PatchInternalBankAccountServiceBankModel } from '../model/patchInternalBankAccountService';
// @ts-ignore
import { PatchInternalBankBankModel } from '../model/patchInternalBank';
// @ts-ignore
import { PatchInternalBusinessDetailBankModel } from '../model/patchInternalBusinessDetail';
// @ts-ignore
import { PatchInternalCounterpartyBankModel } from '../model/patchInternalCounterparty';
// @ts-ignore
import { PatchInternalCryptoAssetConfigurationBankModel } from '../model/patchInternalCryptoAssetConfiguration';
// @ts-ignore
import { PatchInternalCustomerBankModel } from '../model/patchInternalCustomer';
// @ts-ignore
import { PatchInternalCybridAccountBankModel } from '../model/patchInternalCybridAccount';
// @ts-ignore
import { PatchInternalDepositAddressBankModel } from '../model/patchInternalDepositAddress';
// @ts-ignore
import { PatchInternalDepositBankAccountBankModel } from '../model/patchInternalDepositBankAccount';
// @ts-ignore
import { PatchInternalExchangeAccountBankModel } from '../model/patchInternalExchangeAccount';
// @ts-ignore
import { PatchInternalExchangeOrderBankModel } from '../model/patchInternalExchangeOrder';
// @ts-ignore
import { PatchInternalExchangeSettlementBankModel } from '../model/patchInternalExchangeSettlement';
// @ts-ignore
import { PatchInternalExecutionBankModel } from '../model/patchInternalExecution';
// @ts-ignore
import { PatchInternalExternalBankAccountBankModel } from '../model/patchInternalExternalBankAccount';
// @ts-ignore
import { PatchInternalExternalWalletBankModel } from '../model/patchInternalExternalWallet';
// @ts-ignore
import { PatchInternalExternalWalletScreeningBankModel } from '../model/patchInternalExternalWalletScreening';
// @ts-ignore
import { PatchInternalFeeChargeBankModel } from '../model/patchInternalFeeCharge';
// @ts-ignore
import { PatchInternalFileBankModel } from '../model/patchInternalFile';
// @ts-ignore
import { PatchInternalIdentityVerificationBankModel } from '../model/patchInternalIdentityVerification';
// @ts-ignore
import { PatchInternalInternalBankAccountBankModel } from '../model/patchInternalInternalBankAccount';
// @ts-ignore
import { PatchInternalInternalWalletBankModel } from '../model/patchInternalInternalWallet';
// @ts-ignore
import { PatchInternalInternalWalletGroupBankModel } from '../model/patchInternalInternalWalletGroup';
// @ts-ignore
import { PatchInternalInvoiceBankModel } from '../model/patchInternalInvoice';
// @ts-ignore
import { PatchInternalPaymentInstructionBankModel } from '../model/patchInternalPaymentInstruction';
// @ts-ignore
import { PatchInternalPersonDetailBankModel } from '../model/patchInternalPersonDetail';
// @ts-ignore
import { PatchInternalPlanBankModel } from '../model/patchInternalPlan';
// @ts-ignore
import { PatchInternalStageBankModel } from '../model/patchInternalStage';
// @ts-ignore
import { PatchInternalTradeBankModel } from '../model/patchInternalTrade';
// @ts-ignore
import { PatchInternalTradingSymbolConfigurationBankModel } from '../model/patchInternalTradingSymbolConfiguration';
// @ts-ignore
import { PatchInternalTransferBankModel } from '../model/patchInternalTransfer';
// @ts-ignore
import { PatchInternalTransferScreeningBankModel } from '../model/patchInternalTransferScreening';
// @ts-ignore
import { PatchInternalWalletServiceBankModel } from '../model/patchInternalWalletService';
// @ts-ignore
import { PatchInternalWorkflowBankModel } from '../model/patchInternalWorkflow';
// @ts-ignore
import { PaymentInstructionBankModel } from '../model/paymentInstruction';
// @ts-ignore
import { PlatformFileBankModel } from '../model/platformFile';
// @ts-ignore
import { PostFileBankModel } from '../model/postFile';
// @ts-ignore
import { PostInternalActivityLimitConfigurationBankModel } from '../model/postInternalActivityLimitConfiguration';
// @ts-ignore
import { PostInternalActivityReportBankModel } from '../model/postInternalActivityReport';
// @ts-ignore
import { PostInternalBankAccountServiceBankModel } from '../model/postInternalBankAccountService';
// @ts-ignore
import { PostInternalBankBankModel } from '../model/postInternalBank';
// @ts-ignore
import { PostInternalClaimExchangeSettlementPaymentOrderBankModel } from '../model/postInternalClaimExchangeSettlementPaymentOrder';
// @ts-ignore
import { PostInternalClaimExpectedPaymentBankModel } from '../model/postInternalClaimExpectedPayment';
// @ts-ignore
import { PostInternalComplianceDecisionBankModel } from '../model/postInternalComplianceDecision';
// @ts-ignore
import { PostInternalCountryCodeConfigurationBankModel } from '../model/postInternalCountryCodeConfiguration';
// @ts-ignore
import { PostInternalCryptoAssetConfigurationBankModel } from '../model/postInternalCryptoAssetConfiguration';
// @ts-ignore
import { PostInternalCryptoFundingDepositTransferBankModel } from '../model/postInternalCryptoFundingDepositTransfer';
// @ts-ignore
import { PostInternalCybridAccountBankModel } from '../model/postInternalCybridAccount';
// @ts-ignore
import { PostInternalCybridGasAccountConfigurationBankModel } from '../model/postInternalCybridGasAccountConfiguration';
// @ts-ignore
import { PostInternalExchangeAccountBankModel } from '../model/postInternalExchangeAccount';
// @ts-ignore
import { PostInternalExchangeBankModel } from '../model/postInternalExchange';
// @ts-ignore
import { PostInternalExchangeMonitorBankModel } from '../model/postInternalExchangeMonitor';
// @ts-ignore
import { PostInternalExchangeOrderBankModel } from '../model/postInternalExchangeOrder';
// @ts-ignore
import { PostInternalExchangeSettlementBankModel } from '../model/postInternalExchangeSettlement';
// @ts-ignore
import { PostInternalExchangeSettlementConfigurationBankModel } from '../model/postInternalExchangeSettlementConfiguration';
// @ts-ignore
import { PostInternalExchangeSettlementPaymentOrderBankModel } from '../model/postInternalExchangeSettlementPaymentOrder';
// @ts-ignore
import { PostInternalExpectedPaymentBankModel } from '../model/postInternalExpectedPayment';
// @ts-ignore
import { PostInternalExternalBankAccountBankModel } from '../model/postInternalExternalBankAccount';
// @ts-ignore
import { PostInternalExternalWalletBankModel } from '../model/postInternalExternalWallet';
// @ts-ignore
import { PostInternalFeeChargeBankModel } from '../model/postInternalFeeCharge';
// @ts-ignore
import { PostInternalFiatAssetConfigurationBankModel } from '../model/postInternalFiatAssetConfiguration';
// @ts-ignore
import { PostInternalFundingDepositTransferBankModel } from '../model/postInternalFundingDepositTransfer';
// @ts-ignore
import { PostInternalInternalBankAccountBankModel } from '../model/postInternalInternalBankAccount';
// @ts-ignore
import { PostInternalInternalBankAccountConfigurationBankModel } from '../model/postInternalInternalBankAccountConfiguration';
// @ts-ignore
import { PostInternalInternalWalletBankModel } from '../model/postInternalInternalWallet';
// @ts-ignore
import { PostInternalInternalWalletConfigurationBankModel } from '../model/postInternalInternalWalletConfiguration';
// @ts-ignore
import { PostInternalPayoutSymbolConfigurationBankModel } from '../model/postInternalPayoutSymbolConfiguration';
// @ts-ignore
import { PostInternalReconciliationBankModel } from '../model/postInternalReconciliation';
// @ts-ignore
import { PostInternalStageBankModel } from '../model/postInternalStage';
// @ts-ignore
import { PostInternalTradeBankModel } from '../model/postInternalTrade';
// @ts-ignore
import { PostInternalTradingSymbolConfigurationBankModel } from '../model/postInternalTradingSymbolConfiguration';
// @ts-ignore
import { PostInternalTransactionMonitorBankModel } from '../model/postInternalTransactionMonitor';
// @ts-ignore
import { PostInternalTransferBankModel } from '../model/postInternalTransfer';
// @ts-ignore
import { PostInternalTransferRailConfigurationBankModel } from '../model/postInternalTransferRailConfiguration';
// @ts-ignore
import { PostInternalTransferScreeningBankModel } from '../model/postInternalTransferScreening';
// @ts-ignore
import { PostInternalWalletServiceBankModel } from '../model/postInternalWalletService';
// @ts-ignore
import { PostSignalInternalExternalWalletScreeningBankModel } from '../model/postSignalInternalExternalWalletScreening';
// @ts-ignore
import { PostSignalInternalIdentityVerificationBankModel } from '../model/postSignalInternalIdentityVerification';
// @ts-ignore
import { TradeListBankModel } from '../model/tradeList';
// @ts-ignore
import { TransferBankModel } from '../model/transfer';
// @ts-ignore
import { WorkflowBankModel } from '../model/workflow';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class InternalService {

    protected basePath = 'http://api-platform-bank.local.cybrid.com:3002';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Claim Exchange Settlement Payment Order
     * Claim an Exchange Settlement Payment Order.  Required scope: **internal:exchange_settlements:write**
     * @param guid Identifier for the exchange settlement expected payment.
     * @param postInternalClaimExchangeSettlementPaymentOrderBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalClaimExchangeSettlementPaymentOrder(guid: string, postInternalClaimExchangeSettlementPaymentOrderBankModel: PostInternalClaimExchangeSettlementPaymentOrderBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementPaymentOrderBankModel>;
    public internalClaimExchangeSettlementPaymentOrder(guid: string, postInternalClaimExchangeSettlementPaymentOrderBankModel: PostInternalClaimExchangeSettlementPaymentOrderBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalClaimExchangeSettlementPaymentOrder(guid: string, postInternalClaimExchangeSettlementPaymentOrderBankModel: PostInternalClaimExchangeSettlementPaymentOrderBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalClaimExchangeSettlementPaymentOrder(guid: string, postInternalClaimExchangeSettlementPaymentOrderBankModel: PostInternalClaimExchangeSettlementPaymentOrderBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalClaimExchangeSettlementPaymentOrder.');
        }
        if (postInternalClaimExchangeSettlementPaymentOrderBankModel === null || postInternalClaimExchangeSettlementPaymentOrderBankModel === undefined) {
            throw new Error('Required parameter postInternalClaimExchangeSettlementPaymentOrderBankModel was null or undefined when calling internalClaimExchangeSettlementPaymentOrder.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeSettlementPaymentOrderBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_payment_orders/${encodeURIComponent(String(guid))}/claim`,
            postInternalClaimExchangeSettlementPaymentOrderBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Claim Expected Payment
     * Claim an Expected Payments.  Required scope: **internal:exchange_settlements:write**
     * @param guid Identifier for the expected payment.
     * @param postInternalClaimExpectedPaymentBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalClaimExpectedPayment(guid: string, postInternalClaimExpectedPaymentBankModel: PostInternalClaimExpectedPaymentBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExpectedPaymentBankModel>;
    public internalClaimExpectedPayment(guid: string, postInternalClaimExpectedPaymentBankModel: PostInternalClaimExpectedPaymentBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExpectedPaymentBankModel>>;
    public internalClaimExpectedPayment(guid: string, postInternalClaimExpectedPaymentBankModel: PostInternalClaimExpectedPaymentBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExpectedPaymentBankModel>>;
    public internalClaimExpectedPayment(guid: string, postInternalClaimExpectedPaymentBankModel: PostInternalClaimExpectedPaymentBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalClaimExpectedPayment.');
        }
        if (postInternalClaimExpectedPaymentBankModel === null || postInternalClaimExpectedPaymentBankModel === undefined) {
            throw new Error('Required parameter postInternalClaimExpectedPaymentBankModel was null or undefined when calling internalClaimExpectedPayment.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExpectedPaymentBankModel>(`${this.configuration.basePath}/api/internal/expected_payments/${encodeURIComponent(String(guid))}/claim`,
            postInternalClaimExpectedPaymentBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Account
     * Creates an account.  Required scope: **internal:accounts:execute**
     * @param internalPostAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateAccount(internalPostAccountBankModel: InternalPostAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<AccountBankModel>;
    public internalCreateAccount(internalPostAccountBankModel: InternalPostAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<AccountBankModel>>;
    public internalCreateAccount(internalPostAccountBankModel: InternalPostAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<AccountBankModel>>;
    public internalCreateAccount(internalPostAccountBankModel: InternalPostAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalPostAccountBankModel === null || internalPostAccountBankModel === undefined) {
            throw new Error('Required parameter internalPostAccountBankModel was null or undefined when calling internalCreateAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<AccountBankModel>(`${this.configuration.basePath}/api/internal/accounts`,
            internalPostAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ActivityLimitConfiguration
     * Creates a transfer rail configuration.  Required scope: **internal:banks:write**
     * @param postInternalActivityLimitConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateActivityLimitConfiguration(postInternalActivityLimitConfigurationBankModel: PostInternalActivityLimitConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalActivityLimitConfigurationBankModel>;
    public internalCreateActivityLimitConfiguration(postInternalActivityLimitConfigurationBankModel: PostInternalActivityLimitConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalActivityLimitConfigurationBankModel>>;
    public internalCreateActivityLimitConfiguration(postInternalActivityLimitConfigurationBankModel: PostInternalActivityLimitConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalActivityLimitConfigurationBankModel>>;
    public internalCreateActivityLimitConfiguration(postInternalActivityLimitConfigurationBankModel: PostInternalActivityLimitConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalActivityLimitConfigurationBankModel === null || postInternalActivityLimitConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalActivityLimitConfigurationBankModel was null or undefined when calling internalCreateActivityLimitConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalActivityLimitConfigurationBankModel>(`${this.configuration.basePath}/api/internal/activity_limit_configurations`,
            postInternalActivityLimitConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Activity Report
     * Create an Activity Report.  Required scope: **internal:reports:execute**
     * @param postInternalActivityReportBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateActivityReport(postInternalActivityReportBankModel: PostInternalActivityReportBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalActivityReportBankModel>;
    public internalCreateActivityReport(postInternalActivityReportBankModel: PostInternalActivityReportBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalActivityReportBankModel>>;
    public internalCreateActivityReport(postInternalActivityReportBankModel: PostInternalActivityReportBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalActivityReportBankModel>>;
    public internalCreateActivityReport(postInternalActivityReportBankModel: PostInternalActivityReportBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalActivityReportBankModel === null || postInternalActivityReportBankModel === undefined) {
            throw new Error('Required parameter postInternalActivityReportBankModel was null or undefined when calling internalCreateActivityReport.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalActivityReportBankModel>(`${this.configuration.basePath}/api/internal/activity_reports`,
            postInternalActivityReportBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Bank
     * Create a bank.  Required scope: **internal:banks:execute**
     * @param postInternalBankBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateBank(postInternalBankBankModel: PostInternalBankBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankBankModel>;
    public internalCreateBank(postInternalBankBankModel: PostInternalBankBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankBankModel>>;
    public internalCreateBank(postInternalBankBankModel: PostInternalBankBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankBankModel>>;
    public internalCreateBank(postInternalBankBankModel: PostInternalBankBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalBankBankModel === null || postInternalBankBankModel === undefined) {
            throw new Error('Required parameter postInternalBankBankModel was null or undefined when calling internalCreateBank.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalBankBankModel>(`${this.configuration.basePath}/api/internal/banks`,
            postInternalBankBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create BankAccountService
     * Create an BankAccountService.  Required scope: **internal:bank_account_services:execute**
     * @param postInternalBankAccountServiceBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateBankAccountService(postInternalBankAccountServiceBankModel: PostInternalBankAccountServiceBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankAccountServiceBankModel>;
    public internalCreateBankAccountService(postInternalBankAccountServiceBankModel: PostInternalBankAccountServiceBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankAccountServiceBankModel>>;
    public internalCreateBankAccountService(postInternalBankAccountServiceBankModel: PostInternalBankAccountServiceBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankAccountServiceBankModel>>;
    public internalCreateBankAccountService(postInternalBankAccountServiceBankModel: PostInternalBankAccountServiceBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalBankAccountServiceBankModel === null || postInternalBankAccountServiceBankModel === undefined) {
            throw new Error('Required parameter postInternalBankAccountServiceBankModel was null or undefined when calling internalCreateBankAccountService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalBankAccountServiceBankModel>(`${this.configuration.basePath}/api/internal/bank_account_services`,
            postInternalBankAccountServiceBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Compliance Decision
     * Create an Compliance Decision.  Required scope: **internal:customers:write**
     * @param postInternalComplianceDecisionBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateComplianceDecision(postInternalComplianceDecisionBankModel: PostInternalComplianceDecisionBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalComplianceDecisionBankModel>;
    public internalCreateComplianceDecision(postInternalComplianceDecisionBankModel: PostInternalComplianceDecisionBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalComplianceDecisionBankModel>>;
    public internalCreateComplianceDecision(postInternalComplianceDecisionBankModel: PostInternalComplianceDecisionBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalComplianceDecisionBankModel>>;
    public internalCreateComplianceDecision(postInternalComplianceDecisionBankModel: PostInternalComplianceDecisionBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalComplianceDecisionBankModel === null || postInternalComplianceDecisionBankModel === undefined) {
            throw new Error('Required parameter postInternalComplianceDecisionBankModel was null or undefined when calling internalCreateComplianceDecision.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalComplianceDecisionBankModel>(`${this.configuration.basePath}/api/internal/compliance_decisions`,
            postInternalComplianceDecisionBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create CountryCodeConfiguration
     * Creates a country code configuration.  Required scope: **internal:banks:write**
     * @param postInternalCountryCodeConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateCountryCodeConfiguration(postInternalCountryCodeConfigurationBankModel: PostInternalCountryCodeConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCountryCodeConfigurationBankModel>;
    public internalCreateCountryCodeConfiguration(postInternalCountryCodeConfigurationBankModel: PostInternalCountryCodeConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCountryCodeConfigurationBankModel>>;
    public internalCreateCountryCodeConfiguration(postInternalCountryCodeConfigurationBankModel: PostInternalCountryCodeConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCountryCodeConfigurationBankModel>>;
    public internalCreateCountryCodeConfiguration(postInternalCountryCodeConfigurationBankModel: PostInternalCountryCodeConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalCountryCodeConfigurationBankModel === null || postInternalCountryCodeConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalCountryCodeConfigurationBankModel was null or undefined when calling internalCreateCountryCodeConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCountryCodeConfigurationBankModel>(`${this.configuration.basePath}/api/internal/country_code_configurations`,
            postInternalCountryCodeConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create CryptoAssetConfiguration
     * Creates a crypto asset configuration.  Required scope: **internal:banks:write**
     * @param postInternalCryptoAssetConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateCryptoAssetConfiguration(postInternalCryptoAssetConfigurationBankModel: PostInternalCryptoAssetConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCryptoAssetConfigurationBankModel>;
    public internalCreateCryptoAssetConfiguration(postInternalCryptoAssetConfigurationBankModel: PostInternalCryptoAssetConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCryptoAssetConfigurationBankModel>>;
    public internalCreateCryptoAssetConfiguration(postInternalCryptoAssetConfigurationBankModel: PostInternalCryptoAssetConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCryptoAssetConfigurationBankModel>>;
    public internalCreateCryptoAssetConfiguration(postInternalCryptoAssetConfigurationBankModel: PostInternalCryptoAssetConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalCryptoAssetConfigurationBankModel === null || postInternalCryptoAssetConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalCryptoAssetConfigurationBankModel was null or undefined when calling internalCreateCryptoAssetConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCryptoAssetConfigurationBankModel>(`${this.configuration.basePath}/api/internal/crypto_asset_configurations`,
            postInternalCryptoAssetConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create CybridAccount
     * Create a CybridAccount.  Required scope: **internal:cybrid_accounts:execute**
     * @param postInternalCybridAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateCybridAccount(postInternalCybridAccountBankModel: PostInternalCybridAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCybridAccountBankModel>;
    public internalCreateCybridAccount(postInternalCybridAccountBankModel: PostInternalCybridAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCybridAccountBankModel>>;
    public internalCreateCybridAccount(postInternalCybridAccountBankModel: PostInternalCybridAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCybridAccountBankModel>>;
    public internalCreateCybridAccount(postInternalCybridAccountBankModel: PostInternalCybridAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalCybridAccountBankModel === null || postInternalCybridAccountBankModel === undefined) {
            throw new Error('Required parameter postInternalCybridAccountBankModel was null or undefined when calling internalCreateCybridAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCybridAccountBankModel>(`${this.configuration.basePath}/api/internal/cybrid_accounts`,
            postInternalCybridAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create CybridGasAccountConfiguration
     * Creates a cybrid gas account configuration.  Required scope: **internal:accounts:write**
     * @param postInternalCybridGasAccountConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateCybridGasAccountConfiguration(postInternalCybridGasAccountConfigurationBankModel: PostInternalCybridGasAccountConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCybridGasAccountConfigurationBankModel>;
    public internalCreateCybridGasAccountConfiguration(postInternalCybridGasAccountConfigurationBankModel: PostInternalCybridGasAccountConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCybridGasAccountConfigurationBankModel>>;
    public internalCreateCybridGasAccountConfiguration(postInternalCybridGasAccountConfigurationBankModel: PostInternalCybridGasAccountConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCybridGasAccountConfigurationBankModel>>;
    public internalCreateCybridGasAccountConfiguration(postInternalCybridGasAccountConfigurationBankModel: PostInternalCybridGasAccountConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalCybridGasAccountConfigurationBankModel === null || postInternalCybridGasAccountConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalCybridGasAccountConfigurationBankModel was null or undefined when calling internalCreateCybridGasAccountConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCybridGasAccountConfigurationBankModel>(`${this.configuration.basePath}/api/internal/cybrid_gas_account_configurations`,
            postInternalCybridGasAccountConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Deposit Bank Account
     * Creates a deposit bank account.  Required scope: **internal:deposit_bank_accounts:execute**
     * @param internalPostDepositBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateDepositBankAccount(internalPostDepositBankAccountBankModel: InternalPostDepositBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<DepositBankAccountBankModel>;
    public internalCreateDepositBankAccount(internalPostDepositBankAccountBankModel: InternalPostDepositBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<DepositBankAccountBankModel>>;
    public internalCreateDepositBankAccount(internalPostDepositBankAccountBankModel: InternalPostDepositBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<DepositBankAccountBankModel>>;
    public internalCreateDepositBankAccount(internalPostDepositBankAccountBankModel: InternalPostDepositBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalPostDepositBankAccountBankModel === null || internalPostDepositBankAccountBankModel === undefined) {
            throw new Error('Required parameter internalPostDepositBankAccountBankModel was null or undefined when calling internalCreateDepositBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<DepositBankAccountBankModel>(`${this.configuration.basePath}/api/internal/deposit_bank_accounts`,
            internalPostDepositBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Exchange
     * Create an Exchanges.  Required scope: **internal:exchanges:execute**
     * @param postInternalExchangeBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchange(postInternalExchangeBankModel: PostInternalExchangeBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeBankModel>;
    public internalCreateExchange(postInternalExchangeBankModel: PostInternalExchangeBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeBankModel>>;
    public internalCreateExchange(postInternalExchangeBankModel: PostInternalExchangeBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeBankModel>>;
    public internalCreateExchange(postInternalExchangeBankModel: PostInternalExchangeBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeBankModel === null || postInternalExchangeBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeBankModel was null or undefined when calling internalCreateExchange.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeBankModel>(`${this.configuration.basePath}/api/internal/exchanges`,
            postInternalExchangeBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExchangeAccount
     * Create an ExchangeAccount.  Required scope: **internal:exchange_accounts:execute**
     * @param postInternalExchangeAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeAccount(postInternalExchangeAccountBankModel: PostInternalExchangeAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeAccountBankModel>;
    public internalCreateExchangeAccount(postInternalExchangeAccountBankModel: PostInternalExchangeAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeAccountBankModel>>;
    public internalCreateExchangeAccount(postInternalExchangeAccountBankModel: PostInternalExchangeAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeAccountBankModel>>;
    public internalCreateExchangeAccount(postInternalExchangeAccountBankModel: PostInternalExchangeAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeAccountBankModel === null || postInternalExchangeAccountBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeAccountBankModel was null or undefined when calling internalCreateExchangeAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeAccountBankModel>(`${this.configuration.basePath}/api/internal/exchange_accounts`,
            postInternalExchangeAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExchangeMonitor
     * Creates a ExchangeMonitor.Required scope: **internal:exchange_monitors:execute**
     * @param postInternalExchangeMonitorBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeMonitor(postInternalExchangeMonitorBankModel: PostInternalExchangeMonitorBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeMonitorBankModel>;
    public internalCreateExchangeMonitor(postInternalExchangeMonitorBankModel: PostInternalExchangeMonitorBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeMonitorBankModel>>;
    public internalCreateExchangeMonitor(postInternalExchangeMonitorBankModel: PostInternalExchangeMonitorBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeMonitorBankModel>>;
    public internalCreateExchangeMonitor(postInternalExchangeMonitorBankModel: PostInternalExchangeMonitorBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeMonitorBankModel === null || postInternalExchangeMonitorBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeMonitorBankModel was null or undefined when calling internalCreateExchangeMonitor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeMonitorBankModel>(`${this.configuration.basePath}/api/internal/exchange_monitors`,
            postInternalExchangeMonitorBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExchangeOrder
     * Creates a ExchangeOrder.Required scope: **internal:exchange_orders:execute**
     * @param postInternalExchangeOrderBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeOrder(postInternalExchangeOrderBankModel: PostInternalExchangeOrderBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeOrderBankModel>;
    public internalCreateExchangeOrder(postInternalExchangeOrderBankModel: PostInternalExchangeOrderBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeOrderBankModel>>;
    public internalCreateExchangeOrder(postInternalExchangeOrderBankModel: PostInternalExchangeOrderBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeOrderBankModel>>;
    public internalCreateExchangeOrder(postInternalExchangeOrderBankModel: PostInternalExchangeOrderBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeOrderBankModel === null || postInternalExchangeOrderBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeOrderBankModel was null or undefined when calling internalCreateExchangeOrder.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeOrderBankModel>(`${this.configuration.basePath}/api/internal/exchange_orders`,
            postInternalExchangeOrderBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Exchange Settlement
     * Create an Exchange Settlements.  Required scope: **internal:exchange_settlements:execute**
     * @param postInternalExchangeSettlementBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeSettlement(postInternalExchangeSettlementBankModel: PostInternalExchangeSettlementBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementBankModel>;
    public internalCreateExchangeSettlement(postInternalExchangeSettlementBankModel: PostInternalExchangeSettlementBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementBankModel>>;
    public internalCreateExchangeSettlement(postInternalExchangeSettlementBankModel: PostInternalExchangeSettlementBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementBankModel>>;
    public internalCreateExchangeSettlement(postInternalExchangeSettlementBankModel: PostInternalExchangeSettlementBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeSettlementBankModel === null || postInternalExchangeSettlementBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeSettlementBankModel was null or undefined when calling internalCreateExchangeSettlement.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeSettlementBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlements`,
            postInternalExchangeSettlementBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Exchange Settlement Approval
     * Queue an Exchange Settlement Approval.  Required scope: **internal:exchange_settlements:write**
     * @param guid Identifier for the exchange settlement.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeSettlementApproval(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>;
    public internalCreateExchangeSettlementApproval(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalCreateExchangeSettlementApproval(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalCreateExchangeSettlementApproval(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalCreateExchangeSettlementApproval.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCreateExchangeSettlementApproval202ResponseBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlements/${encodeURIComponent(String(guid))}/approval`,
            null,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Exchange Settlement Completion
     * Queue an Exchange Settlement Completion.  Required scope: **internal:exchange_settlements:write**
     * @param guid Identifier for the exchange settlement.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeSettlementCompletion(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>;
    public internalCreateExchangeSettlementCompletion(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalCreateExchangeSettlementCompletion(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalCreateExchangeSettlementCompletion(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalCreateExchangeSettlementCompletion.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCreateExchangeSettlementApproval202ResponseBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlements/${encodeURIComponent(String(guid))}/completion`,
            null,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExchangeSettlementConfiguration
     * Creates a configuration.  Required scope: **internal:exchanges:execute**
     * @param postInternalExchangeSettlementConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeSettlementConfiguration(postInternalExchangeSettlementConfigurationBankModel: PostInternalExchangeSettlementConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementConfigurationBankModel>;
    public internalCreateExchangeSettlementConfiguration(postInternalExchangeSettlementConfigurationBankModel: PostInternalExchangeSettlementConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementConfigurationBankModel>>;
    public internalCreateExchangeSettlementConfiguration(postInternalExchangeSettlementConfigurationBankModel: PostInternalExchangeSettlementConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementConfigurationBankModel>>;
    public internalCreateExchangeSettlementConfiguration(postInternalExchangeSettlementConfigurationBankModel: PostInternalExchangeSettlementConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeSettlementConfigurationBankModel === null || postInternalExchangeSettlementConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeSettlementConfigurationBankModel was null or undefined when calling internalCreateExchangeSettlementConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeSettlementConfigurationBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_configurations`,
            postInternalExchangeSettlementConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Exchange Settlement Payment Order
     * Create an Exchange Settlement Payment Orders.  Required scope: **internal:exchange_settlements:execute**
     * @param postInternalExchangeSettlementPaymentOrderBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExchangeSettlementPaymentOrder(postInternalExchangeSettlementPaymentOrderBankModel: PostInternalExchangeSettlementPaymentOrderBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementPaymentOrderBankModel>;
    public internalCreateExchangeSettlementPaymentOrder(postInternalExchangeSettlementPaymentOrderBankModel: PostInternalExchangeSettlementPaymentOrderBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalCreateExchangeSettlementPaymentOrder(postInternalExchangeSettlementPaymentOrderBankModel: PostInternalExchangeSettlementPaymentOrderBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalCreateExchangeSettlementPaymentOrder(postInternalExchangeSettlementPaymentOrderBankModel: PostInternalExchangeSettlementPaymentOrderBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExchangeSettlementPaymentOrderBankModel === null || postInternalExchangeSettlementPaymentOrderBankModel === undefined) {
            throw new Error('Required parameter postInternalExchangeSettlementPaymentOrderBankModel was null or undefined when calling internalCreateExchangeSettlementPaymentOrder.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExchangeSettlementPaymentOrderBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_payment_orders`,
            postInternalExchangeSettlementPaymentOrderBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Expected Payment
     * Create an Expected Payments.  Required scope: **internal:exchange_settlements:execute**
     * @param postInternalExpectedPaymentBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExpectedPayment(postInternalExpectedPaymentBankModel: PostInternalExpectedPaymentBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExpectedPaymentBankModel>;
    public internalCreateExpectedPayment(postInternalExpectedPaymentBankModel: PostInternalExpectedPaymentBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExpectedPaymentBankModel>>;
    public internalCreateExpectedPayment(postInternalExpectedPaymentBankModel: PostInternalExpectedPaymentBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExpectedPaymentBankModel>>;
    public internalCreateExpectedPayment(postInternalExpectedPaymentBankModel: PostInternalExpectedPaymentBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExpectedPaymentBankModel === null || postInternalExpectedPaymentBankModel === undefined) {
            throw new Error('Required parameter postInternalExpectedPaymentBankModel was null or undefined when calling internalCreateExpectedPayment.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExpectedPaymentBankModel>(`${this.configuration.basePath}/api/internal/expected_payments`,
            postInternalExpectedPaymentBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExternalBankAccount
     * Create an ExternalBankAccount.  Required scope: **internal:accounts:execute**
     * @param postInternalExternalBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExternalBankAccount(postInternalExternalBankAccountBankModel: PostInternalExternalBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalBankAccountBankModel>;
    public internalCreateExternalBankAccount(postInternalExternalBankAccountBankModel: PostInternalExternalBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalBankAccountBankModel>>;
    public internalCreateExternalBankAccount(postInternalExternalBankAccountBankModel: PostInternalExternalBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalBankAccountBankModel>>;
    public internalCreateExternalBankAccount(postInternalExternalBankAccountBankModel: PostInternalExternalBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExternalBankAccountBankModel === null || postInternalExternalBankAccountBankModel === undefined) {
            throw new Error('Required parameter postInternalExternalBankAccountBankModel was null or undefined when calling internalCreateExternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/external_bank_accounts`,
            postInternalExternalBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create ExternalWallet
     * Create an ExternalWallet.  Required scope: **internal:accounts:execute**
     * @param postInternalExternalWalletBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateExternalWallet(postInternalExternalWalletBankModel: PostInternalExternalWalletBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletBankModel>;
    public internalCreateExternalWallet(postInternalExternalWalletBankModel: PostInternalExternalWalletBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletBankModel>>;
    public internalCreateExternalWallet(postInternalExternalWalletBankModel: PostInternalExternalWalletBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletBankModel>>;
    public internalCreateExternalWallet(postInternalExternalWalletBankModel: PostInternalExternalWalletBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalExternalWalletBankModel === null || postInternalExternalWalletBankModel === undefined) {
            throw new Error('Required parameter postInternalExternalWalletBankModel was null or undefined when calling internalCreateExternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExternalWalletBankModel>(`${this.configuration.basePath}/api/internal/external_wallets`,
            postInternalExternalWalletBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Fee
     * Creates a Fee.Required scope: **internal:fees:execute**
     * @param postInternalFeeChargeBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateFee(postInternalFeeChargeBankModel: PostInternalFeeChargeBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFeeChargeBankModel>;
    public internalCreateFee(postInternalFeeChargeBankModel: PostInternalFeeChargeBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFeeChargeBankModel>>;
    public internalCreateFee(postInternalFeeChargeBankModel: PostInternalFeeChargeBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFeeChargeBankModel>>;
    public internalCreateFee(postInternalFeeChargeBankModel: PostInternalFeeChargeBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalFeeChargeBankModel === null || postInternalFeeChargeBankModel === undefined) {
            throw new Error('Required parameter postInternalFeeChargeBankModel was null or undefined when calling internalCreateFee.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalFeeChargeBankModel>(`${this.configuration.basePath}/api/internal/fees`,
            postInternalFeeChargeBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create FeeConfiguration
     * Creates a fee configuration.  Required scope: **internal:banks:write**
     * @param internalPostFeeConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateFeeConfiguration(internalPostFeeConfigurationBankModel: InternalPostFeeConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFeeConfigurationBankModel>;
    public internalCreateFeeConfiguration(internalPostFeeConfigurationBankModel: InternalPostFeeConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFeeConfigurationBankModel>>;
    public internalCreateFeeConfiguration(internalPostFeeConfigurationBankModel: InternalPostFeeConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFeeConfigurationBankModel>>;
    public internalCreateFeeConfiguration(internalPostFeeConfigurationBankModel: InternalPostFeeConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalPostFeeConfigurationBankModel === null || internalPostFeeConfigurationBankModel === undefined) {
            throw new Error('Required parameter internalPostFeeConfigurationBankModel was null or undefined when calling internalCreateFeeConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalFeeConfigurationBankModel>(`${this.configuration.basePath}/api/internal/fee_configurations`,
            internalPostFeeConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create FiatAssetConfiguration
     * Creates a fiat asset configuration.  Required scope: **internal:banks:write**
     * @param postInternalFiatAssetConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateFiatAssetConfiguration(postInternalFiatAssetConfigurationBankModel: PostInternalFiatAssetConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFiatAssetConfigurationBankModel>;
    public internalCreateFiatAssetConfiguration(postInternalFiatAssetConfigurationBankModel: PostInternalFiatAssetConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFiatAssetConfigurationBankModel>>;
    public internalCreateFiatAssetConfiguration(postInternalFiatAssetConfigurationBankModel: PostInternalFiatAssetConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFiatAssetConfigurationBankModel>>;
    public internalCreateFiatAssetConfiguration(postInternalFiatAssetConfigurationBankModel: PostInternalFiatAssetConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalFiatAssetConfigurationBankModel === null || postInternalFiatAssetConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalFiatAssetConfigurationBankModel was null or undefined when calling internalCreateFiatAssetConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalFiatAssetConfigurationBankModel>(`${this.configuration.basePath}/api/internal/fiat_asset_configurations`,
            postInternalFiatAssetConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create File
     * Creates a file.  Required scope: **internal:files:execute**
     * @param postFileBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateFile(postFileBankModel: PostFileBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<PlatformFileBankModel>;
    public internalCreateFile(postFileBankModel: PostFileBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<PlatformFileBankModel>>;
    public internalCreateFile(postFileBankModel: PostFileBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<PlatformFileBankModel>>;
    public internalCreateFile(postFileBankModel: PostFileBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postFileBankModel === null || postFileBankModel === undefined) {
            throw new Error('Required parameter postFileBankModel was null or undefined when calling internalCreateFile.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<PlatformFileBankModel>(`${this.configuration.basePath}/api/internal/files`,
            postFileBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create InternalBankAccount
     * Create an InternalBankAccount.  Required scope: **internal:accounts:execute**
     * @param postInternalInternalBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateInternalBankAccount(postInternalInternalBankAccountBankModel: PostInternalInternalBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalBankAccountBankModel>;
    public internalCreateInternalBankAccount(postInternalInternalBankAccountBankModel: PostInternalInternalBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalBankAccountBankModel>>;
    public internalCreateInternalBankAccount(postInternalInternalBankAccountBankModel: PostInternalInternalBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalBankAccountBankModel>>;
    public internalCreateInternalBankAccount(postInternalInternalBankAccountBankModel: PostInternalInternalBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalInternalBankAccountBankModel === null || postInternalInternalBankAccountBankModel === undefined) {
            throw new Error('Required parameter postInternalInternalBankAccountBankModel was null or undefined when calling internalCreateInternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalInternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/internal_bank_accounts`,
            postInternalInternalBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create InternalBankAccountConfiguration
     * Creates an internal bank account configuration.  Required scope: **internal:banks:write**
     * @param postInternalInternalBankAccountConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateInternalBankAccountConfiguration(postInternalInternalBankAccountConfigurationBankModel: PostInternalInternalBankAccountConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalBankAccountConfigurationBankModel>;
    public internalCreateInternalBankAccountConfiguration(postInternalInternalBankAccountConfigurationBankModel: PostInternalInternalBankAccountConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalBankAccountConfigurationBankModel>>;
    public internalCreateInternalBankAccountConfiguration(postInternalInternalBankAccountConfigurationBankModel: PostInternalInternalBankAccountConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalBankAccountConfigurationBankModel>>;
    public internalCreateInternalBankAccountConfiguration(postInternalInternalBankAccountConfigurationBankModel: PostInternalInternalBankAccountConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalInternalBankAccountConfigurationBankModel === null || postInternalInternalBankAccountConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalInternalBankAccountConfigurationBankModel was null or undefined when calling internalCreateInternalBankAccountConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalInternalBankAccountConfigurationBankModel>(`${this.configuration.basePath}/api/internal/internal_bank_account_configurations`,
            postInternalInternalBankAccountConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create InternalWallet
     * Create an InternalWallet.  Required scope: **internal:accounts:execute**
     * @param postInternalInternalWalletBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateInternalWallet(postInternalInternalWalletBankModel: PostInternalInternalWalletBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletBankModel>;
    public internalCreateInternalWallet(postInternalInternalWalletBankModel: PostInternalInternalWalletBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletBankModel>>;
    public internalCreateInternalWallet(postInternalInternalWalletBankModel: PostInternalInternalWalletBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletBankModel>>;
    public internalCreateInternalWallet(postInternalInternalWalletBankModel: PostInternalInternalWalletBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalInternalWalletBankModel === null || postInternalInternalWalletBankModel === undefined) {
            throw new Error('Required parameter postInternalInternalWalletBankModel was null or undefined when calling internalCreateInternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalInternalWalletBankModel>(`${this.configuration.basePath}/api/internal/internal_wallets`,
            postInternalInternalWalletBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create InternalWalletConfiguration
     * Creates an internal wallet configuration.  Required scope: **internal:banks:write**
     * @param postInternalInternalWalletConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateInternalWalletConfiguration(postInternalInternalWalletConfigurationBankModel: PostInternalInternalWalletConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletConfigurationBankModel>;
    public internalCreateInternalWalletConfiguration(postInternalInternalWalletConfigurationBankModel: PostInternalInternalWalletConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletConfigurationBankModel>>;
    public internalCreateInternalWalletConfiguration(postInternalInternalWalletConfigurationBankModel: PostInternalInternalWalletConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletConfigurationBankModel>>;
    public internalCreateInternalWalletConfiguration(postInternalInternalWalletConfigurationBankModel: PostInternalInternalWalletConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalInternalWalletConfigurationBankModel === null || postInternalInternalWalletConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalInternalWalletConfigurationBankModel was null or undefined when calling internalCreateInternalWalletConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalInternalWalletConfigurationBankModel>(`${this.configuration.basePath}/api/internal/internal_wallet_configurations`,
            postInternalInternalWalletConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create PayoutSymbolConfiguration
     * Creates a payout symbol configuration.  Required scope: **internal:banks:write**
     * @param postInternalPayoutSymbolConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreatePayoutSymbolConfiguration(postInternalPayoutSymbolConfigurationBankModel: PostInternalPayoutSymbolConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalPayoutSymbolConfigurationBankModel>;
    public internalCreatePayoutSymbolConfiguration(postInternalPayoutSymbolConfigurationBankModel: PostInternalPayoutSymbolConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalPayoutSymbolConfigurationBankModel>>;
    public internalCreatePayoutSymbolConfiguration(postInternalPayoutSymbolConfigurationBankModel: PostInternalPayoutSymbolConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalPayoutSymbolConfigurationBankModel>>;
    public internalCreatePayoutSymbolConfiguration(postInternalPayoutSymbolConfigurationBankModel: PostInternalPayoutSymbolConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalPayoutSymbolConfigurationBankModel === null || postInternalPayoutSymbolConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalPayoutSymbolConfigurationBankModel was null or undefined when calling internalCreatePayoutSymbolConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalPayoutSymbolConfigurationBankModel>(`${this.configuration.basePath}/api/internal/payout_symbol_configurations`,
            postInternalPayoutSymbolConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create InternalQuote
     * Creates a quote.  Required scope: **internal:quotes:read**
     * @param internalPostQuoteBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateQuote(internalPostQuoteBankModel: InternalPostQuoteBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalQuoteBankModel>;
    public internalCreateQuote(internalPostQuoteBankModel: InternalPostQuoteBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalQuoteBankModel>>;
    public internalCreateQuote(internalPostQuoteBankModel: InternalPostQuoteBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalQuoteBankModel>>;
    public internalCreateQuote(internalPostQuoteBankModel: InternalPostQuoteBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalPostQuoteBankModel === null || internalPostQuoteBankModel === undefined) {
            throw new Error('Required parameter internalPostQuoteBankModel was null or undefined when calling internalCreateQuote.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalQuoteBankModel>(`${this.configuration.basePath}/api/internal/quotes`,
            internalPostQuoteBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Reconciliation
     * Creates a Reconciliation.Required scope: **internal:transfers:write**
     * @param postInternalReconciliationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateReconciliation(postInternalReconciliationBankModel: PostInternalReconciliationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalReconciliationBankModel>;
    public internalCreateReconciliation(postInternalReconciliationBankModel: PostInternalReconciliationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalReconciliationBankModel>>;
    public internalCreateReconciliation(postInternalReconciliationBankModel: PostInternalReconciliationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalReconciliationBankModel>>;
    public internalCreateReconciliation(postInternalReconciliationBankModel: PostInternalReconciliationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalReconciliationBankModel === null || postInternalReconciliationBankModel === undefined) {
            throw new Error('Required parameter postInternalReconciliationBankModel was null or undefined when calling internalCreateReconciliation.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalReconciliationBankModel>(`${this.configuration.basePath}/api/internal/reconciliations`,
            postInternalReconciliationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Stage
     * Create an Stage.  Required scope: **internal:plans:write**
     * @param postInternalStageBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateStage(postInternalStageBankModel: PostInternalStageBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalStageBankModel>;
    public internalCreateStage(postInternalStageBankModel: PostInternalStageBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalStageBankModel>>;
    public internalCreateStage(postInternalStageBankModel: PostInternalStageBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalStageBankModel>>;
    public internalCreateStage(postInternalStageBankModel: PostInternalStageBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalStageBankModel === null || postInternalStageBankModel === undefined) {
            throw new Error('Required parameter postInternalStageBankModel was null or undefined when calling internalCreateStage.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalStageBankModel>(`${this.configuration.basePath}/api/internal/stages`,
            postInternalStageBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Internal Trade
     * Creates a trade.  Required scope: **internal:trades:execute**
     * @param postInternalTradeBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTrade(postInternalTradeBankModel: PostInternalTradeBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradeBankModel>;
    public internalCreateTrade(postInternalTradeBankModel: PostInternalTradeBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradeBankModel>>;
    public internalCreateTrade(postInternalTradeBankModel: PostInternalTradeBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradeBankModel>>;
    public internalCreateTrade(postInternalTradeBankModel: PostInternalTradeBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTradeBankModel === null || postInternalTradeBankModel === undefined) {
            throw new Error('Required parameter postInternalTradeBankModel was null or undefined when calling internalCreateTrade.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTradeBankModel>(`${this.configuration.basePath}/api/internal/trades`,
            postInternalTradeBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create TradingSymbolConfiguration
     * Creates a trading symbol configuration.  Required scope: **internal:banks:write**
     * @param postInternalTradingSymbolConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTradingSymbolConfiguration(postInternalTradingSymbolConfigurationBankModel: PostInternalTradingSymbolConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradingSymbolConfigurationBankModel>;
    public internalCreateTradingSymbolConfiguration(postInternalTradingSymbolConfigurationBankModel: PostInternalTradingSymbolConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradingSymbolConfigurationBankModel>>;
    public internalCreateTradingSymbolConfiguration(postInternalTradingSymbolConfigurationBankModel: PostInternalTradingSymbolConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradingSymbolConfigurationBankModel>>;
    public internalCreateTradingSymbolConfiguration(postInternalTradingSymbolConfigurationBankModel: PostInternalTradingSymbolConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTradingSymbolConfigurationBankModel === null || postInternalTradingSymbolConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalTradingSymbolConfigurationBankModel was null or undefined when calling internalCreateTradingSymbolConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTradingSymbolConfigurationBankModel>(`${this.configuration.basePath}/api/internal/trading_symbol_configurations`,
            postInternalTradingSymbolConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create TransactionMonitor
     * Creates a TransactionMonitor.Required scope: **internal:transaction_monitors:execute**
     * @param postInternalTransactionMonitorBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTransactionMonitor(postInternalTransactionMonitorBankModel: PostInternalTransactionMonitorBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransactionMonitorBankModel>;
    public internalCreateTransactionMonitor(postInternalTransactionMonitorBankModel: PostInternalTransactionMonitorBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransactionMonitorBankModel>>;
    public internalCreateTransactionMonitor(postInternalTransactionMonitorBankModel: PostInternalTransactionMonitorBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransactionMonitorBankModel>>;
    public internalCreateTransactionMonitor(postInternalTransactionMonitorBankModel: PostInternalTransactionMonitorBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTransactionMonitorBankModel === null || postInternalTransactionMonitorBankModel === undefined) {
            throw new Error('Required parameter postInternalTransactionMonitorBankModel was null or undefined when calling internalCreateTransactionMonitor.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTransactionMonitorBankModel>(`${this.configuration.basePath}/api/internal/transaction_monitors`,
            postInternalTransactionMonitorBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Transfer
     * Create an Transfer.  Required scope: **internal:transfers:execute**
     * @param postInternalTransferBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTransfer(postInternalTransferBankModel: PostInternalTransferBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferBankModel>;
    public internalCreateTransfer(postInternalTransferBankModel: PostInternalTransferBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferBankModel>>;
    public internalCreateTransfer(postInternalTransferBankModel: PostInternalTransferBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferBankModel>>;
    public internalCreateTransfer(postInternalTransferBankModel: PostInternalTransferBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTransferBankModel === null || postInternalTransferBankModel === undefined) {
            throw new Error('Required parameter postInternalTransferBankModel was null or undefined when calling internalCreateTransfer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTransferBankModel>(`${this.configuration.basePath}/api/internal/transfers`,
            postInternalTransferBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create TransferRailConfiguration
     * Creates a transfer rail configuration.  Required scope: **internal:banks:write**
     * @param postInternalTransferRailConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTransferRailConfiguration(postInternalTransferRailConfigurationBankModel: PostInternalTransferRailConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferRailConfigurationBankModel>;
    public internalCreateTransferRailConfiguration(postInternalTransferRailConfigurationBankModel: PostInternalTransferRailConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferRailConfigurationBankModel>>;
    public internalCreateTransferRailConfiguration(postInternalTransferRailConfigurationBankModel: PostInternalTransferRailConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferRailConfigurationBankModel>>;
    public internalCreateTransferRailConfiguration(postInternalTransferRailConfigurationBankModel: PostInternalTransferRailConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTransferRailConfigurationBankModel === null || postInternalTransferRailConfigurationBankModel === undefined) {
            throw new Error('Required parameter postInternalTransferRailConfigurationBankModel was null or undefined when calling internalCreateTransferRailConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTransferRailConfigurationBankModel>(`${this.configuration.basePath}/api/internal/transfer_rail_configurations`,
            postInternalTransferRailConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create TransferScreening
     * Create an TransferScreening.  Required scope: **internal:accounts:execute**
     * @param postInternalTransferScreeningBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateTransferScreening(postInternalTransferScreeningBankModel: PostInternalTransferScreeningBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferScreeningBankModel>;
    public internalCreateTransferScreening(postInternalTransferScreeningBankModel: PostInternalTransferScreeningBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferScreeningBankModel>>;
    public internalCreateTransferScreening(postInternalTransferScreeningBankModel: PostInternalTransferScreeningBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferScreeningBankModel>>;
    public internalCreateTransferScreening(postInternalTransferScreeningBankModel: PostInternalTransferScreeningBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalTransferScreeningBankModel === null || postInternalTransferScreeningBankModel === undefined) {
            throw new Error('Required parameter postInternalTransferScreeningBankModel was null or undefined when calling internalCreateTransferScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalTransferScreeningBankModel>(`${this.configuration.basePath}/api/internal/transfer_screenings`,
            postInternalTransferScreeningBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create WalletService
     * Create an WalletService.  Required scope: **internal:wallet_services:execute**
     * @param postInternalWalletServiceBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCreateWalletService(postInternalWalletServiceBankModel: PostInternalWalletServiceBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalWalletServiceBankModel>;
    public internalCreateWalletService(postInternalWalletServiceBankModel: PostInternalWalletServiceBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalWalletServiceBankModel>>;
    public internalCreateWalletService(postInternalWalletServiceBankModel: PostInternalWalletServiceBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalWalletServiceBankModel>>;
    public internalCreateWalletService(postInternalWalletServiceBankModel: PostInternalWalletServiceBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalWalletServiceBankModel === null || postInternalWalletServiceBankModel === undefined) {
            throw new Error('Required parameter postInternalWalletServiceBankModel was null or undefined when calling internalCreateWalletService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalWalletServiceBankModel>(`${this.configuration.basePath}/api/internal/wallet_services`,
            postInternalWalletServiceBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Crypto Funding Deposit Transfer
     * Create a Crypto Funding Deposit Transfer.  Required scope: **internal:transfers:execute**
     * @param postInternalCryptoFundingDepositTransferBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalCryptoFundingDepositTransfer(postInternalCryptoFundingDepositTransferBankModel: PostInternalCryptoFundingDepositTransferBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCryptoFundingDepositTransferBankModel>;
    public internalCryptoFundingDepositTransfer(postInternalCryptoFundingDepositTransferBankModel: PostInternalCryptoFundingDepositTransferBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCryptoFundingDepositTransferBankModel>>;
    public internalCryptoFundingDepositTransfer(postInternalCryptoFundingDepositTransferBankModel: PostInternalCryptoFundingDepositTransferBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCryptoFundingDepositTransferBankModel>>;
    public internalCryptoFundingDepositTransfer(postInternalCryptoFundingDepositTransferBankModel: PostInternalCryptoFundingDepositTransferBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalCryptoFundingDepositTransferBankModel === null || postInternalCryptoFundingDepositTransferBankModel === undefined) {
            throw new Error('Required parameter postInternalCryptoFundingDepositTransferBankModel was null or undefined when calling internalCryptoFundingDepositTransfer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalCryptoFundingDepositTransferBankModel>(`${this.configuration.basePath}/api/internal/crypto_funding_deposit_transfers`,
            postInternalCryptoFundingDepositTransferBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete ActivityLimitConfiguration
     * Deletes an activity limit configuration.  Required scope: **internal:banks:write**
     * @param guid Identifier for the activity limit configuration.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalDeleteActivityLimitConfiguration(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalActivityLimitConfigurationBankModel>;
    public internalDeleteActivityLimitConfiguration(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalActivityLimitConfigurationBankModel>>;
    public internalDeleteActivityLimitConfiguration(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalActivityLimitConfigurationBankModel>>;
    public internalDeleteActivityLimitConfiguration(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalDeleteActivityLimitConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.delete<InternalActivityLimitConfigurationBankModel>(`${this.configuration.basePath}/api/internal/activity_limit_configurations/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete External Bank Account
     * Deletes an external bank account.  Required scope: **internal:accounts:execute**
     * @param externalBankAccountGuid Identifier for the external bank account.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalDeleteExternalBankAccount(externalBankAccountGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalBankAccountBankModel>;
    public internalDeleteExternalBankAccount(externalBankAccountGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalBankAccountBankModel>>;
    public internalDeleteExternalBankAccount(externalBankAccountGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalBankAccountBankModel>>;
    public internalDeleteExternalBankAccount(externalBankAccountGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalBankAccountGuid === null || externalBankAccountGuid === undefined) {
            throw new Error('Required parameter externalBankAccountGuid was null or undefined when calling internalDeleteExternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.delete<InternalExternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/external_bank_accounts/${encodeURIComponent(String(externalBankAccountGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create Funding Deposit Transfer
     * Create a Funding Deposit Transfer.  Required scope: **internal:transfers:execute**
     * @param postInternalFundingDepositTransferBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalFundingDepositTransfer(postInternalFundingDepositTransferBankModel: PostInternalFundingDepositTransferBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFundingDepositTransferBankModel>;
    public internalFundingDepositTransfer(postInternalFundingDepositTransferBankModel: PostInternalFundingDepositTransferBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFundingDepositTransferBankModel>>;
    public internalFundingDepositTransfer(postInternalFundingDepositTransferBankModel: PostInternalFundingDepositTransferBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFundingDepositTransferBankModel>>;
    public internalFundingDepositTransfer(postInternalFundingDepositTransferBankModel: PostInternalFundingDepositTransferBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postInternalFundingDepositTransferBankModel === null || postInternalFundingDepositTransferBankModel === undefined) {
            throw new Error('Required parameter postInternalFundingDepositTransferBankModel was null or undefined when calling internalFundingDepositTransfer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalFundingDepositTransferBankModel>(`${this.configuration.basePath}/api/internal/funding_deposit_transfers`,
            postInternalFundingDepositTransferBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Bank
     * Retrieves a bank.  Required scope: **internal:banks:read**
     * @param bankGuid Identifier for the bank.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetBank(bankGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankBankModel>;
    public internalGetBank(bankGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankBankModel>>;
    public internalGetBank(bankGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankBankModel>>;
    public internalGetBank(bankGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (bankGuid === null || bankGuid === undefined) {
            throw new Error('Required parameter bankGuid was null or undefined when calling internalGetBank.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalBankBankModel>(`${this.configuration.basePath}/api/internal/banks/${encodeURIComponent(String(bankGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get BankAccountService
     * Retrieves a bank_account service.  Required scope: **internal:bank_account_services:read**
     * @param bankAccountServiceGuid Identifier for the bank_account service.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetBankAccountService(bankAccountServiceGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankAccountServiceBankModel>;
    public internalGetBankAccountService(bankAccountServiceGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankAccountServiceBankModel>>;
    public internalGetBankAccountService(bankAccountServiceGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankAccountServiceBankModel>>;
    public internalGetBankAccountService(bankAccountServiceGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (bankAccountServiceGuid === null || bankAccountServiceGuid === undefined) {
            throw new Error('Required parameter bankAccountServiceGuid was null or undefined when calling internalGetBankAccountService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalBankAccountServiceBankModel>(`${this.configuration.basePath}/api/internal/bank_account_services/${encodeURIComponent(String(bankAccountServiceGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Customer
     * Retrieves a customer.  Required scope: **internal:customers:read**
     * @param customerGuid Identifier for the customer.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetCustomer(customerGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<CustomerBankModel>;
    public internalGetCustomer(customerGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<CustomerBankModel>>;
    public internalGetCustomer(customerGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<CustomerBankModel>>;
    public internalGetCustomer(customerGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (customerGuid === null || customerGuid === undefined) {
            throw new Error('Required parameter customerGuid was null or undefined when calling internalGetCustomer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<CustomerBankModel>(`${this.configuration.basePath}/api/internal/customers/${encodeURIComponent(String(customerGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get CybridAccount
     * Get an CybridAccount.  Required scope: **internal:cybrid_accounts:read**
     * @param accountGuid Identifier for the Cybrid account.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetCybridAccount(accountGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCybridAccountBankModel>;
    public internalGetCybridAccount(accountGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCybridAccountBankModel>>;
    public internalGetCybridAccount(accountGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCybridAccountBankModel>>;
    public internalGetCybridAccount(accountGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (accountGuid === null || accountGuid === undefined) {
            throw new Error('Required parameter accountGuid was null or undefined when calling internalGetCybridAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalCybridAccountBankModel>(`${this.configuration.basePath}/api/internal/cybrid_accounts/${encodeURIComponent(String(accountGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Exchange
     * Get an Exchange.  Required scope: **internal:exchanges:read**
     * @param exchangeGuid Identifier for the exchange.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExchange(exchangeGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeBankModel>;
    public internalGetExchange(exchangeGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeBankModel>>;
    public internalGetExchange(exchangeGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeBankModel>>;
    public internalGetExchange(exchangeGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (exchangeGuid === null || exchangeGuid === undefined) {
            throw new Error('Required parameter exchangeGuid was null or undefined when calling internalGetExchange.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeBankModel>(`${this.configuration.basePath}/api/internal/exchanges/${encodeURIComponent(String(exchangeGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get ExchangeAccount
     * Get an ExchangeAccount.  Required scope: **internal:exchange_accounts:read**
     * @param accountGuid Identifier for the bank.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExchangeAccount(accountGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeAccountBankModel>;
    public internalGetExchangeAccount(accountGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeAccountBankModel>>;
    public internalGetExchangeAccount(accountGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeAccountBankModel>>;
    public internalGetExchangeAccount(accountGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (accountGuid === null || accountGuid === undefined) {
            throw new Error('Required parameter accountGuid was null or undefined when calling internalGetExchangeAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeAccountBankModel>(`${this.configuration.basePath}/api/internal/exchange_accounts/${encodeURIComponent(String(accountGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Exchange Settlement
     * Get an Exchange Settlement.  Required scope: **internal:exchange_settlements:read**
     * @param guid Identifier for the exchange settlement.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExchangeSettlement(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementBankModel>;
    public internalGetExchangeSettlement(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementBankModel>>;
    public internalGetExchangeSettlement(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementBankModel>>;
    public internalGetExchangeSettlement(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetExchangeSettlement.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeSettlementBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlements/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Exchange Settlement Obligation
     * Get an Exchange Settlement Obligation.  Required scope: **internal:exchange_settlements:read**
     * @param guid Identifier for the exchange settlement obligation.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExchangeSettlementObligation(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementObligationBankModel>;
    public internalGetExchangeSettlementObligation(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementObligationBankModel>>;
    public internalGetExchangeSettlementObligation(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementObligationBankModel>>;
    public internalGetExchangeSettlementObligation(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetExchangeSettlementObligation.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeSettlementObligationBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_obligations/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Exchange Settlement Payment Order
     * Get an Exchange Settlement Payment Order.  Required scope: **internal:exchange_settlements:read**
     * @param guid Identifier for the exchange settlement payment order.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExchangeSettlementPaymentOrder(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementPaymentOrderBankModel>;
    public internalGetExchangeSettlementPaymentOrder(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalGetExchangeSettlementPaymentOrder(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementPaymentOrderBankModel>>;
    public internalGetExchangeSettlementPaymentOrder(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetExchangeSettlementPaymentOrder.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeSettlementPaymentOrderBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_payment_orders/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Execution
     * Retrieves a execution.  Required scope: **internal:executions:read**
     * @param executionGuid Identifier for the execution.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExecution(executionGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExecutionBankModel>;
    public internalGetExecution(executionGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExecutionBankModel>>;
    public internalGetExecution(executionGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExecutionBankModel>>;
    public internalGetExecution(executionGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (executionGuid === null || executionGuid === undefined) {
            throw new Error('Required parameter executionGuid was null or undefined when calling internalGetExecution.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExecutionBankModel>(`${this.configuration.basePath}/api/internal/executions/${encodeURIComponent(String(executionGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Expected Payment
     * Get an Expected Payment.  Required scope: **internal:exchange_settlements:read**
     * @param guid Identifier for the expected payment.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExpectedPayment(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExpectedPaymentBankModel>;
    public internalGetExpectedPayment(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExpectedPaymentBankModel>>;
    public internalGetExpectedPayment(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExpectedPaymentBankModel>>;
    public internalGetExpectedPayment(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetExpectedPayment.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExpectedPaymentBankModel>(`${this.configuration.basePath}/api/internal/expected_payments/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get ExternalBankAccount
     * Retrieves an external bank account.  Required scope: **internal:accounts:read**
     * @param externalBankAccountGuid Identifier for the external bank account.
     * @param forceBalanceRefresh Force the balance on the account to be updated.
     * @param includeBalances Include account balances in the response.
     * @param includePii Include account holder\&#39;s PII in the response.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExternalBankAccount(externalBankAccountGuid: string, forceBalanceRefresh?: boolean, includeBalances?: boolean, includePii?: boolean, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalBankAccountBankModel>;
    public internalGetExternalBankAccount(externalBankAccountGuid: string, forceBalanceRefresh?: boolean, includeBalances?: boolean, includePii?: boolean, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalBankAccountBankModel>>;
    public internalGetExternalBankAccount(externalBankAccountGuid: string, forceBalanceRefresh?: boolean, includeBalances?: boolean, includePii?: boolean, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalBankAccountBankModel>>;
    public internalGetExternalBankAccount(externalBankAccountGuid: string, forceBalanceRefresh?: boolean, includeBalances?: boolean, includePii?: boolean, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalBankAccountGuid === null || externalBankAccountGuid === undefined) {
            throw new Error('Required parameter externalBankAccountGuid was null or undefined when calling internalGetExternalBankAccount.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (forceBalanceRefresh !== undefined && forceBalanceRefresh !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>forceBalanceRefresh, 'force_balance_refresh');
        }
        if (includeBalances !== undefined && includeBalances !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>includeBalances, 'include_balances');
        }
        if (includePii !== undefined && includePii !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>includePii, 'include_pii');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/external_bank_accounts/${encodeURIComponent(String(externalBankAccountGuid))}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get ExternalWallet
     * Retrieves an internal wallet.  Required scope: **internal:accounts:read**
     * @param externalWalletGuid Identifier for the internal wallet.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExternalWallet(externalWalletGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletBankModel>;
    public internalGetExternalWallet(externalWalletGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletBankModel>>;
    public internalGetExternalWallet(externalWalletGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletBankModel>>;
    public internalGetExternalWallet(externalWalletGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalWalletGuid === null || externalWalletGuid === undefined) {
            throw new Error('Required parameter externalWalletGuid was null or undefined when calling internalGetExternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExternalWalletBankModel>(`${this.configuration.basePath}/api/internal/external_wallets/${encodeURIComponent(String(externalWalletGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get ExternalWalletScreening
     * Retrieves an external wallet screening.  Required scope: **internal:external_wallet_screenings:read**
     * @param externalWalletScreeningGuid Identifier for the external wallet screening.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetExternalWalletScreening(externalWalletScreeningGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletScreeningBankModel>;
    public internalGetExternalWalletScreening(externalWalletScreeningGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletScreeningBankModel>>;
    public internalGetExternalWalletScreening(externalWalletScreeningGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletScreeningBankModel>>;
    public internalGetExternalWalletScreening(externalWalletScreeningGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalWalletScreeningGuid === null || externalWalletScreeningGuid === undefined) {
            throw new Error('Required parameter externalWalletScreeningGuid was null or undefined when calling internalGetExternalWalletScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExternalWalletScreeningBankModel>(`${this.configuration.basePath}/api/internal/external_wallet_screenings/${encodeURIComponent(String(externalWalletScreeningGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get File
     * Retrieves an file.  Required scope: **internal:files:read**
     * @param fileGuid Identifier for the file.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetFile(fileGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<PlatformFileBankModel>;
    public internalGetFile(fileGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<PlatformFileBankModel>>;
    public internalGetFile(fileGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<PlatformFileBankModel>>;
    public internalGetFile(fileGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (fileGuid === null || fileGuid === undefined) {
            throw new Error('Required parameter fileGuid was null or undefined when calling internalGetFile.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<PlatformFileBankModel>(`${this.configuration.basePath}/api/internal/files/${encodeURIComponent(String(fileGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get InternalBankAccount
     * Retrieves an internal bank account.  Required scope: **internal:accounts:read**
     * @param internalBankAccountGuid Identifier for the internal bank account.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetInternalBankAccount(internalBankAccountGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalBankAccountBankModel>;
    public internalGetInternalBankAccount(internalBankAccountGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalBankAccountBankModel>>;
    public internalGetInternalBankAccount(internalBankAccountGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalBankAccountBankModel>>;
    public internalGetInternalBankAccount(internalBankAccountGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalBankAccountGuid === null || internalBankAccountGuid === undefined) {
            throw new Error('Required parameter internalBankAccountGuid was null or undefined when calling internalGetInternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/internal_bank_accounts/${encodeURIComponent(String(internalBankAccountGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get InternalWallet
     * Retrieves an internal wallet.  Required scope: **internal:accounts:read**
     * @param internalWalletGuid Identifier for the internal wallet.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetInternalWallet(internalWalletGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletBankModel>;
    public internalGetInternalWallet(internalWalletGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletBankModel>>;
    public internalGetInternalWallet(internalWalletGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletBankModel>>;
    public internalGetInternalWallet(internalWalletGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (internalWalletGuid === null || internalWalletGuid === undefined) {
            throw new Error('Required parameter internalWalletGuid was null or undefined when calling internalGetInternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInternalWalletBankModel>(`${this.configuration.basePath}/api/internal/internal_wallets/${encodeURIComponent(String(internalWalletGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Invoice
     * Retrieves an invoice.  Required scope: **internal:invoices:read**
     * @param invoiceGuid Identifier for the invoice.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetInvoice(invoiceGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInvoiceBankModel>;
    public internalGetInvoice(invoiceGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInvoiceBankModel>>;
    public internalGetInvoice(invoiceGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInvoiceBankModel>>;
    public internalGetInvoice(invoiceGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (invoiceGuid === null || invoiceGuid === undefined) {
            throw new Error('Required parameter invoiceGuid was null or undefined when calling internalGetInvoice.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInvoiceBankModel>(`${this.configuration.basePath}/api/internal/invoices/${encodeURIComponent(String(invoiceGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Plan
     * Retrieves a plan.  Required scope: **internal:plans:read**
     * @param planGuid Identifier for the plan.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetPlan(planGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalPlanBankModel>;
    public internalGetPlan(planGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalPlanBankModel>>;
    public internalGetPlan(planGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalPlanBankModel>>;
    public internalGetPlan(planGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (planGuid === null || planGuid === undefined) {
            throw new Error('Required parameter planGuid was null or undefined when calling internalGetPlan.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalPlanBankModel>(`${this.configuration.basePath}/api/internal/plans/${encodeURIComponent(String(planGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Internal Quote
     * Retrieves a quote.  Required scope: **internal:quotes:read**
     * @param quoteGuid Identifier for the quote.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetQuote(quoteGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalQuoteBankModel>;
    public internalGetQuote(quoteGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalQuoteBankModel>>;
    public internalGetQuote(quoteGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalQuoteBankModel>>;
    public internalGetQuote(quoteGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (quoteGuid === null || quoteGuid === undefined) {
            throw new Error('Required parameter quoteGuid was null or undefined when calling internalGetQuote.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalQuoteBankModel>(`${this.configuration.basePath}/api/internal/quotes/${encodeURIComponent(String(quoteGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Reconciliation
     * Retrieves a reconciliation.  Required scope: **internal:transfers:read**
     * @param guid Identifier for the resource.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetReconciliation(guid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalReconciliationBankModel>;
    public internalGetReconciliation(guid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalReconciliationBankModel>>;
    public internalGetReconciliation(guid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalReconciliationBankModel>>;
    public internalGetReconciliation(guid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetReconciliation.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalReconciliationBankModel>(`${this.configuration.basePath}/api/internal/reconciliations/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Internal Trade
     * Retrieves a trade.  Required scope: **internal:trades:read**
     * @param tradeGuid Identifier for the trade.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetTrade(tradeGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradeBankModel>;
    public internalGetTrade(tradeGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradeBankModel>>;
    public internalGetTrade(tradeGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradeBankModel>>;
    public internalGetTrade(tradeGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (tradeGuid === null || tradeGuid === undefined) {
            throw new Error('Required parameter tradeGuid was null or undefined when calling internalGetTrade.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTradeBankModel>(`${this.configuration.basePath}/api/internal/trades/${encodeURIComponent(String(tradeGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Transfer
     * Retrieves an internal transfer.  Required scope: **internal:transfers:read**
     * @param guid Identifier for the internal transfer.
     * @param includeProviderInfo Include provider info in the response.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetTransfer(guid: string, includeProviderInfo?: boolean, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferBankModel>;
    public internalGetTransfer(guid: string, includeProviderInfo?: boolean, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferBankModel>>;
    public internalGetTransfer(guid: string, includeProviderInfo?: boolean, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferBankModel>>;
    public internalGetTransfer(guid: string, includeProviderInfo?: boolean, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalGetTransfer.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (includeProviderInfo !== undefined && includeProviderInfo !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>includeProviderInfo, 'include_provider_info');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTransferBankModel>(`${this.configuration.basePath}/api/internal/transfers/${encodeURIComponent(String(guid))}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get TransferScreening
     * Retrieves an transfer screening.  Required scope: **internal:transfer_screenings:read**
     * @param transferScreeningGuid Identifier for the transfer screening.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetTransferScreening(transferScreeningGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferScreeningBankModel>;
    public internalGetTransferScreening(transferScreeningGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferScreeningBankModel>>;
    public internalGetTransferScreening(transferScreeningGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferScreeningBankModel>>;
    public internalGetTransferScreening(transferScreeningGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (transferScreeningGuid === null || transferScreeningGuid === undefined) {
            throw new Error('Required parameter transferScreeningGuid was null or undefined when calling internalGetTransferScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTransferScreeningBankModel>(`${this.configuration.basePath}/api/internal/transfer_screenings/${encodeURIComponent(String(transferScreeningGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get WalletService
     * Retrieves a wallet service.  Required scope: **internal:wallet_services:read**
     * @param walletServiceGuid Identifier for the wallet service.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalGetWalletService(walletServiceGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalWalletServiceBankModel>;
    public internalGetWalletService(walletServiceGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalWalletServiceBankModel>>;
    public internalGetWalletService(walletServiceGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalWalletServiceBankModel>>;
    public internalGetWalletService(walletServiceGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (walletServiceGuid === null || walletServiceGuid === undefined) {
            throw new Error('Required parameter walletServiceGuid was null or undefined when calling internalGetWalletService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalWalletServiceBankModel>(`${this.configuration.basePath}/api/internal/wallet_services/${encodeURIComponent(String(walletServiceGuid))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Accounts
     * Retrieves a list of accounts.  Required scope: **internal:accounts:read**
     * @param page The page index to retrieve.
     * @param perPage The number of entities per page to return.
     * @param owner The owner of the entity.
     * @param guid Comma separated account_guids to list accounts for.
     * @param customerGuid Comma separated customer_guids to list accounts for.
     * @param bankGuid Comma separated bank_guids to list accounts for.
     * @param type Comma separated account types to list accounts for.
     * @param asset Comma separated assets to list accounts for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListAccounts(page?: string, perPage?: string, owner?: string, guid?: string, customerGuid?: string, bankGuid?: string, type?: string, asset?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<AccountListBankModel>;
    public internalListAccounts(page?: string, perPage?: string, owner?: string, guid?: string, customerGuid?: string, bankGuid?: string, type?: string, asset?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<AccountListBankModel>>;
    public internalListAccounts(page?: string, perPage?: string, owner?: string, guid?: string, customerGuid?: string, bankGuid?: string, type?: string, asset?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<AccountListBankModel>>;
    public internalListAccounts(page?: string, perPage?: string, owner?: string, guid?: string, customerGuid?: string, bankGuid?: string, type?: string, asset?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (owner !== undefined && owner !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>owner, 'owner');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<AccountListBankModel>(`${this.configuration.basePath}/api/internal/accounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List ActivityLimitConfigurations
     * Retrieves a listing of activity limit configurations.  Required scope: **internal:banks:read**
     * @param page 
     * @param perPage 
     * @param type Comma separated configuration types to list activity limit configurations for.
     * @param environment Comma separated environments to list activity limit configurations for. 
     * @param guid Comma separated guids to list activity limit configurations for.
     * @param customerGuid Comma separated customer guids to list activity limit configurations for.
     * @param bankGuid Comma separated bank guids to list activity limit configurations for.
     * @param audience Comma separated audiences to list activity limit configurations for.
     * @param countryCode Comma separated country codes to list activity limit configurations for.
     * @param activity Comma separated activity types to list activity limit configurations for.
     * @param side Comma separated activity sides to list activity limit configurations for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListActivityLimitConfigurations(page?: string, perPage?: string, type?: string, environment?: string, guid?: string, customerGuid?: string, bankGuid?: string, audience?: string, countryCode?: string, activity?: string, side?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalActivityLimitConfigurationListBankModel>;
    public internalListActivityLimitConfigurations(page?: string, perPage?: string, type?: string, environment?: string, guid?: string, customerGuid?: string, bankGuid?: string, audience?: string, countryCode?: string, activity?: string, side?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalActivityLimitConfigurationListBankModel>>;
    public internalListActivityLimitConfigurations(page?: string, perPage?: string, type?: string, environment?: string, guid?: string, customerGuid?: string, bankGuid?: string, audience?: string, countryCode?: string, activity?: string, side?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalActivityLimitConfigurationListBankModel>>;
    public internalListActivityLimitConfigurations(page?: string, perPage?: string, type?: string, environment?: string, guid?: string, customerGuid?: string, bankGuid?: string, audience?: string, countryCode?: string, activity?: string, side?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (audience !== undefined && audience !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>audience, 'audience');
        }
        if (countryCode !== undefined && countryCode !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>countryCode, 'country_code');
        }
        if (activity !== undefined && activity !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>activity, 'activity');
        }
        if (side !== undefined && side !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>side, 'side');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalActivityLimitConfigurationListBankModel>(`${this.configuration.basePath}/api/internal/activity_limit_configurations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List BankAccountServices
     * Retrieves a listing of bank_account services.  Required scope: **internal:bank_account_services:read**
     * @param page 
     * @param perPage 
     * @param environment Comma separated environments to list bank_account services for.
     * @param guid Comma separated guids to list bank_account services for.
     * @param type Comma separated types to list bank_account services for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListBankAccountServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankAccountServiceListBankModel>;
    public internalListBankAccountServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankAccountServiceListBankModel>>;
    public internalListBankAccountServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankAccountServiceListBankModel>>;
    public internalListBankAccountServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalBankAccountServiceListBankModel>(`${this.configuration.basePath}/api/internal/bank_account_services`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Banks
     * Retrieves a listing of banks.  Required scope: **internal:banks:read**
     * @param page The page index to retrieve.
     * @param perPage The number of entities per page to return.
     * @param guid Comma separated bank_guids to list banks for.
     * @param type Comma separated types to list banks for.
     * @param organizationGuid Organization guid to list banks for.
     * @param bankGuid Bank guid to list banks for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListBanks(page?: string, perPage?: string, guid?: string, type?: string, organizationGuid?: string, bankGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankListBankModel>;
    public internalListBanks(page?: string, perPage?: string, guid?: string, type?: string, organizationGuid?: string, bankGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankListBankModel>>;
    public internalListBanks(page?: string, perPage?: string, guid?: string, type?: string, organizationGuid?: string, bankGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankListBankModel>>;
    public internalListBanks(page?: string, perPage?: string, guid?: string, type?: string, organizationGuid?: string, bankGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (organizationGuid !== undefined && organizationGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>organizationGuid, 'organization_guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalBankListBankModel>(`${this.configuration.basePath}/api/internal/banks`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List CryptoAssetConfiguration
     * Retrieves a listing of CryptoAssetConfiguration.Required scope: **internal:banks:read**
     * @param page 
     * @param perPage 
     * @param guid Comma separated guids to list resources for (max 100).
     * @param assetCode Comma separated asset codes to list resources for (max 100).
     * @param bankGuid Comma separated bank guids to list resources for (max 100).
     * @param depositsEnabled Filter resources with deposits enabled.
     * @param environment Environment to list resources for.
     * @param invoicesEnabled Filter resources with invoices enabled.
     * @param storageEnabled Filter resources with storage enabled.
     * @param type Type of resources to list.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListCryptoAssetConfigurations(page?: string, perPage?: string, guid?: string, assetCode?: string, bankGuid?: string, depositsEnabled?: boolean, environment?: string, invoicesEnabled?: boolean, storageEnabled?: boolean, type?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCryptoAssetConfigurationListBankModel>;
    public internalListCryptoAssetConfigurations(page?: string, perPage?: string, guid?: string, assetCode?: string, bankGuid?: string, depositsEnabled?: boolean, environment?: string, invoicesEnabled?: boolean, storageEnabled?: boolean, type?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCryptoAssetConfigurationListBankModel>>;
    public internalListCryptoAssetConfigurations(page?: string, perPage?: string, guid?: string, assetCode?: string, bankGuid?: string, depositsEnabled?: boolean, environment?: string, invoicesEnabled?: boolean, storageEnabled?: boolean, type?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCryptoAssetConfigurationListBankModel>>;
    public internalListCryptoAssetConfigurations(page?: string, perPage?: string, guid?: string, assetCode?: string, bankGuid?: string, depositsEnabled?: boolean, environment?: string, invoicesEnabled?: boolean, storageEnabled?: boolean, type?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (assetCode !== undefined && assetCode !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>assetCode, 'asset_code');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (depositsEnabled !== undefined && depositsEnabled !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>depositsEnabled, 'deposits_enabled');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (invoicesEnabled !== undefined && invoicesEnabled !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>invoicesEnabled, 'invoices_enabled');
        }
        if (storageEnabled !== undefined && storageEnabled !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>storageEnabled, 'storage_enabled');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalCryptoAssetConfigurationListBankModel>(`${this.configuration.basePath}/api/internal/crypto_asset_configurations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Customers
     * Retrieves a listing of Customers.  Required scope: **internal:customers:read**
     * @param page 
     * @param perPage 
     * @param guid Comma separated assets to list customers for.
     * @param type Comma separated types to list customers for.
     * @param bankGuid Comma separated bank_guids to list customers for.
     * @param organizationGuid Comma separated organization_guids to list customers for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListCustomers(page?: string, perPage?: string, guid?: string, type?: string, bankGuid?: string, organizationGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<CustomerListBankModel>;
    public internalListCustomers(page?: string, perPage?: string, guid?: string, type?: string, bankGuid?: string, organizationGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<CustomerListBankModel>>;
    public internalListCustomers(page?: string, perPage?: string, guid?: string, type?: string, bankGuid?: string, organizationGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<CustomerListBankModel>>;
    public internalListCustomers(page?: string, perPage?: string, guid?: string, type?: string, bankGuid?: string, organizationGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (organizationGuid !== undefined && organizationGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>organizationGuid, 'organization_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<CustomerListBankModel>(`${this.configuration.basePath}/api/internal/customers`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List CybridAccounts
     * Retrieves a listing of Cybrid accounts.  Required scope: **internal:cybrid_accounts:read**
     * @param page 
     * @param perPage 
     * @param environment Comma separated environments to list wallets for.
     * @param type Comma separated types to list wallets for.
     * @param asset Comma separated assets to list wallets for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListCybridAccounts(page?: string, perPage?: string, environment?: string, type?: string, asset?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCybridAccountListBankModel>;
    public internalListCybridAccounts(page?: string, perPage?: string, environment?: string, type?: string, asset?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCybridAccountListBankModel>>;
    public internalListCybridAccounts(page?: string, perPage?: string, environment?: string, type?: string, asset?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCybridAccountListBankModel>>;
    public internalListCybridAccounts(page?: string, perPage?: string, environment?: string, type?: string, asset?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalCybridAccountListBankModel>(`${this.configuration.basePath}/api/internal/cybrid_accounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Deposit Bank Accounts
     * Retrieves a list of deposit bank accounts.  Required scope: **internal:deposit_bank_accounts:read**
     * @param page The page index to retrieve.
     * @param perPage The number of entities per page to return.
     * @param guid Comma separated guids to list deposit bank accounts for.
     * @param bankGuid Comma separated bank_guids to list deposit bank accounts for.
     * @param customerGuid Comma separated customer_guids to list deposit bank accounts for.
     * @param label Comma separated labels to list deposit bank accounts for.
     * @param uniqueMemoId Comma separated unique memo ids to list deposit bank accounts for.
     * @param type Comma separated types to list deposit bank accounts for.
     * @param parentDepositBankAccountGuid Comma separated guids for parent accounts to list deposit bank accounts for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListDepositBankAccounts(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, label?: string, uniqueMemoId?: string, type?: string, parentDepositBankAccountGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<DepositBankAccountListBankModel>;
    public internalListDepositBankAccounts(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, label?: string, uniqueMemoId?: string, type?: string, parentDepositBankAccountGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<DepositBankAccountListBankModel>>;
    public internalListDepositBankAccounts(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, label?: string, uniqueMemoId?: string, type?: string, parentDepositBankAccountGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<DepositBankAccountListBankModel>>;
    public internalListDepositBankAccounts(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, label?: string, uniqueMemoId?: string, type?: string, parentDepositBankAccountGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (label !== undefined && label !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>label, 'label');
        }
        if (uniqueMemoId !== undefined && uniqueMemoId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>uniqueMemoId, 'unique_memo_id');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (parentDepositBankAccountGuid !== undefined && parentDepositBankAccountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>parentDepositBankAccountGuid, 'parent_deposit_bank_account_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<DepositBankAccountListBankModel>(`${this.configuration.basePath}/api/internal/deposit_bank_accounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List ExchangeOrder
     * Retrieves a listing of ExchangeOrders.Required scope: **internal:exchange_orders:read**
     * @param page 
     * @param perPage 
     * @param guid Comma separated guids to list resources for.
     * @param state Comma separated states to list resources for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExchangeOrders(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeOrderListBankModel>;
    public internalListExchangeOrders(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeOrderListBankModel>>;
    public internalListExchangeOrders(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeOrderListBankModel>>;
    public internalListExchangeOrders(page?: string, perPage?: string, guid?: string, state?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (state !== undefined && state !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>state, 'state');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeOrderListBankModel>(`${this.configuration.basePath}/api/internal/exchange_orders`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List ExchangeSettlementConfigurations
     * Retrieves a listing of configurations.  Required scope: **internal:exchanges:read**
     * @param page 
     * @param perPage 
     * @param asset Comma separated assets to list configurations for.
     * @param exchangeGuid Comma separated exchange_guids to list configurations for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExchangeSettlementConfigurations(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementConfigurationListBankModel>;
    public internalListExchangeSettlementConfigurations(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementConfigurationListBankModel>>;
    public internalListExchangeSettlementConfigurations(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementConfigurationListBankModel>>;
    public internalListExchangeSettlementConfigurations(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (exchangeGuid !== undefined && exchangeGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>exchangeGuid, 'exchange_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeSettlementConfigurationListBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_configurations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Exchange Settlement Payment Orders
     * Retrieves a listing of exchange settlement payment orders.  Required scope: **internal:exchange_settlements:read**
     * @param page 
     * @param perPage 
     * @param settlementGuid Comma separated exchange settlements to list payments for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExchangeSettlementPaymentOrders(page?: string, perPage?: string, settlementGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeSettlementPaymentOrderListBankModel>;
    public internalListExchangeSettlementPaymentOrders(page?: string, perPage?: string, settlementGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeSettlementPaymentOrderListBankModel>>;
    public internalListExchangeSettlementPaymentOrders(page?: string, perPage?: string, settlementGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeSettlementPaymentOrderListBankModel>>;
    public internalListExchangeSettlementPaymentOrders(page?: string, perPage?: string, settlementGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (settlementGuid !== undefined && settlementGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>settlementGuid, 'settlement_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeSettlementPaymentOrderListBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlement_payment_orders`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Exchanges
     * Retrieves a listing of exchanges.  Required scope: **internal:exchanges:read**
     * @param page 
     * @param perPage 
     * @param provider Comma separated providers to list exchanges for.
     * @param environment Comma separated environments to list exchanges for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExchanges(page?: string, perPage?: string, provider?: string, environment?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeListBankModel>;
    public internalListExchanges(page?: string, perPage?: string, provider?: string, environment?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeListBankModel>>;
    public internalListExchanges(page?: string, perPage?: string, provider?: string, environment?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeListBankModel>>;
    public internalListExchanges(page?: string, perPage?: string, provider?: string, environment?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (provider !== undefined && provider !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>provider, 'provider');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExchangeListBankModel>(`${this.configuration.basePath}/api/internal/exchanges`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Expected Payments
     * Retrieves a listing of expected payments.  Required scope: **internal:exchange_settlements:read**
     * @param page 
     * @param perPage 
     * @param settlementGuid Comma separated exchange settlements to list payments for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExpectedPayments(page?: string, perPage?: string, settlementGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExpectedPaymentListBankModel>;
    public internalListExpectedPayments(page?: string, perPage?: string, settlementGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExpectedPaymentListBankModel>>;
    public internalListExpectedPayments(page?: string, perPage?: string, settlementGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExpectedPaymentListBankModel>>;
    public internalListExpectedPayments(page?: string, perPage?: string, settlementGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (settlementGuid !== undefined && settlementGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>settlementGuid, 'settlement_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExpectedPaymentListBankModel>(`${this.configuration.basePath}/api/internal/expected_payments`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List ExternalBankAccounts
     * Retrieves a listing of external bank accounts.  Required scope: **internal:accounts:read**
     * @param page 
     * @param perPage 
     * @param asset Comma separated assets to list bank accounts for.
     * @param bankGuid Comma separated bank_guids to list bank accounts for.
     * @param exchangeGuid Comma separated exchange_guids to list bank accounts for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExternalBankAccounts(page?: string, perPage?: string, asset?: string, bankGuid?: string, exchangeGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalBankAccountListBankModel>;
    public internalListExternalBankAccounts(page?: string, perPage?: string, asset?: string, bankGuid?: string, exchangeGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalBankAccountListBankModel>>;
    public internalListExternalBankAccounts(page?: string, perPage?: string, asset?: string, bankGuid?: string, exchangeGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalBankAccountListBankModel>>;
    public internalListExternalBankAccounts(page?: string, perPage?: string, asset?: string, bankGuid?: string, exchangeGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (exchangeGuid !== undefined && exchangeGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>exchangeGuid, 'exchange_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExternalBankAccountListBankModel>(`${this.configuration.basePath}/api/internal/external_bank_accounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List ExternalWallets
     * Retrieves a listing of external wallets.  Required scope: **internal:accounts:read**
     * @param page 
     * @param perPage 
     * @param asset Comma separated assets to list wallets for.
     * @param exchangeGuid Comma separated exchange_guids to list wallets for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListExternalWallets(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletListBankModel>;
    public internalListExternalWallets(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletListBankModel>>;
    public internalListExternalWallets(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletListBankModel>>;
    public internalListExternalWallets(page?: string, perPage?: string, asset?: string, exchangeGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (exchangeGuid !== undefined && exchangeGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>exchangeGuid, 'exchange_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalExternalWalletListBankModel>(`${this.configuration.basePath}/api/internal/external_wallets`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List FeeConfiguration
     * Retrieves a listing of FeeConfiguration.Required scope: **internal:banks:read**
     * @param page 
     * @param perPage 
     * @param guid Comma separated guids to list resources for (max 100).
     * @param configurationType Comma separated configuration types to list resources for.
     * @param productType Comma separated product types to list resources for.
     * @param primaryAssetCode Comma separated primary asset codes to list resources for.
     * @param counterAssetCode Comma separated counter asset codes to list resources for.
     * @param bankGuid Comma separated bank guids to list resources for.
     * @param organizationGuid Comma separated organization guids to list resources for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListFeeConfigurations(page?: string, perPage?: string, guid?: string, configurationType?: string, productType?: string, primaryAssetCode?: string, counterAssetCode?: string, bankGuid?: string, organizationGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFeeConfigurationListBankModel>;
    public internalListFeeConfigurations(page?: string, perPage?: string, guid?: string, configurationType?: string, productType?: string, primaryAssetCode?: string, counterAssetCode?: string, bankGuid?: string, organizationGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFeeConfigurationListBankModel>>;
    public internalListFeeConfigurations(page?: string, perPage?: string, guid?: string, configurationType?: string, productType?: string, primaryAssetCode?: string, counterAssetCode?: string, bankGuid?: string, organizationGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFeeConfigurationListBankModel>>;
    public internalListFeeConfigurations(page?: string, perPage?: string, guid?: string, configurationType?: string, productType?: string, primaryAssetCode?: string, counterAssetCode?: string, bankGuid?: string, organizationGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (configurationType !== undefined && configurationType !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>configurationType, 'configuration_type');
        }
        if (productType !== undefined && productType !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>productType, 'product_type');
        }
        if (primaryAssetCode !== undefined && primaryAssetCode !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>primaryAssetCode, 'primary_asset_code');
        }
        if (counterAssetCode !== undefined && counterAssetCode !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>counterAssetCode, 'counter_asset_code');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (organizationGuid !== undefined && organizationGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>organizationGuid, 'organization_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalFeeConfigurationListBankModel>(`${this.configuration.basePath}/api/internal/fee_configurations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Fees
     * Retrieves a listing of Fees.Required scope: **internal:fees:read**
     * @param page 
     * @param perPage 
     * @param guid Comma separated guids to list resources for.
     * @param state Comma separated states to list resources for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListFees(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFeeChargeListBankModel>;
    public internalListFees(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFeeChargeListBankModel>>;
    public internalListFees(page?: string, perPage?: string, guid?: string, state?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFeeChargeListBankModel>>;
    public internalListFees(page?: string, perPage?: string, guid?: string, state?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (state !== undefined && state !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>state, 'state');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalFeeChargeListBankModel>(`${this.configuration.basePath}/api/internal/fees`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List InternalBankAccounts
     * Retrieves a listing of internal bank accounts.  Required scope: **internal:accounts:read**
     * @param page 
     * @param perPage 
     * @param environment Comma separated environments to list bank accounts for.
     * @param asset Comma separated assets to list bank accounts for.
     * @param accountKind Comma separated account kinds to list bank accounts for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListInternalBankAccounts(page?: string, perPage?: string, environment?: string, asset?: string, accountKind?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalBankAccountListBankModel>;
    public internalListInternalBankAccounts(page?: string, perPage?: string, environment?: string, asset?: string, accountKind?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalBankAccountListBankModel>>;
    public internalListInternalBankAccounts(page?: string, perPage?: string, environment?: string, asset?: string, accountKind?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalBankAccountListBankModel>>;
    public internalListInternalBankAccounts(page?: string, perPage?: string, environment?: string, asset?: string, accountKind?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (accountKind !== undefined && accountKind !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountKind, 'account_kind');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInternalBankAccountListBankModel>(`${this.configuration.basePath}/api/internal/internal_bank_accounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List InternalWallets
     * Retrieves a listing of internal wallets.  Required scope: **internal:accounts:read**
     * @param page 
     * @param perPage 
     * @param owner The owner of the entity.
     * @param environment Comma separated environments to list wallets for.
     * @param guid Comma separated guids to list wallets for.
     * @param bankGuid Comma separated bank_guids to list wallets for.
     * @param customerGuid Comma separated customer_guids to list wallets for.
     * @param internalWalletGroupGuid Comma separated internal_wallet_group_guids to list wallets for.
     * @param type Comma separated types to list wallets for.
     * @param asset Comma separated assets to list wallets for.
     * @param accountKind Comma separated account kinds to list wallets for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListInternalWallets(page?: string, perPage?: string, owner?: string, environment?: string, guid?: string, bankGuid?: string, customerGuid?: string, internalWalletGroupGuid?: string, type?: string, asset?: string, accountKind?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletListBankModel>;
    public internalListInternalWallets(page?: string, perPage?: string, owner?: string, environment?: string, guid?: string, bankGuid?: string, customerGuid?: string, internalWalletGroupGuid?: string, type?: string, asset?: string, accountKind?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletListBankModel>>;
    public internalListInternalWallets(page?: string, perPage?: string, owner?: string, environment?: string, guid?: string, bankGuid?: string, customerGuid?: string, internalWalletGroupGuid?: string, type?: string, asset?: string, accountKind?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletListBankModel>>;
    public internalListInternalWallets(page?: string, perPage?: string, owner?: string, environment?: string, guid?: string, bankGuid?: string, customerGuid?: string, internalWalletGroupGuid?: string, type?: string, asset?: string, accountKind?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (owner !== undefined && owner !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>owner, 'owner');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (internalWalletGroupGuid !== undefined && internalWalletGroupGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>internalWalletGroupGuid, 'internal_wallet_group_guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (accountKind !== undefined && accountKind !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountKind, 'account_kind');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInternalWalletListBankModel>(`${this.configuration.basePath}/api/internal/internal_wallets`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Invoices
     * Retrieves a list of invoices.  Required scope: **internal:invoices:read**
     * @param page The page index to retrieve.
     * @param perPage The number of entities per page to return.
     * @param guid Comma separated guids to list invoices for.
     * @param bankGuid Comma separated bank_guids to list invoices for.
     * @param customerGuid Comma separated customer_guids to list invoices for.
     * @param accountGuid Comma separated account_guids to list invoices for.
     * @param state Comma separated states to list invoices for.
     * @param asset Comma separated assets to list invoices for.
     * @param environment 
     * @param label Comma separated labels to list invoices for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListInvoices(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, accountGuid?: string, state?: string, asset?: string, environment?: 'sandbox' | 'production', label?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalInvoiceListBankModel>;
    public internalListInvoices(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, accountGuid?: string, state?: string, asset?: string, environment?: 'sandbox' | 'production', label?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalInvoiceListBankModel>>;
    public internalListInvoices(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, accountGuid?: string, state?: string, asset?: string, environment?: 'sandbox' | 'production', label?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalInvoiceListBankModel>>;
    public internalListInvoices(page?: string, perPage?: string, guid?: string, bankGuid?: string, customerGuid?: string, accountGuid?: string, state?: string, asset?: string, environment?: 'sandbox' | 'production', label?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (accountGuid !== undefined && accountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountGuid, 'account_guid');
        }
        if (state !== undefined && state !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>state, 'state');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (label !== undefined && label !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>label, 'label');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalInternalInvoiceListBankModel>(`${this.configuration.basePath}/api/internal/invoices`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Reconciliations
     * Retrieves a listing of reconciliations.  Required scope: **internal:transfers:read**
     * @param page 
     * @param perPage 
     * @param category Comma separated categories to list reconciliations for.
     * @param confidence Comma separated confidences to list reconciliations for.
     * @param direction Comma separated directions to list reconciliations for.
     * @param transferGuid Comma separated transfer_guids to list reconciliations for.
     * @param transactionId Comma separated transaction_ids to list reconciliations for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListReconciliations(page?: string, perPage?: string, category?: string, confidence?: string, direction?: string, transferGuid?: string, transactionId?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalReconciliationListBankModel>;
    public internalListReconciliations(page?: string, perPage?: string, category?: string, confidence?: string, direction?: string, transferGuid?: string, transactionId?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalReconciliationListBankModel>>;
    public internalListReconciliations(page?: string, perPage?: string, category?: string, confidence?: string, direction?: string, transferGuid?: string, transactionId?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalReconciliationListBankModel>>;
    public internalListReconciliations(page?: string, perPage?: string, category?: string, confidence?: string, direction?: string, transferGuid?: string, transactionId?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (category !== undefined && category !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>category, 'category');
        }
        if (confidence !== undefined && confidence !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>confidence, 'confidence');
        }
        if (direction !== undefined && direction !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>direction, 'direction');
        }
        if (transferGuid !== undefined && transferGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>transferGuid, 'transfer_guid');
        }
        if (transactionId !== undefined && transactionId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>transactionId, 'transaction_id');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalReconciliationListBankModel>(`${this.configuration.basePath}/api/internal/reconciliations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Trades
     * Retrieves a list of trades.  Required scope: **internal:trades:read**
     * @param page The page index to retrieve.
     * @param perPage The number of entities per page to return.
     * @param guid Comma separated trade_guids to list trades for.
     * @param customerGuid Comma separated customer_guids to list trades for.
     * @param bankGuid Comma separated bank_guids to list trades for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListTrades(page?: string, perPage?: string, guid?: string, customerGuid?: string, bankGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<TradeListBankModel>;
    public internalListTrades(page?: string, perPage?: string, guid?: string, customerGuid?: string, bankGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<TradeListBankModel>>;
    public internalListTrades(page?: string, perPage?: string, guid?: string, customerGuid?: string, bankGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<TradeListBankModel>>;
    public internalListTrades(page?: string, perPage?: string, guid?: string, customerGuid?: string, bankGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<TradeListBankModel>(`${this.configuration.basePath}/api/internal/trades`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List TradingSymbolConfigurations
     * Retrieves a listing of trading symbol configurations.  Required scope: **internal:banks:read**
     * @param page 
     * @param perPage 
     * @param bankGuid Comma separated bank guids to list trading symbol configurations for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListTradingSymbolConfigurations(page?: string, perPage?: string, bankGuid?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradingSymbolConfigurationListBankModel>;
    public internalListTradingSymbolConfigurations(page?: string, perPage?: string, bankGuid?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradingSymbolConfigurationListBankModel>>;
    public internalListTradingSymbolConfigurations(page?: string, perPage?: string, bankGuid?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradingSymbolConfigurationListBankModel>>;
    public internalListTradingSymbolConfigurations(page?: string, perPage?: string, bankGuid?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTradingSymbolConfigurationListBankModel>(`${this.configuration.basePath}/api/internal/trading_symbol_configurations`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Transactions
     * Retrieves a listing of transactions.  Required scope: **internal:transfers:read**
     * @param environment 
     * @param accountGuid 
     * @param accountType 
     * @param cursor 
     * @param perPage 
     * @param includePii Include PII in the response.
     * @param createdAtGte Created at start date inclusive lower bound, ISO8601.
     * @param createdAtLt Created at end date exclusive upper bound, ISO8601.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListTransactions(environment: 'sandbox' | 'production', accountGuid: string, accountType: 'internal_wallet' | 'internal_bank_account', cursor?: string, perPage?: string, includePii?: boolean, createdAtGte?: string, createdAtLt?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransactionsListBankModel>;
    public internalListTransactions(environment: 'sandbox' | 'production', accountGuid: string, accountType: 'internal_wallet' | 'internal_bank_account', cursor?: string, perPage?: string, includePii?: boolean, createdAtGte?: string, createdAtLt?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransactionsListBankModel>>;
    public internalListTransactions(environment: 'sandbox' | 'production', accountGuid: string, accountType: 'internal_wallet' | 'internal_bank_account', cursor?: string, perPage?: string, includePii?: boolean, createdAtGte?: string, createdAtLt?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransactionsListBankModel>>;
    public internalListTransactions(environment: 'sandbox' | 'production', accountGuid: string, accountType: 'internal_wallet' | 'internal_bank_account', cursor?: string, perPage?: string, includePii?: boolean, createdAtGte?: string, createdAtLt?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (environment === null || environment === undefined) {
            throw new Error('Required parameter environment was null or undefined when calling internalListTransactions.');
        }
        if (accountGuid === null || accountGuid === undefined) {
            throw new Error('Required parameter accountGuid was null or undefined when calling internalListTransactions.');
        }
        if (accountType === null || accountType === undefined) {
            throw new Error('Required parameter accountType was null or undefined when calling internalListTransactions.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (cursor !== undefined && cursor !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>cursor, 'cursor');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (accountGuid !== undefined && accountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountGuid, 'account_guid');
        }
        if (accountType !== undefined && accountType !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountType, 'account_type');
        }
        if (includePii !== undefined && includePii !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>includePii, 'include_pii');
        }
        if (createdAtGte !== undefined && createdAtGte !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAtGte, 'created_at_gte');
        }
        if (createdAtLt !== undefined && createdAtLt !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAtLt, 'created_at_lt');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTransactionsListBankModel>(`${this.configuration.basePath}/api/internal/transactions`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Transfers
     * Retrieves a listing of internal transfers.  Required scope: **internal:transfers:read**
     * @param page 
     * @param perPage 
     * @param asset Comma separated assets to list transfers for.
     * @param guid Comma separated transfer_guids to list transfers for.
     * @param transferType Comma separated transfer_types to list accounts for.
     * @param customerGuid Comma separated customer_guids to list transfers for.
     * @param bankGuid Comma separated bank_guids to list transfers for.
     * @param accountGuid Comma separated account_guids to list transfers for.
     * @param state Comma separated states to list transfers for.
     * @param side Comma separated sides to list transfers for.
     * @param txnHash Comma separated txn_hashes to list transfers for.
     * @param externalId Comma separated external_ids to list transfers for.
     * @param amount Amount in cents to list transfers for.
     * @param estimatedAmount Estimated amount in cents to list transfers for.
     * @param principalSourceAccountGuid Comma separated principal_source_account_guids to list transfers for.
     * @param principalDestinationAccountGuid Comma separated principal_destination_account_guids to list transfers for.
     * @param createdAtGte Created at start date-time inclusive lower bound, ISO8601
     * @param createdAtLt Created at end date-time exclusive upper bound, ISO8601.
     * @param updatedAtGte Created at start date-time inclusive lower bound, ISO8601
     * @param updatedAtLt Created at end date-time exclusive upper bound, ISO8601.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListTransfers(page?: string, perPage?: string, asset?: string, guid?: string, transferType?: string, customerGuid?: string, bankGuid?: string, accountGuid?: string, state?: string, side?: string, txnHash?: string, externalId?: string, amount?: string, estimatedAmount?: string, principalSourceAccountGuid?: string, principalDestinationAccountGuid?: string, createdAtGte?: string, createdAtLt?: string, updatedAtGte?: string, updatedAtLt?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferListBankModel>;
    public internalListTransfers(page?: string, perPage?: string, asset?: string, guid?: string, transferType?: string, customerGuid?: string, bankGuid?: string, accountGuid?: string, state?: string, side?: string, txnHash?: string, externalId?: string, amount?: string, estimatedAmount?: string, principalSourceAccountGuid?: string, principalDestinationAccountGuid?: string, createdAtGte?: string, createdAtLt?: string, updatedAtGte?: string, updatedAtLt?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferListBankModel>>;
    public internalListTransfers(page?: string, perPage?: string, asset?: string, guid?: string, transferType?: string, customerGuid?: string, bankGuid?: string, accountGuid?: string, state?: string, side?: string, txnHash?: string, externalId?: string, amount?: string, estimatedAmount?: string, principalSourceAccountGuid?: string, principalDestinationAccountGuid?: string, createdAtGte?: string, createdAtLt?: string, updatedAtGte?: string, updatedAtLt?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferListBankModel>>;
    public internalListTransfers(page?: string, perPage?: string, asset?: string, guid?: string, transferType?: string, customerGuid?: string, bankGuid?: string, accountGuid?: string, state?: string, side?: string, txnHash?: string, externalId?: string, amount?: string, estimatedAmount?: string, principalSourceAccountGuid?: string, principalDestinationAccountGuid?: string, createdAtGte?: string, createdAtLt?: string, updatedAtGte?: string, updatedAtLt?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (asset !== undefined && asset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>asset, 'asset');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (transferType !== undefined && transferType !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>transferType, 'transfer_type');
        }
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (bankGuid !== undefined && bankGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>bankGuid, 'bank_guid');
        }
        if (accountGuid !== undefined && accountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>accountGuid, 'account_guid');
        }
        if (state !== undefined && state !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>state, 'state');
        }
        if (side !== undefined && side !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>side, 'side');
        }
        if (txnHash !== undefined && txnHash !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>txnHash, 'txn_hash');
        }
        if (externalId !== undefined && externalId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>externalId, 'external_id');
        }
        if (amount !== undefined && amount !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>amount, 'amount');
        }
        if (estimatedAmount !== undefined && estimatedAmount !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>estimatedAmount, 'estimated_amount');
        }
        if (principalSourceAccountGuid !== undefined && principalSourceAccountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>principalSourceAccountGuid, 'principal_source_account_guid');
        }
        if (principalDestinationAccountGuid !== undefined && principalDestinationAccountGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>principalDestinationAccountGuid, 'principal_destination_account_guid');
        }
        if (createdAtGte !== undefined && createdAtGte !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAtGte, 'created_at_gte');
        }
        if (createdAtLt !== undefined && createdAtLt !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAtLt, 'created_at_lt');
        }
        if (updatedAtGte !== undefined && updatedAtGte !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>updatedAtGte, 'updated_at_gte');
        }
        if (updatedAtLt !== undefined && updatedAtLt !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>updatedAtLt, 'updated_at_lt');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalTransferListBankModel>(`${this.configuration.basePath}/api/internal/transfers`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List WalletServices
     * Retrieves a listing of wallet services.  Required scope: **internal:wallet_services:read**
     * @param page 
     * @param perPage 
     * @param environment Comma separated environments to list wallet services for.
     * @param guid Comma separated guids to list wallet services for.
     * @param type Comma separated types to list wallet services for.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalListWalletServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalWalletServiceListBankModel>;
    public internalListWalletServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalWalletServiceListBankModel>>;
    public internalListWalletServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalWalletServiceListBankModel>>;
    public internalListWalletServices(page?: string, perPage?: string, environment?: string, guid?: string, type?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
        }
        if (environment !== undefined && environment !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>environment, 'environment');
        }
        if (guid !== undefined && guid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>guid, 'guid');
        }
        if (type !== undefined && type !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>type, 'type');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.get<InternalWalletServiceListBankModel>(`${this.configuration.basePath}/api/internal/wallet_services`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Account
     * Patch an account.  Required scope: **internal:accounts:write**
     * @param accountGuid Identifier for the account.
     * @param patchInternalAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchAccount(accountGuid: string, patchInternalAccountBankModel: PatchInternalAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<AccountBankModel>;
    public internalPatchAccount(accountGuid: string, patchInternalAccountBankModel: PatchInternalAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<AccountBankModel>>;
    public internalPatchAccount(accountGuid: string, patchInternalAccountBankModel: PatchInternalAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<AccountBankModel>>;
    public internalPatchAccount(accountGuid: string, patchInternalAccountBankModel: PatchInternalAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (accountGuid === null || accountGuid === undefined) {
            throw new Error('Required parameter accountGuid was null or undefined when calling internalPatchAccount.');
        }
        if (patchInternalAccountBankModel === null || patchInternalAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalAccountBankModel was null or undefined when calling internalPatchAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<AccountBankModel>(`${this.configuration.basePath}/api/internal/accounts/${encodeURIComponent(String(accountGuid))}`,
            patchInternalAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch ActivityLimitConfiguration
     * Updates an activity limit configuration.  Required scope: **internal:banks:write**
     * @param guid Identifier for the activity limit configuration.
     * @param patchInternalActivityLimitConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchActivityLimitConfiguration(guid: string, patchInternalActivityLimitConfigurationBankModel: PatchInternalActivityLimitConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalActivityLimitConfigurationBankModel>;
    public internalPatchActivityLimitConfiguration(guid: string, patchInternalActivityLimitConfigurationBankModel: PatchInternalActivityLimitConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalActivityLimitConfigurationBankModel>>;
    public internalPatchActivityLimitConfiguration(guid: string, patchInternalActivityLimitConfigurationBankModel: PatchInternalActivityLimitConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalActivityLimitConfigurationBankModel>>;
    public internalPatchActivityLimitConfiguration(guid: string, patchInternalActivityLimitConfigurationBankModel: PatchInternalActivityLimitConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchActivityLimitConfiguration.');
        }
        if (patchInternalActivityLimitConfigurationBankModel === null || patchInternalActivityLimitConfigurationBankModel === undefined) {
            throw new Error('Required parameter patchInternalActivityLimitConfigurationBankModel was null or undefined when calling internalPatchActivityLimitConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalActivityLimitConfigurationBankModel>(`${this.configuration.basePath}/api/internal/activity_limit_configurations/${encodeURIComponent(String(guid))}`,
            patchInternalActivityLimitConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Bank
     * Update a bank.  Required scope: **internal:banks:write**
     * @param bankGuid Identifier for the bank.
     * @param patchInternalBankBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchBank(bankGuid: string, patchInternalBankBankModel: PatchInternalBankBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankBankModel>;
    public internalPatchBank(bankGuid: string, patchInternalBankBankModel: PatchInternalBankBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankBankModel>>;
    public internalPatchBank(bankGuid: string, patchInternalBankBankModel: PatchInternalBankBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankBankModel>>;
    public internalPatchBank(bankGuid: string, patchInternalBankBankModel: PatchInternalBankBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (bankGuid === null || bankGuid === undefined) {
            throw new Error('Required parameter bankGuid was null or undefined when calling internalPatchBank.');
        }
        if (patchInternalBankBankModel === null || patchInternalBankBankModel === undefined) {
            throw new Error('Required parameter patchInternalBankBankModel was null or undefined when calling internalPatchBank.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalBankBankModel>(`${this.configuration.basePath}/api/internal/banks/${encodeURIComponent(String(bankGuid))}`,
            patchInternalBankBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Internal BankAccount
     * Patch an internal bank_account.  Required scope: **internal:bank_account_services:write**
     * @param guid Identifier for the resource.
     * @param patchInternalBankAccountServiceBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchBankAccountService(guid: string, patchInternalBankAccountServiceBankModel: PatchInternalBankAccountServiceBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBankAccountServiceBankModel>;
    public internalPatchBankAccountService(guid: string, patchInternalBankAccountServiceBankModel: PatchInternalBankAccountServiceBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBankAccountServiceBankModel>>;
    public internalPatchBankAccountService(guid: string, patchInternalBankAccountServiceBankModel: PatchInternalBankAccountServiceBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBankAccountServiceBankModel>>;
    public internalPatchBankAccountService(guid: string, patchInternalBankAccountServiceBankModel: PatchInternalBankAccountServiceBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchBankAccountService.');
        }
        if (patchInternalBankAccountServiceBankModel === null || patchInternalBankAccountServiceBankModel === undefined) {
            throw new Error('Required parameter patchInternalBankAccountServiceBankModel was null or undefined when calling internalPatchBankAccountService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalBankAccountServiceBankModel>(`${this.configuration.basePath}/api/internal/bank_account_services/${encodeURIComponent(String(guid))}`,
            patchInternalBankAccountServiceBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Business Details
     * Patch a business details record.  Required scope: **internal:customers:write**
     * @param guid Identifier for the resource.
     * @param patchInternalBusinessDetailBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchBusinessDetail(guid: string, patchInternalBusinessDetailBankModel: PatchInternalBusinessDetailBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalBusinessDetailBankModel>;
    public internalPatchBusinessDetail(guid: string, patchInternalBusinessDetailBankModel: PatchInternalBusinessDetailBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalBusinessDetailBankModel>>;
    public internalPatchBusinessDetail(guid: string, patchInternalBusinessDetailBankModel: PatchInternalBusinessDetailBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalBusinessDetailBankModel>>;
    public internalPatchBusinessDetail(guid: string, patchInternalBusinessDetailBankModel: PatchInternalBusinessDetailBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchBusinessDetail.');
        }
        if (patchInternalBusinessDetailBankModel === null || patchInternalBusinessDetailBankModel === undefined) {
            throw new Error('Required parameter patchInternalBusinessDetailBankModel was null or undefined when calling internalPatchBusinessDetail.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalBusinessDetailBankModel>(`${this.configuration.basePath}/api/internal/business_details/${encodeURIComponent(String(guid))}`,
            patchInternalBusinessDetailBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Counterparty
     * Patch a counterparty.  Required scope: **internal:counterparties:write**
     * @param counterpartyGuid Identifier for the counterparty.
     * @param patchInternalCounterpartyBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchCounterparty(counterpartyGuid: string, patchInternalCounterpartyBankModel: PatchInternalCounterpartyBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<CounterpartyBankModel>;
    public internalPatchCounterparty(counterpartyGuid: string, patchInternalCounterpartyBankModel: PatchInternalCounterpartyBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<CounterpartyBankModel>>;
    public internalPatchCounterparty(counterpartyGuid: string, patchInternalCounterpartyBankModel: PatchInternalCounterpartyBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<CounterpartyBankModel>>;
    public internalPatchCounterparty(counterpartyGuid: string, patchInternalCounterpartyBankModel: PatchInternalCounterpartyBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (counterpartyGuid === null || counterpartyGuid === undefined) {
            throw new Error('Required parameter counterpartyGuid was null or undefined when calling internalPatchCounterparty.');
        }
        if (patchInternalCounterpartyBankModel === null || patchInternalCounterpartyBankModel === undefined) {
            throw new Error('Required parameter patchInternalCounterpartyBankModel was null or undefined when calling internalPatchCounterparty.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<CounterpartyBankModel>(`${this.configuration.basePath}/api/internal/counterparties/${encodeURIComponent(String(counterpartyGuid))}`,
            patchInternalCounterpartyBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch CryptoAssetConfiguration
     * Updates a crypto asset configuration.  Required scope: **internal:banks:write**
     * @param guid Identifier for the crypto asset configuration.
     * @param patchInternalCryptoAssetConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchCryptoAssetConfiguration(guid: string, patchInternalCryptoAssetConfigurationBankModel: PatchInternalCryptoAssetConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCryptoAssetConfigurationBankModel>;
    public internalPatchCryptoAssetConfiguration(guid: string, patchInternalCryptoAssetConfigurationBankModel: PatchInternalCryptoAssetConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCryptoAssetConfigurationBankModel>>;
    public internalPatchCryptoAssetConfiguration(guid: string, patchInternalCryptoAssetConfigurationBankModel: PatchInternalCryptoAssetConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCryptoAssetConfigurationBankModel>>;
    public internalPatchCryptoAssetConfiguration(guid: string, patchInternalCryptoAssetConfigurationBankModel: PatchInternalCryptoAssetConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchCryptoAssetConfiguration.');
        }
        if (patchInternalCryptoAssetConfigurationBankModel === null || patchInternalCryptoAssetConfigurationBankModel === undefined) {
            throw new Error('Required parameter patchInternalCryptoAssetConfigurationBankModel was null or undefined when calling internalPatchCryptoAssetConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalCryptoAssetConfigurationBankModel>(`${this.configuration.basePath}/api/internal/crypto_asset_configurations/${encodeURIComponent(String(guid))}`,
            patchInternalCryptoAssetConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Customer
     * Patch a customer.  Required scope: **internal:customers:write**
     * @param customerGuid Identifier for the customer.
     * @param patchInternalCustomerBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchCustomer(customerGuid: string, patchInternalCustomerBankModel: PatchInternalCustomerBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<CustomerBankModel>;
    public internalPatchCustomer(customerGuid: string, patchInternalCustomerBankModel: PatchInternalCustomerBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<CustomerBankModel>>;
    public internalPatchCustomer(customerGuid: string, patchInternalCustomerBankModel: PatchInternalCustomerBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<CustomerBankModel>>;
    public internalPatchCustomer(customerGuid: string, patchInternalCustomerBankModel: PatchInternalCustomerBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (customerGuid === null || customerGuid === undefined) {
            throw new Error('Required parameter customerGuid was null or undefined when calling internalPatchCustomer.');
        }
        if (patchInternalCustomerBankModel === null || patchInternalCustomerBankModel === undefined) {
            throw new Error('Required parameter patchInternalCustomerBankModel was null or undefined when calling internalPatchCustomer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<CustomerBankModel>(`${this.configuration.basePath}/api/internal/customers/${encodeURIComponent(String(customerGuid))}`,
            patchInternalCustomerBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Cybrid Account
     * Patch an cybrid account.  Required scope: **internal:accounts:write**
     * @param guid Identifier for the resource.
     * @param patchInternalCybridAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchCybridAccount(guid: string, patchInternalCybridAccountBankModel: PatchInternalCybridAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCybridAccountBankModel>;
    public internalPatchCybridAccount(guid: string, patchInternalCybridAccountBankModel: PatchInternalCybridAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCybridAccountBankModel>>;
    public internalPatchCybridAccount(guid: string, patchInternalCybridAccountBankModel: PatchInternalCybridAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCybridAccountBankModel>>;
    public internalPatchCybridAccount(guid: string, patchInternalCybridAccountBankModel: PatchInternalCybridAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchCybridAccount.');
        }
        if (patchInternalCybridAccountBankModel === null || patchInternalCybridAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalCybridAccountBankModel was null or undefined when calling internalPatchCybridAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalCybridAccountBankModel>(`${this.configuration.basePath}/api/internal/cybrid_accounts/${encodeURIComponent(String(guid))}`,
            patchInternalCybridAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Deposit Address
     * Patch an deposit address.  Required scope: **internal:deposit_addresses:write**
     * @param guid Identifier for the resource.
     * @param patchInternalDepositAddressBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchDepositAddress(guid: string, patchInternalDepositAddressBankModel: PatchInternalDepositAddressBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<DepositAddressBankModel>;
    public internalPatchDepositAddress(guid: string, patchInternalDepositAddressBankModel: PatchInternalDepositAddressBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<DepositAddressBankModel>>;
    public internalPatchDepositAddress(guid: string, patchInternalDepositAddressBankModel: PatchInternalDepositAddressBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<DepositAddressBankModel>>;
    public internalPatchDepositAddress(guid: string, patchInternalDepositAddressBankModel: PatchInternalDepositAddressBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchDepositAddress.');
        }
        if (patchInternalDepositAddressBankModel === null || patchInternalDepositAddressBankModel === undefined) {
            throw new Error('Required parameter patchInternalDepositAddressBankModel was null or undefined when calling internalPatchDepositAddress.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<DepositAddressBankModel>(`${this.configuration.basePath}/api/internal/deposit_addresses/${encodeURIComponent(String(guid))}`,
            patchInternalDepositAddressBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch DepositBankAccount
     * Patch an deposit bank account.  Required scope: **internal:deposit_bank_accounts:write**
     * @param depositBankAccountGuid Identifier for the deposit bank account.
     * @param patchInternalDepositBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchDepositBankAccount(depositBankAccountGuid: string, patchInternalDepositBankAccountBankModel: PatchInternalDepositBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<DepositBankAccountBankModel>;
    public internalPatchDepositBankAccount(depositBankAccountGuid: string, patchInternalDepositBankAccountBankModel: PatchInternalDepositBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<DepositBankAccountBankModel>>;
    public internalPatchDepositBankAccount(depositBankAccountGuid: string, patchInternalDepositBankAccountBankModel: PatchInternalDepositBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<DepositBankAccountBankModel>>;
    public internalPatchDepositBankAccount(depositBankAccountGuid: string, patchInternalDepositBankAccountBankModel: PatchInternalDepositBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (depositBankAccountGuid === null || depositBankAccountGuid === undefined) {
            throw new Error('Required parameter depositBankAccountGuid was null or undefined when calling internalPatchDepositBankAccount.');
        }
        if (patchInternalDepositBankAccountBankModel === null || patchInternalDepositBankAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalDepositBankAccountBankModel was null or undefined when calling internalPatchDepositBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<DepositBankAccountBankModel>(`${this.configuration.basePath}/api/internal/deposit_bank_accounts/${encodeURIComponent(String(depositBankAccountGuid))}`,
            patchInternalDepositBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Exchange Account
     * Patch an exchange account.  Required scope: **internal:accounts:write**
     * @param guid Identifier for the resource.
     * @param patchInternalExchangeAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExchangeAccount(guid: string, patchInternalExchangeAccountBankModel: PatchInternalExchangeAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeAccountBankModel>;
    public internalPatchExchangeAccount(guid: string, patchInternalExchangeAccountBankModel: PatchInternalExchangeAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeAccountBankModel>>;
    public internalPatchExchangeAccount(guid: string, patchInternalExchangeAccountBankModel: PatchInternalExchangeAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeAccountBankModel>>;
    public internalPatchExchangeAccount(guid: string, patchInternalExchangeAccountBankModel: PatchInternalExchangeAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchExchangeAccount.');
        }
        if (patchInternalExchangeAccountBankModel === null || patchInternalExchangeAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalExchangeAccountBankModel was null or undefined when calling internalPatchExchangeAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExchangeAccountBankModel>(`${this.configuration.basePath}/api/internal/exchange_accounts/${encodeURIComponent(String(guid))}`,
            patchInternalExchangeAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch ExchangeOrder
     * Patches a ExchangeOrder.Required scope: **internal:exchange_orders:write**
     * @param guid Identifier for the resource.
     * @param patchInternalExchangeOrderBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExchangeOrder(guid: string, patchInternalExchangeOrderBankModel: PatchInternalExchangeOrderBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExchangeOrderBankModel>;
    public internalPatchExchangeOrder(guid: string, patchInternalExchangeOrderBankModel: PatchInternalExchangeOrderBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExchangeOrderBankModel>>;
    public internalPatchExchangeOrder(guid: string, patchInternalExchangeOrderBankModel: PatchInternalExchangeOrderBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExchangeOrderBankModel>>;
    public internalPatchExchangeOrder(guid: string, patchInternalExchangeOrderBankModel: PatchInternalExchangeOrderBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchExchangeOrder.');
        }
        if (patchInternalExchangeOrderBankModel === null || patchInternalExchangeOrderBankModel === undefined) {
            throw new Error('Required parameter patchInternalExchangeOrderBankModel was null or undefined when calling internalPatchExchangeOrder.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExchangeOrderBankModel>(`${this.configuration.basePath}/api/internal/exchange_orders/${encodeURIComponent(String(guid))}`,
            patchInternalExchangeOrderBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Exchange Settlement
     * Patch an exchange settlement verification.  Required scope: **internal:exchange_settlements:write**
     * @param exchangeSettlementGuid Identifier for the exchange settlement.
     * @param patchInternalExchangeSettlementBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExchangeSettlement(exchangeSettlementGuid: string, patchInternalExchangeSettlementBankModel: PatchInternalExchangeSettlementBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>;
    public internalPatchExchangeSettlement(exchangeSettlementGuid: string, patchInternalExchangeSettlementBankModel: PatchInternalExchangeSettlementBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalPatchExchangeSettlement(exchangeSettlementGuid: string, patchInternalExchangeSettlementBankModel: PatchInternalExchangeSettlementBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalCreateExchangeSettlementApproval202ResponseBankModel>>;
    public internalPatchExchangeSettlement(exchangeSettlementGuid: string, patchInternalExchangeSettlementBankModel: PatchInternalExchangeSettlementBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (exchangeSettlementGuid === null || exchangeSettlementGuid === undefined) {
            throw new Error('Required parameter exchangeSettlementGuid was null or undefined when calling internalPatchExchangeSettlement.');
        }
        if (patchInternalExchangeSettlementBankModel === null || patchInternalExchangeSettlementBankModel === undefined) {
            throw new Error('Required parameter patchInternalExchangeSettlementBankModel was null or undefined when calling internalPatchExchangeSettlement.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalCreateExchangeSettlementApproval202ResponseBankModel>(`${this.configuration.basePath}/api/internal/exchange_settlements/${encodeURIComponent(String(exchangeSettlementGuid))}`,
            patchInternalExchangeSettlementBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch ExternalBankAccount
     * Patch an external bank account.  Required scope: **internal:accounts:write**
     * @param externalBankAccountGuid Identifier for the external bank account.
     * @param patchInternalExternalBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExternalBankAccount(externalBankAccountGuid: string, patchInternalExternalBankAccountBankModel: PatchInternalExternalBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalBankAccountBankModel>;
    public internalPatchExternalBankAccount(externalBankAccountGuid: string, patchInternalExternalBankAccountBankModel: PatchInternalExternalBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalBankAccountBankModel>>;
    public internalPatchExternalBankAccount(externalBankAccountGuid: string, patchInternalExternalBankAccountBankModel: PatchInternalExternalBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalBankAccountBankModel>>;
    public internalPatchExternalBankAccount(externalBankAccountGuid: string, patchInternalExternalBankAccountBankModel: PatchInternalExternalBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalBankAccountGuid === null || externalBankAccountGuid === undefined) {
            throw new Error('Required parameter externalBankAccountGuid was null or undefined when calling internalPatchExternalBankAccount.');
        }
        if (patchInternalExternalBankAccountBankModel === null || patchInternalExternalBankAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalExternalBankAccountBankModel was null or undefined when calling internalPatchExternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/external_bank_accounts/${encodeURIComponent(String(externalBankAccountGuid))}`,
            patchInternalExternalBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch ExternalWallet
     * Patch an transfer.  Required scope: **internal:accounts:write**
     * @param externalWalletGuid Identifier for the external wallet.
     * @param patchInternalExternalWalletBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExternalWallet(externalWalletGuid: string, patchInternalExternalWalletBankModel: PatchInternalExternalWalletBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletBankModel>;
    public internalPatchExternalWallet(externalWalletGuid: string, patchInternalExternalWalletBankModel: PatchInternalExternalWalletBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletBankModel>>;
    public internalPatchExternalWallet(externalWalletGuid: string, patchInternalExternalWalletBankModel: PatchInternalExternalWalletBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletBankModel>>;
    public internalPatchExternalWallet(externalWalletGuid: string, patchInternalExternalWalletBankModel: PatchInternalExternalWalletBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalWalletGuid === null || externalWalletGuid === undefined) {
            throw new Error('Required parameter externalWalletGuid was null or undefined when calling internalPatchExternalWallet.');
        }
        if (patchInternalExternalWalletBankModel === null || patchInternalExternalWalletBankModel === undefined) {
            throw new Error('Required parameter patchInternalExternalWalletBankModel was null or undefined when calling internalPatchExternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExternalWalletBankModel>(`${this.configuration.basePath}/api/internal/external_wallets/${encodeURIComponent(String(externalWalletGuid))}`,
            patchInternalExternalWalletBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch External Wallet Screening
     * Patch an external wallet screening.  Required scope: **internal:external_wallet_screenings:write**
     * @param externalWalletScreeningGuid Identifier for the external wallet screening.
     * @param patchInternalExternalWalletScreeningBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchExternalWalletScreening(externalWalletScreeningGuid: string, patchInternalExternalWalletScreeningBankModel: PatchInternalExternalWalletScreeningBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletScreeningBankModel>;
    public internalPatchExternalWalletScreening(externalWalletScreeningGuid: string, patchInternalExternalWalletScreeningBankModel: PatchInternalExternalWalletScreeningBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletScreeningBankModel>>;
    public internalPatchExternalWalletScreening(externalWalletScreeningGuid: string, patchInternalExternalWalletScreeningBankModel: PatchInternalExternalWalletScreeningBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletScreeningBankModel>>;
    public internalPatchExternalWalletScreening(externalWalletScreeningGuid: string, patchInternalExternalWalletScreeningBankModel: PatchInternalExternalWalletScreeningBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalWalletScreeningGuid === null || externalWalletScreeningGuid === undefined) {
            throw new Error('Required parameter externalWalletScreeningGuid was null or undefined when calling internalPatchExternalWalletScreening.');
        }
        if (patchInternalExternalWalletScreeningBankModel === null || patchInternalExternalWalletScreeningBankModel === undefined) {
            throw new Error('Required parameter patchInternalExternalWalletScreeningBankModel was null or undefined when calling internalPatchExternalWalletScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExternalWalletScreeningBankModel>(`${this.configuration.basePath}/api/internal/external_wallet_screenings/${encodeURIComponent(String(externalWalletScreeningGuid))}`,
            patchInternalExternalWalletScreeningBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Fee
     * Patches a Fee.Required scope: **internal:fees:write**
     * @param guid Identifier for the resource.
     * @param patchInternalFeeChargeBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchFee(guid: string, patchInternalFeeChargeBankModel: PatchInternalFeeChargeBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalFeeChargeBankModel>;
    public internalPatchFee(guid: string, patchInternalFeeChargeBankModel: PatchInternalFeeChargeBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalFeeChargeBankModel>>;
    public internalPatchFee(guid: string, patchInternalFeeChargeBankModel: PatchInternalFeeChargeBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalFeeChargeBankModel>>;
    public internalPatchFee(guid: string, patchInternalFeeChargeBankModel: PatchInternalFeeChargeBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchFee.');
        }
        if (patchInternalFeeChargeBankModel === null || patchInternalFeeChargeBankModel === undefined) {
            throw new Error('Required parameter patchInternalFeeChargeBankModel was null or undefined when calling internalPatchFee.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalFeeChargeBankModel>(`${this.configuration.basePath}/api/internal/fees/${encodeURIComponent(String(guid))}`,
            patchInternalFeeChargeBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Files
     * Patch an file.  Required scope: **internal:files:write**
     * @param fileGuid Identifier for the file.
     * @param patchInternalFileBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchFiles(fileGuid: string, patchInternalFileBankModel: PatchInternalFileBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<PlatformFileBankModel>;
    public internalPatchFiles(fileGuid: string, patchInternalFileBankModel: PatchInternalFileBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<PlatformFileBankModel>>;
    public internalPatchFiles(fileGuid: string, patchInternalFileBankModel: PatchInternalFileBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<PlatformFileBankModel>>;
    public internalPatchFiles(fileGuid: string, patchInternalFileBankModel: PatchInternalFileBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (fileGuid === null || fileGuid === undefined) {
            throw new Error('Required parameter fileGuid was null or undefined when calling internalPatchFiles.');
        }
        if (patchInternalFileBankModel === null || patchInternalFileBankModel === undefined) {
            throw new Error('Required parameter patchInternalFileBankModel was null or undefined when calling internalPatchFiles.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<PlatformFileBankModel>(`${this.configuration.basePath}/api/internal/files/${encodeURIComponent(String(fileGuid))}`,
            patchInternalFileBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Identity Verification
     * Patch an identity verification.  Required scope: **internal:identity_verifications:write**
     * @param identityVerificationGuid Identifier for the identity verification.
     * @param patchInternalIdentityVerificationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchIdentityVerification(identityVerificationGuid: string, patchInternalIdentityVerificationBankModel: PatchInternalIdentityVerificationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<IdentityVerificationBankModel>;
    public internalPatchIdentityVerification(identityVerificationGuid: string, patchInternalIdentityVerificationBankModel: PatchInternalIdentityVerificationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<IdentityVerificationBankModel>>;
    public internalPatchIdentityVerification(identityVerificationGuid: string, patchInternalIdentityVerificationBankModel: PatchInternalIdentityVerificationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<IdentityVerificationBankModel>>;
    public internalPatchIdentityVerification(identityVerificationGuid: string, patchInternalIdentityVerificationBankModel: PatchInternalIdentityVerificationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (identityVerificationGuid === null || identityVerificationGuid === undefined) {
            throw new Error('Required parameter identityVerificationGuid was null or undefined when calling internalPatchIdentityVerification.');
        }
        if (patchInternalIdentityVerificationBankModel === null || patchInternalIdentityVerificationBankModel === undefined) {
            throw new Error('Required parameter patchInternalIdentityVerificationBankModel was null or undefined when calling internalPatchIdentityVerification.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<IdentityVerificationBankModel>(`${this.configuration.basePath}/api/internal/identity_verifications/${encodeURIComponent(String(identityVerificationGuid))}`,
            patchInternalIdentityVerificationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Internal Bank Account
     * Patch an internal bank account.  Required scope: **internal:accounts:write**
     * @param guid Identifier for the resource.
     * @param patchInternalInternalBankAccountBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchInternalBankAccount(guid: string, patchInternalInternalBankAccountBankModel: PatchInternalInternalBankAccountBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalBankAccountBankModel>;
    public internalPatchInternalBankAccount(guid: string, patchInternalInternalBankAccountBankModel: PatchInternalInternalBankAccountBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalBankAccountBankModel>>;
    public internalPatchInternalBankAccount(guid: string, patchInternalInternalBankAccountBankModel: PatchInternalInternalBankAccountBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalBankAccountBankModel>>;
    public internalPatchInternalBankAccount(guid: string, patchInternalInternalBankAccountBankModel: PatchInternalInternalBankAccountBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchInternalBankAccount.');
        }
        if (patchInternalInternalBankAccountBankModel === null || patchInternalInternalBankAccountBankModel === undefined) {
            throw new Error('Required parameter patchInternalInternalBankAccountBankModel was null or undefined when calling internalPatchInternalBankAccount.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalInternalBankAccountBankModel>(`${this.configuration.basePath}/api/internal/internal_bank_accounts/${encodeURIComponent(String(guid))}`,
            patchInternalInternalBankAccountBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Internal Wallet
     * Patch an internal wallet.  Required scope: **internal:accounts:write**
     * @param guid Identifier for the resource.
     * @param patchInternalInternalWalletBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchInternalWallet(guid: string, patchInternalInternalWalletBankModel: PatchInternalInternalWalletBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletBankModel>;
    public internalPatchInternalWallet(guid: string, patchInternalInternalWalletBankModel: PatchInternalInternalWalletBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletBankModel>>;
    public internalPatchInternalWallet(guid: string, patchInternalInternalWalletBankModel: PatchInternalInternalWalletBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletBankModel>>;
    public internalPatchInternalWallet(guid: string, patchInternalInternalWalletBankModel: PatchInternalInternalWalletBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchInternalWallet.');
        }
        if (patchInternalInternalWalletBankModel === null || patchInternalInternalWalletBankModel === undefined) {
            throw new Error('Required parameter patchInternalInternalWalletBankModel was null or undefined when calling internalPatchInternalWallet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalInternalWalletBankModel>(`${this.configuration.basePath}/api/internal/internal_wallets/${encodeURIComponent(String(guid))}`,
            patchInternalInternalWalletBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Internal Wallet
     * Patch an internal wallet.  Required scope: **internal:accounts:write**
     * @param guid Identifier for the resource.
     * @param patchInternalInternalWalletGroupBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchInternalWalletGroup(guid: string, patchInternalInternalWalletGroupBankModel: PatchInternalInternalWalletGroupBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInternalWalletGroupBankModel>;
    public internalPatchInternalWalletGroup(guid: string, patchInternalInternalWalletGroupBankModel: PatchInternalInternalWalletGroupBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInternalWalletGroupBankModel>>;
    public internalPatchInternalWalletGroup(guid: string, patchInternalInternalWalletGroupBankModel: PatchInternalInternalWalletGroupBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInternalWalletGroupBankModel>>;
    public internalPatchInternalWalletGroup(guid: string, patchInternalInternalWalletGroupBankModel: PatchInternalInternalWalletGroupBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchInternalWalletGroup.');
        }
        if (patchInternalInternalWalletGroupBankModel === null || patchInternalInternalWalletGroupBankModel === undefined) {
            throw new Error('Required parameter patchInternalInternalWalletGroupBankModel was null or undefined when calling internalPatchInternalWalletGroup.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalInternalWalletGroupBankModel>(`${this.configuration.basePath}/api/internal/internal_wallet_groups/${encodeURIComponent(String(guid))}`,
            patchInternalInternalWalletGroupBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Invoice
     * Patch an invoice.  Required scope: **internal:invoices:write**
     * @param invoiceGuid Identifier for the invoice.
     * @param patchInternalInvoiceBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchInvoice(invoiceGuid: string, patchInternalInvoiceBankModel: PatchInternalInvoiceBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInvoiceBankModel>;
    public internalPatchInvoice(invoiceGuid: string, patchInternalInvoiceBankModel: PatchInternalInvoiceBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInvoiceBankModel>>;
    public internalPatchInvoice(invoiceGuid: string, patchInternalInvoiceBankModel: PatchInternalInvoiceBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInvoiceBankModel>>;
    public internalPatchInvoice(invoiceGuid: string, patchInternalInvoiceBankModel: PatchInternalInvoiceBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (invoiceGuid === null || invoiceGuid === undefined) {
            throw new Error('Required parameter invoiceGuid was null or undefined when calling internalPatchInvoice.');
        }
        if (patchInternalInvoiceBankModel === null || patchInternalInvoiceBankModel === undefined) {
            throw new Error('Required parameter patchInternalInvoiceBankModel was null or undefined when calling internalPatchInvoice.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalInvoiceBankModel>(`${this.configuration.basePath}/api/internal/invoices/${encodeURIComponent(String(invoiceGuid))}`,
            patchInternalInvoiceBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Payment Instruction
     * Patch an payment instruction.  Required scope: **internal:invoices:write**
     * @param guid Identifier for the resource.
     * @param patchInternalPaymentInstructionBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchPaymentInstruction(guid: string, patchInternalPaymentInstructionBankModel: PatchInternalPaymentInstructionBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<PaymentInstructionBankModel>;
    public internalPatchPaymentInstruction(guid: string, patchInternalPaymentInstructionBankModel: PatchInternalPaymentInstructionBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<PaymentInstructionBankModel>>;
    public internalPatchPaymentInstruction(guid: string, patchInternalPaymentInstructionBankModel: PatchInternalPaymentInstructionBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<PaymentInstructionBankModel>>;
    public internalPatchPaymentInstruction(guid: string, patchInternalPaymentInstructionBankModel: PatchInternalPaymentInstructionBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchPaymentInstruction.');
        }
        if (patchInternalPaymentInstructionBankModel === null || patchInternalPaymentInstructionBankModel === undefined) {
            throw new Error('Required parameter patchInternalPaymentInstructionBankModel was null or undefined when calling internalPatchPaymentInstruction.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<PaymentInstructionBankModel>(`${this.configuration.basePath}/api/internal/payment_instructions/${encodeURIComponent(String(guid))}`,
            patchInternalPaymentInstructionBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Person Details
     * Patch a person details record.  Required scope: **internal:customers:write**
     * @param guid Identifier for the resource.
     * @param patchInternalPersonDetailBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchPersonDetail(guid: string, patchInternalPersonDetailBankModel: PatchInternalPersonDetailBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalPersonDetailBankModel>;
    public internalPatchPersonDetail(guid: string, patchInternalPersonDetailBankModel: PatchInternalPersonDetailBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalPersonDetailBankModel>>;
    public internalPatchPersonDetail(guid: string, patchInternalPersonDetailBankModel: PatchInternalPersonDetailBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalPersonDetailBankModel>>;
    public internalPatchPersonDetail(guid: string, patchInternalPersonDetailBankModel: PatchInternalPersonDetailBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchPersonDetail.');
        }
        if (patchInternalPersonDetailBankModel === null || patchInternalPersonDetailBankModel === undefined) {
            throw new Error('Required parameter patchInternalPersonDetailBankModel was null or undefined when calling internalPatchPersonDetail.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalPersonDetailBankModel>(`${this.configuration.basePath}/api/internal/person_details/${encodeURIComponent(String(guid))}`,
            patchInternalPersonDetailBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Trade
     * Patch a trade.  Required scope: **internal:trades:write**
     * @param tradeGuid Identifier for the trade.
     * @param patchInternalTradeBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchTrade(tradeGuid: string, patchInternalTradeBankModel: PatchInternalTradeBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradeBankModel>;
    public internalPatchTrade(tradeGuid: string, patchInternalTradeBankModel: PatchInternalTradeBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradeBankModel>>;
    public internalPatchTrade(tradeGuid: string, patchInternalTradeBankModel: PatchInternalTradeBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradeBankModel>>;
    public internalPatchTrade(tradeGuid: string, patchInternalTradeBankModel: PatchInternalTradeBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (tradeGuid === null || tradeGuid === undefined) {
            throw new Error('Required parameter tradeGuid was null or undefined when calling internalPatchTrade.');
        }
        if (patchInternalTradeBankModel === null || patchInternalTradeBankModel === undefined) {
            throw new Error('Required parameter patchInternalTradeBankModel was null or undefined when calling internalPatchTrade.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalTradeBankModel>(`${this.configuration.basePath}/api/internal/trades/${encodeURIComponent(String(tradeGuid))}`,
            patchInternalTradeBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch TradingSymbolConfiguration
     * Updates an trading symbol configuration.  Required scope: **internal:banks:write**
     * @param guid Identifier for the trading symbol configuration.
     * @param patchInternalTradingSymbolConfigurationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchTradingSymbolConfiguration(guid: string, patchInternalTradingSymbolConfigurationBankModel: PatchInternalTradingSymbolConfigurationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTradingSymbolConfigurationBankModel>;
    public internalPatchTradingSymbolConfiguration(guid: string, patchInternalTradingSymbolConfigurationBankModel: PatchInternalTradingSymbolConfigurationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTradingSymbolConfigurationBankModel>>;
    public internalPatchTradingSymbolConfiguration(guid: string, patchInternalTradingSymbolConfigurationBankModel: PatchInternalTradingSymbolConfigurationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTradingSymbolConfigurationBankModel>>;
    public internalPatchTradingSymbolConfiguration(guid: string, patchInternalTradingSymbolConfigurationBankModel: PatchInternalTradingSymbolConfigurationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchTradingSymbolConfiguration.');
        }
        if (patchInternalTradingSymbolConfigurationBankModel === null || patchInternalTradingSymbolConfigurationBankModel === undefined) {
            throw new Error('Required parameter patchInternalTradingSymbolConfigurationBankModel was null or undefined when calling internalPatchTradingSymbolConfiguration.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalTradingSymbolConfigurationBankModel>(`${this.configuration.basePath}/api/internal/trading_symbol_configurations/${encodeURIComponent(String(guid))}`,
            patchInternalTradingSymbolConfigurationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Transfer
     * Patch an transfer.  Required scope: **internal:transfers:write**
     * @param transferGuid Identifier for the transfer.
     * @param patchInternalTransferBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchTransfer(transferGuid: string, patchInternalTransferBankModel: PatchInternalTransferBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferBankModel>;
    public internalPatchTransfer(transferGuid: string, patchInternalTransferBankModel: PatchInternalTransferBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferBankModel>>;
    public internalPatchTransfer(transferGuid: string, patchInternalTransferBankModel: PatchInternalTransferBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferBankModel>>;
    public internalPatchTransfer(transferGuid: string, patchInternalTransferBankModel: PatchInternalTransferBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (transferGuid === null || transferGuid === undefined) {
            throw new Error('Required parameter transferGuid was null or undefined when calling internalPatchTransfer.');
        }
        if (patchInternalTransferBankModel === null || patchInternalTransferBankModel === undefined) {
            throw new Error('Required parameter patchInternalTransferBankModel was null or undefined when calling internalPatchTransfer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalTransferBankModel>(`${this.configuration.basePath}/api/internal/transfers/${encodeURIComponent(String(transferGuid))}`,
            patchInternalTransferBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch External Wallet Screening
     * Patch an transfer screening.  Required scope: **internal:transfer_screenings:write**
     * @param transferScreeningGuid Identifier for the transfer screening.
     * @param patchInternalTransferScreeningBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchTransferScreening(transferScreeningGuid: string, patchInternalTransferScreeningBankModel: PatchInternalTransferScreeningBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalTransferScreeningBankModel>;
    public internalPatchTransferScreening(transferScreeningGuid: string, patchInternalTransferScreeningBankModel: PatchInternalTransferScreeningBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalTransferScreeningBankModel>>;
    public internalPatchTransferScreening(transferScreeningGuid: string, patchInternalTransferScreeningBankModel: PatchInternalTransferScreeningBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalTransferScreeningBankModel>>;
    public internalPatchTransferScreening(transferScreeningGuid: string, patchInternalTransferScreeningBankModel: PatchInternalTransferScreeningBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (transferScreeningGuid === null || transferScreeningGuid === undefined) {
            throw new Error('Required parameter transferScreeningGuid was null or undefined when calling internalPatchTransferScreening.');
        }
        if (patchInternalTransferScreeningBankModel === null || patchInternalTransferScreeningBankModel === undefined) {
            throw new Error('Required parameter patchInternalTransferScreeningBankModel was null or undefined when calling internalPatchTransferScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalTransferScreeningBankModel>(`${this.configuration.basePath}/api/internal/transfer_screenings/${encodeURIComponent(String(transferScreeningGuid))}`,
            patchInternalTransferScreeningBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Internal Wallet
     * Patch an internal wallet.  Required scope: **internal:wallet_services:write**
     * @param guid Identifier for the resource.
     * @param patchInternalWalletServiceBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchWalletService(guid: string, patchInternalWalletServiceBankModel: PatchInternalWalletServiceBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalWalletServiceBankModel>;
    public internalPatchWalletService(guid: string, patchInternalWalletServiceBankModel: PatchInternalWalletServiceBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalWalletServiceBankModel>>;
    public internalPatchWalletService(guid: string, patchInternalWalletServiceBankModel: PatchInternalWalletServiceBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalWalletServiceBankModel>>;
    public internalPatchWalletService(guid: string, patchInternalWalletServiceBankModel: PatchInternalWalletServiceBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (guid === null || guid === undefined) {
            throw new Error('Required parameter guid was null or undefined when calling internalPatchWalletService.');
        }
        if (patchInternalWalletServiceBankModel === null || patchInternalWalletServiceBankModel === undefined) {
            throw new Error('Required parameter patchInternalWalletServiceBankModel was null or undefined when calling internalPatchWalletService.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalWalletServiceBankModel>(`${this.configuration.basePath}/api/internal/wallet_services/${encodeURIComponent(String(guid))}`,
            patchInternalWalletServiceBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Workflow
     * Patch an workflow.  Required scope: **internal:workflows:write**
     * @param workflowGuid Identifier for the workflow.
     * @param patchInternalWorkflowBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalPatchWorkflow(workflowGuid: string, patchInternalWorkflowBankModel: PatchInternalWorkflowBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<WorkflowBankModel>;
    public internalPatchWorkflow(workflowGuid: string, patchInternalWorkflowBankModel: PatchInternalWorkflowBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<WorkflowBankModel>>;
    public internalPatchWorkflow(workflowGuid: string, patchInternalWorkflowBankModel: PatchInternalWorkflowBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<WorkflowBankModel>>;
    public internalPatchWorkflow(workflowGuid: string, patchInternalWorkflowBankModel: PatchInternalWorkflowBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (workflowGuid === null || workflowGuid === undefined) {
            throw new Error('Required parameter workflowGuid was null or undefined when calling internalPatchWorkflow.');
        }
        if (patchInternalWorkflowBankModel === null || patchInternalWorkflowBankModel === undefined) {
            throw new Error('Required parameter patchInternalWorkflowBankModel was null or undefined when calling internalPatchWorkflow.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<WorkflowBankModel>(`${this.configuration.basePath}/api/internal/workflows/${encodeURIComponent(String(workflowGuid))}`,
            patchInternalWorkflowBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Signal External Wallet Screening
     * Signal an external wallet screening with a outcome.  Required scope: **internal:external_wallet_screenings:write**
     * @param externalWalletScreeningGuid Identifier for the external wallet screening.
     * @param postSignalInternalExternalWalletScreeningBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalSignalExternalWalletScreening(externalWalletScreeningGuid: string, postSignalInternalExternalWalletScreeningBankModel: PostSignalInternalExternalWalletScreeningBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExternalWalletScreeningBankModel>;
    public internalSignalExternalWalletScreening(externalWalletScreeningGuid: string, postSignalInternalExternalWalletScreeningBankModel: PostSignalInternalExternalWalletScreeningBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExternalWalletScreeningBankModel>>;
    public internalSignalExternalWalletScreening(externalWalletScreeningGuid: string, postSignalInternalExternalWalletScreeningBankModel: PostSignalInternalExternalWalletScreeningBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExternalWalletScreeningBankModel>>;
    public internalSignalExternalWalletScreening(externalWalletScreeningGuid: string, postSignalInternalExternalWalletScreeningBankModel: PostSignalInternalExternalWalletScreeningBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (externalWalletScreeningGuid === null || externalWalletScreeningGuid === undefined) {
            throw new Error('Required parameter externalWalletScreeningGuid was null or undefined when calling internalSignalExternalWalletScreening.');
        }
        if (postSignalInternalExternalWalletScreeningBankModel === null || postSignalInternalExternalWalletScreeningBankModel === undefined) {
            throw new Error('Required parameter postSignalInternalExternalWalletScreeningBankModel was null or undefined when calling internalSignalExternalWalletScreening.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalExternalWalletScreeningBankModel>(`${this.configuration.basePath}/api/internal/external_wallet_screenings/${encodeURIComponent(String(externalWalletScreeningGuid))}/signal`,
            postSignalInternalExternalWalletScreeningBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Signal Identity Verification
     * Signal an identity verification with a decision.  Required scope: **internal:identity_verifications:write**
     * @param identityVerificationGuid Identifier for the identity verification.
     * @param postSignalInternalIdentityVerificationBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalSignalIdentityVerification(identityVerificationGuid: string, postSignalInternalIdentityVerificationBankModel: PostSignalInternalIdentityVerificationBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<IdentityVerificationBankModel>;
    public internalSignalIdentityVerification(identityVerificationGuid: string, postSignalInternalIdentityVerificationBankModel: PostSignalInternalIdentityVerificationBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<IdentityVerificationBankModel>>;
    public internalSignalIdentityVerification(identityVerificationGuid: string, postSignalInternalIdentityVerificationBankModel: PostSignalInternalIdentityVerificationBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<IdentityVerificationBankModel>>;
    public internalSignalIdentityVerification(identityVerificationGuid: string, postSignalInternalIdentityVerificationBankModel: PostSignalInternalIdentityVerificationBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (identityVerificationGuid === null || identityVerificationGuid === undefined) {
            throw new Error('Required parameter identityVerificationGuid was null or undefined when calling internalSignalIdentityVerification.');
        }
        if (postSignalInternalIdentityVerificationBankModel === null || postSignalInternalIdentityVerificationBankModel === undefined) {
            throw new Error('Required parameter postSignalInternalIdentityVerificationBankModel was null or undefined when calling internalSignalIdentityVerification.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<IdentityVerificationBankModel>(`${this.configuration.basePath}/api/internal/identity_verifications/${encodeURIComponent(String(identityVerificationGuid))}/signal`,
            postSignalInternalIdentityVerificationBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Signal Invoice
     * Signal an invoice to complete settlment.  Required scope: **internal:invoices:write**
     * @param invoiceGuid Identifier for the invoice.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalSignalInvoice(invoiceGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalInvoiceBankModel>;
    public internalSignalInvoice(invoiceGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalInvoiceBankModel>>;
    public internalSignalInvoice(invoiceGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalInvoiceBankModel>>;
    public internalSignalInvoice(invoiceGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (invoiceGuid === null || invoiceGuid === undefined) {
            throw new Error('Required parameter invoiceGuid was null or undefined when calling internalSignalInvoice.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<InternalInvoiceBankModel>(`${this.configuration.basePath}/api/internal/invoices/${encodeURIComponent(String(invoiceGuid))}/signal`,
            null,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Signal Transfer
     * Signal an transfer to proceed.  Required scope: **internal:transfers:write**
     * @param transferGuid Identifier for the transfer.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public internalSignalTransfer(transferGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<TransferBankModel>;
    public internalSignalTransfer(transferGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<TransferBankModel>>;
    public internalSignalTransfer(transferGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<TransferBankModel>>;
    public internalSignalTransfer(transferGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (transferGuid === null || transferGuid === undefined) {
            throw new Error('Required parameter transferGuid was null or undefined when calling internalSignalTransfer.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.post<TransferBankModel>(`${this.configuration.basePath}/api/internal/transfers/${encodeURIComponent(String(transferGuid))}/signal`,
            null,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Execution
     * Patch an execution verification.  Required scope: **internal:executions:write**
     * @param executionGuid Identifier for the execution.
     * @param patchInternalExecutionBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public patchInternalExecution(executionGuid: string, patchInternalExecutionBankModel: PatchInternalExecutionBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalExecutionBankModel>;
    public patchInternalExecution(executionGuid: string, patchInternalExecutionBankModel: PatchInternalExecutionBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalExecutionBankModel>>;
    public patchInternalExecution(executionGuid: string, patchInternalExecutionBankModel: PatchInternalExecutionBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalExecutionBankModel>>;
    public patchInternalExecution(executionGuid: string, patchInternalExecutionBankModel: PatchInternalExecutionBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (executionGuid === null || executionGuid === undefined) {
            throw new Error('Required parameter executionGuid was null or undefined when calling patchInternalExecution.');
        }
        if (patchInternalExecutionBankModel === null || patchInternalExecutionBankModel === undefined) {
            throw new Error('Required parameter patchInternalExecutionBankModel was null or undefined when calling patchInternalExecution.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalExecutionBankModel>(`${this.configuration.basePath}/api/internal/executions/${encodeURIComponent(String(executionGuid))}`,
            patchInternalExecutionBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Plan
     * Patch an plan verification.  Required scope: **internal:plans:write**
     * @param planGuid Identifier for the plan.
     * @param patchInternalPlanBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public patchInternalPlan(planGuid: string, patchInternalPlanBankModel: PatchInternalPlanBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalPlanBankModel>;
    public patchInternalPlan(planGuid: string, patchInternalPlanBankModel: PatchInternalPlanBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalPlanBankModel>>;
    public patchInternalPlan(planGuid: string, patchInternalPlanBankModel: PatchInternalPlanBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalPlanBankModel>>;
    public patchInternalPlan(planGuid: string, patchInternalPlanBankModel: PatchInternalPlanBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (planGuid === null || planGuid === undefined) {
            throw new Error('Required parameter planGuid was null or undefined when calling patchInternalPlan.');
        }
        if (patchInternalPlanBankModel === null || patchInternalPlanBankModel === undefined) {
            throw new Error('Required parameter patchInternalPlanBankModel was null or undefined when calling patchInternalPlan.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalPlanBankModel>(`${this.configuration.basePath}/api/internal/plans/${encodeURIComponent(String(planGuid))}`,
            patchInternalPlanBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Patch Stage
     * Patch a stage.  Required scope: **internal:plans:write**
     * @param stageGuid Identifier for the stage.
     * @param patchInternalStageBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public patchInternalStage(stageGuid: string, patchInternalStageBankModel: PatchInternalStageBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InternalStageBankModel>;
    public patchInternalStage(stageGuid: string, patchInternalStageBankModel: PatchInternalStageBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InternalStageBankModel>>;
    public patchInternalStage(stageGuid: string, patchInternalStageBankModel: PatchInternalStageBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InternalStageBankModel>>;
    public patchInternalStage(stageGuid: string, patchInternalStageBankModel: PatchInternalStageBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (stageGuid === null || stageGuid === undefined) {
            throw new Error('Required parameter stageGuid was null or undefined when calling patchInternalStage.');
        }
        if (patchInternalStageBankModel === null || patchInternalStageBankModel === undefined) {
            throw new Error('Required parameter patchInternalStageBankModel was null or undefined when calling patchInternalStage.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (BearerAuth) required
        localVarCredential = this.configuration.lookupCredential('BearerAuth');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        // authentication (oauth2) required
        localVarCredential = this.configuration.lookupCredential('oauth2');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        return this.httpClient.patch<InternalStageBankModel>(`${this.configuration.basePath}/api/internal/stages/${encodeURIComponent(String(stageGuid))}`,
            patchInternalStageBankModel,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
