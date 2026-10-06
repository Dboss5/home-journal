import { ImageResponse } from "next/og";
import { getCity, getService } from "@/lib/locations";

export const runtime = "edge";
export const alt = "Homefront Journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string; city: string };
}) {
  const service = getService(params.slug);
  const city = getCity(params.city);

  const serviceName: Record<string, string> = {
    pool: "Pool Service",
    hvac: "HVAC Service",
    "pest-control": "Pest Control",
    plumbing: "Plumbing Repair",
    "holiday-lighting": "Holiday Lighting",
    landscape: "Landscaping",
    hardscape: "Hardscaping",
  };

  const svcLabel = service ? serviceName[service.key] : "Home Services";
  const cityLabel = city ? `${city.name}, ${city.state}` : "DFW";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200,16,46,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(201,162,39,0.15), transparent 55%), #0E0C0A",
          color: "#EDE6DA",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: "2px solid #C9A227",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A227",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            HF
          </div>
          <div style={{ fontSize: 22, color: "#C9A227", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Homefront Journal
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              color: "#C9A227",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {cityLabel}
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            {svcLabel} in {cityLabel}
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, alignItems: "center", fontSize: 20, color: "#9C9184" }}>
          <span>Vetted local pros</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A227" }} />
          <span>Real DFW pricing</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A227" }} />
          <span>No gatekeeping</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}