const keyframes = `@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}`

export const Background = ({ bg }: { bg: string | null }) => (
  <>
    <style>{keyframes}</style>
    <div
      className="fixed inset-0 -z-50 opacity-20"
      style={{
        backgroundImage: bg ? `url(${bg})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        animation: 'slow-zoom 12s linear infinite alternate',
      }}
    />
  </>
)
