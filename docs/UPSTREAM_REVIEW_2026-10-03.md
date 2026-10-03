# AOS ve AI-Scientist — yeni push incelemesi

Tarih: **3 Ekim 2026** (Europe/Istanbul). Kapsam: public `main` kaynaklarının geçici, ayrı checkout'larda commit farkı, belge ve seçili uygulama kodu incelemesi. Upstream testleri, model/GPU servisleri veya özel SWAPP bu çalışmada çalıştırılmadı. Aşağıdaki kabul sonuçları upstream'in raporlarıdır; UMAY kabulü değildir.

| Depo | Önceki manifesto pini | İncelenen yeni pin | Fark |
| --- | --- | --- | --- |
| AOS | `ed6e857b0e61e9c19c8ba63933e2cc9f318fe444` | [`dfd06322219b9295c5fc618bef180464b3d17767`](https://github.com/aserdargun/aos/commit/dfd06322219b9295c5fc618bef180464b3d17767), 3 Ekim 18:18:26 +03:00 | 4 commit; 496 dosya |
| AI-Scientist | `67258cdef33032c9a49eeae31c2e2ba26a98ca17` | [`01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe`](https://github.com/aserdargun/ai-scientist/commit/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe), 3 Ekim 18:00:44 +03:00 | 6 commit; 401 dosya |

Git remote HEAD/main readback, clone HEAD ve `git diff <önceki-pin>..HEAD` karşılaştırıldı. Dosya sayıları belge/şema/test/kullanım kayıtlarını da kapsar; özellik veya tamamlanma sayısı değildir. Scientist'taki son üç commit kullanım gözlemlerini günceller; ürün teslimi `7e4bacf`, v0.1.0 sürümleme kaydı `384f052` commit'lerindedir. Pinler inceleme anına aittir; sonraki push'lar otomatik kabul edilmez.

## Bulgular ve manifestoya etkisi

| Alan | Yeni kaynakta görülen | UMAY içeriğine etkisi ve açık iş |
| --- | --- | --- |
| AOS uzman yürütücüsü | `AgentRegistration`, `AgentJobRequest`, `AgentOrchestrator`, altı yöntemli adaptör; kalıcı hazırlık/dispatch/iptal intent'i ve bağımsız sonuç/cleanup kanıtı | Başka yerel uzmanlara açıklık somut kaynak temeline bağlandı. Genel kararlı plugin API'si ve her uzmanla uyumluluk iddia edilmedi. |
| AOS izole projeler | Ayrı manager root, port, UI ve container yaşam döngüsü; belgede gerçek CPU fixture yaşam döngüsü kabulü | Çalışan alanı tasarımında yeniden kullanılacak. İnsan çalışan/tenant yetkisi, SWAPP dağıtımı ve çok çalışanlı model kabulü ek UMAY işi. |
| AOS skill geçmişi | Manuel parametre skill review/release/selection/rollback ve kalıcı geçmiş | İncelenmiş skill hattı sıfırdan yazılmayacak. Manuel sentetik release, modelin öğrenmesi veya gerçek SWAPP ustalığı değildir. |
| AOS–Scientist CPU | Ayrı CPU capability adaptörü ve servis bileşimi. Upstream gerçek API/deney/Scorer ve bağımsız rapor kabulünü, fixture karar/onay sürücüsüyle raporluyor | “Hiç bağlantı yok” anlatısı kaldırıldı. Kullanıcı UI/model/GPU kabulü ve aynı public kaynak çiftiyle yeniden üretim açık kaldı. |
| AI-Scientist teslimi | Ürün `v0.1.0`, teknik harness/konsol `0.46.0`; CPU field-lab, LSH/OPTICS/SOM, NN/residual/OMR ve anomali baseline'ları | İlk uzman yalnız gelecek planı olarak anlatılmıyor; mevcut bağımsız laboratuvar ile UMAY/SWAPP uyarlaması ayrılıyor. |
| Araştırma hafızası | `field_intent`, açık `prior_experience` seçimi, immutable snapshot ve rapor bağları; bağımsız Scorer ve deterministik Referee | Kaynaklı deney hafızası yeniden kullanılacak. Varlık etiketi kullanıcı beyanı; yetkili SWAPP resolver'ı gerekli. Otomatik fine-tune veya model terfisi sayılmaz. |
| Ortak GPU | Scientist scheduler/broker tek otorite; shared-only AOS kaynak/CPU hazırlığı ve açık gerçek kabul kapıları | Çalışan container'ları yeni GPU scheduler kurmayacak. Fiziksel devir/cleanup ve tekrarlı birlikte çalışma ayrıca kabul edilecek. |

### Uyum için kritik kaynak farkı

AOS'un yeni [CPU capability belgesi](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/docs/SCIENTIST_CPU_CAPABILITY.md), `384f052` üzerine hazırlanmış ayrı bir Scientist kaynak candidate'ına (`2a3f9fca…` manifesti) atıf veriyor. AOS kodu `scientist.lab-cpu-capability.v1` ve `/v1/aos-cpu-capability/{suite_id}` bekliyor. İncelenen public Scientist `01b17c3` pininin `lab/` ağacında bu wire kimliği/endpoint bulunmadı. Dolayısıyla iki yeni public HEAD'in doğrudan birlikte çalıştığı sonucu çıkarılamaz. Uygulama başlangıcında ilgili candidate'ın teslimi veya eşdeğer sözleşme uyarlaması, tam kaynak/config/caller eşlemesiyle doğrulanmalı.

AOS stop kabulü son commit'te düzeltilmiş: pipeline/baseline sınırında iptal ve tekrarlı stop raporu var; SQL zamanları Scorer'ın daha önce bittiğini gösterdiğinden **aktif Scorer kesintisi doğrulanmış değil**. Kaynak raporu bu sınırla kullanıldı. Terminal rapor ayrıca fiziksel GPU bırakımı değildir.

### Model ve eğitim sınırı

Yerel kaynakta Decider checkpoint'i `7789eb65…`, Bonsai revision'ı `6ed5e12b…` / Prism engine `9a9394a8…`, Scientist Qwen revision'ı `c2022362…` korunuyor. Yeni Scientist varsayılan field-lab CPU profilinde LLM/GPU kapalı; ayrı yerel model araştırma profiliyle karıştırılmadı. Öğretmen/eğitim ekranı hazırlık taslağı; teslim edilmiş öğrenilmiş adapter yok. RAG, skill, fine-tune adayları ve katkı ölçümü ayrı kabul adımları olarak kaldı.

## İzlenebilir kaynaklar

- AOS [uzman orkestrasyonu](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/docs/AGENT_ORCHESTRATION.md), [tipler](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/src/aos/agent_contracts.py), [kalıcı store](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/src/aos/agent_orchestration_store.py).
- AOS [izole öğrenme projeleri](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/docs/ISOLATED_LEARNING_PROJECTS.md), [skill release](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/docs/OWNED_PARAMETER_SKILL_RELEASE.md), [shared desktop sınırları](https://github.com/aserdargun/aos/blob/dfd06322219b9295c5fc618bef180464b3d17767/docs/SHARED_DESKTOP_MANAGER.md).
- Scientist [v0.1.0 teslimi](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/docs/releases/v0.1.0.md), [teslim kılavuzu](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/docs/ai-scientist/122-delivery-guide.md), [uygulama entegrasyonu](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/docs/ai-scientist/123-application-integration.md).
- Scientist [API sözleşmeleri](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/lab/api/contracts.py), [geçmiş seçimi](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/lab/director/history_context.py), [saha amacı](https://github.com/aserdargun/ai-scientist/blob/01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe/lab/director/field_context.py).

## Yeni ürün kararları

Çalışan başına Linux container alanı; SWAPP + Core + AI-Scientist + ek yerel uzmanlar; tüm işlemler için kalıcı kayıt; katma değer seçimi → skill/RAG/fine-tune → yerel değerlendirme → insan terfisi; mimari değişikliklerde güçlü büyük dil modelleri. Bu kararlar [inşa paketi 0.3.0](implementation/README.md), TR/EN manifesto ve mimari şemaya birlikte işlendi. Kaynak kodunun mevcut olması bu hedeflerin tamamlandığı anlamına gelmez.
