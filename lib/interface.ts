export interface User {
    id: string;
    email: string;
    password: string;
    characters: Character[];
}

export interface Character {
    id: string;
    owner: User;
    name?: string;
    race?: Race;
    class?: Class;
    abilities?: Abilities;
    description?: Description;
    equipment?: Equipment;
}

export interface Race {
    id: number;
    character: Character;
    name?: string;
}

export interface Class {
    id: number;
    character: Character;
    name?: string;
}

export interface Abilities {
    id: number;
    character: Character;
    genMethod: GenMethod;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

enum GenMethod {
    MANUAL,
    ARRAY,
    POINT,
}

export interface Description {
    id: number;
    character: Character;
    background?: string;
}

export interface Equipment {
    id: number;
    character: Character;
    name?: string;
}