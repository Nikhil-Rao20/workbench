import{r as N}from"./react-vendor-73BkhPiA.js";const V=6048e5,tt=864e5,I=6e4,R=36e5,q=Symbol.for("constructDateFrom");function w(e,t){return typeof e=="function"?e(t):e&&typeof e=="object"&&q in e?e[q](t):e instanceof Date?new e.constructor(t):new Date(t)}function y(e,t){return w(t||e,e)}let et={};function W(){return et}function P(e,t){var c,d,u,l;const n=W(),a=(t==null?void 0:t.weekStartsOn)??((d=(c=t==null?void 0:t.locale)==null?void 0:c.options)==null?void 0:d.weekStartsOn)??n.weekStartsOn??((l=(u=n.locale)==null?void 0:u.options)==null?void 0:l.weekStartsOn)??0,r=y(e,t==null?void 0:t.in),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function C(e,t){return P(e,{...t,weekStartsOn:1})}function B(e,t){const n=y(e,t==null?void 0:t.in),a=n.getFullYear(),r=w(n,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const o=C(r),i=w(n,0);i.setFullYear(a,0,4),i.setHours(0,0,0,0);const c=C(i);return n.getTime()>=o.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function $(e){const t=y(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function X(e,...t){const n=w.bind(null,t.find(a=>typeof a=="object"));return t.map(n)}function F(e,t){const n=y(e,t==null?void 0:t.in);return n.setHours(0,0,0,0),n}function Q(e,t,n){const[a,r]=X(n==null?void 0:n.in,e,t),o=F(a),i=F(r),c=+o-$(o),d=+i-$(i);return Math.round((c-d)/tt)}function nt(e,t){const n=B(e,t),a=w(e,0);return a.setFullYear(n,0,4),a.setHours(0,0,0,0),C(a)}function at(e){return e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}function rt(e){return!(!at(e)&&typeof e!="number"||isNaN(+y(e)))}function fn(e,t,n){const[a,r]=X(n==null?void 0:n.in,e,t),o=E(a,r),i=Math.abs(Q(a,r));a.setDate(a.getDate()-o*i);const c=+(E(a,r)===-o),d=o*(i-c);return d===0?0:d}function E(e,t){const n=e.getFullYear()-t.getFullYear()||e.getMonth()-t.getMonth()||e.getDate()-t.getDate()||e.getHours()-t.getHours()||e.getMinutes()-t.getMinutes()||e.getSeconds()-t.getSeconds()||e.getMilliseconds()-t.getMilliseconds();return n<0?-1:n>0?1:n}function ot(e,t){const n=y(e,t==null?void 0:t.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}const it={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},st=(e,t,n)=>{let a;const r=it[e];return typeof r=="string"?a=r:t===1?a=r.one:a=r.other.replace("{{count}}",t.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};function S(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const ct={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},ut={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},dt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},ht={date:S({formats:ct,defaultWidth:"full"}),time:S({formats:ut,defaultWidth:"full"}),dateTime:S({formats:dt,defaultWidth:"full"})},lt={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},ft=(e,t,n,a)=>lt[e];function x(e){return(t,n)=>{const a=n!=null&&n.context?String(n.context):"standalone";let r;if(a==="formatting"&&e.formattingValues){const i=e.defaultFormattingWidth||e.defaultWidth,c=n!=null&&n.width?String(n.width):i;r=e.formattingValues[c]||e.formattingValues[i]}else{const i=e.defaultWidth,c=n!=null&&n.width?String(n.width):e.defaultWidth;r=e.values[c]||e.values[i]}const o=e.argumentCallback?e.argumentCallback(t):t;return r[o]}}const mt={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},yt={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},gt={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},wt={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},kt={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},bt={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Mt=(e,t)=>{const n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},pt={ordinalNumber:Mt,era:x({values:mt,defaultWidth:"wide"}),quarter:x({values:yt,defaultWidth:"wide",argumentCallback:e=>e-1}),month:x({values:gt,defaultWidth:"wide"}),day:x({values:wt,defaultWidth:"wide"}),dayPeriod:x({values:kt,defaultWidth:"wide",formattingValues:bt,defaultFormattingWidth:"wide"})};function _(e){return(t,n={})=>{const a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;const i=o[0],c=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(c)?xt(c,g=>g.test(i)):vt(c,g=>g.test(i));let u;u=e.valueCallback?e.valueCallback(d):d,u=n.valueCallback?n.valueCallback(u):u;const l=t.slice(i.length);return{value:u,rest:l}}}function vt(e,t){for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n}function xt(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n}function _t(e){return(t,n={})=>{const a=t.match(e.matchPattern);if(!a)return null;const r=a[0],o=t.match(e.parsePattern);if(!o)return null;let i=e.valueCallback?e.valueCallback(o[0]):o[0];i=n.valueCallback?n.valueCallback(i):i;const c=t.slice(r.length);return{value:i,rest:c}}}const Dt=/^(\d+)(th|st|nd|rd)?/i,Nt=/\d+/i,Pt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ot={any:[/^b/i,/^(a|c)/i]},Ct={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Wt={any:[/1/i,/2/i,/3/i,/4/i]},Tt={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},St={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Yt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},qt={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},$t={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Ft={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Et={ordinalNumber:_t({matchPattern:Dt,parsePattern:Nt,valueCallback:e=>parseInt(e,10)}),era:_({matchPatterns:Pt,defaultMatchWidth:"wide",parsePatterns:Ot,defaultParseWidth:"any"}),quarter:_({matchPatterns:Ct,defaultMatchWidth:"wide",parsePatterns:Wt,defaultParseWidth:"any",valueCallback:e=>e+1}),month:_({matchPatterns:Tt,defaultMatchWidth:"wide",parsePatterns:St,defaultParseWidth:"any"}),day:_({matchPatterns:Yt,defaultMatchWidth:"wide",parsePatterns:qt,defaultParseWidth:"any"}),dayPeriod:_({matchPatterns:$t,defaultMatchWidth:"any",parsePatterns:Ft,defaultParseWidth:"any"})},Ht={code:"en-US",formatDistance:st,formatLong:ht,formatRelative:ft,localize:pt,match:Et,options:{weekStartsOn:0,firstWeekContainsDate:1}};function At(e,t){const n=y(e,t==null?void 0:t.in);return Q(n,ot(n))+1}function jt(e,t){const n=y(e,t==null?void 0:t.in),a=+C(n)-+nt(n);return Math.round(a/V)+1}function U(e,t){var l,g,p,v;const n=y(e,t==null?void 0:t.in),a=n.getFullYear(),r=W(),o=(t==null?void 0:t.firstWeekContainsDate)??((g=(l=t==null?void 0:t.locale)==null?void 0:l.options)==null?void 0:g.firstWeekContainsDate)??r.firstWeekContainsDate??((v=(p=r.locale)==null?void 0:p.options)==null?void 0:v.firstWeekContainsDate)??1,i=w((t==null?void 0:t.in)||e,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const c=P(i,t),d=w((t==null?void 0:t.in)||e,0);d.setFullYear(a,0,o),d.setHours(0,0,0,0);const u=P(d,t);return+n>=+c?a+1:+n>=+u?a:a-1}function zt(e,t){var c,d,u,l;const n=W(),a=(t==null?void 0:t.firstWeekContainsDate)??((d=(c=t==null?void 0:t.locale)==null?void 0:c.options)==null?void 0:d.firstWeekContainsDate)??n.firstWeekContainsDate??((l=(u=n.locale)==null?void 0:u.options)==null?void 0:l.firstWeekContainsDate)??1,r=U(e,t),o=w((t==null?void 0:t.in)||e,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),P(o,t)}function Lt(e,t){const n=y(e,t==null?void 0:t.in),a=+P(n,t)-+zt(n,t);return Math.round(a/V)+1}function h(e,t){const n=e<0?"-":"",a=Math.abs(e).toString().padStart(t,"0");return n+a}const k={y(e,t){const n=e.getFullYear(),a=n>0?n:1-n;return h(t==="yy"?a%100:a,t.length)},M(e,t){const n=e.getMonth();return t==="M"?String(n+1):h(n+1,2)},d(e,t){return h(e.getDate(),t.length)},a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(e,t){return h(e.getHours()%12||12,t.length)},H(e,t){return h(e.getHours(),t.length)},m(e,t){return h(e.getMinutes(),t.length)},s(e,t){return h(e.getSeconds(),t.length)},S(e,t){const n=t.length,a=e.getMilliseconds(),r=Math.trunc(a*Math.pow(10,n-3));return h(r,t.length)}},M={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},H={G:function(e,t,n){const a=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if(t==="yo"){const a=e.getFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return k.y(e,t)},Y:function(e,t,n,a){const r=U(e,a),o=r>0?r:1-r;if(t==="YY"){const i=o%100;return h(i,2)}return t==="Yo"?n.ordinalNumber(o,{unit:"year"}):h(o,t.length)},R:function(e,t){const n=B(e);return h(n,t.length)},u:function(e,t){const n=e.getFullYear();return h(n,t.length)},Q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return h(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return h(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){const a=e.getMonth();switch(t){case"M":case"MM":return k.M(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){const a=e.getMonth();switch(t){case"L":return String(a+1);case"LL":return h(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,n,a){const r=Lt(e,a);return t==="wo"?n.ordinalNumber(r,{unit:"week"}):h(r,t.length)},I:function(e,t,n){const a=jt(e);return t==="Io"?n.ordinalNumber(a,{unit:"week"}):h(a,t.length)},d:function(e,t,n){return t==="do"?n.ordinalNumber(e.getDate(),{unit:"date"}):k.d(e,t)},D:function(e,t,n){const a=At(e);return t==="Do"?n.ordinalNumber(a,{unit:"dayOfYear"}):h(a,t.length)},E:function(e,t,n){const a=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return h(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return h(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){const a=e.getDay(),r=a===0?7:a;switch(t){case"i":return String(r);case"ii":return h(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){const r=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){const a=e.getHours();let r;switch(a===12?r=M.noon:a===0?r=M.midnight:r=a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){const a=e.getHours();let r;switch(a>=17?r=M.evening:a>=12?r=M.afternoon:a>=4?r=M.morning:r=M.night,t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if(t==="ho"){let a=e.getHours()%12;return a===0&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return k.h(e,t)},H:function(e,t,n){return t==="Ho"?n.ordinalNumber(e.getHours(),{unit:"hour"}):k.H(e,t)},K:function(e,t,n){const a=e.getHours()%12;return t==="Ko"?n.ordinalNumber(a,{unit:"hour"}):h(a,t.length)},k:function(e,t,n){let a=e.getHours();return a===0&&(a=24),t==="ko"?n.ordinalNumber(a,{unit:"hour"}):h(a,t.length)},m:function(e,t,n){return t==="mo"?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):k.m(e,t)},s:function(e,t,n){return t==="so"?n.ordinalNumber(e.getSeconds(),{unit:"second"}):k.s(e,t)},S:function(e,t){return k.S(e,t)},X:function(e,t,n){const a=e.getTimezoneOffset();if(a===0)return"Z";switch(t){case"X":return j(a);case"XXXX":case"XX":return b(a);case"XXXXX":case"XXX":default:return b(a,":")}},x:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"x":return j(a);case"xxxx":case"xx":return b(a);case"xxxxx":case"xxx":default:return b(a,":")}},O:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+A(a,":");case"OOOO":default:return"GMT"+b(a,":")}},z:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+A(a,":");case"zzzz":default:return"GMT"+b(a,":")}},t:function(e,t,n){const a=Math.trunc(+e/1e3);return h(a,t.length)},T:function(e,t,n){return h(+e,t.length)}};function A(e,t=""){const n=e>0?"-":"+",a=Math.abs(e),r=Math.trunc(a/60),o=a%60;return o===0?n+String(r):n+String(r)+t+h(o,2)}function j(e,t){return e%60===0?(e>0?"-":"+")+h(Math.abs(e)/60,2):b(e,t)}function b(e,t=""){const n=e>0?"-":"+",a=Math.abs(e),r=h(Math.trunc(a/60),2),o=h(a%60,2);return n+r+t+o}const z=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},G=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},Vt=(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return z(e,t);let o;switch(a){case"P":o=t.dateTime({width:"short"});break;case"PP":o=t.dateTime({width:"medium"});break;case"PPP":o=t.dateTime({width:"long"});break;case"PPPP":default:o=t.dateTime({width:"full"});break}return o.replace("{{date}}",z(a,t)).replace("{{time}}",G(r,t))},It={p:G,P:Vt},Rt=/^D+$/,Bt=/^Y+$/,Xt=["D","DD","YY","YYYY"];function Qt(e){return Rt.test(e)}function Ut(e){return Bt.test(e)}function Gt(e,t,n){const a=Zt(e,t,n);if(console.warn(a),Xt.includes(e))throw new RangeError(a)}function Zt(e,t,n){const a=e[0]==="Y"?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Jt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Kt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,te=/^'([^]*?)'?$/,ee=/''/g,ne=/[a-zA-Z]/;function mn(e,t,n){var l,g,p,v;const a=W(),r=a.locale??Ht,o=a.firstWeekContainsDate??((g=(l=a.locale)==null?void 0:l.options)==null?void 0:g.firstWeekContainsDate)??1,i=a.weekStartsOn??((v=(p=a.locale)==null?void 0:p.options)==null?void 0:v.weekStartsOn)??0,c=y(e,n==null?void 0:n.in);if(!rt(c))throw new RangeError("Invalid time value");let d=t.match(Kt).map(m=>{const f=m[0];if(f==="p"||f==="P"){const T=It[f];return T(m,r.formatLong)}return m}).join("").match(Jt).map(m=>{if(m==="''")return{isToken:!1,value:"'"};const f=m[0];if(f==="'")return{isToken:!1,value:ae(m)};if(H[f])return{isToken:!0,value:m};if(f.match(ne))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:m}});r.localize.preprocessor&&(d=r.localize.preprocessor(c,d));const u={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return d.map(m=>{if(!m.isToken)return m.value;const f=m.value;(Ut(f)||Qt(f))&&Gt(f,t,String(e));const T=H[f[0]];return T(c,f,r.localize,u)}).join("")}function ae(e){const t=e.match(te);return t?t[1].replace(ee,"'"):e}function yn(e,t){const n=()=>w(t==null?void 0:t.in,NaN),r=se(e);let o;if(r.date){const u=ce(r.date,2);o=ue(u.restDateString,u.year)}if(!o||isNaN(+o))return n();const i=+o;let c=0,d;if(r.time&&(c=de(r.time),isNaN(c)))return n();if(r.timezone){if(d=he(r.timezone),isNaN(d))return n()}else{const u=new Date(i+c),l=y(0,t==null?void 0:t.in);return l.setFullYear(u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate()),l.setHours(u.getUTCHours(),u.getUTCMinutes(),u.getUTCSeconds(),u.getUTCMilliseconds()),l}return y(i+c+d,t==null?void 0:t.in)}const O={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},re=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,oe=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,ie=/^([+-])(\d{2})(?::?(\d{2}))?$/;function se(e){const t={},n=e.split(O.dateTimeDelimiter);let a;if(n.length>2)return t;if(/:/.test(n[0])?a=n[0]:(t.date=n[0],a=n[1],O.timeZoneDelimiter.test(t.date)&&(t.date=e.split(O.timeZoneDelimiter)[0],a=e.substr(t.date.length,e.length))),a){const r=O.timezone.exec(a);r?(t.time=a.replace(r[1],""),t.timezone=r[1]):t.time=a}return t}function ce(e,t){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),a=e.match(n);if(!a)return{year:NaN,restDateString:""};const r=a[1]?parseInt(a[1]):null,o=a[2]?parseInt(a[2]):null;return{year:o===null?r:o*100,restDateString:e.slice((a[1]||a[2]).length)}}function ue(e,t){if(t===null)return new Date(NaN);const n=e.match(re);if(!n)return new Date(NaN);const a=!!n[4],r=D(n[1]),o=D(n[2])-1,i=D(n[3]),c=D(n[4]),d=D(n[5])-1;if(a)return ge(t,c,d)?le(t,c,d):new Date(NaN);{const u=new Date(0);return!me(t,o,i)||!ye(t,r)?new Date(NaN):(u.setUTCFullYear(t,o,Math.max(r,i)),u)}}function D(e){return e?parseInt(e):1}function de(e){const t=e.match(oe);if(!t)return NaN;const n=Y(t[1]),a=Y(t[2]),r=Y(t[3]);return we(n,a,r)?n*R+a*I+r*1e3:NaN}function Y(e){return e&&parseFloat(e.replace(",","."))||0}function he(e){if(e==="Z")return 0;const t=e.match(ie);if(!t)return 0;const n=t[1]==="+"?-1:1,a=parseInt(t[2]),r=t[3]&&parseInt(t[3])||0;return ke(a,r)?n*(a*R+r*I):NaN}function le(e,t,n){const a=new Date(0);a.setUTCFullYear(e,0,4);const r=a.getUTCDay()||7,o=(t-1)*7+n+1-r;return a.setUTCDate(a.getUTCDate()+o),a}const fe=[31,null,31,30,31,30,31,31,30,31,30,31];function Z(e){return e%400===0||e%4===0&&e%100!==0}function me(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(fe[t]||(Z(e)?29:28))}function ye(e,t){return t>=1&&t<=(Z(e)?366:365)}function ge(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}function we(e,t,n){return e===24?t===0&&n===0:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}function ke(e,t){return t>=0&&t<=59}/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,a)=>a?a.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=e=>{const t=Me(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var pe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=N.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:r="",children:o,iconNode:i,...c},d)=>N.createElement("svg",{ref:d,...pe,width:t,height:t,stroke:e,strokeWidth:a?Number(n)*24/Number(t):n,className:J("lucide",r),...!o&&!ve(c)&&{"aria-hidden":"true"},...c},[...i.map(([u,l])=>N.createElement(u,l)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=(e,t)=>{const n=N.forwardRef(({className:a,...r},o)=>N.createElement(xe,{ref:o,iconNode:t,className:J(`lucide-${be(L(e))}`,`lucide-${e}`,a),...r}));return n.displayName=L(e),n};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],gn=s("arrow-right",_e);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],wn=s("award",De);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",key:"178tsu"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",key:"1hqiys"}]],kn=s("bell-off",Ne);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],bn=s("bell",Pe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Mn=s("book-open",Oe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",key:"1e3is1"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",key:"1gqd8o"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77",key:"iwvgf7"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464",key:"efp6ie"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",key:"1gq6am"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464",key:"k1g0md"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77",key:"q97ue3"}]],pn=s("brain",Ce);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],vn=s("calendar-days",We);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],xn=s("calendar",Te);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],_n=s("chart-column",Se);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],Dn=s("chart-no-axes-column",Ye);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Nn=s("chevron-left",qe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Pn=s("chevron-right",$e);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],On=s("circle-alert",Fe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Cn=s("circle-check",Ee);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Wn=s("circle-x",He);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["path",{d:"m12.296 3.464 3.02 3.956",key:"qash78"}],["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",key:"1h7j8b"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"4lm6w1"}],["path",{d:"m6.18 5.276 3.1 3.899",key:"zjj9t3"}]],Tn=s("clapperboard",Ae);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Sn=s("clock",je);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Yn=s("download",ze);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",key:"9m4mmf"}],["path",{d:"m2.5 21.5 1.4-1.4",key:"17g3f0"}],["path",{d:"m20.1 3.9 1.4-1.4",key:"1qn309"}],["path",{d:"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",key:"1t2c92"}],["path",{d:"m9.6 14.4 4.8-4.8",key:"6umqxw"}]],qn=s("dumbbell",Le);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],$n=s("flame",Ve);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]],Fn=s("folder-kanban",Ie);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],En=s("layout-dashboard",Re);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],Hn=s("list-checks",Be);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],An=s("log-out",Xe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]],jn=s("microscope",Qe);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],zn=s("moon",Ue);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],Ln=s("pause",Ge);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Vn=s("pencil",Ze);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],In=s("play",Je);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Rn=s("plus",Ke);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Bn=s("rotate-ccw",tn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Xn=s("save",en);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Qn=s("search",nn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Un=s("settings",an);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Gn=s("square",rn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Zn=s("sun",on);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],Jn=s("timer",sn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Kn=s("trash-2",cn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],ta=s("trending-up",un);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ea=s("x",dn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],na=s("zap",hn);function K(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(n=K(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function aa(){for(var e,t,n=0,a="",r=arguments.length;n<r;n++)(e=arguments[n])&&(t=K(e))&&(a&&(a+=" "),a+=t);return a}export{gn as A,Mn as B,_n as C,qn as D,wn as E,Fn as F,Yn as G,Hn as H,Cn as I,Wn as J,Dn as K,En as L,zn as M,Rn as P,Bn as R,Un as S,Jn as T,ea as X,na as Z,vn as a,An as b,aa as c,fn as d,Pn as e,mn as f,Nn as g,bn as h,kn as i,Zn as j,Sn as k,ta as l,jn as m,pn as n,xn as o,yn as p,Tn as q,$n as r,On as s,In as t,Ln as u,Gn as v,Kn as w,Xn as x,Qn as y,Vn as z};
