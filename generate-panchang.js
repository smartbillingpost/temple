const fs = require("fs");

// =====================
// ✅ IST TIMEZONE
// =====================
const today = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
);

// =====================
// ✅ 1. WEEKDAY
// =====================
const days = [
  "Bhanu", "Soma", "Mangala", "Budha",
  "Guru", "Shukra", "Shani"
];
const vara = days[today.getDay()];

// =====================
// ✅ ASTRONOMY FUNCTIONS
// =====================

// Julian Day
function getJulianDay(date) {
  return date / 86400000 + 2440587.5;
}

// Sun longitude
function getSunLongitude(d) {
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L =
    q +
    1.915 * Math.sin((g * Math.PI) / 180) +
    0.020 * Math.sin((2 * g * Math.PI) / 180);
  return (L + 360) % 360;
}

// Moon longitude
function getMoonLongitude(d) {
  const L = (218.316 + 13.176396 * d) % 360;
  const M = (134.963 + 13.064993 * d) % 360;

  return (L + 6.289 * Math.sin((M * Math.PI) / 180)) % 360;
}

// =====================
// ✅ AUTO UGADI
// =====================
function getUgadi(year) {
  let date = new Date(`${year}-03-01`);

  for (let i = 0; i < 60; i++) {
    const jd = getJulianDay(date);
    const d = jd - 2451545.0;

    const sun = getSunLongitude(d);
    const moon = getMoonLongitude(d);

    let diff = (moon - sun + 360) % 360;

    // Amavasya near March–April
    if (diff < 12) {
      const ugadi = new Date(date);
      ugadi.setDate(date.getDate() + 1);
      return ugadi;
    }

    date.setDate(date.getDate() + 1);
  }

  return new Date(`${year}-03-25`);
}

// =====================
// ✅ 2. SAMVATSARAM
// =====================
function getSamvatsaram(year) {
  const samvatsarams = [
    "Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajotpatti",
    "Angirasa", "Shrimukha", "Bhava", "Yuva", "Dhata",
    "Ishvara", "Bahudhanya", "Pramathi", "Vikrama", "Vrisha",
    "Chitrabhanu", "Svabhanu", "Tarana", "Parthiva", "Vyaya",
    "Sarvajit", "Sarvadhari", "Virodhi", "Vikriti", "Khara",
    "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukhi",
    "Hevilambi", "Vilambi", "Vikari", "Sharvari", "Plava",
    "Subhakritu", "Shobhakritu", "Krodhi", "Vishvavasu",
    "Parabhava", "Plavanga", "Kilaka", "Saumya", "Sadharana",
    "Virodhikrutu", "Paridhavi", "Pramadicha", "Ananda",
    "Rakshasa", "Nala", "Pingala", "Kalayukti",
    "Siddharthi", "Raudra", "Durmati", "Dundubhi",
    "Rudhirodgari", "Raktakshi", "Krodhana", "Akshaya"
  ];

  return samvatsarams[(year - 1986) % samvatsarams.length];
}

const currentYear = today.getFullYear();
const ugadi = getUgadi(currentYear);

let samvatsaram;

if (today < ugadi) {
  samvatsaram = getSamvatsaram(currentYear - 1);
} else {
  samvatsaram = getSamvatsaram(currentYear);
}

// =====================
// ✅ 3. AYANA
// =====================
let ayanam;

const year = today.getFullYear();
const makara = new Date(`${year}-01-14`);
const karka = new Date(`${year}-07-16`);

if (today >= makara && today < karka) {
  ayanam = "Uttarayanam";
} else {
  ayanam = "Dakshinayanam";
}

// =====================
// ✅ 4. RUTU
// =====================
function getRutu(date) {
  const m = date.getMonth() + 1;

  if ([1, 2].includes(m)) return "Shishira Rutu";
  if ([3, 4].includes(m)) return "Vasanta Rutu";
  if ([5, 6].includes(m)) return "Grishma Rutu";
  if ([7, 8].includes(m)) return "Varsha Rutu";
  if ([9, 10].includes(m)) return "Sharad Rutu";
  return "Hemanta Rutu";
}

const rutu = getRutu(today);

// =====================
// ✅ 5. TITHI + PAKSHA
// =====================
const jd = getJulianDay(today);
const d = jd - 2451545.0;

const sunLong = getSunLongitude(d);
const moonLong = getMoonLongitude(d);

let diff = (moonLong - sunLong + 360) % 360;
const tithiNum = Math.floor(diff / 12) + 1;

const tithiNames = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

const tithi = tithiNames[tithiNum - 1];

const paksham =
  tithiNum <= 15 ? "Shukla Paksham" : "Krishna Paksham";

// =====================
// ✅ 6. MASAM
// =====================
const lunarMonthNames = [
  "Chaitra Masam", "Vaishakha Masam", "Jyeshtha Masam",
  "Ashadha Masam", "Shravana Masam", "Bhadrapada Masam",
  "Ashwayuja Masam", "Kartika Masam", "Margashira Masam",
  "Pushya Masam", "Magha Masam", "Phalguna Masam"
];

const masamIndex = Math.floor(sunLong / 30) % 12;
const masam = lunarMonthNames[masamIndex];

// =====================
// ✅ FINAL PANCHANG
// =====================
const fullPanchang =
  `Sri ${samvatsaram} nama Samvatsaram, ${ayanam}, ${rutu}, ${masam}, ${paksham}, ${tithi}, ${vara} vasaraha`;

const panchang = {
  today_panchang: fullPanchang
};

fs.writeFileSync("panchang.json", JSON.stringify(panchang, null, 2));

console.log("Panchang generated.");