import './sources.css';

class Sources {
    draw(data: { id: string, name: string }[])  {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error("Template element '#sourceItemTemp' not found.");
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceItemName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (sourceItemName) {
                sourceItemName.textContent = item.name;
            }

            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        } else {
            console.error("Container element '.sources' not found.");
        }
    }
}

export default Sources;
