let crypto;
try {
  crypto = require('bcrypt');
  console.log(crypto)
  password = "hola_soy^patata"
  const generate = async () =>{
    const hash =await crypto.hash(password,saltRounds=8);
    console.log("hash:",hash);
    pass = process.argv[2]
    const compare = await crypto.compare(pass,hash)
    const compare2 = await crypto.compare("pass",hash)
    console.log(compare);
    console.log(compare2);
  }
  generate()
} catch (err) {
  console.error('crypto support is disabled!');
} 