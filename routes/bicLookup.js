const express = require('express');
const router = express.Router();
const bankCodes = require('../data/bankCode_initial.json')

// Routes 
router.get('/:iban', function (req, res, next) {
    let iban = req.params.iban
    countryCode = iban.substring(0,2) 
    const ibanLength = iban.length

    iban = iban.split(" "). join("")
    let bankCode = ''
    let bankSearchResult = ''

    const sendResponse = (message, error) => {
      if(message) {
        res.status(200).json({
          iban: message.iban,
          bankCode: message.bankCode,
          bic: message.bic,
          bankName: message.bankName,
          country: message.country,
          responseCode: '200'
        })
      }
      else {
        res.status(400).json({
          message: error.message,
          reponseCode: '400.101'
        })
      }
    }


    try {
        switch (countryCode){
            
            // DE - Germany
            case 'DE':
              if(ibanLength != 22) res.json({message: 'IBAN Length is not correct', responseCode: '200.101'})
      
              // Get BankCode (Country Specific)
              bankCode = iban.substring(4,12)
              bankSearchResult = bankCodes.filter(it => it.bankCode === bankCode)
              if(bankSearchResult == '') res.json({message: 'BIC not found for used IBAN', iban, bankCode, responseCode: '200.102'})
                console.log(bankSearchResult)
              sendResponse({
                iban,
                bankCode,
                bic: bankSearchResult[0].bic,
                bankName: bankSearchResult[0].description,
                country: countryCode,
              }, '')
                
              break;

            // AT - Austria
            case 'AT':
                if(ibanLength != 20) res.json({message: 'IBAN Length is not correct', responseCode: '200.101'})  

                // Get BankCode (Country Specific)
                bankCode = iban.substring(4,9)
                bankSearchResult = bankCodes.filter(it => it.bankCode === bankCode)
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
              //res.json({message: 'No Valid Iban for allowed countries (DE, AT)'})
              sendResponse('', {message: 'No Valid Iban for allowed countries (DE, AT)'})
          }
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;


