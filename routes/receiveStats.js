const express = require('express');
const path = require('path');
const axios = require('axios');
const router = express.Router();

router.get("/", function(req, res) {
    let dayOne;
    let lastDay;
    let country;
    let dailyCasesDayOne;
    let dailyCasesLastDay;
    let totalCasesDayOne;
    let totalCasesLastDay;
    let totalRecoveriesDayOne;
    let totalRecoveriesLastDay;
    let API_URL = 'https://api.thevirustracker.com/free-api?countryTimeline=EE';

    axios.get(API_URL)
        .then(function(response){
            console.log(response.data);
            let objlength = Object.keys(response.data.timelineitems[0]).length;
            let dates = Object.keys(response.data.timelineitems[0])
            let object = Object.values(response.data.timelineitems[0])  
            console.log(objlength);  
            console.log(dates[0]);
            console.log("Juhtumid: " + object[0].new_daily_cases);
            console.log(dates[objlength - 2]);
            console.log("Juhtumid: " + object[objlength - 2].new_daily_cases);
            console.log("-END-");
            dayOne = dates[0];
            country = response.data.countrytimelinedata[0].info.title;
            console.log(country);
            lastDay = dates[objlength - 2];
            dailyCasesDayOne = object[0].new_daily_cases;
            dailyCasesLastDay = object[objlength - 2].new_daily_cases;
            totalCasesDayOne = object[0].total_cases;
            totalCasesLastDay = object[objlength - 2].total_cases;
            totalRecoveriesDayOne = object[0].total_recoveries;
            totalRecoveriesLastDay = object[objlength - 2].total_recoveries;
        })

        .catch(function (error) {
            console.log(error);
        })
        .finally(function (){
            
                res.render('receiveStats', {
                headerTitle: "Kald's EJS Countries",
                pageTitle: 'COVID-19 Stats in ' + country,
                pageInfo: 'COVID-19 stats are shown in the table below',
                firstDay: dayOne,
                lastDay: lastDay,
                cDayOne: dailyCasesDayOne,
                cLastDay: dailyCasesLastDay,
                totCDayOne: totalCasesDayOne,
                totCLastDay: totalCasesLastDay,
                totRecDayOne: totalRecoveriesDayOne,
                totRecLastDay: totalRecoveriesLastDay,
                path: "/",

            });
        });

})
exports.Router = router;