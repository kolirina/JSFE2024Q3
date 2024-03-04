import AppController from '../controller/controller';
import { AppView, SourcesData, NewsData } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    private showMoreButton: HTMLElement;
    private counter: number = 10;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.showMoreButton = document.getElementById('show-more')!;
        this.showMoreButton.addEventListener('click', () => this.showMoreItems());
    }

    private showFirstTen(): void {
        const items = document.querySelectorAll('.source__item');
        console.log(items);
        for (let i = 0; i < 10; i++) {
            if (items[i]) {
                console.log(items[i]);
                items[i].classList.add('source__item_shown');
            }
        }
    }

    start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) => {
                this.handleSourceClick(e);
            });
        }

        this.controller.getSources((data: SourcesData | undefined) => {
            if (data) {
                this.view.drawSources(data);
                this.showFirstTen();
            } else {
                console.error('No data received from getSources');
            }
        });
    }

    private handleSourceClick(event: Event): void {
        const mouseEvent = event as MouseEvent;
        this.controller.getNews(mouseEvent, (data: NewsData | undefined) => {
            if (data) {
                this.view.drawNews(data);
            } else {
                console.error('No data received from getNews');
            }
        });
    }

    private showMoreItems(): void {
        const items = document.querySelectorAll('.source__item');
        for (let i = this.counter; i < this.counter + 10; i++) {
            if (items[i]) {
                items[i].classList.add('source__item_shown');
            } else {
                this.showMoreButton.style.display = 'none';
                break;
            }
        }
        this.counter += 10;
    }
}
export default App;
