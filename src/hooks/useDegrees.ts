// src/hooks/useDegrees.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
interface WeatherResponse{
    temp_f:number;
}

export default function useDegrees() {
    return useQuery({
        queryKey: ["weather"],
        queryFn: () =>  apiClient
        .get<WeatherResponse>("/weather/Denmark")
        .then((response) => response.data)
      });
}

