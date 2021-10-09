// modules require
// minimist axios excel4node pdf-lib jsdom

// node index.js --source="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --excel="worldcup.csv" --dataFolder="data"


const minimist = require('minimist')
const axios = require('axios');
const jsdom = require('jsdom');
const excel = require('excel4node');
const pdf = require('pdf-lib');
const {JSDOM} = jsdom;
let args = minimist(process.argv);

console.log(args.source);
// console.log(args.excel);
// console.log(args.dataFolder);


// TODO: download data using axios
// TODO: read using jsDOM
// TODO: make excel using pdf-lib
let MatchesInfo = []


let ResponsePromise = axios.get(args.source);

ResponsePromise.then(function(response){    
        let html = response.data;
        // console.log(html);
        let dom = new jsdom.JSDOM(html);
        let document = dom.window.document;

        let matchInfo = document.querySelectorAll('div.match-score-block');


        
        for(let i = 0; i<matchInfo.length;i++){
            let teamName = matchInfo[i].querySelectorAll('div.team p.name');
            let scoreSpan = matchInfo[i].querySelectorAll("div.score-detail > span.score");
            let status = matchInfo[i].querySelector('div.status-text span');
            let match = {

            }
            let score_01 = "";
            let score_02 = "";
            if(scoreSpan.length===2){
                score_01 = scoreSpan[0].textContent;
                score_02 = scoreSpan[1].textContent;
            }else if(scoreSpan.length=== 1){
                score_01 = scoreSpan[0].textContent;
                score_02 = "";
            }else {
                score_01 = "";
                score_02 = "";
            }
            match.team_01 = teamName[0].textContent;
            match.team_02 = teamName[1].textContent;
            match.result = status.textContent;
            match.team_01_score = score_01;
            match.team_02_score = score_02;


            MatchesInfo.push(match);
        }
        console.log(MatchesInfo);

}).catch(function(err){
    console.log(err);
});
