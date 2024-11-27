// src/hooks/useDegrees.ts
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export default function useDegrees() {
    const [degrees, setDegrees] = useState<number | null>(null);
    useEffect(() => {
        setDegrees(0);
        return () => {};
    }, []);
    return { degrees };
}

