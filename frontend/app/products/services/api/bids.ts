import api from "@/app/utils/axios";
import axios from "axios";

// Define interfaces for the types
interface Bid {
  id: number;
  amount: number;
  status: string;
  user: {
    phone: string;
  };
  product: number;
}

interface PlaceBidData {
  product: number;
  amount: number;
}

// Fetch all bids
export const fetchBids = async (params = {}): Promise<Bid[]> => {
  const response = await api.get<Bid[]>("/bids/", { params });
  return response.data;
};

// Place a bid
export const placeBid = async (bidData: PlaceBidData): Promise<Bid> => {
  const response = await api.post<Bid>("/bids/", bidData);
  return response.data;
};

// Fetch a specific bid by ID (optional)
export const getBidById = async (id: number): Promise<Bid> => {
  const response = await api.get<Bid>(`/bids/${id}`);
  return response.data;
};
