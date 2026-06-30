export type NavbarTheme = 'light' | 'dark' | 'glass';
export type GoldStyle = 'champagne' | 'classic' | 'bright';
export type LogoAlign = 'left' | 'center';
export type HighlightStyle = 'underline' | 'dot' | 'gold-text' | 'minimal-glow';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}
