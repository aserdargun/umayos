# UMAY OS — İlk Scientist uygulaması

Durum: deney tasarımı ve kabul planı · [Paket dizini](README.md).

İlk ürün dilimi SWAPP'taki dijital ikizler üzerinden işletme rejimlerini kümelemek, rejime bağlı anomali modellerini kıyaslamak ve tekrarlanabilir deney düzenekleri kurmaktır. AI-Scientist her çalışanın izole Linux container alanında öneri/deney/değerlendirme döngüsünü sağlar; deney kodu ek iş sandbox'ında çalışır. Tüm adımlar, başarısızlıklar ve sonuçlar çalışan/workspace/run kimliğiyle kalıcı işlem defterine bağlanır. Veriyi toplama yetkisi Core'dan, sayısal sonuçlar deterministik hesaplardan, son mühendislik kararı insandan gelir.

## 1. Mevcut bilimsel tabanı kullan

Pinli AI-Scientist'teki başlangıç noktaları:

| Kod alanı | Yeniden kullanılacak sorumluluk | UMAY farkı |
| --- | --- | --- |
| `lab/api/mode_sources.py` | `SourceCatalog` ve `DatabaseSnapshotRequest` | Teslim edilecek SWAPP verisini izinli kaynak/sensör/zaman sözleşmesine eşleme |
| `lab/api/mode_experiments.py` | Snapshot store ve grid kayıtları | Tenant, twin/asset, maliyet ve Core job bağı |
| `lab/operating_modes/contracts.py`, `model.py` | Mode sözleşmeleri ve LSH/OPTICS/SOM yolları | Seçilmiş veri ve bağımsız test için baseline karşılaştırması |
| `lab/director/loop.py`, `budget.py` | Director ve proposal/wall/token bütçesi | Kurumsal yetki ve gerçek maliyet mutabakatı; token bütçesi fatura defteri değildir |
| `lab/llm/aos_gpu_broker.py` | Sınırlandırılmış GPU iş sırası | Core model/deney bütçesi ve iptal zinciri |
| `lab/training/sft_export.py` | İncelenmiş SFT export yolu | Şirket için uygun hak/kullanım profili; mevcut research profili otomatik genişletilmez |

