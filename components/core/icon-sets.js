// Per-design icon sets. Icons are a huge part of a design system's identity,
// so each design may bring its own set. Components/apps always use the M3
// (Material Symbols) name as the SEMANTIC name; non-M3 sets map it to their
// own glyph. Unmapped names fall back to Material Symbols so nothing breaks.
//
// cupertino: Framework7 Icons — MIT-licensed, SF-Symbols-style, ligature font
// (same usage model as Material Symbols). The font is loaded by
// themes/cupertino.css.

export const ICON_SETS = {
  cupertino: {
    className: 'f7-icons',
    map: {
      add: 'plus',
      archive: 'archivebox',
      unarchive: 'tray_arrow_up',
      bar_chart: 'chart_bar',
      business: 'briefcase',
      calendar_month: 'calendar',
      check: 'checkmark',
      check_box: 'checkmark_square_fill',
      check_box_outline_blank: 'square',
      chevron_left: 'chevron_left',
      chevron_right: 'chevron_right',
      close: 'xmark',
      delete: 'trash',
      download: 'cloud_download',
      edit: 'pencil',
      expand_more: 'chevron_down',
      filter_list: 'line_horizontal_3_decrease',
      folder: 'folder',
      groups: 'person_2',
      info: 'info_circle',
      lightbulb: 'lightbulb',
      logout: 'square_arrow_right',
      picture_as_pdf: 'doc_text',
      receipt_long: 'doc_plaintext',
      save: 'floppy_disk',
      schedule: 'clock',
      search: 'search',
      settings: 'gear_alt',
      table_view: 'table',
    },
  },
};

// Resolve a semantic (Material) icon name for the active design.
// Returns { className, glyph } — className is the icon FONT class; glyph is
// the ligature text to render.
export function resolveIcon(design, name, materialClassName) {
  const set = ICON_SETS[design];
  const glyph = set && set.map[name];
  if (glyph) return { className: set.className, glyph, foreign: true };
  return { className: materialClassName, glyph: name, foreign: false };
}
