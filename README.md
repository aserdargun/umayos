# UMAY OS · umayos.org

UMAY OS’un Türkçe ve İngilizce public manifesto/mimari sitesi. **Unified Multi-Agent Advisor for Yield.** Ürün runtime’ı, gerçek kurum entegrasyonu veya çalışan Scientist servisi değildir.

Astro 7.3.5, TypeScript, statik çıktı ve sade CSS. JavaScript yalnız mimari sekmeleri, sentetik örnek adımları ve dil değişiminde durum korumayı geliştirir. Ana içerik ve üç mimari görünümü JavaScript olmadan okunur. Model API’si, backend, auth, analytics veya uzaktan font çağrısı yoktur.

## Kurulum ve geliştirme

Node 24 (`.nvmrc`) ve npm kullanın. Astro’nun resmî minimumu Node 22.12.0; doğrulanan ortam Node 24.19.0 / npm 11.9.0’dır.

```sh
npm ci
npm start
```

`npm start` (veya `npm run start`) geliştirme sunucusunu arka planda başlatır; terminali kullanmaya devam edebilirsiniz. Siteyi `http://127.0.0.1:4321/` adresinden, İngilizce sürümünü `/en/` yolundan açın. Yerel başlatma yalnız bu bilgisayarda dinler ve dosya değişikliklerini otomatik yansıtır.

```sh
npm run status        # Sunucunun adresi ve durumu
npm run logs          # Sunucu günlükleri
npm run logs -- --follow  # Günlükleri canlı izle; Ctrl+C izlemeyi bitirir
npm run stop          # Bu projenin geliştirme sunucusunu durdur
```

`start` tekrar çalıştırıldığında mevcut sunucunun adresini gösterir; ikinci bir süreç açmaz. Sunucu zaten durmuşsa `stop` sorunsuz tamamlanır. Yeniden başlatmak için `npm run stop`, ardından `npm start` kullanın. Bu komutları proje dizininde çalıştırın.

Port doluysa yeni bir port seçin: `npm start -- --port 4331`; CLI'nin yazdığı adresi kullanın. `stop` port numarasından bağımsız olarak bu projeye ait kayıtlı sunucuyu durdurur. Ön planda geliştirme ve ağ erişimi için `npm run dev` kullanılabilir; standart masaüstü terminalinde Ctrl+C ile durdurulur, ajan ortamında Astro otomatik arka plana alabilir. CLI başlatıcımız Astro telemetrisini kapatır.

Başlıktaki güneş/ay düğmesi açık ve karanlık tema arasında geçiş yapar. İlk açılışta sistem tercihi izlenir; elle seçim yerel tarayıcıda saklanır, yeniden yüklemede ve TR/EN geçişinde korunur. Tema, Umay Ana logosunu, favicon, Apple ikonu ve manifesti birlikte değiştirir. Gece mavisi hero ve anlatı bantları iki temada da marka kimliğini korur; okuma alanları, mimari ve kanıt tablosu seçilen temaya uyarlanır. JavaScript kapalıyken sistem teması ve bütün içerik okunabilir.

## Kontroller

```sh
npm run check          # Astro + TypeScript
npm run build          # dist/ statik çıktı
npm run test:content   # TR/EN içerik, pinler, hesap ve yerel link/asset kontrolü
npx playwright install chromium  # sistem Chromium yoksa bir kez
npm run test:e2e       # dört genişlik, TR/EN, durum, klavye, a11y, JS kapalı, 404
npm run validate      # bütün kabul sırası
npm run prepare:release # doğrulanmış dist/ içine commit kimliğini ekle
PLAYWRIGHT_BASE_URL=https://<azure-host> npm run test:e2e # canlı site kabulü
```

Playwright sistemde `/usr/bin/chromium` varsa onu kullanır. Alternatif binary için `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` verilebilir. CI, lockfile’daki Playwright sürümünün Chromium’unu kurar. Test preview’si yalnız 127.0.0.1:4327 kullanır, koşucu başlatıp kapatır. Bu portun boş olması gerekir. Sistem veya uygulama servisleri gerekmez.

## Statik çıktı ve yayın

```sh
npm run build
npm run preview
```

Yayın hedefi `umayos subscription` içindeki `rg-umayos-org / swa-umayos-org`, **West Europe / Free** Azure Static Web App'tir. `.github/workflows/deploy-swa-umayos-org.yml`, `main` değişikliklerinde Node 24 ile bütün kabul sırasını çalıştırır; ardından doğrulanmış `dist/` çıktısını yükler. Ayrıntılar ve yeniden yayın sözleşmesi: [DEPLOYMENT](docs/DEPLOYMENT.md).

`public/staticwebapp.config.json` gerçek HTTP 404'ü `/404.html` ile sunar; AVIF/WebP/font/CSV/manifest MIME tiplerini tanımlar. `/release.json` yayındaki commit ve workflow kimliğini verir. Canonical ve hreflang hedefi `https://umayos.org` olarak korunur; özel alan adı ve DNS bağlantısı ayrıca yapılır.

## İçerik ve görseller

- `src/data/site.ts`: bütün TR/EN içerik, public kaynak kimlikleri, pinler, inceleme tarihi. Dil eşliği otomatik kontrol edilir.
- `src/data/synthetic.ts` ve `public/data/synthetic-vibration-v1.csv`: altı elle tanımlanmış sentetik titreşim örneği; deterministik hesap. Gerçek cihaz/kurum verisi değil.
- `src/components/`: her anlatı bölümü ayrı Astro bileşeni. `src/scripts/interactions.ts`: küçük, bağımsız istemci kodu.
- `design/concepts/`: yedi bölüm ve iki mobil Image Gen referansı; sayfaya gömülmez.
- `design/originals/`: üç ayrı Image Gen üretim görseli. `public/assets/`: 22 AVIF/WebP responsive türev. `npm run assets` mevcut orijinallerden aynı türevleri yeniden üretir, çevrimiçi görsel üretimi yapmaz.
- `design/IMAGE_PROMPTS.md`, `asset-inventory.json`, `optimized-assets.json`: ilk üretim promptları, kavramsal durum, TR/EN alt metin, kullanım ve optimize dosyalar.
- `public/umay-icons/light/` ve `dark/`: seçilmiş Umay Ana ikon seti; özgün PNG/ICO baytları korunur. Köken ve entegrasyon: `design/brand/README.md`.
- Inter Variable, yerelden sunulur; SIL OFL 1.1 metni `public/fonts/Inter-OFL.txt` içinde. Font lisansı proje lisansı değildir.

Kullanıcının seçtiği açık/koyu Umay Ana ikonları navbar, footer, favicon, Apple/manifest ve sosyal kartta kullanılır. Profil yeniden çizilmedi veya renklendirilmedi. Proje lisansı kendiliğinden seçilmedi.

Tasarım kararları: [SITE_BRIEF](docs/SITE_BRIEF.md). Kaynak kapsamı: [CONTENT_SOURCES](docs/CONTENT_SOURCES.md). Gerçek kontrol kanıtı ve sınırlar: [VALIDATION](docs/VALIDATION.md).