Kaynak: [pinli Scientist ağacı](https://github.com/aserdargun/ai-scientist/tree/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe). Bu modüllerin varlığı UMAY entegrasyonunun test edildiğini göstermez. [Operating modes / OMR belgesi](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/docs/ai-scientist/42-operating-modes-omr-experiments.md) mevcut bilimsel çerçeve için referanstır. OMR **Overall Model Residual** anlamındadır; RUL değildir.

### Yeni kaynakta gelen uygulama temeli

AI-Scientist ürün teslimi `v0.1.0`, harness/konsol sürümü `0.46.0` olarak ayrıdır. CPU field-lab; LSH/OPTICS/SOM, NN/residual/OMR, anomali baseline'ları ve kalıcı rapor yollarını içerir. Bağımsız Scorer ve deterministik Referee korunur. `lab/director/field_context.py` kullanıcı beyanı saha amacını, `history_context.py` açık seçilmiş geçmiş bulguları bağlar; uygulama varlık yetkisini ispatlamaz. `lab/api/contracts.py` bu alanları opsiyonel taşır.

AOS yeni kaynağındaki CPU adaptörü için gerçek API/deney/Scorer kabulü raporlanmıştır; karar/onay sürücüsü fixture'dır. Stop kabulü pipeline sınırındadır; aktif Scorer kesintisi kanıtlanmamıştır. AOS belgesinin atıf verdiği ayrı CPU capability candidate'ı ile public Scientist pininin aynı içerik olduğu varsayılmaz: yeni `/v1/aos-cpu-capability` yolu incelenen public Scientist `lab/` kaynağında bulunmadı. Aynı kaynak/config çifti ve wire sözleşmesi ilk entegrasyon işi olarak doğrulanır. Ayrıntı: [upstream incelemesi](../UPSTREAM_REVIEW_2026-10-03.md).

## 2. Dijital ikiz veri sözleşmesi

İlk kapsam tek varlık ailesi ve sınırları belli bir tarih aralığıdır. İkiz simülasyon mu, ölçümün görsel temsili mi, yoksa kalibre edilmiş fiziksel model mi: teslim sırasında açıkça kaydedilir. İkizin var olması fiziksel doğruluğunu kanıtlamaz. `twin_id`, `asset_id`, model/kalibrasyon sürümü, veri kökeni, sampling, zaman dilimi, sensör birimleri, işletme modu/yük ve kalite flag'leri birlikte alınır.

SWAPP kodu geldiğinde veri erişim/export yolu ve kaynak oracle'ı gerçek uygulamadan çıkarılır. Eksik backend endpoint'leri bu belgede tahmin edilmez. Sentetik seed ile bilinen sonuçlar ve izinli tarihsel veri ayrı veri setleri olur. Kullanıcı kullanım izleri UI becerisi içindir; sensör verisinin fiziksel anomali etiketi yerine kullanılamaz.

## 3. Üç deney paketi

| Paket | Soru ve aday yöntemler | Beklenen çıktı |
| --- | --- | --- |
| E1 — İşletme rejimleri | Benzer çalışma koşulları tutarlı gruplar oluşturuyor mu? Mevcut mode yolları ve gerekli basit referans yöntemler kıyaslanır | Kümeler, kapsama/out-of-mode oranı, değişik seed/pencere kararlılığı, uzman yorumlaması |
| E2 — Rejime bağlı anomali | Aynı rejimde beklenmeyen sapmalar basit eşik/residual baseline'a göre daha yararlı bulunuyor mu? | Skor, kaynak/sensör residual'ları, olay bazlı yanlış alarm ve gecikme; eşik calibration'dan |
| E3 — Deney düzeneği | Sabit veriden, kod/env/seed ile aynı sonuç üretilebiliyor mu? | Spec, çalıştırma izi, sonuç artifact'i, kaynak/bütçe, başarısız koşular ve tekrar üretim raporu |

Küme numarası işletme gerçeği/arıza etiketi değildir. Silhouette veya benzeri iç metrik tek başına anlamlı fiziksel rejim kanıtı sayılmaz. Küme kararlılığı, rejim kapsaması ve alan uzmanı değerlendirmesi birlikte gerekir. Anomali skoru arıza tanısı değildir; bakım kaydıyla doğrulama, sensör hatası, yük değişimi ve veri kalitesi alternatifleri korunur.

## 4. Deney protokolü

1. Soruyu, başarı ölçütünü, veri kapsamını, kullanım hakkını ve bütçeyi yaz; veri/alan sahibi onayını kaydet.
2. Snapshot hash'i ve kaynak/kalite raporu üret. Kalitesiz, stale veya birimi bilinmeyen girişte açık hata/çekimserlik uygula.
3. Aynı olay/varlık ailesine ait çakışan pencereleri grupla. Zamansal ve gerekiyorsa saha/varlık bazlı train–calibration–evaluation ayrımını dondur.
4. Feature ve preprocessing'i yalnız train'e fit et. Kontaminasyon ihtimalini ve dışlanan alanları raporla.
5. Baseline ve adayları aynı veri/split ve hesap bütçesinde çalıştır. Hiperparametre araması evaluation setini görmez; bütün denemeler, başarısızlıklar dahil, kayda girer.
6. Anomali eşiklerini calibration setinde seç. Bilinen olay varsa olay bazlı precision/recall, false alarms per operating hour ve detection delay hesapla; uygun güven aralığı/örnek kapsamı ver.
7. Etiket yoksa duyarlılık/precision iddiası yapma. Kör uzman incelemesi, cluster kararlılığı, coverage ve sentetik enjeksiyon ayrı keşif kanıtlarıdır. Sentetik bozulmanın başarısı gerçek arıza tespiti kabulü değildir.
8. Yeni bir süreç/temiz ortamda seçili koşuyu tekrar çalıştır. Veri/kod/env/seed uyuşmasını ve kabul edilmiş toleransı doğrula.
9. Kaynaklı Advisory Packet üret: bulgu, hesap, alternatif, belirsizlik, önerilen yeni gözlem ve insan kararı.

Bir olayın yüzlerce kayan penceresi yüzlerce bağımsız vaka sayılmaz. İstatistiksel karşılaştırma bağımsız olay/varlık gruplarına göre yapılır. Zamanla değişen yük, mevsim, bakım sonrası durum ve sensör değişimi model drift'i için ayrı izlenir.

## 5. Sentetik deney şartnamesi

```json
{
  "schema_version": "umay.experiment/0.2",
  "experiment_id": "synthetic-exp-001",
  "trace_id": "synthetic-trace-001",
  "tenant_id": "synthetic-company",
  "employee_ref": "synthetic-employee-001",
  "workspace_id": "synthetic-workspace-001",
  "workspace_run_id": "synthetic-workspace-run-001",
  "created_at": "2026-10-03T09:00:00Z",
  "data_class": "synthetic",
  "policy_revision": "synthetic-policy-v1",
  "question": "İşletme rejimi ayrımı sentetik sapma incelemesini iyileştiriyor mu?",
  "snapshot_ref": "synthetic-snapshot-001",
  "feature_recipe_ref": "synthetic-features-v1",
  "split_ref": "synthetic-group-time-split-v1",
  "baseline_ref": "synthetic-global-residual-v1",
  "candidate_ref": "synthetic-mode-conditioned-residual-v1",
  "seeds": [11, 23, 47],
  "metrics": ["false_alarms_per_operating_hour", "event_recall", "detection_delay_seconds", "coverage"],
  "threshold_selection": "calibration_only",
  "evaluation_access": "isolated_runner",
  "budget_ref": "synthetic-reservation-001",
  "claim_scope": "synthetic_feasibility_only"
}
```

Bu örneğin metriklerinin hesaplanabilmesi sentetik enjeksiyon etiketlerinin mevcut olmasına bağlıdır. Özel kurum için gerçek eşikler ve örnek büyüklüğü veri görüldükten sonra, aday sonucuna bakılmadan protokole yazılır.

## 6. Başarı ve durdurma koşulları

Başarı; doğru kaynaktan veri, tekrarlanabilir hesap, bağımsız değerlendirme, açık belirsizlik ve ölçülen maliyetin birlikte sunulmasıdır. İyileşme görülmeyen bir deney de doğru yürütülmüş araştırma sonucudur. Aday `KEEP` seçilmesi işletime veya saha kullanımına terfi değildir.

Yanlış tenant/varlık, geçersiz izin, bozuk birim/zaman, sızmış holdout, bütçe aşımı, sandbox kaçış denemesi veya kontrol komutu talebi işi durdurur ve kanıtlı hata üretir. Yetersiz veri/etiket fiziksel sonucu sınırlı bırakır; uygun next step insan incelemesi veya yeni veri toplama olabilir.

İlk uçtan uca kabul: sentetik yerel SWAPP'ta doğru ikizi seç → izinli export'u kaynakla doğrula → immutable snapshot → baseline ve aday deney → tekrar üretim → kaynaklı rapor → maliyet mutabakatı. Gerçek frontend/backend üzerinde bu akış görülmeden “SWAPP'ı iyi kullanıyor”; izinli kurum ortamında sınanmadan “kurum içinde çalışıyor” denmez.
