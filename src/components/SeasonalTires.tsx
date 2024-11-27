import useDegrees from "../hooks/useDegrees";

export default function SeasonalTires() {
    const { degrees } = useDegrees();
  return (
    <div>
        {degrees && degrees > 45 ? "Winter Tires" : "All Season Tires"} Beacause degree is: {degrees}
    </div>
  );
}