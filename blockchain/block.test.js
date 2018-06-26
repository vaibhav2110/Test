const Block = require('./block');

describe('Block', ()=>{
    let data, lastBlock, block;
    
    beforeEach(()=>{
        data = 'foo';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });
    
    it('sets the `data` to match the input', ()=>{
        expect(block.data).toEqual(data);
    });
    
    it('sets the `lastHash` to match the hash of lastBlock', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
    
    it('sets the `Hash` according to the difficulty', ()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });
    
    it('decreases the `difficulty` if the block takes large time to mine', ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+36000)).toEqual(block.difficulty-1);
    });
    it('increases the `difficulty` if the block takes less time to mine', ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+10)).toEqual(block.difficulty+1);
    });
    
    
});