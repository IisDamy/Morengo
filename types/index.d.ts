import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
    name: string;
    price: number;
    image_url: string;
    description: string;
    calories: number;
    protein: number;
    rating: number;
    type: string;
}


export interface Category extends Models.Document {
    name: string;
    description: string;
}

export interface Address {
  coords:number[] | [];
  name: string;
  country: string;
  isDefault?: boolean;
  type:string;       
  // optional, default could be false
  // add any other fields your table has (e.g., label, lat, lng)
}


export interface User extends Models.Document {
    name?: string | undefined;
    email?: string | undefined;
    avatar?: string;
    role?: 'Admin' | 'DeliveryPerson' | 'Customer' | 'Vendor' | 'Vendor+';
    number?:string | undefined;
    institution?:string | undefined;
    PhotoUrl?:string;
    points?:number;
    accountId?:string;
    isStudent?:boolean;
    addresses?: Address[];


}



export interface CartCustomization {
    id: string;
    name: string;
    price: number;
    type: string;
}

export interface productsProps
{

}



export interface CartItemType {
    id: string; // menu item id
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    customizations?: CartCustomization[];
}

export interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string, customizations: CartCustomization[]) => void;
    increaseQty: (id: string, customizations: CartCustomization[]) => void;
    decreaseQty: (id: string, customizations: CartCustomization[]) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
    position:number | null
}

interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: React.CSSProperties | string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
    disabled?:boolean;
}

interface CustomHeaderProps {
    title?: string;
}

interface CustomInputProps {
    placeholder?: string;
    maxLength?:number | undefined;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoFocus?:false,
    style?:string
}

interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
}

interface CreateUserParams {
    email: string;
    password: string;
    name: string;
    institution:string;
    number:string;
    isStudent:boolean;
}

interface SignInParams {
    email: string;
    password: string;
}

interface GetMenuParams {
    category: string;
    query: string;
}


interface ManifestoProps {
    whatIs: boolean;
    openDashboard: () => void
}
// Roles

interface CustomComponentProps {
    value: string;
    onValueChange: (value: string) => void;
}

