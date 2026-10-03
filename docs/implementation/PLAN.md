# UMAY OS — Uygulama sırası ve kabul planı

Durum: plan; runtime işleri henüz yapılmış sayılmaz · [Paket dizini](README.md).

Amaç ilk olarak bir Linux ortamında Core S1/S2, gerçek yerel SWAPP ve Scientist üzerinden ölçülebilir bir dikey dilim kurmaktır. Sonra izinli insan izlerinden RAG/skill ve model uyumlu LoRA/QLoRA adayları üretilir. Çok sayıda eylemci desteği, bu ilk dilimin sözleşmelerini izleyen uzmanların eklenmesiyle genişler.

Takvim, ekip ve donanım henüz kesinleşmediği için burada tamamlanma tarihi veya maliyet rakamı verilmez. İş sırası bağımlılık temellidir. Her işin sahibi özel proje kaydında atanır; aşağıdaki roller atanmış kişi anlamına gelmez. Başlangıç durumunda bütün runtime kapıları **açık** durumdadır.

## 1. Aşamalar ve backlog

| Kimlik | Somut iş ve teslimat | Bağımlılık | Sorumlu rol | Bitmiş sayılması için |
| --- | --- | --- | --- | --- |
| P0.1 | AOS/Scientist pinli envanter; mevcut sınıf/test → UMAY fark matrisi | Public kaynak erişimi | Teknik lider | Exact SHA/path, yeniden koşulan test ve koşulmayan kapsam kaydı; çift registry/scheduler ihtiyacı gerekçeli |
| P0.2 | Kaynak, bağımlılık, model, dataset ve teacher çıktısı kullanım/hak envanteri | P0.1 | Teknik/veri sahibi | Her artifact'in kullanım profili; belirsiz kullanımın açık kaydı; private türev bakım kararı |
| P0.3 | İlk görev kataloğu, veri ve donanım envanteri, maliyet para birimi/bütçe politikası | Kullanıcı/şirket girdileri | Ürün/veri sahibi | Bir varlık ailesi, ilk 10 GUI senaryosu, değerlendirme sahibi, izinli kaynaklar ve ölçüm kapsamı |
| P1.1 | Özel runtime çalışma alanı; pinli iki bileşen, lock ve reproducible Linux profili | P0.1; özel hedef alan | Core geliştirici | Temiz kurulumda kimlikler/health; eksik model veya config'te açık hata; sırlar commit dışında |
| P1.2 | Sözleşmeleri mevcut tiplerle eşle; schema, event/kanıt ve cost ledger temeli | P0.1 | Core geliştirici | Geçerli/yanlış sürüm, tenant, duplicate, missing-cost ve cancel testleri |
| P1.3 | Core S1/S2 baseline, tek GUI sahibi, kaynak kuyruğu ve sandbox | P1.1–P1.2 | Core/model geliştirici | Gerçek model ölçümü; takeover, eski lease, OOM, timeout, öğretmen kapalıyken işletim |
| P2.1 | Sentetik SWAPP sözleşme fixture'ı ve veri oracle'ı | P1.2 | Entegrasyon geliştirici | Sentetik twin/signal/time/quality örnekleri; mock kanıtı açık etiketli; gerçek endpoint iddiası yok |
| P2.2 | Kaynaklı Scientist baseline deneyinin izole uçtan uca koşusu | P1.2, P2.1 | Araştırma geliştirici | Snapshot → spec → sandbox → hesap → rapor → maliyet zinciri; tekrar üretim |
| P3.1 | Teslim edilen SWAPP frontend/backend'i yerel kur; schema/rol/tenant/build envanteri | Özel depolar, kurulum bilgisi, izinli seed | Entegrasyon geliştirici | Gerçek uygulama local health ve oracle; production sırlarına ihtiyaç duymayan profil |
| P3.2 | SWAPP Application Pack v0.1; 10 dondurulmuş GUI görevi | P1.3, P3.1 | Entegrasyon/QA | Doğru varlık/birim/zaman/veri; loading/error/empty/session expiry; izinli export; bağımsız oracle |
| P3.3 | E1/E2/E3 dijital ikiz deneylerini gerçek local SWAPP'a bağla | P2.2, P3.2 | Araştırma geliştirici | Train/calibration/eval ayrımı; clustering/anomali sınırları; bütün denemeler ve hata/maliyet kaydı |
| P4.1 | İzinli trace capture, minimizasyon/review, provenance ve RAG/skill adayı | P3.2; capture/veri politikası | Veri/öğrenme geliştirici | Ham izden incelenmiş aday; cross-role erişim, revocation, cache ve kaynak atfı kabulü |
| P4.2 | Kapalı kaynak teacher/build adaptörü ve bütçe geçidi | P1.2; provider/veri politikası | Model geliştirici | Sentetik görevde schema/timeout/usage/cost; gerçek model/version; teacher üretime erişemez |
| P4.3 | Sabit görevlerde base, base+RAG ve base+RAG+skill kıyası | P4.1–P4.2 | Bağımsız değerlendirici | Ölçülmüş davranış açığı; training ihtiyacı veriye dayanır; holdout teacher'dan ayrı |
| P5.1 | S1 ve S2 için ayrı capability matrisi ve Unsloth LoRA/QLoRA uygunluk spike'ı | P4.3; trainable checkpoint/donanım/haklar | Model geliştirici | Exact architecture/readout/tokenizer/target-module/runtime testi; desteklenmeyen yol açık reddedilir |
| P5.2 | Uygun role özgü dataset, recipe, eğitim ve adapter registry adayı | P5.1; yeterli incelenmiş veri | Öğrenme geliştirici | Base-only karşılaştırması; gerçek kaydedilmiş artifact/hash, bütçe ve lineage; smoke eğitim kalite kanıtı değil |
| P5.3 | TRAIN→SERVE, S1/S2 ayrı ve birlikte evaluation, terfi/rollback | P5.2 | Bağımsız değerlendirici/model geliştirici | Ayrı süreçte yükleme, serving parity, izin sınırı, görev kalite/maliyet ve geri alma; insan onayı |
| P6.1 | İkinci typed uzman ve eşzamanlılık/arıza kabulü | P3.3, P1.3 | Core geliştirici | Aynı sözleşme/policy/kanıt formatı; bir uzman arızası Core'u çökertmez; ayrı GUI oturumu veya kuyruk |
| P6.2 | Yerel pilot fayda karşılaştırması, restore ve işletim runbook'u | P3–P5 ilgili kapıları | Ürün/QA | Sabit bağımsız görevlerde insan süresi, kalite, gecikme, kapsam ve maliyet; backup restore/rollback |
| P6.3 | Kurum içi SWAPP kabulü | Kurum ağı/hesap/veri izni ve P6.2 | Kurum kabul sahibi | Gerçek kurum ortamı, insan devralma, kesinti ve veri oracle'ı; ayrı imzalı kanıt |
| P7.1 | İsteğe bağlı SWAPP olay/plan taslağı veya inceleme kaydı oluşturma | İlgili gerçek uygulama yeteneği ve ayrı kullanıcı kapsamı | Entegrasyon/ürün sahibi | İşlem öncesi insan onayı, rol/alan scope, idempotency, postcondition ve geri alma; OT kontrol yetkisi açılmaz |

