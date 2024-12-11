import { useGenerate } from "../../hooks/useGenerate";
import { Input } from "./input";
import "./Generate.css";



export function Generate() {
  const { selectedIngredients } = useGenerate();
  return (
    <div className="generate-page">
      <Input></Input>
    </div>
  );
}
