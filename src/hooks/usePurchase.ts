import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";
import { Car } from "./useCar";

export interface PurchaseData {
    cars_id: string;
}


export interface Purchase {
    id: string;
    date_of_purchase: Date;
    car: Car;
}


interface UsePurchaseReturn {
    createPurchase: (purchaseData: PurchaseData) => Promise<any>;
    fetchAllPurchases: () => void;
    fetchPurchaseById: (id: string) => Promise<void>;
    fetchPurchaseByCarId: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    purchase: Purchase | null;
    allPurchases: Purchase[];
  }
  
const usePurchase = (): UsePurchaseReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  
    // Function to create a new Purchase
    const createPurchase = async (purchaseData: PurchaseData): Promise<any> => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await apiClient.post("/purchases", purchaseData);
        setPurchase(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message ?? "Failed to create purchase");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    // Function to fetch all Purchases
    const fetchAllPurchases = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await apiClient.get<Purchase[]>("/purchases");
        setAllPurchases(response.data);
        console.log("Fetched purchases:", response.data);
      } catch (err: any) {
        setError(err.response?.data?.message ?? "Failed to fetch purchases");
        throw err;
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Function to fetch a single Purchase by ID
    const fetchPurchaseById = useCallback(async (id: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await apiClient.get<Purchase>(`/purchases/${id}`);
        setPurchase(response.data);
        console.log("Fetched purchase by ID:", response.data);
      } catch (err: any) {
        setError(err.response?.data?.message ?? "Failed to fetch purchase by ID");
        throw err;
      } finally {
        setLoading(false);
      }
    }, []);

    // Function to fetch a single Purchase by car ID
    const fetchPurchaseByCarId = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await apiClient.get<Purchase>(`/purchases/car/${id}`);
          setPurchase(response.data);
          console.log("Fetched purchase by car ID:", response.data);
        } catch (err: any) {
          setError(err.response?.data?.message ?? "Failed to fetch purchase by car ID");
          throw err;
        } finally {
          setLoading(false);
        }
      }, []);
  
    return { 
        createPurchase, 
        fetchAllPurchases, 
        fetchPurchaseById, 
        fetchPurchaseByCarId, 
        loading, 
        error, 
        purchase, 
        allPurchases 
    };
  };
  
  export default usePurchase;