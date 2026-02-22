const fs = require("fs");

const today = new Date();

// ✅ Weekday (Vasara)
const days = [
  "Bhanu", "Indu", "Bhauma", "Soumya",
  "Bruhaspati", "Bhrugu", "Sthira"
];

const vara = days[today.getDay()];

// ✅ Samvatsaram calculation (60-year cycle)
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

  return samvatsarams[(year - 1987) % samvatsarams.length];
}

const samvatsaram = getSamvatsaram(today.getFullYear());

// ✅ Ayana (simplified)
const month = today.getMonth() + 1;
const ayanam = (month >= 1 && month <= 6)
  ? "Uttarayanam"
  : "Dakshinayanam";

// ✅ Rutu
function getRutu(month) {
  if ([1, 2].includes(month)) return "Shishira Rutu";
  if ([3, 4].includes(month)) return "Vasanta Rutu";
  if ([5, 6].includes(month)) return "Grishma Rutu";
  if ([7, 8].includes(month)) return "Varsha Rutu";
  if ([9, 10].includes(month)) return "Sharad Rutu";
  return "Hemanta Rutu";
}

const rutu = getRutu(month);

// ⚠️ TODO: Replace later with real Panchang calculation
const masam = "Phalguna Masam";
const paksham = "Shukla Paksham";
const tithi = "Panchami";

// ✅ Build Panchang sentence dynamically
const fullPanchang =
  `Sri ${samvatsaram} nama Samvatsaram, ${ayanam}, ${rutu}, ${masam}, ${paksham}, ${tithi}, ${vara} vasaraha`;

// ✅ JSON output
const panchang = {
  today_panchang: fullPanchang
};

// Save file
fs.writeFileSync("panchang.json", JSON.stringify(panchang, null, 2));

console.log("Panchang generated.");