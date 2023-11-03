export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: Address;
  phone: string;
};

export type Address = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
};
