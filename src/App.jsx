import { useState } from "react";

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  ru: {
    nav: { services:"Услуги", about:"О мастере", reviews:"Отзывы", calendar:"Запись", contacts:"Контакты", login:"Войти", cabinet:"Кабинет", logout:"Выйти" },
    hero: { badge:"Профессиональный ремонт", title:"Ремонт кухонной\nтехники на дому", sub:"Быстро, качественно, с гарантией. Мастер Борис выедет к вам в удобное время.", cta:"Записаться на ремонт", cta2:"Узнать цены" },
    services: { title:"Услуги и цены", sub:"Прозрачное ценообразование без скрытых доплат" },
    about: { title:"О мастере", name:"Борис Иванов", role:"Мастер по ремонту бытовой техники", exp:"15+ лет опыта", desc:"Занимаюсь ремонтом кухонной техники с 2008 года. Работаю с любыми брендами — Bosch, Samsung, LG, Siemens, Gorenje и другими. Выезд на дом, диагностика при вас, честная оценка стоимости до начала работ.", stats:[{v:"1200+",l:"ремонтов"},{v:"98%",l:"довольных клиентов"},{v:"15",l:"лет опыта"},{v:"12 мес",l:"гарантия"}] },
    reviews: { title:"Отзывы клиентов", sub:"Реальные отзывы от реальных людей" },
    calendar: { title:"Запись на ремонт", sub:"Выберите удобный день и время", legend:["Свободно","Занято","Выходной"], book:"Забронировать", modal:{ title:"Запись на", name:"Ваше имя", phone:"Телефон", device:"Техника (напр. стиральная машина)", confirm:"Подтвердить запись", cancel:"Отмена", success:"Вы записаны! Борис свяжется с вами для подтверждения.", slots:"Выберите время" }, days:["Пн","Вт","Ср","Чт","Пт","Сб","Вс"], months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"] },
    contacts: { title:"Контакты", phone:"Телефон", address:"Адрес", hours:"Режим работы", hoursVal:"Пн–Пт: 9:00–19:00", addr:"Москва и область", emergency:"Срочный вызов" },
    auth: {
      title:"Войти в кабинет", sub:"Выберите способ входа",
      phone:"Телефон", email:"Email", google:"Войти через Google",
      phonePlaceholder:"+7 (___) ___-__-__", emailPlaceholder:"email@example.com",
      passPlaceholder:"Пароль", sendCode:"Получить код", enterCode:"Введите код из SMS",
      codePlaceholder:"_ _ _ _", verify:"Подтвердить", loginBtn:"Войти",
      orEmail:"или по email", noAcc:"Нет аккаунта?", reg:"Зарегистрироваться",
      haveAcc:"Уже есть аккаунт?", demoHint:"Демо: введите любой код"
    },
    cabinet: {
      title:"Личный кабинет", hello:"Привет,",
      tabs:["Профиль","История заказов","Адреса","Реферальная программа"],
      profile:{ title:"Настройки профиля", name:"Имя", phone:"Телефон", email:"Email", save:"Сохранить" },
      orders:{ title:"История заказов", empty:"У вас пока нет заказов", status:["Завершён","В работе","Ожидает"] },
      addresses:{ title:"Сохранённые адреса", add:"Добавить адрес", placeholder:"Введите адрес...", save:"Сохранить", delete:"Удалить", empty:"Нет сохранённых адресов" },
      referral:{
        title:"Реферальная программа", balance:"Ваш баланс", earned:"Заработано всего",
        refs:"Приглашённых клиентов", reward:"за каждого клиента, сделавшего заказ",
        link:"Ваша реферальная ссылка", copy:"Копировать", copied:"Скопировано!",
        share:"Поделиться", howTitle:"Как это работает?",
        steps:["Поделитесь своей ссылкой с друзьями","Друг переходит по ссылке и бронирует ремонт","Борис выполняет заказ","Вы получаете $25 на баланс"],
        history:"История начислений", noHistory:"Начислений пока нет",
        invite:"Пригласить друзей"
      }
    },
    lang:"EN",
  },
  en: {
    nav: { services:"Services", about:"About", reviews:"Reviews", calendar:"Book", contacts:"Contacts", login:"Sign In", cabinet:"Cabinet", logout:"Sign Out" },
    hero: { badge:"Professional Repair", title:"Home Appliance\nRepair Service", sub:"Fast, quality service with warranty. Master Boris will come at a convenient time.", cta:"Book a Repair", cta2:"See Prices" },
    services: { title:"Services & Prices", sub:"Transparent pricing with no hidden fees" },
    about: { title:"About the Master", name:"Boris Ivanov", role:"Home Appliance Repair Technician", exp:"15+ years of experience", desc:"Repairing kitchen appliances since 2008. Working with all brands — Bosch, Samsung, LG, Siemens, Gorenje and more. Home visits, on-site diagnostics, honest estimate before work begins.", stats:[{v:"1200+",l:"repairs"},{v:"98%",l:"satisfied clients"},{v:"15",l:"years exp."},{v:"12 mo",l:"warranty"}] },
    reviews: { title:"Client Reviews", sub:"Real reviews from real people" },
    calendar: { title:"Book a Repair", sub:"Choose a convenient day and time", legend:["Available","Booked","Day off"], book:"Book", modal:{ title:"Book for", name:"Your name", phone:"Phone", device:"Appliance (e.g. washing machine)", confirm:"Confirm booking", cancel:"Cancel", success:"You're booked! Boris will contact you to confirm.", slots:"Choose time" }, days:["Mo","Tu","We","Th","Fr","Sa","Su"], months:["January","February","March","April","May","June","July","August","September","October","November","December"] },
    contacts: { title:"Contacts", phone:"Phone", address:"Address", hours:"Working hours", hoursVal:"Mon–Fri: 9:00–19:00", addr:"Moscow & region", emergency:"Emergency call" },
    auth: {
      title:"Sign In", sub:"Choose sign in method",
      phone:"Phone", email:"Email", google:"Sign in with Google",
      phonePlaceholder:"+7 (___) ___-__-__", emailPlaceholder:"email@example.com",
      passPlaceholder:"Password", sendCode:"Send Code", enterCode:"Enter SMS code",
      codePlaceholder:"_ _ _ _", verify:"Verify", loginBtn:"Sign In",
      orEmail:"or with email", noAcc:"No account?", reg:"Register",
      haveAcc:"Have an account?", demoHint:"Demo: enter any code"
    },
    cabinet: {
      title:"My Account", hello:"Hello,",
      tabs:["Profile","Order History","Addresses","Referral Program"],
      profile:{ title:"Profile Settings", name:"Name", phone:"Phone", email:"Email", save:"Save" },
      orders:{ title:"Order History", empty:"No orders yet", status:["Completed","In progress","Pending"] },
      addresses:{ title:"Saved Addresses", add:"Add address", placeholder:"Enter address...", save:"Save", delete:"Delete", empty:"No saved addresses" },
      referral:{
        title:"Referral Program", balance:"Your balance", earned:"Total earned",
        refs:"Referred clients", reward:"for each client who places an order",
        link:"Your referral link", copy:"Copy", copied:"Copied!",
        share:"Share", howTitle:"How it works?",
        steps:["Share your link with friends","Friend opens the link and books a repair","Boris completes the order","You receive $25 to your balance"],
        history:"Earnings history", noHistory:"No earnings yet",
        invite:"Invite friends"
      }
    },
    lang:"RU",
  }
};

