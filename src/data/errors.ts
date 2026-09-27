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
      what: "Row-Template was to serve 3X-UI — because `RT_PANEL=3xui` was set, or because the installation on this server serves 3X-UI — but found neither the 3X-UI binary (`/usr/local/x-ui/x-ui`, `/usr/local/bin/x-ui`, or `x-ui` on the `PATH`) nor a systemd unit named `x-ui.service`. Nothing was changed.",
      fix: [
        "Run the installer on the server that runs your 3X-UI panel.",
        "Check the panel is installed: `ls -l /usr/local/x-ui/x-ui` and `systemctl status x-ui`.",
        "A panel running in a container, or installed under another name, is not supported.",
        "If this server runs PasarGuard or Rebecca, do not set `RT_PANEL=3xui`.",
      ],
    },
    fa: {
      tr: "هیچ نصبی از 3x-ui روی این سرور پیدا نشد.",
      what: "Row-Template قرار بود به 3X-UI سرویس بدهد — چون `RT_PANEL=3xui` تنظیم شده یا چون نصب روی این سرور به 3X-UI سرویس می‌دهد — اما نه فایل اجرایی 3X-UI را پیدا کرد (`/usr/local/x-ui/x-ui`، `/usr/local/bin/x-ui` یا `x-ui` در `PATH`) و نه سرویس systemd با نام `x-ui.service` را. هیچ تغییری اعمال نشده است.",
      fix: [
        "نصب‌کننده را روی همان سروری اجرا کنید که پنل 3X-UI روی آن است.",
        "از نصب بودن پنل مطمئن شوید: `ls -l /usr/local/x-ui/x-ui` و `systemctl status x-ui`.",
        "پنلی که داخل کانتینر یا با نام دیگری نصب شده باشد پشتیبانی نمی‌شود.",
        "اگر این سرور PasarGuard یا Rebecca را اجرا می‌کند، `RT_PANEL=3xui` را تنظیم نکنید.",
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
      what: "On 3X-UI, Row-Template needs version 3.6.0 or newer, and the panel is older. The installer stops without changing anything; `verify` reports it as a hard failure.",
      fix: ["Update 3X-UI to 3.6.0 or newer, then run the installer (or `row-template verify`) again."],
    },
    fa: {
      tr: "نسخهٔ ‹نسخه› از 3x-ui پایین‌تر از حداقل لازم یعنی 3.6.0 است؛ نصب انجام نمی‌شود / نسخهٔ ‹نسخه› از 3x-ui پایین‌تر از حداقل 3.6.0 است.",
      what: "Row-Template روی 3X-UI به نسخهٔ 3.6.0 یا جدیدتر نیاز دارد و پنل شما قدیمی‌تر است. نصب‌کننده بدون هیچ تغییری متوقف می‌شود و `verify` آن را خطای جدی گزارش می‌کند.",
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
        "Give the base URL of the folder holding the release files, for example `https://mirror.example.com/row-template/1.3.0`.",
        "For a folder on the server itself, use `RT_RELEASE_DIR` instead.",
      ],
    },
    fa: {
      tr: "`RT_RELEASE_URL` باید یک نشانی `http(s)` باشد. / نشانی نسخه باید یک نشانی `http(s)` باشد: ‹نشانی›",
      what: "مقدار `RT_RELEASE_URL` نشانی وب نیست. چیزی دانلود نشده است.",
      fix: [
        "نشانی پوشه‌ای را بدهید که فایل‌های نسخه در آن است، مثلاً `https://mirror.example.com/row-template/1.3.0`.",
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
      "payload template $id has no $name (skipped)",
    ],
    en: {
      what: "A folder under `templates/` in the release is not a design Row-Template recognises, or has no page for this server's panel, so it is ignored. The other designs install normally.",
      fix: ["Nothing to do for an official release. If you added folders to a release yourself, remove them."],
    },
    fa: {
      tr: "پوشهٔ تمپلیت در محتوای نسخه شناسهٔ ساده‌ای نیست: ‹شناسه› (نادیده گرفته شد) / تمپلیت ‹شناسه› در محتوای نسخه ‹فایل› ندارد (نادیده گرفته شد)",
      what: "یکی از پوشه‌های `templates/` در نسخه تمپلیتی نیست که Row-Template بشناسد، یا صفحه‌ای برای پنل این سرور ندارد، پس نادیده گرفته می‌شود. بقیهٔ تمپلیت‌ها معمولی نصب می‌شوند.",
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
      what: "The install directory — `/etc/3x-ui/sub_templates/row-template` on 3X-UI, `/etc/row-template` on PasarGuard and Rebecca — is a symbolic link. Row-Template never writes through a symlink, because it could redirect root-owned writes anywhere. Nothing was changed.",
      fix: [
        "Replace the link with a real directory — for example on 3X-UI: `rm /etc/3x-ui/sub_templates/row-template && mkdir -p /etc/3x-ui/sub_templates/row-template` (on PasarGuard and Rebecca the path is `/etc/row-template`).",
        "If you need the files on another disk, bind-mount that disk onto the path instead of linking it.",
      ],
    },
    fa: {
      tr: "ریشهٔ نصب یک پیوند نمادین است؛ ادامه نمی‌دهم.",
      what: "پوشهٔ نصب — `/etc/3x-ui/sub_templates/row-template` در 3X-UI و `/etc/row-template` در PasarGuard و Rebecca — یک پیوند نمادین (symlink) است. Row-Template هرگز از طریق symlink نمی‌نویسد، چون می‌تواند نوشتن با دسترسی root را به هر جایی هدایت کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "پیوند را با یک پوشهٔ واقعی جایگزین کنید — مثلاً در 3X-UI: `rm /etc/3x-ui/sub_templates/row-template && mkdir -p /etc/3x-ui/sub_templates/row-template` (در PasarGuard و Rebecca مسیر `/etc/row-template` است).",
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
      tr: "نصب قبلی در ‹پوشهٔ نصب› پیدا شد؛ برای تعمیر، نصب‌کننده را به‌صورت تعاملی اجرا کنید یا `RT_ASSUME_YES=1` را تنظیم کنید.",
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
      what: "The folders of the install directory (`/etc/3x-ui/sub_templates/row-template` on 3X-UI, `/etc/row-template` on PasarGuard and Rebecca) could not be created — usually a full disk, a read-only `/etc`, or a file where a folder should be.",
      fix: [
        "Check free space with `df -h /etc`.",
        "Check that the parent folder (`/etc/3x-ui/sub_templates` on 3X-UI, `/etc` otherwise) is a writable directory, not a file, then run the installer again.",
      ],
    },
    fa: {
      tr: "ساختار پوشه‌های نصب ساخته نشد.",
      what: "پوشه‌های پوشهٔ نصب (`/etc/3x-ui/sub_templates/row-template` در 3X-UI و `/etc/row-template` در PasarGuard و Rebecca) ساخته نشدند — معمولاً به‌دلیل پر بودن دیسک، فقط‌خواندنی بودن `/etc` یا وجود یک فایل به‌جای پوشه.",
      fix: [
        "فضای آزاد را با `df -h /etc` بررسی کنید.",
        "مطمئن شوید پوشهٔ والد (`/etc/3x-ui/sub_templates` در 3X-UI و در غیر این صورت `/etc`) پوشه‌ای قابل نوشتن است (نه فایل) و نصب‌کننده را دوباره اجرا کنید.",
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
      tr: "مقدار ‹مقدار› در `RT_TEMPLATE` تمپلیتی نیست که این نسخه ارائه کند (موجود: `row editorial canvas prism terminal pulse brutal arcade sketch signature saffron pulsenova prismnova terminalnova arcadenova meter notebook`).",
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
      "No templates are installed, and they could not be restored automatically (see above).",
    ],
    en: {
      what: "The design you picked — or every design — is missing from the installation's template store. The manager restores missing designs itself when it opens, by downloading them from the release you have installed; this appears when that was not possible, and the line above says why.",
      fix: ["Make sure the server can reach the release source and open the manager again — or run `row-template update` (or re-run the installer), which installs every design of the release."],
    },
    fa: {
      tr: "تمپلیت '‹شناسه›' نصب نیست؛ برای به‌روز کردن مخزن تمپلیت‌ها نصب‌کننده را دوباره اجرا کنید / هیچ تمپلیتی نصب نیست و به‌صورت خودکار هم بازگردانده نشدند (بالا را ببینید).",
      what: "تمپلیتی که انتخاب کرده‌اید — یا همهٔ تمپلیت‌ها — در مخزن تمپلیت‌های نصب وجود ندارد. منوی مدیریت هنگام باز شدن، تمپلیت‌های ناموجود را خودش از نسخهٔ نصب‌شده دانلود و بازگردانی می‌کند؛ این پیام وقتی می‌آید که این کار ممکن نبود و خط بالا علتش را می‌گوید.",
      fix: ["مطمئن شوید سرور به منبع نسخه دسترسی دارد و منوی مدیریت را دوباره باز کنید — یا `row-template update` را اجرا کنید (یا نصب‌کننده را دوباره اجرا کنید) که همهٔ تمپلیت‌های نسخه را نصب می‌کند."],
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
      what: "The manager found that the installer's companion files are missing — the state right after 1.1.0's own updater installed a newer release, when completing the installation automatically did not work.",
      fix: ["Accept `Re-install … now to complete it?` — or run `row-template update` — to install them and every design. [Upgrading from 1.1.0 or 1.2.0 →](/docs/management/updating/#upgrading-from-110-or-120)"],
    },
    fa: {
      tr: "این نصب ناقص است: برخی از اجزای نصب‌کننده وجود ندارند؛ مانند وضعیت پس از به‌روزرسانی از 1.1.0.",
      what: "منوی مدیریت دریافت که فایل‌های همراه نصب‌کننده وجود ندارند — وضعیتی که درست پس از نصب نسخهٔ جدیدتر با به‌روزرسان خود 1.1.0 پیش می‌آید، وقتی کامل کردن خودکار نصب انجام نشده باشد.",
      fix: ["پرسش `Re-install … now to complete it?` را تأیید کنید — یا `row-template update` را اجرا کنید — تا آن‌ها و همهٔ تمپلیت‌ها نصب شوند. [ارتقا از 1.1.0 یا 1.2.0 ←](/docs/management/updating/#upgrading-from-110-or-120)"],
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
      tr: "چیزی برای پشتیبان‌گیری نیست: ‹مسیر› وجود ندارد",
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
        "List the backups — `ls /etc/3x-ui/sub_templates/row-template/backups/` on 3X-UI, `ls /etc/row-template/backups/` on PasarGuard and Rebecca — and choose another with `row-template rollback --to <name>`.",
      ],
    },
    fa: {
      tr: "پشتیبان در اعتبارسنجی رد شد: ‹مسیر›",
      what: "صفحهٔ داخل پشتیبان دیگر با چک‌سامی که همراهش ذخیره شده یکی نیست، یا فایل‌هایش وجود ندارند. پشتیبان خراب هرگز بازگردانده نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "فهرست پشتیبان‌ها را ببینید — `ls /etc/3x-ui/sub_templates/row-template/backups/` در 3X-UI و `ls /etc/row-template/backups/` در PasarGuard و Rebecca — و با `row-template rollback --to <name>` پشتیبان دیگری انتخاب کنید.",
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
        "Backup names are the folders under `backups/` in the install directory: `/etc/3x-ui/sub_templates/row-template/backups/` on 3X-UI, `/etc/row-template/backups/` on PasarGuard and Rebecca.",
      ],
    },
    fa: {
      tr: "گزینهٔ `--to` به پوشهٔ پشتیبان نیاز دارد. / روش استفاده: `row-template rollback [--auto | --to <backup-dir>]`",
      what: "به `rollback` گزینه‌ای داده شده که آن را نمی‌شناسد، یا `--to` بدون نام پشتیبان آمده است.",
      fix: [
        "از `row-template rollback` (جدیدترین پشتیبان)، `row-template rollback --auto` (همان) یا `row-template rollback --to <name>` استفاده کنید.",
        "نام پشتیبان‌ها همان نام پوشه‌های زیر `backups/` در پوشهٔ نصب است: `/etc/3x-ui/sub_templates/row-template/backups/` در 3X-UI و `/etc/row-template/backups/` در PasarGuard و Rebecca.",
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
      fix: ["Give a folder name from `backups/` in the install directory (`/etc/3x-ui/sub_templates/row-template/backups/` on 3X-UI, `/etc/row-template/backups/` on PasarGuard and Rebecca), or use `row-template rollback --auto`."],
    },
    fa: {
      tr: "بازگردانی از مسیری بیرون از پوشهٔ پشتیبان‌ها انجام نمی‌شود.",
      what: "`--to` به پوشه‌ای بیرون از `backups/` اشاره کرده است. فقط پشتیبان‌های خود Row-Template بازگردانده می‌شوند. هیچ تغییری اعمال نشده است.",
      fix: ["نام یکی از پوشه‌های `backups/` در پوشهٔ نصب را بدهید (`/etc/3x-ui/sub_templates/row-template/backups/` در 3X-UI و `/etc/row-template/backups/` در PasarGuard و Rebecca)، یا از `row-template rollback --auto` استفاده کنید."],
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
      fix: ["Fix the problem named just above. If it says the backup was made for another panel, see that message."],
    },
    fa: {
      tr: "پشتیبان آماده نشد؛ تمپلیت در حال اجرا تغییری نکرده است.",
      what: "پشتیبان سر جایش قرار نگرفت — علت در خط بالا آمده است. صفحه‌ای که مشترکان می‌بینند تغییری نکرده است.",
      fix: ["مشکلی را که درست در بالا نام برده شده برطرف کنید. اگر گفته پشتیبان برای پنل دیگری ساخته شده، توضیح همان پیام را ببینید."],
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
      tr: "ریشهٔ نصب وجود ندارد یا یک پیوند نمادین است: ‹پوشهٔ نصب›",
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
    texts: ["a template in the store does not match its checksum:$corrupt."],
    en: {
      what: "One or more designs in the template store — named at the end of the message — were changed or damaged after installation.",
      fix: ["Run `row-template update` to reinstall every design."],
    },
    fa: {
      tr: "یکی از تمپلیت‌های مخزن با چک‌سامش مطابقت ندارد: ‹شناسه‌ها›.",
      what: "یک یا چند تمپلیت در مخزن — که در انتهای پیام نام برده شده‌اند — پس از نصب تغییر کرده یا خراب شده‌اند.",
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
      what: "The installation has no template store — the state right after 1.1.0's own updater installed a newer release, which it does not know how to complete. Run as root, `verify` completes the installation itself first (every design of the version you have), so this line means `verify` was not run as root, or that was not possible.",
      fix: ["Run `row-template verify` as root, or run `row-template update`. [Upgrading from 1.1.0 or 1.2.0 →](/docs/management/updating/#upgrading-from-110-or-120)"],
    },
    fa: {
      tr: "مخزن تمپلیت‌ها وجود ندارد یا خالی است؛ برای نصب آن `row-template update` را اجرا کنید.",
      what: "نصب مخزن تمپلیت ندارد — وضعیتی که درست پس از نصب نسخهٔ جدیدتر با به‌روزرسان خود 1.1.0 پیش می‌آید، چون آن به‌روزرسان نمی‌داند چطور نصب را کامل کند. `verify` وقتی با root اجرا شود، اول خودش نصب را کامل می‌کند (همهٔ تمپلیت‌های همان نسخه‌ای که دارید)؛ پس این خط یعنی `verify` با root اجرا نشده یا این کار ممکن نبوده است.",
      fix: ["`row-template verify` را با root اجرا کنید، یا `row-template update` را اجرا کنید. [ارتقا از 1.1.0 یا 1.2.0 ←](/docs/management/updating/#upgrading-from-110-or-120)"],
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
      fix: ["`chmod 640 /etc/3x-ui/sub_templates/row-template/config.env` on 3X-UI, or `chmod 640 /etc/row-template/config.env` on PasarGuard and Rebecca."],
    },
    fa: {
      tr: "`config.env` برای همه قابل نوشتن است (مجوز ‹مجوز›)؛ آن را به 640 محدود کنید.",
      what: "هر کاربری روی سرور می‌تواند فایل برندینگ شما را تغییر دهد. خود Row-Template همیشه آن را با مجوز `640` می‌نویسد.",
      fix: ["در 3X-UI: `chmod 640 /etc/3x-ui/sub_templates/row-template/config.env`؛ در PasarGuard و Rebecca: `chmod 640 /etc/row-template/config.env`."],
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
      what: "The installer's companion files are missing — the state right after 1.1.0's own updater installed a newer release, since it copies only the library and the command. Run as root, `verify` completes the installation first, so this line means it was not run as root, or that was not possible. The page keeps working.",
      fix: ["Run `row-template verify` as root, or `row-template update`. [Upgrading from 1.1.0 or 1.2.0 →](/docs/management/updating/#upgrading-from-110-or-120)"],
    },
    fa: {
      tr: "اجزای نصب‌کننده وجود ندارند (`lib/transaction.sh` و `panels/`)، مانند وضعیت پس از به‌روزرسانی از 1.1.0؛ برای کامل کردن نصب `row-template update` را اجرا کنید.",
      what: "فایل‌های همراه نصب‌کننده وجود ندارند — وضعیتی که درست پس از نصب نسخهٔ جدیدتر با به‌روزرسان خود 1.1.0 پیش می‌آید، چون آن فقط کتابخانه و فرمان را کپی می‌کند. `verify` وقتی با root اجرا شود اول نصب را کامل می‌کند؛ پس این خط یعنی با root اجرا نشده یا این کار ممکن نبوده است. صفحه کار می‌کند.",
      fix: ["`row-template verify` را با root اجرا کنید، یا `row-template update` را اجرا کنید. [ارتقا از 1.1.0 یا 1.2.0 ←](/docs/management/updating/#upgrading-from-110-or-120)"],
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
        "When no `row-template` command is running, delete them — on 3X-UI: `find /etc/3x-ui/sub_templates/row-template -maxdepth 2 \\( -name '.stage.*' -o -name '.live.*' \\) -delete` (on PasarGuard and Rebecca, use `/etc/row-template`).",
        "Then run `row-template verify` again.",
      ],
    },
    fa: {
      tr: "فایل‌های موقت باقی‌مانده زیر ریشهٔ نصب پیدا شد (احتمالاً به‌روزرسانی نیمه‌کاره).",
      what: "فایل‌های موقتی که با `.stage.` یا `.live.` شروع می‌شوند از یک فرمان نیمه‌کاره باقی مانده‌اند. هرگز استفاده نمی‌شوند.",
      fix: [
        "وقتی هیچ فرمان `row-template` در حال اجرا نیست، حذفشان کنید — در 3X-UI: `find /etc/3x-ui/sub_templates/row-template -maxdepth 2 \\( -name '.stage.*' -o -name '.live.*' \\) -delete` (در PasarGuard و Rebecca از `/etc/row-template` استفاده کنید).",
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
        "Check what is in the install directory (`/etc/3x-ui/sub_templates/row-template` on 3X-UI, `/etc/row-template` on PasarGuard and Rebecca).",
        "If it is a damaged Row-Template installation, re-run the installer to repair it, then uninstall — or [remove it by hand](/docs/management/uninstall/#if-uninstall-cannot-run).",
      ],
    },
    fa: {
      tr: "‹پوشهٔ نصب› حذف نمی‌شود: به ریشهٔ نصب Row-Template شبیه نیست. / مسیر سیستمی حذف نمی‌شود: ‹پوشهٔ نصب›",
      what: "حذف‌کننده پیش از پاک کردن هر چیزی تأیید می‌کند که پوشه نصب Row-Template است (باید `VERSION` و تمپلیت یا کتابخانه را داشته باشد) و مسیر سیستمی نیست. این بررسی رد شد، پس چیزی حذف نشد.",
      fix: [
        "محتوای پوشهٔ نصب را بررسی کنید (`/etc/3x-ui/sub_templates/row-template` در 3X-UI و `/etc/row-template` در PasarGuard و Rebecca).",
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
      what: "The installer files that come with the management library (`panels/`, `lib/transaction.sh`) exist but could not be loaded — they are damaged or were edited. Every `row-template` command stops here. (If they are missing altogether — as right after 1.1.0's own updater installed a newer release — the command still runs, completes the installation when it can, and `verify` reports what is missing.)",
      fix: ["Re-run the installer to repair the installation; it replaces these files."],
    },
    fa: {
      tr: "رابط پنل بارگذاری نشد / فهرست پنل‌ها بارگذاری نشد / موتور تراکنش بارگذاری نشد",
      what: "فایل‌های همراه کتابخانهٔ مدیریتی (`panels/` و `lib/transaction.sh`) وجود دارند اما بارگذاری نشدند — خراب شده‌اند یا ویرایش شده‌اند. همهٔ فرمان‌های `row-template` همین‌جا متوقف می‌شوند. (اگر اصلاً وجود نداشته باشند — مثل درست پس از نصب نسخهٔ جدیدتر با به‌روزرسان خود 1.1.0 — فرمان اجرا می‌شود، در صورت امکان نصب را کامل می‌کند و `verify` کمبودها را گزارش می‌دهد.)",
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

  // --- choosing the panel (1.3.0) -----------------------------------------------
  {
    group: "panel",
    texts: ["no supported panel was detected on this host: no 3x-ui installation, and no PasarGuard or Rebecca installation."],
    en: {
      what: "The installer looked for all three supported panels and found none. A panel counts as installed only when two independent signs of it agree — for example its configuration and its service, or its compose file and its data folder. Nothing was changed.",
      fix: [
        "Run the installer on the server that runs your panel, as root.",
        "Install the panel with its official installer first. Rebecca must be the 1.x binary install.",
        "If a line above says a panel *looks partly installed*, finish or repair that panel's installation, then run the installer again.",
      ],
    },
    fa: {
      tr: "هیچ پنل پشتیبانی‌شده‌ای روی این سرور پیدا نشد: نه نصبی از 3x-ui و نه نصبی از PasarGuard یا Rebecca.",
      what: "نصب‌کننده هر سه پنل پشتیبانی‌شده را جست‌وجو کرد و هیچ‌کدام را پیدا نکرد. یک پنل فقط وقتی نصب‌شده به حساب می‌آید که دو نشانهٔ مستقل از آن با هم بخوانند — مثلاً پیکربندی و سرویسش، یا فایل compose و پوشهٔ داده‌اش. هیچ تغییری اعمال نشده است.",
      fix: [
        "نصب‌کننده را روی سروری که پنل شما روی آن است و با root اجرا کنید.",
        "اول پنل را با نصب‌کنندهٔ رسمی خودش نصب کنید. Rebecca باید نسخهٔ 1.x با نصب باینری باشد.",
        "اگر خطی در بالا می‌گوید پنلی *نیمه‌نصب* به نظر می‌رسد، نصب آن پنل را کامل یا تعمیر کنید و نصب‌کننده را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "panel",
    texts: ["${PANEL} looks partly installed (only one of its files was found); it is not treated as present."],
    en: {
      what: "Only one sign of this panel was found — for example its configuration file without its service, or its data folder without its compose file. Row-Template never guesses at a half-installed panel, so it treats it as absent. On its own this is a warning; the next line says whether another panel was found instead.",
      fix: [
        "If the panel is meant to be installed, finish or repair its installation with its official installer, then run the installer again.",
        "If it is a leftover of a removed panel, you can ignore this warning.",
      ],
    },
    fa: {
      tr: "‹پنل› نیمه‌نصب به نظر می‌رسد (فقط یکی از فایل‌هایش پیدا شد)؛ موجود به حساب نمی‌آید.",
      what: "فقط یک نشانه از این پنل پیدا شد — مثلاً فایل پیکربندی بدون سرویس، یا پوشهٔ داده بدون فایل compose. Row-Template هرگز دربارهٔ پنل نیمه‌نصب حدس نمی‌زند، پس آن را موجود حساب نمی‌کند. این پیام به‌تنهایی فقط هشدار است؛ خط بعد می‌گوید آیا به‌جای آن پنل دیگری پیدا شد یا نه.",
      fix: [
        "اگر این پنل باید نصب باشد، نصبش را با نصب‌کنندهٔ رسمی خودش کامل یا تعمیر کنید و نصب‌کننده را دوباره اجرا کنید.",
        "اگر باقی‌ماندهٔ پنلی است که حذف کرده‌اید، می‌توانید این هشدار را نادیده بگیرید.",
      ],
    },
  },
  {
    group: "panel",
    texts: ["more than one panel is installed here (${PANELS}); choose one with RT_PANEL=3xui|pasarguard|rebecca."],
    en: {
      what: "More than one supported panel is installed on this server, and the installer is running without a terminal, so it cannot ask which one to serve. A scripted fresh install on such a server **must** name the panel. Nothing was changed.",
      fix: [
        "Run the installer again with `RT_PANEL` set to the panel Row-Template should serve, for example `RT_PANEL=pasarguard`.",
        "Or run it in a terminal and choose the panel from the list. See [Environment variables](/docs/installation/environment/#panel-and-terminal).",
      ],
    },
    fa: {
      tr: "بیش از یک پنل اینجا نصب است (‹پنل‌ها›)؛ یکی را با `RT_PANEL=3xui|pasarguard|rebecca` انتخاب کنید.",
      what: "بیش از یک پنل پشتیبانی‌شده روی این سرور نصب است و نصب‌کننده بدون ترمینال اجرا شده، پس نمی‌تواند بپرسد به کدام سرویس بدهد. نصب تازهٔ اسکریپتی روی چنین سروری **باید** پنل را نام ببرد. هیچ تغییری اعمال نشده است.",
      fix: [
        "نصب‌کننده را دوباره با `RT_PANEL` اجرا کنید و پنلی را که Row-Template باید به آن سرویس بدهد نام ببرید، مثلاً `RT_PANEL=pasarguard`.",
        "یا آن را در ترمینال اجرا کنید و پنل را از فهرست انتخاب کنید. [متغیرهای محیطی](/docs/installation/environment/#panel-and-terminal) را ببینید.",
      ],
    },
  },
  {
    group: "panel",
    texts: [
      "RT_PANEL='$RT_PANEL' is not a panel Row-Template supports (3xui, pasarguard, rebecca).",
      "RT_PANEL=$RT_PANEL, but ${PANEL} was not detected on this host.",
    ],
    en: {
      what: "`RT_PANEL` names the panel to install for. It must be exactly `3xui`, `pasarguard` or `rebecca`, and that panel must be installed on this server. Nothing was changed.",
      fix: [
        "Correct the value — lowercase, no spaces — or unset it on a server with only one panel.",
        "If the panel is installed but not detected, check that it was installed with its official installer (Rebecca: the 1.x binary install).",
      ],
    },
    fa: {
      tr: "`RT_PANEL='‹مقدار›'` پنلی نیست که Row-Template پشتیبانی کند (`3xui`، `pasarguard`، `rebecca`). / `RT_PANEL=‹مقدار›`، اما ‹پنل› روی این سرور پیدا نشد.",
      what: "`RT_PANEL` پنلی را نام می‌برد که نصب برای آن انجام می‌شود. مقدارش باید دقیقاً `3xui`، `pasarguard` یا `rebecca` باشد و آن پنل باید روی همین سرور نصب باشد. هیچ تغییری اعمال نشده است.",
      fix: [
        "مقدار را اصلاح کنید — با حروف کوچک و بدون فاصله — یا روی سروری که فقط یک پنل دارد آن را حذف کنید.",
        "اگر پنل نصب است اما پیدا نمی‌شود، بررسی کنید با نصب‌کنندهٔ رسمی خودش نصب شده باشد (برای Rebecca: نصب باینری نسخهٔ 1.x).",
      ],
    },
  },
  {
    group: "panel",
    texts: ["no panel was chosen; nothing was changed."],
    en: {
      what: "The panel chooser was left without a choice (for example with `0` or at the end of input). Nothing was changed.",
      fix: ["Run the installer again and choose the panel Row-Template should serve."],
    },
    fa: {
      tr: "هیچ پنلی انتخاب نشد؛ هیچ تغییری اعمال نشد.",
      what: "انتخابگر پنل بدون انتخاب رها شد (مثلاً با `0` یا با پایان ورودی). هیچ تغییری اعمال نشده است.",
      fix: ["نصب‌کننده را دوباره اجرا کنید و پنلی را که Row-Template باید به آن سرویس بدهد انتخاب کنید."],
    },
  },
  {
    group: "panel",
    texts: ["Row-Template is installed for ${PANEL} at $RT_ROOT; uninstall it before installing for ${PANEL}."],
    en: {
      what: "One installation serves one panel. Row-Template is already installed on this server for the first panel named, and `RT_PANEL` asks for another. A re-run or an update always keeps the panel the installation was made for. Nothing was changed.",
      fix: [
        "To keep serving the current panel, run the installer (or `row-template update`) without `RT_PANEL`.",
        "To serve the other panel instead, run `row-template uninstall` first — it returns the current panel to its own page — then install again with `RT_PANEL`.",
      ],
    },
    fa: {
      tr: "Row-Template برای ‹پنل› در ‹پوشهٔ نصب› نصب شده است؛ پیش از نصب برای ‹پنل›، آن را حذف کنید.",
      what: "هر نصب فقط به یک پنل سرویس می‌دهد. Row-Template روی این سرور برای پنل اول نصب شده و `RT_PANEL` پنل دیگری را خواسته است. اجرای دوباره یا به‌روزرسانی همیشه پنلی را که نصب برای آن انجام شده حفظ می‌کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "برای ادامهٔ سرویس به پنل فعلی، نصب‌کننده (یا `row-template update`) را بدون `RT_PANEL` اجرا کنید.",
        "برای سرویس دادن به پنل دیگر، اول `row-template uninstall` را اجرا کنید — پنل فعلی را به صفحهٔ خودش برمی‌گرداند — و بعد دوباره با `RT_PANEL` نصب کنید.",
      ],
    },
  },
  {
    group: "panel",
    texts: ["Row-Template is installed twice ($found and $r); remove one with 'row-template uninstall' before continuing."],
    en: {
      what: "Both install directories exist — `/etc/3x-ui/sub_templates/row-template` (3X-UI) and `/etc/row-template` (PasarGuard and Rebecca) — each with a `VERSION` file. Which one to manage would be a guess, so nothing is done until one is removed.",
      fix: [
        "Decide which installation you keep. Run `row-template version` to see which panel the command manages now.",
        "Remove the other one: run `row-template uninstall` for the installation the command manages, or, if the other is a stale leftover, move its folder away by hand after checking its panel no longer uses it.",
      ],
    },
    fa: {
      tr: "Row-Template دو بار نصب شده است (‹مسیر› و ‹مسیر›)؛ پیش از ادامه، یکی را با `row-template uninstall` حذف کنید.",
      what: "هر دو پوشهٔ نصب وجود دارند — `/etc/3x-ui/sub_templates/row-template` (3X-UI) و `/etc/row-template` (PasarGuard و Rebecca) — و هر کدام فایل `VERSION` دارند. انتخاب اینکه کدام مدیریت شود حدس خواهد بود، پس تا یکی حذف نشود کاری انجام نمی‌شود.",
      fix: [
        "تصمیم بگیرید کدام نصب را نگه می‌دارید. با `row-template version` ببینید فرمان الان کدام پنل را مدیریت می‌کند.",
        "دیگری را حذف کنید: برای نصبی که فرمان مدیریت می‌کند `row-template uninstall` را اجرا کنید، یا اگر دیگری باقی‌ماندهٔ قدیمی است، پس از اطمینان از اینکه پنلش دیگر از آن استفاده نمی‌کند، پوشه‌اش را دستی جابه‌جا کنید.",
      ],
    },
  },
  {
    group: "panel",
    texts: ["the panel record $RT_PANEL_FILE is not a panel this release knows; treating the install as 3X-UI."],
    en: {
      what: "Each installation records the panel it serves in a file named `PANEL`. This one holds something this release does not recognise — it was edited by hand or damaged — so the installation is handled as a 3X-UI one.",
      fix: ["If this installation serves PasarGuard or Rebecca, do not run commands against it until the record is right: uninstall and install again, or restore the file to `pasarguard` or `rebecca`."],
    },
    fa: {
      tr: "رکورد پنل در ‹مسیر› پنلی نیست که این نسخه بشناسد؛ نصب به‌عنوان 3X-UI در نظر گرفته می‌شود.",
      what: "هر نصب پنلی را که به آن سرویس می‌دهد در فایلی به نام `PANEL` ثبت می‌کند. این فایل مقداری دارد که این نسخه نمی‌شناسد — دستی ویرایش یا خراب شده — پس نصب مانند نصب 3X-UI مدیریت می‌شود.",
      fix: ["اگر این نصب به PasarGuard یا Rebecca سرویس می‌دهد، تا درست شدن رکورد فرمانی روی آن اجرا نکنید: آن را حذف و دوباره نصب کنید، یا مقدار فایل را به `pasarguard` یا `rebecca` برگردانید."],
    },
  },
  {
    group: "panel",
    texts: ["nothing was changed."],
    en: {
      what: "The installer stopped at the panel check: the line just above says why — no panel found, more than one panel, an invalid `RT_PANEL`, an installation made for another panel, or a Rebecca edition this release cannot serve.",
      fix: ["Fix the problem named on the line above, then run the installer again."],
    },
    fa: {
      tr: "هیچ تغییری اعمال نشد.",
      what: "نصب‌کننده در بررسی پنل متوقف شد: خط بالا علت را می‌گوید — پنلی پیدا نشد، بیش از یک پنل هست، `RT_PANEL` نامعتبر است، نصب برای پنل دیگری انجام شده، یا نسخه‌ای از Rebecca است که این نسخه نمی‌تواند به آن سرویس بدهد.",
      fix: ["مشکلی را که در خط بالا نام برده شده برطرف کنید و نصب‌کننده را دوباره اجرا کنید."],
    },
  },
  {
    group: "panel",
    texts: ["could not record the panel this install serves."],
    en: {
      what: "The file that records which panel this installation serves (`PANEL`, in the install directory) could not be written — usually a full disk or a read-only filesystem. The install stopped before activating anything.",
      fix: ["Check `df -h /etc` and that `/etc` is writable, then run the installer again."],
    },
    fa: {
      tr: "پنلی که این نصب به آن سرویس می‌دهد ثبت نشد.",
      what: "فایلی که ثبت می‌کند این نصب به کدام پنل سرویس می‌دهد (`PANEL` در پوشهٔ نصب) نوشته نشد — معمولاً به‌دلیل پر بودن دیسک یا فقط‌خواندنی بودن فایل‌سیستم. نصب پیش از فعال کردن هر چیزی متوقف شد.",
      fix: ["`df -h /etc` و قابل نوشتن بودن `/etc` را بررسی کنید و نصب‌کننده را دوباره اجرا کنید."],
    },
  },

  // --- activation on PasarGuard and Rebecca (1.3.0) -------------------------------
  {
    group: "activation",
    texts: ["the installer's panel components are missing; run 'row-template update'."],
    en: {
      what: "Generating or activating the page on PasarGuard or Rebecca needs the installer's companion files (`lib/transaction.sh` and `panels/`), and they are missing — for example right after 1.1.0's own updater installed a newer release. Nothing was changed.",
      fix: ["Run `row-template update`, which installs them, then try again."],
    },
    fa: {
      tr: "اجزای پنل نصب‌کننده وجود ندارند؛ `row-template update` را اجرا کنید.",
      what: "ساخت یا فعال‌سازی صفحه روی PasarGuard یا Rebecca به فایل‌های همراه نصب‌کننده (`lib/transaction.sh` و `panels/`) نیاز دارد و این فایل‌ها وجود ندارند — مثلاً درست پس از آنکه به‌روزرسان خود 1.1.0 نسخهٔ جدیدتری را نصب کرده است. هیچ تغییری اعمال نشده است.",
      fix: ["`row-template update` را اجرا کنید تا آن‌ها را نصب کند و بعد دوباره امتحان کنید."],
    },
  },
  {
    group: "activation",
    texts: [
      "could not update the page in ${PANEL}'s template directory.",
      "could not put the previous page back at $RT_LIVE.",
    ],
    en: {
      what: "On PasarGuard and Rebecca the page is generated in the install directory and then copied into the panel's own templates directory. That copy failed, so the previously generated page was put back and the panel keeps serving the page it had. The second message means putting the previous page back failed as well.",
      fix: [
        "Read the line above for the cause — often a full disk, or a templates directory that is a symlink.",
        "Fix it and run the same command again; then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "صفحه در پوشهٔ تمپلیت‌های ‹پنل› به‌روز نشد. / صفحهٔ قبلی به ‹مسیر› بازگردانده نشد.",
      what: "روی PasarGuard و Rebecca صفحه در پوشهٔ نصب ساخته و سپس در پوشهٔ تمپلیت‌های خود پنل کپی می‌شود. این کپی شکست خورد، پس صفحهٔ ساخته‌شدهٔ قبلی سر جایش برگردانده شد و پنل همان صفحهٔ قبلی را ارائه می‌کند. پیام دوم یعنی برگرداندن صفحهٔ قبلی هم شکست خورده است.",
      fix: [
        "علت را در خط بالا ببینید — اغلب پر بودن دیسک یا پوشهٔ تمپلیتی که پیوند نمادین است.",
        "آن را برطرف کنید و همان فرمان را دوباره اجرا کنید؛ سپس `row-template verify` را اجرا کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "activation on ${PANEL} did not complete; the panel was restored to how it was.",
      "Activation did not complete; ${PANEL} was restored to how it was.",
      "${PANEL} was restored exactly to its state before the attempt.",
      "Activation did not complete and was rolled back; run 'row-template' and choose Activate to retry.",
    ],
    en: {
      what: "Activation on PasarGuard and Rebecca is a transaction: the panel's settings are snapshotted, changed and verified, and if any step fails they are restored from the snapshot. That happened here. `restored exactly to its state before the attempt` means the restore was confirmed by reading the panel's state back and comparing it with the snapshot; if the restore itself had failed, the lines above say `rollback also failed` instead (see that message). Row-Template itself stays installed.",
      fix: [
        "Read the lines just above for the step that failed — for example the panel could not be restarted, or the running panel did not pick up the page.",
        "Fix the cause, then run `row-template` and choose **5 — Activate / Re-apply theme**.",
      ],
    },
    fa: {
      tr: "فعال‌سازی روی ‹پنل› کامل نشد؛ پنل به حالت قبلش بازگردانده شد. / ‹پنل› دقیقاً به وضعیت پیش از تلاش بازگردانده شد. / فعال‌سازی کامل نشد و بازگردانده شد؛ برای تلاش دوباره `row-template` را اجرا کنید و Activate را انتخاب کنید.",
      what: "فعال‌سازی روی PasarGuard و Rebecca یک تراکنش است: از تنظیمات پنل عکس فوری (snapshot) گرفته می‌شود، تغییر اعمال و بررسی می‌شود، و اگر هر مرحله شکست بخورد تنظیمات از روی همان عکس فوری بازگردانده می‌شوند. اینجا همین اتفاق افتاد. پیام `restored exactly to its state before the attempt` یعنی بازگردانی با خواندن دوبارهٔ وضعیت پنل و مقایسه با عکس فوری تأیید شده است؛ اگر خود بازگردانی شکست خورده بود، خطوط بالا به‌جای آن `rollback also failed` را نشان می‌دادند (توضیح همان پیام را ببینید). خود Row-Template نصب باقی می‌ماند.",
      fix: [
        "در خطوط درست بالاتر ببینید کدام مرحله شکست خورد — مثلاً پنل ری‌استارت نشد، یا پنلِ در حال اجرا صفحه را اعمال نکرد.",
        "علت را برطرف کنید، سپس `row-template` را اجرا کنید و **5 — Activate / Re-apply theme** را انتخاب کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: ["could not place the page for ${PANEL}."],
    en: {
      what: "Automatic activation is not possible here (Rebecca on MySQL/MariaDB, or without `sqlite3`), so Row-Template only places the page in the panel's templates directory for you to select — and placing it failed. Nothing in the panel was changed.",
      fix: ["Read the line above for the cause, fix it, then choose **5 — Activate / Re-apply theme** in the manager again."],
    },
    fa: {
      tr: "صفحه برای ‹پنل› جای‌گذاری نشد.",
      what: "فعال‌سازی خودکار اینجا ممکن نیست (Rebecca با MySQL/MariaDB یا بدون `sqlite3`)، پس Row-Template فقط صفحه را در پوشهٔ تمپلیت‌های پنل می‌گذارد تا خودتان انتخابش کنید — و گذاشتن صفحه شکست خورد. هیچ چیزی در پنل تغییر نکرده است.",
      fix: ["علت را در خط بالا ببینید، برطرفش کنید و دوباره در منوی مدیریت **5 — Activate / Re-apply theme** را انتخاب کنید."],
    },
  },
  {
    group: "activation",
    texts: ["Automatic activation is unavailable here; the page will be placed for you to select."],
    en: {
      what: "Rebecca's subscription settings cannot be written here — the panel uses MySQL/MariaDB, or `sqlite3` is not installed — so the manager places the page and prints the two values to enter in the Rebecca dashboard.",
      fix: ["In the Rebecca dashboard open **Settings → Subscription → Templates** and enter the values shown. See [Activation](/docs/installation/activation/#rebecca)."],
    },
    fa: {
      tr: "فعال‌سازی خودکار اینجا در دسترس نیست؛ صفحه گذاشته می‌شود تا خودتان انتخابش کنید.",
      what: "تنظیمات اشتراک Rebecca اینجا نوشته نمی‌شوند — پنل از MySQL/MariaDB استفاده می‌کند یا `sqlite3` نصب نیست — پس منوی مدیریت صفحه را می‌گذارد و دو مقداری را که باید در داشبورد Rebecca وارد شوند چاپ می‌کند.",
      fix: ["در داشبورد Rebecca **Settings → Subscription → Templates** را باز کنید و مقادیر نمایش‌داده‌شده را وارد کنید. [فعال‌سازی](/docs/installation/activation/#rebecca) را ببینید."],
    },
  },
  {
    group: "activation",
    texts: ["the page could not be generated; nothing was changed."],
    en: {
      what: "Before activating, the manager regenerates the page from your design and branding, and that failed — the line above says why. The panel was not touched.",
      fix: ["Fix the problem named just above — often branding or disk space — and choose **5 — Activate / Re-apply theme** again."],
    },
    fa: {
      tr: "صفحه ساخته نشد؛ هیچ تغییری اعمال نشد.",
      what: "منوی مدیریت پیش از فعال‌سازی، صفحه را از روی تمپلیت و برندینگ شما دوباره می‌سازد و این کار شکست خورد — خط بالا علت را می‌گوید. به پنل دست زده نشده است.",
      fix: ["مشکلی را که درست در بالا نام برده شده برطرف کنید — اغلب برندینگ یا فضای دیسک — و دوباره **5 — Activate / Re-apply theme** را انتخاب کنید."],
    },
  },
  {
    group: "activation",
    texts: ["Live check: the running ${PANEL} does not use the Row-Template page yet; run 'row-template verify'."],
    en: {
      what: "After a change, the running panel was asked which subscription page it serves, and it is not Row-Template's yet. On PasarGuard this usually means the panel has not been restarted since `.env` changed.",
      fix: [
        "Run `row-template verify` — it names what does not match.",
        "On PasarGuard, restart the panel with `pasarguard restart`, then verify again.",
      ],
    },
    fa: {
      tr: "بررسی زنده: ‹پنل›ِ در حال اجرا هنوز از صفحهٔ Row-Template استفاده نمی‌کند؛ `row-template verify` را اجرا کنید.",
      what: "پس از یک تغییر، از پنلِ در حال اجرا پرسیده شد کدام صفحهٔ اشتراک را ارائه می‌کند و هنوز صفحهٔ Row-Template نیست. روی PasarGuard معمولاً یعنی پنل از زمان تغییر `.env` ری‌استارت نشده است.",
      fix: [
        "`row-template verify` را اجرا کنید — می‌گوید چه چیزی نمی‌خواند.",
        "روی PasarGuard پنل را با `pasarguard restart` ری‌استارت کنید و دوباره بررسی کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: template placement failed for panel '$panel' (status $rc)",
      "transaction: static verification did not pass for panel '$panel' (status $rc)",
      "transaction: live verification failed for panel '$panel' (status $rc)",
    ],
    en: {
      what: "The step of the activation transaction that failed: placing the page in the panel's templates directory and selecting it, checking the files and the panel's settings afterwards, or asking the running panel which page it serves. Any of them makes the transaction restore the panel from its snapshot; the next message says whether that worked.",
      fix: [
        "Read the adapter's own message just above (it starts with `panel pasarguard:` or `panel rebecca:`) — it names the exact problem.",
        "Fix it, then choose **5 — Activate / Re-apply theme** in the manager.",
      ],
    },
    fa: {
      tr: "تراکنش: گذاشتن تمپلیت برای پنل '‹پنل›' شکست خورد (وضعیت ‹وضعیت›) / تراکنش: بررسی ایستا برای پنل '‹پنل›' رد شد / تراکنش: بررسی زنده برای پنل '‹پنل›' شکست خورد",
      what: "مرحله‌ای از تراکنش فعال‌سازی که شکست خورد: گذاشتن صفحه در پوشهٔ تمپلیت‌های پنل و انتخاب آن، بررسی فایل‌ها و تنظیمات پنل پس از آن، یا پرسیدن از پنلِ در حال اجرا که کدام صفحه را ارائه می‌کند. هر کدام باعث می‌شود تراکنش پنل را از روی عکس فوری‌اش بازگرداند؛ پیام بعدی می‌گوید این کار موفق بود یا نه.",
      fix: [
        "پیام خودِ آداپتور را درست در بالا بخوانید (با `panel pasarguard:` یا `panel rebecca:` شروع می‌شود) — مشکل دقیق را نام می‌برد.",
        "آن را برطرف کنید و در منوی مدیریت **5 — Activate / Re-apply theme** را انتخاب کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: live verification was unavailable for panel '$panel'; this is not a rollback trigger",
      "transaction: live verification does not apply to panel '$panel'",
    ],
    en: {
      what: "The last step of activation asks the running panel which page it serves. It could not be asked here, which is not a failure: the activation stands, and the files and settings were already verified.",
      fix: ["Nothing to fix. To check the page subscribers receive, open a subscription link in a browser, or run `row-template verify` with `RT_SMOKE_URL` set to a subscription link."],
    },
    fa: {
      tr: "تراکنش: بررسی زنده برای پنل '‹پنل›' در دسترس نبود؛ این دلیلی برای بازگردانی نیست / تراکنش: بررسی زنده برای پنل '‹پنل›' کاربرد ندارد",
      what: "آخرین مرحلهٔ فعال‌سازی از پنلِ در حال اجرا می‌پرسد کدام صفحه را ارائه می‌کند. اینجا نمی‌شد پرسید، و این شکست حساب نمی‌شود: فعال‌سازی برقرار می‌ماند و فایل‌ها و تنظیمات پیش‌تر بررسی شده‌اند.",
      fix: ["کاری لازم نیست. برای بررسی صفحه‌ای که مشترکان می‌گیرند، یک لینک اشتراک را در مرورگر باز کنید، یا `row-template verify` را با `RT_SMOKE_URL` برابر یک لینک اشتراک اجرا کنید."],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: the safety snapshot could not be created; nothing was changed",
      "transaction: the safety snapshot did not validate; nothing was changed",
    ],
    en: {
      what: "Before activation changes anything on PasarGuard or Rebecca, it takes a snapshot of the panel's settings (under `backups.v2/` in the install directory). The snapshot could not be written, or did not pass its own check, so activation stopped. Nothing was changed.",
      fix: [
        "Check free space with `df -h /etc` and that nothing under the install directory is a symlink.",
        "Read any line above that starts with `panel` or names the snapshot, then activate again.",
      ],
    },
    fa: {
      tr: "تراکنش: عکس فوری ایمنی ساخته نشد؛ هیچ تغییری اعمال نشد / تراکنش: عکس فوری ایمنی در بررسی رد شد؛ هیچ تغییری اعمال نشد",
      what: "فعال‌سازی پیش از هر تغییری روی PasarGuard یا Rebecca از تنظیمات پنل یک عکس فوری می‌گیرد (زیر `backups.v2/` در پوشهٔ نصب). عکس فوری نوشته نشد یا از بررسی خودش عبور نکرد، پس فعال‌سازی متوقف شد. هیچ تغییری اعمال نشده است.",
      fix: [
        "فضای آزاد را با `df -h /etc` بررسی کنید و مطمئن شوید هیچ چیز زیر پوشهٔ نصب پیوند نمادین نیست.",
        "هر خطی را در بالا که با `panel` شروع می‌شود یا نام عکس فوری را آورده بخوانید و دوباره فعال‌سازی کنید.",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: another transaction holds the lock ($file)",
      "transaction: flock is not available; refusing to run without single-flight protection",
    ],
    en: {
      what: "Only one activation can run at a time, so each one takes a lock on the installation. Another `row-template` command is changing the panel right now — or `flock` (from util-linux) is not installed, and activation will not run without that protection. Nothing was changed.",
      fix: [
        "Wait for the other command to finish, then try again.",
        "If `flock` is missing, install util-linux: `apt-get install -y util-linux` or `dnf install -y util-linux`.",
      ],
    },
    fa: {
      tr: "تراکنش: تراکنش دیگری قفل را در اختیار دارد (‹مسیر›) / تراکنش: `flock` در دسترس نیست؛ بدون محافظت اجرای تک‌نمونه اجرا نمی‌شود",
      what: "در هر لحظه فقط یک فعال‌سازی می‌تواند اجرا شود، پس هر کدام روی نصب قفل می‌گیرد. یک فرمان `row-template` دیگر همین حالا در حال تغییر پنل است — یا `flock` (از بستهٔ util-linux) نصب نیست و فعال‌سازی بدون این محافظت اجرا نمی‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "صبر کنید فرمان دیگر تمام شود و دوباره امتحان کنید.",
        "اگر `flock` نصب نیست، util-linux را نصب کنید: `apt-get install -y util-linux` یا `dnf install -y util-linux`.",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: the original failure was status $original",
      "transaction: rollback also failed ($why); the panel was left as the failed attempt left it",
      "transaction: no further recovery is attempted automatically",
    ],
    en: {
      what: "Activation failed, and restoring the panel from its snapshot also failed. The panel's settings may be half-changed. This needs two independent failures, and the lines above name both.",
      fix: [
        "Run `row-template verify` to see what the panel selects now.",
        "Put the panel back by hand: on PasarGuard remove the `# >>> row-template` block from `/opt/pasarguard/.env` and run `pasarguard restart`; on Rebecca set **Subscription page template** back to your previous page in **Settings → Subscription → Templates**.",
        "Then [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output.",
      ],
    },
    fa: {
      tr: "تراکنش: خطای اصلی وضعیت ‹وضعیت› بود / تراکنش: بازگردانی هم شکست خورد (‹علت›)؛ پنل همان‌طور ماند که تلاش ناموفق رهایش کرد / تراکنش: بازیابی خودکار دیگری انجام نمی‌شود",
      what: "فعال‌سازی شکست خورد و بازگرداندن پنل از روی عکس فوری‌اش هم شکست خورد. ممکن است تنظیمات پنل نیمه‌کاره تغییر کرده باشند. این وضعیت به دو شکست مستقل نیاز دارد و خطوط بالا هر دو را نام می‌برند.",
      fix: [
        "برای دیدن اینکه پنل الان چه چیزی را انتخاب کرده `row-template verify` را اجرا کنید.",
        "پنل را دستی برگردانید: روی PasarGuard بلوک `# >>> row-template` را از `/opt/pasarguard/.env` حذف کنید و `pasarguard restart` را اجرا کنید؛ روی Rebecca در **Settings → Subscription → Templates** مقدار **Subscription page template** را به صفحهٔ قبلی خودتان برگردانید.",
        "سپس با خروجی کامل [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "activation",
    texts: [
      "transaction: live verification after rollback was not available (status $rc)",
      "transaction: live verification after rollback did not pass (status $rc)",
    ],
    en: {
      what: "After restoring the panel from its snapshot, the transaction asks the running panel which page it serves. That check could not run, or did not match — typically because PasarGuard has not finished restarting. The restore itself is judged by reading the saved settings back, which the next message reports.",
      fix: ["Run `row-template verify` in a minute, when the panel is up again."],
    },
    fa: {
      tr: "تراکنش: بررسی زنده پس از بازگردانی در دسترس نبود (وضعیت ‹وضعیت›) / تراکنش: بررسی زنده پس از بازگردانی رد شد (وضعیت ‹وضعیت›)",
      what: "پس از بازگرداندن پنل از روی عکس فوری، تراکنش از پنلِ در حال اجرا می‌پرسد کدام صفحه را ارائه می‌کند. این بررسی اجرا نشد یا نخواند — معمولاً چون ری‌استارت PasarGuard هنوز تمام نشده است. خود بازگردانی با خواندن دوبارهٔ تنظیمات ذخیره‌شده سنجیده می‌شود که پیام بعدی گزارش می‌دهد.",
      fix: ["یک دقیقه بعد، وقتی پنل دوباره بالا آمد، `row-template verify` را اجرا کنید."],
    },
  },

  // --- PasarGuard (1.3.0) ----------------------------------------------------------
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: the Row-Template block in $env is damaged; fix or remove it by hand",
      "panel pasarguard: the Row-Template block in .env is damaged",
      "panel pasarguard: the Row-Template block in .env is damaged; fix or remove it by hand",
    ],
    en: {
      what: "Row-Template selects its page with one marked block at the end of `/opt/pasarguard/.env`, from `# >>> row-template` to `# <<< row-template <<<`. That block is incomplete or was edited — for example one of its marker lines is missing — so Row-Template will not rewrite `.env` rather than risk touching your own lines. Nothing was changed.",
      fix: [
        "Open `/opt/pasarguard/.env` and look for the `row-template` lines.",
        "Delete the whole block — both marker lines and the two lines between them — or restore it exactly, then run the command again.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: بلوک Row-Template در ‹مسیر› خراب است؛ آن را دستی اصلاح یا حذف کنید / پنل pasarguard: بلوک Row-Template در `.env` خراب است",
      what: "Row-Template صفحه‌اش را با یک بلوک نشان‌دار در انتهای `/opt/pasarguard/.env` انتخاب می‌کند، از `# >>> row-template` تا `# <<< row-template <<<`. این بلوک ناقص است یا ویرایش شده — مثلاً یکی از خطوط نشانگرش وجود ندارد — پس Row-Template به‌جای خطر دست زدن به خطوط خودتان، `.env` را بازنویسی نمی‌کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "`/opt/pasarguard/.env` را باز کنید و خطوط `row-template` را پیدا کنید.",
        "کل بلوک را حذف کنید — هر دو خط نشانگر و دو خط میان آن‌ها — یا آن را دقیقاً بازگردانید، و فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: ["panel pasarguard: .env is missing or a symlink: $env"],
    en: {
      what: "PasarGuard's `.env` (in `/opt/pasarguard`) is missing, or is a symbolic link. Row-Template writes only to a real `.env`, so nothing was changed.",
      fix: ["Check your PasarGuard installation: `ls -l /opt/pasarguard/.env`. Replace a symlink with the real file, then run the command again."],
    },
    fa: {
      tr: "پنل pasarguard: فایل `.env` وجود ندارد یا پیوند نمادین است: ‹مسیر›",
      what: "فایل `.env` پنل PasarGuard (در `/opt/pasarguard`) وجود ندارد یا یک پیوند نمادین است. Row-Template فقط در `.env` واقعی می‌نویسد، پس هیچ تغییری اعمال نشده است.",
      fix: ["نصب PasarGuard خود را بررسی کنید: `ls -l /opt/pasarguard/.env`. پیوند نمادین را با فایل واقعی جایگزین کنید و فرمان را دوباره اجرا کنید."],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: CUSTOM_TEMPLATES_DIRECTORY is not a plain absolute path: $root",
      "panel pasarguard: $root is outside $RT_PG_DATA_DIR, the directory the container shares with the host",
    ],
    en: {
      what: "Your own `CUSTOM_TEMPLATES_DIRECTORY` in `.env` is where Row-Template places its page. It must be a plain absolute path, and on a Docker install it must be inside `/var/lib/pasarguard` — the only folder the container shares with the host, so a page anywhere else would never be seen by the panel. Nothing was changed.",
      fix: [
        "Set `CUSTOM_TEMPLATES_DIRECTORY` to an absolute path under `/var/lib/pasarguard` — or remove your line so the default `/var/lib/pasarguard/templates` is used.",
        "Restart PasarGuard if you changed it, then run the command again.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: `CUSTOM_TEMPLATES_DIRECTORY` یک مسیر مطلق ساده نیست: ‹مسیر› / پنل pasarguard: ‹مسیر› بیرون از `/var/lib/pasarguard` است، پوشه‌ای که کانتینر با میزبان به اشتراک می‌گذارد",
      what: "Row-Template صفحه‌اش را در `CUSTOM_TEMPLATES_DIRECTORY` خودِ شما در `.env` می‌گذارد. این مقدار باید یک مسیر مطلق ساده باشد و در نصب Docker باید داخل `/var/lib/pasarguard` باشد — تنها پوشه‌ای که کانتینر با میزبان به اشتراک می‌گذارد؛ صفحه در هر جای دیگری هرگز به چشم پنل نمی‌آید. هیچ تغییری اعمال نشده است.",
      fix: [
        "`CUSTOM_TEMPLATES_DIRECTORY` را روی یک مسیر مطلق زیر `/var/lib/pasarguard` بگذارید — یا خط خودتان را حذف کنید تا مقدار پیش‌فرض `/var/lib/pasarguard/templates` استفاده شود.",
        "اگر آن را تغییر دادید PasarGuard را ری‌استارت کنید و فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: the templates directory is a symlink: $root",
      "panel pasarguard: $dir is a symlink",
      "panel pasarguard: $dest exists and is not Row-Template's; it was left untouched",
    ],
    en: {
      what: "The page is placed at `row-template/index.html` inside PasarGuard's templates directory. Either that directory (or the `row-template` folder in it) is a symbolic link, or a file Row-Template did not create is already at that path. Row-Template never writes through a link and never overwrites a file that is not its own. Nothing was changed.",
      fix: [
        "Replace the link with a real directory.",
        "If the existing `row-template/index.html` is yours, move it elsewhere; then run the command again.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: پوشهٔ تمپلیت‌ها پیوند نمادین است: ‹مسیر› / ‹مسیر› پیوند نمادین است / ‹مسیر› وجود دارد و مال Row-Template نیست؛ دست‌نخورده ماند",
      what: "صفحه در `row-template/index.html` داخل پوشهٔ تمپلیت‌های PasarGuard قرار می‌گیرد. یا آن پوشه (یا پوشهٔ `row-template` داخلش) پیوند نمادین است، یا فایلی که Row-Template نساخته از قبل در همان مسیر هست. Row-Template هرگز از طریق پیوند نمی‌نویسد و هرگز فایلی را که مال خودش نیست بازنویسی نمی‌کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "پیوند را با یک پوشهٔ واقعی جایگزین کنید.",
        "اگر `row-template/index.html` موجود مال شماست، آن را جای دیگری ببرید؛ سپس فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: ["panel pasarguard: the panel could not be restarted"],
    en: {
      what: "PasarGuard reads `.env` only when it starts, so after changing it Row-Template restarts a running panel once — with `docker compose up -d` for the Docker install, or `systemctl restart pasarguard` for a source install. That failed. During activation the change is then rolled back; during uninstall the block has already been removed, and the panel picks that up the next time it starts.",
      fix: [
        "Check the panel: `pasarguard status`, or `docker compose -f /opt/pasarguard/docker-compose.yml ps`, or `systemctl status pasarguard`.",
        "Restart it yourself (`pasarguard restart`), then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: پنل ری‌استارت نشد",
      what: "PasarGuard فایل `.env` را فقط هنگام شروع می‌خواند، پس Row-Template پس از تغییر آن، پنلِ در حال اجرا را یک بار ری‌استارت می‌کند — در نصب Docker با `docker compose up -d` و در نصب از سورس با `systemctl restart pasarguard`. این کار شکست خورد. هنگام فعال‌سازی، تغییر سپس بازگردانده می‌شود؛ هنگام حذف، بلوک پیش‌تر حذف شده و پنل دفعهٔ بعد که شروع شود آن را اعمال می‌کند.",
      fix: [
        "پنل را بررسی کنید: `pasarguard status`، یا `docker compose -f /opt/pasarguard/docker-compose.yml ps`، یا `systemctl status pasarguard`.",
        "خودتان آن را ری‌استارت کنید (`pasarguard restart`) و `row-template verify` را اجرا کنید.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: the running panel does not use the Row-Template page yet (restart it)",
      "panel pasarguard: the running panel cannot see $root/$RT_PG_PAGE",
    ],
    en: {
      what: "The live check asks the running PasarGuard container which page it uses and whether it can see the page file. Either the container still has the old setting — it has not been recreated since `.env` changed — or the page is not visible inside the container, which means the templates directory is not in the folder the container shares with the host.",
      fix: [
        "Restart PasarGuard (`pasarguard restart`) and run `row-template verify` again.",
        "If the page is still not visible, check that your `CUSTOM_TEMPLATES_DIRECTORY` is under `/var/lib/pasarguard`.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: پنلِ در حال اجرا هنوز از صفحهٔ Row-Template استفاده نمی‌کند (ری‌استارتش کنید) / پنل pasarguard: پنلِ در حال اجرا ‹مسیر›/`row-template/index.html` را نمی‌بیند",
      what: "بررسی زنده از کانتینرِ در حال اجرای PasarGuard می‌پرسد از کدام صفحه استفاده می‌کند و آیا فایل صفحه را می‌بیند. یا کانتینر هنوز تنظیم قبلی را دارد — از زمان تغییر `.env` دوباره ساخته نشده — یا صفحه داخل کانتینر دیده نمی‌شود؛ یعنی پوشهٔ تمپلیت‌ها در پوشه‌ای نیست که کانتینر با میزبان به اشتراک می‌گذارد.",
      fix: [
        "PasarGuard را ری‌استارت کنید (`pasarguard restart`) و `row-template verify` را دوباره اجرا کنید.",
        "اگر صفحه هنوز دیده نمی‌شود، بررسی کنید `CUSTOM_TEMPLATES_DIRECTORY` شما زیر `/var/lib/pasarguard` باشد.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: the page is not in place: $dest",
      "panel pasarguard: the placed page differs from the generated one",
      "panel pasarguard: .env does not select the Row-Template page",
    ],
    en: {
      what: "PasarGuard is set up for Row-Template, but the pieces no longer agree: the page is missing from the templates directory, the copy there is not the page Row-Template generated last, or `.env` no longer selects it (the block was removed, or a later line of your own sets `SUBSCRIPTION_PAGE_TEMPLATE` again).",
      fix: [
        "Re-apply from the manager: `row-template`, then **5 — Activate / Re-apply theme**.",
        "If you set `SUBSCRIPTION_PAGE_TEMPLATE` yourself below the Row-Template block, remove your line — the last assignment in `.env` wins.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: صفحه سر جایش نیست: ‹مسیر› / صفحهٔ گذاشته‌شده با صفحهٔ ساخته‌شده فرق دارد / `.env` صفحهٔ Row-Template را انتخاب نمی‌کند",
      what: "PasarGuard برای Row-Template تنظیم شده، اما اجزا دیگر با هم نمی‌خوانند: صفحه در پوشهٔ تمپلیت‌ها نیست، نسخهٔ موجود آنجا همان صفحه‌ای نیست که Row-Template آخرین بار ساخته، یا `.env` دیگر آن را انتخاب نمی‌کند (بلوک حذف شده، یا خطی از خودتان پایین‌تر دوباره `SUBSCRIPTION_PAGE_TEMPLATE` را تنظیم می‌کند).",
      fix: [
        "از منوی مدیریت دوباره اعمالش کنید: `row-template` و سپس **5 — Activate / Re-apply theme**.",
        "اگر خودتان `SUBSCRIPTION_PAGE_TEMPLATE` را زیر بلوک Row-Template تنظیم کرده‌اید، خط خودتان را حذف کنید — آخرین مقداردهی در `.env` اعمال می‌شود.",
      ],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: the artifact is missing: $RT_DIST",
      "panel pasarguard: the artifact is not a valid PasarGuard page",
      "panel pasarguard: the artifact does not match its recorded checksum",
      "panel pasarguard: the generated page is missing or invalid: $RT_LIVE",
      "panel pasarguard: SOURCE is not a PasarGuard page this release can serve",
    ],
    en: {
      what: "Row-Template's own files for PasarGuard are not right: the installed design (`dist/template.html`) is missing, damaged, not built for PasarGuard, or does not match its checksum, or the generated page (`sub.html`) is missing or incomplete. Nothing in the panel was changed by this check.",
      fix: ["Run `row-template update` to reinstall the designs and regenerate the page, then `row-template verify`."],
    },
    fa: {
      tr: "پنل pasarguard: فایل صفحه وجود ندارد / صفحهٔ معتبر PasarGuard نیست / با چک‌سام ثبت‌شده‌اش نمی‌خواند / صفحهٔ ساخته‌شده وجود ندارد یا نامعتبر است: ‹مسیر› / منبع، صفحهٔ PasarGuardی نیست که این نسخه بتواند ارائه کند",
      what: "فایل‌های خود Row-Template برای PasarGuard درست نیستند: تمپلیت نصب‌شده (`dist/template.html`) وجود ندارد، خراب است، برای PasarGuard ساخته نشده یا با چک‌سامش نمی‌خواند؛ یا صفحهٔ ساخته‌شده (`sub.html`) وجود ندارد یا ناقص است. این بررسی چیزی را در پنل تغییر نداده است.",
      fix: ["با `row-template update` تمپلیت‌ها را دوباره نصب کنید و صفحه را دوباره بسازید، سپس `row-template verify` را اجرا کنید."],
    },
  },
  {
    group: "pasarguard",
    texts: ["panel pasarguard: $n admin(s) set their own subscription page (sub_template); their users keep that page."],
    en: {
      what: "In PasarGuard an admin can have their own subscription template, which wins over the panel-wide setting Row-Template uses. The users of those admins keep seeing that page. This is your panel's configuration, so Row-Template reports it and changes nothing.",
      fix: ["If those users should see Row-Template too, clear the admin's subscription template in PasarGuard's admin settings."],
    },
    fa: {
      tr: "پنل pasarguard: ‹n› ادمین صفحهٔ اشتراک خودشان را تنظیم کرده‌اند (`sub_template`)؛ کاربرانشان همان صفحه را می‌بینند.",
      what: "در PasarGuard هر ادمین می‌تواند تمپلیت اشتراک خودش را داشته باشد که بر تنظیم کلی پنل — همان که Row-Template استفاده می‌کند — مقدم است. کاربرانِ آن ادمین‌ها همچنان همان صفحه را می‌بینند. این پیکربندی پنل خودتان است، پس Row-Template فقط گزارشش می‌دهد و چیزی را تغییر نمی‌دهد.",
      fix: ["اگر آن کاربران هم باید Row-Template را ببینند، تمپلیت اشتراک آن ادمین را در تنظیمات ادمین PasarGuard پاک کنید."],
    },
  },
  {
    group: "pasarguard",
    texts: ["panel pasarguard: the panel's 'disable subscription template' setting is on, so browsers get the raw subscription instead of any page."],
    en: {
      what: "PasarGuard's **disable subscription template** setting is on, so the panel sends browsers the subscription itself rather than any page — Row-Template's included. Row-Template reports it and changes nothing.",
      fix: ["Turn the setting off in PasarGuard's subscription settings if subscribers should see the page."],
    },
    fa: {
      tr: "پنل pasarguard: تنظیم 'disable subscription template' پنل روشن است، پس مرورگرها به‌جای هر صفحه‌ای خود اشتراک خام را دریافت می‌کنند.",
      what: "تنظیم **disable subscription template** در PasarGuard روشن است، پس پنل به‌جای هر صفحه‌ای — از جمله صفحهٔ Row-Template — خود اشتراک را برای مرورگرها می‌فرستد. Row-Template فقط گزارشش می‌دهد و چیزی را تغییر نمی‌دهد.",
      fix: ["اگر مشترکان باید صفحه را ببینند، این تنظیم را در تنظیمات اشتراک PasarGuard خاموش کنید."],
    },
  },
  {
    group: "pasarguard",
    texts: ["panel pasarguard: $dest is not Row-Template's; left in place"],
    en: {
      what: "While removing its page, Row-Template found a file at its page's path that it did not create, and left it where it is.",
      fix: ["Nothing to fix. Delete the file yourself if you do not need it."],
    },
    fa: {
      tr: "پنل pasarguard: ‹مسیر› مال Row-Template نیست؛ سر جایش ماند",
      what: "Row-Template هنگام حذف صفحه‌اش، در مسیر صفحه فایلی پیدا کرد که خودش نساخته بود و آن را سر جایش گذاشت.",
      fix: ["کاری لازم نیست. اگر به آن فایل نیازی ندارید، خودتان حذفش کنید."],
    },
  },
  {
    group: "pasarguard",
    texts: [
      "panel pasarguard: after restoring, the Row-Template block is '$now_block', expected '$block'",
      "panel pasarguard: after restoring, the block's directory is not the recorded value",
      "panel pasarguard: after restoring, $RT_PG_KEY_PAGE is set, but the record says it was unset",
      "panel pasarguard: after restoring, $RT_PG_KEY_PAGE is not the recorded value",
    ],
    en: {
      what: "After putting `.env` back from a snapshot, Row-Template reads it again and compares it with what was recorded — and it does not match. The restore is therefore reported as failed rather than assumed to have worked.",
      fix: [
        "Open `/opt/pasarguard/.env` and compare the `row-template` block and your `SUBSCRIPTION_PAGE_TEMPLATE` line with what you expect.",
        "Remove the block by hand if activation did not succeed, restart PasarGuard, and run `row-template verify`.",
      ],
    },
    fa: {
      tr: "پنل pasarguard: پس از بازگردانی، بلوک Row-Template '‹وضعیت›' است، در حالی که '‹وضعیت›' انتظار می‌رفت / پس از بازگردانی، پوشهٔ بلوک مقدار ثبت‌شده نیست / پس از بازگردانی، `SUBSCRIPTION_PAGE_TEMPLATE` تنظیم شده اما رکورد می‌گوید تنظیم نبوده / پس از بازگردانی، `SUBSCRIPTION_PAGE_TEMPLATE` مقدار ثبت‌شده نیست",
      what: "Row-Template پس از بازگرداندن `.env` از روی عکس فوری، آن را دوباره می‌خواند و با آنچه ثبت شده مقایسه می‌کند — و نمی‌خواند. پس بازگردانی به‌جای اینکه موفق فرض شود، ناموفق گزارش می‌شود.",
      fix: [
        "`/opt/pasarguard/.env` را باز کنید و بلوک `row-template` و خط `SUBSCRIPTION_PAGE_TEMPLATE` خودتان را با آنچه انتظار دارید مقایسه کنید.",
        "اگر فعال‌سازی موفق نبوده، بلوک را دستی حذف کنید، PasarGuard را ری‌استارت کنید و `row-template verify` را اجرا کنید.",
      ],
    },
  },

  // --- Rebecca (1.3.0) ----------------------------------------------------------------
  {
    group: "rebecca",
    texts: ["panel rebecca: this is Rebecca 0.0.x, the Python edition (Docker image ${IMAGE}). Row-Template's Rebecca page is built for Rebecca 1.x, the Go edition, which Rebecca publishes for its binary install (rebecca-binary.sh); Rebecca's own 'rebecca migrate-binary' moves a Docker install to it."],
    en: {
      what: "Row-Template supports Rebecca **1.x**, the Go edition. Docker Hub's `rebeccapanel/rebecca` image is still the **0.0.x Python edition**, which renders pages from a different context: it would accept the setting and silently keep serving its own page. So the installer refuses it before changing anything — the panel is not modified.",
      fix: [
        "Move Rebecca to 1.x with Rebecca's own `rebecca migrate-binary`, or install Rebecca with its binary installer (`rebecca-binary.sh`).",
        "Then run the Row-Template installer again.",
      ],
    },
    fa: {
      tr: "پنل rebecca: این Rebecca نسخهٔ 0.0.x، یعنی نسخهٔ پایتونی است (ایمیج Docker ‹ایمیج›). صفحهٔ Rebecca در Row-Template برای Rebecca 1.x، یعنی نسخهٔ Go ساخته شده که Rebecca برای نصب باینری‌اش (`rebecca-binary.sh`) منتشر می‌کند؛ دستور `rebecca migrate-binary` خود Rebecca نصب Docker را به آن منتقل می‌کند.",
      what: "Row-Template از Rebecca **1.x**، یعنی نسخهٔ Go پشتیبانی می‌کند. ایمیج `rebeccapanel/rebecca` در Docker Hub هنوز **نسخهٔ پایتونی 0.0.x** است که صفحه‌ها را از زمینهٔ دیگری رندر می‌کند: تنظیم را می‌پذیرفت و بی‌صدا همان صفحهٔ خودش را ارائه می‌داد. پس نصب‌کننده پیش از هر تغییری آن را رد می‌کند — پنل تغییری نمی‌کند.",
      fix: [
        "Rebecca را با دستور `rebecca migrate-binary` خود Rebecca به 1.x منتقل کنید، یا Rebecca را با نصب‌کنندهٔ باینری‌اش (`rebecca-binary.sh`) نصب کنید.",
        "سپس نصب‌کنندهٔ Row-Template را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "rebecca",
    texts: ["panel rebecca: cannot tell which Rebecca edition this is (the Docker image could not be inspected); refusing rather than placing a page Rebecca may not be able to render."],
    en: {
      what: "For a Docker install, Row-Template reads the image to tell the 1.x Go edition from the 0.0.x Python edition. The image could not be inspected — Docker is not running, or the image named in the compose file is not present — so rather than guess, it stops. Nothing was changed.",
      fix: [
        "Check Docker and the panel: `docker ps`, `rebecca status`.",
        "Pull or start the panel's image, then run the command again. Rebecca's binary install (1.x) needs no image check.",
      ],
    },
    fa: {
      tr: "پنل rebecca: مشخص نیست این کدام نسخهٔ Rebecca است (ایمیج Docker بررسی نشد)؛ به‌جای گذاشتن صفحه‌ای که شاید Rebecca نتواند رندرش کند، ادامه نمی‌دهد.",
      what: "در نصب Docker، Row-Template ایمیج را می‌خواند تا نسخهٔ Go (1.x) را از نسخهٔ پایتونی (0.0.x) تشخیص دهد. ایمیج بررسی نشد — Docker در حال اجرا نیست یا ایمیجی که در فایل compose آمده موجود نیست — پس به‌جای حدس زدن متوقف می‌شود. هیچ تغییری اعمال نشده است.",
      fix: [
        "Docker و پنل را بررسی کنید: `docker ps` و `rebecca status`.",
        "ایمیج پنل را دریافت یا اجرا کنید و فرمان را دوباره اجرا کنید. نصب باینری Rebecca (1.x) به بررسی ایمیج نیازی ندارد.",
      ],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: custom_templates_directory is not a usable absolute path",
      "panel rebecca: $root is outside $RT_RB_DATA_DIR, the directory the container shares with the host",
    ],
    en: {
      what: "When Rebecca already has a **Custom templates directory**, Row-Template places its page there. The value set in Rebecca is not a plain absolute path, or — for a Docker install — is outside `/var/lib/rebecca`, the folder the container shares with the host. Nothing was changed.",
      fix: ["In the Rebecca dashboard, set **Settings → Subscription → Templates → Custom templates directory** to an absolute path under `/var/lib/rebecca` (or clear it), then run the command again."],
    },
    fa: {
      tr: "پنل rebecca: `custom_templates_directory` مسیر مطلق قابل استفاده‌ای نیست / ‹مسیر› بیرون از `/var/lib/rebecca` است، پوشه‌ای که کانتینر با میزبان به اشتراک می‌گذارد",
      what: "وقتی Rebecca از قبل **Custom templates directory** دارد، Row-Template صفحه‌اش را همان‌جا می‌گذارد. مقداری که در Rebecca تنظیم شده مسیر مطلق ساده‌ای نیست، یا — در نصب Docker — بیرون از `/var/lib/rebecca` است، پوشه‌ای که کانتینر با میزبان به اشتراک می‌گذارد. هیچ تغییری اعمال نشده است.",
      fix: ["در داشبورد Rebecca مقدار **Settings → Subscription → Templates → Custom templates directory** را روی یک مسیر مطلق زیر `/var/lib/rebecca` بگذارید (یا خالی‌اش کنید) و فرمان را دوباره اجرا کنید."],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: cannot read subscription_settings",
      "panel rebecca: cannot read custom_templates_directory",
      "panel rebecca: cannot read the panel selection (sqlite3 and a SQLite database are needed)",
    ],
    en: {
      what: "Rebecca's subscription settings could not be read from its database. Automatic activation and these checks need Rebecca's default SQLite database and the `sqlite3` command. Nothing was changed.",
      fix: [
        "Install `sqlite3` (`apt-get install -y sqlite3`) and run the command again.",
        "With MySQL/MariaDB, activation is manual: see [Activation](/docs/installation/activation/#rebecca).",
      ],
    },
    fa: {
      tr: "پنل rebecca: `subscription_settings` خوانده نشد / `custom_templates_directory` خوانده نشد / انتخاب پنل خوانده نشد (به `sqlite3` و پایگاه‌دادهٔ SQLite نیاز است)",
      what: "تنظیمات اشتراک Rebecca از پایگاه‌داده‌اش خوانده نشد. فعال‌سازی خودکار و این بررسی‌ها به پایگاه‌دادهٔ پیش‌فرض SQLite پنل Rebecca و فرمان `sqlite3` نیاز دارند. هیچ تغییری اعمال نشده است.",
      fix: [
        "`sqlite3` را نصب کنید (`apt-get install -y sqlite3`) و فرمان را دوباره اجرا کنید.",
        "با MySQL/MariaDB فعال‌سازی دستی است: [فعال‌سازی](/docs/installation/activation/#rebecca) را ببینید.",
      ],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: the templates directory is a symlink: $root",
      "panel rebecca: $dir is a symlink",
      "panel rebecca: $dest exists and is not Row-Template's; it was left untouched",
    ],
    en: {
      what: "The page is placed at `row-template/index.html` inside Rebecca's templates directory. Either that directory (or the `row-template` folder in it) is a symbolic link, or a file Row-Template did not create is already at that path. Row-Template never writes through a link and never overwrites a file that is not its own. Nothing was changed.",
      fix: [
        "Replace the link with a real directory.",
        "If the existing `row-template/index.html` is yours, move it elsewhere; then run the command again.",
      ],
    },
    fa: {
      tr: "پنل rebecca: پوشهٔ تمپلیت‌ها پیوند نمادین است: ‹مسیر› / ‹مسیر› پیوند نمادین است / ‹مسیر› وجود دارد و مال Row-Template نیست؛ دست‌نخورده ماند",
      what: "صفحه در `row-template/index.html` داخل پوشهٔ تمپلیت‌های Rebecca قرار می‌گیرد. یا آن پوشه (یا پوشهٔ `row-template` داخلش) پیوند نمادین است، یا فایلی که Row-Template نساخته از قبل در همان مسیر هست. Row-Template هرگز از طریق پیوند نمی‌نویسد و هرگز فایلی را که مال خودش نیست بازنویسی نمی‌کند. هیچ تغییری اعمال نشده است.",
      fix: [
        "پیوند را با یک پوشهٔ واقعی جایگزین کنید.",
        "اگر `row-template/index.html` موجود مال شماست، آن را جای دیگری ببرید؛ سپس فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: the page is not in place: $dest",
      "panel rebecca: the placed page differs from the generated one",
      "panel rebecca: the panel does not select the Row-Template page",
    ],
    en: {
      what: "Rebecca is set up for Row-Template, but the pieces no longer agree: the page is missing from the templates directory, the copy there is not the page Row-Template generated last, or Rebecca's **Subscription page template** no longer names it (someone chose another page in the dashboard).",
      fix: ["Re-apply from the manager: `row-template`, then **5 — Activate / Re-apply theme**. If you chose another page on purpose, leave it."],
    },
    fa: {
      tr: "پنل rebecca: صفحه سر جایش نیست: ‹مسیر› / صفحهٔ گذاشته‌شده با صفحهٔ ساخته‌شده فرق دارد / پنل صفحهٔ Row-Template را انتخاب نمی‌کند",
      what: "Rebecca برای Row-Template تنظیم شده، اما اجزا دیگر با هم نمی‌خوانند: صفحه در پوشهٔ تمپلیت‌ها نیست، نسخهٔ موجود آنجا همان صفحه‌ای نیست که Row-Template آخرین بار ساخته، یا **Subscription page template** در Rebecca دیگر آن را نام نمی‌برد (کسی در داشبورد صفحهٔ دیگری انتخاب کرده است).",
      fix: ["از منوی مدیریت دوباره اعمالش کنید: `row-template` و سپس **5 — Activate / Re-apply theme**. اگر عمداً صفحهٔ دیگری انتخاب کرده‌اید، دست نزنید."],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: the artifact is missing: $RT_DIST",
      "panel rebecca: the artifact is not a valid Rebecca page",
      "panel rebecca: the artifact does not match its recorded checksum",
      "panel rebecca: the generated page is missing or invalid: $RT_LIVE",
      "panel rebecca: SOURCE is not a Rebecca page this release can serve",
    ],
    en: {
      what: "Row-Template's own files for Rebecca are not right: the installed design (`dist/template.html`) is missing, damaged, not built for Rebecca, or does not match its checksum, or the generated page (`sub.html`) is missing or incomplete. Nothing in the panel was changed by this check.",
      fix: ["Run `row-template update` to reinstall the designs and regenerate the page, then `row-template verify`."],
    },
    fa: {
      tr: "پنل rebecca: فایل صفحه وجود ندارد / صفحهٔ معتبر Rebecca نیست / با چک‌سام ثبت‌شده‌اش نمی‌خواند / صفحهٔ ساخته‌شده وجود ندارد یا نامعتبر است: ‹مسیر› / منبع، صفحهٔ Rebeccaای نیست که این نسخه بتواند ارائه کند",
      what: "فایل‌های خود Row-Template برای Rebecca درست نیستند: تمپلیت نصب‌شده (`dist/template.html`) وجود ندارد، خراب است، برای Rebecca ساخته نشده یا با چک‌سامش نمی‌خواند؛ یا صفحهٔ ساخته‌شده (`sub.html`) وجود ندارد یا ناقص است. این بررسی چیزی را در پنل تغییر نداده است.",
      fix: ["با `row-template update` تمپلیت‌ها را دوباره نصب کنید و صفحه را دوباره بسازید، سپس `row-template verify` را اجرا کنید."],
    },
  },
  {
    group: "rebecca",
    texts: ["panel rebecca: $n admin(s) override the subscription page for their own users; those users keep the admin's page."],
    en: {
      what: "In Rebecca an admin can have their own subscription template settings, which win over the panel-wide ones Row-Template sets. The users of those admins keep seeing that page. Row-Template reports it and changes nothing.",
      fix: ["If those users should see Row-Template too, clear that admin's subscription template settings in Rebecca."],
    },
    fa: {
      tr: "پنل rebecca: ‹n› ادمین صفحهٔ اشتراک را برای کاربران خودشان جایگزین کرده‌اند؛ آن کاربران صفحهٔ ادمین را می‌بینند.",
      what: "در Rebecca هر ادمین می‌تواند تنظیمات تمپلیت اشتراک خودش را داشته باشد که بر تنظیمات کلی پنل — همان که Row-Template تنظیم می‌کند — مقدم است. کاربرانِ آن ادمین‌ها همچنان همان صفحه را می‌بینند. Row-Template فقط گزارشش می‌دهد و چیزی را تغییر نمی‌دهد.",
      fix: ["اگر آن کاربران هم باید Row-Template را ببینند، تنظیمات تمپلیت اشتراک آن ادمین را در Rebecca پاک کنید."],
    },
  },
  {
    group: "rebecca",
    texts: ["panel rebecca: $dest is not Row-Template's; left in place"],
    en: {
      what: "While removing its page, Row-Template found a file at its page's path that it did not create, and left it where it is.",
      fix: ["Nothing to fix. Delete the file yourself if you do not need it."],
    },
    fa: {
      tr: "پنل rebecca: ‹مسیر› مال Row-Template نیست؛ سر جایش ماند",
      what: "Row-Template هنگام حذف صفحه‌اش، در مسیر صفحه فایلی پیدا کرد که خودش نساخته بود و آن را سر جایش گذاشت.",
      fix: ["کاری لازم نیست. اگر به آن فایل نیازی ندارید، خودتان حذفش کنید."],
    },
  },
  {
    group: "rebecca",
    texts: [
      "panel rebecca: cannot read subscription_page_template back after restoring",
      "panel rebecca: after restoring, subscription_page_template is '$nowpage', expected '$page'",
      "panel rebecca: cannot read custom_templates_directory back after restoring",
      "panel rebecca: after restoring, custom_templates_directory is not the recorded value",
    ],
    en: {
      what: "After writing Rebecca's two subscription settings back from a snapshot, Row-Template reads them again and compares them with what was recorded — and they do not match, or cannot be read. The restore is therefore reported as failed rather than assumed to have worked.",
      fix: [
        "In the Rebecca dashboard open **Settings → Subscription → Templates** and check **Subscription page template** and **Custom templates directory**.",
        "Set them to the values you want (Rebecca's own page is `subscription/index.html`), then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "پنل rebecca: `subscription_page_template` پس از بازگردانی خوانده نشد / پس از بازگردانی، `subscription_page_template` برابر '‹مقدار›' است، در حالی که '‹مقدار›' انتظار می‌رفت / `custom_templates_directory` پس از بازگردانی خوانده نشد / پس از بازگردانی، `custom_templates_directory` مقدار ثبت‌شده نیست",
      what: "Row-Template پس از نوشتن دوبارهٔ دو تنظیم اشتراک Rebecca از روی عکس فوری، آن‌ها را دوباره می‌خواند و با آنچه ثبت شده مقایسه می‌کند — و نمی‌خوانند، یا خوانده نمی‌شوند. پس بازگردانی به‌جای اینکه موفق فرض شود، ناموفق گزارش می‌شود.",
      fix: [
        "در داشبورد Rebecca **Settings → Subscription → Templates** را باز کنید و **Subscription page template** و **Custom templates directory** را بررسی کنید.",
        "آن‌ها را روی مقادیر دلخواه بگذارید (صفحهٔ خود Rebecca `subscription/index.html` است) و `row-template verify` را اجرا کنید.",
      ],
    },
  },

  // --- 1.3.0: releases, designs, pages, updates, backups ----------------------------
  {
    group: "download",
    texts: ["payload template $id is not a ${PANEL} page"],
    en: {
      what: "Every design in a release comes in a version for each panel. The version for this server's panel failed the check that it really is a page for that panel — it is damaged, or belongs to another panel — so the release is refused. Nothing was changed.",
      fix: ["Download the release again from the official release page; the four files must come from the same release."],
    },
    fa: {
      tr: "تمپلیت ‹شناسه› در محتوای نسخه صفحه‌ای برای ‹پنل› نیست",
      what: "هر تمپلیت در نسخه، برای هر پنل یک نسخهٔ جداگانه دارد. نسخهٔ مربوط به پنل این سرور در بررسی اینکه واقعاً صفحه‌ای برای همان پنل است رد شد — یا خراب است یا متعلق به پنل دیگری است — پس نسخه رد می‌شود. هیچ تغییری اعمال نشده است.",
      fix: ["نسخه را دوباره از صفحهٔ رسمی نسخه دانلود کنید؛ هر چهار فایل باید از یک نسخه باشند."],
    },
  },
  {
    group: "download",
    texts: [
      "this release carries no ${PANEL} pages; nothing was activated.",
      "this release carries no ${PANEL} pages; nothing was changed.",
    ],
    en: {
      what: "The release has no pages built for this server's panel. Every release from 1.3.0 on carries pages for 3X-UI, PasarGuard and Rebecca; releases before 1.3.0 carry none for PasarGuard or Rebecca. So the release is incomplete or too old for this panel. Nothing was activated, and the page your subscribers see is unchanged.",
      fix: [
        "Use Row-Template 1.3.0 or newer — download it again from the official release page.",
        "With `RT_RELEASE_DIR` or `RT_RELEASE_URL`, check they point at a 1.3.0 or newer release.",
      ],
    },
    fa: {
      tr: "این نسخه هیچ صفحه‌ای برای ‹پنل› ندارد؛ چیزی فعال نشد. / …؛ هیچ تغییری اعمال نشد.",
      what: "نسخه هیچ صفحه‌ای ندارد که برای پنل این سرور ساخته شده باشد. هر نسخه از 1.3.0 به بعد صفحه‌هایی برای 3X-UI، PasarGuard و Rebecca دارد؛ نسخه‌های پیش از 1.3.0 هیچ صفحه‌ای برای PasarGuard یا Rebecca ندارند. پس نسخه ناقص است یا برای این پنل قدیمی است. چیزی فعال نشد و صفحه‌ای که مشترکان می‌بینند تغییری نکرده است.",
      fix: [
        "از Row-Template نسخهٔ 1.3.0 یا جدیدتر استفاده کنید — آن را دوباره از صفحهٔ رسمی نسخه دانلود کنید.",
        "اگر از `RT_RELEASE_DIR` یا `RT_RELEASE_URL` استفاده می‌کنید، مطمئن شوید به نسخهٔ 1.3.0 یا جدیدتر اشاره می‌کنند.",
      ],
    },
  },
  {
    group: "templates",
    texts: [
      "the template store path is a symlink; refusing to repair it: $RT_TEMPLATE_STORE",
      "the template store path is not a directory: $RT_TEMPLATE_STORE",
    ],
    en: {
      what: "The template store — `dist/templates/` in the install directory — is a symbolic link or a file instead of a directory, so Row-Template will not write the designs into it. Nothing was changed.",
      fix: ["Remove the link or file named in the message (it is inside the install directory) and run the same command again; the store is recreated with every design."],
    },
    fa: {
      tr: "مسیر مخزن تمپلیت‌ها یک پیوند نمادین است؛ تعمیر نمی‌شود: ‹مسیر› / مسیر مخزن تمپلیت‌ها پوشه نیست: ‹مسیر›",
      what: "مخزن تمپلیت‌ها — یعنی `dist/templates/` در پوشهٔ نصب — به‌جای پوشه، یک پیوند نمادین یا فایل است؛ پس Row-Template تمپلیت‌ها را در آن نمی‌نویسد. هیچ تغییری اعمال نشده است.",
      fix: ["پیوند یا فایلی را که در پیام آمده (داخل پوشهٔ نصب) حذف کنید و همان فرمان را دوباره اجرا کنید؛ مخزن با همهٔ تمپلیت‌ها دوباره ساخته می‌شود."],
    },
  },
  {
    group: "templates",
    texts: [
      "not reading templates from $src: it is not a plain directory.",
      "the copy of design '$id' in $src fails its checksum or structural check; it was not moved.",
      "left $src in place: it holds files Row-Template does not recognise.",
    ],
    en: {
      what: "Designs left outside the template store — where an update from an earlier release could put them — are moved back into `dist/templates/`. These warnings mean part of that could not be done safely: the folder is a link or special file, one copy is damaged and was left where it was, or the folder also holds files Row-Template does not recognise, so it was not removed. The designs in the store are unaffected.",
      fix: [
        "Run `row-template verify` as root to see the state of the store; `row-template update` reinstalls any design that is missing.",
        "Once the store is complete, you can delete the leftover folder named in the message by hand.",
      ],
    },
    fa: {
      tr: "تمپلیت‌ها از ‹مسیر› خوانده نمی‌شوند: پوشهٔ معمولی نیست. / نسخهٔ تمپلیت '‹شناسه›' در ‹مسیر› در بررسی چک‌سام یا ساختار رد شد؛ جابه‌جا نشد. / ‹مسیر› سر جایش ماند: فایل‌هایی دارد که Row-Template نمی‌شناسد.",
      what: "تمپلیت‌هایی که بیرون از مخزن تمپلیت‌ها مانده‌اند — جایی که به‌روزرسانی از نسخه‌های قبلی ممکن است آن‌ها را گذاشته باشد — به `dist/templates/` بازگردانده می‌شوند. این هشدارها یعنی بخشی از این کار با اطمینان انجام نشد: آن پوشه پیوند یا فایل ویژه است، یکی از نسخه‌ها خراب است و سر جایش ماند، یا پوشه فایل‌هایی دارد که Row-Template نمی‌شناسد و به همین دلیل حذف نشد. تمپلیت‌های داخل مخزن آسیبی ندیده‌اند.",
      fix: [
        "`row-template verify` را با root اجرا کنید تا وضعیت مخزن را ببینید؛ `row-template update` هر تمپلیت ناموجود را دوباره نصب می‌کند.",
        "وقتی مخزن کامل شد، می‌توانید پوشهٔ باقی‌مانده‌ای را که در پیام آمده دستی حذف کنید.",
      ],
    },
  },
  {
    group: "page",
    texts: ["refusing to install an artifact that is not a ${PANEL} page"],
    en: {
      what: "A design file about to be installed is not built for this server's panel — each panel has its own template engine, so a page made for one cannot be served by another. It was not installed, and nothing was changed.",
      fix: ["Run `row-template update` to reinstall this release's designs."],
    },
    fa: {
      tr: "فایلی که صفحهٔ ‹پنل› نیست نصب نمی‌شود",
      what: "فایل تمپلیتی که قرار بود نصب شود برای پنل این سرور ساخته نشده است — هر پنل موتور قالب خودش را دارد، پس صفحه‌ای که برای یک پنل ساخته شده در پنل دیگر ارائه نمی‌شود. نصب نشد و هیچ تغییری اعمال نشده است.",
      fix: ["با `row-template update` تمپلیت‌های این نسخه را دوباره نصب کنید."],
    },
  },
  {
    group: "update",
    texts: [
      "could not download Row-Template $ver to complete the installation. It will be retried the next time the manager opens; 'row-template update' also completes it.",
      "the release source offers ${pver:-an unknown version}, not the installed $ver; nothing was changed. Run 'row-template update' to update.",
      "the installation is still incomplete; run 'row-template verify' for details.",
      "this installation is incomplete and its version is unknown; run 'row-template update' to repair it.",
    ],
    en: {
      what: "1.1.0's own updater copies only part of a newer release. So the first time you open `row-template`, or run `row-template config` or `row-template verify` as root, after such an update, Row-Template downloads the rest of **the same version** you have installed — every design and the remaining installer files — before doing anything else. That did not work: the release source could not be reached, it offered a different version (it never installs another version this way), the version installed could not be read, or something is still missing afterwards. Your page, branding, design and backups are unchanged.",
      fix: [
        "Make sure the server can reach the release source, then open the manager again.",
        "Or run `row-template update`, which installs the latest release in full.",
      ],
    },
    fa: {
      tr: "Row-Template نسخهٔ ‹نسخه› برای کامل کردن نصب دانلود نشد. دفعهٔ بعد که منوی مدیریت باز شود دوباره تلاش می‌شود؛ `row-template update` هم آن را کامل می‌کند. / منبع نسخه ‹نسخه› را ارائه می‌کند، نه نسخهٔ نصب‌شدهٔ ‹نسخه› را؛ هیچ تغییری اعمال نشد. برای به‌روزرسانی `row-template update` را اجرا کنید. / نصب هنوز ناقص است؛ برای جزئیات `row-template verify` را اجرا کنید. / این نصب ناقص است و نسخه‌اش نامعلوم است؛ برای تعمیر `row-template update` را اجرا کنید.",
      what: "به‌روزرسان خود 1.1.0 فقط بخشی از نسخهٔ جدیدتر را کپی می‌کند. پس نخستین باری که پس از چنین به‌روزرسانی‌ای `row-template` را باز می‌کنید، یا `row-template config` یا `row-template verify` را با root اجرا می‌کنید، Row-Template پیش از هر کاری بقیهٔ **همان نسخه‌ای** را که نصب دارید دانلود می‌کند — همهٔ تمپلیت‌ها و بقیهٔ فایل‌های نصب‌کننده. این کار انجام نشد: منبع نسخه در دسترس نبود، نسخهٔ دیگری ارائه می‌کرد (این مسیر هرگز نسخهٔ دیگری نصب نمی‌کند)، نسخهٔ نصب‌شده خوانده نشد، یا پس از آن هنوز چیزی کم است. صفحه، برندینگ، تمپلیت و پشتیبان‌های شما تغییری نکرده‌اند.",
      fix: [
        "مطمئن شوید سرور به منبع نسخه دسترسی دارد و منوی مدیریت را دوباره باز کنید.",
        "یا `row-template update` را اجرا کنید که آخرین نسخه را کامل نصب می‌کند.",
      ],
    },
  },
  {
    group: "rollback",
    texts: ["could not create a new backup directory under $RT_BACKUPS"],
    en: {
      what: "Backups are named by the time they are taken, to the second. No free name could be claimed in `backups/` — the disk is full, the folder is not writable, or names kept colliding. The operation that needed the backup says on the next line what it did next.",
      fix: [
        "Check free space with `df -h /etc`, and that `backups/` in the install directory is a writable directory.",
        "Run the command again.",
      ],
    },
    fa: {
      tr: "پوشهٔ پشتیبان جدیدی زیر ‹مسیر› ساخته نشد",
      what: "نام پشتیبان‌ها از زمان گرفتنشان تا دقت ثانیه ساخته می‌شود. هیچ نام آزادی در `backups/` گرفته نشد — دیسک پر است، پوشه قابل نوشتن نیست، یا نام‌ها پشت سر هم تکراری بودند. عملیاتی که به پشتیبان نیاز داشت در خط بعد می‌گوید چه کرد.",
      fix: [
        "فضای آزاد را با `df -h /etc` بررسی کنید و مطمئن شوید `backups/` در پوشهٔ نصب، پوشه‌ای قابل نوشتن است.",
        "فرمان را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "rollback",
    texts: ["backup ${BACKUP} was made for ${PANEL}, not ${PANEL}; refusing to restore it."],
    en: {
      what: "Every backup records the panel it was made on, and is only ever restored onto that panel: a page built for one panel's template engine cannot be served by another. Backups made before 1.3.0 count as 3X-UI backups. Nothing was changed.",
      fix: ["Choose a backup made on this panel: list the `backups/` folder in the install directory and use `row-template rollback --to <name>`."],
    },
    fa: {
      tr: "پشتیبان ‹پشتیبان› برای ‹پنل› ساخته شده، نه ‹پنل›؛ بازگردانده نمی‌شود.",
      what: "هر پشتیبان پنلی را که روی آن ساخته شده ثبت می‌کند و فقط روی همان پنل بازگردانده می‌شود: صفحه‌ای که برای موتور قالب یک پنل ساخته شده، در پنل دیگر ارائه نمی‌شود. پشتیبان‌های ساخته‌شده پیش از 1.3.0 پشتیبان 3X-UI به حساب می‌آیند. هیچ تغییری اعمال نشده است.",
      fix: ["پشتیبانی را انتخاب کنید که روی همین پنل ساخته شده: فهرست پوشهٔ `backups/` در پوشهٔ نصب را ببینید و از `row-template rollback --to <name>` استفاده کنید."],
    },
  },
  {
    group: "rollback",
    texts: [
      "backup artifact has no store match and no recorded template; defaulting to Row.",
      "backup artifact recorded template '$tpl_id' is not installed; defaulting to Row.",
    ],
    en: {
      what: "The backup's page is not byte-identical to any design of the current release — an older release made it — so rollback uses the design the backup records instead. This backup records none (older releases did not), or one this release does not ship, so Row is restored. The page is taken from the designs installed now; the backup's version number is restored, and your current branding is kept.",
      fix: ["Nothing to fix. To use another design afterwards, choose it from the manager (**2 — Reconfigure branding → 4 — Template**)."],
    },
    fa: {
      tr: "صفحهٔ پشتیبان با هیچ تمپلیتی در مخزن مطابقت ندارد و تمپلیتی هم ثبت نکرده؛ Row استفاده می‌شود. / تمپلیت ثبت‌شده در پشتیبان ('‹شناسه›') نصب نیست؛ Row استفاده می‌شود.",
      what: "صفحهٔ داخل پشتیبان بایت‌به‌بایت با هیچ تمپلیتی از نسخهٔ فعلی یکی نیست — نسخهٔ قدیمی‌تری آن را ساخته — پس بازگردانی به‌جای آن از تمپلیتی استفاده می‌کند که پشتیبان ثبت کرده است. این پشتیبان هیچ تمپلیتی ثبت نکرده (نسخه‌های قدیمی‌تر ثبت نمی‌کردند) یا تمپلیتی را ثبت کرده که این نسخه ندارد؛ پس Row بازگردانده می‌شود. صفحه از تمپلیت‌های نصب‌شدهٔ فعلی برداشته می‌شود، شمارهٔ نسخهٔ پشتیبان بازگردانده می‌شود و برندینگ فعلی شما حفظ می‌شود.",
      fix: ["کاری لازم نیست. اگر بعداً تمپلیت دیگری می‌خواهید، از منوی مدیریت انتخابش کنید (**2 — Reconfigure branding → 4 — Template**)."],
    },
  },

  // --- 1.3.0: verify ------------------------------------------------------------------
  {
    group: "verify",
    texts: ["templates were found outside the store at $RT_ROOT/$rel; run 'row-template verify' as root to move them."],
    en: {
      what: "Designs were found in the install directory but outside the template store, where an update from an earlier release could leave them. They are harmless but not used. `verify` only moves them when it runs as root.",
      fix: ["Run `row-template verify` as root: it moves them into `dist/templates/` and changes nothing else."],
    },
    fa: {
      tr: "تمپلیت‌هایی بیرون از مخزن در ‹پوشهٔ نصب›/‹مسیر› پیدا شد؛ برای جابه‌جا کردنشان `row-template verify` را با root اجرا کنید.",
      what: "تمپلیت‌هایی در پوشهٔ نصب اما بیرون از مخزن تمپلیت‌ها پیدا شد؛ جایی که به‌روزرسانی از نسخه‌های قبلی ممکن است آن‌ها را جا گذاشته باشد. بی‌خطرند اما استفاده نمی‌شوند. `verify` فقط وقتی با root اجرا شود آن‌ها را جابه‌جا می‌کند.",
      fix: ["`row-template verify` را با root اجرا کنید: آن‌ها را به `dist/templates/` منتقل می‌کند و چیز دیگری را تغییر نمی‌دهد."],
    },
  },
  {
    group: "verify",
    texts: ["template store is incomplete (${N_PRESENT} of $n_avail designs); missing:$missing. Run 'row-template update' to restore them."],
    en: {
      what: "Some of the designs this release ships are missing from the installation's template store. The live page keeps working; the missing designs cannot be chosen until they are restored. Run as root, `verify` downloads them from the installed release first, so this line means that was not possible.",
      fix: ["Run `row-template update` — it reinstalls every design."],
    },
    fa: {
      tr: "مخزن تمپلیت‌ها ناقص است (‹n› از ‹n› تمپلیت)؛ ناموجود: ‹شناسه‌ها›. برای بازگرداندنشان `row-template update` را اجرا کنید.",
      what: "برخی از تمپلیت‌هایی که این نسخه ارائه می‌کند در مخزن تمپلیت‌های نصب وجود ندارند. صفحهٔ زنده کار می‌کند؛ تا بازگردانده نشوند، تمپلیت‌های ناموجود قابل انتخاب نیستند. `verify` وقتی با root اجرا شود اول آن‌ها را از نسخهٔ نصب‌شده دانلود می‌کند؛ پس این خط یعنی این کار ممکن نبود.",
      fix: ["`row-template update` را اجرا کنید — همهٔ تمپلیت‌ها را دوباره نصب می‌کند."],
    },
  },
  {
    group: "verify",
    texts: ["the panel components are missing; run 'row-template update'."],
    en: {
      what: "On PasarGuard and Rebecca, `verify` checks the panel through the installer's companion files (`lib/transaction.sh`, `panels/`), and they are missing, so the panel could not be checked. This is a hard failure.",
      fix: ["Run `row-template update`, which installs them, then `row-template verify` again."],
    },
    fa: {
      tr: "اجزای پنل وجود ندارند؛ `row-template update` را اجرا کنید.",
      what: "روی PasarGuard و Rebecca، `verify` پنل را از طریق فایل‌های همراه نصب‌کننده (`lib/transaction.sh` و `panels/`) بررسی می‌کند و این فایل‌ها وجود ندارند، پس پنل بررسی نشد. این یک خطای جدی است.",
      fix: ["`row-template update` را اجرا کنید تا آن‌ها را نصب کند و بعد دوباره `row-template verify` را اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: [
      "${PANEL} was not detected on this host.",
      "the ${PANEL} configuration could not be read.",
    ],
    en: {
      what: "The panel this installation serves could not be found on the server, or its configuration (PasarGuard's `.env`, or Rebecca's subscription settings) could not be read. The page files are checked anyway.",
      fix: [
        "Run `verify` as root, on the server that runs the panel.",
        "Check the panel itself: `pasarguard status` or `rebecca status`. If it was removed, remove Row-Template too with `row-template uninstall`.",
      ],
    },
    fa: {
      tr: "‹پنل› روی این سرور پیدا نشد. / پیکربندی ‹پنل› خوانده نشد.",
      what: "پنلی که این نصب به آن سرویس می‌دهد روی سرور پیدا نشد، یا پیکربندی‌اش (فایل `.env` پنل PasarGuard یا تنظیمات اشتراک Rebecca) خوانده نشد. فایل‌های صفحه به هر حال بررسی می‌شوند.",
      fix: [
        "`verify` را با root و روی سروری که پنل روی آن است اجرا کنید.",
        "خود پنل را بررسی کنید: `pasarguard status` یا `rebecca status`. اگر پنل حذف شده، Row-Template را هم با `row-template uninstall` حذف کنید.",
      ],
    },
  },
  {
    group: "verify",
    texts: ["${PANEL} does not select the Row-Template page; activate it from the manager."],
    en: {
      what: "Row-Template is installed, but the panel does not select its page — it was never activated, or another page was chosen in the panel since. Subscribers see the panel's own page.",
      fix: ["Run `row-template` and choose **5 — Activate / Re-apply theme**. See [Activation](/docs/installation/activation/)."],
    },
    fa: {
      tr: "‹پنل› صفحهٔ Row-Template را انتخاب نمی‌کند؛ از منوی مدیریت فعالش کنید.",
      what: "Row-Template نصب است، اما پنل صفحه‌اش را انتخاب نمی‌کند — هرگز فعال نشده، یا از آن زمان صفحهٔ دیگری در پنل انتخاب شده است. مشترکان صفحهٔ خود پنل را می‌بینند.",
      fix: ["`row-template` را اجرا کنید و **5 — Activate / Re-apply theme** را انتخاب کنید. [فعال‌سازی](/docs/installation/activation/) را ببینید."],
    },
  },
  {
    group: "verify",
    texts: ["${PANEL}'s Row-Template page is out of step (see above); re-apply it from the manager (Activate)."],
    en: {
      what: "The panel selects Row-Template, but one of the checks just above failed — the page is missing from the panel's templates directory, differs from the generated one, or Row-Template's own files are damaged. This is a hard failure.",
      fix: ["Read the `panel …` line just above, then run `row-template` and choose **5 — Activate / Re-apply theme**. If Row-Template's files are damaged, run `row-template update` first."],
    },
    fa: {
      tr: "صفحهٔ Row-Template در ‹پنل› با بقیه هماهنگ نیست (بالا را ببینید)؛ از منوی مدیریت دوباره اعمالش کنید (Activate).",
      what: "پنل Row-Template را انتخاب کرده، اما یکی از بررسی‌های درست بالاتر رد شد — صفحه در پوشهٔ تمپلیت‌های پنل نیست، با صفحهٔ ساخته‌شده فرق دارد، یا فایل‌های خود Row-Template خراب‌اند. این یک خطای جدی است.",
      fix: ["خط `panel …` درست بالاتر را بخوانید، سپس `row-template` را اجرا کنید و **5 — Activate / Re-apply theme** را انتخاب کنید. اگر فایل‌های Row-Template خراب‌اند، اول `row-template update` را اجرا کنید."],
    },
  },
  {
    group: "verify",
    texts: ["the running ${PANEL} does not use the Row-Template page yet; restart the panel."],
    en: {
      what: "The files and settings are correct, but the running panel still uses its previous page. On PasarGuard this means the container was not recreated after `.env` changed.",
      fix: ["Restart the panel (`pasarguard restart`), then run `row-template verify` again."],
    },
    fa: {
      tr: "‹پنل›ِ در حال اجرا هنوز از صفحهٔ Row-Template استفاده نمی‌کند؛ پنل را ری‌استارت کنید.",
      what: "فایل‌ها و تنظیمات درست‌اند، اما پنلِ در حال اجرا هنوز از صفحهٔ قبلی‌اش استفاده می‌کند. روی PasarGuard یعنی کانتینر پس از تغییر `.env` دوباره ساخته نشده است.",
      fix: ["پنل را ری‌استارت کنید (`pasarguard restart`) و `row-template verify` را دوباره اجرا کنید."],
    },
  },

  // --- 1.3.0: uninstall ---------------------------------------------------------------
  {
    group: "uninstall",
    texts: [
      "the panel components are missing, so ${PANEL} cannot be reverted automatically; run 'row-template update' first.",
      "could not revert ${PANEL}.",
      "uninstall stopped before removing anything; the panel and Row-Template are unchanged.",
    ],
    en: {
      what: "On PasarGuard and Rebecca, uninstall first puts the panel back on the page it had before Row-Template, and only then removes Row-Template's files. The panel could not be reverted — the lines above say why — so uninstall stopped before removing anything. Both the panel and Row-Template are exactly as they were.",
      fix: [
        "If the installer's components are missing, run `row-template update`, then uninstall again.",
        "Otherwise fix the problem named above (for example a damaged `.env` block, or a panel that could not be restarted) and run `row-template uninstall` again.",
      ],
    },
    fa: {
      tr: "اجزای پنل وجود ندارند، پس ‹پنل› به‌صورت خودکار برگردانده نمی‌شود؛ اول `row-template update` را اجرا کنید. / ‹پنل› برگردانده نشد. / حذف پیش از پاک کردن هر چیزی متوقف شد؛ پنل و Row-Template تغییری نکرده‌اند.",
      what: "روی PasarGuard و Rebecca، حذف اول پنل را به صفحه‌ای که پیش از Row-Template داشت برمی‌گرداند و فقط بعد از آن فایل‌های Row-Template را پاک می‌کند. پنل برگردانده نشد — خطوط بالا علت را می‌گویند — پس حذف پیش از پاک کردن هر چیزی متوقف شد. پنل و Row-Template هر دو دقیقاً مثل قبل‌اند.",
      fix: [
        "اگر اجزای نصب‌کننده وجود ندارند، `row-template update` را اجرا کنید و دوباره حذف کنید.",
        "در غیر این صورت مشکلی را که در بالا نام برده شده برطرف کنید (مثلاً بلوک خراب در `.env` یا پنلی که ری‌استارت نشد) و `row-template uninstall` را دوباره اجرا کنید.",
      ],
    },
  },
  {
    group: "uninstall",
    texts: ["${PANEL}'s selection cannot be changed automatically here."],
    en: {
      what: "Uninstall cannot change the panel's page selection here — on Rebecca because its settings cannot be written (MySQL/MariaDB, or no `sqlite3`), on PasarGuard because `.env` could not be read — so it removes Row-Template's files and asks you to switch the page back yourself. Until you do, the panel points at a page that no longer exists.",
      fix: [
        "Rebecca: in the dashboard open **Settings → Subscription → Templates** and set **Subscription page template** back to `subscription/index.html` (Rebecca's own page) or your own page.",
        "PasarGuard: remove the `# >>> row-template` block from `/opt/pasarguard/.env`, then run `pasarguard restart`.",
      ],
    },
    fa: {
      tr: "انتخاب ‹پنل› اینجا به‌صورت خودکار تغییر نمی‌کند.",
      what: "حذف‌کننده اینجا نمی‌تواند صفحهٔ انتخاب‌شدهٔ پنل را تغییر دهد — در Rebecca چون تنظیماتش نوشته نمی‌شوند (MySQL/MariaDB یا نبود `sqlite3`)، در PasarGuard چون `.env` خوانده نشد — پس فایل‌های Row-Template را پاک می‌کند و از شما می‌خواهد صفحه را خودتان برگردانید. تا این کار را نکنید، پنل به صفحه‌ای اشاره می‌کند که دیگر وجود ندارد.",
      fix: [
        "Rebecca: در داشبورد **Settings → Subscription → Templates** را باز کنید و **Subscription page template** را به `subscription/index.html` (صفحهٔ خود Rebecca) یا صفحهٔ دلخواهتان برگردانید.",
        "PasarGuard: بلوک `# >>> row-template` را از `/opt/pasarguard/.env` حذف کنید و سپس `pasarguard restart` را اجرا کنید.",
      ],
    },
  },

  // --- 1.3.0: the command -------------------------------------------------------------
  {
    group: "cli",
    texts: [
      "panel registry: the 3xui adapter exists but could not be loaded",
      "panel registry: the pasarguard adapter exists but could not be loaded",
      "panel registry: the rebecca adapter exists but could not be loaded",
    ],
    en: {
      what: "One of the panel adapters under `panels/` in the install directory exists but could not be loaded — it is damaged or was edited. The command stops here.",
      fix: ["Re-run the installer to repair the installation; it replaces these files and keeps your configuration."],
    },
    fa: {
      tr: "فهرست پنل‌ها: آداپتور 3xui / pasarguard / rebecca وجود دارد اما بارگذاری نشد",
      what: "یکی از آداپتورهای پنل زیر `panels/` در پوشهٔ نصب وجود دارد اما بارگذاری نشد — خراب شده یا ویرایش شده است. فرمان همین‌جا متوقف می‌شود.",
      fix: ["برای تعمیر نصب، نصب‌کننده را دوباره اجرا کنید؛ این فایل‌ها را جایگزین می‌کند و پیکربندی شما را نگه می‌دارد."],
    },
  },

  // --- 1.3.0: internal checks of the panel layer ---------------------------------------
  {
    group: "safety",
    texts: [
      "refusing to write through a symlink: $RT_BACKUPS_V2",
      "could not create a temporary snapshot",
      "snapshot already exists: $final",
      "the new snapshot failed validation and was discarded",
      "refusing to stage a symlink: $panel/$f",
      "refusing to manifest a snapshot containing a symlink",
      "path cannot be represented in a manifest: $rel",
      "snapshot records two different formats (format file '$canon', meta '$legacy')",
      "unknown panel id: $panel",
      "no staged state for panel: $panel",
      "panel $panel: staged state has no files list",
      "panel write: no staging directory given",
      "panel write: unknown panel id: $panel",
      "panel write: state must be absent|empty|present, got '$state'",
      "panel write: mechanism must be db|env|api, got '$mech'",
      "panel write: was_running must be 0 or 1, got '$running'",
      "panel write: state=present requires a value",
      "panel write: empty placed-file path",
      "panel write: placed file is not a legal relative path: $p",
      "aux: unknown panel id: $panel",
      "aux: not a legal key: $key",
      "aux: panel $panel is not staged",
    ],
    en: {
      what: "Before activation changes anything on PasarGuard or Rebecca, it writes a snapshot of the panel's settings to `backups.v2/` in the install directory, with a manifest of every file in it. These are the snapshot writer's own checks. A few have a cause on the server — `backups.v2/` is a symbolic link, the disk is full, or a snapshot with the same name already exists; the rest guard the snapshot's format and should never appear. In every case activation stops before changing the panel.",
      fix: [
        "Check free space with `df -h /etc`, and that `backups.v2/` in the install directory is a real directory, not a link. Then activate again from the manager.",
        "If a message names a field (`state`, `mechanism`, `aux`, …), [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output.",
      ],
    },
    fa: {
      tr: "بررسی‌های نویسندهٔ عکس فوری: از طریق پیوند نمادین نوشته نمی‌شود / عکس فوری موقت ساخته نشد / عکس فوری از قبل وجود دارد / عکس فوری جدید در بررسی رد شد و کنار گذاشته شد / … و بررسی‌های قالب رکوردهای پنل (`panel write:`، `aux:`)",
      what: "فعال‌سازی پیش از هر تغییری روی PasarGuard یا Rebecca، از تنظیمات پنل یک عکس فوری در `backups.v2/` داخل پوشهٔ نصب می‌نویسد، همراه با فهرستی (manifest) از همهٔ فایل‌های آن. این‌ها بررسی‌های خودِ نویسندهٔ عکس فوری‌اند. چندتایشان علتی روی سرور دارند — `backups.v2/` پیوند نمادین است، دیسک پر است، یا عکس فوری‌ای با همان نام از قبل هست؛ بقیه از قالب عکس فوری محافظت می‌کنند و نباید هرگز دیده شوند. در همهٔ حالت‌ها فعال‌سازی پیش از تغییر پنل متوقف می‌شود.",
      fix: [
        "فضای آزاد را با `df -h /etc` بررسی کنید و مطمئن شوید `backups.v2/` در پوشهٔ نصب پوشهٔ واقعی است، نه پیوند. سپس دوباره از منوی مدیریت فعال‌سازی کنید.",
        "اگر پیام یک فیلد را نام می‌برد (`state`، `mechanism`، `aux` و…)، با خروجی کامل [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "safety",
    texts: [
      "transaction: RT_ROOT is unset; refusing to lock",
      "transaction: refusing a symlinked install root: $RT_ROOT",
      "transaction: could not create the lock directory: $dir",
      "transaction: refusing a symlinked lock directory: $dir",
      "transaction: refusing a symlinked lock file: $file",
      "transaction: fd 9 is already open; refusing to reuse the lock descriptor",
      "transaction: could not open the lock file: $file",
      "transaction: RT_PANEL_STAGE is unset; refusing to clear it",
      "transaction: refusing to clear /",
      "transaction: refusing to clear a symlinked stage: $d",
      "transaction: unexpected stage path (expected a .panel-stage directory): $d",
      "transaction: refusing to clear a stage outside the install root: $d",
      "transaction: could not clear the stage: $d",
    ],
    en: {
      what: "The activation transaction locks the installation and uses a scratch folder, `.panel-stage`, inside it. These checks refuse to lock or clear anything through a symbolic link, outside the install directory, or with a missing path. A link or a full disk can cause them; otherwise they should never appear. Activation stops before changing the panel.",
      fix: [
        "Make sure nothing under the install directory is a symbolic link and that the disk has free space, then activate again.",
        "If it repeats, [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output.",
      ],
    },
    fa: {
      tr: "تراکنش: بررسی‌های قفل و پوشهٔ کاری (`.panel-stage`) — قفل یا پاک‌سازی از طریق پیوند نمادین، بیرون از پوشهٔ نصب یا با مسیر خالی انجام نمی‌شود",
      what: "تراکنش فعال‌سازی روی نصب قفل می‌گیرد و از یک پوشهٔ کاری به نام `.panel-stage` داخل آن استفاده می‌کند. این بررسی‌ها اجازه نمی‌دهند چیزی از طریق پیوند نمادین، بیرون از پوشهٔ نصب یا با مسیر خالی قفل یا پاک شود. یک پیوند یا دیسک پر می‌تواند باعثشان شود؛ در غیر این صورت نباید هرگز دیده شوند. فعال‌سازی پیش از تغییر پنل متوقف می‌شود.",
      fix: [
        "مطمئن شوید هیچ چیز زیر پوشهٔ نصب پیوند نمادین نیست و دیسک فضای آزاد دارد، سپس دوباره فعال‌سازی کنید.",
        "اگر تکرار شد، با خروجی کامل [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "safety",
    texts: [
      "transaction: unknown state '$to'",
      "transaction: invalid transition $RT_TXN_STATE -> $to",
      "transaction: unknown panel id '${panel}' (known: $RT_PANEL_IDS)",
      "transaction: SOURCE is required",
      "transaction: panel '$panel' is not present on this host (status $rc)",
      "transaction: panel '$panel' cannot be identified in this build (status $rc)",
      "transaction: detection failed for panel '$panel' (status $rc)",
      "transaction: capabilities are unavailable for panel '$panel' (status $rc)",
      "transaction: panel '$panel' reported an unknown capability '$tok'",
      "transaction: panel '$panel' does not declare the required capability '$need'",
      "transaction: panel '$panel' declares no apply capability (needs one of: $RT_TXN_REQUIRED_APPLY_CAPABILITIES)",
      "transaction: could not capture the state of panel '$panel' (status $rc)",
    ],
    en: {
      what: "The activation transaction's checks before it changes anything: the panel must be present and identified, its adapter must declare the capabilities activation needs, and its current settings must be read for the snapshot. `could not capture the state` has a cause on the server — the adapter's own message just above names it (for example Rebecca's database cannot be read). The others guard the engine itself. Activation stops, and nothing is changed.",
      fix: [
        "Read the `panel …` line just above, if there is one, and fix what it names.",
        "Otherwise [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output.",
      ],
    },
    fa: {
      tr: "تراکنش: بررسی‌های پیش از تغییر — شناسهٔ پنل، حضور پنل روی سرور، قابلیت‌های اعلام‌شدهٔ آداپتور، و خواندن وضعیت فعلی پنل برای عکس فوری",
      what: "بررسی‌های تراکنش فعال‌سازی پیش از هر تغییری: پنل باید موجود و شناسایی‌شده باشد، آداپتورش باید قابلیت‌هایی را که فعال‌سازی لازم دارد اعلام کند، و تنظیمات فعلی‌اش باید برای عکس فوری خوانده شود. `could not capture the state` علتی روی سرور دارد — پیام خود آداپتور درست بالاتر آن را نام می‌برد (مثلاً پایگاه‌دادهٔ Rebecca خوانده نمی‌شود). بقیه از خود موتور تراکنش محافظت می‌کنند. فعال‌سازی متوقف می‌شود و هیچ تغییری اعمال نمی‌شود.",
      fix: [
        "اگر خط `panel …` در بالا هست، آن را بخوانید و مشکلی را که نام می‌برد برطرف کنید.",
        "در غیر این صورت با خروجی کامل [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues).",
      ],
    },
  },
  {
    group: "safety",
    texts: [
      "panel pasarguard: malformed selection.state",
      "panel pasarguard: malformed panel meta",
      "panel pasarguard: mechanism is '$mech', expected 'env'",
      "panel pasarguard: malformed files record",
      "panel pasarguard: refusing to restore: the record lists a file this adapter never places: $f",
      "panel pasarguard: malformed block record",
      "panel pasarguard: malformed root record",
      "panel pasarguard: malformed dir record",
      "panel rebecca: subscription_page_template cannot have been absent (state '$st')",
      "panel rebecca: malformed dir_state record",
      "panel rebecca: malformed selection.state",
      "panel rebecca: malformed panel meta",
      "panel rebecca: mechanism is '$mech', expected 'db'",
      "panel rebecca: malformed files record",
      "panel rebecca: refusing to restore: the record lists a file this adapter never places: $f",
      "panel rebecca: malformed root record",
    ],
    en: {
      what: "A snapshot of the panel's settings is read back before it is restored, and every record in it must be exactly what the adapter wrote. This one is not — it was edited or damaged, or comes from something other than Row-Template — so it is not restored at all rather than half-restored. The panel is left as it is.",
      fix: [
        "Do not edit files under `backups.v2/`.",
        "Check the panel's selection yourself (PasarGuard: the `row-template` block in `/opt/pasarguard/.env`; Rebecca: **Settings → Subscription → Templates**), then run `row-template verify`.",
      ],
    },
    fa: {
      tr: "پنل pasarguard / rebecca: رکوردهای عکس فوری نامعتبرند (`selection.state`، اطلاعات پنل، فهرست فایل‌ها، بلوک، ریشه یا پوشه) یا فایلی را نام می‌برند که آداپتور هرگز نمی‌گذارد",
      what: "عکس فوری تنظیمات پنل پیش از بازگردانی دوباره خوانده می‌شود و هر رکورد آن باید دقیقاً همان باشد که آداپتور نوشته است. این یکی نیست — ویرایش یا خراب شده، یا از جایی غیر از Row-Template آمده — پس به‌جای بازگردانی نیمه‌کاره، اصلاً بازگردانده نمی‌شود. پنل همان‌طور که هست می‌ماند.",
      fix: [
        "فایل‌های زیر `backups.v2/` را ویرایش نکنید.",
        "انتخاب پنل را خودتان بررسی کنید (PasarGuard: بلوک `row-template` در `/opt/pasarguard/.env`؛ Rebecca: **Settings → Subscription → Templates**) و `row-template verify` را اجرا کنید.",
      ],
    },
  },
  {
    group: "safety",
    texts: [
      "panel pasarguard: SOURCE is required",
      "panel pasarguard: refusing a symlinked SOURCE",
      "panel pasarguard: SOURCE is not a regular file: $src",
      "panel pasarguard: SOURCE is outside $RT_ROOT",
      "panel pasarguard: unknown verification mode '$mode'",
      "panel rebecca: SOURCE is required",
      "panel rebecca: refusing a symlinked SOURCE",
      "panel rebecca: SOURCE is not a regular file: $src",
      "panel rebecca: SOURCE is outside $RT_ROOT",
      "panel rebecca: unknown verification mode '$mode'",
      "panel dispatch: no dispatch arm for implementation '$impl' verb '$verb'",
      "panel $verb: unknown panel id '${panel}' (known: $RT_PANEL_IDS)",
      "panel install_template: SOURCE is required",
      "panel verify: takes exactly PANEL MODE, got $# arguments",
      "panel verify: MODE must be static|live, got '${2:-}'",
      "panel restore_state: SNAPSHOT is required",
    ],
    en: {
      what: "Argument checks of the panel interface: the page given to an adapter must be a regular file inside the install directory, never a link, and every call must name a known panel and operation. Row-Template's own commands always pass valid arguments, so these should never appear; the operation stops without changing anything.",
      fix: ["[Report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output and the command you ran."],
    },
    fa: {
      tr: "بررسی‌های ورودی رابط پنل: منبع (SOURCE) باید فایل معمولی داخل پوشهٔ نصب باشد و پیوند نمادین نباشد؛ هر فراخوانی باید پنل و عملیات شناخته‌شده‌ای را نام ببرد",
      what: "بررسی‌های ورودی رابط پنل: صفحه‌ای که به آداپتور داده می‌شود باید فایل معمولی داخل پوشهٔ نصب باشد و هرگز پیوند نباشد، و هر فراخوانی باید پنل و عملیات شناخته‌شده‌ای را نام ببرد. فرمان‌های خود Row-Template همیشه ورودی معتبر می‌دهند، پس این پیام‌ها نباید هرگز دیده شوند؛ عملیات بدون هیچ تغییری متوقف می‌شود.",
      fix: ["با خروجی کامل و فرمانی که اجرا کردید [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues)."],
    },
  },
  {
    group: "safety",
    texts: [
      "panel 3xui: the stored selection contains a newline and cannot be recorded exactly",
      "panel 3xui: SOURCE is required",
      "panel 3xui: refusing a symlinked SOURCE: $src",
      "panel 3xui: SOURCE is not a regular file: $src",
      "panel 3xui: SOURCE is outside the Row-Template root ($RT_ROOT): $src",
      "panel 3xui: unknown verification mode '$mode'",
      "panel 3xui: the artifact is missing: $RT_DIST",
      "panel 3xui: the artifact failed structural validation",
      "panel 3xui: the recorded checksum is unreadable",
      "panel 3xui: the artifact does not match its recorded checksum",
      "panel 3xui: cannot read the panel selection",
      "panel 3xui: subThemeDir is '$cur', expected '$RT_ROOT'",
      "panel 3xui: the snapshot's selection.state is malformed",
      "panel 3xui: selection.state must be absent|empty|present, got '$st'",
      "panel 3xui: the snapshot's panel meta is malformed",
      "panel 3xui: mechanism is '$mech', expected 'db'",
      "panel 3xui: was_running must be 0|1, got '$was_running'",
      "panel 3xui: the snapshot's files record is malformed",
      "panel 3xui: refusing to restore: this panel places no file, but the snapshot lists one",
      "panel 3xui: state=present but the selection value is unreadable",
      "panel 3xui: cannot read the selection back after restoring",
      "panel 3xui: after restoring, the selection state is '$now', expected '$st'",
      "panel 3xui: cannot read the selection value back after restoring",
      "panel 3xui: after restoring, subThemeDir is not the recorded value",
    ],
    en: {
      what: "Checks inside the 3X-UI adapter of the panel interface. In 1.3.0 the `row-template` commands set up 3X-UI directly — they write `subThemeDir` themselves, exactly as before — and do not go through this adapter, so these messages are not printed by any command. They are listed here because they are in the installer's source.",
      fix: ["If you ever see one, [report it](https://github.com/iitzSeriZdev/Row-Template/issues) with the full output and the command you ran."],
    },
    fa: {
      tr: "پنل 3xui: بررسی‌های داخلی آداپتور 3X-UI (منبع، فایل صفحه و چک‌سامش، خواندن `subThemeDir`، و رکوردهای عکس فوری)",
      what: "بررسی‌های داخل آداپتور 3X-UI در رابط پنل. در 1.3.0 فرمان‌های `row-template`، 3X-UI را مستقیم تنظیم می‌کنند — دقیقاً مثل قبل خودشان `subThemeDir` را می‌نویسند — و از این آداپتور استفاده نمی‌کنند؛ پس هیچ فرمانی این پیام‌ها را چاپ نمی‌کند. فقط چون در سورس نصب‌کننده هستند اینجا آمده‌اند.",
      fix: ["اگر روزی یکی از آن‌ها را دیدید، با خروجی کامل و فرمانی که اجرا کردید [گزارش دهید](https://github.com/iitzSeriZdev/Row-Template/issues)."],
    },
  },
];
