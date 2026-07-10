export default function IconCircleButton({
  icon: Icon,
  color = '#26A269',
  bg = '#D4ECE1',
  onClick,
  label,
  size = 40,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full border border-white shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      style={{ backgroundColor: bg, color, width: size, height: size }}
    >
      <Icon size={size * 0.5} strokeWidth={2.25} />
    </button>
  );
}
