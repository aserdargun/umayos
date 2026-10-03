# UMAY OS — Sınır sözleşmeleri

Durum: önerilen `umay.contracts/0.2` · [Paket dizini](README.md).

Bu belgedeki alanlar UMAY için hedef tasarımdır; AOS/AI-Scientist'in mevcut API'si veya henüz teslim edilmemiş SWAPP endpoint'leri değildir. İlk geliştirme işi bunları mevcut tiplerle eşleyip gerekli JSON Schema ve uyumluluk testlerini **özel runtime deposunda** üretmektir. Aşağıdaki örnekler tamamen sentetiktir.

## 1. Ortak zarf ve doğrulama

İşe/veriye bağlı kalıcı kayıtlar `schema_version`, kayıt kimliği, `tenant_id`, `employee_ref`, `workspace_id`, `workspace_run_id`, `trace_id`, UTC zaman, veri sınıfı, köken ve izin/policy sürümü taşır; köken/izin bilgisi bağlı immutable manifest üzerinden de çözülebilir. Paylaşılabilir eylemci tanımı gibi registry şablonları görev zarfı taşımaz; etkin deployment onları tenant, izin ve sürüm kapsamına bağlar. Kimlikler anlamdan bağımsız opaque değerlerdir; örneklerdeki `synthetic-*` gerçek şirket veya kullanıcı değildir. UTC saklanır, kaynak zaman dilimi ve birim ayrıca korunur. Kaynak dosyaları içerik hash'iyle, kod/model/indeks sürümleri immutable revision ile bağlanır.

Şema kontrolü tek başına erişim denetimi değildir. Sunucu kimlik/tenant/çalışan ve workspace bağını güvenilir oturum ile tahsis kaydından türetir; istemcinin yazdığı `tenant_id` yetki vermez. Kritik sınır tiplerinde bilinmeyen alanlar ve bilinmeyen enum/sürüm reddedilir; migration açık sürüm eşlemesiyle yapılır. `null` bilinmeyen/değer yok demektir; sıfır anlamına gelmez.

| Kayıt | Gerekli çekirdek alanlar | Bağımsız denetim |
| --- | --- | --- |
| `EmployeeWorkspace` | employee/workspace/run, image digest, service pins, volume/network/browser scope, quotas, state, log sink | Çalışanlar arası erişim reddi, yeniden kurulum ve kalıcı kayıt testi |
| `OperationEvent` | employee/workspace/run, actor_kind, session/job/attempt, event/parent/sequence, action, timestamps, status, result/error refs, policy, pins | İstek/başlangıç/terminal bağları, eksik olay, tekrar, arındırma ve kalıcılık |
| `ArchitectureChange` | gerekçe, model identity, mevcut/hedef sürüm, diff, migration, test/evidence, reviewer/approval, rollout/rollback | Güçlü modelle hazırlama kaydı; günlük eylemciye mimari yazma yetkisi verilmemesi |
| `TaskRequest` | capability, input_refs, actor/scope, policy, budgets, pins, idempotency_key, deadline | Aktör ve veri yetkisi; desteklenen capability ve bütçe rezervasyonu |
| `ExperienceEvent` | session/task, uygulama/skill sürümü, gözlem/eylem/sonuç referansı, outcome, izin ve minimizasyon | Eylemi önerdi/çalıştırdı/doğruladı ayrımı; sır ve kişisel veri kontrolü |
| `DataSnapshot` | twin/asset, alan-birim eşlemesi, örnekleme, zaman, kalite/missingness, export/hash, provenance | Beklenen varlık/tenant/pencere ve kaynak oracle'ı |
| `ExperimentSpec` | snapshot/feature/split, hipotez, baseline/candidate, recipe/seeds, metrics/limits, budget | Dondurulmuş değerlendirme ve veri sızıntısı kontrolü |
| `ExperimentResult` | spec/hash, run status, metrics/uncertainty, failed trials, artifact/code/env refs | Tekrar üretim, bütçe mutabakatı, kapsam dışı iddia kontrolü |
| `AdvisoryPacket` | question, evidence_refs, findings, alternatives, uncertainty, next_steps, decision_required | Her sayısal bulgunun hesap artifact'ine bağlanması |
| `AgentManifest` | capability ve schema version, tool/data scope, runtime/model requirements, limits, cancel/health | En dar yetki, uyumsuzlukta ret, kaynak ve iptal testi |
| `ModelRelease` | base/tokenizer/template/engine hash, adapter bağı, role/capability, evaluation, approval | Uyumlu yükleme; bağımsız rol ve pair regresyonu |
| `LearningCandidate` | source_event_refs, selection_reason, value_evidence/metric, target_role/model, corpus/dataset/skill refs, lineage, rights/use profile, split/evaluation, teacher provenance | Kaynak hakkı, holdout izolasyonu ve insan terfisi |
| `CostEvent` | activity/job/run, provider/resource, usage/rate, amount/currency, status, invoice/dedupe | Rezervasyon/gerçekleşen ayrımı, eksik kayıt görünürlüğü, çift sayma kontrolü |

