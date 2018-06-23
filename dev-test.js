const Block = require('./block');

const fooBlock = Block.mineBlock(Block.genesis(), 'test-data');
console.log(fooBlock.toString());