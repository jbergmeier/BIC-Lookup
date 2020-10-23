const express = require('express');
const router = express.Router();
const bankCodes = require('../data/bankCode_initial.json')

// Routes 
router.get('/:iban', function (req, res, next) {
    const iban = req.params.iban
    countryCode = iban.substring(0,2) 
    const ibanLength = iban.length

    try {
        switch (countryCode){
            case 'DE':
              if(ibanLength != 22) res.json({message: 'IBAN Length is not correct', responseCode: '200.101'})
      
              // Get BankCode (Country Specific)
              const bankCode = iban.substring(4,12)
              const bankSearchResult = bankCodes.filter(it => it.bankCode === bankCode)
              if(bankSearchResult == '') res.json({message: 'BIC not found for used IBAN', iban, bankCode, responseCode: '200.102'})
                console.log(bankSearchResult)
              res.status(200).json({
                iban,
                bankCode,
                bic: bankSearchResult[0].bic,
                bankName: bankSearchResult[0].description,
                country: countryCode,
                responseCode: '200'
              })
                
              break;
            default:
              res.status(400).json({message: 'No Valid Iban for allowed countries'})
          }
    } catch (err) {
        next(err)
    }
})


module.exports = router;