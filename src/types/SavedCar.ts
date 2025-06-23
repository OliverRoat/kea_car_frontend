// src/types/SavedCar.ts

import { Brand } from "../hooks/useBrands";
import { Model } from "../hooks/useModels";
import { Color } from "../hooks/useColors";
import { Accessory } from "../hooks/useAccessories";
import { Insurance } from "../hooks/useInsurances";

export interface SavedCar {
  brand: Brand;
  model: Model;
  color: Color;
  accessories: Accessory[];
  insurances: Insurance[];
}