P0.1, P1.2, P2 ve sentetik teacher/protokol hazırlığı SWAPP özel depoları gelmeden ilerleyebilir. Depolar gelmemişken P3 kabulü açık kalır. Destekli eğitim modeli veya yeterli veri yoksa P5 terfisi açık kalır; kabul edilmiş RAG/skill tabanlı yerel kullanım bağımsız değerlendirilebilir. Bu durum eğitim özelliğinin tamamlandığı şeklinde sunulmaz.

## 2. Kabul kapıları

| Kapı | Asgari gözlenebilir kanıt | Olumsuz/eksik koşul |
| --- | --- | --- |
| K0 Kaynak/kurulum | SHA, artifact/hash, Linux/env, komut, exit code ve health raporu | Fixture testini gerçek model testi sayma |
| K1 Yetki/iş | Yanlış tenant/rol, eski lease, iptal, deadline, kaynak revoke ve sandbox sınırları test edilir | Test edilen kapsamda bir yetkisiz erişim/eylem varsa terfi yok |
| K2 SWAPP GUI | Önceden yazılmış 10 farklı görevin tamamı gerçek local frontend/backend üzerinde doğru oracle ile geçer | Mock, API-only veya ekran tahmini GUI kabulü değildir |
| K3 Scientist | Dondurulmuş protokol, baseline/aday, split/hash, tekrar koşusu, başarısız koşular ve rapor | Etiketsiz veriyle fault recall/precision veya gerçek arıza başarısı iddiası yok |
| K4 Öğrenme | İncelenmiş lineage, holdout izolasyonu, kaynak atfı/ACL ve aday kıyası | Teacher kendi etiketiyle tek başına kabul veremez |
| K5 Model/adapter | S1/S2 ayrı skorlar, base/adapter serving ölçümü, çift regresyon, kaynak/cost ve rollback | Kaydetmeden yapılan dry-run veya aynı eğitim örneği değerlendirmesi yeterli değil |
| K6 Maliyet | Her billable çağrı/işin usage kimliği; tahmin/rezervasyon/gerçekleşen mutabakatı | Eksik maliyet kayıtları sıfır kabul edilmez; unresolved tutar/kayıt oranı görünür |
| K7 Fayda | Aynı bağımsız görevlerde baseline yöntemle kalite, insan emeği, elapsed/queue ve maliyet kıyası | Sadece başarılı işleri seçerek süre/ucuzluk raporlanmaz |
| K8 Kurum | Yetkili gerçek ortamda ayrı kabul, veri kapsamı ve kesinti/takeover kanıtı | Yerel başarılı sonuç kurum/live kabulünün yerine geçmez |

