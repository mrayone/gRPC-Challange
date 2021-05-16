const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/kraken', {useNewUrlParser: true, useUnifiedTopology: true});