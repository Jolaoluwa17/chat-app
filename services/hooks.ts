import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store"; // Make sure the path to your store file is correct

// Custom hook to use throughout your app
export const useAppDispatch = () => useDispatch<AppDispatch>();
