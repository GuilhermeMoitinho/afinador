import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 130,
          fontWeight: 800,
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        ♪
      </div>
    ),
    { ...size },
  );
}
