/**
 * XMBItem Component
 * Individual navigation item for XMB
 */

import type { XMBItem as XMBItemType } from '../../../types/design-system';

interface XMBItemProps {
  item: XMBItemType;
  isActive: boolean;
  onSelect: (item: XMBItemType) => void;
}

export function XMBItem({ item, isActive, onSelect }: XMBItemProps) {
  const handleClick = () => {
    onSelect(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(item);
    }
  };

  return (
    <div
      className={`xmb-item ${isActive ? 'xmb-item--active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      {item.icon && (
        <div className="xmb-item__icon">{item.icon}</div>
      )}

      <div className="xmb-item__content">
        <div className="xmb-item__title">{item.label}</div>
        {item.subtitle && (
          <div className="xmb-item__subtitle">{item.subtitle}</div>
        )}
      </div>

      <div className="xmb-item__arrow">→</div>
    </div>
  );
}
