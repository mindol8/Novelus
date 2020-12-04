var express = require('express');
var path = require('path');
var http = require('http');
var bodyparser = require('body-parser');
//var static = require('serve-static');
var Web3 = require("web3");
const { constant } = require('async');
//var ejs = require('ejs');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000); //포트 지정
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',__dirname + '/views');
app.set('views engin','ejs');
app.engine('html',require('ejs').renderFile);

var router = express.Router();
app.use('/', router);

app.use(function (req, res) {
    res.render('index.ejs');
})
//ethereum
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	

var abi =[{"inputs":[],"name":"getdata","outputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"t","type":"uint256"},
{"internalType":"string","name":"n","type":"string"},{"internalType":"string","name":"o","type":"string"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"string","name":"na","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"string","name":"no","type":"string"}],"name":"setNovel","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"setTotalAmount","outputs":[],"stateMutability":"nonpayable","type":"function"}]

function constructContract(sourceContract,res,account,amount,total_amount,name,novel){
    var contract = sourceContract.new(amount,total_amount,name,novel,
        {
            from:account[0],
            data:'0x608060405234801561001057600080fd5b506105aa806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063271f88b41461005c5780634fa10cfc1461008a57806360df8a1f14610187578063b733183d146101b5578063c47f002714610270575b600080fd5b6100886004803603602081101561007257600080fd5b810190808035906020019092919050505061032b565b005b610092610335565b604051808581526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156100e25780820151818401526020810190506100c7565b50505050905090810190601f16801561010f5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561014857808201518184015260208101905061012d565b50505050905090810190601f1680156101755780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b6101b36004803603602081101561019d57600080fd5b810190808035906020019092919050505061048b565b005b61026e600480360360208110156101cb57600080fd5b81019080803590602001906401000000008111156101e857600080fd5b8201836020820111156101fa57600080fd5b8035906020019184600183028401116401000000008311171561021c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610495565b005b6103296004803603602081101561028657600080fd5b81019080803590602001906401000000008111156102a357600080fd5b8201836020820111156102b557600080fd5b803590602001918460018302840111640100000000831117156102d757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506104af565b005b8060008190555050565b60008060608060005460015460026003818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103da5780601f106103af576101008083540402835291602001916103da565b820191906000526020600020905b8154815290600101906020018083116103bd57829003601f168201915b50505050509150808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104765780601f1061044b57610100808354040283529160200191610476565b820191906000526020600020905b81548152906001019060200180831161045957829003601f168201915b50505050509050935093509350935090919293565b8060018190555050565b80600390805190602001906104ab9291906104c9565b5050565b80600290805190602001906104c59291906104c9565b5050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826104ff5760008555610546565b82601f1061051857805160ff1916838001178555610546565b82800160010185558215610546579182015b8281111561054557825182559160200191906001019061052a565b5b5090506105539190610557565b5090565b5b80821115610570576000816000905550600101610558565b509056fea2646970667358221220f541c5aab0bd63e654b5dc27ba69fefa4d9b5c875dcba2330318d507de92d41164736f6c63430007050033',
            gas:'4700000'
        },(e,contract)=>{
            console.log(e,contract);        
            console.log("start mining.....");
            console.log("address:"+contract.address);  
            for(var i=0;i<100;i++){
                if ( typeof contract.address != 'undefined') {
                    console.log('Address: ' + contract.address);
                    key_address = contract.address;
                    var c_k = web3.eth.contract(abi).at(key_address);                   
                    res.send(key_address);
                    break;
                 }
                else{
                    console.log("mining...");
                }                 
          }
          console.log("timeout");
         
        });
}

router.post('/funding',(req,res)=>{
    var amount = req.body.amount;
    var novel = req.body.novel;
    var total_amount = req.body.total;
    var name = req.body.name;
    console.log(amount,name,total_amount,novel);
    if(web3.personal.unlockAccount(web3.eth.accounts[0],"admin")){
        console.log("unlock clear");
        var account = web3.eth.accounts;   
        var sourceContract = web3.eth.contract(abi);
    constructContract(sourceContract,res,account,amount,total_amount,name,novel);
    }
})

http.createServer(app).listen(app.get('port'),  function () {
    console.log("익스프레스로 웹 서버를 실행함 : " + app.get('port'));
}) //express를 이용해 웹서버 만든다