# 囍事銀行電子喜帖｜HTML 架構說明

> 本文件說明目前的 `index.html` 專案。頁面以「囍事銀行 LOVE BANK 永軒與昀蓁終身聯名帳戶對帳單」為設計概念，呈現邀請、幸福資產與負債、婚宴資訊、出席回覆與注意事項。

設計目標：

- 電子版可直接用手機、桌機瀏覽
- 同一份 HTML 可直接列印成 A4 / A5 紙本喜帖
- 保留銀行對帳單視覺語言
- 可整合 RSVP、Google Maps、LINE 官方帳號與婚禮 AI 小管家
- 後續可再加入動畫、QR Code、API 與資料庫


## 1. 建議專案結構

```text
wedding20261212/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  └─ main.js
│  ├─ images/
│  │  └─ couple-photo.jpg
├─ README.md
└─ v1_wedding_bank_statement_html_architecture.md
```


`index.html` 含文件中繼資料及頁面標記，並引用 `assets/css/style.css`、`assets/js/main.js` 與婚紗照。圓環圖、銀行標誌及裝飾圖樣以 SVG 直接標記在 HTML。專案不需建置工具，使用瀏覽器即可開啟；部署時須保留相對路徑與 `assets/` 資料夾。

## 2. 頁面結構

所有主要內容包在 `<main class="sheet">` 中，依序如下：

| 順序 | 區塊 | 用途 |
| --- | --- | --- |
| 1 | `<header>`／`masthead` | 顯示囍事銀行標誌、英文品牌、月份及對帳單標題。 |
| 2 | `meta-strip` | 顯示帳戶日期、帳戶期間、帳戶類型及核准狀態。 |
| 3 | `recipient` | 顯示新人聯名戶名、婚禮日期及帳戶狀態。 |
| 4 | `greeting` | 邀請訊息與帳戶生效日期。 |
| 5 | `overview` | 幸福資產配置圓環圖、圖例及無限愛情餘額。 |
| 6 | `ledger-grid` | 左側幸福資產與長期投資；右側幸福負債及帳戶說明。 |
| 7 | `wedding` | 婚宴日期、迎賓與開席時間、場地、地址及回覆期限。 |
| 8 | `service` | 婚禮服務說明、Google 地圖、LINE 官方帳號、加入行事曆及列印操作。 |
| 9 | `rsvp` | 出席表單，將稱呼、出席狀況與人數組成可複製的文字。 |
| 10 | `terms` | 邀請與帳戶概念的注意事項。 |
| 11 | `ad` | LOVE BANK 形象文案及新人婚紗照。 |
| 12 | `<footer>` | 文件識別、頁碼及文件編號。 |

區塊以 `<header>`、`<section>`、`<main>`、`<footer>` 等語意標記組織；多數主要區塊設有 `aria-label`，SVG 圖像也有替代說明。

## 3. 個人化資料欄位

目前的 HTML 已直接填入新人與婚宴資料，沒有雙大括號範本欄位或個別賓客名單；同一份喜帖供所有收件人瀏覽。RSVP 的稱呼、出席狀況與人數由賓客在瀏覽器內輸入，只用來產生回覆文字。

| 未來可參數化的資料 | 目前固定顯示位置 | 內容 |
| --- | --- | --- |
| `{{GuestName}}` | 收件人資料、稱謂及邀請內文 | 賓客姓名 |
| `{{InvitationNumber}}` | 收件人資料 | 邀請函編號 |
| `{{TableNumber}}` | 收件人資料 | 桌次 |
| `{{GuestCount}}` | 收件人資料 | 邀請人數 |
| `{{GroomName}}` | 邀請內文 | 新郎姓名 |
| `{{BrideName}}` | 邀請內文 | 新娘姓名 |
| `{{TripCount}}` | 幸福資產表 | 共同旅行次數 |
| `{{WeddingTime}}` | 婚宴資訊 | 婚宴時間 |
| `{{Venue}}` | 婚宴資訊 | 場地名稱 |
| `{{Address}}` | 婚宴資訊 | 場地地址 |
| `{{DressCode}}` | 婚宴資訊 | 服裝要求 |

若未來需要製作每位賓客專屬版本，可將上述婚宴資料或邀請編號改為部署時產生的欄位；目前維護時直接編輯 `index.html` 中的固定文字即可。

