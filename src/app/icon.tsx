import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #020617 0%, #064e3b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#10b981",
          fontSize: 360,
          fontWeight: 800,
          letterSpacing: -10,
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        ♪
      </div>
    ),
    { ...size },
  );
}
