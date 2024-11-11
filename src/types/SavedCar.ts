// src/types/SavedCar.ts

import { Brand } from "../hooks/useBrands";
import { Color, Model } from "../hooks/useModels";
import { Accessory } from "../hooks/useAccessories";
import { Insurance } from "../hooks/useInsurances";

export interface SavedCar {
  brand: Brand;
  model: Model;
  color: Color;
  accessories: Accessory[];
  insurances: Insurance[];
}
