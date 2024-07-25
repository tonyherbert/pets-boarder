export type VaccineList = {
    id: string;
    initial: string;
    name: string;
    reminder: number[]
}

export type VaccineForm = {
    vaccine: string;
    registerAt: Date;
    reminder: Date;
};

export type VaccineFromFirestore = {
    id: string;
    createdAt: string;
    registerAt: string;
    ownerId: string;
    petId: string;
    reminder: string;
    vaccine: string;
    name: string;
}
