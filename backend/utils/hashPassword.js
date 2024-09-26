import bcrypt from 'bcrypt';

const password = 'quickvote123'; 
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log(hash); 
});
