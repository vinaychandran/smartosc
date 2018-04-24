class tabs {
    constructor() {
        this.tabLinks = [];
        this.contentDivs = [];
    };

    tabSet() {
        let tabListItems = document.getElementById('tabs').childNodes;
        for (let i = 0; i < tabListItems.length; i++) {
            if (tabListItems[i].nodeName == 'LI') {
                let tabLink = this.getFirstChildWithTagName(tabListItems[i], 'A');
                let id = this.getHash(tabLink.getAttribute('href'));
                this.tabLinks[id] = tabLink;
                this.contentDivs[id] = document.getElementById(id);
            }
        }

        let i = 0;

        for (let id in this.tabLinks) {

            this.tabLinks[id].addEventListener('click', this.showTab);

            this.tabLinks[id].onfocus = function() {

                this.blur()
            };
            if (i == 0) this.tabLinks[id].className = 'selected';
            i++;
        }
        let j = 0;

        for (let id in this.contentDivs) {
            if (j != 0) this.contentDivs[id].className = 'tabContent hide';
            j++;
        }
    };

    showTab(e) {
        const that = e.target.getAttribute('href');
        let selectedId = that.substring(that.lastIndexOf('#') + 1);

        for (let id in this.contentDivs) {
            if (id == selectedId) {
                this.tabLinks[id].className = 'selected';
                this.contentDivs[id].className = 'tabContent';
            } else {
                this.tabLinks[id].className = '';
                this.contentDivs[id].className = 'tabContent hide';
            }
        }
        return false;
    };

    getFirstChildWithTagName(element, tagName) {
        for (let i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
        }
    };

    getHash(url) {
        var hashPos = url.lastIndexOf('#');
        return url.substring(hashPos + 1);
    };
}