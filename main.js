import db from "./model.js"
import {AppView, CatListView, CatView} from "./view.js";

function drawApp(listView, catView) {
    let appView = new AppView(listView, catView);
    document.getElementById("app").innerHTML = appView.html
}

async function main() {
    await db.load();
    console.log(db.data)
    document.db = db;
    let listView = new CatListView(db.data);
    window.listItemClick = (name) => {
        drawApp(listView, new CatView(db.lookup(name)));
    }
    window.catClick = (name) => {
        let cat = db.lookup(name);
        cat.click();
        drawApp(listView, new CatView(cat));
    }

    drawApp(listView, new CatView(db.data[0]));
}

main()

