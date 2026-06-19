const keyframes = `@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}`;

export const UnderConstructionBg = ({ bg }: { bg: string | null }) => (
  <>
    <style>{keyframes}</style>
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: bg ? `url(${bg})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "slow-zoom 12s linear infinite alternate",
      }}
    />
  </>
);