// results.js
let DEFAULT_XLSX = 'assets/results.xlsx';
let WORKBOOK_DATA = [];

// mapping of column headers in Excel to keys used in code
const colMap = {
  'نمبر شمار':'serial',
  'رول نمبر':'roll',
  'نام طالب علم':'name',
  'نام':'name',
  'ولدیت':'father',
  'مع ولدیت':'father',
  'سکونت':'residence',
  'کلاس':'class',
  'قرآن کریم':'quran',
  'تجوید':'tajweed',
  'اردو':'urdu',
  'نقل و املاء':'dictation',
  'کل نمبرات':'total',
  'اوسط':'avg',
  'پوزیشن':'position',
  'حلقہ نمبر':'ring'
};

function parseWorkbook(wb){
  WORKBOOK_DATA = [];
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(ws, {defval:''});
  json.forEach(row=>{
    const out = {};
    for(const key in row){
      const trimmed = key.trim();
      const mapped = colMap[trimmed] || trimmed;
      out[mapped] = row[key];
    }
    WORKBOOK_DATA.push(out);
  });
}

// load default XLSX if available
async function loadDefaultWorkbook(){
  try{
    const resp = await fetch(DEFAULT_XLSX);
    if(!resp.ok) throw new Error('Default results file not found');
    const ab = await resp.arrayBuffer();
    const wb = XLSX.read(ab, {type:'array'});
    parseWorkbook(wb);
  }catch(e){
    console.warn('Default workbook not loaded:', e.message);
  }
}
loadDefaultWorkbook();

// search (roll exact or partial name)
function searchRecords(q){
  q = String(q || '').trim();
  if(!q) return [];
  const qL = q.toLowerCase();
  return WORKBOOK_DATA.filter(r=>{
    const roll = String(r.roll || '').toLowerCase();
    const name = String(r.name || '').toLowerCase();
    return roll === qL || name.includes(qL);
  });
}

function renderMatches(rows){
  const table = document.getElementById('matchesTable');
  const body = document.getElementById('matchesBody');
  body.innerHTML = '';
  if(!rows.length){ table.hidden = true; return; }
  table.hidden = false;
  rows.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.serial||''}</td>
      <td>${r.roll||''}</td>
      <td>${r.name||''}</td>
      <td>${r.class||''}</td>
      <td>${r.total||''}</td>
      <td>${r.avg||''}</td>
      <td>${r.position||''}</td>
      <td><button class="viewBtn" data-roll="${r.roll}">دیکھیں</button></td>
    `;
    body.appendChild(tr);
  });
  document.querySelectorAll('.viewBtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const roll = b.getAttribute('data-roll');
      const rec = WORKBOOK_DATA.find(x => String(x.roll) === String(roll));
      if(rec) showCard(rec);
    });
  });
}

function showCard(rec){
  document.getElementById('cardSerial').innerText = rec.serial||'';
  document.getElementById('cardRoll').innerText = rec.roll||'';
  document.getElementById('cardName').innerText = rec.name||'';
  document.getElementById('cardFather').innerText = rec.father||'';
  document.getElementById('cardAddressLocal').innerText = rec.residence||'';
  document.getElementById('cardClass').innerText = rec.class||'';
  document.getElementById('cardRing').innerText = rec.ring||'';

  const subjects = [
    {k:'quran', label:'قرآن کریم'},
    {k:'tajweed', label:'تجوید'},
    {k:'urdu', label:'اردو'},
    {k:'dictation', label:'نقل و املاء'}
  ];
  const sb = document.getElementById('scoresBody');
  sb.innerHTML = '';
  subjects.forEach(s=>{
    const v = rec[s.k] !== undefined ? rec[s.k] : '';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td style="text-align:right">${s.label}</td><td style="text-align:right">${v}</td>`;
    sb.appendChild(tr);
  });

  document.getElementById('cardTotal').innerText = rec.total||'';
  document.getElementById('cardAvg').innerText = rec.avg||'';
  document.getElementById('cardPos').innerText = rec.position||'';

  document.getElementById('resultCard').style.display = 'block';
  document.getElementById('resultCard').scrollIntoView({behavior:'smooth', block:'center'});
}

// file upload override (client only)
document.getElementById('fileUpload').addEventListener('change', async (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  const ab = await f.arrayBuffer();
  const wb = XLSX.read(ab, {type:'array'});
  parseWorkbook(wb);
  alert('فائل لوڈ ہو گئی — اب آپ تلاش کر سکتے ہیں (عارضی لوڈ). یہ صرف آپ کے براؤزر تک محدود ہے۔');
});

// attach search
document.getElementById('searchBtnR').addEventListener('click', ()=>{
  const q = document.getElementById('searchInput').value.trim();
  if(!q){ alert('براہِ کرم رول نمبر یا نام درج کریں'); return; }
  const rows = searchRecords(q);
  renderMatches(rows);
  if(rows.length === 1) showCard(rows[0]);
});
document.getElementById('searchInput').addEventListener('keydown', (e)=>{ if(e.key === 'Enter') document.getElementById('searchBtnR').click(); });

// print
document.getElementById('printBtn').addEventListener('click', ()=> window.print());
