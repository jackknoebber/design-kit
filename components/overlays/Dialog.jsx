import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Material 3 basic dialog. Renders a scrim + centered surface when `open`.
 * Provide `actions` (e.g. buttons) for the action row.
 *
 * Styling lives in components.css (.dk-dialog and parts) so themes can
 * restyle it — this file carries structure only.
 */
export function Dialog({
  open = true,
  onClose,
  icon,
  headline = 'Dialog title',
  children,
  actions,
  style = {},
  ...rest
}) {
  if (!open) return null;
  return (
    <div className="dk-dialog__scrim" onClick={onClose}>
      <div
        className={`dk-dialog${icon ? ' dk-dialog--centered' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={style}
        {...rest}
      >
        {icon && (
          <div className="dk-dialog__icon">
            <Icon name={icon} size={24} color="var(--md-sys-color-secondary)" />
          </div>
        )}
        <h2 className="dk-dialog__headline">{headline}</h2>
        <div className="dk-dialog__body">{children}</div>
        {actions && <div className="dk-dialog__actions">{actions}</div>}
      </div>
    </div>
  );
}
