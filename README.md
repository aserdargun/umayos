# UMAY OS · umayos.org

UMAY OS’un Türkçe ve İngilizce public manifesto/mimari sitesi. **Unified Multi-Agent Advisor for Yield.** Ürün runtime’ı, gerçek kurum entegrasyonu veya çalışan Scientist servisi değildir.

3 Ekim 2026 çerçevesi: her insan çalışan için izole Linux container alanı; bu kapsamda AOS Core, SWAPP web uygulaması, AI-Scientist ve diğer eylemciler. Tüm iş işlemleri container dışında kalıcı loga bağlanır. Katma değeri seçilen ve incelenen kayıtlar skill, RAG ve yerel modeller için fine-tune adaylarına dönüşür. System 1/Operator ve System 2/Supervisor ayrı profiller taşır; Unsloth LoRA/QLoRA uyumu model bazında sınanır. Mimari değişiklikler güçlü büyük dil modelleriyle ayrı geliştirme alanında hazırlanır; karar, diff, test ve rollback kanıtıyla insan onayından geçer. Sistem başka yerel uzman eylemcilerin sürümlü kayıt/adaptörlerle eklenmesine açıktır. Kalite, süre ve maliyet birlikte izlenir. Yeni AOS/AI-Scientist push karşılaştırması: [kaynak incelemesi](docs/UPSTREAM_REVIEW_2026-10-03.md).

Claude/ChatGPT için [inşa kaynakları ve okuma sırası](docs/implementation/README.md), [aşamalı plan](docs/implementation/PLAN.md) ve [başlangıç/devralma promptu](docs/implementation/START_HERE.md) hazırdır. Site `/resources/umayos-implementation.md` yolunda bu yedi belgenin tek Markdown paketini derleme sırasında üretir; Gelişim bölümünden indirilebilir. Bu paket mimari ve kabul sözleşmesidir; özel SWAPP kodu, gerçek izler veya eğitilmiş ağırlıklar içermez.

Astro 7.3.5, TypeScript, statik çıktı ve sade CSS. JavaScript tema seçimini, mimari sekmelerini, sentetik örnek adımlarını, bölüm takibini ve dil değişiminde durum korumayı geliştirir. Ana içerik ve üç mimari görünümü JavaScript olmadan okunur. Model API’si, backend, auth, analytics veya uzaktan font çağrısı yoktur.

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

`public/staticwebapp.config.json` gerçek HTTP 404'ü `/404.html` ile sunar; AVIF/WebP/font/CSV/manifest MIME tiplerini tanımlar. `/release.json` yayındaki commit ve workflow kimliğini verir. Canonical, hreflang ve özel alan adı `https://umayos.org` adresidir. IHS'deki kök A kaydı bu Azure kaynağının doğrulanmış `stableInboundIP` değeri `20.82.12.44` adresine yönlenir; kök TXT kaydı Azure sahiplik doğrulamasını sağlar. DNS ve HTTPS kontrol sırası [DEPLOYMENT](docs/DEPLOYMENT.md) içinde yer alır.

## İçerik ve görseller

- `src/data/site.ts`: bütün TR/EN içerik, public kaynak kimlikleri, pinler, inceleme tarihi. Dil eşliği otomatik kontrol edilir.
- `src/data/synthetic.ts` ve `public/data/synthetic-vibration-v1.csv`: altı elle tanımlanmış sentetik titreşim örneği; deterministik hesap. Gerçek cihaz/kurum verisi değil.
- `src/components/`: her anlatı bölümü ayrı Astro bileşeni. `src/scripts/interactions.ts`: küçük, bağımsız istemci kodu.
- `design/concepts/v3/`: güncel yedi bölümün Image Gen tasarım referansları; sayfaya gömülmez. Önceki referanslar tasarım geçmişi olarak korunur. Güncel kararlar: `design/REDESIGN_V3.md`.
- `design/originals/`: üç ayrı Image Gen üretim görseli. `public/assets/`: 22 AVIF/WebP responsive türev. `npm run assets` mevcut orijinallerden aynı türevleri yeniden üretir, çevrimiçi görsel üretimi yapmaz.
- `design/IMAGE_PROMPTS.md`, `asset-inventory.json`, `optimized-assets.json`: ilk üretim promptları, kavramsal durum, TR/EN alt metin, kullanım ve optimize dosyalar. Güncel bölüm konseptleri: `design/IMAGE_PROMPTS_V3.md`.
- `public/umay-icons/light/` ve `dark/`: seçilmiş Umay Ana ikon seti; özgün PNG/ICO baytları korunur. Köken ve entegrasyon: `design/brand/README.md`.
- Inter Variable, yerelden sunulur; SIL OFL 1.1 metni `public/fonts/Inter-OFL.txt` içinde. Font lisansı proje lisansı değildir.
- `public/assets/umay-reel.mp4`: 2560×1440, 15 sn, H.264 + AAC stereo (32 kHz) açılış animasyonu; hero ambleminin çift tıklamasıyla sesli açılır. `.mp4` ve `.vtt` MIME tipleri `public/staticwebapp.config.json` içinde tanımlıdır.

Kullanıcının seçtiği açık/koyu Umay Ana ikonları navbar, footer, favicon, Apple/manifest ve sosyal kartta kullanılır. Profil yeniden çizilmedi veya renklendirilmedi. Proje lisansı kendiliğinden seçilmedi.

V3 tasarımında Umay Ana profili açılışın odağıdır. Beş bölüm bağlantısı ve okuma çizgisi, iki sütunlu manifesto, tam genişlikte Scientist adımları ve telefona özel grafik geometrisi bütün içeriği daha rahat gezilebilir kılar. Renkler ve özgün ikon dosyaları korunur.

Hero’daki büyük amblem dekoratif bir görseldir ve `aria-hidden` kalır. Amblemin **iki kez tıklanması** `public/assets/umay-reel.mp4` açılış animasyonunu **sesli** oynatan modal bir `<dialog>` açar; `play()` doğrudan tıklama/double-click kullanıcı aktivasyonu içinde çağrıldığı için otomatik oynatma engeline takılmaz ve öğe hiçbir zaman sessize alınmaz (`muted` işareti ve özelliği yoktur). Klavye ve dokunmatik için amblemin altındaki etiketli düğme aynı işi yapar: `dblclick` yalnız fare içindir. `preload="none"` sayesinde 4,2 MB’lık dosya sayfa açılışında indirilmez. `Escape`, kapatma düğmesi ve arka plana tıklama kapatır; kapanışta video durdurulup başa sarılır. JavaScript kapalıyken düğme gizli kalır ve anlatı aynen okunur. Diyalog kapatıyken sayfa dışı bırakıldığı için video öğesi erişilebilirlik ağacına girmez ve axe kapısı etkilenmez. Açıklama satırları `src/data/site.ts` içinde TR/EN eşlidir; altyazı izleri `public/assets/umay-reel.{tr,en}.vtt` ile gelir.

Tasarım kararları: [SITE_BRIEF](docs/SITE_BRIEF.md). Kaynak kapsamı: [CONTENT_SOURCES](docs/CONTENT_SOURCES.md). Gerçek kontrol kanıtı ve sınırlar: [VALIDATION](docs/VALIDATION.md).
