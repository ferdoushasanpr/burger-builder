
export interface IngredientItem {
  type: 'salad' | 'cheese' | 'meat' | 'bread-top' | 'bread-bottom';
  amount: number;
}

export interface CustomerDetails {
  deliveryAddress: string;
  phone: string;
  paymentType: string;
  transactionId?: string;
  paymentStatus: 'pending' | 'paid' | 'unpaid';
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  ingredients: IngredientItem[];
  price: number;
  date: string;
  userId: string;
}

export interface AuthData {
  token: string | null;
  userId: string | null;
  email: string | null;
}

export interface RootState {
  ingredient: IngredientItem[];
  totalPrice: number;
  purchasable: boolean;
  orders: Order[];
  token: string | null;
  userId: string | null;
  email: string | null;
  error: string | null;
}
