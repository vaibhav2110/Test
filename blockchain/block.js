const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }
    
    toString(){
        return `Block -
            Timestamp: ${this.timestamp},
            LastHash:  ${this.lastHash.substring(0, 10)},
            Hash:      ${this.hash.substring(0,10)},
            Data:      ${this.data},
            Difficulty:${this.difficulty},
            Nonce:     ${this.nonce}
            `
    }
    
    static genesis(){
        return new this('Genesis-time', '-----', 'f1R5T-H45H', [], 0, DIFFICULTY);
    }
    
    static mineBlock(lastBlock, data){
        let timeStamp, hash;
        let nonce = 0;
        let { difficulty } = lastBlock;
        const lastHash = lastBlock.hash;
        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timeStamp);
            hash = Block.hash(timeStamp, lastHash, data, nonce, difficulty);
            
        }while(hash.substring(0, difficulty)!== '0'.repeat(difficulty));
        
        
        return new this(timeStamp, lastHash, hash, data, nonce, difficulty);
    }
    
    static adjustDifficulty(lastBlock, timeStamp){
        let { difficulty } = lastBlock;
        difficulty = timeStamp - lastBlock.timestamp > MINE_RATE ? difficulty-1 : difficulty+1;
        return difficulty;
    }
    
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }
    
    static hashBlock(block){
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }
}

module.exports = Block;