var path = require( 'path' );
var utils = {};
const ROOT_DIR = path.join( __dirname, '..' );
const SRC_DIR = ROOT_DIR + '/src/';
const TEST_DIR = ROOT_DIR + '/test/';
const TESTDATA_DIR = TEST_DIR + '/testdata/';
utils.ROOT_DIR = ROOT_DIR;
utils.SRC_DIR = SRC_DIR;
utils.TESTDATA_DIR = TESTDATA_DIR;
module.exports = utils;