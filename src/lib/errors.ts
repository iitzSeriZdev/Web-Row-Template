// The error reference: every error and warning the Row-Template installer and
// the row-template command can print, what it means and how to fix it, in each
// language.
//
// `texts` are the messages exactly as they appear in the installer source,
// placeholders ($var, ${var}, %s) included. scripts/check-site.mjs compares them
// with src/data/installer-messages.json (extracted from the source by the sync
// script): every message there must appear here, and every text here must
// still exist there.
//
// Prose fields accept `code`, **bold** and [links](/docs/...). In the Persian
// translation of a message (`fa.tr`), ‹…› marks a placeholder.

import messages from "../data/installer-messages.json";
import { ENTRIES } from "../data/errors";
import type { Locale } from "./i18n";

export type Group =
  | "host" | "panel" | "download" | "install" | "activation" | "pasarguard" | "rebecca"
  | "templates" | "branding" | "page" | "update" | "rollback" | "verify" | "uninstall"
  | "cli" | "safety";

export interface ErrorEntry {
  id?: string;
  group: Group;
  texts: string[];
  en: { what: string; fix: string[] };
  fa: { tr: string; what: string; fix: string[] };
}

export const GROUPS: { key: Group; en: string; fa: string; icon: string }[] = [
  { key: "host", en: "Server and panel", fa: "سرور و پنل", icon: "server" },
  { key: "panel", en: "Choosing the panel", fa: "انتخاب پنل", icon: "server-cog" },
  { key: "download", en: "Downloading and checking a release", fa: "دانلود و بررسی نسخه", icon: "download" },
  { key: "install", en: "Installing", fa: "نصب", icon: "package" },
  { key: "activation", en: "Activation and live checks", fa: "فعال‌سازی و بررسی زنده", icon: "plug" },
  { key: "pasarguard", en: "PasarGuard", fa: "PasarGuard", icon: "container" },
  { key: "rebecca", en: "Rebecca", fa: "Rebecca", icon: "database" },
  { key: "templates", en: "Designs and switching", fa: "تمپلیت‌ها و تعویض", icon: "panels-top-left" },
  { key: "branding", en: "Branding and configuration", fa: "برندینگ و پیکربندی", icon: "palette" },
  { key: "page", en: "Generating the page", fa: "ساخت صفحه", icon: "file-code" },
  { key: "update", en: "Updating", fa: "به‌روزرسانی", icon: "refresh-cw" },
  { key: "rollback", en: "Backups and rollback", fa: "پشتیبان‌گیری و بازگردانی", icon: "history" },
  { key: "verify", en: "Verify results", fa: "نتایج verify", icon: "list-checks" },
  { key: "uninstall", en: "Uninstalling", fa: "حذف", icon: "trash-2" },
  { key: "cli", en: "The command and the manager", fa: "فرمان و منوی مدیریت", icon: "terminal" },
  { key: "safety", en: "Internal safety checks", fa: "بررسی‌های ایمنی داخلی", icon: "shield-check" },
];

/** Values the installer substitutes that are the same on every server. The
 *  install directory is not one of them: it is /etc/3x-ui/sub_templates/row-template
 *  on 3X-UI and /etc/row-template on PasarGuard and Rebecca, so it is shown as a
 *  placeholder. */
export const CONSTANTS: Record<string, string> = {
  RT_MIN_XUI: "3.6.0",
  RT_NAME: "row-template",
  RT_LOGO_MAX_BYTES: "262144",
  RT_BIN: "/usr/local/bin/row-template",
  RT_TEMPLATES_AVAILABLE:
    "row editorial canvas prism terminal pulse brutal arcade sketch signature saffron pulsenova prismnova terminalnova arcadenova meter notebook",
  RT_PANEL_IDS: "3xui pasarguard rebecca",
  RT_PG_DATA_DIR: "/var/lib/pasarguard",
  RT_PG_PAGE: "row-template/index.html",
  RT_PG_KEY_PAGE: "SUBSCRIPTION_PAGE_TEMPLATE",
  RT_RB_DATA_DIR: "/var/lib/rebecca",
  RT_TXN_REQUIRED_APPLY_CAPABILITIES: "file_placement selection_write",
};

