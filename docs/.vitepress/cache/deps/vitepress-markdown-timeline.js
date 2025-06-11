import {
  __commonJS,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t2, e2) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs = e2();
    }(exports, function() {
      "use strict";
      var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
        return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
      } }, m = function(t3, e3, n3) {
        var r3 = String(t3);
        return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
      }, v = { s: m, z: function(t3) {
        var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i2 = n3 % 60;
        return (e3 <= 0 ? "+" : "-") + m(r3, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t3(e3, n3) {
        if (e3.date() < n3.date()) return -t3(n3, e3);
        var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i2 = e3.clone().add(r3, c), s2 = n3 - i2 < 0, u2 = e3.clone().add(r3 + (s2 ? -1 : 1), c);
        return +(-(r3 + (n3 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r2, Q: f }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t3) {
        return t3 instanceof _ || !(!t3 || !t3[p]);
      }, w = function t3(e3, n3, r3) {
        var i2;
        if (!e3) return g;
        if ("string" == typeof e3) {
          var s2 = e3.toLowerCase();
          D[s2] && (i2 = s2), n3 && (D[s2] = n3, i2 = s2);
          var u2 = e3.split("-");
          if (!i2 && u2.length > 1) return t3(u2[0]);
        } else {
          var a2 = e3.name;
          D[a2] = e3, i2 = a2;
        }
        return !r3 && i2 && (g = i2), i2 || !r3 && g;
      }, O = function(t3, e3) {
        if (S(t3)) return t3.clone();
        var n3 = "object" == typeof e3 ? e3 : {};
        return n3.date = t3, n3.args = arguments, new _(n3);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t3, e3) {
        return O(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _ = function() {
        function M2(t3) {
          this.$L = w(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t3) {
          this.$d = function(t4) {
            var e3 = t4.date, n3 = t4.utc;
            if (null === e3) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e3)) return /* @__PURE__ */ new Date();
            if (e3 instanceof Date) return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r3 = e3.match($);
              if (r3) {
                var i2 = r3[2] - 1 || 0, s2 = (r3[7] || "0").substring(0, 3);
                return n3 ? new Date(Date.UTC(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2)) : new Date(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2);
              }
            }
            return new Date(e3);
          }(t3), this.init();
        }, m2.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t3, e3) {
          var n3 = O(t3);
          return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
        }, m2.isAfter = function(t3, e3) {
          return O(t3) < this.startOf(e3);
        }, m2.isBefore = function(t3, e3) {
          return this.endOf(e3) < O(t3);
        }, m2.$g = function(t3, e3, n3) {
          return b.u(t3) ? this[e3] : this.set(n3, t3);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t3, e3) {
          var n3 = this, r3 = !!b.u(e3) || e3, f2 = b.p(t3), l2 = function(t4, e4) {
            var i2 = b.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
            return r3 ? i2 : i2.endOf(a);
          }, $2 = function(t4, e4) {
            return b.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r3 ? l2(1, 0) : l2(31, 11);
            case c:
              return r3 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r3 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m2.$set = function(t3, e3) {
          var n3, o2 = b.p(t3), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n3 = {}, n3[a] = f2 + "Date", n3[d] = f2 + "Date", n3[c] = f2 + "Month", n3[h] = f2 + "FullYear", n3[u] = f2 + "Hours", n3[s] = f2 + "Minutes", n3[i] = f2 + "Seconds", n3[r2] = f2 + "Milliseconds", n3)[o2], $2 = o2 === a ? this.$D + (e3 - this.$W) : e3;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m2.get = function(t3) {
          return this[b.p(t3)]();
        }, m2.add = function(r3, f2) {
          var d2, l2 = this;
          r3 = Number(r3);
          var $2 = b.p(f2), y2 = function(t3) {
            var e3 = O(l2);
            return b.w(e3.date(e3.date() + Math.round(t3 * r3)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r3);
          if ($2 === h) return this.set(h, this.$y + r3);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e2, d2[u] = n2, d2[i] = t2, d2)[$2] || 1, m3 = this.$d.getTime() + r3 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m2.format = function(t3) {
          var e3 = this, n3 = this.$locale();
          if (!this.isValid()) return n3.invalidDate || l;
          var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n3.weekdays, c2 = n3.months, f2 = n3.meridiem, h2 = function(t4, n4, i3, s3) {
            return t4 && (t4[n4] || t4(e3, r3)) || i3[n4].slice(0, s3);
          }, d2 = function(t4) {
            return b.s(s2 % 12 || 12, t4, "0");
          }, $2 = f2 || function(t4, e4, n4) {
            var r4 = t4 < 12 ? "AM" : "PM";
            return n4 ? r4.toLowerCase() : r4;
          };
          return r3.replace(y, function(t4, r4) {
            return r4 || function(t5) {
              switch (t5) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return b.s(e3.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n3.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e3.$D;
                case "DD":
                  return b.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h2(n3.weekdaysMin, e3.$W, o2, 2);
                case "ddd":
                  return h2(n3.weekdaysShort, e3.$W, o2, 3);
                case "dddd":
                  return o2[e3.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return b.s(e3.$s, 2, "0");
                case "SSS":
                  return b.s(e3.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t4) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r3, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r3), v2 = (m3.utcOffset() - this.utcOffset()) * e2, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n2;
              break;
            case s:
              $2 = g2 / e2;
              break;
            case i:
              $2 = g2 / t2;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t3, e3) {
          if (!t3) return this.$L;
          var n3 = this.clone(), r3 = w(t3, e3, true);
          return r3 && (n3.$L = r3), n3;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r2], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t3) {
        k[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      }), O.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _, O), t3.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t3) {
        return O(1e3 * t3);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// node_modules/vitepress-markdown-timeline/dist/es/index.es.js
var import_dayjs = __toESM(require_dayjs_min());
var e = function(r2, e2, n2) {
  var t2 = (n2 = n2 || {}).marker || ":", o = t2.charCodeAt(0), i = t2.length, a = n2.validate || function(r3) {
    return r3.trim().split(" ", 2)[0] === e2;
  }, l = n2.render || function(r3, n3, t3, o2, i2) {
    return 1 === r3[n3].nesting && r3[n3].attrJoin("class", e2), i2.renderToken(r3, n3, t3, o2, i2);
  };
  r2.block.ruler.before("fence", "container_" + e2, function(r3, n3, l2, c) {
    var s, f, u, p, d, k, h, y, m = false, v = r3.bMarks[n3] + r3.tShift[n3], b = r3.eMarks[n3];
    if (o !== r3.src.charCodeAt(v)) return false;
    for (s = v + 1; s <= b && t2[(s - v) % i] === r3.src[s]; s++) ;
    if ((u = Math.floor((s - v) / i)) < 3) return false;
    if (s -= (s - v) % i, p = r3.src.slice(v, s), d = r3.src.slice(s, b), !a(d, p)) return false;
    if (c) return true;
    for (f = n3; !(++f >= l2) && !((v = r3.bMarks[f] + r3.tShift[f]) < (b = r3.eMarks[f]) && r3.sCount[f] < r3.blkIndent); ) if (o === r3.src.charCodeAt(v) && !(r3.sCount[f] - r3.blkIndent >= 4)) {
      for (s = v + 1; s <= b && t2[(s - v) % i] === r3.src[s]; s++) ;
      if (!(Math.floor((s - v) / i) < u || (s -= (s - v) % i, (s = r3.skipSpaces(s)) < b))) {
        m = true;
        break;
      }
    }
    return h = r3.parentType, y = r3.lineMax, r3.parentType = "container", r3.lineMax = f, (k = r3.push("container_" + e2 + "_open", "div", 1)).markup = p, k.block = true, k.info = d, k.map = [n3, f], r3.md.block.tokenize(r3, n3 + 1, f), (k = r3.push("container_" + e2 + "_close", "div", -1)).markup = r3.src.slice(v, s), k.block = true, r3.parentType = h, r3.lineMax = y, r3.line = f + (m ? 1 : 0), true;
  }, { alt: ["paragraph", "reference", "blockquote", "list"] }), r2.renderer.rules["container_" + e2 + "_open"] = l, r2.renderer.rules["container_" + e2 + "_close"] = l;
};
var n = function(r2, n2, t2) {
  return [e, r2, { render: function(e2, n3) {
    var o = e2[n3], i = o.info.trim().slice(r2.length).trim();
    return 1 === o.nesting ? "<div class='timeline-dot'><span class='timeline-dot-title'>" + t2.renderInline(i) + "</span>\n" : "</div>\n";
  } }];
};
var t = function(e2, t2) {
  e2.use.apply(e2, function(r2, e3, n2) {
    if (n2 || 2 === arguments.length) for (var t3, o = 0, i = e3.length; o < i; o++) !t3 && o in e3 || (t3 || (t3 = Array.prototype.slice.call(e3, 0, o)), t3[o] = e3[o]);
    return r2.concat(t3 || Array.prototype.slice.call(e3));
  }([], function(r2, e3) {
    var n2 = "function" == typeof Symbol && r2[Symbol.iterator];
    if (!n2) return r2;
    var t3, o, i = n2.call(r2), a = [];
    try {
      for (; (void 0 === e3 || e3-- > 0) && !(t3 = i.next()).done; ) a.push(t3.value);
    } catch (r3) {
      o = { error: r3 };
    } finally {
      try {
        t3 && !t3.done && (n2 = i.return) && n2.call(i);
      } finally {
        if (o) throw o.error;
      }
    }
    return a;
  }(n("timeline", (0, import_dayjs.default)().format("YYYY-MM-DD"), e2)), false));
};
export {
  t as default
};
//# sourceMappingURL=vitepress-markdown-timeline.js.map
