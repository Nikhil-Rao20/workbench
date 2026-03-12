import{r as N}from"./react-vendor-73BkhPiA.js";const R=6048e5,ne=864e5,B=6e4,Q=36e5,$=Symbol.for("constructDateFrom");function m(t,e){return typeof t=="function"?t(e):t&&typeof t=="object"&&$ in t?t[$](e):t instanceof Date?new t.constructor(e):new Date(e)}function f(t,e){return m(e||t,t)}function ae(t,e,n){const a=f(t,n==null?void 0:n.in);return isNaN(e)?m(t,NaN):(e&&a.setDate(a.getDate()+e),a)}function re(t,e,n){const a=f(t,n==null?void 0:n.in);if(isNaN(e))return m(t,NaN);if(!e)return a;const r=a.getDate(),s=m(t,a.getTime());s.setMonth(a.getMonth()+e+1,0);const c=s.getDate();return r>=c?s:(a.setFullYear(s.getFullYear(),s.getMonth(),r),a)}let se={};function P(){return se}function k(t,e){var i,o,d,l;const n=P(),a=(e==null?void 0:e.weekStartsOn)??((o=(i=e==null?void 0:e.locale)==null?void 0:i.options)==null?void 0:o.weekStartsOn)??n.weekStartsOn??((l=(d=n.locale)==null?void 0:d.options)==null?void 0:l.weekStartsOn)??0,r=f(t,e==null?void 0:e.in),s=r.getDay(),c=(s<a?7:0)+s-a;return r.setDate(r.getDate()-c),r.setHours(0,0,0,0),r}function T(t,e){return k(t,{...e,weekStartsOn:1})}function X(t,e){const n=f(t,e==null?void 0:e.in),a=n.getFullYear(),r=m(n,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const s=T(r),c=m(n,0);c.setFullYear(a,0,4),c.setHours(0,0,0,0);const i=T(c);return n.getTime()>=s.getTime()?a+1:n.getTime()>=i.getTime()?a:a-1}function H(t){const e=f(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function q(t,...e){const n=m.bind(null,t||e.find(a=>typeof a=="object"));return e.map(n)}function E(t,e){const n=f(t,e==null?void 0:e.in);return n.setHours(0,0,0,0),n}function U(t,e,n){const[a,r]=q(n==null?void 0:n.in,t,e),s=E(a),c=E(r),i=+s-H(s),o=+c-H(c);return Math.round((i-o)/ne)}function ce(t,e){const n=X(t,e),a=m(t,0);return a.setFullYear(n,0,4),a.setHours(0,0,0,0),T(a)}function G(t,e,n){return ae(t,e*7,n)}function oe(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function ie(t){return!(!oe(t)&&typeof t!="number"||isNaN(+f(t)))}function wn(t,e,n){const[a,r]=q(n==null?void 0:n.in,t,e),s=A(a,r),c=Math.abs(U(a,r));a.setDate(a.getDate()-s*c);const i=+(A(a,r)===-s),o=s*(c-i);return o===0?0:o}function A(t,e){const n=t.getFullYear()-e.getFullYear()||t.getMonth()-e.getMonth()||t.getDate()-e.getDate()||t.getHours()-e.getHours()||t.getMinutes()-e.getMinutes()||t.getSeconds()-e.getSeconds()||t.getMilliseconds()-e.getMilliseconds();return n<0?-1:n>0?1:n}function kn(t,e){const n=f(t,e==null?void 0:e.in),a=n.getMonth();return n.setFullYear(n.getFullYear(),a+1,0),n.setHours(23,59,59,999),n}function F(t,e){const[n,a]=q(t,e.start,e.end);return{start:n,end:a}}function Mn(t,e){const{start:n,end:a}=F(e==null?void 0:e.in,t);let r=+n>+a;const s=r?+n:+a,c=r?a:n;c.setHours(0,0,0,0);let i=1;const o=[];for(;+c<=s;)o.push(m(n,c)),c.setDate(c.getDate()+i),c.setHours(0,0,0,0);return r?o.reverse():o}function bn(t,e){const{start:n,end:a}=F(e==null?void 0:e.in,t);let r=+n>+a;const s=r?+n:+a,c=r?a:n;c.setHours(0,0,0,0),c.setDate(1);let i=1;const o=[];for(;+c<=s;)o.push(m(n,c)),c.setMonth(c.getMonth()+i);return r?o.reverse():o}function vn(t,e){const{start:n,end:a}=F(e==null?void 0:e.in,t);let r=+n>+a;const s=k(r?a:n,e),c=k(r?n:a,e);s.setHours(15),c.setHours(15);const i=+c.getTime();let o=s,d=(e==null?void 0:e.step)??1;if(!d)return[];d<0&&(d=-d,r=!r);const l=[];for(;+o<=i;)o.setHours(0),l.push(m(n,o)),o=G(o,d),o.setHours(15);return r?l.reverse():l}function xn(t,e){const n=f(t,e==null?void 0:e.in);return n.setDate(1),n.setHours(0,0,0,0),n}function ue(t,e){const n=f(t,e==null?void 0:e.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}function pn(t,e){var i,o,d,l;const n=P(),a=(e==null?void 0:e.weekStartsOn)??((o=(i=e==null?void 0:e.locale)==null?void 0:i.options)==null?void 0:o.weekStartsOn)??n.weekStartsOn??((l=(d=n.locale)==null?void 0:d.options)==null?void 0:l.weekStartsOn)??0,r=f(t,e==null?void 0:e.in),s=r.getDay(),c=(s<a?-7:0)+6-(s-a);return r.setDate(r.getDate()+c),r.setHours(23,59,59,999),r}const de={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},he=(t,e,n)=>{let a;const r=de[t];return typeof r=="string"?a=r:e===1?a=r.one:a=r.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};function S(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const le={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},fe={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},me={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},ye={date:S({formats:le,defaultWidth:"full"}),time:S({formats:fe,defaultWidth:"full"}),dateTime:S({formats:me,defaultWidth:"full"})},ge={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},we=(t,e,n,a)=>ge[t];function D(t){return(e,n)=>{const a=n!=null&&n.context?String(n.context):"standalone";let r;if(a==="formatting"&&t.formattingValues){const c=t.defaultFormattingWidth||t.defaultWidth,i=n!=null&&n.width?String(n.width):c;r=t.formattingValues[i]||t.formattingValues[c]}else{const c=t.defaultWidth,i=n!=null&&n.width?String(n.width):t.defaultWidth;r=t.values[i]||t.values[c]}const s=t.argumentCallback?t.argumentCallback(e):e;return r[s]}}const ke={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Me={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},be={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},ve={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},xe={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},pe={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},De=(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},_e={ordinalNumber:De,era:D({values:ke,defaultWidth:"wide"}),quarter:D({values:Me,defaultWidth:"wide",argumentCallback:t=>t-1}),month:D({values:be,defaultWidth:"wide"}),day:D({values:ve,defaultWidth:"wide"}),dayPeriod:D({values:xe,defaultWidth:"wide",formattingValues:pe,defaultFormattingWidth:"wide"})};function _(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],s=e.match(r);if(!s)return null;const c=s[0],i=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],o=Array.isArray(i)?Ne(i,w=>w.test(c)):Oe(i,w=>w.test(c));let d;d=t.valueCallback?t.valueCallback(o):o,d=n.valueCallback?n.valueCallback(d):d;const l=e.slice(c.length);return{value:d,rest:l}}}function Oe(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function Ne(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function Pe(t){return(e,n={})=>{const a=e.match(t.matchPattern);if(!a)return null;const r=a[0],s=e.match(t.parsePattern);if(!s)return null;let c=t.valueCallback?t.valueCallback(s[0]):s[0];c=n.valueCallback?n.valueCallback(c):c;const i=e.slice(r.length);return{value:c,rest:i}}}const We=/^(\d+)(th|st|nd|rd)?/i,Te=/\d+/i,Ce={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Se={any:[/^b/i,/^(a|c)/i]},Ye={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},qe={any:[/1/i,/2/i,/3/i,/4/i]},Fe={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},$e={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},He={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Ee={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Ae={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},je={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},ze={ordinalNumber:Pe({matchPattern:We,parsePattern:Te,valueCallback:t=>parseInt(t,10)}),era:_({matchPatterns:Ce,defaultMatchWidth:"wide",parsePatterns:Se,defaultParseWidth:"any"}),quarter:_({matchPatterns:Ye,defaultMatchWidth:"wide",parsePatterns:qe,defaultParseWidth:"any",valueCallback:t=>t+1}),month:_({matchPatterns:Fe,defaultMatchWidth:"wide",parsePatterns:$e,defaultParseWidth:"any"}),day:_({matchPatterns:He,defaultMatchWidth:"wide",parsePatterns:Ee,defaultParseWidth:"any"}),dayPeriod:_({matchPatterns:Ae,defaultMatchWidth:"any",parsePatterns:je,defaultParseWidth:"any"})},Le={code:"en-US",formatDistance:he,formatLong:ye,formatRelative:we,localize:_e,match:ze,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Ie(t,e){const n=f(t,e==null?void 0:e.in);return U(n,ue(n))+1}function Ve(t,e){const n=f(t,e==null?void 0:e.in),a=+T(n)-+ce(n);return Math.round(a/R)+1}function Z(t,e){var l,w,x,p;const n=f(t,e==null?void 0:e.in),a=n.getFullYear(),r=P(),s=(e==null?void 0:e.firstWeekContainsDate)??((w=(l=e==null?void 0:e.locale)==null?void 0:l.options)==null?void 0:w.firstWeekContainsDate)??r.firstWeekContainsDate??((p=(x=r.locale)==null?void 0:x.options)==null?void 0:p.firstWeekContainsDate)??1,c=m((e==null?void 0:e.in)||t,0);c.setFullYear(a+1,0,s),c.setHours(0,0,0,0);const i=k(c,e),o=m((e==null?void 0:e.in)||t,0);o.setFullYear(a,0,s),o.setHours(0,0,0,0);const d=k(o,e);return+n>=+i?a+1:+n>=+d?a:a-1}function Re(t,e){var i,o,d,l;const n=P(),a=(e==null?void 0:e.firstWeekContainsDate)??((o=(i=e==null?void 0:e.locale)==null?void 0:i.options)==null?void 0:o.firstWeekContainsDate)??n.firstWeekContainsDate??((l=(d=n.locale)==null?void 0:d.options)==null?void 0:l.firstWeekContainsDate)??1,r=Z(t,e),s=m((e==null?void 0:e.in)||t,0);return s.setFullYear(r,0,a),s.setHours(0,0,0,0),k(s,e)}function Be(t,e){const n=f(t,e==null?void 0:e.in),a=+k(n,e)-+Re(n,e);return Math.round(a/R)+1}function h(t,e){const n=t<0?"-":"",a=Math.abs(t).toString().padStart(e,"0");return n+a}const M={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return h(e==="yy"?a%100:a,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):h(n+1,2)},d(t,e){return h(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return h(t.getHours()%12||12,e.length)},H(t,e){return h(t.getHours(),e.length)},m(t,e){return h(t.getMinutes(),e.length)},s(t,e){return h(t.getSeconds(),e.length)},S(t,e){const n=e.length,a=t.getMilliseconds(),r=Math.trunc(a*Math.pow(10,n-3));return h(r,e.length)}},v={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},j={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const a=t.getFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return M.y(t,e)},Y:function(t,e,n,a){const r=Z(t,a),s=r>0?r:1-r;if(e==="YY"){const c=s%100;return h(c,2)}return e==="Yo"?n.ordinalNumber(s,{unit:"year"}):h(s,e.length)},R:function(t,e){const n=X(t);return h(n,e.length)},u:function(t,e){const n=t.getFullYear();return h(n,e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return h(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return h(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return M.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return h(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=Be(t,a);return e==="wo"?n.ordinalNumber(r,{unit:"week"}):h(r,e.length)},I:function(t,e,n){const a=Ve(t);return e==="Io"?n.ordinalNumber(a,{unit:"week"}):h(a,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):M.d(t,e)},D:function(t,e,n){const a=Ie(t);return e==="Do"?n.ordinalNumber(a,{unit:"dayOfYear"}):h(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),s=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(s);case"ee":return h(s,2);case"eo":return n.ordinalNumber(s,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),s=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(s);case"cc":return h(s,e.length);case"co":return n.ordinalNumber(s,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=a===0?7:a;switch(e){case"i":return String(r);case"ii":return h(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(a===12?r=v.noon:a===0?r=v.midnight:r=a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(a>=17?r=v.evening:a>=12?r=v.afternoon:a>=4?r=v.morning:r=v.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let a=t.getHours()%12;return a===0&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return M.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):M.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return e==="Ko"?n.ordinalNumber(a,{unit:"hour"}):h(a,e.length)},k:function(t,e,n){let a=t.getHours();return a===0&&(a=24),e==="ko"?n.ordinalNumber(a,{unit:"hour"}):h(a,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):M.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):M.s(t,e)},S:function(t,e){return M.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(a===0)return"Z";switch(e){case"X":return L(a);case"XXXX":case"XX":return b(a);case"XXXXX":case"XXX":default:return b(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return L(a);case"xxxx":case"xx":return b(a);case"xxxxx":case"xxx":default:return b(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+z(a,":");case"OOOO":default:return"GMT"+b(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+z(a,":");case"zzzz":default:return"GMT"+b(a,":")}},t:function(t,e,n){const a=Math.trunc(+t/1e3);return h(a,e.length)},T:function(t,e,n){return h(+t,e.length)}};function z(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),s=a%60;return s===0?n+String(r):n+String(r)+e+h(s,2)}function L(t,e){return t%60===0?(t>0?"-":"+")+h(Math.abs(t)/60,2):b(t,e)}function b(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=h(Math.trunc(a/60),2),s=h(a%60,2);return n+r+e+s}const I=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},J=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Qe=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return I(t,e);let s;switch(a){case"P":s=e.dateTime({width:"short"});break;case"PP":s=e.dateTime({width:"medium"});break;case"PPP":s=e.dateTime({width:"long"});break;case"PPPP":default:s=e.dateTime({width:"full"});break}return s.replace("{{date}}",I(a,e)).replace("{{time}}",J(r,e))},Xe={p:J,P:Qe},Ue=/^D+$/,Ge=/^Y+$/,Ze=["D","DD","YY","YYYY"];function Je(t){return Ue.test(t)}function Ke(t){return Ge.test(t)}function et(t,e,n){const a=tt(t,e,n);if(console.warn(a),Ze.includes(t))throw new RangeError(a)}function tt(t,e,n){const a=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const nt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,at=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,rt=/^'([^]*?)'?$/,st=/''/g,ct=/[a-zA-Z]/;function Dn(t,e,n){var l,w,x,p;const a=P(),r=a.locale??Le,s=a.firstWeekContainsDate??((w=(l=a.locale)==null?void 0:l.options)==null?void 0:w.firstWeekContainsDate)??1,c=a.weekStartsOn??((p=(x=a.locale)==null?void 0:x.options)==null?void 0:p.weekStartsOn)??0,i=f(t,n==null?void 0:n.in);if(!ie(i))throw new RangeError("Invalid time value");let o=e.match(at).map(g=>{const y=g[0];if(y==="p"||y==="P"){const C=Xe[y];return C(g,r.formatLong)}return g}).join("").match(nt).map(g=>{if(g==="''")return{isToken:!1,value:"'"};const y=g[0];if(y==="'")return{isToken:!1,value:ot(g)};if(j[y])return{isToken:!0,value:g};if(y.match(ct))throw new RangeError("Format string contains an unescaped latin alphabet character `"+y+"`");return{isToken:!1,value:g}});r.localize.preprocessor&&(o=r.localize.preprocessor(i,o));const d={firstWeekContainsDate:s,weekStartsOn:c,locale:r};return o.map(g=>{if(!g.isToken)return g.value;const y=g.value;(Ke(y)||Je(y))&&et(y,e,String(t));const C=j[y[0]];return C(i,y,r.localize,d)}).join("")}function ot(t){const e=t.match(rt);return e?e[1].replace(st,"'"):t}function _n(t,e){return+f(t)>+f(e)}function On(t,e){return+f(t)<+f(e)}function Nn(t,e){const n=()=>m(e==null?void 0:e.in,NaN),r=ht(t);let s;if(r.date){const d=lt(r.date,2);s=ft(d.restDateString,d.year)}if(!s||isNaN(+s))return n();const c=+s;let i=0,o;if(r.time&&(i=mt(r.time),isNaN(i)))return n();if(r.timezone){if(o=yt(r.timezone),isNaN(o))return n()}else{const d=new Date(c+i),l=f(0,e==null?void 0:e.in);return l.setFullYear(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()),l.setHours(d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds()),l}return f(c+i+o,e==null?void 0:e.in)}const W={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},it=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ut=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,dt=/^([+-])(\d{2})(?::?(\d{2}))?$/;function ht(t){const e={},n=t.split(W.dateTimeDelimiter);let a;if(n.length>2)return e;if(/:/.test(n[0])?a=n[0]:(e.date=n[0],a=n[1],W.timeZoneDelimiter.test(e.date)&&(e.date=t.split(W.timeZoneDelimiter)[0],a=t.substr(e.date.length,t.length))),a){const r=W.timezone.exec(a);r?(e.time=a.replace(r[1],""),e.timezone=r[1]):e.time=a}return e}function lt(t,e){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),a=t.match(n);if(!a)return{year:NaN,restDateString:""};const r=a[1]?parseInt(a[1]):null,s=a[2]?parseInt(a[2]):null;return{year:s===null?r:s*100,restDateString:t.slice((a[1]||a[2]).length)}}function ft(t,e){if(e===null)return new Date(NaN);const n=t.match(it);if(!n)return new Date(NaN);const a=!!n[4],r=O(n[1]),s=O(n[2])-1,c=O(n[3]),i=O(n[4]),o=O(n[5])-1;if(a)return bt(e,i,o)?gt(e,i,o):new Date(NaN);{const d=new Date(0);return!kt(e,s,c)||!Mt(e,r)?new Date(NaN):(d.setUTCFullYear(e,s,Math.max(r,c)),d)}}function O(t){return t?parseInt(t):1}function mt(t){const e=t.match(ut);if(!e)return NaN;const n=Y(e[1]),a=Y(e[2]),r=Y(e[3]);return vt(n,a,r)?n*Q+a*B+r*1e3:NaN}function Y(t){return t&&parseFloat(t.replace(",","."))||0}function yt(t){if(t==="Z")return 0;const e=t.match(dt);if(!e)return 0;const n=e[1]==="+"?-1:1,a=parseInt(e[2]),r=e[3]&&parseInt(e[3])||0;return xt(a,r)?n*(a*Q+r*B):NaN}function gt(t,e,n){const a=new Date(0);a.setUTCFullYear(t,0,4);const r=a.getUTCDay()||7,s=(e-1)*7+n+1-r;return a.setUTCDate(a.getUTCDate()+s),a}const wt=[31,null,31,30,31,30,31,31,30,31,30,31];function K(t){return t%400===0||t%4===0&&t%100!==0}function kt(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(wt[e]||(K(t)?29:28))}function Mt(t,e){return e>=1&&e<=(K(t)?366:365)}function bt(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}function vt(t,e,n){return t===24?e===0&&n===0:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}function xt(t,e){return e>=0&&e<=59}function Pn(t,e,n){return re(t,-1,n)}function Wn(t,e,n){return G(t,-e,n)}/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=(...t)=>t.filter((e,n,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,a)=>a?a.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=t=>{const e=Dt(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _t={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=N.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:r="",children:s,iconNode:c,...i},o)=>N.createElement("svg",{ref:o,..._t,width:e,height:e,stroke:t,strokeWidth:a?Number(n)*24/Number(e):n,className:ee("lucide",r),...!s&&!Ot(i)&&{"aria-hidden":"true"},...i},[...c.map(([d,l])=>N.createElement(d,l)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=(t,e)=>{const n=N.forwardRef(({className:a,...r},s)=>N.createElement(Nt,{ref:s,iconNode:e,className:ee(`lucide-${pt(V(t))}`,`lucide-${t}`,a),...r}));return n.displayName=V(t),n};/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Tn=u("arrow-right",Pt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],Cn=u("award",Wt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",key:"178tsu"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",key:"1hqiys"}]],Sn=u("bell-off",Tt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Yn=u("bell",Ct);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],qn=u("book-open",St);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",key:"1e3is1"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",key:"1gqd8o"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77",key:"iwvgf7"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464",key:"efp6ie"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",key:"1gq6am"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464",key:"k1g0md"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77",key:"q97ue3"}]],Fn=u("brain",Yt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],$n=u("calendar-days",qt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Hn=u("calendar",Ft);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],En=u("chart-column",$t);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],An=u("chart-no-axes-column",Ht);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],jn=u("chevron-left",Et);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],zn=u("chevron-right",At);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ln=u("circle-alert",jt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],In=u("circle-check",zt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Vn=u("circle-x",Lt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"m12.296 3.464 3.02 3.956",key:"qash78"}],["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",key:"1h7j8b"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"4lm6w1"}],["path",{d:"m6.18 5.276 3.1 3.899",key:"zjj9t3"}]],Rn=u("clapperboard",It);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Bn=u("clock",Vt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Qn=u("download",Rt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",key:"9m4mmf"}],["path",{d:"m2.5 21.5 1.4-1.4",key:"17g3f0"}],["path",{d:"m20.1 3.9 1.4-1.4",key:"1qn309"}],["path",{d:"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",key:"1t2c92"}],["path",{d:"m9.6 14.4 4.8-4.8",key:"6umqxw"}]],Xn=u("dumbbell",Bt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],Un=u("flame",Qt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]],Gn=u("folder-kanban",Xt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Zn=u("layout-dashboard",Ut);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],Jn=u("list-checks",Gt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Kn=u("log-out",Zt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]],ea=u("microscope",Jt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],ta=u("moon",Kt);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],na=u("pause",en);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],aa=u("pencil",tn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],ra=u("play",nn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],sa=u("plus",an);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],ca=u("rotate-ccw",rn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],oa=u("save",sn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],ia=u("search",cn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ua=u("settings",on);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],da=u("square",un);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],ha=u("sun",dn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],la=u("timer",hn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],fa=u("trash-2",ln);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],ma=u("trending-up",fn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ya=u("x",mn);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ga=u("zap",yn);function te(t){var e,n,a="";if(typeof t=="string"||typeof t=="number")a+=t;else if(typeof t=="object")if(Array.isArray(t)){var r=t.length;for(e=0;e<r;e++)t[e]&&(n=te(t[e]))&&(a&&(a+=" "),a+=n)}else for(n in t)t[n]&&(a&&(a+=" "),a+=n);return a}function wa(){for(var t,e,n=0,a="",r=arguments.length;n<r;n++)(t=arguments[n])&&(e=te(t))&&(a&&(a+=" "),a+=e);return a}export{Qn as $,Tn as A,qn as B,$n as C,Xn as D,Mn as E,Gn as F,pn as G,k as H,Wn as I,vn as J,bn as K,Zn as L,ta as M,kn as N,_n as O,aa as P,On as Q,ca as R,ua as S,la as T,ae as U,xn as V,Cn as W,ya as X,Pn as Y,ga as Z,re as _,En as a,Jn as a0,In as a1,Vn as a2,An as a3,Kn as b,wa as c,wn as d,zn as e,Dn as f,jn as g,Yn as h,Sn as i,ha as j,Bn as k,ma as l,ea as m,Fn as n,Hn as o,Nn as p,Rn as q,sa as r,Un as s,Ln as t,ra as u,na as v,da as w,fa as x,oa as y,ia as z};