## 2. İş ve izin örneği

```json
{
  "schema_version": "umay.task/0.2",
  "job_id": "synthetic-job-001",
  "trace_id": "synthetic-trace-001",
  "tenant_id": "synthetic-company",
  "employee_ref": "synthetic-employee-001",
  "workspace_id": "synthetic-workspace-001",
  "workspace_run_id": "synthetic-workspace-run-001",
  "created_at": "2026-10-03T09:00:00Z",
  "data_class": "synthetic",
  "capability": "scientist.twin_anomaly_experiment",
  "input_refs": ["synthetic-snapshot-001"],
  "actor_ref": "synthetic-authorized-reviewer",
  "scope": {"assets": ["synthetic-twin-001"], "tools": ["data.read", "experiment.run"]},
  "policy_revision": "synthetic-policy-v1",
  "pins": {"agent_release": "synthetic-scientist-v1", "model_release": "synthetic-worker-v1"},
  "budget": {"max_wall_seconds": 300, "max_cpu_seconds": 600, "max_gpu_seconds": 120, "cost_reservation_ref": "synthetic-reservation-001"},
  "idempotency_key": "synthetic-job-001-attempt-1",
  "deadline_at": "2026-10-03T09:05:00Z"
}
```

`scope.tools` tanınan capability kimlikleridir; gerçek HTTP adresi değildir. Policy geçidi veri okuma ve deney başlatma öncesinde aktör/tenant/asset, kaynak izni, sürüm ve bütçeyi yeniden denetler. Yetkinin sonradan kaldırılması mevcut işin yeni veri/araç adımlarını durdurur.

İş durumu: `QUEUED → RUNNING → VERIFYING → COMPLETED`; ara beklemeler `WAITING_RESOURCE`, `WAITING_TOOL`, `WAITING_HUMAN`; terminal alternatifler `FAILED`, `CANCELLED`. `CANCEL_REQUESTED`, süreç durana dek terminal değildir. Deadline, iptal ve takeover tüm alt deney süreçlerine yayılır. Model cevabı işin tamamlandığını kanıtlamaz; sonuç doğrulama gerekir.

Salt okunur tekrarlar bounded retry ve backoff ile yapılabilir. Yan etki veya belirsiz sonuç varsa otomatik replay yapılmaz; idempotency ve postcondition üzerinden mevcut durum çözülür. Yinelenen kayıtlar `idempotency_key`/event kimliğiyle ayıklanır. Hata nesnesi `code`, `retryable`, `safe_detail`, `evidence_ref` taşır; sır/ham ekran hata mesajına sızmaz.

## 3. Ortak işlem defteri ve insan kullanım izi

`OperationEvent` tüm iş işlemlerinin denetim zarfıdır; `ExperienceEvent` öğrenmeye uygun bağlam/düzeltme ekleyen, bu olaya referans veren türevidir. Her denetim kaydı öğrenme adayı olmak zorunda değildir. `actor_kind` insan/eylemci/servis ayrımını, `parent_event_id` neden-sonuç bağını, `attempt_id` yeniden denemeyi taşır. Sıra numarası üretici ve workspace run kapsamında monotondur; farklı üreticilerin nedenselliği parent/trace üzerinden kurulur.

Asgari olay sözlüğü: workspace tahsis/başlatma/hazır/durdurma, oturum giriş/çıkış, UI eylemi, araç isteği/sonucu, model isteği/sonucu, veri erişimi, deney/eğitim/değerlendirme başlangıcı/sonucu, düzeltme, retry, iptal ve terfi. İşlem adedi ve terminal kayıtlar güvenilir yürütücüyle uzlaştırılır. Yetki reddi ve OOM/timeout da kayıt üretir. Event kimliğiyle dedupe, sıra boşluğu alarmı ve yeniden gönderim gerekir; kaydı eksik iş `verified_success` olamaz.

Collector onayı veya şirketçe onaylı dayanıklı tampon yazımı yürütme önkoşuludur. İkisi de yoksa yeni eylem durur; aktif iş güvenli noktada bekler/durur. Acil durdurma engellenmez. Container silinse bile onaylanmış log kaybolmaz; append-only depoda düzeltme önceki olaya referanslı yeni olaydır. Saklama süresi, arındırma ve yetkili silme ayrıca uygulanır.

