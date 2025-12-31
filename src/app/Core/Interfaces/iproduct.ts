export interface Iproduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  // Optional fields if they exist in the API response
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
