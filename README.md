# BIC-Lookup
This tool provides a valid BIC to an IBAN

## Supported Countries
Right now the follwing Countries are supported
- DE (Germany)

## Endpoints
#### GET /getBic/:iban
This Endpoint identifies the country and is doing some basic checks. Afterwards the BIC will be looked up.
Can be accessed by browser (GET)
```json
{
"iban": "DE04710500000000030635",
"bankCode": "71050000",
"bic": "BYLADEM1BGL",
"bankName": "Sparkasse Berchtesgadener Land",
"country": "DE",
"responseCode": "200"
}
```

Message if BIC cannot be found (e.g. IBAN is not correct)
```json
{
"message": "BIC not found for used IBAN",
"iban": "DE24699923280000053457",
"bankCode": "69992328",
"responseCode": "200.102"
}
```