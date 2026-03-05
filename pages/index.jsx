import { useState, useEffect, useRef, createContext, useContext } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════

const LOGO_URL = "https://static.insales-cdn.com/files/1/6624/35199456/original/logo_guide_smartstore__вє__О_н.png";
const RED = "#c8102e";
const DARK = "#1a1a1a";

const NAV_CATEGORIES = [
  { label: "Стоит посмотреть", slug: "stoit-posmotret", children: [
    { label: "Новинки", slug: "new" }, { label: "Акции", slug: "aktsii" },
    { label: "Хиты продаж", slug: "hits" }, { label: "Распродажа", slug: "rasprodazha" },
    { label: "Скоро в России", slug: "skoro-v-rossii" },
  ]},
  { label: "Направления ухода", slug: "napravleniya-uhoda", children: [
    { label: "Уход за кожей", slug: "uhod-za-kozhey" },
    { label: "Уход за волосами", slug: "uhod-za-volosami" },
    { label: "Уход за телом", slug: "uhod-za-telom" },
    { label: "Уход за руками", slug: "uhod-za-rukami" },
  ]},
  { label: "Очищение кожи", slug: "ochischenie", children: [
    { label: "Мицеллярная вода", slug: "mitsellyarnaya-voda" },
    { label: "Пенки для умывания", slug: "penki-dlya-umivaniya" },
    { label: "Гидрофильные масла", slug: "gidrofilnye-masla" },
    { label: "Мыло для лица", slug: "mylo-dlya-litsa" },
  ]},
  { label: "Маски и наборы", slug: "maski-i-nabory", children: [] },
  { label: "Защита от солнца", slug: "solntse", children: [
    { label: "Солнцезащитные кремы", slug: "solntsezaschitnye-kremy" },
    { label: "Солнцезащитные стики", slug: "solntsezaschitnye-stiki" },
  ]},
  { label: "Макияж", slug: "makiyazh", children: [
    { label: "Консилеры", slug: "konsilery" }, { label: "ББ кремы", slug: "bb-kremy" },
    { label: "Кушоны", slug: "kushony" }, { label: "Пудры", slug: "pudry" },
    { label: "Тинты", slug: "tinty" }, { label: "Тени", slug: "teni" },
    { label: "Румяна", slug: "rumyana" }, { label: "Туши", slug: "tushi" },
  ]},
  { label: "Для мужчин", slug: "kosmetika-dlya-muzhchin", children: [] },
];

