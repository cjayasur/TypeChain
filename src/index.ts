import *  as CryptoJS from "crypto-js";

const name = "Nicolas",
    age = 24,
    gender = "male";

interface Human {
    name: String,
    age: Number,
    gender: String
}

class HumanClass {
    public name: String;
    public age: Number;
    public gender: String;
    private employed: Boolean;

    constructor(name: String, age:Number, gender:String, employed?: Boolean){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.employed = employed?? false;
    }
    isEmployed() : Boolean {
        return this.employed;
    }
}

const person =  {
    name : "Nicolas",
    age : 24,
    gender : "male",

}

const cj: Human = {
    name: "Charitha",
    age: 52,
    gender: "male",
}

const lynn = new HumanClass("Lynn", 18, "female");

const sayHi = (name, age, gender) => {
    console.log(`Hello ${name}, your are ${age}, you are a ${gender} !`);
}
const sayHiTyped = (name: String , age: Number, gender?: String): string => {
   return `Hello ${name}, your are ${age}, you are a ${gender} !! `;
}
const sayHiObjectTyped = (person: HumanClass): string => {
   // debugger;
   const employment_status = person.isEmployed()?? "false"
   return `Hello ${person.name}, your are ${person.age}, you are a ${person.gender} !!! `;
}
//Now if we try to push some grabage in to the blockchain array otherthan a block object will fail

//blockchain.push("Grabage");
//src/index.ts(80,17): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Block'.




//sayHi(name, age, gender);
//console.log(sayHiTyped("Charitha", 52));
//console.log(sayHiObjectTyped(cj));



//Block Chain class
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor( index: number, hash: string, previousHash: string,
         data: string, timestamp: number){
            this.index = index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;
         }

    static calculateBlockHash(index: number,  previousHash: string,
         timestamp: number, data: string): string{
             return CryptoJS.SHA256( index + previousHash + timestamp + data);
         }
    static validateStructure = (aBlock: Block): boolean => (
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number"
    )          
}
    
const genesisBlock: Block = new Block(0,"202020202020", "", "Hello", 123456);

let blockchain: [Block] = [genesisBlock];


const getBlockchain = () => blockchain;

const getLatestBlock = () => blockchain[blockchain.length - 1];

const getNewTimeStamp = () => Math.round(new Date().getTime()/ 1000);

const createNewBlock = (data) => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash,
        newTimestamp, data);
    
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    )    
    addBlock(newBlock);
    return newBlock;
}

const getBlockHash = (aBlock: Block): string => Block.calculateBlockHash(
    aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    
    if(!Block.validateStructure(candidateBlock))
        return false;
    else if((previousBlock.index + 1) !== candidateBlock.index){
        return false;
    }else if(previousBlock.hash !== candidateBlock.hash){
        return false;

    }else if (getBlockHash(candidateBlock) !== candidateBlock.hash){
        return false;
    }else 
        return true;
}        

const addBlock = (candidateBlock): void => {
    if(isBlockValid(candidateBlock,getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

//create two new
console.log(createNewBlock("second"), createNewBlock("third"));

console.log(blockchain);

export {}    /* This is how you tell typescript that his is a module need to do that otherwise
will not compile */
