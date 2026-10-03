# UMAY OS — İnşa kaynak paketi

Sürüm: **0.3.0** · Karar tarihi: **3 Ekim 2026** · Durum: **kamuya açık mimari ve uygulama planı**.

UMAY OS, her insan çalışan için izole Linux container çalışma alanı kuran, AOS tabanlı Core'un yönettiği bir danışmanlık katmanıdır. SWAPP web uygulaması, AI-Scientist ve diğer eylemciler bu çalışan kapsamında çalışır. İlk uzman dijital ikizlerde clustering, anomaly detection ve tekrarlanabilir deney düzenekleri geliştirir. Tüm çalışma işlemleri kalıcı loglara bağlanır; katma değeri doğrulanan kayıtlar skill, RAG ve yerel modellere özgü fine-tune adaylarına dönüşür. Günlük işletim yerel açık ağırlık modellerdedir. Mimari değişiklikler güçlü büyük dil modelleriyle ayrı geliştirme alanında hazırlanır; test ve insan onayıyla sürümlenir. Şirket verisi, özel uygulama kodu ve öğrenme ürünleri erişim sınırları içinde kalır.

**Modeller değişir. Deneyim kalır. Karar insanda kalır.** Öğrenme, incelenmiş deneyimden sürümlü adaylar üretmek ve ölçerek terfi ettirmektir. Üretim modeli kendini denetimsiz değiştirmez. RAG kaynak getirir; LoRA destekli bir temel modelin davranışını eğitimle uyarlayabilir. İkisi aynı işlem değildir.

Bu paket uygulamaya başlamak için hazırlanmıştır. `umayos` deposu manifesto sitesidir; burada Core, SWAPP bağlantısı, eğitim hattı veya Scientist runtime'ı kurulmuş değildir. Belgelerdeki yollar, sözleşmeler ve eşikler **hedef tasarımdır**. Başarı ancak ilgili kabul kanıtıyla kaydedilir.

## Okuma sırası

| Belge | Kullanımı |
| --- | --- |
| [Mimari](ARCHITECTURE.md) | Çalışan container alanları, yerel servisler, kalıcı loglar ve güçlü modellerle mimari değişiklik |
| [Sözleşmeler](CONTRACTS.md) | Çalışan/alan, işlem, mimari değişiklik, iş, veri, model ve maliyet kayıtları |
| [Öğrenme](LEARNING.md) | Tüm kayıtlardan katma değer seçimi; skill/RAG/fine-tune, yerel değerlendirme ve terfi |
| [İlk Scientist dilimi](SCIENTIST.md) | Dijital ikizlerden clustering/anomali deneyleri ve bağımsız değerlendirme |
| [Uygulama planı](PLAN.md) | Bağımlılık sırası, somut backlog, kabul kapıları ve maliyet ölçümü |
| [Claude / ChatGPT başlangıcı](START_HERE.md) | Doğrudan kullanılacak başlangıç promptu, çalışma kuralları ve kalıcı devir kaydı |

## Kaynak kimlikleri ve kullanım sınırı

3 Ekim 2026 yeni push incelemesi aşağıdaki HEAD'leri doğruladı. Önceki pinlere göre farklar [upstream incelemesinde](../UPSTREAM_REVIEW_2026-10-03.md) kayıtlıdır. Ayrıntı ve erişim kanıtı: [kaynak kapsamı](../CONTENT_SOURCES.md).

