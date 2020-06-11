export class ModelMapper<T> {
    propertyMapping: any;
    target: any;

    constructor(type: new() => T) {
        this.target = new type();
        this.propertyMapping = this.target.constructor._propertyMap;
    }

    map(source: any) {
        console.log(Object.keys(this.target));
        Object.keys(this.target).forEach((key) => {
            const mappedKey = this.propertyMapping[key];
            console.log(this.propertyMapping);
            if (mappedKey) {
                this.target[key] = source[mappedKey];
            } else {
                this.target[key] = source[key];
            }
        });
        Object.keys(source).forEach((key) => {
            const targetKeys = Object.keys(this.target);
            if (targetKeys.indexOf(key) === -1
                && Object.values(this.propertyMapping).indexOf(key) === -1) {
                this.target[key] = source[key];
            }
        });
        return this.target;
    }
}

export function propertyMap(sourceProperty: string) {
    return (target: any, propertyKey: string) => {
      if (!target.constructor._propertyMap) {
        target.constructor._propertyMap = {};
      }
      target.constructor._propertyMap[propertyKey] = sourceProperty;
    };
}
