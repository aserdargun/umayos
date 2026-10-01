export type Locale = "tr" | "en";
export const sources = [
  {
    name: "AOS",
    repo: "https://github.com/aserdargun/aos",
    pin: "ed6e857b0e61e9c19c8ba63933e2cc9f318fe444",
    role: { tr: "Çekirdek temeli", en: "Core foundation" },
  },
  {
    name: "AI-Scientist",
    repo: "https://github.com/aserdargun/ai-scientist",
    pin: "67258cdef33032c9a49eeae31c2e2ba26a98ca17",
    role: { tr: "İlk uzman temeli", en: "First specialist foundation" },
  },
] as const;
export const reviewedOn = "2026-10-01";
export const siteRepo = "https://github.com/aserdargun/umayos";
export const content = {
  tr: {
    meta: {
      title: "UMAY OS — Modeller değişir. Deneyim kalır.",
      description:
        "Yerel açık ağırlık modelleri, uzman eylemcileri ve kalıcı bilgiyi insan denetiminde birleştirmeyi hedefleyen UMAY OS’un manifestosu ve mimarisi.",
    },
    skip: "İçeriğe geç",
    home: "Ana sayfa",
    nav: ["Manifesto", "Mimari", "Gelişim"],
    hero: {
      lines: ["Modeller değişir.", "Deneyim kalır.", "Karar insanda kalır."],
      description:
        "Yerel açık ağırlık modelleri, uzman eylemcileri ve kalıcı bilgiyi insan denetiminde birleştirmeyi hedefleyen işletim katmanı.",
      actions: ["Manifestoyu oku", "Mimariyi keşfet"],
      note: "Linux üzerinde bir eylemci işletim katmanı. Yeni bir kernel veya dağıtım değil.",
    },
    manifesto: {
      title: ["Bir cevaptan fazlası.", "Bir çalışma biçimi."],
      intro: "Oku → analiz et → danış. Karar insanda.",
      quote: [
        "İyi bir cevap başlangıçtır.",
        "Doğrulanmış bilgi, izlenebilir bir kayıttır.",
      ],
      principles: [
        [
          "Kendi altyapında çalış.",
          "Yerel işletim, araçların ve verinin sınırlarını senin belirlediğin bir çalışma alanında başlar. On-prem ve kiralık self-host farklı yerleşimlerdir.",
        ],
        [
          "Deneyim modelden uzun yaşasın.",
          "Kaynaklar, incelemeler ve kanonik kayıtlar korunur. Bir modeli değiştirmek, doğrulanmış geçmişi silmek olmamalı.",
        ],
        [
          "Öğretmen üretir. Çalışan uygular.",
          "Büyük modeller kod, skill ve test adayları üretir. Günlük işleri yerel modeller yürütür; adaylar değerlendirilmeden yetki kazanmaz.",
        ],
        [
          "Açıklama kanıta dayansın.",
          "Sonuç, kaynağı ve hesap yöntemiyle birlikte sunulur. Çelişen hipotezler, eksikler ve belirsizlik de yanıtın parçasıdır.",
        ],
        [
          "Yetki insanda kalsın.",
          "Model izin üretmez. Politika ve kabul yazılım tarafından uygulanır; son karar ve sürüm terfisi insandadır.",
        ],
        [
          "Beceri tekrar kullanılabilsin.",
          "Bir skill; girdileri, çıktıları, sürümü ve testleri tanımlı bir yöntemdir. Tek seferlik başarılı bir sohbet değildir.",
        ],
        [
          "Öğrenme kontrollü ilerlesin.",
          "Deneyim önce adaydır. İnsan incelemesi ve bağımsız değerlendirme sonrası sürümlenir; üretimde sessiz model değişimi yapılmaz.",
        ],
        [
          "Fayda varsa genişle.",
          "Yeni uzman, ölçülmüş bir ihtiyacı karşılamalı. Eylemci sayısı tek başına başarı ölçüsü değildir.",
        ],
      ],
    },
    architecture: {
      title: "Bir çekirdek. Uzmanlaşan bir aile.",
      intro:
        "UMAY OS Core, AOS’tan kontrollü fork ile oluşturulacak. İlk uzman UMAY Scientist, aserdargun/ai-scientist temelini koruyacak. Bu şema hedef mimariyi anlatır; tamamlanmış runtime kabulü değildir.",
      labels: ["İşletim", "Öğretmen", "Gelişim"],
      onprem: "On-prem · yerel işletim hedefi",
      human: "İnsan · amaç ve izin",
      core: "UMAY OS Core",
      s1: "S1 · izinli seçeneklerden hızlı seçim",
      s2: "S2 · plan, açıklama ve toparlanma",
      scientist: "UMAY Scientist · ilk uzman",
      scientistNote: "Bilimsel inceleme · ayrı araştırma S1/S2 profilleri",
      app: "Application Pack · SWAPP",
      appNote: "GUI yürütmesi Core’da · tek yürütme sahibi",
      knowledge: "Yerel bilgi",
      knowledgeNote: "RAG · sürümlü skills · eğitim verisi",
      rented: "Kiralık self-host GPU",
      rentedNote: "Ayrı yerleşim; kurum içi veri yerelliğiyle eş tutulmaz.",
      distinction:
        "Model bir hesap kaynağıdır. Eylemci, sınırları tanımlı bir yürütme rolüdür.",
      operation:
        "Core, typed yürütme, politika ve input ownership ile GUI’nin tek sahibidir. Scientist, izinli veride bilimsel incelemeyi yönetir. Model/deployment/adapter registry, knowledge/skill ve GPU yönetimi AOS temelinden alınacak.",
      teacherTitle: "Öğretmen aday üretir. Yetkiyi model vermez.",
      teacherFlow: [
        "Büyük model · provider / self-host",
        "Kod, skill, test ve eğitim adayı",
        "Harness · güvenlik ve değerlendirme",
        "İnsan incelemesi ve terfisi",
        "Sürümlü registry · geri alma",
      ],
      teacherText:
        "Öğretmen hattından canlı GUI’ye doğrudan yetki yolu yoktur. Hassas girdiler provider’a otomatik gönderilmez. Öğretmen erişimi kapalıyken günlük yerel işletimin sürmesi hedeflenir.",
      developmentTitle: "Birleşimden önce sözleşme, terfiden önce kanıt.",
      developmentFlow: [
        "Pinli kaynaklar · kontrollü fork",
        "Core–Scientist sözleşmesi",
        "Yerel, sentetik GUI kabulü",
        "Bağımsız değerlendirme",
        "İnsan terfisi · rollback",
      ],
      developmentText:
        "Model ve eylemci değişimi capability, sürümlü sözleşme ve bağımsız değerlendirme ister. Linux profili kurulum hedefidir; doğrulanmış UMAY dağıtımı değildir. SWAPP yerel frontend/backend ve sentetik veya izinli örneklerle kabul edilecek; gerçek kurum içi kabul daha sonra yapılacak.",
      teacherCaption:
        "İki çalışma alanı, iki rol. Üretim ile kullanım arasında inceleme var. Kavramsal görsel.",
    },
    scientist: {
      title: "İlk uzman: Scientist.",
      subtitle: "Soru, kanıt ve hesap arasında.",
      intro:
        "Özgün AI-Scientist’in Director, yerel model provider’ı, sandbox, hesaplama/değerlendirme ve deney defteri korunacak. Scientist’in araştırma S1/S2 profilleri Core karar protokolünden ayrıdır.",
      label: "Kavramsal örnek · sentetik veri",
      steps: [
        [
          "Soru",
          "Geçmiş titreşim nasıl değişti?",
          "Anonim bir dönen ekipmanın altı günlük geçmişini inceleyelim. Amaç olası açıklamaları karşılaştırmak; kontrol sistemine müdahale etmek değil.",
        ],
        [
          "Veri",
          "Yalnız izinli veri, açık köken.",
          "Tamamen sentetik altı örnek. Zaman: 1–6 Eylül 2026, her gün 12:00 UTC. Birim: mm/s RMS. Bu değerler gerçek bir tesis veya cihazdan gelmez.",
        ],
        [
          "Hesap",
          "Deterministik hesap, görünür yöntem.",
          "vibration-window-mean v1: ilk ve son üç örneğin aritmetik ortalaması karşılaştırılır. Yüzde değişim = (son ortalama / ilk ortalama − 1) × 100. Aynı veri aynı sonucu verir.",
        ],
        [
          "Hipotez",
          "Bir bulgu, birden fazla açıklama.",
          "Yük veya devir değişimi, ölçüm koşulları ya da mekanik durum açıklama olabilir. Titreşim artışı tek başına bunları ayırt etmez; bir arıza tanısı koymaz.",
        ],
        [
          "Yanıt",
          "Kaynaklı Advisory Packet.",
          "Paket; soruyu, kaynak sürümünü, hesap yöntemini, destekleyen ve çürüten kanıtları, alternatifleri ve eksik veriyi birlikte taşır. Belirsizlik gizlenmez.",
        ],
        [
          "İnceleme",
          "Kalıcı Investigation, insan kararı.",
          "İnsan kanıtı inceler ve sonraki veri talebini belirler. Varlığa bağlı Investigation’ın kaynak ve inceleme geçmişini koruması hedeflenir. Bu sayfa kayıt servisi çalıştırmaz.",
        ],
      ],
      chart: "Titreşim · mm/s RMS",
      first: "İlk üç gün",
      last: "Son üç gün",
      change: "Değişim",
      diagnostic: "Bu değişim bir arıza tanısı değildir.",
      source: "Kaynak ve yöntem",
      alternative: "Alternatif açıklama",
      missing: "Eksik kanıt",
      alternativeText:
        "Yük veya ölçüm koşulları değişmiş olabilir. Mekanik durum henüz ayırt edilemiyor.",
      missingText: "Devir, yük, sensör kalibrasyonu ve bakım kaydı yok.",
      previous: "Önceki",
      next: "Sonraki",
      limits:
        "Oku ve danış. Kontrol sistemine yazma, setpoint, start/stop ve alarm durumu değiştirme kapsam dışıdır.",
      download: "Sentetik veriyi incele",
      table: "Grafiğin veri tablosu",
      time: "Zaman (UTC)",
      value: "Titreşim (mm/s RMS)",
    },
    experience: {
      title: ["Model değişir.", "Bilginin izi kalır."],
      intro:
        "Saklanan şey yalnız bir cevap değil; kaynağı, incelemesi ve sürümüdür.",
      products: [
        [
          "RAG",
          "Kaynağa bağlı bilgi.",
          "Belge kökeni, erişim sınırı ve sürümüyle geri getirilir. Bir yanıt üretmek, o yanıtı doğrulanmış bilgiye dönüştürmez.",
        ],
        [
          "Skill",
          "Sürümlü ve sınanabilir yöntem.",
          "Girdiler, çıktılar, yetki sınırı ve testler birlikte kaydedilir. Yöntem yeni bir görevde kontrollü olarak yeniden kullanılabilir.",
        ],
        [
          "Eğitim verisi",
          "Değerlendirilmiş öğrenme örneği.",
          "Fine-tune yalnız destekli modelde, ölçülmüş davranış ihtiyacı varsa yapılır. RAG ve skill kayıtları otomatik eğitim verisi değildir.",
        ],
      ],
      flow: [
        "Aday",
        "İnsan incelemesi",
        "Doğrulanmış kayıt",
        "Değerlendirme",
        "Sürüm / geri alma",
      ],
      note: "Kanonik kayıtlar ve inceleme geçmişi korunur. Embeddings, tokenizer çıktıları ve LoRA adapter’ları her modele doğrudan taşınmaz.",
    },
    development: {
      title: "Bugün nerede duruyoruz?",
      date: "Kaynak incelemesi · 1 Ekim 2026",
      columns: [
        "Public kaynaklarda mevcut",
        "UMAY mimari kararı",
        "Entegrasyon ve kabul bekliyor",
      ],
      sourceIntro:
        "İki özgün public kaynak, mevcut uygulama temellerini sağlar. Pinler bu sitede runtime test sonucu olarak sunulmaz.",
      decisions: [
        "AOS temelli Core ve ilk uzman Scientist.",
        "Yerel işletim ile öğretmen hattının ayrılması.",
        "Kaynaklı Advisory Packet, kalıcı Investigation ve insan terfisi.",
      ],
      pending: [
        "Core–Scientist birleşimi.",
        "Broker yamasının baseline uyumu.",
        "SWAPP yerel GUI kabulü; gerçek kurum içi kabul sonra.",
        "Bağımsız değerlendirme ve sürekli eğitim.",
      ],
      roadmap: [
        ["Entegrasyon", "Typed sözleşme, politika ve yürütme sahipliği."],
        ["Yerel GUI kabulü", "Yerel kurulum, sentetik veya izinli örnekler."],
        [
          "Bağımsız değerlendirme",
          "Kaynaklardan ayrı, tekrar edilebilir kabul kanıtı.",
        ],
        ["Sonraki uzmanlar", "Ölçülmüş ihtiyaç ve faydaya göre genişleme."],
      ],
      note: "Kaynak envanteri, UMAY test sonucu değildir. Public erişim, lisans veya ticari kullanım hakkı vermez. UMAY OS proje lisansı henüz seçilmedi.",
    },
    closing: {
      lines: ["Zekâ değişebilir.", "Sorumluluk kalır."],
      text: "Bir sonraki modeli değil, onunla çalışmanın kalıcı temelini inşa ediyoruz.",
      action: "Gelişimi GitHub’da incele",
      note: "Bir kamu anlatısı. Runtime kabulü değildir.",
    },
    alt: {
      hero: "Gece mavisi modüller ve turkuaz cam katmanlarla yerel zekâ ve kalıcı bilgi üzerine kavramsal kompozisyon.",
      teacher:
        "İki ayrı mimari çalışma alanı: aday üretimi ve incelenmiş modüller. Kavramsal kompozisyon.",
      archive:
        "Bilginin kökenini ve inceleme geçmişini temsil eden şeffaf arşiv katmanları. Kavramsal kompozisyon.",
    },
  },
  en: {
    meta: {
      title: "UMAY OS — Models change. Experience endures.",
      description:
        "The manifesto and architecture of UMAY OS, a planned operating layer bringing local open-weight models, specialist agents and lasting knowledge together under human oversight.",
    },
    skip: "Skip to content",
    home: "Home",
    nav: ["Manifesto", "Architecture", "Development"],
    hero: {
      lines: [
        "Models change.",
        "Experience endures.",
        "Decisions remain human.",
      ],
      description:
        "An operating layer aiming to bring local open-weight models, specialist agents and lasting knowledge together under human oversight.",
      actions: ["Read the manifesto", "Explore the architecture"],
      note: "An agent operating layer on Linux. Not a new kernel or distribution.",
    },
    manifesto: {
      title: ["More than an answer.", "A way of working."],
      intro: "Read → analyze → advise. Humans decide.",
      quote: [
        "A good answer is a beginning.",
        "Verified knowledge is a traceable record.",
      ],
      principles: [
        [
          "Work on your own infrastructure.",
          "Local operation starts in a workspace where you define tool and data boundaries. On-prem and rented self-host are different placements.",
        ],
        [
          "Let experience outlive the model.",
          "Sources, reviews and canonical records endure. Replacing a model should not erase a verified history.",
        ],
        [
          "Teachers produce. Workers execute.",
          "Large models produce candidates for code, skills and tests. Local models handle daily work; candidates gain no authority before evaluation.",
        ],
        [
          "Ground explanations in evidence.",
          "A result comes with its source and calculation method. Competing hypotheses, gaps and uncertainty belong in the answer too.",
        ],
        [
          "Keep authority human.",
          "Models do not grant permission. Software enforces policy and acceptance; humans make the final decision and promote versions.",
        ],
        [
          "Make skills reusable.",
          "A skill is a method with defined inputs, outputs, versions and tests. It is more than a single successful conversation.",
        ],
        [
          "Keep learning controlled.",
          "Experience starts as a candidate. Human review and independent evaluation precede versioning; production models never change silently.",
        ],
        [
          "Expand when it serves a purpose.",
          "Each new specialist must address a measured need. Agent count alone is not a measure of success.",
        ],
      ],
    },
    architecture: {
      title: "One core. A family of specialists.",
      intro:
        "UMAY OS Core will be created through a controlled fork of AOS. Its first specialist, UMAY Scientist, will preserve the aserdargun/ai-scientist foundation. This diagram describes the target architecture, not completed runtime acceptance.",
      labels: ["Operation", "Teacher", "Development"],
      onprem: "On-prem · local operation target",
      human: "Human · purpose and permission",
      core: "UMAY OS Core",
      s1: "S1 · fast choice among permitted options",
      s2: "S2 · planning, explanation and recovery",
      scientist: "UMAY Scientist · first specialist",
      scientistNote:
        "Scientific investigation · separate research S1/S2 profiles",
      app: "Application Pack · SWAPP",
      appNote: "Core owns GUI execution · one execution owner",
      knowledge: "Local knowledge",
      knowledgeNote: "RAG · versioned skills · training data",
      rented: "Rented self-host GPU",
      rentedNote:
        "Separate placement; not equivalent to on-prem data locality.",
      distinction:
        "A model is a compute resource. An agent is an execution role with defined boundaries.",
      operation:
        "Core is the single GUI owner through typed execution, policy and input ownership. Scientist conducts scientific investigation on permitted data. Model/deployment/adapter registries, knowledge/skills and GPU management will build on AOS.",
      teacherTitle: "Teachers propose. Models do not grant authority.",
      teacherFlow: [
        "Large model · provider / self-host",
        "Code, skill, test and training candidate",
        "Harness · safety and evaluation",
        "Human review and promotion",
        "Versioned registry · rollback",
      ],
      teacherText:
        "There is no direct authority path from the teacher line to the live GUI. Sensitive inputs are never sent automatically to a provider. Daily local operation is intended to continue when teacher access is unavailable.",
      developmentTitle:
        "Contracts before integration. Evidence before promotion.",
      developmentFlow: [
        "Pinned sources · controlled fork",
        "Core–Scientist contract",
        "Local synthetic GUI acceptance",
        "Independent evaluation",
        "Human promotion · rollback",
      ],
      developmentText:
        "Model and agent replacement requires capabilities, versioned contracts and independent evaluation. The Linux profile is an installation target, not a verified UMAY distribution. SWAPP will be accepted using local frontend/backend and synthetic or permitted examples; actual institutional acceptance comes later.",
      teacherCaption:
        "Two workspaces, two roles. Review stands between production and use. Conceptual artwork.",
    },
    scientist: {
      title: "First specialist: Scientist.",
      subtitle: "Between questions, evidence and calculation.",
      intro:
        "The original AI-Scientist’s Director, local model provider, sandbox, computation/evaluation and experiment ledger will be retained. Scientist research S1/S2 profiles differ from the Core decision protocol.",
      label: "Conceptual example · synthetic data",
      steps: [
        [
          "Question",
          "How did past vibration change?",
          "Consider six days of history for an anonymous rotating asset. The aim is to compare possible explanations, not to intervene in a control system.",
        ],
        [
          "Data",
          "Permitted data. Explicit provenance.",
          "Six entirely synthetic samples. Time: 1–6 September 2026, daily at 12:00 UTC. Unit: mm/s RMS. These values do not come from a real facility or device.",
        ],
        [
          "Calculation",
          "Deterministic calculation. Visible method.",
          "vibration-window-mean v1 compares arithmetic means of the first and last three samples. Percentage change = (last mean / first mean − 1) × 100. The same data produces the same result.",
        ],
        [
          "Hypotheses",
          "One finding. Several explanations.",
          "Changes in load or speed, measurement conditions, or mechanical condition could explain the difference. Vibration growth alone cannot distinguish them or diagnose a fault.",
        ],
        [
          "Answer",
          "A sourced Advisory Packet.",
          "The packet carries the question, source version, method, supporting and contradicting evidence, alternatives and missing data. Uncertainty remains visible.",
        ],
        [
          "Review",
          "Lasting Investigation. Human decision.",
          "A human reviews the evidence and identifies the next data request. An asset-linked Investigation is intended to retain sources and review history. This page runs no record service.",
        ],
      ],
      chart: "Vibration · mm/s RMS",
      first: "First three days",
      last: "Last three days",
      change: "Change",
      diagnostic: "This change is not a fault diagnosis.",
      source: "Source and method",
      alternative: "Alternative explanation",
      missing: "Missing evidence",
      alternativeText:
        "Load or measurement conditions may have changed. Mechanical condition cannot yet be distinguished.",
      missingText:
        "Speed, load, sensor calibration and maintenance records are absent.",
      previous: "Previous",
      next: "Next",
      limits:
        "Read and advise. Writing to control systems, setpoints, start/stop and alarm-state changes are out of scope.",
      download: "Inspect the synthetic data",
      table: "Chart data table",
      time: "Time (UTC)",
      value: "Vibration (mm/s RMS)",
    },
    experience: {
      title: ["Models change.", "Knowledge keeps its history."],
      intro:
        "What endures is more than an answer: its source, review and version.",
      products: [
        [
          "RAG",
          "Knowledge tied to sources.",
          "Documents are retrieved with their provenance, access boundary and version. Producing an answer does not turn it into verified knowledge.",
        ],
        [
          "Skill",
          "A versioned, testable method.",
          "Inputs, outputs, authority boundaries and tests are recorded together. The method can be reused under control in a new task.",
        ],
        [
          "Training data",
          "Evaluated learning examples.",
          "Fine-tuning is considered only for supported models and a measured behavioral need. RAG and skill records are not automatically training data.",
        ],
      ],
      flow: [
        "Candidate",
        "Human review",
        "Verified record",
        "Evaluation",
        "Version / rollback",
      ],
      note: "Canonical records and review history endure. Embeddings, tokenizer outputs and LoRA adapters are not directly portable to every model.",
    },
    development: {
      title: "Where do we stand today?",
      date: "Source review · 1 October 2026",
      columns: [
        "Existing in public sources",
        "UMAY architecture decision",
        "Integration and acceptance pending",
      ],
      sourceIntro:
        "Two original public repositories provide existing implementation foundations. Their pins are not presented as runtime test results on this site.",
      decisions: [
        "AOS-based Core and Scientist as the first specialist.",
        "Separation of local operation and the teacher line.",
        "Sourced Advisory Packet, lasting Investigation and human promotion.",
      ],
      pending: [
        "Core–Scientist integration.",
        "Broker patch compatibility with the baseline.",
        "SWAPP local GUI acceptance; institutional acceptance later.",
        "Independent evaluation and continuous learning.",
      ],
      roadmap: [
        ["Integration", "Typed contracts, policy and execution ownership."],
        [
          "Local GUI acceptance",
          "Local setup with synthetic or permitted examples.",
        ],
        [
          "Independent evaluation",
          "Repeatable acceptance evidence separate from source inventories.",
        ],
        ["Next specialists", "Expansion based on measured need and value."],
      ],
      note: "A source inventory is not a UMAY test result. Public access does not grant a license or commercial usage rights. A UMAY OS project license has not been selected.",
    },
    closing: {
      lines: ["Intelligence can change.", "Responsibility endures."],
      text: "We are building the lasting foundation for working with models, beyond the next model itself.",
      action: "Explore development on GitHub",
      note: "A public narrative. Not runtime acceptance.",
    },
    alt: {
      hero: "A conceptual composition of navy modules and teal glass layers representing local intelligence and lasting knowledge.",
      teacher:
        "Two separate architectural workspaces for candidate production and reviewed modules. Conceptual composition.",
      archive:
        "Transparent archive layers representing knowledge provenance and review history. Conceptual composition.",
    },
  },
};
