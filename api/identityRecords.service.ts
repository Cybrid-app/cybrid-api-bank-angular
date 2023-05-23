/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](https://bank.sandbox.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Understanding the Platform](https://kb.cybrid.xyz/understanding-the-platform) 2. [Getting Started in the Cybrid Sandbox](https://kb.cybrid.xyz/getting-started-guide) 3. [Getting Ready for Trading](https://kb.cybrid.xyz/getting-ready-for-trading) 4. [Running the Web Demo App](https://kb.cybrid.xyz/locally-running-the-web-demo-app) (or, alternatively, [Testing with Hosted Web Demo App](https://kb.cybrid.xyz/testing-with-hosted-web-demo-app))  In [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started), we walk you through how to use the [Cybrid Sandbox](https://id.sandbox.cybrid.app/) to create a test bank and generate API keys. In [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  If you\'ve already run through the first two guides, you can follow the [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) guide to test our web SDK with your sandbox `bank` and `customer`.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), [iOS](https://github.com/Cybrid-app/cybrid-sdk-ios))  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](https://organization.sandbox.cybrid.app/api/schema/swagger-ui)   | APIs to manage organizations                                | | [Bank API](https://bank.sandbox.cybrid.app/api/schema/swagger-ui)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](https://id.sandbox.cybrid.app/api/schema/swagger-ui)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.sandbox.cybrid.app). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](https://id.sandbox.cybrid.app) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API using our [Identities API](https://id.sandbox.cybrid.app/api/schema/swagger-ui).  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` # Example request when using Bank credentials curl -X POST https://id.sandbox.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write accounts:read accounts:execute customers:read customers:write customers:execute prices:read quotes:execute quotes:read trades:execute trades:read transfers:execute transfers:read rewards:execute rewards:read external_bank_accounts:read external_bank_accounts:write external_bank_accounts:execute external_wallets:read external_wallets:execute workflows:read workflows:execute deposit_addresses:read deposit_addresses:execute\"   }\' -H \"Content-Type: application/json\"  # When using Organization credentials set `scope` to \'organizations:read organizations:write banks:read banks:write banks:execute customers:read accounts:read prices:read quotes:execute quotes:read trades:execute trades:read transfers:read transfers:execute external_bank_accounts:read external_wallets:read workflows:read deposit_addresses:read\' ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization, Bank or Customer token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource              | Read scope (Token Type)                                    | Write scope (Token Type)                      | Execute scope (Token Type)                       | |-----------------------|------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------| | Account               | accounts:read (Organization, Bank, Customer)               |                                               | accounts:execute (Bank, Customer)                | | Bank                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)              | banks:execute (Organization)                     | | Customer              | customers:read (Organization, Bank, Customer)              | customers:write (Bank, Customer)              | customers:execute (Bank)                         | | Deposit Address       | deposit_addresses:read (Organization, Bank, Customer)      | deposit_addresses:write (Bank, Customer)      | deposit_addresses:execute (Bank, Customer)       | | External Bank Account | external_bank_accounts:read (Organization, Bank, Customer) | external_bank_accounts:write (Bank, Customer) | external_bank_accounts:execute (Bank, Customer)  | | External Wallet       | external_wallet:read (Organization, Bank, Customer)        |                                               | external_wallet:execute (Bank, Customer)         | | Organization          | organizations:read (Organization)                          | organizations:write (Organization)            |                                                  | | Price                 | prices:read (Bank, Customer)                               |                                               |                                                  | | Quote                 | quotes:read (Organization, Bank, Customer)                 |                                               | quotes:execute (Organization, Bank, Customer)    | | Reward                | rewards:read (Bank, Customer)                              |                                               | rewards:execute (Bank)                           | | Trade                 | trades:read (Organization, Bank, Customer)                 |                                               | trades:execute (Organization, Bank, Customer)    | | Transfer              | transfers:read (Organization, Bank, Customer)              |                                               | transfers:execute (Organization, Bank, Customer) | | Workflow              | workflows:read (Organization, Bank, Customer)              |                                               | workflows:execute (Bank, Customer)               |  ## Available Endpoints  The available APIs for the [Identity](https://id.sandbox.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.sandbox.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.sandbox.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Service  | Model                | API Endpoint Path              | Description                                                                                       | |--------------|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                 | /api/bank_applications         | Create and list banks                                                                             | | Identity     | CustomerToken        | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Identity     | Organization         | /api/organization_applications | Create and list organizations                                                                     | | Organization | Organization         | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Account              | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Asset                | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | Bank                 | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | BankVerificationKey  | /api/bank_verification_keys    | Create, list and retrive verification keys, used for signing identities                           | | Bank         | Customer             | /api/customers                 | Create and list customers                                                                         | | Bank         | DepositAddress       | /api/deposit_addresses         | Create, get and list deposit addresses                                                            | | Bank         | ExternalBankAccount  | /api/external_bank_accounts    | Create, get and list external bank accounts, which connect customer bank accounts to the platform | | Bank         | ExternalWallet       | /api/external_wallets          | Create, get, list and delete external wallets, which connect customer wallets to the platform     | | Bank         | IdentityVerification | /api/identity_verifications    | Create and list identity verifications, which are performed on customers for KYC                  | | Bank         | Price                | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quote                | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Reward               | /api/rewards                   | Create a new reward (automates quote/trade for simplicity)                                        | | Bank         | Symbol               | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Trade                | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Transfer             | /api/transfers                 | Create, get and list transfers (e.g., funding, book)                                              | | Bank         | Workflow             | /api/workflows                 | Create, get and list workflows                                                                    |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` typically does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where `Sandbox` is the environment that you would test, prototype and build in prior to moving to `Production`.  An `Organization` can have multiple `banks`, in either `Sandbox` or `Production` environments. A `Sandbox Bank` will be backed by stubbed data and process flows. For instance, funding source transfer processes as well as trades will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amount of simulated fiat currency for testing purposes.  **Customers**  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified (i.e., KYC\'d) in our system before they can play any part on the platform, which means they must have an associated and a passing `Identity Verification`. See the Identity Verifications section for more details on how a customer can be verified.  `Customers` must also have an `Account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.71.31
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
import { ErrorResponseBankModel } from '../model/errorResponse';
// @ts-ignore
import { IdentityRecordBankModel } from '../model/identityRecord';
// @ts-ignore
import { IdentityRecordListBankModel } from '../model/identityRecordList';
// @ts-ignore
import { PostIdentityRecordBankModel } from '../model/postIdentityRecord';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class IdentityRecordsService {

    protected basePath = 'https://bank.sandbox.cybrid.app';
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
     * Create Identity Record
     * Creates an identity record.  ## Identity Records  Identity Records verify an individual for inclusion on the platform. This know-your-customer (KYC) process is a requirement for individuals to be able to transact. At present, we offer support for Attestation Identity Records.  Once an Identity Record has been submitted, it will be reviewed by our system and transit through a lifecycle before ultimately being &#x60;verified&#x60; or &#x60;failed&#x60;. If an Identity Record is ends up &#x60;failed&#x60;, contextual information as to the reason may be provided on the resource and additional attempts can be made.  ## Attestation Identity Records  An Attestation Identity Record is a confirmation of fact that the Organization has completed their own KYC process and can vouch for its correctness.  Prior to uploading &#x60;verified&#x60; attestation identity records, an Organization must register their signing public key with their Bank through the create Verification Key API.  To create an attestation identity record, a signed JWT is required as proof that the Customer\&#39;s identity has been verified by the Organization. When creating the JWT, the Organization must use the RS512 signing algorithm.  The JWT must contain the following headers:  - **alg**: The RS512 algorithm value, e.g., \&#39;RS512\&#39;. - **kid**: Set to the guid of the verification key that has been registered for the Bank  The JWT must contain the following claims:  - **iss**: Set to http://api.cybrid.app/banks/{bank_guid} - **aud**: Set to http://api.cybrid.app - **sub**: Set to http://api.cybrid.app/customers/{customer_guid} - **iat**: Set to the time at which the JWT was issued - **exp**: Set to the time after which the JWT expires - **jti**: Set to a unique identifier for the JWT  Example code (python) for generating an Attestation Identity Record JWT token:  &#x60;&#x60;&#x60;python # Assumes an RSA private key has been generated (&#x60;private_key&#x60;), a Verification Key has been created and a &#x60;verification_key_guid&#x60; is available. # # &#x60;customer_guid&#x60; should be set to the guid assigned to a Customer that has been created. # &#x60;bank_guid&#x60; should be set to the guid of your bank #  import uuid  from datetime import datetime, timezone, timedelta from jwcrypto import jwt, jwk from cryptography.hazmat.primitives import serialization from cryptography.hazmat.primitives.serialization import load_pem_private_key  algorithm &#x3D; \&#39;RS512\&#39; issued_at &#x3D; datetime.now(timezone.utc) expired_at &#x3D; issued_at + timedelta(days&#x3D;365)  with open(\&quot;verification_key.pem\&quot;, \&#39;rb\&#39;) as pem_in:   pem_lines &#x3D; pem_in.read()  private_key &#x3D; load_pem_private_key(pem_lines, None)  ### DISCLAIMER:- Since NO ENCRYPTION is used in the key storage/formatting. Please DO NOT use this code in production environment. signing_key &#x3D; jwk.JWK.from_pem(     private_key.private_bytes(         encoding&#x3D;serialization.Encoding.PEM,         format&#x3D;serialization.PrivateFormat.PKCS8,         encryption_algorithm&#x3D;serialization.NoEncryption()     ) ) signing_key.update({\&quot;kid\&quot;: verification_key_guid})  attestation_jwt &#x3D; jwt.JWT(     header&#x3D;{         \&quot;alg\&quot;: algorithm,         \&quot;kid\&quot;: verification_key_guid     },     claims&#x3D;{         \&quot;iss\&quot;: f\&quot;http://api.cybrid.app/banks/{bank_guid}\&quot;,         \&quot;aud\&quot;: \&quot;http://api.cybrid.app\&quot;,         \&quot;sub\&quot;: f\&quot;http://api.cybrid.app/customers/{customer_guid}\&quot;,         \&quot;iat\&quot;: int(issued_at.timestamp()),         \&quot;exp\&quot;: int(expired_at.timestamp()),         \&quot;jti\&quot;: str(uuid.uuid4())     },     key&#x3D;signing_key,     algs&#x3D;[algorithm] ) attestation_jwt.make_signed_token(signing_key)  token &#x3D; attestation_jwt.serialize(compact&#x3D;True) print(\&quot;Token is : \&quot;, token) &#x60;&#x60;&#x60;  ## Default Attestation Signing Key  The Cybrid Sandbox environment comes provisioned with a default signing key that can be used to perform identity record attestation. The default identity signing key provides a convenient starting point for testing Sandbox flows that require identity attestation, such as executing trades.  The signing key can be loaded directly into a client application by passing its PEM encoded value as an environment variable.  &#x60;&#x60;&#x60; -----BEGIN PRIVATE KEY----- MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZ75nSfJy/eeuj 4f7EK7i+n4FUDE8BsD/acCdk9Pn56suuDc3SFcMoyjBIoDLZkbRsVfmBEcPDNJOp GNqzoaXa7qe7Yw0qpK9MbNbAYxiyAfxwVHM+ZpwP6M/r3LmsCRFXgNdCjfOzok7u V59hDjfHMMQm/M9ztGVhaJpgozY/7DKk+R6qY/DEBs63eXwfcHE0u0NbS8Y9Qp+6 7cB2f1iuy++5Uut1vx4qdgZ4UFMkwIdTWl/e6LDcdXhk3///T5WOnDlI+S4rhGUO xsAOfOa+T9uqYBr2hbQR9emTEYmwF1lgZ7VU4S9sSjAMKpB/TVlVVOsNhdNSGg6f 6hu7fuadAgMBAAECggEBAMUJL1VyfHVRUY5VoPTTYrBVnaPTjQrFwrVHeRZ5thgS BBxVNqSeMFgMlSLUU6UJasoX4QCkgw1V17qmUfTeTQlnhBaTMzA+vI6oSHCgJ4+o 5AbbE2Zzdt2ba4Cfiu7TM+6c+gGePZtHP32Vku84340jtfRZ1WWSz6YF4K1GYqHe y7I4POotHu2WcSTXYKs2zTu5KAO7gvx7yITVytaiUGUHk9FNyZPDIh0u7e9CAEti BangdYTfvbXAIx9lrg3XQ4gtFXTd0aY/3R9K3SE+s5iWh/SabjV4U7x+MuHZS5kv 8rcLCPQ5kUgiF4bQMy7QznUuNso65SbRJKHaU8UAuIECgYEA7+bNdz/uiN/JxUJY 3xwjD+CG4vXOyEmCioBjllYBeXQyB/VrsdzVrdF2JiECnStPRH6/6nd7/wUcLORv NyrQqnCa5/O8Kv9Z3t4TmxYf+ECIgx+gazehQHptUkr8QWtxceorUC9pu4cUJ8z3 nQLCggHYQ3g7xj73LLZ+5QQBC8kCgYEA6I91Dgs+HZWDMMcGbKV2cMkXK8BTOgZZ 6B6i6flO4tf9U2CPBZsjYLBN5EEuxxy9Yl7rlV7CxAhnnjdIKk2jQbzTPI0qmJfp 397rvdR8bur1OkALj2Tb39fz8z1Qy7AcN8siqXuortZZ5OI9XRWgnG/3B4gUFOnW 4Mr0dhfaxjUCgYEAmVcricehjneMnrtz1thDSQi47yUzES57dE/wV82Nj7ZHrHKg bcW8ByhVnrWG2DMwrZVe0l2hMjZv9fnlZJvHWMo1GYHfipRBO4UzfvO7Z5DIMRfs D9w1A+O9MNahOqeUkb2eBdjoemcy6OXId+Gltje7phSaEHN6xme34GaYzJECgYBP eRbLYdQsT/exJ5JudmzvRgkBDoxie+EljbKmumfW5XDQmWLGy6lfVWCI7C2MJaoi f8WKGgP88dJXIxUqP7XWtSyKuMMhumhV9Nwi1wZe8TQ0X8aTjigFassXCJEfymMa PfTubi/K771wlk/aC5YDX8/PZxVVwEOKNlEsOiKtMQKBgQDqRv5AUHhabqcMfbs7 DTeo/fS/eXJv8MN+CUU2RSrNUKjEdHT2R5KP550TyXr1JXLKpEEZu8wvvaQDV4Dw p0Eij6bKsh03X38NR+C5SxonXPosdvoiXR8uUgya2f/aJYV+aWZ9euFgYZAXf/0Q MnWdKylfZlV50XP2KFn07wPs7w&#x3D;&#x3D; -----END PRIVATE KEY----- &#x60;&#x60;&#x60;  A corresponding public verification key can be retrieved from the Cybrid Banks API using the &#x60;/api/bank_verification_keys&#x60; endpoint. Performing a &#x60;get&#x60; request to this endpoint returns the available Verification Key records, the first of which is the provisioned default. The endpoint can be hit directly or by using the Cybrid Banks API client:  &#x60;&#x60;&#x60;python ... api_client &#x3D; cybrid_api_bank.ApiClient(configuration) api_instance &#x3D; verification_keys_bank_api.VerificationKeysBankApi(api_client) verification_keys &#x3D; api_instance.list_verification_keys() verification_key &#x3D; verification_keys.objects[0] &#x60;&#x60;&#x60;  Once available to the application, the signing key and Verification Key record can be used in conjunction to create the attestation JWT. The Verification Key\&#39;s GUID is passed as the JWT\&#39;s &#x60;kid&#x60; while the signing key is used to sign the JWT.  ## Attestation State  | State | Description | |-------|-------------| | storing | The Platform is storing the attestation in our private store | | pending | The Platform is verifying the attestation\&#39;s JWT | | verified | The Platform has verified the attestation and the customer is able to transact | | failed | The Platform was not able to verify the attestation and the customer is not able to transact |    Required scope: **customers:write**
     * @param postIdentityRecordBankModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createIdentityRecord(postIdentityRecordBankModel: PostIdentityRecordBankModel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<IdentityRecordBankModel>;
    public createIdentityRecord(postIdentityRecordBankModel: PostIdentityRecordBankModel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<IdentityRecordBankModel>>;
    public createIdentityRecord(postIdentityRecordBankModel: PostIdentityRecordBankModel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<IdentityRecordBankModel>>;
    public createIdentityRecord(postIdentityRecordBankModel: PostIdentityRecordBankModel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (postIdentityRecordBankModel === null || postIdentityRecordBankModel === undefined) {
            throw new Error('Required parameter postIdentityRecordBankModel was null or undefined when calling createIdentityRecord.');
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

        return this.httpClient.post<IdentityRecordBankModel>(`${this.configuration.basePath}/api/identity_records`,
            postIdentityRecordBankModel,
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
     * Get Identity Record
     * Retrieves an identity record.  Required scope: **customers:read**
     * @param identityRecordGuid Identifier for the identity record.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getIdentityRecord(identityRecordGuid: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<IdentityRecordBankModel>;
    public getIdentityRecord(identityRecordGuid: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<IdentityRecordBankModel>>;
    public getIdentityRecord(identityRecordGuid: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<IdentityRecordBankModel>>;
    public getIdentityRecord(identityRecordGuid: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (identityRecordGuid === null || identityRecordGuid === undefined) {
            throw new Error('Required parameter identityRecordGuid was null or undefined when calling getIdentityRecord.');
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

        return this.httpClient.get<IdentityRecordBankModel>(`${this.configuration.basePath}/api/identity_records/${encodeURIComponent(String(identityRecordGuid))}`,
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
     * List Identity Records
     * Retrieves a listing of identity records for a bank.  Required scope: **customers:read**
     * @param customerGuid Comma separated customer identifier to list identity records for.
     * @param page 
     * @param perPage 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listIdentityRecords(customerGuid?: string, page?: string, perPage?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<IdentityRecordListBankModel>;
    public listIdentityRecords(customerGuid?: string, page?: string, perPage?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<IdentityRecordListBankModel>>;
    public listIdentityRecords(customerGuid?: string, page?: string, perPage?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<IdentityRecordListBankModel>>;
    public listIdentityRecords(customerGuid?: string, page?: string, perPage?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (customerGuid !== undefined && customerGuid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>customerGuid, 'customer_guid');
        }
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (perPage !== undefined && perPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>perPage, 'per_page');
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

        return this.httpClient.get<IdentityRecordListBankModel>(`${this.configuration.basePath}/api/identity_records`,
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

}
