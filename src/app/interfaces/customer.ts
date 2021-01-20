export class Customer {
    // constructor(
    //     name: string,
    //     phone: string,
    //     id?: number
    // ){}
    id?: number;
    name: string;
    phone: string;

    constructor(name: string, phone: string, id?: number) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
}