Keşif pilotunda hedef en az 30 **bağımsız değerlendirilebilir vaka** hazırlamaktır; bu sayı istatistiksel üretim güvenliği garantisi değildir. Aynı olayın varyantları tek grup sayılır. Etiket ve veri yetersizse daha küçük sentetik çalışma kapsamıyla raporlanır. Kalite artışı, yanlış alarm toleransı, p95 süre, maliyet tavanı ve anlamlı etki eşiği P0.3'te, aday sonuçları görülmeden dondurulur. Sayısal eşikler henüz kararlaştırılmadıysa gate `not_ready` kalır.

## 3. Maliyet planı

Her iş başlamadan `activity_id → budget → reservation` oluşturulur. Faaliyet sınıfları en az `architecture`, `coding`, `teacher_generation`, `review`, `data_preparation`, `experiment`, `training`, `evaluation`, `inference`, `storage` olur. Provider token/çağrı ve retry, CPU/GPU süreleri, enerji ölçümü, depolama/egress ve insan inceleme/geliştirme süreleri ayrı ölçülür. Kişi bazlı davranış gözetimi yerine görev toplamı yeterlidir.

Başlatma sırasında atomik rezervasyon yapılır; eşzamanlı işler aynı bütçeyi iki kez harcayamaz. Kullanım sınırına yaklaşırken uyarı, bütçe dolduğunda yeni ücretli çağrıyı engelleme ve sürmekte olan işi güvenli sonlandırma politikası açıkça seçilir. Başarısız/iptal işin tüketimi kayda girer; sadece kullanılmamış rezervasyon serbest bırakılır.

Rapor, birbirine eklenmeyen sütunlar taşır: tahmini toplam, ayrılmış tutar, ölçülen kullanım, mutabık gerçek maliyet, bekleyen maliyet, kapsama oranı. Raporlanan gerçekleşen toplam yalnız aynı para birimindeki mutabık kalemleri toplar; bekleyenler sayı ve biliniyorsa tutarla ayrıca gösterilir. Kur dönüşümü varsa tarihli kur kaydıyla sunulur. Kullanım ölçümü gerçek olsa bile elektrik/amortisman iç maliyeti tahmin olabilir; sınıfı değişmez.

Haftalık geliştirme görünümü sürüm/rol/deney başına maliyet ve tekrarları gösterir. Görev başına maliyet yalnız başarıya bölünmüş tek rakamla anlatılmaz; toplam girişim sayısı, failure/retry ve insan review süresi de verilir. Teacher kapalıyken yerel sistemin işletim maliyeti ayrıca ölçülür.

## 4. Karar kayıtları ve açık sorular

| Açık girdi | Etkilediği iş | Gelene kadar ilerleme |
| --- | --- | --- |
| Özel SWAPP depoları, build/run talimatı, örnek config | P3 | Sentetik sözleşme/oracle, test kataloğu ve Core tarafı |
| Şirket içi rol/tenant, izinli trace/veri politikası | P3–P5 | Gerçek kullanıcı izi toplamadan sentetik pipeline |
| Hedef Linux/CPU/GPU ve VRAM | P1.3, P5 | Reproducible profile ve CPU sözleşme testleri; kapasite iddiası yok |
| Dijital ikiz türü, varlık ailesi ve olay etiketleri | P3.3 | Sentetik keşif; gerçek arıza metriği iddiası yok |
| Öğretmen provider/model/veri paylaşım politikası | P4.2 | Soyut provider adaptörü ve sentetik test; gerçek çağrı/fiyat onayı varsayılmaz |
| Eğitim base modeli ve kullanım hakları | P5 | Role göre destek matrisi; GGUF'u eğitilebilir varsayma |
| Değerlendirme sahibi, metrik eşikleri ve bütçe | Tüm terfiler | Protokol taslağı; geçilmemiş gate'i kapatma |

Sonraki ilk çalışma dilimi **P0.1 + P1.2 + P2.1**: pinli kaynak fark matrisi, gerçek şema taslağı, sentetik sözleşme/oracle ve maliyet-defteri testleri. Gerçek kod oluşturma, kullanıcının sağlayacağı özel runtime çalışma alanında yapılır. Bu public manifesto deposuna şirket kodu veya veri eklenmez.
