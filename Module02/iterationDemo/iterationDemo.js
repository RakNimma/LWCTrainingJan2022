import { LightningElement } from 'lwc';

export default class IterationDemo extends LightningElement {
    contacts = [
        {
            Id: 'C1',
            Name: 'John Cena',
            Email: 'ucme@gmail.com',
        },
        {
            Id: 'C2',
            Name: 'Dwayne Johnson',
            Email: 'therock@hollywood.com',
        },
        {
            Id: 'C3',
            Name: 'Emma Watson',
            Email: 'harrypotter@hogwords.com',
        },
        {
            Id: 'C4',
            Name: 'Kristen Stewert',
            Email: 'ks@twilightSaga.com',
        }
    ];
}