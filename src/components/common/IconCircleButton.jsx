export default function IconCircleButton({
  icon: Icon,
  color = '#26A269',
  bg = '#D4ECE1',
  onClick,
  label,
  size = 40,
  disabled = false,
  showLabel = false,
}) {
  const isTextButton = showLabel && label;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white shadow-sm transition-transform ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 active:scale-95'} ${isTextButton ? 'px-3 py-2' : ''}`}
      style={{ backgroundColor: bg, color, ...(isTextButton ? {} : { width: size, height: size }) }}
    >
      <Icon size={size * 0.5} strokeWidth={2.25} />
      {isTextButton && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </button>
  );
}
