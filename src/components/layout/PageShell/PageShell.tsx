/**
 * PageShell Component
 * Main page layout wrapper
 */

import type { PageShellProps } from '../../../types/design-system';

export function PageShell({
  header,
  footer,
  contentWidth = 'default',
  className = '',
  children,
}: PageShellProps) {
  const mainClasses = [
    'page-shell__main',
    contentWidth !== 'default' && `page-shell__main--${contentWidth}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`page-shell ${className}`}>
      {header && (
        <header className="page-shell__header">
          <div className="page-shell__header-content">{header}</div>
        </header>
      )}

      <main className={mainClasses}>{children}</main>

      {footer && (
        <footer className="page-shell__footer">
          <div className="page-shell__footer-content">{footer}</div>
        </footer>
      )}
    </div>
  );
}
