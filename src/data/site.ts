export type Locale = "tr" | "en";
export const sources = [
  {
    "name": "AOS",
    "repo": "https://github.com/aserdargun/aos",
    "pin": "dfd06322219b9295c5fc618bef180464b3d17767",
    "role": {
      "tr": "Çekirdek temeli",
      "en": "Core foundation"
    }
  },
  {
    "name": "AI-Scientist",
    "repo": "https://github.com/aserdargun/ai-scientist",
    "pin": "01b17c3b3038d3c753cd80f2bbc9fbc04ca646fe",
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
      "description": "Çalışan başına izole Linux container’larında SWAPP, AI-Scientist ve eylemciler; tüm işlemlerden izlenebilir deneyim, seçilmiş kayıtlardan yerel model gelişimi."
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
      "description": "Her çalışana izole bir Linux çalışma alanı. SWAPP, AI-Scientist ve diğer eylemciler burada çalışır; işlemler kayda, değerli deneyimler yerel modellerin gelişimine dönüşür.",
      "actions": [
        "Manifestoyu oku",
        "Mimariyi keşfet"
      ],
      "note": "Hedef mimari · Çalışan başına container · Yerel işletim · Güçlü modellerle mimari gelişim"
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
          "Her çalışana izole bir çalışma alanı.",
          "Her çalışan için Linux container’ı ayağa kalkar; SWAPP web uygulaması, AI-Scientist ve diğer eylemciler bu izole kapsamda çalışır. Oturumlar, dosyalar ve erişim yetkileri ayrılır; şirket bilgisi özel alanda kalır."
        ],
        [
          "Her işlem kayda, değerli deneyim birikime dönüşsün.",
          "Çalışma alanındaki insan, eylemci ve servis işlemleri; amaç, eylem, sonuç, hata ve düzeltmeleriyle loglanır. Kayıtlar container’dan bağımsız korunur. Katma değeri doğrulanan, kullanım izni olan örnekler öğrenmeye alınır."
        ],
        [
          "Mimariyi güçlü modellerle geliştir. Yerelde işlet.",
          "Mimari değişiklikler güçlü büyük dil modelleriyle hazırlanır: karar gerekçesi, kod farkı, test ve geri alma planı birlikte incelenir. İnsan onayıyla sürümlenir. Günlük eylemciler yerelde açık ağırlıklı modellerle çalışır."
        ],
        [
          "SWAPP’ı ölçerek öğren.",
          "Ekranları tanımak yeterli değildir. Eylemci; varlığı bulmayı, veriyi yorumlamayı ve izinli iş akışını tamamlamayı bağımsız sonuç doğrulamasıyla göstermelidir."
        ],
        [
          "Yetki insanda kalsın.",
          "Model izin üretmez. Eylemcilerin araçları ve erişimi çalışan ve görev kapsamıyla sınırlanır. Son karar, öğrenme kaydının kabulü ve yeni sürümün kullanıma alınması insandadır."
        ],
        [
          "İlk uzmanla başla. Yeni uzmanlara açık kal.",
          "AI-Scientist ilk uzmandır; yerelde çalışan başka uzman eylemciler ortak görev, yetki, log ve sonuç sözleşmeleriyle eklenebilir. Her uzman izole kapsamda çalışır; bilimsel deneylerin veri, yöntem ve sonuçları yeniden kurulabilir olmalıdır."
        ],
        [
          "Skill ile uygula. RAG ile hatırla. Fine-tune ile geliştir.",
          "Seçilmiş kayıtlar testli skill’lere, kaynaklı RAG bilgisine ve yerel modellere özgü fine-tune adaylarına dönüşür. LoRA/QLoRA yalnız uyumlu modellerde değerlendirilir. Her adayın katkısı ölçülür; ham log doğrudan eğitim verisi sayılmaz."
        ],
        [
          "Gelişimi ve maliyeti birlikte ölç.",
          "Her model çağrısı, deney ve eğitim işi için süre ve kaynak tüketimi izlenir. Kalite, gecikme ve maliyet birlikte değerlendirilir; ölçülmemiş kazanç veya ücret sıfır kabul edilmez."
        ]
      ]
    },
    "architecture": {
      "title": "Her çalışana bir alan. Ortak bir öğrenme.",
      "intro": "AOS Core, çalışan başına izole Linux container kapsamını yönetir. Her alanda SWAPP web uygulaması, AI-Scientist ve diğer uzman eylemciler çalışır. Yerel model servisleri ve kalıcı kayıtlar şirket ortamında kalır. Bu hedef mimarinin birleşik sistem kabulü henüz yapılmadı.",
      "labels": [
        "İşletim",
        "Öğretmen",
        "Gelişim"
      ],
      "onprem": "Şirket ortamı · Linux sunucusu",
      "human": "Çalışan oturumu · amaç ve izin",
      "core": "UMAY OS Core · AOS",
      "s1": "System 1 · hızlı ve sınırlı eylem seçimi",
      "s2": "System 2 · plan, açıklama ve toparlanma",
      "scientist": "AI-Scientist · ilk uzman",
      "scientistNote": "Çalışana bağlı, izole deney işleri",
      "app": "SWAPP · web uygulaması",
      "appNote": "Frontend + backend · çalışana ait uygulama örneği",
      "rented": "Kiralık self-host GPU",
      "rentedNote": "Ayrı yerleşim; kurum içi veri yerelliğiyle eş tutulmaz.",
      "distinction": "Model bir hesap kaynağıdır. Eylemci, sınırları tanımlı bir yürütme rolüdür.",
      "operation": "Çalışan alanı bir container veya aynı izolasyon kapsamındaki servis container’larından oluşur. SWAPP, Core ve uzmanlar ayrı süreç yetkileriyle çalışır; Scientist deneyleri ek sandbox’larda yürütülür. Core her tarayıcı oturumunun tek otomasyon sahibidir. Container yeniden kurulsa da işlem kayıtları ve onaylı öğrenme ürünleri korunur. Ortak GPU için Scientist’in mevcut broker’ı tek tahsis otoritesi olarak korunur; çalışan container’ları ayrı GPU scheduler açmaz.",
      "teacherTitle": "Mimari değişiklikler güçlü büyük dil modelleriyle.",
      "teacherFlow": [
        "Claude / OpenAI · güçlü geliştirme modeli",
        "Mimari karar · kod farkı · geri alma planı",
        "İzole test · kalite ve maliyet",
        "İnsan incelemesi ve onayı",
        "Sürümlü dağıtım · yerel işletim"
      ],
      "teacherText": "Mimari ve sözleşme değişiklikleri güçlü büyük dil modelleriyle ayrı geliştirme alanında hazırlanır; gerekçe, etkilenen bileşenler ve test kanıtı birlikte kaydedilir. Günlük yerel eylemciler çalışma sırasında mimariyi değiştirmez. Şirket kayıtları dış sağlayıcıya otomatik aktarılmaz. Model kimliği ve maliyet izlenir; öğretmen erişimi olmadan yerel işletimin sürmesi hedeflenir.",
      "developmentTitle": "Birleşimden önce sözleşme, terfiden önce kanıt.",
      "developmentFlow": [
        "Çalışan container’ı + uygulama sözleşmesi",
        "Tüm işlemler için kalıcı log",
        "Değerli kayıt → skill / RAG / fine-tune",
        "Bağımsız kalite ve maliyet ölçümü",
        "İnsan terfisi · geri alma"
      ],
      "developmentText": "Önce iki sentetik çalışan alanıyla izolasyon, kayıt bütünlüğü ve yeniden başlatma sınanır. Özel SWAPP kodu teslim edildiğinde gerçek uygulama akışları aynı kapsamda kabul edilir. Seçilmiş kayıtların öğrenme katkısı ayrı ölçülür; mimari değişiklikler güçlü modelle hazırlanıp test ve insan onayından geçer.",
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
      "rolesNote": "Bu model adları incelenen AOS temelini gösterir; değişmez ürün seçimi değildir. Decider ve ternary/GGUF Bonsai için Unsloth uyumu varsayılmaz. LoRA ve 4-bit QLoRA desteği model bazında doğrulanır; desteklenmeyen model için ayrı backend veya değerlendirilmiş alternatif gerekir. Scientist’in araştırma profilleri de Core S1/S2 protokolünden ayrıdır.",
      "workspace": "Çalışan başına izole Linux container alanı",
      "workspaceNote": "Ayrı oturum, dosya alanı, ağ erişimi ve kaynak kotası. Aynı şablon her çalışan için ayrı kurulur.",
      "agents": "Diğer eylemciler",
      "agentsNote": "Görev başına sınırlı araçlar ve yetki",
      "servicesTitle": "Container dışında kalıcı şirket servisleri",
      "services": [
        [
          "Yerel model servisleri",
          "S1 / S2 / araştırma · yetki ve bağlam ayrımı"
        ],
        [
          "Kalıcı log ve öğrenme deposu",
          "Tüm işlemler → değer seçimi → skill / RAG / fine-tune"
        ]
      ],
      "extensionsTitle": "Yeni yerel uzmanlara açık bir sistem.",
      "extensionsText": "AI-Scientist ilk uzmandır. Yerelde çalışan başka uzman eylemciler; sürümlü yetenek kaydı, görev/sonuç sözleşmesi, sınırlı araç ve veri erişimi, kaynak kotası, iptal ve işlem loglarıyla sisteme eklenebilir. Her uzman çalışan alanının izolasyonuna ve insan denetimine uyar.",
      "extensionsNote": "AOS’un yeni kayıtlı eylemci yürütücüsü bu genişlemenin kaynak temelidir. Kararlı genel plugin API’si, her uzmanla uyumluluk ve çok çalışanlı UMAY kabulü henüz tamamlanmış değildir. Açıklık burada genişletilebilirliktir; proje lisansı ayrıca belirlenir."
    },
    "scientist": {
      "title": "İlk uzman: Scientist.",
      "subtitle": "İlk iş: dijital ikizden bilimsel deneye.",
      "intro": "AI-Scientist, her çalışanın Linux container alanında ilk uzman olarak çalışacak. İzinli SWAPP dijital ikiz verileriyle kümeleme ve anomali deneyleri ayrı sandbox’larda yürütülecek; tüm denemeler, hatalar ve sonuçlar ortak işlem izine bağlanacak. Araştırma modelleri, Core’un S1/S2 rollerinden ayrı değerlendirilecek. Yeni kaynakta CPU deney akışı ve seçili deney hafızası mevcut; varsayılan field-lab profilinde LLM/GPU kapalı. Çalışan başına UMAY bağlantısı ayrı kabul bekliyor.",
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
      "intro": "Çalışan alanındaki SWAPP kullanımı, eylemci adımları, model ve araç çağrıları, deneyler, hatalar ve insan düzeltmeleri loglanır. Sonucu doğrulanan, tekrar kullanılabilir katkı sağlayan kayıtlar seçilir; skill, RAG ve yerel model eğitimi için incelenir.",
      "products": [
        [
          "RAG",
          "Bilgiyi getir; ağırlıkları değiştirme.",
          "İncelenmiş belgeler ve kullanım bilgisi, erişim kapsamı ve kaynak sürümüyle özel vektör verisetine işlenir. Eylemci ilgili bilgiyi yanıt veya görev bağlamında kullanır."
        ],
        [
          "Skill",
          "Kullanım yöntemini tekrar edilebilir kıl.",
          "SWAPP akışı veya eylemci yöntemi; önkoşul, adımlar, yetki, beklenen sonuç ve testleriyle sürümlenir. Bir kaydın skill olması için yöntemin yeniden uygulanabilir katkısı doğrulanır."
        ],
        [
          "Fine-tune · LoRA / QLoRA",
          "S1 ve S2 için ayrı, modele bağlı adaptörler.",
          "İncelenmiş örnekler rolün veri biçimine dönüştürülür. Unsloth destekli modellerde LoRA veya uygun 4-bit QLoRA yolu seçilir. Adaptör, aynı taban modele karşı bağımsız görevlerde sınanır; sonra insan onayıyla kullanıma alınır."
        ]
      ],
      "flow": [
        "Tüm çalışma işlemlerini logla",
        "Katma değeri seç ve incele",
        "Skill / RAG / fine-tune adayı",
        "Yerel modelde bağımsız değerlendirme",
        "İnsan onayı, sürüm ve geri alma"
      ],
      "note": "İşlem kaydı tutmak, her içeriği eğitimde kullanma izni vermez. Sırlar ve gereksiz kişisel veriler ayıklanır; başarısızlıklar ve düzeltmeler de katkı sağlayabilir. RAG ağırlıkları değiştirmez. Fine-tune adayları bağımsız değerlendirme ve insan onayından sonra yerel işletime alınır.",
      "boundaryTitle": "Şirkete özel kalan birikim",
      "boundaries": [
        [
          "Özel uygulama",
          "swapp-backend ve swapp-frontend ayrıca teslim edilecek; bu kamu sitesinin parçası değildir."
        ],
        [
          "Özel veri ve yöntem",
          "Çalışanların işlem kayıtları ve yöntemleri erişim kapsamıyla saklanır. Öğrenme için paylaşım ayrıca incelenir; container izolasyonu veri paylaşım izni oluşturmaz."
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
      "sourceIntro": "Yeni push’lar kaynak düzeyinde incelendi. Aşağıdaki çalışma sonuçları upstream’in tarihli kabul kayıtlarıdır; bu sitede yeniden çalıştırılmış UMAY runtime testleri değildir.",
      "decisions": [
        "Her çalışan için izole Linux container alanı: SWAPP + AOS Core + eylemciler.",
        "İlk uzman AI-Scientist; diğer uzmanlar aynı görev ve kayıt sözleşmesinde.",
        "Tüm işlemlerin loglanması; değerli kayıtlardan skill, RAG ve yerel fine-tune.",
        "Mimari değişikliklerde güçlü büyük dil modelleri, test ve insan onayı."
      ],
      "pending": [
        "Çalışan container alanları, yeni yerel uzman kabulü ve kalıcı log bütünlüğü.",
        "Özel SWAPP kodunun teslimi ve gerçek iş akışlarının kabulü.",
        "Eksiksiz işlem kaydı, değer seçimi ve yerel model gelişiminin ölçülmesi.",
        "AOS–Scientist uyumlu kaynak/sözleşme çifti ve tek otoriteli gerçek ortak GPU kabulü."
      ],
      "roadmap": [
        [
          "Temel ve sözleşmeler",
          "Çalışan container şablonu, erişim sınırları ve kalıcı işlem defteri."
        ],
        [
          "SWAPP ve ilk deney",
          "Sentetik akışlardan gerçek uygulamaya; dijital ikiz deney düzeneği."
        ],
        [
          "Öğrenme ve kabul",
          "Katma değerli kayıtlar → skill / RAG / fine-tune; bağımsız yerel model kıyası."
        ],
        [
          "Sürekli gelişim",
          "Güçlü modelle mimari geliştirme, insan onayı ve geri alınabilir sürümler."
        ]
      ],
      "note": "Bu repoların proje lisansları henüz seçilmemiştir; kamuya erişim ticari yeniden kullanım izni değildir. Kontrollü fork ve kullanım kapsamı kaynak/model lisanslarıyla birlikte doğrulanacak. Buradaki manifesto, plan ve örnek çalışan şirket entegrasyonu kanıtı değildir.",
      "costTitle": "Her gelişimin bir kalite sonucu ve maliyet kaydı var.",
      "costText": "Öğretmen çağrıları, kod geliştirme, deneyler, GPU eğitimi ve yerel çıkarım ayrı izlenir. Tahmini bütçe, gerçekleşen tüketim ve doğrulanmış fatura birbirine karıştırılmaz. Başarısız işler ve yeniden denemeler de maliyete dahildir.",
      "resourcesTitle": "Claude ve ChatGPT için inşa başlangıcı",
      "resourcesText": "Çalışan container mimarisi, işlem kayıtları, katma değer seçimi, yerel öğrenme ve güçlü modellerle değişiklik süreci; sözleşmeler, kabul ölçütleri ve devralma promptuyla tek pakette.",
      "resourcesAction": "İnşa kaynak paketini indir · Markdown",
      "sourceUpdates": [
        "AOS: kayıtlı uzman yürütücüsü, kalıcı görev olayları ve izole proje yaşam döngüsü. Scientist CPU adaptöründe sınırlı gerçek deney kabulü raporlanıyor.",
        "AI-Scientist: v0.1.0 ürün teslimi / 0.46.0 laboratuvar; CPU deneyleri, bağımsız Scorer/Referee ve açıkça seçilen deney hafızası."
      ]
    },
    "closing": {
      "lines": [
        "Zekâ değişebilir.",
        "Sorumluluk kalır."
      ],
      "text": "Her çalışanın izole çalışma alanında biriken doğrulanmış deneyimi, şirkete ait yerel modellerin ve eylemcilerin kalıcı yeteneğine dönüştürmek için.",
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
      "description": "SWAPP, AI-Scientist and agents in isolated Linux containers per employee; traceable operations and curated experience for improving local models."
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
      "description": "An isolated Linux workspace for every employee. SWAPP, AI-Scientist and other agents run here; operations become records, and valuable experience improves local models.",
      "actions": [
        "Read the manifesto",
        "Explore the architecture"
      ],
      "note": "Target architecture · Containers per employee · Local operation · Architecture developed with powerful models"
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
          "An isolated workspace for every employee.",
          "A Linux container starts for each employee; the SWAPP web application, AI-Scientist and other agents run within this isolated scope. Sessions, files and access permissions stay separate; company knowledge remains private."
        ],
        [
          "Record every operation. Retain valuable experience.",
          "Human, agent and service operations in the workspace are logged with goals, actions, outcomes, failures and corrections. Records persist independently of containers. Only permitted examples with verified value enter learning."
        ],
        [
          "Develop architecture with powerful models. Operate locally.",
          "Architecture changes are prepared with powerful large language models: decision rationale, code changes, tests and rollback plans are reviewed together. People approve versioned releases. Daily agents run open-weight models locally."
        ],
        [
          "Measure mastery of SWAPP.",
          "Recognizing screens is not enough. An agent must demonstrate finding assets, interpreting data and completing permitted workflows with independent outcome verification."
        ],
        [
          "Keep authority human.",
          "Models do not grant permission. Tools and access are scoped to the employee and task. People decide, accept learning records and approve new versions for use."
        ],
        [
          "Start with one specialist. Welcome more.",
          "AI-Scientist is the first specialist; other local agents can join through shared task, permission, logging and result contracts. Every specialist runs in an isolated scope; scientific experiments retain reproducible data, methods and results."
        ],
        [
          "Act with skills. Retrieve with RAG. Improve with fine-tuning.",
          "Selected records become tested skills, sourced RAG knowledge and fine-tuning candidates for local models. LoRA/QLoRA is evaluated only for compatible models. Measure each candidate’s contribution; raw logs are not training data by default."
        ],
        [
          "Measure improvement and cost together.",
          "Track time and resource use for every model call, experiment and training job. Evaluate quality, latency and cost together; unmeasured savings or charges are never treated as zero."
        ]
      ]
    },
    "architecture": {
      "title": "A workspace for each employee. Shared learning.",
      "intro": "AOS Core manages an isolated Linux container scope for each employee. Each workspace runs the SWAPP web application, AI-Scientist and other specialist agents. Local model services and persistent records remain in the company environment. Integrated acceptance of this target architecture is still pending.",
      "labels": [
        "Operation",
        "Teacher",
        "Development"
      ],
      "onprem": "Company environment · Linux host",
      "human": "Employee session · purpose and permission",
      "core": "UMAY OS Core · AOS",
      "s1": "System 1 · fast, bounded action selection",
      "s2": "System 2 · planning, explanation and recovery",
      "scientist": "AI-Scientist · first specialist",
      "scientistNote": "Isolated experiment jobs scoped to the employee",
      "app": "SWAPP · web application",
      "appNote": "Frontend + backend · an instance per employee",
      "rented": "Rented self-host GPU",
      "rentedNote": "Separate placement; not equivalent to on-prem data locality.",
      "distinction": "A model is a compute resource. An agent is an execution role with defined boundaries.",
      "operation": "An employee workspace consists of one container or service containers within the same isolation scope. SWAPP, Core and specialists use separate process permissions; Scientist experiments run in additional sandboxes. Core is the sole automation owner of each browser session. Records and approved learning artifacts survive container recreation. Scientist’s existing broker remains the single shared-GPU allocation authority; employee containers do not create separate GPU schedulers.",
      "teacherTitle": "Architecture changes with powerful large language models.",
      "teacherFlow": [
        "Claude / OpenAI · powerful development model",
        "Architecture decision · code changes · rollback plan",
        "Isolated tests · quality and cost",
        "Human review and approval",
        "Versioned deployment · local operation"
      ],
      "teacherText": "Architecture and contract changes are prepared with powerful large language models in a separate development workspace; rationale, affected components and test evidence are recorded together. Daily local agents do not change the architecture during operation. Company records are not automatically sent to external providers. Model identity and cost are tracked; local operation should continue without teacher access.",
      "developmentTitle": "Contracts before integration. Evidence before promotion.",
      "developmentFlow": [
        "Employee containers + application contract",
        "Persistent logs for all operations",
        "Valuable records → skills / RAG / fine-tuning",
        "Independent quality and cost evaluation",
        "Human promotion · rollback"
      ],
      "developmentText": "First test isolation, record integrity and restarts with two synthetic employee workspaces. Once private SWAPP code is delivered, validate real workflows in the same scope. Measure the learning value of selected records separately; architecture changes are prepared with powerful models and pass tests and human approval.",
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
      "rolesNote": "These model names identify the inspected AOS baseline, not permanent product choices. Unsloth compatibility is not assumed for Decider or ternary/GGUF Bonsai. Validate LoRA and 4-bit QLoRA support per model; unsupported models require a separate backend or an evaluated alternative. Scientist research profiles also differ from the Core S1/S2 protocol.",
      "workspace": "Isolated Linux container workspace per employee",
      "workspaceNote": "Separate sessions, files, network access and resource quotas. The same template is provisioned independently for every employee.",
      "agents": "Other agents",
      "agentsNote": "Task-scoped tools and permissions",
      "servicesTitle": "Persistent company services outside containers",
      "services": [
        [
          "Local model services",
          "S1 / S2 / research · separate access and context"
        ],
        [
          "Persistent logs and learning store",
          "All operations → value selection → skills / RAG / fine-tuning"
        ]
      ],
      "extensionsTitle": "An open system for new local specialists.",
      "extensionsText": "AI-Scientist is the first specialist. Other locally running specialist agents can join through versioned capability registration, task/result contracts, scoped tools and data, resource quotas, cancellation and operation logs. Every specialist follows workspace isolation and human oversight.",
      "extensionsNote": "The new registered-agent runner in AOS provides a source foundation for this extension. A stable general plugin API, compatibility with every specialist and multi-employee UMAY acceptance are still pending. Open here means extensible; project licensing is a separate decision."
    },
    "scientist": {
      "title": "First specialist: Scientist.",
      "subtitle": "First task: from digital twin to scientific experiment.",
      "intro": "AI-Scientist will run as the first specialist in each employee’s Linux container workspace. Clustering and anomaly experiments on permitted SWAPP digital-twin data will run in separate sandboxes; every trial, failure and result will link to the shared operation trace. Research models will be evaluated separately from Core S1/S2 roles. The new source includes CPU experiments and selected experiment memory; LLM/GPU calls are disabled in the default field-lab profile. Integration into UMAY employee workspaces requires separate acceptance.",
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
      "intro": "Log SWAPP use, agent steps, model and tool calls, experiments, failures and human corrections within each employee workspace. Select records with verified outcomes and reusable value; review them for skills, RAG and local model training.",
      "products": [
        [
          "RAG",
          "Retrieve knowledge; keep weights unchanged.",
          "Reviewed documents and workflow knowledge form a private vector dataset with access scope and source versions. Agents use relevant knowledge in answers or task context."
        ],
        [
          "Skill",
          "Make workflows repeatable.",
          "Version a SWAPP workflow or agent method with preconditions, steps, authority, expected outcomes and tests. A record becomes a skill after its repeatable contribution is verified."
        ],
        [
          "Fine-tuning · LoRA / QLoRA",
          "Separate, model-bound adapters for S1 and S2.",
          "Reviewed examples are converted to the role’s data format. Choose LoRA or a compatible 4-bit QLoRA path for Unsloth-supported models. Evaluate the adapter against the same base on independent tasks before human-approved use."
        ]
      ],
      "flow": [
        "Log all workspace operations",
        "Select and review valuable records",
        "Skill / RAG / fine-tuning candidate",
        "Independent local-model evaluation",
        "Human approval, version and rollback"
      ],
      "note": "Logging an operation does not grant permission to train on every payload. Remove secrets and unnecessary personal data; failures and corrections can also be valuable. RAG does not change weights. Fine-tuning candidates enter local operation only after independent evaluation and human approval.",
      "boundaryTitle": "The knowledge that stays with the company",
      "boundaries": [
        [
          "Private application",
          "swapp-backend and swapp-frontend will be delivered separately; they are not part of this public site."
        ],
        [
          "Private data and methods",
          "Employee operation records and methods retain their access scope. Sharing for learning requires separate review; container isolation does not grant data-sharing permission."
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
      "sourceIntro": "The new pushes were reviewed at source level. Execution results below are dated upstream acceptance reports, not UMAY runtime tests rerun on this site.",
      "decisions": [
        "An isolated Linux container workspace per employee: SWAPP + AOS Core + agents.",
        "AI-Scientist first; other specialists use the same task and logging contracts.",
        "Log all operations; turn valuable records into skills, RAG and local fine-tuning.",
        "Powerful large language models, tests and human approval for architecture changes."
      ],
      "pending": [
        "Employee container workspaces, new local specialist acceptance and persistent log integrity.",
        "Private SWAPP code delivery and real workflow acceptance.",
        "Complete operation logging, value selection and measured local-model improvement.",
        "A compatible AOS–Scientist source/contract pair and real shared-GPU acceptance under one authority."
      ],
      "roadmap": [
        [
          "Foundations and contracts",
          "Employee container template, access boundaries and persistent operation ledger."
        ],
        [
          "SWAPP and first experiment",
          "From synthetic workflows to the real application; a digital-twin experiment setup."
        ],
        [
          "Learning and acceptance",
          "Valuable records → skills / RAG / fine-tuning; independent local-model comparisons."
        ],
        [
          "Continuous improvement",
          "Architecture developed with powerful models, human approval and reversible releases."
        ]
      ],
      "note": "Project licenses for these repositories have not been selected; public access does not grant commercial reuse permission. Verify controlled forks and usage scope against source and model licenses. This manifesto, plan and example do not prove a working company integration.",
      "costTitle": "Every improvement has a quality result and a cost record.",
      "costText": "Track teacher calls, coding, experiments, GPU training and local inference separately. Keep budget estimates, measured usage and reconciled invoices distinct. Include failed jobs and retries in costs.",
      "resourcesTitle": "A starting point for Claude and ChatGPT",
      "resourcesText": "Employee container architecture, operation records, value selection, local learning and changes with powerful models; contracts, acceptance criteria and a handoff prompt in one pack.",
      "resourcesAction": "Download implementation pack · Markdown (Turkish)",
      "sourceUpdates": [
        "AOS: registered specialist runner, durable task events and isolated project lifecycle. Limited real-experiment acceptance is reported for the Scientist CPU adapter.",
        "AI-Scientist: v0.1.0 product delivery / 0.46.0 laboratory; CPU experiments, independent Scorer/Referee and explicitly selected experiment memory."
      ]
    },
    "closing": {
      "lines": [
        "Intelligence can change.",
        "Responsibility endures."
      ],
      "text": "Turn verified experience from each employee’s isolated workspace into lasting capabilities for company-owned local models and agents.",
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