/** Labels for the values that change from run to run. */
const PLACEHOLDERS: Record<string, Record<Locale, string>> = {
  t: { en: "tool", fa: "ابزار" },
  ART: { en: "file", fa: "فایل" },
  art: { en: "file", fa: "فایل" },
  entry: { en: "path", fa: "مسیر" },
  mtype: { en: "type", fa: "نوع" },
  template: { en: "id", fa: "شناسه" },
  id: { en: "id", fa: "شناسه" },
  tpl: { en: "id", fa: "شناسه" },
  tpl_id: { en: "id", fa: "شناسه" },
  picked: { en: "id", fa: "شناسه" },
  sel_id: { en: "id", fa: "شناسه" },
  RT_TEMPLATE: { en: "value", fa: "مقدار" },
  f: { en: "path", fa: "مسیر" },
  size: { en: "size", fa: "اندازه" },
  dist: { en: "path", fa: "مسیر" },
  nopen: { en: "n", fa: "n" },
  nclose: { en: "n", fa: "n" },
  expected: { en: "hash", fa: "هش" },
  actual: { en: "hash", fa: "هش" },
  "1": { en: "path", fa: "مسیر" },
  d: { en: "path", fa: "مسیر" },
  v: { en: "version", fa: "نسخه" },
  RT_XUI_VERSION: { en: "version", fa: "نسخه" },
  c: { en: "path", fa: "مسیر" },
  rel: { en: "path", fa: "مسیر" },
  base: { en: "url", fa: "نشانی" },
  dir: { en: "path", fa: "مسیر" },
  target: { en: "backup", fa: "پشتیبان" },
  perm: { en: "mode", fa: "مجوز" },
  fails: { en: "n", fa: "n" },
  warns: { en: "n", fa: "n" },
  curver: { en: "version", fa: "نسخه" },
  max: { en: "n", fa: "n" },
  "#list[@]": { en: "n", fa: "n" },
  cmd: { en: "command", fa: "فرمان" },
  LINENO: { en: "line", fa: "خط" },
  s: { en: "path", fa: "مسیر" },
  // 1.3.0: the install directory depends on the panel
  RT_ROOT: { en: "install dir", fa: "پوشهٔ نصب" },
  RT_DIST: { en: "path", fa: "مسیر" },
  RT_LIVE: { en: "path", fa: "مسیر" },
  RT_BACKUPS: { en: "path", fa: "مسیر" },
  RT_BACKUPS_V2: { en: "path", fa: "مسیر" },
  RT_TEMPLATE_STORE: { en: "path", fa: "مسیر" },
  RT_PANEL_FILE: { en: "path", fa: "مسیر" },
  // command substitutions, named by the sync script
  PANEL: { en: "panel", fa: "پنل" },
  PANELS: { en: "panels", fa: "پنل‌ها" },
  BACKUP: { en: "backup", fa: "پشتیبان" },
  IMAGE: { en: "image", fa: "ایمیج" },
  N_PRESENT: { en: "n", fa: "n" },
  // 1.3.0 variables
  RT_PANEL: { en: "value", fa: "مقدار" },
  panel: { en: "panel", fa: "پنل" },
  name: { en: "file", fa: "فایل" },
  src: { en: "path", fa: "مسیر" },
  dest: { en: "path", fa: "مسیر" },
  root: { en: "path", fa: "مسیر" },
  env: { en: "path", fa: "مسیر" },
  file: { en: "path", fa: "مسیر" },
  final: { en: "path", fa: "مسیر" },
  found: { en: "path", fa: "مسیر" },
  r: { en: "path", fa: "مسیر" },
  p: { en: "path", fa: "مسیر" },
  ver: { en: "version", fa: "نسخه" },
  pver: { en: "version", fa: "نسخه" },
  corrupt: { en: "ids", fa: "شناسه‌ها" },
  missing: { en: "ids", fa: "شناسه‌ها" },
  n_avail: { en: "n", fa: "n" },
  n: { en: "n", fa: "n" },
  canon: { en: "format", fa: "قالب" },
  legacy: { en: "format", fa: "قالب" },
  state: { en: "state", fa: "وضعیت" },
  st: { en: "state", fa: "وضعیت" },
  now: { en: "state", fa: "وضعیت" },
  to: { en: "state", fa: "وضعیت" },
  RT_TXN_STATE: { en: "state", fa: "وضعیت" },
  block: { en: "state", fa: "وضعیت" },
  now_block: { en: "state", fa: "وضعیت" },
  mech: { en: "mechanism", fa: "سازوکار" },
  running: { en: "value", fa: "مقدار" },
  was_running: { en: "value", fa: "مقدار" },
  key: { en: "key", fa: "کلید" },
  cur: { en: "value", fa: "مقدار" },
  page: { en: "value", fa: "مقدار" },
  nowpage: { en: "value", fa: "مقدار" },
  "2": { en: "value", fa: "مقدار" },
  rc: { en: "status", fa: "وضعیت" },
  original: { en: "status", fa: "وضعیت" },
  why: { en: "reason", fa: "علت" },
  tok: { en: "capability", fa: "قابلیت" },
  need: { en: "capability", fa: "قابلیت" },
  impl: { en: "adapter", fa: "آداپتور" },
  verb: { en: "operation", fa: "عملیات" },
  mode: { en: "mode", fa: "حالت" },
};

