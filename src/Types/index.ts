export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  image: string | null;
  submittedAt?: string;
}

export interface CartItem extends Pet {
  quantity: number;
}

export interface ApiResponse {
  id: string;
  name: string;
  job?: string;
  createdAt?: string;
}

export interface DogImageResponse {
  message: string;
  status: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  AddPet: undefined;
  Cart: undefined;
  PetDetail: { pet: Pet };
};

export type TabParamList = {
  Home: undefined;
  AddPet: undefined;
  Cart: undefined;
};
