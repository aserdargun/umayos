# UMAY OS — Mimari ve sahiplik

Durum: hedef mimari · Sürüm: 0.3.0 · [Paket dizini](README.md).

## 1. Çalışan sistemin sınırı

Referans kurulumda her **insan çalışan** için izole bir Linux container çalışma alanı ayağa kalkar. Bu alan SWAPP web uygulamasının frontend/backend örneğini, AOS tabanlı Core yürütmesini, AI-Scientist'i ve görevli diğer eylemcileri barındırır. “Çalışan” kullanıcıyı; “eylemci/deney işçisi” onun adına sınırlandırılmış iş yapan yazılım rolünü ifade eder. Çalışan alanı tek container veya aynı çalışana tahsis edilmiş servis container'larından oluşabilir; ayrı servis kullanımı çalışanlar arası izolasyon şartını değiştirmez. Başlangıç için büyük bir orkestrasyon platformu şart değildir.

Her alan `tenant_id + employee_ref + workspace_id` ile tanımlanır; yeniden kurulumda `workspace_run_id` değişir. Dosya alanı, tarayıcı profili/çerezler, servis kimliği, ağ erişimi ve CPU/RAM/GPU/disk kotaları ayrıdır. SWAPP servisleri Core içine gömülmez. Merkezi şirket verisine ihtiyaç varsa yalnız çalışanın yetkili olduğu veri geçidi kullanılır; ortak veri deposu yetkileri birleştirmez.

```mermaid
flowchart TD
    H[Çalışan: amaç, izin ve son karar] --> C
    subgraph CO[Şirket ortamı: Linux]
      subgraph WS[Her çalışan için ayrı container kapsamı]
        C[AOS Core: çalışan oturumu ve görev politikası] --> W[SWAPP frontend ve backend]
        C --> S[AI-Scientist]
        C --> A[Diğer eylemciler]
        S --> X[İşe özel deney sandbox'ı]
      end
      C --> M[Yerel S1 / S2 / araştırma model geçidi]
      S --> M
      A --> M
      C --> L[Kalıcı işlem defteri: tüm adımlar ve sonuçlar]
      W --> L
      S --> L
      A --> L
      X --> L
      M --> L
      L --> V[Katma değer seçimi, izin ve insan incelemesi]
      V --> K[Skill / RAG / fine-tune adayı]
      K --> Q[Bağımsız yerel değerlendirme ve insan terfisi]
      Q --> M
      Q --> C
    end
    B[Güçlü büyük dil modelleri: ayrı geliştirme alanı] --> D[Mimari karar, kod farkı, test ve geri alma planı]
    D --> T[İzole kabul ve insan onayı]
    T --> R[Sürümlü çalışma alanı şablonu ve sözleşmeler]
    R --> WS
    X --> E[Kanıt ve danışmanlık paketi]
    E --> H
```

Yerel modeller şirket içindeki kimliği doğrulanan ortak bir inference servisinden sunulabilir; her container'a ağırlıkları kopyalamak zorunlu değildir. İstek bağlamı, cache, adapter yetkisi ve kaynak kuyruğu çalışan/görev kapsamını korur. İşlem defteri ve kabul edilmiş öğrenme ürünleri container yaşam döngüsünden bağımsız, erişimi kontrollü kalıcı şirket deposunda tutulur. Alan kapansa veya yeniden yaratılsa da iz geçmişi kaybolmaz. Ortak öğrenmeye terfi, kaynak erişimini kendiliğinden genişletmez.

Öğretmen hattındaki girdiler varsayılan olarak sentetik veya paylaşımı onaylıdır. Şirket içi kayıtlar öğretmene otomatik aktarılmaz. Şemadaki her sonuç ve sürüm ilişkilendirilebilir kimlik taşır; oklar izin sınırlarını kaldırmaz. Bu şema hedef tasarımdır; çalışan container veya birleşik runtime kanıtı değildir.

## 2. Bileşen sorumlulukları

