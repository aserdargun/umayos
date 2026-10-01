# Public sources and content scope

Kontrol tarihi: **1 Ekim 2026**. Kaynaklar salt okunur incelendi; uygulamaları bu anlatı sitesinin çalışma bağımlılığı değildir.

| Kaynak | İncelenen pin | Kullanılan kapsam |
| --- | --- | --- |
| [aserdargun/aos](https://github.com/aserdargun/aos) | `ed6e857b0e61e9c19c8ba63933e2cc9f318fe444` | README: yerel S1/S2, typed yürütme, politika, input ownership, registry, knowledge/skill, GPU ve kabul sınırları |
| [aserdargun/ai-scientist](https://github.com/aserdargun/ai-scientist) | `67258cdef33032c9a49eeae31c2e2ba26a98ca17` | README ve AOS entegrasyon notu: bağımsız çekirdek, Director/yerel provider, sandbox, hesap/değerlendirme, deney kaydı ve tamamlanmamış kabul |

Native `git ls-remote` ile iki public HEAD’in bu pinlere eşit olduğu doğrulandı. Pinli temiz kaynak checkout’larındaki README’ler incelendi. Bu, Git okuma ve kaynak kimliği kontrolüdür; upstream uygulamaların testleri veya birleşik UMAY runtime kabulü çalıştırılmış değildir. Aynı adlı üçüncü taraf Scientist projesi kaynak olarak kullanılmadı.

UMAY’ın son ürün yönü ve sekiz manifesto ilkesi, kullanıcının sağladığı kamuya uygun mimari özet üzerinden yeniden yazıldı. Core–Scientist birleşimi, SWAPP kabulü, sürekli eğitim ve broker baseline uyumu tamamlanmış gösterilmez. Özel yerel belge ve özgün ikon alanlarına bu buluttan erişilemedi; okunmuş oldukları iddia edilmez ve kopyaları eklenmez.

## Framework ve font

- [Astro deployment](https://docs.astro.build/en/guides/deploy/) ve [i18n routing](https://docs.astro.build/en/guides/internationalization/). Doğrudan docs HTTP erişimi ortam proxy’sinde 403 ile reddedildi. Aynı resmî rehberlerin `withastro/docs` public Git kaynağı okundu; kontrol edilen docs HEAD: `7584a722f31dbecde013bee016a642830f9d5c7c`. `src/content/docs/en/guides/deploy/index.mdx` ve `internationalization.mdx` kullanıldı.
- npm registry’den Astro **7.3.5** ve engine koşulları doğrulandı. Node >=22.12.0; seçilen Node 24. TypeScript **5.9.3**, Playwright **1.63.0** ve tüm paket sürümleri lockfile ile sabit.
- `@fontsource-variable/inter` **5.3.0**, npm metadata ve paket LICENSE: **SIL OFL 1.1**. Latin Extended Türkçe karakterleri yerelden sunulur. Proje lisansı seçilmedi.

## Sentetik örnek

Altı elle tanımlanan değer: 2.0, 2.2, 2.1, 2.5, 3.2, 3.4 mm/s RMS. Zamanlar 1–6 Eylül 2026, günlük 12:00 UTC. Hesap sürümü `vibration-window-mean v1`; ilk ortalama 2.10, son ortalama 3.03333…, göreli artış 44.44444…%. Ekran yuvarlaması iki/tek ondalıkla yapılır. Bunlar gerçek tesis verisi, gerçek arıza tanısı, Scientist servis çıktısı veya UMAY performans ölçümü değildir.

## Görseller

Dokuz bölüm/mobil konsepti ve üç ayrı üretim asset’i yerleşik Image Gen aracıyla üretildi. Araç model sürümü bildirmedi. Görseller metaforiktir; metin/topoloji/gerçek UI üretim asset’lerine basılmadı. Promptlar, alt metinler ve dosyalar `design/` altında izlenebilir. Sosyal kart metni üretim görselinin bir türevi üzerine yerel olarak dizildi. Umay Ana kaynak ikonu mevcut olmadığı için marka türevleri geçici tipografik işarettir.
