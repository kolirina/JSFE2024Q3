import Loader from './loader';

interface Environment {
    API_URL: string;
    API_KEY: string;
}

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL!, {
            apiKey: process.env.API_KEY!,
        });
    }
}

export default AppLoader;
