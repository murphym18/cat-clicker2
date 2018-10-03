class CatListView {
    constructor(arr) {
        this.cats = arr;
    }

    get html() {
        let meat = this.cats.map(cat => {
            return `<li onclick="window.listItemClick('${cat.name}')"><div><h2>${cat.name}: ${cat.count}</h2></div></li>`
        }).join("");

        return `<div class="cat-list"><ul>${meat}</ul></div>`
    }
}

class CatView {
    constructor(cat) {
        this.cat = cat;
    }

    get html() {
        let name = `<h1>${this.cat.name}</h1>`;
        let image = `<div><img src="images/${this.cat.image}"></div>`;
        let count = `<p>Count: ${this.cat.count}</p>`;
        return `<div class="cat" onclick="window.catClick('${this.cat.name}')">${name} ${image} ${count}</div>`;
    }
}

class AppView {
    constructor(listView, catView) {
        this.catView = catView;
        this.listView = listView;
    }

    get html() {
        return `${this.listView.html} ${this.catView.html}`
    }
}
export {AppView, CatListView, CatView};