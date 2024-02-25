import AppController from '../controller/controller';
import { AppView } from '../view/appView';


class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                this.handleSourceClick(e);
            });
        }

        this.controller.getSources((data) => this.view.drawSources(data));
    }

    private handleSourceClick(event: Event): void {
        const mouseEvent = event as MouseEvent;
        this.controller.getNews(mouseEvent, (data) => this.view.drawNews(data));
    }
}

export default App;