const SERVICES = {
  ru:[
    {icon:"🧊",name:"Холодильник",items:[{s:"Диагностика",p:"Бесплатно"},{s:"Замена компрессора",p:"от 3 500 ₽"},{s:"Заправка фреоном",p:"от 2 000 ₽"},{s:"Устранение течи",p:"от 1 500 ₽"}]},
    {icon:"🍳",name:"Плита / духовка",items:[{s:"Диагностика",p:"Бесплатно"},{s:"Замена тэна",p:"от 1 800 ₽"},{s:"Ремонт конфорки",p:"от 1 200 ₽"},{s:"Замена термостата",p:"от 1 500 ₽"}]},
    {icon:"🫙",name:"Посудомойка",items:[{s:"Диагностика",p:"Бесплатно"},{s:"Чистка фильтров",p:"от 800 ₽"},{s:"Замена помпы",p:"от 2 500 ₽"},{s:"Ремонт ТЭНа",p:"от 2 000 ₽"}]},
    {icon:"📦",name:"Микроволновка",items:[{s:"Диагностика",p:"Бесплатно"},{s:"Замена магнетрона",p:"от 2 500 ₽"},{s:"Замена трансформатора",p:"от 1 800 ₽"},{s:"Ремонт платы",p:"от 1 500 ₽"}]},
  ],
  en:[
    {icon:"🧊",name:"Refrigerator",items:[{s:"Diagnostics",p:"Free"},{s:"Compressor replacement",p:"from $45"},{s:"Refrigerant refill",p:"from $30"},{s:"Leak repair",p:"from $20"}]},
    {icon:"🍳",name:"Stove / Oven",items:[{s:"Diagnostics",p:"Free"},{s:"Heating element",p:"from $25"},{s:"Burner repair",p:"from $18"},{s:"Thermostat replace",p:"from $22"}]},
    {icon:"🫙",name:"Dishwasher",items:[{s:"Diagnostics",p:"Free"},{s:"Filter cleaning",p:"from $12"},{s:"Pump replacement",p:"from $35"},{s:"Heater repair",p:"from $28"}]},
    {icon:"📦",name:"Microwave",items:[{s:"Diagnostics",p:"Free"},{s:"Magnetron replace",p:"from $35"},{s:"Transformer replace",p:"from $28"},{s:"Board repair",p:"from $22"}]},
  ]
};

const REVIEWS = {
  ru:[
    {name:"Анна К.",stars:5,text:"Борис приехал в тот же день, быстро нашёл причину поломки холодильника. Цена честная, результат отличный!",date:"12 фев 2025"},
    {name:"Михаил Д.",stars:5,text:"Ремонтировал духовку Bosch. Мастер знает своё дело, всё объяснил понятно. Рекомендую!",date:"3 мар 2025"},
    {name:"Светлана В.",stars:5,text:"Посудомойка перестала сливать воду. Борис приехал через 2 часа, починил за 40 минут. Спасибо!",date:"18 янв 2025"},
    {name:"Игорь П.",stars:4,text:"Хороший мастер, профессиональный подход. Чуть задержался, но предупредил заранее. Всё работает.",date:"27 фев 2025"},
  ],
  en:[
    {name:"Anna K.",stars:5,text:"Boris came the same day, quickly found the fridge issue. Fair price, excellent result!",date:"Feb 12, 2025"},
    {name:"Michael D.",stars:5,text:"Fixed our Bosch oven. The master knows his craft, explained everything clearly. Highly recommend!",date:"Mar 3, 2025"},
    {name:"Svetlana V.",stars:5,text:"Dishwasher stopped draining. Boris arrived in 2 hours, fixed it in 40 minutes. Thank you!",date:"Jan 18, 2025"},
    {name:"Igor P.",stars:4,text:"Good master, professional approach. Slightly late but warned in advance. Everything works great.",date:"Feb 27, 2025"},
  ]
};

const DEMO_ORDERS = {
  ru:[
    {id:"#1042",date:"14 фев 2025",device:"Холодильник Samsung",addr:"ул. Ленина, 12",price:"3 500 ₽",status:0},
    {id:"#987",date:"3 янв 2025",device:"Посудомойка Bosch",addr:"пр. Мира, 45",price:"2 800 ₽",status:0},
    {id:"#1055",date:"1 мар 2025",device:"Плита Gorenje",addr:"ул. Ленина, 12",price:"",status:1},
  ],
  en:[
    {id:"#1042",date:"Feb 14, 2025",device:"Samsung Refrigerator",addr:"Lenin St, 12",price:"$45",status:0},
    {id:"#987",date:"Jan 3, 2025",device:"Bosch Dishwasher",addr:"Mira Ave, 45",price:"$38",status:0},
    {id:"#1055",date:"Mar 1, 2025",device:"Gorenje Stove",addr:"Lenin St, 12",price:"",status:1},
  ]
};

const DEMO_REFERRALS = {
  ru:[
    {name:"Друг Алексей",date:"10 янв 2025",amount:25,status:"Начислено"},
    {name:"Подруга Мария",date:"3 фев 2025",amount:25,status:"Начислено"},
  ],
  en:[
    {name:"Friend Alex",date:"Jan 10, 2025",amount:25,status:"Credited"},
    {name:"Friend Maria",date:"Feb 3, 2025",amount:25,status:"Credited"},
  ]
};

