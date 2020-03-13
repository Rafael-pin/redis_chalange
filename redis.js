//window.keys = keys
//const readline = require('readline').createInterface({ 
  //input: process.stdin, 
  //output: process.stdout, 
//});
setInterval(() => {
  verifyKeys();
}, 10000);

const keys = [{
  name: '',
  number: 0,
  data: [{
    value: '',
    score: 0
  }],
  duration: ''
}];

function setWithDuration(name, value, duration) {
  if(keys.length === 1 && !keys[0].name) {
    setFirtsKey(name, value, 0, duration)
    return;
  }

  const foundKey = keys.find(key => key.name === name);

  if (foundKey) {
    foundKey.data[0].value = value;
    foundKey.duration = duration;
  } else {
    setNewKey(name, value, duration);
  }
}
function set(name, value) {
  if(keys.length === 1 && !keys[0].name) {
    setFirtsKey(name, value, 0)
    return;
  }

  const foundKey = keys.find(key => key.name === name);

  if (foundKey) {
    foundKey.data[0].value = value;
  } else {
    setNewKey(name, value);
  }
}

function setNewKey(name, value, duration) {
  let data = [{
    value: value,
    score: 0
  }]
  keys.push({name, data, duration})
}

function setFirtsKey(name, value, score, duration) {
  keys[0].name = name;
  keys[0].data[0].value = value;
  score === undefined ? keys[0].data[0].score = 0 : keys[0].data[0].score = score;
  keys[0].duration = duration;
}

function verifyKeys() {
  for (let index = 0; index < keys.length; index++) {
    if(keys[index].duration) {
      if(keys[index].duration.getDate() && keys[index].duration < new Date())
        keys.splice(index,1)
    }
  }
}

function get(name) {
  for(const key of keys) {
    if(key.name === name) 
      return JSON.stringify(key);
  }
  return null;
}

function zAdd(name, value, score) {
  if(keys[0].name === '') {
    setFirtsKey(name, value, score)
    return;
  }
  for(let key of keys) {
    if (key.name === name) {
      key.data.push({value, score})
      return;
    }
  }
  keys.push({name, data});
}

function size() {
  if(keys[0].name === '')
    return keys.length - 1;
  return keys.length;
}

function rank(name,value) {
  for(let key of keys) {
    if(key.name === name) {
      for (let index = 0; index < key.data.length; index++) {
        if(key.data[index].value === value) {
          return index;
        }
      }
    } 
  }
  return null;
}

function increment(name) {
  const key = keys.find(key => key.name === name);
  key.number++;
  return key.number;
}

function card(name) {
  const key = keys.find(key => key.name === name);
  return key.data.length;
}

function deleteKey(name){
  if(keys)
    for (let index = 0; index < keys.length; index++)
      if(keys[index].name === name) {
        keys.splice(index, 1);
        return 'Deleted';
      }
  return 'Not Found';
}

function range(reach,name) {
  let anwser = [];
  for(const key of keys) {
    if(key.name === name) {
      for (let index = 0; index < key.data.length; index++) {
        if(key.data[index].score >= reach.min && key.data[index].score <= reach.max) {
          console.log("added" + JSON.stringify(key));
          anwser.push(key.data[index]);
        }
      }
    }
  }
  return JSON.stringify(anwser);
}
