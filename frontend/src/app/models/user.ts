import { propertyMap } from '../_helpers/model-mapper';

export class User {
    @propertyMap('user_id')
    id: number;
    username: string;
    name: string;
    token: string;


    constructor(id?: number) {
        this.id = id ? id : undefined;

    }
}
