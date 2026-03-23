/**
 * XMBCategory Component
 * Category container for XMB navigation
 */

import type { XMBCategory as XMBCategoryType, XMBItem as XMBItemType } from '../../../types/design-system';
import { XMBItem } from './XMBItem';

interface XMBCategoryProps {
  category: XMBCategoryType;
  activeItemId?: string;
  onItemSelect: (item: XMBItemType) => void;
}

export function XMBCategory({
  category,
  activeItemId,
  onItemSelect,
}: XMBCategoryProps) {
  return (
    <div className="xmb-column">
      <div className="xmb-column__header">
        {category.icon && (
          <div className="xmb-column__icon">{category.icon}</div>
        )}
        <h2 className="xmb-column__title">{category.label}</h2>
      </div>

      <div className="xmb-items">
        {category.items.map((item) => (
          <XMBItem
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
}