## 4. 樣式與版面

CSS 寫在 `assets/css/style.css`，使用 CSS Grid、Flexbox、自訂色彩變數與一般文件排版樣式；互動程式集中在 `assets/js/main.js`。

- **桌面與一般螢幕：** `.sheet` 呈現單張直式帳單，使用紙張底色、留白、細線分隔與陰影。
- **窄螢幕（`max-width: 640px`）：** 紙張改為滿版；頁首與欄位改成單欄或雙欄排列；資產與負債改為上下排列；婚宴資料及條款調整為窄版格線。
- **列印：** `@media print` 與 `@page` 設定 A4 直式、零頁邊距；`.sheet` 設為 `210mm × 297mm`，並縮小部分間距及字級以配合單頁文件。透過 `print-color-adjust: exact` 保留背景色彩。

手機與桌機可使用地圖連結、LINE 官方帳號 `@634ydtgf`、加入行事曆及列印／儲存 PDF。RSVP 表單只在瀏覽器本機組成回覆文字並複製；賓客須自行貼回收到喜帖的對話，網站不會傳送、收集或儲存回覆。列印由瀏覽器完成；實際輸出仍會受瀏覽器、印表機及縮放設定影響。

## 5. 內嵌 SVG 圖樣

圓環圖與品牌標誌直接以 SVG 標記寫在 HTML 中。圓環圖的分項比例是固定視覺呈現；編輯圖例或比例時，需同步調整 SVG 圓環的 `stroke-dasharray`、`stroke-dashoffset` 與圖例文字。RSVP 使用本機表單，不需要 QR Code 或外部回覆服務；LINE 入口連結至官方帳號 `@634ydtgf`。

## 6. 維護方式

1. 先在 `index.html` 更新婚宴固定資料與雙大括號範本欄位。
2. 修改視覺樣式時，編輯 `assets/css/style.css` 中對應的區塊。
3. 調整圖表或標誌時，更新 `index.html` 內相應 SVG；替換婚紗照時，更新 `assets/images/couple-photo.jpg`。
4. 發布前核對婚宴資訊、Google 地圖地址、LINE 官方帳號及 RSVP 回覆流程。
5. 以瀏覽器檢視窄螢幕版及 A4 列印預覽；如內容增長，重新檢查是否仍能符合單頁列印設定。

若未來增加資料產生或外部 RSVP 服務，請同步更新專案結構、隱私與資料處理說明。




# 8. 後續功能建議

此架構完成後，可依序加入：

### Phase 1 — 靜態版本

- 完成 HTML
- RWD 手機版
- Print CSS
- A4 PDF 輸出
- RSVP QR Code
- LINE QR Code

### Phase 2 — 電子喜帖體驗

- 首頁動畫
- Transaction History 捲動動畫
- 婚禮倒數
- Google Maps
- LINE 官方帳號按鈕
- RSVP 表單

### Phase 3 — AI 婚禮小管家

可整合：

- 婚禮時間查詢
- 婚宴地址查詢
- 交通方式
- 出席人數修改
- 葷素需求
- 停車資訊
- 新人常見問題

---

# 9. 視覺設計關鍵字

未來做 UI 時可沿用：

```text
Private Banking
Luxury Financial Statement
Swiss Editorial Design
Minimalist Wedding Invitation
Warm Ivory Paper
Dark Burgundy Typography
Fine Banking Grid
Monospaced Account Numbers
Elegant Serif Headline
Modern Taiwanese Wedding
Premium Printed Statement
Digital First
Print Friendly
```

---

# 10. 核心概念

這份專案不要把電子喜帖與實體喜帖視為兩套不同設計。

應採用：

```text
ONE DATA SOURCE
      ↓
ONE HTML
      ↓
┌──────────────┬──────────────┐
│ SCREEN CSS   │ PRINT CSS    │
│ 電子喜帖      │ 實體喜帖      │
│ 手機 / 桌機   │ PDF / 印刷     │
└──────────────┴──────────────┘
```

因此未來只要修改一次：

- 婚禮時間
- 地址
- 新人姓名
- RSVP
- 婚宴資訊

電子版與紙本版就會同步更新。

---

**Project Concept**

> STATEMENT OF LOVE  
> A lifetime account, officially opened.

**Love Bank — Lifetime Relationship Division**
