import Icon from "./Icon";

export default function StarRating({ rating = 0, size = "text-sm", showCount, count }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Icon key={i} name="star" fill className={size} />);
    } else if (rating >= i - 0.5) {
      stars.push(<Icon key={i} name="star_half" fill className={size} />);
    } else {
      stars.push(<Icon key={i} name="star" className={size} />);
    }
  }
  return (
    <div className="flex items-center gap-space-xs">
      <div className="flex items-center text-secondary-container">{stars}</div>
      {showCount && (
        <span className="text-body-sm text-on-surface-variant">({count})</span>
      )}
    </div>
  );
}