| Bileşen | Yapacağı iş | Yapmayacağı varsayım |
| --- | --- | --- |
| UMAY Core / AOS türevi | Çalışan alanı/görev kapsamı, iş yaşam döngüsü, kimlik/politika, typed tool gateway, iptal, GUI lease, kaynak bütçesi | Model çıktısından yeni yetki türetmez |
| Operator / Core System 1 | Taze gözleme göre izinli seçeneklerden hızlı eylem seçimi | Serbest shell veya mühendislik açıklaması üretme zorunluluğu yok |
| Supervisor / Core System 2 | Plan, kaynaklı açıklama, belirsizlik ve toparlanma | Araç geçidini veya insan kararını atlamaz |
| SWAPP Application Pack | Rol/tenant, UI profili, gözlem, parametreli akışlar, veri eşleme ve sonuç doğrulama | Henüz bilinmeyen endpoint veya selector uydurmaz |
| Scientist / AI-Scientist türevi | Deney önerme, çalıştırma, ölçme, kıyas, kaynaklı sonuç | Anomali skorunu arıza teşhisine veya kontrol komutuna dönüştürmez |
| Kalıcı işlem defteri | İnsan, servis ve eylemci işlemlerini aynı trace ile kaydetme; sıra, sonuç, hata ve kayıt bütünlüğü | Log içeriğini doğrudan eğitim onayı saymaz |
| Bilgi ve öğrenme hattı | Katma değer seçimi, corpus/skill/dataset hazırlama, yerel modele yönelik offline eğitim, evaluation ve terfi | Üretimde sessiz güncelleme yapmaz |
| Teacher & Build Lab | Mimari, kod/test üretimi, incelenecek öğretmen etiketi, eğitim tarifi ve hata incelemesi | Öğretmen cevabını bağımsız doğruluk kaynağı saymaz |
| Maliyet defteri | Geliştirme, provider, GPU, depolama ve insan emeği kullanımını ilişkilendirme | Eksik ölçümü sıfır veya tahmini faturalanmış maliyet saymaz |

**Eylemci model değildir.** Eylemci bir yetenek, araç yetkisi, girdi/çıktı sözleşmesi ve yaşam döngüsüdür. Model bu görevi yerine getirmek için kullandığı sürümlü bileşendir. Bir model birden fazla rolü destekleyebilir; aynı modelin paylaşımı ayrı eşzamanlılık ve bağlam izolasyonu testi gerektirir.

AI-Scientist kendi araştırma planını/Director döngüsünü korur. İçeride kullandığı S1/S2 etiketleri Core'un finite-choice Operator sözleşmesiyle aynı kabul edilmez. İki sistem `job_id`, `experiment_id`, veri ve sonuç sözleşmeleriyle bağlanır. Core uygulama yürütmesinin, Scientist deneyin sahibidir; iki bağımsız GUI yöneticisi açılmaz.

### Başka yerel uzman eylemcilere açıklık

UMAY, AI-Scientist ile sınırlı değildir. Yerelde çalışan yeni uzmanlar; sürümlü capability/agent kaydı ve adaptör üzerinden mevcut Core'a eklenir. Her uzman için görev ve sonuç şeması, model/engine uyumu, araç/veri izinleri, çalışan kapsamı, eşzamanlılık/kota, health/cancel ve bağımsız sonuç/cleanup kanıtı tanımlanır. Süreç tek GUI sahibini, log zincirini ve öğrenme ürünlerinin incelemesini korur. Bilinmeyen uzman/sürüm reddedilir; uzman ekleme modelin kendi kendine verdiği yetki değildir.

Yeni AOS kaynağındaki `AgentRegistration`, `AgentJobRequest`, `AgentOrchestrator` ve `AgentAdapter` bu amaçla yeniden kullanılacak temeldir. Adaptör yaşam döngüsü `prepare → dispatch → observe`, `request_cancel`, `verify_result`, `verify_cleanup` yöntemlerini kapsar. Kalıcı intent ve durum olayları SQLite'a yazılır; belirsiz etki yeniden yürütülmez. Mevcut sentetik CPU yürütücüsü keyfi güvenilmeyen kod için genel sandbox değildir. Genel kararlı plugin API'si veya bütün uzmanlarla uyumluluk teslim edilmiş sayılmaz. Açıklık genişletilebilirlik anlamındadır; lisans kararı ayrıdır.

