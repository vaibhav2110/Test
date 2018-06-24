const BlockChain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', ()=>{
    let bc;
    
    beforeEach(()=>{
        bc = new BlockChain();
    });
    
    it('first Block is genesis block', ()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    
    it('block added show correct data', ()=>{
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
})