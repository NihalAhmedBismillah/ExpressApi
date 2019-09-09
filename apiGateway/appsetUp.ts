


import { UserController } from './src/apps/controllers/UserController';
import { HobbiesController } from './src/apps/controllers/HobbiesController';
import { connectDb } from './src/apps/lib/db';
import * as bodyParser from 'body-parser'
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as nocache from 'nocache';
import * as morgan from 'morgan';
import  * as  swaggerUi from 'swagger-ui-express';
  const  swaggerDocument = require('../apiGateway/src/apps/swagger/swagger.json');


/**
 * AppSetup
 */
export class AppSetup {
    app;
    constructor(app) {
        this.app = app;
    }
    public async initApp() {
        try {
            // TODO : Need to add other middleware exceptions
            this.app.use((err, req, res, next) => {
                console.error(err);
                res.render('internal server error :500');
            });
            // Seting Up Helmet HidePoweredBy 
            this.app.use(helmet.hidePoweredBy());
            // Setting Up Http Strict Transport Security(Hsts)
            this.app.use(helmet.hsts({
                maxAge: 16000000000,
                preload: true,
                force: true
            }));
            // Setting Up FrameGuard
            this.app.use(helmet.frameguard({ action: 'deny' }));
            // Setting Up XssFilter
            this.app.use(helmet.xssFilter());
            // XssFilter for Old versions of Internet Explorer
            this.app.use(helmet.xssFilter({ setOnOldIE: true }));
            // Setting Up ieNoOpen 
            this.app.use(helmet.ieNoOpen());
            // Setting Up noSniff 
            this.app.use(helmet.noSniff());

            //Seting Up Helmet HidePoweredBy
            this.app.disable('x-powered-by');

            //Seting Up Helmet Nocache
            this.app.use(nocache());

            this.app.use(bodyParser.json());

            // Setting cors
            this.app.use(cors());
            // Setting cross Origin
            // TODO: For now allowing access origin for all domains , Need to specify access origin
            this.app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", '*');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
                res.header('Access-Control-Max-Age', '600');
                return next();
            });
            this.app.use(morgan('combined'))
            this.app.use(bodyParser.urlencoded({ extended: true }));
            await connectDb();
            console.log('Data base setup');
            // TODO: we need to refactor for controller registration
            await new UserController(this.app).init();
            await new HobbiesController(this.app).init();
            console.log('controllers registered!')
            this.app.get("/", (req, res) => res.send(`Server running port no: 3001  ${new Date()}`));
          // Setup swagger for api documentation
            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
        catch (error) {
            console.log('error ', JSON.stringify(error))
            throw (error);
        }
    }
}

