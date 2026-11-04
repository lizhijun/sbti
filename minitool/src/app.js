/* SBTI mini-tool — classic script, ES2017 (Chrome 61 baseline). No network, no eval. */
(function () {
  "use strict";

  var DATA = window.SBTI_DATA;
  var DIMS = DATA.dimensionCodes;
  var typeByCode = {};
  DATA.types.forEach(function (t) { typeByCode[t.code] = t; });
  var normalTypes = DATA.types.filter(function (t) { return !t.special && t.pattern; });
  var drinkGate = DATA.drinkQuestions.filter(function (q) { return q.kind === "drink_gate"; })[0];
  var drinkTrigger = DATA.drinkQuestions.filter(function (q) { return q.kind === "drink_trigger"; })[0];
  var TOTAL = DATA.questions.length + 1;
  var STORAGE_KEY = "sbti:result-snapshot:v1";
  var GROUP_COLORS = ["#1f8a5b", "#e5487a", "#e59a0b", "#2f6fe4", "#8b5cf6"];
  var KEYS = ["A", "B", "C", "D", "E"];
  var SVG_NS = "http://www.w3.org/2000/svg";

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------------- Container API helpers ---------------- */

  function getMiniTool() {
    return window.xhs && window.xhs.miniTool ? window.xhs.miniTool : null;
  }

  function readBuildVersion(launchOptions) {
    var env = launchOptions && launchOptions.miniToolEnv;
    return Number(env && env.buildVersion) || 0;
  }

  var versionPromise = null;
  function getClientVersion() {
    if (!versionPromise) {
      versionPromise = (async function () {
        var xhs = window.xhs;
        var v = readBuildVersion(xhs && xhs.launchOptions);
        if (!v) {
          var mt = getMiniTool();
          if (mt && typeof mt.getLaunchOptions === "function") {
            try { v = readBuildVersion(await mt.getLaunchOptions()); } catch (e) { v = 0; }
          }
        }
        return Math.floor(v / 1000);
      })();
    }
    return versionPromise;
  }

  async function canUse(method, minVersion) {
    var mt = getMiniTool();
    if (!mt || typeof mt[method] !== "function") return false;
    if (!minVersion) return true;
    return (await getClientVersion()) >= minVersion;
  }

  async function storageSet(key, value) {
    var serialized;
    try { serialized = JSON.stringify(value); } catch (e) { return false; }
    if (await canUse("setStorage", 9460)) {
      try { await getMiniTool().setStorage({ key: key, data: serialized }); return true; } catch (e) { return false; }
    }
    try { window.localStorage.setItem(key, serialized); return true; } catch (e) { return false; }
  }

  async function storageGet(key) {
    var raw = null;
    if (await canUse("getStorage", 9460)) {
      try { raw = (await getMiniTool().getStorage({ key: key })).data; } catch (e) { raw = null; }
    } else {
      try { raw = window.localStorage.getItem(key); } catch (e) { raw = null; }
    }
    if (raw === null || raw === undefined || raw === "") return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function vibrate(type) {
    canUse("vibrateShort", 9500).then(function (ok) {
      if (!ok) return;
      try {
        var p = getMiniTool().vibrateShort({ type: type || "light" });
        if (p && typeof p.catch === "function") p.catch(function () {});
      } catch (e) { /* ignore */ }
    });
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.add("hidden"); }, 2000);
  }

  /* ---------------- Scoring (port of lib/scoring.ts) ---------------- */

  var LV_NUM = { L: 1, M: 2, H: 3 };
  function parsePattern(p) { return p.replace(/-/g, "").split(""); }

  function computeResult(answers, isDrunk) {
    var raw = {};
    DIMS.forEach(function (d) { raw[d] = 0; });
    DATA.questions.forEach(function (q) { raw[q.dim] += Number(answers[q.id] || 0); });

    var levels = {};
    DIMS.forEach(function (d) {
      var s = raw[d];
      levels[d] = s <= 3 ? "L" : s === 4 ? "M" : "H";
    });
    var user = DIMS.map(function (d) { return LV_NUM[levels[d]]; });

    var ranked = normalTypes.map(function (t) {
      var tp = parsePattern(t.pattern).map(function (l) { return LV_NUM[l]; });
      var distance = 0, exact = 0;
      for (var i = 0; i < tp.length; i++) {
        var diff = Math.abs(user[i] - tp[i]);
        distance += diff;
        if (diff === 0) exact++;
      }
      return { code: t.code, distance: distance, exact: exact, similarity: Math.max(0, Math.round((1 - distance / 30) * 100)) };
    }).sort(function (a, b) {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return b.similarity - a.similarity;
    });

    var best = ranked[0];
    var finalCode = best.code;
    var secondaryCode = null;
    if (isDrunk) { finalCode = "DRUNK"; secondaryCode = best.code; }
    else if (best.similarity < 60) { finalCode = "HHHH"; }

    return {
      finalTypeCode: finalCode,
      secondaryCode: secondaryCode,
      levels: levels,
      rawScores: raw,
      similarity: best.similarity,
      exact: best.exact,
      top: ranked.slice(0, 3),
      createdAt: Date.now()
    };
  }

  function narrative(r) {
    if (r.finalTypeCode === "DRUNK") {
      return { kicker: "隐藏人格已激活", badge: "匹配度 100% · 酒精异常因子已接管", sub: "乙醇亲和性过强，系统已直接跳过常规人格审判。" };
    }
    if (r.finalTypeCode === "HHHH") {
      return { kicker: "系统强制兜底", badge: "标准人格库最高匹配仅 " + r.similarity + "%", sub: "标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。" };
    }
    return { kicker: "你的主类型", badge: "匹配度 " + r.similarity + "% · 精准命中 " + r.exact + "/15 维", sub: "维度命中度较高，当前结果可视为你的第一人格画像。" };
  }

  function displaySimilarity(r) {
    return r.finalTypeCode === "DRUNK" ? 100 : r.similarity;
  }

  /* ---------------- View switching ---------------- */

  var VIEWS = ["home", "quiz", "computing", "result"];
  function show(name) {
    VIEWS.forEach(function (v) { $("view-" + v).classList.toggle("hidden", v !== name); });
    window.scrollTo(0, 0);
  }

  function groupIndexOf(dim) {
    for (var i = 0; i < DATA.modelGroups.length; i++) {
      if (DATA.modelGroups[i].dimensions.indexOf(dim) !== -1) return i;
    }
    return 0;
  }

  /* ---------------- Home ---------------- */

  function renderMarquee() {
    var half = Math.ceil(DATA.types.length / 2);
    [[DATA.types.slice(0, half), "marquee-a"], [DATA.types.slice(half), "marquee-b"]].forEach(function (pair) {
      var track = $(pair[1]);
      // two copies so translateX(-50%) loops seamlessly
      pair[0].concat(pair[0]).forEach(function (t) {
        var card = el("div", "m-card");
        var img = el("img");
        img.src = t.image;
        img.alt = "";
        card.appendChild(img);
        track.appendChild(card);
      });
    });
  }

  /* ---------------- Quiz ---------------- */

  var state = { index: 0, phase: "quiz", answers: {}, locked: false };
  var current = null;

  function currentQuestion() {
    if (state.phase === "quiz") return DATA.questions[state.index];
    return state.phase === "drink_gate" ? drinkGate : drinkTrigger;
  }

  function renderSegbar() {
    var bar = $("segbar");
    if (!bar.children.length) {
      for (var i = 0; i < TOTAL; i++) bar.appendChild(el("span", "seg"));
    }
    var pos = state.phase === "quiz" ? state.index : TOTAL - 1;
    for (var j = 0; j < TOTAL; j++) {
      bar.children[j].className = "seg" + (j < pos ? " done" : j === pos ? " now" : "");
    }
  }

  function renderQuestion(direction) {
    var q = currentQuestion();
    var isMain = state.phase === "quiz";
    var num = isMain ? state.index + 1 : TOTAL;
    $("q-num").textContent = pad2(num);
    $("q-total").textContent = "/" + TOTAL;

    var chip = $("q-chip");
    if (isMain) {
      var gi = groupIndexOf(q.dim);
      chip.textContent = DATA.modelGroups[gi].title;
      chip.style.background = GROUP_COLORS[gi];
      chip.style.color = "#fff";
      $("q-dim").textContent = DATA.dimensionMeta[q.dim].name;
    } else {
      chip.textContent = "附加题";
      chip.style.background = "#141414";
      chip.style.color = "#fff";
      $("q-dim").textContent = "最后一个小问题";
    }
    var text = $("q-text");
    text.textContent = q.text;
    text.classList.toggle("long", q.text.length > 60);
    renderSegbar();

    var box = $("options");
    box.innerHTML = "";
    var selected = state.answers[q.id];
    q.options.forEach(function (opt, i) {
      var b = el("button", "option press" + (selected === opt.value ? " selected" : ""));
      b.type = "button";
      b.appendChild(el("span", "opt-key", KEYS[i]));
      b.appendChild(el("span", "opt-label", opt.label));
      b.addEventListener("click", function () { selectOption(opt.value, b); });
      box.appendChild(b);
    });

    var anim = direction === "back" ? "enter-back" : "enter";
    [$("q-card"), box].forEach(function (n) {
      n.classList.remove("enter", "enter-back");
      void n.offsetWidth; // restart animation
      n.classList.add(anim);
    });

    $("btn-prev").disabled = isMain && state.index === 0;
    $("btn-next").disabled = selected === undefined;
  }

  function selectOption(value, node) {
    if (state.locked) return;
    var q = currentQuestion();
    state.answers[q.id] = value;
    var all = $("options").children;
    for (var i = 0; i < all.length; i++) all[i].classList.remove("selected");
    node.classList.add("selected");
    $("btn-next").disabled = false;
    vibrate("light");
    state.locked = true;
    setTimeout(function () { state.locked = false; next(value); }, 260);
  }

  function next(value) {
    if (state.phase === "quiz") {
      if (state.index < DATA.questions.length - 1) state.index++;
      else state.phase = "drink_gate";
    } else if (state.phase === "drink_gate") {
      if (value === 3) state.phase = "drink_trigger";
      else return finish(false);
    } else {
      return finish(value === 2);
    }
    renderQuestion("forward");
  }

  function prev() {
    if (state.phase === "drink_trigger") state.phase = "drink_gate";
    else if (state.phase === "drink_gate") { state.phase = "quiz"; state.index = DATA.questions.length - 1; }
    else if (state.index > 0) state.index--;
    else return;
    renderQuestion("back");
  }

  function startQuiz() {
    state = { index: 0, phase: "quiz", answers: {}, locked: false };
    show("quiz");
    renderQuestion("forward");
  }

  /* ---------------- Computing ---------------- */

  function finish(isDrunk) {
    var result = computeResult(state.answers, isDrunk);
    current = result;
    storageSet(STORAGE_KEY, result).then(function () { updateLastEntry(); });
    show("computing");

    var steps = DIMS.map(function (d) { return "解析 " + DATA.dimensionMeta[d].name + "……"; });
    steps.push("匹配 25 种标准人格……");
    var i = 0;
    var timer = setInterval(function () {
      if (i < steps.length) {
        $("scan-line").textContent = steps[i];
        $("scan-pct").textContent = Math.round((i + 1) / steps.length * 100) + "%";
        i++;
        return;
      }
      clearInterval(timer);
      vibrate("medium");
      renderResult(result);
      show("result");
    }, 90);
  }

  /* ---------------- Result ---------------- */

  function buildRing(pct) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("width", "64");
    svg.setAttribute("height", "64");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    var c = 2 * Math.PI * 27;
    [["#ececec", c], ["#1f8a5b", c * (1 - pct / 100)]].forEach(function (cfg, idx) {
      var circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", "32");
      circle.setAttribute("cy", "32");
      circle.setAttribute("r", "27");
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", cfg[0]);
      circle.setAttribute("stroke-width", "7");
      if (idx === 1) {
        circle.setAttribute("stroke-linecap", "round");
        circle.setAttribute("stroke-dasharray", String(c));
        circle.setAttribute("stroke-dashoffset", String(cfg[1]));
        circle.setAttribute("transform", "rotate(-90 32 32)");
      }
      svg.appendChild(circle);
    });
    return svg;
  }

  function renderResult(r) {
    var t = typeByCode[r.finalTypeCode];
    var n = narrative(r);
    var special = r.finalTypeCode === "DRUNK" || r.finalTypeCode === "HHHH";
    $("poster").classList.toggle("special", special);
    $("r-kicker").textContent = n.kicker;
    $("r-image").src = t.image;
    $("r-image").alt = t.cn;
    $("r-code").textContent = t.code;
    $("r-cn").textContent = t.cn;
    $("r-intro").textContent = t.intro;
    $("r-badge").textContent = n.badge;
    $("r-sub").textContent = n.sub;

    var ring = $("r-ring");
    var oldSvg = ring.querySelector("svg");
    if (oldSvg) ring.removeChild(oldSvg);
    var pct = displaySimilarity(r);
    ring.insertBefore(buildRing(pct), ring.firstChild);
    $("r-sim").textContent = pct + "%";

    var sec = $("r-secondary");
    if (r.secondaryCode && typeByCode[r.secondaryCode]) {
      var s = typeByCode[r.secondaryCode];
      sec.textContent = "🍶 清醒时的你：" + s.code + "（" + s.cn + "）";
      sec.classList.remove("hidden");
    } else {
      sec.classList.add("hidden");
    }

    $("r-desc").textContent = t.desc;
    $("desc-wrap").classList.add("collapsed");
    $("btn-more").textContent = "展开全文 ⌄";

    var dims = $("r-dims");
    dims.innerHTML = "";
    DATA.modelGroups.forEach(function (g, gi) {
      var color = GROUP_COLORS[gi];
      var group = el("div", "group");
      group.style.setProperty("--gc", color);
      var head = el("div", "group-head");
      var dot = el("span", "group-dot");
      dot.style.background = color;
      head.appendChild(dot);
      head.appendChild(el("span", "group-title", g.title));
      head.appendChild(el("span", "group-code", g.dimensions.map(function (d) { return r.levels[d]; }).join("")));
      group.appendChild(head);

      g.dimensions.forEach(function (d) {
        var lv = r.levels[d];
        var row = el("div", "dim");
        var dh = el("div", "dim-head");
        var name = el("span", "dim-name");
        var label = DATA.dimensionMeta[d].name;
        var codePart = label.split(" ")[0];
        name.appendChild(el("i", "", codePart));
        name.appendChild(document.createTextNode(label.slice(codePart.length + 1)));
        dh.appendChild(name);
        var meter = el("span", "meter");
        for (var k = 1; k <= 3; k++) meter.appendChild(el("span", k <= LV_NUM[lv] ? "on" : ""));
        dh.appendChild(meter);
        var tag = el("span", "lv-tag", lv);
        tag.style.color = color;
        dh.appendChild(tag);
        row.appendChild(dh);
        row.appendChild(el("p", "dim-exp", DATA.dimensionExplanations[d][lv]));
        group.appendChild(row);
      });
      dims.appendChild(group);
    });

    var top = $("r-top");
    top.innerHTML = "";
    r.top.forEach(function (item, i) {
      var tt = typeByCode[item.code];
      var row = el("div", "top");
      row.appendChild(el("span", "top-rank", String(i + 1)));
      var img = el("img");
      img.src = tt.image;
      img.alt = tt.cn;
      row.appendChild(img);
      var info = el("div", "top-info");
      info.appendChild(el("p", "top-name", tt.code + " · " + tt.cn));
      var bar = el("div", "top-bar");
      var fill = el("i");
      fill.style.width = item.similarity + "%";
      bar.appendChild(fill);
      info.appendChild(bar);
      row.appendChild(info);
      row.appendChild(el("span", "top-sim", item.similarity + "%"));
      top.appendChild(row);
    });
  }

  function toggleDesc() {
    var wrap = $("desc-wrap");
    var collapsed = wrap.classList.toggle("collapsed");
    $("btn-more").textContent = collapsed ? "展开全文 ⌄" : "收起 ⌃";
  }

  /* ---------------- Share card (Canvas 2D, 1080x1440) ---------------- */

  function loadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  function wrapText(ctx, text, maxWidth) {
    var lines = [], line = "";
    for (var i = 0; i < text.length; i++) {
      var test = line + text.charAt(i);
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = text.charAt(i); }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ink-bordered box with hard offset shadow
  function inkBox(ctx, x, y, w, h, r, fill, shadow) {
    if (shadow) {
      ctx.fillStyle = "#141414";
      roundRect(ctx, x + shadow, y + shadow, w, h, r);
      ctx.fill();
    }
    ctx.fillStyle = fill;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#141414";
    ctx.stroke();
  }

  var FONT = '-apple-system, "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';

  async function buildShareImage(r) {
    var t = typeByCode[r.finalTypeCode];
    var n = narrative(r);
    var special = r.finalTypeCode === "DRUNK" || r.finalTypeCode === "HHHH";
    var W = 1080, H = 1440;
    var canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f7f4ed";
    ctx.fillRect(0, 0, W, H);

    // poster
    inkBox(ctx, 60, 60, W - 132, H - 132, 56, special ? "#fde68a" : "#d9f99d", 14);

    // header
    inkBox(ctx, 110, 110, 420, 72, 36, "#141414", 0);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 34px " + FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SBTI · " + n.kicker, 320, 147);
    ctx.fillStyle = "#141414";
    ctx.textAlign = "right";
    ctx.font = "900 36px " + FONT;
    ctx.fillText("抽象人格档案", W - 120, 147);

    // image frame (slightly rotated)
    var img = await loadImage(t.image);
    ctx.save();
    ctx.translate(W / 2, 445);
    ctx.rotate(-0.035);
    inkBox(ctx, -210, -210, 420, 420, 44, "#ffffff", 12);
    if (img) {
      ctx.save();
      roundRect(ctx, -208, -208, 416, 416, 42);
      ctx.clip();
      var scale = Math.max(416 / img.width, 416 / img.height);
      var dw = img.width * scale, dh = img.height * scale;
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
      roundRect(ctx, -210, -210, 420, 420, 44);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#141414";
      ctx.stroke();
    }
    ctx.restore();

    // name
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#141414";
    ctx.font = "900 120px " + FONT;
    ctx.fillText(t.code, W / 2, 815);
    ctx.font = "900 56px " + FONT;
    ctx.fillText(t.cn, W / 2, 890);
    ctx.fillStyle = "#3a3a3a";
    ctx.font = "500 36px " + FONT;
    ctx.fillText("「" + t.intro + "」", W / 2, 946);

    // match box
    inkBox(ctx, 120, 985, W - 252, 136, 32, "#ffffff", 0);
    var pct = displaySimilarity(r);
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#ececec";
    ctx.arc(200, 1053, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#1f8a5b";
    ctx.lineCap = "round";
    ctx.arc(200, 1053, 44, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct / 100);
    ctx.stroke();
    ctx.lineCap = "butt";
    ctx.fillStyle = "#141414";
    ctx.font = "900 26px " + FONT;
    ctx.fillText(pct + "%", 200, 1063);
    ctx.textAlign = "left";
    ctx.font = "800 32px " + FONT;
    ctx.fillText(n.badge, 272, 1041);
    ctx.fillStyle = "#6b6b6b";
    ctx.font = "26px " + FONT;
    var sub = wrapText(ctx, n.sub, W - 420)[0];
    ctx.fillText(sub, 272, 1085);

    // 15-dim strip, colored by group
    var cell = (W - 252) / 15;
    DIMS.forEach(function (d, i) {
      var lv = r.levels[d];
      var color = GROUP_COLORS[groupIndexOf(d)];
      var x = 120 + cell * i;
      var h = lv === "H" ? 84 : lv === "M" ? 58 : 32;
      ctx.fillStyle = "rgba(20,20,20,0.08)";
      roundRect(ctx, x + 6, 1150, cell - 12, 84, 10);
      ctx.fill();
      ctx.fillStyle = color;
      roundRect(ctx, x + 6, 1150 + 84 - h, cell - 12, h, 10);
      ctx.fill();
      ctx.fillStyle = "#141414";
      ctx.textAlign = "center";
      ctx.font = "900 24px " + FONT;
      ctx.fillText(lv, x + cell / 2, 1266);
    });

    ctx.strokeStyle = "rgba(20,20,20,0.25)";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(120, 1296);
    ctx.lineTo(W - 132, 1296);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#141414";
    ctx.textAlign = "center";
    ctx.font = "800 28px " + FONT;
    ctx.fillText("小红书搜「SBTI 人格测试」，测测你是哪种抽象人类", W / 2, 1343);

    return canvas.toDataURL("image/png");
  }

  async function getShareFile(r) {
    var dataUrl = await buildShareImage(r);
    var mt = getMiniTool();
    if (mt && typeof mt.writeTempFile === "function") {
      try { return (await mt.writeTempFile({ data: dataUrl })).filePath; } catch (e) { /* fall back to data URI */ }
    }
    return dataUrl;
  }

  var busy = false;
  async function withBusy(btn, label, fn) {
    if (busy) return;
    busy = true;
    var old = btn.textContent;
    btn.textContent = label;
    btn.disabled = true;
    try { await fn(); } finally { busy = false; btn.textContent = old; btn.disabled = false; }
  }

  function onSave() {
    var btn = $("btn-save");
    withBusy(btn, "…", async function () {
      if (!(await canUse("saveImageToPhotosAlbum"))) { toast("当前环境不支持保存图片"); return; }
      try {
        var filePath = await getShareFile(current);
        await getMiniTool().saveImageToPhotosAlbum({ filePath: filePath });
        toast("已保存到相册 ✓");
      } catch (e) {
        toast("保存失败" + (e && e.errMsg ? "：" + e.errMsg : ""));
      }
    });
  }

  function onPost() {
    var btn = $("btn-post");
    withBusy(btn, "生成分享图…", async function () {
      if (!(await canUse("postNote"))) { toast("当前环境不支持发布笔记"); return; }
      var t = typeByCode[current.finalTypeCode];
      try {
        var filePath = await getShareFile(current);
        var title = ("我是SBTI「" + t.code + " " + t.cn + "」").slice(0, 20);
        var content = ("测完 SBTI 人格，我是【" + t.code + " · " + t.cn + "】——" + t.intro + "\n" +
          narrative(current).badge + "\n快来测测你是哪种抽象人类 #SBTI #SBTI人格测试").slice(0, 1000);
        await getMiniTool().postNote({
          title: title,
          content: content,
          pageType: "photo_publish",
          mediaInfo: { image_resources: [{ url: filePath }] }
        });
      } catch (e) {
        if (e && e.errMsg && e.errMsg.indexOf("cancel") !== -1) return;
        toast("唤起发布页失败" + (e && e.errMsg ? "：" + e.errMsg : ""));
      }
    });
  }

  /* ---------------- Init ---------------- */

  function isValidSnapshot(s) {
    return s && typeof s === "object" && typeByCode[s.finalTypeCode] && s.levels && s.rawScores && s.top &&
      DIMS.every(function (d) { return LV_NUM[s.levels[d]]; });
  }

  function updateLastEntry() {
    if (!current) return;
    var t = typeByCode[current.finalTypeCode];
    $("last-img").src = t.image;
    $("last-name").textContent = t.code + " · " + t.cn;
    $("btn-last").classList.remove("hidden");
    $("btn-start").innerHTML = "";
    $("btn-start").appendChild(document.createTextNode("再测一次"));
    $("btn-start").appendChild(el("span", "arrow", "→"));
  }

  async function init() {
    $("stat-q").textContent = String(DATA.questions.length);
    $("stat-d").textContent = String(DIMS.length);
    $("stat-t").textContent = String(DATA.types.length);
    renderMarquee();
    $("btn-start").addEventListener("click", startQuiz);
    $("btn-retry").addEventListener("click", startQuiz);
    $("btn-quit").addEventListener("click", function () {
      if (window.confirm("确定退出吗？当前答题进度不会保存。")) show("home");
    });
    $("btn-prev").addEventListener("click", prev);
    $("btn-next").addEventListener("click", function () {
      var v = state.answers[currentQuestion().id];
      if (v !== undefined && !state.locked) next(v);
    });
    $("btn-more").addEventListener("click", toggleDesc);
    $("btn-save").addEventListener("click", onSave);
    $("btn-post").addEventListener("click", onPost);
    $("btn-last").addEventListener("click", function () {
      if (current) { renderResult(current); show("result"); }
    });

    var last = await storageGet(STORAGE_KEY);
    if (isValidSnapshot(last)) {
      current = last;
      updateLastEntry();
    }
  }

  init();
})();
