const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const translate = require('@iamtraction/google-translate');

const dataPath = path.join(__dirname, 'data', 'location_areas.json');

async function getEncounterMethodData() {
  arrName = [];
  const result = await fetch(`https://pokeapi.co/api/v2/location-area?limit=200&offset=0`);
  const dataResult = await result.json().then((data) =>
    data.results.forEach((element) => {
      let noHyphen = element.name.replaceAll('-', ' ');
      let mtTrade = noHyphen.replaceAll('mt', 'monte');
      console.log(mtTrade);
      arrName.push(mtTrade);
    })
  );

  return arrName;
}

async function translateIt() {
  const array = await getEncounterMethodData();
  const arrayTranslated = [];
  for (item in array) {
    const itemTranslated = translate(array[item], { to: 'pt' })
      .then((res) => {
        let string = res.text;
        // console.log(string);
        let n = string.search(/[0-9]{1}[a-z]{1}/);
        // console.log(n);

        function setCharAt(str, index, chr) {
          if (index > str.length - 1) return str;
          return str.substring(0, index) + chr + str.substring(index + 1);
        }

        function rep() {
          if (n > 1) {
            str = setCharAt(string, n + 1, ' Andar');
            console.log(str);
          }
        }
        rep();

        string = string.replaceAll('coroa', 'coronet');
        string = string.replaceAll('snowpoint', 'ponto de neve');
        string = string.replaceAll('ruin maniac cave', 'mina do ruimaniaco');
        string = string.replaceAll('verify', 'valor');
        string = string.replaceAll('arruina', 'ruínas');
        string = string.replaceAll('lake', 'lago');

        return string;
      })
      .catch((err) => {
        console.error(err);
      });

    arrayTranslated.push(await itemTranslated);
  }
  return arrayTranslated;
}
// translateIt();
async function createFile() {
  const encounter = await translateIt();
  //   console.log(encounter);
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify(encounter), (err) => {
      console.log('criou');
      if (err) throw err;
    });
  }
}
createFile();
