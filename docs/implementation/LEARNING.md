# UMAY OS — S1/S2 ve şirket deneyiminden öğrenme

Durum: hedef öğrenme ve model değişim planı · [Paket dizini](README.md).

## 1. Şirket deneyimi üç ayrı ürüne dönüşür

| Ürün | İçeriği ve işlevi | Güncelleme etkisi |
| --- | --- | --- |
| RAG | İzinli belgeler, doğrulanmış vakalar, uygulama bilgisi ve kaynaklı retrieval | Model ağırlıkları değişmez; corpus/embedding/indeks ayrı sürümlenir |
| Skill | SWAPP akışının parametreli, önkoşullu ve doğrulamalı prosedürü | Araç kullanma kabiliyeti güncellenir; policy sınırı değişmez |
| LoRA / QLoRA adayı | Ölçülmüş davranış açığı için role özgü eğitim verisi ve adapter | Uyumlu temel modelin davranışı eğitimle değişir; ayrı model kabulü gerekir |

İlk tercih entegrasyon hatasını düzeltmek, eksik bilgiyi RAG'e eklemek veya akışı skill olarak sağlamlaştırmaktır. Tekrarlayan davranış açığı kalıyorsa eğitim adayı açılır. Daha çok log, daha çok adapter veya daha sık eğitim kendi başına kalite artışı değildir.

## 2. Mevcut System 1 / System 2 korunur

3 Ekim 2026 incelemesinde AOS'un [model belgeleri](https://github.com/aserdargun/aos/blob/ed6e857b0e61e9c19c8ba63933e2cc9f318fe444/docs/MODELS.md) ve hazırlık betikleri şu baseline'ı gösterir. Bunlar gelecekteki model seçimini sabitlemez; karşılaştırmanın başlangıcını tanımlar.

| Rol | Kaynak baseline | Korunacak sözleşme | Eğitim durumu |
| --- | --- | --- | --- |
| Core S1 / Operator | `Mapika/decider-2b`; checkpoint ve tokenizer `7789eb65d5cf519737608e218fa88819bddea0af` | `DecisionEngine.decide(state, options)`; izinli seçenek olasılıkları/kararı; üretken açıklama zorunluluğu yok | Mevcut özel küçük adapter deneyi genel Unsloth/chat SFT uyumu veya bağımsız kalite kabulü değildir |
| Core S2 / Supervisor | `prism-ml/Ternary-Bonsai-2-27B-gguf`, revision `6ed5e12bf84b7a63069882c91dd9e9218647d17b` | Plan, toparlanma, kaynaklı açıklama; vision iddiası varsa ayrı kabul | GGUF çıkarım artifact'i; eğitilebilir checkpoint/target modules henüz doğrulanmış değil |
| Scientist araştırma modeli | `Qwen/Qwen3.5-9B`, revision `c202236235762e1c871ad0ccb60c8ee5ba337b9a` | Bilimsel öneri ve kod adayı; kendi düşünme/örnekleme profilleri | Sentetik Unsloth dry-run kayıtları mevcut; gerçek adapter kaydetme ve TRAIN→SERVE kabulü açık |

