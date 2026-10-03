# UMAY OS — İnşa kaynak paketi

Sürüm: **0.2.0** · Karar tarihi: **3 Ekim 2026** · Durum: **kamuya açık mimari ve uygulama planı**.

UMAY OS, sade bir Linux sistemi üzerinde çalışan, AOS tabanlı Core tarafından yönetilen ve şirketin SWAPP uygulamasını bilen uzman eylemcilerden oluşan bir danışmanlık katmanıdır. İlk uzman, AI-Scientist tabanında SWAPP dijital ikiz verileriyle clustering, anomaly detection ve tekrarlanabilir deney düzenekleri geliştirir. Günlük eylemciler açık ağırlık modeller kullanır; kapalı kaynak güçlü dil modelleri mimari, kod geliştirme, öğretmen verisi ve eğitim düzenleme hattını destekler. Şirketin verisi, SWAPP kullanım yöntemleri, özel uygulama kodu, RAG corpus/vektörleri ve LoRA adaptörleri şirket sınırında kalır.

**Modeller değişir. Deneyim kalır. Karar insanda kalır.** Öğrenme, incelenmiş deneyimden sürümlü adaylar üretmek ve ölçerek terfi ettirmektir. Üretim modeli kendini denetimsiz değiştirmez. RAG kaynak getirir; LoRA destekli bir temel modelin davranışını eğitimle uyarlayabilir. İkisi aynı işlem değildir.

Bu paket uygulamaya başlamak için hazırlanmıştır. `umayos` deposu manifesto sitesidir; burada Core, SWAPP bağlantısı, eğitim hattı veya Scientist runtime'ı kurulmuş değildir. Belgelerdeki yollar, sözleşmeler ve eşikler **hedef tasarımdır**. Başarı ancak ilgili kabul kanıtıyla kaydedilir.

## Okuma sırası

| Belge | Kullanımı |
| --- | --- |
| [Mimari](ARCHITECTURE.md) | Linux, AOS Core, SWAPP, eylemciler, öğretmenler; sahiplik ve güven sınırları |
| [Sözleşmeler](CONTRACTS.md) | İş, iz, veri, deney, eylemci/model, maliyet ve kanıt kayıtları |
| [Öğrenme](LEARNING.md) | İnsan izinden RAG/skill/LoRA'ya; veri ayrımı, uyumluluk, terfi ve geri alma |
| [İlk Scientist dilimi](SCIENTIST.md) | Dijital ikizlerden clustering/anomali deneyleri ve bağımsız değerlendirme |
| [Uygulama planı](PLAN.md) | Bağımlılık sırası, somut backlog, kabul kapıları ve maliyet ölçümü |
| [Claude / ChatGPT başlangıcı](START_HERE.md) | Doğrudan kullanılacak başlangıç promptu, çalışma kuralları ve kalıcı devir kaydı |

## Kaynak kimlikleri ve kullanım sınırı

3 Ekim 2026 tarihli kaynak incelemesi aşağıdaki HEAD'leri doğruladı. Ayrıntı ve erişim kanıtı: [kaynak kapsamı](../CONTENT_SOURCES.md).

| Kaynak | Pin / rol |
| --- | --- |
| [aserdargun/aos](https://github.com/aserdargun/aos/tree/ed6e857b0e61e9c19c8ba63933e2cc9f318fe444) | `ed6e857b0e61e9c19c8ba63933e2cc9f318fe444` — UMAY Core için kontrollü türev tabanı |
| [aserdargun/ai-scientist](https://github.com/aserdargun/ai-scientist/tree/67258cdef33032c9a49eeae31c2e2ba26a98ca17) | `67258cdef33032c9a49eeae31c2e2ba26a98ca17` — ilk bilimsel uzman için kontrollü türev tabanı |
| [SWAPP](https://swapp.org.tr) | Kamuya açık ürün anlatısı; şirketin özel frontend/backend sözleşmesi veya erişim yetkisi değildir |

İki GitHub deposu public erişilebilirdir; incelenen README'ler proje lisansının seçilmediğini bildirir. GitHub kayıtlarında `fork: false`, `parent: null` bulunmuştur. Dolayısıyla burada dış bir “orijinal projenin” fork zinciri veya açık kaynak lisansı varmış gibi sunulmaz. **Kontrollü UMAY türevleri oluşturmak kullanıcının ürün kararıdır;** kaynak kodunun, bağımlılıkların, model ağırlıklarının, verinin ve dağıtımın hak envanteri ilk aşama işidir. Aynı isimli başka AI-Scientist projeleri bu tabanın yerine geçmez.

## Sabit ürün kararları

1. Linux temel işletim sistemidir; UMAY OS bir Linux dağıtımı veya kernel geliştirme iddiası değildir. İlk kurulum tek makinede başlayabilir; model eğitimi için uygun donanım ayrıca ölçülür.
2. AOS Core işleri, politika denetimini, araçları, model kaynaklarını ve GUI sahipliğini yönetir. Uzman eylemciler belirli yetenek ve sonuç sözleşmelerine uyar.
3. SWAPP bir web uygulamasıdır. Core onun izinli oturumunu kullanır. “AOS üzerinde SWAPP”, frontend/backend'in AOS içine taşınması anlamına gelmez; uygulama servisleri kendi sınırlarını korur.
4. Şirkete özel `swapp-backend` ve `swapp-frontend` geliştirme sırasında ayrıca teslim edilecektir. Bugün özel kaynak kodu, gerçek API şeması, kimlik modeli, veri örneği ve çalıştırma komutu bilinmiyor.
5. İnsan kullanımı ancak izinli ve amaçla sınırlı iz toplama üzerinden öğrenme adayı olur. Her kullanıcı eylemi doğru örnek değildir; çalışanın kişisel performansını puanlamak ürün hedefi değildir.
6. Açık ağırlık işletim modelleri ile kapalı kaynak öğretmen/geliştirme modelleri farklı yetki ve maliyet alanlarıdır. Öğretmen doğrudan canlı GUI'ye, üretim verisine veya terfi yetkisine sahip olmaz.
7. Bütün geliştirme ve işletim denemeleri maliyet defterine bağlanır. Tahmin, bütçe rezervasyonu ve gerçekleşen maliyet ayrı tutulur; eksik maliyet sıfır sayılmaz.
8. UMAY okur, analiz eder, önerir. Operasyonel karar insandadır; kontrol sistemine yazma, setpoint, start/stop ve alarm kontrolü ilk kapsamın dışındadır.

## Şu an açık olan girdiler

SWAPP özel depoları ve yerel kurulum bilgisi; izinli veri/test rolü; bir dijital ikiz/varlık ailesi; veri ve değerlendirme sahibi; Linux/GPU kapasitesi; şirketin öğretmen provider politikası; bütçe para birimi ve sınırları. Bunlar henüz seçilmiş veya alınmış gibi kaydedilmez. Depolar gelmeden yapılabilecek ilk işler [P0–P2](PLAN.md) kapsamında belirtilmiştir.

Bu public paket yalnız genel tasarım, sentetik örnek ve kamusal kaynak bağlantıları taşır. Şirket adı/tenant kimliği, özel uygulama kodu, gerçek kullanıcı izi, ekran görüntüsü, veri örneği, embedding, adapter veya erişim sırrı eklenmez. Gerçek uygulama ve devir kayıtları şirketin özel çalışma alanında tutulur.
