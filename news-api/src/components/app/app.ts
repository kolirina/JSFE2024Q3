import AppController from '../controller/controller';
import { AppView, SourcesData, NewsData } from '../view/appView';
import { Callback } from '../controller/loader';


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

        // this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
        this.controller.getSources((data: SourcesData | undefined) => {
            if (data) {
                this.view.drawSources(data);
            } else {
                console.error("No data received from getSources");
            }
        });
    }

    private handleSourceClick(event: Event): void {
        const mouseEvent = event as MouseEvent;
        this.controller.getNews(mouseEvent, (data: NewsData | undefined) => {
            if (data) {
                this.view.drawNews(data);
            } else {
                console.error("No data received from getNews");
            }
    });
}
}
export default App;