GPU paylaşımında Scientist'in mevcut scheduler/broker'ı tek tahsis otoritesidir. Core görev bütçesi ve kuyruk kaydı bu otoritenin yerine geçmez; her çalışan/uzman ayrı GPU scheduler kurmaz. `stop_requested`, idle veya terminal rapor fiziksel GPU bırakım kanıtı değildir. Gerçek ortak çalışma, iptal ve cleanup yeni kaynak/config/caller çiftiyle kabul edilmelidir.

## 3. Mevcut tabandan kontrollü geliştirme

[Pinli kaynaklar](README.md) başlangıçtır. Yeni kayıtlı eylemci runner, izole proje yaşam döngüsü, Scientist CPU adaptörü ve manuel skill release/rollback yolları envantere dahil edilir. İlk iş mevcut S1/S2, registry, bilgi/skill, eğitim adayı, sandbox ve GPU paylaşım yollarını inceleyip UMAY gereksinimine karşı fark tablosu oluşturmaktır. Aynı işi yapan ikinci scheduler, registry veya bilimsel harness yalnız yeni isim vermek amacıyla yazılmaz.

Özel çalışma alanı için önerilen yerleşim:

```text
components/aos-core/          pinli AOS türevi ve küçük, izlenebilir patch'ler
components/ai-scientist/      pinli Scientist türevi
integrations/swapp/           özel uygulama profili ve veri eşleyiciler
packages/contracts/          sürümlü UMAY sınırları
packages/policy/             sunucu tarafı yetki ve veri politikası
learning/                    RAG, skill, dataset, recipe ve evaluation
deployment/linux/            çalışan container şablonu, izolasyon ve yaşam döngüsü profili
tests/acceptance/             sentetik ve izinli bağımsız kabul vakaları
project/                     kararlar, gerçek durum, maliyet ve devir kaydı
```

Bu yollar öneridir; bu public site deposunda runtime oluşturulması talimatı değildir. Submodule, vendor snapshot veya ayrı paket kararı kaynak/CI envanterinden sonra kaydedilir. Her türev için upstream URL/SHA, patch listesi, lockfile, hak envanteri, bakım sahibi ve kabul raporu tutulur. Upstream değişiklikleri gözden geçirilir; `latest` etiketi üretimi kendiliğinden güncellemez.

## 4. Özel alan ve veri sahipliği

| Varlık | Önerilen saklama ve erişim |
| --- | --- |
| Public manifesto ve genel mimari | Bu depo; genel ve sentetik içerik |
| SWAPP frontend/backend | Şirketin özel kaynak deposu; ayrı teslim/erişim |
| Ham kullanım izi, ekran, kullanıcı iş akışı, dijital ikiz verisi | Şirketin izinli, sınırlı erişimli deposu; amaca göre saklama süresi |
| İncelenmiş corpus, vektör indeks, skill, dataset | Şirket özel registry; kaynak/tenant/rol/izin sürümü korunur |
| Şirkete uyarlanmış LoRA ve değerlendirme artifact'leri | Şirket özel model deposu; temel model hakkı ve adapter bağı ayrı kaydedilir |
| Temel açık ağırlık model | İlgili modelin lisans/kullanım koşulları; şirket verisinden türeyen artifact ile aynı mülkiyet varsayılmaz |
| Kapalı model öğretmen çağrısı | Onaylı provider politikası, ölçülen model sürümü, izinli veri sınıfı ve maliyet kaydı |

Vektörler anonim veya zararsız kabul edilmez. Adapter da şirket bilgisi ve davranışı taşıyabilecek özel artifact'tir. Ayrı şirketlerin veri, cache, corpus ve adapter'ları ortak tenant bağlamına alınmaz. Dış provider'a kaynak kodu ya da gerçek iz gönderimi, belirli veri sınıfı için tanımlı şirket politikası yoksa kapalı kalır; diğer sentetik geliştirme işleri devam eder.

## 5. SWAPP'ı iyi bilmek nasıl ölçülür?

“Uygulamayı bilir” bir pazarlama iddiası olarak bırakılmaz. Kabul kataloğu şu akışları kapsar: izinli giriş ve rol/tenant doğrulama; doğru dijital ikiz/varlık seçimi; sinyal, birim, zaman dilimi ve pencere seçimi; sayfalama ve filtreler; izinli veri okuma/export; boş/yükleniyor/hata durumları; oturum sonu; sürüm değişiminde güvenli durma; sonucun bağımsız veri oracle'ıyla karşılaştırılması.