| Kaynak | Pin / rol |
| --- | --- |
| [aserdargun/aos](https://github.com/aserdargun/aos/tree/dfd06322219b9295c5fc618bef180464b3d17767) | `dfd06322219b9295c5fc618bef180464b3d17767` — UMAY Core için kontrollü türev tabanı |
| [aserdargun/ai-scientist](https://github.com/aserdargun/ai-scientist/tree/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe) | `01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe` — ilk bilimsel uzman için kontrollü türev tabanı |
| [SWAPP](https://swapp.org.tr) | Kamuya açık ürün anlatısı; şirketin özel frontend/backend sözleşmesi veya erişim yetkisi değildir |

İki GitHub deposu public erişilebilirdir; incelenen README'ler proje lisansının seçilmediğini bildirir. Önceki GitHub metadata incelemesinde `fork: false`, `parent: null` kaydedilmiştir; bu yenilemede kaynak ve commit karşılaştırması yapılmıştır. Dolayısıyla burada dış bir “orijinal projenin” fork zinciri veya açık kaynak lisansı varmış gibi sunulmaz. **Kontrollü UMAY türevleri oluşturmak kullanıcının ürün kararıdır;** kaynak kodunun, bağımlılıkların, model ağırlıklarının, verinin ve dağıtımın hak envanteri ilk aşama işidir. Aynı isimli başka AI-Scientist projeleri bu tabanın yerine geçmez.

## Sabit ürün kararları

1. Linux temel işletim sistemidir. Her insan çalışan için ayrı container kapsamı kurulur; aynı kapsamdaki servis container'ları çalışanın SWAPP, Core ve uzmanlarını barındırır. Oturum, dosya, ağ erişimi ve kaynak kotaları ayrıdır.
2. AOS Core işleri, politika denetimini, araçları, model kaynaklarını ve her çalışan oturumunda tek GUI sahipliğini yönetir. AI-Scientist ve diğer eylemciler ortak görev/sonuç/log sözleşmelerine uyar.
3. Sistem başka yerel uzman eylemcilere açıktır. Sürümlü kayıt/adaptör, yetki, görev/sonuç/log, kaynak ve cleanup kabulü yeni uzman için zorunludur; genel plugin uyumluluğu varsayılmaz.
4. SWAPP frontend/backend çalışanın izole alanındaki ayrı uygulama servisleridir. Merkezi veri erişimi varsa çalışan yetkisiyle sınırlandırılır. Core web uygulamasını izinli oturum üzerinden kullanır.
5. Özel `swapp-backend` ve `swapp-frontend` ayrıca teslim edilecektir. Gerçek API/kimlik/veri ve çalıştırma sözleşmesi teslim edilen kaynaklardan çıkarılır; tahmin edilmez.
6. İnsan, eylemci ve servislerin tüm iş işlemleri container'dan bağımsız kalıcı loga alınır. İşlemin kimliği ve sonucu kaydedilir; sırlar ve gereksiz kişisel içerik dışlanır. Katma değer ve kullanım izni ayrıca değerlendirilir; çalışanın kişisel performansını puanlamak ürün hedefi değildir.
7. Seçilmiş kayıtlar testli skill, kaynaklı RAG ve role özgü fine-tune adaylarına dönüşür. Yerel modelde bağımsız katkı ölçümü, insan onayı ve geri alma olmadan aktif sürüm değişmez. LoRA/QLoRA uyumu model bazında kabul edilir.
8. Mimari değişiklikler güçlü büyük dil modelleriyle hazırlanır; karar, diff, test, migration ve rollback kaydı taşır. Öğretmen/geliştirme hattı günlük işletimden ayrıdır; yerel eylemci mimariyi veya yetki politikasını kendiliğinden değiştirmez.
9. Geliştirme ve işletim denemeleri maliyet defterine bağlanır. Tahmin, bütçe rezervasyonu ve gerçekleşen maliyet ayrı tutulur; eksik maliyet sıfır sayılmaz.
10. UMAY okur, analiz eder, önerir. Operasyonel karar insandadır; kontrol sistemine yazma, setpoint, start/stop ve alarm kontrolü kapsam dışıdır.

## Şu an açık olan girdiler

SWAPP özel depoları ve yerel kurulum bilgisi; izinli veri/test rolü; bir dijital ikiz/varlık ailesi; veri ve değerlendirme sahibi; Linux/GPU kapasitesi; şirketin öğretmen provider politikası; bütçe para birimi ve sınırları. Bunlar henüz seçilmiş veya alınmış gibi kaydedilmez. Depolar gelmeden yapılabilecek ilk işler [P0–P2](PLAN.md) kapsamında belirtilmiştir.

Bu public paket yalnız genel tasarım, sentetik örnek ve kamusal kaynak bağlantıları taşır. Şirket adı/tenant kimliği, özel uygulama kodu, gerçek kullanıcı izi, ekran görüntüsü, veri örneği, embedding, adapter veya erişim sırrı eklenmez. Gerçek uygulama ve devir kayıtları şirketin özel çalışma alanında tutulur.