### İnsan kullanım izi örneği

```json
{
  "schema_version": "umay.experience/0.2",
  "event_id": "synthetic-event-001",
  "operation_event_ref": "synthetic-operation-001",
  "trace_id": "synthetic-trace-002",
  "tenant_id": "synthetic-company",
  "employee_ref": "synthetic-employee-001",
  "workspace_id": "synthetic-workspace-001",
  "workspace_run_id": "synthetic-workspace-run-001",
  "occurred_at": "2026-10-03T09:10:00Z",
  "data_class": "synthetic",
  "source_kind": "synthetic_human_workflow",
  "session_ref": "synthetic-session-001",
  "actor_ref": "synthetic-pseudonymous-actor",
  "application_build": "synthetic-swapp-build-v1",
  "action_type": "view.time_range_selected",
  "observation_ref": "synthetic-redacted-observation-001",
  "action_ref": "synthetic-action-001",
  "result_ref": "synthetic-verified-result-001",
  "outcome": "verified_success",
  "capture_policy_revision": "synthetic-capture-policy-v1",
  "learning_use": "review_required",
  "retention_until": "2026-11-03T00:00:00Z",
  "leakage_group": "synthetic-event-family-001"
}
```

Parola, token, tuşların eksiksiz kaydı veya tüm ekranın sürekli videosu varsayılan veri değildir. Görev için gerekli olay ve arındırılmış gözlem seçilir. `verified_success` sonuç kontrolünü ifade eder; bu tek başına eğitim onayı, kök neden doğrulaması veya genellenebilir en iyi yöntem etiketi değildir. İnsan düzeltmesi, terk edilen adım ve hata farklı outcome'lar olarak tutulur.

## 4. Veri ve deney referansları

`DataSnapshot`, dijital ikiz kimliği ile temsil ettiği fiziksel varlığı ayrı tutar. Gerekli alanlar: kaynak `origin_kind` (`measured`, `simulated`, `synthetic`), twin sürümü/kalibrasyonu, varlık kapsamı, `[start, end)` aralığı, timezone, örnekleme/değişken sıklık, kanal/birimler, quality flag'ler, missingness, izinli export/hash ve kaynak değişiklik zamanı. Birim dönüşümü ve resampling ayrı sürümlü dönüşümlerdir; boş veriler sessizce sıfıra çevrilmez.

`ExperimentSpec` bu immutable snapshot'a bağlanır; veri bölmesi deneme başlamadan dondurulur. `ExperimentResult` aynı spec'i, seed'leri, kod/env kimliğini, tamamlanmayan koşuları ve kullanılan kaynağı bildirir. Araştırmacı model yalnız hesap çıktılarından rapor üretir; LLM cevabındaki sayı metrik yerine geçmez.

`AdvisoryPacket` makinece doğrulanmış bulgu ile yorum/hipotezi ayırır. Her bulgu `claim_id → evidence_ref → calculation_ref → snapshot_ref` zinciri taşır. Eksik etiket, düşük temsil, drift ve kaynak erişim kısıtı açıkça yazılır. “İnsan kararı gerekli” bir bilgi alanıdır; bir butona kendiliğinden basma yetkisi değildir.

## 5. Eylemci ve model yayını

Sistem başka yerel uzmanlara açıktır. Aşağıdaki UMAY `AgentManifest`, AOS'un mevcut `AgentRegistration` kaydına ve altı yöntemli `AgentAdapter` yaşam döngüsüne eşlenecek hedef üst sözleşmedir; doğrudan mevcut wire tipi diye kullanılamaz. Adaptör türü, tam sürüm, capability, en fazla aktif iş, toplam/iş bütçesi, izin kapsamı, health/cancel, log ve bağımsız sonuç/cleanup kanıtı kabul edilir. Paylaşılan GPU tahsisi Scientist broker'ında kalır. CPU-only uzmanın fiziksel cleanup kapsamı ayrıca tanımlanır; GPU yetkisi otomatik verilmez.


```json
{
  "schema_version": "umay.agent/0.1",
  "agent_id": "synthetic-scientist",
  "agent_version": "0.1.0",
  "capabilities": ["scientist.twin_clustering", "scientist.twin_anomaly_experiment"],
  "request_schema": "umay.task/0.2",
  "result_schema": "umay.advisory/0.1",
  "tools": ["data.read", "experiment.run"],
  "network_default": "deny",
  "gui_owner": "core",
  "model_role": "research_worker",
  "cancel_behavior": "terminate_job_process_group",
  "max_parallel_jobs": 1,
  "evaluation_ref": "synthetic-evaluation-not-yet-run",
  "release_state": "candidate"
}
```

