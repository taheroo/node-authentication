const mongoose = require('mongoose');
const env = require('dotenv').config({ path: `${__dirname}/.env` });
// console.log('mongoDb Login', process.env.DATABASE_USERNAME);

mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@codebeast-fhl7j.azure.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// LOCAL
// mongoose.connect('mongodb://127.0.0.1:27017/${process.env.COLLECTION_NAME}', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
