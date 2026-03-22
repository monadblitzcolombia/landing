export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  date: string | null;
  confirmed: boolean;
  registrationUrl: string | null;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
}
