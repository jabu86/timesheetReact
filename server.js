import express from 'express';
import connectDB from './config/db.js';
import fileUpload from 'express-fileupload';
const app = express();
//Connect Database
connectDB();
//Fileupload
app.use(fileUpload());
//Port
const port = process.env.PORT || 5000;
//Init Middleware
app.use(express.json());
//router init
import timecards from './router/api/timecards.js';
import users from './router/api/users.js';
import auth from './router/api/auth/auth.js';
import profile from './router/api/profile.js';
import monday from './router/api/monday.js';
import tuesday from './router/api/tuesday.js';
import wendsday from './router/api/wendsday.js';
import thursday from './router/api/thursday.js';
import friday from './router/api/friday.js';
import satarday from './router/api/satarday.js';
import sunday from './router/api/sunday.js';
//App routes
app.use('/api/timecards', timecards);
app.use('/api/monday', monday);
app.use('/api/tuesday', tuesday);
app.use('/api/wendsday', wendsday);
app.use('/api/thursday', thursday);
app.use('/api/friday', friday);
app.use('/api/satarday', satarday);
app.use('/api/sunday', sunday);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);



app.listen(port, console.log(`App running on http://localhost:${port}`));