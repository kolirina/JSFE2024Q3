import './news.css';

interface NewsItem {
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

class News {
    draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            console.error('Template element "#newsItemTemp" not found.');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem) newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo')  as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;
            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
             metaDate.textContent = item.publishedAt
                 .slice(0, 10)
                 .split('-')
                 .reverse()
                 .join('-');
            }
            const descriptionTitle = newsClone.querySelector('.news__description-title');
            if (descriptionTitle) descriptionTitle.textContent = item.title;

            const descriptionSource = newsClone.querySelector('.news__description-source');
            if (descriptionSource) descriptionSource.textContent = item.source.name;

            const descriptionContent = newsClone.querySelector('.news__description-content');
            if (descriptionContent) descriptionContent.textContent = item.description;

            const readMoreLink = newsClone.querySelector('.news__read-more a');
            if (readMoreLink) readMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

const newsContainer = document.querySelector<HTMLElement>('.news');

if (!newsContainer) {
    console.error('News container element ".news" not found.');
    return;
}

newsContainer.innerHTML = '';
newsContainer.appendChild(fragment);

    }
}

export default News;
