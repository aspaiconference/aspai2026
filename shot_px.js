const puppeteer=require("puppeteer");const path=require("path");
const OUT="/tmp/claude-1003/-data2-home-hjjung-aspai-aspai2026/3b7a2524-19c9-4cdd-8087-894a8595f535/scratchpad/render";
(async()=>{const b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-setuid-sandbox","--force-color-profile=srgb"]});
const p=await b.newPage();await p.setViewport({width:1180,height:900,deviceScaleFactor:2});
for(const [file,out] of [["iday_ko.html","px_ko.png"],["iday_en.html","px_en.png"]]){
  await p.goto("file:///data2/home/hjjung/aspai/aspai2026/"+file,{waitUntil:"networkidle2",timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{document.querySelectorAll(".reveal").forEach(e=>e.classList.add("in"));document.documentElement.classList.remove("js");});
  await new Promise(r=>setTimeout(r,700));
  // PuzzleData is the 4th talk card
  const el=await p.$(".talk-list .talk:nth-of-type(4)");
  if(el) await el.screenshot({path:path.join(OUT,out)}); else console.log("no card",file);
}
await b.close();console.log("DONE");})().catch(e=>{console.error(e);process.exit(1);});
