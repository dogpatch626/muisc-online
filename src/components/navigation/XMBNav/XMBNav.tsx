/**
 * XMBNav Component
 * PlayStation-style horizontal navigation
 */

import { useState } from 'react';
import type { XMBNavProps, XMBItem as XMBItemType } from '../../../types/design-system';
import { XMBCategory } from './XMBCategory';

export function XMBNav({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
}: XMBNavProps) {
  const [activeItemId, setActiveItemId] = useState<string | undefined>();

  const handleItemSelect = (item: XMBItemType) => {
    setActiveItemId(item.id);

    if (item.onClick) {
      item.onClick();
    }

    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className={`xmb-grid ${className}`}>
      {categories.map((category) => (
        <XMBCategory
          key={category.id}
          category={category}
          activeItemId={
            activeCategory === category.id ? activeItemId : undefined
          }
          onItemSelect={handleItemSelect}
        />
      ))}
    </div>
  );
}