Gerçek depolar teslim edildiğinde arayüz ve veri şeması koddan çıkarılır; uygulanmış API yolu varsa belgelenir. O zamana kadar mock arayüz sadece sözleşme fizibilitesidir. API üzerinden veri almak GUI kullanma kabulünün yerine geçmez. DOM/erişilebilirlik gözlemi önceliklidir; vision ayrı yetenektir. Ekrandaki grafikten kesin zaman serisi uydurulmaz; izinli tablo/export yoksa bilgi eksikliği görünür tutulur.

SWAPP eylemleri tenant, oturum, uygulama build'i, skill sürümü, önkoşul, postcondition ve veri kapsamına bağlıdır. Var olmayan cihaz/alan, stale state veya yanlış birimde çalışmak başarı sayılmaz. İlk kapsam gezinme, okuma ve izinli export'tur; uygulamadaki kontrol niteliğindeki butonlar da kapsam dışıdır.

İleriki aşamada, teslim edilen uygulama destekliyorsa SWAPP olay/plan taslağı veya inceleme kaydı oluşturma gibi uygulama içi kayıt işlemleri ayrı capability olabilir. Bunlar belirli rol/alan kapsamı, işlem öncesi insan onayı, idempotency, bağımsız postcondition ve mümkünse undo ile kabul edilir. Uygulama kaydı oluşturma OT setpoint/start-stop veya alarm kontrolüyle aynı yetki değildir; kontrol sınırı korunur.

## 6. Linux, sandbox ve eşzamanlılık

İlk profilde Linux sürümü/kernel, CPU, RAM, GPU/VRAM, sürücü, model engine, disk ve GPU paylaşım davranışı ölçülüp kaydedilir. Asgari donanım ölçmeden vaat edilmez. CPU ile sözleşme ve küçük deney testleri mümkün olabilir; model/eğitim kapasite kabulü kullanılan gerçek cihazda yapılır.

Çalışan alanları arasında volume, tarayıcı profili, servis kimliği ve doğrudan ağ erişimi paylaşılmaz. Ayrı container sınırı tek başına tam güvence sayılmaz; yanlış çalışan kimliğiyle dosya, ağ, GUI, cache ve model bağlamına erişim olumsuz testlerle reddedilmelidir. Çalışma alanı yaşam döngüsü tahsis → başlatma → hazır → durdurma → arşivleme/yeniden kurulum olarak kayda girer. Log alıcısı hazır olmadan iş kabul edilmez.

Core, Scientist ve öğretmen ayrı süreç/yetki alanlarında çalışır. Deney sandbox'ı salt okunur girdi, işe özel yazılabilir çıktı, ağ varsayılanı kapalı, süre/CPU/RAM/GPU/disk kotası ve süreç grubu iptali taşır. Üretilen kod host shell, Docker socket, kimlik bilgisi veya genel ağ erişimini miras almaz. Timeout ve OOM terminal duruma, açıklamaya ve maliyet kaydına dönüşür.

Her çalışana ait GUI oturumunun tek etkin otomasyon sahibi vardır: `session_id + lease_id + fencing_token + expires_at`. Kaybedilmiş/eski lease ile araç çağrısı reddedilir. İnsan “devral” dediğinde yeni otomasyon çağrıları durur, eski lease geçersizleşir; devam ancak yeni sahiplik ve taze durumla olur. Paralel işler ayrı izole oturumlar veya sıraya alma kullanır. Tek fiziksel GPU paylaşımı kaynak ölçümü ve lease ile yürütülür; bellek dolması kapalı provider'a sessiz kaçış başlatmaz.

Gözlenen web içeriği, kullanım izi, doküman ve teacher çıktısı güvensiz girdi olarak işlenir. İçeriğin “bunu çalıştır” demesi yeni yetki değildir. Politika kontrolleri istemcide/promptta kalmaz; sunucu tarafı araç, retrieval ve provider sınırlarında uygulanır.

## 7. İşletim ve sürüm geçişi

İş sürümleri başlangıçta pinlenir: Core/Scientist, SWAPP build/skill, model/adapter, corpus, policy ve evaluation. Yeni sürüm önce aday ortamında sınanır; aktif sürüm pointer'ı insan terfisiyle atomik değişir. Çalışan işler kendi pinleriyle tamamlanır veya açıkça iptal edilir. Model/adapter/embedding değişimi ilgili indeks ve checkpoint uyumluluğunu yeniden değerlendirir.