S1 hazırlığı [prepare_decider.py](https://github.com/aserdargun/aos/blob/ed6e857b0e61e9c19c8ba63933e2cc9f318fe444/scripts/prepare_decider.py), S2 hazırlığı [prepare_bonsai.py](https://github.com/aserdargun/aos/blob/ed6e857b0e61e9c19c8ba63933e2cc9f318fe444/scripts/prepare_bonsai.py), Scientist pinleri [native_runtime.py](https://github.com/aserdargun/ai-scientist/blob/67258cdef33032c9a49eeae31c2e2ba26a98ca17/lab/llm/native_runtime.py) üzerinden izlenir. Pinli Decider kartı İngilizce kapsam bildirir; Türkçe isteğin S1'e normalizasyonunda varlık kimliği, sayılar, birimler ve alıntılar korunmalı ve ayrıca sınanmalıdır. Serbest Türkçe mühendislik açıklaması S2'nin görevidir.

S1'in Mapika kod revision'ı `75b00fade2dd7f353106e3f4683e56fa2481ec28` ile eşlenir. S2 baseline'ı Prism llama.cpp revision `9a9394a895b96003ca842a6041cb28ac49a108f7` kullanır; standart bir llama.cpp/vLLM kurulumuyla eşdeğer kabul edilmez. Yeni engine seçimi ayrıca yükleme, vision ve görev parity testi gerektirir.

Scientist'in S1/S2 etiketleri aynı araştırma modelinin farklı profillerini anlatabilir; Core'un Decider/Bonsai ayrımının yerine konmaz. Kapalı kaynak öğretmen de yerel S2'nin yeni adı değildir. Roller ayrı deployment, dataset ve evaluation kimlikleriyle kalır.

## 3. Role özgü veri, hedef ve değerlendirme

| Alan | Core S1 | Core S2 | Scientist |
| --- | --- | --- | --- |
| Girdi | Taze durum, izinli seçenekler, kısa görev bağlamı | Görev, kaynaklar, geçmiş adım sonuçları ve gerekirse görüntü | Deney sorusu, veri manifesti, bütçe ve hesap sonuçları |
| Eğitim hedefi | Doğru seçenek sıralaması/seçimi, çekimserlik/escalation ve correction | Kaynaklı plan/yanıt, doğru araç isteği, toparlanma ve belirsizlik | Geçerli deney önerisi/kodu, protokol uyumu ve hesap çıktısından rapor |
| Etiket doğrulama | Bağımsız postcondition + yetkin inceleme; geçersiz/yetkisiz seçenek negatif | Kaynak desteği, şema ve araç izleri; insan/hesap kontrolü | Sandbox, deterministic scorer, bilimsel protokol ve uzman incelemesi |
| Başarı metrikleri | Karar doğruluğu, kalibrasyon, yanlış yetki denemesi, latency, escalation | Kaynak doğruluğu, plan/araç geçerliliği, görev başarısı, çekimserlik | Çalışan deney oranı, tekrarlanabilirlik, veri sızıntısı, bilimsel metrik ve maliyet |

S1'in özel olasılık/readout ve loss gereksinimi genel sohbet SFT tarifine indirgenmez. Gold örnek kullanıcı tıklamasının kopyası değildir; amaç, önkoşul, izin ve sonuç bir arada doğrulanır. S2 veri seti gizli düşünce zinciri istemez; kısa görev gerekçesi, doğrulanabilir plan ve kaynaklı çıktı yeterlidir. Teacher'ın kendi ürettiği cevap tek başına gold olmaz. Uyuşmazlıklar ikinci reviewer veya deterministik oracle ile çözülür; çözülemeyenler eğitimden ayrılır.

## 4. İzden sürümlü adaya

1. **Capture:** kullanıcıya ve şirkete tanımlı izin/amaçla, gerekli olayları topla; parola/token ve gereksiz kişisel veri toplama. İnsan ve model eylemlerinin kökenini ayır.
2. **Minimize:** hassas alanları temizle, pseudonymous aktör kullan, saklama süresi ve tenant bağını koru. Ham iz ayrı yetki alanında kalsın.
3. **Reconstruct:** görev, gözlem, seçilen eylem, düzeltme, bağımsız sonuç ve iptal/başarısızlık bağlarını kur. Başarı kanıtı eksikse `unverified` kaydet.
4. **Review:** veri hakkı ve kullanım profiliyle birlikte etiketleri incele. Üretim verisini öğretmene göndermek varsayılan adım değildir.
5. **Split:** train/dev/calibration/holdout bölmesini olay ailesi, varlık/saha ve zaman üzerinden dondur; yakın kopya ve örtüşen pencereleri kontrol et.
6. **Build:** uygun RAG/skill/dataset artifact'i ve provenance manifesti üret; teacher sentetik örneklerini ayrı kökenle say.
7. **Evaluate:** aynı bağımsız görevlerde mevcut sürüm ve adayı kıyasla; güvenlik, kalite, gecikme ve maliyeti birlikte değerlendir.
8. **Promote:** yetkili insan onayı, immutable artifact ve atomik aktif sürüm; ardından gözlem, geri alma ve gerekirse iptal.

Aynı olayın grafiği, raporu, kullanıcı konuşması, teacher yeniden yazımı ve sentetik varyantı aynı leakage group'ta kalır. Geleceğe ait bakım etiketi eğitim feature'ına sızmaz. Ölçekleyici/imputer/feature seçimi sadece train'e fit edilir. Holdout soru/cevapları RAG indeksine, teacher promptuna veya tuning bağlamına açılmaz. Holdout defalarca model seçimi için kullanılırsa artık development set sayılır; yeni bağımsız holdout hazırlanır.

## 5. Unsloth ve model seçme matrisi

Unsloth, destekli modeller için **tercih edilen LoRA/QLoRA eğitim backend'idir**; her model ve rol profili ayrı kabul gerektirir. Tek bir genel eğitim betiği tüm S1/S2 modellerine uygulanmaz. Her aday için aşağıdaki matris oluşturulur; destek kaynağı kontrol tarihi ve tam sürümle saklanır.

| Alan | Kaydedilecek kanıt |
| --- | --- |
| Rol ve protokol | S1 finite-choice / S2 üretken/vision / Scientist araştırma; exact input/output sözleşmesi |
| Temel artifact | Model kimliği, revision, weights hash'i, lisans/kullanım hakkı, eğitilebilir checkpoint |
| Uyum | Architecture, tokenizer/chat template/EOS, target modules, loss/readout, desteklenen context/vision |
| Trainer | Unsloth, Transformers, PEFT, PyTorch/CUDA sürümleri; LoRA ve QLoRA ayrı destek durumu |
| Eğitim tarifi | Rank/alpha/dropout, precision/quantization, optimizer, seed, sequence length, batch/accumulation, data/split hash |
| Kaynak | Gerçek VRAM/RAM, throughput, OOM sınırı, enerji/kullanım, eğitim ve serving maliyeti |
| Serving | Engine/version, adapter yükleme veya merge/export yolu, template/parity ve hedef cihazda kabul |
| Karar | `unsupported`, `research_only`, `candidate`, `accepted`, `rejected`; gerekçe ve rollback hedefi |

LoRA temel modele düşük rank uyarlama ekler; temel ağırlıklar dondurulur, düşük rank adapter parametreleri eğitilir. QLoRA bu işlemi düşük bitli dondurulmuş temel ağırlıklarla yapma yoludur; **4-bit QLoRA ile GGUF çıkarım quantization'ı veya ternary Bonsai aynı şey değildir**. Eğitilmiş adapter'ın başka base revision'a, tokenizer'a veya engine'e uyduğu varsayılmaz. Unsloth'un model ailesini desteklemesi, özel Decider readout/loss'unu desteklediğini de kanıtlamaz.

3 Ekim 2026 kontrolünde [Unsloth'un Qwen3.5 rehberi](https://unsloth.ai/docs/models/qwen3.5/fine-tune), bu aile için 4-bit QLoRA'yı quantization farkları nedeniyle önermiyor; Transformers v5 gereksinimini belirtiyor. Bu nedenle repodaki Qwen3.5 4-bit dry-run gelecekteki kurumsal eğitim kararı olarak aynen alınmaz. Destekli LoRA ilk incelenecek yoldur; QLoRA ancak uygun başka model veya güncellenmiş destek/ölçüm kanıtıyla ayrı aday olur. Bu aile için “QLoRA her durumda kullanılacak” şartı konmaz.

Model seçimi güncel resmî destek belgeleri, yerel görev kalitesi ve donanım ölçümüyle yenilenir. [Unsloth gereksinimleri](https://unsloth.ai/docs/get-started/fine-tuning-for-beginners/unsloth-requirements) donanım kontrolüne; [deployment](https://unsloth.ai/docs/basics/inference-and-deployment) ve [kaydetme sorunları](https://unsloth.ai/docs/basics/saving-and-using-models/troubleshooting) export/template kontrolüne başlangıç kaynağıdır. Üretici belgesindeki bellek sayısı bu makinede yapılmış ölçüm değildir.

## 6. Base → adapter → runtime kabulü

Her rol için önce base-only skor kaydedilir. Sonra eğitim adayının yüklenmesi, aynı modelde base+adapter ve gerekiyorsa merge/export çıktısı karşılaştırılır. Adapter kapatma, yeni süreçte yeniden yükleme, context sınırı, cancel ve bellek baskısı test edilir. Vision varsa metin testinden ayrı yürütülür. Export edilen format ayrıca parity testinden geçer; yalnız trainer içindeki başarı yeterli değildir.

S1 adayı aynı sabit seçeneklerle; S2 adayı aynı kaynaklı görevlerle değerlendirilir. Sonra S1+S2 birlikte uçtan uca regresyon yapılır. Scientist modeli de bu çiftin yerine geçirilmez; kendi deney ve kaynak bütçesi kabulünü taşır. Bir rol iyileşirken yanlış eylem, kaynak hatası veya maliyet kötüleşmesi tolerans dışındaysa terfi reddedilir. Eşikler denemeden önce dondurulur.

## 7. Bilgi silme ve kaynak iptali

Retrieval yetki filtresi sıralamadan önce uygulanır; kaynak gösterimi ve cache kullanımı sırasında yetki tekrar doğrulanır. Aynı şirket içinde rol/varlık yetkileri de ayrıdır. Geniş erişimli kaynaktan eğitilmiş adapter dar yetkili kullanıcıya sunulmaz: adapter'ın izinli kullanıcı kümesi, eğitim kaynaklarının izinli kullanıcı kümelerinin kesişimini aşamaz. Bu sınırın doğrulanamadığı veriler ortak adapter eğitimine alınmaz; yetkiye özel adapter veya RAG yolu kullanılır. Adapter ağırlıkları model belleği taşıyabileceği için retrieval filtresi tek başına yeterli değildir.

RAG kaynağı iptalinde retrieval, ilgili cache, yeniden indeksleme ve gelecekteki dataset üretimi engellenir; aktif iş yeni erişimde yeniden denetlenir. Silinen kaynağın türevlerine lineage üzerinden ulaşılır. Embedding modeli değiştiğinde eski vektörler yeni model için geçerli sayılmaz; yeniden indeks oluşturulur.

Eğitilmiş adapter'dan kaynak silmek bir satır silme işlemi değildir. Etkilenen adapter yayından çekilir veya uygun eski sürüme dönülür; yeniden eğitim/yeniden değerlendirme etkisi kaydedilir. Otomatik, eksiksiz unlearning iddiası yapılmaz. Yetki iptali, inceleme kaydını saklama yükümlülüğü ve model geri çekme süreci şirketin belirlediği politikada ayrı ele alınır.

## 8. Mevcut kodun gerçek sınırı

AOS'un `knowledge.py` yolu incelenmiş/sınırlı lexical retrieval için başlangıçtır; genel vektör RAG tamamlanmış sayılmaz. `owned_episode_conversion.py` S1/S2 canonical örnek ayrımına başlangıçtır. Scientist'in `sft_export.py` yolu `noncommercial_research`/`local_noncommercial_sft` profili taşır; şirket verisi ve ticari kullanım için kaynak haklarını ve kullanım profilini ayrıca tasarlamak gerekir. Mevcut dry-run'daki `save_adapter: false` gerçek adapter teslimi değildir. Bu sınırlar [kaynak incelemesinde](../CONTENT_SOURCES.md) izlenir.
