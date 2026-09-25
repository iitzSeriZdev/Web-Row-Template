// Every installer message, explained. See src/lib/errors.ts for the format.
import type { ErrorEntry } from "../lib/errors";

export const ENTRIES: ErrorEntry[] = [
  // --- server and panel --------------------------------------------------
  {
    group: "host",
    texts: [
      "the installer must run as root (e.g. sudo bash install.sh).",
      "this operation must run as root (e.g. sudo $RT_NAME ...)",
    ],
    en: {
      what: "Installing, and every command that changes the system (`config`, `update`, `rollback`, `uninstall` and the manager), needs root. Nothing was changed.",
      fix: [
        "Open a root shell with `sudo -i` and run the command again.",
        "For the one-command install, do not use `sudo bash <(curl …)`: `sudo` closes the file descriptor `<(…)` creates. Become root first.",
      ],
    },
    fa: {
      tr: "نصب‌کننده باید با کاربر `root` اجرا شود (مثلاً `sudo bash install.sh`). / این عملیات باید با `root` اجرا شود (مثلاً `sudo row-template` ...)",
      what: "نصب و هر فرمانی که چیزی را در سیستم تغییر می‌دهد (`config`، `update`، `rollback`، `uninstall` و منوی مدیریت) به دسترسی root نیاز دارد. هیچ تغییری اعمال نشده است.",
      fix: [
        "با `sudo -i` یک پوستهٔ root باز کنید و فرمان را دوباره اجرا کنید.",
        "برای نصب یک‌خطی از `sudo bash <(curl …)` استفاده نکنید؛ `sudo` توصیف‌گر فایلی را که `<(…)` می‌سازد می‌بندد. اول root شوید.",
      ],
    },
  },
  {
    group: "host",
    texts: ["required tool not found: $t"],
    en: {
      what: "The installer needs `tar` and `sha256sum` (or `shasum`) to verify and unpack the release, and one of them is missing. Nothing was downloaded or changed.",
      fix: [
        "Install the missing tool — on Debian and Ubuntu: `apt-get install -y tar coreutils`; on RHEL-family systems: `dnf install -y tar coreutils`.",
        "Run the installer again.",
      ],
    },
    fa: {
      tr: "ابزار لازم پیدا نشد: ‹ابزار›",
      what: "نصب‌کننده برای بررسی و باز کردن نسخه به `tar` و `sha256sum` (یا `shasum`) نیاز دارد و یکی از آن‌ها نصب نیست. چیزی دانلود یا تغییر داده نشده است.",
      fix: [
        "ابزار ناموجود را نصب کنید — در Debian و Ubuntu: `apt-get install -y tar coreutils`؛ در خانوادهٔ RHEL: `dnf install -y tar coreutils`.",
        "نصب‌کننده را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "host",
    texts: ["no sha256 tool (sha256sum or shasum) found"],
    en: {
      what: "Row-Template checks every file it installs with SHA-256 and found no tool to compute it. The operation stopped before changing anything.",
      fix: ["Install coreutils (which provides `sha256sum`) and run the command again."],
    },
    fa: {
      tr: "هیچ ابزار `sha256` (یعنی `sha256sum` یا `shasum`) پیدا نشد",
      what: "Row-Template هر فایلی را که نصب می‌کند با SHA-256 بررسی می‌کند و ابزاری برای محاسبهٔ آن پیدا نکرد. عملیات پیش از هر تغییری متوقف شد.",
      fix: ["بستهٔ coreutils را (که `sha256sum` را دارد) نصب کنید و فرمان را دوباره اجرا کنید."],
    },
  },
  {
    group: "host",
    texts: ["no 3x-ui installation was detected on this host."],
    en: {
      what: "The installer found neither the 3X-UI binary (`/usr/local/x-ui/x-ui`, `/usr/local/bin/x-ui`, or `x-ui` on the `PATH`) nor a systemd unit named `x-ui.service`. Nothing was changed.",
      fix: [
        "Run the installer on the server that runs your 3X-UI panel.",
        "Check the panel is installed: `ls -l /usr/local/x-ui/x-ui` and `systemctl status x-ui`.",
        "A panel running in a container, or installed under another name, is not supported.",
      ],
    },
    fa: {
      tr: "هیچ نصبی از 3x-ui روی این سرور پیدا نشد.",
      what: "نصب‌کننده نه فایل اجرایی 3X-UI را پیدا کرد (`/usr/local/x-ui/x-ui`، `/usr/local/bin/x-ui` یا `x-ui` در `PATH`) و نه سرویس systemd با نام `x-ui.service` را. هیچ تغییری اعمال نشده است.",
      fix: [
        "نصب‌کننده را روی همان سروری اجرا کنید که پنل 3X-UI روی آن است.",
        "از نصب بودن پنل مطمئن شوید: `ls -l /usr/local/x-ui/x-ui` و `systemctl status x-ui`.",
        "پنلی که داخل کانتینر یا با نام دیگری نصب شده باشد پشتیبانی نمی‌شود.",
      ],
    },
  },
  {
    group: "host",
    texts: ["cannot determine the 3x-ui version; refusing to proceed"],
    en: {
      what: "3X-UI was found, but its version could not be read from `x-ui -v`. Row-Template will not install on a panel whose version it cannot confirm. Nothing was changed.",
      fix: [
        "Run `/usr/local/x-ui/x-ui -v` and check it prints a version such as `3.7.0`.",
        "If it fails, repair or reinstall 3X-UI first, then run the installer again.",
      ],
    },
    fa: {
      tr: "نسخهٔ 3x-ui مشخص نشد؛ ادامه نمی‌دهم",
      what: "3X-UI پیدا شد، اما نسخهٔ آن از خروجی `x-ui -v` خوانده نشد. Row-Template روی پنلی که نسخه‌اش را نمی‌تواند تأیید کند نصب نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "فرمان `/usr/local/x-ui/x-ui -v` را اجرا کنید و ببینید نسخه‌ای مثل `3.7.0` چاپ می‌کند یا نه.",
        "اگر خطا داد، اول 3X-UI را تعمیر یا دوباره نصب کنید و بعد نصب‌کننده را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "host",
    texts: [
      "3x-ui $v is below the required minimum $RT_MIN_XUI; not installing",
      "3x-ui $RT_XUI_VERSION is below the minimum $RT_MIN_XUI.",
    ],
    en: {
      what: "Row-Template 1.2.0 needs 3X-UI 3.6.0 or newer, and the panel is older. The installer stops without changing anything; `verify` reports it as a hard failure.",
      fix: ["Update 3X-UI to 3.6.0 or newer, then run the installer (or `row-template verify`) again."],
    },
    fa: {
      tr: "نسخهٔ ‹نسخه› از 3x-ui پایین‌تر از حداقل لازم یعنی 3.6.0 است؛ نصب انجام نمی‌شود / نسخهٔ ‹نسخه› از 3x-ui پایین‌تر از حداقل 3.6.0 است.",
      what: "Row-Template 1.2.0 به 3X-UI نسخهٔ 3.6.0 یا جدیدتر نیاز دارد و پنل شما قدیمی‌تر است. نصب‌کننده بدون هیچ تغییری متوقف می‌شود و `verify` آن را خطای جدی گزارش می‌کند.",
      fix: ["3X-UI را به نسخهٔ 3.6.0 یا جدیدتر به‌روز کنید و نصب‌کننده (یا `row-template verify`) را دوباره اجرا کنید."],
    },
  },
  {
    group: "host",
    texts: ["XUI_DB_FOLDER database is not an SQLite database: $c (not falling back to another database)"],
    en: {
      what: "`XUI_DB_FOLDER` names a folder whose `x-ui.db` is not a valid SQLite database. Row-Template refuses it and deliberately does not try another location, which could belong to a different installation. The panel setting can then only be set by hand.",
      fix: [
        "Check the folder is the one your panel uses, and that `x-ui.db` in it is the live database.",
        "Correct or unset `XUI_DB_FOLDER` and run the command again.",
        "Or set **Sub Theme Directory** in the panel yourself — see [Activation](/docs/installation/activation/).",
      ],
    },
    fa: {
      tr: "پایگاه‌دادهٔ `XUI_DB_FOLDER` یک پایگاه‌دادهٔ SQLite نیست: ‹مسیر› (به پایگاه‌دادهٔ دیگری مراجعه نمی‌شود)",
      what: "پوشه‌ای که `XUI_DB_FOLDER` نشان می‌دهد فایل `x-ui.db` معتبری از نوع SQLite ندارد. Row-Template آن را رد می‌کند و عمداً سراغ مسیر دیگری نمی‌رود، چون ممکن است متعلق به نصب دیگری باشد. در این حالت تنظیم پنل فقط به‌صورت دستی ممکن است.",
      fix: [
        "مطمئن شوید این پوشه همان پوشه‌ای است که پنل استفاده می‌کند و `x-ui.db` داخل آن پایگاه‌دادهٔ فعال است.",
        "مقدار `XUI_DB_FOLDER` را اصلاح یا حذف کنید و فرمان را دوباره اجرا کنید.",
        "یا **Sub Theme Directory** را خودتان در پنل تنظیم کنید — [فعال‌سازی](/docs/installation/activation/) را ببینید.",
      ],
    },
  },
  {
    group: "host",
    texts: ["panel database is not an SQLite database: $c (not falling back to another database; set XUI_DB_FOLDER to the panel's database folder)"],
    en: {
      what: "The first panel database found in the default locations (`/etc/x-ui/x-ui.db`, `/usr/local/x-ui/x-ui.db`, `/etc/3x-ui/x-ui.db`, in that order) is not a valid SQLite file. It is refused, and the next location is deliberately not tried. Automatic activation and the `subThemeDir` checks are unavailable until this is resolved.",
      fix: [
        "Find the database your panel really uses and run the command with `XUI_DB_FOLDER=/path/to/its/folder`.",
        "If the named file is a stale leftover, move it away — only when you are sure the panel does not use it.",
        "Or set **Sub Theme Directory** in the panel by hand.",
      ],
    },
    fa: {
      tr: "پایگاه‌دادهٔ پنل از نوع SQLite نیست: ‹مسیر› (به پایگاه‌دادهٔ دیگری مراجعه نمی‌شود؛ `XUI_DB_FOLDER` را روی پوشهٔ پایگاه‌دادهٔ پنل تنظیم کنید)",
      what: "اولین پایگاه‌دادهٔ پنل که در مسیرهای پیش‌فرض پیدا شد (به ترتیب `/etc/x-ui/x-ui.db`، `/usr/local/x-ui/x-ui.db` و `/etc/3x-ui/x-ui.db`) فایل SQLite معتبری نیست. این فایل رد می‌شود و عمداً مسیر بعدی امتحان نمی‌شود. تا این مشکل حل نشود، فعال‌سازی خودکار و بررسی‌های `subThemeDir` در دسترس نیستند.",
      fix: [
        "پایگاه‌داده‌ای را که پنل واقعاً استفاده می‌کند پیدا کنید و فرمان را با `XUI_DB_FOLDER=/path/to/its/folder` اجرا کنید.",
        "اگر فایل نام‌برده باقی‌ماندهٔ قدیمی است، جابه‌جایش کنید — فقط وقتی مطمئن هستید پنل از آن استفاده نمی‌کند.",
        "یا **Sub Theme Directory** را دستی در پنل تنظیم کنید.",
      ],
    },
  },

  // --- downloading and checking a release ---------------------------------
  {
    group: "download",
    texts: ["curl is required to download the release.", "curl is required for RT_RELEASE_URL."],
    en: {
      what: "The release is downloaded with `curl`, which is not installed. Nothing was changed.",
      fix: [
        "Install it — `apt-get install -y curl` or `dnf install -y curl` — and run the installer again.",
        "Or install from a local folder with `RT_RELEASE_DIR`, which needs no `curl`: see [Manual installation](/docs/installation/manual/).",
      ],
    },
    fa: {
      tr: "برای دانلود نسخه به `curl` نیاز است. / برای `RT_RELEASE_URL` به `curl` نیاز است.",
      what: "نسخه با `curl` دانلود می‌شود و `curl` نصب نیست. هیچ تغییری اعمال نشده است.",
      fix: [
        "آن را نصب کنید — `apt-get install -y curl` یا `dnf install -y curl` — و نصب‌کننده را دوباره اجرا کنید.",
        "یا با `RT_RELEASE_DIR` از یک پوشهٔ محلی نصب کنید که به `curl` نیازی ندارد: [نصب دستی](/docs/installation/manual/).",
      ],
    },
  },
  {
    group: "download",
    texts: [
      "RT_RELEASE_URL must use https:// (set RT_ALLOW_INSECURE_URL=1 to override for local testing).",
      "the release URL must use https:// (set RT_ALLOW_INSECURE_URL=1 to override for local testing).",
    ],
    en: {
      what: "`RT_RELEASE_URL` points at an `http://` address. Releases are fetched over HTTPS only, so nobody on the network path can swap the files. Nothing was downloaded.",
      fix: [
        "Serve your mirror over HTTPS and use its `https://` address.",
        "`RT_ALLOW_INSECURE_URL=1` exists for local testing only — do not use it on a production server.",
      ],
    },
    fa: {
      tr: "`RT_RELEASE_URL` باید از `https://` استفاده کند (برای آزمایش محلی می‌توانید `RT_ALLOW_INSECURE_URL=1` را تنظیم کنید).",
      what: "`RT_RELEASE_URL` به یک نشانی `http://` اشاره می‌کند. نسخه‌ها فقط از طریق HTTPS دریافت می‌شوند تا کسی در مسیر شبکه نتواند فایل‌ها را عوض کند. چیزی دانلود نشده است.",
      fix: [
        "آینهٔ (mirror) خود را روی HTTPS ارائه کنید و نشانی `https://` آن را بدهید.",
        "`RT_ALLOW_INSECURE_URL=1` فقط برای آزمایش محلی است — روی سرور اصلی از آن استفاده نکنید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["RT_RELEASE_URL must be an http(s) URL.", "the release URL must be an http(s) URL: $base"],
    en: {
      what: "The value of `RT_RELEASE_URL` is not a web address. Nothing was downloaded.",
      fix: [
        "Give the base URL of the folder holding the release files, for example `https://mirror.example.com/row-template/1.2.0`.",
        "For a folder on the server itself, use `RT_RELEASE_DIR` instead.",
      ],
    },
    fa: {
      tr: "`RT_RELEASE_URL` باید یک نشانی `http(s)` باشد. / نشانی نسخه باید یک نشانی `http(s)` باشد: ‹نشانی›",
      what: "مقدار `RT_RELEASE_URL` نشانی وب نیست. چیزی دانلود نشده است.",
      fix: [
        "نشانی پوشه‌ای را بدهید که فایل‌های نسخه در آن است، مثلاً `https://mirror.example.com/row-template/1.2.0`.",
        "برای پوشه‌ای روی خود سرور، به‌جای آن از `RT_RELEASE_DIR` استفاده کنید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["the release URL uses http:// (insecure); proceeding because RT_ALLOW_INSECURE_URL is set."],
    en: {
      what: "A plain-HTTP release source is being used because you allowed it. The checksum is still verified, but it cannot protect against someone who replaces both the files and their checksum on the way.",
      fix: ["Use this only for local testing. On real servers, unset `RT_ALLOW_INSECURE_URL` and serve releases over HTTPS."],
    },
    fa: {
      tr: "نشانی نسخه از `http://` (ناامن) استفاده می‌کند؛ چون `RT_ALLOW_INSECURE_URL` تنظیم شده، ادامه می‌دهم.",
      what: "چون خودتان اجازه داده‌اید، از منبع HTTP ساده استفاده می‌شود. چک‌سام همچنان بررسی می‌شود، اما در برابر کسی که هم فایل‌ها و هم چک‌سام آن‌ها را در مسیر عوض کند محافظتی ندارد.",
      fix: ["فقط برای آزمایش محلی از آن استفاده کنید. روی سرور واقعی `RT_ALLOW_INSECURE_URL` را حذف کنید و نسخه‌ها را روی HTTPS ارائه دهید."],
    },
  },
  {
    group: "download",
    texts: ["cannot create a work directory."],
    en: {
      what: "A temporary folder for the download could not be created — usually because `/tmp` is full or not writable. Nothing was changed.",
      fix: [
        "Check free space with `df -h /tmp` and free some up.",
        "Check `/tmp` is writable, then run the command again.",
      ],
    },
    fa: {
      tr: "پوشهٔ کاری ساخته نشد.",
      what: "پوشهٔ موقتی برای دانلود ساخته نشد — معمولاً چون `/tmp` پر است یا قابل نوشتن نیست. هیچ تغییری اعمال نشده است.",
      fix: [
        "فضای آزاد را با `df -h /tmp` بررسی کنید و فضا آزاد کنید.",
        "از قابل نوشتن بودن `/tmp` مطمئن شوید و فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["cannot fetch manifest.txt from the release source.", "cannot fetch manifest.txt"],
    en: {
      what: "The first file of the release could not be downloaded — the release source is unreachable. With `RT_RELEASE_DIR`, the folder has no `manifest.txt`. Nothing was changed.",
      fix: [
        "Check the server can reach GitHub: `curl -I https://github.com`.",
        "If GitHub is blocked, install or update from a local folder — see [Manual installation](/docs/installation/manual/).",
        "With `RT_RELEASE_DIR`, check the folder holds `manifest.txt`, `SHA256SUMS` and the tarball.",
      ],
    },
    fa: {
      tr: "`manifest.txt` از منبع نسخه دریافت نشد.",
      what: "اولین فایل نسخه دانلود نشد — منبع نسخه در دسترس نیست. اگر از `RT_RELEASE_DIR` استفاده کرده‌اید، آن پوشه فایل `manifest.txt` ندارد. هیچ تغییری اعمال نشده است.",
      fix: [
        "دسترسی سرور به GitHub را بررسی کنید: `curl -I https://github.com`.",
        "اگر GitHub مسدود است، از یک پوشهٔ محلی نصب یا به‌روزرسانی کنید — [نصب دستی](/docs/installation/manual/) را ببینید.",
        "با `RT_RELEASE_DIR`، مطمئن شوید پوشه فایل‌های `manifest.txt`، `SHA256SUMS` و tarball را دارد.",
      ],
    },
  },
  {
    group: "download",
    texts: ["cannot fetch SHA256SUMS from the release source.", "cannot fetch SHA256SUMS"],
    en: {
      what: "The release's checksum file could not be downloaded, and nothing is ever installed without it. Nothing was changed.",
      fix: [
        "Retry — the connection may have dropped.",
        "With `RT_RELEASE_DIR`, copy the release's `SHA256SUMS` into the folder.",
      ],
    },
    fa: {
      tr: "SHA256SUMS از منبع نسخه دریافت نشد.",
      what: "فایل چک‌سام نسخه دانلود نشد و بدون آن هیچ چیزی نصب نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "دوباره امتحان کنید — ممکن است اتصال قطع شده باشد.",
        "با `RT_RELEASE_DIR`، فایل `SHA256SUMS` نسخه را در آن پوشه کپی کنید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["manifest.txt has no artifact= entry.", "manifest has no artifact= entry"],
    en: {
      what: "`manifest.txt` does not say which archive to open, so it is not a Row-Template release manifest. Nothing was changed.",
      fix: [
        "Download `manifest.txt` again from the official release page.",
        "On a mirror, check you uploaded the release's own file, unchanged.",
      ],
    },
    fa: {
      tr: "`manifest.txt` ورودی `artifact=` ندارد.",
      what: "فایل `manifest.txt` مشخص نمی‌کند کدام آرشیو باید باز شود، پس manifest نسخهٔ Row-Template نیست. هیچ تغییری اعمال نشده است.",
      fix: [
        "`manifest.txt` را دوباره از صفحهٔ رسمی نسخه دانلود کنید.",
        "اگر از آینه استفاده می‌کنید، مطمئن شوید همان فایل اصلی نسخه را بدون تغییر آپلود کرده‌اید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["manifest artifact name is unsafe: $ART", "manifest artifact name is unsafe: $art"],
    en: {
      what: "The archive name in `manifest.txt` contains `/` or `..`, which could point outside the download folder. It is refused. Nothing was changed.",
      fix: ["Use the official, unmodified `manifest.txt`. A manifest like this was not produced by a Row-Template release."],
    },
    fa: {
      tr: "نام آرشیو در `manifest` ناامن است: ‹فایل›",
      what: "نام آرشیو در `manifest.txt` شامل `/` یا `..` است که می‌تواند به بیرون از پوشهٔ دانلود اشاره کند؛ پس رد می‌شود. هیچ تغییری اعمال نشده است.",
      fix: ["از `manifest.txt` رسمی و دست‌نخورده استفاده کنید. چنین manifestی را هیچ نسخهٔ Row-Template تولید نمی‌کند."],
    },
  },
  {
    group: "download",
    texts: ["cannot fetch the release artifact: $ART", "cannot fetch $art"],
    en: {
      what: "The release archive named in the manifest could not be downloaded, or is not in the `RT_RELEASE_DIR` folder. Nothing was changed.",
      fix: [
        "Retry — large downloads can time out on slow links.",
        "With `RT_RELEASE_DIR`, check the tarball named in `manifest.txt` is in the folder, with that exact name.",
      ],
    },
    fa: {
      tr: "آرشیو نسخه دریافت نشد: ‹فایل›",
      what: "آرشیو نسخه‌ای که در manifest نام برده شده دانلود نشد، یا در پوشهٔ `RT_RELEASE_DIR` نیست. هیچ تغییری اعمال نشده است.",
      fix: [
        "دوباره امتحان کنید — دانلودهای بزرگ روی اتصال کند ممکن است به مهلت زمانی بخورند.",
        "با `RT_RELEASE_DIR`، مطمئن شوید tarball با همان نامی که در `manifest.txt` آمده در پوشه است.",
      ],
    },
  },
  {
    group: "download",
    texts: [
      "no checksum for $ART in SHA256SUMS; refusing to proceed.",
      "no checksum for $art in SHA256SUMS; aborting (no override exists)",
    ],
    en: {
      what: "`SHA256SUMS` has no line for the archive, so it cannot be verified — and an unverified archive is never installed. There is no way to override this. Nothing was changed.",
      fix: [
        "Make sure `SHA256SUMS` and the tarball come from the **same** release.",
        "Download both again from the release page.",
      ],
    },
    fa: {
      tr: "هیچ چک‌سامی برای ‹فایل› در SHA256SUMS نیست؛ ادامه نمی‌دهم.",
      what: "فایل `SHA256SUMS` خطی برای این آرشیو ندارد، پس نمی‌توان آن را بررسی کرد — و آرشیو بررسی‌نشده هرگز نصب نمی‌شود. راهی برای دور زدن این بررسی وجود ندارد. هیچ تغییری اعمال نشده است.",
      fix: [
        "مطمئن شوید `SHA256SUMS` و tarball هر دو متعلق به **یک** نسخه‌اند.",
        "هر دو را دوباره از صفحهٔ نسخه دانلود کنید.",
      ],
    },
  },
  {
    group: "download",
    texts: ["checksum for $ART is not 64 hex characters."],
    en: {
      what: "The checksum recorded for the archive is not a valid SHA-256 value, so `SHA256SUMS` is damaged or is not a release file. Nothing was changed.",
      fix: ["Download `SHA256SUMS` again from the release page."],
    },
    fa: {
      tr: "چک‌سام ‹فایل› ۶۴ نویسهٔ هگزادسیمال نیست.",
      what: "چک‌سامی که برای آرشیو ثبت شده مقدار SHA-256 معتبری نیست؛ پس `SHA256SUMS` خراب است یا فایل نسخه نیست. هیچ تغییری اعمال نشده است.",
      fix: ["`SHA256SUMS` را دوباره از صفحهٔ نسخه دانلود کنید."],
    },
  },
  {
    group: "download",
    texts: [
      "release checksum verification failed; aborting (no --skip exists).",
      "release checksum verification failed; aborting",
    ],
    en: {
      what: "The downloaded archive does not match its published checksum: the download is incomplete, corrupted, or not the published file. It was not extracted, and nothing was changed.",
      fix: [
        "Run the command again — most mismatches are interrupted downloads.",
        "If it keeps failing, download the four release files by hand and check them with `sha256sum -c SHA256SUMS` ([Manual installation](/docs/installation/manual/)).",
        "Never try to bypass this check: it is what stops a tampered release from being installed as root.",
      ],
    },
    fa: {
      tr: "بررسی چک‌سام نسخه ناموفق بود؛ عملیات لغو شد (گزینه‌ای برای رد شدن از آن وجود ندارد).",
      what: "آرشیو دانلودشده با چک‌سام منتشرشده‌اش یکی نیست: دانلود ناقص یا خراب است، یا همان فایل منتشرشده نیست. آرشیو باز نشد و هیچ تغییری اعمال نشده است.",
      fix: [
        "فرمان را دوباره اجرا کنید — بیشتر این موارد دانلودهای نیمه‌کاره‌اند.",
        "اگر باز هم خطا داد، چهار فایل نسخه را دستی دانلود کنید و با `sha256sum -c SHA256SUMS` بررسی کنید ([نصب دستی](/docs/installation/manual/)).",
        "هرگز سعی نکنید این بررسی را دور بزنید: همین بررسی است که جلوی نصب نسخهٔ دست‌کاری‌شده با دسترسی root را می‌گیرد.",
      ],
    },
  },
  {
    group: "download",
    texts: ["unsafe path in archive: $entry"],
    en: {
      what: "The archive contains an absolute path or a `..` path that could write outside the extraction folder. It is refused before extraction. Official releases never contain such paths.",
      fix: ["Use the official release files. Download them again from the release page."],
    },
    fa: {
      tr: "مسیر ناامن در آرشیو: ‹مسیر›",
      what: "آرشیو شامل مسیر مطلق یا مسیری با `..` است که می‌تواند بیرون از پوشهٔ استخراج بنویسد؛ پیش از استخراج رد می‌شود. نسخه‌های رسمی هرگز چنین مسیری ندارند.",
      fix: ["از فایل‌های رسمی نسخه استفاده کنید و آن‌ها را دوباره از صفحهٔ نسخه دانلود کنید."],
    },
  },
  {
    group: "download",
    texts: [
      "unsafe member type in archive: '$mtype'",
      "unsafe member type in archive: '$mtype' (symlink/hardlink/special refused)",
    ],
    en: {
      what: "The archive contains a symbolic link, hard link or special file. A link could redirect a later write outside the extraction folder, so the archive is refused before extraction.",
      fix: ["Use the official release files. Official releases contain only regular files and folders."],
    },
    fa: {
      tr: "نوع عضو ناامن در آرشیو: ‹نوع› (پیوند نمادین، پیوند سخت و فایل ویژه پذیرفته نمی‌شوند)",
      what: "آرشیو شامل پیوند نمادین (symlink)، پیوند سخت یا فایل ویژه است. چنین پیوندی می‌تواند نوشتن بعدی را به بیرون از پوشهٔ استخراج هدایت کند، پس آرشیو پیش از استخراج رد می‌شود.",
      fix: ["از فایل‌های رسمی نسخه استفاده کنید. نسخه‌های رسمی فقط فایل و پوشهٔ معمولی دارند."],
    },
  },
  {
    group: "download",
    texts: ["could not extract the release artifact."],
    en: {
      what: "`tar` could not unpack the verified archive — usually a full disk. Nothing was installed.",
      fix: ["Check free space with `df -h /tmp /etc`, free some up, and run the installer again."],
    },
    fa: {
      tr: "آرشیو نسخه استخراج نشد.",
      what: "`tar` نتوانست آرشیو بررسی‌شده را باز کند — معمولاً به‌دلیل پر بودن دیسک. چیزی نصب نشده است.",
      fix: ["فضای آزاد را با `df -h /tmp /etc` بررسی کنید، فضا آزاد کنید و نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "download",
    texts: ["extracted payload has no lib/row-template.sh."],
    en: {
      what: "The archive verified and unpacked, but it has no management library, so it is not a Row-Template release. Nothing was installed.",
      fix: ["Check `manifest.txt` names the Row-Template tarball, and use the official release files."],
    },
    fa: {
      tr: "محتوای استخراج‌شده فایل `lib/row-template.sh` ندارد.",
      what: "آرشیو بررسی و باز شد، اما کتابخانهٔ مدیریتی ندارد؛ پس نسخهٔ Row-Template نیست. چیزی نصب نشده است.",
      fix: ["بررسی کنید `manifest.txt` به tarball خود Row-Template اشاره کند و از فایل‌های رسمی نسخه استفاده کنید."],
    },
  },
  {
    group: "download",
    texts: ["unexpected error (line $LINENO); nothing was committed."],
    en: {
      what: "A command inside the bootstrap failed in a way it has no specific message for. The bootstrap only downloads and checks, so nothing was installed.",
      fix: [
        "Run the installer again; a network drop can cause this.",
        "If it repeats, [open an issue](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output and the line number.",
      ],
    },
    fa: {
      tr: "خطای پیش‌بینی‌نشده (خط ‹خط›)؛ هیچ تغییری ثبت نشد.",
      what: "یکی از فرمان‌های داخل راه‌انداز (bootstrap) به شکلی شکست خورد که پیام مشخصی برایش وجود ندارد. راه‌انداز فقط دانلود و بررسی می‌کند، پس چیزی نصب نشده است.",
      fix: [
        "نصب‌کننده را دوباره اجرا کنید؛ قطع شدن شبکه می‌تواند باعث این خطا شود.",
        "اگر تکرار شد، با خروجی کامل و شمارهٔ خط یک [issue باز کنید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "download",
    texts: ["internal: install payload directory missing."],
    en: {
      what: "The library was started without the folder of the extracted release. This only happens if `rt_cmd_install` is run by hand without its argument. Nothing was changed.",
      fix: ["Install through `install.sh` rather than calling the library directly."],
    },
    fa: {
      tr: "داخلی: پوشهٔ محتوای نصب وجود ندارد.",
      what: "کتابخانه بدون پوشهٔ نسخهٔ استخراج‌شده اجرا شده است. این فقط وقتی پیش می‌آید که `rt_cmd_install` دستی و بدون آرگومان اجرا شود. هیچ تغییری اعمال نشده است.",
      fix: ["به‌جای فراخوانی مستقیم کتابخانه، از طریق `install.sh` نصب کنید."],
    },
  },
  {
    group: "download",
    texts: ["install payload has no template.html.", "the release payload has no template.html."],
    en: {
      what: "The extracted release has no `template.html`, so it cannot be a complete Row-Template release. Nothing was changed.",
      fix: ["Download the release again; check `manifest.txt` and the tarball belong together."],
    },
    fa: {
      tr: "محتوای نسخه فایل `template.html` ندارد.",
      what: "نسخهٔ استخراج‌شده فایل `template.html` ندارد، پس نسخهٔ کامل Row-Template نیست. هیچ تغییری اعمال نشده است.",
      fix: ["نسخه را دوباره دانلود کنید و مطمئن شوید `manifest.txt` و tarball مال یک نسخه‌اند."],
    },
  },
  {
    group: "download",
    texts: ["payload artifact checksum mismatch."],
    en: {
      what: "The page inside the release does not match the checksum listed in the release's own `SHA256SUMS`. The archive was modified after it was built. Nothing was changed.",
      fix: ["Use the official, unmodified release files."],
    },
    fa: {
      tr: "چک‌سام فایل صفحه در محتوای نسخه مطابقت ندارد.",
      what: "فایل صفحهٔ داخل نسخه با چک‌سامی که در `SHA256SUMS` داخلی همان نسخه آمده یکی نیست؛ یعنی آرشیو پس از ساخت تغییر کرده است. هیچ تغییری اعمال نشده است.",
      fix: ["از فایل‌های رسمی و دست‌نخوردهٔ نسخه استفاده کنید."],
    },
  },
  {
    group: "download",
    texts: ["install artifact failed structural validation.", "the release artifact failed structural validation."],
    en: {
      what: "The page in the release is not a complete Row-Template page (see [Generating the page](#generating-the-page)). Nothing was changed.",
      fix: ["Download the release again from the official release page."],
    },
    fa: {
      tr: "فایل صفحهٔ نسخه در اعتبارسنجی ساختاری رد شد.",
      what: "صفحهٔ داخل نسخه یک صفحهٔ کامل Row-Template نیست (بخش [ساخت صفحه](#generating-the-page) را ببینید). هیچ تغییری اعمال نشده است.",
      fix: ["نسخه را دوباره از صفحهٔ رسمی نسخه دانلود کنید."],
    },
  },
  {
    group: "download",
    texts: [
      "the release payload declares an invalid companion: $rel",
      "the release payload is incomplete: $rel is missing.",
      "payload checksum mismatch: $rel",
      "the release payload is incomplete; nothing was changed.",
    ],
    en: {
      what: "The release's management library comes with companion files (`lib/transaction.sh` and `panels/`) that must be installed with it. One is missing, fails its checksum, or is declared with an invalid path, so the release is refused as a whole — installing a new library without its companions would leave `row-template` broken. Nothing was changed.",
      fix: [
        "Download the release again; the four files must come from the same release.",
        "If you built the release yourself, build it with `tools/make-release.sh`, which packages the companions.",
      ],
    },
    fa: {
      tr: "محتوای نسخه یک فایل همراه نامعتبر اعلام کرده: ‹مسیر› / محتوای نسخه ناقص است: ‹مسیر› وجود ندارد. / چک‌سام محتوا مطابقت ندارد: ‹مسیر› / محتوای نسخه ناقص است؛ هیچ چیزی تغییر نکرد.",
      what: "کتابخانهٔ مدیریتی نسخه فایل‌های همراهی دارد (`lib/transaction.sh` و `panels/`) که باید با آن نصب شوند. یکی از آن‌ها وجود ندارد، چک‌سامش نمی‌خواند، یا با مسیر نامعتبر اعلام شده است؛ پس کل نسخه رد می‌شود — نصب کتابخانهٔ جدید بدون همراهانش `row-template` را خراب می‌کرد. هیچ تغییری اعمال نشده است.",
      fix: [
        "نسخه را دوباره دانلود کنید؛ هر چهار فایل باید از یک نسخه باشند.",
        "اگر نسخه را خودتان ساخته‌اید، آن را با `tools/make-release.sh` بسازید که فایل‌های همراه را هم بسته‌بندی می‌کند.",
      ],
    },
  },
  {
    group: "download",
    texts: [
      "payload template directory is not a plain id: $id (skipped)",
      "payload template $id has no template.html (skipped)",
    ],
    en: {
      what: "A folder under `templates/` in the release is not a design Row-Template recognises, so it is ignored. The other designs install normally.",
      fix: ["Nothing to do for an official release. If you added folders to a release yourself, remove them."],
    },
    fa: {
      tr: "پوشهٔ تمپلیت در محتوای نسخه شناسهٔ ساده‌ای نیست: ‹شناسه› (نادیده گرفته شد) / تمپلیت ‹شناسه› در محتوای نسخه `template.html` ندارد (نادیده گرفته شد)",
      what: "یکی از پوشه‌های `templates/` در نسخه تمپلیتی نیست که Row-Template بشناسد، پس نادیده گرفته می‌شود. بقیهٔ تمپلیت‌ها معمولی نصب می‌شوند.",
      fix: ["برای نسخهٔ رسمی کاری لازم نیست. اگر خودتان پوشه‌ای به نسخه اضافه کرده‌اید، حذفش کنید."],
    },
  },
  {
    group: "download",
    texts: [
      "payload template $id has no checksum sidecar",
      "payload template $id failed its checksum",
      "payload template $id failed structural validation",
    ],
    en: {
      what: "One of the release's designs has no checksum, does not match it, or is not a valid page. Every design is verified before any is installed, so the release is refused.",
      fix: ["Download the release again from the official release page."],
    },
    fa: {
      tr: "تمپلیت ‹شناسه› در محتوای نسخه فایل چک‌سام ندارد / چک‌سام تمپلیت ‹شناسه› مطابقت ندارد / تمپلیت ‹شناسه› در اعتبارسنجی ساختاری رد شد",
      what: "یکی از تمپلیت‌های نسخه چک‌سام ندارد، با چک‌سامش نمی‌خواند، یا صفحهٔ معتبری نیست. همهٔ تمپلیت‌ها پیش از نصب هر کدام بررسی می‌شوند، پس نسخه رد می‌شود.",
      fix: ["نسخه را دوباره از صفحهٔ رسمی نسخه دانلود کنید."],
    },
  },
  {
    group: "download",
    texts: [
      "the release template store failed verification; nothing was activated.",
      "the release template store failed verification.",
    ],
    en: {
      what: "Follows one of the design messages above: a design in the release could not be verified. Nothing was activated and the page your subscribers see is unchanged.",
      fix: ["Fix the message printed just before this one — usually by downloading the release again."],
    },
    fa: {
      tr: "مخزن تمپلیت‌های نسخه در بررسی رد شد؛ چیزی فعال نشد.",
      what: "پس از یکی از پیام‌های تمپلیت در بالا می‌آید: یکی از تمپلیت‌های نسخه بررسی نشد. چیزی فعال نشده و صفحه‌ای که مشترکان می‌بینند تغییری نکرده است.",
      fix: ["پیامی را که درست پیش از این چاپ شده برطرف کنید — معمولاً با دانلود دوبارهٔ نسخه."],
    },
  },
  {
    group: "download",
    texts: ["could not obtain a verified release."],
    en: {
      what: "`row-template update` could not download, verify or unpack the release. The reason is on the line just above. Nothing was changed.",
      fix: [
        "Fix the error printed just before this one.",
        "Without GitHub access, update from a local folder: `RT_RELEASE_DIR=/path row-template update`.",
      ],
    },
    fa: {
      tr: "نسخهٔ بررسی‌شده‌ای به دست نیامد.",
      what: "`row-template update` نتوانست نسخه را دانلود، بررسی یا باز کند. علت در خط بالاتر چاپ شده است. هیچ تغییری اعمال نشده است.",
      fix: [
        "خطایی را که درست پیش از این چاپ شده برطرف کنید.",
        "اگر به GitHub دسترسی ندارید، از پوشهٔ محلی به‌روزرسانی کنید: `RT_RELEASE_DIR=/path row-template update`.",
      ],
    },
  },

  // --- installing -----------------------------------------------------------
  {
    group: "install",
    texts: ["install root is a symlink; refusing to proceed."],
    en: {
      what: "`/etc/3x-ui/sub_templates/row-template` is a symbolic link. Row-Template never writes through a symlink, because it could redirect root-owned writes anywhere. Nothing was changed.",
      fix: [
        "Replace the link with a real directory: `rm /etc/3x-ui/sub_templates/row-template && mkdir -p /etc/3x-ui/sub_templates/row-template`.",
        "If you need the files on another disk, bind-mount that disk onto the path instead of linking it.",
      ],
    },
    fa: {
      tr: "ریشهٔ نصب یک پیوند نمادین است؛ ادامه نمی‌دهم.",
      what: "مسیر `/etc/3x-ui/sub_templates/row-template` یک پیوند نمادین (symlink) است. Row-Template هرگز از طریق symlink نمی‌نویسد، چون می‌تواند نوشتن با دسترسی root را به هر جایی هدایت کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "پیوند را با یک پوشهٔ واقعی جایگزین کنید: `rm /etc/3x-ui/sub_templates/row-template && mkdir -p /etc/3x-ui/sub_templates/row-template`.",
        "اگر می‌خواهید فایل‌ها روی دیسک دیگری باشند، به‌جای پیوند، آن دیسک را روی همین مسیر bind-mount کنید.",
      ],
    },
  },
  {
    group: "install",
    texts: ["an existing install was found at $RT_ROOT; re-run interactively or set RT_ASSUME_YES=1 to repair."],
    en: {
      what: "Row-Template is already installed, and the installer is running without a terminal, so it will not repair the installation without your explicit consent. Nothing was changed.",
      fix: [
        "To move to the latest release, run `row-template update`.",
        "To repair in place (your branding and design are kept, and a backup is taken first), run the installer again with `RT_ASSUME_YES=1`, or run it in a terminal and choose **4 — Repair / Verify**.",
      ],
    },
    fa: {
      tr: "نصب قبلی در `/etc/3x-ui/sub_templates/row-template` پیدا شد؛ برای تعمیر، نصب‌کننده را به‌صورت تعاملی اجرا کنید یا `RT_ASSUME_YES=1` را تنظیم کنید.",
      what: "Row-Template از قبل نصب است و نصب‌کننده بدون ترمینال اجرا شده؛ پس بدون رضایت صریح شما نصب را تعمیر نمی‌کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "برای رفتن به آخرین نسخه، `row-template update` را اجرا کنید.",
        "برای تعمیر در همان جا (برندینگ و تمپلیت حفظ می‌شوند و اول پشتیبان گرفته می‌شود)، نصب‌کننده را با `RT_ASSUME_YES=1` دوباره اجرا کنید، یا آن را در ترمینال اجرا کنید و **4 — Repair / Verify** را انتخاب کنید.",
      ],
    },
  },
  {
    group: "install",
    texts: ["could not create the install tree."],
    en: {
      what: "The folders under `/etc/3x-ui/sub_templates/row-template` could not be created — usually a full disk, a read-only `/etc`, or a file where a folder should be.",
      fix: [
        "Check free space with `df -h /etc`.",
        "Check `/etc/3x-ui/sub_templates` is a writable directory, not a file, then run the installer again.",
      ],
    },
    fa: {
      tr: "ساختار پوشه‌های نصب ساخته نشد.",
      what: "پوشه‌های زیر `/etc/3x-ui/sub_templates/row-template` ساخته نشدند — معمولاً به‌دلیل پر بودن دیسک، فقط‌خواندنی بودن `/etc` یا وجود یک فایل به‌جای پوشه.",
      fix: [
        "فضای آزاد را با `df -h /etc` بررسی کنید.",
        "مطمئن شوید `/etc/3x-ui/sub_templates` پوشه‌ای قابل نوشتن است (نه فایل) و نصب‌کننده را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "install",
    texts: ["could not create a pre-install backup."],
    en: {
      what: "While repairing an existing installation, the backup of its current state could not be taken. The repair continues without it, so you cannot roll back to the state before this repair.",
      fix: ["Check free disk space under `/etc`. Run `row-template verify` when the installer finishes."],
    },
    fa: {
      tr: "پشتیبانِ پیش از نصب ساخته نشد.",
      what: "هنگام تعمیر نصب موجود، از وضعیت فعلی آن پشتیبان گرفته نشد. تعمیر بدون پشتیبان ادامه پیدا می‌کند، پس نمی‌توانید به وضعیت پیش از این تعمیر بازگردید.",
      fix: ["فضای آزاد دیسک زیر `/etc` را بررسی کنید و پس از پایان نصب، `row-template verify` را اجرا کنید."],
    },
  },
  {
    group: "install",
    texts: ["could not install the canonical artifact.", "could not install VERSION."],
    en: {
      what: "A core file could not be written into the install directory — usually a full disk or a read-only filesystem. The live page has not been replaced.",
      fix: ["Check `df -h /etc` and that `/etc` is writable, then run the installer again."],
    },
    fa: {
      tr: "فایل اصلی صفحه نصب نشد. / فایل VERSION نصب نشد.",
      what: "یکی از فایل‌های اصلی در پوشهٔ نصب نوشته نشد — معمولاً به‌دلیل پر بودن دیسک یا فقط‌خواندنی بودن فایل‌سیستم. صفحهٔ زنده جایگزین نشده است.",
      fix: ["`df -h /etc` و قابل نوشتن بودن `/etc` را بررسی کنید و نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "install",
    texts: [
      "could not install the management library; the CLI may be unavailable.",
      "could not install the row-template CLI to $RT_BIN.",
    ],
    en: {
      what: "The page is installed, but the management library or the `row-template` command could not be written, so managing the installation afterwards may not work.",
      fix: [
        "Check free space and that `/usr/local/bin` exists and is writable.",
        "Run the installer again; it repairs the installation in place.",
      ],
    },
    fa: {
      tr: "کتابخانهٔ مدیریتی نصب نشد؛ ممکن است فرمان `row-template` در دسترس نباشد. / فرمان `row-template` در `/usr/local/bin/row-template` نصب نشد.",
      what: "صفحه نصب شده، اما کتابخانهٔ مدیریتی یا فرمان `row-template` نوشته نشد؛ پس ممکن است بعداً نتوانید نصب را مدیریت کنید.",
      fix: [
        "فضای آزاد و وجود و قابل نوشتن بودن `/usr/local/bin` را بررسی کنید.",
        "نصب‌کننده را دوباره اجرا کنید؛ نصب را در همان جا تعمیر می‌کند.",
      ],
    },
  },
  {
    group: "install",
    texts: ["could not install the management library's companions; run 'row-template update' to retry."],
    en: {
      what: "The installer files that come with the management library (`lib/transaction.sh`, `panels/`) could not be written. The page works; `verify` will report the installation as incomplete.",
      fix: ["Check free space, then run `row-template update` — it installs them."],
    },
    fa: {
      tr: "فایل‌های همراه کتابخانهٔ مدیریتی نصب نشدند؛ برای تلاش دوباره `row-template update` را اجرا کنید.",
      what: "فایل‌های همراه کتابخانهٔ مدیریتی (`lib/transaction.sh` و `panels/`) نوشته نشدند. صفحه کار می‌کند، اما `verify` نصب را ناقص گزارش می‌کند.",
      fix: ["فضای آزاد را بررسی کنید و بعد `row-template update` را اجرا کنید تا آن‌ها را نصب کند."],
    },
  },
  {
    group: "install",
    texts: ["configuration was not completed; the panel was not changed."],
    en: {
      what: "The branding step failed — the line above says which value was refused (service name, support URL or logo). The panel and the live page were not changed.",
      fix: [
        "Fix the value named just above and run the installer again.",
        "In an unattended install, check `RT_SERVICE_NAME`, `RT_SUPPORT_URL` and `RT_LOGO_PATH`.",
      ],
    },
    fa: {
      tr: "پیکربندی کامل نشد؛ پنل تغییری نکرد.",
      what: "مرحلهٔ برندینگ شکست خورد — خط بالا می‌گوید کدام مقدار رد شده است (نام سرویس، نشانی پشتیبانی یا لوگو). پنل و صفحهٔ زنده تغییری نکرده‌اند.",
      fix: [
        "مقداری را که درست در بالا نام برده شده اصلاح کنید و نصب‌کننده را دوباره اجرا کنید.",
        "در نصب بدون پرسش، مقادیر `RT_SERVICE_NAME`، `RT_SUPPORT_URL` و `RT_LOGO_PATH` را بررسی کنید.",
      ],
    },
  },
  {
    group: "install",
    texts: ["RT_TEMPLATE='$RT_TEMPLATE' is not a template this release offers (available: $RT_TEMPLATES_AVAILABLE)."],
    en: {
      what: "The design ID in `RT_TEMPLATE` is not one of this release's designs. The install stops rather than silently using Row.",
      fix: ["Use one of the IDs in the message — lowercase, with no spaces, for example `RT_TEMPLATE=pulsenova`. The [comparison table](/docs/templates/choosing/#compare-them) lists them."],
    },
    fa: {
      tr: "مقدار ‹مقدار› در `RT_TEMPLATE` تمپلیتی نیست که این نسخه ارائه کند (موجود: `row editorial canvas prism terminal pulse brutal arcade sketch signature saffron pulsenova prismnova terminalnova arcadenova`).",
      what: "شناسهٔ تمپلیت در `RT_TEMPLATE` جزو تمپلیت‌های این نسخه نیست. نصب به‌جای استفادهٔ بی‌صدا از Row متوقف می‌شود.",
      fix: ["یکی از شناسه‌های داخل پیام را بدهید — با حروف کوچک و بدون فاصله، مثلاً `RT_TEMPLATE=pulsenova`. [جدول مقایسه](/docs/templates/choosing/#compare-them) همه را فهرست کرده است."],
    },
  },
  {
    group: "install",
    texts: ["selected template '$picked' is not in this release's template store; using Row."],
    en: {
      what: "During a repair, the design saved in your configuration is not part of this release, so Row is installed instead.",
      fix: ["Choose another design afterwards from the manager: **2 — Reconfigure branding → 4 — Template**."],
    },
    fa: {
      tr: "تمپلیت انتخاب‌شدهٔ '‹شناسه›' در مخزن تمپلیت‌های این نسخه نیست؛ از Row استفاده می‌شود.",
      what: "هنگام تعمیر، تمپلیتی که در پیکربندی شما ذخیره شده جزو این نسخه نیست؛ پس Row نصب می‌شود.",
      fix: ["بعداً از منوی مدیریت تمپلیت دیگری انتخاب کنید: **2 — Reconfigure branding → 4 — Template**."],
    },
  },
  {
    group: "install",
    texts: [
      "template '$picked' is not in this release's template store.",
      "could not stage the selected template.",
    ],
    en: {
      what: "The chosen design could not be taken from the template store installed a moment earlier — the store is incomplete or the disk is full. The live page was not replaced.",
      fix: ["Check free disk space and run the installer again."],
    },
    fa: {
      tr: "تمپلیت '‹شناسه›' در مخزن تمپلیت‌های این نسخه نیست. / تمپلیت انتخاب‌شده آماده نشد.",
      what: "تمپلیت انتخاب‌شده از مخزن تمپلیتی که همین حالا نصب شد برداشته نشد — مخزن ناقص است یا دیسک پر است. صفحهٔ زنده جایگزین نشده است.",
      fix: ["فضای آزاد دیسک را بررسی کنید و نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "install",
    texts: ["could not persist the template selection."],
    en: {
      what: "Your design choice could not be saved to `config.env`. Install stops before activation; update stops after staging the new version but before activating it, so the live page is unchanged.",
      fix: ["Check free space and that `config.env` is writable, then run the same command again."],
    },
    fa: {
      tr: "انتخاب تمپلیت ذخیره نشد.",
      what: "تمپلیت انتخابی شما در `config.env` ذخیره نشد. نصب پیش از فعال‌سازی متوقف می‌شود و به‌روزرسانی پس از آماده‌سازی نسخهٔ جدید اما پیش از فعال‌سازی آن؛ پس صفحهٔ زنده تغییری نکرده است.",
      fix: ["فضای آزاد و قابل نوشتن بودن `config.env` را بررسی کنید و همان فرمان را دوباره اجرا کنید."],
    },
  },
  {
    group: "install",
    texts: ["the template failed to generate/validate; the panel was not changed."],
    en: {
      what: "The page could not be generated from the design and your branding, or failed validation; the line above says why. The live page was not replaced and the panel setting was not touched.",
      fix: ["Fix the problem named just above — often branding with a control character or an unreadable logo — and run the installer again."],
    },
    fa: {
      tr: "ساخت یا اعتبارسنجی تمپلیت شکست خورد؛ پنل تغییری نکرد.",
      what: "صفحه از روی تمپلیت و برندینگ شما ساخته نشد یا در اعتبارسنجی رد شد؛ علت در خط بالا آمده است. صفحهٔ زنده جایگزین نشده و تنظیم پنل دست نخورده است.",
      fix: ["مشکلی را که درست در بالا نام برده شده برطرف کنید — اغلب برندینگی با نویسهٔ کنترلی یا لوگوی ناخوانا — و نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "install",
    texts: ["Choose 1-${#list[@]}, or press Enter for Row."],
    en: {
      what: "The design chooser received something other than a number from its list.",
      fix: ["Type the number shown next to the design, or press Enter to keep Row."],
    },
    fa: {
      tr: "عددی بین 1 و ‹n› وارد کنید، یا برای Row کلید Enter را بزنید.",
      what: "انتخابگر تمپلیت چیزی غیر از یکی از شماره‌های فهرست دریافت کرده است.",
      fix: ["شمارهٔ کنار تمپلیت را وارد کنید، یا برای ماندن روی Row کلید Enter را بزنید."],
    },
  },

  // --- activation and live checks -------------------------------------------
  {
    group: "activation",
    texts: ["Could not set subThemeDir automatically; use the manual step below."],
    en: {
      what: "The installer tried to point the panel at Row-Template through its database and could not confirm it worked. It made sure the panel service is running again. Row-Template itself is installed.",
      fix: ["Set **Panel Settings → Subscription → Sub Theme Directory** to `/etc/3x-ui/sub_templates/row-template`, save, and restart the panel. See [Activation](/docs/installation/activation/)."],
    },
    fa: {
      tr: "`subThemeDir` به‌صورت خودکار تنظیم نشد؛ از مرحلهٔ دستی زیر استفاده کنید.",
      what: "نصب‌کننده سعی کرد از طریق پایگاه‌دادهٔ پنل آن را به Row-Template متصل کند، اما نتوانست موفقیت را تأیید کند. مطمئن شده است که سرویس پنل دوباره در حال اجراست. خود Row-Template نصب شده است.",
      fix: ["**Panel Settings → Subscription → Sub Theme Directory** را روی `/etc/3x-ui/sub_templates/row-template` بگذارید، ذخیره کنید و پنل را ری‌استارت کنید. [فعال‌سازی](/docs/installation/activation/) را ببینید."],
    },
  },
  {
    group: "activation",
    texts: ["Could not set the theme automatically; the panel service state was preserved."],
    en: {
      what: "The manager's **Activate / Re-apply theme** could not set `subThemeDir`. The panel service was left running (or started again).",
      fix: ["Set **Sub Theme Directory** in the panel by hand, as the manager shows."],
    },
    fa: {
      tr: "پوسته به‌صورت خودکار تنظیم نشد؛ وضعیت سرویس پنل حفظ شد.",
      what: "گزینهٔ **Activate / Re-apply theme** در منوی مدیریت نتوانست `subThemeDir` را تنظیم کند. سرویس پنل در حال اجرا ماند (یا دوباره اجرا شد).",
      fix: ["همان‌طور که منوی مدیریت نشان می‌دهد، **Sub Theme Directory** را دستی در پنل تنظیم کنید."],
    },
  },
  {
    group: "activation",
    texts: ["Automatic activation is unavailable here (sqlite3 is not installed)."],
    en: {
      what: "The panel setting could not be read, so the manager cannot set it for you. The message names the usual reason — `sqlite3` is not installed — but it also appears when the panel database was not found.",
      fix: [
        "Set **Sub Theme Directory** in the panel by hand, as shown.",
        "Or install `sqlite3` (and, for an unusual database location, set `XUI_DB_FOLDER`), then choose **5 — Activate / Re-apply theme** again.",
      ],
    },
    fa: {
      tr: "فعال‌سازی خودکار اینجا در دسترس نیست (`sqlite3` نصب نیست).",
      what: "تنظیم پنل خوانده نشد، پس منوی مدیریت نمی‌تواند آن را برای شما تنظیم کند. پیام علت معمول را می‌گوید — نصب نبودن `sqlite3` — اما وقتی پایگاه‌دادهٔ پنل پیدا نشود هم نمایش داده می‌شود.",
      fix: [
        "همان‌طور که نشان داده می‌شود، **Sub Theme Directory** را دستی در پنل تنظیم کنید.",
        "یا `sqlite3` را نصب کنید (و اگر پایگاه‌داده در مسیر غیرمعمولی است، `XUI_DB_FOLDER` را تنظیم کنید) و دوباره **5 — Activate / Re-apply theme** را انتخاب کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: ["Live check: the panel served its built-in page. If you just set the theme dir, restart the panel; otherwise run 'row-template verify'."],
    en: {
      what: "A test request as a browser returned the panel's own page, not Row-Template. Either the panel has not picked up the new theme directory yet, or it is not set.",
      fix: [
        "If you just set it: restart the panel (`systemctl restart x-ui`).",
        "Otherwise run `row-template verify` and check the `subThemeDir` line.",
      ],
    },
    fa: {
      tr: "بررسی زنده: پنل صفحهٔ داخلی خودش را ارائه کرد. اگر همین حالا پوشهٔ پوسته را تنظیم کرده‌اید، پنل را ری‌استارت کنید؛ وگرنه `row-template verify` را اجرا کنید.",
      what: "یک درخواست آزمایشی مانند مرورگر، صفحهٔ خود پنل را برگرداند، نه Row-Template را. یا پنل هنوز پوشهٔ پوستهٔ جدید را اعمال نکرده، یا اصلاً تنظیم نشده است.",
      fix: [
        "اگر همین حالا تنظیمش کرده‌اید: پنل را ری‌استارت کنید (`systemctl restart x-ui`).",
        "در غیر این صورت `row-template verify` را اجرا کنید و خط مربوط به `subThemeDir` را ببینید.",
      ],
    },
  },
  {
    group: "activation",
    texts: ["Live check could not reach the subscription endpoint."],
    en: {
      what: "The test request to the subscription address on this server got no answer. This is a warning only; the installation itself succeeded.",
      fix: [
        "Check the panel is running: `systemctl status x-ui`.",
        "Check the panel's subscription service is enabled and listening, then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "بررسی زنده به نشانی اشتراک دسترسی پیدا نکرد.",
      what: "درخواست آزمایشی به نشانی اشتراک روی همین سرور پاسخی نگرفت. این فقط یک هشدار است و خود نصب موفق بوده است.",
      fix: [
        "در حال اجرا بودن پنل را بررسی کنید: `systemctl status x-ui`.",
        "مطمئن شوید سرویس اشتراک پنل فعال است و گوش می‌دهد، سپس `row-template verify` را اجرا کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: ["Live check: a VPN client received HTML instead of subscription content."],
    en: {
      what: "A test request made like a VPN app received the web page instead of its configuration. VPN apps would fail to update.",
      fix: [
        "Check whether a proxy or CDN in front of the panel rewrites the `User-Agent` or `Accept` headers, and let them through unchanged.",
        "Run `row-template verify` to repeat the check.",
      ],
    },
    fa: {
      tr: "بررسی زنده: یک کلاینت VPN به‌جای محتوای اشتراک، HTML دریافت کرد.",
      what: "درخواستی آزمایشی که مانند اپ VPN ارسال شد، به‌جای پیکربندی صفحهٔ وب را دریافت کرد. در این حالت اپ‌های VPN نمی‌توانند اشتراک را به‌روز کنند.",
      fix: [
        "بررسی کنید پراکسی یا CDNی که جلوی پنل است هدرهای `User-Agent` یا `Accept` را تغییر ندهد و آن‌ها را دست‌نخورده عبور دهد.",
        "برای تکرار بررسی `row-template verify` را اجرا کنید.",
      ],
    },
  },

  // --- designs and switching ------------------------------------------------
  {
    group: "templates",
    texts: [
      "config.env stores an unknown template id (${template}); resetting the selection to Row.",
      "config.env stores an unknown template id (${id}); using Row.",
    ],
    en: {
      what: "The design saved in `config.env` is not one this release knows — the file was edited by hand, or came from elsewhere. Row is used instead, so the page keeps working, and the saved choice is corrected the next time it is written.",
      fix: ["Choose the design you want from the manager (**2 — Reconfigure branding → 4 — Template**). Do not edit `config.env` by hand."],
    },
    fa: {
      tr: "`config.env` یک شناسهٔ تمپلیت ناشناخته (‹شناسه›) ذخیره کرده؛ انتخاب به Row بازنشانی می‌شود. / …؛ از Row استفاده می‌شود.",
      what: "تمپلیتی که در `config.env` ذخیره شده برای این نسخه شناخته‌شده نیست — فایل دستی ویرایش شده یا از جای دیگری آمده است. به‌جای آن از Row استفاده می‌شود تا صفحه کار کند، و انتخاب ذخیره‌شده دفعهٔ بعد که فایل نوشته شود اصلاح می‌شود.",
      fix: ["تمپلیت دلخواه را از منوی مدیریت انتخاب کنید (**2 — Reconfigure branding → 4 — Template**). `config.env` را دستی ویرایش نکنید."],
    },
  },
  {
    group: "templates",
    texts: ["unknown template id: $template", "unknown template id: $id", "unknown template id: $id (available: $RT_TEMPLATES_AVAILABLE)"],
    en: {
      what: "A design ID that this release does not ship was asked for. Nothing was written: an unknown ID is never saved.",
      fix: ["Use one of the IDs listed in the [comparison table](/docs/templates/choosing/#compare-them)."],
    },
    fa: {
      tr: "شناسهٔ تمپلیت ناشناخته: ‹شناسه›",
      what: "شناسهٔ تمپلیتی درخواست شده که این نسخه آن را ندارد. چیزی نوشته نشد: شناسهٔ ناشناخته هرگز ذخیره نمی‌شود.",
      fix: ["یکی از شناسه‌های [جدول مقایسه](/docs/templates/choosing/#compare-them) را به کار ببرید."],
    },
  },
  {
    group: "templates",
    texts: [
      "the effective template '$tpl' is missing from the template store",
      "the effective template '$tpl' failed its store checksum",
    ],
    en: {
      what: "While applying a branding change, the selected design's file in the template store was missing or did not match its checksum. The change was undone; the previous page is still live.",
      fix: [
        "Run `row-template verify` to see the state of the template store.",
        "Run `row-template update` to reinstall every design, then apply the change again.",
      ],
    },
    fa: {
      tr: "تمپلیت مؤثر '‹شناسه›' در مخزن تمپلیت‌ها نیست / تمپلیت مؤثر '‹شناسه›' در بررسی چک‌سام مخزن رد شد",
      what: "هنگام اعمال تغییر برندینگ، فایل تمپلیت انتخاب‌شده در مخزن تمپلیت‌ها وجود نداشت یا با چک‌سامش نمی‌خواند. تغییر لغو شد و صفحهٔ قبلی همچنان فعال است.",
      fix: [
        "برای دیدن وضعیت مخزن تمپلیت‌ها `row-template verify` را اجرا کنید.",
        "با `row-template update` همهٔ تمپلیت‌ها را دوباره نصب کنید و سپس تغییر را دوباره اعمال کنید.",
      ],
    },
  },
  {
    group: "templates",
    texts: [
      "template '$id' is not installed; re-run the installer to refresh the template store",
      "No templates are installed. Re-run the installer to restore the template store.",
    ],
    en: {
      what: "The design you picked — or every design — is missing from the installation's template store. This is normal right after the first update from 1.1.0.",
      fix: ["Run `row-template update` (or re-run the installer). It installs every design of the release."],
    },
    fa: {
      tr: "تمپلیت '‹شناسه›' نصب نیست؛ برای به‌روز کردن مخزن تمپلیت‌ها نصب‌کننده را دوباره اجرا کنید / هیچ تمپلیتی نصب نیست. برای بازگرداندن مخزن تمپلیت‌ها نصب‌کننده را دوباره اجرا کنید.",
      what: "تمپلیتی که انتخاب کرده‌اید — یا همهٔ تمپلیت‌ها — در مخزن تمپلیت‌های نصب وجود ندارد. این وضعیت درست پس از اولین به‌روزرسانی از 1.1.0 طبیعی است.",
      fix: ["`row-template update` را اجرا کنید (یا نصب‌کننده را دوباره اجرا کنید). همهٔ تمپلیت‌های نسخه را نصب می‌کند."],
    },
  },
  {
    group: "templates",
    texts: ["template $id failed its checksum; refusing to switch"],
    en: {
      what: "The installed copy of that design has been altered or damaged, so it will not be activated. Nothing was changed.",
      fix: ["Run `row-template update` to reinstall every design, then switch again."],
    },
    fa: {
      tr: "چک‌سام تمپلیت ‹شناسه› مطابقت ندارد؛ تعویض انجام نمی‌شود",
      what: "نسخهٔ نصب‌شدهٔ آن تمپلیت تغییر کرده یا خراب شده است، پس فعال نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: ["با `row-template update` همهٔ تمپلیت‌ها را دوباره نصب کنید و بعد دوباره تعویض کنید."],
    },
  },
  {
    group: "templates",
    texts: ["the $id template failed to generate with the current branding"],
    en: {
      what: "A trial page built from the new design and your current branding failed. This check runs before anything changes, so nothing did.",
      fix: [
        "Read the line printed just above — it names the exact problem.",
        "If it concerns branding, correct it (for example with **Reset branding**) and switch again.",
      ],
    },
    fa: {
      tr: "ساخت تمپلیت ‹شناسه› با برندینگ فعلی شکست خورد",
      what: "صفحهٔ آزمایشی که از تمپلیت جدید و برندینگ فعلی شما ساخته شد شکست خورد. این بررسی پیش از هر تغییری انجام می‌شود، پس چیزی تغییر نکرده است.",
      fix: [
        "خطی را که درست بالاتر چاپ شده بخوانید — مشکل دقیق را نام می‌برد.",
        "اگر به برندینگ مربوط است، اصلاحش کنید (مثلاً با **Reset branding**) و دوباره تعویض کنید.",
      ],
    },
  },
  {
    group: "templates",
    texts: ["could not snapshot the current state; aborting"],
    en: {
      what: "A backup must be taken before a template switch, and it could not be. The switch was cancelled; nothing changed.",
      fix: ["Check free disk space under `/etc` and try again."],
    },
    fa: {
      tr: "از وضعیت فعلی پشتیبان گرفته نشد؛ عملیات لغو شد",
      what: "پیش از تعویض تمپلیت باید پشتیبان گرفته شود و این کار انجام نشد. تعویض لغو شد و چیزی تغییر نکرد.",
      fix: ["فضای آزاد دیسک زیر `/etc` را بررسی کنید و دوباره امتحان کنید."],
    },
  },
  {
    group: "templates",
    texts: [
      "could not stage the selected template; the previous state was restored",
      "could not persist the template selection; the previous state was restored",
      "activation of the new template failed; the previous state was restored",
      "the switched template failed post-activation validation; the previous state was restored",
    ],
    en: {
      what: "A step of the template switch failed after the backup was taken, so the backup was restored: the previous design is live again, exactly as before.",
      fix: [
        "Run `row-template verify` to confirm the installation is healthy.",
        "Check free disk space, then try the switch again. If it fails the same way, [report it](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
    fa: {
      tr: "تمپلیت انتخاب‌شده آماده نشد / انتخاب تمپلیت ذخیره نشد / فعال‌سازی تمپلیت جدید شکست خورد / تمپلیت جدید در اعتبارسنجی پس از فعال‌سازی رد شد — در همهٔ این موارد وضعیت قبلی بازگردانده شد",
      what: "یکی از مراحل تعویض تمپلیت پس از گرفتن پشتیبان شکست خورد، پس پشتیبان بازگردانده شد: تمپلیت قبلی دقیقاً مثل قبل دوباره فعال است.",
      fix: [
        "برای اطمینان از سالم بودن نصب، `row-template verify` را اجرا کنید.",
        "فضای آزاد دیسک را بررسی کنید و دوباره تعویض را امتحان کنید. اگر به همان شکل شکست خورد، [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "templates",
    texts: ["automatic restore failed; run 'row-template rollback'"],
    en: {
      what: "A template switch failed, and restoring the backup taken just before it also failed. The installation may be half-switched.",
      fix: [
        "Run `row-template rollback` — it restores that backup.",
        "Then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "بازگردانی خودکار شکست خورد؛ `row-template rollback` را اجرا کنید",
      what: "تعویض تمپلیت شکست خورد و بازگرداندن پشتیبانی که درست پیش از آن گرفته شده بود هم شکست خورد. ممکن است نصب نیمه‌کاره تعویض شده باشد.",
      fix: [
        "`row-template rollback` را اجرا کنید — همان پشتیبان را بازمی‌گرداند.",
        "سپس `row-template verify` را اجرا کنید.",
      ],
    },
  },

  // --- branding and configuration -------------------------------------------
  {
    group: "branding",
    texts: ["logo file not found: $f"],
    en: {
      what: "Nothing exists at the logo path you gave. The logo was not changed.",
      fix: ["Give the full path of the image, for example `/root/logo.png`, and check it with `ls -l`."],
    },
    fa: {
      tr: "فایل لوگو پیدا نشد: ‹مسیر›",
      what: "در مسیری که برای لوگو داده‌اید فایلی وجود ندارد. لوگو تغییری نکرد.",
      fix: ["مسیر کامل تصویر را بدهید، مثلاً `/root/logo.png`، و آن را با `ls -l` بررسی کنید."],
    },
  },
  {
    group: "branding",
    texts: [
      "logo path is a symlink; refusing to read it",
      "logo path became a symlink after validation; aborting.",
      "Path became a symlink; aborting.",
    ],
    en: {
      what: "The logo path is a symbolic link — or was replaced by one between the check and the read. Logos are read only from regular files. Nothing was changed.",
      fix: ["Give the path of the real file. `readlink -f /path/to/logo.png` shows where a link points."],
    },
    fa: {
      tr: "مسیر لوگو یک پیوند نمادین است؛ خوانده نمی‌شود / مسیر لوگو پس از اعتبارسنجی به پیوند نمادین تبدیل شد؛ عملیات لغو شد.",
      what: "مسیر لوگو یک پیوند نمادین (symlink) است — یا بین بررسی و خواندن با یک پیوند جایگزین شده است. لوگو فقط از فایل معمولی خوانده می‌شود. هیچ تغییری اعمال نشده است.",
      fix: ["مسیر فایل واقعی را بدهید. `readlink -f /path/to/logo.png` نشان می‌دهد پیوند به کجا اشاره می‌کند."],
    },
  },
  {
    group: "branding",
    texts: ["logo path is not a regular file"],
    en: {
      what: "The logo path is a directory or a special file, not an image file.",
      fix: ["Give the path of the image file itself, not of its folder."],
    },
    fa: {
      tr: "مسیر لوگو یک فایل معمولی نیست",
      what: "مسیر لوگو یک پوشه یا فایل ویژه است، نه فایل تصویر.",
      fix: ["مسیر خود فایل تصویر را بدهید، نه پوشهٔ آن را."],
    },
  },
  {
    group: "branding",
    texts: ["cannot size logo file", "logo file is empty"],
    en: {
      what: "The logo file could not be read, or it is empty.",
      fix: ["Check the file with `ls -l` — it must be readable and larger than zero bytes — or export the image again."],
    },
    fa: {
      tr: "اندازهٔ فایل لوگو خوانده نشد / فایل لوگو خالی است",
      what: "فایل لوگو خوانده نشد، یا خالی است.",
      fix: ["فایل را با `ls -l` بررسی کنید — باید قابل خواندن و بزرگ‌تر از صفر بایت باشد — یا تصویر را دوباره خروجی بگیرید."],
    },
  },
  {
    group: "branding",
    texts: ["logo too large: ${size} bytes (max ${RT_LOGO_MAX_BYTES})"],
    en: {
      what: "Logos are limited to 256 KiB (262144 bytes), because the image is embedded in every page served.",
      fix: [
        "Resize the image: a logo is shown small, so 256×256 pixels is plenty.",
        "Save it as WebP or an optimised PNG, for example `cwebp -q 85 logo.png -o logo.webp`.",
      ],
    },
    fa: {
      tr: "لوگو خیلی بزرگ است: ‹اندازه› بایت (حداکثر 262144)",
      what: "حجم لوگو حداکثر ۲۵۶ کیلوبایت (262144 بایت) است، چون تصویر داخل هر صفحه‌ای که ارائه می‌شود جاسازی می‌شود.",
      fix: [
        "اندازهٔ تصویر را کوچک کنید: لوگو کوچک نمایش داده می‌شود، پس ۲۵۶×۲۵۶ پیکسل کافی است.",
        "آن را با فرمت WebP یا PNG بهینه‌شده ذخیره کنید، مثلاً `cwebp -q 85 logo.png -o logo.webp`.",
      ],
    },
  },
  {
    group: "branding",
    texts: ["unsupported image: only PNG, JPEG or WebP by content"],
    en: {
      what: "The file's content is not PNG, JPEG or WebP. The type is read from the file's first bytes, not its name, so renaming a file does not change it. SVG and GIF are not accepted.",
      fix: [
        "Convert the image, for example `convert logo.svg -resize 256x256 logo.png` (ImageMagick).",
        "Check what a file really is with `file logo.png`.",
      ],
    },
    fa: {
      tr: "تصویر پشتیبانی نمی‌شود: از نظر محتوا فقط PNG، JPEG یا WebP پذیرفته می‌شود",
      what: "محتوای فایل PNG، JPEG یا WebP نیست. نوع فایل از بایت‌های ابتدایی آن خوانده می‌شود، نه از نامش؛ پس تغییر پسوند فایل فایده‌ای ندارد. SVG و GIF پذیرفته نمی‌شوند.",
      fix: [
        "تصویر را تبدیل کنید، مثلاً با ImageMagick: `convert logo.svg -resize 256x256 logo.png`.",
        "نوع واقعی فایل را با `file logo.png` ببینید.",
      ],
    },
  },
  {
    group: "branding",
    texts: ["service name rejected (control chars or too long)", "Rejected: control characters or too long."],
    en: {
      what: "The service name is longer than 120 characters or contains a control character such as a line break or a tab. It was not saved.",
      fix: ["Use a shorter, single-line name. In a script, check `RT_SERVICE_NAME` has no trailing newline."],
    },
    fa: {
      tr: "نام سرویس رد شد (نویسهٔ کنترلی دارد یا خیلی طولانی است)",
      what: "نام سرویس بیش از ۱۲۰ نویسه است یا نویسهٔ کنترلی مانند شکست خط یا Tab دارد. ذخیره نشد.",
      fix: ["نامی کوتاه‌تر و یک‌خطی وارد کنید. در اسکریپت، بررسی کنید `RT_SERVICE_NAME` شکست خط انتهایی نداشته باشد."],
    },
  },
  {
    group: "branding",
    texts: ["Use https://, http://, tg:// or mailto: — or clear it with -", "Use https://, http://, tg:// or mailto:."],
    en: {
      what: "The support link must be a link a browser can safely open. Anything else — including `javascript:` and `data:` links — is refused, and you are asked again.",
      fix: ["Enter a link such as `https://t.me/your_support`, `tg://resolve?domain=your_support` or `mailto:support@example.com`, or `-` to have none."],
    },
    fa: {
      tr: "از `https://`، `http://`، `tg://` یا `mailto:` استفاده کنید — یا با - آن را خالی کنید",
      what: "لینک پشتیبانی باید لینکی باشد که مرورگر بتواند با خیال راحت باز کند. هر چیز دیگری — از جمله لینک‌های `javascript:` و `data:` — رد می‌شود و دوباره از شما پرسیده می‌شود.",
      fix: ["لینکی مانند `https://t.me/your_support`، `tg://resolve?domain=your_support` یا `mailto:support@example.com` وارد کنید، یا برای نداشتن لینک `-` بزنید."],
    },
  },
  {
    group: "branding",
    texts: ["support URL rejected"],
    en: {
      what: "The support link given in `RT_SUPPORT_URL` does not start with `https://`, `http://`, `tg://` or `mailto:`, or contains a control character. It was not saved.",
      fix: ["Correct `RT_SUPPORT_URL`, or set it empty to have no support link."],
    },
    fa: {
      tr: "نشانی پشتیبانی رد شد",
      what: "لینک پشتیبانی که در `RT_SUPPORT_URL` داده شده با `https://`، `http://`، `tg://` یا `mailto:` شروع نمی‌شود، یا نویسهٔ کنترلی دارد. ذخیره نشد.",
      fix: ["`RT_SUPPORT_URL` را اصلاح کنید، یا برای نداشتن لینک پشتیبانی آن را خالی بگذارید."],
    },
  },
  {
    group: "branding",
    texts: ["branding contains control characters; refusing to generate."],
    en: {
      what: "The stored service name or support link contains a control character — which only happens if `config.env` was edited by hand or restored from elsewhere. Rather than build a broken page, generation stops and the live page stays as it is.",
      fix: [
        "Set the branding again through the tools, which validate it: `row-template config`, or **Reset branding** in the manager.",
        "Do not edit `config.env` by hand.",
      ],
    },
    fa: {
      tr: "برندینگ شامل نویسه‌های کنترلی است؛ صفحه ساخته نمی‌شود.",
      what: "نام سرویس یا لینک پشتیبانی ذخیره‌شده نویسهٔ کنترلی دارد — که فقط وقتی پیش می‌آید که `config.env` دستی ویرایش یا از جای دیگری بازگردانده شده باشد. به‌جای ساختن صفحهٔ خراب، ساخت متوقف می‌شود و صفحهٔ زنده همان‌طور که بود می‌ماند.",
      fix: [
        "برندینگ را دوباره با ابزارهایی که اعتبارسنجی می‌کنند تنظیم کنید: `row-template config` یا **Reset branding** در منوی مدیریت.",
        "`config.env` را دستی ویرایش نکنید.",
      ],
    },
  },
  {
    group: "branding",
    texts: ["cannot create a temp file."],
    en: {
      what: "`row-template config` sets your current configuration aside before changing it, and could not create the temporary file for that — usually a full `/tmp`. Nothing was changed.",
      fix: ["Free space in `/tmp` (`df -h /tmp`) and run the command again."],
    },
    fa: {
      tr: "فایل موقت ساخته نشد.",
      what: "`row-template config` پیش از تغییر، پیکربندی فعلی را کنار می‌گذارد و نتوانست فایل موقت این کار را بسازد — معمولاً چون `/tmp` پر است. هیچ تغییری اعمال نشده است.",
      fix: ["در `/tmp` فضا آزاد کنید (`df -h /tmp`) و فرمان را دوباره اجرا کنید."],
    },
  },
  {
    group: "branding",
    texts: ["configuration was not changed."],
    en: {
      what: "A value given to `row-template config` was refused — the line above says which. The previous configuration was restored, so nothing changed.",
      fix: ["Correct the value named just above and run `row-template config` again."],
    },
    fa: {
      tr: "پیکربندی تغییری نکرد.",
      what: "یکی از مقادیری که به `row-template config` داده شد رد شد — خط بالا می‌گوید کدام. پیکربندی قبلی بازگردانده شد، پس چیزی تغییر نکرده است.",
      fix: ["مقداری را که درست در بالا نام برده شده اصلاح کنید و `row-template config` را دوباره اجرا کنید."],
    },
  },
  {
    group: "branding",
    texts: [
      "the template selection could not be reconciled; the previous state is still in place.",
      "could not reconcile the template selection; the previous state was restored.",
    ],
    en: {
      what: "After saving the new branding, the installed design could not be matched to your saved choice — the template store is missing or damaged. Everything was put back as it was.",
      fix: ["Run `row-template verify`, then `row-template update` to reinstall the designs, and apply the change again."],
    },
    fa: {
      tr: "انتخاب تمپلیت هماهنگ نشد؛ وضعیت قبلی همچنان برقرار است. / …؛ وضعیت قبلی بازگردانده شد.",
      what: "پس از ذخیرهٔ برندینگ جدید، تمپلیت نصب‌شده با انتخاب ذخیره‌شدهٔ شما تطبیق داده نشد — مخزن تمپلیت‌ها وجود ندارد یا خراب است. همه چیز به حالت قبل برگردانده شد.",
      fix: ["`row-template verify` و سپس `row-template update` را اجرا کنید تا تمپلیت‌ها دوباره نصب شوند، و بعد تغییر را دوباره اعمال کنید."],
    },
  },
  {
    group: "branding",
    texts: [
      "the new branding failed validation; restoring the previous configuration.",
      "reconfiguration aborted; the previous template is still in place.",
    ],
    en: {
      what: "The page built with the new branding did not pass validation, so it was not activated. The previous configuration and page were restored.",
      fix: ["Read the lines printed just before — they name the problem — correct it, and try again."],
    },
    fa: {
      tr: "برندینگ جدید در اعتبارسنجی رد شد؛ پیکربندی قبلی بازگردانده می‌شود. / پیکربندی مجدد لغو شد؛ تمپلیت قبلی همچنان برقرار است.",
      what: "صفحه‌ای که با برندینگ جدید ساخته شد از اعتبارسنجی عبور نکرد، پس فعال نشد. پیکربندی و صفحهٔ قبلی بازگردانده شدند.",
      fix: ["خطوطی را که درست پیش از آن چاپ شده بخوانید — مشکل را نام می‌برند — آن را اصلاح کنید و دوباره امتحان کنید."],
    },
  },
  {
    group: "branding",
    texts: ["could not write the configuration."],
    en: {
      what: "The manager could not write `config.env` — usually a full disk. The previous configuration and page were restored.",
      fix: ["Check free space under `/etc` and try again."],
    },
    fa: {
      tr: "پیکربندی نوشته نشد.",
      what: "منوی مدیریت نتوانست `config.env` را بنویسد — معمولاً به‌دلیل پر بودن دیسک. پیکربندی و صفحهٔ قبلی بازگردانده شدند.",
      fix: ["فضای آزاد زیر `/etc` را بررسی کنید و دوباره امتحان کنید."],
    },
  },
  {
    group: "branding",
    texts: ["This clears custom branding (service name, support URL, logo) and"],
    en: {
      what: "Not an error: the start of the confirmation for **Reset branding**, which continues “returns Row-Template to its default look. It does NOT remove Row-Template.”",
      fix: ["Answer `y` to clear the service name, support link and logo, or press Enter to cancel."],
    },
    fa: {
      tr: "این کار برندینگ سفارشی (نام سرویس، نشانی پشتیبانی، لوگو) را پاک می‌کند و",
      what: "خطا نیست: ابتدای پیام تأیید برای **Reset branding** است که این‌طور ادامه می‌یابد: «Row-Template را به ظاهر پیش‌فرضش برمی‌گرداند. Row-Template را حذف نمی‌کند.»",
      fix: ["برای پاک کردن نام سرویس، لینک پشتیبانی و لوگو `y` را وارد کنید، یا برای لغو Enter بزنید."],
    },
  },

  // --- generating the page ----------------------------------------------------
  {
    group: "page",
    texts: ["canonical artifact missing: $dist"],
    en: {
      what: "The installed design file, `dist/template.html`, is missing, so the page cannot be regenerated. The live page was not touched.",
      fix: ["Run `row-template update`, or re-run the installer to repair the installation."],
    },
    fa: {
      tr: "فایل اصلی صفحه وجود ندارد: ‹مسیر›",
      what: "فایل تمپلیت نصب‌شده، یعنی `dist/template.html`، وجود ندارد؛ پس صفحه دوباره ساخته نمی‌شود. به صفحهٔ زنده دست زده نشده است.",
      fix: ["`row-template update` را اجرا کنید، یا برای تعمیر نصب، نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "page",
    texts: ["artifact branding markers not found exactly once (open=$nopen close=$nclose)"],
    en: {
      what: "Your branding is placed between two markers in the design file, each of which must appear exactly once. They do not, so the file is not an unmodified Row-Template design. Nothing was changed.",
      fix: ["Run `row-template update` to reinstall the designs. Do not edit design files by hand."],
    },
    fa: {
      tr: "نشانگرهای برندینگ در فایل صفحه دقیقاً یک بار پیدا نشدند (`open=`‹n› `close=`‹n›)",
      what: "برندینگ شما بین دو نشانگر در فایل تمپلیت قرار می‌گیرد و هر کدام باید دقیقاً یک بار وجود داشته باشد. این‌طور نیست؛ پس فایل یک تمپلیت دست‌نخوردهٔ Row-Template نیست. هیچ تغییری اعمال نشده است.",
      fix: ["با `row-template update` تمپلیت‌ها را دوباره نصب کنید. فایل‌های تمپلیت را دستی ویرایش نکنید."],
    },
  },
  {
    group: "page",
    texts: [
      "generated template missing",
      "cannot size generated template",
      "generated template implausibly small (${size} bytes)",
      "generated template does not begin with <!doctype html>",
      "generated template does not end with </html>",
      "branding markers not intact in generated template",
      "generated template missing the #sub-data island",
      "generated template missing the BRANDING block",
      "generated template still contains unsubstituted build placeholders",
    ],
    en: {
      what: "Every page is checked before it can go live: it must be a complete HTML document of plausible size, with its branding block, its data island and no leftover build placeholders. This one failed a check, so it was **not** activated — the page your subscribers see is unchanged. During `verify` or a switch, the same checks can report a damaged file.",
      fix: [
        "Check free disk space — a full disk truncates files.",
        "Run `row-template update` to reinstall the designs and regenerate the page.",
        "If it happens with a fresh official release, [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the exact message.",
      ],
    },
    fa: {
      tr: "تمپلیت ساخته‌شده وجود ندارد / اندازهٔ آن خوانده نشد / به‌طور غیرعادی کوچک است (‹اندازه› بایت) / با `<!doctype html>` شروع نمی‌شود / با `</html>` تمام نمی‌شود / نشانگرهای برندینگ سالم نیستند / بخش داده (`#sub-data`) را ندارد / بلوک BRANDING را ندارد / هنوز جای‌نگهدارهای ساخت جایگزین‌نشده دارد",
      what: "هر صفحه پیش از فعال شدن بررسی می‌شود: باید یک سند HTML کامل با اندازهٔ معقول باشد، بلوک برندینگ و بخش داده‌اش را داشته باشد و هیچ جای‌نگهدار ساختی در آن نمانده باشد. این صفحه یکی از بررسی‌ها را رد کرد، پس **فعال نشد** — صفحه‌ای که مشترکان می‌بینند تغییری نکرده است. هنگام `verify` یا تعویض تمپلیت، همین بررسی‌ها می‌توانند فایل خراب را گزارش دهند.",
      fix: [
        "فضای آزاد دیسک را بررسی کنید — دیسک پر فایل‌ها را ناقص می‌کند.",
        "با `row-template update` تمپلیت‌ها را دوباره نصب کنید و صفحه را دوباره بسازید.",
        "اگر با نسخهٔ رسمی تازه هم رخ داد، با متن دقیق پیام [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "page",
    texts: ["refusing to install an invalid artifact"],
    en: {
      what: "A design file failed the page checks above just before it would have been installed, so it was not. Nothing was changed.",
      fix: ["Fix the check reported on the line above, then try again."],
    },
    fa: {
      tr: "فایل صفحهٔ نامعتبر نصب نمی‌شود",
      what: "یک فایل تمپلیت درست پیش از نصب، بررسی‌های صفحه (بالا) را رد کرد، پس نصب نشد. هیچ تغییری اعمال نشده است.",
      fix: ["بررسی‌ای را که در خط بالا گزارش شده برطرف کنید و دوباره امتحان کنید."],
    },
  },

  // --- updating ---------------------------------------------------------------
  {
    group: "update",
    texts: ["template '$picked' is not in this release; falling back to Row."],
    en: {
      what: "The design you use is not included in the release you are updating to, so the update installs Row instead. Your branding is kept.",
      fix: ["After the update, choose another design from the manager (**2 — Reconfigure branding → 4 — Template**)."],
    },
    fa: {
      tr: "تمپلیت '‹شناسه›' در این نسخه نیست؛ به Row برمی‌گردد.",
      what: "تمپلیتی که استفاده می‌کنید در نسخه‌ای که به آن به‌روز می‌کنید وجود ندارد، پس به‌روزرسانی به‌جای آن Row را نصب می‌کند. برندینگ شما حفظ می‌شود.",
      fix: ["پس از به‌روزرسانی، از منوی مدیریت تمپلیت دیگری انتخاب کنید (**2 — Reconfigure branding → 4 — Template**)."],
    },
  },
  {
    group: "update",
    texts: ["the selected template failed structural validation."],
    en: {
      what: "The new release's copy of your design did not pass the page checks. The update stopped before anything was replaced.",
      fix: ["Run the update again; if it repeats with the official release, [report it](https://github.com/iitzSeriZdev/Row-Template/issues)."],
    },
    fa: {
      tr: "تمپلیت انتخاب‌شده در اعتبارسنجی ساختاری رد شد.",
      what: "نسخهٔ جدیدِ تمپلیت شما در این نسخه، بررسی‌های صفحه را رد کرد. به‌روزرسانی پیش از جایگزینی هر چیزی متوقف شد.",
      fix: ["دوباره به‌روزرسانی کنید؛ اگر با نسخهٔ رسمی تکرار شد، [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues)."],
    },
  },
  {
    group: "update",
    texts: ["could not back up the current install; aborting."],
    en: {
      what: "An update always takes a backup first, and it could not. The update stopped; nothing was replaced.",
      fix: ["Check free disk space under `/etc` and run `row-template update` again."],
    },
    fa: {
      tr: "از نصب فعلی پشتیبان گرفته نشد؛ عملیات لغو شد.",
      what: "به‌روزرسانی همیشه اول پشتیبان می‌گیرد و این کار انجام نشد. به‌روزرسانی متوقف شد و چیزی جایگزین نشده است.",
      fix: ["فضای آزاد دیسک زیر `/etc` را بررسی کنید و `row-template update` را دوباره اجرا کنید."],
    },
  },
  {
    group: "update",
    texts: ["failed to stage the new artifact; the running template is unchanged."],
    en: {
      what: "The new version's page could not be put in place — usually a full disk. The page your subscribers see is unchanged.",
      fix: ["Free some disk space and run `row-template update` again."],
    },
    fa: {
      tr: "فایل صفحهٔ جدید آماده نشد؛ تمپلیت در حال اجرا تغییری نکرده است.",
      what: "صفحهٔ نسخهٔ جدید سر جایش قرار نگرفت — معمولاً به‌دلیل پر بودن دیسک. صفحه‌ای که مشترکان می‌بینند تغییری نکرده است.",
      fix: ["کمی فضای دیسک آزاد کنید و `row-template update` را دوباره اجرا کنید."],
    },
  },
  {
    group: "update",
    texts: [
      "could not update the VERSION file.",
      "could not update the management library.",
      "could not update the row-template CLI.",
    ],
    en: {
      what: "The new page was installed, but a supporting file could not be replaced. The update continues; the version shown, or the command itself, may still be the old one.",
      fix: ["Check free disk space and run `row-template update` again to finish replacing it."],
    },
    fa: {
      tr: "فایل VERSION به‌روز نشد. / کتابخانهٔ مدیریتی به‌روز نشد. / فرمان `row-template` به‌روز نشد.",
      what: "صفحهٔ جدید نصب شد، اما یکی از فایل‌های پشتیبان جایگزین نشد. به‌روزرسانی ادامه پیدا می‌کند؛ ممکن است نسخهٔ نمایش‌داده‌شده یا خود فرمان هنوز قدیمی باشد.",
      fix: ["فضای آزاد دیسک را بررسی کنید و `row-template update` را دوباره اجرا کنید تا جایگزینی کامل شود."],
    },
  },
  {
    group: "update",
    texts: ["could not update the management library's companions; run 'row-template update' to retry."],
    en: {
      what: "The installer files that come with the management library (`lib/transaction.sh`, `panels/`) could not be replaced. The page works; `verify` will report the installation as incomplete.",
      fix: ["Check free space and run `row-template update` again."],
    },
    fa: {
      tr: "فایل‌های همراه کتابخانهٔ مدیریتی به‌روز نشدند؛ برای تلاش دوباره `row-template update` را اجرا کنید.",
      what: "فایل‌های همراه کتابخانهٔ مدیریتی (`lib/transaction.sh` و `panels/`) جایگزین نشدند. صفحه کار می‌کند، اما `verify` نصب را ناقص گزارش می‌کند.",
      fix: ["فضای آزاد را بررسی کنید و `row-template update` را دوباره اجرا کنید."],
    },
  },
  {
    group: "update",
    texts: [
      "activation of the new version failed; rolling back.",
      "rolled back to ${curver:-the previous version}; no changes are live.",
    ],
    en: {
      what: "The new version was installed but its page could not be activated, so the backup taken at the start was restored automatically. Your subscribers kept seeing the previous page throughout. The command exits with status 1.",
      fix: [
        "Run `row-template verify` to confirm the previous version is healthy.",
        "Read the lines before these for the cause, fix it (often disk space or branding), and update again.",
      ],
    },
    fa: {
      tr: "فعال‌سازی نسخهٔ جدید شکست خورد؛ بازگردانی انجام می‌شود. / به ‹نسخه› بازگردانده شد؛ هیچ تغییری فعال نیست.",
      what: "نسخهٔ جدید نصب شد اما صفحه‌اش فعال نشد، پس پشتیبانی که در شروع گرفته شده بود خودکار بازگردانده شد. مشترکان در تمام این مدت صفحهٔ قبلی را می‌دیدند. فرمان با وضعیت 1 خارج می‌شود.",
      fix: [
        "برای اطمینان از سالم بودن نسخهٔ قبلی، `row-template verify` را اجرا کنید.",
        "علت را در خطوط پیش از این پیام‌ها ببینید، برطرفش کنید (اغلب فضای دیسک یا برندینگ) و دوباره به‌روزرسانی کنید.",
      ],
    },
  },
  {
    group: "update",
    texts: ["activation failed AND automatic rollback failed; run 'row-template rollback' to recover."],
    en: {
      what: "The new version could not be activated, and restoring the previous one also failed. The live page is whatever was there before the update, but the installed files may be mixed.",
      fix: [
        "Run `row-template rollback` to restore the backup taken before the update.",
        "Then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "فعال‌سازی شکست خورد و بازگردانی خودکار هم شکست خورد؛ برای بازیابی `row-template rollback` را اجرا کنید.",
      what: "نسخهٔ جدید فعال نشد و بازگرداندن نسخهٔ قبلی هم شکست خورد. صفحهٔ زنده همان صفحهٔ پیش از به‌روزرسانی است، اما ممکن است فایل‌های نصب‌شده درهم باشند.",
      fix: [
        "با `row-template rollback` پشتیبانی را که پیش از به‌روزرسانی گرفته شده بازگردانید.",
        "سپس `row-template verify` را اجرا کنید.",
      ],
    },
  },
  {
    group: "update",
    texts: ["This installation is incomplete: some installer components are missing, as after an update from 1.1.0."],
    en: {
      what: "The manager found that the installer's companion files are missing — the expected state after the first update from 1.1.0.",
      fix: ["Accept `Re-install … now to complete it?` — or run `row-template update` — to install them and every design. [Upgrading from 1.1.0 →](/docs/management/updating/#upgrading-from-110)"],
    },
    fa: {
      tr: "این نصب ناقص است: برخی از اجزای نصب‌کننده وجود ندارند؛ مانند وضعیت پس از به‌روزرسانی از 1.1.0.",
      what: "منوی مدیریت دریافت که فایل‌های همراه نصب‌کننده وجود ندارند — وضعیتی که پس از اولین به‌روزرسانی از 1.1.0 انتظار می‌رود.",
      fix: ["پرسش `Re-install … now to complete it?` را تأیید کنید — یا `row-template update` را اجرا کنید — تا آن‌ها و همهٔ تمپلیت‌ها نصب شوند. [ارتقا از 1.1.0 ←](/docs/management/updating/#upgrading-from-110)"],
    },
  },
  {
    group: "update",
    texts: ["Unable to check for updates right now (network or release source unavailable)."],
    en: {
      what: "The manager could not read the latest release's `manifest.txt`. Your installation is not affected, and nothing was changed.",
      fix: [
        "Check the server can reach GitHub, and try again later.",
        "Without GitHub access, update from a local folder: `RT_RELEASE_DIR=/path row-template update`.",
      ],
    },
    fa: {
      tr: "در حال حاضر بررسی به‌روزرسانی ممکن نیست (شبکه یا منبع نسخه در دسترس نیست).",
      what: "منوی مدیریت نتوانست `manifest.txt` آخرین نسخه را بخواند. نصب شما آسیبی ندیده و چیزی تغییر نکرده است.",
      fix: [
        "دسترسی سرور به GitHub را بررسی کنید و بعداً دوباره امتحان کنید.",
        "اگر به GitHub دسترسی ندارید، از پوشهٔ محلی به‌روزرسانی کنید: `RT_RELEASE_DIR=/path row-template update`.",
      ],
    },
  },

  // --- backups and rollback -------------------------------------------------
  {
    group: "rollback",
    texts: ["nothing to back up: $RT_DIST missing"],
    en: {
      what: "A backup was needed, but the installed design file is missing, so there is nothing to back up. The operation that needed it stopped.",
      fix: ["Re-run the installer to repair the installation."],
    },
    fa: {
      tr: "چیزی برای پشتیبان‌گیری نیست: `/etc/3x-ui/sub_templates/row-template/dist/template.html` وجود ندارد",
      what: "به پشتیبان نیاز بود، اما فایل تمپلیت نصب‌شده وجود ندارد، پس چیزی برای پشتیبان‌گیری نیست. عملیاتی که به آن نیاز داشت متوقف شد.",
      fix: ["برای تعمیر نصب، نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["could not prune backup: $d"],
    en: {
      what: "An old backup beyond the two kept could not be deleted. Nothing else is affected.",
      fix: ["Check the folder's permissions. You can delete an old backup folder under `backups/` by hand."],
    },
    fa: {
      tr: "پشتیبان حذف نشد: ‹مسیر›",
      what: "یکی از پشتیبان‌های قدیمی (بیش از دو پشتیبانی که نگه داشته می‌شوند) حذف نشد. چیز دیگری تحت تأثیر نیست.",
      fix: ["مجوزهای آن پوشه را بررسی کنید. می‌توانید پوشهٔ پشتیبان قدیمی زیر `backups/` را دستی حذف کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["backup failed validation: $dir", "the selected backup failed validation: $target"],
    en: {
      what: "The backup's page no longer matches the checksum stored with it, or its files are missing. A damaged backup is never restored. Nothing was changed.",
      fix: [
        "List the backups with `ls /etc/3x-ui/sub_templates/row-template/backups/` and choose another with `row-template rollback --to <name>`.",
      ],
    },
    fa: {
      tr: "پشتیبان در اعتبارسنجی رد شد: ‹مسیر›",
      what: "صفحهٔ داخل پشتیبان دیگر با چک‌سامی که همراهش ذخیره شده یکی نیست، یا فایل‌هایش وجود ندارند. پشتیبان خراب هرگز بازگردانده نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "فهرست پشتیبان‌ها را با `ls /etc/3x-ui/sub_templates/row-template/backups/` ببینید و با `row-template rollback --to <name>` پشتیبان دیگری انتخاب کنید.",
      ],
    },
  },
  {
    group: "rollback",
    texts: ["backup artifact matches no installed template; the template store may be damaged"],
    en: {
      what: "Rollback works out which design a backup holds by matching its page, byte for byte, against the designs in the current template store — and this one matches none. Either the template store is damaged, or the backup was made by an older release (such as 1.1.0) whose page differs from every 1.2.0 design. Nothing was changed.",
      fix: [
        "Run `row-template verify`. If the store is damaged, `row-template update` reinstalls it; then try again.",
        "A backup made by 1.1.0 cannot be restored by 1.2.0. See [Rolling back across versions](/docs/management/rollback/#rolling-back-across-versions).",
      ],
    },
    fa: {
      tr: "صفحهٔ داخل پشتیبان با هیچ تمپلیت نصب‌شده‌ای مطابقت ندارد؛ ممکن است مخزن تمپلیت‌ها خراب باشد",
      what: "بازگردانی تشخیص می‌دهد پشتیبان کدام تمپلیت را دارد، با مقایسهٔ بایت‌به‌بایت صفحهٔ آن با تمپلیت‌های مخزن فعلی — و این یکی با هیچ‌کدام مطابقت ندارد. یا مخزن تمپلیت‌ها خراب است، یا پشتیبان را نسخهٔ قدیمی‌تری (مانند 1.1.0) ساخته که صفحه‌اش با همهٔ تمپلیت‌های 1.2.0 فرق دارد. هیچ تغییری اعمال نشده است.",
      fix: [
        "`row-template verify` را اجرا کنید. اگر مخزن خراب است، `row-template update` آن را دوباره نصب می‌کند؛ سپس دوباره امتحان کنید.",
        "پشتیبانی که 1.1.0 ساخته با 1.2.0 بازگردانده نمی‌شود. [بازگردانی بین نسخه‌ها](/docs/management/rollback/#rolling-back-across-versions) را ببینید.",
      ],
    },
  },
  {
    group: "rollback",
    texts: ["could not restore VERSION from the backup."],
    en: {
      what: "The backup's page was restored, but its `VERSION` file could not be, so `row-template version` may show the wrong version.",
      fix: ["Check free disk space. Running the rollback again rewrites it."],
    },
    fa: {
      tr: "فایل VERSION از پشتیبان بازگردانده نشد.",
      what: "صفحهٔ پشتیبان بازگردانده شد، اما فایل `VERSION` آن نه؛ پس ممکن است `row-template version` نسخهٔ اشتباهی نشان دهد.",
      fix: ["فضای آزاد دیسک را بررسی کنید. اجرای دوبارهٔ بازگردانی آن را دوباره می‌نویسد."],
    },
  },
  {
    group: "rollback",
    texts: ["could not persist the restored template selection"],
    en: {
      what: "The restored design could not be recorded in `config.env`. The operation stops without activating the restored page.",
      fix: ["Check free space and that `config.env` is writable, then run `row-template rollback` again."],
    },
    fa: {
      tr: "انتخاب تمپلیتِ بازگردانده‌شده ذخیره نشد",
      what: "تمپلیت بازگردانده‌شده در `config.env` ثبت نشد. عملیات بدون فعال کردن صفحهٔ بازگردانده‌شده متوقف می‌شود.",
      fix: ["فضای آزاد و قابل نوشتن بودن `config.env` را بررسی کنید و `row-template rollback` را دوباره اجرا کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["--to requires a backup directory.", "usage: row-template rollback [--auto | --to <backup-dir>]"],
    en: {
      what: "`rollback` was given an option it does not know, or `--to` without a backup.",
      fix: [
        "Use `row-template rollback` (newest backup), `row-template rollback --auto` (the same), or `row-template rollback --to <name>`.",
        "Backup names are the folders under `/etc/3x-ui/sub_templates/row-template/backups/`.",
      ],
    },
    fa: {
      tr: "گزینهٔ `--to` به پوشهٔ پشتیبان نیاز دارد. / روش استفاده: `row-template rollback [--auto | --to <backup-dir>]`",
      what: "به `rollback` گزینه‌ای داده شده که آن را نمی‌شناسد، یا `--to` بدون نام پشتیبان آمده است.",
      fix: [
        "از `row-template rollback` (جدیدترین پشتیبان)، `row-template rollback --auto` (همان) یا `row-template rollback --to <name>` استفاده کنید.",
        "نام پشتیبان‌ها همان نام پوشه‌های زیر `/etc/3x-ui/sub_templates/row-template/backups/` است.",
      ],
    },
  },
  {
    group: "rollback",
    texts: ["no valid backup is available to roll back to."],
    en: {
      what: "There is no backup whose page still matches its checksum. Backups are taken by updates, template switches and repairs; a fresh installation has none yet.",
      fix: ["Nothing to roll back to. To reinstall the current release, run `row-template update`."],
    },
    fa: {
      tr: "هیچ پشتیبان معتبری برای بازگردانی وجود ندارد.",
      what: "هیچ پشتیبانی وجود ندارد که صفحه‌اش هنوز با چک‌سامش بخواند. پشتیبان‌ها هنگام به‌روزرسانی، تعویض تمپلیت و تعمیر گرفته می‌شوند؛ نصب تازه هنوز پشتیبانی ندارد.",
      fix: ["چیزی برای بازگردانی نیست. برای نصب دوبارهٔ نسخهٔ فعلی، `row-template update` را اجرا کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["refusing to roll back from a path outside the backups tree."],
    en: {
      what: "`--to` pointed at a folder outside `backups/`. Only Row-Template's own backups can be restored. Nothing was changed.",
      fix: ["Give a folder name from `/etc/3x-ui/sub_templates/row-template/backups/`, or use `row-template rollback --auto`."],
    },
    fa: {
      tr: "بازگردانی از مسیری بیرون از پوشهٔ پشتیبان‌ها انجام نمی‌شود.",
      what: "`--to` به پوشه‌ای بیرون از `backups/` اشاره کرده است. فقط پشتیبان‌های خود Row-Template بازگردانده می‌شوند. هیچ تغییری اعمال نشده است.",
      fix: ["نام یکی از پوشه‌های `/etc/3x-ui/sub_templates/row-template/backups/` را بدهید، یا از `row-template rollback --auto` استفاده کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["could not snapshot the current version before rollback."],
    en: {
      what: "The safety backup of the current version could not be taken. The rollback continues, but if it fails the current version cannot be brought back automatically.",
      fix: ["Check free disk space under `/etc`, and run `row-template verify` when the rollback finishes."],
    },
    fa: {
      tr: "پیش از بازگردانی، از نسخهٔ فعلی پشتیبان گرفته نشد.",
      what: "پشتیبان ایمنی از نسخهٔ فعلی گرفته نشد. بازگردانی ادامه پیدا می‌کند، اما اگر شکست بخورد نسخهٔ فعلی به‌صورت خودکار بازنمی‌گردد.",
      fix: ["فضای آزاد دیسک زیر `/etc` را بررسی کنید و پس از پایان بازگردانی، `row-template verify` را اجرا کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["could not stage the backup; the running template is unchanged."],
    en: {
      what: "The backup could not be put in place — the line above says why. The page your subscribers see is unchanged.",
      fix: ["Fix the problem named just above. If it says the backup matches no installed template, see that message."],
    },
    fa: {
      tr: "پشتیبان آماده نشد؛ تمپلیت در حال اجرا تغییری نکرده است.",
      what: "پشتیبان سر جایش قرار نگرفت — علت در خط بالا آمده است. صفحه‌ای که مشترکان می‌بینند تغییری نکرده است.",
      fix: ["مشکلی را که درست در بالا نام برده شده برطرف کنید. اگر گفته پشتیبان با هیچ تمپلیت نصب‌شده‌ای مطابقت ندارد، توضیح همان پیام را ببینید."],
    },
  },
  {
    group: "rollback",
    texts: [
      "rollback activation failed; attempting to restore the current version.",
      "restored the previously-running version; nothing changed.",
    ],
    en: {
      what: "The older version was staged but its page could not be activated, so the safety backup of the current version was restored. Nothing changed. The command exits with status 1.",
      fix: ["Read the lines above for the cause (often branding or disk space), fix it, and try again."],
    },
    fa: {
      tr: "فعال‌سازی بازگردانی شکست خورد؛ تلاش برای بازگرداندن نسخهٔ فعلی. / نسخهٔ در حال اجرای قبلی بازگردانده شد؛ چیزی تغییر نکرد.",
      what: "نسخهٔ قدیمی‌تر آماده شد اما صفحه‌اش فعال نشد، پس پشتیبان ایمنی نسخهٔ فعلی بازگردانده شد. چیزی تغییر نکرد. فرمان با وضعیت 1 خارج می‌شود.",
      fix: ["علت را در خطوط بالاتر ببینید (اغلب برندینگ یا فضای دیسک)، برطرفش کنید و دوباره امتحان کنید."],
    },
  },
  {
    group: "rollback",
    texts: ["rollback failed and the current version could not be restored automatically."],
    en: {
      what: "Both the rollback and the automatic return to the current version failed. The live page is what it was before, but the installed files may be mixed.",
      fix: [
        "Run `row-template verify` to see the state.",
        "Try `row-template rollback --to <name>` with the safety backup just created (the newest folder in `backups/`), or re-run the installer to repair.",
      ],
    },
    fa: {
      tr: "بازگردانی شکست خورد و نسخهٔ فعلی هم به‌صورت خودکار بازگردانده نشد.",
      what: "هم بازگردانی و هم بازگشت خودکار به نسخهٔ فعلی شکست خوردند. صفحهٔ زنده همان صفحهٔ قبلی است، اما ممکن است فایل‌های نصب‌شده درهم باشند.",
      fix: [
        "برای دیدن وضعیت `row-template verify` را اجرا کنید.",
        "`row-template rollback --to <name>` را با پشتیبان ایمنی‌ای که همین حالا ساخته شد (جدیدترین پوشه در `backups/`) امتحان کنید، یا برای تعمیر نصب‌کننده را دوباره اجرا کنید.",
      ],
    },
  },

  // --- verify results -----------------------------------------------------------
  {
    group: "verify",
    texts: ["install root missing or is a symlink: $RT_ROOT"],
    en: {
      what: "The install directory does not exist, or is a symbolic link. Row-Template is not installed properly.",
      fix: ["Re-run the installer. If the directory is a symlink, replace it with a real directory first."],
    },
    fa: {
      tr: "ریشهٔ نصب وجود ندارد یا یک پیوند نمادین است: `/etc/3x-ui/sub_templates/row-template`",
      what: "پوشهٔ نصب وجود ندارد یا یک پیوند نمادین است. Row-Template به‌درستی نصب نشده است.",
      fix: ["نصب‌کننده را دوباره اجرا کنید. اگر پوشه symlink است، اول آن را با یک پوشهٔ واقعی جایگزین کنید."],
    },
  },
  {
    group: "verify",
    texts: [
      "canonical artifact missing checksum or does not match it.",
      "canonical artifact missing or unreadable: $RT_DIST",
    ],
    en: {
      what: "The installed design file (`dist/template.html`) is missing, or no longer matches the checksum recorded when it was installed — it was changed or damaged.",
      fix: ["Run `row-template update` to reinstall it. The live page keeps working in the meantime."],
    },
    fa: {
      tr: "فایل اصلی صفحه چک‌سام ندارد یا با آن مطابقت ندارد. / فایل اصلی صفحه وجود ندارد یا خوانا نیست: ‹مسیر›",
      what: "فایل تمپلیت نصب‌شده (`dist/template.html`) وجود ندارد، یا دیگر با چک‌سامی که هنگام نصب ثبت شده یکی نیست — تغییر کرده یا خراب شده است.",
      fix: ["با `row-template update` آن را دوباره نصب کنید. در این فاصله صفحهٔ زنده کار می‌کند."],
    },
  },
  {
    group: "verify",
    texts: ["a template in the store does not match its checksum."],
    en: {
      what: "One of the designs in the template store was changed or damaged after installation.",
      fix: ["Run `row-template update` to reinstall every design."],
    },
    fa: {
      tr: "یکی از تمپلیت‌های مخزن با چک‌سامش مطابقت ندارد.",
      what: "یکی از تمپلیت‌های مخزن پس از نصب تغییر کرده یا خراب شده است.",
      fix: ["با `row-template update` همهٔ تمپلیت‌ها را دوباره نصب کنید."],
    },
  },
  {
    group: "verify",
    texts: ["canonical artifact does not match the selected template ($sel_id)."],
    en: {
      what: "`config.env` names one design but a different one is installed. Row-Template never produces this itself; it points to a hand edit or an interrupted operation.",
      fix: ["Run `row-template config` and press Enter at every question — it realigns the installed design with the saved choice — or run `row-template update`."],
    },
    fa: {
      tr: "فایل اصلی صفحه با تمپلیت انتخاب‌شده (‹شناسه›) مطابقت ندارد.",
      what: "`config.env` یک تمپلیت را نام می‌برد ولی تمپلیت دیگری نصب است. Row-Template خودش هرگز چنین وضعیتی نمی‌سازد؛ نشانهٔ ویرایش دستی یا عملیات نیمه‌کاره است.",
      fix: ["`row-template config` را اجرا کنید و در همهٔ پرسش‌ها Enter بزنید — تمپلیت نصب‌شده را با انتخاب ذخیره‌شده هماهنگ می‌کند — یا `row-template update` را اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["selected template '$sel_id' is missing from the template store."],
    en: {
      what: "The design you selected is not in the installation's template store.",
      fix: ["Run `row-template update` to reinstall the template store."],
    },
    fa: {
      tr: "تمپلیت انتخاب‌شدهٔ '‹شناسه›' در مخزن تمپلیت‌ها وجود ندارد.",
      what: "تمپلیتی که انتخاب کرده‌اید در مخزن تمپلیت‌های نصب نیست.",
      fix: ["با `row-template update` مخزن تمپلیت‌ها را دوباره نصب کنید."],
    },
  },
  {
    group: "verify",
    texts: ["template store missing or empty; run 'row-template update' to install it."],
    en: {
      what: "The installation has no template store. This is expected after the **first** update from 1.1.0, which is performed by 1.1.0's updater and does not know about designs.",
      fix: ["Run `row-template update` again. [Upgrading from 1.1.0 →](/docs/management/updating/#upgrading-from-110)"],
    },
    fa: {
      tr: "مخزن تمپلیت‌ها وجود ندارد یا خالی است؛ برای نصب آن `row-template update` را اجرا کنید.",
      what: "نصب مخزن تمپلیت ندارد. این وضعیت پس از **اولین** به‌روزرسانی از 1.1.0 طبیعی است، چون آن به‌روزرسانی را به‌روزرسان 1.1.0 انجام می‌دهد که تمپلیت‌ها را نمی‌شناسد.",
      fix: ["`row-template update` را یک بار دیگر اجرا کنید. [ارتقا از 1.1.0 ←](/docs/management/updating/#upgrading-from-110)"],
    },
  },
  {
    group: "verify",
    texts: ["live template failed structural validation.", "live template missing or unreadable: $RT_LIVE"],
    en: {
      what: "The page the panel serves, `sub.html`, is missing or incomplete. Subscribers opening their link in a browser may see an error.",
      fix: ["Regenerate it: run `row-template update`, or re-run the installer to repair."],
    },
    fa: {
      tr: "تمپلیت زنده در اعتبارسنجی ساختاری رد شد. / تمپلیت زنده وجود ندارد یا خوانا نیست: ‹مسیر›",
      what: "صفحه‌ای که پنل ارائه می‌کند، یعنی `sub.html`، وجود ندارد یا ناقص است. ممکن است مشترکانی که لینکشان را در مرورگر باز می‌کنند خطا ببینند.",
      fix: ["آن را دوباره بسازید: `row-template update` را اجرا کنید، یا برای تعمیر نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["VERSION file missing or empty."],
    en: {
      what: "The installation's `VERSION` file is missing, so its version is unknown.",
      fix: ["Re-run the installer, or run `row-template update`."],
    },
    fa: {
      tr: "فایل VERSION وجود ندارد یا خالی است.",
      what: "فایل `VERSION` نصب وجود ندارد، پس نسخهٔ آن نامعلوم است.",
      fix: ["نصب‌کننده را دوباره اجرا کنید، یا `row-template update` را اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["config present but not readable."],
    en: {
      what: "`config.env` exists but the current user cannot read it. It is readable only by root and its group on purpose.",
      fix: ["Run `row-template verify` as root."],
    },
    fa: {
      tr: "پیکربندی وجود دارد اما خوانا نیست.",
      what: "`config.env` وجود دارد اما کاربر فعلی نمی‌تواند آن را بخواند. عمداً فقط root و گروه آن می‌توانند آن را بخوانند.",
      fix: ["`row-template verify` را با root اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["config.env is other-writable (mode $perm); tighten to 640."],
    en: {
      what: "Any user on the server can modify your branding file. Row-Template itself always writes it with mode `640`.",
      fix: ["`chmod 640 /etc/3x-ui/sub_templates/row-template/config.env`"],
    },
    fa: {
      tr: "`config.env` برای همه قابل نوشتن است (مجوز ‹مجوز›)؛ آن را به 640 محدود کنید.",
      what: "هر کاربری روی سرور می‌تواند فایل برندینگ شما را تغییر دهد. خود Row-Template همیشه آن را با مجوز `640` می‌نویسد.",
      fix: ["`chmod 640 /etc/3x-ui/sub_templates/row-template/config.env`"],
    },
  },
  {
    group: "verify",
    texts: ["management library not found under the install root.", "CLI not found or not executable at $RT_BIN."],
    en: {
      what: "The management library in the install directory, or the `row-template` command, is missing. The page keeps working, but managing it may not.",
      fix: ["Re-run the installer; it repairs the installation in place and keeps your configuration."],
    },
    fa: {
      tr: "کتابخانهٔ مدیریتی زیر ریشهٔ نصب پیدا نشد. / فرمان `row-template` در `/usr/local/bin/row-template` پیدا نشد یا قابل اجرا نیست.",
      what: "کتابخانهٔ مدیریتی در پوشهٔ نصب، یا فرمان `row-template`، وجود ندارد. صفحه کار می‌کند، اما ممکن است مدیریت آن ممکن نباشد.",
      fix: ["نصب‌کننده را دوباره اجرا کنید؛ نصب را در همان جا تعمیر می‌کند و پیکربندی شما را نگه می‌دارد."],
    },
  },
  {
    group: "verify",
    texts: ["installer components are missing (lib/transaction.sh, panels/), as after an update from 1.1.0; run 'row-template update' to complete the installation."],
    en: {
      what: "The installer's companion files are missing — the expected state after the first update from 1.1.0, whose updater copies only the library and the command. Everything else works.",
      fix: ["Run `row-template update` once more. [Upgrading from 1.1.0 →](/docs/management/updating/#upgrading-from-110)"],
    },
    fa: {
      tr: "اجزای نصب‌کننده وجود ندارند (`lib/transaction.sh` و `panels/`)، مانند وضعیت پس از به‌روزرسانی از 1.1.0؛ برای کامل کردن نصب `row-template update` را اجرا کنید.",
      what: "فایل‌های همراه نصب‌کننده وجود ندارند — وضعیتی که پس از اولین به‌روزرسانی از 1.1.0 انتظار می‌رود، چون به‌روزرسان آن فقط کتابخانه و فرمان را کپی می‌کند. بقیهٔ چیزها کار می‌کنند.",
      fix: ["`row-template update` را یک بار دیگر اجرا کنید. [ارتقا از 1.1.0 ←](/docs/management/updating/#upgrading-from-110)"],
    },
  },
  {
    group: "verify",
    texts: ["could not determine the 3x-ui version.", "3x-ui installation was not detected."],
    en: {
      what: "`verify` could not find the panel, or could not read its version. The page files are checked anyway.",
      fix: [
        "Run `verify` on the server that runs 3X-UI, as root.",
        "Check `/usr/local/x-ui/x-ui -v` prints a version.",
      ],
    },
    fa: {
      tr: "نسخهٔ 3x-ui مشخص نشد. / نصب 3x-ui پیدا نشد.",
      what: "`verify` پنل را پیدا نکرد یا نتوانست نسخه‌اش را بخواند. فایل‌های صفحه به هر حال بررسی می‌شوند.",
      fix: [
        "`verify` را روی سروری که 3X-UI روی آن است و با root اجرا کنید.",
        "بررسی کنید `/usr/local/x-ui/x-ui -v` نسخه‌ای چاپ کند.",
      ],
    },
  },
  {
    group: "verify",
    texts: ["panel subThemeDir is empty; set it to $RT_ROOT."],
    en: {
      what: "Row-Template is installed but not activated: the panel still serves its built-in page.",
      fix: ["Activate it — with the manager's **5 — Activate / Re-apply theme**, or in the panel. See [Activation](/docs/installation/activation/)."],
    },
    fa: {
      tr: "`subThemeDir` پنل خالی است؛ آن را روی `/etc/3x-ui/sub_templates/row-template` تنظیم کنید.",
      what: "Row-Template نصب شده اما فعال نشده است: پنل هنوز صفحهٔ داخلی خودش را ارائه می‌کند.",
      fix: ["آن را فعال کنید — با گزینهٔ **5 — Activate / Re-apply theme** در منوی مدیریت، یا از داخل پنل. [فعال‌سازی](/docs/installation/activation/) را ببینید."],
    },
  },
  {
    group: "verify",
    texts: ["panel subThemeDir does not point at Row-Template."],
    en: {
      what: "The panel is set to serve a different theme directory. Row-Template is installed but not the page subscribers see.",
      fix: ["If that is not intended, activate Row-Template — see [Activation](/docs/installation/activation/)."],
    },
    fa: {
      tr: "`subThemeDir` پنل به Row-Template اشاره نمی‌کند.",
      what: "پنل برای ارائهٔ پوشهٔ پوستهٔ دیگری تنظیم شده است. Row-Template نصب است اما صفحه‌ای نیست که مشترکان می‌بینند.",
      fix: ["اگر عمدی نیست، Row-Template را فعال کنید — [فعال‌سازی](/docs/installation/activation/) را ببینید."],
    },
  },
  {
    group: "verify",
    texts: ["leftover staging files found under the install root (possible interrupted update)."],
    en: {
      what: "Temporary files starting with `.stage.` or `.live.` were left behind by an interrupted command. They are never used.",
      fix: [
        "When no `row-template` command is running, delete them: `find /etc/3x-ui/sub_templates/row-template -maxdepth 2 \\( -name '.stage.*' -o -name '.live.*' \\) -delete`.",
        "Then run `row-template verify` again.",
      ],
    },
    fa: {
      tr: "فایل‌های موقت باقی‌مانده زیر ریشهٔ نصب پیدا شد (احتمالاً به‌روزرسانی نیمه‌کاره).",
      what: "فایل‌های موقتی که با `.stage.` یا `.live.` شروع می‌شوند از یک فرمان نیمه‌کاره باقی مانده‌اند. هرگز استفاده نمی‌شوند.",
      fix: [
        "وقتی هیچ فرمان `row-template` در حال اجرا نیست، حذفشان کنید: `find /etc/3x-ui/sub_templates/row-template -maxdepth 2 \\( -name '.stage.*' -o -name '.live.*' \\) -delete`.",
        "سپس `row-template verify` را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "verify",
    texts: ["live render check: the panel served its built-in page."],
    en: {
      what: "A local test request, made as a browser, got the panel's own page rather than Row-Template.",
      fix: ["Check activation, then restart the panel (`systemctl restart x-ui`) and run `verify` again."],
    },
    fa: {
      tr: "بررسی نمایش زنده: پنل صفحهٔ داخلی خودش را ارائه کرد.",
      what: "یک درخواست آزمایشی محلی مانند مرورگر، صفحهٔ خود پنل را دریافت کرد، نه Row-Template را.",
      fix: ["فعال‌سازی را بررسی کنید، سپس پنل را ری‌استارت کنید (`systemctl restart x-ui`) و `verify` را دوباره اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["live render check: the subscription endpoint was unreachable."],
    en: {
      what: "The subscription address on this server did not answer a local request.",
      fix: ["Check the panel is running and its subscription service is enabled, on the port configured in the panel."],
    },
    fa: {
      tr: "بررسی نمایش زنده: نشانی اشتراک در دسترس نبود.",
      what: "نشانی اشتراک روی همین سرور به درخواست محلی پاسخ نداد.",
      fix: ["بررسی کنید پنل در حال اجرا باشد و سرویس اشتراکش روی پورتی که در پنل تنظیم شده فعال باشد."],
    },
  },
  {
    group: "verify",
    texts: ["VPN-client check: HTML was returned instead of subscription content."],
    en: {
      what: "A local request made as a VPN app received the web page instead of its configuration, so VPN apps would fail to update.",
      fix: ["Make sure nothing in front of the panel changes the `User-Agent` or `Accept` headers of requests."],
    },
    fa: {
      tr: "بررسی کلاینت VPN: به‌جای محتوای اشتراک، HTML برگردانده شد.",
      what: "درخواستی محلی که مانند اپ VPN ارسال شد، به‌جای پیکربندی صفحهٔ وب را دریافت کرد؛ پس اپ‌های VPN نمی‌توانند به‌روز شوند.",
      fix: ["مطمئن شوید چیزی که جلوی پنل قرار دارد، هدرهای `User-Agent` یا `Accept` درخواست‌ها را تغییر نمی‌دهد."],
    },
  },
  {
    group: "verify",
    texts: ["verification FAILED ($fails hard issue(s), $warns warning(s))."],
    en: {
      what: "The summary of `verify`: at least one hard check failed. The command exits with status 1.",
      fix: ["Fix the `FAIL` lines above it — each is explained on this page."],
    },
    fa: {
      tr: "بررسی ناموفق بود (‹n› مشکل جدی، ‹n› هشدار).",
      what: "جمع‌بندی `verify`: دست‌کم یکی از بررسی‌های جدی رد شده است. فرمان با وضعیت 1 خارج می‌شود.",
      fix: ["خطوط `FAIL` بالای آن را برطرف کنید — توضیح هر کدام در همین صفحه آمده است."],
    },
  },
  {
    group: "verify",
    texts: ["verification passed with $warns warning(s)."],
    en: {
      what: "The summary of `verify`: no hard failures, so the installation is working, but some checks warned.",
      fix: ["Review the `warn` lines above it; each is explained on this page."],
    },
    fa: {
      tr: "بررسی با ‹n› هشدار موفق بود.",
      what: "جمع‌بندی `verify`: هیچ خطای جدی‌ای نیست، پس نصب کار می‌کند، اما برخی بررسی‌ها هشدار داده‌اند.",
      fix: ["خطوط `warn` بالای آن را مرور کنید؛ توضیح هر کدام در همین صفحه آمده است."],
    },
  },

  // --- uninstalling -------------------------------------------------------------
  {
    group: "uninstall",
    texts: [
      "refusing to delete $RT_ROOT: it does not look like a Row-Template install root.",
      "refusing to delete a system path: $RT_ROOT",
    ],
    en: {
      what: "Before deleting anything, uninstall confirms the directory is a Row-Template installation (it must hold `VERSION` plus the design or the library) and is not a system path. That check failed, so nothing was deleted.",
      fix: [
        "Check what is in `/etc/3x-ui/sub_templates/row-template`.",
        "If it is a damaged Row-Template installation, re-run the installer to repair it, then uninstall — or [remove it by hand](/docs/management/uninstall/#if-uninstall-cannot-run).",
      ],
    },
    fa: {
      tr: "`/etc/3x-ui/sub_templates/row-template` حذف نمی‌شود: به ریشهٔ نصب Row-Template شبیه نیست. / مسیر سیستمی حذف نمی‌شود: ‹مسیر›",
      what: "حذف‌کننده پیش از پاک کردن هر چیزی تأیید می‌کند که پوشه نصب Row-Template است (باید `VERSION` و تمپلیت یا کتابخانه را داشته باشد) و مسیر سیستمی نیست. این بررسی رد شد، پس چیزی حذف نشد.",
      fix: [
        "محتوای `/etc/3x-ui/sub_templates/row-template` را بررسی کنید.",
        "اگر نصب خراب Row-Template است، اول با اجرای دوبارهٔ نصب‌کننده تعمیرش کنید و بعد حذف کنید — یا [دستی حذفش کنید](/docs/management/uninstall/#if-uninstall-cannot-run).",
      ],
    },
  },
  {
    group: "uninstall",
    texts: ["refusing to uninstall non-interactively without RT_ASSUME_YES=1."],
    en: {
      what: "Uninstall asks for confirmation, and there is no terminal to ask on. Nothing was removed.",
      fix: ["Run `RT_ASSUME_YES=1 row-template uninstall` to confirm from a script."],
    },
    fa: {
      tr: "بدون `RT_ASSUME_YES=1` حذف غیرتعاملی انجام نمی‌شود.",
      what: "حذف نیاز به تأیید دارد و ترمینالی برای پرسیدن وجود ندارد. چیزی حذف نشد.",
      fix: ["برای تأیید از داخل اسکریپت، `RT_ASSUME_YES=1 row-template uninstall` را اجرا کنید."],
    },
  },
  {
    group: "uninstall",
    texts: ["could not clear subThemeDir automatically. In the panel, clear Settings -> Subscription -> Sub Theme Directory."],
    en: {
      what: "Uninstall could not reset the panel's theme directory. Row-Template's files are still removed next, so the panel would point at a directory that no longer exists.",
      fix: ["In the panel, empty **Panel Settings → Subscription → Sub Theme Directory**, save, and restart the panel."],
    },
    fa: {
      tr: "`subThemeDir` به‌صورت خودکار پاک نشد. در پنل، `Settings -> Subscription -> Sub Theme Directory` را خالی کنید.",
      what: "حذف‌کننده نتوانست پوشهٔ پوستهٔ پنل را بازنشانی کند. فایل‌های Row-Template در ادامه حذف می‌شوند، پس پنل به پوشه‌ای اشاره می‌کند که دیگر وجود ندارد.",
      fix: ["در پنل، **Panel Settings → Subscription → Sub Theme Directory** را خالی کنید، ذخیره کنید و پنل را ری‌استارت کنید."],
    },
  },
  {
    group: "uninstall",
    texts: ["could not read subThemeDir (sqlite3/DB unavailable). If it points at $RT_ROOT, clear it in the panel."],
    en: {
      what: "Without `sqlite3` (or the panel database), uninstall cannot tell where the panel's theme directory points, so it leaves it alone.",
      fix: ["Open **Panel Settings → Subscription**. If **Sub Theme Directory** is `/etc/3x-ui/sub_templates/row-template`, empty it, save and restart the panel."],
    },
    fa: {
      tr: "`subThemeDir` خوانده نشد (`sqlite3` یا پایگاه‌داده در دسترس نیست). اگر به `/etc/3x-ui/sub_templates/row-template` اشاره می‌کند، آن را در پنل خالی کنید.",
      what: "بدون `sqlite3` (یا پایگاه‌دادهٔ پنل)، حذف‌کننده نمی‌تواند بفهمد پوشهٔ پوستهٔ پنل به کجا اشاره می‌کند، پس به آن دست نمی‌زند.",
      fix: ["**Panel Settings → Subscription** را باز کنید. اگر **Sub Theme Directory** برابر `/etc/3x-ui/sub_templates/row-template` است، خالی‌اش کنید، ذخیره کنید و پنل را ری‌استارت کنید."],
    },
  },
  {
    group: "uninstall",
    texts: ["uninstall could not complete safely; see the message above. No forced deletion was performed."],
    en: {
      what: "The file removal refused to continue for the reason printed just above. Nothing was force-deleted.",
      fix: ["Fix the problem named above, then run `row-template uninstall` again."],
    },
    fa: {
      tr: "حذف به‌طور ایمن کامل نشد؛ پیام بالا را ببینید. هیچ حذف اجباری‌ای انجام نشد.",
      what: "حذف فایل‌ها به دلیلی که درست بالاتر چاپ شده ادامه پیدا نکرد. هیچ چیزی به‌اجبار حذف نشد.",
      fix: ["مشکلی را که در بالا نام برده شده برطرف کنید و `row-template uninstall` را دوباره اجرا کنید."],
    },
  },

  // --- the command and the manager ------------------------------------------------
  {
    group: "cli",
    texts: [
      "Row-Template is not installed (run the installer first).",
      "Row-Template is not installed; run the installer first.",
      "Row-Template is not installed.",
      "Row-Template is not installed at $RT_ROOT; run the installer first.",
      "Row-Template does not appear to be installed at $RT_ROOT.",
    ],
    en: {
      what: "The command needs an existing installation, and the install directory has no installed design (or no `VERSION` file).",
      fix: [
        "Install Row-Template first — see [Quick start](/docs/quick-start/).",
        "If it was installed, re-run the installer to repair it; your configuration is kept.",
      ],
    },
    fa: {
      tr: "Row-Template نصب نیست (اول نصب‌کننده را اجرا کنید).",
      what: "این فرمان به نصب موجود نیاز دارد و پوشهٔ نصب هیچ تمپلیت نصب‌شده‌ای (یا فایل `VERSION`) ندارد.",
      fix: [
        "اول Row-Template را نصب کنید — [شروع سریع](/docs/quick-start/) را ببینید.",
        "اگر نصب بوده، نصب‌کننده را دوباره اجرا کنید تا تعمیرش کند؛ پیکربندی شما حفظ می‌شود.",
      ],
    },
  },
  {
    group: "cli",
    texts: ["unknown command: $cmd"],
    en: {
      what: "`row-template` does not have that command. The help is printed after this line, and the command exits with status 2.",
      fix: ["Use one of `config`, `update`, `rollback`, `verify`, `version`, `uninstall`, `menu` or `help` — see the [command reference](/docs/management/cli/)."],
    },
    fa: {
      tr: "فرمان ناشناخته: ‹فرمان›",
      what: "`row-template` چنین فرمانی ندارد. راهنما پس از این خط چاپ می‌شود و فرمان با وضعیت 2 خارج می‌شود.",
      fix: ["از یکی از `config`، `update`، `rollback`، `verify`، `version`، `uninstall`، `menu` یا `help` استفاده کنید — [مرجع فرمان‌ها](/docs/management/cli/) را ببینید."],
    },
  },
  {
    group: "cli",
    texts: ["management library not found at %s", "the install may be damaged; re-run the installer."],
    en: {
      what: "The `row-template` command is only a launcher, and the management library it loads is missing from the install directory.",
      fix: ["Re-run the installer. It repairs the installation in place and keeps your branding and design."],
    },
    fa: {
      tr: "کتابخانهٔ مدیریتی در ‹مسیر› پیدا نشد / ممکن است نصب آسیب دیده باشد؛ نصب‌کننده را دوباره اجرا کنید.",
      what: "فرمان `row-template` فقط یک راه‌انداز است و کتابخانهٔ مدیریتی‌ای که بارگذاری می‌کند در پوشهٔ نصب وجود ندارد.",
      fix: ["نصب‌کننده را دوباره اجرا کنید. نصب را در همان جا تعمیر می‌کند و برندینگ و تمپلیت شما را نگه می‌دارد."],
    },
  },
  {
    group: "cli",
    texts: ["unexpected error (line $LINENO); no partial change was committed."],
    en: {
      what: "A command failed at a point that has no specific message. Row-Template's changes are staged and swapped atomically, so no half-written file was put in place.",
      fix: [
        "Run `row-template verify` to check the state.",
        "Run the command again. If it repeats, [open an issue](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output and the line number.",
      ],
    },
    fa: {
      tr: "خطای پیش‌بینی‌نشده (خط ‹خط›)؛ هیچ تغییر ناقصی ثبت نشد.",
      what: "فرمانی در نقطه‌ای شکست خورد که پیام مشخصی برایش وجود ندارد. تغییرات Row-Template اول آماده و بعد به‌صورت اتمی جایگزین می‌شوند، پس هیچ فایل نیمه‌نوشته‌ای سر جایش قرار نگرفته است.",
      fix: [
        "برای بررسی وضعیت `row-template verify` را اجرا کنید.",
        "فرمان را دوباره اجرا کنید. اگر تکرار شد، با خروجی کامل و شمارهٔ خط یک [issue باز کنید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "cli",
    texts: ["Invalid option. Choose a number 0-$max."],
    en: {
      what: "A menu received something other than one of its numbers. It asks again.",
      fix: ["Type one of the numbers shown in the menu and press Enter."],
    },
    fa: {
      tr: "گزینهٔ نامعتبر. عددی بین 0 و ‹n› انتخاب کنید.",
      what: "منو چیزی غیر از یکی از شماره‌هایش دریافت کرده است و دوباره می‌پرسد.",
      fix: ["یکی از شماره‌های نمایش‌داده‌شده در منو را وارد کنید و Enter بزنید."],
    },
  },
  {
    group: "cli",
    texts: ["could not load panel interface", "could not load panel registry", "could not load the transaction engine"],
    en: {
      what: "The installer files that come with the management library (`panels/`, `lib/transaction.sh`) exist but could not be loaded — they are damaged or were edited. Every `row-template` command stops here. (If they are missing altogether, as after the first update from 1.1.0, the command still runs and `verify` reports it.)",
      fix: ["Re-run the installer to repair the installation; it replaces these files."],
    },
    fa: {
      tr: "رابط پنل بارگذاری نشد / فهرست پنل‌ها بارگذاری نشد / موتور تراکنش بارگذاری نشد",
      what: "فایل‌های همراه کتابخانهٔ مدیریتی (`panels/` و `lib/transaction.sh`) وجود دارند اما بارگذاری نشدند — خراب شده‌اند یا ویرایش شده‌اند. همهٔ فرمان‌های `row-template` همین‌جا متوقف می‌شوند. (اگر اصلاً وجود نداشته باشند، مثل پس از اولین به‌روزرسانی از 1.1.0، فرمان اجرا می‌شود و `verify` آن را گزارش می‌دهد.)",
      fix: ["برای تعمیر، نصب‌کننده را دوباره اجرا کنید؛ این فایل‌ها را جایگزین می‌کند."],
    },
  },

  // --- internal safety checks ---------------------------------------------------
  {
    group: "safety",
    texts: ["refusing to operate on a symlink: $1"],
    en: {
      what: "A file Row-Template was about to write or delete is a symbolic link. It never writes through a link, which could redirect a root-owned write to any file on the system. Nothing was written.",
      fix: ["Replace the link named in the message with a real file or directory, or remove it, then run the command again. Nothing under the install directory should be a symlink."],
    },
    fa: {
      tr: "روی پیوند نمادین عملیاتی انجام نمی‌شود: ‹مسیر›",
      what: "فایلی که Row-Template می‌خواست بنویسد یا حذف کند یک پیوند نمادین است. هرگز از طریق پیوند نمی‌نویسد، چون می‌تواند نوشتن با دسترسی root را به هر فایلی در سیستم هدایت کند. چیزی نوشته نشد.",
      fix: ["پیوندی را که در پیام آمده با فایل یا پوشهٔ واقعی جایگزین کنید یا حذفش کنید و فرمان را دوباره اجرا کنید. هیچ چیزی زیر پوشهٔ نصب نباید symlink باشد."],
    },
  },
  {
    group: "safety",
    texts: ["refusing to recursively delete /", "refusing to recursively delete path outside backups: $d"],
    en: {
      what: "A guard that allows recursive deletion only strictly inside the backups folder stopped a delete. This should never happen in normal use; nothing was deleted.",
      fix: ["[Report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output and what you ran."],
    },
    fa: {
      tr: "حذف بازگشتی `/` انجام نمی‌شود / حذف بازگشتی مسیری بیرون از پشتیبان‌ها انجام نمی‌شود: ‹مسیر›",
      what: "محافظی که حذف بازگشتی را فقط دقیقاً داخل پوشهٔ پشتیبان‌ها اجازه می‌دهد، جلوی یک حذف را گرفت. در استفادهٔ عادی نباید رخ دهد؛ چیزی حذف نشد.",
      fix: ["با خروجی کامل و فرمانی که اجرا کردید [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues)."],
    },
  },
  {
    group: "safety",
    texts: ["expected checksum is not 64 hex characters", "cannot checksum missing file: $f"],
    en: {
      what: "A checksum file (`*.sha256`) is damaged or empty, or the file it describes is missing. The file is treated as unverified and is not used.",
      fix: ["Run `row-template verify` to find which, then `row-template update` to reinstall the files."],
    },
    fa: {
      tr: "چک‌سام مورد انتظار ۶۴ نویسهٔ هگزادسیمال نیست / برای فایل ناموجود چک‌سام محاسبه نمی‌شود: ‹مسیر›",
      what: "یک فایل چک‌سام (`*.sha256`) خراب یا خالی است، یا فایلی که توصیف می‌کند وجود ندارد. آن فایل بررسی‌نشده تلقی می‌شود و استفاده نمی‌شود.",
      fix: ["با `row-template verify` پیدا کنید کدام است و بعد با `row-template update` فایل‌ها را دوباره نصب کنید."],
    },
  },
  {
    group: "safety",
    texts: ["checksum mismatch (expected ${expected:0:12}… got ${actual:0:12}…)"],
    en: {
      what: "A file does not match its recorded SHA-256 — the first 12 characters of each are shown. The file was changed, damaged or truncated, and is not used. A second line names what was being checked.",
      fix: [
        "For a download: run the command again, or download the release again.",
        "For an installed file: `row-template update` reinstalls it.",
      ],
    },
    fa: {
      tr: "چک‌سام مطابقت ندارد (انتظار ‹هش›… دریافت ‹هش›…)",
      what: "یک فایل با SHA-256 ثبت‌شده‌اش یکی نیست — ۱۲ نویسهٔ اول هر دو نمایش داده می‌شود. فایل تغییر کرده، خراب یا ناقص شده و استفاده نمی‌شود. خط دوم می‌گوید چه چیزی بررسی می‌شد.",
      fix: [
        "برای دانلود: فرمان را دوباره اجرا کنید یا نسخه را دوباره دانلود کنید.",
        "برای فایل نصب‌شده: `row-template update` آن را دوباره نصب می‌کند.",
      ],
    },
  },
];
