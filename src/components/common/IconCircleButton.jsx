export default function IconCircleButton({
  icon: Icon,
  color = '#26A269',
  bg = '#D4ECE1',
  onClick,
  label,
  size = 40,
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full border border-white shadow-sm transition-transform ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
      style={{ backgroundColor: bg, color, width: size, height: size }}
    >
      <Icon size={size * 0.5} strokeWidth={2.25} />
    </button>
  );
}
