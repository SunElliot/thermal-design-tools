/* ThermTools EN/中文 language switch.
   Walks static text nodes and swaps any whose English text is in DICT.
   Units/abbreviations (W/m², α/ε, MLI…) are intentionally left as symbols.
   Long SEO articles and dynamically-generated results use t()/en-only/zh-only. */
(function(){
  const DICT = {
    // ---- page titles (h1) ----
    "🌍 Orbital Heat Flux Calculator":"🌍 轨道热流计算器",
    "⚖️ Spacecraft Heat Balance Calculator":"⚖️ 整星热平衡计算器",
    "📈 Orbit Transient Temperature Simulator":"📈 轨道瞬态温度仿真器",
    "❄️ Spacecraft Radiator Sizing Calculator":"❄️ 卫星散热面设计计算器",
    "🔥 Spacecraft Heater Sizing Calculator":"🔥 卫星加热器设计计算器",
    "🛡️ MLI Heat Leak Calculator":"🛡️ 多层隔热（MLI）漏热计算器",
    "🔩 Conductive Coupling Calculator":"🔩 导热耦合计算器",
    "📚 Thermal Coatings, Materials & Limits":"📚 热控涂层·材料·温度限值速查",
    // ---- subtitles ----
    "Solar constant · albedo flux · Earth IR · altitude-dependent view factor · hot/cold cases":"太阳常数 · 反照热流 · 地球红外 · 随高度变化的视角系数 · 热/冷工况",
    "Single-node radiative equilibrium · hot & cold bounding cases · α/ε and area effects":"单节点辐射平衡 · 热/冷包络工况 · α/ε 与面积影响",
    "Lumped-capacity node over two orbits · eclipse swing · thermal time constant":"集总热容节点两圈仿真 · 地影温度波动 · 热时间常数",
    "Required area from rejected heat & temperature · net flux · cold-case heater check":"由排热量与温度求面积 · 净排热流 · 冷工况加热校核",
    "Cold-case losses at the setpoint · heater power with margin · duty cycle & orbit energy":"控温点冷工况漏热 · 含余量加热功率 · 占空比与每圈能量",
    "Effective emissivity from layer count · practical degradation · blanket heat leak":"由层数估算有效发射率 · 工程退化 · 隔热毯漏热",
    "Series kA/L path · per-segment conductance & ΔT · total coupling G":"串联 kA/L 路径 · 各段热导与温降 · 总耦合热导 G",
    "Coating α/ε (BOL→EOL) · material k, c_p · component temperature limits · environment constants":"涂层 α/ε（初期→末期）· 材料 k、c_p · 部件温度限值 · 环境常数",
    // ---- section titles ----
    "Inputs":"输入","Results":"结果","📖 How to use":"📖 使用说明",
    "Geometry & Surfaces":"几何与表面","Cases":"工况","Hot Case":"热工况","Cold Case":"冷工况",
    "Node & Orbit":"节点与轨道","Heat Inputs":"热输入","Temperature over Two Orbits":"两圈内温度曲线",
    "Hot Case (sizing)":"热工况（定容）","Cold Case (check)":"冷工况（校核）",
    "Component & Losses":"部件与漏热","Blanket":"隔热毯",
    "Series Path (heat source → sink)":"串联路径（热源 → 热沉）","Heat Flow":"热流",
    "Surface Coatings":"表面涂层","Structural Materials":"结构材料",
    "Typical Component Temperature Limits":"典型部件温度限值","Environment Constants":"环境常数",
    // ---- article headings ----
    "The three external heat sources":"三大外部热源",
    "Single-node heat balance":"单节点热平衡",
    "Lumped-capacity transient model":"集总热容瞬态模型",
    "Radiator sizing relations":"散热面设计关系式",
    "Heater sizing relations":"加热器设计关系式",
    "MLI effective emissivity":"MLI 有效发射率",
    "Series conduction":"串联导热",
    // ---- input labels ----
    "Orbit altitude":"轨道高度","Solar constant case":"太阳常数工况","Albedo coefficient":"反照系数",
    "Earth IR emission":"地球红外辐射","Sun-projected area":"对日投影面积","Nadir-facing area":"对地面积",
    "Total radiating area":"总辐射面积","Absorptivity α":"吸收率 α","Emissivity ε":"发射率 ε",
    "Internal power — hot":"内部功耗 — 热","Internal power — cold":"内部功耗 — 冷","Cold case sun":"冷工况光照",
    "Thermal mass":"热容质量","Specific heat c_p":"比热 c_p","Radiating ε·A":"辐射 ε·A",
    "Orbit period":"轨道周期","Eclipse duration":"地影时长",
    "Absorbed power — sunlit":"吸收功率 — 光照","Absorbed power — eclipse":"吸收功率 — 地影",
    "Internal dissipation":"内部耗散","Heat to reject":"待排热量","Radiator temperature":"散热面温度",
    "Absorbed external flux":"吸收外热流","Fin / coupling efficiency":"翅片/耦合效率","Sizing margin":"设计余量",
    "Internal heat — cold":"内热 — 冷工况","Absorbed flux — cold":"吸收热流 — 冷工况",
    "Min allowed temperature":"允许最低温度","Setpoint temperature":"控温点温度",
    "Mounting temperature — cold":"安装面温度 — 冷","Conductive coupling G":"导热耦合 G",
    "Radiative sink temperature":"辐射热沉温度","Internal dissipation — cold":"自身功耗 — 冷",
    "Design margin":"设计余量","ε* source":"ε* 来源","Number of layers N":"层数 N",
    "Foil emissivity":"反射膜发射率","Degradation factor":"退化系数","Measured ε*":"实测 ε*",
    "Blanket area":"隔热毯面积","Hot side temperature":"热侧温度","Cold side temperature":"冷侧温度",
    "Heat flow Q":"热流 Q",
    // ---- table headers ----
    "Material":"材料","Area (cm²)":"面积 (cm²)","Length (mm)":"长度 (mm)",
    // ---- select options ----
    "Hot — perihelion (1414 W/m²)":"热 — 近日点（1414 W/m²）","Mean (1361 W/m²)":"平均（1361 W/m²）",
    "Cold — aphelion (1322 W/m²)":"冷 — 远日点（1322 W/m²）",
    "In eclipse (S = 0)":"地影中（S = 0）","Sunlit, aphelion (S = 1322)":"光照、远日点（S = 1322）",
    "Estimate from layer count":"按层数估算","Measured / handbook ε*":"实测 / 手册 ε*",
    "Copper":"铜","Al 6061":"铝 6061","Al 7075":"铝 7075","Stainless steel":"不锈钢",
    "Ti-6Al-4V":"钛 TC4","CFRP (in-plane)":"碳纤维板（面内）","GFRP":"玻璃钢","PEEK":"PEEK",
    "Bolted joint (direct G)":"螺接界面（直接填 G）",
    // ---- hints ----
    "km, circular":"km，圆轨道","seasonal variation":"季节变化",
    "0.25–0.35 typical, hot case high":"典型 0.25–0.35，热工况取高",
    "W/m², 218–258, mean 237":"W/m²，218–258，平均 237",
    "m², A_sun":"m²，A_sun","m², sees Earth IR & albedo":"m²，接收地球红外与反照",
    "m², all external surfaces":"m²，全部外表面","solar, area-averaged":"太阳吸收，面积加权",
    "IR, area-averaged":"红外发射，面积加权","km — sets Earth view factor":"km——决定对地视角系数",
    "W dissipated, max ops":"W，最大工作模式","W dissipated, safe/eclipse":"W，安全模式/地影",
    "eclipse = no solar/albedo":"地影 = 无太阳/反照",
    "kg participating in the swing":"kg，参与温度波动的质量","J/(kg·K), Al ≈ 900":"J/(kg·K)，铝 ≈ 900",
    "m² effective (emissivity × area)":"m² 有效值（发射率 × 面积）","min":"分钟",
    "min/orbit — see OrbitTools":"分钟/圈——见 OrbitTools",
    "W, solar+albedo+IR (Heat Balance tool)":"W，太阳+反照+红外（热平衡工具）",
    "W, Earth IR only":"W，仅地球红外","W, constant":"W，恒定",
    "W, hot case":"W，热工况","°C, allowed hot-case surface T":"°C，热工况允许表面温度",
    "OSR/white ≈ 0.80–0.90":"OSR/白漆 ≈ 0.80–0.90",
    "W/m² on the radiator (env tool); anti-sun ≈ 0–30":"W/m²，散热面上（环境工具）；背阳面 ≈ 0–30",
    "0–1, typ. 0.85–0.95":"0–1，常取 0.85–0.95","%, on rejected heat":"%，加在排热量上",
    "W into the radiator, cold case":"W，冷工况流入散热面","W/m², eclipse/aphelion":"W/m²，地影/远日点",
    "°C, radiator/equipment survival":"°C，散热面/设备生存限",
    "°C to maintain":"°C，需维持的温度","°C of the structure it bolts to":"°C，安装结构温度",
    "W/K to mount (Conduction tool)":"W/K，至安装面（导热工具）",
    "m² effective, exposed surfaces (MLI: use ε*·A)":"m² 有效值，外露表面（包 MLI 时取 ε*·A）",
    "°C seen by those surfaces, cold case":"°C，这些表面所见热沉，冷工况",
    "W, own standby power":"W，自身待机功耗","%, typ. 25 (thermostat + uncertainty)":"%，常取 25（恒温器+不确定性）",
    "min, for energy per orbit":"分钟，用于每圈能量",
    "estimate from layers, or measured":"按层数估算或用实测值","reflective shields":"反射屏层数",
    "VDA ≈ 0.035":"镀铝膜 ≈ 0.035","seams, penetrations; flight typ. 5–10×":"接缝、穿舱件；飞行典型 5–10 倍",
    "flight-typical 0.01–0.03":"飞行典型 0.01–0.03","m²":"m²",
    "°C, e.g. spacecraft interior":"°C，如舱内","°C, outer layer / sink":"°C，外层/热沉",
    "W through the path":"W，流经该路径",
    // ---- result metric labels ----
    "Direct solar flux":"太阳直射热流","Earth view factor (nadir plate)":"对地平板视角系数",
    "Earth IR flux on nadir plate":"对地平板地球红外热流","Peak albedo flux (subsolar)":"峰值反照热流（星下点）",
    "Earth angular radius":"地球角半径","Space sink temperature":"深空热沉温度",
    "Absorbed solar":"吸收太阳直射","Absorbed albedo":"吸收反照","Absorbed Earth IR":"吸收地球红外",
    "Total heat in":"总吸热","Equilibrium temperature":"平衡温度",
    "Heat capacity C":"热容 C","Max temperature":"最高温度","Min temperature":"最低温度",
    "Swing per orbit":"每圈温度波动","Time constant τ":"时间常数 τ","Steady sunlit / eclipse T":"光照/地影稳态温度",
    "Blackbody emission @ T":"该温度辐射能力","Net rejection flux":"净排热流",
    "Required area (with margin)":"所需面积（含余量）","Cold-case equilibrium T":"冷工况平衡温度",
    "Heater to hold T_min":"维持 T_min 所需加热",
    "Conductive loss":"导热漏热","Radiative loss":"辐射漏热","Net loss (− dissipation)":"净漏热（− 自身功耗）",
    "Heater power (with margin)":"加热功率（含余量）","Duty cycle at that rating":"该装机下占空比",
    "Energy per orbit":"每圈能量",
    "Ideal ε* (layers)":"理想 ε*（按层数）","Effective ε* (flight)":"有效 ε*（飞行）",
    "Heat leak flux":"漏热热流","Total heat leak":"总漏热",
    "Total conductance G":"总热导 G","Total resistance":"总热阻","Total ΔT at Q":"总温降（@Q）",
    "Active segments":"有效段数",
    // ---- preset buttons ----
    "LEO 500 km":"LEO 500 km","SSO 800 km":"太阳同步 800 km","GEO":"GEO","VLEO 350 km":"超低轨 350 km",
    "EO smallsat, mixed surfaces":"遥感小卫星·混合表面","3U CubeSat":"3U 立方星",
    "White-painted bus":"白漆星体","MLI/kapton wrapped":"MLI/聚酰亚胺包覆",
    "EO smallsat 50 kg":"遥感小卫星 50 kg","Light external panel":"轻质外板",
    "OSR anti-sun radiator":"OSR 背阳散热面","White paint, sees albedo":"白漆·可见反照",
    "CubeSat face radiator":"立方星面散热","GEO comsat panel":"GEO 通信卫星板",
    "Battery box 10 °C":"蓄电池箱 10 °C","Propellant line 10 °C":"推进管路 10 °C",
    "Camera survival −10 °C":"相机生存 −10 °C","CubeSat battery 0 °C":"立方星电池 0 °C",
    "Bus blanket, 15 layers":"星体毯 15 层","Cryo blanket, 30 layers":"低温毯 30 层",
    "Light blanket, 5 layers":"轻型毯 5 层","Use measured ε*":"用实测 ε*",
    "Cu strap to radiator":"铜热带至散热面","Unit on Al bracket":"单机装铝支架","Isolated via GFRP":"玻璃钢隔热安装",
    // ---- gallery home ----
    "Satellite Thermal Control Tools":"卫星热控工具",
    "Free browser-based calculators for spacecraft thermal design — no signup, nothing uploaded.":"面向卫星热控分系统设计的免费在线计算器 — 免注册，数据不上传。",
    "Categories":"分类","All tools":"全部工具","← All tools":"← 全部工具",
    "Environment":"环境","Heat Balance":"热平衡","Rejection & Control":"排热与控温",
    "Insulation & Conduction":"隔热与导热","Reference":"参考",
    "Orbital Heat Fluxes":"轨道热流","Spacecraft Heat Balance":"整星热平衡","Orbit Transient Temps":"瞬态温度",
    "Radiator Sizing":"散热面设计","Heater Sizing":"加热器设计","MLI Heat Leak":"MLI 漏热",
    "Conductive Couplings":"导热耦合","Coatings, Materials & Limits":"涂层·材料·限值",
    "No tools match your search.":"没有匹配的工具。",
    // ---- gallery card descriptions ----
    "Solar constant by season, albedo and Earth IR with the altitude-dependent view factor.":"分季节太阳常数、反照与地球红外，含随高度变化的视角系数。",
    "Single-node radiative equilibrium — hot and cold bounding case temperatures side by side.":"单节点辐射平衡——热/冷包络工况温度并排给出。",
    "Lumped-capacity temperature over two orbits — eclipse swing and time constant.":"集总热容两圈温度仿真——地影波动与时间常数。",
    "Required area from rejected heat and temperature, plus the cold-case heater check.":"由排热量与温度求面积，并校核冷工况加热需求。",
    "Cold-case conductive + radiative losses → heater power, duty cycle and orbit energy.":"冷工况导热+辐射漏热 → 加热功率、占空比与每圈能量。",
    "Effective emissivity from layer count with flight degradation, and the blanket heat leak.":"由层数估算有效发射率（含飞行退化）及隔热毯漏热。",
    "Series kA/L path with bolted joints — total conductance and per-segment ΔT.":"含螺接界面的串联 kA/L 路径——总热导与各段温降。",
    "Coating α/ε BOL→EOL, material k & c_p, component temperature limits, constants.":"涂层 α/ε 初期→末期、材料 k 与 c_p、部件温度限值与常数。",
    // ---- footers ----
    "ThermTools · Free satellite thermal control calculators · heat balance / radiator / MLI · runs entirely in your browser.":"ThermTools · 免费卫星热控计算器 · 热平衡 / 散热面 / MLI · 完全在浏览器中运行。",
    "Free orbital heat flux calculator · solar, albedo, Earth IR · nothing leaves your browser.":"免费轨道热流计算器 · 太阳、反照、地球红外 · 数据不上传。",
    "Free spacecraft heat balance calculator · hot/cold equilibrium temperatures · nothing leaves your browser.":"免费整星热平衡计算器 · 热/冷工况平衡温度 · 数据不上传。",
    "Free orbit transient temperature simulator · eclipse swing & time constant · nothing leaves your browser.":"免费轨道瞬态温度仿真 · 地影波动与时间常数 · 数据不上传。",
    "Free spacecraft radiator sizing calculator · area, net flux, cold-case heater · nothing leaves your browser.":"免费卫星散热面设计计算器 · 面积、净热流、冷工况加热 · 数据不上传。",
    "Free spacecraft heater sizing calculator · survival power, duty cycle · nothing leaves your browser.":"免费卫星加热器设计计算器 · 保温功率、占空比 · 数据不上传。",
    "Free MLI heat leak calculator · effective emissivity, blanket leak · nothing leaves your browser.":"免费 MLI 漏热计算器 · 有效发射率、隔热毯漏热 · 数据不上传。",
    "Free conductive coupling calculator · series kA/L, ΔT · nothing leaves your browser.":"免费导热耦合计算器 · 串联 kA/L、温降 · 数据不上传。",
    "Spacecraft thermal quick reference · coatings, materials, limits · nothing leaves your browser.":"卫星热控速查 · 涂层、材料、限值 · 数据不上传。"
  };

  let nodes = [];
  function capture(){
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentNode;
        const tag = p && p.nodeName;
        if(tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
        if(p && p.closest && p.closest('.topnav')) return NodeFilter.FILTER_REJECT; // keep nav as-is
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n; while((n = w.nextNode())) nodes.push({ node:n, en:n.nodeValue });
  }
  // dynamic-content helpers used by each calculator's JS
  window.SATLANG = 'en';
  window.t = function(en, zh){ return (window.SATLANG === 'zh' && zh != null) ? zh : en; };
  const langCbs = [];
  window.onLang = function(cb){ langCbs.push(cb); };

  function applyLang(lang){
    window.SATLANG = (lang === 'zh') ? 'zh' : 'en';
    nodes.forEach(({node,en})=>{
      const key = en.trim();
      node.nodeValue = (lang === 'zh' && DICT[key]) ? en.replace(key, DICT[key]) : en;
    });
    document.querySelectorAll('[data-en]').forEach(el=>{
      const html = (lang === 'zh' && el.dataset.zh != null) ? el.dataset.zh : el.dataset.en;
      if(html != null) el.innerHTML = html;
    });
    document.querySelectorAll('[data-ph-en]').forEach(el=>{
      el.placeholder = (lang === 'zh' && el.dataset.phZh != null) ? el.dataset.phZh : el.dataset.phEn;
    });
    document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : 'en');
    document.body.classList.toggle('lang-zh', lang === 'zh');
    document.body.classList.toggle('lang-en', lang !== 'zh');
    if(bEn && bZh){ bEn.classList.toggle('active', lang !== 'zh'); bZh.classList.toggle('active', lang === 'zh'); }
    try{ localStorage.setItem('thermtools_lang', lang); }catch(e){}
    langCbs.forEach(cb=>{ try{ cb(lang); }catch(e){} });
  }
  let bEn, bZh;
  function initToggle(){
    const nav = document.querySelector('.topnav'); if(!nav) return;
    const box = document.createElement('div'); box.className = 'langtoggle';
    bEn = document.createElement('button'); bEn.type='button'; bEn.textContent='EN';
    bZh = document.createElement('button'); bZh.type='button'; bZh.textContent='中文';
    bEn.onclick = ()=>applyLang('en'); bZh.onclick = ()=>applyLang('zh');
    box.appendChild(bEn); box.appendChild(bZh); nav.appendChild(box);
  }
  document.addEventListener('DOMContentLoaded', function(){
    capture(); initToggle();
    let saved = 'en';
    const urlLang = new URLSearchParams(location.search).get('lang');
    if(urlLang === 'zh' || urlLang === 'en') saved = urlLang;
    else { try{ saved = localStorage.getItem('thermtools_lang') || 'en'; }catch(e){} }
    applyLang(saved);
  });
})();
