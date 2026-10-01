# Azure Static Web Apps yayın sözleşmesi

Hedef kullanıcı tarafından seçilen `umayos subscription` ve `swa-umayos-org` adıdır. 1 Ekim 2026 yapılandırması:

| Alan | Değer |
| --- | --- |
| Repository / üretim dalı | `aserdargun/umayos` / `main` |
| Subscription | `umayos subscription` / `2e01d989-c181-4c26-aeff-94c053fc964c` |
| Resource group | `rg-umayos-org` |
| Static Web App | `swa-umayos-org` |
| Bölge / SKU | West Europe / **Free** |
| Azure adresi | https://white-wave-09587f203.3.azurestaticapps.net |
| Artifact | `dist/` |
| Workflow | `.github/workflows/deploy-swa-umayos-org.yml` |
| Actions secret | `AZURE_STATIC_WEB_APPS_API_TOKEN_UMAYOS_ORG` |
| Concurrency | `swa-umayos-org-production`, `cancel-in-progress: false` |

Azure kaynak entegrasyonu `None`; tek yayın workflow'u doğrulanmış statik çıktıyı yükler. `main` push veya manuel workflow dispatch, sabit Ubuntu 24.04 runner ve Node 24 ile `npm ci`, Chromium kurulumu, `npm run validate` ve `npm run prepare:release` çalıştırır. Official Actions referansları sabit commit SHA'larına pinlidir. `Azure/static-web-apps-deploy`, `skip_app_build: true`, `skip_api_build: true`, `app_location: dist` kullanır; backend/API artifact'i yoktur.

Deployment token yalnız Azure CLI → GitHub Actions secret borusunda aktarılır; dosyaya veya loga yazılmaz. Bütün subscription kapsamlı Azure komutlarında yukarıdaki ID açıkça verilir. Bu yeni kaynak önceki uygulamaları değiştirmez.

`staticwebapp.config.json`, gerçek 404'ü özel sayfaya yönlendirir. AVIF/WebP/WOFF2/CSV/manifest MIME tipleri açıkça tanımlıdır. `/release.json` önbelleğe alınmaz; repository, branch, commit, builtAt ve workflowRun alanları yayın kimliğini taşır. [Microsoft yapılandırma referansı](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration).

## Üretim kabulü

Workflow'un son başarılı run'ı ve remote `main` SHA'sı, canlı `/release.json` commit/workflowRun alanlarıyla eşleşmelidir. Azure default environment `Ready`, dal `main`, update zamanı son deploy adımıyla ilişkili olmalıdır. Kaynağın Free/West Europe ayarları ve boş custom-domain listesi ayrıca kontrol edilir. TR/EN, favicon/Apple/manifest, CSS/JS/font/görseller, gerçek 404 ve MIME tipleri canlı host üzerinden doğrulanır.

```sh
gh run list --repo aserdargun/umayos --workflow deploy-swa-umayos-org.yml
az staticwebapp environment list --name swa-umayos-org --resource-group rg-umayos-org --subscription 2e01d989-c181-4c26-aeff-94c053fc964c
curl --fail https://white-wave-09587f203.3.azurestaticapps.net/release.json
PLAYWRIGHT_BASE_URL=https://white-wave-09587f203.3.azurestaticapps.net npm run test:e2e
```

Canlı test aynı 24 testlik yerel TR/EN, dört genişlik, iki tema ve etkileşim sözleşmesini kullanır; yerel preview açmaz. Tema/icon screenshot kanıtı için `CAPTURE_THEME_EVIDENCE=1` eklenebilir. Yerel kabul kaydı: [VALIDATION](VALIDATION.md).

`umayos.org` canonical hedefi korunur. Özel alan adı/DNS bağlantısı bu yayın görevine dahil değildir. Yayın kapsamı public manifesto/mimari sitesidir; UMAY runtime, kurum içi SWAPP, gerçek veri entegrasyonu veya cihazdaki PWA kurulumu kabulü değildir.
