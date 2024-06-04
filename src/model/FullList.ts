import ListItem from "./ListItem";

interface List {
    list: ListItem[],   
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObjct: ListItem): void,
    removeItem(id: string): void
}

export default class FullList implements List {

    static instance: FullList = new FullList();

    private constructor(
        private _list: ListItem[] = []
    ) {}

    get list(): ListItem[] {
        return this._list
    }

    set list(list: ListItem[]) {
        this._list = list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return;

        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);

        parsedList.forEach((itemObjct) => {
            const newListItem = new ListItem(itemObjct._id, itemObjct._item, itemObjct._checked)
            FullList.instance.addItem(newListItem);
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = [];
        this.save()
    }

    addItem(itemObjct: ListItem): void {
        this._list.push(itemObjct);
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save()
    }
};