import { useNavigate, useParams } from "react-router-dom";
import "../styles/ModelPage.css";
import { BASE_URL_IMG } from "../constants";

const carModels: { [key: string]: { name: string; image: string }[] } = {
  bmw: [
    { name: "Series 1", image: `${BASE_URL_IMG}Series_1_ksvv6z` },
    { name: "Series 2", image: `${BASE_URL_IMG}Series_2_xtz9cm` },
    { name: "Series 3", image: `${BASE_URL_IMG}Series_3_vhe4ky` },
    { name: "X6", image: `${BASE_URL_IMG}X6_m4pm3x` },
    { name: "i8", image: `${BASE_URL_IMG}i8_rbqgha` },
  ],
  mercedes: [
    { name: "A-Class", image: `${BASE_URL_IMG}a-class_vvxx0z` },
    { name: "C-Class", image: `${BASE_URL_IMG}c-class_zixcas` },
    { name: "S-Class", image: `${BASE_URL_IMG}s-class_hjdlk1` },
    { name: "G-Class", image: `${BASE_URL_IMG}g-class_kcuehd` },
    { name: "AmgGT", image: `${BASE_URL_IMG}amgGT_plxazk` },
  ],
  audi: [
    { name: "A1", image: `${BASE_URL_IMG}a1_gljxrf` },
    { name: "A3", image: `${BASE_URL_IMG}a3_paqfrx` },
    { name: "A4", image: `${BASE_URL_IMG}a4_ytx1wk` },
    { name: "A6", image: `${BASE_URL_IMG}a6_o3kfdz` },
    { name: "R8", image: `${BASE_URL_IMG}r8_pwplzy` },
  ],
  skoda: [
    { name: "Citigo", image: `${BASE_URL_IMG}citigo_lvblou` },
    { name: "Yeti", image: `${BASE_URL_IMG}yeti_h868ua` },
    { name: "Rapid", image: `${BASE_URL_IMG}rapid_ul2wfn` },
    { name: "Octavia", image: `${BASE_URL_IMG}octavia_i1nfow` },
    { name: "Kodiaq", image: `${BASE_URL_IMG}kodiaq_dhng42` },
  ],
  ford: [
    { name: "Fiesta", image: `${BASE_URL_IMG}fiesta_uisgqv` },
    { name: "Fusion", image: `${BASE_URL_IMG}fusion_prrofe` },
    { name: "Explorer", image: `${BASE_URL_IMG}explorer_d9tbb4` },
    { name: "Pickup", image: `${BASE_URL_IMG}pickup_qcyjxw` },
    { name: "Mustang", image: `${BASE_URL_IMG}mustang_eqrecu` },
  ],
};

function ModelPage() {
  const { brand } = useParams<{ brand: string }>();
  const models = carModels[brand?.toLowerCase() || ""] || [];
  const navigate = useNavigate();
  const handleModelSelect = (model: string) => {
    navigate(
      `/brands/${brand?.toLowerCase()}/models/${model.toLowerCase()}/colors`
    );
  };

  return (
    <div>
      <h1>
        {brand
          ? `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`
          : "Unknown"}{" "}
        Models
      </h1>

      <div className="model-grid">
        {models.map((model) => (
          <div
            key={model.name}
            className="model-item"
            onClick={() => handleModelSelect(model.name)}
          >
            <img src={model.image} alt={model.name} className="model-image" />
            <p>{model.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelPage;
