export type Locale = "tr" | "en";
export const sources = [
  {
    "name": "AOS",
    "repo": "https://github.com/aserdargun/aos",
    "pin": "ed6e857b0e61e9c19c8ba63933e2cc9f318fe444",
    "role": {
      "tr": "Çekirdek temeli",
      "en": "Core foundation"
    }
  },
  {
    "name": "AI-Scientist",
    "repo": "https://github.com/aserdargun/ai-scientist",
    "pin": "67258cdef33032c9a49eeae31c2e2ba26a98ca17",
    "role": {
      "tr": "İlk uzman temeli",
      "en": "First specialist foundation"
    }
  }
] as const;
export const reviewedOn = "2026-10-03";
export const siteRepo = "https://github.com/aserdargun/umayos";
export const content = {
  "tr": {
    "meta": {
      "title": "UMAY OS — Modeller değişir. Deneyim kalır.",
      "description": "Linux ve AOS üzerinde, SWAPP kullanım deneyiminden RAG ve LoRA ile öğrenen açık ağırlıklı eylemciler; ilk uzman AI-Scientist, insan denetimi ve ölçülen maliyetler."
    },
    "skip": "İçeriğe geç",
    "home": "Ana sayfa",
    "nav": [
      "Manifesto",
      "Mimari",
      "Scientist",
      "Deneyim",
      "Gelişim"
    ],
    "backToTop": "Başa dön",
    "hero": {
      "lines": [
        "Modeller değişir.",
        "Deneyim kalır.",
        "Karar insanda kalır."
      ],
      "description": "SWAPP’ı bilen ve kullanan, insanın çalışma izlerinden öğrenen açık ağırlıklı eylemciler. Linux üzerinde AOS çekirdeği, ilk uzman olarak AI-Scientist.",
      "actions": [
        "Manifestoyu oku",
        "Mimariyi keşfet"
      ],
      "note": "Hedef mimari · Standart Linux üzerinde, şirkete uyarlanan eylemci işletim katmanı."
    },
    "manifesto": {
      "title": [
        "Bir cevaptan fazlası.",
        "Bir çalışma biçimi."
      ],
      "intro": "İnsanın deneyimi, kurumun kalıcı yeteneğine dönüşsün.",
      "quote": [
        "İyi bir cevap başlangıçtır.",
        "Doğrulanmış bilgi, izlenebilir bir kayıttır."
      ],
      "principles": [
        [
          "Şirketin bilgisi şirkette kalsın.",
          "SWAPP frontend/backend, şirket verileri, çalışanların kullanım yöntemleri, LoRA adaptörleri ve RAG vektör verisetleri özel alanda kalır. Kamuya açılan şey mimari ve ilkeleridir."
        ],
        [
          "Deneyim modelden uzun yaşasın.",
          "İzinli SWAPP kullanım izleri; amaç, eylem, bağlam, sonuç ve insan düzeltmesiyle anlam kazanır. İncelenmiş kaynaklar korunur; modeller değiştikçe bilgi yeniden işlenebilir."
        ],
        [
          "Büyük modeller geliştirsin. Açık modeller çalışsın.",
          "Kapalı kaynak güçlü dil modelleri mimariyi, kodu, deneyleri ve eğitim adaylarını geliştirmeye yardım eder. Günlük eylemciler açık ağırlıklı modellerle şirket ortamında çalışır."
        ],
        [
          "SWAPP’ı ölçerek öğren.",
          "Ekranları tanımak yeterli değildir. Eylemci; varlığı bulmayı, veriyi yorumlamayı ve izinli iş akışını tamamlamayı bağımsız sonuç doğrulamasıyla göstermelidir."
        ],
        [
          "Yetki insanda kalsın.",
          "Model izin üretmez. Eylemcilerin araçları ve erişimi görevle sınırlanır. Son karar, öğrenme kaydının kabulü ve yeni sürümün kullanıma alınması insandadır."
        ],
        [
          "Bilimsel deneyi tekrar kurabil.",
          "AI-Scientist, dijital ikiz verilerinde kümeleme ve anomali tespiti deneyleri tasarlar. Veri sürümü, yöntem, karşılaştırma, maliyet ve belirsizlik her sonuçla birlikte saklanır."
        ],
        [
          "RAG ile hatırla. LoRA ile davranışı uyarla.",
          "RAG, ağırlıkları değiştirmeden kaynaklı bilgi getirir. LoRA, seçilmiş eğitim örnekleriyle uyumlu modelin davranışını uyarlar. Ham izler doğrudan eğitim verisi veya doğru cevap sayılmaz."
        ],
        [
          "Gelişimi ve maliyeti birlikte ölç.",
          "Her model çağrısı, deney ve eğitim işi için süre ve kaynak tüketimi izlenir. Kalite, gecikme ve maliyet birlikte değerlendirilir; ölçülmemiş kazanç veya ücret sıfır kabul edilmez."
        ]
      ]
    },
    "architecture": {
      "title": "Bir çekirdek. Uzmanlaşan bir aile.",
      "intro": "AOS, Linux üzerindeki yürütme çekirdeğinin; AI-Scientist, ilk bilimsel uzmanın temelidir. Bu iki repo kontrollü fork’larla şirkete özel SWAPP için geliştirilecek. Aşağıdaki yapı bir uygulama hedefidir; birleşik sistem kabulü henüz yapılmadı.",
      "labels": [
        "İşletim",
        "Öğretmen",
        "Gelişim"
      ],
      "onprem": "Şirket ortamı · standart Linux",
      "human": "İnsan · amaç ve izin",
      "core": "UMAY OS Core · AOS",
      "s1": "System 1 · hızlı ve sınırlı eylem seçimi",
      "s2": "System 2 · plan, açıklama ve toparlanma",
      "scientist": "AI-Scientist · ilk uzman",
      "scientistNote": "Dijital ikiz · kümeleme ve anomali deneyleri",
      "app": "SWAPP · özel uygulama",
      "appNote": "Frontend + backend · Core üzerinden izinli kullanım",
      "knowledge": "Şirkete özel deneyim",
      "knowledgeNote": "Kullanım izleri · RAG · LoRA · skills",
      "rented": "Kiralık self-host GPU",
      "rentedNote": "Ayrı yerleşim; kurum içi veri yerelliğiyle eş tutulmaz.",
      "distinction": "Model bir hesap kaynağıdır. Eylemci, sınırları tanımlı bir yürütme rolüdür.",
      "operation": "Linux servisleri Core’u, SWAPP uygulamasını ve deney işçilerini barındırır. AOS, SWAPP tarayıcı oturumunun tek yürütme sahibidir; farklı tipte uzmanlar sürümlü görev ve sonuç sözleşmeleriyle çalışır. AI-Scientist izinli veri anlık görüntülerini ayrı deney ortamında işler.",
      "teacherTitle": "Kapalı kaynak öğretmen. Açık ağırlıklı eylemciler.",
      "teacherFlow": [
        "Claude / OpenAI · güçlü öğretmen",
        "Mimari, kod, deney ve eğitim adayı",
        "İzole test · kalite ve maliyet",
        "İnsan incelemesi ve terfisi",
        "Yerel açık model · sürüm ve geri alma"
      ],
      "teacherText": "Güncel güçlü Claude ve OpenAI modelleri tasarım, geliştirme ve eğitim sürecini yönlendiren öğretmenler olarak seçilir. Model kimliği, sürüm, tarih, token ve ücret kaydedilir. Şirket verisi dış sağlayıcıya kendiliğinden açılmaz; öğretmen erişimi olmadan günlük yerel işletimin sürmesi hedeflenir.",
      "developmentTitle": "Birleşimden önce sözleşme, terfiden önce kanıt.",
      "developmentFlow": [
        "Pinli AOS + AI-Scientist",
        "SWAPP uygulama sözleşmesi",
        "İzler → RAG / LoRA adayları",
        "Bağımsız kalite ve maliyet ölçümü",
        "İnsan terfisi · geri alma"
      ],
      "developmentText": "Özel swapp-backend ve swapp-frontend geliştirme sırasında ayrıca teslim edilecek. Önce sentetik bir uygulama ve veriyle sözleşmeler sınanır; teslim sonrası gerçek SWAPP akışları, ardından şirket ortamı kabul edilir. RAG, LoRA ve yeni uzmanlar ayrı değerlendirmelerden geçer.",
      "teacherCaption": "İki çalışma alanı, iki rol. Üretim ile kullanım arasında inceleme var. Kavramsal görsel.",
      "foundationsTitle": "Üç temel, açık sorumluluklar.",
      "foundations": [
        [
          "AOS",
          "Çekirdek ve yürütme",
          "Yerel modeller, görev politikası ve araç yürütmesi. Şirkete uyarlanan Core’un kaynak temeli.",
          "https://github.com/aserdargun/aos"
        ],
        [
          "SWAPP",
          "İnsanın çalışma alanı",
          "Varlık, zaman serisi ve dijital ikiz bağlamı. Kamu tanıtımı erişilebilir; uygulama kodu ve şirket içeriği özeldir.",
          "https://swapp.org.tr/"
        ],
        [
          "AI-Scientist",
          "Deney ve değerlendirme",
          "Kümeleme, anomali tespiti ve yeniden kurulabilir deneyler için bilimsel uzman temeli.",
          "https://github.com/aserdargun/ai-scientist"
        ]
      ],
      "rolesTitle": "System 1 ve System 2: ayrı roller, ayrı öğrenme.",
      "roles": [
        [
          "S1 · Operator",
          "İzinli seçenekten doğru eyleme.",
          "AOS kaynak temelinde Mapika/decider-2b. Güncel gözlem ve izinli seçeneklerden seçim yapar; serbest metin üreten sohbet modeli olarak ele alınmaz. Karar verisi, eğitim hedefi ve adaptörü S1’e özgüdür."
        ],
        [
          "S2 · Supervisor",
          "Hedefi plana, bulguyu açıklamaya.",
          "AOS kaynak temelinde Ternary Bonsai-2 27B. Planlama, kaynaklı açıklama ve toparlanmayı üstlenir. S2 veri ve adaptör profili ayrıdır; kapalı kaynak öğretmen hattıyla aynı rol değildir."
        ],
        [
          "Unsloth · eğitim hattı",
          "Modele özgü LoRA / QLoRA.",
          "Her rol güncel ve uyumlu modellerle yenilenebilir. Unsloth eğitimi, destekli taban ağırlıkları ve rolün veri biçimiyle hazırlanır; adaptörün hedef çıkarım motorunda yüklenmesi ve faydası ayrıca sınanır."
        ]
      ],
      "rolesNote": "Bu model adları incelenen AOS temelini gösterir; değişmez ürün seçimi değildir. Decider ve ternary/GGUF Bonsai için Unsloth uyumu varsayılmaz. LoRA ve 4-bit QLoRA desteği model bazında doğrulanır; desteklenmeyen model için ayrı backend veya değerlendirilmiş alternatif gerekir. Scientist’in araştırma profilleri de Core S1/S2 protokolünden ayrıdır."
    },
    "scientist": {
      "title": "İlk uzman: Scientist.",
      "subtitle": "İlk iş: dijital ikizden bilimsel deneye.",
      "intro": "SWAPP dijital ikizlerinden izinli zaman serileri alınacak; AI-Scientist çalışma rejimlerini kümelemek ve rejime göre anomali adaylarını incelemek için deney düzenekleri kuracak. Veri, kod, ölçüt ve sonuçlar deney defterinde izlenecek. Kaynak temelindeki Qwen3.5-9B araştırma profilleri, Core’un Decider/Bonsai rollerinden ayrıdır.",
      "label": "Anlatım örneği · altı sentetik nokta · ML modeli değil",
      "steps": [
        [
          "Soru",
          "Geçmiş titreşim nasıl değişti?",
          "Anonim bir dönen ekipmanın altı günlük geçmişini inceleyelim. Amaç olası açıklamaları karşılaştırmak; kontrol sistemine müdahale etmek değil."
        ],
        [
          "Veri",
          "Yalnız izinli veri, açık köken.",
          "Tamamen sentetik altı örnek. Zaman: 1–6 Eylül 2026, her gün 12:00 UTC. Birim: mm/s RMS. Bu değerler gerçek bir tesis veya cihazdan gelmez."
        ],
        [
          "Hesap",
          "Deterministik hesap, görünür yöntem.",
          "vibration-window-mean v1: ilk ve son üç örneğin aritmetik ortalaması karşılaştırılır. Yüzde değişim = (son ortalama / ilk ortalama − 1) × 100. Aynı veri aynı sonucu verir."
        ],
        [
          "Hipotez",
          "Bir bulgu, birden fazla açıklama.",
          "Yük veya devir değişimi, ölçüm koşulları ya da mekanik durum açıklama olabilir. Titreşim artışı tek başına bunları ayırt etmez; bir arıza tanısı koymaz."
        ],
        [
          "Yanıt",
          "Kaynaklı Advisory Packet.",
          "Paket; soruyu, kaynak sürümünü, hesap yöntemini, destekleyen ve çürüten kanıtları, alternatifleri ve eksik veriyi birlikte taşır. Belirsizlik gizlenmez."
        ],
        [
          "İnceleme",
          "Kalıcı Investigation, insan kararı.",
          "İnsan kanıtı inceler ve sonraki veri talebini belirler. Varlığa bağlı Investigation’ın kaynak ve inceleme geçmişini koruması hedeflenir. Bu sayfa kayıt servisi çalıştırmaz."
        ]
      ],
      "chart": "Titreşim · mm/s RMS",
      "first": "İlk üç gün",
      "last": "Son üç gün",
      "change": "Değişim",
      "diagnostic": "Bu değişim bir arıza tanısı değildir.",
      "source": "Kaynak ve yöntem",
      "alternative": "Alternatif açıklama",
      "missing": "Eksik kanıt",
      "alternativeText": "Yük veya ölçüm koşulları değişmiş olabilir. Mekanik durum henüz ayırt edilemiyor.",
      "missingText": "Devir, yük, sensör kalibrasyonu ve bakım kaydı yok.",
      "previous": "Önceki",
      "next": "Sonraki",
      "limits": "Oku ve danış. Kontrol sistemine yazma, setpoint, start/stop ve alarm durumu değiştirme kapsam dışıdır.",
      "download": "Sentetik veriyi incele",
      "table": "Grafiğin veri tablosu",
      "time": "Zaman (UTC)",
      "value": "Titreşim (mm/s RMS)",
      "experimentTitle": "Planlanan ilk araştırma hattı",
      "experiments": [
        [
          "01 · Dijital ikiz verisi",
          "Varlık, zaman, birim ve kalite bilgisiyle sürümlü veri. Zaman ve varlık bazlı bağımsız test ayrımı."
        ],
        [
          "02 · Çalışma rejimleri",
          "Kümeleme ile benzer davranışları araştır. Kümeleri işletme bilgisiyle incele; küme etiketi doğru cevap değildir."
        ],
        [
          "03 · Anomali ve deney",
          "Basit referanslarla karşılaştır, yanlış alarmı ve kararlılığı ölç. Anomali skoru arıza tanısı veya kontrol komutu değildir."
        ]
      ]
    },
    "experience": {
      "title": [
        "Model değişir.",
        "Bilginin izi kalır."
      ],
      "intro": "İnsan SWAPP’ta varlığı bulur, trendi inceler, bulguyu değerlendirir. İzinli eylem izleri ve düzeltmeler, inceleme sonrasında şirkete özel bilgi ve davranış örneklerine dönüşür.",
      "products": [
        [
          "RAG",
          "Bilgiyi getir; ağırlıkları değiştirme.",
          "İncelenmiş belgeler ve kullanım bilgisi, erişim kapsamı ve kaynak sürümüyle özel vektör verisetine işlenir. Eylemci ilgili bilgiyi yanıt veya görev bağlamında kullanır."
        ],
        [
          "Skill",
          "Kullanım yöntemini tekrar edilebilir kıl.",
          "SWAPP akışı; önkoşul, adımlar, yetki, beklenen sonuç ve testleriyle sürümlenir. İnsan alışkanlığı, doğrulanmadan otomasyon kuralı olmaz."
        ],
        [
          "LoRA / QLoRA",
          "S1 ve S2 için ayrı, modele bağlı adaptörler.",
          "İncelenmiş örnekler rolün veri biçimine dönüştürülür. Unsloth destekli modellerde LoRA veya uygun 4-bit QLoRA yolu seçilir. Adaptör, aynı taban modele karşı bağımsız görevlerde sınanır; sonra insan onayıyla kullanıma alınır."
        ]
      ],
      "flow": [
        "İzinli kullanım izi",
        "Temizleme ve insan incelemesi",
        "RAG / skill / eğitim adayı",
        "Bağımsız değerlendirme",
        "Sürüm, izleme ve geri alma"
      ],
      "note": "RAG indeksini yenilemek fine-tuning değildir. Bir kaynağı silmek, eğitilmiş adaptörden etkisini silmez. Model, tokenizer, embedding ve adaptör uyumu yeniden sınanır; terfi edilmemiş adaylar günlük işletimi değiştirmez.",
      "boundaryTitle": "Şirkete özel kalan birikim",
      "boundaries": [
        [
          "Özel uygulama",
          "swapp-backend ve swapp-frontend ayrıca teslim edilecek; bu kamu sitesinin parçası değildir."
        ],
        [
          "Özel veri ve yöntem",
          "Şirket verileri, çalışanların kullanım izleri, incelemeler ve iş yapma yöntemleri şirketin erişim sınırlarında tutulur."
        ],
        [
          "Özel öğrenme ürünleri",
          "LoRA adaptörleri, RAG vektör verisetleri, eğitim örnekleri ve değerlendirme kayıtları şirkete göre ayrılır."
        ]
      ]
    },
    "development": {
      "title": "Bugün nerede duruyoruz?",
      "date": "Kaynak incelemesi · 3 Ekim 2026",
      "columns": [
        "Public kaynaklarda mevcut",
        "UMAY mimari kararı",
        "Entegrasyon ve kabul bekliyor"
      ],
      "sourceIntro": "AOS ve AI-Scientist mevcut uygulama temelleridir. Kaynak pinleri, bu sitede birleşik UMAY sisteminin çalıştığına dair test sonucu sayılmaz.",
      "decisions": [
        "Standart Linux + AOS Core + şirketin SWAPP uygulaması.",
        "İlk uzman AI-Scientist: dijital ikizlerde kümeleme ve anomali deneyleri.",
        "Ayrı S1/S2 model profilleri; özel RAG, Unsloth LoRA/QLoRA ve kapalı kaynak öğretmenler.",
        "Her geliştirme işi için kalite, süre ve maliyet kaydı."
      ],
      "pending": [
        "Kontrollü fork’lar ve Core–Scientist sözleşmesinin uygulanması.",
        "Özel SWAPP kodunun teslimi ve gerçek iş akışlarının kabulü.",
        "İzinli iz toplama, RAG, eğitim ve bağımsız değerlendirme hattı.",
        "Şirket ortamında kurulum, maliyet mutabakatı ve işletim kabulü."
      ],
      "roadmap": [
        [
          "Temel ve sözleşmeler",
          "Kaynak pinleri, Linux profili, özel veri sınırı ve maliyet defteri."
        ],
        [
          "SWAPP ve ilk deney",
          "Sentetik akışlardan gerçek uygulamaya; dijital ikiz deney düzeneği."
        ],
        [
          "Öğrenme ve kabul",
          "Önce RAG, ihtiyaç varsa LoRA; taban modele karşı bağımsız ölçüm."
        ],
        [
          "Sürekli gelişim",
          "İnsan terfisi, geri alma ve ihtiyaçla seçilen yeni uzmanlar."
        ]
      ],
      "note": "Bu repoların proje lisansları henüz seçilmemiştir; kamuya erişim ticari yeniden kullanım izni değildir. Kontrollü fork ve kullanım kapsamı kaynak/model lisanslarıyla birlikte doğrulanacak. Buradaki manifesto, plan ve örnek çalışan şirket entegrasyonu kanıtı değildir.",
      "costTitle": "Her gelişimin bir kalite sonucu ve maliyet kaydı var.",
      "costText": "Öğretmen çağrıları, kod geliştirme, deneyler, GPU eğitimi ve yerel çıkarım ayrı izlenir. Tahmini bütçe, gerçekleşen tüketim ve doğrulanmış fatura birbirine karıştırılmaz. Başarısız işler ve yeniden denemeler de maliyete dahildir.",
      "resourcesTitle": "Claude ve ChatGPT için inşa başlangıcı",
      "resourcesText": "Mimari, veri ve görev sözleşmeleri, aşamalı geliştirme planı, kabul ölçütleri ve devralma promptu tek kaynak paketinde. Güncel model kimliği işe başlarken seçilir; varsayımlar ve açık işler birlikte taşınır.",
      "resourcesAction": "İnşa kaynak paketini indir · Markdown"
    },
    "closing": {
      "lines": [
        "Zekâ değişebilir.",
        "Sorumluluk kalır."
      ],
      "text": "SWAPP’ta biriken insan deneyimini; şirkete ait, ölçülebilir ve sürekli gelişen eylemci yeteneklerine dönüştürmek için.",
      "action": "Gelişimi GitHub’da incele",
      "note": "Bir kamu anlatısı. Runtime kabulü değildir."
    },
    "alt": {
      "hero": "Gece mavisi modüller ve turkuaz cam katmanlarla yerel zekâ ve kalıcı bilgi üzerine kavramsal kompozisyon.",
      "teacher": "İki ayrı mimari çalışma alanı: aday üretimi ve incelenmiş modüller. Kavramsal kompozisyon.",
      "archive": "Bilginin kökenini ve inceleme geçmişini temsil eden şeffaf arşiv katmanları. Kavramsal kompozisyon."
    }
  },
  "en": {
    "meta": {
      "title": "UMAY OS — Models change. Experience endures.",
      "description": "An AOS-based agent layer on Linux: open-weight workers learning from SWAPP experience through RAG and LoRA, with AI-Scientist, human oversight and measured costs."
    },
    "skip": "Skip to content",
    "home": "Home",
    "nav": [
      "Manifesto",
      "Architecture",
      "Scientist",
      "Experience",
      "Development"
    ],
    "backToTop": "Back to top",
    "hero": {
      "lines": [
        "Models change.",
        "Experience endures.",
        "Decisions remain human."
      ],
      "description": "Open-weight agents that know and use SWAPP, learning from how people work. Built on AOS on Linux, with AI-Scientist as the first specialist.",
      "actions": [
        "Read the manifesto",
        "Explore the architecture"
      ],
      "note": "Target architecture · An agent operating layer adapted to the company on standard Linux."
    },
    "manifesto": {
      "title": [
        "More than an answer.",
        "A way of working."
      ],
      "intro": "Turn human experience into a lasting company capability.",
      "quote": [
        "A good answer is a beginning.",
        "Verified knowledge is a traceable record."
      ],
      "principles": [
        [
          "Keep company knowledge private.",
          "SWAPP frontend/backend, company data, employee workflows, LoRA adapters and RAG vector datasets remain private. Architecture and principles are shared publicly."
        ],
        [
          "Let experience outlive the model.",
          "Permitted SWAPP traces gain meaning through goals, actions, context, outcomes and human corrections. Reviewed sources endure and can be processed again when models change."
        ],
        [
          "Large models develop. Open models operate.",
          "Powerful closed-source language models help develop architecture, code, experiments and training candidates. Daily agents run open-weight models in the company environment."
        ],
        [
          "Measure mastery of SWAPP.",
          "Recognizing screens is not enough. An agent must demonstrate finding assets, interpreting data and completing permitted workflows with independent outcome verification."
        ],
        [
          "Keep authority human.",
          "Models do not grant permission. Tools and access are scoped to each task. People decide, accept learning records and approve new versions for use."
        ],
        [
          "Make experiments reproducible.",
          "AI-Scientist designs clustering and anomaly detection experiments on digital-twin data. Data versions, methods, comparisons, costs and uncertainty accompany every result."
        ],
        [
          "Retrieve with RAG. Adapt behavior with LoRA.",
          "RAG retrieves sourced knowledge without changing weights. LoRA adapts a compatible model using selected training examples. Raw traces are neither training data nor correct answers by default."
        ],
        [
          "Measure improvement and cost together.",
          "Track time and resource use for every model call, experiment and training job. Evaluate quality, latency and cost together; unmeasured savings or charges are never treated as zero."
        ]
      ]
    },
    "architecture": {
      "title": "One core. A family of specialists.",
      "intro": "AOS provides the execution foundation on Linux; AI-Scientist provides the first scientific specialist. Controlled downstream forks will adapt both repositories to private SWAPP workflows. This is the target architecture; integrated system acceptance is still pending.",
      "labels": [
        "Operation",
        "Teacher",
        "Development"
      ],
      "onprem": "Company environment · standard Linux",
      "human": "Human · purpose and permission",
      "core": "UMAY OS Core · AOS",
      "s1": "System 1 · fast, bounded action selection",
      "s2": "System 2 · planning, explanation and recovery",
      "scientist": "AI-Scientist · first specialist",
      "scientistNote": "Digital twins · clustering and anomaly experiments",
      "app": "SWAPP · private application",
      "appNote": "Frontend + backend · permitted use through Core",
      "knowledge": "Company-specific experience",
      "knowledgeNote": "Usage traces · RAG · LoRA · skills",
      "rented": "Rented self-host GPU",
      "rentedNote": "Separate placement; not equivalent to on-prem data locality.",
      "distinction": "A model is a compute resource. An agent is an execution role with defined boundaries.",
      "operation": "Linux services host Core, the SWAPP application and experiment workers. AOS is the single execution owner of the SWAPP browser session; different specialists use versioned task and result contracts. AI-Scientist processes permitted data snapshots in a separate experiment environment.",
      "teacherTitle": "Closed-source teachers. Open-weight agents.",
      "teacherFlow": [
        "Claude / OpenAI · capable teacher",
        "Architecture, code, experiment and training candidate",
        "Isolated tests · quality and cost",
        "Human review and promotion",
        "Local open model · version and rollback"
      ],
      "teacherText": "Current capable Claude and OpenAI models guide design, development and training. Record the model identifier, version, date, tokens and cost. Company data is not automatically shared with external providers; daily local operation should continue without teacher access.",
      "developmentTitle": "Contracts before integration. Evidence before promotion.",
      "developmentFlow": [
        "Pinned AOS + AI-Scientist",
        "SWAPP application contract",
        "Traces → RAG / LoRA candidates",
        "Independent quality and cost evaluation",
        "Human promotion · rollback"
      ],
      "developmentText": "Private swapp-backend and swapp-frontend will be delivered separately during development. Start with a synthetic application and data to test contracts; validate real SWAPP workflows after delivery, then the company environment. RAG, LoRA and new specialists have separate evaluations.",
      "teacherCaption": "Two workspaces, two roles. Review stands between production and use. Conceptual artwork.",
      "foundationsTitle": "Three foundations, clear responsibilities.",
      "foundations": [
        [
          "AOS",
          "Core and execution",
          "Local models, task policy and tool execution. The source foundation for a company-adapted Core.",
          "https://github.com/aserdargun/aos"
        ],
        [
          "SWAPP",
          "The human workspace",
          "Assets, time series and digital-twin context. The public presentation is accessible; application code and company content are private.",
          "https://swapp.org.tr/"
        ],
        [
          "AI-Scientist",
          "Experiments and evaluation",
          "The scientific specialist foundation for clustering, anomaly detection and reproducible experiments.",
          "https://github.com/aserdargun/ai-scientist"
        ]
      ],
      "rolesTitle": "System 1 and System 2: separate roles, separate learning.",
      "roles": [
        [
          "S1 · Operator",
          "From permitted options to action.",
          "The AOS source baseline uses Mapika/decider-2b. It selects from permitted options using a fresh observation, rather than acting as a free-text chat model. Decision data, training objectives and adapters are specific to S1."
        ],
        [
          "S2 · Supervisor",
          "From goals to plans and explanations.",
          "The AOS source baseline uses Ternary Bonsai-2 27B for planning, sourced explanation and recovery. S2 has separate data and adapter profiles; it is distinct from the closed-source teacher line."
        ],
        [
          "Unsloth · training line",
          "Model-specific LoRA / QLoRA.",
          "Each role can move to current compatible models. Unsloth training uses supported base weights and role-specific data formats. Adapter loading and benefit in the target inference engine require separate validation."
        ]
      ],
      "rolesNote": "These model names identify the inspected AOS baseline, not permanent product choices. Unsloth compatibility is not assumed for Decider or ternary/GGUF Bonsai. Validate LoRA and 4-bit QLoRA support per model; unsupported models require a separate backend or an evaluated alternative. Scientist research profiles also differ from the Core S1/S2 protocol."
    },
    "scientist": {
      "title": "First specialist: Scientist.",
      "subtitle": "First task: from digital twin to scientific experiment.",
      "intro": "Permitted time series from SWAPP digital twins will feed AI-Scientist experiments to cluster operating regimes and investigate regime-dependent anomaly candidates. Data, code, metrics and results will be tracked in the experiment ledger. The source baseline’s Qwen3.5-9B research profiles are separate from Core’s Decider/Bonsai roles.",
      "label": "Illustration · six synthetic points · not an ML model",
      "steps": [
        [
          "Question",
          "How did past vibration change?",
          "Consider six days of history for an anonymous rotating asset. The aim is to compare possible explanations, not to intervene in a control system."
        ],
        [
          "Data",
          "Permitted data. Explicit provenance.",
          "Six entirely synthetic samples. Time: 1–6 September 2026, daily at 12:00 UTC. Unit: mm/s RMS. These values do not come from a real facility or device."
        ],
        [
          "Calculation",
          "Deterministic calculation. Visible method.",
          "vibration-window-mean v1 compares arithmetic means of the first and last three samples. Percentage change = (last mean / first mean − 1) × 100. The same data produces the same result."
        ],
        [
          "Hypotheses",
          "One finding. Several explanations.",
          "Changes in load or speed, measurement conditions, or mechanical condition could explain the difference. Vibration growth alone cannot distinguish them or diagnose a fault."
        ],
        [
          "Answer",
          "A sourced Advisory Packet.",
          "The packet carries the question, source version, method, supporting and contradicting evidence, alternatives and missing data. Uncertainty remains visible."
        ],
        [
          "Review",
          "Lasting Investigation. Human decision.",
          "A human reviews the evidence and identifies the next data request. An asset-linked Investigation is intended to retain sources and review history. This page runs no record service."
        ]
      ],
      "chart": "Vibration · mm/s RMS",
      "first": "First three days",
      "last": "Last three days",
      "change": "Change",
      "diagnostic": "This change is not a fault diagnosis.",
      "source": "Source and method",
      "alternative": "Alternative explanation",
      "missing": "Missing evidence",
      "alternativeText": "Load or measurement conditions may have changed. Mechanical condition cannot yet be distinguished.",
      "missingText": "Speed, load, sensor calibration and maintenance records are absent.",
      "previous": "Previous",
      "next": "Next",
      "limits": "Read and advise. Writing to control systems, setpoints, start/stop and alarm-state changes are out of scope.",
      "download": "Inspect the synthetic data",
      "table": "Chart data table",
      "time": "Time (UTC)",
      "value": "Vibration (mm/s RMS)",
      "experimentTitle": "The planned first research pipeline",
      "experiments": [
        [
          "01 · Digital-twin data",
          "Versioned data with asset, time, units and quality. Independent test splits by time and asset."
        ],
        [
          "02 · Operating regimes",
          "Explore similar behavior through clustering. Review clusters with domain knowledge; cluster labels are not ground truth."
        ],
        [
          "03 · Anomalies and experiments",
          "Compare against simple baselines; measure false alerts and stability. An anomaly score is neither a fault diagnosis nor a control command."
        ]
      ]
    },
    "experience": {
      "title": [
        "Models change.",
        "Knowledge keeps its history."
      ],
      "intro": "People find assets, inspect trends and review findings in SWAPP. Permitted action traces and corrections become company-specific knowledge and behavior examples after review.",
      "products": [
        [
          "RAG",
          "Retrieve knowledge; keep weights unchanged.",
          "Reviewed documents and workflow knowledge form a private vector dataset with access scope and source versions. Agents use relevant knowledge in answers or task context."
        ],
        [
          "Skill",
          "Make workflows repeatable.",
          "Version each SWAPP workflow with preconditions, steps, authority, expected outcomes and tests. Human habits do not become automation rules without validation."
        ],
        [
          "LoRA / QLoRA",
          "Separate, model-bound adapters for S1 and S2.",
          "Reviewed examples are converted to the role’s data format. Choose LoRA or a compatible 4-bit QLoRA path for Unsloth-supported models. Evaluate the adapter against the same base on independent tasks before human-approved use."
        ]
      ],
      "flow": [
        "Permitted usage trace",
        "Cleaning and human review",
        "RAG / skill / training candidate",
        "Independent evaluation",
        "Version, monitor and rollback"
      ],
      "note": "Refreshing a RAG index is not fine-tuning. Deleting a source does not remove its influence from a trained adapter. Recheck model, tokenizer, embedding and adapter compatibility; unpromoted candidates do not change daily operation.",
      "boundaryTitle": "The knowledge that stays with the company",
      "boundaries": [
        [
          "Private application",
          "swapp-backend and swapp-frontend will be delivered separately; they are not part of this public site."
        ],
        [
          "Private data and methods",
          "Company data, employee traces, reviews and working methods remain within company access boundaries."
        ],
        [
          "Private learning artifacts",
          "LoRA adapters, RAG vector datasets, training examples and evaluation records are isolated by company."
        ]
      ]
    },
    "development": {
      "title": "Where do we stand today?",
      "date": "Source review · 3 October 2026",
      "columns": [
        "Existing in public sources",
        "UMAY architecture decision",
        "Integration and acceptance pending"
      ],
      "sourceIntro": "AOS and AI-Scientist provide existing implementation foundations. Source pins are not test results for an integrated UMAY system on this site.",
      "decisions": [
        "Standard Linux + AOS Core + the company’s SWAPP application.",
        "AI-Scientist first: clustering and anomaly experiments on digital twins.",
        "Separate S1/S2 model profiles; private RAG, Unsloth LoRA/QLoRA and closed-source teachers.",
        "Quality, time and cost records for each development job."
      ],
      "pending": [
        "Controlled forks and implementation of the Core–Scientist contract.",
        "Private SWAPP code delivery and real workflow acceptance.",
        "Permitted trace collection, RAG, training and independent evaluation.",
        "Company deployment, cost reconciliation and operational acceptance."
      ],
      "roadmap": [
        [
          "Foundations and contracts",
          "Source pins, Linux profile, private data boundaries and cost ledger."
        ],
        [
          "SWAPP and first experiment",
          "From synthetic workflows to the real application; a digital-twin experiment setup."
        ],
        [
          "Learning and acceptance",
          "RAG first; LoRA where justified, with independent base-model comparisons."
        ],
        [
          "Continuous improvement",
          "Human promotion, rollback and new specialists selected for measured needs."
        ]
      ],
      "note": "Project licenses for these repositories have not been selected; public access does not grant commercial reuse permission. Verify controlled forks and usage scope against source and model licenses. This manifesto, plan and example do not prove a working company integration.",
      "costTitle": "Every improvement has a quality result and a cost record.",
      "costText": "Track teacher calls, coding, experiments, GPU training and local inference separately. Keep budget estimates, measured usage and reconciled invoices distinct. Include failed jobs and retries in costs.",
      "resourcesTitle": "A starting point for Claude and ChatGPT",
      "resourcesText": "Architecture, data and task contracts, phased delivery, acceptance criteria and a handoff prompt in one source pack. Select current model identifiers at the start; carry assumptions and open work forward.",
      "resourcesAction": "Download implementation pack · Markdown (Turkish)"
    },
    "closing": {
      "lines": [
        "Intelligence can change.",
        "Responsibility endures."
      ],
      "text": "Turn the human experience accumulated in SWAPP into measurable, continuously improving agent capabilities owned by the company.",
      "action": "Explore development on GitHub",
      "note": "A public narrative. Not runtime acceptance."
    },
    "alt": {
      "hero": "A conceptual composition of navy modules and teal glass layers representing local intelligence and lasting knowledge.",
      "teacher": "Two separate architectural workspaces for candidate production and reviewed modules. Conceptual composition.",
      "archive": "Transparent archive layers representing knowledge provenance and review history. Conceptual composition."
    }
  }
};
