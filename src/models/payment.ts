export interface CartElements {
    name: string;
    value: string;
    quantity: number;
}
export interface CounterState {
    quantity: number;
    fullValue: number;
    deliveryCharges: number;
    totalAmount: number;
    userData: userData;
    stageProcess: "basicInformation" | "cardInformation" | "summaryInformation" | "finalStatus";
    finalStatus: boolean;
}

export interface userData {
    basicInformation: BasicInformation;
    cardInformation: CardInformation;
}

export interface BasicInformation {
    email: string;
    fullName: string;
}

export interface CardInformation {
    cardNumber: null | number;
    cardExpiration: string;
    cardCvv: null | number;
    cardName: string;
    typeId: string;
    idNumber: null | number;
    installments: null | number;
}

export interface AlertParams {
    email: BodyParams;
    fullName: BodyParams;
    card: BodyParamsCard;
}

export interface BodyParams {
    message: string;
    showAlert: boolean;

}
export interface BodyParamsCard {
    message: string;
    showAlert: boolean;
    type: string;

}

export interface ParamsComponent {
    showAlert: AlertParams;
    data: BasicInformation;
    setData: (state: any) => void;
}

export interface ParamsComponentCards {
    showAlert: AlertParams;
    data: CardInformation;
    setData: (state: any) => void;
    setStage: (state: any) => void;
    setShowAlert: (state: any) => void;
}