/* Lisa (AI receptionist) — replicas of refs "Lisa Profile - Setup Page", "Lisa - Auto Attendant", "Lisa - Lead capture",
   "Lisa - Call Transfer", "Teach Lisa". Class prefix .ls-. Deterministic: no timers / transitions. */
(() => {
const { h, icon, statusBar, header, tabBar, img } = UI;
const A = 'assets/';

const CSS = `
.ls-scroll { position: absolute; left: 0; top: 0; width: 375px; }
.ls-chev { width: 22px; height: 22px; color: var(--ink); }

/* ---------- setup ---------- */
.ls-glow { position: absolute; left: 0; top: 96px; width: 375px; height: 230px;
  background: radial-gradient(ellipse 230px 95px at 0px 128px, rgba(214,252,184,1), rgba(214,252,184,0) 100%),
              radial-gradient(ellipse 200px 100px at 385px 118px, rgba(220,252,196,.95), rgba(220,252,196,0) 100%),
              radial-gradient(ellipse 240px 90px at 187px 150px, rgba(238,253,226,.6), rgba(238,253,226,0) 100%); }
.ls-hero { position: absolute; left: 0; top: 96px; width: 375px; height: 218px; overflow: hidden;
  -webkit-mask-image: linear-gradient(#000 78%, transparent 100%); }
.ls-hero .lisa { position: absolute; left: 73px; top: 0; width: 229px; height: 343px; background: url(${A}lisa-arms.png) center/100% 100% no-repeat; }
.ls-chatbtn { position: absolute; left: 312px; top: 255px; width: 47px; height: 47px; border-radius: 50%; background: #fff; border: 1px solid var(--g90);
  box-shadow: 0 4px 14px rgba(40,50,120,.08); display: grid; place-items: center; }
.ls-chatbtn .ic { width: 23px; height: 23px; color: var(--blue); }
.ls-biz { position: absolute; left: 16.5px; top: 315px; width: 342px; height: 139px; border-radius: 20px; border: 1.2px solid #9AD86C; overflow: hidden;
  background: radial-gradient(ellipse 170px 55px at 150px 139px, rgba(215,253,183,.85), rgba(215,253,183,0)), #fff;
  box-shadow: 0 2px 14px rgba(154,216,108,.25); }
.ls-biz .top { height: 56px; display: flex; white-space: nowrap; overflow: hidden; align-items: center; padding-left: 16px; border-bottom: 1px solid var(--g90); background: #fff; }
.ls-biz .emo { font-size: 18.5px; width: 20px; margin-right: 7px; flex: none; line-height: 1; }
.ls-biz .nm { font: 500 14.6px/1 var(--sf); color: var(--ink); letter-spacing: -.25px; }
.ls-biz .num { font: 400 14.6px/1 var(--sf); letter-spacing: -.25px; color: var(--g40); margin-left: 6px; overflow: hidden; text-overflow: ellipsis; padding-right: 8px; }
.ls-biz .lab { position: absolute; left: 16px; top: 72px; font: 400 16.2px/18px var(--sf); color: var(--ink); }
.ls-biz .big { position: absolute; left: 16px; top: 95px; font: 700 20px/26px var(--sf); color: var(--ink); letter-spacing: .1px; }
.ls-biz .chev { position: absolute; right: 18px; top: 86px; width: 22px; height: 22px; }
.ls-card { position: absolute; left: 16.5px; width: 342px; border: 1px solid var(--g90); border-radius: 20px; background: #fff; }
.ls-bh { top: 466.5px; height: 75px; }
.ls-bh .cal { position: absolute; left: 16px; top: 24px; width: 24px; height: 24px; }
.ls-bh .t { position: absolute; left: 48px; top: 16px; font: 500 14.2px/20px var(--sf); }
.ls-bh .s { position: absolute; left: 48px; top: 40px; width: 250px; font: 400 14px/20px var(--sf); color: var(--g40); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ls-bh .chev { position: absolute; right: 16px; top: 25px; }
.ls-ch { position: absolute; left: 0; top: 570px; width: 375px; height: 40px; }
.ls-ch .gl { position: absolute; left: 8px; top: -12px; width: 64px; height: 64px; background: url(${A}defaults/ls-callhandling.png) center/100% 100%; }
.ls-ch .t { position: absolute; left: 76.5px; top: 9px; font: 700 16px/22px var(--sf); }
.ls-prev { position: absolute; left: 253.5px; top: 0; width: 105px; height: 40px; border: 1px solid var(--g90); border-radius: 20px; background: #fff;
  display: flex; align-items: center; gap: 7px; padding-left: 14px; font: 400 15px/1 var(--sf); }
.ls-prev .ic { width: 20px; height: 20px; color: var(--blue); }
.ls-conn { position: absolute; left: 39.5px; top: 612px; height: 230px; border-left: 1.2px dashed var(--g90); }
.ls-hrow { position: absolute; left: 0; width: 375px; height: 97px; }
.ls-hrow .circ { position: absolute; left: 16px; width: 48px; height: 48px; border-radius: 50%; background: center/100% 100% no-repeat; }
.ls-hrow .t { position: absolute; left: 76.5px; font: 700 16px/22px var(--sf); }
.ls-hrow .s { position: absolute; left: 76.5px; font: 400 14.2px/20px var(--sf); color: var(--g40); }
.ls-hrow .chev { position: absolute; right: 16px; }
.ls-hrow .sep { position: absolute; left: 76px; right: 16px; border-top: 1px solid var(--g95); }
.ls-hr { position: absolute; left: 16.5px; width: 342px; border-top: 1px solid var(--g95); }
.ls-know { top: 928.5px; height: 223px; overflow: hidden;
  background: radial-gradient(ellipse 150px 120px at 10px 200px, rgba(249,221,226,.55), rgba(249,221,226,0)),
              radial-gradient(ellipse 150px 140px at 330px 110px, rgba(234,221,248,.75), rgba(234,221,248,0)), #fff; }
.ls-know .book { position: absolute; left: 132px; top: -4px; width: 268px; height: 214.5px; background: url(${A}lisa-hero.png) center/100% 100% no-repeat; }
.ls-know .t { position: absolute; left: 16px; top: 15.5px; font: 700 19.5px/26px var(--sf); letter-spacing: .1px; }
.ls-know .d { position: absolute; left: 16px; top: 54px; width: 240px; letter-spacing: -.1px; font: 400 14.6px/20px var(--sf); color: var(--g30); }
.ls-know .m { position: absolute; left: 16px; display: flex; align-items: center; gap: 6px; font: 400 14.6px/20px var(--sf); }
.ls-know .m .ic { width: 18px; height: 18px; }
.ls-kb { position: absolute; top: 167.5px; height: 39px; border: 1px solid var(--g90); border-radius: 20px; background: #fff; display: flex; align-items: center; justify-content: center; gap: 8px; font: 400 14.4px/1 var(--sf); }
.ls-kb .ic { width: 20px; height: 20px; color: var(--blue); }
.ls-perf { position: absolute; left: 16.5px; top: 1205px; font: 700 19.5px/26px var(--sf); letter-spacing: .1px; }
.ls-week { position: absolute; left: 248.5px; top: 1200.5px; width: 110px; height: 35px; border: 1px solid var(--g90); border-radius: 18px; background: #fff;
  display: flex; align-items: center; justify-content: center; gap: 6px; font: 400 14px/1 var(--sf); }
.ls-week .ic { width: 16px; height: 16px; }
.ls-stat { position: absolute; width: 165px; height: 112px; border: 1px solid var(--g90); border-radius: 22px; background: #fff; }
.ls-stat .lb { position: absolute; left: 16px; top: 16.5px; display: flex; align-items: center; gap: 7px; font: 400 14px/20px var(--sf); }
.ls-stat .lb .ic { width: 20px; height: 20px; }
.ls-stat .nv { position: absolute; left: 16px; top: 64px; display: flex; align-items: center; gap: 6px; }
.ls-stat .n { font: 800 27px/32px var(--sf); letter-spacing: -.2px; font-variant-numeric: tabular-nums; }
.ls-pill { height: 23px; border-radius: 12px; display: flex; align-items: center; gap: 6px; padding: 0 9px 0 11px; font: 500 12.6px/1 var(--sf); color: var(--ink); background: var(--green95); }
.ls-pill.dn { background: var(--g90); }
.ls-pill i { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 6px solid var(--green50); border-radius: 1px; }
.ls-pill.dn i { border-bottom: 0; border-top: 6px solid var(--g50); }
.ls-reset { top: 1534px; height: 92px; }
.ls-reset .rc { position: absolute; left: 14.5px; top: 25.5px; width: 40px; height: 40px; border-radius: 50%; background: url(${A}defaults/ls-reset.png) center/100% 100%; }
.ls-reset .t { position: absolute; left: 64px; top: 14px; font: 500 14.2px/20px var(--sf); }
.ls-reset .d { position: absolute; left: 64px; top: 37px; width: 240px; font: 400 14px/20px var(--sf); color: var(--g40); }
.ls-reset .chev { position: absolute; right: 16px; top: 35px; color: var(--g40); }
/* ---------- autoAttendant ---------- */
.ls-aa-top { position: absolute; left: 16.5px; top: 122.5px; width: 342px; height: 144px; border-radius: 20px; background: #DFE1F8; overflow: hidden; }
.ls-aa-top .in { position: absolute; left: 1px; top: 1px; width: 340px; height: 75px; border-radius: 19px; background: #fff; box-shadow: 0 1px 2px rgba(30,40,110,.06); }
.ls-aa-top .emo { position: absolute; left: 14px; top: 28px; width: 20px; font-size: 19px; line-height: 20px; text-align: center; }
.ls-aa-top .nm { position: absolute; left: 43px; top: 15.5px; font: 700 16.2px/22px var(--sf); }
.ls-aa-top .num { position: absolute; left: 43px; top: 41px; font: 400 14.4px/20px var(--sf); color: var(--g40); }
.ls-aa-top .dn { position: absolute; right: 13px; top: 26.5px; width: 22px; height: 22px; color: var(--g40); }
.ls-aa-top .cal { position: absolute; left: 11px; top: 99px; width: 23px; height: 23px; }
.ls-aa-top .hrs { position: absolute; left: 43px; top: 89px; display: flex; align-items: center; gap: 7px; white-space: nowrap; font: 400 14.2px/21px var(--sf); }
.ls-aa-top .hrs b { font-weight: 400; background: #EFF0FE; border-radius: 7px; padding: 0 7px; line-height: 21px; }
.ls-aa-top .sub { position: absolute; left: 43px; top: 112px; font: italic 400 14.2px/20px var(--sf); color: var(--g40); }
.ls-aa-top .fade { position: absolute; right: 0; top: 76px; width: 70px; height: 68px; background: linear-gradient(90deg, rgba(223,225,248,0), rgba(236,237,252,.95) 70%); }
.ls-sec { position: absolute; left: 0; width: 375px; height: 40px; }
.ls-sec .sq { position: absolute; left: 16px; top: 0; width: 40px; height: 40px; border-radius: 12px; background: center/100% 100%; }
.ls-sec .t { position: absolute; left: 64.5px; top: 9px; font: 700 16.1px/22px var(--sf); }
.ls-sec .up { position: absolute; right: 16px; top: 8px; width: 22px; height: 22px; color: var(--g40); }
.ls-tl { position: absolute; left: 35px; width: 2px; background: repeating-linear-gradient(#DFE1F8 0 4px, transparent 4px 8px); }
.ls-node { position: absolute; left: 16px; width: 40px; height: 40px; border-radius: 12px; background: #EFF0FE; border: 1px solid #DFE1F8;
  display: grid; place-items: center; font: 600 17px/1 var(--sf); color: var(--ink); }
.ls-node.tile { border: 0; background: center/100% 100%; }
.ls-node.w { background: #fff; }
.ls-aac { position: absolute; left: 64.5px; width: 294px; border: 1px solid #DFE1F8; border-radius: 18px; background: #fff; padding: 11px 10px 6.5px 12px; }
.ls-aac .t { font: 700 16px/22px var(--sf); display: flex; align-items: center; gap: 7px; white-space: nowrap; }
.ls-aac .t .ic { width: 22px; height: 22px; }
.ls-aac .r { display: flex; align-items: center; gap: 6px; height: 29px; font: 400 14.2px/1 var(--sf); white-space: nowrap; }
.ls-aac .t + .r { margin-top: 3px; }
.ls-aac .r .ar { width: 16px; height: 16px; color: var(--ink); margin: 0 1px; }
.ls-aac .ch { background: #DFE1F8; border-radius: 7px; padding: 0 6px; line-height: 21px; height: 21px; }
.ls-aac .q { margin: 4.5px 0 3px; font: italic 400 13.9px/20px var(--sf); color: var(--g40); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ls-aac .q.two { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.ls-aac .sep { margin: 10.5px -10px 0 -12px; border-top: 1.2px dashed #DFE1F8; padding: 11px 10px 0 12px; }
.ls-avs { display: flex; margin-left: -1px; }
.ls-avs span { width: 19px; height: 19px; border-radius: 50%; border: 1.3px solid #fff; background-size: cover; background-position: center; margin-left: -9px; }
.ls-avs span:first-child { margin-left: 0; }
.ls-addopt { position: absolute; left: 64.5px; width: 123px; height: 44.5px; border: 1.2px dashed #DFE1F8; border-radius: 13px; display: grid; place-items: center; font: 600 16px/1 var(--sf); color: var(--blue); }
/* ---------- sheets (leadCapture / callTransferSettings) ---------- */
.ls-sb.sbar.dark .ic { color: #fff; }
.ls-sheetbg { position: absolute; left: 0; top: 0; width: 375px; height: 812px; background: #000; }
.ls-peek { position: absolute; left: 16.5px; top: 54px; width: 342px; height: 30px; border-radius: 12px; background: #8D8FA5; }
.ls-sheet { position: absolute; left: 0; top: 64px; width: 375px; height: 748px; border-radius: 20px 20px 0 0; background: #fff; overflow: hidden; }
.ls-shbar { position: absolute; left: 0; top: 0; width: 375px; height: 76px; z-index: 5; }
.ls-shbar .x { position: absolute; left: 16px; top: 34px; width: 24px; height: 24px; }
.ls-save { position: absolute; left: 302px; top: 30px; width: 56.5px; height: 31.5px; border-radius: 12px; background: var(--blue); color: #fff;
  display: grid; place-items: center; font: 500 15.5px/1 var(--sf); }
.ls-shgrad { position: absolute; left: 0; top: 60px; width: 375px; height: 330px;
  background: radial-gradient(ellipse 190px 150px at 0px 180px, rgba(246,226,234,1), rgba(246,226,234,0)),
              radial-gradient(ellipse 150px 170px at 380px 150px, rgba(238,222,246,1), rgba(238,222,246,0)); }
.ls-h1 { position: absolute; left: 16.5px; font: 800 27.8px/36px var(--sf); letter-spacing: .1px; }
.ls-desc { position: absolute; left: 16.5px; width: 212px; font: 400 14px/20px var(--sf); color: var(--ink); }
.ls-lc-img { position: absolute; left: 186px; top: 73px; transform: scaleX(-1); width: 206px; height: 245px; background: url(${A}lisa-notepad.png) center/100% 100% no-repeat; }
.ls-lc-sub { position: absolute; left: 16.5px; top: 243.5px; font: 700 16px/22px var(--sf); }
.ls-list { position: absolute; left: 16.5px; width: 342px; border: 1px solid var(--g90); border-radius: 20px; background: #fff; overflow: hidden; }
.ls-lrow { position: relative; height: 56px; display: flex; align-items: center; padding: 0 0 0 12px; border-top: 1px solid var(--g95); font: 400 14.4px/1 var(--sf); }
.ls-lrow:first-child { border-top: 0; height: 55px; }
.ls-lrow .lk { position: absolute; left: 275px; top: 16px; width: 22px; height: 22px; color: var(--g40); }
.ls-cb { position: absolute; left: 308px; top: 17px; width: 20px; height: 20px; border-radius: 5px; border: 1.5px solid var(--g40); display: grid; place-items: center; }
.ls-cb .ic { width: 14px; height: 14px; color: #fff; display: none; }
.ls-cb.on { background: var(--blue); border-color: var(--blue); }
.ls-cb.lock { background: #99AAFF; border-color: #99AAFF; }
.ls-cb.on .ic, .ls-cb.lock .ic { display: block; }
.ls-note { position: absolute; left: 16.5px; width: 342px; border-radius: 20px; background: #DFE1F8; padding: 11.5px 12px 11.5px 42px; font: italic 400 13.8px/20px var(--sf); color: var(--ink); }
.ls-note .ic { position: absolute; left: 12px; top: 50%; margin-top: -10px; width: 20px; height: 20px; color: var(--g40); }
/* ---------- callTransferSettings ---------- */
.ls-ct-scroll { position: absolute; left: 0; top: 0; width: 375px; }
.ls-shbar.solid { background: #fff; }
.ls-ct-img { position: absolute; left: 187px; top: 72px; width: 207px; height: 247px; background: url(${A}lisa-phones.png) center/100% 100% no-repeat; }
.ls-ctc { position: absolute; left: 16.5px; width: 342px; border: 1px solid var(--g90); border-radius: 20px; background: #fff; overflow: hidden; }
.ls-ctc .t { position: absolute; left: 12px; font: 700 16px/22px var(--sf); }
.ls-ctc .d { position: absolute; left: 12px; width: 266px; font: 400 13.9px/20px var(--sf); color: var(--g40); }
.ls-ctc .chev { position: absolute; right: 16px; color: var(--g40); }
.ls-ctc .cal { position: absolute; left: 12px; top: 48px; width: 23px; height: 23px; }
.ls-ctc .hrs { position: absolute; left: 44px; top: 41.5px; width: 256px; overflow: hidden; display: flex; align-items: center; gap: 8px; white-space: nowrap; font: 400 14.2px/21px var(--sf); }
.ls-ctc .hrs b { font-weight: 400; background: #EFF0FE; border-radius: 7px; padding: 0 7px; line-height: 21px; }
.ls-ctc .fade { position: absolute; left: 250px; top: 40px; width: 50px; height: 26px; background: linear-gradient(90deg, rgba(255,255,255,0), #fff 80%); }
.ls-tg { position: absolute; left: 290.5px; width: 40px; height: 23px; border-radius: 12px; background: var(--g80); }
.ls-tg i { position: absolute; left: 2px; top: 2px; width: 19px; height: 19px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.18); }
.ls-tg.on { background: var(--blue); }
.ls-tg.on i { left: 19px; }
.ls-drow { position: absolute; left: 0; width: 340px; height: 73px; border-top: 1px solid var(--g95); }
.ls-drow .n { position: absolute; left: 44px; top: 12.5px; font: 400 14.8px/20px var(--sf); }
.ls-drow .c { position: absolute; left: 44px; top: 35.5px; font: 400 14.2px/20px var(--sf); color: var(--g40); }
.ls-drow .chev { position: absolute; right: 16px; top: 25px; color: var(--g40); }
.ls-drow .grp { position: absolute; left: 11px; top: 25px; width: 24px; height: 24px; }
.ls-stk { position: absolute; left: 8px; top: 25.5px; width: 32px; height: 23px; }
.ls-stk span { position: absolute; top: -1px; width: 25px; height: 25px; border-radius: 50%; background-size: cover; background-position: center; border: 1.2px solid #fff; box-shadow: 0 0 0 .8px #DFE1F8; }
.ls-addtag { position: absolute; left: 0; width: 340px; height: 55px; border-top: 1px solid var(--g95); }
.ls-addtag .n { position: absolute; left: 12px; top: 17.5px; font: 400 14.8px/20px var(--sf); color: var(--g60); }
.ls-addtag .pl { position: absolute; right: 14px; top: 17.5px; width: 20px; height: 20px; border-radius: 5px; background: var(--blue); display: grid; place-items: center; }
.ls-addtag .pl .ic { width: 14px; height: 14px; color: #fff; }

/* ---------- teachLisa ---------- */
.ls-tl-nav { position: absolute; left: 0; top: 47px; width: 375px; height: 133px; background: #fff; z-index: 5; }
.ls-tl-nav .bk { position: absolute; left: 16px; top: 30px; width: 24px; height: 24px; }
.ls-tl-nav .av { position: absolute; left: 52px; top: 21px; width: 42px; height: 42px; background: url(${A}defaults/ls-lisa-tile.png) center/100% 100%; }
.ls-tl-nav .nm { position: absolute; left: 100.5px; top: 19.5px; font: 600 16.6px/22px var(--sf); }
.ls-tl-nav .st { position: absolute; left: 100.5px; top: 45px; font: 400 14.6px/20px var(--sf); color: var(--g40); }
.ls-tl-nav .st b { font-weight: 700; color: var(--ink); }
.ls-tl-nav .mo { position: absolute; left: 294.5px; top: 30px; width: 24px; height: 24px; }
.ls-tl-nav .ca { position: absolute; left: 334px; top: 29px; width: 25px; height: 25px; }
.ls-seg { position: absolute; left: 16.5px; top: 81px; width: 342px; height: 40px; border-radius: 20px; background: #DFE1F8; }
.ls-seg .on { position: absolute; left: 1px; top: 1px; width: 170px; height: 38px; border-radius: 19px; background: #fff; box-shadow: 0 1px 3px rgba(30,40,110,.12); }
.ls-seg .l { position: absolute; top: 0; width: 171px; height: 40px; display: grid; place-items: center; font: 400 14.6px/1 var(--sf); }
.ls-tl-bg { position: absolute; left: 0; top: 180px; width: 375px; height: 260px;
  background: linear-gradient(180deg, rgba(255,255,255,0) 40%, #fff 100%), linear-gradient(90deg, #F8ECF6, #F2EEFB 55%, #EFEFFD); }
.ls-intro { position: absolute; left: 16.5px; top: 204px; width: 342px; height: 117.5px; text-align: center; }
.ls-intro svg { position: absolute; left: 0; top: 0; }
.ls-intro .t { position: absolute; left: 0; right: 0; top: 17px; font: 700 16px/22px var(--sf); }
.ls-intro .d { position: absolute; left: 12px; right: 12px; top: 42px; font: 400 14.2px/20px var(--sf); color: var(--g30); }
.ls-intro .lm { position: absolute; left: 0; right: 0; top: 82px; font: 600 14.6px/20px var(--sf); }
.ls-intro .lm span { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1.3px; }
.ls-date { position: absolute; left: 0; width: 375px; top: 346px; text-align: center; font: 400 14.2px/20px var(--sf); color: var(--g40); }
.ls-bub { position: absolute; left: 16.5px; width: 302px; border-radius: 18px; background: #F0F0F0; padding: 13px 12px 13px 12px; font: 400 16px/22px var(--sf); color: var(--ink); }
.ls-bub .by { display: flex; align-items: center; gap: 6px; margin-top: 8px; font: 400 14.2px/20px var(--sf); color: var(--g40); }
.ls-bub .by i { width: 22px; height: 22px; border-radius: 50%; background: url(${A}defaults/ls-lisa-mini.png) center/100% 100%; }
.ls-bub.me { left: auto; right: 16.5px; width: auto; max-width: 280px; background: var(--blue); color: #fff; }
.ls-sug { position: absolute; left: 15.5px; top: 579.5px; width: 344px; border: 1px solid var(--g90); border-radius: 18px; background: #fff; overflow: hidden; }
.ls-sug .s { position: relative; height: 48px; display: flex; align-items: center; padding: 0 44px 0 12px; border-top: 1px solid var(--g95); font: 400 14.6px/1 var(--sf); white-space: nowrap; }
.ls-sug .s:first-child { border-top: 0; height: 47px; }
.ls-sug .s span { overflow: hidden; text-overflow: ellipsis; }
.ls-sug .s .ic { position: absolute; right: 22px; top: 13px; width: 22px; height: 22px; color: var(--g40); }
.ls-cmp { position: absolute; left: 0; top: 730px; width: 375px; height: 82px; background: #fff; }
.ls-cmp .pl { position: absolute; left: 16px; top: 23px; width: 24px; height: 24px; }
.ls-field { position: absolute; left: 48.5px; top: 10.5px; width: 310px; height: 47px; border: 1px solid var(--g90); border-radius: 24px; padding: 0 14px 0 12px;
  display: flex; align-items: center; font: 400 16.6px/1 var(--sf); white-space: nowrap; overflow: hidden; }
.ls-field .ph { color: var(--g60); }
.ls-caret { display: inline-block; width: 2px; height: 21px; background: var(--blue); margin-left: 1px; border-radius: 1px; }
`;
if (!document.getElementById('ls-css')) { const st = document.createElement('style'); st.id = 'ls-css'; st.textContent = CSS; document.head.append(st); }

// icon with extra classes
const ic = (name, cls, style) => { const e = icon(name, style); if (cls) e.classList.add(...cls.split(' ')); return e; };
const chev = (style) => ic('Right Arrow 2|Light', 'chev ls-chev', style);
const at = (cls, style, kids) => h('div', cls, style, kids);
const clamp01 = v => Math.max(0, Math.min(1, v));
const mkScroll = (layer, max) => (y) => { const v = Math.max(0, Math.min(max, y)); layer.style.transform = `translateY(${-v}px)`; };

window.SCREENS = window.SCREENS || {};

/* =============================== 1. setup =============================== */
SCREENS.setup = () => {
  const el = h('div', 'scr375');
  const PAGE = 1732;
  const sc = h('div', 'ls-scroll', `height:${PAGE}px`);
  const lisa = at('lisa');
  const hero = at('ls-hero', null, lisa);
  const chat = at('ls-chatbtn', null, icon('Chat 2|Light'));

  const bizCard = at('ls-biz', null, [
    at('top', null, [h('span', 'emo', null, '🧘'), h('span', 'nm', null, 'Restore Wellness Clinic'), h('span', 'num', null, '+1 (212) 555-1002')]),
    at('lab', null, 'Lisa Answers'), at('big', null, 'All Incoming Calls'), ic('Down|Light', 'chev'),
  ]);
  const bh = at('ls-card ls-bh', null, [
    ic('Schedule / Calender|Light', 'cal'),
    at('t', null, 'Business Hours'), at('s', null, 'Mon-Fri 9:00am - 6:00pm, Sat-Sun 10:00am - 2:00pm'), chev(),
  ]);
  const ch = at('ls-ch', null, [
    at('gl'), at('t', null, 'Call Handling'),
    at('ls-prev', null, [icon('Play|Light'), 'Preview']),
  ]);
  const R = [
    { t: 'Lisa Answers', s: 'Personalize voice, greetings & more.', tile: 'ls-lisa-answers' },
    { t: 'Call Transfer', s: 'Transfer to the right team member', tile: 'ls-call-transfer' },
    { t: 'Lead Capture', s: 'Captures caller details', tile: 'ls-lead-capture' },
  ];
  const rows = R.map((r, i) => {
    const e = at('ls-hrow', `top:${613 + i * 97}px`, [
      at('circ', `top:25px;background-image:url(${A}defaults/${r.tile}.png)`),
      at('t', 'top:26.5px', r.t), at('s', 'top:51.5px', r.s), chev('top:38px'),
    ]);
    if (i < 2) e.append(at('sep', 'top:97px'));
    return e;
  });
  const knowledge = at('ls-card ls-know', null, [
    at('book'),
    at('t', null, 'Lisa’s Knowledge'),
    at('d', null, [h('div', null, null, 'Lisa uses this business info'), h('div', null, null, 'to answer queries accurately.')]),
    at('m', 'top:107px', [icon('Question / Help|Light'), '24 FAQs', h('span', null, 'width:4px'), icon('Website Globe Planet Sphere|Light'), '3 Links']),
    at('m', 'top:135px', [icon('File / Document|Light'), '5 Files']),
    at('ls-kb', 'left:15.5px;width:151px', [icon('Book Knowledge|Light'), 'All Knowledge']),
    at('ls-kb', 'left:175px;width:151px', [icon('Add 3|Light'), 'Add New Info']),
  ]);
  const ST = [
    { l: 'Transfers', ic: 'Call Transfer|Light', n: 41, p: '12%' },
    { l: 'Calls Handled', ic: 'Call love heart phone|Light', n: 132, p: '2%', dn: true },
    { l: 'Leads Captured', ic: 'Component 1|Other', n: 27, p: '31%' },
    { l: 'Total Responses', ic: 'text ai |Other', n: 728, p: '4%' },
  ];
  const statNums = [];
  const stats = ST.map((s, i) => {
    const n = h('div', 'n', null, String(s.n)); statNums.push(n);
    return at('ls-stat', `left:${i % 2 ? 194 : 16.5}px;top:${i < 2 ? 1248.5 : 1373.5}px`, [
      at('lb', null, [icon(s.ic), s.l]),
      at('nv', null, [n, at('ls-pill' + (s.dn ? ' dn' : ''), null, [h('i'), s.p])]),
    ]);
  });
  const reset = at('ls-card ls-reset', null, [
    at('rc'), at('t', null, 'Reset Lisa'),
    at('d', null, 'Clear the current setup and configure Lisa from the beginning.'), chev(),
  ]);
  sc.append(at('ls-glow'), hero, chat, bizCard, bh, ch, at('ls-conn'), ...rows, at('ls-hr', 'top:904px'), knowledge,
    at('ls-hr', 'top:1176px'), at('ls-perf', null, 'Lisa’s Performance'), at('ls-week', null, ['This week', icon('Down|Light')]),
    ...stats, at('ls-hr', 'top:1510px'), reset);
  const hdr = header('Setup', 'raju');
  el.append(sc, hdr, statusBar(), tabBar('Setup'));

  const scrollMax = PAGE - 812;
  const state = (o = {}) => {
    if (o.stats != null) {
      const e = 1 - Math.pow(1 - clamp01(o.stats), 3);
      ST.forEach((s, i) => { statNums[i].textContent = String(Math.round(s.n * e)); });
    }
  };
  return { el, parts: { hero, lisa, bizCard, rows, knowledge, stats, statNums, chat, hdr, content: sc }, scroll: mkScroll(sc, scrollMax), scrollMax, state };
};
/* ============================ 2. autoAttendant ============================ */
SCREENS.autoAttendant = () => {
  const el = h('div', 'scr375');
  const PAGE = 1648;
  const sc = h('div', 'ls-scroll', `height:${PAGE}px`);
  const arrow = () => ic('Right Arrow 1|Light', 'ar');
  const chip = (t) => h('span', 'ch', null, t);
  const avs = (list) => h('span', 'ls-avs', null, list.map(n => h('span', null, { backgroundImage: img(n) })));
  const r = (...k) => at('r', null, k);
  const top = at('ls-aa-top', null, [
    at('in', null, [at('emo', null, '🗂️'), at('nm', null, 'Summit Tax & Accounting'), at('num', null, '+1 (212) 555-1002'), ic('Down|Light', 'dn')]),
    ic('Schedule / Calender|Light', 'cal'),
    at('hrs', null, ['Mon - Fri', h('b', null, null, '9am - 5pm'), 'Sat - Sun', h('b', null, null, '9am - 1pm')]),
    at('sub', null, 'Set your business hours.'), at('fade'),
  ]);
  const sec = (y, t, tile) => at('ls-sec', `top:${y}px`, [at('sq', `background-image:url(${A}defaults/${tile}.png)`), at('t', null, t), ic('Up|Light', 'up')]);
  const CARDS = [
    { y: 363.5, node: ['ls-aa-music'], kids: [at('t', null, 'Intro Greeting'), r('Start', arrow(), chip('Autoplay')),
      at('q two', null, '“Thanks for calling Summit. For our CPA Team, please press 1. For our tax team, press 2.”')] },
    { y: 510.5, node: '1', kids: [at('t', null, 'Hours & Location'), r('Press 1', arrow(), chip('Autoplay Info')),
      at('q', null, '“We are open Monday through Friday from 9…”')] },
    { y: 637.5, node: '2', kids: [at('t', null, 'CPA Team'), r('Press 2', arrow(), chip('Route call'), arrow(), chip('3 users'), avs(['ravi', 'jonas'])),
      r('No answer', arrow(), chip('Voicemail'), h('span', null, 'margin:0 1px', '+'), chip('Auto Text'))] },
    { y: 765.5, node: '3', kids: [at('t', null, 'Tax Team'), r('Press 3', arrow(), chip('Route call'), arrow(), chip('2 users'), avs(['priya', 'alexis'])),
      r('No answer', arrow(), chip('Voicemail'))] },
    { y: 893.5, node: '4', kids: [at('t', null, 'Voicemail'), r('Press 4', arrow(), chip('Voicemail'))] },
    { y: 992.5, node: '5', kids: [at('t', null, 'Team Directory'), r('Press 5', arrow(), chip('Team Directory'))] },
    { y: 1091.5, node: ['ls-aa-default'], kids: [at('t', null, 'Default Handling'),
      r('Auto', arrow(), chip('Route call'), arrow(), chip('3 users'), avs(['ethan', 'daniela'])),
      at('q', null, 'When no menu is set or no caller input'),
      at('sep', null, [at('t', null, [ic('Voice Mail 2|Bold'), 'Voicemail']), r('No answer', arrow(), chip('Voicemail'))])] },
    { y: 1435.5, node: ['ls-aa-default'], kids: [at('t', null, [ic('Voice Mail 2|Bold'), 'Default Handling']),
      r('Auto', arrow(), chip('Voicemail')), at('q', null, 'When no menu is set or no caller input')] },
  ];
  const cards = [], nodes = [];
  // timelines (drawn first, under the nodes)
  sc.append(at('ls-tl', 'top:339px;height:958px'), at('ls-tl', 'top:1411px;height:155px'));
  sc.append(top, sec(299, 'Business Hours', 'ls-aa-sun'), sec(1371, 'After Hours', 'ls-aa-moon'));
  CARDS.forEach(c => {
    const card = at('ls-aac', `top:${c.y}px`, c.kids);
    sc.append(card); cards.push(card);
  });
  // nodes are vertically centred on their card → place after layout-independent heights (measured from ref)
  const H = [121.5, 102, 103, 103, 74, 74, 177, 102.5];
  CARDS.forEach((c, i) => {
    const tile = Array.isArray(c.node);
    const n = at('ls-node' + (tile ? ' tile' : ''), `top:${c.y + H[i] / 2 - 20}px` + (tile ? `;background-image:url(${A}defaults/${c.node[0]}.png)` : ''), tile ? null : c.node);
    sc.append(n); nodes.push(n);
  });
  [1296.5, 1565].forEach(y => {
    const n = at('ls-node tile', `top:${y}px;background-image:url(${A}defaults/ls-aa-add.png)`); sc.append(n); nodes.push(n);
    const b = at('ls-addopt', `top:${y - 2.5}px`, 'Add Options'); sc.append(b); cards.push(b);
  });
  const nav = at('nav', null, [ic('Back 2|Light', null, 'width:24px;height:24px'), at('mid', null, 'Auto Attendant'), ic('Info|Light', null, 'width:23px;height:23px')]);
  el.append(sc, nav, statusBar());
  const scrollMax = PAGE - 812;
  return { el, parts: { top, cards, nodes, nav, content: sc }, scroll: mkScroll(sc, scrollMax), scrollMax };
};
/* ============================ 3. leadCapture ============================ */
const sheetFrame = () => {
  const el = h('div', 'scr375', 'background:#000');
  const sheet = at('ls-sheet');
  const save = at('ls-save', null, 'Save');
  const bar = at('ls-shbar', null, [ic('Close|Light', 'x'), save]);
  const sb = statusBar(true); sb.classList.add('ls-sb');
  el.append(at('ls-peek'), sheet, sb);
  return { el, sheet, bar, save };
};
SCREENS.leadCapture = () => {
  const { el, sheet, bar, save } = sheetFrame();
  // sheet-local coordinates = screen y - 64
  const ITEMS = [['Name (Default)', true], ['Reason for calling (Default)', true], ['Preferred callback time'], ['Preferred team member'], ['Other']];
  const checks = [];
  const rows = ITEMS.map(([t, locked]) => {
    const cb = at('ls-cb' + (locked ? ' lock' : ''), null, ic('Checkmark|Bold')); checks.push(cb);
    const r = at('ls-lrow', null, [t]);
    if (locked) r.append(ic('Lock|Light', 'lk'));
    r.append(cb); return r;
  });
  const list = at('ls-list', 'top:276.5px', rows);
  sheet.append(at('ls-shgrad'), at('ls-lc-img'), bar,
    at('ls-h1', 'top:100px', 'Lead Capture'),
    at('ls-desc', 'top:139px', 'Lisa collects caller details when she can\'t answer a query or connect to the right team member.'),
    at('ls-lc-sub', null, 'Info Lisa collects'), list,
    at('ls-note', 'top:569px', [ic('Info|Bold'), 'Avoid collecting email addresses or phone numbers, as they’re often misheard.']));
  const state = (o = {}) => {
    if (o.checked) o.checked.forEach((v, i) => { if (checks[i] && !ITEMS[i][1]) checks[i].classList.toggle('on', !!v); });
  };
  return { el, parts: { rows, checks, save, list }, state };
};
/* ========================= 4. callTransferSettings ========================= */
SCREENS.callTransferSettings = () => {
  const { el, sheet, bar, save } = sheetFrame();
  bar.classList.add('solid');
  const PAGE = 1252; // screen-space page height; sheet-local = screen - 64
  const sc = h('div', 'ls-ct-scroll', `height:${PAGE - 64}px`);
  const tog = (y, on) => at('ls-tg' + (on ? ' on' : ''), `top:${y}px`, h('i'));
  const stk = (a, b) => at('ls-stk', null, [h('span', null, { left: '0px', backgroundImage: img(a) }), h('span', null, { left: '9px', backgroundImage: img(b) })]);
  const bh = at('ls-ctc', 'top:223.5px;height:122px', [
    at('t', 'top:12px;left:44px', 'Business Hours'), ic('Schedule / Calender|Light', 'cal'),
    at('hrs', null, [h('b', null, null, '9am - 5pm'), 'Mon - Fri,', h('b', null, null, '9am - 1pm'), 'Sat - Sun']), at('fade'),
    at('d', 'top:70px;left:44px;width:240px', 'Configure when your team receives call transfers from Lisa.'), chev('top:48px'),
  ]);
  const t1 = tog(36.5, true), t2 = tog(37, true);
  const auto = at('ls-ctc', 'top:362.5px;height:170px', [
    at('t', 'top:16px', 'Auto Transfer'), at('d', 'top:41px', 'When unsure, calls are transferred to everyone irrespective of departments'), t1,
    at('ls-drow', 'top:97px;border-top:0', [stk('jesse', 'bob'), at('n', null, 'Backup Team'), at('c', null, '12 team members'), chev()]),
  ]);
  const DEPTS = [['Front Desk', 6, ['keisha', 'jesse']], ['Massage Therapists', 4, ['alexis', 'sophia']], ['Billing', 3, ['judith', 'priya']],
    ['After Hours', 2, ['jonas', 'liam']], ['Wellness Coaches', 0], ['Intake Team', 0]];
  const rows = DEPTS.map(([n, c, av], i) => at('ls-drow', `top:${97 + i * 73}px` + (i ? '' : ';border-top:0'), [
    av ? stk(...av) : ic('Team|Light', 'grp'), at('n', null, n), at('c', null, `${c} team members`), chev()]));
  const addTag = at('ls-addtag', `top:${97 + 6 * 73}px`, [at('n', null, 'Add New Tag'), at('pl', null, ic('Add 3|Bold'))]);
  const dept = at('ls-ctc', 'top:549.5px;height:590.5px', [
    at('t', 'top:16px', 'Transfer to Departments'), at('d', 'top:41px', 'Add team members to the departments to transfer related calls.'), t2,
    ...rows, addTag,
  ]);
  sc.append(at('ls-shgrad'), at('ls-ct-img'),
    at('ls-h1', 'top:100px', 'Call Transfer'),
    at('ls-desc', 'top:139px', 'Lisa transfers to the respective team members based on the customer query.'),
    bh, auto, dept);
  sheet.append(sc, bar);
  const scrollMax = PAGE - 812;
  return { el, parts: { toggles: [t1, t2], rows: [auto.querySelector('.ls-drow'), ...rows], cards: [bh, auto, dept], save, content: sc },
    scroll: mkScroll(sc, scrollMax), scrollMax,
    state: (o = {}) => { if (o.toggles) o.toggles.forEach((v, i) => [t1, t2][i] && [t1, t2][i].classList.toggle('on', !!v)); } };
};

/* =============================== 5. teachLisa =============================== */
SCREENS.teachLisa = () => {
  const el = h('div', 'scr375');
  const REPLY = 'restorewellnessclinic.com';
  const nav = at('ls-tl-nav', null, [
    ic('Back 2|Light', 'bk'), at('av'), at('nm', null, 'Lisa'),
    at('st', null, ['Setup ', h('b', null, null, '65%'), ' complete']),
    ic('Menu|Bold', 'mo'), ic('Call|Light', 'ca'),
    at('ls-seg', null, [at('on'), at('l', 'left:1px;color:var(--blue)', 'Teach Lisa'), at('l', 'left:171px', 'Preview Lisa')]),
  ]);
  const W = 342, H = 117.5;
  const intro = at('ls-intro', null, [
    at('t', null, 'Teach & configure your agent'),
    at('d', null, 'Tell Lisa about your business. She learns from your conversation here.'),
    at('lm', null, h('span', null, null, 'Learn More')),
  ]);
  intro.insertAdjacentHTML('afterbegin', `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="lsIntroG" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#E0A21F"/><stop offset=".35" stop-color="#E0457E"/><stop offset=".7" stop-color="#C83FA8"/><stop offset="1" stop-color="#5A5CF0"/></linearGradient></defs>
    <rect x=".6" y=".6" width="${W - 1.2}" height="${H - 1.2}" rx="10" fill="none" stroke="url(#lsIntroG)" stroke-width="1.2" stroke-dasharray="4 3.2"/></svg>`);
  const b1 = at('ls-bub', 'top:390px', [
    'Hey there! I\'m Lisa, your AI Agent. I can handle calls and chats for you. To get started, could you share your website link so I can learn about your business?',
    at('by', null, [h('i'), 'Lisa · 8:30 pm'])]);
  const meB = at('ls-bub me', 'top:575px;display:none', REPLY);
  const b2 = at('ls-bub', 'top:631px;display:none', [
    'Got it! I\'m reading your website now. I\'ll learn your services, hours and prices.', at('by', null, [h('i'), 'Lisa · 8:31 pm'])]);
  const SUG = ['I do not have a website', 'Can I upload documents or images?', 'Can I provide my social profile like Yelp or Google?'];
  const sugRows = SUG.map(t => at('s', null, [h('span', null, null, t), ic('Arrow down left Diagonal|Light')]));
  const sug = at('ls-sug', null, sugRows);
  const field = at('ls-field', null, h('span', 'ph', null, 'Type reply'));
  const cmp = at('ls-cmp', null, [ic('Add 3|Light', 'pl'), field]);
  const chat = at('ls-scroll', 'height:812px', [at('ls-tl-bg'), intro, at('ls-date', null, 'Sep 5, 2026'), b1, meB, b2, sug]);
  el.append(chat, cmp, nav, statusBar());
  const state = (o = {}) => {
    const sent = (o.sent || 0) >= 1;
    const n = Math.max(0, Math.min(REPLY.length, Math.round(o.typed || 0)));
    field.innerHTML = '';
    if (sent || !n) field.append(h('span', 'ph', null, 'Type reply'));
    else field.append(h('span', null, null, REPLY.slice(0, n)), h('span', 'ls-caret'));
    chat.style.transform = sent ? 'translateY(-48px)' : '';
    meB.style.display = sent ? '' : 'none'; b2.style.display = sent ? '' : 'none'; sug.style.display = sent ? 'none' : '';
  };
  return { el, parts: { bubbles: [b1, meB, b2], field, suggestions: sugRows, intro, nav, chat }, state };
};
})();