const TOKEN = /\$\{([#A-Za-z_0-9@\[\]]+)(?::[^}]*)?\}|\$([A-Za-z_][A-Za-z_0-9]*|\d)|%(s)/g;

export type Piece = { text: string; ph?: boolean };

/** Split a message into literal text and placeholders, constants filled in. */
export function pieces(text: string, locale: Locale): Piece[] {
  const out: Piece[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const name = m[1] ?? m[2] ?? m[3];
    out.push({ text: text.slice(last, m.index) });
    if (CONSTANTS[name] !== undefined) out.push({ text: CONSTANTS[name] });
    else out.push({ text: PLACEHOLDERS[name]?.[locale] ?? name, ph: true });
    last = m.index! + m[0].length;
  }
  out.push({ text: text.slice(last) });
  return out.filter((p) => p.text !== "" || p.ph);
}

export function unknownPlaceholders(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(TOKEN)) {
    const name = m[1] ?? m[2] ?? m[3];
    if (CONSTANTS[name] === undefined && PLACEHOLDERS[name] === undefined) out.push(name);
  }
  return out;
}

/** The anchor of an entry: its explicit id, else a slug of its first message. */
export function entryId(e: ErrorEntry): string {
  if (e.id) return e.id;
  const bare = e.texts[0].replace(TOKEN, " ").toLowerCase();
  let slug = bare.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (slug.length > 64) slug = slug.slice(0, 64).replace(/-[^-]*$/, "");
  return slug;
}

interface Source { file: string; line: number; fn: string; level: "FAIL" | "warn"; text: string }
const SOURCES = (messages as { messages: Source[] }).messages;

/** How a message is prefixed when printed: install:, row-template:, FAIL or warn. */
export function prefixesOf(text: string): string[] {
  const set = new Set<string>();
  for (const s of SOURCES) {
    if (s.text !== text) continue;
    if (s.file.endsWith("install.sh")) set.add("install:");
    else if (s.file.endsWith("bin/row-template") && s.fn === "(top)" && !/^unexpected|^unknown/.test(s.text)) set.add("row-template:");
    else set.add(s.level);
  }
  return [...set];
}

/** Which commands can print an entry's messages, from the functions they come from. */
const CONTEXT: Record<string, string[]> = {
  rt_require_root: ["installer", "config", "update", "rollback", "uninstall", "manager"],
  rt_check_min_version: ["installer"],
  rt_detect_xui_db: ["installer", "verify", "uninstall", "manager"],
  rt_config_write: ["installer", "config", "manager"],
  rt_template_effective: ["installer", "update", "verify", "config", "manager"],
  rt_config_set_template: ["installer", "update", "rollback", "manager"],
  rt_reconcile_artifact_to_selection: ["config", "manager"],
  rt_stage_template_store: ["installer", "update"],
  rt_switch_template: ["manager"],
  rt_logo_validate: ["installer", "config", "manager"],
  rt_generate: ["installer", "config", "update", "rollback", "manager"],
  rt_validate_template: ["installer", "config", "update", "rollback", "manager"],
  rt_sha256: ["installer", "update", "verify", "rollback", "manager"],
  rt_verify_sha256: ["installer", "update", "verify", "rollback", "manager"],
  rt_assert_not_symlink: ["installer", "config", "update", "rollback", "manager", "uninstall"],
  rt_safe_rmdir: ["installer", "update", "manager"],
  rt_backup_create: ["installer", "update", "rollback", "manager"],
  rt_backups_prune: ["installer", "update", "manager"],
  rt_payload_companions: ["installer", "update"],
  rt_payload_companions_ok: ["installer", "update"],
  rt_set_dist: ["installer", "config", "update", "rollback", "manager"],
  rt_config_interactive: ["installer", "config"],
  rt_render_report: ["installer", "config", "update", "rollback", "manager"],
  rt_tar_extract_safe: ["update"],
  rt_release_source: ["update", "manager"],
  rt_fetch_release: ["update"],
  rt_restore_from_backup: ["update", "rollback", "manager"],
  rt_cmd_install: ["installer"],
  rt_cmd_config: ["config"],
  rt_cmd_verify: ["verify"],
  rt_uninstall_files: ["uninstall"],
  rt_cmd_uninstall: ["uninstall"],
  rt_cmd_update: ["update"],
  rt_cmd_rollback: ["rollback"],
  rt_ui_menu_select: ["manager"],
  rt_manager_update: ["manager"],
  rt_manager_activate: ["manager"],
  rt_apply_branding: ["manager"],
  rt_reconfig_service_name: ["manager"],
  rt_reconfig_support_url: ["manager"],
  rt_reconfig_logo: ["manager"],
  rt_reconfig_template: ["manager"],
  rt_reconfig_reset: ["manager"],
  rt_manager_main: ["manager"],
  rt_install_pick_template: ["installer"],
  rt_panels_load: ["any command"],
  rt_transaction_load: ["any command"],
  // 1.3.0: panels, and completing an installation
  "(top)": ["any command"],
  rt_repair_template_store: ["installer", "config", "update", "verify", "manager"],
  rt_complete_install: ["config", "verify", "manager"],
  rt_activate: ["installer", "config", "update", "rollback", "manager"],
  rt_print_activation_note: ["installer"],
  rt_installed_panel: ["any command"],
  rt_existing_root: ["installer"],
  rt_panel_choose: ["installer"],
  rt_panel_report_partial: ["installer"],
  rt_panel_activate: ["installer", "manager"],
  rt_install_activate_panel: ["installer"],
  rt_verify_panel: ["verify"],
  rt_uninstall_panel: ["uninstall"],
  rt_manager_activate_panel: ["manager"],
  rt_backup_format: ["installer", "manager", "uninstall"],
  rt_backup_panel_write: ["installer", "manager"],
  rt_backup_panel_aux_set: ["installer", "manager"],
  rt_backup_manifest_write: ["installer", "manager"],
  rt_backup_create_v2: ["installer", "manager"],
  rt_transaction_state_set: ["installer", "manager"],
  rt_transaction_lock_acquire: ["installer", "manager"],
  rt_transaction_stage_reset: ["installer", "manager"],
  rt_transaction_rollback_report_failure: ["installer", "manager"],
  rt_transaction_rollback: ["installer", "manager"],
  rt_transaction_body: ["installer", "manager"],
  rt_panel_pasarguard_env_rewrite: ["installer", "manager", "uninstall"],
  rt_panel_pasarguard_root: ["installer", "config", "update", "rollback", "verify", "uninstall", "manager"],
  rt_panel_pasarguard_db_notes: ["installer", "verify", "manager"],
  rt_panel_pasarguard_backup_state: ["installer", "manager"],
  rt_panel_pasarguard_place: ["installer", "config", "update", "rollback", "manager"],
  rt_panel_pasarguard_install_template: ["installer", "config", "update", "rollback", "manager"],
  rt_panel_pasarguard_verify: ["installer", "verify", "manager"],
  rt_panel_pasarguard_remove_page: ["installer", "uninstall", "manager"],
  rt_panel_pasarguard_restore_state: ["installer", "manager"],
  rt_panel_pasarguard_uninstall_template: ["uninstall"],
  rt_panel_rebecca_edition_ok: ["installer", "config", "update", "rollback", "verify", "manager"],
  rt_panel_rebecca_root: ["installer", "config", "update", "rollback", "verify", "uninstall", "manager"],
  rt_panel_rebecca_backup_state: ["installer", "manager"],
  rt_panel_rebecca_place: ["installer", "config", "update", "rollback", "manager"],
  rt_panel_rebecca_install_template: ["installer", "config", "update", "rollback", "manager"],
  rt_panel_rebecca_verify: ["installer", "verify", "manager"],
  rt_panel_rebecca_remove_page: ["installer", "uninstall", "manager"],
  rt_panel_rebecca_restore_record: ["installer", "uninstall", "manager"],
  rt_panel_rebecca_restore_state: ["installer", "uninstall", "manager"],
  // checks no row-template command reaches in 1.3.0 (the 3X-UI adapter, and
  // the interface's own argument checks)
  rt_panel_3xui_backup_state: ["internal"],
  rt_panel_3xui_install_template: ["internal"],
  rt_panel_3xui_verify: ["internal"],
  rt_panel_3xui_restore_state: ["internal"],
  rt_panel_dispatch: ["internal"],
  rt_panel_arg_ok: ["internal"],
  rt_panel_install_template: ["internal"],
  rt_panel_verify: ["internal"],
  rt_panel_restore_state: ["internal"],
};

export function contextsOf(e: ErrorEntry): string[] {
  const set = new Set<string>();
  for (const text of e.texts) {
    for (const s of SOURCES) {
      if (s.text !== text) continue;
      const ctx = s.file.endsWith("install.sh") ? ["installer"]
        : s.file.endsWith("bin/row-template") ? ["any command"]
        : CONTEXT[s.fn] ?? [];
      ctx.forEach((c) => set.add(c));
    }
  }
  const order = ["installer", "config", "update", "rollback", "verify", "uninstall", "manager", "any command", "internal"];
  return [...set].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export const CONTEXT_LABEL: Record<string, Record<Locale, string>> = {
  installer: { en: "installer", fa: "نصب‌کننده" },
  config: { en: "row-template config", fa: "row-template config" },
  update: { en: "row-template update", fa: "row-template update" },
  rollback: { en: "row-template rollback", fa: "row-template rollback" },
  verify: { en: "row-template verify", fa: "row-template verify" },
  uninstall: { en: "row-template uninstall", fa: "row-template uninstall" },
  manager: { en: "manager", fa: "منوی مدیریت" },
  "any command": { en: "any command", fa: "هر فرمانی" },
  internal: { en: "no command (internal check)", fa: "هیچ فرمانی (بررسی داخلی)" },
};

export { ENTRIES };
