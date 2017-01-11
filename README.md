# word2vector NodeJS Interface
=============
This is a Node.js interface for Google's [word2vector](https://code.google.com/archive/p/word2vec/).

# Supports Binary model only now.
# Warning: Windows is not supported.

# Installation
Linux, Unix OS are supported.
Install it via npm:
``` bash
npm install word2vector --save
```
In Node.js, require the module as below:
``` javascript
var w2v = require( 'word2vector' );
```
# API Document:
-----------
## Overview
[train](#w2v.train( trainFile, modelFile, options, callback ))
[load](#w2v.load( modelFile ))
[getVector](#w2v.getVector(word="word"))
[getVectors](#w2v.getVectors(words=["word1", "word2"], returnType = "array"))
[getSimilar](w2v.getSimilar(word = "word", returnType = "array"))
[getSimilarSync](w2v.getSimilar(word = "word", returnType = "array"))
[getNearest](w2v.getNearest(vector, returnType = "array"))
[getNearestSync](w2v.getNearestSync(vector, returnType = "array"))

-----------
### w2v.train( trainFile, modelFile, options, callback )
[Click here to see example TrainFile format.](https://github.com/LeeXun/word2vector/blob/master/data/train.data) <br>
Example:
``` javascript
var w2v = require("./lib");
var trainFile = "./data/train.data",
    modelFile = "./data/test.model.bin";
w2v.train(trainFile, modelFile, {
  	cbow: 1,           // use the continuous bag of words model //default
  	size: 10,          // sets the size (dimension) of word vectors // default 100
  	window: 8,         // sets maximal skip length between words // default 5
    binary: 1,         // save the resulting vectors in binary mode // default off
  	negative: 25,      // number of negative examples; common values are 3 - 10 (0 = not used) // default 5
  	hs: 0,             // 1 = use  Hierarchical Softmax // default 0
  	sample: 1e-4,      
  	threads: 20,
  	iter: 15,
  	minCount: 1,       // This will discard words that appear less than *minCount* times // default 5
    logOn: false       // sets whether any output should be printed to the console // default false
  });
```

### w2v.load( modelFile )
Should load model before call any calcuation functions.
Will auto detect mime_type ,but unbinary reading is still constructing.
Example:
``` javascript
var w2v = require("../lib");
var modelFile = "./test.model.bin";
w2v.load( modelFile );
// console.log(w2v.getSimilar());
```

### w2v.getVector(word="word")
| Params        |   Description                | Default Value |
| ------------- |:-------------:| -----:|
| word          | String to be searched.       |     "word"    |
Example:
``` javascript
var w2v = require("../lib");
var modelFile = "./test.model.bin";
w2v.load( modelFile );
console.log(w2v.getVector("word"));
```
Sample Output:
``` javascript
// Array Type Only
[ 0.021231,
  -0.177243,
  -0.679957,
  -0.576205,
  0.018885,
  0.000147,
  0.065118,
  -0.083467,
  0.064625,
  -0.397542 ]
```

### w2v.getVectors(words=["word1", "word2"], returnType = "array")
| Params        |   Description                           | Default Value |
| ------------- |:-------------:| -----:|
| words          | Array of strings to be searched.       |     "word"    |
| returnType    | return Array or Object type             | Array         |
<table>
<tr>
<td>
Example:
<code>
var w2v = require("./lib");  
var modelFile = "./data/test.model.bin";
w2v.load( modelFile );
console.log(w2v.getVectors(["唐三藏", "孫悟空"]));
</code>
</td>
<td>
Example:
<code lang="js">
var w2v = require("./lib");  
var modelFile = "./data/test.model.bin";
w2v.load( modelFile );
console.log(w2v.getVectors(["唐三藏", "孫悟空"], "Object"));
</code>
</td>
</tr>
<tr>
<td>
Sample Output:
<code lang="js">
// Array Type
[ { word: '唐三藏',
    vector:
     [ 0.021231,
       -0.177243,
       -0.679957,
       -0.576205,
       0.018885,
       0.000147,
       0.065118,
       -0.083467,
       0.064625,
       -0.397542 ] },
  { word: '孫悟空',
    vector:
     [ 0.104406,
       -0.160019,
       -0.604506,
       -0.622804,
       0.039482,
       -0.120058,
       0.073555,
       0.05646,
       0.099059,
       -0.419282 ] } ]
</code>
</td>
<td>
``` javascript
// Object Type
{ '唐三藏':
   [ 0.021231,
     -0.177243,
     -0.679957,
     -0.576205,
     0.018885,
     0.000147,
     0.065118,
     -0.083467,
     0.064625,
     -0.397542 ],
  '孫悟空':
   [ 0.104406,
     -0.160019,
     -0.604506,
     -0.622804,
     0.039482,
     -0.120058,
     0.073555,
     0.05646,
     0.099059,
     -0.419282 ] }
```
</td>
</tr>
</table>
### w2v.getSimilar(word = "word", returnType = "array")
### w2v.getSimilarSync(word = "word", returnType = "array")
Return 40ish words that is similar to "word".
| Params        |   Description                           | Default Value |
| ------------- |:-------------:| -----:|
| word          | Strings to be searched.                 |     "word"    |
| returnType    | return Array or Object type             | Array         |
Example:
``` javascript
var w2v = require("../lib");
var modelFile = "./test.model.bin";
w2v.load( modelFile );
console.log(w2v.getSimilar()); //
```
Sample Output:
``` javascript
// Array Type
[ { word: '唐三藏', cosineDistance: '0.974369' },
  { word: '林黛玉', cosineDistance: '0.951022' },
  { word: '神通廣大', cosineDistance: '0.941816' },
  { word: '賈寶玉', cosineDistance: '0.936503' },
  { word: '吳承恩', cosineDistance: '0.933682' },
  { word: '北地', cosineDistance: '0.927531' },
  { word: '乾燥', cosineDistance: '0.923066' },
  { word: '薊', cosineDistance: '0.921219' },
  { word: '沙悟淨', cosineDistance: '0.920015' },
  { word: '楚霸王', cosineDistance: '0.918935' },
  { word: '尋寶', cosineDistance: '0.912401' },
  { word: '唐僧', cosineDistance: '0.909721' },
  { word: '蒲松齡', cosineDistance: '0.908023' },
  { word: '梁山泊', cosineDistance: '0.901515' },
  { word: '日月蝕', cosineDistance: '0.900456' },
  { word: '薩鎮冰', cosineDistance: '0.900079' },
  { word: '聊齋志異', cosineDistance: '0.898957' }... ...]
// Object Type
{ '唐三藏': '0.974369',
  '林黛玉': '0.951022',
  '神通廣大': '0.941816',
  '賈寶玉': '0.936503',
  '吳承恩': '0.933682',
  '北地': '0.927531',
  '乾燥': '0.923066',
  '薊': '0.921219',
  '沙悟淨': '0.920015',
  '楚霸王': '0.918935',
  '尋寶': '0.912401',
  '唐僧': '0.909721',
  '蒲松齡': '0.908023',
  '梁山泊': '0.901515',
  '日月蝕': '0.900456',
  '薩鎮冰': '0.900079',
  '聊齋志異': '0.898957',... ...}
```

### w2v.getSimilarAsync(word = "word", returnType = "array", callback)
...........................Constructing...............................

### w2v.getNearest(vector, returnType = "array")
### w2v.getNearestSync(vector, returnType = "array")
| Params        |   Description                           | Default Value |
| ------------- |:-------------:| -----:|
| vector        | Vector to be searched.                  |     "word"    |
| returnType    | return Array or Object type             | Array         |
Example1:
``` javascript
var w2v = require("../lib");
var modelFile = "./test.model.bin";
w2v.load( modelFile );
var a = w2v.getNearest(w2v.getVector('唐三藏'));
console.log(a);
// vector can do substractioin, while this didn't  mean anything. But you can create a vector by yourself.
```
Sample Output1:
``` javascript
[ { word: '唐三藏', cosineDistance: 1 },
  { word: '孫悟空', cosineDistance: 0.974369 },
  { word: '吳承恩', cosineDistance: 0.96686 },
  { word: '林黛玉', cosineDistance: 0.966664 },
  { word: '北地', cosineDistance: 0.96264 },
  { word: '賈寶玉', cosineDistance: 0.962137 },
  { word: '楚霸王', cosineDistance: 0.955795 },
  { word: '梁山泊', cosineDistance: 0.932804 },
  { word: '濮陽', cosineDistance: 0.927542 }, ... ...]
```
Example2:
``` javascript
var w2v = require("../lib");
var modelFile = "./test.model.bin";
w2v.load( modelFile );
var a = w2v.getVectors(['唐三藏'], "Object")['唐三藏'];
var b = w2v.getVectors(['孫悟空'], "Object")['孫悟空'];
var c = [];
for(var i=0; i<a.length; i++) c.push(a[i] - b[i]);
var d = w2v.getNearest(c);
console.log(d);
// vector can do substractioin, while this didn't  mean anything. But you can create a vector by yourself.
```
Sample Output2:
``` javascript
[ { word: '蒙上帝', cosineDistance: 0.794216 },
  { word: '阿房宮賦', cosineDistance: 0.787006 },
  { word: '玄秘', cosineDistance: 0.770159 },
  { word: '檀香山', cosineDistance: 0.755662 },
  { word: '先賢祠', cosineDistance: 0.746278 },
  { word: '蘇萊曼', cosineDistance: 0.745826 },
  { word: '盧梭', cosineDistance: 0.704465 },
  { word: '夏威夷', cosineDistance: 0.700885 },
  { word: '伏爾泰', cosineDistance: 0.698588 },
  { word: '杜爾哥', cosineDistance: 0.688763 },
  { word: '祝你們', cosineDistance: 0.687257 } ... ...],
```
