const fs = require('fs');
const path = require('path');
let exp = 100;
let expAcc = 0;
let array = [];

for (i = 1; i <= 100; i++) {
  let level = {
    lvl: i,
    expToNextLevel: exp.toFixed(0),
    accumulatedExp: expAcc.toFixed(0),
  };
  exp = exp * 1.07;
  expAcc = expAcc + exp;
  //   console.log(`Level: ${i} exp: ${exp.toFixed(0)}, expAcc: ${expAcc.toFixed(0)}`);
  array.push(level);
}

const expPath = path.join(__dirname, 'data', 'exp_table.json');
console.log(expPath);

async function createFile() {
  if (!fs.existsSync(expPath)) {
    fs.writeFileSync(expPath, JSON.stringify(array), (err) => {
      console.log('criou');
      if (err) throw err;
    });
  }
}
createFile();
