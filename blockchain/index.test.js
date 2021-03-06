const BlockChain = require('./index');
const Block = require('./block');

describe('Blockchain', ()=>{
    let bc, bc2;
    
    beforeEach(()=>{
        bc = new BlockChain();
        bc2 = new BlockChain();
    });
    
    it('first Block is genesis block', ()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    
    it('block added show correct data', ()=>{
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
    
    it('validates a valid chain', ()=>{
        bc2.addBlock('foo');
        
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });
    
    it('invalidates a corrupt genesis block', ()=>{
        bc2.chain[0].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('invalidates a corrupt block apart from genesis block', ()=>{
        bc2.addBlock('foo');
        bc2.chain[1].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('new chain can replace existing chain if its size is greater and its valid', ()=>{
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });
    
    it('new chain can not replace existing chain if its size is lesser and its not valid', ()=>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
})