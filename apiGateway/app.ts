
import * as express from 'express';
import { AppSetup } from './appsetUp';

export const app = express();
/**
 * Application
 */
class Application {

    public static async run() {
        try {
            app.listen(3001, async () => await new AppSetup(app).initApp());
        }
        catch (error) {
            return error;
        }
    }
}
Application.run().then(() => {
    console.log(`server started in port No 3001 and db connected!`);
}).catch((error) => {
    console.log('Error : ', JSON.stringify(error));
    process.exit(1)
})