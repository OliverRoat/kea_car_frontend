// src/hooks/useDegrees.ts
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export default function useDegrees() {
    const [degrees, setDegrees] = useState<number | null>(null);
    useEffect(() => {
        setDegrees(8);
        return () => {};
    }, []);
    return { degrees };
}

