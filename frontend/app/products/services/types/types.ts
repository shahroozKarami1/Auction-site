// Seller Interface
export interface Seller {
  id: number;
  username: string;
  email: string;
}

// Product Interface
export interface Product {
  id: number;
  name: string;
  description?: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  postal_code?: string;
  slug: string;
  current_price: number;
  start_price: number;
  end_price?: number;
  max_price?: number;
  status: "not_started" | "on_going" | "closed";
  auction_start_date: string;
  auction_end_date: string;
  seller?: Seller;
  bids_count: number;
  sold_out: boolean;
  current_step: number;
}