const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
function getBusy(dateStr) {
  let h=0; for(let i=0;i<dateStr.length;i++) h=(h*31+dateStr.charCodeAt(i))&0xffff;
  return HOURS.filter((_,i)=>((h>>i)&1)&&i%3!==0).slice(0,3);
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:#f7f8fa;color:#1a2333}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#d0d5dd;border-radius:3px}

  .nav{background:#fff;border-bottom:1px solid #e8edf2;position:sticky;top:0;z-index:100;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:64px}
  .nav-logo{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:800;color:#1a2333;text-decoration:none;cursor:pointer}
  .nav-logo span{color:#e85d26}
  .nav-links{display:flex;gap:4px;align-items:center}
  .nav-links button{background:none;border:none;font-family:inherit;font-size:14px;font-weight:500;color:#4a5568;padding:8px 12px;cursor:pointer;border-radius:6px;transition:all .15s}
  .nav-links button:hover{background:#f0f4ff;color:#1a2333}
  .nav-links button.active{color:#e85d26}
  .nav-cta{background:#e85d26!important;color:#fff!important;font-weight:600!important;border-radius:6px!important}
  .nav-cta:hover{background:#d04d18!important}
  .lang-btn{background:#f0f4ff;color:#1a2333;border:none;font-family:inherit;font-size:12px;font-weight:700;padding:6px 12px;border-radius:6px;cursor:pointer;margin-left:4px;letter-spacing:.5px}

  .hero{background:linear-gradient(135deg,#0f2044 0%,#1a3a6e 60%,#0f2044 100%);padding:80px 24px;text-align:center;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")}
  .hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(232,93,38,.15);border:1px solid rgba(232,93,38,.3);color:#ff8c5a;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:24px;letter-spacing:.5px}
  .hero h1{font-size:clamp(32px,5vw,56px);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;white-space:pre-line}
  .hero p{font-size:17px;color:rgba(255,255,255,.75);max-width:540px;margin:0 auto 36px;line-height:1.6}
  .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn-primary{background:#e85d26;color:#fff;border:none;font-family:inherit;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;cursor:pointer;transition:all .15s}
  .btn-primary:hover{background:#d04d18;transform:translateY(-1px)}
  .btn-secondary{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.25);font-family:inherit;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;cursor:pointer;transition:all .15s}
  .btn-secondary:hover{background:rgba(255,255,255,.18)}
  .hero-stats{display:flex;gap:32px;justify-content:center;margin-top:48px;flex-wrap:wrap}
  .hero-stat-v{font-size:28px;font-weight:800;color:#fff}
  .hero-stat-l{font-size:13px;color:rgba(255,255,255,.55);margin-top:2px;text-align:center}

  .section{max-width:1100px;margin:0 auto;padding:72px 24px}
  .sec-title{font-size:clamp(24px,3vw,36px);font-weight:800;color:#1a2333;margin-bottom:8px}
  .sec-sub{font-size:16px;color:#718096;margin-bottom:48px}

  .services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px}
  .service-card{background:#fff;border:1px solid #e8edf2;border-radius:12px;padding:24px;transition:box-shadow .2s,transform .2s}
  .service-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.08);transform:translateY(-2px)}
  .service-icon{font-size:36px;margin-bottom:12px}
  .service-name{font-size:17px;font-weight:700;color:#1a2333;margin-bottom:16px}
  .service-item{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f4f8;font-size:14px}
  .service-item:last-child{border-bottom:none}
  .service-item-name{color:#4a5568}
  .service-item-price{font-weight:600;color:#e85d26}

  .about-wrap{display:grid;grid-template-columns:1fr 2fr;gap:48px;align-items:center}
  @media(max-width:700px){.about-wrap{grid-template-columns:1fr}}
  .about-avatar{width:100%;aspect-ratio:.85;border-radius:16px;overflow:hidden;background:#0f2044}
  .about-avatar img{width:100%;height:100%;object-fit:cover;object-position:top}
  .about-badge{display:inline-flex;align-items:center;gap:6px;background:#fff3ee;color:#e85d26;font-size:13px;font-weight:600;padding:5px 12px;border-radius:20px;margin-bottom:16px}
  .about-name{font-size:28px;font-weight:800;color:#1a2333;margin-bottom:4px}
  .about-role{font-size:15px;color:#718096;margin-bottom:16px}
  .about-desc{font-size:15px;color:#4a5568;line-height:1.7;margin-bottom:28px}
  .about-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  @media(max-width:500px){.about-stats{grid-template-columns:repeat(2,1fr)}}
  .about-stat{background:#f7f8fa;border-radius:10px;padding:16px;text-align:center}
  .about-stat-v{font-size:22px;font-weight:800;color:#1a2333}
  .about-stat-l{font-size:12px;color:#718096;margin-top:2px}

  .reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
  .review-card{background:#fff;border:1px solid #e8edf2;border-radius:12px;padding:24px}
  .review-stars{color:#f6a623;font-size:16px;margin-bottom:12px}
  .review-text{font-size:14px;color:#4a5568;line-height:1.65;margin-bottom:16px}
  .review-footer{display:flex;justify-content:space-between;align-items:center}
  .review-name{font-size:14px;font-weight:600;color:#1a2333}
  .review-date{font-size:12px;color:#a0aec0}

  .cal-wrap{background:#fff;border:1px solid #e8edf2;border-radius:16px;overflow:hidden}
  .cal-header{background:#0f2044;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:16px 24px}
  .cal-title{font-size:18px;font-weight:700}
  .cal-nav-btn{background:rgba(255,255,255,.15);border:none;color:#fff;width:32px;height:32px;border-radius:6px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:background .15s}
  .cal-nav-btn:hover{background:rgba(255,255,255,.25)}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr)}
  .cal-dow{text-align:center;padding:10px 4px;font-size:12px;font-weight:600;color:#718096;background:#f7f8fa;border-bottom:1px solid #e8edf2}
  .cal-day{min-height:80px;padding:8px;border-right:1px solid #f0f4f8;border-bottom:1px solid #f0f4f8;cursor:pointer;transition:background .15s}
  .cal-day:nth-child(7n){border-right:none}
  .cal-day:hover:not(.cal-off):not(.cal-other){background:#f0f4ff}
  .cal-day.cal-off{background:#fafafa;cursor:default}
  .cal-day.cal-other{opacity:.35;cursor:default}
  .cal-day.cal-today .cal-dn{background:#e85d26;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center}
  .cal-day.cal-selected{background:#eef2ff;outline:2px solid #4361ee;outline-offset:-2px}
  .cal-dn{font-size:13px;font-weight:500;color:#1a2333;width:26px;height:26px;display:flex;align-items:center;justify-content:center}
  .cal-off .cal-dn{color:#a0aec0}
  .cal-dot-wrap{margin-top:4px;display:flex;flex-wrap:wrap;gap:3px}
  .cal-dot{width:6px;height:6px;border-radius:50%;background:#e85d26}
  .cal-dot.booked{background:#a0aec0}
  .cal-legend{display:flex;gap:20px;padding:14px 24px;background:#f7f8fa;border-top:1px solid #e8edf2;flex-wrap:wrap}
  .cal-leg-item{display:flex;align-items:center;gap:6px;font-size:13px;color:#718096}
  .cal-leg-dot{width:10px;height:10px;border-radius:50%}
  .slots-wrap{margin-top:24px}
  .slots-title{font-size:15px;font-weight:600;color:#1a2333;margin-bottom:12px}
  .slots-grid{display:flex;flex-wrap:wrap;gap:8px}
  .slot{padding:8px 14px;border:1px solid #e8edf2;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;background:#fff;color:#1a2333}
  .slot:hover:not(.slot-busy){background:#f0f4ff;border-color:#4361ee;color:#4361ee}
  .slot.slot-busy{background:#f7f8fa;color:#a0aec0;cursor:default;text-decoration:line-through}
  .slot.slot-sel{background:#e85d26;border-color:#e85d26;color:#fff}

  .contacts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
  .contact-card{background:#fff;border:1px solid #e8edf2;border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:8px}
  .contact-icon{font-size:28px}
  .contact-label{font-size:12px;font-weight:600;color:#718096;text-transform:uppercase;letter-spacing:.6px}
  .contact-val{font-size:16px;font-weight:700;color:#1a2333}
  .contact-sub{font-size:13px;color:#718096}

  .auth-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px}
  .auth-box{background:#fff;border-radius:20px;padding:36px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.15);position:relative}
  .auth-logo{text-align:center;font-size:28px;font-weight:800;color:#1a2333;margin-bottom:4px}
  .auth-logo span{color:#e85d26}
  .auth-sub{text-align:center;font-size:14px;color:#718096;margin-bottom:28px}
  .auth-method{display:flex;align-items:center;gap:10px;padding:13px 16px;border:1px solid #e2e8f0;border-radius:10px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:500;background:#fff;color:#1a2333;transition:all .15s;width:100%}
  .auth-method:hover{border-color:#4361ee;background:#f0f4ff}
  .auth-method.active{border-color:#e85d26;background:#fff3ee;color:#e85d26}
  .auth-divider{display:flex;align-items:center;gap:12px;margin:16px 0;color:#a0aec0;font-size:13px}
  .auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:#e2e8f0}
  .auth-input{width:100%;padding:11px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:14px;outline:none;margin-bottom:10px;transition:border .15s}
  .auth-input:focus{border-color:#4361ee}
  .auth-btn{width:100%;padding:13px;background:#e85d26;color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .15s;margin-top:4px}
  .auth-btn:hover{background:#d04d18}
  .auth-btn.secondary{background:#f7f8fa;color:#4a5568;border:1px solid #e2e8f0;margin-top:8px}
  .auth-btn.secondary:hover{background:#e8edf2}
  .auth-hint{text-align:center;font-size:13px;color:#718096;margin-top:12px}
  .auth-hint span{color:#e85d26;cursor:pointer;font-weight:600}
  .auth-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#a0aec0;line-height:1}
  .auth-demo-hint{background:#fff3ee;border:1px solid #fcd9c8;border-radius:8px;padding:10px 14px;font-size:12px;color:#e85d26;margin-bottom:12px;text-align:center}
  .otp-inputs{display:flex;gap:10px;justify-content:center;margin-bottom:16px}
  .otp-input{width:52px;height:56px;border:1px solid #e2e8f0;border-radius:8px;text-align:center;font-size:22px;font-weight:700;font-family:inherit;outline:none;transition:border .15s}
  .otp-input:focus{border-color:#e85d26}

  .cabinet-wrap{max-width:1100px;margin:0 auto;padding:40px 24px}
  .cabinet-header{display:flex;align-items:center;gap:16px;margin-bottom:32px}
  .cabinet-avatar{width:56px;height:56px;background:linear-gradient(135deg,#e85d26,#ff8c5a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;font-weight:700;flex-shrink:0}
  .cabinet-name{font-size:22px;font-weight:800;color:#1a2333}
  .cabinet-email{font-size:14px;color:#718096}
  .cab-tabs{display:flex;gap:4px;background:#fff;border:1px solid #e8edf2;border-radius:12px;padding:6px;margin-bottom:28px;flex-wrap:wrap}
  .cab-tab{flex:1;min-width:120px;padding:10px 14px;border:none;background:none;font-family:inherit;font-size:14px;font-weight:500;color:#718096;cursor:pointer;border-radius:8px;transition:all .15s;text-align:center}
  .cab-tab:hover{background:#f7f8fa;color:#1a2333}
  .cab-tab.active{background:#e85d26;color:#fff;font-weight:600}
  .cab-card{background:#fff;border:1px solid #e8edf2;border-radius:12px;padding:28px}
  .cab-card-title{font-size:18px;font-weight:700;color:#1a2333;margin-bottom:20px}
  .field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
  @media(max-width:500px){.field-row{grid-template-columns:1fr}}
  .field label{display:block;font-size:13px;font-weight:600;color:#4a5568;margin-bottom:6px}
  .field input{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:14px;outline:none;transition:border .15s}
  .field input:focus{border-color:#e85d26}
  .save-btn{background:#e85d26;color:#fff;border:none;font-family:inherit;font-size:14px;font-weight:600;padding:11px 24px;border-radius:8px;cursor:pointer;margin-top:8px}
  .save-btn:hover{background:#d04d18}
  .order-row{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid #f0f4f8}
  .order-row:last-child{border-bottom:none}
  .order-id{font-size:13px;font-weight:700;color:#4361ee;min-width:52px}
  .order-info{flex:1}
  .order-device{font-size:14px;font-weight:600;color:#1a2333}
  .order-meta{font-size:12px;color:#a0aec0;margin-top:2px}
  .order-price{font-size:15px;font-weight:700;color:#1a2333;min-width:60px;text-align:right}
  .order-status{font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px}
  .status-0{background:#e8f5e9;color:#2e7d32}
  .status-1{background:#fff3e0;color:#e65100}
  .status-2{background:#e3f2fd;color:#1565c0}
  .addr-row{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #f0f4f8}
  .addr-row:last-child{border-bottom:none}
  .addr-text{flex:1;font-size:14px;color:#1a2333}
  .addr-del{background:none;border:none;color:#e85d26;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit}
  .addr-add-row{display:flex;gap:10px;margin-top:16px}
  .addr-input{flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:14px;outline:none}
  .addr-input:focus{border-color:#e85d26}
  .addr-save-btn{background:#e85d26;color:#fff;border:none;font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;cursor:pointer}

  .ref-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px}
  @media(max-width:500px){.ref-stats{grid-template-columns:1fr}}
  .ref-stat{background:#f7f8fa;border-radius:12px;padding:20px;text-align:center;border:1px solid #e8edf2}
  .ref-stat.highlight{background:linear-gradient(135deg,#0f2044,#1a3a6e);border:none}
  .ref-stat-v{font-size:28px;font-weight:800;color:#1a2333}
  .ref-stat.highlight .ref-stat-v{color:#fff}
  .ref-stat-l{font-size:13px;color:#718096;margin-top:4px}
  .ref-stat.highlight .ref-stat-l{color:rgba(255,255,255,.65)}
  .ref-link-box{background:#f7f8fa;border:1px solid #e8edf2;border-radius:10px;display:flex;align-items:center;gap:10px;padding:12px 16px;margin-bottom:28px}
  .ref-link-text{flex:1;font-size:13px;color:#4a5568;font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ref-copy-btn{background:#e85d26;color:#fff;border:none;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;cursor:pointer;white-space:nowrap}
  .ref-copy-btn.copied{background:#2e7d32}
  .ref-steps{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:28px}
  @media(max-width:500px){.ref-steps{grid-template-columns:1fr}}
  .ref-step{display:flex;gap:12px;align-items:flex-start;background:#f7f8fa;border-radius:10px;padding:16px}
  .ref-step-num{width:28px;height:28px;background:#e85d26;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
  .ref-step-text{font-size:13px;color:#4a5568;line-height:1.5}
  .ref-history-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f0f4f8}
  .ref-history-row:last-child{border-bottom:none}
  .ref-h-name{font-size:14px;color:#1a2333;font-weight:500}
  .ref-h-date{font-size:12px;color:#a0aec0}
  .ref-h-amount{font-size:15px;font-weight:700;color:#2e7d32}
  .ref-reward-badge{display:inline-flex;align-items:center;gap:6px;background:#e8f5e9;color:#2e7d32;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;margin-bottom:20px}

  .footer{background:#0f2044;color:rgba(255,255,255,.6);text-align:center;padding:24px;font-size:13px}
  .footer span{color:#e85d26;font-weight:600}

  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:150;display:flex;align-items:center;justify-content:center;padding:16px}
  .modal{background:#fff;border-radius:16px;padding:32px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.15)}
  .modal h3{font-size:20px;font-weight:700;color:#1a2333;margin-bottom:20px}
  .modal-field{margin-bottom:16px}
  .modal-field label{display:block;font-size:13px;font-weight:600;color:#4a5568;margin-bottom:6px}
  .modal-field input{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:14px;outline:none;transition:border .15s}
  .modal-field input:focus{border-color:#4361ee}
  .modal-btns{display:flex;gap:10px;margin-top:20px}
  .modal-confirm{flex:1;background:#e85d26;color:#fff;border:none;font-family:inherit;font-size:14px;font-weight:600;padding:12px;border-radius:8px;cursor:pointer}
  .modal-cancel{flex:1;background:#f7f8fa;color:#4a5568;border:1px solid #e2e8f0;font-family:inherit;font-size:14px;font-weight:600;padding:12px;border-radius:8px;cursor:pointer}
  .modal-success{text-align:center;padding:16px 0}
  .modal-success .ok-icon{font-size:52px;margin-bottom:12px}

  @media(max-width:600px){
    .nav-links button:not(.nav-cta):not(.lang-btn){display:none}
    .cal-day{min-height:48px;padding:4px}
    .cal-dot{display:none}
  }
`;

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = T[lang];
  const [section, setSection] = useState("hero");

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("phone");
  const [authStep, setAuthStep] = useState(1);
  const [authPhone, setAuthPhone] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authOtp, setAuthOtp] = useState(["","","",""]);
  const [isRegister, setIsRegister] = useState(false);
  const [showCabinet, setShowCabinet] = useState(false);

  const [cabTab, setCabTab] = useState(0);
  const [profile, setProfile] = useState({name:"Алексей Смирнов",phone:"+7 (999) 123-45-67",email:"alex@example.com"});
  const [addresses, setAddresses] = useState(["ул. Ленина, 12, кв. 34","пр. Мира, 45"]);
  const [newAddr, setNewAddr] = useState("");
  const [refCopied, setRefCopied] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);

  const [calDate, setCalDate] = useState(new Date());
  const [selDay, setSelDay] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [bookings, setBookings] = useState({});
  const [bookModal, setBookModal] = useState(false);
  const [bookForm, setBookForm] = useState({name:"",phone:"",device:""});
  const [bookSuccess, setBookSuccess] = useState(false);

  const y = calDate.getFullYear(), m = calDate.getMonth();
  const firstDow = (new Date(y,m,1).getDay()+6)%7;
  const dim = new Date(y,m+1,0).getDate();
  const dip = new Date(y,m,0).getDate();
  const today = new Date();
  const isWorkday = d => (new Date(y,m,d).getDay()+6)%7 < 5;
  const dateStr = d => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  let cells=[];
  for(let i=firstDow-1;i>=0;i--) cells.push({day:dip-i,cur:false});
  for(let i=1;i<=dim;i++) cells.push({day:i,cur:true});
  while(cells.length%7) cells.push({day:cells.length-dim-firstDow+1,cur:false});

  function handleGoogleLogin() {
    setUser({name:"Google User",email:"google@example.com",avatar:"G"});
    setShowAuth(false); setAuthStep(1);
  }
  function handleVerifyOtp() {
    setUser({name:isRegister?"Новый клиент":"Алексей Смирнов",email:authEmail||authPhone,avatar:"А"});
    setShowAuth(false); setAuthStep(1); setAuthOtp(["","","",""]);
  }
  function handleEmailLogin() {
    setUser({name:"Алексей Смирнов",email:authEmail,avatar:"А"});
    setShowAuth(false); setAuthStep(1);
  }
  function handleOtp(i, val) {
    if(!/^\d?$/.test(val)) return;
    const next=[...authOtp]; next[i]=val; setAuthOtp(next);
    if(val&&i<3) document.getElementById(`otp${i+1}`)?.focus();
  }

  const refLink = `https://boris-repair.ru/ref/${user?.name?.split(" ")[0]?.toLowerCase()||"user"}123`;
  function copyRef() { navigator.clipboard?.writeText(refLink); setRefCopied(true); setTimeout(()=>setRefCopied(false),2000); }

  const scrollTo = id => {
    setSection(id);
    setShowCabinet(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const busySlots = selDay ? [...getBusy(dateStr(selDay)), ...(bookings[dateStr(selDay)]||[])] : [];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={()=>scrollTo("hero")}>🔧 Мастер<span>Борис</span></div>
          <div className="nav-links">
            {!showCabinet && Object.entries({services:t.nav.services,reviews:t.nav.reviews,calendar:t.nav.calendar,referral:lang==="ru"?"Реферальная программа":"Referral",contacts:t.nav.contacts}).map(([k,v])=>(
              <button key={k} className={section===k?"active":""} onClick={()=>k==="referral"?document.getElementById("referral-banner")?.scrollIntoView({behavior:"smooth"}):scrollTo(k)}>{v}</button>
            ))}
            {user ? (
              <>
                <button className="nav-cta" onClick={()=>setShowCabinet(c=>!c)} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:22,height:22,background:"rgba(255,255,255,0.25)",borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{user.avatar}</span>
                  {t.nav.cabinet}
                </button>
                <button style={{background:"none",border:"1px solid #e2e8f0",borderRadius:6,padding:"6px 12px",fontSize:13,cursor:"pointer",color:"#718096",fontFamily:"inherit"}} onClick={()=>{setUser(null);setShowCabinet(false)}}>{t.nav.logout}</button>
              </>
            ) : (
              <button className="nav-cta" onClick={()=>setShowAuth(true)}>{t.nav.login}</button>
            )}
            <button className="lang-btn" onClick={()=>setLang(l=>l==="ru"?"en":"ru")}>{t.lang}</button>
          </div>
        </div>
      </nav>

      {/* CABINET */}
      {showCabinet && user && (
        <div className="cabinet-wrap">
          <div className="cabinet-header">
            <div className="cabinet-avatar">{user.avatar}</div>
            <div>
              <div className="cabinet-name">{t.cabinet.hello} {user.name}!</div>
              <div className="cabinet-email">{user.email}</div>
            </div>
          </div>
          <div className="cab-tabs">
            {t.cabinet.tabs.map((tb,i)=>(
              <button key={i} className={`cab-tab${cabTab===i?" active":""}`} onClick={()=>setCabTab(i)}>{tb}</button>
            ))}
          </div>
          {cabTab===0 && (
            <div className="cab-card">
              <div className="cab-card-title">{t.cabinet.profile.title}</div>
              <div className="field-row">
                <div className="field"><label>{t.cabinet.profile.name}</label><input value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/></div>
                <div className="field"><label>{t.cabinet.profile.phone}</label><input value={profile.phone} onChange={e=>setProfile(p=>({...p,phone:e.target.value}))}/></div>
              </div>
              <div className="field" style={{marginBottom:16}}><label>{t.cabinet.profile.email}</label><input value={profile.email} onChange={e=>setProfile(p=>({...p,email:e.target.value}))}/></div>
              <button className="save-btn" onClick={()=>{setSavedProfile(true);setTimeout(()=>setSavedProfile(false),2000)}}>{savedProfile?"✓ "+t.cabinet.profile.save+"!":t.cabinet.profile.save}</button>
            </div>
          )}
          {cabTab===1 && (
            <div className="cab-card">
              <div className="cab-card-title">{t.cabinet.orders.title}</div>
              {DEMO_ORDERS[lang].map((o,i)=>(
                <div key={i} className="order-row">
                  <div className="order-id">{o.id}</div>
                  <div className="order-info"><div className="order-device">{o.device}</div><div className="order-meta">{o.date} · {o.addr}</div></div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                    <span className={`order-status status-${o.status}`}>{t.cabinet.orders.status[o.status]}</span>
                    {o.price&&<div className="order-price">{o.price}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {cabTab===2 && (
            <div className="cab-card">
              <div className="cab-card-title">{t.cabinet.addresses.title}</div>
              {addresses.length===0&&<div style={{color:"#a0aec0",fontSize:14}}>{t.cabinet.addresses.empty}</div>}
              {addresses.map((a,i)=>(
                <div key={i} className="addr-row">
                  <span style={{fontSize:18}}>📍</span>
                  <div className="addr-text">{a}</div>
                  <button className="addr-del" onClick={()=>setAddresses(arr=>arr.filter((_,j)=>j!==i))}>{t.cabinet.addresses.delete}</button>
                </div>
              ))}
              <div className="addr-add-row">
                <input className="addr-input" placeholder={t.cabinet.addresses.placeholder} value={newAddr} onChange={e=>setNewAddr(e.target.value)}/>
                <button className="addr-save-btn" onClick={()=>{if(newAddr.trim()){setAddresses(a=>[...a,newAddr.trim()]);setNewAddr("")}}}>{t.cabinet.addresses.save}</button>
              </div>
            </div>
          )}
          {cabTab===3 && (
            <div className="cab-card">
              <div className="cab-card-title">{t.cabinet.referral.title}</div>
              <div className="ref-reward-badge">🎁 $25 {t.cabinet.referral.reward}</div>
              <div className="ref-stats">
                <div className="ref-stat highlight"><div className="ref-stat-v">$50</div><div className="ref-stat-l">{t.cabinet.referral.balance}</div></div>
                <div className="ref-stat"><div className="ref-stat-v">$50</div><div className="ref-stat-l">{t.cabinet.referral.earned}</div></div>
                <div className="ref-stat"><div className="ref-stat-v">2</div><div className="ref-stat-l">{t.cabinet.referral.refs}</div></div>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:"#4a5568",marginBottom:8}}>{t.cabinet.referral.link}</div>
              <div className="ref-link-box">
                <div className="ref-link-text">{refLink}</div>
                <button className={`ref-copy-btn${refCopied?" copied":""}`} onClick={copyRef}>{refCopied?t.cabinet.referral.copied:t.cabinet.referral.copy}</button>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:"#1a2333",marginBottom:14}}>{t.cabinet.referral.howTitle}</div>
              <div className="ref-steps">
                {t.cabinet.referral.steps.map((s,i)=>(
                  <div key={i} className="ref-step"><div className="ref-step-num">{i+1}</div><div className="ref-step-text">{s}</div></div>
                ))}
              </div>
              <div style={{fontSize:15,fontWeight:700,color:"#1a2333",marginBottom:14}}>{t.cabinet.referral.history}</div>
              {DEMO_REFERRALS[lang].map((r,i)=>(
                <div key={i} className="ref-history-row">
                  <div><div className="ref-h-name">{r.name}</div><div className="ref-h-date">{r.date}</div></div>
                  <div><div className="ref-h-amount">+${r.amount}</div><div style={{fontSize:11,color:"#2e7d32",textAlign:"right"}}>{r.status}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MAIN SITE */}
      {!showCabinet && <>
        {/* HERO */}
        <div id="hero" className="hero">
          <div className="hero-badge">⚡ {t.hero.badge}</div>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.sub}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>{setShowCabinet(false);scrollTo("calendar");}}>{t.hero.cta}</button>
            <button className="btn-secondary" onClick={()=>scrollTo("services")}>{t.hero.cta2}</button>
          </div>
          <div className="hero-stats">
            {t.about.stats.map((s,i)=>(<div key={i}><div className="hero-stat-v">{s.v}</div><div className="hero-stat-l">{s.l}</div></div>))}
          </div>
        </div>

        {/* SERVICES */}
        <div id="services" className="section">
          <div className="sec-title">{t.services.title}</div>
          <div className="sec-sub">{t.services.sub}</div>
          <div className="services-grid">
            {SERVICES[lang].map((s,i)=>(
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                {s.items.map((it,j)=>(<div key={j} className="service-item"><span className="service-item-name">{it.s}</span><span className="service-item-price">{it.p}</span></div>))}
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <div id="about" style={{background:"#fff",borderTop:"1px solid #e8edf2",borderBottom:"1px solid #e8edf2"}}>
          <div className="section" style={{paddingTop:64,paddingBottom:64}}>
            <div className="about-wrap">
              <div className="about-avatar">
                <img src="https://lh3.googleusercontent.com/d/1j60AvWLjyLlV72Z8ETmN9zY_ai3e3zmX" alt="Мастер Борис"
                  onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='👨‍🔧';e.target.parentNode.style.cssText='display:flex;align-items:center;justify-content:center;font-size:96px;background:linear-gradient(135deg,#0f2044,#1a3a6e);border-radius:16px';}}/>
              </div>
              <div>
                <div className="about-badge">✅ {t.about.exp}</div>
                <div className="about-name">{t.about.name}</div>
                <div className="about-role">{t.about.role}</div>
                <div className="about-desc">{t.about.desc}</div>
                <div className="about-stats">
                  {t.about.stats.map((s,i)=>(<div key={i} className="about-stat"><div className="about-stat-v">{s.v}</div><div className="about-stat-l">{s.l}</div></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div id="reviews" className="section">
          <div className="sec-title">{t.reviews.title}</div>
          <div className="sec-sub">{t.reviews.sub}</div>
          <div className="reviews-grid">
            {REVIEWS[lang].map((r,i)=>(
              <div key={i} className="review-card">
                <div className="review-stars">{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</div>
                <div className="review-text">"{r.text}"</div>
                <div className="review-footer"><span className="review-name">{r.name}</span><span className="review-date">{r.date}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div id="calendar" style={{background:"#fff",borderTop:"1px solid #e8edf2",borderBottom:"1px solid #e8edf2"}}>
          <div className="section" style={{paddingTop:64,paddingBottom:64}}>
            <div className="sec-title">{t.calendar.title}</div>
            <div className="sec-sub">{t.calendar.sub}</div>
            <div className="cal-wrap">
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={()=>setCalDate(new Date(y,m-1,1))}>‹</button>
                <div className="cal-title">{t.calendar.months[m]} {y}</div>
                <button className="cal-nav-btn" onClick={()=>setCalDate(new Date(y,m+1,1))}>›</button>
              </div>
              <div className="cal-grid">{t.calendar.days.map(d=><div key={d} className="cal-dow">{d}</div>)}</div>
              <div className="cal-grid">
                {cells.map((c,i)=>{
                  const isT=c.cur&&c.day===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
                  const isSel=c.cur&&selDay===c.day;
                  const isOff=c.cur&&!isWorkday(c.day);
                  const booked=c.cur?(bookings[dateStr(c.day)]||[]).length:0;
                  return (
                    <div key={i} className={`cal-day${!c.cur?" cal-other":""}${isOff?" cal-off":""}${isT?" cal-today":""}${isSel?" cal-selected":""}`}
                      onClick={()=>c.cur&&!isOff&&(setSelDay(c.day),setSelSlot(null))}>
                      <div className="cal-dn">{c.day}</div>
                      {c.cur&&!isOff&&<div className="cal-dot-wrap">
                        {Array(Math.min(booked,4)).fill(0).map((_,j)=><div key={j} className="cal-dot booked"/>)}
                        {booked<HOURS.length&&<div className="cal-dot"/>}
                      </div>}
                      {isOff&&<div style={{fontSize:10,color:"#a0aec0",marginTop:2}}>{lang==="ru"?"вых.":"off"}</div>}
                    </div>
                  );
                })}
              </div>
              <div className="cal-legend">
                {[["#e85d26",t.calendar.legend[0]],["#a0aec0",t.calendar.legend[1]],["#f0f0f0",t.calendar.legend[2]]].map(([c,l])=>(
                  <div key={l} className="cal-leg-item"><div className="cal-leg-dot" style={{background:c,border:"1px solid #e2e8f0"}}/>{l}</div>
                ))}
              </div>
            </div>
            {selDay&&(
              <div className="slots-wrap">
                <div className="slots-title">{t.calendar.modal.slots} — {selDay} {t.calendar.months[m]}</div>
                <div className="slots-grid">
                  {HOURS.map(h=>{
                    const busy=busySlots.includes(h);
                    return <button key={h} className={`slot${busy?" slot-busy":""}${selSlot===h?" slot-sel":""}`} onClick={()=>!busy&&setSelSlot(h)}>{h}</button>;
                  })}
                </div>
                {selSlot&&<button className="btn-primary" style={{marginTop:16}} onClick={()=>setBookModal(true)}>{t.calendar.book} — {selDay} {t.calendar.months[m]}, {selSlot}</button>}
              </div>
            )}
          </div>
        </div>

        {/* REFERRAL BANNER */}
        <div id="referral-banner" style={{background:"linear-gradient(135deg,#0f2044 0%,#1a3a6e 50%,#0f2044 100%)",padding:"72px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
          <div style={{position:"absolute",top:-60,right:-60,width:320,height:320,background:"rgba(232,93,38,.08)",borderRadius:"50%"}}/>
          <div style={{position:"absolute",bottom:-80,left:-40,width:240,height:240,background:"rgba(232,93,38,.06)",borderRadius:"50%"}}/>
          <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
            <div style={{textAlign:"center",marginBottom:56}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(232,93,38,.15)",border:"1px solid rgba(232,93,38,.3)",color:"#ff8c5a",fontSize:13,fontWeight:600,padding:"6px 16px",borderRadius:20,marginBottom:20}}>
                🎁 {lang==="ru"?"Реферальная программа":"Referral Program"}
              </div>
              <h2 style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:16}}>
                {lang==="ru"?"Приглашайте друзей —":"Invite friends —"}<br/>
                <span style={{color:"#e85d26"}}>{lang==="ru"?"получайте $25 за каждого":"earn $25 for each one"}</span>
              </h2>
              <p style={{fontSize:17,color:"rgba(255,255,255,.65)",maxWidth:520,margin:"0 auto",lineHeight:1.6}}>
                {lang==="ru"?"Порекомендуйте мастера Бориса своим знакомым и получайте реальные деньги за каждый выполненный заказ":"Recommend Master Boris to your friends and earn real money for every completed repair"}
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,marginBottom:52}}>
              {[
                {icon:"💸",title:lang==="ru"?"$25 за каждого друга":"$25 per friend",desc:lang==="ru"?"Фиксированная выплата за каждого приведённого клиента":"Fixed payout for every referred client who completes an order"},
                {icon:"♾️",title:lang==="ru"?"Без лимита":"No limits",desc:lang==="ru"?"Приглашайте сколько угодно — количество вознаграждений не ограничено":"Invite as many friends as you want — there's no cap on earnings"},
                {icon:"⚡",title:lang==="ru"?"Мгновенное начисление":"Instant credit",desc:lang==="ru"?"Деньги поступают сразу после выполнения заказа вашим другом":"Balance is credited right after your friend's repair is completed"},
                {icon:"🔗",title:lang==="ru"?"Личная ссылка":"Personal link",desc:lang==="ru"?"Уникальная реферальная ссылка в личном кабинете":"Unique referral link in your account — share with one click"},
              ].map((a,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:24}}>
                  <div style={{fontSize:36,marginBottom:14}}>{a.icon}</div>
                  <div style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:8}}>{a.title}</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.6}}>{a.desc}</div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:16,padding:"32px 36px",marginBottom:48}}>
              <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:28,textAlign:"center"}}>{lang==="ru"?"Как это работает":"How it works"}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:8}}>
                {(lang==="ru"
                  ?["Зарегистрируйтесь и получите реферальную ссылку","Поделитесь ссылкой с друзьями","Друг бронирует ремонт у Бориса","Борис выполняет заказ","Вы получаете $25 на баланс"]
                  :["Sign up and get your referral link","Share the link with friends","Friend books a repair with Boris","Boris completes the order","You receive $25 to your balance"]
                ).map((step,i)=>(
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:i===4?"#e85d26":"rgba(232,93,38,.2)",border:"2px solid",borderColor:i===4?"#e85d26":"rgba(232,93,38,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:i===4?"#fff":"#ff8c5a",marginBottom:12}}>
                      {i===4?"✓":i+1}
                    </div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.5}}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{textAlign:"center"}}>
              <button className="btn-primary" style={{fontSize:16,padding:"16px 36px",borderRadius:10}}
                onClick={()=>user?(setShowCabinet(true),setCabTab(3)):setShowAuth(true)}>
                {lang==="ru"?"Начать зарабатывать →":"Start earning →"}
              </button>
              <div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginTop:12}}>
                {lang==="ru"?"Бесплатно · Без скрытых условий · Выплаты сразу":"Free · No hidden terms · Instant payouts"}
              </div>
            </div>
          </div>
        </div>

        {/* CONTACTS */}
        <div id="contacts" className="section">
          <div className="sec-title">{t.contacts.title}</div>
          <div className="contacts-grid">
            <div className="contact-card"><div className="contact-icon">📞</div><div className="contact-label">{t.contacts.phone}</div><div className="contact-val">+7 (999) 123-45-67</div><div className="contact-sub">{lang==="ru"?"Звонки и WhatsApp":"Calls & WhatsApp"}</div></div>
            <div className="contact-card"><div className="contact-icon">📍</div><div className="contact-label">{t.contacts.address}</div><div className="contact-val">{t.contacts.addr}</div><div className="contact-sub">{lang==="ru"?"Выезд на дом":"Home visits"}</div></div>
            <div className="contact-card"><div className="contact-icon">🕐</div><div className="contact-label">{t.contacts.hours}</div><div className="contact-val">{t.contacts.hoursVal}</div><div className="contact-sub">{lang==="ru"?"Сб–Вс: выходной":"Sat–Sun: day off"}</div></div>
            <div className="contact-card" style={{background:"#fff3ee",borderColor:"#fcd9c8"}}><div className="contact-icon">⚡</div><div className="contact-label">{t.contacts.emergency}</div><div className="contact-val" style={{color:"#e85d26"}}>+7 (999) 765-43-21</div><div className="contact-sub">{lang==="ru"?"Выезд в течение 2 часов":"Arrival within 2 hours"}</div></div>
          </div>
        </div>

        <div className="footer">© 2025 {lang==="ru"?"Мастер":"Master"} <span>Борис</span>. {lang==="ru"?"Ремонт бытовой техники.":"Home appliance repair."}</div>
      </>}

      {/* BOOKING MODAL */}
      {bookModal&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&(setBookModal(false),setBookSuccess(false))}>
          <div className="modal">
            {bookSuccess?(
              <div className="modal-success">
                <div className="ok-icon">✅</div>
                <h3 style={{marginBottom:8}}>{lang==="ru"?"Готово!":"Done!"}</h3>
                <p>{t.calendar.modal.success}</p>
                <button className="btn-primary" style={{marginTop:20,width:"100%"}} onClick={()=>{setBookModal(false);setBookSuccess(false);}}>OK</button>
              </div>
            ):(
              <>
                <h3>{t.calendar.modal.title} {selDay} {t.calendar.months[m]}, {selSlot}</h3>
                {[["name",t.calendar.modal.name,"text"],["phone",t.calendar.modal.phone,"tel"],["device",t.calendar.modal.device,"text"]].map(([k,lbl,type])=>(
                  <div key={k} className="modal-field">
                    <label>{lbl}</label>
                    <input type={type} value={bookForm[k]} onChange={e=>setBookForm(f=>({...f,[k]:e.target.value}))} placeholder={lbl}/>
                  </div>
                ))}
                <div className="modal-btns">
                  <button className="modal-cancel" onClick={()=>setBookModal(false)}>{t.calendar.modal.cancel}</button>
                  <button className="modal-confirm" onClick={()=>{const ds=dateStr(selDay);setBookings(b=>({...b,[ds]:[...(b[ds]||[]),selSlot]}));setBookSuccess(true);}}>{t.calendar.modal.confirm}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth&&(
        <div className="auth-overlay" onClick={e=>e.target===e.currentTarget&&(setShowAuth(false),setAuthStep(1))}>
          <div className="auth-box">
            <button className="auth-close" onClick={()=>{setShowAuth(false);setAuthStep(1);}}>×</button>
            <div className="auth-logo">🔧 Мастер<span>Борис</span></div>
            <div className="auth-sub">{t.auth.sub}</div>
            {authStep===1&&<>
              <button className="auth-method" onClick={handleGoogleLogin} style={{marginBottom:10}}><span style={{fontSize:20}}>🔵</span>{t.auth.google}</button>
              <div className="auth-divider">{t.auth.orEmail}</div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {["phone","email"].map(tab=>(
                  <button key={tab} className={`auth-method${authTab===tab?" active":""}`} style={{flex:1,justifyContent:"center"}} onClick={()=>setAuthTab(tab)}>
                    {tab==="phone"?"📱 "+t.auth.phone:"✉️ "+t.auth.email}
                  </button>
                ))}
              </div>
              {authTab==="phone"&&<>
                <input className="auth-input" placeholder={t.auth.phonePlaceholder} value={authPhone} onChange={e=>setAuthPhone(e.target.value)}/>
                <button className="auth-btn" onClick={()=>setAuthStep(2)}>{t.auth.sendCode}</button>
              </>}
              {authTab==="email"&&<>
                <input className="auth-input" type="email" placeholder={t.auth.emailPlaceholder} value={authEmail} onChange={e=>setAuthEmail(e.target.value)}/>
                <input className="auth-input" type="password" placeholder={t.auth.passPlaceholder} value={authPass} onChange={e=>setAuthPass(e.target.value)}/>
                <button className="auth-btn" onClick={handleEmailLogin}>{isRegister?t.auth.reg:t.auth.loginBtn}</button>
                <div className="auth-hint">{isRegister?t.auth.haveAcc:t.auth.noAcc} <span onClick={()=>setIsRegister(r=>!r)}>{isRegister?t.auth.loginBtn:t.auth.reg}</span></div>
              </>}
            </>}
            {authStep===2&&<>
              <div style={{textAlign:"center",marginBottom:16}}>
                <div style={{fontSize:32,marginBottom:8}}>📱</div>
                <div style={{fontWeight:600,color:"#1a2333",marginBottom:4}}>{t.auth.enterCode}</div>
                <div style={{fontSize:13,color:"#718096"}}>{authPhone}</div>
              </div>
              <div className="auth-demo-hint">💡 {t.auth.demoHint}</div>
              <div className="otp-inputs">
                {authOtp.map((v,i)=>(
                  <input key={i} id={`otp${i}`} className="otp-input" maxLength={1} value={v}
                    onChange={e=>handleOtp(i,e.target.value)}
                    onKeyDown={e=>e.key==="Backspace"&&!v&&i>0&&document.getElementById(`otp${i-1}`)?.focus()}/>
                ))}
              </div>
              <button className="auth-btn" onClick={handleVerifyOtp}>{t.auth.verify}</button>
              <button className="auth-btn secondary" onClick={()=>setAuthStep(1)}>← {lang==="ru"?"Назад":"Back"}</button>
            </>}
          </div>
        </div>
      )}
    </>
  );
}