Model yayını için temel ağırlık revision/hash'i, tokenizer revision/hash'i, chat template, engine/code revision, quantization/config, context sınırı ve yetenekler zorunlu eşlemedir. LoRA varsa `base_model_ref`, hedef modüller, rank/alpha, eğitim checkpoint'i, dataset/recipe ve adapter hash'i eklenir. Inference dosyası eğitilebilir checkpoint sayılmaz. Embedding yayını boyut, model revision, normalizasyon/chunking ve indeks sürümünü taşır.

Örnek `evaluation_ref` açıkça henüz koşulmamış adaydır. Üretim durumuna geçiş için gerçek değerlendirme sonucu, yetkili reviewer, onay zamanı ve rollback hedefi gereklidir. Bir manifest'in yüklenebilmesi yeteneğin kabul edildiği anlamına gelmez.

## 6. Maliyet kayıtları

```json
{
  "schema_version": "umay.cost/0.2",
  "event_id": "synthetic-cost-001",
  "trace_id": "synthetic-trace-001",
  "tenant_id": "synthetic-company",
  "employee_ref": "synthetic-employee-001",
  "workspace_id": "synthetic-workspace-001",
  "workspace_run_id": "synthetic-workspace-run-001",
  "occurred_at": "2026-10-03T09:05:00Z",
  "data_class": "synthetic",
  "activity": "experiment",
  "job_id": "synthetic-job-001",
  "reservation_ref": "synthetic-reservation-001",
  "resource_kind": "local_gpu",
  "usage": {"gpu_seconds": 94, "energy_kwh": null},
  "rate_revision": null,
  "currency": "TRY",
  "forecast_amount": null,
  "actual_amount": null,
  "cost_status": "pending_measurement",
  "invoice_ref": null,
  "dedupe_key": "synthetic-job-001-local-gpu-final"
}
```

Bu örnekte 94 GPU saniyesi ölçülmüş olsa bile enerji/tarife/fatura bilgisi yoktur; maliyet bilinmiyor. Üretimde bilinmeyen kaynak için bütçe tahmini/rezervasyon politikası olmadan ücretli iş kabul edilmez. Ön tahmin, `reserved` tutar ve gerçekleşen kayıt aynı toplamda toplanmaz. İptal sonrası yapılan harcama düşülmez; kullanılmayan rezervasyon bırakılır. Fatura gecikirse `pending_reconciliation` kalır. Düzeltme/iadeler eski kaydı silmek yerine referanslı ek kayıtla işlenir.

Provider için input/output/cached token, çağrı/tekrar, model/version, fiyat tarihi, bölge/vergi kapsamı ve fatura eşlemesi tutulur. Yerel GPU/CPU, depolama/egress, deney/eğitim tekrarları, kod geliştirme ve insan inceleme saatleri aynı faaliyet kimliğine bağlanır. Amortisman veya saatlik iç tarife **dağıtılmış tahmini maliyet**, ölçülmüş kullanım ve faturalanan bedel ayrı sınıflardır. Çoklu para birimi tek toplam yapılacaksa tarihli kur ve dönüşüm kaynağı zorunludur.

## 7. Sözleşme kabulü

İlk test paketi iki sentetik çalışan alanında dosya/ağ/oturum/cache izolasyonu, container yeniden kurulunca log kalıcılığı, collector kesintisi/dedupe/sıra boşluğu, mimari değişiklikte yetkisiz terfi reddi ve geçerli sentetik akışla birlikte yanlış tenant, iptal edilmiş kaynak, eski GUI lease, bilinmeyen sürüm, deadline/OOM, yinelenen maliyet kaydı, para birimi uyuşmazlığı ve eksik maliyet durumlarını kapsar. Beklenti test başlamadan yazılır. Mock geçişi `contract_only`; yerel gerçek SWAPP `local_application`; kurum içi gerçek erişim `institutional` kanıt sınıfıyla raporlanır. Bu sınıflar birbirinin yerine kullanılamaz.

Sözleşme 0.2, çalışan/workspace/run kapsamını ekler. Task, Experience, Experiment ve Cost örnekleri bu nedenle 0.2 olarak sürümlendi; değişmeyen Agent şablonu ve Advisory tipi kendi 0.1 sürümünü korur. Eski kayıtlar çalışan bağı kanıtlanmadan 0.2 diye yeniden etiketlenmez; açık migration veya arşivde eski sürüm olarak okuma gerekir. Ortak şirket faaliyeti için çalışan alanları `null` olabilir; bunun için ayrıca doğrulanmış şirket kapsamı gerekir. Çalışana bağlı işlerde bu alanlar zorunludur. Registry şablonu ile çalışan deployment'ı ayrı kayıtlardır.
