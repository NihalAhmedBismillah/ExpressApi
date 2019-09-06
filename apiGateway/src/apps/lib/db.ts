

import * as mongoose from 'mongoose';
const config = require('./config.json');
const connectDb = () => mongoose.connect(config['dbConnectionUrl'] + config['dbName']);
export { connectDb };