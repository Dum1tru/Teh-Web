// types.ts

export interface FirstInterface {
    field1: string;
    field2: number;
    field3: boolean;
    field4: string[];
    field5: { key: string; value: number };
}
// types.ts

export interface SecondInterface extends FirstInterface {
    additionalField1: string;
    additionalField2: boolean;
}