const PRODUCTS=[
{id:1,name:"Cover Perfection Make Up Ready Base",price:1836,slug:"cover-perfection-make-up-ready-base",img:"https://static.insales-cdn.com/images/products/1/7857/2810109617/thumb-7Luk67KE7Y287Y6Z7IWY66mU7J207YGs7JeF66CI65SU67Kg7J207Iqk_560x750.png",desc:"База под макияж",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:2,name:"Bio Solution Mask Pack",price:968,slug:"bio-solution-mask-pack-2",img:"https://static.insales-cdn.com/images/products/1/5796/934074020/thumb-67CU7J207Jik7IaU66Oo7IWY66eI7Iqk7YGs7Iuc7Yq47Ya17ZWp_560x750.png",desc:"Набор тканевых масок",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:3,name:"Body & Soul Sweet Thai Body Wash",price:1359,slug:"body-soul-sweet-thai-body-wash",img:"https://static.insales-cdn.com/images/products/1/2973/870787997/thumb-62a6d0dbcda3e_464x620.png",desc:"Гель для душа",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:4,name:"Body & Soul Love Hawaii Body Wash",price:1359,slug:"body-soul-love-hawaii-body-wash",img:"https://static.insales-cdn.com/images/products/1/3848/870788872/thumb-62a6d0dab2781_464x620.png",desc:"Гель для душа",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:5,name:"Body & Soul Love Hawaii Body Lotion",price:1140,slug:"body-soul-love-hawaii-body-lotion",img:"https://static.insales-cdn.com/images/products/1/4486/870789510/thumb-62a6d0d9d916e_464x620.png",desc:"Лосьон для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:6,name:"Garden Pleasure Hand Cream",price:865,slug:"garden-pleasure-hand-cream",img:"https://static.insales-cdn.com/images/products/1/6734/870513230/thumb-62a6cc8518a39_464x620.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:7,name:"Garden Pleasure Cica Cleansing Tissue",price:853,slug:"garden-pleasure-cica-cleansing-tissue",img:"https://static.insales-cdn.com/images/products/1/7214/870513710/thumb-62a6cc841b327_464x620.png",desc:"Очищающие салфетки",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:8,name:"Gold Snail Wrinkle Plumper 2X Power",price:3067,slug:"gold-snail-wrinkle-plumper-2x-power",img:"https://static.insales-cdn.com/images/products/1/6512/870521200/thumb-63e1fe744b18f_464x620.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:9,name:"Gold Snail Eye Gel Patch Set",price:3072,slug:"gold-snail-eye-gel-patch-set",img:"https://static.insales-cdn.com/images/products/1/8050/870522738/thumb-62a6cc86c7415_464x620.png",desc:"Патчи для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:10,name:"Gold Lifting Toner",price:6144,slug:"gold-lifting-toner",img:"https://static.insales-cdn.com/images/products/1/4897/870527777/thumb-62a6cc8654589_464x620.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:11,name:"Gold Lifting Cream",price:6527,slug:"gold-lifting-cream",img:"https://static.insales-cdn.com/images/products/1/5721/870528601/thumb-62a6cc8610466_464x620.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:12,name:"Gold Lifting Emulsion",price:5496,slug:"gold-lifting-emulsion",img:"https://static.insales-cdn.com/images/products/1/7170/870530050/thumb-62a6cc8592fbb_464x620.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:13,name:"Calamansi Pore Cool Down Cream",price:1614,slug:"calamansi-pore-cool-down-cream",img:"https://static.insales-cdn.com/images/products/1/693/870548149/thumb-62a6d8009f76f_464x620.png",desc:"Крем для лица",catName:"Calamansi Pore",cats:["calamansi-pore", "po-seriyam"]},
{id:14,name:"Calamansi Pore Freshener",price:1210,slug:"calamansi-pore-freshener",img:"https://static.insales-cdn.com/images/products/1/3508/870550964/thumb-62a6cc88a70f2_464x620.png",desc:"Тонер для лица",catName:"Calamansi Pore",cats:["calamansi-pore", "po-seriyam"]},
{id:15,name:"Calamansi Pore Stick Cleanser",price:1509,slug:"calamansi-pore-stick-cleanser",img:"https://static.insales-cdn.com/images/products/1/4439/870551895/thumb-62a6cc8842967_464x620.png",desc:"Скраб-стик для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:16,name:"Care Plus Manuka Honey Cream",price:1387,slug:"care-plus-manuka-honey-cream",img:"https://static.insales-cdn.com/images/products/1/1716/870573748/thumb-63c7af0a665e8_464x620.png",desc:"Крем для тела",catName:"Care Plus",cats:["care-plus", "po-seriyam"]},
{id:17,name:"Care Plus Enhanced Mugwort Steam Cream",price:1509,slug:"care-plus-enhanced-mugwort-steam-cream",img:"https://static.insales-cdn.com/images/products/1/2332/870574364/thumb-63c7a082acbcc_464x620.png",desc:"Крем для тела",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:18,name:"Gem Miracle Pink Pearl Bubble Mask",price:1652,slug:"gem-miracle-pink-pearl-bubble-mask",img:"https://static.insales-cdn.com/images/products/1/7769/870571609/thumb-6507ec0fe623d_464x620.png",desc:"Пузырьковая маска для лица",catName:"Gem Miracle",cats:["gem-miracle", "po-seriyam"]},
{id:19,name:"Urban Eco Golden Berry C Toning Water",price:3048,slug:"urban-eco-golden-berry-c-toning-water",img:"https://static.insales-cdn.com/images/products/1/7673/870596089/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo7Yag64ud7JuM7YSw_464x620.png",desc:"Тонер для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:20,name:"Urban Eco Golden Berry C Cleansing Foam",price:1573,slug:"urban-eco-golden-berry-c-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/3075/870599683/thumb-645d9bd9802a7_464x620.png",desc:"Пенка для умывания",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:21,name:"Urban Eco Golden Berry C Tone Up Sun Cream",price:3073,slug:"urban-eco-golden-berry-c-tone-up-sun-cream",img:"https://static.insales-cdn.com/images/products/1/4186/870600794/thumb-64f574292cb80_464x620.png",desc:"Солнцезащитный крем",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:22,name:"Urban Eco Golden Berry C Cream",price:3114,slug:"urban-eco-golden-berry-c-cream",img:"https://static.insales-cdn.com/images/products/1/2158/870615150/thumb-1_464x620.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:23,name:"Urban Eco Golden Berry C Ampoule",price:2787,slug:"urban-eco-golden-berry-c-ampoule",img:"https://static.insales-cdn.com/images/products/1/5334/870618326/thumb-1_464x620__1_.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:24,name:"Urban Eco Golden Berry C Toner Pack",price:2971,slug:"urban-eco-golden-berry-c-toner-pack",img:"https://static.insales-cdn.com/images/products/1/5369/2782172409/8773faa697f8ffea91ae51f26063050c.png",desc:"Пады для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:25,name:"Urban Eco Harakeke Fresh Cream",price:1957,slug:"urban-eco-harakeke-fresh-cream",img:"https://static.insales-cdn.com/images/products/1/2119/870623303/thumb-64210899ebf2c_464x620_1_.png",desc:"Крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:26,name:"Urban Eco Harakeke Foam Cleanser",price:1519,slug:"urban-eco-harakeke-foam-cleanser",img:"https://static.insales-cdn.com/images/products/1/2828/870624012/thumb-642107c412762_464x620_1_.png",desc:"Пенка для умывания",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:27,name:"Urban Eco Harakeke Toner",price:1738,slug:"urban-eco-harakeke-toner",img:"https://static.insales-cdn.com/images/products/1/3678/870624862/thumb-6421017ad726e_464x620_1_.png",desc:"Тонер для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:28,name:"Urban Eco Harakeke Cream",price:1964,slug:"urban-eco-harakeke-cream",img:"https://static.insales-cdn.com/images/products/1/4202/870625386/thumb-6420ffbf03950_464x620_1_.png",desc:"Крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:29,name:"Natural Daily Cleansing Foam Aloe",price:841,slug:"natural-daily-cleansing-foam-aloe",img:"https://static.insales-cdn.com/images/products/1/7469/870636845/thumb-64K07LaU650642w7J2866as7YG066CM7KeV7Y87JWM66Gc7JeQ_464x620_1_.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:30,name:"Natural Daily Cleansing Foam Avocado",price:841,slug:"natural-daily-cleansing-foam-avocado",img:"https://static.insales-cdn.com/images/products/1/8062/870637438/thumb-64K07LaU650642w7J2866as7YG066CM7KeV7Y87JWE67O07Lm064E_464x620_1_.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:31,name:"Natural Daily Skin Clearing Toner",price:1234,slug:"natural-daily-skin-clearing-toner",img:"https://static.insales-cdn.com/images/products/1/1792/870639360/thumb-63292973026af_464x620_1_.png",desc:"Тонер для лица",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:32,name:"Urban Eco Harakeke Deep Moisture Toner",price:1907,slug:"urban-eco-harakeke-deep-moisture-toner",img:"https://static.insales-cdn.com/images/products/1/3588/870641156/thumb-6420f921283b8_464x620_1_.png",desc:"Тонер для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:33,name:"Urban Eco Harakeke Deep Moisture Cream",price:2056,slug:"urban-eco-harakeke-deep-moisture-cream",img:"https://static.insales-cdn.com/images/products/1/3951/870641519/thumb-6420f81ff1378_464x620_1_.png",desc:"Крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:34,name:"Snail Essential EX - Anti-Wrinkle Power Ritual",price:11666,slug:"snail-essential-ex-anti-wrinkle-power-ritual",img:"https://static.insales-cdn.com/images/products/1/5585/2784974289/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__17_10_47.png",desc:"Ритуал антивозрастного ухода",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:35,name:"Urban Eco Harakeke Deep Moisture Essence",price:1926,slug:"urban-eco-harakeke-deep-moisture-essence",img:"https://static.insales-cdn.com/images/products/1/4286/870641854/thumb-6420f73b8f183_464x620_1_.png",desc:"Эссенция для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:36,name:"Urban Eco Harakeke Deep Moisture Emulsion",price:1801,slug:"urban-eco-harakeke-deep-moisture-emulsion",img:"https://static.insales-cdn.com/images/products/1/4683/870642251/thumb-6420f6f1cc1df_464x620_1_.png",desc:"Эмульсия для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:37,name:"Urban Eco Harakeke Deep Moisture Eye Cream",price:1911,slug:"urban-eco-harakeke-deep-moisture-eye-cream",img:"https://static.insales-cdn.com/images/products/1/5002/870642570/thumb-6420f690f1f5f_464x620_1_.png",desc:"Крем для глаз",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:38,name:"Iceland Hydrating Eye Stick",price:1193,slug:"iceland-hydrating-eye-stick",img:"https://static.insales-cdn.com/images/products/1/547/870646307/thumb-6451fbfdb16b2_464x620_1_.png",desc:"Стик для глаз",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:39,name:"Iceland Aqua Moist Cream",price:1860,slug:"iceland-aqua-moist-cream",img:"https://static.insales-cdn.com/images/products/1/383/870662527/thumb-62a6d1e5d0396_464x620_1_.png",desc:"Крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:40,name:"Iceland Hydrating Toner",price:1522,slug:"iceland-moisture-toner",img:"https://static.insales-cdn.com/images/products/1/635/870662779/thumb-62a6d1e5ad3b7_464x620_1_.png",desc:"Тонер для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:41,name:"Iceland Hydrating Emulsion",price:1525,slug:"iceland-water-emulsion",img:"https://static.insales-cdn.com/images/products/1/4225/870666369/thumb-62a6d1e585a6f_464x620_1_.png",desc:"Эмульсия для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:42,name:"Eco Soul Eyebrow Kit",price:1162,slug:"eco-soul-eyebrow-kit-01-natural-brown",img:"https://static.insales-cdn.com/images/products/1/2896/873450320/thumb-63d3639ea782e_560x750.png",desc:"Тени для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:43,name:"Eco Soul Edge Brow Pencil",price:1099,slug:"eco-soul-edge-brow-pencil",img:"https://static.insales-cdn.com/images/products/1/3650/870927938/thumb-7JeQ7L2U7IaM7Jq47Jej7KeA67iM66Gc7Jqw7Y6c7Iqs66as7ZWE6riw7ZqN7IS47Yq4_464x620.png",desc:"Карандаш для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:44,name:"True Mushroom LX Glow Milk Oil",price:4195,slug:"true-mushroom-lx-glow-milk-oil",img:"https://static.insales-cdn.com/images/products/1/824/932266808/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk6riA66Gc7Jqw67CA7YGs7Jik7J28_560x750.png",desc:"Масло для лица",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:45,name:"Eco Soul Lash Shot Mascara",price:1375,slug:"eco-soul-lash-shot-mascara",img:"https://static.insales-cdn.com/images/products/1/3546/870927834/thumb-650d4ff28dda3_464x620.png",desc:"Тушь для ресниц",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:46,name:"Gold Snail 24K Prestige Ampoule",price:4949,slug:"gold-snail-24k-prestige-ampoule",img:"https://static.insales-cdn.com/images/products/1/2589/870517277/thumb-6rOo65Oc7Iqk64Sk7J2824K7ZSE66CI7Iqk7Yuw7KeA7JWw7ZSM_464x620.png",desc:"Сыворотка для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:47,name:"Gold Snail Sensitive Multi Serum",price:2601,slug:"gold-snail-sensitive-multi-serum",img:"https://static.insales-cdn.com/images/products/1/3858/870518546/thumb-645077c4e1965_464x620.png",desc:"Сыворотка для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:48,name:"Gold Snail Silk Firming Serum",price:3756,slug:"gold-snail-silk-firming-serum",img:"https://static.insales-cdn.com/images/products/1/5105/870519793/thumb-64224aa0cd226_464x620.png",desc:"Сыворотка для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:49,name:"Gold Lifting Essence",price:5583,slug:"gold-lifting-essence",img:"https://static.insales-cdn.com/images/products/1/6528/870529408/thumb-62a6cc85cefdf_464x620.png",desc:"Эссенция для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:50,name:"Gem Miracle Black Pearl O2 Bubble Mask",price:2552,slug:"gem-miracle-black-pearl-o2-bubble-mask",img:"https://static.insales-cdn.com/images/products/1/7573/870571413/thumb-62c796fbce1b5_464x620.png",desc:"Пузырьковая маска для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:51,name:"Urban Eco Golden Berry C Eye Cream",price:3065,slug:"urban-eco-golden-berry-c-eye-cream",img:"https://static.insales-cdn.com/images/products/1/4876/870593292/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo7JWE7J207YGs66a8_01_464x620.png",desc:"Крем для глаз",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:52,name:"Urban Eco Harakeke Essence",price:1811,slug:"urban-eco-harakeke-essence",img:"https://static.insales-cdn.com/images/products/1/4817/870626001/thumb-6420faeea036e_464x620_1_.png",desc:"Эссенция для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:53,name:"Urban Eco Harakeke Skin Care 3 Set",price:6295,slug:"urban-eco-harakeke-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/6211/870627395/thumb-64ab8ea97fde4_560x750_1_.png",desc:"Подарочный набор",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:54,name:"Natural Daily Skin Barrier Toner",price:1221,slug:"natural-daily-skin-barrier-toner",img:"https://static.insales-cdn.com/images/products/1/2291/870639859/thumb-632929f3b734e_464x620_1_.png",desc:"Тонер для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:55,name:"Urban Eco Harakeke Deep Moisture Skin Care 3-Piece Set",price:5412,slug:"urban-eco-harakeke-deep-moisture-skin-care-3-piece-set",img:"https://static.insales-cdn.com/images/products/1/5629/870643197/thumb-64ab8f188290b_464x620_1_.png",desc:"Подарочный набор",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:56,name:"Silk Hair Repair Ampoule Mist",price:1516,slug:"silk-hair-repair-ampoule-mist",img:"https://static.insales-cdn.com/images/products/1/5611/870667755/thumb-7Iuk7YGs7Zek7Ja066as7Y6Y7Ja07JWw7ZSM6647Iqk7Yq4_464x620.png",desc:"Мист для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:57,name:"Silk Hair Repair Curl Cream",price:1443,slug:"silk-hair-repair-curl-cream",img:"https://static.insales-cdn.com/images/products/1/851/870671187/thumb-65262c2a0b4a9_464x620.png",desc:"Крем для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:58,name:"Silk Hair Repair Pack",price:1443,slug:"silk-hair-repair-pack",img:"https://static.insales-cdn.com/images/products/1/5268/870675604/thumb-64ed4d3ca4e92_464x620.png",desc:"Маска для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:59,name:"Silk Hair Repair Treatment",price:1485,slug:"silk-hair-repair-treatment",img:"https://static.insales-cdn.com/images/products/1/5662/870675998/thumb-64d5c68312256_464x620.png",desc:"Бальзам для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:60,name:"Silk Hair Repair Curl Serum",price:1805,slug:"silk-hair-repair-curl-serum",img:"https://static.insales-cdn.com/images/products/1/6096/870676432/thumb-64b48a00e86b2_464x620.png",desc:"Сыворотка для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:61,name:"Silk Hair Repair Oil",price:1922,slug:"silk-hair-repair-oil",img:"https://static.insales-cdn.com/images/products/1/7039/870677375/thumb-64b4879c4dccf_464x620.png",desc:"Масло для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:62,name:"Eco Soul Powerproof Super Slim Eyeliner",price:1241,slug:"eco-soul-powerproof-super-slim-eyeliner",img:"https://static.insales-cdn.com/images/products/1/3818/870928106/thumb-7JeQ7L2U7IaM7Jq47YyM7JuM7ZSE66Oo7ZSE7LSI7Iqs66a87JWE7J2065287J2064SI_464x620.png",desc:"Подводка для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:63,name:"Eco Earth Cica Sun Cream",price:1141,slug:"eco-earth-cica-sun-cream",img:"https://static.insales-cdn.com/images/products/1/1337/870688057/thumb-62c6787000941_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:64,name:"Eco Soul Essence Foundation Pact",price:3020,slug:"eco-soul-essence-foundation-pact",img:"https://static.insales-cdn.com/images/products/1/3902/870928190/thumb-62a6d2408b7bc_464x620.png",desc:"Пудра для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:65,name:"Eco Earth Waterproof Sun Stick",price:1899,slug:"eco-earth-waterproof-sun-stick",img:"https://static.insales-cdn.com/images/products/1/5010/870691730/thumb-62a6d2486730f_464x620.png",desc:"Солнцезащитный стик",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:66,name:"Eco Earth Light Sun Cream",price:1750,slug:"eco-earth-light-sun-cream",img:"https://static.insales-cdn.com/images/products/1/6600/870693320/thumb-7JeQ7L2U7Ja07Iqk65287J207Yq47ISg7YGs66a8_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:67,name:"My Cleanse Recipe Cleansing Foam Shine Berry",price:826,slug:"my-cleanse-recipe-cleansing-foam-shine-berry",img:"https://static.insales-cdn.com/images/products/1/3623/870698535/thumb-66eI7J207YG066CM7KaI66CI7Iuc7ZS87YG066CM7KeV7Y87IOk7J2467Kg66as_560x750_1_.png",desc:"Пенка для умывания",catName:"My Cleanse Recipe",cats:["my-cleanse-recipe", "po-seriyam"]},
{id:68,name:"Natural Condition Sparkling Cleansing Water",price:2013,slug:"natural-condition-sparkling-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/2813/870705917/thumb-64c85b243193a_464x620.png",desc:"Мицеллярная вода для лица",catName:"Natural Condition",cats:["natural-condition", "po-seriyam"]},
{id:69,name:"Natural Condition Cleansing Foam Sebum Control",price:1143,slug:"natural-condition-cleansing-foam-sebum-control",img:"https://static.insales-cdn.com/images/products/1/3974/870707078/thumb-64K07LaU6507Luo65SU7IWY7YG066CM7KeV7Y87ZS87KeA6rCc7ISg_464x620.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:70,name:"Natural Condition Cleansing Oil Deep Clean",price:1539,slug:"natural-condition-cleansing-oil-deep-clean",img:"https://static.insales-cdn.com/images/products/1/5179/870708283/thumb-62a6cc90048d5_464x620.png",desc:"Гидрофильное масло для лица",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:71,name:"Natural Condition Avocado Cleansing Cream",price:1170,slug:"natural-condition-avocado-cleansing-cream",img:"https://static.insales-cdn.com/images/products/1/5590/870708694/thumb-62a6cc8fad83e_464x620.png",desc:"Очищающие крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:72,name:"Healing Tea Garden Cleansing Cotton Pads",price:1596,slug:"healing-tea-garden-cleansing-cotton-pads",img:"https://static.insales-cdn.com/images/products/1/7661/870735341/thumb-64f695c7c1734_464x620_1_.png",desc:"Хлопковые диски",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:73,name:"Healing Tea Garden Green Tea Cleansing Water",price:1088,slug:"healing-tea-garden-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/2213/870738085/thumb-650bcf7c29797_560x750_1_.png",desc:"Мицеллярная вода для лица",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:74,name:"Healing Tea Garden White Tea Cleansing Water",price:1083,slug:"healing-tea-garden-white-tea-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/6053/870766501/thumb-650bcf7c298db_560x750.png",desc:"Мицеллярная вода для лица",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:75,name:"Healing Tea Garden Tea Tree Cleansing Water",price:1088,slug:"healing-tea-garden-tea-tree-cleansing-water-2",img:"https://static.insales-cdn.com/images/products/1/6205/870766653/thumb-650bcf7c29a1c_560x750.png",desc:"Мицеллярная вода для лица",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:76,name:"Healing Tea Garden Green Tea Cleansing Tissues",price:743,slug:"healing-tea-garden-green-tea-cleansing-tissues",img:"https://static.insales-cdn.com/images/products/1/6524/870766972/thumb-62a94b0a1c365_560x750.png",desc:"Очищающие салфетки",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:77,name:"Healing Tea Garden Green Tea Oil in Cleansing Water",price:1226,slug:"healing-tea-garden-green-tea-oil-in-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/6732/870767180/thumb-64f695dfe89c1_560x750.png",desc:"Мицеллярная вода для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:78,name:"Healing Tea Garden White Tea Cleansing Foam",price:1024,slug:"healing-tea-garden-white-tea-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7365/870767813/thumb-650bd36010dc3_560x750.png",desc:"Пенка для умывания",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:79,name:"Healing Tea Garden Tea Tree Cleansing Foam",price:1018,slug:"healing-tea-garden-tea-tree-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7765/870768213/thumb-650bd36010cb4_560x750.png",desc:"Пенка для умывания",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:80,name:"Healing Tea Garden Green Tea Cleansing Foam",price:1018,slug:"healing-tea-garden-green-tea-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/8057/870768505/thumb-650bd36010b8f_560x750.png",desc:"Пенка для умывания",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:81,name:"Body & Soul Sweet Thai Body Scrub",price:1020,slug:"body-soul-sweet-thai-body-scrub",img:"https://static.insales-cdn.com/images/products/1/3034/870788058/thumb-62a6d0db7e718_464x620.png",desc:"Скраб для тела",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:82,name:"Body & Soul Inner Cleanser",price:1243,slug:"body-soul-inner-cleanser",img:"https://static.insales-cdn.com/images/products/1/2915/870787939/thumb-62a6d0dc14c3b_464x620.png",desc:"Гель для интимной гигиены",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:83,name:"Body & Soul Love Hawaii Body Mist",price:936,slug:"body-soul-love-hawaii-body-mist",img:"https://static.insales-cdn.com/images/products/1/4301/870789325/thumb-62a6d0da22b3e_464x620.png",desc:"Мист для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:84,name:"Body & Soul Sweet Thai Body Mist",price:958,slug:"body-soul-sweet-thai-body-mist",img:"https://static.insales-cdn.com/images/products/1/3241/870788265/thumb-62a6d0db36f23_464x620.png",desc:"Мист для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:85,name:"Body & Soul Sweet Thai Body Lotion",price:1140,slug:"body-soul-sweet-thai-body-lotion",img:"https://static.insales-cdn.com/images/products/1/3675/870788699/thumb-62a6d0daee8b7_464x620.png",desc:"Лосьон для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:86,name:"Derma Skin Mask Sheet Creamy Barrier",price:342,slug:"derma-skin-mask-sheet-creamy-barrier",img:"https://static.insales-cdn.com/images/products/1/6884/870816484/thumb-642U66eI7Iqk7YKo66eI7Iqk7YGs7Iuc7Yq47YGs66as66467Kg66as7Ja0_560x750.png",desc:"Тканевая маска для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:87,name:"Collagen EX - Youth Renewal Ritual",price:7262,slug:"collagen-ex-youth-renewal-ritual",img:"https://static.insales-cdn.com/images/products/1/3953/2784833393/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__16_33_29.png",desc:"Ритуал возвращения молодости",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:88,name:"Derma Skin Mask Sheet Pore Tension",price:342,slug:"derma-skin-mask-sheet-pore-tension",img:"https://static.insales-cdn.com/images/products/1/7119/870816719/thumb-642U66eI7Iqk7YKo66eI7Iqk7YGs7Iuc7Yq47Ys7Ja07YWQ7IWY_560x750.png",desc:"Тканевая маска для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:89,name:"Derma Plan Green Calming Cream",price:2538,slug:"derma-plan-green-calming-cream",img:"https://static.insales-cdn.com/images/products/1/7822/870817422/thumb-62a6cc95b16bd_464x620.png",desc:"Крем для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:90,name:"Derma Plan Green Bubble Foam Cleanser",price:2087,slug:"derma-plan-green-bubble-foam-cleanser",img:"https://static.insales-cdn.com/images/products/1/7845/870817445/thumb-62a6cc9570d18_464x620.png",desc:"Пенка для умывания",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:91,name:"Dear My Foot Power Peeling",price:867,slug:"dear-my-foot-power-peeling",img:"https://static.insales-cdn.com/images/products/1/7895/870817495/thumb-62a6cc9e76f56_464x620.png",desc:"Пилинг для ног",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:92,name:"Derma Plan Gel to Foam Cleanser",price:1709,slug:"derma-plan-gel-to-foam-cleanser",img:"https://static.insales-cdn.com/images/products/1/1787/870819579/thumb-641aa44a26fba_464x620.png",desc:"Пенка для умывания",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:93,name:"Derma Plan Ultra Balm Cream",price:2211,slug:"derma-plan-ultra-balm-cream",img:"https://static.insales-cdn.com/images/products/1/1918/870819710/thumb-641aa364461b0_464x620.png",desc:"Крем для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:94,name:"Derma Plan Cica Soothing Barrier Ampoule Special Set",price:2600,slug:"derma-plan-cica-soothing-barrier-ampoule-special-set",img:"https://static.insales-cdn.com/images/products/1/1952/870819744/thumb-64ab95f0326c6_464x620.png",desc:"Сыворотка для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:95,name:"Ultra Shot PDRN Skin Boosting Serum",price:4323,slug:"ultra-shot-pdrn-skin-boosting-serum",img:"https://static.insales-cdn.com/images/products/1/4427/1018933579/thumb-7Jq47Yq465287IO3PDRN7Iqk7YKo67aA7Iqk7YyF7IS4658_560x750.png",desc:"Сыворотка для лица",catName:"Ultra Shot",cats:["ultra-shot", "po-seriyam"]},
{id:96,name:"Derma Plan Soothing Toner",price:1926,slug:"derma-plan-soothing-toner",img:"https://static.insales-cdn.com/images/products/1/1984/870819776/thumb-641aa2f81339f_464x620.png",desc:"Тонер для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:97,name:"Derma Plan Balancing Moisturizer",price:2008,slug:"derma-plan-balancing-moisturizer",img:"https://static.insales-cdn.com/images/products/1/2018/870819810/thumb-641aa0a341363_464x620.png",desc:"Сыворотка для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:98,name:"Royal Natural 24K Collagen Cream Essence",price:2113,slug:"royal-natural-24k-collagen-cream-essence",img:"https://static.insales-cdn.com/images/products/1/2316/870820108/thumb-66Gc7Je064K07LaU650247LyA7J207L2c65286rKQ7YGs66a87JeQ7IS87Iqk_464x620.png",desc:"Эссенция для лица",catName:"Royal Natural",cats:["royal-natural", "po-seriyam"]},
{id:99,name:"Royal Natural 24K Collagen Eye Cream for Face",price:2388,slug:"royal-natural-24k-collagen-eye-cream-for-face",img:"https://static.insales-cdn.com/images/products/1/2458/870820250/thumb-66Gc7Je064K07LaU65024K7JWE7J207YGs66a87Ys7Y6Y7J207Iqk_464x620.png",desc:"Крем для глаз",catName:"Royal Natural",cats:["royal-natural", "po-seriyam"]},
{id:100,name:"Royal Natural 24K Collagen Ampoule",price:7437,slug:"royal-natural-24k-collagen-ampoule",img:"https://static.insales-cdn.com/images/products/1/2567/870820359/thumb-6414045abfbbc_464x620.png",desc:"Сыворотка для лица",catName:"Royal Natural",cats:["royal-natural", "po-seriyam"]},
{id:101,name:"Royal Natural Horse Oil Cream",price:3120,slug:"royal-natural-horse-oil-cream",img:"https://static.insales-cdn.com/images/products/1/1593/2797946425/82ef7228919976aab5bc0f5f39c6c426.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:102,name:"Mineral Homme Black Toner EX",price:2332,slug:"mineral-homme-black-toner-ex",img:"https://static.insales-cdn.com/images/products/1/3133/870820925/thumb-62a6d0d761105_464x620.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:103,name:"Mineral Homme Black All-in-One Fluid EX",price:2871,slug:"mineral-homme-black-all-in-one-fluid-ex",img:"https://static.insales-cdn.com/images/products/1/3351/870821143/thumb-62a6d0d6be5c1_464x620.png",desc:"Флюид для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:104,name:"Bio Solution Nutritional Peptide Mask Sheet",price:135,slug:"bio-solution-nutritional-peptide-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/3731/870821523/thumb-649bd70026f67_464x620.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:105,name:"Bio Solution Radiance Multi Vitamin Mask Sheet",price:135,slug:"bio-solution-radiance-multi-vitamin-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/4334/870822126/thumb-64758d0c9d876_464x620.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:106,name:"Bio Solution Moisture Hyaluronic Acid Mask Sheet",price:149,slug:"bio-solution-moisture-hyaluronic-acid-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/4600/870822392/thumb-64535b2b7c1d1_464x620.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:107,name:"Saemmul Perfume BB Pact",price:1558,slug:"saemmul-perfume-bb-pact",img:"https://static.insales-cdn.com/images/products/1/5628/870823420/thumb-62a6d1515d3f7_464x620.png",desc:"Пудра для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:108,name:"Saemmul Perfect Curling Mascara",price:738,slug:"saemmul-perfect-curling-mascara",img:"https://static.insales-cdn.com/images/products/1/4042/879169482/EM052104645_SaemmulPerfectCurlingMascara_Front_02_L.webp",desc:"Тушь для ресниц",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:109,name:"Saemmul Airy Cotton Makeup Base 01 Green",price:1024,slug:"saemmul-airy-cotton-makeup-base-01-green",img:"https://static.insales-cdn.com/images/products/1/6257/870824049/thumb-62a6d14a85ecf_464x620.png",desc:"Тональная основа для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:110,name:"Saemmul Luminous Multi Shading",price:1182,slug:"saemmul-luminous-multi-shading",img:"https://static.insales-cdn.com/images/products/1/6752/870824544/thumb-62a95800eaa0c_464x620.png",desc:"Тени для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:111,name:"Saemmul Easy Eyeliner",price:624,slug:"saemmul-easy-eyeliner",img:"https://static.insales-cdn.com/images/products/1/6417/870824209/thumb-7IOY66y87J207KeA7JWE7J2065287J2064SI_560x750.png",desc:"Подводка для глаз",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:112,name:"Saemmul Serum Lip Gloss",price:769,slug:"saemmul-serum-lip-gloss",img:"https://static.insales-cdn.com/images/products/1/5273/878818457/vn-11134103-7r98o-lqbllqb9n2nr50.webp",desc:"Блеск для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:113,name:"Saemmul Magic Gloss Tint",price:673,slug:"saemmul-magic-gloss-tint",img:"https://static.insales-cdn.com/images/products/1/6749/870824541/thumb-62a6d0e23279d_464x620.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:114,name:"Saemmul 3D Slim Mascara Brown",price:1212,slug:"saemmul-3d-slim-mascara-brown",img:"https://static.insales-cdn.com/images/products/1/6759/870824551/thumb-62a6d0e0da1f4_464x620.png",desc:"Тушь для ресниц",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:115,name:"See & Saw AC Control Toner",price:1447,slug:"see-saw-ac-control-toner",img:"https://static.insales-cdn.com/images/products/1/6929/870824721/thumb-62ccbe1e8ce5e_464x620.png",desc:"Тонер для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:116,name:"See & Saw AC Control Clear Spot Patch",price:648,slug:"see-saw-ac-control-clear-spot-patch",img:"https://static.insales-cdn.com/images/products/1/6938/870824730/thumb-62a6d1e4d4603_464x620.png",desc:"Точечные патчи для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:117,name:"See & Saw AC Control Cream",price:1551,slug:"see-saw-ac-control-cream",img:"https://static.insales-cdn.com/images/products/1/6948/870824740/thumb-62a6d1e4a324b_464x620.png",desc:"Крем для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:118,name:"See & Saw AC Control Emulsion",price:1326,slug:"see-saw-ac-control-emulsion",img:"https://static.insales-cdn.com/images/products/1/6960/870824752/thumb-62a6d1e460938_464x620.png",desc:"Эмульсия для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:119,name:"See & Saw AC Control Deep Cleansing Foam",price:1373,slug:"see-saw-ac-control-deep-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/6961/870824753/thumb-62a6d1e3b0bb8_464x620.png",desc:"Пенка для умывания",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:120,name:"Cica Soothing Mask",price:1631,slug:"cica-soothing-mask",img:"https://static.insales-cdn.com/images/products/1/6972/870824764/thumb-6408446fdbf4c_464x620.png",desc:"Тканевая маска для лица",catName:"Cica",cats:["cica", "po-seriyam"]},
{id:121,name:"Silk Hair Style Water Spray",price:1214,slug:"silk-hair-style-water-spray",img:"https://static.insales-cdn.com/images/products/1/7065/870824857/thumb-62a6d1e02fb41_560x750.png",desc:"Спрей для волос",catName:"Silk Hair Style",cats:["silk-hair-style", "po-seriyam"]},
{id:122,name:"Secret Pure Nose Clear Patch Set",price:375,slug:"secret-pure-nose-clear-patch-set",img:"https://static.insales-cdn.com/images/products/1/7122/870824914/thumb-64ab8f46680bd_464x620.png",desc:"Патчи для носа",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:123,name:"Eco Soul Vegan Bright Up Makeup Base 02 Lavender",price:2428,slug:"eco-soul-vegan-bright-up-makeup-base-02-lavender",img:"https://static.insales-cdn.com/images/products/1/3554/870927842/thumb-6433997773001_464x620.png",desc:"Тональная основа для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:124,name:"Eco Soul Vegan Bright Up Makeup Base 01 Mint",price:2428,slug:"eco-soul-vegan-bright-up-makeup-base-01-mint",img:"https://static.insales-cdn.com/images/products/1/3557/870927845/thumb-643398c28be77_464x620.png",desc:"Тональная основа для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:125,name:"Eco Soul Eyebrow Kit 02 Gray Brown",price:1353,slug:"eco-soul-eyebrow-kit-02-gray-brown",img:"https://static.insales-cdn.com/images/products/1/3594/870927882/thumb-63d3639ea782e_464x620.png",desc:"Тени для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:126,name:"Eco Soul Perfect Makeup Fixer",price:1411,slug:"eco-soul-perfect-makeup-fixer",img:"https://static.insales-cdn.com/images/products/1/3698/870927986/thumb-62a6d244dc24f_464x620.png",desc:"Фиксатор макияжа",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:127,name:"Eco Soul Advanced Powerproof Eyeliner 01 Deep Black",price:1282,slug:"eco-soul-advanced-powerproof-eyeliner-01-deep-black",img:"https://static.insales-cdn.com/images/products/1/4072/870928360/thumb-62a6d23b9ee4f_464x620.png",desc:"Подводка для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:128,name:"Collagen EX Hydra Toner",price:2327,slug:"collagen-ex-hydra-toner",img:"https://static.insales-cdn.com/images/products/1/4724/870929012/thumb-7L2c65286rKQEX7ZWY7J2065Oc65287Yag64SI_01_464x620.png",desc:"Тонер для лица",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:129,name:"Collagen EX Hydra Emulsion",price:2224,slug:"collagen-ex-hydra-emulsion",img:"https://static.insales-cdn.com/images/products/1/4755/870929043/thumb-7L2c65286rKQEX7ZWY7J2065Oc65287JeQ66mA7KC8_01_464x620.png",desc:"Эмульсия для лица",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:130,name:"Collagen EX Hydra Ampoule",price:2458,slug:"collagen-ex-hydra-ampoule",img:"https://static.insales-cdn.com/images/products/1/4782/870929070/thumb-7L2c65286rKQ7J207JeR7Iqk7ZWY7J2065Oc65287JWw7ZSM_01_464x620.png",desc:"Сыворотка для лица",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:131,name:"Collagen EX Hydra Cleansing Foam",price:1962,slug:"collagen-ex-hydra-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/4803/870929091/thumb-7L2c65286rKQEX7ZWY7J2065Oc65287YG066CM7KeV7Y8_01_464x620.png",desc:"Пенка для умывания",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:132,name:"Collagen EX Hydra Skin Care 3 Set",price:4991,slug:"collagen-ex-hydra-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/4927/870929215/thumb-7L2c65286rKQ7J207JeR7Iqk7ZWY7J2065Oc65287Iqk7YKo7LyA7Ja037KKF7IS47Yq4_464x620.png",desc:"Подарочный набор",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:133,name:"Saemmul Perfect Pore Pact",price:1110,slug:"saemmul-perfect-pore-pact",img:"https://static.insales-cdn.com/images/products/1/7831/870932119/thumb-62a6d14ee6779_464x620.png",desc:"Пудра для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:134,name:"True Mushroom LX Balancing Emulsion",price:4745,slug:"true-mushroom-lx-balancing-emulsion",img:"https://static.insales-cdn.com/images/products/1/6151/870930439/thumb-64813a5d027d2_464x620.png",desc:"Эмульсия для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:135,name:"True Mushroom LX Treatment Toner",price:4611,slug:"true-mushroom-lx-treatment-toner",img:"https://static.insales-cdn.com/images/products/1/6371/870930659/thumb-64813a381f13f_464x620.png",desc:"Тонер для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:136,name:"Touch On Body Grapefruit Body Lotion",price:1644,slug:"touch-on-body-grapefruit-body-lotion",img:"https://static.insales-cdn.com/images/products/1/6513/870930801/thumb-20237YSw7LmY7Jio67CU65SU7J6Q66q967CU65SU66Gc7IWY_464x620.png",desc:"Лосьон для тела",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:137,name:"Touch On Body Rose Body Wash",price:1875,slug:"touch-on-body-rose-body-wash",img:"https://static.insales-cdn.com/images/products/1/6558/870930846/thumb-64fec1d64ac10_464x620.png",desc:"Гель для душа",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:138,name:"Touch On Body Rose Body Lotion",price:1482,slug:"touch-on-body-rose-body-lotion",img:"https://static.insales-cdn.com/images/products/1/6573/870930861/thumb-64ddcc27f3ddb_464x620.png",desc:"Лосьон для тела",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:139,name:"Cover Perfection Allproof Tip Concealer",price:1433,slug:"cover-perfection-allproof-tip-concealer",img:"https://static.insales-cdn.com/images/products/1/7106/873503682/thumb-64e44ca964eaf_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:140,name:"Touch On Body Cotton Body Lotion",price:1590,slug:"touch-on-body-cotton-body-lotion",img:"https://static.insales-cdn.com/images/products/1/6580/870930868/thumb-648041fabd842_464x620.png",desc:"Лосьон для тела",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:141,name:"Touch On Body Cotton Body Wash",price:1875,slug:"touch-on-body-cotton-body-wash",img:"https://static.insales-cdn.com/images/products/1/6674/870930962/thumb-6480413703919_464x620.png",desc:"Гель для душа",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:142,name:"Touch On Body Moringa Body Wash",price:1758,slug:"touch-on-body-moringa-body-wash",img:"https://static.insales-cdn.com/images/products/1/6804/870931092/thumb-646af3d32c2db_464x620.png",desc:"Гель для душа",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:143,name:"Honeybiotics Cleansing Oil",price:2199,slug:"honeybiotics-cleansing-oil",img:"https://static.insales-cdn.com/images/products/1/7660/870931948/thumb-62a6d4dbac238_464x620.png",desc:"Гидрофильное масло для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:144,name:"Saemmul Perfect Pore Pink Pact",price:1145,slug:"saemmul-perfect-pore-pink-pact",img:"https://static.insales-cdn.com/images/products/1/7786/870932074/thumb-62a6d150a6167_464x620.png",desc:"Пудра для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:145,name:"Cell Renew Bio Toner",price:3843,slug:"cell-renew-bio-toner",img:"https://static.insales-cdn.com/images/products/1/3979/871092107/thumb-62a6d15563e3e_464x620_1_.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:146,name:"Cell Renew Bio Micro Peel Cleansing Foam",price:2259,slug:"cell-renew-bio-micro-peel-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7323/871095451/thumb-62a6d1530ff82_464x620_1_.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:147,name:"Jeju Fresh Aloe Soothing Gel",price:570,slug:"jeju-fresh-aloe-soothing-gel-99",img:"https://static.insales-cdn.com/images/products/1/3165/871418973/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7IiY65Sp7KCk997ZWg656E7J247Kad7LaU6rCA_464x620.png",desc:"Гель для лица",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:148,name:"Jeju Fresh Aloe Mist",price:1053,slug:"jeju-fresh-aloe-mist",img:"https://static.insales-cdn.com/images/products/1/5098/871420906/thumb-643cd6e93b3f8_464x620.png",desc:"Мист для лица",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:149,name:"Jeju Fresh Aloe Toner",price:1234,slug:"jeju-fresh-aloe-toner",img:"https://static.insales-cdn.com/images/products/1/6044/871421852/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7Yag64SI_464x620.png",desc:"Тонер для лица",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:150,name:"Jeju Fresh Aloe Cleansing Foam",price:1005,slug:"jeju-fresh-aloe-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7384/871423192/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7YG066CM7KeV7Y8_464x620.png",desc:"Пенка для умывания",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:151,name:"Jeju Fresh Aloe Cream",price:1506,slug:"jeju-fresh-aloe-cream",img:"https://static.insales-cdn.com/images/products/1/142/871424142/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7YGs66a8_464x620.png",desc:"Крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:152,name:"Jeju Fresh Aloe Essence",price:1214,slug:"jeju-fresh-aloe-essence",img:"https://static.insales-cdn.com/images/products/1/1143/871425143/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7JeQ7IS87Iqk_464x620.png",desc:"Эссенция для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:153,name:"Jeju Fresh Aloe Emulsion",price:1555,slug:"jeju-fresh-aloe-emulsion",img:"https://static.insales-cdn.com/images/products/1/2019/871426019/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7JeQ66mA7KC8_464x620.png",desc:"Эмульсия для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:154,name:"Jeju Fresh Aloe Sun Gel",price:1577,slug:"jeju-fresh-aloe-sun-gel",img:"https://static.insales-cdn.com/images/products/1/6378/871430378/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7ISg7KCk_464x620.png",desc:"Солнцезащитный гель",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:155,name:"Snail Essential EX Wrinkle Solution Mist Serum",price:2622,slug:"snail-essential-ex-wrinkle-solution-mist-serum",img:"https://static.insales-cdn.com/images/products/1/6864/871471824/thumb-648137b94240d_464x620.png",desc:"Сыворотка для лица",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:156,name:"Snail Essential 24K Gold Gel Mask Sheet",price:1725,slug:"snail-essential-24k-gold-gel-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/7381/871472341/thumb-6375cf584fa5b_464x620__1_.png",desc:"Тканевая маска для лица",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:157,name:"Snail Essential EX Wrinkle Solution Toner",price:3591,slug:"snail-essential-ex-wrinkle-solution-toner",img:"https://static.insales-cdn.com/images/products/1/7700/871472660/thumb-648134987fc21_464x620.png",desc:"Тонер для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:158,name:"Snail Essential EX Wrinkle Solution Cream",price:3655,slug:"snail-essential-ex-wrinkle-solution-cream",img:"https://static.insales-cdn.com/images/products/1/7947/871472907/thumb-62c64abcbc406_464x620.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:159,name:"Snail Essential EX Wrinkle Solution Essence",price:3514,slug:"snail-essential-ex-wrinkle-solution-essence",img:"https://static.insales-cdn.com/images/products/1/8185/871473145/thumb-62c641934ef44_464x620.png",desc:"Эссенция для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:160,name:"Snail Essential EX Wrinkle Solution Emulsion",price:3510,slug:"snail-essential-ex-wrinkle-solution-emulsion",img:"https://static.insales-cdn.com/images/products/1/273/871473425/thumb-62c63a9f4b9ee_464x620.png",desc:"Эмульсия для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:161,name:"Snail Essential EX Wrinkle Solution Eye Cream",price:3996,slug:"snail-essential-ex-wrinkle-solution-eye-cream",img:"https://static.insales-cdn.com/images/products/1/371/871473523/thumb-62c63932dd9df_464x620.png",desc:"Крем для глаз",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:162,name:"Snail Essential EX Tone Up Essence Pact",price:2868,slug:"snail-essential-ex-tone-up-essence-pact",img:"https://static.insales-cdn.com/images/products/1/425/871473577/thumb-6481371ca3166_464x620.png",desc:"Пудра для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:163,name:"Snail Essential EX Wrinkle Solution Sun Cream",price:2296,slug:"snail-essential-ex-wrinkle-solution-sun-cream",img:"https://static.insales-cdn.com/images/products/1/964/871474116/thumb-648136d8d3119_464x620.png",desc:"Солнцезащитный крем",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:164,name:"Snail Essential EX Deep Cleansing Foam",price:2027,slug:"snail-essential-ex-deep-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/3555/871476707/thumb-62a6d1567dd8c_464x620.png",desc:"Пенка для умывания",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:165,name:"Perfumed Body Moisturizer Cherry Blossom",price:800,slug:"perfumed-body-moisturizer-cherry-blossom",img:"https://static.insales-cdn.com/images/products/1/5226/871568490/thumb-62a6d46821f3e_464x620.png",desc:"Лосьон для тела",catName:"Perfumed Body",cats:["perfumed-body", "po-seriyam"]},
{id:166,name:"Classic Homme Toner",price:3024,slug:"classic-homme-toner",img:"https://static.insales-cdn.com/images/products/1/247/871489783/thumb-62a6d4571e03a_464x620.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:167,name:"Classic Homme Moisturizer",price:3137,slug:"classic-homme-moisturizer",img:"https://static.insales-cdn.com/images/products/1/2681/871492217/thumb-62a6d45678f81_464x620.png",desc:"Лосьон для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:168,name:"Perfumed Body Moisturizer Freesia",price:800,slug:"perfumed-body-moisturizer-freesia",img:"https://static.insales-cdn.com/images/products/1/5050/871568314/thumb-62a6d4685e8fc_464x620.png",desc:"Лосьон для тела",catName:"Perfumed Body",cats:["perfumed-body", "po-seriyam"]},
{id:169,name:"Pure Natural Foot Treatment Mask",price:320,slug:"pure-natural-foot-treatment-mask",img:"https://static.insales-cdn.com/images/products/1/3817/871575273/thumb-62cb95b58bec2_464x620.png",desc:"Маска для ног",catName:"Pure Natural",cats:["pure-natural", "po-seriyam"]},
{id:170,name:"Eco Energy Hard Wax",price:1204,slug:"eco-energy-hard-wax",img:"https://static.insales-cdn.com/images/products/1/1229/871736525/thumb-62cbde819ca0f_464x620.png",desc:"Воск для волос",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:171,name:"Saemmul Water Candy Tint",price:773,slug:"saemmul-water-candy-tint",img:"https://static.insales-cdn.com/images/products/1/6274/870824066/thumb-7IOY66y87JuM7YSw7LqU65SU7Yu07Yq4_560x750.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:172,name:"Cover Perfection Ideal Concealer Duo",price:1457,slug:"cover-perfection-ideal-concealer-duo",img:"https://static.insales-cdn.com/images/products/1/1039/873505807/thumb-7Luk67KE7Y287Y6Z7IWY7JWE7J2065SU7Ja87Luo7Iuk65s65OA7Jik_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:173,name:"Saemmul Mousse Candy Tint",price:790,slug:"saemmul-mousse-candy-tint",img:"https://static.insales-cdn.com/images/products/1/782/872588046/thumb-7IOY66y866y07Iqk7LqU65SU7Yu07Yq4_560x750_1_.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:174,name:"Saemmy's Syrup Shot Melting Balm",price:2003,slug:"saemmys-syrup-shot-melting-balm",img:"https://static.insales-cdn.com/images/products/1/995/870933475/thumb-7IOI6647Iqk7Iuc6597IO366mc7YyF67Ck_464x620.png",desc:"Бальзам для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:175,name:"Mineralizing Pore Concealer 01 Clear Beige",price:1085,slug:"mineralizing-pore-concealer-01-clear-beige",img:"https://static.insales-cdn.com/images/products/1/382/873341310/thumb-62a6d0d803556_464x620.png",desc:"Консилер для лица",catName:"Mineralizing",cats:["mineralizing", "po-seriyam"]},
{id:176,name:"Eco Soul Kiss Button Lips Matte",price:1433,slug:"eco-soul-kiss-button-lips-matte",img:"https://static.insales-cdn.com/images/products/1/3548/870927836/thumb-6508eecef1d7a_464x620.png",desc:"Помада для губ",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:177,name:"Saemmul Essential Tint Lip Balm",price:773,slug:"saemmul-essential-tint-lip-balm",img:"https://static.insales-cdn.com/images/products/1/6300/870824092/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-06-10_%D0%B2_22.37.59.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:178,name:"Cover Perfection Pot Concealer",price:1048,slug:"cover-perfection-pot-concealer",img:"https://static.insales-cdn.com/images/products/1/4821/873493205/thumb-7Luk67KE7Y287Y6Z7IWY7Yyf7Luo7Iuk65s_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:179,name:"Kissholic Lipstick Intense",price:1457,slug:"kissholic-lipstick-intense",img:"https://static.insales-cdn.com/images/products/1/6098/872658898/thumb-7YKk7Iqk7ZmA66at66a97Iqk7Yux7J247YWQ7Iqk_560x750_1_.png",desc:"Помада для губ",catName:"Kissholic",cats:["kissholic", "po-seriyam"]},
{id:180,name:"Kissholic Lipstick Matte",price:1558,slug:"kissholic-lipstick-matte",img:"https://static.insales-cdn.com/images/products/1/6400/872659200/thumb-7YKk7Iqk7ZmA66at66a97Iqk7Yux66ek7Yq4_560x750_1_.png",desc:"Помада для губ",catName:"Kissholic",cats:["kissholic", "po-seriyam"]},
{id:181,name:"Urban Delight Body Shower Cologne Blossom",price:1740,slug:"urban-delight-body-shower-cologne-blossom",img:"https://static.insales-cdn.com/images/products/1/662/873341590/thumb-63562ffbd003a_464x620.png",desc:"Спрей для тела",catName:"Urban Delight",cats:["urban-delight", "po-seriyam"]},
{id:182,name:"Studio Slim Brow Mascara",price:1049,slug:"studio-slim-brow-mascara",img:"https://static.insales-cdn.com/images/products/1/1031/873341959/thumb-7Iqk7Yqc65SU7Jik7Iqs66a867iM66Gc7Jqw7Lm06528_1_560x750.png",desc:"Тушь для бровей",catName:"Studio",cats:["studio", "po-seriyam"]},
{id:183,name:"Saemmul Luminous Multi Highlighter",price:1182,slug:"saemmul-luminous-multi-highlighter",img:"https://static.insales-cdn.com/images/products/1/6740/870824532/thumb-7IOY66y866Oo66464SI7Iqk66mA7Yuw7ZWY7J2065287J207YSw_464x620.png",desc:"Хайлайтер для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:184,name:"Cover Perfection Concealer Foundation",price:2977,slug:"cover-perfection-concealer-foundation",img:"https://static.insales-cdn.com/images/products/1/4011/873369515/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7YyM7Jq0642w7J207IWY_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:185,name:"Eco Soul Vegan Silk Glam Foundation",price:2774,slug:"eco-soul-vegan-silk-glam-foundation",img:"https://static.insales-cdn.com/images/products/1/3573/870927861/thumb-64812e1748ec3_464x620.png",desc:"Тональная основа для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:186,name:"Eco Soul Pencil & Powder Dual Brow",price:1188,slug:"eco-soul-pencil-powder-dual-brow",img:"https://static.insales-cdn.com/images/products/1/3673/870927961/thumb-7JeQ7L2U7IaM7Jq47Y6c7Iqs7JWk7YyM7Jqw642U65OA7Ja867iM66Gc7Jqw_464x620.png",desc:"Карандаш для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:187,name:"Eco Soul Perfect Cover Pact",price:2002,slug:"eco-soul-perfect-cover-pact",img:"https://static.insales-cdn.com/images/products/1/3688/870927976/thumb-62a6d24521cae_464x620.png",desc:"Пудра для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:188,name:"Eco Soul Lip Oil",price:1018,slug:"eco-soul-lip-oil",img:"https://static.insales-cdn.com/images/products/1/4253/870928541/thumb-7JeQ7L2U7IaM7Jq466a97Jik7J28_464x620.png",desc:"Масло для губ",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:189,name:"Eco Soul Luxury Gold Pact",price:2519,slug:"eco-soul-luxury-gold-pact",img:"https://static.insales-cdn.com/images/products/1/4550/870928838/thumb-62a6d1f892f9d_464x620.png",desc:"Пудра для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:190,name:"Natural Mask Sheet",price:150,slug:"natural-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/1610/870630986/thumb-7Jew7Lac7Lu3_560x750_1_.png",desc:"Тканевая маска для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:191,name:"Snail Essential EX Origin BB",price:2636,slug:"snail-essential-ex-origin-bb",img:"https://static.insales-cdn.com/images/products/1/542/871473694/thumb-62a6d15ad97ef_464x620.png",desc:"ББ крем для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:192,name:"Saemmul Browcara",price:859,slug:"saemmul-browcara",img:"https://static.insales-cdn.com/images/products/1/6522/870824314/thumb-7IOY66y867iM66Gc7Jqw7Lm06528_560x750.png",desc:"Тушь для бровей",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:193,name:"Saemmul Wood Eyebrow",price:359,slug:"saemmul-wood-eyebrow",img:"https://static.insales-cdn.com/images/products/1/6363/870824155/thumb-7IOY66y87Jqw65Oc7JWE7J2067iM66Gc7Jqw_560x750.png",desc:"Карандаш для бровей",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:194,name:"True Fit Fixer Cushion",price:2236,slug:"true-fit-fixer-cushion",img:"https://static.insales-cdn.com/images/products/1/7158/871431158/thumb-7Yq466Oo7ZWP7ZS97ISc7Lg7IWY_01_560x750.png",desc:"Кушон для лица",catName:"True Fit",cats:["true-fit", "po-seriyam"]},
{id:195,name:"Eco Soul Designing Eyebrow",price:1129,slug:"eco-soul-designing-eyebrow",img:"https://static.insales-cdn.com/images/products/1/4611/870928899/thumb-7JeQ7L2U7IaM7Jq465SU7J6Q7J2064ud7JWE7J2067iM66Gc7Jqw_464x620.png",desc:"Карандаш для бровей",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:196,name:"Urban Eco Golden Berry C Blemish Ampoule Special Set",price:2698,slug:"urban-eco-golden-berry-c-blemish-ampoule-special-set",img:"https://static.insales-cdn.com/images/products/1/1193/2170578089/thumb-6rOo65Og67Kg66as7JSo7J6h7Yuw7JWw7ZSM6riw7ZqN7IS47Yq4_560x750.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:197,name:"Cover Perfection Pen Concealer",price:1574,slug:"cover-perfection-pen-concealer",img:"https://static.insales-cdn.com/images/products/1/6849/2212543169/thumb-7Luk67KE7Y287Y6Z7IWY7Y6c7Luo7Iuk65s_560x750.png",desc:"Карандаш-консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:198,name:"Vellabel Volumax Gold Firming Cream",price:7827,slug:"vellabel-volumax-gold-firming-cream",img:"https://static.insales-cdn.com/images/products/1/4155/904417339/thumb-62a6d0e0348c2_560x750_1_.png",desc:"Крем для лица",catName:"Vellabel",cats:["vellabel", "po-seriyam"]},
{id:199,name:"Temptation Age Return Cream",price:3737,slug:"temptation-age-return-cream",img:"https://static.insales-cdn.com/images/products/1/6681/929790489/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07YGs66a8_560x750.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:200,name:"Temptation Age Return Eye Cream",price:3225,slug:"temptation-age-return-eye-cream",img:"https://static.insales-cdn.com/images/products/1/7049/929790857/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07JWE7J207YGs66a8_560x750.png",desc:"Крем для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:201,name:"Temptation Age Return Emulsion",price:3412,slug:"temptation-age-return-emulsion",img:"https://static.insales-cdn.com/images/products/1/7867/929791675/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07JeQ66mA7KC8_560x750.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:202,name:"Temptation Age Return Toner",price:3454,slug:"temptation-age-return-toner",img:"https://static.insales-cdn.com/images/products/1/7509/929791317/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07Yag64SI_560x750.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:203,name:"M Touch Shine Lipstick",price:2240,slug:"m-touch-shine-lipstick",img:"https://static.insales-cdn.com/images/products/1/7473/931511601/thumb-7Jeg7YSw7LmY7IOk7J2466a97Iqk7Yux1_560x750.png",desc:"Помада для губ",catName:"M Touch",cats:["m-touch", "po-seriyam"]},
{id:204,name:"Royal Natural Black Caviar Serum",price:4600,slug:"royal-natural-black-caviar-serum",img:"https://static.insales-cdn.com/images/products/1/4123/932237339/thumb-66Gc7Je064K07LaU65067iU656Z7LqQ67mE7Ja07IS4658_560x750.png",desc:"Сыворотка для лица",catName:"Black Caviar",cats:["black-caviar", "po-seriyam"]},
{id:205,name:"Royal Natural Black Caviar Cream",price:4725,slug:"royal-natural-black-caviar-cream",img:"https://static.insales-cdn.com/images/products/1/4393/932253993/thumb-66Gc7Je064K07LaU65067iU656Z7LqQ67mE7Ja07YGs66a8_560x750.png",desc:"Крем для лица",catName:"Black Caviar",cats:["black-caviar", "po-seriyam"]},
{id:206,name:"Skin Rest Mask Sheet",price:1525,slug:"skin-rest-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/7569/932453777/thumb-7Iqk7YKo66CI7Iqk7Yq466eI7Iqk7YGs7Iuc7Yq4_01_560x750.png",desc:"Тканевая маска для лица",catName:"Skin Rest",cats:["skin-rest", "po-seriyam"]},
{id:207,name:"Perfect Glam Stick Blusher",price:1548,slug:"perfect-glam-stick-blusher",img:"https://static.insales-cdn.com/images/products/1/6930/873511698/thumb-64c0b4523afd6_560x750__1_.png",desc:"Румяна для лица",catName:"Perfect Glam",cats:["perfect-glam", "po-seriyam"]},
{id:208,name:"Saemmul Artlook Eyebrow",price:495,slug:"saemmul-artlook-eyebrow",img:"https://static.insales-cdn.com/images/products/1/6310/870824102/thumb-7IOY66y87JWE7Yq466Op7JWE7J2067iM66Gc7Jqw_560x750.png",desc:"Карандаш для бровей",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:209,name:"Eco Soul Powerproof Tank Liner",price:1504,slug:"eco-soul-powerproof-tank-liner",img:"https://static.insales-cdn.com/images/products/1/3889/870928177/thumb-7JeQ7L2U7IaM7Jq47YyM7JuM7ZSE66Oo7ZSE7YOx7YGs65287J2064SI_464x620.png",desc:"Подводка для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:210,name:"Cover Perfection Tip Concealer",price:885,slug:"cover-perfection-tip-concealer",img:"https://static.insales-cdn.com/images/products/1/3000/873507768/thumb-7Luk67KE7Y287Y6Z7IWY7YyB7Luo7Iuk65s_all1_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:211,name:"Saemmul Single Blusher (Pink & Purple)",price:764,slug:"saemmul-single-blusher-pink-purple",img:"https://static.insales-cdn.com/images/products/1/3607/871484951/thumb-67iU65s7IWU_560x750__2_.png",desc:"Румяна для лица",catName:"Saemmul Single Blusher",cats:["saemmul-single-blusher", "po-seriyam"]},
{id:212,name:"Perfumed Hand Line",price:345,slug:"perfumed-hand-line",img:"https://static.insales-cdn.com/images/products/1/1237/875619541/thumb-7Y287ZO465Oc7ZW465Oc65287J24_01_560x750.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:213,name:"Three Edge Pencil Eyeliner",price:1445,slug:"three-edge-pencil-eyeliner",img:"https://static.insales-cdn.com/images/products/1/7014/870824806/thumb-7JOw66as7Jej7KeA7Y6c7Iqs7JWE7J2065287J2064SI_560x750.png",desc:"Подводка для глаз",catName:"Three Edge",cats:["three-edge", "po-seriyam"]},
{id:214,name:"True Mushroom LX Eye Cream Special Set",price:5013,slug:"true-mushroom-lx-eye-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/1996/875726796/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7JWE7J207YGs66a86riw7ZqN7IS47Yq4_560x750__1_.png",desc:"Подарочный набор",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:215,name:"True Mushroom LX Firming Cream Special Set",price:5249,slug:"true-mushroom-lx-firming-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/6323/875731123/thumb-64a79b5622cb7_560x750__1_.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:216,name:"Urban Eco Golden Berry C Dark Spot Patch",price:1542,slug:"urban-eco-golden-berry-c-dark-spot-patch",img:"https://static.insales-cdn.com/images/products/1/8109/1001144237/thumb-6rOo65Og67Kg66as7JSo64uk7YGs7Iqk7Yyf7Yyo7LmY_560x750.png",desc:"Точечные патчи для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:217,name:"True Mushroom LX Concentrate Essence Special Set",price:4499,slug:"true-mushroom-lx-concentrate-essence-special-set",img:"https://static.insales-cdn.com/images/products/1/7141/875731941/thumb-64a79bb6a60e7_560x750__1_.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:218,name:"Urban Breeze Perfume Hand Cream Fall in Flower",price:1713,slug:"urban-breeze-perfume-hand-cream-fall-in-flower",img:"https://static.insales-cdn.com/images/products/1/2967/877095831/thumb-7Ja067CY67iM66as7KaI7ZW465Oc7YGs66a87Y07J247ZSM65287JuM_01_560x750.png",desc:"Крем для рук",catName:"Urban Breeze",cats:["urban-breeze", "po-seriyam"]},
{id:219,name:"Eco Earth Zero Sun Stick",price:2108,slug:"eco-earth-zero-sun-stick",img:"https://static.insales-cdn.com/images/products/1/7525/1018887525/thumb-7JeQ7L2U7Ja07Iqk7KCc66Gc7ISg7Iqk7Yux_01_560x750.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:220,name:"Urban Breeze Perfume Hand Cream Another Wood",price:1713,slug:"urban-breeze-perfume-hand-cream-another-wood",img:"https://static.insales-cdn.com/images/products/1/3737/877096601/thumb-7Ja067CY67iM66as7KaI7ZW465Oc7YGs66a87Ja064KY642U7Jqw65Oc_01_560x750.png",desc:"Крем для рук",catName:"Urban Breeze",cats:["urban-breeze", "po-seriyam"]},
{id:221,name:"Cell Renew Bio Micro Peel Soft Gel",price:1419,slug:"cell-renew-bio-micro-peel-soft-gel",img:"https://static.insales-cdn.com/images/products/1/3509/871091637/thumb-642a26ba4e345_464x620_1_.png",desc:"Пилинг-гель для лица",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:222,name:"Care Plus Avocado Body Cream",price:895,slug:"care-plus-avocado-body-cream",img:"https://static.insales-cdn.com/images/products/1/5886/877098750/8806164162835-transformed.png",desc:"Крем для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:223,name:"Prime Retinol Skin Care 3 Set",price:5766,slug:"prime-retinol-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/5956/877098820/thumb-64a783a6bed95_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:224,name:"The Essential Galactomyces First Essence Set",price:3783,slug:"the-essential-galactomyces-first-essence-set",img:"https://static.insales-cdn.com/images/products/1/7721/878558761/TheEssentialGalactomycesFirstEssenceSet_L_trim_740x740.webp",desc:"Подарочный набор",catName:"The Essential",cats:["the-essential", "po-seriyam"]},
{id:225,name:"Cover Perfection Concealer Cushion Renew",price:3295,slug:"cover-perfection-concealer-cushion-renew",img:"https://static.insales-cdn.com/images/products/1/1932/880846732/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7Lg7IWY66as64m0_560x750.png",desc:"Кушон для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:226,name:"Pencil Sharpener",price:253,slug:"pencil-sharpener",img:"https://static.insales-cdn.com/images/products/1/5321/885945545/1478752926606508_2097985613__1_.jpg",desc:"Точилка для карандашей",catName:"Аксессуары",cats:["aksessuary"]},
{id:227,name:"Saemmy's Crema Velvet Lipstick",price:1904,slug:"saemmys-crema-velvet-lipstick",img:"https://static.insales-cdn.com/images/products/1/7400/880852200/thumb-7IOI6647Iqk7YGs66CI66eI67Ko67Kz66a97Iqk7Yux_560x750-2.png",desc:"Помада для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:228,name:"Perfect Glam Glow Pact",price:1444,slug:"perfect-glam-glow-pact",img:"https://static.insales-cdn.com/images/products/1/8159/891445215/thumb-7Y287Y6Z7Yq46riA656o6riA66Gc7Jqw7Yyp7Yq4_1_560x750.png",desc:"Пудра для лица",catName:"Perfect Glam",cats:["perfect-glam", "po-seriyam"]},
{id:229,name:"Cover Perfection Concealer Foundation Mini",price:1976,slug:"cover-perfection-concealer-foundation-mini",img:"https://static.insales-cdn.com/images/products/1/3878/891449126/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7YyM7Jq0642w7J207IWY_7ZW465SU_7Jew7Lac_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:230,name:"True Mushroom LX Perfect Massage Peeling Cream",price:1805,slug:"true-mushroom-lx-perfect-massage-peeling-cream",img:"https://static.insales-cdn.com/images/products/1/1897/2160682857/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7Y287Y6Z7Yq466eI7IKs7KeA7ZWE66eB7YGs66a8_560x750__1_.png",desc:"Крем для лица",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:231,name:"Urban Eco Golden Berry C Vital Mist",price:1940,slug:"urban-eco-golden-berry-c-vital-mist",img:"https://static.insales-cdn.com/images/products/1/5937/2170566449/thumb-6rOo65Og67Kg66as7JSo7IOd6riw6647Iqk7Yq4_560x750.png",desc:"Мист для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:232,name:"Jelly Blusher",price:1400,slug:"jelly-blusher",img:"https://static.insales-cdn.com/images/products/1/4790/873370294/thumb-7KCk66as67iU65s7IWU_560x750.png",desc:"Румяна для лица",catName:"Jelly Blusher",cats:["jelly-blusher", "po-seriyam"]},
{id:233,name:"Saemmy's Crema Velvet Tint",price:1306,slug:"saemmys-crema-velvet-tint",img:"https://static.insales-cdn.com/images/products/1/740/945341156/thumb-7IOI6647Iqk7YGs66CI66eI67Ko67Kz7Yu07Yq4_00_560x750.png",desc:"Тинт для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:234,name:"Saemmul Candy Syrup Gloss",price:1121,slug:"saemmul-candy-syrup-gloss",img:"https://static.insales-cdn.com/images/products/1/4857/2797900537/81e8f31929b95d3e84a466397108302f.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:235,name:"Cover Perfection Triple Pot Concealer",price:1603,slug:"cover-perfection-triple-pot-concealer",img:"https://static.insales-cdn.com/images/products/1/5099/878466027/thumb-7Luk67KE7Y287Y6Z7IWY7Yq466as7ZSM7Yyf7Luo7Iuk65s_560x750_f66e24a4-eac5-43a0-8cfb-a10936d96.webp",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:236,name:"Royal Natural Horse Oil Cream",price:1587,slug:"royal-natural-horse-oil-cream-2",img:"https://static.insales-cdn.com/images/products/1/2473/2797914537/thumb-66Gc7Je064K07LaU65066eI7Jyg67CU65SU7YGs66a8_560x750.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:237,name:"Silk Hair Style Fix Gel",price:1254,slug:"silk-hair-style-fix-gel-2",img:"https://static.insales-cdn.com/images/products/1/7017/2797919081/7958562_1920x1080_fit-3784405793.jpg",desc:"Гель для волос",catName:"Silk Hair Style",cats:["silk-hair-style", "po-seriyam"]},
{id:238,name:"Royal Natural Pepta Collagen Gel Mask",price:608,slug:"royal-natural-pepta-collagen-gel-mask",img:"https://static.insales-cdn.com/images/products/1/6081/2797934529/thumb-66Gc7Je064K07LaU6507Y6p7YOA7L2c65286rKQ6rKU66eI7Iqk7YGs1066ek7J6F_7YyM7Jqw7LmY_560x750.png",desc:"Гелевая маска для лица",catName:"Royal Natural",cats:["royal-natural", "po-seriyam"]},
{id:239,name:"Cover Perfection Make Up Complete Fixer",price:1836,slug:"cover-perfection-make-up-complete-fixer",img:"https://static.insales-cdn.com/images/products/1/7513/2801614169/thumb-7Luk67KE7Y287Y6Z7IWY66mU7J207YGs7JeF7Lu07ZSM66a7ZS97ISc_560x750.png",desc:"Спрей-фиксатор макияжа",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:240,name:"Saemmy's Jelly Shot Tint",price:1433,slug:"saemmys-jelly-shot-tint",img:"https://static.insales-cdn.com/images/products/1/5153/2806150177/thumb-7IOI6647Iqk7KCk66as7IO37Yu07Yq4_560x750.png",desc:"Тинт для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:241,name:"Urban Eco Waratah Cream",price:3040,slug:"urban-eco-waratah-cream",img:"https://static.insales-cdn.com/images/products/1/2910/1017064286/eyJidWNrZXQiOiJpbmZsdWVuc3Rlcl9wcm9kdWN0aW9uIiwia2V5IjoibWVkaWEvcHJvZHVjdC9pbWFnZS9wcm9kdWN0L2l.jpeg",desc:"",catName:"Urban Eco Waratah",cats:["urban-eco-waratah", "po-seriyam"]},
{id:242,name:"Snail Essential EX Wrinkle Solution Capsule Ampoule",price:4420,slug:"snail-essential-ex-wrinkle-solution-capsule-ampoule",img:"https://static.insales-cdn.com/images/products/1/4906/870822698/thumb-7Iqk64Sk7J287JeQ7IS87IWc7J207JeR7Iqk66eB7YG07IaU66Oo7IWY7Lqh7IqQ7JWw7ZSM_464x620.png",desc:"Сыворотка для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:243,name:"Collagen EX Hydra Cream",price:2477,slug:"collagen-ex-hydra-cream",img:"https://static.insales-cdn.com/images/products/1/4844/870929132/thumb-7L2c65286rKQEX7ZWY7J2065Oc65287YG066CM7KeV7YGs66a8_01_464x620.png",desc:"Крем для лица",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:244,name:"Royal Natural 24K Placenta Multi Serum",price:3015,slug:"royal-natural-24k-placenta-multi-serum",img:"https://static.insales-cdn.com/images/products/1/2615/870820407/thumb-66Gc7Je064K07LaU65024K7ZSM65287IS87YOA66mA7Yuw7IS4658_464x620.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:245,name:"Eco Earth Face & Body Waterproof Sun Cream",price:1881,slug:"eco-earth-face-body-waterproof-sun-cream",img:"https://static.insales-cdn.com/images/products/1/4600/870691320/thumb-62a6d248ba75f_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:246,name:"See & Saw AC Control - Pure Balance Ritual",price:6187,slug:"see-saw-ac-control-pure-balance-ritual",img:"https://static.insales-cdn.com/images/products/1/2073/2784675865/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__16_12_15.png",desc:"Ритуал чистого баланса",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:247,name:"Urban Eco Harakeke - Daily Moisture Ritual",price:5952,slug:"kombo-nabor-urban-eco-harakeke",img:"https://static.insales-cdn.com/images/products/1/6121/2784630761/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__16_06_28.png",desc:"Ежедневный ритуал увлажнения",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:248,name:"Urban Eco Golden Berry C - Radiance Ritual",price:11793,slug:"urban-eco-golden-berry-c-radiance-ritual",img:"https://static.insales-cdn.com/images/products/1/7489/2784181569/766E95E0-C352-47FB-9769-54DB3E1E8CC8.jpg",desc:"Ритуал сияния кожи",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:249,name:"Derma Plan - Sensitive Soothing Ritual",price:7038,slug:"derma-plan-sensitive-soothing-ritual",img:"https://static.insales-cdn.com/images/products/1/529/2784772625/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__16_24_38.png",desc:"Ритуал для чувствительной кожи",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:250,name:"Iceland - Arctic Hydra Ritual",price:5771,slug:"iceland-arctic-hydra-ritual",img:"https://static.insales-cdn.com/images/products/1/4809/2785014473/ChatGPT_Image_25_%D1%84%D0%B5%D0%B2%D1%80._2026_%D0%B3.__17_16_40.png",desc:"Ритуал максимального увлажнения",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:251,name:"Iceland Hydrating Peptide Eye Stick",price:1012,slug:"iceland-hydrating-peptide-eye-stick",img:"https://static.insales-cdn.com/images/products/1/6612/870644180/thumb-7JWE7J207Iqs656A65Oc7IiY67aE7Y6p7YOA7J2065Oc7JWE7J207Iqk7Yux_464x620_1_.png",desc:"Стик для глаз",catName:"Iceland",cats:["iceland", "po-seriyam"]},
{id:252,name:"Eco Energy Skin Care 2 Set",price:5044,slug:"eco-energy-skin-care-2-set",img:"https://static.insales-cdn.com/images/products/1/1944/878028696/thumb-7JeQ7L2U7JeQ64SI7KeA7Iqk7YKo7LyA7Ja027KKF7IS47Yq4_560x750.png",desc:"Подарочный набор",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:253,name:"Classic Homme All-in-One Essence",price:3864,slug:"classic-homme-all-in-one-essence",img:"https://static.insales-cdn.com/images/products/1/1012/871490548/thumb-62a6d456e4250_464x620.png",desc:"Эссенция для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:254,name:"Natural Condition Sparkling Lip & Eye Remover",price:1058,slug:"natural-condition-sparkling-lip-eye-remover",img:"https://static.insales-cdn.com/images/products/1/3187/870706291/thumb-64c85b32462ec_464x620.png",desc:"Мицеллярная вода для губ и глаз",catName:"Natural Condition",cats:["natural-condition", "po-seriyam"]},
{id:255,name:"Mervie Actibiome Ampoule Essence",price:3496,slug:"mervie-activiome-ampoule-essence",img:"https://static.insales-cdn.com/images/products/1/781/870785805/thumb-62a6d0d4d5952_464x620.png",desc:"Эссенция для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:256,name:"Repair Rx Skin Care 3 Set",price:11546,slug:"repair-rx-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/5811/877532851/thumb-64ab94c7d64eb_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:257,name:"Saemmul Shadow Box",price:1464,slug:"saemmul-shadow-box-single-2",img:"https://static.insales-cdn.com/images/products/1/2964/898968468/thumb-7IOY66y87ISA64E7Jqw67CV7Iqk202403_560x750.png",desc:"Тени для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:258,name:"Eco Energy All-In-One Moisture & Soothing Set",price:2999,slug:"eco-energy-all-in-one-moisture-soothing-set",img:"https://static.insales-cdn.com/images/products/1/1309/932218141/thumb-7JeQ7L2U7JeQ64SI7KeA7Jis7J247JuQ65OA7Jik_560x750.png",desc:"Набор для лица Eco Energy All-In-One",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:259,name:"Temptation Age Return Twin Cake",price:2299,slug:"temptation-age-return-twin-cake",img:"https://static.insales-cdn.com/images/products/1/2550/955329014/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07Yq47JyI7LyA7J21_560x750.png",desc:"Пудра для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:260,name:"Skinny Balance Soothing Mist",price:1195,slug:"skinny-balance-soothing-mist",img:"https://static.insales-cdn.com/images/products/1/7145/870824937/thumb-62cbb3e19d74f_464x620.png",desc:"Мист для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:261,name:"Gold Snail Bar",price:703,slug:"gold-snail-bar",img:"https://static.insales-cdn.com/images/products/1/975/870540239/thumb-62a6cc86929ef_464x620.png",desc:"Косметическое мыло",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:262,name:"Natural Daily Cleansing Foam Honey",price:783,slug:"natural-daily-cleansing-foam-honey",img:"https://static.insales-cdn.com/images/products/1/6575/870635951/thumb-64K07LaU650642w7J2866as7YG066CM7KeV7Y87ZeI64uI_464x620_1_.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:263,name:"Natural Daily Cleansing Foam Pomegranate",price:846,slug:"natural-daily-cleansing-foam-pomegranate",img:"https://static.insales-cdn.com/images/products/1/352/870637920/thumb-64K07LaU650642w7J2866as7YG066CM7KeV7Y87ISd66WY_464x620_1_.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:264,name:"My Cleanse Recipe Cleansing Foam Moist Seed",price:826,slug:"my-cleanse-recipe-cleansing-foam-moist-seed",img:"https://static.insales-cdn.com/images/products/1/6031/870700943/thumb-66eI7J207YG066CM7KaI66CI7Iuc7ZS87YG066CM7KeV7Y866qo7J207Iqk7Yq47JSo65Oc_560x750_1_.png",desc:"Пенка для умывания",catName:"My Cleanse Recipe",cats:["my-cleanse-recipe", "po-seriyam"]},
{id:265,name:"Healing Tea Garden Green Tea Lip & Eye Remover",price:854,slug:"healing-tea-garden-green-tea-lip-eye-remover",img:"https://static.insales-cdn.com/images/products/1/1208/870769848/thumb-7Z6Q66eB7Yuw6rCA65Og66a97JWk7JWE7J2066as66y067KE6re466aw7Yuw_560x750.png",desc:"Мицеллярная вода для губ и глаз",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:266,name:"Healing Tea Garden Rooibos Tea Cleansing Foam",price:1005,slug:"healing-tea-garden-rooibos-tea-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7018/870767466/thumb-650bd36010eb9_560x750.png",desc:"Пенка для умывания",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:267,name:"Body & Soul Light Body Oil",price:993,slug:"body-soul-light-body-oil",img:"https://static.insales-cdn.com/images/products/1/4628/870789652/thumb-62a6d0d98df20_464x620.png",desc:"Масло для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:268,name:"Derma Skin Mask Sheet Toning White",price:342,slug:"derma-skin-mask-sheet-toning-white",img:"https://static.insales-cdn.com/images/products/1/7004/870816604/thumb-642U66eI7Iqk7YKo66eI7Iqk7YGs7Iuc7Yq47Yag64ud7ZmU7J207Yq4_560x750.png",desc:"Тканевая маска для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:269,name:"Derma Skin Mask Sheet Hydro Calming",price:342,slug:"derma-skin-mask-sheet-hydro-calming",img:"https://static.insales-cdn.com/images/products/1/7222/870816822/thumb-642U66eI7Iqk7YKo66eI7Iqk7YGs7Iuc7Yq47ZWY7J2065Oc66Gc7Lm067CN_560x750.png",desc:"Тканевая маска для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:270,name:"Dear My Foot Velvet Cream",price:743,slug:"dear-my-foot-velvet-cream",img:"https://static.insales-cdn.com/images/products/1/7910/870817510/thumb-62a6cc9d3e0fc_464x620.png",desc:"Крем для ног",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:271,name:"Bio Solution Highly Moisturizing Panthenol Mask Sheet",price:138,slug:"bio-solution-highly-moisturizing-panthenol-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/4576/870822368/thumb-645c8c479a170_464x620.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:272,name:"Eco Soul Bounce Powder",price:1709,slug:"eco-soul-bounce-powder-01-ivory",img:"https://static.insales-cdn.com/images/products/1/4376/870928664/thumb-62a6d23857058_464x620.png",desc:"Пудра для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:273,name:"Honey Oatmeal Melting Lip Balm",price:933,slug:"honey-oatmeal-melting-lip-balm",img:"https://static.insales-cdn.com/images/products/1/7568/870931856/thumb-62a6d4db8a718_464x620.png",desc:"Бальзам для губ",catName:"Honey Oatmeal",cats:["honey-oatmeal", "po-seriyam"]},
{id:274,name:"Saemmul Perfect Pore Primer",price:1062,slug:"saemmul-perfect-pore-primer",img:"https://static.insales-cdn.com/images/products/1/7809/870932097/thumb-62a6d15069ddf_464x620.png",desc:"Праймер для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:275,name:"Saemmul Perfect Pore Powder",price:1008,slug:"saemmul-perfect-pore-powder",img:"https://static.insales-cdn.com/images/products/1/7872/870932160/thumb-62a6d14e77330_464x620.png",desc:"Пудра для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:276,name:"Perfumed Body Moisturizer Shea Butter",price:800,slug:"perfumed-body-moisturizer-shea-butter",img:"https://static.insales-cdn.com/images/products/1/5619/871568883/thumb-62a6d467dacad_464x620.png",desc:"Лосьон для тела",catName:"Perfumed Body",cats:["perfumed-body", "po-seriyam"]},
{id:277,name:"Pure Natural Mask Sheet Snail",price:188,slug:"pure-natural-mask-sheet-snail",img:"https://static.insales-cdn.com/images/products/1/3844/871575300/thumb-64e838663a051_464x620.png",desc:" Тканевая маска для лица",catName:"Pure Natural",cats:["pure-natural", "po-seriyam"]},
{id:278,name:"Saemmul Under Eye Maker",price:892,slug:"saemmul-under-eye-maker",img:"https://static.insales-cdn.com/images/products/1/6327/870824119/thumb-7IOY66y87JWg6rWQ7IK066mU7J207Luk_560x750.png",desc:"Подводка для глаз",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:279,name:"Saemmul Single Blusher (Red)",price:764,slug:"saemmul-single-blusher-red",img:"https://static.insales-cdn.com/images/products/1/4086/871485430/thumb-67iU65s7IWU_560x750__3_.png",desc:"Румяна для лица",catName:"Saemmul Single Blusher",cats:["saemmul-single-blusher", "po-seriyam"]},
{id:280,name:"Saemmul Perfect Pore Cushion",price:1065,slug:"saemmul-perfect-pore-cushion",img:"https://static.insales-cdn.com/images/products/1/71/870932551/thumb-62a6d14df1384_464x620.png",desc:"Кушон для лица",catName:"Saemmul Perfect Pore",cats:["saemmul-perfect-pore", "po-seriyam"]},
{id:281,name:"Eco Soul Shine Lip Gloss",price:1932,slug:"eco-soul-shine-lip-gloss",img:"https://static.insales-cdn.com/images/products/1/3535/870927823/thumb-7JeQ7L2U7IaM7Jq47IOk7J2466a96riA66Gc7Iqk_464x620.png",desc:"Блеск для губ",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:282,name:"Cover Perfection Fixealer",price:828,slug:"cover-perfection-fixealer",img:"https://static.insales-cdn.com/images/products/1/3649/873508417/thumb-7Luk67KE7Y287Y6Z7IWY7ZS97Iuk65s37KKF_560x750.png",desc:"Корректор для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:283,name:"Saemmul Single Blusher (Beige & Coral)",price:773,slug:"saemmul-single-blusher-beige-coral",img:"https://static.insales-cdn.com/images/products/1/1675/871483019/thumb-67iU65s7IWU_560x750.png",desc:"Румяна для лица",catName:"Saemmul Single Blusher",cats:["saemmul-single-blusher", "po-seriyam"]},
{id:284,name:"Saemmul Airy Cotton Foundation",price:1023,slug:"saemmul-airy-cotton-foundation",img:"https://static.insales-cdn.com/images/products/1/5980/870823772/thumb-62a6d14b3ea27_464x620.png",desc:"Тональная основа для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:285,name:"Cell Renew Bio Skin Care Special 3 Set",price:14752,slug:"cell-renew-bio-skin-care-special-3-set",img:"https://static.insales-cdn.com/images/products/1/1371/877536603/thumb-64ab90a2e7df9_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:286,name:"Iceland Glitter Eye Goggle Mask",price:240,slug:"iceland-glitter-eye-goggle-mask",img:"https://static.insales-cdn.com/images/products/1/1354/880846154/thumb-7JWE7J207Iqs656A65Oc6riA66as7YSw7JWE7J206rOg6riA66eI7Iqk7YGs_01_560x750.png",desc:"Маска для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:287,name:"Bio Solution Pore Retinol Mask Sheet",price:138,slug:"bio-solution-pore-retinol-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/6489/934074713/thumb-67CU7J207Jik7IaU66Oo7IWY66CI7Yuw64aA66eI7Iqk7YGs7Iuc7Yq4_560x750.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:288,name:"Fresh Bamboo Soothing Gel",price:798,slug:"fresh-bamboo-soothing-gel",img:"https://static.insales-cdn.com/images/products/1/1417/2797634953/the-saem-fresh-bamboo-soothing-gel-99-250ml.jpg",desc:"Гель для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:289,name:"Ultra Shot PDRN Skin Care 3 Set",price:10350,slug:"ultra-shot-pdrn-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/4353/2800709889/8915e2c3c1353ec6404f395540a4b271.png",desc:"Подарочный набор",catName:"Ultra Shot",cats:["ultra-shot", "po-seriyam"]},
{id:290,name:"Gold Aloe Fresh Gel",price:416,slug:"gold-aloe-fresh-gel",img:"https://static.insales-cdn.com/images/products/1/243/870539507/thumb-62a6d801609a9_464x620.png",desc:"Гель для лица",catName:"Gold",cats:["gold", "po-seriyam"]},
{id:291,name:"Gold Snail Hydra Firming Cream",price:5138,slug:"gold-snail-hydra-firming-cream",img:"https://static.insales-cdn.com/images/products/1/612/870515300/thumb-6rOo65Oc7Iqk64Sk7J287ZWY7J2065Oc65287Y2867CN7YGs66a8_01_464x620.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:292,name:"Garden Pleasure Chamomile Cleansing Tissue",price:853,slug:"garden-pleasure-chamomile-cleansing-tissue",img:"https://static.insales-cdn.com/images/products/1/7057/870513553/thumb-63e33b5ab2968_464x620.png",desc:"Очищающие салфетки",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:293,name:"Urban Eco Golden Berry C Mask Sheet",price:434,slug:"urban-eco-golden-berry-c-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/6357/870594773/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo66eI7Iqk7YGs7Iuc7Yq4_01_464x620.png",desc:"Тканевая маска для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:294,name:"Urban Eco Golden Berry C 2 Special Set",price:3162,slug:"urban-eco-golden-berry-c-2-special-set",img:"https://static.insales-cdn.com/images/products/1/239/870613231/thumb-64a7ae98a77d3_464x620.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:295,name:"Urban Eco Golden Berry C Ampoule (large-capacity)",price:2502,slug:"urban-eco-golden-berry-c-ampoule-large-capacity",img:"https://static.insales-cdn.com/images/products/1/593/870597201/thumb-649e2b9104ce5_464x620.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:296,name:"Urban Eco Harakeke Ampoule",price:1992,slug:"urban-eco-harakeke-ampoule",img:"https://static.insales-cdn.com/images/products/1/1403/870622587/thumb-63f81c8b439f8_464x620_1_.png",desc:"Сыворотка для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:297,name:"Eco Earth Pink Sun Cream",price:1750,slug:"eco-earth-pink-sun-cream",img:"https://static.insales-cdn.com/images/products/1/2900/870689620/thumb-7JeQ7L2U7Ja07Iqk7ZWR7YGs7ISg7YGs66a8_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:298,name:"My Cleanse Recipe Cleansing Foam Mild Herb",price:826,slug:"my-cleanse-recipe-cleansing-foam-mild-herb",img:"https://static.insales-cdn.com/images/products/1/2047/870696959/thumb-66eI7J207YG066CM7KaI66CI7Iuc7ZS87YG066CM7KeV7Y866eI7J2865Oc7ZeI67iM_560x750_1_.png",desc:"Пенка для умывания",catName:"My Cleanse Recipe",cats:["my-cleanse-recipe", "po-seriyam"]},
{id:299,name:"Natural Condition Scrub Foam Deep Pore Cleansing",price:1090,slug:"natural-condition-scrub-foam-deep-pore-cleansing",img:"https://static.insales-cdn.com/images/products/1/6164/870709268/thumb-64K07LaU6507Luo65SU7IWY7Iqk7YGs6597Y866qo6rO16rCc7ISg_464x620.png",desc:"Пенка для умывания",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:300,name:"Body & Soul Dewy Blossom Body Wash",price:1086,slug:"body-soul-dewy-blossom-body-wash",img:"https://static.insales-cdn.com/images/products/1/4749/870789773/thumb-62a6d0d95385b_464x620.png",desc:"Гель для душа",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:301,name:"Mervie Actibiome Toner",price:3215,slug:"mervier-activiome-toner",img:"https://static.insales-cdn.com/images/products/1/7211/870784043/thumb-62a6d0d57866d_464x620.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:302,name:"Mervie Actibiome Emulsion",price:3409,slug:"mervie-activiome-emulsion",img:"https://static.insales-cdn.com/images/products/1/601/870785625/thumb-62a6d0d4d5952_464x620.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:303,name:"Saemmul Shadow Box Single",price:1007,slug:"saemmul-shadow-box-single",img:"https://static.insales-cdn.com/images/products/1/5465/870823257/thumb-650177c73df19_560x750.png",desc:"Тени для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:304,name:"Repair RX Toner",price:4066,slug:"repair-rx-toner",img:"https://static.insales-cdn.com/images/products/1/2738/870820530/thumb-66as7Y6Y7Ja07JWM7JeR7Iqk7Yag64SI_464x620.png",desc:"Тонер для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:305,name:"Miracle Whitening Vita Cream",price:2767,slug:"miracle-whitening-vita-cream",img:"https://static.insales-cdn.com/images/products/1/3440/870821232/thumb-62a6d0d8988ec_464x620.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:306,name:"Bio Solution Elasticity Collagen Mask Sheet",price:135,slug:"bio-solution-elasticity-collagen-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/4478/870822270/thumb-6462ed94c8a93_464x620.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:307,name:"Skinny Balance Moisture Mist",price:1195,slug:"skinny-balance-moisture-mist",img:"https://static.insales-cdn.com/images/products/1/7183/870824975/thumb-62cbb01d8f3f9_464x620.png",desc:"Мист для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:308,name:"Snail Essential EX Wrinkle Solution Multi Cream",price:3616,slug:"snail-essential-ex-wrinkle-solution-multi-cream",img:"https://static.insales-cdn.com/images/products/1/4998/870822790/thumb-62ccbef2bc039_464x620.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:309,name:"Saemmul Airy Cotton Makeup Base 02 Lavender",price:1024,slug:"saemmul-airy-cotton-makeup-base-02-lavender",img:"https://static.insales-cdn.com/images/products/1/6216/870824008/thumb-62a6d14abf022_464x620.png",desc:"Тональная основа для лица",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:310,name:"Silk Hair Style Spray",price:938,slug:"silk-hair-style-spray",img:"https://static.insales-cdn.com/images/products/1/7039/870824831/thumb-62a6d1dfe2237_560x750.png",desc:"Спрей для волос",catName:"Silk Hair Style",cats:["silk-hair-style", "po-seriyam"]},
{id:311,name:"Skinny Balance Radiance Mist",price:1195,slug:"skinny-balance-radiance-mist",img:"https://static.insales-cdn.com/images/products/1/7189/870824981/thumb-62cbae935f4a3_464x620.png",desc:"Мист для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:312,name:"True Mushroom LX Calming Effect Cream",price:2634,slug:"true-mushroom-lx-calming-effect-cream",img:"https://static.insales-cdn.com/images/products/1/5278/870929566/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7Lm067CN7J207Y6Z7Yq47YGs66a8_464x620.png",desc:"Крем для лица",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:313,name:"Jeju Fresh Aloe Soothing Gel",price:1306,slug:"jeju-fresh-aloe-soothing-gel",img:"https://static.insales-cdn.com/images/products/1/3101/871427101/thumb-62c7897015d97_464x620.png",desc:"Гель для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:314,name:"True Mushroom LX Oil Cream",price:2656,slug:"true-mushroom-lx-oil-cream",img:"https://static.insales-cdn.com/images/products/1/6050/870930338/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7Jik7J287YGs66a8_464x620.png",desc:"Крем для лица",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:315,name:"Honey Oatmeal Lip Treatment",price:793,slug:"honey-oatmeal-lip-treatment",img:"https://static.insales-cdn.com/images/products/1/7587/870931875/thumb-62a6d4db5f2bb_464x620.png",desc:"Бальзам для губ",catName:"Honey Oatmeal",cats:["honey-oatmeal", "po-seriyam"]},
{id:316,name:"Honey Oatmeal Lip Scrub",price:748,slug:"honey-oatmeal-lip-scrub",img:"https://static.insales-cdn.com/images/products/1/7596/870931884/thumb-62a6d4db0a299_464x620.png",desc:"Скраб для губ",catName:"Honey Oatmeal",cats:["honey-oatmeal", "po-seriyam"]},
{id:317,name:"Jeju Fresh Aloe Body Peeling Mist",price:941,slug:"jeju-vivid-aloe-smooth-body-peeling-mist",img:"https://static.insales-cdn.com/images/products/1/7152/871414768/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ66ek64GI67CU65SU7ZWE66eB6647Iqk7Yq4_464x620.png",desc:"Мист для тела",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:318,name:"Snail Essential EX Collagen Wrapping Mask",price:1845,slug:"snail-essential-ex-collagen-wrapping-mask",img:"https://static.insales-cdn.com/images/products/1/6330/871471290/thumb-7Iqk64Sk7J287JeQ7IS87IWc7J207JeR7Iqk7L2c65286rKQ656p7ZWR66eI7Iqk7YGs_01_464x620.png",desc:"Кремовая маска для лица",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:319,name:"Perfumed Body Moisturizer Mandarin",price:800,slug:"perfumed-body-moisturizer-mandarin",img:"https://static.insales-cdn.com/images/products/1/5685/871568949/thumb-62a6d4679e385_464x620.png",desc:"Лосьон для тела",catName:"Perfumed Body",cats:["perfumed-body", "po-seriyam"]},
{id:320,name:"Snail Essential EX Wrinkle Solution Gel Mask Sheet",price:628,slug:"snail-essential-ex-wrinkle-solution-gel-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/1161/871474313/thumb-6481361987c64_464x620.png",desc:"Гелевая маска для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:321,name:"Saemmul Single Blusher (Shading & Highlighter)",price:626,slug:"saemmul-single-blushershading-highlighter",img:"https://static.insales-cdn.com/images/products/1/4828/871486172/thumb-7ImQ7J2065Sp_560x750.png",desc:"Румяна для лица",catName:"Saemmul Single Blusher",cats:["saemmul-single-blusher", "po-seriyam"]},
{id:322,name:"Saemmy's Cream Roll Tint Seoul Parrot",price:1500,slug:"saemmys-cream-roll-tint-seoul-parrot",img:"https://static.insales-cdn.com/images/products/1/1047/870933527/thumb-1_7ISc7Jq47JW166y07IOI7IOI6647Iqk7YGs66a866Gk7Yu07Yq4_464x620.png",desc:"Тинт для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:323,name:"Perfumed Body Moisturizer Peony",price:800,slug:"perfumed-body-moisturizer-peony",img:"https://static.insales-cdn.com/images/products/1/4319/871567583/thumb-62a6d4689ae97_464x620.png",desc:"Лосьон для тела",catName:"Perfumed Body",cats:["perfumed-body", "po-seriyam"]},
{id:324,name:"Pure Natural Hand Treatment Mask",price:320,slug:"pure-natural-hand-treatment-mask",img:"https://static.insales-cdn.com/images/products/1/3799/871575255/thumb-62cb989c69069_464x620.png",desc:"Маска для рук",catName:"Pure Natural",cats:["pure-natural", "po-seriyam"]},
{id:325,name:"Eco Energy All-In-One Soothing Essence",price:3306,slug:"eco-energy-all-in-one-soothing-essence",img:"https://static.insales-cdn.com/images/products/1/673/871735969/thumb-632040d15eaa0_464x620.png",desc:"Эссенция для лица",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:326,name:"Snail Essential EX Wrinkle Solution Multi Stick",price:2436,slug:"snail-essential-ex-wrinkle-solution-multi-stick",img:"https://static.insales-cdn.com/images/products/1/7551/871931263/thumb-7Iqk64Sk7J287JeQ7IS87IWc7J207JeR7Iqk66eB7YG07IaU66Oo7IWY66mA7Yuw7Iqk7Yux2023_560x750.png",desc:"Стик для лица и глаз",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:327,name:"Saemmul Jelly Candy Tint",price:773,slug:"saemmul-jelly-candy-tint",img:"https://static.insales-cdn.com/images/products/1/2952/873433992/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-06-15_%D0%B2_19.35.27.png",desc:"Тинт для губ",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:328,name:"Eco Soul Lip Liner",price:648,slug:"eco-soul-lip-liner",img:"https://static.insales-cdn.com/images/products/1/4434/870928722/thumb-7JeQ7L2U7IaM7Jq466a965287J2064SI_464x620.png",desc:"Карандаш для губ",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:329,name:"Saemmul Perfect Pore BB",price:938,slug:"saemmul-perfect-pore-bb",img:"https://static.insales-cdn.com/images/products/1/7694/870931982/thumb-62a6d14db7651_464x620.png",desc:"Пудра для лица",catName:"Saemmul Perfect Pore",cats:["saemmul-perfect-pore", "po-seriyam"]},
{id:330,name:"Saemmul Single Shadow (Shimmer)",price:564,slug:"saemmul-single-shadow-shimmer",img:"https://static.insales-cdn.com/images/products/1/6361/871479513/thumb-7IOY66y87Iux6riA7ISA64E7Jqw7Ims66i4_464x620.png",desc:"Румяна для лица",catName:"Saemmul Single Shadow",cats:["saemmul-single-shadow", "po-seriyam"]},
{id:331,name:"Cover Perfection Lip Pencil",price:989,slug:"cover-perfection-lip-pencil-2",img:"https://static.insales-cdn.com/images/products/1/8060/873488252/thumb-64e450d17424e_560x750.png",desc:"Карандаш для губ",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:332,name:"Saemmul Single Blusher (Yellow & Orange)",price:626,slug:"saemmul-single-blusher-yellow-orange",img:"https://static.insales-cdn.com/images/products/1/3143/871484487/thumb-67iU65s7IWU_560x750__1_.png",desc:"Румяна для лица",catName:"Saemmul Single Blusher",cats:["saemmul-single-blusher", "po-seriyam"]},
{id:333,name:"Ultra Shot Gold Veil Cream",price:3294,slug:"ultra-shot-gold-veil-cream",img:"https://static.insales-cdn.com/images/products/1/6563/875723171/thumb-63bf78242428e_464x620.png",desc:"Крем для лица",catName:"Ultra Shot",cats:["ultra-shot", "po-seriyam"]},
{id:334,name:"True Mushroom LX 2 Set",price:5532,slug:"true-mushroom-lx-2-set",img:"https://static.insales-cdn.com/images/products/1/3908/875728708/thumb-64a79ac117914_560x750__1_.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:335,name:"Ultra Shot Gold All-in-One First Essence",price:3294,slug:"ultra-shot-gold-all-in-one-first-essence",img:"https://static.insales-cdn.com/images/products/1/5551/875722159/thumb-63d9f1b778790_464x620.png",desc:"Эссенция для лица",catName:"Ultra Shot",cats:["ultra-shot", "po-seriyam"]},
{id:336,name:"True Mushroom LX Skin Care 3 Set",price:15047,slug:"true-mushroom-lx-3-set",img:"https://static.insales-cdn.com/images/products/1/2678/875727478/thumb-64a79a235d9d9_560x750__1_.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:337,name:"Cell Renew Bio Micro Peel Intense Gel",price:2076,slug:"cell-renew-bio-micro-peel-intense-gel",img:"https://static.insales-cdn.com/images/products/1/4123/877096987/thumb-62a6d152bbd12_560x750.png",desc:"Пилинг-гель для лица",catName:"Cell Renew Bio",cats:["cell-renew-bio", "po-seriyam"]},
{id:338,name:"Art'Lif Cotton Pad",price:493,slug:"artlif-cotton-pad",img:"https://static.insales-cdn.com/images/products/1/1835/878815019/image__3_.webp",desc:"",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:339,name:"Urban Breeze Eau de Perfume Fall in Flower",price:2091,slug:"urban-breeze-eau-de-perfume-fall-in-flower",img:"https://static.insales-cdn.com/images/products/1/1982/877545406/thumb-7Ja067CY67iM66as7KaI7Jik65Oc7Y287ZO47Y07J247ZSM65287JuM_01_560x750.png",desc:"Вода парфюмированная",catName:"Urban Breeze",cats:["urban-breeze", "po-seriyam"]},
{id:340,name:"Snail Essential EX Wrinkle Solution Essence & Cream Special Set",price:7316,slug:"snail-essential-ex-wrinkle-solution-essence-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/7309/878034061/thumb-64a7841ca965e_560x750.png",desc:"",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:341,name:"Urban Breeze Eau de Perfume Another Wood",price:2091,slug:"urban-breeze-eau-de-perfume-another-wood",img:"https://static.insales-cdn.com/images/products/1/3268/877554884/thumb-7Ja067CY67iM66as7KaI7Jik65Oc7Y287ZO47Ja064KY642U7Jqw65Oc_01_560x750.png",desc:"Вода парфюмированная",catName:"Urban Breeze",cats:["urban-breeze", "po-seriyam"]},
{id:342,name:"Art'Lif Round Puff",price:369,slug:"art-lif-round-puff",img:"https://static.insales-cdn.com/images/products/1/2661/878815845/BT272105143_Art_LifRoundPuff_2P__Front_02_L_trim_740x740__1_.webp",desc:"Спонж",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:343,name:"Art'Lif 5 Layer Cotton Pad",price:613,slug:"artlif-5-layer-cotton-pad",img:"https://static.insales-cdn.com/images/products/1/3450/886484346/image__1_-removebg-preview.png",desc:"",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:344,name:"Art'Lif Water Drop Cushion Puff",price:345,slug:"artlif-water-drop-cushion-puff",img:"https://static.insales-cdn.com/images/products/1/3158/878816342/BT272105190_Art_LifWaterDropPuff_4P__Front_02_L_trim_a4f71021-b8b1-4c6c-9f45-eeea400457b3_740x7.webp",desc:"Спонж",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:345,name:"Temptation Age Return Essence",price:3673,slug:"temptation-age-return-essence",img:"https://static.insales-cdn.com/images/products/1/7987/929791795/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS07JeQ7IS87Iqk_560x750.png",desc:"Эссенция для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:346,name:"Bio Solution Barrier Propolis Mask Sheet",price:138,slug:"bio-solution-barrier-propolis-mask-sheet",img:"https://static.insales-cdn.com/images/products/1/6949/934075173/thumb-67CU7J207Jik7IaU66Oo7IWY7ZSE66Gc7Y066as7Iqk66eI7Iqk7YGs7Iuc7Yq4_560x750.png",desc:"Тканевая маска для лица",catName:"Bio Solution",cats:["bio-solution", "po-seriyam"]},
{id:347,name:"True Mushroom LX Perfect Creamy Cleansing Foam",price:2656,slug:"true-mushroom-lx-perfect-creamy-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/3481/2160709017/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7Y287Y6Z7Yq47YGs66as6647YG066CM7KeV7Y8_560x750.png",desc:"Пенка для умывания",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:348,name:"True Mushroom LX Perfect Clean Lip & Eye Remover",price:2656,slug:"true-mushroom-lx-perfect-clean-lip-eye-remover",img:"https://static.insales-cdn.com/images/products/1/241/2160869617/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7Y287Y6Z7Yq47YG066aw66a97JWk7JWE7J2066as66y067KE_560x750.png",desc:"Очищающая вода",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:349,name:"Iceland Hydrating Collagen Eye Stick",price:1396,slug:"iceland-hydrating-collagen-eye-stick",img:"https://static.insales-cdn.com/images/products/1/7811/870645379/thumb-645c98af434b7_464x620_1_.png",desc:"Стик для глаз",catName:"Iceland",cats:["iceland", "po-seriyam"]},
{id:350,name:"Urban Eco Golden Berry C Blemish Cream",price:3724,slug:"urban-eco-golden-berry-c-blemish-cream",img:"https://static.insales-cdn.com/images/products/1/401/2429714833/thumb-6rOo65Og67Kg66as7JSo7J6h7Yuw7YGs66a8_560x750.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:351,name:"Gem Miracle Cica Collagen Bubble Mask",price:1953,slug:"gem-miracle-cica-collagen-bubble-mask",img:"https://static.insales-cdn.com/images/products/1/7952/1001144080/thumb-7KCs66465287YG07Iuc7Lm07L2c65286rKQ67KE67iU66eI7Iqk7YGs_560x750.png",desc:"Пузырьковая маска для лица",catName:"Gem Miracle",cats:["gem-miracle", "po-seriyam"]},
{id:352,name:"Saemmy's Aid Shot Tint",price:1488,slug:"saemmys-aid-shot-tint",img:"https://static.insales-cdn.com/images/products/1/1014/870933494/thumb-7IOI6647Iqk7JeQ7J2065Oc7IO37Yu07Yq4_464x620.png",desc:"Тинт для губ",catName:"Saemmy's",cats:["saemmys", "po-seriyam"]},
{id:353,name:"Eco Soul Powerproof Mega Slim Liner",price:688,slug:"eco-soul-powerproof-mega-slim-liner",img:"https://static.insales-cdn.com/images/products/1/3888/870928176/thumb-7JeQ7L2U7IaM7Jq47YyM7JuM7ZSE66Oo7ZSE6re57Iqs66a865287J2064SI_464x620.png",desc:"Подводка для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:354,name:"Vellabel Gold Collagen Firming Special 2 Set",price:4708,slug:"vellabel-gold-collagen-firming-special-2-set",img:"https://static.insales-cdn.com/images/products/1/7794/904420978/thumb-64ab93935e91a_560x750.png",desc:"",catName:"Vellabel",cats:["vellabel", "po-seriyam"]},
{id:355,name:"Temptation Age Return Skin Care 3 Set",price:13694,slug:"temptation-age-return-skin-care-3-set",img:"https://static.insales-cdn.com/images/products/1/286/960864542/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS037KKF7IS47Yq4_01_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:356,name:"Snail Essential EX Wrinkle Solution Enriched Oil Balm",price:1523,slug:"snail-essential-ex-wrinkle-solution-enriched-oil-balm",img:"https://static.insales-cdn.com/images/products/1/27/932225051/thumb-7Iqk64Sk7J287JeQ7IS87IWc7J207JeR7Iqk66eB7YG07IaU66Oo7IWY7J2466as7LmY65Oc7Jik7J2867Ck_01_56.png",desc:"Бальзам для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:357,name:"Temptation Age Return Skin Care 2 Set",price:11394,slug:"temptation-age-return-skin-care-2-set",img:"https://static.insales-cdn.com/images/products/1/1406/955221374/thumb-7YWc7YWM7J207IWY7JeQ7J207KeA66as7YS027KKF7IS47Yq4_01_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:358,name:"True Mushroom LX Lift UP Cream Mask",price:4053,slug:"true-mushroom-lx-lift-up-cream-mask",img:"https://static.insales-cdn.com/images/products/1/6304/960829600/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk66as7ZSE7Yq47JeF7YGs66a866eI7Iqk7YGs_560x750.png",desc:"Кремовая маска для лица",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:359,name:"Silk Hair Color Cream",price:731,slug:"silk-hair-color-cream",img:"https://static.insales-cdn.com/images/products/1/6321/879540401/SILK_HAIR_Color_Cream_Gray_Hair_Cover_Black_1296x.webp",desc:"Краска для волос",catName:"Silk Hair Color",cats:["silk-hair-color", "po-seriyam"]},
{id:360,name:"Art'Lif 1/2 Skin Pack Cotton Pad",price:448,slug:"artlif-12-skin-pack-cotton-pad",img:"https://static.insales-cdn.com/images/products/1/354/878813538/image__1_.webp",desc:"",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:361,name:"Eco Energy Aqua Toner",price:2447,slug:"eco-energy-aqua-toner",img:"https://static.insales-cdn.com/images/products/1/1616/878020176/thumb-7JeQ7L2U7JeQ64SI7KeA7Yag64SI_560x750.png",desc:"Тонер для лица",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:362,name:"Cell Renew Bio Skin Care Special 2 Set",price:10779,slug:"cell-renew-bio-skin-care-special-2-set",img:"https://static.insales-cdn.com/images/products/1/7325/877542557/thumb-64ab90918b37f_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:363,name:"Classic Homme Special Set",price:6599,slug:"classic-homme-special-set",img:"https://static.insales-cdn.com/images/products/1/2299/876046587/thumb-64ab8cbae8aed_560x750.png",desc:"Подарочный набор",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:364,name:"Eco Soul Sparkling Eye",price:996,slug:"eco-soul-sparkling-eye",img:"https://static.insales-cdn.com/images/products/1/4238/870928526/thumb-7JeQ7L2U7IaM7Jq47Iqk7YyM7YG066eB7JWE7J20_464x620.png",desc:"Тени для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:365,name:"Набор кремов Body & Soul Blue Tahiti Special Set",price:2146,slug:"sm-body-soul-nabor-kremov-body-soul-blue-tahiti-special-set",img:"https://static.insales-cdn.com/images/products/1/2469/899090853/thumb-64a79d7239b43_560x750.png",desc:"Подарочный набор",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:366,name:"Eco Energy Emulsion",price:2516,slug:"eco-energy-emulsion",img:"https://static.insales-cdn.com/images/products/1/7663/878026223/thumb-7JeQ7L2U7JeQ64SI7KeA7JeQ66mA7KC8_560x750.png",desc:"Эмульсия для лица",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:367,name:"Art'Lif Highlighter Brush 32",price:1647,slug:"artlif-highlighter-brush-32",img:"https://static.insales-cdn.com/images/products/1/3757/878816941/32_trim_740x740.webp",desc:"",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:368,name:"Pink Aloe Aqua Gel",price:550,slug:"pink-aloe-aqua-gel",img:"https://static.insales-cdn.com/images/products/1/5480/877090152/thumb-7ZWR7YGs7JWM66Gc7JeQ7JWE7Lg7JWE7KCk7ZWg656E7LaU6rCA_560x750.png",desc:"Гель для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:369,name:"Ultra Shot Gold Recovery Ampoule",price:9023,slug:"ultra-shot-gold-recovery-ampoule",img:"https://static.insales-cdn.com/images/products/1/590/875725390/thumb-62c7c93906fbe_560x750.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:370,name:"Ultra Shot Gold Recovery Cream",price:6426,slug:"ultra-shot-gold-recovery-cream",img:"https://static.insales-cdn.com/images/products/1/7965/875724573/thumb-62c7cc68ea24a_560x750.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:371,name:"Art'Lif Glow Foundation Brush 11",price:1631,slug:"artlif-glow-foundation-brush-11",img:"https://static.insales-cdn.com/images/products/1/3910/878817094/11_trim_740x740.webp",desc:"",catName:"Уход за кожей",cats:["uhod-za-kozhey"]},
{id:372,name:"UV Perfection Safe Barrier Sun Cream",price:1044,slug:"uv-perfection-safe-barrier-sun-cream",img:"https://static.insales-cdn.com/images/products/1/5304/886019256/thumb-7Jyg67iM7J207Y287Y6Z7IWY7IS47J207ZSE67Kg66as7Ja07ISg7YGs66a86riw7ZqN7IS47Yq4_01_560x750.png",desc:"Солнцезащитный крем",catName:"UV Perfection",cats:["uv-perfection", "po-seriyam"]},
{id:373,name:"True Mushroom LX Elasticity Duo Cream Special Set",price:3135,slug:"true-mushroom-lx-elasticity-duo-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/1520/875726320/thumb-7Yq466Oo66i47Ims66O47JeY7JeR7Iqk7YOE66Cl65OA7Jik7YGs66a86riw7ZqN7IS47Yq4_560x750.png",desc:"Подарочный набор",catName:"True Mushroom LX",cats:["true-mushroom-lx", "po-seriyam"]},
{id:374,name:"Rest & Mood Moisture Hand Cream Special Set",price:1341,slug:"rest-mood-moisture-hand-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/6432/877099296/thumb-64a783dad1a73_560x750__1_.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:375,name:"Rest & Mood Moisture Hand Cream Sugar Passion",price:626,slug:"rest-mood-moisture-hand-cream-sugar-passion",img:"https://static.insales-cdn.com/images/products/1/6269/877508733/thumb-63183d1a58f7b_560x750.png",desc:"Крем для рук",catName:"Rest & Mood",cats:["rest-mood", "po-seriyam"]},
{id:376,name:"Eco Soul Powerproof Pen Liner",price:1249,slug:"eco-soul-powerproof-pen-liner",img:"https://static.insales-cdn.com/images/products/1/3721/870928009/thumb-62a6d244b3568_464x620.png",desc:"Карандаш для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:377,name:"Cover Perfection Concealer Palette 01 Cover and Correct",price:2732,slug:"cover-perfection-concealer-palette-01-cover-and-correct",img:"https://static.insales-cdn.com/images/products/1/27/873504795/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7YyU66CI7Yq4_560x750__1_.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:378,name:"Cell Renew Bio Massage Cream",price:3149,slug:"cell-renew-bio-massage-cream",img:"https://static.insales-cdn.com/images/products/1/7868/876117692/thumb-62a6d152226e7_560x750.png",desc:"Крем для тела",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:379,name:"Repair Rx Skin Care 2 Set",price:8708,slug:"repair-rx-skin-care-2-set",img:"https://static.insales-cdn.com/images/products/1/6987/877534027/thumb-64ab9516ad888_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:380,name:"Cover Perfection Concealer Pencil and Pot Set",price:4181,slug:"cover-perfection-concealer-pencil-and-pot-set",img:"https://static.insales-cdn.com/images/products/1/7211/873487403/thumb-64a79d3d5d801_560x750.png",desc:"",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:381,name:"Cover Perfection Concealer Pencil",price:844,slug:"cover-perfection-concealer-pencil",img:"https://static.insales-cdn.com/images/products/1/807/873489191/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7Y6c7Iqs_560x750.png",desc:"Консилер для лица",catName:"Cover Perfection",cats:["cover-perfection", "po-seriyam"]},
{id:382,name:"Saemmul Single Shadow (Glitter)",price:706,slug:"saemmul-single-shadow-glitter",img:"https://static.insales-cdn.com/images/products/1/7754/871480906/thumb-7IOY66y87Iux6riA7ISA64E7Jqw6riA66as7YSw_464x620.png",desc:"Румяна для лица",catName:"Saemmul Single Shadow",cats:["saemmul-single-shadow", "po-seriyam"]},
{id:383,name:"Art'Lif Screw Brush 57",price:329,slug:"artlif-screw-brush-57",img:"https://static.insales-cdn.com/images/products/1/3928/878817112/57_trim_740x740.webp",desc:"",catName:"Аксессуары",cats:["aksessuary"]},
{id:384,name:"Eco Soul Vegan Skin Balance BB Cream",price:2873,slug:"eco-soul-vegan-skin-balance-bb-cream",img:"https://static.insales-cdn.com/images/products/1/3552/870927840/thumb-648016cf9bc5f_464x620.png",desc:"ББ крем для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:385,name:"Ultra Shot Water Max Cream",price:3675,slug:"ultra-shot-water-max-cream",img:"https://static.insales-cdn.com/images/products/1/7217/875723825/thumb-63c7a09510291_560x750__1_.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:386,name:"Mineralizing Pore Concealer 1.5 Natural Beige",price:1003,slug:"mineralizing-pore-concealer-15-natural-beige",img:"https://static.insales-cdn.com/images/products/1/347/873341275/thumb-62a6d0d866952_464x620.png",desc:"Консилер для лица",catName:"Mineralizing",cats:["mineralizing", "po-seriyam"]},
{id:387,name:"Mineralizing Pore Concealer 02 Rich Beige",price:954,slug:"mineralizing-pore-concealer-02-rich-beige",img:"https://static.insales-cdn.com/images/products/1/366/873341294/thumb-62a6d0d83429b_464x620.png",desc:"Консилер для лица",catName:"Mineralizing",cats:["mineralizing", "po-seriyam"]},
{id:388,name:"Cover Perfection Concealer Cushion",price:2870,slug:"cover-perfection-concealer-cushion",img:"https://static.insales-cdn.com/images/products/1/318/873505086/thumb-7Luk67KE7Y287Y6Z7IWY7Luo7Iuk65s7Lg7IWY66qo64242_560x750.png",desc:"Кушон для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:389,name:"Eco Energy All-In-One Moisture Milk",price:2827,slug:"eco-energy-all-in-one-moisture-milk",img:"https://static.insales-cdn.com/images/products/1/870/871736166/thumb-63183cdbeb980_464x620.png",desc:"Эссенция для лица",catName:"Eco Energy",cats:["eco-energy", "po-seriyam"]},
{id:390,name:"Active Homme Blue Hydro All-in-One Essence",price:1504,slug:"active-homme-blue-hydro-all-in-one-essence",img:"https://static.insales-cdn.com/images/products/1/6259/871487603/thumb-7JWh7Yuw67iM7Ji066A67iU66Oo7ZWY7J2065Oc66Gc7Jis7J247JuQ7JeQ7IS87Iqk_464x620.png",desc:"Эссенция для лица",catName:"Active Homme",cats:["active-homme", "po-seriyam"]},
{id:391,name:"True Fit Glow Cushion",price:2870,slug:"true-fit-glow-cushion",img:"https://static.insales-cdn.com/images/products/1/7066/871431066/thumb-7Yq466Oo7ZWP6riA66Gc7Jqw7Lg7IWY64uo7ZKI_560x750.png",desc:"Кушон для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:392,name:"Snail Soothing Gel",price:775,slug:"snail-soothing-gel",img:"https://static.insales-cdn.com/images/products/1/3758/871476910/thumb-62a6d15655417_464x620.png",desc:"Гель для лица",catName:"Snail Essential EX",cats:["snail-essential-ex", "po-seriyam"]},
{id:393,name:"Perfumed Hand Light Essence Grapefruit",price:566,slug:"perfumed-hand-light-essence-grapefruit",img:"https://static.insales-cdn.com/images/products/1/7960/871431960/thumb-62cb7c567b029_464x620.png",desc:"Эссенция для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:394,name:"Silk Hair Heartleaf Scalp Cooling Shampoo",price:1633,slug:"silk-hair-heartleaf-scalp-cooling-shampoo",img:"https://static.insales-cdn.com/images/products/1/305/871932209/thumb-64813c58cf8f9_560x750.png",desc:"Шампунь для волос",catName:"Silk Hair Heartleaf",cats:["silk-hair-heartleaf", "po-seriyam"]},
{id:395,name:"UV Perfection Waterfit Soothing Sun Essence",price:1044,slug:"uv-perfection-waterfit-soothing-sun-essence",img:"https://static.insales-cdn.com/images/products/1/5592/886019544/thumb-7Jyg67iM7J207Y287Y6Z7IWY7JuM7YSw7ZWP7IiY65Sp7ISg7JeQ7IS87Iqk_01_560x750.png",desc:"Солнцезащитная эссенция",catName:"UV Perfection",cats:["uv-perfection", "po-seriyam"]},
{id:396,name:"Perfumed Hand Essence Warm Cotton",price:566,slug:"perfumed-hand-essence-warm-cotton",img:"https://static.insales-cdn.com/images/products/1/7494/871431494/thumb-62cb8a13349f3_464x620.png",desc:"Эссенция для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:397,name:"Cell Renew Bio Emulsion",price:5042,slug:"cell-renew-bio-emulsion",img:"https://static.insales-cdn.com/images/products/1/6666/871094794/thumb-62a6d1548d75d_464x620_1_.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:398,name:"Saemmul Single Shadow (Matte)",price:564,slug:"saemmul-single-shadow-matte",img:"https://static.insales-cdn.com/images/products/1/6999/871480151/thumb-7IOY66y87Iux6riA7ISA64E7Jqw66ek7Yq4_464x620.png",desc:"Румяна для лица",catName:"Saemmul Single Shadow",cats:["saemmul-single-shadow", "po-seriyam"]},
{id:399,name:"Saemmul Perfect Pore Tiny Pact",price:1548,slug:"saemmul-perfect-pore-tiny-pact",img:"https://static.insales-cdn.com/images/products/1/7743/870932031/thumb-6494f47ba776e_464x620.png",desc:"Пудра для лица",catName:"Saemmul Perfect Pore",cats:["saemmul-perfect-pore", "po-seriyam"]},
{id:400,name:"Eco Soul Sparkling Eye Twinkle",price:1060,slug:"eco-soul-sparkling-eye-twinkle",img:"https://static.insales-cdn.com/images/products/1/4209/870928497/thumb-7JeQ7L2U7IaM7Jq47Iqk7YyM7YG066eB7JWE7J207Yq47JyZ7YG0_464x620.png",desc:"Тени для лица",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:401,name:"Perfumed Hand Shea Butter Soft Powder",price:626,slug:"perfumed-hand-shea-butter-soft-powder",img:"https://static.insales-cdn.com/images/products/1/7582/871431582/thumb-62cb8694a1aa7_464x620.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:402,name:"Collagen EX Hydra Travel Kit",price:2079,slug:"collagen-ex-hydra-travel-kit",img:"https://static.insales-cdn.com/images/products/1/4955/870929243/thumb-7L2c65286rKQEX7ZWY7J2065Oc65287Yq4656Y67iU7YKk7Yq4_464x620.png",desc:"Трэвел набор",catName:"Collagen EX Hydra",cats:["collagen-ex-hydra", "po-seriyam"]},
{id:403,name:"Phyto Seven Cleansing Oil",price:2022,slug:"phyto-seven-cleansing-oil",img:"https://static.insales-cdn.com/images/products/1/7165/870931453/thumb-62a6d4da5c958_464x620.png",desc:"Гидрофильное масло для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:404,name:"Jeju Fresh Aloe Soothing Lotion",price:833,slug:"jeju-fresh-aloe-soothing-lotion",img:"https://static.insales-cdn.com/images/products/1/5802/871429802/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7IiY65Sp66Gc7IWY907Iir7J6QX_464x620.png",desc:"Лосьон для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:405,name:"Phyto Seven Cleansing Foam",price:1258,slug:"phyto-seven-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/7113/870931401/thumb-62a6d4dad1d31_464x620.png",desc:"Пенка для умывания",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:406,name:"Urban Delight Body Lotion Blossom",price:1787,slug:"urban-delight-body-lotion-blossom",img:"https://static.insales-cdn.com/images/products/1/670/873341598/thumb-63562e31a0674_464x620.png",desc:"Лосьон для тела",catName:"Urban Delight",cats:["urban-delight", "po-seriyam"]},
{id:407,name:"Phyto Seven Lip & Eye Makeup Remover",price:1086,slug:"phyto-seven-lip-eye-makeup-remover",img:"https://static.insales-cdn.com/images/products/1/7344/870931632/thumb-62a6d4da1e78b_464x620.png",desc:"Мицеллярная вода для губ и глаз",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:408,name:"Eco Soul Double Eyelid Shading Liner",price:522,slug:"eco-soul-double-eyelid-shading-liner",img:"https://static.insales-cdn.com/images/products/1/3652/870927940/thumb-62c67a440153b_464x620.png",desc:"Карандаш для глаз",catName:"Eco Soul",cats:["eco-soul", "po-seriyam"]},
{id:409,name:"Perfumed Hand Cream Peach Blossom",price:566,slug:"perfumed-hand-cream-peach-blossom",img:"https://static.insales-cdn.com/images/products/1/7360/871431360/thumb-62cb8ad47267e_464x620.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:410,name:"Perfumed Hand Moisturizer Acacia",price:642,slug:"perfumed-hand-moisturizer-acacia",img:"https://static.insales-cdn.com/images/products/1/7747/871431747/thumb-62cb7d673923b_464x620.png",desc:"Крем для рук",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:411,name:"Cell Renew Bio Essence",price:5867,slug:"cell-renew-bio-essence",img:"https://static.insales-cdn.com/images/products/1/6227/871094355/thumb-62a6d154c3714_464x620_1_.png",desc:"Эссенция для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:412,name:"Jeju Fresh Aloe Soothing Gel",price:522,slug:"jeju-fresh-aloe-soothing-gel-2",img:"https://static.insales-cdn.com/images/products/1/5029/871429029/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7IiY65Sp7KCk957Iir7J6QX_464x620.png",desc:"Гель для лица",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:413,name:"Touch On Body Grapefruit Body Wash",price:1746,slug:"touch-on-body-grapefruit-body-wash",img:"https://static.insales-cdn.com/images/products/1/6780/870931068/thumb-646af4ac95788_464x620.png",desc:"Гель для душа",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:414,name:"Silk Hair Darkening Black Shampoo",price:2569,slug:"silk-hair-darkening-black-shampoo",img:"https://static.insales-cdn.com/images/products/1/6979/870824771/thumb-64813ca4f3048_560x750.png",desc:"Шампунь для волос",catName:"Silk Hair Darkening",cats:["silk-hair-darkening", "po-seriyam"]},
{id:415,name:"Touch On Body Moringa Body Lotion",price:1778,slug:"touch-on-body-moringa-body-lotion",img:"https://static.insales-cdn.com/images/products/1/6556/870930844/thumb-20237YSw7LmY7Jio67CU65SU66qo66eB6rCA67CU65SU66Gc7IWY_464x620.png",desc:"Лосьон для тела",catName:"Touch On Body",cats:["touch-on-body", "po-seriyam"]},
{id:416,name:"Silk Hair Darkening Black Treatment",price:1398,slug:"silk-hair-darkening-black-treatment",img:"https://static.insales-cdn.com/images/products/1/7005/870824797/thumb-64813cd972b81_560x750.png",desc:"Кондиционер для волос",catName:"Silk Hair Darkening",cats:["silk-hair-darkening", "po-seriyam"]},
{id:417,name:"Silk Hair Style Fix Gel",price:883,slug:"silk-hair-style-fix-gel",img:"https://static.insales-cdn.com/images/products/1/7056/870824848/thumb-62a6d1e0a9a5d_560x750.png",desc:"Гель для волос",catName:"Silk Hair Style",cats:["silk-hair-style", "po-seriyam"]},
{id:418,name:"Saemmul Perfect Volume Mascara",price:678,slug:"saemmul-perfect-volume-mascara",img:"https://static.insales-cdn.com/images/products/1/4075/879169515/EM052104646_SaemmulPerfectVolumeMascara_Front_02_L.webp",desc:"Тушь для ресниц",catName:"Saemmul",cats:["saemmul", "po-seriyam"]},
{id:419,name:"Repair RX Emulsion",price:4285,slug:"repair-rx-emulsion",img:"https://static.insales-cdn.com/images/products/1/2679/870820471/thumb-62a6d0d22eb5b_464x620.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:420,name:"Eco Soul Pore Master Primer",price:1352,slug:"eco-soul-pore-master-primer",img:"https://static.insales-cdn.com/images/products/1/3654/870927942/thumb-62a6d24651411_464x620.png",desc:"Праймер для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:421,name:"Cell Renew Bio Cream",price:6201,slug:"cell-renew-bio-cream",img:"https://static.insales-cdn.com/images/products/1/5959/871094087/thumb-62a6d15501037_464x620_1_.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:422,name:"Repair RX Eye Cream Double Special Set",price:5421,slug:"repair-rx-eye-cream-double-special-set",img:"https://static.insales-cdn.com/images/products/1/2832/870820624/thumb-64ab94fbb954e_464x620.png",desc:"Крем для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:423,name:"Cell Renew Bio Eye Cream",price:5046,slug:"cell-renew-bio-eye-cream",img:"https://static.insales-cdn.com/images/products/1/6936/871095064/thumb-62a6d1545c649_464x620_1_.png",desc:"Крем для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:424,name:"Derma Plan Green Trouble Pad",price:2180,slug:"derma-plan-green-trouble-pad",img:"https://static.insales-cdn.com/images/products/1/7714/870817314/thumb-62a6cc963ed6b_464x620.png",desc:"Тонер для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:425,name:"Dewy Glow Jelly Lipstick",price:1608,slug:"dewy-glow-jelly-lipstick",img:"https://static.insales-cdn.com/images/products/1/8064/870817664/thumb-65OA7J206riA66Gc7Jqw7KCk66as66a97Iqk7Yux_560x750.png",desc:"Помада для губ",catName:"Dewy Glow",cats:["dewy-glow", "po-seriyam"]},
{id:426,name:"Derma Plan Green Fresh Toner",price:1927,slug:"derma-plan-green-fresh-toner",img:"https://static.insales-cdn.com/images/products/1/7651/870817251/thumb-62a6cc969f10a_464x620.png",desc:"Тонер для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:427,name:"Mervie Actibiome Eye Cream",price:3487,slug:"mervie-activiome-eye-cream",img:"https://static.insales-cdn.com/images/products/1/1540/870786564/thumb-62a6d0d494000_464x620.png",desc:"Крем для глаз",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:428,name:"Repair RX Cream & Essence Special Set",price:8473,slug:"repair-rx-cream-essence-special-set",img:"https://static.insales-cdn.com/images/products/1/2980/870820772/thumb-64a79cee01311_560x750.png",desc:"Подарочный набор",catName:"Repair RX",cats:["repair-rx", "po-seriyam"]},
{id:429,name:"Body & Soul Love Hawaii Body Scrub",price:961,slug:"body-soul-love-hawaii-body-scrub",img:"https://static.insales-cdn.com/images/products/1/4008/870789032/thumb-62a6d0da6aaa5_464x620.png",desc:"Скраб для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:430,name:"Derma Plan Green Trouble Spot Ampoule",price:2321,slug:"derma-plan-green-trouble-spot-ampoule",img:"https://static.insales-cdn.com/images/products/1/7740/870817340/thumb-62a6cc960b96d_464x620.png",desc:"Сыворотка для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:431,name:"Mervie Actibiome Facial Oil",price:3494,slug:"mervie-activiome-facial-oil",img:"https://static.insales-cdn.com/images/products/1/8025/870784857/thumb-62a6d0d5b97be_464x620.png",desc:"Масло для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:432,name:"Healing Tea Garden White Tea Lip & Eye Remover",price:977,slug:"healing-tea-garden-white-tea-lip-eye-remover",img:"https://static.insales-cdn.com/images/products/1/4412/870781244/thumb-7Z6Q66eB7Yuw6rCA65Og66a97JWk7JWE7J2066as66y067KE7ZmU7J207Yq47Yuw_560x750.png",desc:"Мицеллярная вода для губ и глаз",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:433,name:"Healing Tea Garden Green Tea Cleansing Water",price:1254,slug:"healing-tea-garden-green-tea-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/4324/870715620/thumb-65111032b4129_560x750_1_.png",desc:"Мицеллярная вода для лица",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:434,name:"Mervie Actibiome Cream",price:3804,slug:"mervie-activiome-cream",img:"https://static.insales-cdn.com/images/products/1/241/870785265/thumb-62a6d0d529b56_464x620.png",desc:"Крем для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:435,name:"Derma Plan Zero Soothing Gel",price:1589,slug:"derma-plan-zero-soothing-gel",img:"https://static.insales-cdn.com/images/products/1/1880/870819672/thumb-641aa3f869484_464x620.png",desc:"Гель для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:436,name:"Power Ampoule Pore Tight",price:1884,slug:"power-ampoule-pore-tight",img:"https://static.insales-cdn.com/images/products/1/7802/870710906/thumb-62a6d46742baf_464x620.png",desc:"Сыворотка для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:437,name:"Natural Condition Cleansing Foam Weak Acid",price:849,slug:"natural-condition-cleansing-foam-weak-acid",img:"https://static.insales-cdn.com/images/products/1/4386/870707490/thumb-64K07LaU6507Luo65SU7IWY7YG066CM7KeV7Y87JW97IKw7ISx_464x620.png",desc:"Пенка для умывания",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:438,name:"Power Ampoule Hydra",price:1858,slug:"power-ampoule-hydra",img:"https://static.insales-cdn.com/images/products/1/7257/870710361/thumb-62a6d46773b3a_464x620.png",desc:"Сыворотка для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:439,name:"Eco Earth All Protection Sun Cream",price:2344,slug:"eco-earth-all-protection-sun-cream",img:"https://static.insales-cdn.com/images/products/1/5531/870692251/thumb-62a6d24805b1d_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:440,name:"Mineral Homme Black Cleansing Foam",price:835,slug:"mineral-homme-black-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/3279/870821071/thumb-62a6d0d735fb9_464x620.png",desc:"Пенка для умывания",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:441,name:"Eco Earth Cica Mild Sun Cushion",price:3804,slug:"eco-earth-cica-mild-sun-cushion",img:"https://static.insales-cdn.com/images/products/1/28/870686748/thumb-6417d1d7cfd9e_464x620.png",desc:"Солнцезащитный кушон",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:442,name:"Eco Earth Airy Tone Up Sun Serum",price:1263,slug:"eco-earth-airy-tone-up-sun-serum",img:"https://static.insales-cdn.com/images/products/1/692/870687412/thumb-62c67905040b8_464x620.png",desc:"Солнцезащитная сыворотка",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:443,name:"Natural Condition Cleansing Foam Double Whip",price:892,slug:"natural-condition-cleansing-foam-double-whip",img:"https://static.insales-cdn.com/images/products/1/4771/870707875/thumb-64K07LaU6507Luo65SU7IWY7YG066CM7KeV7Y8642U67iU7Zyp_464x620.png",desc:"Пенка для умывания",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:444,name:"Iceland Aqua Gel Cream",price:1969,slug:"iceland-aqua-gel-cream",img:"https://static.insales-cdn.com/images/products/1/1679/870647439/thumb-62a6d1e618943_464x620_1_.png",desc:"Гель-крем для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:445,name:"Iceland Hydrating Soothing Gel",price:738,slug:"iceland-hydrating-soothing-gel",img:"https://static.insales-cdn.com/images/products/1/4741/870666885/thumb-62a6d1e52cd8f_464x620_1_.png",desc:"Гель для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:446,name:"Body & Soul Dewy Blossom Body Lotion",price:1079,slug:"body-soul-dewy-blossom-body-lotion",img:"https://static.insales-cdn.com/images/products/1/4847/870789871/thumb-62a6d0d916fe4_464x620.png",desc:"Лосьон для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:447,name:"Natural Condition Sparkling Cleansing Foam",price:982,slug:"natural-condition-sparkling-cleansing-foam",img:"https://static.insales-cdn.com/images/products/1/2424/870705528/thumb-62a6cc91ec6e5_464x620.png",desc:"Пенка для умывания",catName:"Natural Condition",cats:["natural-condition", "po-seriyam"]},
{id:448,name:"Silk Hair Repair No Wash Treatment Lotion",price:1509,slug:"silk-hair-repair-no-wash-treatment-lotion",img:"https://static.insales-cdn.com/images/products/1/3467/870673803/thumb-65094ffae3bd4_464x620.png",desc:"Лосьон для волос",catName:"Silk Hair Repair",cats:["silk-hair-repair", "po-seriyam"]},
{id:449,name:"Power Ampoule Anti-Wrinkle",price:1812,slug:"power-ampoule-anti-wrinkle",img:"https://static.insales-cdn.com/images/products/1/191/870711487/thumb-62a6d46714826_464x620.png",desc:"Сыворотка для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:450,name:"Power Ampoule Vita White",price:1789,slug:"power-ampoule-vita-white",img:"https://static.insales-cdn.com/images/products/1/1671/870712967/thumb-62a6d466dfa49_464x620.png",desc:"Сыворотка для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:451,name:"Healing Tea Garden Tea Tree Cleansing Water",price:1254,slug:"healing-tea-garden-tea-tree-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/5275/870724763/thumb-65111032b425c_560x750_1_.png",desc:"Мицеллярная вода для лица",catName:"Healing Tea Garden",cats:["healing-tea-garden", "po-seriyam"]},
{id:452,name:"Urban Eco Harakeke Emulsion",price:1734,slug:"urban-eco-harakeke-emulsion",img:"https://static.insales-cdn.com/images/products/1/5446/870626630/thumb-6420fa3545d49_464x620_1_.png",desc:"Эмульсия для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:453,name:"Urban Delight Body Shower Gel Blossom",price:1874,slug:"urban-delight-body-shower-gel-blossom",img:"https://static.insales-cdn.com/images/products/1/671/873341599/thumb-63562bec31bf9_464x620.png",desc:"Гель для душа",catName:"Urban Delight",cats:["urban-delight", "po-seriyam"]},
{id:454,name:"Natural Condition Firming Massage Cream",price:1125,slug:"natural-condition-firming-massage-cream",img:"https://static.insales-cdn.com/images/products/1/1714/870704818/thumb-62a6cc9229c24_464x620.png",desc:"Крем для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:455,name:"Urban Eco Golden Berry C Fluid",price:1884,slug:"urban-eco-golden-berry-c-fluid",img:"https://static.insales-cdn.com/images/products/1/1131/870597739/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo7ZSM66Oo7J2065Oc_464x620.png",desc:"Флюид для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:456,name:"Urban Eco Harakeke Deep Moisture Sleeping Pack",price:2385,slug:"urban-eco-harakeke-deep-moisture-sleeping-pack",img:"https://static.insales-cdn.com/images/products/1/6124/870643692/thumb-6420f5a7a2b0c_464x620_1_.png",desc:"Ночная маска для лица",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:457,name:"Eco Earth Pink Sun Cream EX",price:1672,slug:"eco-earth-pink-sun-cream-ex",img:"https://static.insales-cdn.com/images/products/1/6295/870684823/thumb-642e6c4711fd3_464x620_1_.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:458,name:"Care Plus Baobab Collagen Cream",price:842,slug:"care-plus-baobab-collagen-cream",img:"https://static.insales-cdn.com/images/products/1/3218/870558866/thumb-63c8a49b27386_464x620.png",desc:"Крем для тела",catName:"Care Plus",cats:["care-plus", "po-seriyam"]},
{id:459,name:"Urban Eco Golden Berry C Vital Mask",price:2965,slug:"urban-eco-golden-berry-c-vital-mask",img:"https://static.insales-cdn.com/images/products/1/7970/870580002/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo7IOd6riw66eI7Iqk7YGs_1_464x620.png",desc:"Кремовая маска для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:460,name:"Mervie Actibiome Skin Care 2 Set",price:6481,slug:"mervie-actibiome-skin-care-2-set",img:"https://static.insales-cdn.com/images/products/1/1893/870786917/thumb-64a783761377a_560x750.png",desc:"Подарочный набор",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:461,name:"Body & Soul Hair Removal Cream",price:1249,slug:"body-soul-hair-removal-cream",img:"https://static.insales-cdn.com/images/products/1/2867/870787891/thumb-62a6d0dc545bb_464x620.png",desc:"Крем для тела",catName:"Body & Soul",cats:["body-soul", "po-seriyam"]},
{id:462,name:"Eco Earth Aqua Sun Stick",price:2229,slug:"eco-earth-aqua-sun-stick",img:"https://static.insales-cdn.com/images/products/1/6075/870692795/thumb-62a6d247ad6f6_464x620.png",desc:"Солнцезащитный стик",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:463,name:"Care Plus Manuka Honey Body Cream",price:968,slug:"care-plus-manuka-honey-body-cream",img:"https://static.insales-cdn.com/images/products/1/3594/870575626/thumb-62a6d45566f3f_464x620.png",desc:"Крем для тела",catName:"Сухая кожа",cats:["suhaya-kozha", "po-problemam"]},
{id:464,name:"Mineral Homme Black Emulsion EX",price:2969,slug:"mineral-homme-black-emulsion-ex",img:"https://static.insales-cdn.com/images/products/1/3374/870821166/thumb-62a6d0d68ef50_464x620.png",desc:"Эмульсия для лица",catName:"Зрелая кожа",cats:["zrelaya-kozha", "po-problemam"]},
{id:465,name:"Gold Snail Wrinkle Stick Balm",price:2371,slug:"gold-snail-wrinkle-stick-balm",img:"https://static.insales-cdn.com/images/products/1/7404/870522092/thumb-63d07a1c6bb21_464x620.png",desc:"Бальзам-стик для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:466,name:"Garden Pleasure Hand Wash",price:833,slug:"garden-pleasure-hand-wash",img:"https://static.insales-cdn.com/images/products/1/6972/870513468/thumb-63c7669306112_464x620.png",desc:"Мыло для рук",catName:"Жирная кожа",cats:["zhirnaya-kozha", "po-problemam"]},
{id:467,name:"Urban Eco Golden Berry C Dual Toning Cream",price:3211,slug:"urban-eco-golden-berry-c-dual-toning-cream",img:"https://static.insales-cdn.com/images/products/1/5741/870594157/thumb-7Ja067CY7JeQ7L2U6rOo65Og67Kg66as7JSo65OA7Ja87Yag64ud7YGs66a8_464x620.png",desc:"Крем для лица",catName:"Urban Eco Golden Berry C",cats:["urban-eco-golden-berry-c", "po-seriyam"]},
{id:468,name:"Calamansi Pore Tightener",price:1191,slug:"calamansi-pore-tightener",img:"https://static.insales-cdn.com/images/products/1/3831/870551287/thumb-62a6cc8874f2b_464x620.png",desc:"Сыворотка для лица",catName:"Проблемная кожа",cats:["problemnaya-kozha", "po-problemam"]},
{id:469,name:"Healing Tea Garden Chamomile Cleansing Water",price:1260,slug:"healing-tea-garden-chamomile-cleansing-water",img:"https://static.insales-cdn.com/images/products/1/908/870736780/thumb-62a94b8be593c_464x620_1_.png",desc:"Мицеллярная вода для лица",catName:"Чувствительная кожа",cats:["dlya-chuvstvitelnoy-kozhi", "po-problemam"]},
{id:470,name:"Eco Earth Waterproof Sun Cream",price:1989,slug:"eco-earth-waterproof-sun-cream",img:"https://static.insales-cdn.com/images/products/1/1894/870688614/thumb-62a6d44b9f954_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:471,name:"Eco Earth Pink Sun Base",price:1835,slug:"eco-earth-pink-sun-base",img:"https://static.insales-cdn.com/images/products/1/3369/870690089/thumb-62a6d2493bbfc_464x620.png",desc:"Солнцезащитный крем",catName:"Eco Earth",cats:["eco-earth", "po-seriyam"]},
{id:472,name:"Jeju Fresh Aloe Soothing Gel",price:570,slug:"jeju-fresh-aloe-soothing-gel-3",img:"https://static.insales-cdn.com/images/products/1/2865/2797570865/thumb-7KCc7KO87IOd7IOd7JWM66Gc7JeQ7IiY65Sp7KCk95_7Yqc67iM_560x750.png",desc:"Гель для лица",catName:"Jeju Fresh Aloe",cats:["jeju-fresh-aloe", "po-seriyam"]},
{id:473,name:"Prime Caviar Perfect Eye Cream Special Set",price:2999,slug:"prime-caviar-perfect-eye-cream-special-set",img:"https://static.insales-cdn.com/images/products/1/141/932323469/thumb-7ZSE65287J6E7LqQ67mE7Ja07Y287Y6Z7Yq47JWE7J207YGs66a86riw7ZqN7IS47Yq4_01_560x750.png",desc:"Подарочный набор",catName:"Prime Caviar",cats:["prime-caviar", "po-seriyam"]},
{id:474,name:"Snail Essential EX Wrinkle Solution Hydra Cream",price:4999,slug:"snail-essential-ex-wrinkle-solution-hydra-cream",img:"https://static.insales-cdn.com/images/products/1/732/932389596/thumb-64647e5b63ed1_560x750.png",desc:"Крем для лица",catName:"Тусклая кожа",cats:["tusklaya-kozha", "po-problemam"]},
{id:475,name:"Saemmul 3D Slim Mascara Black",price:1121,slug:"saemmul-3d-slim-mascara-black",img:"https://static.insales-cdn.com/images/products/1/6765/870824557/thumb-62a6d0e0b10e1_464x620.png",desc:"Тушь для ресниц",catName:"Saemmul",cats:["saemmul", "po-seriyam"]}
];

const BLOG_POSTS = [
  { id: 1, title: "Сухая кожа лица: полное руководство по уходу и восстановлению", date: "04.03.2026", slug: "suhaya-kozha",
    img: "https://static.insales-cdn.com/r/_F3bRsvTW-0/rs:fit:375:375:1/q:100/plain/images/articles/1/2089/14698537/large_Gemini_Generated_Image_6luplw6luplw6lup.png@png",
    excerpt: "Сухая кожа — особый тип кожи, характеризующийся низкой активностью сальных желёз. Это создаёт множество неудобств: ощущение стянутости, шелушение, повышенная чувствительность...",
    content: "Сухая кожа требует особого ухода и внимания. Ключевые принципы: регулярное увлажнение, мягкое очищение и защита от агрессивной среды. Рекомендуем серии Urban Eco Harakeke и Iceland для комплексного увлажнения.",
  },
  { id: 2, title: "Новая классика увлажнения: преимущества экстракта Харакеке", date: "27.02.2026", slug: "harakeke",
    img: "https://static.insales-cdn.com/r/zu1ZP_s3WqM/rs:fit:375:375:1/q:100/plain/images/articles/1/6097/14661585/large_Gemini_Generated_Image_t6xs8gt6xs8gt6xs.png@png",
    excerpt: "Экстракт харакеке — уникальный ингредиент из Новой Зеландии, который племя маори использовало веками для ухода за кожей...",
    content: "Харакеке (Phormium tenax) — новозеландское льнянное растение, богатое полисахаридами и аминокислотами. The Saem был первым брендом, внедрившим этот ингредиент в косметику в 2012 году.",
  },
  { id: 3, title: "Как определить свой тип старения?", date: "16.01.2025", slug: "tip-stareniya",
    img: "https://static.insales-cdn.com/r/X3JInYj4WnQ/rs:fit:375:375:1/q:100/plain/images/articles/1/6453/7412021/large_DALL_E_2025-01-16_16.34.44.webp@webp",
    excerpt: "Каждый из нас рано или поздно задумывается о том, как меняется наша кожа и лицо с возрастом...",
    content: "Тип старения кожи определяется генетикой, образом жизни и уходом. Основные типы: деформационный, мелкоморщинистый, мышечный и комбинированный. Правильно подобранный уход поможет замедлить процессы старения.",
  },
  { id: 4, title: "Разбираем состав Eco Earth Aqua Sun Stick", date: "02.08.2024", slug: "eco-earth-sun-stick",
    img: "https://static.insales-cdn.com/r/nDC-6wonlGY/rs:fit:375:375:1/q:100/plain/images/articles/1/1090/7218242/large_image_dzz.jpeg@jpeg",
    excerpt: "Сегодня детально разберем состав Eco Earth Aqua Sun Stick — одного из самых популярных солнцезащитных стиков бренда...",
    content: "Eco Earth Aqua Sun Stick содержит: Water, Synthetic Wax, Natural Plant Power Complex. Ключевые компоненты обеспечивают защиту SPF50+ и одновременно увлажняют кожу.",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// CONTEXTS
// ══════════════════════════════════════════════════════════════════════════════

const CartCtx = createContext(null);
const RouterCtx = createContext(null);

function useCart() { return useContext(CartCtx); }
function useRouter() { return useContext(RouterCtx); }

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addToCart = (product) => setItems(prev => {
    const found = prev.find(i => i.id === product.id);
    if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { ...product, qty: 1 }];
  });
  const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartCtx.Provider value={{ items, addToCart, removeFromCart, updateQty, total, count }}>{children}</CartCtx.Provider>;
}

function RouterProvider({ children }) {
  const [page, setPage] = useState({ name: "home", params: {} });
  const navigate = (name, params = {}) => { setPage({ name, params }); window.scrollTo(0, 0); };
  return <RouterCtx.Provider value={{ page, navigate }}>{children}</RouterCtx.Provider>;
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function AnnouncementBar() {
  const msgs = ["Скидка 10% на первый заказ · промокод WELCOME10", "Бесплатная доставка курьером от 5000 ₽", "Пробники в каждый заказ"];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 3500); return () => clearInterval(t); }, []);
  return (
    <div style={{ background: DARK, color: "#fff", textAlign: "center", fontSize: 12, padding: "9px 16px", letterSpacing: "0.04em" }}>
      {msgs[idx]}
    </div>
  );
}

function Header() {
  const { count } = useCart();
  const { navigate } = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 66, gap: 20 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}>
            <img src={LOGO_URL} alt="THE SAEM" style={{ height: 34 }} onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
            <span style={{ display: "none", fontWeight: 800, fontSize: 18, letterSpacing: "0.12em", color: DARK }}>THE SAEM</span>
          </button>

          <nav style={{ display: "flex", gap: 2, flex: 1, justifyContent: "center" }} className="desk-nav">
            {NAV_CATEGORIES.map(cat => (
              <div key={cat.label} style={{ position: "relative" }}
                onMouseEnter={() => setActiveMenu(cat.slug)}
                onMouseLeave={() => setActiveMenu(null)}>
                <button onClick={() => navigate("catalog", { category: cat.slug })}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 9px", fontSize: 12.5, fontWeight: 500,
                    color: activeMenu === cat.slug ? RED : "#333", whiteSpace: "nowrap",
                    borderBottom: activeMenu === cat.slug ? `2px solid ${RED}` : "2px solid transparent", transition: "all 0.2s" }}>
                  {cat.label}
                </button>
                {cat.children.length > 0 && activeMenu === cat.slug && (
                  <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", border: "1px solid #e8e8e8",
                    borderTop: `2px solid ${RED}`, minWidth: 210, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 200, padding: "6px 0" }}>
                    {cat.children.map(ch => (
                      <button key={ch.slug} onClick={() => { navigate("catalog", { category: ch.slug }); setActiveMenu(null); }}
                        style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                          padding: "8px 18px", fontSize: 13, color: "#444", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.target.style.background = "#fdf5f5"; e.target.style.color = RED; e.target.style.paddingLeft = "24px"; }}
                        onMouseLeave={e => { e.target.style.background = ""; e.target.style.color = "#444"; e.target.style.paddingLeft = "18px"; }}>
                        {ch.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <Btn icon={<SearchIcon />} onClick={() => setSearchOpen(true)} title="Поиск" />
            <Btn icon={<HeartIcon />} onClick={() => navigate("favorites")} title="Избранное" />
            <Btn icon={<UserIcon />} onClick={() => navigate("account")} title="Личный кабинет" />
            <button onClick={() => navigate("cart")} title="Корзина"
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 6, color: "#333" }}>
              <BagIcon />
              {count > 0 && <span style={{ position: "absolute", top: -2, right: -2, background: RED, color: "#fff", borderRadius: "50%", width: 17, height: 17, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{count}</span>}
            </button>
            <button onClick={() => setMobileOpen(true)} className="mob-btn"
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#333", padding: 6 }}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 }} />
          <div style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: 300, background: "#fff", zIndex: 201, overflowY: "auto", padding: "20px 0" }}>
            <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.1em" }}>THE SAEM</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            {NAV_CATEGORIES.map(cat => (
              <div key={cat.slug}>
                <button onClick={() => { navigate("catalog", { category: cat.slug }); setMobileOpen(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 20px", fontSize: 14, fontWeight: 600, color: DARK, borderBottom: "1px solid #f8f8f8" }}>
                  {cat.label}
                </button>
                {cat.children.map(ch => (
                  <button key={ch.slug} onClick={() => { navigate("catalog", { category: ch.slug }); setMobileOpen(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "9px 36px", fontSize: 13, color: "#666" }}>
                    {ch.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Search modal */}
      {searchOpen && (
        <>
          <div onClick={() => setSearchOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, backdropFilter: "blur(3px)" }} />
          <div style={{ position: "fixed", top: "18%", left: "50%", transform: "translateX(-50%)", width: 600, maxWidth: "92vw", background: "#fff", zIndex: 301, borderRadius: 4, padding: "24px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: `2px solid ${RED}`, paddingBottom: 12, marginBottom: 16 }}>
              <SearchIcon />
              <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { navigate("catalog", { search: searchVal }); setSearchOpen(false); } }}
                placeholder="Поиск по каталогу THE SAEM..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: DARK }} />
              <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <p style={{ fontSize: 11, color: "#aaa", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Популярные запросы</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Urban Eco Harakeke", "Консилер Cover Perfection", "Eco Earth Sun", "Iceland", "Saemmul Mascara"].map(t => (
                <button key={t} onClick={() => { setSearchVal(t); navigate("catalog", { search: t }); setSearchOpen(false); }}
                  style={{ background: "#f5f5f5", border: "none", padding: "6px 14px", borderRadius: 20, fontSize: 12, color: "#555", cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Btn({ icon, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "#333", display: "flex", alignItems: "center" }}>
      {icon}
    </button>
  );
}

function SearchIcon() { return <svg width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/></svg>; }
function HeartIcon() { return <svg width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function UserIcon() { return <svg width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx={12} cy={7} r={4}/></svg>; }
function BagIcon() { return <svg width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1={3} y1={6} x2={21} y2={6}/><path d="M16 10a4 4 0 0 1-8 0"/></svg>; }
function MenuIcon() { return <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><line x1={3} y1={6} x2={21} y2={6}/><line x1={3} y1={12} x2={21} y2={12}/><line x1={3} y1={18} x2={21} y2={18}/></svg>; }
function StarIcon({ filled }) { return <svg width={14} height={14} viewBox="0 0 24 24" fill={filled ? "#f5a623" : "none"} stroke="#f5a623" strokeWidth={1.5}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>; }

function Stars({ rating }) {
  return <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}</div>;
}

function ProductCard({ product, onAddToCart }) {
  const { navigate } = useRouter();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const disc = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const badge = product.badge || (product.cats?.includes('hits') ? 'Хит' : product.cats?.includes('new') ? 'Новинка' : product.cats?.includes('aktsii') ? 'Акция' : product.cats?.includes('rasprodazha') ? 'Скидка' : null);
  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, overflow: "hidden",
        transition: "all 0.25s", transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
      {badge && <span style={{ position: "absolute", top: 10, left: 10, background: product.badge === "Хит" ? RED : product.badge === "Новинка" ? "#1a7a2e" : "#e67e00", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.06em", textTransform: "uppercase", zIndex: 2 }}>{badge}</span>}
      {disc && <span style={{ position: "absolute", top: product.badge ? 34 : 10, left: 10, background: "#ff6b35", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 2, zIndex: 2 }}>-{disc}%</span>}
      <button onClick={() => navigate("product", { slug: product.slug })}
        style={{ display: "block", aspectRatio: "1/1", overflow: "hidden", background: "#fafafa", width: "100%", border: "none", cursor: "pointer", padding: 0 }}>
        <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23f5f5f5' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ccc' font-size='14'%3EФото%3C/text%3E%3C/svg%3E"} />
      </button>
      <div style={{ padding: "14px 14px 16px" }}>
        <button onClick={() => navigate("product", { slug: product.slug })}
          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 500, color: DARK, marginBottom: 6, lineHeight: 1.4, minHeight: 36, padding: 0, width: "100%" }}>
          {product.name}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 11, color: "#aaa" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: DARK }}>{product.price.toLocaleString("ru-RU")} ₽</span>
          {product.oldPrice && <span style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through" }}>{product.oldPrice.toLocaleString("ru-RU")} ₽</span>}
        </div>
        <button onClick={handleAdd}
          style={{ width: "100%", background: added ? "#1a7a2e" : DARK, color: "#fff", border: "none", padding: "10px 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, transition: "all 0.3s" }}>
          {added ? "✓ ДОБАВЛЕНО" : "В КОРЗИНУ"}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ title, href, onNavigate }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, letterSpacing: "-0.01em" }}>{title}</h2>
      {onNavigate && <button onClick={onNavigate} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: RED, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>Смотреть все →</button>}
    </div>
  );
}

function BenefitsBar() {
  return (
    <div style={{ background: "#fdf5f5", borderTop: "1px solid #f0dada", borderBottom: "1px solid #f0dada", padding: "14px 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 10 }}>
        {[["🚚","Бесплатная доставка от 5000 ₽"],["🎁","Пробники в каждый заказ"],["🔄","Легкий возврат и обмен"],["💳","Оплата картой и СБП"]].map(([ic, t]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
            <span style={{ fontSize: 18 }}>{ic}</span><span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const { navigate } = useRouter();
  return (
    <footer style={{ background: DARK, color: "#ccc", padding: "48px 20px 32px", marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 36, marginBottom: 40 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.12em", color: "#fff", marginBottom: 14 }}>THE SAEM</div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "#777", marginBottom: 12 }}>Официальный магазин корейского бренда THE SAEM в России</p>
            <p style={{ fontSize: 13, color: "#fff" }}>8-800-600-17-85</p>
            <p style={{ fontSize: 12, color: "#777" }}>г. Москва, Измайловский проезд, д. 11</p>
            <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>hello@thesaemcosmetic.ru</p>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Магазин</h4>
            {[["О компании","about"],["Каталог","catalog"],["Блог","blog"],["Бонусная программа","bonus"]].map(([l,p]) => (
              <button key={l} onClick={() => navigate(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#777", marginBottom: 8, transition: "color 0.2s", padding: 0 }}
                onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#777"}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Покупателю</h4>
            {[["Доставка","delivery"],["Оплата","payment"],["Обмен и возврат","exchange"],["Вопросы и ответы","faq"],["Сертификаты","certificates"]].map(([l,p]) => (
              <button key={l} onClick={() => navigate(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#777", marginBottom: 8, padding: 0 }}
                onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#777"}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Правовая</h4>
            {[["Оферта и политика","oferta"],["Пользовательское соглашение","agreement"]].map(([l,p]) => (
              <button key={l} onClick={() => navigate(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: "#777", marginBottom: 8, padding: 0 }}
                onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#777"}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #333", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "#555" }}>© 2026 THE SAEM. Все права защищены.</p>
          <div style={{ display: "flex", gap: 6 }}>
            {["МИР","VISA","MC"].map(p => <span key={p} style={{ background: "#333", padding: "3px 10px", borderRadius: 3, fontSize: 10, color: "#777", fontWeight: 700 }}>{p}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGES
// ══════════════════════════════════════════════════════════════════════════════

// ── HOME ─────────────────────────────────────────────────────────────────────
function HomePage() {
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const [slide, setSlide] = useState(0);
  const slides = [
    { bg: "linear-gradient(135deg,#fdf5f5,#fce8e8,#f5e0e0)", tag: "Официальный магазин", title: "THE SAEM\nKorean Cosmetics", sub: "Натуральная корейская косметика. Уникальные ингредиенты со всего мира.", cta: "Смотреть новинки", ctaNav: () => navigate("catalog", { category: "new" }) },
    { bg: "linear-gradient(135deg,#e8f5f5,#d0eeee,#b8e4e4)", tag: "Бестселлер", title: "Urban Eco\nHarakeke", sub: "Флагманская серия с экстрактом новозеландского растения. Глубокое увлажнение.", cta: "Смотреть серию", ctaNav: () => navigate("catalog", { category: "uhod-za-kozhey" }) },
    { bg: "linear-gradient(135deg,#f5f0ff,#ede0ff,#e0ccff)", tag: "Скидки до 25%", title: "Cover\nPerfection", sub: "Культовая линейка консилеров и средств для идеального тона.", cta: "Смотреть акции", ctaNav: () => navigate("catalog", { category: "aktsii" }) },
  ];
  useEffect(() => { const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  const s = slides[slide];
  const hits = PRODUCTS.filter(p => p.cats.includes("hits")).slice(0,8);
  const newProds = PRODUCTS.filter(p => p.cats.includes("new")).slice(0,8);
  return (
    <div>
      {/* Hero */}
      <section style={{ background: s.bg, padding: "72px 20px", textAlign: "center", transition: "background 0.8s", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 350, height: 350, background: `radial-gradient(circle,rgba(200,16,46,0.07) 0%,transparent 70%)`, borderRadius: "50%" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: RED, textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>{s.tag}</p>
          <h1 style={{ fontSize: "clamp(38px,6vw,72px)", fontWeight: 900, color: DARK, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em", whiteSpace: "pre-line" }}>{s.title}</h1>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 36, lineHeight: 1.7 }}>{s.sub}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={s.ctaNav} style={{ background: RED, color: "#fff", padding: "14px 36px", border: "none", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>{s.cta}</button>
            <button onClick={() => navigate("catalog")} style={{ background: "transparent", color: DARK, padding: "14px 36px", border: `1.5px solid ${DARK}`, borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Весь каталог</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
          {slides.map((_,i) => <button key={i} onClick={() => setSlide(i)} style={{ width: i===slide ? 24 : 8, height: 8, borderRadius: 4, background: i===slide ? RED : "#ccc", border: "none", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </section>

      <BenefitsBar />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px" }}>
        {/* Hits */}
        <section style={{ marginBottom: 64 }}>
          <SectionTitle title="Хиты продаж" onNavigate={() => navigate("catalog", { category: "hits" })} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {hits.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>

        {/* Promo */}
        <section style={{ marginBottom: 64 }}>
          <button onClick={() => navigate("catalog", { category: "konsilery" })} style={{ width: "100%", display: "block", background: "linear-gradient(135deg,#1a1a1a,#2d2d2d)", borderRadius: 4, padding: "52px 44px", border: "none", cursor: "pointer", color: "#fff", position: "relative", overflow: "hidden", textAlign: "left" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 220, height: 220, background: `rgba(200,16,46,0.2)`, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -40, right: 100, width: 160, height: 160, background: `rgba(200,16,46,0.1)`, borderRadius: "50%" }} />
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, marginBottom: 10, fontWeight: 700 }}>Бестселлеры серии</p>
            <h3 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 10 }}>Cover Perfection</h3>
            <p style={{ fontSize: 14, color: "#aaa", marginBottom: 24 }}>Консилеры и средства для идеального тона кожи — №1 в России 5 лет подряд</p>
            <span style={{ display: "inline-block", background: RED, color: "#fff", padding: "11px 28px", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>СМОТРЕТЬ КОЛЛЕКЦИЮ →</span>
          </button>
        </section>

        {/* New */}
        <section style={{ marginBottom: 64 }}>
          <SectionTitle title="Новинки" onNavigate={() => navigate("catalog", { category: "new" })} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {newProds.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>

        {/* Blog */}
        <section style={{ marginBottom: 64 }}>
          <SectionTitle title="Интересное от THE SAEM" onNavigate={() => navigate("blog")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
            {BLOG_POSTS.map(post => <BlogCardSmall key={post.id} post={post} />)}
          </div>
        </section>

        {/* About */}
        <section style={{ background: "#fdf5f5", padding: "40px", borderRadius: 4, border: "1px solid #f0dada" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>О бренде The Saem</h2>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>Корейский бренд The Saem, вдохновлённый природой, изучает культуру и обычаи со всего мира. Разрабатывает высококачественные продукты с натуральными ингредиентами. Удостоен Korea Prestige Brand Awards трижды подряд (2017–2019) и Гран-при Consumer Beauty Awards от Glowpick.</p>
          <button onClick={() => navigate("about")} style={{ marginTop: 20, background: "none", border: `1.5px solid ${RED}`, color: RED, padding: "10px 24px", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>Подробнее о бренде</button>
        </section>
      </div>
    </div>
  );
}

function BlogCardSmall({ post }) {
  const { navigate } = useRouter();
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => navigate("blogPost", { slug: post.slug })} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "none", border: "1px solid #f0f0f0", borderRadius: 4, overflow: "hidden", cursor: "pointer", textAlign: "left",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.25s", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#f8f8f8" }}>
        <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.05)" : "scale(1)" }} onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%23f5f5f5' width='400' height='225'/%3E%3C/svg%3E"} />
      </div>
      <div style={{ padding: "14px" }}>
        <p style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>{post.date}</p>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: hov ? RED : DARK, lineHeight: 1.5, transition: "color 0.2s" }}>{post.title}</h4>
      </div>
    </button>
  );
}

// ── CATALOG ───────────────────────────────────────────────────────────────────
function CatalogPage({ category, search }) {
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const [sortBy, setSortBy] = useState("default");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [page, setPage] = useState(1);
  const PER_PAGE = 24;
  useEffect(() => { setPage(1); }, [category, search]);
  let filtered = [...PRODUCTS];
  if (category) filtered = filtered.filter(p =>
    p.cats.includes(category) ||
    p.catName.toLowerCase().replace(/[^a-zа-яё0-9]/gi,'-') === category ||
    p.catName === NAV_CATEGORIES.find(c=>c.slug===category)?.label ||
    NAV_CATEGORIES.find(c=>c.slug===category)?.children?.find(ch=>ch.slug===category)?.label === p.catName
  );
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (priceFrom) filtered = filtered.filter(p => p.price >= Number(priceFrom));
  if (priceTo) filtered = filtered.filter(p => p.price <= Number(priceTo));
  if (sortBy === "price-asc") filtered.sort((a,b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a,b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a,b) => b.rating - a.rating);

  const catLabel = category ? (NAV_CATEGORIES.find(c => c.slug === category)?.label || NAV_CATEGORIES.flatMap(c=>c.children).find(c=>c.slug===category)?.label || category) : "Весь каталог";

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#888", marginBottom: 24, alignItems: "center" }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 13 }}>Главная</button>
        <span>›</span>
        <span style={{ color: DARK }}>{catLabel}{search ? `: "${search}"` : ""}</span>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {/* Sidebar */}
        <aside style={{ width: 240, flexShrink: 0 }} className="catalog-sidebar">
          <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "20px" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: DARK }}>Категории</h3>
            <button onClick={() => navigate("catalog")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "6px 0", fontSize: 13, color: !category ? RED : "#555", fontWeight: !category ? 700 : 400 }}>Все товары</button>
            {NAV_CATEGORIES.map(cat => (
              <div key={cat.slug}>
                <button onClick={() => navigate("catalog", { category: cat.slug })} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "6px 0", fontSize: 13, color: category === cat.slug ? RED : "#555", fontWeight: 600 }}>{cat.label}</button>
                {cat.children.map(ch => (
                  <button key={ch.slug} onClick={() => navigate("catalog", { category: ch.slug })} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 12px", fontSize: 12, color: category === ch.slug ? RED : "#777" }}>{ch.label}</button>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: DARK }}>Цена, ₽</h3>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="От" style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "7px 10px", fontSize: 13, outline: "none" }} />
                <span style={{ color: "#ccc" }}>—</span>
                <input value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="До" style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "7px 10px", fontSize: 13, outline: "none" }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: DARK }}>{catLabel} <span style={{ fontSize: 15, fontWeight: 400, color: "#aaa" }}>({filtered.length})</span></h1>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: "1px solid #e0e0e0", borderRadius: 3, padding: "8px 12px", fontSize: 13, color: "#555", outline: "none", cursor: "pointer" }}>
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
              <p style={{ fontSize: 16, marginBottom: 12 }}>Товары не найдены</p>
              <button onClick={() => navigate("catalog")} style={{ background: RED, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 2, fontSize: 13, cursor: "pointer" }}>Смотреть все товары</button>
            </div>
          ) : (
            <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 20 }}>
              {filtered.slice((page-1)*PER_PAGE, page*PER_PAGE).map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
            </div>
            {filtered.length > PER_PAGE && (
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:36, flexWrap:"wrap" }}>
                {Array.from({length: Math.ceil(filtered.length/PER_PAGE)}, (_,i) => i+1).map(pg => (
                  <button key={pg} onClick={() => { setPage(pg); window.scrollTo(0,0); }}
                    style={{ width:40, height:40, border: pg===page ? `2px solid ${RED}` : "1px solid #e0e0e0", background: pg===page ? RED : "#fff", color: pg===page ? "#fff" : "#555", borderRadius:3, fontSize:14, cursor:"pointer", fontWeight: pg===page ? 700 : 400 }}>{pg}</button>
                ))}
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT PAGE ──────────────────────────────────────────────────────────────
function ProductPage({ slug }) {
  const { addToCart } = useCart();
  const { navigate } = useRouter();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("desc");
  const related = PRODUCTS.filter(p => p.slug !== slug && p.cats.some(c => product?.cats?.includes(c))).slice(0, 4);

  if (!product) return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <p style={{ fontSize: 18, color: "#888", marginBottom: 20 }}>Товар не найден</p>
      <button onClick={() => navigate("catalog")} style={{ background: RED, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 2, fontSize: 13, cursor: "pointer" }}>В каталог</button>
    </div>
  );

  const disc = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const badge = product.badge || (product.cats?.includes('hits') ? 'Хит' : product.cats?.includes('new') ? 'Новинка' : product.cats?.includes('aktsii') ? 'Акция' : product.cats?.includes('rasprodazha') ? 'Скидка' : null);
  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true); setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#888", marginBottom: 28, alignItems: "center" }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 13 }}>Главная</button>
        <span>›</span>
        <button onClick={() => navigate("catalog")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 13 }}>Каталог</button>
        <span>›</span>
        <span style={{ color: DARK }}>{product.name}</span>
      </div>

      <div style={{ display: "flex", gap: 48, marginBottom: 72, flexWrap: "wrap" }}>
        {/* Image */}
        <div style={{ width: 480, maxWidth: "100%", flexShrink: 0 }}>
          <div style={{ border: "1px solid #f0f0f0", borderRadius: 4, overflow: "hidden", aspectRatio: "1/1", background: "#fafafa" }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480'%3E%3Crect fill='%23f5f5f5' width='480' height='480'/%3E%3C/svg%3E"} />
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 280 }}>
          {badge && <span style={{ display: "inline-block", background: product.badge === "Хит" ? RED : "#1a7a2e", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 2, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{badge}</span>}
          <p style={{ fontSize: 12, color: "#aaa", marginBottom: 6 }}>{product.series}</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: DARK, marginBottom: 16, lineHeight: 1.2 }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Stars rating={product.rating} />
            <span style={{ fontSize: 14, color: "#555" }}>{product.rating}</span>
            <span style={{ fontSize: 13, color: "#aaa" }}>({product.reviews} отзывов)</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: DARK }}>{product.price.toLocaleString("ru-RU")} ₽</span>
            {product.oldPrice && <span style={{ fontSize: 18, color: "#aaa", textDecoration: "line-through" }}>{product.oldPrice.toLocaleString("ru-RU")} ₽</span>}
            {disc && <span style={{ background: "#ff6b35", color: "#fff", fontSize: 13, fontWeight: 700, padding: "3px 9px", borderRadius: 3 }}>-{disc}%</span>}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", marginBottom: 28 }}>{product.description}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 3 }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ background: "none", border: "none", width: 40, height: 48, fontSize: 20, cursor: "pointer", color: "#333" }}>−</button>
              <span style={{ width: 44, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ background: "none", border: "none", width: 40, height: 48, fontSize: 20, cursor: "pointer", color: "#333" }}>+</button>
            </div>
            <button onClick={handleAdd} style={{ flex: 1, background: added ? "#1a7a2e" : RED, color: "#fff", border: "none", padding: "14px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, transition: "all 0.3s" }}>
              {added ? "✓ ДОБАВЛЕНО В КОРЗИНУ" : "ДОБАВИТЬ В КОРЗИНУ"}
            </button>
          </div>
          <button style={{ width: "100%", background: "none", border: `1.5px solid ${DARK}`, color: DARK, padding: "13px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, marginBottom: 24 }}>
            ♡ ДОБАВИТЬ В ИЗБРАННОЕ
          </button>

          <div style={{ background: "#fdf5f5", borderRadius: 4, padding: "16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {[["🚚","Доставка курьером от 5000 ₽ бесплатно"],["🎁","Пробники в каждый заказ"],["🔄","Возврат в течение 14 дней"]].map(([ic,t]) => (
              <div key={t} style={{ display: "flex", gap: 10, fontSize: 13, color: "#555" }}><span>{ic}</span><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", borderBottom: "2px solid #f0f0f0", marginBottom: 24, gap: 0 }}>
          {[["desc","Описание"],["comp","Применение"],["reviews","Отзывы"]].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 24px", fontSize: 14, fontWeight: tab===t ? 700 : 400, color: tab===t ? RED : "#666", borderBottom: `3px solid ${tab===t ? RED : "transparent"}`, marginBottom: -2, transition: "all 0.2s" }}>{l}</button>
          ))}
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.85, color: "#555", maxWidth: 700 }}>
          {tab === "desc" && <p>{product.description} Продукт создан с использованием передовых технологий и тщательно отобранных натуральных ингредиентов. Подходит для ежедневного применения.</p>}
          {tab === "comp" && <p>Нанесите небольшое количество средства на очищенную кожу. Распределите лёгкими похлопывающими движениями до полного впитывания. Используйте утром и вечером для достижения наилучшего эффекта.</p>}
          {tab === "reviews" && (
            <div>
              {[{name:"Анна",rating:5,text:"Отличный продукт! Пользуюсь уже второй месяц, кожа заметно улучшилась.",date:"01.03.2026"},{name:"Мария",rating:4,text:"Хороший состав, приятный аромат. Буду покупать снова.",date:"15.02.2026"}].map((r,i) => (
                <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span><Stars rating={r.rating} /></div>
                    <span style={{ fontSize: 12, color: "#aaa" }}>{r.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <SectionTitle title="Похожие товары" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 20 }}>
            {related.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>
      )}
    </div>
  );
}

// ── CART PAGE ─────────────────────────────────────────────────────────────────
function CartPage() {
  const { items, removeFromCart, updateQty, total } = useCart();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1); // 1=cart 2=checkout 3=success

  if (step === 3) return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: DARK }}>Заказ оформлен!</h2>
      <p style={{ fontSize: 15, color: "#666", marginBottom: 32 }}>Мы отправили подтверждение на вашу почту. Ожидайте звонка менеджера.</p>
      <button onClick={() => navigate("home")} style={{ background: RED, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>НА ГЛАВНУЮ</button>
    </div>
  );

  if (step === 2) return <CheckoutForm onBack={() => setStep(1)} onSuccess={() => setStep(3)} total={total} items={items} />;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: DARK }}>Корзина</h1>
      <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#888", marginBottom: 32 }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 13 }}>Главная</button> › <span>Корзина</span>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
          <p style={{ fontSize: 16, color: "#aaa", marginBottom: 24 }}>Корзина пуста</p>
          <button onClick={() => navigate("catalog")} style={{ background: RED, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 2, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>ПЕРЕЙТИ В КАТАЛОГ</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Items */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {items.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}>
                <img src={item.img} alt={item.name} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 4, background: "#f8f8f8", flexShrink: 0 }} onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Crect fill='%23f5f5f5' width='90' height='90'/%3E%3C/svg%3E"} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 6 }}>{item.name}</p>
                  <p style={{ fontSize: 14, color: "#888", marginBottom: 12 }}>{item.price.toLocaleString("ru-RU")} ₽ / шт</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 3 }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: "none", border: "none", width: 34, height: 36, fontSize: 18, cursor: "pointer" }}>−</button>
                      <span style={{ width: 36, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "none", border: "none", width: 34, height: 36, fontSize: 18, cursor: "pointer" }}>+</button>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{(item.price * item.qty).toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 20, alignSelf: "flex-start" }}>×</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ width: 320, flexShrink: 0 }}>
            <div style={{ background: "#fdf5f5", border: "1px solid #f0dada", borderRadius: 4, padding: "24px", position: "sticky", top: 80 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Итого</h3>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 10, display: "flex", justifyContent: "space-between" }}><span>Товары ({items.reduce((s,i)=>s+i.qty,0)} шт)</span><span>{total.toLocaleString("ru-RU")} ₽</span></div>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 20, display: "flex", justifyContent: "space-between" }}><span>Доставка</span><span style={{ color: "#1a7a2e" }}>{total >= 5000 ? "Бесплатно" : "от 350 ₽"}</span></div>
              <div style={{ borderTop: "1px solid #e0c0c0", paddingTop: 16, marginBottom: 20, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}><span>К оплате</span><span>{total.toLocaleString("ru-RU")} ₽</span></div>
              <button onClick={() => setStep(2)} style={{ width: "100%", background: RED, color: "#fff", border: "none", padding: "14px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>ОФОРМИТЬ ЗАКАЗ</button>
              {total < 5000 && <p style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 10 }}>До бесплатной доставки: {(5000 - total).toLocaleString("ru-RU")} ₽</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ onBack, onSuccess, total, items }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", address: "", delivery: "courier", payment: "card", comment: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>← Вернуться в корзину</button>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: DARK }}>Оформление заказа</h1>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Section title="Контактные данные">
            <Row label="Имя *"><Input value={form.name} onChange={v => set("name",v)} placeholder="Введите ваше имя" /></Row>
            <Row label="Телефон *"><Input value={form.phone} onChange={v => set("phone",v)} placeholder="+7 (___) ___-__-__" /></Row>
            <Row label="Email *"><Input value={form.email} onChange={v => set("email",v)} placeholder="email@example.com" /></Row>
          </Section>
          <Section title="Доставка">
            <RadioGroup value={form.delivery} onChange={v => set("delivery",v)} options={[{v:"courier",l:"Курьером (350–550 ₽, бесплатно от 5000 ₽)"},{v:"pickup",l:"Самовывоз из пункта выдачи"},{v:"post",l:"Почта России"}]} />
            <Row label="Город"><Input value={form.city} onChange={v => set("city",v)} placeholder="Москва" /></Row>
            <Row label="Адрес"><Input value={form.address} onChange={v => set("address",v)} placeholder="Улица, дом, квартира" /></Row>
          </Section>
          <Section title="Оплата">
            <RadioGroup value={form.payment} onChange={v => set("payment",v)} options={[{v:"card",l:"Банковская карта онлайн"},{v:"sbp",l:"СБП (Система быстрых платежей)"},{v:"cash",l:"Наличными при получении"}]} />
          </Section>
          <Section title="Комментарий к заказу">
            <textarea value={form.comment} onChange={e => set("comment",e.target.value)} placeholder="Пожелания к заказу..." style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "10px 12px", fontSize: 13, height: 80, resize: "vertical", outline: "none" }} />
          </Section>
        </div>

        {/* Order summary */}
        <div style={{ width: 300, flexShrink: 0 }}>
          <div style={{ background: "#fdf5f5", border: "1px solid #f0dada", borderRadius: 4, padding: "20px", position: "sticky", top: 80 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Ваш заказ</h3>
            {items.map(i => (
              <div key={i.id} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 13 }}>
                <img src={i.img} alt={i.name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 3, background: "#eee" }} onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Crect fill='%23f5f5f5' width='44' height='44'/%3E%3C/svg%3E"} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>{i.name}</p>
                  <p style={{ color: "#888" }}>{i.qty} × {i.price.toLocaleString("ru-RU")} ₽</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e0c0c0", paddingTop: 14, marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, marginBottom: 16 }}><span>Итого</span><span>{total.toLocaleString("ru-RU")} ₽</span></div>
              <button onClick={onSuccess} style={{ width: "100%", background: RED, color: "#fff", border: "none", padding: "14px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>ПОДТВЕРДИТЬ ЗАКАЗ</button>
              <p style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>Нажимая кнопку, вы соглашаетесь с условиями оферты</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 16, paddingBottom: 10, borderBottom: "2px solid #f0f0f0" }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 5, letterSpacing: "0.04em" }}>{label}</label>{children}</div>;
}

function Input({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />;
}

function RadioGroup({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(o => (
        <label key={o.v} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "#444" }}>
          <input type="radio" value={o.v} checked={value===o.v} onChange={() => onChange(o.v)} style={{ marginTop: 2, accentColor: RED }} />
          {o.l}
        </label>
      ))}
    </div>
  );
}

// ── ACCOUNT PAGE ──────────────────────────────────────────────────────────────
function AccountPage() {
  const { navigate } = useRouter();
  const [tab, setTab] = useState("orders");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  if (!loggedIn) return (
    <div style={{ maxWidth: 440, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: "center", color: DARK }}>Личный кабинет</h1>
      <p style={{ textAlign: "center", color: "#888", fontSize: 14, marginBottom: 32 }}>Войдите, чтобы видеть заказы и бонусы</p>
      <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 5 }}>Email</label>
            <input value={loginForm.email} onChange={e => setLoginForm(f=>({...f,email:e.target.value}))} placeholder="email@example.com" style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "11px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 5 }}>Пароль</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm(f=>({...f,password:e.target.value}))} placeholder="••••••••" style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "11px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <button onClick={() => setLoggedIn(true)} style={{ width: "100%", background: RED, color: "#fff", border: "none", padding: "13px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginBottom: 12 }}>ВОЙТИ</button>
        <button style={{ width: "100%", background: "none", border: `1.5px solid ${DARK}`, color: DARK, padding: "12px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#aaa" }}>Забыли пароль? <button style={{ background: "none", border: "none", cursor: "pointer", color: RED, fontSize: 12 }}>Восстановить</button></p>
      </div>
    </div>
  );

  const ORDERS = [
    { id: "#12345", date: "01.03.2026", status: "Доставлен", total: 4527, items: 3 },
    { id: "#12280", date: "12.02.2026", status: "Доставлен", total: 2890, items: 2 },
    { id: "#12198", date: "05.01.2026", status: "Доставлен", total: 6340, items: 5 },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: DARK }}>Личный кабинет</h1>
        <button onClick={() => setLoggedIn(false)} style={{ background: "none", border: "1px solid #e0e0e0", padding: "8px 16px", borderRadius: 2, fontSize: 12, cursor: "pointer", color: "#666" }}>Выйти</button>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: "#fdf5f5", borderRadius: 4, padding: "20px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ width: 60, height: 60, background: RED, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 24, color: "#fff", fontWeight: 700 }}>А</div>
            <p style={{ fontWeight: 700, fontSize: 15 }}>Анна Иванова</p>
            <p style={{ fontSize: 12, color: "#888" }}>anna@example.com</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, overflow: "hidden" }}>
            {[["orders","Мои заказы"],["bonus","Бонусы"],["favorites","Избранное"],["profile","Профиль"]].map(([t,l]) => (
              <button key={t} onClick={() => setTab(t)} style={{ display: "block", width: "100%", textAlign: "left", background: tab===t ? "#fdf5f5" : "none", border: "none", cursor: "pointer", padding: "13px 18px", fontSize: 14, color: tab===t ? RED : "#555", fontWeight: tab===t ? 600 : 400, borderLeft: tab===t ? `3px solid ${RED}` : "3px solid transparent" }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {tab === "orders" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Мои заказы</h2>
              {ORDERS.map(o => (
                <div key={o.id} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "18px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{o.id}</p>
                    <p style={{ fontSize: 13, color: "#888" }}>{o.date} · {o.items} товара</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-block", background: "#e8f5e9", color: "#1a7a2e", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, marginBottom: 4 }}>{o.status}</span>
                    <p style={{ fontWeight: 700, fontSize: 16 }}>{o.total.toLocaleString("ru-RU")} ₽</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "bonus" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Бонусы и кэшбек</h2>
              <div style={{ background: "linear-gradient(135deg,#c8102e,#8a0d20)", borderRadius: 8, padding: "28px", color: "#fff", marginBottom: 24 }}>
                <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Доступно бонусов</p>
                <p style={{ fontSize: 40, fontWeight: 900, marginBottom: 8 }}>850</p>
                <p style={{ fontSize: 13, opacity: 0.8 }}>1 бонус = 1 рубль при следующей покупке</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "20px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>История начислений</h3>
                {[["01.03.2026","Заказ #12345","+45 бонусов"],["12.02.2026","Заказ #12280","+29 бонусов"],["05.01.2026","Регистрация","+100 бонусов"]].map(([d,t,b],i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f8f8f8", fontSize: 14 }}>
                    <div><p style={{ fontWeight: 600, marginBottom: 2 }}>{t}</p><p style={{ fontSize: 12, color: "#aaa" }}>{d}</p></div>
                    <span style={{ color: "#1a7a2e", fontWeight: 700 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "favorites" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Избранное</h2>
              <p style={{ color: "#aaa", fontSize: 14 }}>Список избранного пуст. Добавляйте товары, нажимая ♡</p>
            </div>
          )}
          {tab === "profile" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Данные профиля</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
                {[["Имя","Анна"],["Фамилия","Иванова"],["Email","anna@example.com"],["Телефон","+7 (999) 123-45-67"]].map(([l,v]) => (
                  <div key={l}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 5 }}>{l}</label>
                    <input defaultValue={v} style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: 3, padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
                ))}
                <button style={{ background: RED, color: "#fff", border: "none", padding: "12px", borderRadius: 2, fontSize: 13, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", paddingLeft: 28, paddingRight: 28 }}>СОХРАНИТЬ</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BLOG PAGE ─────────────────────────────────────────────────────────────────
function BlogPage() {
  const { navigate } = useRouter();
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: DARK }}>Блог THE SAEM</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 40 }}>Советы по уходу за кожей, обзоры продуктов и секреты K-Beauty</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 28 }}>
        {BLOG_POSTS.map(post => (
          <button key={post.id} onClick={() => navigate("blogPost", { slug: post.slug })} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, overflow: "hidden", cursor: "pointer", textAlign: "left", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.1)"; e.currentTarget.style.transform="translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow=""; e.currentTarget.style.transform=""; }}>
            <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#f8f8f8" }}>
              <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%23f5f5f5' width='400' height='225'/%3E%3C/svg%3E"} />
            </div>
            <div style={{ padding: "18px" }}>
              <p style={{ fontSize: 11, color: RED, marginBottom: 6, fontWeight: 600 }}>{post.date}</p>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 8, lineHeight: 1.5 }}>{post.title}</h3>
              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage({ slug }) {
  const { navigate } = useRouter();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return <div style={{ textAlign: "center", padding: 80 }}><button onClick={() => navigate("blog")} style={{ background: RED, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 2, cursor: "pointer" }}>← Назад в блог</button></div>;
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px" }}>
      <button onClick={() => navigate("blog")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 14, marginBottom: 28, display: "flex", alignItems: "center", gap: 6 }}>← Назад в блог</button>
      <p style={{ fontSize: 12, color: RED, fontWeight: 600, marginBottom: 8 }}>{post.date}</p>
      <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, color: DARK, lineHeight: 1.2, marginBottom: 24 }}>{post.title}</h1>
      <img src={post.img} alt={post.title} style={{ width: "100%", borderRadius: 4, marginBottom: 32, maxHeight: 400, objectFit: "cover" }} />
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85 }}>{post.content}</p>
    </div>
  );
}

// ── STATIC PAGES ──────────────────────────────────────────────────────────────
function StaticPage({ title, children }) {
  const { navigate } = useRouter();
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#888", marginBottom: 28 }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 13 }}>Главная</button>
        <span>›</span>
        <span style={{ color: DARK }}>{title}</span>
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: DARK, marginBottom: 32 }}>{title}</h1>
      {children}
    </div>
  );
}

function DeliveryPage() {
  return (
    <StaticPage title="Доставка">
      {[
        { title: "Курьерская доставка", icon: "🚚", lines: ["Доставка по Москве: 1–2 рабочих дня, стоимость 350 ₽", "Доставка по России: 3–7 рабочих дней, стоимость от 350 ₽", "Бесплатно при заказе от 5000 ₽"] },
        { title: "Пункты выдачи", icon: "📦", lines: ["СДЭК, PickPoint, Boxberry", "Доступно по всей России", "Бесплатно при заказе от 3000 ₽, иначе 150 ₽"] },
        { title: "Почта России", icon: "✉️", lines: ["Доставка 7–21 рабочих дней", "Стоимость от 200 ₽", "Отслеживание по трек-номеру"] },
      ].map(s => (
        <div key={s.title} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "22px", marginBottom: 16, display: "flex", gap: 16 }}>
          <span style={{ fontSize: 32, flexShrink: 0 }}>{s.icon}</span>
          <div><h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>{s.lines.map((l,i) => <p key={i} style={{ fontSize: 14, color: "#555", marginBottom: 4, lineHeight: 1.6 }}>• {l}</p>)}</div>
        </div>
      ))}
    </StaticPage>
  );
}

function PaymentPage() {
  return (
    <StaticPage title="Оплата">
      {[
        { title: "Банковская карта", icon: "💳", desc: "Visa, Mastercard, МИР. Оплата через защищённый шлюз. Безопасно и мгновенно." },
        { title: "СБП", icon: "📱", desc: "Система быстрых платежей. Оплата по QR-коду из любого банка без комиссии." },
        { title: "Наличные при получении", icon: "💵", desc: "Оплата курьеру наличными или картой при доставке." },
        { title: "Яндекс Пэй / SberPay", icon: "⚡", desc: "Быстрая оплата через сохранённые карты в популярных сервисах." },
      ].map(m => (
        <div key={m.title} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "20px", marginBottom: 12, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</span>
          <div><h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{m.title}</h3><p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{m.desc}</p></div>
        </div>
      ))}
    </StaticPage>
  );
}

function ExchangePage() {
  return (
    <StaticPage title="Обмен и возврат">
      <div style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>
        <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 4, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ fontWeight: 600, color: "#1a7a2e", marginBottom: 4 }}>✓ Возврат в течение 14 дней</p>
          <p>Мы принимаем возврат товара надлежащего качества в течение 14 дней с момента получения.</p>
        </div>
        {[["Условия возврата","Товар должен быть в оригинальной упаковке, не вскрытым и без следов использования. Сохраните чек и упаковку."],["Как оформить возврат","1. Свяжитесь с нами по телефону 8-800-600-17-85 или email hello@thesaemcosmetic.ru\n2. Опишите причину возврата\n3. Отправьте товар по указанному адресу\n4. После получения и проверки — возврат средств за 3–10 рабочих дней"],["Нет возврату","Парфюмерия и косметические средства после вскрытия возврату не подлежат согласно Постановлению Правительства РФ."]].map(([h,t]) => (
          <div key={h} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 8 }}>{h}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{t}</p>
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

function FAQPage() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["Как использовать промокод WELCOME10?", "При оформлении заказа введите промокод WELCOME10 в поле «Промокод». Скидка 10% применится автоматически. Действует только на первый заказ."],
    ["Как работает бонусная программа?", "За каждую покупку вы получаете 1% от суммы бонусами. 1 бонус = 1 рубль. Бонусами можно оплатить до 30% стоимости заказа. При регистрации начисляем 100 приветственных бонусов."],
    ["Какие пробники я получу?", "Пробники подбираются по сезону и наличию на складе. Как правило, 2–3 пробника корейской косметики THE SAEM."],
    ["Можно ли вернуть вскрытый товар?", "К сожалению, вскрытая косметика возврату не подлежит согласно закону о защите прав потребителей (Постановление Правительства РФ №55)."],
    ["Как отслеживать заказ?", "После отправки заказа вы получите трек-номер на email. Отслеживание доступно на сайте службы доставки. Также статус можно проверить в личном кабинете."],
    ["Есть ли самовывоз?", "Самовывоз из нашего офиса недоступен. Доставка только через курьерские службы и пункты выдачи по всей России."],
  ];
  return (
    <StaticPage title="Вопросы и ответы">
      {faqs.map(([q, a], i) => (
        <div key={i} style={{ border: "1px solid #f0f0f0", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <button onClick={() => setOpen(open===i ? null : i)} style={{ width: "100%", textAlign: "left", background: open===i ? "#fdf5f5" : "#fff", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 600, color: DARK }}>
            {q} <span style={{ fontSize: 20, color: RED, transition: "transform 0.3s", transform: open===i ? "rotate(45deg)" : "none" }}>+</span>
          </button>
          {open === i && <div style={{ padding: "4px 20px 16px", fontSize: 14, color: "#555", lineHeight: 1.7 }}>{a}</div>}
        </div>
      ))}
    </StaticPage>
  );
}

function AboutPage() {
  const { navigate } = useRouter();
  return (
    <StaticPage title="О компании">
      <div style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>
        <div style={{ background: "linear-gradient(135deg,#1a1a1a,#2d2d2d)", borderRadius: 4, padding: "36px", color: "#fff", marginBottom: 32, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 180, height: 180, background: `rgba(200,16,46,0.2)`, borderRadius: "50%" }} />
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: RED, textTransform: "uppercase", marginBottom: 8 }}>Официальный магазин</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 10 }}>THE SAEM Russia</h2>
          <p style={{ color: "#aaa", maxWidth: 500, lineHeight: 1.7 }}>Мы — официальный дистрибьютор корейского бренда THE SAEM на территории России. Гарантируем подлинность каждого товара.</p>
        </div>
        {[["🏆 Награды","Korea Prestige Brand Awards 3 года подряд (2017–2019). Гран-при Consumer Beauty Awards от Glowpick в категориях Крем, Очищающие салфетки, База и Пудра. #1 в категории консилеров 5 лет подряд."],["🌿 Философия","The Saem верит, что здоровая красота начинается с природы. Бренд использует уникальные природные ингредиенты со всего мира: харакеке из Новой Зеландии, варратах из Австралии, ледниковую воду Исландии, каламанси с Филиппин."],["📦 Гарантия качества","Все товары поставляются напрямую от производителя. Мы гарантируем 100% оригинальную продукцию с действующим сроком годности и официальной русской маркировкой."]].map(([h,t]) => (
          <div key={h} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 10 }}>{h}</h3>
            <p>{t}</p>
          </div>
        ))}
        <div style={{ background: "#fdf5f5", borderRadius: 4, padding: "24px", marginTop: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Контакты</h3>
          <p>📞 8-800-600-17-85 (бесплатно)</p>
          <p>📧 hello@thesaemcosmetic.ru</p>
          <p>📍 г. Москва, Измайловский проезд, д. 11, офис 7-10</p>
          <p>⏰ Пн–Пт: 10:00–19:00</p>
        </div>
      </div>
    </StaticPage>
  );
}

function BonusPage() {
  return (
    <StaticPage title="Бонусная программа">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
        {[["100 бонусов","За регистрацию","🎁"],["1% кэшбека","С каждого заказа","💰"],["До 30%","Оплаты бонусами","✨"],["Не сгорают","В течение года","🔒"]].map(([v,l,ic]) => (
          <div key={v} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 4, padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{ic}</div>
            <p style={{ fontSize: 22, fontWeight: 900, color: RED, marginBottom: 4 }}>{v}</p>
            <p style={{ fontSize: 13, color: "#777" }}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 10 }}>Как это работает?</h3>
        <p style={{ marginBottom: 8 }}>1. Зарегистрируйтесь — получите 100 приветственных бонусов</p>
        <p style={{ marginBottom: 8 }}>2. Совершайте покупки — начисляем 1% от суммы заказа</p>
        <p style={{ marginBottom: 8 }}>3. Тратьте бонусы — оплачивайте ими до 30% стоимости</p>
        <p>1 бонус = 1 рубль. Бонусы действительны 12 месяцев с последней активности.</p>
      </div>
    </StaticPage>
  );
}

// ── ROUTER ────────────────────────────────────────────────────────────────────
function AppRouter() {
  const { page } = useRouter();
  const { addToCart } = useCart();

  switch (page.name) {
    case "home": return <HomePage />;
    case "catalog": return <CatalogPage category={page.params.category} search={page.params.search} />;
    case "product": return <ProductPage slug={page.params.slug} />;
    case "cart": return <CartPage />;
    case "account": return <AccountPage />;
    case "blog": return <BlogPage />;
    case "blogPost": return <BlogPostPage slug={page.params.slug} />;
    case "delivery": return <DeliveryPage />;
    case "payment": return <PaymentPage />;
    case "exchange": return <ExchangePage />;
    case "faq": return <FAQPage />;
    case "about": return <AboutPage />;
    case "bonus": return <BonusPage />;
    default: return <HomePage />;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", background: "#fff" }}>
          <style>{`
            * { box-sizing: border-box; margin: 0; padding: 0 }
            @media (max-width: 900px) { .desk-nav { display: none !important } .mob-btn { display: flex !important } }
            @media (max-width: 768px) { .catalog-sidebar { display: none } }
          `}</style>
          <AnnouncementBar />
          <Header />
          <main><AppRouter /></main>
          <Footer />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}
