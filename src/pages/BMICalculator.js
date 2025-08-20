// src/pages/BMICalculator.jsx
import React, { useState, useEffect } from "react";
import "../BMICalculator.css";



const activityLevels = [
  { key: "sedentary", label: "Sedentary (little or no exercise)", factor: 1.2 },
  { key: "light", label: "Light (1-3 days/week)", factor: 1.375 },
  { key: "moderate", label: "Moderate (3-5 days/week)", factor: 1.55 },
  { key: "active", label: "Active (6-7 days/week)", factor: 1.725 },
  { key: "very", label: "Very active (hard exercise & physical job)", factor: 1.9 },
];

function clampCalories(cal) {
  // floor to reasonable minimums to avoid unrealistic low values
  return Math.round(Math.max(0, cal));
}

export default function BMICalculator() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // units
  const [units, setUnits] = useState("metric"); // "metric" or "imperial"

  // basic inputs
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState("male"); // "male" | "female"
  const [heightCm, setHeightCm] = useState(175); // used for metric
  const [weightKg, setWeightKg] = useState(75); // used for metric

  // imperial inputs (kept in state so switching back preserves values)
  const [weightLb, setWeightLb] = useState(165);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  // activity
  const [activityKey, setActivityKey] = useState("moderate");

  // derived/calculated
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmr, setBmr] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [caloriesSlow, setCaloriesSlow] = useState(null);
  const [caloriesNormal, setCaloriesNormal] = useState(null);
  const [caloriesFast, setCaloriesFast] = useState(null);

  // Helpers
  const lbToKg = (lb) => lb * 0.45359237;
  const ftInToCm = (ft, inch) => (ft * 12 + inch) * 2.54;
  const cmToM = (cm) => cm / 100;

  useEffect(() => {
    // derive kg & cm depending on units
    const kg = units === "metric" ? Number(weightKg) : lbToKg(Number(weightLb));
    const cm =
      units === "metric" ? Number(heightCm) : ftInToCm(Number(heightFt), Number(heightIn));

    // validate minimal positive numbers
    if (!kg || !cm || !age || kg <= 0 || cm <= 0 || age <= 0) {
      setBmi(null);
      setBmiCategory("");
      setBmr(null);
      setMaintenance(null);
      setCaloriesSlow(null);
      setCaloriesNormal(null);
      setCaloriesFast(null);
      return;
    }

    // BMI
    const heightM = cmToM(cm);
    const bmiValue = kg / (heightM * heightM);
    const bmiRounded = Math.round(bmiValue * 10) / 10;
    setBmi(bmiRounded);

    // BMI category (WHO basic)
    let cat = "";
    if (bmiValue < 18.5) cat = "Underweight";
    else if (bmiValue < 25) cat = "Normal weight";
    else if (bmiValue < 30) cat = "Overweight";
    else cat = "Obese";
    setBmiCategory(cat);

    // BMR (Mifflin-St Jeor)
    // men: 10*kg + 6.25*cm - 5*age + 5
    // women: 10*kg + 6.25*cm - 5*age - 161
    const baseBmr =
      10 * kg + 6.25 * cm - 5 * Number(age) + (sex === "male" ? 5 : -161);
    const bmrRounded = Math.round(baseBmr);
    setBmr(bmrRounded);

    // maintenance
    const activity = activityLevels.find((a) => a.key === activityKey)?.factor ?? 1.2;
    const maintenanceCalories = Math.round(baseBmr * activity);
    setMaintenance(maintenanceCalories);

    // Weight loss deficits:
    // 1 lb = 3500 kcal -> per day: (weekly_loss_lbs * 3500) / 7
    // slow 0.2 lb/wk => 100 kcal/day; normal 0.5 => 250 kcal/day; fast 1 => 500 kcal/day
    const deficitSlow = 0.2 * 3500 / 7; // 100
    const deficitNormal = 0.5 * 3500 / 7; // 250
    const deficitFast = 1 * 3500 / 7; // 500

    setCaloriesSlow(clampCalories(Math.round(maintenanceCalories - deficitSlow)));
    setCaloriesNormal(clampCalories(Math.round(maintenanceCalories - deficitNormal)));
    setCaloriesFast(clampCalories(Math.round(maintenanceCalories - deficitFast)));
  }, [
    units,
    age,
    sex,
    heightCm,
    weightKg,
    weightLb,
    heightFt,
    heightIn,
    activityKey,
  ]);

  // Formatting helpers
  const fmt = (n) => (n == null ? "—" : Number(n).toLocaleString());

  return (
    <div className="bmi-page">
      <div className="bmi-card">
        <h1 className="bmi-title">BMI & Calorie Calculator</h1>

        <div className="bmi-row">
          <label className="bmi-label">Units</label>
          <div className="bmi-control">
            <label className={`unit-btn ${units === "metric" ? "active" : ""}`}>
              <input
                type="radio"
                name="units"
                checked={units === "metric"}
                onChange={() => setUnits("metric")}
              />
              Metric (kg, cm)
            </label>
            <label className={`unit-btn ${units === "imperial" ? "active" : ""}`}>
              <input
                type="radio"
                name="units"
                checked={units === "imperial"}
                onChange={() => setUnits("imperial")}
              />
              Imperial (lb, ft/in)
            </label>
          </div>
        </div>

        <div className="bmi-row">
          <label className="bmi-label">Age</label>
          <input
            className="bmi-input"
            type="number"
            min="10"
            max="120"
            value={age}
            onChange={(e) => setAge(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="bmi-row">
          <label className="bmi-label">Sex</label>
          <div className="bmi-control">
            <label className={`unit-btn ${sex === "male" ? "active" : ""}`}>
              <input
                type="radio"
                name="sex"
                checked={sex === "male"}
                onChange={() => setSex("male")}
              />
              Male
            </label>
            <label className={`unit-btn ${sex === "female" ? "active" : ""}`}>
              <input
                type="radio"
                name="sex"
                checked={sex === "female"}
                onChange={() => setSex("female")}
              />
              Female
            </label>
          </div>
        </div>

        {units === "metric" ? (
          <>
            <div className="bmi-row">
              <label className="bmi-label">Height (cm)</label>
              <input
                className="bmi-input"
                type="number"
                min="50"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="bmi-row">
              <label className="bmi-label">Weight (kg)</label>
              <input
                className="bmi-input"
                type="number"
                min="10"
                max="500"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </>
        ) : (
          <>
            <div className="bmi-row">
              <label className="bmi-label">Height</label>
              <div className="imperial-row">
                <input
                  className="bmi-input small"
                  type="number"
                  min="1"
                  max="8"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Math.max(0, Number(e.target.value)))}
                />
                <span className="imperial-sep">ft</span>
                <input
                  className="bmi-input small"
                  type="number"
                  min="0"
                  max="11"
                  value={heightIn}
                  onChange={(e) => setHeightIn(Math.max(0, Number(e.target.value)))}
                />
                <span className="imperial-sep">in</span>
              </div>
            </div>

            <div className="bmi-row">
              <label className="bmi-label">Weight (lb)</label>
              <input
                className="bmi-input"
                type="number"
                min="20"
                max="1000"
                value={weightLb}
                onChange={(e) => setWeightLb(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </>
        )}

        <div className="bmi-row">
          <label className="bmi-label">Activity level</label>
          <select
            className="bmi-select"
            value={activityKey}
            onChange={(e) => setActivityKey(e.target.value)}
          >
            {activityLevels.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        <hr className="bmi-divider" />

        <div className="results-grid">
          <div className="result-card">
            <div className="result-title">BMI</div>
            <div className="result-value">{bmi == null ? "—" : bmi}</div>
            <div className="result-sub">{bmiCategory}</div>
          </div>

          <div className="result-card">
            <div className="result-title">BMR</div>
            <div className="result-value">{fmt(bmr)} kcal/day</div>
            <div className="result-sub">Basal metabolic rate (Mifflin–St Jeor)</div>
          </div>

          <div className="result-card">
            <div className="result-title">Maintenance</div>
            <div className="result-value">{fmt(maintenance)} kcal/day</div>
            <div className="result-sub">Calories to maintain current weight</div>
          </div>

          <div className="result-card">
            <div className="result-title">Slow loss (0.2 lb/wk)</div>
            <div className="result-value">{fmt(caloriesSlow)} kcal/day</div>
            <div className="result-sub">~100 kcal deficit</div>
          </div>

          <div className="result-card">
            <div className="result-title">Normal loss (0.5 lb/wk)</div>
            <div className="result-value">{fmt(caloriesNormal)} kcal/day</div>
            <div className="result-sub">~250 kcal deficit</div>
          </div>

          <div className="result-card">
            <div className="result-title">Fast loss (1 lb/wk)</div>
            <div className="result-value">{fmt(caloriesFast)} kcal/day</div>
            <div className="result-sub">~500 kcal deficit</div>
          </div>
        </div>
      </div>

      <div className="bmi-note">
        <p>
          These are estimates — individual needs vary. Consult a registered dietitian
          or physician before making major changes. BMR formula: Mifflin–St Jeor.
        </p>
      </div>
    </div>
  );
}
