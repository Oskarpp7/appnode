const bcrypt = require('bcryptjs');
const password = 'password123';
bcrypt.genSalt(10, function(err, salt) {
  if(err) throw err;
  bcrypt.hash(password, salt, function(err, hash) {
    if(err) throw err;
    console.log(hash);
  });
});