İzleme; başarı/başarısızlık, doğru çekimserlik, gecikme ve kuyruk, kaynak kullanımı, drift, izin ihlali denemesi, öğretmen bağımlılığı ve maliyet kapsamını birlikte gösterir. Öğretmen kapalı olduğunda yerel kabul edilmiş akışların çalışabilmesi ayrı testtir. Kanıt depoları için restore provası ve seçili sürüme rollback testi yapılmadan “işletime hazır” denmez.

## 8. Tüm işlemleri kaydet, katkı sağlayanları seç

Kapsam çalışma alanındaki tüm iş işlemleridir: oturum/container yaşam döngüsü, insan SWAPP adımları, eylemci plan/araç istekleri, model çağrıları, veri erişimi, deney süreçleri, eğitim/değerlendirme, hata, yeniden deneme, iptal ve insan düzeltmesi. Her olay kim/ne yaptı, hangi çalışan/görev kapsamında, hangi sürümle, ne zaman, hangi sonuç ve maliyetle sorularını cevaplar. Eylem öncesi istek ve yürütme sonrası sonuç ayrı kaydedilir; süreç başlangıcı ve terminal sonucu bağlanır. Gizli düşünce zinciri gerekmez; gözlenebilir eylem ve kısa karar gerekçesi yeterlidir.

Kayıtlar uygulama, araç geçidi, model geçidi ve deney runner'ından güvenilir toplama hattına gider. Şirket politikasına göre arındırılmış stdout/stderr veya çıktı referansı tutulur; sırların, tüm tuşların ya da tüm ekranların sınırsız kaydı amaç değildir. Sıra boşlukları, kayıp olaylar, tekrarlar ve yazılamayan log açık hata olur. Dayanıklı kayıt veya onaylanmış kalıcı tampon yoksa yeni eylem başlatılmaz; devam eden iş güvenli noktada durdurulur. Tampon yeniden gönderimi idempotent işlenir, kayıtlar sessizce atılmaz. Durdurma/iptal güvenliği log kesintisine bağlı tutulmaz; son durum erişim geri geldiğinde uzlaştırılır.

Ham denetim kaydı ile öğrenme adayı farklıdır. Değer seçimi; doğrulanmış sonuç, tekrar kullanım, insan düzeltmesinin etkisi, hata çözümü, kalite artışı veya ölçülen zaman/maliyet katkısıyla gerekçelendirilir. Başarısız bir işlem de doğrulanmış ders taşıyabilir. Seçilmeyen kayıt saklama politikası içinde denetim amacıyla kalır; öğrenmede kullanılmaz. Seçilen kayıt, izin ve veri temizliği kontrolünden sonra skill, RAG veya role özgü fine-tune adayına bağlanır. Ayrıntı: [Öğrenme](LEARNING.md).

## 9. Mimari değişikliklerin geliştirme hattı

Container topolojisi, Core/eylemci sorumluluğu, sözleşmeler, veri akışı, model yönlendirmesi veya yetki sınırı değişikliği **güçlü büyük dil modelleriyle** ayrı geliştirme ortamında hazırlanır. Claude/OpenAI gibi erişilebilir güçlü modellerin seçimi iş başında kaydedilir; model adı mimari onay yerine geçmez.

Her değişiklik bir `ArchitectureChange` kaydı taşır: problem ve gerekçe, mevcut/hedef sürüm, alternatifler, model kimliği, etkilenen bileşenler, kod/config farkı, sözleşme/veri migration'ı, izolasyon ve regresyon testleri, maliyet, insan incelemesi ve rollback hedefi. Süreç öneri → izole aday → kanıtlı inceleme → insan onayı → sürümlü dağıtım şeklindedir. Günlük yerel eylemciler sorun veya değişiklik ihtiyacı önerebilir; çalışan sistemin mimarisini, policy'sini veya dağıtım şablonunu kendiliğinden değiştirmez. Öğretmen kapalıyken kabul edilmiş günlük akışlar sürer; yeni mimari değişiklik onaysız uygulanmaz.
