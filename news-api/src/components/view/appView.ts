import News from './news/news';
import Sources from './sources/sources';

interface Article {
    author: string;
    source: {
        name: string;
    };
    publishedAt: string;
    urlToImage: string;
    title: string;
    description: string;
    url: string;
}

interface Source {
    id: string;
    name: string;
}

interface NewsData {
    articles?: Article[];
}

interface SourcesData {
    sources?: Source[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
