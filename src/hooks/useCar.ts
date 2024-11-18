// src/hooks/useCar.ts
import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";
import { Customer } from "./useCustomers";
import { Color, Model } from "./useModels";
import { Accessory } from "./useAccessories";
import { Insurance } from "./useInsurances";
import { SalesPerson } from "./useLogin";

interface CarData {
  purchase_deadline: string;
  models_id: string;
  colors_id: string;
  customers_id: string;
  sales_people_id: string;
  accessory_ids: string[];
  insurance_ids: string[];
}

export interface Car {
  id: string;
  purchase_deadline: string;
  model: Model;
  color: Color;
  accessories: Accessory[];
  insurances: Insurance[];
  customer: Customer;
  sales_person: SalesPerson;
  total_price: number;
}

interface UseCarReturn {
  createCar: (carData: CarData) => Promise<any>;
  fetchAllCars: () => void;
  fetchCarById: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  car: Car | null;
  allCars: Car[];
}

const useCar = (): UseCarReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [allCars, setAllCars] = useState<Car[]>([]);

  // Function to create a new car
  const createCar = async (carData: CarData): Promise<any> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/car", carData);
      setCar(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create car");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all cars
  const fetchAllCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Car[]>("/cars");
      setAllCars(response.data);
      console.log("Fetched cars:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch a single car by ID
  const fetchCarById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Car>(`/car/${id}`);
      setCar(response.data);
      console.log("Fetched car:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch car");
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCar, fetchAllCars, fetchCarById, loading, error, car, allCars };
};

export default useCar;
