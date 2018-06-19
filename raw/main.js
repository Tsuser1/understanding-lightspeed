(function e(t, r, n) {
    function i(s, a) {
        if (!r[s]) {
            if (!t[s]) {
                var u = typeof require == "function" && require;
                if (!a && u) return u(s, !0);
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[s] = {
                exports: {}
            };
            t[s][0].call(l.exports, function (e) {
                var r = t[s][1][e];
                return i(r ? r : e)
            }, l, l.exports, e, t, r, n)
        }
        return r[s].exports
    }
    var o = typeof require == "function" && require;
    for (var s = 0; s < n.length; s++) i(n[s]);
    return i
})({
    1: [function (e, t, r) {}, {}],
    2: [function (e, t, r) {
        var n = t.exports = {};
        var i;
        var o;

        function s() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }(function () {
            try {
                if (typeof setTimeout === "function") {
                    i = setTimeout
                } else {
                    i = s
                }
            } catch (e) {
                i = s
            }
            try {
                if (typeof clearTimeout === "function") {
                    o = clearTimeout
                } else {
                    o = a
                }
            } catch (e) {
                o = a
            }
        })();

        function u(e) {
            if (i === setTimeout) {
                return setTimeout(e, 0)
            }
            if ((i === s || !i) && setTimeout) {
                i = setTimeout;
                return setTimeout(e, 0)
            }
            try {
                return i(e, 0)
            } catch (t) {
                try {
                    return i.call(null, e, 0)
                } catch (t) {
                    return i.call(this, e, 0)
                }
            }
        }

        function c(e) {
            if (o === clearTimeout) {
                return clearTimeout(e)
            }
            if ((o === a || !o) && clearTimeout) {
                o = clearTimeout;
                return clearTimeout(e)
            }
            try {
                return o(e)
            } catch (t) {
                try {
                    return o.call(null, e)
                } catch (t) {
                    return o.call(this, e)
                }
            }
        }
        var l = [];
        var f = false;
        var p;
        var h = -1;

        function d() {
            if (!f || !p) {
                return
            }
            f = false;
            if (p.length) {
                l = p.concat(l)
            } else {
                h = -1
            }
            if (l.length) {
                g()
            }
        }

        function g() {
            if (f) {
                return
            }
            var e = u(d);
            f = true;
            var t = l.length;
            while (t) {
                p = l;
                l = [];
                while (++h < t) {
                    if (p) {
                        p[h].run()
                    }
                }
                h = -1;
                t = l.length
            }
            p = null;
            f = false;
            c(e)
        }
        n.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var r = 1; r < arguments.length; r++) {
                    t[r - 1] = arguments[r]
                }
            }
            l.push(new y(e, t));
            if (l.length === 1 && !f) {
                u(g)
            }
        };

        function y(e, t) {
            this.fun = e;
            this.array = t
        }
        y.prototype.run = function () {
            this.fun.apply(null, this.array)
        };
        n.title = "browser";
        n.browser = true;
        n.env = {};
        n.argv = [];
        n.version = "";
        n.versions = {};

        function v() {}
        n.on = v;
        n.addListener = v;
        n.once = v;
        n.off = v;
        n.removeListener = v;
        n.removeAllListeners = v;
        n.emit = v;
        n.binding = function (e) {
            throw new Error("process.binding is not supported")
        };
        n.cwd = function () {
            return "/"
        };
        n.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        };
        n.umask = function () {
            return 0
        }
    }, {}],
    3: [function (e, t, r) {
        "use strict";
        var n = chrome.runtime.getManifest();
        var i = e("filtering-js");
        var o = i.Policy;
        var s = i.UrlParser;
        var a = i.Reporting;
        var u = false;
        var c = "cros";
        var l = "127.0.0.1";
        window.PolicyEngine = o;
        o.ConfigureRemote(window.Remote);
        o.ConfigureBlockPageURI(blockPageURI);
        globalAllowedHosts.forEach(function (e) {
            o.AddGloballyAllowedHost(e)
        });
        window.GetCurrentReport = a.GetCurrentReport;
        (function () {
            var e;
            a.ConfigureRemote(window.Remote);
            a.GetCurrentReport()
                .sn = customer_id;
            a.GetCurrentReport()
                .udid = "chrome:";
            if (typeof ReportingInterval !== "number") {
                e = 15e3
            } else {
                e = ReportingInterval
            }
            setInterval(function () {
                a.GetCurrentReport()
                    .udid = "chrome:" + currentUser();
                a.GetCurrentReport()
                    .sn = customer_id;
                a.GetCurrentReport()
                    .GetUsernameIndex(currentUser());
                if (typeof l !== "undefined") {
                    a.GetCurrentReport()
                        .ip = l
                }
                var e = o.ActivePolicy();
                a.GetCurrentReport()
                    .lockoutNotificationEmails = e.Lockout.notificationEmails;
                if (!f() && e.Reporting.Enabled) {
                    a.SendReports();
                    return
                }
                a.GetCurrentReport()
                    .GetUsernameIndex(currentUser());
                a.GetCurrentReport()
                    .sn = customer_id;
                a.GetCurrentReport()
                    .udid = "chrome:" + currentUser();
                a.GetCurrentReport()
                    .lockoutNotificationEmails = e.Lockout.notificationEmails;
                if (typeof l !== "undefined") {
                    a.GetCurrentReport()
                        .ip = l
                }
            }, e)
        })
        .call(this);
        window.SetPublicIp = function (e) {
            l = e;
            o.SetIp(e);
            a.GetCurrentReport()
                .ip = e
        };
        chrome.runtime.getPlatformInfo(function (e) {
            c = e.os;
            e.agent = "crx";
            a.ConfigureOsInfo(e);
            RelayLog.debug("OS Detected - ", c)
        });
        var f = function () {
            if (o.ActivePolicy()
                .ContentFilterSettings.ChromebookOnly && c !== chrome.runtime.PlatformOs.CROS) {
                RelayLog.debug("[OsDisableFiltering] - true");
                return true
            }
            return false
        };
        t.exports.OsDisableFiltering = f;
        var p = undefined;
        let h = false;
        let d = function () {
            i.RelayApi.Configure({
                customerId: customer_id,
                apiKey: apiKey,
                apiHost: apiHost,
                apiProto: apiHostProto,
                apiUserPolicyPath: apiCheckPath,
                policyPollMS: 3e5
            });
            h = true;
            i.RelayApi.MonitorPolicy(function (e, t, r) {
                if (e && !t) {
                    RelayLog.debug("[FilteringJS.RelayApi.MonitorPolicy] - cached: ", r, "policy", e);
                    try {
                        o.ConfigureFromRelay(e);
                        a.GetCurrentReport()
                            .lockoutNotificationEmails = o.ActivePolicy()
                            .Lockout.notificationEmails;
                        RelayLog.debug("Policy loaded: ", i.Policy.ActivePolicies)
                    } catch (e) {
                        RelayLog.error(e)
                    }
                }
            })
        };
        var g = function () {
            chrome.identity.getProfileUserInfo(function (e) {
                if (p !== e.email) {
                    p = e.email;
                    i.RelayApi.SetUser(p)
                }
                a.GetCurrentReport()
                    .GetUsernameIndex(currentUser());
                a.GetCurrentReport()
                    .udid = "chrome:" + currentUser();
                a.GetCurrentReport()
                    .lockoutNotificationEmails = o.ActivePolicy()
                    .Lockout.notificationEmails;
                if (!h) {
                    d()
                }
            })
        };
        window.currentUser = function () {
            return p
        };
        setInterval(g, 3e5);
        g();
        var y = {};
        var v = {};
        var m = {};
        var b = function (e, t, r) {
            var n;
            if (e.type !== "main_frame") {
                return
            }
            n = o.ActivePolicy();
            if (!y[e.tabId]) {
                y[e.tabId] = {}
            }
            if (y[e.tabId].rg && y[e.tabId].rg !== undefined) {
                if (y[e.tabId].time > 0) {
                    if (n.Reporting.Enabled) {
                        a.GetCurrentReport()
                            .LogTimeOnSites([
                                [y[e.tabId].rg, y[e.tabId].time]
                            ])
                    }
                }
                y[e.tabId] = {}
            }
            y[e.tabId].rg = t;
            y[e.tabId].time = 0;
            y[e.tabId].url = e.url
        };
        var _ = function () {
            if (f()) {
                return
            }
            if (window.CaptivePortal.portalIsActive) {
                return
            }
            chrome.tabs.query({}, function (e) {
                var t, r, n, u, c, f, p, h, d;
                var g = [];
                p = o.ActivePolicy();
                e.forEach(function (e) {
                    var t, r;
                    if (typeof e.url !== "undefined" && e.url !== "") {
                        r = new s(e.url)
                    }
                    t = e.id;
                    g.push(t);
                    if (r.protocol === "chrome:") {
                        delete y[t];
                        return
                    }
                    if (y[t] && y[t].rg) {
                        if (typeof r !== "undefined") {
                            if (r.hostname === blockPageHost) {
                                delete y[t];
                                return {}
                            }
                        }
                        if (y[t].url !== e.url) {
                            RelayLog.debug(`Tab ID: ${t} URL has changed`);
                            if (y[t].rg && y[t].rg !== undefined) {
                                if (y[t].time > 0) {
                                    RelayLog.debug(`Tab ID: ${t} Reporting time on site for old url.`);
                                    if (p.Reporting.Enabled) {
                                        a.GetCurrentReport()
                                            .LogTimeOnSites([
                                                [y[t].rg, y[t].time]
                                            ])
                                    }
                                }
                            }
                            delete y[t];
                            if (!e.url) {
                                RelayLog.debug(`Tab ID: ${t} has no URL. skipping.`);
                                return
                            }
                            RelayLog.debug(`Tab ID: ${t} Sending url (${e.url}) to filtering engine`);
                            d = o.Score({
                                url: e.url
                            });
                            if (d.onHold && window.CaptivePortal.portalIsActive) {
                                RelayLog.debug("score wanted to hold, but a captive portal is in our way, allowing url.");
                                d = {
                                    url: c.url,
                                    type: c.type,
                                    tabId: c.tabId,
                                    username: currentUser(),
                                    blocked: false,
                                    r: "portal",
                                    rg: i.Util.generateGUID()
                                }
                            }
                            if (d && (d.redirect && !d.onHold)) {
                                RelayLog.debug(`Tab ID: ${t} should be redirected to: ${d.redirect}`);
                                if (!d.onHold) {
                                    if (d.reason === "yt" && d.blocked === false) {
                                        m[t] = true
                                    } else {
                                        delete m[t]
                                    }
                                    d.url = e.url;
                                    d.type = "main_frame";
                                    d.tabId = t;
                                    d.username = currentUser();
                                    d.blocked = Boolean(d.blocked);
                                    d.r = d.reason;
                                    d.ip = l;
                                    a.Log(d, p.Reporting.Enabled === false)
                                }
                                chrome.tabs.update(t, {
                                    url: d.redirect
                                })
                            } else {
                                d.url = e.url;
                                d.type = "main_frame";
                                d.tabId = t;
                                d.username = currentUser();
                                d.blocked = Boolean(d.blocked);
                                d.r = d.reason;
                                d.ip = l;
                                h = a.Log(d, p.Reporting.Enabled === false);
                                b({
                                    url: e.url,
                                    type: "main_frame",
                                    tabId: t
                                }, d.rg, d)
                            }
                        } else {
                            if (e.active) {
                                y[t].time += 1e3
                            }
                            if (!y[t].title) {
                                y[t].title = e.title;
                                if (p.Reporting.Enabled) {
                                    a.GetCurrentReport()
                                        .LogSiteTitle(y[t].rg, y[t].title)
                                }
                            }
                        }
                    } else {
                        if (!e.url) {
                            RelayLog.debug(`Tab ID: ${t} has no URL. skipping.`);
                            return
                        }
                        if (typeof r !== "undefined") {
                            if (r.hostname === blockPageHost) {
                                delete y[t];
                                return {}
                            }
                        }
                        d = o.Score({
                            url: e.url
                        });
                        if (d.onHold && window.CaptivePortal.portalIsActive) {
                            RelayLog.debug("score wanted to hold, but a captive portal is in our way, allowing url.");
                            d = {
                                url: c.url,
                                type: c.type,
                                tabId: c.tabId,
                                username: currentUser(),
                                blocked: false,
                                r: "portal",
                                rg: i.Util.generateGUID()
                            }
                        }
                        if (d && (d.redirect && !d.onHold)) {
                            RelayLog.debug(`Tab ID: ${t} should be redirected to: ${d.redirect}`);
                            if (!d.onHold) {
                                if (d.reason === "yt" && d.blocked === false) {
                                    m[t] = true
                                } else {
                                    delete m[t]
                                }
                                d.url = e.url;
                                d.type = "main_frame";
                                d.tabId = t;
                                d.username = currentUser();
                                d.blocked = Boolean(d.blocked);
                                d.r = d.reason;
                                d.ip = l;
                                h = a.Log(d, p.Reporting.Enabled === false)
                            }
                            chrome.tabs.update(t, {
                                url: d.redirect
                            })
                        } else {
                            b({
                                url: e.url,
                                type: "main_frame",
                                tabId: t
                            }, d.rg, d)
                        }
                    }
                });
                var v = [];
                for (n in y) {
                    var _ = parseInt(n, 10);
                    if (g.indexOf(_) === -1) {
                        if (y[n].rg && y[n].time > 0) {
                            v.push([y[n].rg, y[n].time])
                        }
                        delete y[n]
                    }
                }
                if (v.length > 0) {
                    if (p.Reporting.Enabled) {
                        a.GetCurrentReport()
                            .LogTimeOnSites(v)
                    }
                }
            })
        };
        setInterval(_, 1e3);
        var w = function () {
            if (f()) {
                return
            }
            var e, t, r = [];
            e = o.ActivePolicy();
            for (t in y) {
                if (y[t].rg && y[t].time > 0) {
                    r.push([y[t].rg, y[t].time]);
                    y[t].time = 0
                }
            }
            if (r.length > 0) {
                if (e.Reporting.Enabled) {
                    a.GetCurrentReport()
                        .LogTimeOnSites(r)
                }
            }
        };
        setInterval(w, 45e3);
        var C = function (e) {
            var t, r;
            if (!v[e.tabId]) {
                v[e.tabId] = {}
            }
            if (!v[e.tabId][e.url]) {
                v[e.tabId][e.url] = {
                    cnt: 0,
                    at: (new Date)
                        .getTime()
                }
            }
            v[e.tabId][e.url].cnt += 1;
            t = (new Date)
                .getTime();
            r = (v[e.tabId][e.url].cnt + 2) * 5;
            while ((new Date)
                .getTime() - t < r) {}
            if (o.ActivePolicy()
                .ContentFilterSettings.BypassOnFail && v[e.tabId][e.url].cnt > 15) {
                return undefined
            }
            return e.url
        };
        var k = function () {
            v = {}
        };
        setInterval(k, 3e5);
        chrome.webRequest.onBeforeRequest.addListener(function (e) {
            var t;
            if (f()) {
                return {}
            }
            var r = o.ActivePolicy();
            if (e.type === "image" && e.url.match(/i\.ytimg\.com/i)) {
                if (r.YouTube.blockThumbnails) {
                    return {
                        redirectUrl: chrome.extension.getURL("blocked-yt-image.png")
                    }
                }
            }
            t = new s(e.url);
            let n = o.PreScan(e);
            if (typeof n !== "undefined") {
                if (n.cancel) {
                    n.url = e.url;
                    n.type = e.type;
                    n.tabId = e.tabId;
                    n.username = currentUser();
                    n.blocked = true;
                    n.ip = l;
                    a.Log(n, r.Reporting.Enabled === false);
                    return {
                        cancel: true
                    }
                }
            }
            o.Warm(e);
            return {}
        }, {
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "other"],
            urls: ["<all_urls>"]
        }, ["blocking"]);
        var A = ["www.youtube.com", "m.youtube.com", "youtubei.googleapis.com", "youtube.googleapis.com", "www.youtube-nocookie.com"];
        chrome.webRequest.onBeforeSendHeaders.addListener(function (e) {
            var t, r, n, o;
            if (f()) {
                return {}
            }
            t = new s(e.url);
            r = i.Policy.ActivePolicy();
            o = new s(e.url);
            if (A.indexOf(o.hostname.toLowerCase()) !== -1 && typeof r.YouTube.restrictedMode === "string") {
                n = {
                    name: "YouTube-Restrict",
                    value: r.YouTube.restrictedMode
                };
                RelayLog.debug("[YouTube] Restricted mode enabled, adding to the headers: ", n);
                e.requestHeaders.push(n)
            }
            if (e.url.match(/[^:]+:\/\/([^\.]+\.)?google\.com/i) && r.GoogAppsAllowedDomains) {
                n = {
                    name: "X-GoogApps-Allowed-Domains",
                    value: r.GoogAppsAllowedDomains
                };
                RelayLog.debug("[GSuite] X-GoogApps-Allowed-Domains mode enabled, adding to the headers: ", n);
                e.requestHeaders.push(n)
            }
            if (o.hostname.match(/ytimg\.com$/i)) {
                e.requestHeaders.push({
                    name: "Cache-Control",
                    value: "no-cache"
                })
            }
            return {
                requestHeaders: e.requestHeaders
            }
        }, {
            urls: ["<all_urls>"]
        }, ["blocking", "requestHeaders"]);
        chrome.webRequest.onHeadersReceived.addListener(function (e) {
            var t, r, n, u, c, p;
            if (f()) {
                return {}
            }
            u = new i.Youtube.Request(e.url);
            if (u.isYoutube()) {
                if (e.type === "stylesheet" || e.type === "script") {
                    return {}
                }
            }
            c = new s(e.url);
            if (c.hostname === blockPageHost) {
                if (e.type === "main_frame") {
                    delete y[e.tabId]
                }
                return {}
            }
            if (c.hostname === apiHost) {
                return {}
            }
            if (c.hostname === mtHoodPingHost) {
                return {}
            }
            r = o.ActivePolicy();
            if (!navigator.onLine) {
                a.Log({
                    username: currentUser(),
                    url: e.url,
                    blocked: false,
                    at: new Date,
                    rg: i.Util.generateGUID(),
                    r: "navigator.offline"
                }, r.Reporting.Enabled === false);
                return {}
            }
            p = o.Score(e);
            RelayLog.debug("[Filtering score] - Details: ", e, " Scored: ", p, " with policy: ", i.Policy.ActivePolicy());
            if (p.onHold && window.CaptivePortal.portalIsActive) {
                RelayLog.debug("score wanted to hold, but a captive portal is in our way, allowing url.");
                p = {
                    url: e.url,
                    type: e.type,
                    tabId: e.tabId,
                    username: currentUser(),
                    blocked: false,
                    r: "portal",
                    rg: i.Util.generateGUID()
                }
            }
            if (p.onHold) {
                t = C(e);
                if (typeof t === "undefined") {
                    delete p.redirect;
                    delete p.onHold;
                    p.url = e.url;
                    p.type = e.type;
                    p.tabId = e.tabId;
                    p.username = currentUser();
                    p.blocked = false;
                    p.r = "failure";
                    p.rg = i.Util.generateGUID()
                } else {
                    p.redirect = t
                }
            } else {
                p.url = e.url;
                p.type = e.type;
                p.tabId = e.tabId;
                p.username = currentUser();
                p.blocked = Boolean(p.blocked);
                p.r = p.reason;
                switch (reportLevel) {
                case 3:
                    if (e.type === "xmlhttprequest") {
                        n = true;
                        break
                    }
                case 2:
                    if (e.type === "sub_frame") {
                        n = true;
                        break
                    }
                case 1:
                    if (e.type === "main_frame") {
                        n = true;
                        break
                    }
                default:
                    break
                }
                if (p.blocked) {
                    n = true
                }
                if (typeof p.searchTerm !== "undefined") {
                    n = true
                }
                if (n) {
                    p.ip = l;
                    a.Log(p, r.Reporting.Enabled === false)
                }
                b(e, p.rg, p)
            }
            if (p && p.redirect) {
                if (e.type === "xmlhttprequest" && c.hostname.match(/^(([^\.])+\.)?googlevideo\.com$/)) {
                    return {}
                }
                let t = new s(p.redirect);
                if (e.type === "main_frame" || e.type === "sub_frame" || t.hostname === c.hostname) {
                    RelayLog.debug("[Redirecting] Tab : ", e.tabId, " to: ", p.redirect);
                    return {
                        redirectUrl: p.redirect
                    }
                } else if (e.type === "image" || c.hostname.match(/ytimg\.com$/i)) {
                    return {
                        redirectUrl: chrome.extension.getURL("blocked-image-search.png")
                    }
                }
                return {
                    cancel: true
                }
            }
            if (p.onHold) {
                return {
                    redirectUrl: e.url
                }
            }
            return {}
        }, {
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "other"],
            urls: ["<all_urls>"]
        }, ["blocking"]);
        console.log("Lightspeed", n.name, "version", n.version, "Loaded.")
    }, {
        "filtering-js": 33
    }],
    4: [function (e, t, r) {
        const n = e("filtering-js");
        const i = n.UrlParser;
        window.CaptivePortal = function () {
            const e = this;
            e.portalIsActive = false;
            let t = 15e3;
            let r = 750;
            let n = 0;
            let o;
            const s = function () {
                let i = t;
                let o = (new Date)
                    .getTime() - n;
                if (e.portalIsActive) {
                    i = r
                }
                if (o < i) {
                    return
                }
                n = (new Date)
                    .getTime();
                const s = new XMLHttpRequest;
                s.open("GET", mtHoodPingUri + "?" + (new Date)
                    .getTime(), true);
                s.send();
                s.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            const t = document.createElement("A");
                            t.href = mtHoodPingUri;
                            const r = document.createElement("A");
                            r.href = this.responseURL;
                            if (t.hostname !== r.hostname) {
                                e.portalIsActive = true;
                                a()
                            } else {
                                e.portalIsActive = false;
                                u()
                            }
                        } else if (this.status === 0 || this.status >= 300 && this.status < 400 || this.status === 511) {
                            e.portalIsActive = true;
                            a()
                        }
                    }
                }
            };
            const a = function () {
                if (!o) {
                    o = setInterval(s, 250);
                    s()
                }
            };
            const u = function () {
                if (o) {
                    clearInterval(o);
                    o = undefined
                }
            };
            const c = function (e) {
                const t = new i(e.url);
                const r = new i(e.redirectUrl);
                if (e.type === "main_frame" && t.hostname !== r.hostname) {
                    a()
                }
            };
            chrome.webRequest.onBeforeRedirect.addListener(c, {
                urls: ["<all_urls>"]
            });
            return this
        }.call({})
    }, {
        "filtering-js": 33
    }],
    5: [function (e, t, r) {
        (function (t) {
            "use strict";
            t.io = e("socket.io-client");
            e("relay-log");
            e("./remote");
            e("./captive_portal");
            window.RelayLog = t.RelayLog;
            var r = localStorage.getItem("relayLogLevel");
            if (typeof r !== "undefined" && r !== null) {
                RelayLog.SetLogLevel(r)
            }
            var n = localStorage.getItem("relayLogScopes");
            if (typeof n !== "undefined" && n !== null) {
                n.split(",")
                    .forEach(function (e) {
                        RelayLog.AddScope(e)
                    })
            }
            var i = e("./reporting");
            var o = e("./background");
            i.SetOsDisableFilteringCB(o.OsDisableFiltering)
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./background": 3,
        "./captive_portal": 4,
        "./remote": 6,
        "./reporting": 7,
        "relay-log": 54,
        "socket.io-client": 55
    }],
    6: [function (e, t, r) {
        "use strict";
        window.Remote = function () {
            const e = 9e5;
            const t = 3e3;
            var r = this;
            let n;
            var i = {
                hosts: {},
                ytVidIds: {},
                ytUsers: {}
            };
            var o = {
                hosts: {},
                ytVidIds: {},
                ytUsers: {}
            };
            var s = {
                host: {},
                ytVidIds: {},
                ytUsers: {}
            };
            var a = {};
            const u = function () {
                s = {
                    host: {},
                    ytVidIds: {},
                    ytUsers: {}
                };
                n = io(document.static.relaySocket.uri, {
                    transports: ["websocket"],
                    query: {
                        auth: document.static.relaySocket.auth
                    }
                });
                n.on("connect", function () {
                    RelayLog.debug("Socket connected.");
                    s = {
                        host: {},
                        ytVidIds: {},
                        ytUsers: {}
                    };
                    window.CaptivePortal.portalIsActive = false
                });
                n.on("disconnect", function () {
                    RelayLog.debug("Socket disconnect.");
                    s = {
                        host: {},
                        ytVidIds: {},
                        ytUsers: {}
                    }
                });
                n.on("HostLookupResponse", function (e) {
                    try {
                        let t = JSON.parse(e);
                        if (!i.hosts[t.request.host]) {
                            i.hosts[t.request.host] = {}
                        }
                        i.hosts[t.request.host].cat = t.cat;
                        i.hosts[t.request.host].at = new Date;
                        delete s.host[t.request.host];
                        delete o.hosts[t.request.host]
                    } catch (e) {
                        RelayLog.error(e)
                    }
                });
                n.on("YtVideoIdResponse", function (e) {
                    try {
                        let t = JSON.parse(e);
                        if (!i.ytVidIds[t.id]) {
                            i.ytVidIds[t.id] = {}
                        }
                        i.ytVidIds[t.id].data = t;
                        i.ytVidIds[t.id].at = new Date;
                        delete s.ytVidIds[t.id];
                        delete o.ytVidIds[t.id]
                    } catch (e) {
                        RelayLog.error(e)
                    }
                });
                n.on("YtUserResponse", function (e) {
                    try {
                        let t = JSON.parse(e);
                        if (!i.ytUsers[t.user]) {
                            i.ytUsers[t.user] = {}
                        }
                        i.ytUsers[t.user].data = t;
                        i.ytUsers[t.user].at = new Date;
                        delete s.ytUsers[t.user];
                        delete o.ytUsers[t.user]
                    } catch (e) {
                        RelayLog.error(e)
                    }
                });
                n.on("AuthLockoutResponse", function (e) {
                    try {
                        let r = JSON.parse(e);
                        if (r.success && a[r.code]) {
                            a[r.code].callbacks.forEach(function (e) {
                                e()
                            });
                            var t = PolicyEngine.ActivePolicy();
                            t.Lockout.ExpireLockout();
                            if (t.Reporting.Enabled) {
                                window.GetCurrentReport()
                                    .LogLockoutOverride({
                                        rg: a[r.code].rg,
                                        code: r.code,
                                        cUser: currentUser()
                                    })
                            }
                            a[r.code] = {}
                        } else if (a[r.code]) {
                            a[r.code] = {}
                        }
                    } catch (e) {
                        RelayLog.error(e)
                    }
                });
                n.on("YourIP", function (e) {
                    try {
                        let t = JSON.parse(e);
                        if (typeof SetPublicIp === "function" && typeof t.ip !== "undefined") {
                            SetPublicIp(t.ip)
                        }
                    } catch (e) {
                        RelayLog.error(e)
                    }
                });
                n.on("RECONNECT", function (e) {
                    n.disconnect();
                    u();
                    RelayLog.debug("Server requested reconnect")
                })
            };
            u();
            var c = function (e) {
                if (!e) {
                    throw new Error("host required for host lookup.")
                }
                if (i.hosts[e]) {
                    return
                }
                if (s.host[e]) {
                    return
                }
                s.host[e] = new Date;
                var t = {
                    host: e,
                    customer_id: customer_id
                };
                if (typeof root_customer_id !== "undefined") {
                    t.customer_id = root_customer_id
                }
                n.emit("HostLookup", JSON.stringify(t))
            };
            var l = function (e) {
                if (i.ytVidIds[e]) {
                    return
                }
                if (s.ytVidIds[e]) {
                    return
                }
                var t = {
                    id: e,
                    customer_id: customer_id
                };
                if (typeof root_customer_id !== "undefined") {
                    t.customer_id = root_customer_id
                }
                s.ytVidIds[e] = new Date;
                n.emit("YtVideoId", JSON.stringify(t))
            };
            var f = function (e) {
                RelayLog.debug("[wsLookupYtUser] - ", e);
                if (i.ytUsers[e]) {
                    RelayLog.debug("[wsLookupYtUser] - ", e, " in cache.");
                    return
                }
                if (s.ytUsers[e]) {
                    RelayLog.debug("[wsLookupYtUser] - ", e, " request pending.");
                    return
                }
                var t = {
                    user: e,
                    customer_id: customer_id
                };
                if (typeof root_customer_id !== "undefined") {
                    t.customer_id = root_customer_id
                }
                s.ytUsers[e] = new Date;
                n.emit("YtUser", JSON.stringify(t))
            };
            this.authenticateLockoutOverride = function (e, t, r, i) {
                if (typeof e === "undefined") {
                    return
                }
                a[e] = a[e] || {};
                a[e].callbacks = a[e].callbacks || [];
                a[e].rg = t;
                a[e].callbacks.push(i);
                var o = {
                    code: e,
                    customer_id: customer_id,
                    username: r
                };
                n.emit("AuthLockout", JSON.stringify(o))
            };
            this.lookup = function (e) {
                var t = document.createElement("A");
                t.href = e;
                if (globalAllowedHosts.indexOf(t.hostname.toLowerCase()) !== -1) {
                    return
                }
                if (t.hostname) {
                    c(t.hostname)
                }
            };
            this.getYoutubeVideoData = function (e) {
                if (i.ytVidIds[e]) {
                    return i.ytVidIds[e].data
                }
                l(e);
                if (o.ytVidIds[e]) {
                    RelayLog.scopedDebug("Remote.getYoutubeVideoData", ["[Remote.getYoutubeVideoData] responding with stale cache data."]);
                    return o.ytVidIds[e].data
                }
            };
            this.getYoutubeUserData = function (e) {
                var t = this.youtubeUserMeta(e);
                if (t) {
                    return t
                }
                f(e)
            };
            this.categoryId = function (e) {
                var t = document.createElement("A");
                t.href = e;
                if (i.hosts[t.hostname]) {
                    return i.hosts[t.hostname].cat
                }
                this.lookup(e);
                if (o.hosts[t.hostname]) {
                    RelayLog.scopedDebug("Remote.categoryId", ["[Remote.categoryId] responding with stale cache data."]);
                    return o.hosts[t.hostname].cat
                }
            };
            this.youtubeUserMeta = function (e) {
                RelayLog.debug("[youtubeUserMeta] - ", e);
                if (i.ytUsers[e]) {
                    return i.ytUsers[e].data
                }
                f(e);
                if (o.ytUsers[e]) {
                    RelayLog.scopedDebug("Remote.youtubeUserMeta", ["[Remote.youtubeUserMeta] responding with stale cache data."]);
                    return o.ytUsers[e].data
                }
            };
            this.sendReports = function (e) {
                RelayLog.debug("[sendReports]");
                n.emit("WfData", JSON.stringify({
                    report: JSON.parse(e)
                }))
            };
            this.DumpCache = function () {
                RelayLog.debug("cache: ", i);
                RelayLog.debug("stale cache: ", o);
                RelayLog.debug("requests in progress: ", s)
            };
            var p = function () {
                var r, n, a;
                var u = new Date;
                for (r in i.hosts) {
                    if (u - i.hosts[r].at > e) {
                        o.hosts[r] = i.hosts[r];
                        delete i.hosts[r]
                    }
                }
                for (n in i.ytVidIds) {
                    if (u - i.ytVidIds[n].at > e) {
                        o.ytVidIds[n] = i.ytVidIds[n];
                        delete i.ytVidIds[n]
                    }
                }
                for (a in i.ytUsers) {
                    if (u - i.ytUsers[a].at > e) {
                        o.ytUsers[a] = i.ytUsers[a];
                        delete i.ytUsers[a]
                    }
                }
                Object.keys(s.host)
                    .forEach(function (e) {
                        if (u - s.host[e] > t) {
                            delete s.host[e]
                        }
                    });
                Object.keys(s.ytVidIds)
                    .forEach(function (e) {
                        if (u - s.ytVidIds[e] > t) {
                            delete s.ytVidIds[e]
                        }
                    });
                Object.keys(s.ytUsers)
                    .forEach(function (e) {
                        if (u - s.ytUsers[e] > t) {
                            delete s.ytUsers[e]
                        }
                    })
            };
            setInterval(p, 1e3);
            window.addEventListener("online", () => {
                n.connect()
            });
            window.addEventListener("offline", () => {
                n.disconnect()
            });
            return this
        }.call({})
    }, {}],
    7: [function (e, t, r) {
        "use strict";
        var n = e("filtering-js");
        var i = n.Policy;
        var o = n.Reporting;
        var s = n.UrlParser;
        var a = function () {};
        window.Reporting = {};
        window.Reporting.lastAppsSend = 0;
        window.Reporting.lastAppsRefresh = 0;
        window.Reporting.installedApps = undefined;
        var u = 288e5;
        var c = 6e4;
        var l = 3e5;
        var f = 1200;
        var p = ["id", "version", "name", "description", "isApp", "enabled", "installType"];
        var h = p.length;
        var d = function () {
            var e = new Date;
            if (!currentUser()) {
                return
            }
            if (typeof window.Reporting.lastAppsRefresh === "undefined" || e - window.Reporting.lastAppsRefresh > u) {
                RelayLog.debug("Refreshing installed apps.");
                window.Reporting.installedApps = undefined;
                window.Reporting.lastAppsRefresh = (new Date)
                    .getTime();
                chrome.management.getAll(function (e) {
                    o.GetCurrentReport()
                        .LogInstalledApp(e)
                })
            }
        };
        setTimeout(function () {
            d();
            setInterval(d, 18e5)
        }, 5e3);
        window.Reporting.logFlag = function (e, t) {
            var r = i.ActivePolicy();
            if (r.Reporting.Enabled) {
                o.GetCurrentReport()
                    .LogFlag({
                        url: e,
                        flags: t
                    })
            }
        };
        chrome.runtime.onMessage.addListener(function (e, t, r) {
            if (a()) {
                return
            }
            if (typeof e.flags !== "undefined") {
                let t = n.Policy.GetFlagMode(e.flags.href);
                let i = n.Policy.GetFlagIngored(e.flags.href);
                if (i) {
                    r({
                        status: "ignored"
                    });
                    return
                }
                let o = [];
                switch (t) {
                case "both":
                    o = e.flags.hits;
                    break;
                case "page":
                    o = e.flags.hits.filter(e => {
                        return e[2] !== true
                    });
                    break;
                case "intent":
                    o = e.flags.hits.filter(e => {
                        return e[2] === true
                    });
                    break
                }
                if (o.length > 0) {
                    RelayLog.debug("Reporting flags: ", o);
                    window.Reporting.logFlag(e.flags.href, o)
                }
                r({
                    status: "OK"
                })
            }
        });
        chrome.extension.onRequest.addListener(function (e, t, r) {
            var i, u = {},
                c;
            c = n.Policy.ActivePolicy();
            if (e.rg) {
                i = o.GetBlockInfo(e.rg);
                i.lockoutTime = c.Lockout.lockoutDuration;
                i.overridable = i.r === "cat" && n.Policy.IsOverridable(i.catId)
            }
            switch (e.action) {
            case "settings":
                u.filteringDisabled = a();
                let t = "en";
                if (window.navigator.language) {
                    t = window.navigator.language.replace(/\-.+$/, "")
                }
                u.blockPageURI = blockPageURI;
                u.readOnly = false;
                if (typeof e.href === "string") {
                    let t = new s(e.href);
                    if (t.hostname.match(/^(([^\.])+\.)?facebook\.com$/i) && c.ContentFilterSettings.SocialMedia.Facebook.ReadOnly || t.hostname
                        .match(/^(([^\.])+\.)?twitter\.com$/i) && c.ContentFilterSettings.SocialMedia.Twitter.ReadOnly || t.hostname.match(
                            /^(([^\.])+\.)?pinterest\.com$/i) && c.ContentFilterSettings.SocialMedia.Pinterest.ReadOnly || t.hostname.match(
                            /^(([^\.])+\.)?instagram\.com$/i) && c.ContentFilterSettings.SocialMedia.Instagram.ReadOnly) {
                        u.readOnly = true
                    }
                }
                u.terms = n.Policy.ActivePolicies.BasePolicy.Reporting.FlaggedTerms;
                u.ignoredSites = n.Policy.ActivePolicies.BasePolicy.Reporting.IgnoreFlagSites;
                if (a()) {
                    u.ytSettings = {
                        hide_comments: false,
                        hide_sidebar: false,
                        disable_chan_autoplay: false
                    }
                } else {
                    u.ytSettings = {
                        hide_comments: c.YouTube.hideComments,
                        hide_sidebar: c.YouTube.hideSidebar,
                        disable_chan_autoplay: c.YouTube.preventChannelAutoplay,
                        block_thumbnails: c.YouTube.blockThumbnails
                    }
                }
                u.locale = t;
                r(u);
                break;
            case "override":
                n.Policy.EnableOverride();
                u.url = i.url;
                r(u);
                break;
            case "lockoutOverride":
                RelayLog.debug("Preforming a lockout override with request: ", e);
                c.YouTube.Remote.authenticateLockoutOverride(e.code, e.rg, currentUser(), function () {
                    u = {
                        lockoutRedirectUrl: i.url
                    };
                    RelayLog.debug("Responding to lockout override with resp: ", u);
                    r(u)
                });
                break;
            default:
                if (typeof i !== "undefined") {
                    r(i)
                }
                break
            }
        });
        t.exports.SetOsDisableFilteringCB = function (e) {
            if (typeof e === "undefined") {
                a = function () {}
            } else if (typeof e === "function") {
                a = e
            } else {
                throw new Error("cb must be a function")
            }
        }
    }, {
        "filtering-js": 33
    }],
    8: [function (e, t, r) {
        t.exports = n;

        function n(e, t, r) {
            var n = false;
            r = r || i;
            o.count = e;
            return e === 0 ? t() : o;

            function o(e, i) {
                if (o.count <= 0) {
                    throw new Error("after called too many times")
                }--o.count;
                if (e) {
                    n = true;
                    t(e);
                    t = r
                } else if (o.count === 0 && !n) {
                    t(null, i)
                }
            }
        }

        function i() {}
    }, {}],
    9: [function (e, t, r) {
        t.exports = function (e, t, r) {
            var n = e.byteLength;
            t = t || 0;
            r = r || n;
            if (e.slice) {
                return e.slice(t, r)
            }
            if (t < 0) {
                t += n
            }
            if (r < 0) {
                r += n
            }
            if (r > n) {
                r = n
            }
            if (t >= n || t >= r || n === 0) {
                return new ArrayBuffer(0)
            }
            var i = new Uint8Array(e);
            var o = new Uint8Array(r - t);
            for (var s = t, a = 0; s < r; s++, a++) {
                o[a] = i[s]
            }
            return o.buffer
        }
    }, {}],
    10: [function (e, t, r) {
        t.exports = n;

        function n(e) {
            e = e || {};
            this.ms = e.min || 100;
            this.max = e.max || 1e4;
            this.factor = e.factor || 2;
            this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0;
            this.attempts = 0
        }
        n.prototype.duration = function () {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random();
                var r = Math.floor(t * this.jitter * e);
                e = (Math.floor(t * 10) & 1) == 0 ? e - r : e + r
            }
            return Math.min(e, this.max) | 0
        };
        n.prototype.reset = function () {
            this.attempts = 0
        };
        n.prototype.setMin = function (e) {
            this.ms = e
        };
        n.prototype.setMax = function (e) {
            this.max = e
        };
        n.prototype.setJitter = function (e) {
            this.jitter = e
        }
    }, {}],
    11: [function (e, t, r) {
        (function () {
            "use strict";
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var t = new Uint8Array(256);
            for (var n = 0; n < e.length; n++) {
                t[e.charCodeAt(n)] = n
            }
            r.encode = function (t) {
                var r = new Uint8Array(t),
                    n, i = r.length,
                    o = "";
                for (n = 0; n < i; n += 3) {
                    o += e[r[n] >> 2];
                    o += e[(r[n] & 3) << 4 | r[n + 1] >> 4];
                    o += e[(r[n + 1] & 15) << 2 | r[n + 2] >> 6];
                    o += e[r[n + 2] & 63]
                }
                if (i % 3 === 2) {
                    o = o.substring(0, o.length - 1) + "="
                } else if (i % 3 === 1) {
                    o = o.substring(0, o.length - 2) + "=="
                }
                return o
            };
            r.decode = function (e) {
                var r = e.length * .75,
                    n = e.length,
                    i, o = 0,
                    s, a, u, c;
                if (e[e.length - 1] === "=") {
                    r--;
                    if (e[e.length - 2] === "=") {
                        r--
                    }
                }
                var l = new ArrayBuffer(r),
                    f = new Uint8Array(l);
                for (i = 0; i < n; i += 4) {
                    s = t[e.charCodeAt(i)];
                    a = t[e.charCodeAt(i + 1)];
                    u = t[e.charCodeAt(i + 2)];
                    c = t[e.charCodeAt(i + 3)];
                    f[o++] = s << 2 | a >> 4;
                    f[o++] = (a & 15) << 4 | u >> 2;
                    f[o++] = (u & 3) << 6 | c & 63
                }
                return l
            }
        })()
    }, {}],
    12: [function (e, t, r) {
        (function (e) {
            var r = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder;
            var n = function () {
                try {
                    var e = new Blob(["hi"]);
                    return e.size === 2
                } catch (e) {
                    return false
                }
            }();
            var i = n && function () {
                try {
                    var e = new Blob([new Uint8Array([1, 2])]);
                    return e.size === 2
                } catch (e) {
                    return false
                }
            }();
            var o = r && r.prototype.append && r.prototype.getBlob;

            function s(e) {
                for (var t = 0; t < e.length; t++) {
                    var r = e[t];
                    if (r.buffer instanceof ArrayBuffer) {
                        var n = r.buffer;
                        if (r.byteLength !== n.byteLength) {
                            var i = new Uint8Array(r.byteLength);
                            i.set(new Uint8Array(n, r.byteOffset, r.byteLength));
                            n = i.buffer
                        }
                        e[t] = n
                    }
                }
            }

            function a(e, t) {
                t = t || {};
                var n = new r;
                s(e);
                for (var i = 0; i < e.length; i++) {
                    n.append(e[i])
                }
                return t.type ? n.getBlob(t.type) : n.getBlob()
            }

            function u(e, t) {
                s(e);
                return new Blob(e, t || {})
            }
            t.exports = function () {
                if (n) {
                    return i ? e.Blob : u
                } else if (o) {
                    return a
                } else {
                    return undefined
                }
            }()
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    13: [function (e, t, r) {
        var n = [].slice;
        t.exports = function (e, t) {
            if ("string" == typeof t) t = e[t];
            if ("function" != typeof t) throw new Error("bind() requires a function");
            var r = n.call(arguments, 2);
            return function () {
                return t.apply(e, r.concat(n.call(arguments)))
            }
        }
    }, {}],
    14: [function (e, t, r) {
        if (typeof t !== "undefined") {
            t.exports = n
        }

        function n(e) {
            if (e) return i(e)
        }

        function i(e) {
            for (var t in n.prototype) {
                e[t] = n.prototype[t]
            }
            return e
        }
        n.prototype.on = n.prototype.addEventListener = function (e, t) {
            this._callbacks = this._callbacks || {};
            (this._callbacks["$" + e] = this._callbacks["$" + e] || [])
            .push(t);
            return this
        };
        n.prototype.once = function (e, t) {
            function r() {
                this.off(e, r);
                t.apply(this, arguments)
            }
            r.fn = t;
            this.on(e, r);
            return this
        };
        n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
            this._callbacks = this._callbacks || {};
            if (0 == arguments.length) {
                this._callbacks = {};
                return this
            }
            var r = this._callbacks["$" + e];
            if (!r) return this;
            if (1 == arguments.length) {
                delete this._callbacks["$" + e];
                return this
            }
            var n;
            for (var i = 0; i < r.length; i++) {
                n = r[i];
                if (n === t || n.fn === t) {
                    r.splice(i, 1);
                    break
                }
            }
            return this
        };
        n.prototype.emit = function (e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1),
                r = this._callbacks["$" + e];
            if (r) {
                r = r.slice(0);
                for (var n = 0, i = r.length; n < i; ++n) {
                    r[n].apply(this, t)
                }
            }
            return this
        };
        n.prototype.listeners = function (e) {
            this._callbacks = this._callbacks || {};
            return this._callbacks["$" + e] || []
        };
        n.prototype.hasListeners = function (e) {
            return !!this.listeners(e)
                .length
        }
    }, {}],
    15: [function (e, t, r) {
        t.exports = function (e, t) {
            var r = function () {};
            r.prototype = t.prototype;
            e.prototype = new r;
            e.prototype.constructor = e
        }
    }, {}],
    16: [function (e, t, r) {
        t.exports = e("./socket");
        t.exports.parser = e("engine.io-parser")
    }, {
        "./socket": 17,
        "engine.io-parser": 28
    }],
    17: [function (e, t, r) {
        (function (r) {
            var n = e("./transports/index");
            var i = e("component-emitter");
            var o = e("debug")("engine.io-client:socket");
            var s = e("indexof");
            var a = e("engine.io-parser");
            var u = e("parseuri");
            var c = e("parseqs");
            t.exports = l;

            function l(e, t) {
                if (!(this instanceof l)) return new l(e, t);
                t = t || {};
                if (e && "object" === typeof e) {
                    t = e;
                    e = null
                }
                if (e) {
                    e = u(e);
                    t.hostname = e.host;
                    t.secure = e.protocol === "https" || e.protocol === "wss";
                    t.port = e.port;
                    if (e.query) t.query = e.query
                } else if (t.host) {
                    t.hostname = u(t.host)
                        .host
                }
                this.secure = null != t.secure ? t.secure : r.location && "https:" === location.protocol;
                if (t.hostname && !t.port) {
                    t.port = this.secure ? "443" : "80"
                }
                this.agent = t.agent || false;
                this.hostname = t.hostname || (r.location ? location.hostname : "localhost");
                this.port = t.port || (r.location && location.port ? location.port : this.secure ? 443 : 80);
                this.query = t.query || {};
                if ("string" === typeof this.query) this.query = c.decode(this.query);
                this.upgrade = false !== t.upgrade;
                this.path = (t.path || "/engine.io")
                    .replace(/\/$/, "") + "/";
                this.forceJSONP = !!t.forceJSONP;
                this.jsonp = false !== t.jsonp;
                this.forceBase64 = !!t.forceBase64;
                this.enablesXDR = !!t.enablesXDR;
                this.timestampParam = t.timestampParam || "t";
                this.timestampRequests = t.timestampRequests;
                this.transports = t.transports || ["polling", "websocket"];
                this.transportOptions = t.transportOptions || {};
                this.readyState = "";
                this.writeBuffer = [];
                this.prevBufferLen = 0;
                this.policyPort = t.policyPort || 843;
                this.rememberUpgrade = t.rememberUpgrade || false;
                this.binaryType = null;
                this.onlyBinaryUpgrades = t.onlyBinaryUpgrades;
                this.perMessageDeflate = false !== t.perMessageDeflate ? t.perMessageDeflate || {} : false;
                if (true === this.perMessageDeflate) this.perMessageDeflate = {};
                if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
                    this.perMessageDeflate.threshold = 1024
                }
                this.pfx = t.pfx || null;
                this.key = t.key || null;
                this.passphrase = t.passphrase || null;
                this.cert = t.cert || null;
                this.ca = t.ca || null;
                this.ciphers = t.ciphers || null;
                this.rejectUnauthorized = t.rejectUnauthorized === undefined ? true : t.rejectUnauthorized;
                this.forceNode = !!t.forceNode;
                var n = typeof r === "object" && r;
                if (n.global === n) {
                    if (t.extraHeaders && Object.keys(t.extraHeaders)
                        .length > 0) {
                        this.extraHeaders = t.extraHeaders
                    }
                    if (t.localAddress) {
                        this.localAddress = t.localAddress
                    }
                }
                this.id = null;
                this.upgrades = null;
                this.pingInterval = null;
                this.pingTimeout = null;
                this.pingIntervalTimer = null;
                this.pingTimeoutTimer = null;
                this.open()
            }
            l.priorWebsocketSuccess = false;
            i(l.prototype);
            l.protocol = a.protocol;
            l.Socket = l;
            l.Transport = e("./transport");
            l.transports = e("./transports/index");
            l.parser = e("engine.io-parser");
            l.prototype.createTransport = function (e) {
                o('creating transport "%s"', e);
                var t = f(this.query);
                t.EIO = a.protocol;
                t.transport = e;
                var r = this.transportOptions[e] || {};
                if (this.id) t.sid = this.id;
                var i = new n[e]({
                    query: t,
                    socket: this,
                    agent: r.agent || this.agent,
                    hostname: r.hostname || this.hostname,
                    port: r.port || this.port,
                    secure: r.secure || this.secure,
                    path: r.path || this.path,
                    forceJSONP: r.forceJSONP || this.forceJSONP,
                    jsonp: r.jsonp || this.jsonp,
                    forceBase64: r.forceBase64 || this.forceBase64,
                    enablesXDR: r.enablesXDR || this.enablesXDR,
                    timestampRequests: r.timestampRequests || this.timestampRequests,
                    timestampParam: r.timestampParam || this.timestampParam,
                    policyPort: r.policyPort || this.policyPort,
                    pfx: r.pfx || this.pfx,
                    key: r.key || this.key,
                    passphrase: r.passphrase || this.passphrase,
                    cert: r.cert || this.cert,
                    ca: r.ca || this.ca,
                    ciphers: r.ciphers || this.ciphers,
                    rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
                    perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
                    extraHeaders: r.extraHeaders || this.extraHeaders,
                    forceNode: r.forceNode || this.forceNode,
                    localAddress: r.localAddress || this.localAddress,
                    requestTimeout: r.requestTimeout || this.requestTimeout,
                    protocols: r.protocols || void 0
                });
                return i
            };

            function f(e) {
                var t = {};
                for (var r in e) {
                    if (e.hasOwnProperty(r)) {
                        t[r] = e[r]
                    }
                }
                return t
            }
            l.prototype.open = function () {
                var e;
                if (this.rememberUpgrade && l.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
                    e = "websocket"
                } else if (0 === this.transports.length) {
                    var t = this;
                    setTimeout(function () {
                        t.emit("error", "No transports available")
                    }, 0);
                    return
                } else {
                    e = this.transports[0]
                }
                this.readyState = "opening";
                try {
                    e = this.createTransport(e)
                } catch (e) {
                    this.transports.shift();
                    this.open();
                    return
                }
                e.open();
                this.setTransport(e)
            };
            l.prototype.setTransport = function (e) {
                o("setting transport %s", e.name);
                var t = this;
                if (this.transport) {
                    o("clearing existing transport %s", this.transport.name);
                    this.transport.removeAllListeners()
                }
                this.transport = e;
                e.on("drain", function () {
                        t.onDrain()
                    })
                    .on("packet", function (e) {
                        t.onPacket(e)
                    })
                    .on("error", function (e) {
                        t.onError(e)
                    })
                    .on("close", function () {
                        t.onClose("transport close")
                    })
            };
            l.prototype.probe = function (e) {
                o('probing transport "%s"', e);
                var t = this.createTransport(e, {
                    probe: 1
                });
                var r = false;
                var n = this;
                l.priorWebsocketSuccess = false;

                function i() {
                    if (n.onlyBinaryUpgrades) {
                        var i = !this.supportsBinary && n.transport.supportsBinary;
                        r = r || i
                    }
                    if (r) return;
                    o('probe transport "%s" opened', e);
                    t.send([{
                        type: "ping",
                        data: "probe"
                    }]);
                    t.once("packet", function (i) {
                        if (r) return;
                        if ("pong" === i.type && "probe" === i.data) {
                            o('probe transport "%s" pong', e);
                            n.upgrading = true;
                            n.emit("upgrading", t);
                            if (!t) return;
                            l.priorWebsocketSuccess = "websocket" === t.name;
                            o('pausing current transport "%s"', n.transport.name);
                            n.transport.pause(function () {
                                if (r) return;
                                if ("closed" === n.readyState) return;
                                o("changing transport and sending upgrade packet");
                                p();
                                n.setTransport(t);
                                t.send([{
                                    type: "upgrade"
                                }]);
                                n.emit("upgrade", t);
                                t = null;
                                n.upgrading = false;
                                n.flush()
                            })
                        } else {
                            o('probe transport "%s" failed', e);
                            var s = new Error("probe error");
                            s.transport = t.name;
                            n.emit("upgradeError", s)
                        }
                    })
                }

                function s() {
                    if (r) return;
                    r = true;
                    p();
                    t.close();
                    t = null
                }

                function a(r) {
                    var i = new Error("probe error: " + r);
                    i.transport = t.name;
                    s();
                    o('probe transport "%s" failed because of error: %s', e, r);
                    n.emit("upgradeError", i)
                }

                function u() {
                    a("transport closed")
                }

                function c() {
                    a("socket closed")
                }

                function f(e) {
                    if (t && e.name !== t.name) {
                        o('"%s" works - aborting "%s"', e.name, t.name);
                        s()
                    }
                }

                function p() {
                    t.removeListener("open", i);
                    t.removeListener("error", a);
                    t.removeListener("close", u);
                    n.removeListener("close", c);
                    n.removeListener("upgrading", f)
                }
                t.once("open", i);
                t.once("error", a);
                t.once("close", u);
                this.once("close", c);
                this.once("upgrading", f);
                t.open()
            };
            l.prototype.onOpen = function () {
                o("socket open");
                this.readyState = "open";
                l.priorWebsocketSuccess = "websocket" === this.transport.name;
                this.emit("open");
                this.flush();
                if ("open" === this.readyState && this.upgrade && this.transport.pause) {
                    o("starting upgrade probes");
                    for (var e = 0, t = this.upgrades.length; e < t; e++) {
                        this.probe(this.upgrades[e])
                    }
                }
            };
            l.prototype.onPacket = function (e) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                    o('socket receive: type "%s", data "%s"', e.type, e.data);
                    this.emit("packet", e);
                    this.emit("heartbeat");
                    switch (e.type) {
                    case "open":
                        this.onHandshake(JSON.parse(e.data));
                        break;
                    case "pong":
                        this.setPing();
                        this.emit("pong");
                        break;
                    case "error":
                        var t = new Error("server error");
                        t.code = e.data;
                        this.onError(t);
                        break;
                    case "message":
                        this.emit("data", e.data);
                        this.emit("message", e.data);
                        break
                    }
                } else {
                    o('packet received with socket readyState "%s"', this.readyState)
                }
            };
            l.prototype.onHandshake = function (e) {
                this.emit("handshake", e);
                this.id = e.sid;
                this.transport.query.sid = e.sid;
                this.upgrades = this.filterUpgrades(e.upgrades);
                this.pingInterval = e.pingInterval;
                this.pingTimeout = e.pingTimeout;
                this.onOpen();
                if ("closed" === this.readyState) return;
                this.setPing();
                this.removeListener("heartbeat", this.onHeartbeat);
                this.on("heartbeat", this.onHeartbeat)
            };
            l.prototype.onHeartbeat = function (e) {
                clearTimeout(this.pingTimeoutTimer);
                var t = this;
                t.pingTimeoutTimer = setTimeout(function () {
                    if ("closed" === t.readyState) return;
                    t.onClose("ping timeout")
                }, e || t.pingInterval + t.pingTimeout)
            };
            l.prototype.setPing = function () {
                var e = this;
                clearTimeout(e.pingIntervalTimer);
                e.pingIntervalTimer = setTimeout(function () {
                    o("writing ping packet - expecting pong within %sms", e.pingTimeout);
                    e.ping();
                    e.onHeartbeat(e.pingTimeout)
                }, e.pingInterval)
            };
            l.prototype.ping = function () {
                var e = this;
                this.sendPacket("ping", function () {
                    e.emit("ping")
                })
            };
            l.prototype.onDrain = function () {
                this.writeBuffer.splice(0, this.prevBufferLen);
                this.prevBufferLen = 0;
                if (0 === this.writeBuffer.length) {
                    this.emit("drain")
                } else {
                    this.flush()
                }
            };
            l.prototype.flush = function () {
                if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
                    o("flushing %d packets in socket", this.writeBuffer.length);
                    this.transport.send(this.writeBuffer);
                    this.prevBufferLen = this.writeBuffer.length;
                    this.emit("flush")
                }
            };
            l.prototype.write = l.prototype.send = function (e, t, r) {
                this.sendPacket("message", e, t, r);
                return this
            };
            l.prototype.sendPacket = function (e, t, r, n) {
                if ("function" === typeof t) {
                    n = t;
                    t = undefined
                }
                if ("function" === typeof r) {
                    n = r;
                    r = null
                }
                if ("closing" === this.readyState || "closed" === this.readyState) {
                    return
                }
                r = r || {};
                r.compress = false !== r.compress;
                var i = {
                    type: e,
                    data: t,
                    options: r
                };
                this.emit("packetCreate", i);
                this.writeBuffer.push(i);
                if (n) this.once("flush", n);
                this.flush()
            };
            l.prototype.close = function () {
                if ("opening" === this.readyState || "open" === this.readyState) {
                    this.readyState = "closing";
                    var e = this;
                    if (this.writeBuffer.length) {
                        this.once("drain", function () {
                            if (this.upgrading) {
                                n()
                            } else {
                                t()
                            }
                        })
                    } else if (this.upgrading) {
                        n()
                    } else {
                        t()
                    }
                }

                function t() {
                    e.onClose("forced close");
                    o("socket closing - telling transport to close");
                    e.transport.close()
                }

                function r() {
                    e.removeListener("upgrade", r);
                    e.removeListener("upgradeError", r);
                    t()
                }

                function n() {
                    e.once("upgrade", r);
                    e.once("upgradeError", r)
                }
                return this
            };
            l.prototype.onError = function (e) {
                o("socket error %j", e);
                l.priorWebsocketSuccess = false;
                this.emit("error", e);
                this.onClose("transport error", e)
            };
            l.prototype.onClose = function (e, t) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                    o('socket close with reason: "%s"', e);
                    var r = this;
                    clearTimeout(this.pingIntervalTimer);
                    clearTimeout(this.pingTimeoutTimer);
                    this.transport.removeAllListeners("close");
                    this.transport.close();
                    this.transport.removeAllListeners();
                    this.readyState = "closed";
                    this.id = null;
                    this.emit("close", e, t);
                    r.writeBuffer = [];
                    r.prevBufferLen = 0
                }
            };
            l.prototype.filterUpgrades = function (e) {
                var t = [];
                for (var r = 0, n = e.length; r < n; r++) {
                    if (~s(this.transports, e[r])) t.push(e[r])
                }
                return t
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./transport": 18,
        "./transports/index": 19,
        "component-emitter": 14,
        debug: 25,
        "engine.io-parser": 28,
        indexof: 48,
        parseqs: 50,
        parseuri: 51
    }],
    18: [function (e, t, r) {
        var n = e("engine.io-parser");
        var i = e("component-emitter");
        t.exports = o;

        function o(e) {
            this.path = e.path;
            this.hostname = e.hostname;
            this.port = e.port;
            this.secure = e.secure;
            this.query = e.query;
            this.timestampParam = e.timestampParam;
            this.timestampRequests = e.timestampRequests;
            this.readyState = "";
            this.agent = e.agent || false;
            this.socket = e.socket;
            this.enablesXDR = e.enablesXDR;
            this.pfx = e.pfx;
            this.key = e.key;
            this.passphrase = e.passphrase;
            this.cert = e.cert;
            this.ca = e.ca;
            this.ciphers = e.ciphers;
            this.rejectUnauthorized = e.rejectUnauthorized;
            this.forceNode = e.forceNode;
            this.extraHeaders = e.extraHeaders;
            this.localAddress = e.localAddress
        }
        i(o.prototype);
        o.prototype.onError = function (e, t) {
            var r = new Error(e);
            r.type = "TransportError";
            r.description = t;
            this.emit("error", r);
            return this
        };
        o.prototype.open = function () {
            if ("closed" === this.readyState || "" === this.readyState) {
                this.readyState = "opening";
                this.doOpen()
            }
            return this
        };
        o.prototype.close = function () {
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.doClose();
                this.onClose()
            }
            return this
        };
        o.prototype.send = function (e) {
            if ("open" === this.readyState) {
                this.write(e)
            } else {
                throw new Error("Transport not open")
            }
        };
        o.prototype.onOpen = function () {
            this.readyState = "open";
            this.writable = true;
            this.emit("open")
        };
        o.prototype.onData = function (e) {
            var t = n.decodePacket(e, this.socket.binaryType);
            this.onPacket(t)
        };
        o.prototype.onPacket = function (e) {
            this.emit("packet", e)
        };
        o.prototype.onClose = function () {
            this.readyState = "closed";
            this.emit("close")
        }
    }, {
        "component-emitter": 14,
        "engine.io-parser": 28
    }],
    19: [function (e, t, r) {
        (function (t) {
            var n = e("xmlhttprequest-ssl");
            var i = e("./polling-xhr");
            var o = e("./polling-jsonp");
            var s = e("./websocket");
            r.polling = a;
            r.websocket = s;

            function a(e) {
                var r;
                var s = false;
                var a = false;
                var u = false !== e.jsonp;
                if (t.location) {
                    var c = "https:" === location.protocol;
                    var l = location.port;
                    if (!l) {
                        l = c ? 443 : 80
                    }
                    s = e.hostname !== location.hostname || l !== e.port;
                    a = e.secure !== c
                }
                e.xdomain = s;
                e.xscheme = a;
                r = new n(e);
                if ("open" in r && !e.forceJSONP) {
                    return new i(e)
                } else {
                    if (!u) throw new Error("JSONP disabled");
                    return new o(e)
                }
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./polling-jsonp": 20,
        "./polling-xhr": 21,
        "./websocket": 23,
        "xmlhttprequest-ssl": 24
    }],
    20: [function (e, t, r) {
        (function (r) {
            var n = e("./polling");
            var i = e("component-inherit");
            t.exports = c;
            var o = /\n/g;
            var s = /\\n/g;
            var a;

            function u() {}

            function c(e) {
                n.call(this, e);
                this.query = this.query || {};
                if (!a) {
                    if (!r.___eio) r.___eio = [];
                    a = r.___eio
                }
                this.index = a.length;
                var t = this;
                a.push(function (e) {
                    t.onData(e)
                });
                this.query.j = this.index;
                if (r.document && r.addEventListener) {
                    r.addEventListener("beforeunload", function () {
                        if (t.script) t.script.onerror = u
                    }, false)
                }
            }
            i(c, n);
            c.prototype.supportsBinary = false;
            c.prototype.doClose = function () {
                if (this.script) {
                    this.script.parentNode.removeChild(this.script);
                    this.script = null
                }
                if (this.form) {
                    this.form.parentNode.removeChild(this.form);
                    this.form = null;
                    this.iframe = null
                }
                n.prototype.doClose.call(this)
            };
            c.prototype.doPoll = function () {
                var e = this;
                var t = document.createElement("script");
                if (this.script) {
                    this.script.parentNode.removeChild(this.script);
                    this.script = null
                }
                t.async = true;
                t.src = this.uri();
                t.onerror = function (t) {
                    e.onError("jsonp poll error", t)
                };
                var r = document.getElementsByTagName("script")[0];
                if (r) {
                    r.parentNode.insertBefore(t, r)
                } else {
                    (document.head || document.body)
                    .appendChild(t)
                }
                this.script = t;
                var n = "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);
                if (n) {
                    setTimeout(function () {
                        var e = document.createElement("iframe");
                        document.body.appendChild(e);
                        document.body.removeChild(e)
                    }, 100)
                }
            };
            c.prototype.doWrite = function (e, t) {
                var r = this;
                if (!this.form) {
                    var n = document.createElement("form");
                    var i = document.createElement("textarea");
                    var a = this.iframeId = "eio_iframe_" + this.index;
                    var u;
                    n.className = "socketio";
                    n.style.position = "absolute";
                    n.style.top = "-1000px";
                    n.style.left = "-1000px";
                    n.target = a;
                    n.method = "POST";
                    n.setAttribute("accept-charset", "utf-8");
                    i.name = "d";
                    n.appendChild(i);
                    document.body.appendChild(n);
                    this.form = n;
                    this.area = i
                }
                this.form.action = this.uri();

                function c() {
                    l();
                    t()
                }

                function l() {
                    if (r.iframe) {
                        try {
                            r.form.removeChild(r.iframe)
                        } catch (e) {
                            r.onError("jsonp polling iframe removal error", e)
                        }
                    }
                    try {
                        var e = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                        u = document.createElement(e)
                    } catch (e) {
                        u = document.createElement("iframe");
                        u.name = r.iframeId;
                        u.src = "javascript:0"
                    }
                    u.id = r.iframeId;
                    r.form.appendChild(u);
                    r.iframe = u
                }
                l();
                e = e.replace(s, "\\\n");
                this.area.value = e.replace(o, "\\n");
                try {
                    this.form.submit()
                } catch (e) {}
                if (this.iframe.attachEvent) {
                    this.iframe.onreadystatechange = function () {
                        if (r.iframe.readyState === "complete") {
                            c()
                        }
                    }
                } else {
                    this.iframe.onload = c
                }
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./polling": 22,
        "component-inherit": 15
    }],
    21: [function (e, t, r) {
        (function (r) {
            var n = e("xmlhttprequest-ssl");
            var i = e("./polling");
            var o = e("component-emitter");
            var s = e("component-inherit");
            var a = e("debug")("engine.io-client:polling-xhr");
            t.exports = c;
            t.exports.Request = l;

            function u() {}

            function c(e) {
                i.call(this, e);
                this.requestTimeout = e.requestTimeout;
                this.extraHeaders = e.extraHeaders;
                if (r.location) {
                    var t = "https:" === location.protocol;
                    var n = location.port;
                    if (!n) {
                        n = t ? 443 : 80
                    }
                    this.xd = e.hostname !== r.location.hostname || n !== e.port;
                    this.xs = e.secure !== t
                }
            }
            s(c, i);
            c.prototype.supportsBinary = true;
            c.prototype.request = function (e) {
                e = e || {};
                e.uri = this.uri();
                e.xd = this.xd;
                e.xs = this.xs;
                e.agent = this.agent || false;
                e.supportsBinary = this.supportsBinary;
                e.enablesXDR = this.enablesXDR;
                e.pfx = this.pfx;
                e.key = this.key;
                e.passphrase = this.passphrase;
                e.cert = this.cert;
                e.ca = this.ca;
                e.ciphers = this.ciphers;
                e.rejectUnauthorized = this.rejectUnauthorized;
                e.requestTimeout = this.requestTimeout;
                e.extraHeaders = this.extraHeaders;
                return new l(e)
            };
            c.prototype.doWrite = function (e, t) {
                var r = typeof e !== "string" && e !== undefined;
                var n = this.request({
                    method: "POST",
                    data: e,
                    isBinary: r
                });
                var i = this;
                n.on("success", t);
                n.on("error", function (e) {
                    i.onError("xhr post error", e)
                });
                this.sendXhr = n
            };
            c.prototype.doPoll = function () {
                a("xhr poll");
                var e = this.request();
                var t = this;
                e.on("data", function (e) {
                    t.onData(e)
                });
                e.on("error", function (e) {
                    t.onError("xhr poll error", e)
                });
                this.pollXhr = e
            };

            function l(e) {
                this.method = e.method || "GET";
                this.uri = e.uri;
                this.xd = !!e.xd;
                this.xs = !!e.xs;
                this.async = false !== e.async;
                this.data = undefined !== e.data ? e.data : null;
                this.agent = e.agent;
                this.isBinary = e.isBinary;
                this.supportsBinary = e.supportsBinary;
                this.enablesXDR = e.enablesXDR;
                this.requestTimeout = e.requestTimeout;
                this.pfx = e.pfx;
                this.key = e.key;
                this.passphrase = e.passphrase;
                this.cert = e.cert;
                this.ca = e.ca;
                this.ciphers = e.ciphers;
                this.rejectUnauthorized = e.rejectUnauthorized;
                this.extraHeaders = e.extraHeaders;
                this.create()
            }
            o(l.prototype);
            l.prototype.create = function () {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx;
                e.key = this.key;
                e.passphrase = this.passphrase;
                e.cert = this.cert;
                e.ca = this.ca;
                e.ciphers = this.ciphers;
                e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new n(e);
                var i = this;
                try {
                    a("xhr open %s: %s", this.method, this.uri);
                    t.open(this.method, this.uri, this.async);
                    try {
                        if (this.extraHeaders) {
                            t.setDisableHeaderCheck && t.setDisableHeaderCheck(true);
                            for (var o in this.extraHeaders) {
                                if (this.extraHeaders.hasOwnProperty(o)) {
                                    t.setRequestHeader(o, this.extraHeaders[o])
                                }
                            }
                        }
                    } catch (e) {}
                    if ("POST" === this.method) {
                        try {
                            if (this.isBinary) {
                                t.setRequestHeader("Content-type", "application/octet-stream")
                            } else {
                                t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                            }
                        } catch (e) {}
                    }
                    try {
                        t.setRequestHeader("Accept", "*/*")
                    } catch (e) {}
                    if ("withCredentials" in t) {
                        t.withCredentials = true
                    }
                    if (this.requestTimeout) {
                        t.timeout = this.requestTimeout
                    }
                    if (this.hasXDR()) {
                        t.onload = function () {
                            i.onLoad()
                        };
                        t.onerror = function () {
                            i.onError(t.responseText)
                        }
                    } else {
                        t.onreadystatechange = function () {
                            if (t.readyState === 2) {
                                try {
                                    var e = t.getResponseHeader("Content-Type");
                                    if (i.supportsBinary && e === "application/octet-stream") {
                                        t.responseType = "arraybuffer"
                                    }
                                } catch (e) {}
                            }
                            if (4 !== t.readyState) return;
                            if (200 === t.status || 1223 === t.status) {
                                i.onLoad()
                            } else {
                                setTimeout(function () {
                                    i.onError(t.status)
                                }, 0)
                            }
                        }
                    }
                    a("xhr data %s", this.data);
                    t.send(this.data)
                } catch (e) {
                    setTimeout(function () {
                        i.onError(e)
                    }, 0);
                    return
                }
                if (r.document) {
                    this.index = l.requestsCount++;
                    l.requests[this.index] = this
                }
            };
            l.prototype.onSuccess = function () {
                this.emit("success");
                this.cleanup()
            };
            l.prototype.onData = function (e) {
                this.emit("data", e);
                this.onSuccess()
            };
            l.prototype.onError = function (e) {
                this.emit("error", e);
                this.cleanup(true)
            };
            l.prototype.cleanup = function (e) {
                if ("undefined" === typeof this.xhr || null === this.xhr) {
                    return
                }
                if (this.hasXDR()) {
                    this.xhr.onload = this.xhr.onerror = u
                } else {
                    this.xhr.onreadystatechange = u
                }
                if (e) {
                    try {
                        this.xhr.abort()
                    } catch (e) {}
                }
                if (r.document) {
                    delete l.requests[this.index]
                }
                this.xhr = null
            };
            l.prototype.onLoad = function () {
                var e;
                try {
                    var t;
                    try {
                        t = this.xhr.getResponseHeader("Content-Type")
                    } catch (e) {}
                    if (t === "application/octet-stream") {
                        e = this.xhr.response || this.xhr.responseText
                    } else {
                        e = this.xhr.responseText
                    }
                } catch (e) {
                    this.onError(e)
                }
                if (null != e) {
                    this.onData(e)
                }
            };
            l.prototype.hasXDR = function () {
                return "undefined" !== typeof r.XDomainRequest && !this.xs && this.enablesXDR
            };
            l.prototype.abort = function () {
                this.cleanup()
            };
            l.requestsCount = 0;
            l.requests = {};
            if (r.document) {
                if (r.attachEvent) {
                    r.attachEvent("onunload", f)
                } else if (r.addEventListener) {
                    r.addEventListener("beforeunload", f, false)
                }
            }

            function f() {
                for (var e in l.requests) {
                    if (l.requests.hasOwnProperty(e)) {
                        l.requests[e].abort()
                    }
                }
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./polling": 22,
        "component-emitter": 14,
        "component-inherit": 15,
        debug: 25,
        "xmlhttprequest-ssl": 24
    }],
    22: [function (e, t, r) {
        var n = e("../transport");
        var i = e("parseqs");
        var o = e("engine.io-parser");
        var s = e("component-inherit");
        var a = e("yeast");
        var u = e("debug")("engine.io-client:polling");
        t.exports = l;
        var c = function () {
            var t = e("xmlhttprequest-ssl");
            var r = new t({
                xdomain: false
            });
            return null != r.responseType
        }();

        function l(e) {
            var t = e && e.forceBase64;
            if (!c || t) {
                this.supportsBinary = false
            }
            n.call(this, e)
        }
        s(l, n);
        l.prototype.name = "polling";
        l.prototype.doOpen = function () {
            this.poll()
        };
        l.prototype.pause = function (e) {
            var t = this;
            this.readyState = "pausing";

            function r() {
                u("paused");
                t.readyState = "paused";
                e()
            }
            if (this.polling || !this.writable) {
                var n = 0;
                if (this.polling) {
                    u("we are currently polling - waiting to pause");
                    n++;
                    this.once("pollComplete", function () {
                        u("pre-pause polling complete");
                        --n || r()
                    })
                }
                if (!this.writable) {
                    u("we are currently writing - waiting to pause");
                    n++;
                    this.once("drain", function () {
                        u("pre-pause writing complete");
                        --n || r()
                    })
                }
            } else {
                r()
            }
        };
        l.prototype.poll = function () {
            u("polling");
            this.polling = true;
            this.doPoll();
            this.emit("poll")
        };
        l.prototype.onData = function (e) {
            var t = this;
            u("polling got data %s", e);
            var r = function (e, r, n) {
                if ("opening" === t.readyState) {
                    t.onOpen()
                }
                if ("close" === e.type) {
                    t.onClose();
                    return false
                }
                t.onPacket(e)
            };
            o.decodePayload(e, this.socket.binaryType, r);
            if ("closed" !== this.readyState) {
                this.polling = false;
                this.emit("pollComplete");
                if ("open" === this.readyState) {
                    this.poll()
                } else {
                    u('ignoring poll - transport state "%s"', this.readyState)
                }
            }
        };
        l.prototype.doClose = function () {
            var e = this;

            function t() {
                u("writing close packet");
                e.write([{
                    type: "close"
                }])
            }
            if ("open" === this.readyState) {
                u("transport open - closing");
                t()
            } else {
                u("transport not open - deferring close");
                this.once("open", t)
            }
        };
        l.prototype.write = function (e) {
            var t = this;
            this.writable = false;
            var r = function () {
                t.writable = true;
                t.emit("drain")
            };
            o.encodePayload(e, this.supportsBinary, function (e) {
                t.doWrite(e, r)
            })
        };
        l.prototype.uri = function () {
            var e = this.query || {};
            var t = this.secure ? "https" : "http";
            var r = "";
            if (false !== this.timestampRequests) {
                e[this.timestampParam] = a()
            }
            if (!this.supportsBinary && !e.sid) {
                e.b64 = 1
            }
            e = i.encode(e);
            if (this.port && ("https" === t && Number(this.port) !== 443 || "http" === t && Number(this.port) !== 80)) {
                r = ":" + this.port
            }
            if (e.length) {
                e = "?" + e
            }
            var n = this.hostname.indexOf(":") !== -1;
            return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
        }
    }, {
        "../transport": 18,
        "component-inherit": 15,
        debug: 25,
        "engine.io-parser": 28,
        parseqs: 50,
        "xmlhttprequest-ssl": 24,
        yeast: 71
    }],
    23: [function (e, t, r) {
        (function (r) {
            var n = e("../transport");
            var i = e("engine.io-parser");
            var o = e("parseqs");
            var s = e("component-inherit");
            var a = e("yeast");
            var u = e("debug")("engine.io-client:websocket");
            var c = r.WebSocket || r.MozWebSocket;
            var l;
            if (typeof window === "undefined") {
                try {
                    l = e("ws")
                } catch (e) {}
            }
            var f = c;
            if (!f && typeof window === "undefined") {
                f = l
            }
            t.exports = p;

            function p(e) {
                var t = e && e.forceBase64;
                if (t) {
                    this.supportsBinary = false
                }
                this.perMessageDeflate = e.perMessageDeflate;
                this.usingBrowserWebSocket = c && !e.forceNode;
                this.protocols = e.protocols;
                if (!this.usingBrowserWebSocket) {
                    f = l
                }
                n.call(this, e)
            }
            s(p, n);
            p.prototype.name = "websocket";
            p.prototype.supportsBinary = true;
            p.prototype.doOpen = function () {
                if (!this.check()) {
                    return
                }
                var e = this.uri();
                var t = this.protocols;
                var r = {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                };
                r.pfx = this.pfx;
                r.key = this.key;
                r.passphrase = this.passphrase;
                r.cert = this.cert;
                r.ca = this.ca;
                r.ciphers = this.ciphers;
                r.rejectUnauthorized = this.rejectUnauthorized;
                if (this.extraHeaders) {
                    r.headers = this.extraHeaders
                }
                if (this.localAddress) {
                    r.localAddress = this.localAddress
                }
                try {
                    this.ws = this.usingBrowserWebSocket ? t ? new f(e, t) : new f(e) : new f(e, t, r)
                } catch (e) {
                    return this.emit("error", e)
                }
                if (this.ws.binaryType === undefined) {
                    this.supportsBinary = false
                }
                if (this.ws.supports && this.ws.supports.binary) {
                    this.supportsBinary = true;
                    this.ws.binaryType = "nodebuffer"
                } else {
                    this.ws.binaryType = "arraybuffer"
                }
                this.addEventListeners()
            };
            p.prototype.addEventListeners = function () {
                var e = this;
                this.ws.onopen = function () {
                    e.onOpen()
                };
                this.ws.onclose = function () {
                    e.onClose()
                };
                this.ws.onmessage = function (t) {
                    e.onData(t.data)
                };
                this.ws.onerror = function (t) {
                    e.onError("websocket error", t)
                }
            };
            p.prototype.write = function (e) {
                var t = this;
                this.writable = false;
                var n = e.length;
                for (var o = 0, s = n; o < s; o++) {
                    (function (e) {
                        i.encodePacket(e, t.supportsBinary, function (i) {
                            if (!t.usingBrowserWebSocket) {
                                var o = {};
                                if (e.options) {
                                    o.compress = e.options.compress
                                }
                                if (t.perMessageDeflate) {
                                    var s = "string" === typeof i ? r.Buffer.byteLength(i) : i.length;
                                    if (s < t.perMessageDeflate.threshold) {
                                        o.compress = false
                                    }
                                }
                            }
                            try {
                                if (t.usingBrowserWebSocket) {
                                    t.ws.send(i)
                                } else {
                                    t.ws.send(i, o)
                                }
                            } catch (e) {
                                u("websocket closed before onclose event")
                            }--n || a()
                        })
                    })(e[o])
                }

                function a() {
                    t.emit("flush");
                    setTimeout(function () {
                        t.writable = true;
                        t.emit("drain")
                    }, 0)
                }
            };
            p.prototype.onClose = function () {
                n.prototype.onClose.call(this)
            };
            p.prototype.doClose = function () {
                if (typeof this.ws !== "undefined") {
                    this.ws.close()
                }
            };
            p.prototype.uri = function () {
                var e = this.query || {};
                var t = this.secure ? "wss" : "ws";
                var r = "";
                if (this.port && ("wss" === t && Number(this.port) !== 443 || "ws" === t && Number(this.port) !== 80)) {
                    r = ":" + this.port
                }
                if (this.timestampRequests) {
                    e[this.timestampParam] = a()
                }
                if (!this.supportsBinary) {
                    e.b64 = 1
                }
                e = o.encode(e);
                if (e.length) {
                    e = "?" + e
                }
                var n = this.hostname.indexOf(":") !== -1;
                return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
            };
            p.prototype.check = function () {
                return !!f && !("__initialize" in f && this.name === p.prototype.name)
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "../transport": 18,
        "component-inherit": 15,
        debug: 25,
        "engine.io-parser": 28,
        parseqs: 50,
        ws: 1,
        yeast: 71
    }],
    24: [function (e, t, r) {
        (function (r) {
            var n = e("has-cors");
            t.exports = function (e) {
                var t = e.xdomain;
                var i = e.xscheme;
                var o = e.enablesXDR;
                try {
                    if ("undefined" !== typeof XMLHttpRequest && (!t || n)) {
                        return new XMLHttpRequest
                    }
                } catch (e) {}
                try {
                    if ("undefined" !== typeof XDomainRequest && !i && o) {
                        return new XDomainRequest
                    }
                } catch (e) {}
                if (!t) {
                    try {
                        return new(r[["Active"].concat("Object")
                            .join("X")])("Microsoft.XMLHTTP")
                    } catch (e) {}
                }
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "has-cors": 47
    }],
    25: [function (e, t, r) {
        (function (n) {
            r = t.exports = e("./debug");
            r.log = s;
            r.formatArgs = o;
            r.save = a;
            r.load = u;
            r.useColors = i;
            r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c();
            r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66",
                "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF",
                "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00",
                "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099",
                "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900",
                "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333",
                "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"
            ];

            function i() {
                if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
                    return true
                }
                if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase()
                    .match(/(edge|trident)\/(\d+)/)) {
                    return false
                }
                return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement
                    .style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception &&
                        window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase()
                    .match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent &&
                    navigator.userAgent.toLowerCase()
                    .match(/applewebkit\/(\d+)/)
            }
            r.formatters.j = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            };

            function o(e) {
                var t = this.useColors;
                e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff);
                if (!t) return;
                var n = "color: " + this.color;
                e.splice(1, 0, n, "color: inherit");
                var i = 0;
                var o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function (e) {
                    if ("%%" === e) return;
                    i++;
                    if ("%c" === e) {
                        o = i
                    }
                });
                e.splice(o, 0, n)
            }

            function s() {
                return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(e) {
                try {
                    if (null == e) {
                        r.storage.removeItem("debug")
                    } else {
                        r.storage.debug = e
                    }
                } catch (e) {}
            }

            function u() {
                var e;
                try {
                    e = r.storage.debug
                } catch (e) {}
                if (!e && typeof n !== "undefined" && "env" in n) {
                    e = n.env.DEBUG
                }
                return e
            }
            r.enable(u());

            function c() {
                try {
                    return window.localStorage
                } catch (e) {}
            }
        })
        .call(this, e("_process"))
    }, {
        "./debug": 26,
        _process: 2
    }],
    26: [function (e, t, r) {
        r = t.exports = i.debug = i["default"] = i;
        r.coerce = c;
        r.disable = a;
        r.enable = s;
        r.enabled = u;
        r.humanize = e("ms");
        r.instances = [];
        r.names = [];
        r.skips = [];
        r.formatters = {};

        function n(e) {
            var t = 0,
                n;
            for (n in e) {
                t = (t << 5) - t + e.charCodeAt(n);
                t |= 0
            }
            return r.colors[Math.abs(t) % r.colors.length]
        }

        function i(e) {
            var t;

            function i() {
                if (!i.enabled) return;
                var e = i;
                var n = +new Date;
                var o = n - (t || n);
                e.diff = o;
                e.prev = t;
                e.curr = n;
                t = n;
                var s = new Array(arguments.length);
                for (var a = 0; a < s.length; a++) {
                    s[a] = arguments[a]
                }
                s[0] = r.coerce(s[0]);
                if ("string" !== typeof s[0]) {
                    s.unshift("%O")
                }
                var u = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, function (t, n) {
                    if (t === "%%") return t;
                    u++;
                    var i = r.formatters[n];
                    if ("function" === typeof i) {
                        var o = s[u];
                        t = i.call(e, o);
                        s.splice(u, 1);
                        u--
                    }
                    return t
                });
                r.formatArgs.call(e, s);
                var c = i.log || r.log || console.log.bind(console);
                c.apply(e, s)
            }
            i.namespace = e;
            i.enabled = r.enabled(e);
            i.useColors = r.useColors();
            i.color = n(e);
            i.destroy = o;
            if ("function" === typeof r.init) {
                r.init(i)
            }
            r.instances.push(i);
            return i
        }

        function o() {
            var e = r.instances.indexOf(this);
            if (e !== -1) {
                r.instances.splice(e, 1);
                return true
            } else {
                return false
            }
        }

        function s(e) {
            r.save(e);
            r.names = [];
            r.skips = [];
            var t;
            var n = (typeof e === "string" ? e : "")
                .split(/[\s,]+/);
            var i = n.length;
            for (t = 0; t < i; t++) {
                if (!n[t]) continue;
                e = n[t].replace(/\*/g, ".*?");
                if (e[0] === "-") {
                    r.skips.push(new RegExp("^" + e.substr(1) + "$"))
                } else {
                    r.names.push(new RegExp("^" + e + "$"))
                }
            }
            for (t = 0; t < r.instances.length; t++) {
                var o = r.instances[t];
                o.enabled = r.enabled(o.namespace)
            }
        }

        function a() {
            r.enable("")
        }

        function u(e) {
            if (e[e.length - 1] === "*") {
                return true
            }
            var t, n;
            for (t = 0, n = r.skips.length; t < n; t++) {
                if (r.skips[t].test(e)) {
                    return false
                }
            }
            for (t = 0, n = r.names.length; t < n; t++) {
                if (r.names[t].test(e)) {
                    return true
                }
            }
            return false
        }

        function c(e) {
            if (e instanceof Error) return e.stack || e.message;
            return e
        }
    }, {
        ms: 27
    }],
    27: [function (e, t, r) {
        var n = 1e3;
        var i = n * 60;
        var o = i * 60;
        var s = o * 24;
        var a = s * 365.25;
        t.exports = function (e, t) {
            t = t || {};
            var r = typeof e;
            if (r === "string" && e.length > 0) {
                return u(e)
            } else if (r === "number" && isNaN(e) === false) {
                return t.long ? l(e) : c(e)
            }
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        };

        function u(e) {
            e = String(e);
            if (e.length > 100) {
                return
            }
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) {
                return
            }
            var r = parseFloat(t[1]);
            var u = (t[2] || "ms")
                .toLowerCase();
            switch (u) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
                return r * a;
            case "days":
            case "day":
            case "d":
                return r * s;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
                return r * o;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
                return r * i;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
                return r * n;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
                return r;
            default:
                return undefined
            }
        }

        function c(e) {
            if (e >= s) {
                return Math.round(e / s) + "d"
            }
            if (e >= o) {
                return Math.round(e / o) + "h"
            }
            if (e >= i) {
                return Math.round(e / i) + "m"
            }
            if (e >= n) {
                return Math.round(e / n) + "s"
            }
            return e + "ms"
        }

        function l(e) {
            return f(e, s, "day") || f(e, o, "hour") || f(e, i, "minute") || f(e, n, "second") || e + " ms"
        }

        function f(e, t, r) {
            if (e < t) {
                return
            }
            if (e < t * 1.5) {
                return Math.floor(e / t) + " " + r
            }
            return Math.ceil(e / t) + " " + r + "s"
        }
    }, {}],
    28: [function (e, t, r) {
        (function (t) {
            var n = e("./keys");
            var i = e("has-binary2");
            var o = e("arraybuffer.slice");
            var s = e("after");
            var a = e("./utf8");
            var u;
            if (t && t.ArrayBuffer) {
                u = e("base64-arraybuffer")
            }
            var c = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
            var l = typeof navigator !== "undefined" && /PhantomJS/i.test(navigator.userAgent);
            var f = c || l;
            r.protocol = 3;
            var p = r.packets = {
                open: 0,
                close: 1,
                ping: 2,
                pong: 3,
                message: 4,
                upgrade: 5,
                noop: 6
            };
            var h = n(p);
            var d = {
                type: "error",
                data: "parser error"
            };
            var g = e("blob");
            r.encodePacket = function (e, r, n, i) {
                if (typeof r === "function") {
                    i = r;
                    r = false
                }
                if (typeof n === "function") {
                    i = n;
                    n = null
                }
                var o = e.data === undefined ? undefined : e.data.buffer || e.data;
                if (t.ArrayBuffer && o instanceof ArrayBuffer) {
                    return v(e, r, i)
                } else if (g && o instanceof t.Blob) {
                    return b(e, r, i)
                }
                if (o && o.base64) {
                    return y(e, i)
                }
                var s = p[e.type];
                if (undefined !== e.data) {
                    s += n ? a.encode(String(e.data), {
                        strict: false
                    }) : String(e.data)
                }
                return i("" + s)
            };

            function y(e, t) {
                var n = "b" + r.packets[e.type] + e.data.data;
                return t(n)
            }

            function v(e, t, n) {
                if (!t) {
                    return r.encodeBase64Packet(e, n)
                }
                var i = e.data;
                var o = new Uint8Array(i);
                var s = new Uint8Array(1 + i.byteLength);
                s[0] = p[e.type];
                for (var a = 0; a < o.length; a++) {
                    s[a + 1] = o[a]
                }
                return n(s.buffer)
            }

            function m(e, t, n) {
                if (!t) {
                    return r.encodeBase64Packet(e, n)
                }
                var i = new FileReader;
                i.onload = function () {
                    e.data = i.result;
                    r.encodePacket(e, t, true, n)
                };
                return i.readAsArrayBuffer(e.data)
            }

            function b(e, t, n) {
                if (!t) {
                    return r.encodeBase64Packet(e, n)
                }
                if (f) {
                    return m(e, t, n)
                }
                var i = new Uint8Array(1);
                i[0] = p[e.type];
                var o = new g([i.buffer, e.data]);
                return n(o)
            }
            r.encodeBase64Packet = function (e, n) {
                var i = "b" + r.packets[e.type];
                if (g && e.data instanceof t.Blob) {
                    var o = new FileReader;
                    o.onload = function () {
                        var e = o.result.split(",")[1];
                        n(i + e)
                    };
                    return o.readAsDataURL(e.data)
                }
                var s;
                try {
                    s = String.fromCharCode.apply(null, new Uint8Array(e.data))
                } catch (t) {
                    var a = new Uint8Array(e.data);
                    var u = new Array(a.length);
                    for (var c = 0; c < a.length; c++) {
                        u[c] = a[c]
                    }
                    s = String.fromCharCode.apply(null, u)
                }
                i += t.btoa(s);
                return n(i)
            };
            r.decodePacket = function (e, t, n) {
                if (e === undefined) {
                    return d
                }
                if (typeof e === "string") {
                    if (e.charAt(0) === "b") {
                        return r.decodeBase64Packet(e.substr(1), t)
                    }
                    if (n) {
                        e = _(e);
                        if (e === false) {
                            return d
                        }
                    }
                    var i = e.charAt(0);
                    if (Number(i) != i || !h[i]) {
                        return d
                    }
                    if (e.length > 1) {
                        return {
                            type: h[i],
                            data: e.substring(1)
                        }
                    } else {
                        return {
                            type: h[i]
                        }
                    }
                }
                var s = new Uint8Array(e);
                var i = s[0];
                var a = o(e, 1);
                if (g && t === "blob") {
                    a = new g([a])
                }
                return {
                    type: h[i],
                    data: a
                }
            };

            function _(e) {
                try {
                    e = a.decode(e, {
                        strict: false
                    })
                } catch (e) {
                    return false
                }
                return e
            }
            r.decodeBase64Packet = function (e, t) {
                var r = h[e.charAt(0)];
                if (!u) {
                    return {
                        type: r,
                        data: {
                            base64: true,
                            data: e.substr(1)
                        }
                    }
                }
                var n = u.decode(e.substr(1));
                if (t === "blob" && g) {
                    n = new g([n])
                }
                return {
                    type: r,
                    data: n
                }
            };
            r.encodePayload = function (e, t, n) {
                if (typeof t === "function") {
                    n = t;
                    t = null
                }
                var o = i(e);
                if (t && o) {
                    if (g && !f) {
                        return r.encodePayloadAsBlob(e, n)
                    }
                    return r.encodePayloadAsArrayBuffer(e, n)
                }
                if (!e.length) {
                    return n("0:")
                }

                function s(e) {
                    return e.length + ":" + e
                }

                function a(e, n) {
                    r.encodePacket(e, !o ? false : t, false, function (e) {
                        n(null, s(e))
                    })
                }
                w(e, a, function (e, t) {
                    return n(t.join(""))
                })
            };

            function w(e, t, r) {
                var n = new Array(e.length);
                var i = s(e.length, r);
                var o = function (e, r, i) {
                    t(r, function (t, r) {
                        n[e] = r;
                        i(t, n)
                    })
                };
                for (var a = 0; a < e.length; a++) {
                    o(a, e[a], i)
                }
            }
            r.decodePayload = function (e, t, n) {
                if (typeof e !== "string") {
                    return r.decodePayloadAsBinary(e, t, n)
                }
                if (typeof t === "function") {
                    n = t;
                    t = null
                }
                var i;
                if (e === "") {
                    return n(d, 0, 1)
                }
                var o = "",
                    s, a;
                for (var u = 0, c = e.length; u < c; u++) {
                    var l = e.charAt(u);
                    if (l !== ":") {
                        o += l;
                        continue
                    }
                    if (o === "" || o != (s = Number(o))) {
                        return n(d, 0, 1)
                    }
                    a = e.substr(u + 1, s);
                    if (o != a.length) {
                        return n(d, 0, 1)
                    }
                    if (a.length) {
                        i = r.decodePacket(a, t, false);
                        if (d.type === i.type && d.data === i.data) {
                            return n(d, 0, 1)
                        }
                        var f = n(i, u + s, c);
                        if (false === f) return
                    }
                    u += s;
                    o = ""
                }
                if (o !== "") {
                    return n(d, 0, 1)
                }
            };
            r.encodePayloadAsArrayBuffer = function (e, t) {
                if (!e.length) {
                    return t(new ArrayBuffer(0))
                }

                function n(e, t) {
                    r.encodePacket(e, true, true, function (e) {
                        return t(null, e)
                    })
                }
                w(e, n, function (e, r) {
                    var n = r.reduce(function (e, t) {
                        var r;
                        if (typeof t === "string") {
                            r = t.length
                        } else {
                            r = t.byteLength
                        }
                        return e + r.toString()
                            .length + r + 2
                    }, 0);
                    var i = new Uint8Array(n);
                    var o = 0;
                    r.forEach(function (e) {
                        var t = typeof e === "string";
                        var r = e;
                        if (t) {
                            var n = new Uint8Array(e.length);
                            for (var s = 0; s < e.length; s++) {
                                n[s] = e.charCodeAt(s)
                            }
                            r = n.buffer
                        }
                        if (t) {
                            i[o++] = 0
                        } else {
                            i[o++] = 1
                        }
                        var a = r.byteLength.toString();
                        for (var s = 0; s < a.length; s++) {
                            i[o++] = parseInt(a[s])
                        }
                        i[o++] = 255;
                        var n = new Uint8Array(r);
                        for (var s = 0; s < n.length; s++) {
                            i[o++] = n[s]
                        }
                    });
                    return t(i.buffer)
                })
            };
            r.encodePayloadAsBlob = function (e, t) {
                function n(e, t) {
                    r.encodePacket(e, true, true, function (e) {
                        var r = new Uint8Array(1);
                        r[0] = 1;
                        if (typeof e === "string") {
                            var n = new Uint8Array(e.length);
                            for (var i = 0; i < e.length; i++) {
                                n[i] = e.charCodeAt(i)
                            }
                            e = n.buffer;
                            r[0] = 0
                        }
                        var o = e instanceof ArrayBuffer ? e.byteLength : e.size;
                        var s = o.toString();
                        var a = new Uint8Array(s.length + 1);
                        for (var i = 0; i < s.length; i++) {
                            a[i] = parseInt(s[i])
                        }
                        a[s.length] = 255;
                        if (g) {
                            var u = new g([r.buffer, a.buffer, e]);
                            t(null, u)
                        }
                    })
                }
                w(e, n, function (e, r) {
                    return t(new g(r))
                })
            };
            r.decodePayloadAsBinary = function (e, t, n) {
                if (typeof t === "function") {
                    n = t;
                    t = null
                }
                var i = e;
                var s = [];
                while (i.byteLength > 0) {
                    var a = new Uint8Array(i);
                    var u = a[0] === 0;
                    var c = "";
                    for (var l = 1;; l++) {
                        if (a[l] === 255) break;
                        if (c.length > 310) {
                            return n(d, 0, 1)
                        }
                        c += a[l]
                    }
                    i = o(i, 2 + c.length);
                    c = parseInt(c);
                    var f = o(i, 0, c);
                    if (u) {
                        try {
                            f = String.fromCharCode.apply(null, new Uint8Array(f))
                        } catch (e) {
                            var p = new Uint8Array(f);
                            f = "";
                            for (var l = 0; l < p.length; l++) {
                                f += String.fromCharCode(p[l])
                            }
                        }
                    }
                    s.push(f);
                    i = o(i, c)
                }
                var h = s.length;
                s.forEach(function (e, i) {
                    n(r.decodePacket(e, t, true), i, h)
                })
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./keys": 29,
        "./utf8": 30,
        after: 8,
        "arraybuffer.slice": 9,
        "base64-arraybuffer": 11,
        blob: 12,
        "has-binary2": 45
    }],
    29: [function (e, t, r) {
        t.exports = Object.keys || function e(t) {
            var r = [];
            var n = Object.prototype.hasOwnProperty;
            for (var i in t) {
                if (n.call(t, i)) {
                    r.push(i)
                }
            }
            return r
        }
    }, {}],
    30: [function (e, t, r) {
        (function (e) {
            (function (n) {
                var i = typeof r == "object" && r;
                var o = typeof t == "object" && t && t.exports == i && t;
                var s = typeof e == "object" && e;
                if (s.global === s || s.window === s) {
                    n = s
                }
                var a = String.fromCharCode;

                function u(e) {
                    var t = [];
                    var r = 0;
                    var n = e.length;
                    var i;
                    var o;
                    while (r < n) {
                        i = e.charCodeAt(r++);
                        if (i >= 55296 && i <= 56319 && r < n) {
                            o = e.charCodeAt(r++);
                            if ((o & 64512) == 56320) {
                                t.push(((i & 1023) << 10) + (o & 1023) + 65536)
                            } else {
                                t.push(i);
                                r--
                            }
                        } else {
                            t.push(i)
                        }
                    }
                    return t
                }

                function c(e) {
                    var t = e.length;
                    var r = -1;
                    var n;
                    var i = "";
                    while (++r < t) {
                        n = e[r];
                        if (n > 65535) {
                            n -= 65536;
                            i += a(n >>> 10 & 1023 | 55296);
                            n = 56320 | n & 1023
                        }
                        i += a(n)
                    }
                    return i
                }

                function l(e, t) {
                    if (e >= 55296 && e <= 57343) {
                        if (t) {
                            throw Error("Lone surrogate U+" + e.toString(16)
                                .toUpperCase() + " is not a scalar value")
                        }
                        return false
                    }
                    return true
                }

                function f(e, t) {
                    return a(e >> t & 63 | 128)
                }

                function p(e, t) {
                    if ((e & 4294967168) == 0) {
                        return a(e)
                    }
                    var r = "";
                    if ((e & 4294965248) == 0) {
                        r = a(e >> 6 & 31 | 192)
                    } else if ((e & 4294901760) == 0) {
                        if (!l(e, t)) {
                            e = 65533
                        }
                        r = a(e >> 12 & 15 | 224);
                        r += f(e, 6)
                    } else if ((e & 4292870144) == 0) {
                        r = a(e >> 18 & 7 | 240);
                        r += f(e, 12);
                        r += f(e, 6)
                    }
                    r += a(e & 63 | 128);
                    return r
                }

                function h(e, t) {
                    t = t || {};
                    var r = false !== t.strict;
                    var n = u(e);
                    var i = n.length;
                    var o = -1;
                    var s;
                    var a = "";
                    while (++o < i) {
                        s = n[o];
                        a += p(s, r)
                    }
                    return a
                }

                function d() {
                    if (m >= v) {
                        throw Error("Invalid byte index")
                    }
                    var e = y[m] & 255;
                    m++;
                    if ((e & 192) == 128) {
                        return e & 63
                    }
                    throw Error("Invalid continuation byte")
                }

                function g(e) {
                    var t;
                    var r;
                    var n;
                    var i;
                    var o;
                    if (m > v) {
                        throw Error("Invalid byte index")
                    }
                    if (m == v) {
                        return false
                    }
                    t = y[m] & 255;
                    m++;
                    if ((t & 128) == 0) {
                        return t
                    }
                    if ((t & 224) == 192) {
                        r = d();
                        o = (t & 31) << 6 | r;
                        if (o >= 128) {
                            return o
                        } else {
                            throw Error("Invalid continuation byte")
                        }
                    }
                    if ((t & 240) == 224) {
                        r = d();
                        n = d();
                        o = (t & 15) << 12 | r << 6 | n;
                        if (o >= 2048) {
                            return l(o, e) ? o : 65533
                        } else {
                            throw Error("Invalid continuation byte")
                        }
                    }
                    if ((t & 248) == 240) {
                        r = d();
                        n = d();
                        i = d();
                        o = (t & 7) << 18 | r << 12 | n << 6 | i;
                        if (o >= 65536 && o <= 1114111) {
                            return o
                        }
                    }
                    throw Error("Invalid UTF-8 detected")
                }
                var y;
                var v;
                var m;

                function b(e, t) {
                    t = t || {};
                    var r = false !== t.strict;
                    y = u(e);
                    v = y.length;
                    m = 0;
                    var n = [];
                    var i;
                    while ((i = g(r)) !== false) {
                        n.push(i)
                    }
                    return c(n)
                }
                var _ = {
                    version: "2.1.2",
                    encode: h,
                    decode: b
                };
                if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
                    define(function () {
                        return _
                    })
                } else if (i && !i.nodeType) {
                    if (o) {
                        o.exports = _
                    } else {
                        var w = {};
                        var C = w.hasOwnProperty;
                        for (var k in _) {
                            C.call(_, k) && (i[k] = _[k])
                        }
                    }
                } else {
                    n.utf8 = _
                }
            })(this)
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    31: [function (e, t, r) {
        "use strict";
        var n = e("../url_parser");
        t.exports = class {
            constructor() {
                this._sites = {
                    blocked: [],
                    allowed: []
                };
                this.lockdown = false;
                this.AllowAll = false;
                this.BlockAll = false;
                this.BlockUnknown = false
            }
            get sites() {
                return this._sites
            }
            convertUrl(e, t) {
                if (t) {
                    return new RegExp(e.toLowerCase(), "i")
                }
                if (e.match(/^([\w\d-]{1,63}\.)+[\w\d-]{1,63}$/i)) {
                    return e.toLowerCase()
                        .split(".")
                }
                var r = e.replace(/[\]{}?^$().*\\+|[]/g, "\\$&");
                r = r.replace(/\\\*/g, ".*");
                return new RegExp("^" + r + "$", "i")
            }
            Allow(e) {
                var t = true;
                var r = false;
                var n;
                if (typeof e === "string") {
                    n = e
                } else if (typeof e === "object") {
                    n = e.uri;
                    r = Boolean(e.r)
                } else {
                    throw new Error("invalid arguments for Allow")
                }
                var i = this.convertUrl(n, r);
                this._sites.allowed.some(function (e) {
                    if (e.toString() === i.toString()) {
                        t = false;
                        return true
                    }
                });
                if (t) {
                    this._sites.allowed.push(i);
                    return i
                }
            }
            Block(e) {
                var t = true;
                var r = this.convertUrl(e);
                this._sites.blocked.some(function (e) {
                    if (e.toString() === r.toString()) {
                        t = false;
                        return true
                    }
                });
                if (t) {
                    this._sites.blocked.push(r);
                    return r
                }
            }
            Reset() {
                this._sites = {
                    blocked: [],
                    allowed: []
                };
                this.lockdown = false;
                this.AllowAll = false;
                this.BlockAll = false;
                this.BlockUnknown = false
            }
            Check(e) {
                var t, r, i, o, s, a, u, c;
                s = new n(e);
                o = s.hostname.toLowerCase()
                    .split(".");
                this._sites.allowed.some(function (t) {
                    if (Object.prototype.toString.call(t) === "[object Array]") {
                        u = t.length;
                        c = o.length;
                        if (u <= c) {
                            for (a = 0; a < u; a++) {
                                if (t[u - 1 - a] !== o[c - 1 - a]) {
                                    return false
                                }
                            }
                            r = true;
                            i = t.join(".");
                            return true
                        }
                    } else if (e.match(t)) {
                        r = true;
                        i = t;
                        return true
                    }
                });
                if (r) {
                    RelayLog.debug("[Allowed] AllowBlock - url: ", e, " Matcher: ", i);
                    return {
                        status: "a",
                        matcher: i
                    }
                }
                if (this.lockdown) {
                    RelayLog.debug("[Blocked] AllowBlock - lockdown: ", e);
                    return {
                        status: "b",
                        lockdown: true
                    }
                }
                if (this.BlockAll) {
                    RelayLog.debug("[Blocked] AllowBlock - BlockAll: ", e);
                    return {
                        status: "b"
                    }
                }
                if (this.AllowAll) {
                    RelayLog.debug("[Allowed] AllowBlock - AllowAll: ", e);
                    return {
                        status: "a"
                    }
                }
                this._sites.blocked.some(function (r) {
                    if (Object.prototype.toString.call(r) === "[object Array]") {
                        u = r.length;
                        c = o.length;
                        if (u <= c) {
                            for (a = 0; a < u; a++) {
                                if (r[u - 1 - a] !== o[c - 1 - a]) {
                                    return false
                                }
                            }
                            t = true;
                            i = r.join(".");
                            return true
                        }
                    } else if (e.match(r)) {
                        t = true;
                        i = r;
                        return true
                    }
                });
                if (t) {
                    RelayLog.debug("[Blocked] AllowBlock - url: ", e, " Matcher: ", i);
                    return {
                        status: "b",
                        matcher: i
                    }
                }
                return {}
            }
            ConvertToPattern(e) {
                if (!e) {
                    throw new Error("No pattern provided.")
                }
                var t = e;
                if (t.match(/^[^\/]*\/$/)) {
                    t = t.slice(0, -1)
                } else {
                    if (!t.match(/^(\*)|([^+]+:\/\/)/)) {
                        t = "*://" + t
                    }
                    if (!t.match(/[\w\d\*]\/.+$|\/$/)) {
                        t += "/*"
                    } else {
                        t += "*"
                    }
                }
                return t
            }
        }
    }, {
        "../url_parser": 41
    }],
    32: [function (e, t, r) {
        "use strict";
        var n = e("../url_parser/");
        t.exports = class {
            constructor() {
                this._enabledCategoryExts = {}
            }
            CategoryEnabled(e) {
                if (!e && e !== 0) {
                    throw new Error("catId is required.")
                }
                if (this._enabledCategoryExts[e] && this._enabledCategoryExts[e].length > 0) {
                    return true
                }
                return false
            }
            AddExtensions(e, t) {
                var r = this;
                if (!e) {
                    throw new Error("catId is required.")
                }
                if (!t) {
                    throw new Error("exts is required.")
                }
                if (!r._enabledCategoryExts[e]) {
                    r._enabledCategoryExts[e] = []
                }
                if (typeof t === "string") {
                    let n = r.ExtToRegEx(t);
                    let i = false;
                    r._enabledCategoryExts[e].some(function (e) {
                        if (e.toString() === n.toString()) {
                            i = true;
                            return true
                        }
                    });
                    if (!i) {
                        r._enabledCategoryExts[e].push(n)
                    }
                } else if (Object.prototype.toString.call(t) === "[object Array]") {
                    t.forEach(function (t) {
                        let n = r.ExtToRegEx(t);
                        let i = false;
                        r._enabledCategoryExts[e].some(function (e) {
                            if (e.toString() === n.toString()) {
                                i = true;
                                return true
                            }
                        });
                        if (!i) {
                            r._enabledCategoryExts[e].push(n)
                        }
                    })
                }
            }
            ExtToRegEx(e) {
                if (!e) {
                    throw new Error("ext is required.")
                }
                if (typeof e !== "string") {
                    throw new Error("ext must be a string.")
                }
                return new RegExp("\\." + e + "$", "i")
            }
            Check(e, t) {
                var r = this;
                if (!e) {
                    throw new Error("URL Required.")
                }
                if (typeof t === "undefined") {
                    throw new Error("catId Required.")
                }
                var i = {};
                if (!r.CategoryEnabled(t)) {
                    return i
                }
                var o = false;
                var s = new n(e);
                if (this._enabledCategoryExts[t]) {
                    this._enabledCategoryExts[t].some(function (e) {
                        if (s.pathname.match(e)) {
                            o = true;
                            return true
                        }
                    })
                }
                if (o) {
                    i.status = "b"
                }
                return i
            }
        }
    }, {
        "../url_parser/": 41
    }],
    33: [function (e, t, r) {
        "use strict";
        e("relay-log");
        t.exports.AllowBlock = e("./allow_block");
        t.exports.Policy = e("./policy");
        t.exports.UrlParser = e("./url_parser");
        t.exports.Youtube = e("./youtube");
        t.exports.FileExt = e("./file_ext");
        t.exports.Util = e("./util");
        t.exports.SearchEngines = e("./search_engines");
        t.exports.RelayApi = e("./relay_api");
        t.exports.RocketApi = e("./rocket_api");
        t.exports.Reporting = e("./reporting");
        t.exports.WebAuth = e("./web_auth");
        t.exports.Lockout = e("./lockout")
    }, {
        "./allow_block": 31,
        "./file_ext": 32,
        "./lockout": 35,
        "./policy": 36,
        "./relay_api": 37,
        "./reporting": 38,
        "./rocket_api": 39,
        "./search_engines": 40,
        "./url_parser": 41,
        "./util": 42,
        "./web_auth": 43,
        "./youtube": 44,
        "relay-log": 54
    }],
    34: [function (e, t, r) {
        "use strict";
        var n = e("phpjs");
        var i = n.ip2long;
        var o = n.long2ip;
        var s = Math;
        var a = e("ip-subnet-calculator");
        var u = function e() {
            if (!(this instanceof e)) {
                return new e
            }
        };
        var c = function (e, t, r) {
            if (!e) {
                e = {}
            }
            if (!e[t]) {
                e[t] = []
            }
            e[t].push(r)
        };
        u.prototype.range = function (e) {
            if (!(e.indexOf("/") > -1)) {
                return null
            }
            var t = {};
            var r = e.split("/");
            if (r[1] > 32) {
                return null
            }
            t.start = o(i(r[0]) & -1 << 32 - +r[1]);
            t.end = o(i(t.start) + s.pow(2, 32 - +r[1]) - 1);
            return t
        };
        u.prototype.list = function (e) {
            if (typeof e === "undefined") {
                return null
            }
            var t = this.range(e);
            if (!t) {
                return null
            }
            var r = i;
            var n = o;
            var s = [];
            var a = 0;
            var u = r(t.start);
            var c = r(t.end);
            s[a++] = t.start;
            while (u++ < c) {
                s[a++] = n(u)
            }
            return s
        };
        var l = function (e) {
            var t = e.length;
            var r = i;
            var n = null;
            for (var o = 0; o < t; o++) {
                n = e[o];
                if (n) {
                    e[o] = r(n)
                }
            }
            e = e.sort();
            return e
        };
        u.prototype.filter = function (e) {
            if (!(e instanceof Array) || e.length <= 0) {
                return null
            }
            e = l(e);
            var t = 0;
            var r = true;
            var n = e.length;
            var i = null;
            var s = null;
            var a = null;
            var u = {};
            if (e.length === 1) {
                return c(u, 0, o(e[0]))
            }
            for (var f = 0; f < n; f++) {
                s = e[f];
                a = e[f + 1];
                i = s;
                if (!r) {
                    t += 1
                }
                if (a) {
                    if (a - s === 1) {
                        c(u, t, o(s));
                        r = true
                    } else {
                        c(u, t, o(s));
                        r = false
                    }
                } else {
                    if (i) {
                        if (s - i === 1) {
                            c(u, t, o(s));
                            r = true
                        } else {
                            c(u, ++t, o(s))
                        }
                    }
                }
            }
            return u
        };
        u.prototype.getBlocks = function (e) {
            var t = this.filter(e);
            var r = [];
            for (var n in t) {
                var i = t[n];
                if (i.length === 1) {
                    r.push(i[0]);
                    continue
                }
                var o = i.shift();
                var s = i.pop();
                var u = a.calculate(o, s);
                for (var c in u) {
                    r.push(u[c].ipLowStr + "/" + u[c].prefixSize)
                }
            }
            return r
        };
        t.exports = u
    }, {
        "ip-subnet-calculator": 49,
        phpjs: 53
    }],
    35: [function (e, t, r) {
        "use strict";
        t.exports = class {
            constructor() {
                this.lockoutHits = [];
                this.Categories = [];
                this.action = "block";
                this.threshold = 3;
                this.lockoutWindow = 30;
                this.lockoutDuration = 0;
                this.lockedOutUntil = 0;
                this.notificationEmails = []
            }
            Log(e) {
                if (!this._shouldIncreaseLockout(e)) {
                    return
                }
                if (this.lockedOutUntil < new Date) {
                    this.lockedOutUntil = 0
                }
                this._trimOldHits();
                this.lockoutHits.push({
                    catId: e,
                    time: new Date
                });
                const t = this.lockoutHits.reduce(function (t, r) {
                    return r.catId === e ? t + 1 : t
                }, 0);
                if (t > this.threshold) {
                    this.lockedOutUntil = new Date((new Date)
                        .getTime() + this.lockoutDuration * 1e3 * 60)
                }
            }
            RemoveLockout() {
                this.lockedOutUntil = 0
            }
            ExpireLockout() {
                this.lockedOutUntil = 0;
                this.lockoutHits = []
            }
            _trimOldHits() {
                const e = new Date((new Date)
                    .getTime() - this.lockoutWindow * 1e3);
                this.lockoutHits = this.lockoutHits.filter(function (t) {
                    return t.time > e
                })
            }
            _shouldIncreaseLockout(e) {
                if (this.Categories.indexOf(e) > -1) {
                    return true
                }
                return false
            }
        }
    }, {}],
    36: [function (e, t, r) {
        "use strict";
        var n = e("../allow_block");
        var i = e("../url_parser");
        var o = e("../youtube");
        var s = e("../search_engines");
        var a = e("../lockout");
        var u = e("../file_ext");
        var c = e("../web_auth");
        var l = e("../util");
        var f = e("../lib/cidr");
        var p = class {
            constructor() {
                this.GoogAppsAllowedDomains = undefined;
                this.AllowBlock = new n;
                this.WebZone = new n;
                this.FileExt = new u;
                this.YouTube = new o;
                this.YouTube.Remote = d;
                this.SearchEngines = new s;
                this.Lockout = new a;
                this.Review = {};
                this.AuthSources = undefined;
                this.CloudAuthSources = undefined;
                this.WebAuth = c;
                this.ContentFilterSettings = {
                    Categories: {
                        sealed: [94, 126, 137],
                        locked: [],
                        blocked: [2, 4, 8, 11, 12, 21, 28, 31, 32, 38, 39, 42, 60, 61, 67, 70, 71, 72, 94, 100, 101, 102, 113, 116, 117,
                            118, 126, 133, 134, 135, 137
                        ]
                    },
                    Override: {
                        Timeout: 9e5,
                        Categories: []
                    },
                    BypassOnFail: false,
                    ChromebookOnly: false,
                    Mode: "filtered",
                    SocialMedia: {
                        Facebook: {
                            ReadOnly: false,
                            catId: 200
                        },
                        Twitter: {
                            ReadOnly: false,
                            catId: 201
                        },
                        Instagram: {
                            ReadOnly: false,
                            catId: 202
                        },
                        Pinterest: {
                            ReadOnly: false,
                            catId: 203
                        }
                    }
                };
                this.Reporting = {
                    IgnoreFlagSites: [],
                    FlaggedTerms: [],
                    FlagMode: "page",
                    Enabled: true,
                    FlagSettings: {}
                };
                this.BlockPageURI = undefined;
                this.Username = undefined
            }
        };
        var h = {
            BasePolicy: new p,
            AsrPolicy: new p,
            AsrConditions: {},
            AsrVars: {}
        };
        var d;
        var g = "127.0.0.1";
        var y = "";
        var v;
        var m = false,
            b = false,
            _;
        t.exports.CanOverride = function () {
            return m
        };
        t.exports.ConfigureRemote = function (e) {
            d = e;
            h.BasePolicy.YouTube.Remote = d;
            h.AsrPolicy.YouTube.Remote = d
        };
        const w = function (e) {
            if (typeof e === "undefined") {
                throw new Error("policySettings required")
            }
            if (typeof e !== "object") {
                throw new Error("policySettings must be an object")
            }
            const t = {};
            Object.keys(e)
                .forEach(r => {
                    let n;
                    if (typeof t[r] === "undefined") {
                        t[r] = e[r];
                        if (t[r].regex) {
                            n = t[r].matcher;
                            delete t[r].regex
                        } else {
                            n = t[r].matcher.replace(/[\]{}?^$().*\\+|[]/g, "\\$&")
                                .replace(/\\\*/g, ".*");
                            if (!n.match("/")) {
                                let e = true;
                                if (n.match(/^\.\*/)) {
                                    n = "^[^:]+://" + n;
                                    e = false
                                }
                                if (n.match(/\.\*$/)) {
                                    if (!n.match("^[^:]+://")) {
                                        n = "^[^:]+://" + n
                                    }
                                    e = false
                                } else {
                                    n += "\\/"
                                }
                                if (e) {
                                    n = "^[^:]+://([^\\.]+\\.)*" + n
                                }
                            }
                        }
                        t[r].matcher = new RegExp(n, "i")
                    } else {
                        RelayLog.error("Duplicate Flag Setting detected for: ", r)
                    }
                });
            return t
        };
        var C = {};
        C["2017-5-22"] = function (e) {
            var t, r, n, o, s, a;
            if (typeof e.can_override !== "undefined") {
                m = Boolean(e.can_override)
            } else {
                m = false
            }
            var u = function (e) {
                var t = [],
                    r = [];
                var n, i;
                if (!e.content_filter) {
                    RelayLog.error("[FilteringJS.Policy.ConfigureFromRelay v2017-5-22] policy does not contain content_filter settings");
                    throw new Error("policy does not contain content_filter settings")
                }
                n = e.content_filter;
                var o = new p;
                if (Boolean(n.google_filter_domains) && typeof n.google_filter_domains_list !== "undefined") {
                    o.GoogAppsAllowedDomains = n.google_filter_domains_list
                }
                o.ContentFilterSettings.Categories.blocked = n.categories.blocked || [];
                o.ContentFilterSettings.Override.Categories = n.categories.overrides || [];
                if (Array.isArray(n.categories.readOnly)) {
                    Object.keys(o.ContentFilterSettings.SocialMedia)
                        .forEach(e => {
                            const t = o.ContentFilterSettings.SocialMedia[e];
                            if (n.categories.readOnly.indexOf(t.catId) !== -1) {
                                o.ContentFilterSettings.SocialMedia[e].ReadOnly = true
                            }
                        })
                }
                o.SearchEngines.GoogleForceSafe = n.google_force_safesearch === true;
                o.SearchEngines.GoogleFilterImages = n.google_filter_thumbnails === true;
                o.SearchEngines.GoogleDisableAutocomplete = n.google_disable_autocomplete === true;
                o.ContentFilterSettings.BypassOnFail = n.bypass_on_failure === true;
                o.ContentFilterSettings.ChromebookOnly = n.chromebook_only === true;
                if (n.lockout_enabled) {
                    var s = n.lockout_rule || {};
                    var a = n.categories.lockouts ? n.categories.lockouts : [];
                    var u = o.ContentFilterSettings.Categories.blocked.concat([94, 126, 137]);
                    if (h.BasePolicy.Lockout.lockedOutUntil > new Date) {
                        o.Lockout.lockedOutUntil = h.BasePolicy.Lockout.lockedOutUntil
                    } else if (h.AsrPolicy.Lockout.lockedOutUntil > new Date) {
                        o.Lockout.lockedOutUntil = h.AsrPolicy.Lockout.lockedOutUntil
                    }
                    o.Lockout.Categories = a.filter(function (e) {
                        return u.includes(e)
                    });
                    o.Lockout.threshold = typeof s.threshold !== "undefined" ? parseInt(s.threshold, 10) : 3;
                    o.Lockout.lockoutDuration = typeof s.duration !== "undefined" ? parseInt(s.duration, 10) : 15;
                    o.Lockout.lockoutWindow = typeof s.window !== "undefined" ? parseInt(s.window, 10) : 5;
                    o.Lockout.action = s.action || "block"
                } else {
                    o.Lockout.Categories = [];
                    o.Lockout.lockoutDuration = 0;
                    o.Lockout.lockoutWindow = 30;
                    o.Lockout.action = "block"
                }
                if (n.override_timeout) {
                    o.ContentFilterSettings.Override.Timeout = parseInt(n.override_timeout, 10) * 6e4
                }
                if (typeof n.mode !== "undefined") {
                    o.ContentFilterSettings.Mode = n.mode
                }
                if (typeof n.reporting !== "undefined") {
                    o.Reporting.Enabled = Boolean(n.reporting)
                }
                if (typeof n.lists !== "undefined") {
                    if (typeof n.lists.allowed !== "undefined") {
                        n.lists.allowed.forEach(function (e) {
                            o.AllowBlock.Allow(e.host);
                            if (e.flaggable === false) {
                                o.Reporting.IgnoreFlagSites.push(e.host)
                            }
                        })
                    }
                    if (typeof n.lists.blocked !== "undefined") {
                        n.lists.blocked.forEach(function (e) {
                            o.AllowBlock.Block(e.host);
                            if (e.flaggable === false) {
                                o.Reporting.IgnoreFlagSites.push(e.host)
                            }
                        })
                    }
                    if (typeof n.lists.keywords != "undefined") {
                        n.lists.keywords.forEach(function (e) {
                            if (e.regexable) {
                                o.SearchEngines.BlockedKeywords.push(new RegExp(e.w, "i"))
                            } else {
                                r.push(e.w)
                            }
                        });
                        o.SearchEngines.AddKeywords(r)
                    }
                    if (typeof n.lists.lockout_notifications !== "undefined") {
                        o.Lockout.notificationEmails = n.lists.lockout_notifications
                    } else {
                        o.Lockout.notificationEmails = []
                    }
                }
                if (e.videos) {
                    i = e.videos;
                    if (i.youtube_hide_comments) {
                        o.YouTube.hideComments = i.youtube_hide_comments === true
                    }
                    if (i.youtube_hide_sidebar) {
                        o.YouTube.hideSidebar = i.youtube_hide_sidebar === true
                    }
                    if (i.youtube_restricted_mode) {
                        o.YouTube.restrictedMode = i.youtube_restricted_mode
                    }
                    if (i.youtube_hide_thumbnails) {
                        o.YouTube.blockThumbnails = i.youtube_hide_thumbnails
                    }
                    if (i.youtube_prevent_channel_autoplay) {
                        o.YouTube.preventChannelAutoplay = i.youtube_prevent_channel_autoplay
                    }
                    if (i.mode.video_mode) {
                        o.YouTube.mode = i.mode.video_mode
                    }
                    if (typeof i.smart_play !== "undefined") {
                        if (Array.isArray(i.smart_play.allowed_category_ids)) {
                            o.YouTube.smartplayCategories = i.smart_play.allowed_category_ids
                        }
                        if (Array.isArray(i.smart_play.blocked_category_ids)) {
                            o.YouTube.smartplayBlockedCategories = i.smart_play.blocked_category_ids
                        }
                        if (Boolean(i.smart_play.block_other_videos)) {
                            o.YouTube.smartplayOthersBlocked = Boolean(i.smart_play.block_other_videos)
                        }
                    }
                    if (i.mode.blocked) {
                        if (o.ContentFilterSettings.Categories.blocked.indexOf(900) === -1) {
                            o.ContentFilterSettings.Categories.blocked.push(900)
                        }
                    }
                    if (typeof i.overridable !== "undefined" && Boolean(i.overridable)) {
                        if (o.ContentFilterSettings.Override.Categories.indexOf(900) === -1) {
                            o.ContentFilterSettings.Override.Categories.push(900)
                        }
                    }
                    if (i.youtube_lists) {
                        if (Array.isArray(i.youtube_lists.allowed_video_ids)) {
                            o.YouTube.allowedVideos = i.youtube_lists.allowed_video_ids
                        }
                        if (Array.isArray(i.youtube_lists.allowed_channel_ids)) {
                            o.YouTube.allowedChannels = i.youtube_lists.allowed_channel_ids
                        }
                        if (Array.isArray(i.youtube_lists.blocked_video_ids)) {
                            o.YouTube.blockedVideos = i.youtube_lists.blocked_video_ids
                        }
                        if (Array.isArray(i.youtube_lists.blocked_channel_ids)) {
                            o.YouTube.blockedChannels = i.youtube_lists.blocked_channel_ids
                        }
                    }
                    Object.keys(i)
                        .forEach(function (e) {
                            var r;
                            var n = e.match(/^youtube_cat_(\d+)$/);
                            if (n) {
                                r = parseInt(n[1], 10);
                                if (Boolean(i[e].blocked) && t.indexOf(r) === -1) {
                                    t.push(r)
                                }
                            }
                        });
                    if (t.length > 0) {
                        o.YouTube.blockedCategories = t
                    }
                } else {
                    if (o.ContentFilterSettings.Categories.blocked.indexOf(900) === -1) {
                        o.ContentFilterSettings.Categories.blocked.push(900)
                    }
                    RelayLog.scopedDebug("FilteringJS.Policy.ConfigureFromRelay", [
                        "[FilteringJS.Policy.ConfigureFromRelay v2017-5-22] No video policy, using defaults."
                    ])
                }
                return o
            };
            t = u(e);
            if (e.flagged_terms) {
                t.Reporting.FlaggedTerms = e.flagged_terms
            }
            if (typeof e.content_filter !== "undefined" && typeof e.content_filter.flag_mode !== "undefined") {
                t.Reporting.FlagMode = e.content_filter.flag_mode
            }
            if (typeof e.flag_settings !== "undefined") {
                t.Reporting.FlagSettings = w(e.flag_settings)
            }
            try {
                if (e.asr_policy) {
                    if (!e.asr) {
                        throw new Error("asr_policy defined with no asr configuration")
                    }
                    h.AsrConditions = e.asr;
                    h.AsrVars = {};
                    if (h.AsrConditions.mode.state === "ip") {
                        o = [];
                        n = new f;
                        RelayLog.scopedDebug("FilteringJS.Policy.relayPolicyFormats['2017-5-22']", [
                            "[FilteringJS.Policy.relayPolicyFormats['2017-5-22']] Reading ARS IP settings."
                        ]);
                        h.AsrConditions.ipRanges.forEach(function (e) {
                            if (!e.match(/\/\d{1,2}$/)) {
                                e = e + "/32"
                            }
                            RelayLog.scopedDebug("FilteringJS.Policy.relayPolicyFormats['2017-5-22']", [
                                "[FilteringJS.Policy.relayPolicyFormats['2017-5-22']] Converting IP Range: ", e
                            ]);
                            s = n.list(e);
                            RelayLog.scopedDebug("FilteringJS.Policy.relayPolicyFormats['2017-5-22']", [
                                "[FilteringJS.Policy.relayPolicyFormats['2017-5-22']] Converted to: ", s
                            ]);
                            if (s && s.length > 0) {
                                s.forEach(function (e) {
                                    if (o.indexOf(e) === -1) {
                                        o.push(e)
                                    }
                                })
                            }
                        });
                        h.AsrVars.PublicIps = o
                    }
                    r = u(e.asr_policy)
                } else {
                    h.AsrConditions = {};
                    r = new p
                }
            } catch (e) {
                RelayLog.error("[FilteringJS.Policy.ConfigureFromRelay v2017-5-22] error parsing asr_policy: \n", e.message, e.stack)
            }
            if (typeof v === "string") {
                var c = new i(v);
                if (t.Reporting.IgnoreFlagSites.indexOf(c.hostname.toLowerCase()) === -1) {
                    t.Reporting.IgnoreFlagSites.push(c.hostname.toLowerCase())
                }
            }
            h.BasePolicy = t;
            h.AsrPolicy = r
        };
        var k = {};
        k.legacy = function (e) {
            var t = new p;
            t.Username = e.username;
            t.ContentFilterSettings.Mode = e.internal ? "not_filtered" : "filtered";
            t.ContentFilterSettings.ChromebookOnly = e.chromebook_only;
            if (e.policy.search_keywords) {
                t.SearchEngines.AddKeywords(e.policy.search_keywords)
            }
            const r = e.policy.rule_set;
            const n = {};
            t.ruleSetId = r.id;
            t.AllowBlock.Reset();
            Object.keys(e.policy.url_patterns || {})
                .forEach(function (t) {
                    n[t] = e.policy.url_patterns[t]
                });
            t.AllowBlock.AllowAll = r.rule_set_type_id === 2;
            t.AllowBlock.BlockAll = r.rule_set_type_id === 3;
            (r.allowed_url_patterns || [])
            .forEach(function (e) {
                const r = n[e] || [];
                r.forEach(function (e) {
                    t.AllowBlock.Allow(e)
                })
            });
            (r.blocked_url_patterns || [])
            .forEach(function (e) {
                const r = n[e] || [];
                r.forEach(function (e) {
                    t.AllowBlock.Block(e)
                })
            });
            t.WebZone.Reset();
            delete t.WebZone.expires;
            if (e.web_zone && e.web_zone.active) {
                (e.web_zone.allowed || [])
                .forEach(function (e) {
                    t.WebZone.Allow(e)
                });
                (e.web_zone.blocked || [])
                .forEach(function (e) {
                    t.WebZone.Block(e)
                });
                if (e.web_zone.expires) {
                    t.WebZone.expires = new Date(e.web_zone.expires)
                }
                if (e.web_zone.lockdown) {
                    t.WebZone.lockdown = e.web_zone.lockdown
                } else {
                    delete t.WebZone.lockdown
                }
            }
            let i;
            if (r.categories.fileext && e.policy.ext_lists) {
                for (let n in r.categories.fileext) {
                    i = e.policy.ext_lists[r.categories.fileext[n]];
                    if (i) {
                        t.FileExt.AddExtensions(parseInt(n, 10), i)
                    }
                }
            }
            t.ContentFilterSettings.locked = r.categories.locked ? r.categories.locked : [];
            t.AuthSources = e.auth_sources ? e.auth_sources : undefined;
            t.CloudAuthSources = e.cloud_auth_sources ? e.cloud_auth_sources : undefined;
            if (r.tier) {
                t.tierId = r.tier
            } else if (envVariables.tierId !== undefined) {
                t.tierId = envVariables.tierId
            }
            t.WebAuth.enabled = r.auth ? r.auth : false;
            t.WebAuth.forcePortalLogin = r.portal || e.require_auth && !e.exclude_ident_users;
            t.ContentFilterSettings.Categories.blocked = r.categories.blocked ? r.categories.blocked : [];
            t.ContentFilterSettings.Categories.locked = r.categories.locked ? r.categories.locked : [];
            if (h.BasePolicy.Lockout.lockedOutUntil > new Date) {
                t.Lockout.lockedOutUntil = h.BasePolicy.Lockout.lockedOutUntil
            }
            var o = r.categories.lockouts || [];
            var s = (r.categories.blocked || [])
                .concat([94, 126, 137]);
            t.Lockout.Categories = o.filter(function (e) {
                return s.includes(e)
            });
            t.Lockout.threshold = r.lockout_blocks ? r.lockout_blocks : undefined;
            t.Lockout.lockoutDuration = r.lockout_duration ? r.lockout_duration : 0;
            t.Lockout.lockoutWindow = r.lockout_window ? r.lockout_window : undefined;
            t.Lockout.action = "block";
            t.ContentFilterSettings.Override.Categories = r.categories.overrides ? r.categories.overrides : [];
            t.catFileExtMap = {};
            t.ContentFilterSettings.Override.Timeout = r.override_duration ? r.override_duration * 6e4 : 9e5;
            if (r.auth_override) {
                t.ContentFilterSettings.Override.Auth = r.auth_override
            } else {
                delete t.ContentFilterSettings.Override.Auth
            }
            t.Review.enabled = r.allow_review ? r.allow_review : undefined;
            t.Review.detailsRequired = r.email_review ? r.email_review : undefined;
            t.SearchEngines.GoogleForceSafe = r.force_safe_search === true;
            t.SearchEngines.GoogleFilterImages = r.filter_thumbs === true;
            t.SearchEngines.GoogleDisableAutocomplete = r.filter_thumbs === true;
            t.SearchEngines.ReportThumbnails = true;
            t.ContentFilterSettings.BypassOnFail = e.policy.bypass_on_fail === true;
            if (e.policy.filter_youtube) {
                if (r.categories.allowed_videos) {
                    t.YouTube.smartplayCategories = r.categories.allowed_videos
                }
                if (r.categories.blocked_videos) {
                    t.YouTube.smartplayBlockedCategories = r.categories.blocked_videos
                } else {
                    t.YouTube.smartplayBlockedCategories = []
                }
            } else {
                t.YouTube.smartplayCategories = [];
                t.YouTube.smartplayBlockedCategories = []
            }
            h.BasePolicy = t
        };
        var A = function (e) {
            if (!e) {
                RelayLog.error("[FilteringJS.Policy.ConfigureFromRelay] policy required");
                throw new Error("policy required")
            }
            if (!e.v) {
                e.v = "legacy"
            }
            if (!C[e.v]) {
                RelayLog.error("[FilteringJS.Policy.ConfigureFromRelay] Relay policy version ", e.v, " is unsupported.");
                throw new Error("policy version " + e.v + " is unsupported.")
            }
            return C[e.v](e)
        };
        var E = function (e) {
            if (!e) {
                RelayLog.error("[FilteringJS.Policy.ConfigureFromRocket] policy required");
                throw new Error("policy required")
            }
            if (!e.v) {
                e.v = "legacy"
            }
            if (!k[e.v]) {
                RelayLog.error("[FilteringJS.Policy.ConfigureFromRocket] Rocket policy version ", e.v, " is unsupported.");
                throw new Error("policy version " + e.v + " is unsupported.")
            }
            return k[e.v](e)
        };
        var x = function () {
            RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", ["[FilteringJS.Policy.ActivePolicy]"]);
            if (typeof h.AsrConditions.mode !== "undefined" && h.AsrConditions.mode.state === "scheduled") {
                var e, t, r, n;
                var i = new Date;
                if (i.getDay() > 0 && i.getDay() < 6) {
                    e = h.AsrConditions.mode["m-f"].start;
                    t = h.AsrConditions.mode["m-f"].end
                } else {
                    e = h.AsrConditions.mode["sa-su"].start;
                    t = h.AsrConditions.mode["sa-su"].end
                }
                e = parseFloat(e.replace(":", "."));
                t = parseFloat(t.replace(":", "."));
                n = i.getHours() + i.getMinutes() / 100;
                if (t < e) {
                    r = true
                }
                RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", ["[FilteringJS.Policy.ActivePolicy] - checking schedule. start: ", e,
                    " end: ", t, " now: ", n
                ]);
                if (r) {
                    if (n >= e || n < t) {
                        RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", [
                            "[FilteringJS.Policy.ActivePolicy] - ASR Policy matched via schedule"
                        ]);
                        return h.AsrPolicy
                    }
                } else {
                    if (n >= e && n < t) {
                        RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", [
                            "[FilteringJS.Policy.ActivePolicy] - ASR Policy matched via schedule"
                        ]);
                        return h.AsrPolicy
                    }
                }
            } else if (typeof h.AsrConditions.mode !== "undefined" && h.AsrConditions.mode.state === "ip") {
                RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", ["[FilteringJS.Policy.ActivePolicy] - checking ip: ", g,
                    " against configured network list of ", h.AsrVars.PublicIps
                ]);
                if (typeof h.AsrVars.PublicIps !== "undefined" && h.AsrVars.PublicIps.indexOf(g) === -1) {
                    RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", ["[FilteringJS.Policy.ActivePolicy] - ASR Policy matched via ip"]);
                    return h.AsrPolicy
                }
            }
            RelayLog.scopedDebug("FilteringJS.Policy.ActivePolicy", ["[FilteringJS.Policy.ActivePolicy] - No ASR match - base policy"]);
            return h.BasePolicy
        };
        var S = function (e) {
            l.addGloballyAllowedHost(e)
        };
        const j = function (e) {
            if (!e) {
                throw new Error("details required")
            }
            if (typeof e !== "object") {
                throw new Error("details must be an object")
            }
            if (!e.url) {
                throw new Error("details must include a url")
            }
            if (typeof e.url !== "string") {
                throw new Error("url must be a string")
            }
            if (!v) {
                throw new Error("BlockPageURI has not been configured")
            }
            const t = x();
            let r = new i(e.url);
            let n = {};
            if (r.hostname.match(/^(([^\.])+\.)?facebook\.com$/i) && t.ContentFilterSettings.SocialMedia.Facebook.ReadOnly && !(r.pathname.match(
                    /^\/api\/graphqlbatch/i) || r.pathname.match(/^\/bluebar\/modern_settings_menu/i) || r.pathname.match(
                    /^\/log((out)|(in))/i)) && e.method !== "GET") {
                RelayLog.debug("Canceling FB request: ", e);
                return {
                    cancel: true,
                    r: "readonly",
                    rg: l.generateGUID(),
                    catId: t.ContentFilterSettings.SocialMedia.Facebook.catId
                }
            }
            if (r.hostname.match(/^(([^\.])+\.)?twitter\.com$/i) && t.ContentFilterSettings.SocialMedia.Twitter.ReadOnly && !(r.pathname.match(
                    /^\/sessions/i) || r.pathname.match(/^\/account\/begin_password_reset/i) || r.pathname.match(/^\/logout/i)) && e.method !==
                "GET") {
                RelayLog.debug("Canceling Twitter request: ", e);
                return {
                    cancel: true,
                    r: "readonly",
                    rg: l.generateGUID(),
                    catId: t.ContentFilterSettings.SocialMedia.Twitter.catId
                }
            }
            if (r.hostname.match(/^(([^\.])+\.)?pinterest\.com$/i) && t.ContentFilterSettings.SocialMedia.Pinterest.ReadOnly && !(r.pathname.match(
                    /^\/resource\/UserSessionResource/i) || r.pathname.match(/^\/resource\/ContextLogResource/i) || r.pathname.match(
                    /^\/_\/_\/report/i) || r.pathname.match(/^\/resource\/ActivateExperimentResource/i) || r.pathname.match(
                    /^\/resource\/UserExperienceTriggerResource/i) || r.pathname.match(/^\/rresource\/UserRegisterTrackActionResource/i)) && e.method !==
                "GET") {
                RelayLog.debug("Canceling pinterest request: ", e);
                return {
                    cancel: true,
                    r: "readonly",
                    rg: l.generateGUID(),
                    catId: t.ContentFilterSettings.SocialMedia.Pinterest.catId
                }
            }
            if (r.hostname.match(/^(([^\.])+\.)?instagram\.com$/i) && t.ContentFilterSettings.SocialMedia.Instagram.ReadOnly && !(r.pathname.match(
                    /^\/accounts\/fb_code_exchange/i) || r.pathname.match(/^\/accounts\/log((out)|(in))/i)) && e.method !== "GET") {
                RelayLog.debug("Canceling Instagram request: ", e);
                return {
                    cancel: true,
                    r: "readonly",
                    rg: l.generateGUID(),
                    catId: t.ContentFilterSettings.SocialMedia.Instagram.catId
                }
            }
            return n
        };
        var I = function (e) {
            var t, r, n, o, s, a, u = {};
            if (!e) {
                throw new Error("details required")
            }
            if (typeof e !== "object") {
                throw new Error("details must be an object")
            }
            if (!e.url) {
                throw new Error("details must include a url")
            }
            if (typeof e.url !== "string") {
                throw new Error("url must be a string")
            }
            if (!v) {
                throw new Error("BlockPageURI has not been configured")
            }
            RelayLog.scopedDebug("FilteringJS.Policy.Score", ["[FilteringJS.Policy.Score] Started with details: ", e]);
            RelayLog.scopedDebug("FilteringJS.Policy.Score", ["[FilteringJS.Policy.Score] Started with type: ", e.type]);
            n = l.generateGUID();
            u.rg = n;
            s = v + "?id=" + n;
            var c = new i(e.url);
            if (l.ignoreUrl(c)) {
                return u
            }
            if (!d) {
                throw new Error("Remote is not defined, please configure the remote data helper")
            }
            r = x();
            if (r.ContentFilterSettings.Mode === "off") {
                u.blocked = true;
                u.reason = "off";
                u.redirect = s;
                return u
            } else if (r.ContentFilterSettings.Mode === "not_filtered") {
                u.blocked = false;
                u.reason = "nf";
                return u
            }
            if (r.WebAuth.forcePortalLogin && r.WebAuth.isExpired()) {
                u.blocked = true;
                u.reason = "login";
                return u
            }
            t = d.categoryId(e.url);
            if (typeof t === "string") {
                t = parseInt(t, 10)
            }
            if (typeof t === "undefined") {
                RelayLog.scopedDebug("FilteringJS.Policy.Score", ["[FilteringJS.Policy.Score] Holding url (category lookup) - ", e.url]);
                d.lookup(e.url);
                return {
                    redirect: e.url,
                    onHold: true
                }
            }
            u.catId = t;
            if (r.Lockout.lockedOutUntil > new Date) {
                u.blocked = true;
                u.reason = "lockout";
                u.redirect = s;
                return u
            }
            if (r.ContentFilterSettings.Categories.sealed.indexOf(t) !== -1) {
                u.reason = "sealed";
                u.redirect = s;
                u.blocked = true;
                return u
            }
            if (r.ContentFilterSettings.Categories.locked.indexOf(t) !== -1) {
                u.reason = "locked";
                u.redirect = s;
                u.blocked = true;
                return u
            }
            o = r.WebZone.Check(e.url);
            if (o) {
                if (o.status === "a") {
                    u.blocked = false;
                    u.reason = "wz";
                    return u
                } else if (o.status === "b") {
                    u.reason = "wz";
                    u.redirect = s;
                    u.blocked = true;
                    return u
                }
            }
            o = r.AllowBlock.Check(e.url);
            if (o) {
                if (o.status === "a") {
                    u.blocked = false;
                    u.reason = r.AllowBlock.AllowAll ? "allow_all" : "url";
                    return u
                } else if (o.status === "b") {
                    var f = "url";
                    if (r.AllowBlock.BlockAll) {
                        f = "block_all"
                    } else if (r.AllowBlock.BlockUnknown) {
                        f = "unknown"
                    }
                    u.reason = f;
                    u.redirect = s;
                    u.blocked = true;
                    return u
                }
            }
            o = r.SearchEngines.Check(e.url);
            a = o.term;
            if (typeof a !== "undefined") {
                u.searchTerm = a
            }
            if (o.redirect) {
                return {
                    redirect: o.redirect
                }
            } else if (o.status === "b") {
                u.blocked = true;
                u.redirect = s;
                u.reason = "search";
                return u
            }
            if (o.thumbUrl && o.thumbUrl !== "") {
                t = d.categoryId(o.thumbUrl);
                if (t === undefined || t === null) {
                    RelayLog.scopedDebug("FilteringJS.Policy.Score", ["Holding url (thumbnail category lookup) - ", o.thumbUrl]);
                    d.lookup(o.thumbUrl);
                    return {
                        redirect: e.url,
                        onHold: true
                    }
                }
                u.catId = t;
                u.reason = r.SearchEngines.ReportThumbnails ? "thumb" : ""
            }
            o = r.YouTube.Check(e.url);
            if (typeof o.videoId !== "undefined") {
                u.ytVideoId = o.videoId
            } else if (o.channelId) {
                u.ytChannelId = o.channelId
            } else if (o.userId) {
                u.ytUserId = o.userId
            }
            if (typeof o.lsCat !== "undefined") {
                u.videoCat = o.lsCat
            }
            if (o.stall) {
                return {
                    redirect: e.url,
                    onHold: true
                }
            } else if (o.status === "a") {
                u.blocked = false;
                u.reason = "yt";
                u.lsCat = o.lsCat;
                return u
            } else if (o.status === "b") {
                u.blocked = true;
                u.redirect = s;
                u.reason = "yt";
                u.lsCat = o.lsCat;
                return u
            }
            if (r.ContentFilterSettings.Categories.blocked.indexOf(t) !== -1) {
                if (b && _ && (new Date)
                    .getTime() - _.getTime() < r.ContentFilterSettings.Override.Timeout && r.ContentFilterSettings.Override.Categories.indexOf(
                        t) !== -1) {
                    u.blocked = false;
                    u.reason = "override";
                    return u
                }
                u.blocked = true;
                u.redirect = s;
                u.reason = "cat";
                return u
            }
            o = r.FileExt.Check(e.url, t);
            if (o) {
                if (o.status === "a") {
                    u.blocked = false;
                    u.reason = "ext";
                    return u
                } else if (o.status === "b") {
                    u.blocked = true;
                    u.redirect = s;
                    u.reason = "ext";
                    return u
                }
            }
            u.blocked = false;
            u.reason = u.reason ? u.reason : "cat";
            return u
        };
        var R = function (e) {
            var t, r;
            if (!e) {
                throw new Error("details required")
            }
            if (typeof e !== "object") {
                throw new Error("details must be an object")
            }
            if (!e.url) {
                throw new Error("details must include a url")
            }
            if (typeof e.url !== "string") {
                throw new Error("url must be a string")
            }
            var n = new i(e.url);
            if (l.ignoreUrl(n)) {
                return
            }
            if (!d) {
                throw new Error("Remote is not defined, please configure the remote data helper")
            }
            r = x();
            if (r.ContentFilterSettings.Mode === "not_filtered") {
                return
            }
            d.lookup(e.url);
            t = r.SearchEngines.Check(e.url);
            if (t.thumbUrl && t.thumbUrl !== "") {
                d.lookup(t.thumbUrl)
            }
            t = r.YouTube.Warm(e.url)
        };
        var D = function (e) {
            if (!e) {
                throw new Error("ip required")
            }
            if (typeof e !== "string") {
                throw new Error("ip must be a string")
            }
            if (!e.match(/^(\d{1,3}\.){3}\d{1,3}$/)) {
                RelayLog.error("[FilteringJS.Policy.SetIp v2017-5-22] ip must be a valid IPv4 address: (", e, ")");
                throw new Error("ip must be a valid IPv4 address")
            }
            g = e
        };
        var F = function (e) {
            if (!e) {
                throw new Error("os required")
            }
            if (typeof e !== "string") {
                throw new Error("os must be a string")
            }
            y = e
        };
        var T = function (e) {
            RelayLog.scopedDebug("FilteringJS.ConfigureBlockPageURI", ["[FilteringJS.ConfigureBlockPageURI] - new: ", e]);
            if (!e) {
                throw new Error("uri required")
            }
            if (typeof e !== "string") {
                throw new Error("uri must be a string")
            }
            var t = new i(e);
            if (typeof t.protocol === "undefined" || t.protocol === "") {
                throw new Error("uri must be valid")
            }
            if (typeof t.hostname === "undefined" || t.hostname === "") {
                throw new Error("uri must be valid")
            }
            var r = x();
            var n = new i(e);
            r.BlockPageURI = e;
            if (r.Reporting.IgnoreFlagSites.indexOf(n.hostname.toLowerCase()) === -1) {
                r.Reporting.IgnoreFlagSites.push(n.hostname.toLowerCase())
            }
            v = e
        };
        var O = function () {
            b = true;
            _ = new Date
        };
        var L = function () {
            b = true;
            _ = undefined
        };
        var B = function (e) {
            if (typeof e === "undefined") {
                throw new Error("catId required")
            }
            if (typeof e !== "number") {
                throw new Error("catId must be a number")
            }
            if (!m) {
                return false
            }
            return x()
                .ContentFilterSettings.Override.Categories.indexOf(e) !== -1
        };
        var P = function (e) {
            if (!e) {
                throw new Error("catId required")
            }
            if (typeof e !== "number") {
                throw new Error("catId must be a number")
            }
            return x()
                .ContentFilterSettings.Override.Categories.indexOf(e) !== -1
        };
        const N = function (e) {
            if (typeof e === "undefined") {
                throw new Error("uri required")
            }
            if (typeof e !== "string") {
                throw new Error("uri must be a string")
            }
            let t = h.BasePolicy.Reporting.FlagMode;
            Object.keys(h.BasePolicy.Reporting.FlagSettings)
                .some(r => {
                    const n = h.BasePolicy.Reporting.FlagSettings[r];
                    if (e.match(n.matcher)) {
                        if (typeof n.mode !== "undefined") {
                            t = n.mode;
                            return true
                        }
                    }
                });
            return t
        };
        const U = function (e) {
            if (typeof e === "undefined") {
                throw new Error("uri required")
            }
            if (typeof e !== "string") {
                throw new Error("uri must be a string")
            }
            let t = false;
            Object.keys(h.BasePolicy.Reporting.FlagSettings)
                .some(r => {
                    const n = h.BasePolicy.Reporting.FlagSettings[r];
                    if (e.match(n.matcher)) {
                        if (typeof n.ignore !== "undefined") {
                            t = n.ignore;
                            return true
                        }
                    }
                });
            return t
        };
        t.exports.SetIp = D;
        t.exports.SetOs = F;
        t.exports.Policy = p;
        t.exports.ConfigureFromRelay = A;
        t.exports.ConfigureFromRocket = E;
        t.exports.ActivePolicy = x;
        t.exports.ActivePolicies = h;
        t.exports.ConfigureBlockPageURI = T;
        t.exports.AddGloballyAllowedHost = S;
        t.exports.EnableOverride = O;
        t.exports.ClearOverride = L;
        t.exports.IsOverridable = B;
        t.exports.IsOverridableOnRocket = P;
        t.exports.Warm = R;
        t.exports.PreScan = j;
        t.exports.Score = I;
        t.exports.GetFlagMode = N;
        t.exports.GetFlagIngored = U
    }, {
        "../allow_block": 31,
        "../file_ext": 32,
        "../lib/cidr": 34,
        "../lockout": 35,
        "../search_engines": 40,
        "../url_parser": 41,
        "../util": 42,
        "../web_auth": 43,
        "../youtube": 44
    }],
    37: [function (e, t, r) {
        "use strict";
        var n = {};
        var i;
        n.Configure = function (e) {
            if (!e) {
                throw new Error("configuration required")
            }
            if (!e.customerId) {
                throw new Error("customerId required")
            }
            if (!e.apiKey) {
                throw new Error("apiKey required")
            }
            if (!e.apiHost) {
                throw new Error("apiHost required")
            }
            if (!e.apiProto) {
                throw new Error("apiProto required")
            }
            if (!e.apiUserPolicyPath) {
                throw new Error("apiUserPolicyPath required")
            }
            if (!e.policyPollMS) {
                throw new Error("policyPollMS required")
            }
            i = e
        };
        n.Unconfigure = function () {
            i = undefined
        };
        n.GetUserPolicy = function (e) {
            return new Promise(function (t, r) {
                if (!e) {
                    r(new Error("username required"));
                    return
                }
                if (!i) {
                    r(new Error("RelayApi not configured"));
                    return
                }
                var n = i.apiProto + i.apiHost + i.apiUserPolicyPath;
                var o = new XMLHttpRequest;
                o.open("POST", n);
                o.setRequestHeader("x-api-key", i.apiKey);
                o.setRequestHeader("customerid", i.customerId);
                o.setRequestHeader("Content-Type", "application/json");
                o.send(JSON.stringify({
                    userEmail: e
                }));
                o.onload = function () {
                    if (this.status === 200) {
                        try {
                            let e = JSON.parse(this.responseText);
                            t(e)
                        } catch (e) {
                            r(o, e)
                        }
                    }
                };
                o.onabort = r.bind(null, o);
                o.onerror = r.bind(null, o);
                o.ontimeout = r.bind(null, o)
            })
        };
        var o;
        n.SetUser = function (e) {
            if (!e) {
                throw new Error("username required")
            }
            if (typeof e !== "string") {
                throw new Error("username must be a string")
            }
            o = e;
            u()
        };
        var s, a;
        n.StopMonitoringPolicy = function (e) {
            if (s) {
                clearInterval(s);
                s = null
            }
            if (a) {
                a = null
            }
        };
        var u = function () {
            if (o && a) {
                n.GetUserPolicy(o)
                    .then(function (e) {
                        localStorage.setItem("policy-" + o, JSON.stringify(e));
                        a(e)
                    })
                    .catch(function (e, t) {
                        if (t) {
                            a(null, t);
                            return
                        }
                        a(null, new Error("api error"))
                    })
            }
        };
        n.MonitorPolicy = function (e) {
            if (!e) {
                throw new Error("callback required")
            }
            if (typeof e !== "function") {
                throw new Error("callback must be a function")
            }
            if (!i) {
                throw new Error("RelayApi not configured")
            }
            n.StopMonitoringPolicy();
            a = e;
            if (o) {
                var t = localStorage.getItem("policy-" + o);
                if (t) {
                    try {
                        a(JSON.parse(t), null, true)
                    } catch (e) {}
                }
            }
            s = setInterval(u, i.policyPollMS);
            u()
        };
        t.exports = n
    }, {}],
    38: [function (e, t, r) {
        "use strict";
        const n = e("../util");
        const i = e("../url_parser");
        const o = e("../policy");
        var s = {};
        var a = {};
        var u;
        const c = ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "other"];
        class l {
            constructor() {
                this.actions = [];
                this.overrides = [];
                this.flags = [];
                this.lockoutOverrides = [];
                this.lockoutNotificationEmails = [];
                this.users = [];
                this.hosts = [];
                this.protocols = [];
                this.ip = "127.0.0.1";
                this.rv = 1
            }
            GetUsernameIndex(e) {
                var t;
                if (typeof e !== "string") {
                    throw new Error("username required")
                }
                t = this.users.indexOf(e);
                if (t === -1) {
                    this.users.push(e);
                    t = this.users.indexOf(e)
                }
                return t
            }
            GetHostIndex(e) {
                var t;
                if (typeof e !== "string") {
                    throw new Error("host required")
                }
                t = this.hosts.indexOf(e);
                if (t === -1) {
                    this.hosts.push(e);
                    t = this.hosts.indexOf(e)
                }
                return t
            }
            GetProtocolIndex(e) {
                var t;
                if (typeof e !== "string") {
                    throw new Error("protocol required")
                }
                e = e.replace(/:$/, "");
                t = this.protocols.indexOf(e);
                if (t === -1) {
                    this.protocols.push(e);
                    t = this.protocols.indexOf(e)
                }
                return t
            }
            Log(e) {
                var t, r, n, o = {};
                if (typeof e !== "object") {
                    throw new Error("data required")
                }
                if (typeof e.rg === "undefined") {
                    throw new Error("data must contain a rg key")
                }
                if (typeof e.url === "undefined") {
                    throw new Error("data must contain a url key")
                }
                if (typeof e.username === "undefined") {
                    throw new Error("data must contain a username key")
                }
                if (typeof e.at === "undefined") {
                    throw new Error("data must contain a at key")
                }
                if (typeof e.blocked === "undefined") {
                    throw new Error("data must contain a blocked key")
                }
                r = new i(e.url);
                n = c.indexOf(e.type);
                if (n === -1) {
                    n = c.indexOf("other")
                }
                t = [this.GetUsernameIndex(e.username), this.GetHostIndex(r.hostname), this.GetProtocolIndex(r.protocol), Boolean(e.blocked), e
                    .catId || 0, r.pathname, r.search, e.at.toISOString(), e.rsId || 1, e.rg, n
                ];
                if (e.r) {
                    o.r = e.r
                }
                if (e.q) {
                    o.q = decodeURIComponent(e.q.replace(/\+/g, " "))
                }
                if (typeof e.lsCat !== "undefined") {
                    o.lc = e.lsCat
                }
                if (e.tierId) {
                    o.tid = e.tierId
                }
                if (typeof e.ttl !== "undefined") {
                    o.lt = true;
                    this.lockoutTriggered = true;
                    if (typeof u.reportLockout === "function") {
                        u.reportLockout(e)
                    }
                }
                if (Object.keys(o)
                    .length > 0) {
                    t[11] = o
                }
                this.actions.push(t)
            }
            LogFlag(e) {
                var t, r;
                if (typeof e !== "object") {
                    throw new Error("data required")
                }
                if (typeof e.url === "undefined") {
                    throw new Error("data must contain a url key")
                }
                if (!Array.isArray(e.flags)) {
                    throw new Error("data must contain flags")
                }
                e.flags.forEach(function (e) {
                    if (e.length < 2 || e.length > 3) {
                        throw new Error("bad format")
                    }
                    if (typeof e[1] !== "number") {
                        throw new Error("bad format")
                    }
                    if (typeof e[2] !== "undefined" && typeof e[2] !== "boolean") {
                        throw new Error("bad format")
                    }
                });
                r = new i(e.url);
                t = [this.GetHostIndex(r.hostname), this.GetProtocolIndex(r.protocol), r.pathname, r.search, e.flags];
                this.flags.push(t)
            }
            LogLockoutOverride(e) {
                var t, r;
                if (typeof e !== "object") {
                    throw new Error("data required")
                }
                if (typeof e.rg === "undefined") {
                    throw new Error("data must contain an r guid")
                }
                t = {
                    rg: e.rg,
                    code: e.code,
                    cUser: this.GetUsernameIndex(e.cUser)
                };
                this.lockoutOverrides.push(t)
            }
            LogTimeOnSites(e) {
                if (!e) {
                    throw new Error("timings required")
                }
                if (!Array.isArray(e)) {
                    throw new Error("timings must be an array")
                }
                e.forEach(function (e) {
                    if (!Array.isArray(e)) {
                        throw new Error("invalid timing")
                    }
                    if (e.length !== 2) {
                        throw new Error("invalid timing")
                    }
                    if (typeof e[0] !== "string" || e[0].length !== 36) {
                        throw new Error("invalid timing")
                    }
                    if (typeof e[1] !== "number") {
                        throw new Error("invalid timing")
                    }
                });
                if (typeof this.timings === "undefined") {
                    this.timings = []
                }
                this.timings = this.timings.concat(e)
            }
            LogSiteTitle(e, t) {
                if (!e) {
                    throw new Error("rg required")
                }
                if (typeof e !== "string" || e.length !== 36) {
                    throw new Error("rg must be a guid")
                }
                if (typeof t !== "string") {
                    throw new Error("title required")
                }
                if (typeof this.siteTitles === "undefined") {
                    this.siteTitles = {}
                }
                this.siteTitles[e] = t
            }
            LogInstalledApp(e) {
                if (!e) {
                    throw new Error("apps required")
                }
                if (!Array.isArray(e)) {
                    throw new Error("apps must be an array")
                }
                this.apps = e
            }
            LogOverride(e) {
                if (typeof e !== "object") {
                    throw new Error("data must be an object")
                }
                if (typeof e.ip !== "string") {
                    throw new Error("ip required")
                }
                if (typeof e.catId === "undefined") {
                    throw new Error("catId required")
                }
                this.overrides.push(e)
            }
            toJson() {
                var e, t = this;
                var r = false;
                var n = {};
                if (t.users.length > 0) {
                    n.users = t.users
                }
                if (t.hosts.length > 0) {
                    n.hosts = t.hosts
                }
                if (t.protocols.length > 0) {
                    n.protocols = t.protocols
                }
                if (t.actions.length > 0) {
                    n.actions = t.actions;
                    r = true
                }
                if (t.flags.length > 0) {
                    n.flags = t.flags;
                    r = true
                }
                if (t.lockoutOverrides.length > 0) {
                    n.lockpass = t.lockoutOverrides;
                    r = true
                }
                if (t.overrides.length > 0) {
                    n.overrides = t.overrides;
                    r = true
                }
                if (typeof t.timings !== "undefined" && t.timings.length > 0) {
                    n.timing = t.timings;
                    r = true
                }
                if (typeof t.siteTitles !== "undefined") {
                    e = [];
                    Object.keys(t.siteTitles)
                        .forEach(function (r) {
                            e.push([r, t.siteTitles[r]])
                        });
                    if (e.length > 0) {
                        n.titles = t.siteTitles;
                        r = true
                    }
                }
                if (typeof t.apps !== "undefined") {
                    n.apps = t.apps;
                    r = true
                }
                n.rv = this.rv;
                n.ip = this.ip;
                if (t.lockoutTriggered) {
                    n.nEmails = this.lockoutNotificationEmails
                }
                n.osInfo = a;
                if (typeof this.sn !== "undefined") {
                    n.sn = this.sn
                }
                if (typeof this.tid !== "undefined") {
                    n.tid = this.tid
                }
                if (typeof this.udid !== "undefined") {
                    n.udid = this.udid
                }
                if (r) {
                    return JSON.stringify(n)
                }
                return undefined
            }
        }
        var f = new l;
        var p = function (e, t) {
            var r;
            if (!e) {
                throw new Error("data required")
            }
            if (typeof e !== "object") {
                throw new Error("data must be an object")
            }
            if (typeof e.username === "undefined") {
                throw new Error("data must contain a username key")
            }
            if (typeof e.type === "undefined") {
                throw new Error("data must contain a type key")
            }
            if (typeof e.url === "undefined") {
                throw new Error("data must contain a url")
            }
            if (typeof t === "undefined") {
                t = false
            }
            if (typeof e.rg === "undefined") {
                r = n.generateGUID();
                e.rg = r
            } else {
                r = e.rg
            }
            e.at = new Date;
            if (["main_frame", "sub_frame"].includes(e.type) && e.reason === "cat" && e.blocked) {
                RelayLog.scopedDebug("FilteringJS.Reporting.Log", ["[FilteringJS.Reporting.Log] logging lockout category"]);
                var i = o.ActivePolicy();
                var a = i.Lockout.lockedOutUntil > new Date;
                i.Lockout.Log(e.catId);
                if (!a && i.Lockout.lockedOutUntil) {
                    RelayLog.scopedDebug("FilteringJS.Reporting.Log", ["[FilteringJS.Reporting.Log] lockout was triggered"]);
                    e.ttl = i.Lockout.lockoutDuration
                }
                if (i.Lockout.lockedOutUntil > new Date && i.Lockout.action === "block") {
                    e.reason = "lockout";
                    e.r = "lockout"
                } else {
                    i.Lockout.RemoveLockout()
                }
            }
            RelayLog.scopedDebug("FilteringJS.Reporting.Log", ["[FilteringJS.Reporting.Log] logging to block history: ", e]);
            s[r] = e;
            if (!t) {
                RelayLog.scopedDebug("FilteringJS.Reporting.Log", [
                    "[FilteringJS.Reporting.Log] reporting enabled logging to current report page: ", e
                ]);
                f.Log(e)
            }
            return r
        };
        var h = function (e) {
            if (typeof e !== "string" || e.length !== 36) {
                throw new Error("rg must be a valid guid")
            }
            RelayLog.scopedDebug("FilteringJS.Reporting.GetBlockInfo", ["[FilteringJS.Reporting.GetBlockInfo] returning: ", s[e]]);
            return s[e]
        };
        var d = function () {
            return f
        };
        var g = function (e) {
            if (!e) {
                throw new Error("remote required")
            }
            if (typeof e !== "object") {
                throw new Error("remote must be an object")
            }
            if (typeof e.sendReports !== "function") {
                throw new Error("remote must have a sendReports function")
            }
            RelayLog.scopedDebug("FilteringJS.Reporting.ConfigureRemote", ["[FilteringJS.Reporting.ConfigureRemote] configured with: ", e]);
            u = e
        };
        var y = function () {
            var e, t;
            if (typeof u === "undefined") {
                throw new Error("remote is not configured")
            }
            e = f;
            f = new l;
            RelayLog.scopedDebug("FilteringJS.Reporting.SendReports", ["[FilteringJS.Reporting.SendReports] Working with report page: ", e]);
            t = e.toJson();
            RelayLog.scopedDebug("FilteringJS.Reporting.SendReports", ["[FilteringJS.Reporting.SendReports] report JSON:\n----", t, "\n----\n"]);
            if (typeof t !== "undefined") {
                RelayLog.scopedDebug("FilteringJS.Reporting.SendReports", [
                    "[FilteringJS.Reporting.SendReports] sending json to Remote.sendReports"
                ]);
                u.sendReports(t)
            } else {
                RelayLog.scopedDebug("FilteringJS.Reporting.SendReports", ["[FilteringJS.Reporting.SendReports] no data to send."])
            }
        };
        var v = function () {
            var e = new Date;
            Object.keys(s)
                .forEach(function (t) {
                    if (typeof s[t] === "undefined" || typeof s[t].at === "undefined" || e - s[t].at > 3e5) {
                        delete s[t]
                    }
                })
        };
        setInterval(v, 3e4);
        var m = function () {
            return s
        };
        var b = function (e) {
            if (typeof e !== "object" || typeof e.os !== "string") {
                throw new Error("invalid OS info")
            }
            a.os = e.os;
            a.arch = e.arch;
            a.agent = e.agent
        };
        t.exports.Log = p;
        t.exports.GetBlockInfo = h;
        t.exports.Report = l;
        t.exports.GetCurrentReport = d;
        t.exports.ConfigureRemote = g;
        t.exports.ConfigureOsInfo = b;
        t.exports.SendReports = y;
        t.exports.ClearBlockHistory = v;
        t.exports.GetBlockedHistory = m
    }, {
        "../policy": 36,
        "../url_parser": 41,
        "../util": 42
    }],
    39: [function (e, t, r) {
        "use strict";
        var n = {};
        var i;
        var o;
        n.Configure = function (e) {
            if (!e) {
                throw new Error("configuration required")
            }
            if (!e.customerId) {
                throw new Error("customerId required")
            }
            if (!e.apiKey) {
                throw new Error("apiKey required")
            }
            if (!e.apiHost) {
                throw new Error("apiHost required")
            }
            if (!e.apiProto) {
                throw new Error("apiProto required")
            }
            if (!e.apiUserPolicyPath) {
                throw new Error("apiUserPolicyPath required")
            }
            if (!e.deviceId) {
                throw new Error("deviceId required")
            }
            if (!e.deviceUser) {
                throw new Error("deviceUser required")
            }
            if (!e.configurePolicyCallback) {
                throw new Error("configurePolicyCallback required")
            }
            i = e
        };
        n.primaryFailed = 0;
        n.backupFailed = 0;
        n.updateInProgress = undefined;
        n.usingBackup = false;
        n.Unconfigure = function () {
            i = undefined
        };
        n.SetRocketHost = function (e) {
            i.apiHost = e
        };
        n.GetUserPolicy = function () {
            return new Promise(function (e, t) {
                if (!i) {
                    t(new Error("RocketApi not configured"));
                    return
                }
                var r = `${i.apiProto}${i.apiHost}${i.apiUserPolicyPath}`;
                r += `?device_id=${i.deviceId}&user=${encodeURIComponent(i.deviceUser)}&ts=${(new Date).getTime()}`;
                r += `&customer_id=${encodeURIComponent(i.customerId)}`;
                var n = new XMLHttpRequest;
                n.open("GET", r);
                RelayLog.scopedDebug("FilteringJS.RocketApi.GetUserPolicy", [
                    "[FilteringJS.RocketApi.GetUserPolicy] - calling policy server"
                ]);
                n.setRequestHeader("x-api-key", i.apiKey);
                n.setRequestHeader("customerid", i.customerId);
                n.setRequestHeader("dbNotReq", true);
                n.setRequestHeader("Content-Type", "application/json");
                n.send();
                n.onload = function () {
                    RelayLog.scopedDebug("FilteringJS.RocketApi.GetUserPolicy", [
                        "[FilteringJS.RocketApi.GetUserPolicy] - received policy", this.responseText
                    ]);
                    if (this.status === 200) {
                        try {
                            let r = JSON.parse(this.responseText);
                            e(r)
                        } catch (e) {
                            t(n, e)
                        }
                    }
                };
                n.onabort = t.bind(null, n);
                n.onerror = t.bind(null, n);
                n.ontimeout = t.bind(null, n)
            })
        };
        n.UpdatePolicyFromCache = function (e) {
            let t = localStorage.getItem("policy-" + e);
            RelayLog.scopedDebug("FilteringJS.RocketApi.UpdatePolicyFromCache", ["[FilteringJS.RocketApi.UpdatePolicyFromCache] - username: ",
                e
            ]);
            RelayLog.scopedDebug("FilteringJS.RocketApi.UpdatePolicyFromCache", [
                "[FilteringJS.RocketApi.UpdatePolicyFromCache] - cached policy: ", JSON.parse(t)
            ]);
            if (t && !t.error) {
                t = JSON.parse(t);
                t.internal = false;
                i.configurePolicyCallback(t)
            }
        };
        n.SetUser = function (e) {
            if (typeof e !== "string") {
                throw new Error("username must be a string")
            }
            o = e;
            localStorage.setItem("lastUser", e)
        };
        n.UpdatePolicyFromRocket = function () {
            if (!i) {
                throw new Error("RocketApi not configured")
            }
            if (!i.configurePolicyCallback) {
                throw new Error("configurePolicyCallback required")
            }
            if (typeof i.configurePolicyCallback !== "function") {
                throw new Error("configurePolicyCallback must be a function")
            }
            n.UpdatePolicyFromCache(o);
            if (o && !n.updateInProgress) {
                n.updateInProgress = true;
                n.GetUserPolicy()
                    .then(function (e) {
                        localStorage.setItem("policy-" + o, JSON.stringify(e));
                        i.configurePolicyCallback(e);
                        n.updateInProgress = false
                    })
                    .catch(function (e, t) {
                        n.updateInProgress = false;
                        if (t) {
                            s(t);
                            return
                        }
                        s(new Error("api error"))
                    })
            }
        };
        const s = function (e) {
            var t = (new Date)
                .getTime();
            RelayLog.scopedDebug("FilteringJS.RocketApi.Failover", [
                "[FilteringJS.RocketApi.Failover] - starting failover check, using backup?: ", n.usingBackup
            ]);
            if (n.usingBackup) {
                n.backupFailed = t;
                if (t - n.primaryFailed < 1e4) {
                    i.configurePolicyCallback(null, e)
                } else {
                    RelayLog.scopedDebug("FilteringJS.RocketApi.Failover", ["[FilteringJS.RocketApi.Failover] - switching to primary host: ", i
                        .apiHostPrimary
                    ]);
                    i.apiHost = i.apiHostPrimary;
                    n.usingBackup = false;
                    n.UpdatePolicyFromRocket()
                }
            } else {
                n.primaryFailed = t;
                if (i.apiHostBackup && t - n.backupFailed >= 1e4) {
                    RelayLog.scopedDebug("FilteringJS.RocketApi.Failover", ["[FilteringJS.RocketApi.Failover] - switching to backup host: ", i.apiHostBackup]);
                    i.apiHost = i.apiHostBackup;
                    n.usingBackup = true;
                    n.UpdatePolicyFromRocket()
                } else {
                    i.configurePolicyCallback(null, e)
                }
            }
        };
        t.exports = n
    }, {}],
    40: [function (e, t, r) {
        "use strict";
        var n = e("../url_parser");
        t.exports = class {
            ConfigureDefaultSearchSites() {
                this.SearchSites = {};
                this.SearchSites["\\.google\\."] = {
                    name: "Google",
                    query_params: ["q", "as_q"],
                    ignore_paths: ["complete", "drive", "s", "local", "trends", "gmail"],
                    do_not_modify_host_matchers: [/mail\./]
                };
                this.SearchSites["\\.gstatic\\.com"] = {
                    name: "Google",
                    query_params: ["q"],
                    ignore_paths: []
                };
                this.SearchSites["search\\.yahoo\\."] = {
                    name: "Yahoo",
                    query_params: ["p"],
                    ignore_paths: []
                };
                this.SearchSites["search\\.microsoft\\.com"] = {
                    name: "Microsoft",
                    query_params: ["qu", "q"],
                    ignore_paths: ["shared/templates/master/smcPage/AutoSuggestHandler.ashx"]
                };
                this.SearchSites["\\.bing\\."] = {
                    name: "Bing",
                    query_params: ["q"],
                    ignore_paths: ["qson.aspx", "qsonhs.aspx", "images/tstitch", "maps", "api/beta/v6"]
                };
                this.SearchSites["\\.youtube\\.com"] = {
                    name: "YouTube",
                    query_params: ["search_query", "q"],
                    ignore_paths: []
                };
                this.SearchSites["duckduckgo\\.com"] = {
                    name: "DuckDuckGo",
                    query_params: ["search_query", "q"],
                    ignore_paths: []
                }
            }
            constructor() {
                this.GoogleForceSafe = true;
                this.GoogleFilterImages = true;
                this.GoogleDisableAutocomplete = true;
                this.BlockedKeywords = [];
                this.ReportThumbnails = false;
                this.DefaultWholeWord = true;
                this.ConfigureDefaultSearchSites()
            }
            GetSiteSettings(e) {
                if (!e) {
                    throw new Error("UrlParser object required.")
                }
                var t = Object.keys(this.SearchSites);
                var r = 0,
                    n = t.length;
                for (; r < n; r++) {
                    let n = t[r];
                    if (e.hostname.match(n)) {
                        return this.SearchSites[n]
                    }
                }
                return undefined
            }
            ExtractTerm(e) {
                var t = false;
                if (!e) {
                    throw new Error("UrlParser object required.")
                }
                var r = this,
                    n = undefined;
                var i = r.GetSiteSettings(e);
                if (i) {
                    if (i.ignore_paths) {
                        i.ignore_paths.some(function (r) {
                            if (e.pathname === "/" + r || e.pathname.startsWith("/" + r + "/")) {
                                t = true;
                                return true
                            }
                            return false
                        })
                    }
                    if (t) {
                        return
                    }
                    if (i.query_params) {
                        i.query_params.some(function (t) {
                            if (e.params()
                                .search && e.params()
                                .search[t]) {
                                n = e.params()
                                    .search[t][0];
                                return true
                            }
                            if (e.params()
                                .hash && e.params()
                                .hash[t]) {
                                n = e.params()
                                    .hash[t][0];
                                return true
                            }
                            return false
                        })
                    }
                }
                if (typeof n !== "undefined") {
                    n = decodeURIComponent(n.replace(/\+/g, " "))
                        .trim()
                }
                return n
            }
            CanModifyUrl(e, t) {
                var r, n, i;
                if (!e) {
                    throw new Error("parsedUrl required")
                }
                if (!t) {
                    throw new Error("siteSettings required")
                }
                r = t.do_not_modify_host_matchers;
                if (r) {
                    n = r.some(function (t) {
                        return e.hostname.match(t)
                    });
                    if (n) {
                        return false
                    }
                }
                r = t.ignore_paths;
                if (r) {
                    n = r.some(function (t) {
                        i = t.replace(/[\]{}?^$().*\\+|[]/g, "\\$&");
                        i = "^/" + i + "(/|$)";
                        return e.pathname.match(new RegExp(i, "i"))
                    });
                    if (n) {
                        return false
                    }
                }
                return true
            }
            RedirectUrl(e) {
                if (!e) {
                    throw new Error("UrlParser object required.")
                }
                var t = this,
                    r;
                var n = t.GetSiteSettings(e);
                if (n && n.name === "Google" && this.CanModifyUrl(e, n)) {
                    let r = e.params(),
                        n = false;
                    if (t.GoogleForceSafe) {
                        if (!(r.search && r.search.safe && r.search.safe[0] === "active")) {
                            e.SetQueryParam("safe", "active");
                            n = true
                        }
                    }
                    if (t.GoogleFilterImages) {
                        if (!(r.search && r.search.surl && r.search.surl[0] === "1")) {
                            e.SetQueryParam("surl", "1");
                            n = true
                        }
                    }
                    if (t.GoogleDisableAutocomplete) {
                        if (!(r.search && r.search.complete && r.search.complete[0] === "0")) {
                            e.SetQueryParam("complete", "0");
                            n = true
                        }
                    }
                    if (n) {
                        return e.toString()
                    }
                }
                return undefined
            }
            AddKeywords(e) {
                if (!e) {
                    throw new Error("keywords is required")
                }
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    throw new Error("keywords must be an array")
                }
                var t = this;
                e.forEach(function (e) {
                    var r = e.replace(/[\]{}?^$().*\\+|[]/g, "\\$&");
                    if (t.DefaultWholeWord) {
                        r = "\\b" + r + "\\b"
                    }
                    t.BlockedKeywords.push(new RegExp(r, "i"))
                })
            }
            Check(e) {
                if (!e) {
                    throw new Error("URL required.")
                }
                var t = this,
                    r = {},
                    i = new n(e);
                var o = t.ExtractTerm(i);
                if (o) {
                    if (o.match(/^tbn:/)) {
                        let e = o.replace(/^tbn:[^:]+(:|$)/, "");
                        if (e.length > 0 && !e.match(/^[^:]+:\/\//)) {
                            e = "http://" + e
                        }
                        r.thumbUrl = e;
                        return r
                    }
                    r.term = o;
                    let e = false;
                    t.BlockedKeywords.some(function (t) {
                        if (o.match(t)) {
                            e = true;
                            return true
                        }
                        return false
                    });
                    if (e) {
                        r.status = "b";
                        return r
                    }
                    let n = t.RedirectUrl(i);
                    if (n) {
                        r.redirect = n
                    }
                }
                return r
            }
        }
    }, {
        "../url_parser": 41
    }],
    41: [function (e, t, r) {
        "use strict";
        t.exports = class {
            constructor(e) {
                this.href = e
            }
            parseHref() {
                var e = this._href.match(/^([^\/]+:)(\/\/)?([^\/\?#]+)(\/[^\?#]*)?(\?[^#]*)?(#.*)?/);
                if (e) {
                    if (e[1]) {
                        this.protocol = e[1]
                    }
                    if (e[3]) {
                        this.host = e[3];
                        var t = this.host.match(/^([^:]+)(:(\d+))?$/);
                        if (t) {
                            if (t[1]) {
                                this.hostname = t[1]
                            }
                            if (t[2]) {
                                this.port = t[3]
                            }
                        }
                    }
                    if (e[4]) {
                        this.pathname = e[4]
                    } else {
                        this.pathname = "/"
                    }
                    if (e[5]) {
                        this.search = e[5]
                    } else {
                        this.search = ""
                    }
                    if (e[6]) {
                        this.hash = e[6]
                    } else {
                        this.hash = ""
                    }
                }
            }
            get href() {
                return this._href
            }
            set href(e) {
                this._href = e;
                this.parseHref()
            }
            params() {
                var e = this;
                if (e._params) {
                    return e._params
                }
                e._params = {};
                if (e.search && e.search !== "" && e.search !== "?") {
                    e._params.search = {};
                    let t = e.search.replace(/^\?/, "")
                        .split("&");
                    t.forEach(function (t) {
                        let r = t.split("=");
                        if (r[0]) {
                            let t = r[0];
                            if (!e._params.search[t]) {
                                e._params.search[t] = []
                            }
                            if (r[1]) {
                                e._params.search[t].push(r[1])
                            }
                        }
                    })
                }
                if (e.hash && e.hash !== "" && e.hash !== "#") {
                    e._params.hash = {};
                    let t = e.hash.replace(/^\#/, "")
                        .split("&");
                    t.forEach(function (t) {
                        let r = t.split("=");
                        if (r[0]) {
                            let t = r[0];
                            if (!e._params.hash[t]) {
                                e._params.hash[t] = []
                            }
                            if (r[1]) {
                                e._params.hash[t].push(r[1])
                            }
                        }
                    })
                }
                return e._params
            }
            UpdateSearch() {
                var e = this,
                    t = e.params();
                e.search = "";
                if (t.search) {
                    let r = Object.keys(t.search);
                    let n = 0,
                        i = r.length;
                    for (; n < i; n++) {
                        let i = r[n];
                        if (t.search[i].length === 0) {
                            e.search += "&" + i
                        } else {
                            t.search[i].forEach(function (t) {
                                e.search += "&" + i + "=" + t
                            })
                        }
                    }
                }
                e.search = "?" + e.search.replace(/^&/, "")
            }
            SetQueryParam(e, t) {
                if (!e) {
                    throw new Error("keyName is required")
                }
                if (!t) {
                    throw new Error("value is required")
                }
                var r = this;
                r.params();
                if (!r._params.search) {
                    r._params.search = {}
                }
                r._params.search[e] = [t.toString()];
                r.UpdateSearch()
            }
            toString() {
                return this.protocol + "//" + this.host + this.pathname + this.search + this.hash
            }
        }
    }, {}],
    42: [function (e, t, r) {
        "use strict";
        var n = function () {
            var e, t;
            var r = "";
            for (t = 0; t < 36; t++) {
                if (t === 8 || t === 13 || t === 18 || t === 23) {
                    r += "-"
                } else if (t === 14) {
                    r += "4"
                } else if (t === 19) {
                    e = Math.floor(Math.random() * 16) & 3 | 8;
                    r += e.toString(16)
                } else {
                    e = Math.floor(Math.random() * 16);
                    r += e.toString(16)
                }
            }
            return r
        };
        var i = function (e) {
            if (!e) {
                throw new Error("Hostname is required")
            }
            if (e.match(/^(\d{1,3}\.){3}(\d{1,3})$/)) {
                if (e.match(/^10\./) || e.match(/^172\.16\./) || e.match(/^192\.168\./) || e.match(/^169\.254\./)) {
                    return true
                }
            }
            return false
        };
        var o = [];
        var s = function (e) {
            if (!e) {
                throw new Error("host required")
            }
            if (typeof e !== "string") {
                throw new Error("host must be a string")
            }
            var t = e.toLowerCase();
            if (o.indexOf(t) === -1) {
                o.push(t)
            }
        };
        var a = function (e) {
            if (!e) {
                throw new Error("host required")
            }
            if (typeof e !== "string") {
                throw new Error("host must be a string")
            }
            if (o.indexOf(e.toLowerCase()) === -1) {
                return false
            }
            return true
        };
        var u = function (e) {
            if (a(e.hostname)) {
                return true
            }
            switch (e.protocol.toLowerCase()) {
            case "about:":
            case "chrome:":
            case "chrome-extension:":
                return true;
            default:
                break
            }
            if (i(e.hostname)) {
                return true
            }
        };
        t.exports.generateGUID = n;
        t.exports.isInternalIp = i;
        t.exports.addGloballyAllowedHost = s;
        t.exports.ignoreUrl = u
    }, {}],
    43: [function (e, t, r) {
        "use strict";
        var n;
        var i = false;
        var o = undefined;
        var s = 0;
        var a = 0;
        var u = {
            enabled: false,
            forcePortalLogin: false
        };
        u.Configure = function (e) {
            if (!e) {
                throw new Error("configuration required")
            }
            if (!e.apiKey) {
                throw new Error("apiKey required")
            }
            if (!e.host) {
                throw new Error("host required")
            }
            if (!e.hostProtocol) {
                throw new Error("hostProtocol required")
            }
            if (!e.authPath) {
                throw new Error("authPath required")
            }
            if (!e.overridePath) {
                throw new Error("overridePath required")
            }
            if (!e.logoutPath) {
                throw new Error("logoutPath required")
            }
            n = e
        };
        u.AuthenticateUser = function (e, t) {
            var r = n.hostProtocol + n.host + n.authPath;
            var i = new XMLHttpRequest;
            i.open("POST", r, true);
            i.setRequestHeader("x-api-key", n.apiKey);
            i.send(JSON.stringify({
                ip: e.ip,
                device_id: e.deviceId,
                tier_id: e.tierId,
                auth_source_id: e.authSourceId,
                username: e.user,
                password: e.pass
            }));
            i.onload = function () {
                if (this.status === 200) {
                    var e = JSON.parse(this.responseText);
                    console.log("Auth response: ", e);
                    if (e.error) {
                        t(undefined, e.error)
                    } else {
                        t(e)
                    }
                } else {
                    console.log("Auth not 200: ", this);
                    t(undefined, undefined)
                }
            }
        };
        u.LogoutUser = function (e, t) {
            var r = `${n.hostProtocol}${n.host}${n.logoutPath}?device_id=${e}`;
            var i = new XMLHttpRequest;
            i.open("GET", r, true);
            i.setRequestHeader("x-api-key", n.apiKey);
            i.send();
            u.ExpireUser();
            i.onload = function () {
                if (this.status === 200) {
                    var e = JSON.parse(this.responseText);
                    console.log("Auth response: ", e);
                    if (e.error) {
                        t(undefined, e.error)
                    } else {
                        t(e)
                    }
                } else {
                    console.log("Auth not 200: ", this);
                    t(undefined, undefined)
                }
            }
        };
        u.AuthenticateOverrideUser = function (e, t) {
            var r = n.hostProtocol + n.host + n.overridePath;
            var i = new XMLHttpRequest;
            i.open("POST", r, true);
            i.setRequestHeader("x-api-key", n.apiKey);
            i.send(JSON.stringify({
                ip: e.ip,
                device_id: e.deviceId,
                tier_id: e.tierId,
                auth_source_id: e.authSourceId,
                username: e.user,
                password: e.pass,
                rule_set_id: e.ruleSetId
            }));
            i.onload = function () {
                if (this.status === 200) {
                    var e = JSON.parse(this.responseText);
                    console.log("Auth response: ", e);
                    if (e.error) {
                        t({
                            error: e.error
                        })
                    } else if (e.status === "ok") {
                        t({
                            success: true,
                            ttl: e.ttl,
                            username: e.username
                        })
                    }
                } else {
                    console.log("Auth not 200: ", this);
                    t({
                        success: false
                    })
                }
            }
        };
        u.ExpireUser = function () {
            o = undefined;
            s = 0;
            i = false;
            localStorage.removeItem("webAuthUser");
            localStorage.removeItem("webAuthExpireAt");
            localStorage.removeItem("webAuthStartedAt")
        };
        u.isExpired = function () {
            return s < (new Date)
                .getTime()
        };
        u.LoginUser = function (e, t) {
            i = true;
            o = e;
            a = (new Date)
                .getTime();
            s = t;
            localStorage.setItem("webAuthUser", o);
            localStorage.setItem("webAuthExpireAt", s);
            localStorage.setItem("webAuthStartedAt", a)
        };
        u.getUser = function () {
            return o
        };
        u.secondsActive = function () {
            return ((new Date)
                .getTime() - a) / 1e3
        };
        t.exports = u
    }, {}],
    44: [function (e, t, r) {
        "use strict";
        var n = e("../url_parser");
        var i = [/youtu\.be\/([^#\&\?]{11})/i, /\?v=([^#\&\?]{11})/i, /\&v=([^#\&\?]{11})/i, /\?video_id=([^#\&\?]{11})/i,
            /\&video_id=([^#\&\?]{11})/i, /an_webp\/([^#\&\?]{11})/i, /embed\/([^#\&\?]{11})/i, /\/v\/([^#\&\?]{11})/i,
            /ytimg\.com\/vi\/([^#\&\?]{11})/i, /ytimg\.com\/an_webp\/([^#\&\?]{11})/i, /\&docid=([^#\&\?]{11})/i,
            /youtube\.com\/get_video_info\?.*video_id=([^#\&\?]{11})/i
        ];
        var o = class {
            constructor(e) {
                if (!e || e === "") {
                    throw new Error("URL is required")
                }
                this.matchers = [/(^|(.+\.))youtube\.com$/i, /(^|(.+\.))ytimg\.com$/i, /(^|(.+\.))youtu\.be$/i,
                    /(^|(.+\.))googlevideo\.com$/i
                ];
                this.url = e;
                this.parsedUrl = new n(e)
            }
            isYoutube() {
                var e = 0,
                    t = this.matchers.length;
                for (; e < t; e++) {
                    if (this.parsedUrl.hostname.match(this.matchers[e])) {
                        return true
                    }
                }
                return false
            }
            getId() {
                var e = {},
                    t, r, n;
                if (this.isYoutube()) {
                    t = this.parsedUrl.pathname.match(/\/channel\/([^\/]+)(\/|$)/i);
                    if (t) {
                        e.channelId = t[1];
                        return e
                    }
                    t = this.parsedUrl.pathname.match(/\/user\/([^\/]+)(\/|$)/i);
                    if (t) {
                        e.userId = t[1];
                        return e
                    }
                    for (r = 0, n = i.length; r < n; r++) {
                        t = this.parsedUrl.href.match(i[r]);
                        if (t) {
                            e.videoId = t[1]
                        }
                    }
                }
                return e
            }
        };
        t.exports = class {
            constructor() {
                this.blockedVideos = [];
                this.allowedVideos = [];
                this.blockedChannels = [];
                this.allowedChannels = [];
                this.blockedCategories = [];
                this.allowedCategories = [];
                this.ageRestricted = false;
                this.restrictedLevel = null;
                this.hideComments = false;
                this.hideSidebar = false;
                this.allowCampusLibrary = true;
                this.mode = "filtered";
                this.smartplayCategories = [];
                this.smartplayBlockedCategories = [];
                this.smartplayOthersBlocked = false;
                this.blockThumbnails = false;
                this.preventChannelAutoplay = false
            }
            Check(e) {
                RelayLog.scopedDebug("FilteringJS.Youtube.Check", ["FilteringJS.Youtube.Check started with url: ", e]);
                var t = {},
                    r, n, i, s, a, u;
                if (!e || e === "") {
                    throw new Error("URL is required")
                }
                if (this.mode === "off") {
                    RelayLog.scopedDebug("FilteringJS.Youtube.Check", ["FilteringJS.Youtube.Check - mode is off, not scoring"]);
                    return {}
                }
                r = new o(e);
                n = r.getId();
                RelayLog.scopedDebug("FilteringJS.Youtube.Check", ["[FilteringJS.Youtube.Check - ids: ", n]);
                if (typeof n.userId !== "undefined" && this.hideComments) {
                    if (r.parsedUrl.pathname.match(/\/user\/[^\/]+\/discussion/i)) {
                        t.userId = n.userId;
                        t.status = "b";
                        return t
                    }
                }
                if (typeof n.channelId !== "undefined" && this.hideComments) {
                    if (r.parsedUrl.pathname.match(/\/channel\/[^\/]+\/discussion/i)) {
                        t.channelId = n.channelId;
                        t.status = "b";
                        return t
                    }
                }
                if (n.userId) {
                    u = this.Remote.getYoutubeUserData(n.userId);
                    if (!u) {
                        t.stall = true;
                        return t
                    } else if (u.channelId) {
                        n.channelId = u.channelId
                    }
                }
                if (n.videoId) {
                    t.videoId = n.videoId;
                    if (this.allowedVideos.indexOf(n.videoId) !== -1) {
                        RelayLog.debug("[Allowed] Youtube - videoId: ", n.videoId);
                        t.status = "a";
                        return t
                    }
                    if (this.blockedVideos.indexOf(n.videoId) !== -1) {
                        RelayLog.debug("[Blocked] Youtube - videoId: ", n.videoId);
                        t.status = "b";
                        return t
                    }
                    u = this.Remote.getYoutubeVideoData(n.videoId);
                    if (!u) {
                        RelayLog.debug("[Stall] Youtube - waiting for video metadata");
                        t.stall = true;
                        return t
                    } else if (!n.channelId && u.channelId) {
                        n.channelId = u.channelId
                    }
                }
                if (n.channelId) {
                    t.channelId = n.channelId;
                    if (this.allowedChannels.indexOf(n.channelId) !== -1) {
                        RelayLog.debug("[Allowed] Youtube - channel ID: ", n.channelId);
                        t.status = "a";
                        return t
                    }
                    if (this.blockedChannels.indexOf(n.channelId) !== -1) {
                        RelayLog.debug("[Blocked] Youtube - channel ID: ", n.channelId);
                        t.status = "b";
                        return t
                    }
                    if (typeof this.Remote.getYoutubeChannelData !== "undefined") {
                        u = this.Remote.getYoutubeChannelData(n.channelId);
                        if (!u) {
                            RelayLog.debug("[Stall] Youtube - waiting for channel metadata");
                            t.stall = true;
                            return t
                        }
                    }
                }
                if (u && u.contentRating && this.ageRestricted && u.contentRating.ytRating === "ytAgeRestricted") {
                    RelayLog.debug("[Blocked] Youtube - ytAgeRestricted video");
                    t.status = "b";
                    t.ytRating = u.contentRating.ytRating;
                    return t
                }
                if (u) {
                    if (u.ls_cat !== undefined) {
                        if (typeof u.ls_cat === "string") {
                            u.ls_cat = parseInt(u.ls_cat, 10)
                        }
                        if (this.smartplayCategories !== undefined && this.smartplayCategories.indexOf(u.ls_cat) !== -1) {
                            t.status = "a";
                            t.lsCat = u.ls_cat;
                            RelayLog.debug("[Allowed] Youtube - Lightspeed category ID: ", u.ls_cat);
                            return t
                        } else if (this.smartplayBlockedCategories !== undefined && this.smartplayBlockedCategories.indexOf(u.ls_cat) !==
                            -1) {
                            t.status = "b";
                            t.lsCat = u.ls_cat;
                            RelayLog.debug("[Blocked] Youtube - Lightspeed category ID: ", u.ls_cat);
                            return t
                        }
                    }
                    if (this.smartplayOthersBlocked) {
                        t.status = "b";
                        if (typeof u.ls_cat !== "undefined") {
                            t.lsCat = u.ls_cat
                        }
                        RelayLog.debug("[Blocked] Youtube - Lightspeed category ID: ", u.ls_cat);
                        return t
                    }
                    if (u.categoryId !== undefined) {
                        u.categoryId = parseInt(u.categoryId, 10);
                        if (this.allowedCategories.indexOf(u.categoryId) !== -1) {
                            RelayLog.debug("[Allowed] Youtube - category ID: ", u.categoryId);
                            t.status = "a";
                            t.categoryId = u.categoryId;
                            return t
                        }
                        if (this.blockedCategories.indexOf(u.categoryId) !== -1) {
                            RelayLog.debug("[Blocked] Youtube - category ID: ", u.categoryId);
                            t.status = "b";
                            t.categoryId = u.categoryId;
                            return t
                        }
                    }
                    if (this.allowCampusLibrary && u.library === true) {
                        t.status = "a";
                        t.campusLibrary = true;
                        return t
                    }
                }
                return t
            }
            Warm(e) {
                const t = new o(e);
                const r = t.getId();
                if (r.userId) {
                    this.Remote.getYoutubeUserData(r.userId)
                }
                if (r.videoId) {
                    this.Remote.getYoutubeVideoData(r.videoId)
                }
                if (r.channelId && typeof this.Remote.getYoutubeChannelData !== "undefined") {
                    this.Remote.getYoutubeChannelData(r.channelId)
                }
            }
        };
        t.exports.Request = o
    }, {
        "../url_parser": 41
    }],
    45: [function (e, t, r) {
        (function (r) {
            var n = e("isarray");
            var i = Object.prototype.toString;
            var o = typeof r.Blob === "function" || i.call(r.Blob) === "[object BlobConstructor]";
            var s = typeof r.File === "function" || i.call(r.File) === "[object FileConstructor]";
            t.exports = a;

            function a(e) {
                if (!e || typeof e !== "object") {
                    return false
                }
                if (n(e)) {
                    for (var t = 0, i = e.length; t < i; t++) {
                        if (a(e[t])) {
                            return true
                        }
                    }
                    return false
                }
                if (typeof r.Buffer === "function" && r.Buffer.isBuffer && r.Buffer.isBuffer(e) || typeof r.ArrayBuffer === "function" && e instanceof ArrayBuffer ||
                    o && e instanceof Blob || s && e instanceof File) {
                    return true
                }
                if (e.toJSON && typeof e.toJSON === "function" && arguments.length === 1) {
                    return a(e.toJSON(), true)
                }
                for (var u in e) {
                    if (Object.prototype.hasOwnProperty.call(e, u) && a(e[u])) {
                        return true
                    }
                }
                return false
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        isarray: 46
    }],
    46: [function (e, t, r) {
        var n = {}.toString;
        t.exports = Array.isArray || function (e) {
            return n.call(e) == "[object Array]"
        }
    }, {}],
    47: [function (e, t, r) {
        try {
            t.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest
        } catch (e) {
            t.exports = false
        }
    }, {}],
    48: [function (e, t, r) {
        var n = [].indexOf;
        t.exports = function (e, t) {
            if (n) return e.indexOf(t);
            for (var r = 0; r < e.length; ++r) {
                if (e[r] === t) return r
            }
            return -1
        }
    }, {}],
    49: [function (e, t, r) {
        "use strict";
        var n = {
            calculate: function (e, t) {
                var r, n, i;
                var o = [];
                try {
                    r = this.toDecimal(e);
                    n = this.toDecimal(t)
                } catch (e) {
                    return null
                }
                if (n < r) {
                    return null
                }
                i = r;
                while (i <= n) {
                    var s = this.getOptimalRange(i, n);
                    if (s === null) {
                        return null
                    }
                    o.push(s);
                    i = s.ipHigh + 1
                }
                return o
            },
            calculateSubnetMask: function (e, t) {
                var r;
                try {
                    r = this.toDecimal(e)
                } catch (e) {
                    return null
                }
                return this.getMaskRange(r, t)
            },
            calculateCIDRPrefix: function (e, t) {
                var r, n, i = 0,
                    o = 0,
                    s;
                try {
                    r = this.toDecimal(e);
                    n = this.toDecimal(t)
                } catch (e) {
                    return null
                }
                for (s = 0; s < 32; s++) {
                    o = i + (1 << 32 - (s + 1)) >>> 0;
                    if ((n & o) >>> 0 !== o) {
                        break
                    }
                    i = o
                }
                return this.getMaskRange(r, s)
            },
            getOptimalRange: function (e, t) {
                var r, n = null;
                for (r = 32; r >= 0; r--) {
                    var i = this.getMaskRange(e, r);
                    if (i.ipLow === e && i.ipHigh <= t) {
                        n = i
                    } else {
                        break
                    }
                }
                return n
            },
            getMaskRange: function (e, t) {
                var r = this.getPrefixMask(t),
                    n = this.getMask(32 - t),
                    i = (e & r) >>> 0,
                    o = ((e & r) >>> 0) + n >>> 0;
                return {
                    ipLow: i,
                    ipLowStr: this.toString(i),
                    ipHigh: o,
                    ipHighStr: this.toString(o),
                    prefixMask: r,
                    prefixMaskStr: this.toString(r),
                    prefixSize: t,
                    invertedMask: n,
                    invertedMaskStr: this.toString(n),
                    invertedSize: 32 - t
                }
            },
            getPrefixMask: function (e) {
                var t = 0,
                    r;
                for (r = 0; r < e; r++) {
                    t += 1 << 32 - (r + 1) >>> 0
                }
                return t
            },
            getMask: function (e) {
                var t = 0,
                    r;
                for (r = 0; r < e; r++) {
                    t += 1 << r >>> 0
                }
                return t
            },
            isIp: function (e) {
                if (typeof e !== "string") {
                    return false
                }
                var t = e.match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/);
                if (t === null) {
                    return false
                }
                for (var r = 1; r <= 4; r++) {
                    var n = parseInt(t[r], 10);
                    if (n > 255 || n < 0) {
                        return false
                    }
                }
                return true
            },
            isDecimalIp: function (e) {
                return typeof e === "number" && e % 1 === 0 && e >= 0 && e <= 4294967295
            },
            toDecimal: function (e) {
                if (typeof e === "number" && this.isDecimalIp(e) === true) {
                    return e
                }
                if (this.isIp(e) === false) {
                    throw new Error("Not an IP address: " + e)
                }
                var t = e.split(".");
                return ((+t[0] * 256 + +t[1]) * 256 + +t[2]) * 256 + +t[3]
            },
            toString: function (e) {
                if (typeof e === "string" && this.isIp(e) === true) {
                    return e
                }
                if (this.isDecimalIp(e) === false) {
                    throw new Error("Not a numeric IP address: " + e)
                }
                var t = e % 256;
                for (var r = 3; r > 0; r--) {
                    e = Math.floor(e / 256);
                    t = e % 256 + "." + t
                }
                return t
            }
        };
        if (typeof define === "function" && define.amd) {
            define([], function () {
                return n
            })
        } else if (typeof r === "object") {
            t.exports = n
        }
    }, {}],
    50: [function (e, t, r) {
        r.encode = function (e) {
            var t = "";
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    if (t.length) t += "&";
                    t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r])
                }
            }
            return t
        };
        r.decode = function (e) {
            var t = {};
            var r = e.split("&");
            for (var n = 0, i = r.length; n < i; n++) {
                var o = r[n].split("=");
                t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
            }
            return t
        }
    }, {}],
    51: [function (e, t, r) {
        var n =
            /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file",
            "query", "anchor"
        ];
        t.exports = function e(t) {
            var r = t,
                o = t.indexOf("["),
                s = t.indexOf("]");
            if (o != -1 && s != -1) {
                t = t.substring(0, o) + t.substring(o, s)
                    .replace(/:/g, ";") + t.substring(s, t.length)
            }
            var a = n.exec(t || ""),
                u = {},
                c = 14;
            while (c--) {
                u[i[c]] = a[c] || ""
            }
            if (o != -1 && s != -1) {
                u.source = r;
                u.host = u.host.substring(1, u.host.length - 1)
                    .replace(/;/g, ":");
                u.authority = u.authority.replace("[", "")
                    .replace("]", "")
                    .replace(/;/g, ":");
                u.ipv6uri = true
            }
            return u
        }
    }, {}],
    52: [function (require, module, exports) {
        (function (global) {
            exports.XMLHttpRequest = {};
            exports.window = {
                window: {},
                document: {
                    lastModified: 1388954399,
                    getElementsByTagName: function () {
                        return []
                    }
                },
                location: {
                    href: ""
                }
            };
            exports.window.window = exports.window;
            exports.array = function () {
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                var arrInst, e, __, that = this,
                    PHPJS_Array = function e() {};
                mainArgs = arguments, p = this.php_js, _indexOf = function (e, t, r) {
                    var n = t || 0,
                        i = !r,
                        o = this.length;
                    while (n < o) {
                        if (this[n] === e || i && this[n] == e) {
                            return n
                        }
                        n++
                    }
                    return -1
                };
                if (!p.Relator) {
                    p.Relator = function () {
                        function e(e) {
                            var t = 0,
                                r = this.length;
                            while (t < r) {
                                if (this[t] === e) {
                                    return t
                                }
                                t++
                            }
                            return -1
                        }

                        function t() {
                            var r = [],
                                n = [];
                            if (!r.indexOf) {
                                r.indexOf = e
                            }
                            return {
                                $: function () {
                                    return t()
                                },
                                constructor: function (e) {
                                    var t = r.indexOf(e);
                                    ~t ? n[t] : n[r.push(e) - 1] = {};
                                    this.method(e)
                                        .that = e;
                                    return this.method(e)
                                },
                                method: function (e) {
                                    return n[r.indexOf(e)]
                                }
                            }
                        }
                        return t()
                    }()
                }
                if (p && p.ini && p.ini["phpjs.return_phpjs_arrays"].local_value.toLowerCase() === "on") {
                    if (!p.PHPJS_Array) {
                        __ = p.ArrayRelator = p.ArrayRelator || p.Relator.$();
                        p.PHPJS_Array = function e() {
                            var t = __.constructor(this),
                                r = arguments,
                                n = 0,
                                i, o;
                            r = r.length === 1 && r[0] && typeof r[0] === "object" && r[0].length && !r[0].propertyIsEnumerable(
                                "length") ? r[0] : r;
                            if (!t.objectChain) {
                                t.objectChain = r;
                                t.object = {};
                                t.keys = [];
                                t.values = []
                            }
                            for (i = r.length; n < i; n++) {
                                for (o in r[n]) {
                                    this[o] = t.object[o] = r[n][o];
                                    t.keys[t.keys.length] = o;
                                    t.values[t.values.length] = r[n][o];
                                    break
                                }
                            }
                        };
                        e = p.PHPJS_Array.prototype;
                        e.change_key_case = function (e) {
                            var t = __.method(this),
                                r, n, i = 0,
                                o = t.keys.length,
                                s = !e || e === "CASE_LOWER" ? "toLowerCase" : "toUpperCase";
                            while (i < o) {
                                r = t.keys[i];
                                n = t.keys[i] = t.keys[i][s]();
                                if (r !== n) {
                                    this[r] = t.object[r] = t.objectChain[i][r] = null;
                                    delete this[r];
                                    delete t.object[r];
                                    delete t.objectChain[i][r];
                                    this[n] = t.object[n] = t.objectChain[i][n] = t.values[i]
                                }
                                i++
                            }
                            return this
                        };
                        e.flip = function () {
                            var e = __.method(this),
                                t = 0,
                                r = e.keys.length;
                            while (t < r) {
                                oldkey = e.keys[t];
                                newkey = e.values[t];
                                if (oldkey !== newkey) {
                                    this[oldkey] = e.object[oldkey] = e.objectChain[t][oldkey] = null;
                                    delete this[oldkey];
                                    delete e.object[oldkey];
                                    delete e.objectChain[t][oldkey];
                                    this[newkey] = e.object[newkey] = e.objectChain[t][newkey] = oldkey;
                                    e.keys[t] = newkey
                                }
                                t++
                            }
                            return this
                        };
                        e.walk = function (funcname, userdata) {
                            var _ = __.method(this),
                                obj, func, ini, i = 0,
                                kl = 0;
                            try {
                                if (typeof funcname === "function") {
                                    for (i = 0, kl = _.keys.length; i < kl; i++) {
                                        if (arguments.length > 1) {
                                            funcname(_.values[i], _.keys[i], userdata)
                                        } else {
                                            funcname(_.values[i], _.keys[i])
                                        }
                                    }
                                } else if (typeof funcname === "string") {
                                    this.php_js = this.php_js || {};
                                    this.php_js.ini = this.php_js.ini || {};
                                    ini = this.php_js.ini["phpjs.no-eval"];
                                    if (ini && (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value
                                            .toLowerCase() !== "off"))) {
                                        if (arguments.length > 1) {
                                            for (i = 0, kl = _.keys.length; i < kl; i++) {
                                                this.window[funcname](_.values[i], _.keys[i], userdata)
                                            }
                                        } else {
                                            for (i = 0, kl = _.keys.length; i < kl; i++) {
                                                this.window[funcname](_.values[i], _.keys[i])
                                            }
                                        }
                                    } else {
                                        if (arguments.length > 1) {
                                            for (i = 0, kl = _.keys.length; i < kl; i++) {
                                                eval(funcname + "(_.values[i], _.keys[i], userdata)")
                                            }
                                        } else {
                                            for (i = 0, kl = _.keys.length; i < kl; i++) {
                                                eval(funcname + "(_.values[i], _.keys[i])")
                                            }
                                        }
                                    }
                                } else if (funcname && typeof funcname === "object" && funcname.length === 2) {
                                    obj = funcname[0];
                                    func = funcname[1];
                                    if (arguments.length > 1) {
                                        for (i = 0, kl = _.keys.length; i < kl; i++) {
                                            obj[func](_.values[i], _.keys[i], userdata)
                                        }
                                    } else {
                                        for (i = 0, kl = _.keys.length; i < kl; i++) {
                                            obj[func](_.values[i], _.keys[i])
                                        }
                                    }
                                } else {
                                    return false
                                }
                            } catch (e) {
                                return false
                            }
                            return this
                        };
                        e.keys = function (e, t) {
                            var r = __.method(this),
                                n, i = typeof e !== "undefined",
                                o = [],
                                s = !!t;
                            if (!i) {
                                return r.keys
                            }
                            while ((n = _indexOf(r.values, n, s)) !== -1) {
                                o[o.length] = r.keys[n]
                            }
                            return o
                        };
                        e.values = function () {
                            var e = __.method(this);
                            return e.values
                        };
                        e.search = function (e, t) {
                            var r = __.method(this),
                                n = !!t,
                                i = r.values,
                                o, s, a, u;
                            if (typeof e === "object" && e.exec) {
                                if (!n) {
                                    u = "i" + (e.global ? "g" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "");
                                    e = new RegExp(e.source, u)
                                }
                                for (o = 0, s = i.length; o < s; o++) {
                                    a = i[o];
                                    if (e.test(a)) {
                                        return r.keys[o]
                                    }
                                }
                                return false
                            }
                            for (o = 0, s = i.length; o < s; o++) {
                                a = i[o];
                                if (n && a === e || !n && a == e) {
                                    return r.keys[o]
                                }
                            }
                            return false
                        };
                        e.sum = function () {
                            var e = __.method(this),
                                t = 0,
                                r = 0,
                                n = e.keys.length;
                            while (r < n) {
                                if (!isNaN(parseFloat(e.values[r]))) {
                                    t += parseFloat(e.values[r])
                                }
                                r++
                            }
                            return t
                        };
                        e.foreach = function (e) {
                            var t = __.method(this),
                                r = 0,
                                n = t.keys.length;
                            while (r < n) {
                                if (e.length === 1) {
                                    e(t.values[r])
                                } else {
                                    e(t.keys[r], t.values[r])
                                }
                                r++
                            }
                            return this
                        };
                        e.list = function () {
                            var e, t = __.method(this),
                                r = 0,
                                n = arguments.length;
                            while (r < n) {
                                e = t.keys[r];
                                if (e && e.length === parseInt(e, 10)
                                    .toString()
                                    .length && parseInt(e, 10) < n) {
                                    that.window[arguments[e]] = t.values[e]
                                }
                                r++
                            }
                            return this
                        };
                        e.forEach = function (e) {
                            var t = __.method(this),
                                r = 0,
                                n = t.keys.length;
                            while (r < n) {
                                e(t.values[r], t.keys[r], this);
                                r++
                            }
                            return this
                        };
                        e.$object = function () {
                            var e = __.method(this);
                            return e.object
                        };
                        e.$objectChain = function () {
                            var e = __.method(this);
                            return e.objectChain
                        }
                    }
                    PHPJS_Array.prototype = p.PHPJS_Array.prototype;
                    arrInst = new PHPJS_Array;
                    p.PHPJS_Array.apply(arrInst, mainArgs);
                    return arrInst
                }
                return Array.prototype.slice.call(mainArgs)
            };
            exports.array_change_key_case = function (e, t) {
                var r, n, i = {};
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    return e
                }
                if (e && typeof e === "object" && e.change_key_case) {
                    return e.change_key_case(t)
                }
                if (e && typeof e === "object") {
                    r = !t || t === "CASE_LOWER" ? "toLowerCase" : "toUpperCase";
                    for (n in e) {
                        i[n[r]()] = e[n]
                    }
                    return i
                }
                return false
            };
            exports.array_chunk = function (e, t, r) {
                var n, i = "",
                    o = 0,
                    s = -1,
                    a = e.length || 0,
                    u = [];
                if (t < 1) {
                    return null
                }
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    if (r) {
                        while (o < a) {
                            (n = o % t) ? u[s][o] = e[o]: u[++s] = {}, u[s][o] = e[o];
                            o++
                        }
                    } else {
                        while (o < a) {
                            (n = o % t) ? u[s][n] = e[o]: u[++s] = [e[o]];
                            o++
                        }
                    }
                } else {
                    if (r) {
                        for (i in e) {
                            if (e.hasOwnProperty(i)) {
                                (n = o % t) ? u[s][i] = e[i]: u[++s] = {}, u[s][i] = e[i];
                                o++
                            }
                        }
                    } else {
                        for (i in e) {
                            if (e.hasOwnProperty(i)) {
                                (n = o % t) ? u[s][n] = e[i]: u[++s] = [e[i]];
                                o++
                            }
                        }
                    }
                }
                return u
            };
            exports.array_combine = function (e, t) {
                var r = {},
                    n = e && e.length,
                    i = 0;
                if (typeof e !== "object" || typeof t !== "object" || typeof n !== "number" || typeof t.length !== "number" || !n) {
                    return false
                }
                if (n != t.length) {
                    return false
                }
                for (i = 0; i < n; i++) {
                    r[e[i]] = t[i]
                }
                return r
            };
            exports.array_count_values = function (e) {
                var t = {},
                    r = "",
                    n = "";
                var i = function (e) {
                    var t = typeof e;
                    t = t.toLowerCase();
                    if (t === "object") {
                        t = "array"
                    }
                    return t
                };
                var o = function (e) {
                    switch (typeof e) {
                    case "number":
                        if (Math.floor(e) !== e) {
                            return
                        }
                    case "string":
                        if (e in this && this.hasOwnProperty(e)) {
                            ++this[e]
                        } else {
                            this[e] = 1
                        }
                    }
                };
                n = i(e);
                if (n === "array") {
                    for (r in e) {
                        if (e.hasOwnProperty(r)) {
                            o.call(t, e[r])
                        }
                    }
                }
                return t
            };
            exports.array_diff = function (e) {
                var t = {},
                    r = arguments.length,
                    n = "",
                    i = 1,
                    o = "",
                    s = {};
                e: for (n in e) {
                    for (i = 1; i < r; i++) {
                        s = arguments[i];
                        for (o in s) {
                            if (s[o] === e[n]) {
                                continue e
                            }
                        }
                        t[n] = e[n]
                    }
                }
                return t
            };
            exports.array_diff_assoc = function (e) {
                var t = {},
                    r = arguments.length,
                    n = "",
                    i = 1,
                    o = "",
                    s = {};
                e: for (n in e) {
                    for (i = 1; i < r; i++) {
                        s = arguments[i];
                        for (o in s) {
                            if (s[o] === e[n] && o === n) {
                                continue e
                            }
                        }
                        t[n] = e[n]
                    }
                }
                return t
            };
            exports.array_diff_key = function (e) {
                var t = arguments.length,
                    r = {},
                    n = "",
                    i = 1,
                    o = "",
                    s = {};
                e: for (n in e) {
                    for (i = 1; i < t; i++) {
                        s = arguments[i];
                        for (o in s) {
                            if (o === n) {
                                continue e
                            }
                        }
                        r[n] = e[n]
                    }
                }
                return r
            };
            exports.array_diff_uassoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = arguments[r],
                    i = {},
                    o = 1,
                    s = "",
                    a = "";
                n = typeof n === "string" ? this.window[n] : Object.prototype.toString.call(n) === "[object Array]" ? this.window[n[0]][n[1]] :
                    n;
                e: for (s in e) {
                    for (o = 1; o < r; o++) {
                        i = arguments[o];
                        for (a in i) {
                            if (i[a] === e[s] && n(a, s) === 0) {
                                continue e
                            }
                        }
                        t[s] = e[s]
                    }
                }
                return t
            };
            exports.array_diff_ukey = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = arguments[r],
                    i = {},
                    o = 1,
                    s = "",
                    a = "";
                n = typeof n === "string" ? this.window[n] : Object.prototype.toString.call(n) === "[object Array]" ? this.window[n[0]][n[1]] :
                    n;
                e: for (s in e) {
                    for (o = 1; o < r; o++) {
                        i = arguments[o];
                        for (a in i) {
                            if (n(a, s) === 0) {
                                continue e
                            }
                        }
                        t[s] = e[s]
                    }
                }
                return t
            };
            exports.array_fill = function (e, t, r) {
                var n, i = {};
                if (!isNaN(e) && !isNaN(t)) {
                    for (n = 0; n < t; n++) {
                        i[n + e] = r
                    }
                }
                return i
            };
            exports.array_fill_keys = function (e, t) {
                var r = {},
                    n = "";
                for (n in e) {
                    r[e[n]] = t
                }
                return r
            };
            exports.array_filter = function (e, t) {
                var r = {},
                    n;
                t = t || function (e) {
                    return e
                };
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    r = []
                }
                for (n in e) {
                    if (t(e[n])) {
                        r[n] = e[n]
                    }
                }
                return r
            };
            exports.array_intersect = function (e) {
                var t = {},
                    r = arguments.length,
                    n = r - 1,
                    i = "",
                    o = {},
                    s = 0,
                    a = "";
                e: for (i in e) {
                    t: for (s = 1; s < r; s++) {
                        o = arguments[s];
                        for (a in o) {
                            if (o[a] === e[i]) {
                                if (s === n) {
                                    t[i] = e[i]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_intersect_assoc = function (e) {
                var t = {},
                    r = arguments.length,
                    n = r - 1,
                    i = "",
                    o = {},
                    s = 0,
                    a = "";
                e: for (i in e) {
                    t: for (s = 1; s < r; s++) {
                        o = arguments[s];
                        for (a in o) {
                            if (o[a] === e[i] && a === i) {
                                if (s === n) {
                                    t[i] = e[i]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_intersect_key = function (e) {
                var t = {},
                    r = arguments.length,
                    n = r - 1,
                    i = "",
                    o = {},
                    s = 0,
                    a = "";
                e: for (i in e) {
                    t: for (s = 1; s < r; s++) {
                        o = arguments[s];
                        for (a in o) {
                            if (a === i) {
                                if (s === n) {
                                    t[i] = e[i]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_intersect_uassoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 1,
                    i = arguments[r],
                    o = "",
                    s = 1,
                    a = {},
                    u = "";
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                e: for (o in e) {
                    t: for (s = 1; s < r; s++) {
                        a = arguments[s];
                        for (u in a) {
                            if (a[u] === e[o] && i(u, o) === 0) {
                                if (s === n) {
                                    t[o] = e[o]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_intersect_ukey = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 1,
                    i = arguments[r],
                    o = "",
                    s = 1,
                    a = {},
                    u = "";
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                e: for (o in e) {
                    t: for (s = 1; s < r; s++) {
                        a = arguments[s];
                        for (u in a) {
                            if (i(u, o) === 0) {
                                if (s === n) {
                                    t[o] = e[o]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_key_exists = function (e, t) {
                if (!t || t.constructor !== Array && t.constructor !== Object) {
                    return false
                }
                return e in t
            };
            exports.array_keys = function (e, t, r) {
                var n = typeof t !== "undefined",
                    i = [],
                    o = !!r,
                    s = true,
                    a = "";
                if (e && typeof e === "object" && e.change_key_case) {
                    return e.keys(t, r)
                }
                for (a in e) {
                    if (e.hasOwnProperty(a)) {
                        s = true;
                        if (n) {
                            if (o && e[a] !== t) {
                                s = false
                            } else if (e[a] != t) {
                                s = false
                            }
                        }
                        if (s) {
                            i[i.length] = a
                        }
                    }
                }
                return i
            };
            exports.array_map = function (e) {
                var t = arguments.length,
                    r = arguments,
                    n = this.window,
                    i = null,
                    o = e,
                    s = r[1].length,
                    a = 0,
                    u = 1,
                    c = 0,
                    l = [],
                    f = [];
                while (a < s) {
                    while (u < t) {
                        l[c++] = r[u++][a]
                    }
                    c = 0;
                    u = 1;
                    if (e) {
                        if (typeof e === "string") {
                            o = n[e]
                        } else if (typeof e === "object" && e.length) {
                            i = typeof e[0] === "string" ? n[e[0]] : e[0];
                            if (typeof i === "undefined") {
                                throw "Object not found: " + e[0]
                            }
                            o = typeof e[1] === "string" ? i[e[1]] : e[1]
                        }
                        f[a++] = o.apply(i, l)
                    } else {
                        f[a++] = l
                    }
                    l = []
                }
                return f
            };
            exports.array_merge = function () {
                var e = Array.prototype.slice.call(arguments),
                    t = e.length,
                    r, n = {},
                    i = "",
                    o = 0,
                    s = 0,
                    a = 0,
                    u = 0,
                    c = Object.prototype.toString,
                    l = true;
                for (a = 0; a < t; a++) {
                    if (c.call(e[a]) !== "[object Array]") {
                        l = false;
                        break
                    }
                }
                if (l) {
                    l = [];
                    for (a = 0; a < t; a++) {
                        l = l.concat(e[a])
                    }
                    return l
                }
                for (a = 0, u = 0; a < t; a++) {
                    r = e[a];
                    if (c.call(r) === "[object Array]") {
                        for (s = 0, o = r.length; s < o; s++) {
                            n[u++] = r[s]
                        }
                    } else {
                        for (i in r) {
                            if (r.hasOwnProperty(i)) {
                                if (parseInt(i, 10) + "" === i) {
                                    n[u++] = r[i]
                                } else {
                                    n[i] = r[i]
                                }
                            }
                        }
                    }
                }
                return n
            };
            exports.array_multisort = function (e) {
                var t, r, n, i, o, s, a, u, c, l, f;
                var p = [0];
                var h = [];
                var d = [];
                var g = [];
                var y = arguments;
                var v = {
                    SORT_REGULAR: 16,
                    SORT_NUMERIC: 17,
                    SORT_STRING: 18,
                    SORT_ASC: 32,
                    SORT_DESC: 40
                };
                var m = function (e, t) {
                    return d.shift()
                };
                var b = [
                    [function (e, t) {
                        g.push(e > t ? 1 : e < t ? -1 : 0);
                        return e > t ? 1 : e < t ? -1 : 0
                    }, function (e, t) {
                        g.push(t > e ? 1 : t < e ? -1 : 0);
                        return t > e ? 1 : t < e ? -1 : 0
                    }],
                    [function (e, t) {
                        g.push(e - t);
                        return e - t
                    }, function (e, t) {
                        g.push(t - e);
                        return t - e
                    }],
                    [function (e, t) {
                        g.push(e + "" > t + "" ? 1 : e + "" < t + "" ? -1 : 0);
                        return e + "" > t + "" ? 1 : e + "" < t + "" ? -1 : 0
                    }, function (e, t) {
                        g.push(t + "" > e + "" ? 1 : t + "" < e + "" ? -1 : 0);
                        return t + "" > e + "" ? 1 : t + "" < e + "" ? -1 : 0
                    }]
                ];
                var _ = [
                    []
                ];
                var w = [
                    []
                ];
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    _[0] = e
                } else if (e && typeof e === "object") {
                    for (r in e) {
                        if (e.hasOwnProperty(r)) {
                            w[0].push(r);
                            _[0].push(e[r])
                        }
                    }
                } else {
                    return false
                }
                var C = _[0].length;
                var k = [0, C];
                var A = arguments.length;
                for (n = 1; n < A; n++) {
                    if (Object.prototype.toString.call(arguments[n]) === "[object Array]") {
                        _[n] = arguments[n];
                        p[n] = 0;
                        if (arguments[n].length !== C) {
                            return false
                        }
                    } else if (arguments[n] && typeof arguments[n] === "object") {
                        w[n] = [];
                        _[n] = [];
                        p[n] = 0;
                        for (r in arguments[n]) {
                            if (arguments[n].hasOwnProperty(r)) {
                                w[n].push(r);
                                _[n].push(arguments[n][r])
                            }
                        }
                        if (_[n].length !== C) {
                            return false
                        }
                    } else if (typeof arguments[n] === "string") {
                        var E = p.pop();
                        if (typeof v[arguments[n]] === "undefined" || (v[arguments[n]] >>> 4 & E >>> 4) > 0) {
                            return false
                        }
                        p.push(E + v[arguments[n]])
                    } else {
                        return false
                    }
                }
                for (r = 0; r !== C; r++) {
                    h.push(true)
                }
                for (r in _) {
                    if (_.hasOwnProperty(r)) {
                        c = [];
                        l = [];
                        u = 0;
                        d = [];
                        g = [];
                        if (k.length === 0) {
                            if (Object.prototype.toString.call(arguments[r]) === "[object Array]") {
                                y[r] = _[r]
                            } else {
                                for (i in arguments[r]) {
                                    if (arguments[r].hasOwnProperty(i)) {
                                        delete arguments[r][i]
                                    }
                                }
                                s = _[r].length;
                                for (n = 0, a = 0; n < s; n++) {
                                    a = w[r][n];
                                    y[r][a] = _[r][n]
                                }
                            }
                            delete _[r];
                            delete w[r];
                            continue
                        }
                        var x = b[p[r] & 3][(p[r] & 8) > 0 ? 1 : 0];
                        for (o = 0; o !== k.length; o += 2) {
                            l = _[r].slice(k[o], k[o + 1] + 1);
                            l.sort(x);
                            c[o] = [].concat(g);
                            u = k[o];
                            for (t in l) {
                                if (l.hasOwnProperty(t)) {
                                    _[r][u] = l[t];
                                    u++
                                }
                            }
                        }
                        x = m;
                        for (n in _) {
                            if (_.hasOwnProperty(n)) {
                                if (_[n] === _[r]) {
                                    continue
                                }
                                for (o = 0; o !== k.length; o += 2) {
                                    l = _[n].slice(k[o], k[o + 1] + 1);
                                    d = [].concat(c[o]);
                                    l.sort(x);
                                    u = k[o];
                                    for (t in l) {
                                        if (l.hasOwnProperty(t)) {
                                            _[n][u] = l[t];
                                            u++
                                        }
                                    }
                                }
                            }
                        }
                        for (n in w) {
                            if (w.hasOwnProperty(n)) {
                                for (o = 0; o !== k.length; o += 2) {
                                    l = w[n].slice(k[o], k[o + 1] + 1);
                                    d = [].concat(c[o]);
                                    l.sort(x);
                                    u = k[o];
                                    for (t in l) {
                                        if (l.hasOwnProperty(t)) {
                                            w[n][u] = l[t];
                                            u++
                                        }
                                    }
                                }
                            }
                        }
                        f = null;
                        k = [];
                        for (n in _[r]) {
                            if (_[r].hasOwnProperty(n)) {
                                if (!h[n]) {
                                    if (k.length & 1) {
                                        k.push(n - 1)
                                    }
                                    f = null;
                                    continue
                                }
                                if (!(k.length & 1)) {
                                    if (f !== null) {
                                        if (_[r][n] === f) {
                                            k.push(n - 1)
                                        } else {
                                            h[n] = false
                                        }
                                    }
                                    f = _[r][n]
                                } else {
                                    if (_[r][n] !== f) {
                                        k.push(n - 1);
                                        f = _[r][n]
                                    }
                                }
                            }
                        }
                        if (k.length & 1) {
                            k.push(n)
                        }
                        if (Object.prototype.toString.call(arguments[r]) === "[object Array]") {
                            y[r] = _[r]
                        } else {
                            for (n in arguments[r]) {
                                if (arguments[r].hasOwnProperty(n)) {
                                    delete arguments[r][n]
                                }
                            }
                            s = _[r].length;
                            for (n = 0, a = 0; n < s; n++) {
                                a = w[r][n];
                                y[r][a] = _[r][n]
                            }
                        }
                        delete _[r];
                        delete w[r]
                    }
                }
                return true
            };
            exports.array_pad = function (e, t, r) {
                var n = [],
                    i = [],
                    o, s = 0,
                    a = 0;
                if (Object.prototype.toString.call(e) === "[object Array]" && !isNaN(t)) {
                    o = t < 0 ? t * -1 : t;
                    s = o - e.length;
                    if (s > 0) {
                        for (a = 0; a < s; a++) {
                            i[a] = r
                        }
                        n = t < 0 ? i.concat(e) : e.concat(i)
                    } else {
                        n = e
                    }
                }
                return n
            };
            exports.array_pop = function (e) {
                var t = "",
                    r = "";
                if (e.hasOwnProperty("length")) {
                    if (!e.length) {
                        return null
                    }
                    return e.pop()
                } else {
                    for (t in e) {
                        if (e.hasOwnProperty(t)) {
                            r = t
                        }
                    }
                    if (r) {
                        var n = e[r];
                        delete e[r];
                        return n
                    } else {
                        return null
                    }
                }
            };
            exports.array_product = function (e) {
                var t = 0,
                    r = 1,
                    n = 0;
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    return null
                }
                n = e.length;
                while (t < n) {
                    r *= !isNaN(e[t]) ? e[t] : 0;
                    t++
                }
                return r
            };
            exports.array_push = function (e) {
                var t = 0,
                    r = "",
                    n = arguments,
                    i = n.length,
                    o = /^\d$/,
                    s = 0,
                    a = 0,
                    u = 0;
                if (e.hasOwnProperty("length")) {
                    for (t = 1; t < i; t++) {
                        e[e.length] = n[t]
                    }
                    return e.length
                }
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        ++u;
                        if (r.search(o) !== -1) {
                            s = parseInt(r, 10);
                            a = s > a ? s : a
                        }
                    }
                }
                for (t = 1; t < i; t++) {
                    e[++a] = n[t]
                }
                return u + t - 1
            };
            exports.array_rand = function (e, t) {
                var r = [];
                var n = t || 1;
                var i = function (e, t) {
                    var r = false,
                        n = 0,
                        i = e.length;
                    while (n < i) {
                        if (e[n] === t) {
                            r = true;
                            break
                        }
                        n++
                    }
                    return r
                };
                if (Object.prototype.toString.call(e) === "[object Array]" && n <= e.length) {
                    while (true) {
                        var o = Math.floor(Math.random() * e.length);
                        if (r.length === n) {
                            break
                        }
                        if (!i(r, o)) {
                            r.push(o)
                        }
                    }
                } else {
                    r = null
                }
                return n == 1 ? r.join() : r
            };
            exports.array_reduce = function (e, t) {
                var r = e.length;
                var n = 0,
                    i = 0;
                var o = [];
                for (i = 0; i < r; i += 2) {
                    o[0] = e[i];
                    if (e[i + 1]) {
                        o[1] = e[i + 1]
                    } else {
                        o[1] = 0
                    }
                    n += t.apply(null, o);
                    o = []
                }
                return n
            };
            exports.array_replace = function (e) {
                var t = {},
                    r = 0,
                    n = "",
                    i = arguments.length;
                if (i < 2) {
                    throw new Error("There should be at least 2 arguments passed to array_replace()")
                }
                for (n in e) {
                    t[n] = e[n]
                }
                for (r = 1; r < i; r++) {
                    for (n in arguments[r]) {
                        t[n] = arguments[r][n]
                    }
                }
                return t
            };
            exports.array_replace_recursive = function (e) {
                var t = {},
                    r = 0,
                    n = "",
                    i = arguments.length;
                if (i < 2) {
                    throw new Error("There should be at least 2 arguments passed to array_replace_recursive()")
                }
                for (n in e) {
                    t[n] = e[n]
                }
                for (r = 1; r < i; r++) {
                    for (n in arguments[r]) {
                        if (t[n] && typeof t[n] === "object") {
                            t[n] = this.array_replace_recursive(t[n], arguments[r][n])
                        } else {
                            t[n] = arguments[r][n]
                        }
                    }
                }
                return t
            };
            exports.array_reverse = function (e, t) {
                var r = Object.prototype.toString.call(e) === "[object Array]",
                    n = t ? {} : [],
                    i;
                if (r && !t) {
                    return e.slice(0)
                        .reverse()
                }
                if (t) {
                    var o = [];
                    for (i in e) {
                        o.push(i)
                    }
                    var s = o.length;
                    while (s--) {
                        i = o[s];
                        n[i] = e[i]
                    }
                } else {
                    for (i in e) {
                        n.unshift(e[i])
                    }
                }
                return n
            };
            exports.array_shift = function (e) {
                var t = false,
                    r = undefined,
                    n = "",
                    i = /^\d$/,
                    o = -1,
                    s = function (e, t, r) {
                        if (e[t] !== undefined) {
                            var n = t;
                            t += 1;
                            if (t === r) {
                                t += 1
                            }
                            t = s(e, t, r);
                            e[t] = e[n];
                            delete e[n]
                        }
                        return t
                    };
                if (e.length === 0) {
                    return null
                }
                if (e.length > 0) {
                    return e.shift()
                }
            };
            exports.array_sum = function (e) {
                var t, r = 0;
                if (e && typeof e === "object" && e.change_key_case) {
                    return e.sum.apply(e, Array.prototype.slice.call(arguments, 0))
                }
                if (typeof e !== "object") {
                    return null
                }
                for (t in e) {
                    if (!isNaN(parseFloat(e[t]))) {
                        r += parseFloat(e[t])
                    }
                }
                return r
            };
            exports.array_udiff = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = arguments[r],
                    i = "",
                    o = 1,
                    s = "",
                    a = "";
                n = typeof n === "string" ? this.window[n] : Object.prototype.toString.call(n) === "[object Array]" ? this.window[n[0]][n[1]] :
                    n;
                e: for (s in e) {
                    for (o = 1; o < r; o++) {
                        i = arguments[o];
                        for (a in i) {
                            if (n(i[a], e[s]) === 0) {
                                continue e
                            }
                        }
                        t[s] = e[s]
                    }
                }
                return t
            };
            exports.array_udiff_assoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = arguments[r],
                    i = {},
                    o = 1,
                    s = "",
                    a = "";
                n = typeof n === "string" ? this.window[n] : Object.prototype.toString.call(n) === "[object Array]" ? this.window[n[0]][n[1]] :
                    n;
                e: for (s in e) {
                    for (o = 1; o < r; o++) {
                        i = arguments[o];
                        for (a in i) {
                            if (n(i[a], e[s]) === 0 && a === s) {
                                continue e
                            }
                        }
                        t[s] = e[s]
                    }
                }
                return t
            };
            exports.array_udiff_uassoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 1,
                    i = arguments[r],
                    o = arguments[n],
                    s = "",
                    a = 1,
                    u = "",
                    c = {};
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                o = typeof o === "string" ? this.window[o] : Object.prototype.toString.call(o) === "[object Array]" ? this.window[o[0]][o[1]] :
                    o;
                e: for (s in e) {
                    for (a = 1; a < n; a++) {
                        c = arguments[a];
                        for (u in c) {
                            if (o(c[u], e[s]) === 0 && i(u, s) === 0) {
                                continue e
                            }
                        }
                        t[s] = e[s]
                    }
                }
                return t
            };
            exports.array_uintersect = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 1,
                    i = arguments[r],
                    o = "",
                    s = 1,
                    a = {},
                    u = "";
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                e: for (o in e) {
                    t: for (s = 1; s < r; s++) {
                        a = arguments[s];
                        for (u in a) {
                            if (i(a[u], e[o]) === 0) {
                                if (s === n) {
                                    t[o] = e[o]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_uintersect_assoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 2,
                    i = arguments[r],
                    o = "",
                    s = 1,
                    a = {},
                    u = "";
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                e: for (o in e) {
                    t: for (s = 1; s < r; s++) {
                        a = arguments[s];
                        for (u in a) {
                            if (u === o && i(a[u], e[o]) === 0) {
                                if (s === n) {
                                    t[o] = e[o]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_uintersect_uassoc = function (e) {
                var t = {},
                    r = arguments.length - 1,
                    n = r - 1,
                    i = arguments[r],
                    o = arguments[n],
                    s = "",
                    a = 1,
                    u = "",
                    c = {};
                i = typeof i === "string" ? this.window[i] : Object.prototype.toString.call(i) === "[object Array]" ? this.window[i[0]][i[1]] :
                    i;
                o = typeof o === "string" ? this.window[o] : Object.prototype.toString.call(o) === "[object Array]" ? this.window[o[0]][o[1]] :
                    o;
                e: for (s in e) {
                    t: for (a = 1; a < n; a++) {
                        c = arguments[a];
                        for (u in c) {
                            if (o(c[u], e[s]) === 0 && i(u, s) === 0) {
                                if (a === arguments.length - 3) {
                                    t[s] = e[s]
                                }
                                continue t
                            }
                        }
                        continue e
                    }
                }
                return t
            };
            exports.array_unique = function (e) {
                var t = "",
                    r = {},
                    n = "";
                var i = function (e, t) {
                    var r = "";
                    for (r in t) {
                        if (t.hasOwnProperty(r)) {
                            if (t[r] + "" === e + "") {
                                return r
                            }
                        }
                    }
                    return false
                };
                for (t in e) {
                    if (e.hasOwnProperty(t)) {
                        n = e[t];
                        if (false === i(n, r)) {
                            r[t] = n
                        }
                    }
                }
                return r
            };
            exports.array_unshift = function (e) {
                var t = arguments.length;
                while (--t !== 0) {
                    arguments[0].unshift(arguments[t])
                }
                return arguments[0].length
            };
            exports.array_values = function (e) {
                var t = [],
                    r = "";
                if (e && typeof e === "object" && e.change_key_case) {
                    return e.values()
                }
                for (r in e) {
                    t[t.length] = e[r]
                }
                return t
            };
            exports.array_walk_recursive = function (array, funcname, userdata) {
                var key;
                if (typeof array !== "object") {
                    return false
                }
                for (key in array) {
                    if (typeof array[key] === "object") {
                        return this.array_walk_recursive(array[key], funcname, userdata)
                    }
                    if (typeof userdata !== "undefined") {
                        eval(funcname + "( array [key] , key , userdata  )")
                    } else {
                        eval(funcname + "(  userdata ) ")
                    }
                }
                return true
            };
            exports.compact = function () {
                var e = {},
                    t = this;
                var r = function (n) {
                    var i = 0,
                        o = n.length,
                        s = "";
                    for (i = 0; i < o; i++) {
                        s = n[i];
                        if (Object.prototype.toString.call(s) === "[object Array]") {
                            r(s)
                        } else {
                            if (typeof t.window[s] !== "undefined") {
                                e[s] = t.window[s]
                            }
                        }
                    }
                    return true
                };
                r(arguments);
                return e
            };
            exports.count = function (e, t) {
                var r, n = 0;
                if (e === null || typeof e === "undefined") {
                    return 0
                } else if (e.constructor !== Array && e.constructor !== Object) {
                    return 1
                }
                if (t === "COUNT_RECURSIVE") {
                    t = 1
                }
                if (t != 1) {
                    t = 0
                }
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        n++;
                        if (t == 1 && e[r] && (e[r].constructor === Array || e[r].constructor === Object)) {
                            n += this.count(e[r], 1)
                        }
                    }
                }
                return n
            };
            exports.current = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r.indexOf(e);
                var i = r[n + 1];
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    return e[i] || false
                }
                var o = 0;
                for (var s in e) {
                    if (o === i) {
                        return e[s]
                    }
                    o++
                }
                return false
            };
            exports.each = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r.indexOf(e);
                var i = r[n + 1];
                var o = 0;
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var s = 0;
                    for (var a in e) {
                        if (s === i) {
                            r[n + 1] += 1;
                            if (each.returnArrayOnly) {
                                return [a, e[a]]
                            } else {
                                return {
                                    1: e[a],
                                    value: e[a],
                                    0: a,
                                    key: a
                                }
                            }
                        }
                        s++
                    }
                    return false
                }
                if (e.length === 0 || i === e.length) {
                    return false
                }
                o = i;
                r[n + 1] += 1;
                if (each.returnArrayOnly) {
                    return [o, e[o]]
                } else {
                    return {
                        1: e[o],
                        value: e[o],
                        0: o,
                        key: o
                    }
                }
            };
            exports.end = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r.indexOf(e);
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var i = 0;
                    var o;
                    for (var s in e) {
                        i++;
                        o = e[s]
                    }
                    if (i === 0) {
                        return false
                    }
                    r[n + 1] = i - 1;
                    return o
                }
                if (e.length === 0) {
                    return false
                }
                r[n + 1] = e.length - 1;
                return e[r[n + 1]]
            };
            exports.in_array = function (e, t, r) {
                var n = "",
                    i = !!r;
                if (i) {
                    for (n in t) {
                        if (t[n] === e) {
                            return true
                        }
                    }
                } else {
                    for (n in t) {
                        if (t[n] == e) {
                            return true
                        }
                    }
                }
                return false
            };
            exports.key = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r[r.indexOf(e) + 1];
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var i = 0;
                    for (var o in e) {
                        if (i === n) {
                            return o
                        }
                        i++
                    }
                    return false
                }
                if (e.length === 0) {
                    return false
                }
                return n
            };
            exports.next = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r.indexOf(e);
                var i = r[n + 1];
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var o = 0;
                    for (var s in e) {
                        if (o === i + 1) {
                            r[n + 1] += 1;
                            return e[s]
                        }
                        o++
                    }
                    return false
                }
                if (e.length === 0 || i === e.length - 1) {
                    return false
                }
                r[n + 1] += 1;
                return e[r[n + 1]]
            };
            exports.prev = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                var n = r.indexOf(e);
                var i = r[n + 1];
                if (r.indexOf(e) === -1 || i === 0) {
                    return false
                }
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var o = 0;
                    for (var s in e) {
                        if (o === i - 1) {
                            r[n + 1] -= 1;
                            return e[s]
                        }
                        o++
                    }
                }
                if (e.length === 0) {
                    return false
                }
                r[n + 1] -= 1;
                return e[r[n + 1]]
            };
            exports.range = function (e, t, r) {
                var n = [];
                var i, o, s;
                var a = r || 1;
                var u = false;
                if (!isNaN(e) && !isNaN(t)) {
                    i = e;
                    o = t
                } else if (isNaN(e) && isNaN(t)) {
                    u = true;
                    i = e.charCodeAt(0);
                    o = t.charCodeAt(0)
                } else {
                    i = isNaN(e) ? 0 : e;
                    o = isNaN(t) ? 0 : t
                }
                s = i > o ? false : true;
                if (s) {
                    while (i <= o) {
                        n.push(u ? String.fromCharCode(i) : i);
                        i += a
                    }
                } else {
                    while (i >= o) {
                        n.push(u ? String.fromCharCode(i) : i);
                        i -= a
                    }
                }
                return n
            };
            exports.reset = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.pointers = this.php_js.pointers || [];
                var t = function (e) {
                    for (var t = 0, r = this.length; t < r; t++) {
                        if (this[t] === e) {
                            return t
                        }
                    }
                    return -1
                };
                var r = this.php_js.pointers;
                if (!r.indexOf) {
                    r.indexOf = t
                }
                if (r.indexOf(e) === -1) {
                    r.push(e, 0)
                }
                var n = r.indexOf(e);
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    for (var i in e) {
                        if (r.indexOf(e) === -1) {
                            r.push(e, 0)
                        } else {
                            r[n + 1] = 0
                        }
                        return e[i]
                    }
                    return false
                }
                if (e.length === 0) {
                    return false
                }
                r[n + 1] = 0;
                return e[r[n + 1]]
            };
            exports.shuffle = function (e) {
                var t = [],
                    r = "",
                    n = 0,
                    i = false,
                    o = [];
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        t.push(e[r]);
                        if (i) {
                            delete e[r]
                        }
                    }
                }
                t.sort(function () {
                    return .5 - Math.random()
                });
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                i = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                o = i ? e : o;
                for (n = 0; n < t.length; n++) {
                    o[n] = t[n]
                }
                return i || o
            };
            exports.uasort = function (e, t) {
                var r = [],
                    n, i, o, s = "",
                    a = 0,
                    u = false,
                    c = {};
                if (typeof t === "string") {
                    t = this[t]
                } else if (Object.prototype.toString.call(t) === "[object Array]") {
                    t = this[t[0]][t[1]]
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                u = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                c = u ? e : c;
                for (s in e) {
                    if (e.hasOwnProperty(s)) {
                        r.push([s, e[s]]);
                        if (u) {
                            delete e[s]
                        }
                    }
                }
                r.sort(function (e, r) {
                    return t(e[1], r[1])
                });
                for (a = 0; a < r.length; a++) {
                    c[r[a][0]] = r[a][1]
                }
                return u || c
            };
            exports.uksort = function (e, t) {
                var r = {},
                    n = [],
                    i = 0,
                    o = "",
                    s = false,
                    a = {};
                if (typeof t === "string") {
                    t = this.window[t]
                }
                for (o in e) {
                    if (e.hasOwnProperty(o)) {
                        n.push(o)
                    }
                }
                try {
                    if (t) {
                        n.sort(t)
                    } else {
                        n.sort()
                    }
                } catch (e) {
                    return false
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                s = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                a = s ? e : a;
                for (i = 0; i < n.length; i++) {
                    o = n[i];
                    r[o] = e[o];
                    if (s) {
                        delete e[o]
                    }
                }
                for (i in r) {
                    if (r.hasOwnProperty(i)) {
                        a[i] = r[i]
                    }
                }
                return s || a
            };
            exports.usort = function (e, t) {
                var r = [],
                    n = "",
                    i = 0,
                    o = false,
                    s = {};
                if (typeof t === "string") {
                    t = this[t]
                } else if (Object.prototype.toString.call(t) === "[object Array]") {
                    t = this[t[0]][t[1]]
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                o = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                s = o ? e : s;
                for (n in e) {
                    if (e.hasOwnProperty(n)) {
                        r.push(e[n]);
                        if (o) {
                            delete e[n]
                        }
                    }
                }
                try {
                    r.sort(t)
                } catch (e) {
                    return false
                }
                for (i = 0; i < r.length; i++) {
                    s[i] = r[i]
                }
                return o || s
            };
            exports.checkdate = function (e, t, r) {
                return e > 0 && e < 13 && r > 0 && r < 32768 && t > 0 && t <= new Date(r, e, 0)
                    .getDate()
            };
            exports.date = function (e, t) {
                var r = this;
                var n, i;
                var o = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var s = /\\?(.?)/gi;
                var a = function (e, t) {
                    return i[e] ? i[e]() : t
                };
                var u = function (e, t) {
                    e = String(e);
                    while (e.length < t) {
                        e = "0" + e
                    }
                    return e
                };
                i = {
                    d: function () {
                        return u(i.j(), 2)
                    },
                    D: function () {
                        return i.l()
                            .slice(0, 3)
                    },
                    j: function () {
                        return n.getDate()
                    },
                    l: function () {
                        return o[i.w()] + "day"
                    },
                    N: function () {
                        return i.w() || 7
                    },
                    S: function () {
                        var e = i.j();
                        var t = e % 10;
                        if (t <= 3 && parseInt(e % 100 / 10, 10) == 1) {
                            t = 0
                        }
                        return ["st", "nd", "rd"][t - 1] || "th"
                    },
                    w: function () {
                        return n.getDay()
                    },
                    z: function () {
                        var e = new Date(i.Y(), i.n() - 1, i.j());
                        var t = new Date(i.Y(), 0, 1);
                        return Math.round((e - t) / 864e5)
                    },
                    W: function () {
                        var e = new Date(i.Y(), i.n() - 1, i.j() - i.N() + 3);
                        var t = new Date(e.getFullYear(), 0, 4);
                        return u(1 + Math.round((e - t) / 864e5 / 7), 2)
                    },
                    F: function () {
                        return o[6 + i.n()]
                    },
                    m: function () {
                        return u(i.n(), 2)
                    },
                    M: function () {
                        return i.F()
                            .slice(0, 3)
                    },
                    n: function () {
                        return n.getMonth() + 1
                    },
                    t: function () {
                        return new Date(i.Y(), i.n(), 0)
                            .getDate()
                    },
                    L: function () {
                        var e = i.Y();
                        return e % 4 === 0 & e % 100 !== 0 | e % 400 === 0
                    },
                    o: function () {
                        var e = i.n();
                        var t = i.W();
                        var r = i.Y();
                        return r + (e === 12 && t < 9 ? 1 : e === 1 && t > 9 ? -1 : 0)
                    },
                    Y: function () {
                        return n.getFullYear()
                    },
                    y: function () {
                        return i.Y()
                            .toString()
                            .slice(-2)
                    },
                    a: function () {
                        return n.getHours() > 11 ? "pm" : "am"
                    },
                    A: function () {
                        return i.a()
                            .toUpperCase()
                    },
                    B: function () {
                        var e = n.getUTCHours() * 3600;
                        var t = n.getUTCMinutes() * 60;
                        var r = n.getUTCSeconds();
                        return u(Math.floor((e + t + r + 3600) / 86.4) % 1e3, 3)
                    },
                    g: function () {
                        return i.G() % 12 || 12
                    },
                    G: function () {
                        return n.getHours()
                    },
                    h: function () {
                        return u(i.g(), 2)
                    },
                    H: function () {
                        return u(i.G(), 2)
                    },
                    i: function () {
                        return u(n.getMinutes(), 2)
                    },
                    s: function () {
                        return u(n.getSeconds(), 2)
                    },
                    u: function () {
                        return u(n.getMilliseconds() * 1e3, 6)
                    },
                    e: function () {
                        throw "Not supported (see source code of date() for timezone on how to add support)"
                    },
                    I: function () {
                        var e = new Date(i.Y(), 0);
                        var t = Date.UTC(i.Y(), 0);
                        var r = new Date(i.Y(), 6);
                        var n = Date.UTC(i.Y(), 6);
                        return e - t !== r - n ? 1 : 0
                    },
                    O: function () {
                        var e = n.getTimezoneOffset();
                        var t = Math.abs(e);
                        return (e > 0 ? "-" : "+") + u(Math.floor(t / 60) * 100 + t % 60, 4)
                    },
                    P: function () {
                        var e = i.O();
                        return e.substr(0, 3) + ":" + e.substr(3, 2)
                    },
                    T: function () {
                        return "UTC"
                    },
                    Z: function () {
                        return -n.getTimezoneOffset() * 60
                    },
                    c: function () {
                        return "Y-m-d\\TH:i:sP".replace(s, a)
                    },
                    r: function () {
                        return "D, d M Y H:i:s O".replace(s, a)
                    },
                    U: function () {
                        return n / 1e3 | 0
                    }
                };
                this.date = function (e, t) {
                    r = this;
                    n = t === undefined ? new Date : t instanceof Date ? new Date(t) : new Date(t * 1e3);
                    return e.replace(s, a)
                };
                return this.date(e, t)
            };
            exports.getdate = function (e) {
                var t = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
                var r = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
                    "December"
                ];
                var n = typeof e === "undefined" ? new Date : typeof e === "object" ? new Date(e) : new Date(e * 1e3);
                var i = n.getDay();
                var o = n.getMonth();
                var s = n.getFullYear();
                var a = {};
                a.seconds = n.getSeconds();
                a.minutes = n.getMinutes();
                a.hours = n.getHours();
                a.mday = n.getDate();
                a.wday = i;
                a.mon = o + 1;
                a.year = s;
                a.yday = Math.floor((n - new Date(s, 0, 1)) / 864e5);
                a.weekday = t[i] + "day";
                a.month = r[o];
                a["0"] = parseInt(n.getTime() / 1e3, 10);
                return a
            };
            exports.gettimeofday = function (e) {
                var t = new Date,
                    r = 0;
                if (e) {
                    return t.getTime() / 1e3
                }
                r = t.getFullYear();
                return {
                    sec: t.getUTCSeconds(),
                    usec: t.getUTCMilliseconds() * 1e3,
                    minuteswest: t.getTimezoneOffset(),
                    dsttime: 0 + (new Date(r, 0) - Date.UTC(r, 0) !== new Date(r, 6) - Date.UTC(r, 6))
                }
            };
            exports.gmmktime = function () {
                var e = new Date,
                    t = arguments,
                    r = 0,
                    n = ["Hours", "Minutes", "Seconds", "Month", "Date", "FullYear"];
                for (r = 0; r < n.length; r++) {
                    if (typeof t[r] === "undefined") {
                        t[r] = e["getUTC" + n[r]]();
                        t[r] += r === 3
                    } else {
                        t[r] = parseInt(t[r], 10);
                        if (isNaN(t[r])) {
                            return false
                        }
                    }
                }
                t[5] += t[5] >= 0 ? t[5] <= 69 ? 2e3 : t[5] <= 100 ? 1900 : 0 : 0;
                e.setUTCFullYear(t[5], t[3] - 1, t[4]);
                e.setUTCHours(t[0], t[1], t[2]);
                return (e.getTime() / 1e3 >> 0) - (e.getTime() < 0)
            };
            exports.idate = function (e, t) {
                if (e === undefined) {
                    throw "idate() expects at least 1 parameter, 0 given"
                }
                if (!e.length || e.length > 1) {
                    throw "idate format is one char"
                }
                var r = typeof t === "undefined" ? new Date : t instanceof Date ? new Date(t) : new Date(t * 1e3),
                    n;
                switch (e) {
                case "B":
                    return Math.floor((r.getUTCHours() * 3600 + r.getUTCMinutes() * 60 + r.getUTCSeconds() + 3600) / 86.4) % 1e3;
                case "d":
                    return r.getDate();
                case "h":
                    return r.getHours() % 12 || 12;
                case "H":
                    return r.getHours();
                case "i":
                    return r.getMinutes();
                case "I":
                    n = r.getFullYear();
                    return 0 + (new Date(n, 0) - Date.UTC(n, 0) !== new Date(n, 6) - Date.UTC(n, 6));
                case "L":
                    n = r.getFullYear();
                    return !(n & 3) && (n % 100 || !(n % 400)) ? 1 : 0;
                case "m":
                    return r.getMonth() + 1;
                case "s":
                    return r.getSeconds();
                case "t":
                    return new Date(r.getFullYear(), r.getMonth() + 1, 0)
                        .getDate();
                case "U":
                    return Math.round(r.getTime() / 1e3);
                case "w":
                    return r.getDay();
                case "W":
                    n = new Date(r.getFullYear(), r.getMonth(), r.getDate() - (r.getDay() || 7) + 3);
                    return 1 + Math.round((n - new Date(n.getFullYear(), 0, 4)) / 864e5 / 7);
                case "y":
                    return parseInt((r.getFullYear() + "")
                        .slice(2), 10);
                case "Y":
                    return r.getFullYear();
                case "z":
                    return Math.floor((r - new Date(r.getFullYear(), 0, 1)) / 864e5);
                case "Z":
                    return -r.getTimezoneOffset() * 60;
                default:
                    throw "Unrecognized date format token"
                }
            };
            exports.microtime = function (e) {
                var t = (new Date)
                    .getTime() / 1e3;
                var r = parseInt(t, 10);
                return e ? t : Math.round((t - r) * 1e3) / 1e3 + " " + r
            };
            exports.mktime = function () {
                var e = new Date,
                    t = arguments,
                    r = 0,
                    n = ["Hours", "Minutes", "Seconds", "Month", "Date", "FullYear"];
                for (r = 0; r < n.length; r++) {
                    if (typeof t[r] === "undefined") {
                        t[r] = e["get" + n[r]]();
                        t[r] += r === 3
                    } else {
                        t[r] = parseInt(t[r], 10);
                        if (isNaN(t[r])) {
                            return false
                        }
                    }
                }
                t[5] += t[5] >= 0 ? t[5] <= 69 ? 2e3 : t[5] <= 100 ? 1900 : 0 : 0;
                e.setFullYear(t[5], t[3] - 1, t[4]);
                e.setHours(t[0], t[1], t[2]);
                return (e.getTime() / 1e3 >> 0) - (e.getTime() < 0)
            };
            exports.strtotime = function (e, t) {
                var r, n, i, o, s, a, u, c, l, f, p, h = false;
                if (!e) {
                    return h
                }
                e = e.replace(/^\s+|\s+$/g, "")
                    .replace(/\s{2,}/g, " ")
                    .replace(/[\t\r\n]/g, "")
                    .toLowerCase();
                n = e.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
                if (n && n[2] === n[4]) {
                    if (n[1] > 1901) {
                        switch (n[2]) {
                        case "-":
                            {
                                if (n[3] > 12 || n[5] > 31) {
                                    return h
                                }
                                return new Date(n[1], parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        case ".":
                            {
                                return h
                            }
                        case "/":
                            {
                                if (n[3] > 12 || n[5] > 31) {
                                    return h
                                }
                                return new Date(n[1], parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        }
                    } else if (n[5] > 1901) {
                        switch (n[2]) {
                        case "-":
                            {
                                if (n[3] > 12 || n[1] > 31) {
                                    return h
                                }
                                return new Date(n[5], parseInt(n[3], 10) - 1, n[1], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        case ".":
                            {
                                if (n[3] > 12 || n[1] > 31) {
                                    return h
                                }
                                return new Date(n[5], parseInt(n[3], 10) - 1, n[1], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        case "/":
                            {
                                if (n[1] > 12 || n[3] > 31) {
                                    return h
                                }
                                return new Date(n[5], parseInt(n[1], 10) - 1, n[3], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        }
                    } else {
                        switch (n[2]) {
                        case "-":
                            {
                                if (n[3] > 12 || n[5] > 31 || n[1] < 70 && n[1] > 38) {
                                    return h
                                }
                                o = n[1] >= 0 && n[1] <= 38 ? +n[1] + 2e3 : n[1];
                                return new Date(o, parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        case ".":
                            {
                                if (n[5] >= 70) {
                                    if (n[3] > 12 || n[1] > 31) {
                                        return h
                                    }
                                    return new Date(n[5], parseInt(n[3], 10) - 1, n[1], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                                }
                                if (n[5] < 60 && !n[6]) {
                                    if (n[1] > 23 || n[3] > 59) {
                                        return h
                                    }
                                    i = new Date;
                                    return new Date(i.getFullYear(), i.getMonth(), i.getDate(), n[1] || 0, n[3] || 0, n[5] || 0, n[9] || 0) /
                                        1e3
                                }
                                return h
                            }
                        case "/":
                            {
                                if (n[1] > 12 || n[3] > 31 || n[5] < 70 && n[5] > 38) {
                                    return h
                                }
                                o = n[5] >= 0 && n[5] <= 38 ? +n[5] + 2e3 : n[5];
                                return new Date(o, parseInt(n[1], 10) - 1, n[3], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3
                            }
                        case ":":
                            {
                                if (n[1] > 23 || n[3] > 59 || n[5] > 59) {
                                    return h
                                }
                                i = new Date;
                                return new Date(i.getFullYear(), i.getMonth(), i.getDate(), n[1] || 0, n[3] || 0, n[5] || 0) / 1e3
                            }
                        }
                    }
                }
                if (e === "now") {
                    return t === null || isNaN(t) ? (new Date)
                        .getTime() / 1e3 | 0 : t | 0
                }
                if (!isNaN(r = Date.parse(e))) {
                    return r / 1e3 | 0
                }
                s = t ? new Date(t * 1e3) : new Date;
                a = {
                    sun: 0,
                    mon: 1,
                    tue: 2,
                    wed: 3,
                    thu: 4,
                    fri: 5,
                    sat: 6
                };
                u = {
                    yea: "FullYear",
                    mon: "Month",
                    day: "Date",
                    hou: "Hours",
                    min: "Minutes",
                    sec: "Seconds"
                };

                function d(e, t, r) {
                    var n, i = a[t];
                    if (typeof i !== "undefined") {
                        n = i - s.getDay();
                        if (n === 0) {
                            n = 7 * r
                        } else if (n > 0 && e === "last") {
                            n -= 7
                        } else if (n < 0 && e === "next") {
                            n += 7
                        }
                        s.setDate(s.getDate() + n)
                    }
                }

                function g(e) {
                    var t = e.split(" "),
                        r = t[0],
                        n = t[1].substring(0, 3),
                        i = /\d+/.test(r),
                        o = t[2] === "ago",
                        a = (r === "last" ? -1 : 1) * (o ? -1 : 1);
                    if (i) {
                        a *= parseInt(r, 10)
                    }
                    if (u.hasOwnProperty(n) && !t[1].match(/^mon(day|\.)?$/i)) {
                        return s["set" + u[n]](s["get" + u[n]]() + a)
                    }
                    if (n === "wee") {
                        return s.setDate(s.getDate() + a * 7)
                    }
                    if (r === "next" || r === "last") {
                        d(r, n, a)
                    } else if (!i) {
                        return false
                    }
                    return true
                }
                l = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec" +
                    "|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?" +
                    "|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";
                f = "([+-]?\\d+\\s" + l + "|" + "(last|next)\\s" + l + ")(\\sago)?";
                n = e.match(new RegExp(f, "gi"));
                if (!n) {
                    return h
                }
                for (p = 0, c = n.length; p < c; p++) {
                    if (!g(n[p])) {
                        return h
                    }
                }
                return s.getTime() / 1e3
            };
            exports.time = function () {
                return Math.floor((new Date)
                    .getTime() / 1e3)
            };
            exports.escapeshellarg = function (e) {
                var t = "";
                t = e.replace(/[^\\]'/g, function (e, t, r) {
                    return e.slice(0, 1) + "\\'"
                });
                return "'" + t + "'"
            };
            exports.basename = function (e, t) {
                var r = e;
                var n = r.charAt(r.length - 1);
                if (n === "/" || n === "\\") {
                    r = r.slice(0, -1)
                }
                r = r.replace(/^.*[\/\\]/g, "");
                if (typeof t === "string" && r.substr(r.length - t.length) == t) {
                    r = r.substr(0, r.length - t.length)
                }
                return r
            };
            exports.dirname = function (e) {
                return e.replace(/\\/g, "/")
                    .replace(/\/[^\/]*\/?$/, "")
            };
            exports.file_get_contents = function (e, t, r, n, i) {
                var o, s = [],
                    a = [],
                    u = 0,
                    c = 0,
                    l = "",
                    f = -1,
                    p = 0,
                    h = null,
                    d = false;
                var g = function (e) {
                    return e.substring(1) !== ""
                };
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                var y = this.php_js.ini;
                r = r || this.php_js.default_streams_context || null;
                if (!t) {
                    t = 0
                }
                var v = {
                    FILE_USE_INCLUDE_PATH: 1,
                    FILE_TEXT: 32,
                    FILE_BINARY: 64
                };
                if (typeof t === "number") {
                    p = t
                } else {
                    t = [].concat(t);
                    for (c = 0; c < t.length; c++) {
                        if (v[t[c]]) {
                            p = p | v[t[c]]
                        }
                    }
                }
                if (p & v.FILE_BINARY && p & v.FILE_TEXT) {
                    throw "You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()"
                }
                if (p & v.FILE_USE_INCLUDE_PATH && y.include_path && y.include_path.local_value) {
                    var m = y.include_path.local_value.indexOf("/") !== -1 ? "/" : "\\";
                    e = y.include_path.local_value + m + e
                } else if (!/^(https?|file):/.test(e)) {
                    l = this.window.location.href;
                    f = e.indexOf("/") === 0 ? l.indexOf("/", 8) - 1 : l.lastIndexOf("/");
                    e = l.slice(0, f + 1) + e
                }
                var b;
                if (r) {
                    b = r.stream_options && r.stream_options.http;
                    d = !!b
                }
                if (!r || d) {
                    var _ = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
                    if (!_) {
                        throw new Error("XMLHttpRequest not supported")
                    }
                    var w = d ? b.method : "GET";
                    var C = !!(r && r.stream_params && r.stream_params["phpjs.async"]);
                    if (y["phpjs.ajaxBypassCache"] && y["phpjs.ajaxBypassCache"].local_value) {
                        e += (e.match(/\?/) == null ? "?" : "&") + (new Date)
                            .getTime()
                    }
                    _.open(w, e, C);
                    if (C) {
                        var k = r.stream_params.notification;
                        if (typeof k === "function") {
                            if (0 && _.addEventListener) {} else {
                                _.onreadystatechange = function (e) {
                                    var t = {
                                        responseText: _.responseText,
                                        responseXML: _.responseXML,
                                        status: _.status,
                                        statusText: _.statusText,
                                        readyState: _.readyState,
                                        evt: e
                                    };
                                    var r;
                                    switch (_.readyState) {
                                    case 0:
                                        k.call(t, 0, 0, "", 0, 0, 0);
                                        break;
                                    case 1:
                                        k.call(t, 0, 0, "", 0, 0, 0);
                                        break;
                                    case 2:
                                        k.call(t, 0, 0, "", 0, 0, 0);
                                        break;
                                    case 3:
                                        r = _.responseText.length * 2;
                                        k.call(t, 7, 0, "", 0, r, 0);
                                        break;
                                    case 4:
                                        if (_.status >= 200 && _.status < 400) {
                                            r = _.responseText.length * 2;
                                            k.call(t, 8, 0, "", _.status, r, 0)
                                        } else if (_.status === 403) {
                                            k.call(t, 10, 2, "", _.status, 0, 0)
                                        } else {
                                            k.call(t, 9, 2, "", _.status, 0, 0)
                                        }
                                        break;
                                    default:
                                        throw "Unrecognized ready state for file_get_contents()"
                                    }
                                }
                            }
                        }
                    }
                    if (d) {
                        var A = b.header && b.header.split(/\r?\n/);
                        var E = false;
                        for (c = 0; c < A.length; c++) {
                            var x = A[c];
                            var S = x.search(/:\s*/);
                            var j = x.substring(0, S);
                            _.setRequestHeader(j, x.substring(S + 1));
                            if (j === "User-Agent") {
                                E = true
                            }
                        }
                        if (!E) {
                            var I = b.user_agent || y.user_agent && y.user_agent.local_value;
                            if (I) {
                                _.setRequestHeader("User-Agent", I)
                            }
                        }
                        h = b.content || null
                    }
                    if (p & v.FILE_TEXT) {
                        var R = "text/html";
                        if (b && b["phpjs.override"]) {
                            R = b["phpjs.override"]
                        } else {
                            var D = y["unicode.stream_encoding"] && y["unicode.stream_encoding"].local_value || "UTF-8";
                            if (b && b.header && /^content-type:/im.test(b.header)) {
                                R = b.header.match(/^content-type:\s*(.*)$/im)[1]
                            }
                            if (!/;\s*charset=/.test(R)) {
                                R += "; charset=" + D
                            }
                        }
                        _.overrideMimeType(R)
                    } else if (p & v.FILE_BINARY) {
                        _.overrideMimeType("text/plain; charset=x-user-defined")
                    }
                    try {
                        if (b && b["phpjs.sendAsBinary"]) {
                            _.sendAsBinary(h)
                        } else {
                            _.send(h)
                        }
                    } catch (e) {
                        return false
                    }
                    o = _.getAllResponseHeaders();
                    if (o) {
                        o = o.split("\n");
                        for (u = 0; u < o.length; u++) {
                            if (g(o[u])) {
                                a.push(o[u])
                            }
                        }
                        o = a;
                        for (c = 0; c < o.length; c++) {
                            s[c] = o[c]
                        }
                        this.$http_response_header = s
                    }
                    if (n || i) {
                        if (i) {
                            return _.responseText.substr(n || 0, i)
                        }
                        return _.responseText.substr(n)
                    }
                    return _.responseText
                }
                return false
            };
            exports.realpath = function (e) {
                var t = 0,
                    r = [];
                var n = this.window.location.href;
                e = (e + "")
                    .replace("\\", "/");
                if (e.indexOf("://") !== -1) {
                    t = 1
                }
                if (!t) {
                    e = n.substring(0, n.lastIndexOf("/") + 1) + e
                }
                r = e.split("/");
                e = [];
                for (var i in r) {
                    if (r[i] == ".") {
                        continue
                    }
                    if (r[i] == "..") {
                        if (e.length > 3) {
                            e.pop()
                        }
                    } else {
                        if (e.length < 2 || r[i] !== "") {
                            e.push(r[i])
                        }
                    }
                }
                return e.join("/")
            };
            exports.call_user_func = function (cb) {
                var func;
                if (typeof cb === "string") {
                    func = typeof this[cb] === "function" ? this[cb] : func = new Function(null, "return " + cb)()
                } else if (Object.prototype.toString.call(cb) === "[object Array]") {
                    func = typeof cb[0] === "string" ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]]
                } else if (typeof cb === "function") {
                    func = cb
                }
                if (typeof func !== "function") {
                    throw new Error(func + " is not a valid function")
                }
                var parameters = Array.prototype.slice.call(arguments, 1);
                return typeof cb[0] === "string" ? func.apply(eval(cb[0]), parameters) : typeof cb[0] !== "object" ? func.apply(null,
                    parameters) : func.apply(cb[0], parameters)
            };
            exports.call_user_func_array = function (cb, parameters) {
                var func;
                if (typeof cb === "string") {
                    func = typeof this[cb] === "function" ? this[cb] : func = new Function(null, "return " + cb)()
                } else if (Object.prototype.toString.call(cb) === "[object Array]") {
                    func = typeof cb[0] === "string" ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]]
                } else if (typeof cb === "function") {
                    func = cb
                }
                if (typeof func !== "function") {
                    throw new Error(func + " is not a valid function")
                }
                return typeof cb[0] === "string" ? func.apply(eval(cb[0]), parameters) : typeof cb[0] !== "object" ? func.apply(null,
                    parameters) : func.apply(cb[0], parameters)
            };
            exports.create_function = function (e, t) {
                try {
                    return Function.apply(null, e.split(",")
                        .concat(t))
                } catch (e) {
                    return false
                }
            };
            exports.function_exists = function (e) {
                if (typeof e === "string") {
                    e = this.window[e]
                }
                return typeof e === "function"
            };
            exports.get_defined_functions = function () {
                var e = "",
                    t = [],
                    r = {};
                for (e in this.window) {
                    try {
                        if (typeof this.window[e] === "function") {
                            if (!r[e]) {
                                r[e] = 1;
                                t.push(e)
                            }
                        } else if (typeof this.window[e] === "object") {
                            for (var n in this.window[e]) {
                                if (typeof this.window[n] === "function" && this.window[n] && !r[n]) {
                                    r[n] = 1;
                                    t.push(n)
                                }
                            }
                        }
                    } catch (e) {}
                }
                return t
            };
            exports.i18n_loc_set_default = function (e) {
                this.php_js = this.php_js || {};
                this.php_js.i18nLocales = {
                    en_US_POSIX: {
                        sorting: function (e, t) {
                            return e == t ? 0 : e > t ? 1 : -1
                        }
                    }
                };
                this.php_js.i18nLocale = e;
                return true
            };
            exports.assert_options = function (e, t) {
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                this.php_js.assert_values = this.php_js.assert_values || {};
                var r, n;
                switch (e) {
                case "ASSERT_ACTIVE":
                    r = "assert.active";
                    n = 1;
                    break;
                case "ASSERT_WARNING":
                    r = "assert.warning";
                    n = 1;
                    throw "We have not yet implemented warnings for us to throw in JavaScript (assert_options())";
                case "ASSERT_BAIL":
                    r = "assert.bail";
                    n = 0;
                    break;
                case "ASSERT_QUIET_EVAL":
                    r = "assert.quiet_eval";
                    n = 0;
                    break;
                case "ASSERT_CALLBACK":
                    r = "assert.callback";
                    n = null;
                    break;
                default:
                    throw "Improper type for assert_options()"
                }
                var i = this.php_js.assert_values[r] || this.php_js.ini[r] && this.php_js.ini[r].local_value || n;
                if (t) {
                    this.php_js.assert_values[r] = t
                }
                return i
            };
            exports.getenv = function (e) {
                if (!this.php_js || !this.php_js.ENV || !this.php_js.ENV[e]) {
                    return false
                }
                return this.php_js.ENV[e]
            };
            exports.getlastmod = function () {
                return new Date(this.window.document.lastModified)
                    .getTime() / 1e3
            };
            exports.ini_get = function (e) {
                if (this.php_js && this.php_js.ini && this.php_js.ini[e] && this.php_js.ini[e].local_value !== undefined) {
                    if (this.php_js.ini[e].local_value === null) {
                        return ""
                    }
                    return this.php_js.ini[e].local_value
                }
                return ""
            };
            exports.ini_set = function (e, t) {
                var r = "";
                var n = this;
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                this.php_js.ini = this.php_js.ini || {};
                this.php_js.ini[e] = this.php_js.ini[e] || {};
                r = this.php_js.ini[e].local_value;
                var i = function (r) {
                    if (typeof r === "undefined") {
                        n.php_js.ini[e].local_value = []
                    }
                    n.php_js.ini[e].local_value.push(t)
                };
                switch (e) {
                case "extension":
                    if (typeof this.dl === "function") {
                        this.dl(t)
                    }
                    i(r, t);
                    break;
                default:
                    this.php_js.ini[e].local_value = t;
                    break
                }
                return r
            };
            exports.set_time_limit = function (e) {
                this.php_js = this.php_js || {};
                this.window.setTimeout(function () {
                    if (!this.php_js.timeoutStatus) {
                        this.php_js.timeoutStatus = true
                    }
                    throw "Maximum execution time exceeded"
                }, e * 1e3)
            };
            exports.version_compare = function (e, t, r) {
                this.php_js = this.php_js || {};
                this.php_js.ENV = this.php_js.ENV || {};
                var n = 0,
                    i = 0,
                    o = 0,
                    s = {
                        dev: -6,
                        alpha: -5,
                        a: -5,
                        beta: -4,
                        b: -4,
                        RC: -3,
                        rc: -3,
                        "#": -2,
                        p: 1,
                        pl: 1
                    },
                    a = function (e) {
                        e = ("" + e)
                            .replace(/[_\-+]/g, ".");
                        e = e.replace(/([^.\d]+)/g, ".$1.")
                            .replace(/\.{2,}/g, ".");
                        return !e.length ? [-8] : e.split(".")
                    };
                numVersion = function (e) {
                    return !e ? 0 : isNaN(e) ? s[e] || -7 : parseInt(e, 10)
                };
                e = a(e);
                t = a(t);
                i = Math.max(e.length, t.length);
                for (n = 0; n < i; n++) {
                    if (e[n] == t[n]) {
                        continue
                    }
                    e[n] = numVersion(e[n]);
                    t[n] = numVersion(t[n]);
                    if (e[n] < t[n]) {
                        o = -1;
                        break
                    } else if (e[n] > t[n]) {
                        o = 1;
                        break
                    }
                }
                if (!r) {
                    return o
                }
                switch (r) {
                case ">":
                case "gt":
                    return o > 0;
                case ">=":
                case "ge":
                    return o >= 0;
                case "<=":
                case "le":
                    return o <= 0;
                case "==":
                case "=":
                case "eq":
                    return o === 0;
                case "<>":
                case "!=":
                case "ne":
                    return o !== 0;
                case "":
                case "<":
                case "lt":
                    return o < 0;
                default:
                    return null
                }
            };
            exports.json_decode = function (str_json) {
                var json = this.window.JSON;
                if (typeof json === "object" && typeof json.parse === "function") {
                    try {
                        return json.parse(str_json)
                    } catch (e) {
                        if (!(e instanceof SyntaxError)) {
                            throw new Error("Unexpected error type in json_decode()")
                        }
                        this.php_js = this.php_js || {};
                        this.php_js.last_error_json = 4;
                        return null
                    }
                }
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                var j;
                var text = str_json;
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (e) {
                        return "\\u" + ("0000" + e.charCodeAt(0)
                                .toString(16))
                            .slice(-4)
                    })
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    j = eval("(" + text + ")");
                    return j
                }
                this.php_js = this.php_js || {};
                this.php_js.last_error_json = 4;
                return null
            };
            exports.json_encode = function (e) {
                var t, r = this.window.JSON;
                try {
                    if (typeof r === "object" && typeof r.stringify === "function") {
                        t = r.stringify(e);
                        if (t === undefined) {
                            throw new SyntaxError("json_encode")
                        }
                        return t
                    }
                    var n = e;
                    var i = function (e) {
                        var t =
                            /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                        var r = {
                            "\b": "\\b",
                            "\t": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        };
                        t.lastIndex = 0;
                        return t.test(e) ? '"' + e.replace(t, function (e) {
                            var t = r[e];
                            return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0)
                                    .toString(16))
                                .slice(-4)
                        }) + '"' : '"' + e + '"'
                    };
                    var o = function (e, t) {
                        var r = "";
                        var n = "    ";
                        var s = 0;
                        var a = "";
                        var u = "";
                        var c = 0;
                        var l = r;
                        var f = [];
                        var p = t[e];
                        if (p && typeof p === "object" && typeof p.toJSON === "function") {
                            p = p.toJSON(e)
                        }
                        switch (typeof p) {
                        case "string":
                            return i(p);
                        case "number":
                            return isFinite(p) ? String(p) : "null";
                        case "boolean":
                        case "null":
                            return String(p);
                        case "object":
                            if (!p) {
                                return "null"
                            }
                            if (this.PHPJS_Resource && p instanceof this.PHPJS_Resource || window.PHPJS_Resource && p instanceof window
                                .PHPJS_Resource) {
                                throw new SyntaxError("json_encode")
                            }
                            r += n;
                            f = [];
                            if (Object.prototype.toString.apply(p) === "[object Array]") {
                                c = p.length;
                                for (s = 0; s < c; s += 1) {
                                    f[s] = o(s, p) || "null"
                                }
                                u = f.length === 0 ? "[]" : r ? "[\n" + r + f.join(",\n" + r) + "\n" + l + "]" : "[" + f.join(",") +
                                    "]";
                                r = l;
                                return u
                            }
                            for (a in p) {
                                if (Object.hasOwnProperty.call(p, a)) {
                                    u = o(a, p);
                                    if (u) {
                                        f.push(i(a) + (r ? ": " : ":") + u)
                                    }
                                }
                            }
                            u = f.length === 0 ? "{}" : r ? "{\n" + r + f.join(",\n" + r) + "\n" + l + "}" : "{" + f.join(",") + "}";
                            r = l;
                            return u;
                        case "undefined":
                        case "function":
                        default:
                            throw new SyntaxError("json_encode")
                        }
                    };
                    return o("", {
                        "": n
                    })
                } catch (e) {
                    if (!(e instanceof SyntaxError)) {
                        throw new Error("Unexpected error type in json_encode()")
                    }
                    this.php_js = this.php_js || {};
                    this.php_js.last_error_json = 4;
                    return null
                }
            };
            exports.json_last_error = function () {
                return this.php_js && this.php_js.last_error_json ? this.php_js.last_error_json : 0
            };
            exports.abs = function (e) {
                return Math.abs(e) || 0
            };
            exports.acos = function (e) {
                return Math.acos(e)
            };
            exports.acosh = function (e) {
                return Math.log(e + Math.sqrt(e * e - 1))
            };
            exports.asin = function (e) {
                return Math.asin(e)
            };
            exports.asinh = function (e) {
                return Math.log(e + Math.sqrt(e * e + 1))
            };
            exports.atan = function (e) {
                return Math.atan(e)
            };
            exports.atan2 = function (e, t) {
                return Math.atan2(e, t)
            };
            exports.atanh = function (e) {
                return .5 * Math.log((1 + e) / (1 - e))
            };
            exports.base_convert = function (e, t, r) {
                return parseInt(e + "", t | 0)
                    .toString(r | 0)
            };
            exports.bindec = function (e) {
                e = (e + "")
                    .replace(/[^01]/gi, "");
                return parseInt(e, 2)
            };
            exports.ceil = function (e) {
                return Math.ceil(e)
            };
            exports.cos = function (e) {
                return Math.cos(e)
            };
            exports.cosh = function (e) {
                return (Math.exp(e) + Math.exp(-e)) / 2
            };
            exports.decbin = function (e) {
                if (e < 0) {
                    e = 4294967295 + e + 1
                }
                return parseInt(e, 10)
                    .toString(2)
            };
            exports.dechex = function (e) {
                if (e < 0) {
                    e = 4294967295 + e + 1
                }
                return parseInt(e, 10)
                    .toString(16)
            };
            exports.decoct = function (e) {
                if (e < 0) {
                    e = 4294967295 + e + 1
                }
                return parseInt(e, 10)
                    .toString(8)
            };
            exports.deg2rad = function (e) {
                return e * .017453292519943295
            };
            exports.exp = function (e) {
                return Math.exp(e)
            };
            exports.expm1 = function (e) {
                var t = 0,
                    r = 50;
                var n = function e(t) {
                    if (t === 0 || t === 1) {
                        return 1
                    } else {
                        var r = t * e(t - 1);
                        return r
                    }
                };
                for (var i = 1; i < r; i++) {
                    t += Math.pow(e, i) / n(i)
                }
                return t
            };
            exports.floor = function (e) {
                return Math.floor(e)
            };
            exports.fmod = function (e, t) {
                var r, n, i = 0,
                    o = 0,
                    s = 0,
                    a = 0;
                r = e.toExponential()
                    .match(/^.\.?(.*)e(.+)$/);
                i = parseInt(r[2], 10) - (r[1] + "")
                    .length;
                r = t.toExponential()
                    .match(/^.\.?(.*)e(.+)$/);
                o = parseInt(r[2], 10) - (r[1] + "")
                    .length;
                if (o > i) {
                    i = o
                }
                n = e % t;
                if (i < -100 || i > 20) {
                    s = Math.round(Math.log(n) / Math.log(10));
                    a = Math.pow(10, s);
                    return (n / a)
                        .toFixed(s - i) * a
                } else {
                    return parseFloat(n.toFixed(-i))
                }
            };
            exports.getrandmax = function () {
                return 2147483647
            };
            exports.hexdec = function (e) {
                e = (e + "")
                    .replace(/[^a-f0-9]/gi, "");
                return parseInt(e, 16)
            };
            exports.hypot = function (e, t) {
                return Math.sqrt(e * e + t * t) || 0
            };
            exports.is_finite = function (e) {
                var t = "";
                if (e === Infinity || e === -Infinity) {
                    return false
                }
                if (typeof e === "object") {
                    t = Object.prototype.toString.call(e) === "[object Array]" ? "array" : "object"
                } else if (typeof e === "string" && !e.match(/^[\+\-]?\d/)) {
                    t = "string"
                }
                if (t) {
                    throw new Error("Warning: is_finite() expects parameter 1 to be double, " + t + " given")
                }
                return true
            };
            exports.is_infinite = function (e) {
                var t = "";
                if (e === Infinity || e === -Infinity) {
                    return true
                }
                if (typeof e === "object") {
                    t = Object.prototype.toString.call(e) === "[object Array]" ? "array" : "object"
                } else if (typeof e === "string" && !e.match(/^[\+\-]?\d/)) {
                    t = "string"
                }
                if (t) {
                    throw new Error("Warning: is_infinite() expects parameter 1 to be double, " + t + " given")
                }
                return false
            };
            exports.is_nan = function (e) {
                var t = "";
                if (typeof e === "number" && isNaN(e)) {
                    return true
                }
                if (typeof e === "object") {
                    t = Object.prototype.toString.call(e) === "[object Array]" ? "array" : "object"
                } else if (typeof e === "string" && !e.match(/^[\+\-]?\d/)) {
                    t = "string"
                }
                if (t) {
                    throw new Error("Warning: is_nan() expects parameter 1 to be double, " + t + " given")
                }
                return false
            };
            exports.lcg_value = function () {
                return Math.random()
            };
            exports.log = function (e, t) {
                return typeof t === "undefined" ? Math.log(e) : Math.log(e) / Math.log(t)
            };
            exports.log10 = function (e) {
                return Math.log(e) / 2.302585092994046
            };
            exports.log1p = function (e) {
                var t = 0,
                    r = 50;
                if (e <= -1) {
                    return "-INF"
                }
                if (e < 0 || e > 1) {
                    return Math.log(1 + e)
                }
                for (var n = 1; n < r; n++) {
                    if (n % 2 === 0) {
                        t -= Math.pow(e, n) / n
                    } else {
                        t += Math.pow(e, n) / n
                    }
                }
                return t
            };
            exports.max = function () {
                var e, t, r = 0,
                    n = 0,
                    i = arguments,
                    o = i.length,
                    s = function (e) {
                        if (Object.prototype.toString.call(e) === "[object Array]") {
                            return e
                        } else {
                            var t = [];
                            for (var r in e) {
                                if (e.hasOwnProperty(r)) {
                                    t.push(e[r])
                                }
                            }
                            return t
                        }
                    };
                _compare = function (e, t) {
                    var r = 0,
                        n = 0,
                        i = 0,
                        o = 0,
                        a = 0;
                    if (e === t) {
                        return 0
                    } else if (typeof e === "object") {
                        if (typeof t === "object") {
                            e = s(e);
                            t = s(t);
                            a = e.length;
                            o = t.length;
                            if (o > a) {
                                return 1
                            } else if (o < a) {
                                return -1
                            }
                            for (r = 0, n = a; r < n; ++r) {
                                i = _compare(e[r], t[r]);
                                if (i == 1) {
                                    return 1
                                } else if (i == -1) {
                                    return -1
                                }
                            }
                            return 0
                        }
                        return -1
                    } else if (typeof t === "object") {
                        return 1
                    } else if (isNaN(t) && !isNaN(e)) {
                        if (e == 0) {
                            return 0
                        }
                        return e < 0 ? 1 : -1
                    } else if (isNaN(e) && !isNaN(t)) {
                        if (t == 0) {
                            return 0
                        }
                        return t > 0 ? 1 : -1
                    }
                    if (t == e) {
                        return 0
                    }
                    return t > e ? 1 : -1
                };
                if (o === 0) {
                    throw new Error("At least one value should be passed to max()")
                } else if (o === 1) {
                    if (typeof i[0] === "object") {
                        e = s(i[0])
                    } else {
                        throw new Error("Wrong parameter count for max()")
                    }
                    if (e.length === 0) {
                        throw new Error("Array must contain at least one element for max()")
                    }
                } else {
                    e = i
                }
                t = e[0];
                for (r = 1, n = e.length; r < n; ++r) {
                    if (_compare(t, e[r]) == 1) {
                        t = e[r]
                    }
                }
                return t
            };
            exports.min = function () {
                var e, t, r = 0,
                    n = 0,
                    i = arguments,
                    o = i.length,
                    s = function (e) {
                        if (Object.prototype.toString.call(e) === "[object Array]") {
                            return e
                        }
                        var t = [];
                        for (var r in e) {
                            if (e.hasOwnProperty(r)) {
                                t.push(e[r])
                            }
                        }
                        return t
                    };
                _compare = function (e, t) {
                    var r = 0,
                        n = 0,
                        i = 0,
                        o = 0,
                        a = 0;
                    if (e === t) {
                        return 0
                    } else if (typeof e === "object") {
                        if (typeof t === "object") {
                            e = s(e);
                            t = s(t);
                            a = e.length;
                            o = t.length;
                            if (o > a) {
                                return 1
                            } else if (o < a) {
                                return -1
                            }
                            for (r = 0, n = a; r < n; ++r) {
                                i = _compare(e[r], t[r]);
                                if (i == 1) {
                                    return 1
                                } else if (i == -1) {
                                    return -1
                                }
                            }
                            return 0
                        }
                        return -1
                    } else if (typeof t === "object") {
                        return 1
                    } else if (isNaN(t) && !isNaN(e)) {
                        if (e == 0) {
                            return 0
                        }
                        return e < 0 ? 1 : -1
                    } else if (isNaN(e) && !isNaN(t)) {
                        if (t == 0) {
                            return 0
                        }
                        return t > 0 ? 1 : -1
                    }
                    if (t == e) {
                        return 0
                    }
                    return t > e ? 1 : -1
                };
                if (o === 0) {
                    throw new Error("At least one value should be passed to min()")
                } else if (o === 1) {
                    if (typeof i[0] === "object") {
                        e = s(i[0])
                    } else {
                        throw new Error("Wrong parameter count for min()")
                    }
                    if (e.length === 0) {
                        throw new Error("Array must contain at least one element for min()")
                    }
                } else {
                    e = i
                }
                t = e[0];
                for (r = 1, n = e.length; r < n; ++r) {
                    if (_compare(t, e[r]) == -1) {
                        t = e[r]
                    }
                }
                return t
            };
            exports.mt_getrandmax = function () {
                return 2147483647
            };
            exports.mt_rand = function (e, t) {
                var r = arguments.length;
                if (r === 0) {
                    e = 0;
                    t = 2147483647
                } else if (r === 1) {
                    throw new Error("Warning: mt_rand() expects exactly 2 parameters, 1 given")
                } else {
                    e = parseInt(e, 10);
                    t = parseInt(t, 10)
                }
                return Math.floor(Math.random() * (t - e + 1)) + e
            };
            exports.octdec = function (e) {
                e = (e + "")
                    .replace(/[^0-7]/gi, "");
                return parseInt(e, 8)
            };
            exports.pi = function () {
                return 3.141592653589793
            };
            exports.pow = function (e, t) {
                return Math.pow(e, t)
            };
            exports.rad2deg = function (e) {
                return e * 57.29577951308232
            };
            exports.rand = function (e, t) {
                var r = arguments.length;
                if (r === 0) {
                    e = 0;
                    t = 2147483647
                } else if (r === 1) {
                    throw new Error("Warning: rand() expects exactly 2 parameters, 1 given")
                }
                return Math.floor(Math.random() * (t - e + 1)) + e
            };
            exports.round = function (e, t, r) {
                var n, i, o, s;
                t |= 0;
                n = Math.pow(10, t);
                e *= n;
                s = e > 0 | -(e < 0);
                o = e % 1 === .5 * s;
                i = Math.floor(e);
                if (o) {
                    switch (r) {
                    case "PHP_ROUND_HALF_DOWN":
                        e = i + (s < 0);
                        break;
                    case "PHP_ROUND_HALF_EVEN":
                        e = i + i % 2 * s;
                        break;
                    case "PHP_ROUND_HALF_ODD":
                        e = i + !(i % 2);
                        break;
                    default:
                        e = i + (s > 0)
                    }
                }
                return (o ? e : Math.round(e)) / n
            };
            exports.sin = function (e) {
                return Math.sin(e)
            };
            exports.sinh = function (e) {
                return (Math.exp(e) - Math.exp(-e)) / 2
            };
            exports.sqrt = function (e) {
                return Math.sqrt(e)
            };
            exports.tan = function (e) {
                return Math.tan(e)
            };
            exports.tanh = function (e) {
                return (Math.exp(e) - Math.exp(-e)) / (Math.exp(e) + Math.exp(-e))
            };
            exports.pack = function (e) {
                var t = 0,
                    r = 1,
                    n = "",
                    i = "",
                    o = 0,
                    s = [],
                    a, u, c, l, f, p;
                var h, d, g, y, v, m, b, _, w, C, k, A, E, x, S, j, I;
                while (t < e.length) {
                    a = e.charAt(t);
                    u = "";
                    t++;
                    while (t < e.length && e.charAt(t)
                        .match(/[\d\*]/) !== null) {
                        u += e.charAt(t);
                        t++
                    }
                    if (u === "") {
                        u = "1"
                    }
                    switch (a) {
                    case "a":
                    case "A":
                        if (typeof arguments[r] === "undefined") {
                            throw new Error("Warning:  pack() Type " + a + ": not enough arguments")
                        } else {
                            i = String(arguments[r])
                        }
                        if (u === "*") {
                            u = i.length
                        }
                        for (o = 0; o < u; o++) {
                            if (typeof i[o] === "undefined") {
                                if (a === "a") {
                                    n += String.fromCharCode(0)
                                } else {
                                    n += " "
                                }
                            } else {
                                n += i[o]
                            }
                        }
                        r++;
                        break;
                    case "h":
                    case "H":
                        if (typeof arguments[r] === "undefined") {
                            throw new Error("Warning: pack() Type " + a + ": not enough arguments")
                        } else {
                            i = arguments[r]
                        }
                        if (u === "*") {
                            u = i.length
                        }
                        if (u > i.length) {
                            throw new Error("Warning: pack() Type " + a + ": not enough characters in string")
                        }
                        for (o = 0; o < u; o += 2) {
                            c = i[o];
                            if (o + 1 >= u || typeof i[o + 1] === "undefined") {
                                c += "0"
                            } else {
                                c += i[o + 1]
                            }
                            if (a === "h") {
                                c = c[1] + c[0]
                            }
                            n += String.fromCharCode(parseInt(c, 16))
                        }
                        r++;
                        break;
                    case "c":
                    case "C":
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning:  pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(arguments[r]);
                            r++
                        }
                        break;
                    case "s":
                    case "S":
                    case "v":
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning:  pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(arguments[r] & 255);
                            n += String.fromCharCode(arguments[r] >> 8 & 255);
                            r++
                        }
                        break;
                    case "n":
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning: pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(arguments[r] & 255);
                            r++
                        }
                        break;
                    case "i":
                    case "I":
                    case "l":
                    case "L":
                    case "V":
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning:  pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(arguments[r] & 255);
                            n += String.fromCharCode(arguments[r] >> 8 & 255);
                            n += String.fromCharCode(arguments[r] >> 16 & 255);
                            n += String.fromCharCode(arguments[r] >> 24 & 255);
                            r++
                        }
                        break;
                    case "N":
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning:  pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(arguments[r] >> 24 & 255);
                            n += String.fromCharCode(arguments[r] >> 16 & 255);
                            n += String.fromCharCode(arguments[r] >> 8 & 255);
                            n += String.fromCharCode(arguments[r] & 255);
                            r++
                        }
                        break;
                    case "f":
                    case "d":
                        l = 23;
                        f = 8;
                        if (a === "d") {
                            l = 52;
                            f = 11
                        }
                        if (u === "*") {
                            u = arguments.length - r
                        }
                        if (u > arguments.length - r) {
                            throw new Error("Warning:  pack() Type " + a + ": too few arguments")
                        }
                        for (o = 0; o < u; o++) {
                            i = arguments[r];
                            h = Math.pow(2, f - 1) - 1;
                            d = -h + 1;
                            g = h;
                            y = d - l;
                            v = isNaN(C = parseFloat(i)) || C === -Infinity || C === +Infinity ? C : 0;
                            m = 0;
                            b = 2 * h + 1 + l + 3;
                            _ = new Array(b);
                            w = (C = v !== 0 ? 0 : C) < 0;
                            C = Math.abs(C);
                            k = Math.floor(C);
                            A = C - k;
                            for (j = b; j;) {
                                _[--j] = 0
                            }
                            for (j = h + 2; k && j;) {
                                _[--j] = k % 2;
                                k = Math.floor(k / 2)
                            }
                            for (j = h + 1; A > 0 && j; --A) {
                                _[++j] = ((A *= 2) >= 1) - 0
                            }
                            for (j = -1; ++j < b && !_[j];) {}
                            if (_[(E = l - 1 + (j = (m = h + 1 - j) >= d && m <= g ? j + 1 : h + 1 - (m = d - 1))) + 1]) {
                                if (!(x = _[E])) {
                                    for (S = E + 2; !x && S < b; x = _[S++]) {}
                                }
                                for (S = E + 1; x && --S >= 0;
                                    (_[S] = !_[S] - 0) && (x = 0)) {}
                            }
                            for (j = j - 2 < 0 ? -1 : j - 3; ++j < b && !_[j];) {}
                            if ((m = h + 1 - j) >= d && m <= g) {
                                ++j
                            } else {
                                if (m < d) {
                                    if (m !== h + 1 - b && m < y) {}
                                    j = h + 1 - (m = d - 1)
                                }
                            }
                            if (k || v !== 0) {
                                m = g + 1;
                                j = h + 2;
                                if (v === -Infinity) {
                                    w = 1
                                } else if (isNaN(v)) {
                                    _[j] = 1
                                }
                            }
                            C = Math.abs(m + h);
                            I = "";
                            for (S = f + 1; --S;) {
                                I = C % 2 + I;
                                C = C >>= 1
                            }
                            C = 0;
                            S = 0;
                            j = (I = (w ? "1" : "0") + I + _.slice(j, j + l)
                                    .join(""))
                                .length;
                            s = [];
                            for (; j;) {
                                C += (1 << S) * I.charAt(--j);
                                if (S === 7) {
                                    s[s.length] = String.fromCharCode(C);
                                    C = 0
                                }
                                S = (S + 1) % 8
                            }
                            s[s.length] = C ? String.fromCharCode(C) : "";
                            n += s.join("");
                            r++
                        }
                        break;
                    case "x":
                        if (u === "*") {
                            throw new Error("Warning: pack(): Type x: '*' ignored")
                        }
                        for (o = 0; o < u; o++) {
                            n += String.fromCharCode(0)
                        }
                        break;
                    case "X":
                        if (u === "*") {
                            throw new Error("Warning: pack(): Type X: '*' ignored")
                        }
                        for (o = 0; o < u; o++) {
                            if (n.length === 0) {
                                throw new Error("Warning: pack(): Type X:" + " outside of string")
                            } else {
                                n = n.substring(0, n.length - 1)
                            }
                        }
                        break;
                    case "@":
                        if (u === "*") {
                            throw new Error("Warning: pack(): Type X: '*' ignored")
                        }
                        if (u > n.length) {
                            p = u - n.length;
                            for (o = 0; o < p; o++) {
                                n += String.fromCharCode(0)
                            }
                        }
                        if (u < n.length) {
                            n = n.substring(0, u)
                        }
                        break;
                    default:
                        throw new Error("Warning:  pack() Type " + a + ": unknown format code")
                    }
                }
                if (r < arguments.length) {
                    throw new Error("Warning: pack(): " + (arguments.length - r) + " arguments unused")
                }
                return n
            };
            exports.time_sleep_until = function (e) {
                while (new Date < e * 1e3) {}
                return true
            };
            exports.uniqid = function (e, t) {
                if (typeof e === "undefined") {
                    e = ""
                }
                var r;
                var n = function (e, t) {
                    e = parseInt(e, 10)
                        .toString(16);
                    if (t < e.length) {
                        return e.slice(e.length - t)
                    }
                    if (t > e.length) {
                        return Array(1 + (t - e.length))
                            .join("0") + e
                    }
                    return e
                };
                if (!this.php_js) {
                    this.php_js = {}
                }
                if (!this.php_js.uniqidSeed) {
                    this.php_js.uniqidSeed = Math.floor(Math.random() * 123456789)
                }
                this.php_js.uniqidSeed++;
                r = e;
                r += n(parseInt((new Date)
                    .getTime() / 1e3, 10), 8);
                r += n(this.php_js.uniqidSeed, 5);
                if (t) {
                    r += (Math.random() * 10)
                        .toFixed(8)
                        .toString()
                }
                return r
            };
            exports.gopher_parsedir = function (e) {
                var t = /^(.)(.*?)\t(.*?)\t(.*?)\t(.*?)\u000d\u000a$/;
                var r = e.match(t);
                if (r === null) {
                    throw "Could not parse the directory entry"
                }
                var n = r[1];
                switch (n) {
                case "i":
                    n = 255;
                    break;
                case "1":
                    n = 1;
                    break;
                case "0":
                    n = 0;
                    break;
                case "4":
                    n = 4;
                    break;
                case "5":
                    n = 5;
                    break;
                case "6":
                    n = 6;
                    break;
                case "9":
                    n = 9;
                    break;
                case "h":
                    n = 254;
                    break;
                default:
                    return {
                        type: -1,
                        data: e
                    }
                }
                return {
                    type: n,
                    title: r[2],
                    path: r[3],
                    host: r[4],
                    port: r[5]
                }
            };
            exports.inet_ntop = function (e) {
                var t = 0,
                    r = "",
                    n = [];
                e += "";
                if (e.length === 4) {
                    return [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)].join(".")
                } else if (e.length === 16) {
                    for (t = 0; t < 16; t++) {
                        n.push(((e.charCodeAt(t++) << 8) + e.charCodeAt(t))
                            .toString(16))
                    }
                    return n.join(":")
                        .replace(/((^|:)0(?=:|$))+:?/g, function (e) {
                            r = e.length > r.length ? e : r;
                            return e
                        })
                        .replace(r || " ", "::")
                } else {
                    return false
                }
            };
            exports.inet_pton = function (e) {
                var t, r, n, i, o, s = String.fromCharCode;
                r = e.match(/^(?:\d{1,3}(?:\.|$)){4}/);
                if (r) {
                    r = r[0].split(".");
                    r = s(r[0]) + s(r[1]) + s(r[2]) + s(r[3]);
                    return r.length === 4 ? r : false
                }
                t = /^((?:[\da-f]{1,4}(?::|)){0,8})(::)?((?:[\da-f]{1,4}(?::|)){0,8})$/;
                r = e.match(t);
                if (r) {
                    for (o = 1; o < 4; o++) {
                        if (o === 2 || r[o].length === 0) {
                            continue
                        }
                        r[o] = r[o].split(":");
                        for (i = 0; i < r[o].length; i++) {
                            r[o][i] = parseInt(r[o][i], 16);
                            if (isNaN(r[o][i])) {
                                return false
                            }
                            r[o][i] = s(r[o][i] >> 8) + s(r[o][i] & 255)
                        }
                        r[o] = r[o].join("")
                    }
                    n = r[1].length + r[3].length;
                    if (n === 16) {
                        return r[1] + r[3]
                    } else if (n < 16 && r[2].length > 0) {
                        return r[1] + new Array(16 - n + 1)
                            .join("\0") + r[3]
                    }
                }
                return false
            };
            exports.ip2long = function (e) {
                var t = 0;
                e = e.match(
                    /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
                );
                if (!e) {
                    return false
                }
                e[0] = 0;
                for (t = 1; t < 5; t += 1) {
                    e[0] += !!(e[t] || "")
                        .length;
                    e[t] = parseInt(e[t]) || 0
                }
                e.push(256, 256, 256, 256);
                e[4 + e[0]] *= Math.pow(256, 4 - e[0]);
                if (e[1] >= e[5] || e[2] >= e[6] || e[3] >= e[7] || e[4] >= e[8]) {
                    return false
                }
                return e[1] * (e[0] === 1 || 16777216) + e[2] * (e[0] <= 2 || 65536) + e[3] * (e[0] <= 3 || 256) + e[4] * 1
            };
            exports.long2ip = function (e) {
                if (!isFinite(e)) return false;
                return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, e & 255].join(".")
            };
            exports.setrawcookie = function (e, t, r, n, i, o) {
                if (typeof r === "string" && /^\d+$/.test(r)) {
                    r = parseInt(r, 10)
                }
                if (r instanceof Date) {
                    r = r.toGMTString()
                } else if (typeof r === "number") {
                    r = new Date(r * 1e3)
                        .toGMTString()
                }
                var s = [e + "=" + t],
                    a = {},
                    u = "";
                a = {
                    expires: r,
                    path: n,
                    domain: i
                };
                for (u in a) {
                    if (a.hasOwnProperty(u)) {
                        a[u] && s.push(u + "=" + a[u])
                    }
                }
                return o && s.push("secure"), this.window.document.cookie = s.join(";"), true
            };
            exports.preg_grep = function (pattern, input, flags) {
                var p = "";
                var retObj = {};
                var invert = flags === 1 || flags === "PREG_GREP_INVERT";
                if (typeof pattern === "string") {
                    pattern = eval(pattern)
                }
                if (invert) {
                    for (p in input) {
                        if ((input[p] + "")
                            .search(pattern) === -1) {
                            retObj[p] = input[p]
                        }
                    }
                } else {
                    for (p in input) {
                        if ((input[p] + "")
                            .search(pattern) !== -1) {
                            retObj[p] = input[p]
                        }
                    }
                }
                return retObj
            };
            exports.preg_quote = function (e, t) {
                return String(e)
                    .replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\" + (t || "") + "-]", "g"), "\\$&")
            };
            exports.addcslashes = function (e, t) {
                var r = "",
                    n = [],
                    i = 0,
                    o = 0,
                    s = "",
                    a = "",
                    u = "",
                    c = "",
                    l = "",
                    f = 0,
                    p = 0,
                    h = 0,
                    d = 0,
                    g = 0,
                    y = [],
                    v = "",
                    m = /%([\dA-Fa-f]+)/g;
                var b = function (e, t) {
                    if ((e = e + "")
                        .length < t) {
                        return new Array(++t - e.length)
                            .join("0") + e
                    }
                    return e
                };
                for (i = 0; i < t.length; i++) {
                    s = t.charAt(i);
                    a = t.charAt(i + 1);
                    if (s === "\\" && a && /\d/.test(a)) {
                        u = t.slice(i + 1)
                            .match(/^\d+/)[0];
                        h = u.length;
                        d = i + h + 1;
                        if (t.charAt(d) + t.charAt(d + 1) === "..") {
                            f = u.charCodeAt(0);
                            if (/\\\d/.test(t.charAt(d + 2) + t.charAt(d + 3))) {
                                c = t.slice(d + 3)
                                    .match(/^\d+/)[0];
                                i += 1
                            } else if (t.charAt(d + 2)) {
                                c = t.charAt(d + 2)
                            } else {
                                throw "Range with no end point"
                            }
                            p = c.charCodeAt(0);
                            if (p > f) {
                                for (o = f; o <= p; o++) {
                                    n.push(String.fromCharCode(o))
                                }
                            } else {
                                n.push(".", u, c)
                            }
                            i += c.length + 2
                        } else {
                            l = String.fromCharCode(parseInt(u, 8));
                            n.push(l)
                        }
                        i += h
                    } else if (a + t.charAt(i + 2) === "..") {
                        u = s;
                        f = u.charCodeAt(0);
                        if (/\\\d/.test(t.charAt(i + 3) + t.charAt(i + 4))) {
                            c = t.slice(i + 4)
                                .match(/^\d+/)[0];
                            i += 1
                        } else if (t.charAt(i + 3)) {
                            c = t.charAt(i + 3)
                        } else {
                            throw "Range with no end point"
                        }
                        p = c.charCodeAt(0);
                        if (p > f) {
                            for (o = f; o <= p; o++) {
                                n.push(String.fromCharCode(o))
                            }
                        } else {
                            n.push(".", u, c)
                        }
                        i += c.length + 2
                    } else {
                        n.push(s)
                    }
                }
                for (i = 0; i < e.length; i++) {
                    s = e.charAt(i);
                    if (n.indexOf(s) !== -1) {
                        r += "\\";
                        g = s.charCodeAt(0);
                        if (g < 32 || g > 126) {
                            switch (s) {
                            case "\n":
                                r += "n";
                                break;
                            case "\t":
                                r += "t";
                                break;
                            case "\r":
                                r += "r";
                                break;
                            case "":
                                r += "a";
                                break;
                            case "\v":
                                r += "v";
                                break;
                            case "\b":
                                r += "b";
                                break;
                            case "\f":
                                r += "f";
                                break;
                            default:
                                v = encodeURIComponent(s);
                                if ((y = m.exec(v)) !== null) {
                                    r += b(parseInt(y[1], 16)
                                        .toString(8), 3)
                                }
                                while ((y = m.exec(v)) !== null) {
                                    r += "\\" + b(parseInt(y[1], 16)
                                        .toString(8), 3)
                                }
                                break
                            }
                        } else {
                            r += s
                        }
                    } else {
                        r += s
                    }
                }
                return r
            };
            exports.addslashes = function (e) {
                return (e + "")
                    .replace(/[\\"']/g, "\\$&")
                    .replace(/\u0000/g, "\\0")
            };
            exports.bin2hex = function (e) {
                var t, r, n = "",
                    i;
                e += "";
                for (t = 0, r = e.length; t < r; t++) {
                    i = e.charCodeAt(t)
                        .toString(16);
                    n += i.length < 2 ? "0" + i : i
                }
                return n
            };
            exports.chr = function (e) {
                if (e > 65535) {
                    e -= 65536;
                    return String.fromCharCode(55296 + (e >> 10), 56320 + (e & 1023))
                }
                return String.fromCharCode(e)
            };
            exports.chunk_split = function (e, t, r) {
                t = parseInt(t, 10) || 76;
                r = r || "\r\n";
                if (t < 1) {
                    return false
                }
                return e.match(new RegExp(".{0," + t + "}", "g"))
                    .join(r)
            };
            exports.convert_cyr_string = function (e, t, r) {
                var n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                        60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
                        89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
                        114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
                        46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 154, 174, 190, 46, 159, 189, 46,
                        46, 179, 191, 180, 157, 46, 46, 156, 183, 46, 46, 182, 166, 173, 46, 46, 158, 163, 152, 164, 155, 46, 46, 46, 167,
                        225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227,
                        254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206,
                        207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 0, 1, 2, 3, 4, 5, 6, 7, 8,
                        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
                        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
                        67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
                        96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
                        120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
                        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 184, 186, 32, 179, 191, 32, 32, 32, 32, 32, 180,
                        162, 32, 32, 32, 32, 168, 170, 32, 178, 175, 32, 32, 32, 32, 32, 165, 161, 169, 254, 224, 225, 246, 228, 229, 244,
                        227, 245, 232, 233, 234, 235, 236, 237, 238, 239, 255, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249,
                        247, 250, 222, 192, 193, 214, 196, 197, 212, 195, 213, 200, 201, 202, 203, 204, 205, 206, 207, 223, 208, 209, 210,
                        211, 198, 194, 220, 219, 199, 216, 221, 217, 215, 218
                    ],
                    i = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                        60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
                        89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
                        114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225, 226, 247, 231, 228, 229, 246, 250, 233,
                        234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241,
                        193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 35, 35, 35, 124, 124, 124, 124, 43,
                        43, 124, 124, 43, 43, 43, 43, 43, 43, 45, 45, 124, 45, 43, 124, 124, 43, 43, 45, 45, 124, 45, 43, 45, 45, 45, 45,
                        43, 43, 43, 43, 43, 43, 43, 43, 35, 35, 124, 124, 35, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217,
                        216, 220, 192, 209, 179, 163, 180, 164, 183, 167, 190, 174, 32, 149, 158, 32, 152, 159, 148, 154, 0, 1, 2, 3, 4, 5,
                        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                        36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
                        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
                        94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
                        118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
                        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 205, 186, 213, 241, 243, 201, 32, 245, 187, 212,
                        211, 200, 190, 32, 247, 198, 199, 204, 181, 240, 242, 185, 32, 244, 203, 207, 208, 202, 216, 32, 246, 32, 238, 160,
                        161, 230, 164, 165, 228, 163, 229, 168, 169, 170, 171, 172, 173, 174, 175, 239, 224, 225, 226, 227, 166, 162, 236,
                        235, 167, 232, 237, 233, 231, 234, 158, 128, 129, 150, 132, 133, 148, 131, 149, 136, 137, 138, 139, 140, 141, 142,
                        143, 159, 144, 145, 146, 147, 134, 130, 156, 155, 135, 152, 157, 153, 151, 154
                    ],
                    o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                        60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
                        89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
                        114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
                        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 179, 32, 32, 32, 32, 32, 32,
                        32, 32, 32, 32, 32, 32, 32, 32, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242,
                        243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218,
                        201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192,
                        209, 32, 163, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
                        43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
                        72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
                        101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
                        124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
                        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 241, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 161,
                        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 238, 208, 209, 230, 212, 213, 228, 211, 229, 216, 217, 218, 219,
                        220, 221, 222, 223, 239, 224, 225, 226, 227, 214, 210, 236, 235, 215, 232, 237, 233, 231, 234, 206, 176, 177, 198,
                        180, 181, 196, 179, 197, 184, 185, 186, 187, 188, 189, 190, 191, 207, 192, 193, 194, 195, 182, 178, 204, 203, 183,
                        200, 205, 201, 199, 202
                    ],
                    s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                        60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
                        89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
                        114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225, 226, 247, 231, 228, 229, 246, 250, 233,
                        234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241,
                        160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182,
                        183, 184, 185, 186, 187, 188, 189, 190, 191, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141,
                        142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 179, 163, 209, 193, 194, 215, 199, 196,
                        197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217,
                        216, 220, 192, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
                        55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
                        84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
                        110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 192, 193, 194, 195, 196,
                        197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219,
                        220, 221, 222, 223, 160, 161, 162, 222, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
                        221, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232,
                        233, 234, 235, 236, 237, 238, 239, 223, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 158,
                        128, 129, 150, 132, 133, 148, 131, 149, 136, 137, 138, 139, 140, 141, 142, 143, 159, 144, 145, 146, 147, 134, 130,
                        156, 155, 135, 152, 157, 153, 151, 154
                    ];
                var a = null,
                    u = null,
                    c, l = 0,
                    f = "";
                switch (t.toUpperCase()) {
                case "W":
                    a = n;
                    break;
                case "A":
                case "D":
                    a = i;
                    break;
                case "I":
                    a = o;
                    break;
                case "M":
                    a = s;
                    break;
                case "K":
                    break;
                default:
                    throw "Unknown source charset: " + t
                }
                switch (r.toUpperCase()) {
                case "W":
                    u = n;
                    break;
                case "A":
                case "D":
                    u = i;
                    break;
                case "I":
                    u = o;
                    break;
                case "M":
                    u = s;
                    break;
                case "K":
                    break;
                default:
                    throw "Unknown destination charset: " + r
                }
                if (!e) {
                    return e
                }
                for (l = 0; l < e.length; l++) {
                    c = a === null ? e.charAt(l) : String.fromCharCode(a[e.charAt(l)
                        .charCodeAt(0)]);
                    f += u === null ? c : String.fromCharCode(u[c.charCodeAt(0) + 256])
                }
                return f
            };
            exports.count_chars = function (e, t) {
                var r = {},
                    n = [],
                    i;
                e = ("" + e)
                    .split("")
                    .sort()
                    .join("")
                    .match(/(.)\1*/g);
                if ((t & 1) == 0) {
                    for (i = 0; i != 256; i++) {
                        r[i] = 0
                    }
                }
                if (t === 2 || t === 4) {
                    for (i = 0; i != e.length; i += 1) {
                        delete r[e[i].charCodeAt(0)]
                    }
                    for (i in r) {
                        r[i] = t === 4 ? String.fromCharCode(i) : 0
                    }
                } else if (t === 3) {
                    for (i = 0; i != e.length; i += 1) {
                        r[i] = e[i].slice(0, 1)
                    }
                } else {
                    for (i = 0; i != e.length; i += 1) {
                        r[e[i].charCodeAt(0)] = e[i].length
                    }
                }
                if (t < 3) {
                    return r
                }
                for (i in r) {
                    n.push(r[i])
                }
                return n.join("")
            };
            exports.explode = function (e, t, r) {
                if (arguments.length < 2 || typeof e === "undefined" || typeof t === "undefined") return null;
                if (e === "" || e === false || e === null) return false;
                if (typeof e === "function" || typeof e === "object" || typeof t === "function" || typeof t === "object") {
                    return {
                        0: ""
                    }
                }
                if (e === true) e = "1";
                e += "";
                t += "";
                var n = t.split(e);
                if (typeof r === "undefined") return n;
                if (r === 0) r = 1;
                if (r > 0) {
                    if (r >= n.length) return n;
                    return n.slice(0, r - 1)
                        .concat([n.slice(r - 1)
                            .join(e)
                        ])
                }
                if (-r >= n.length) return [];
                n.splice(n.length + r);
                return n
            };
            exports.get_html_translation_table = function (e, t) {
                var r = {},
                    n = {},
                    i;
                var o = {},
                    s = {};
                var a = {},
                    u = {};
                o[0] = "HTML_SPECIALCHARS";
                o[1] = "HTML_ENTITIES";
                s[0] = "ENT_NOQUOTES";
                s[2] = "ENT_COMPAT";
                s[3] = "ENT_QUOTES";
                a = !isNaN(e) ? o[e] : e ? e.toUpperCase() : "HTML_SPECIALCHARS";
                u = !isNaN(t) ? s[t] : t ? t.toUpperCase() : "ENT_COMPAT";
                if (a !== "HTML_SPECIALCHARS" && a !== "HTML_ENTITIES") {
                    throw new Error("Table: " + a + " not supported")
                }
                r["38"] = "&amp;";
                if (a === "HTML_ENTITIES") {
                    r["160"] = "&nbsp;";
                    r["161"] = "&iexcl;";
                    r["162"] = "&cent;";
                    r["163"] = "&pound;";
                    r["164"] = "&curren;";
                    r["165"] = "&yen;";
                    r["166"] = "&brvbar;";
                    r["167"] = "&sect;";
                    r["168"] = "&uml;";
                    r["169"] = "&copy;";
                    r["170"] = "&ordf;";
                    r["171"] = "&laquo;";
                    r["172"] = "&not;";
                    r["173"] = "&shy;";
                    r["174"] = "&reg;";
                    r["175"] = "&macr;";
                    r["176"] = "&deg;";
                    r["177"] = "&plusmn;";
                    r["178"] = "&sup2;";
                    r["179"] = "&sup3;";
                    r["180"] = "&acute;";
                    r["181"] = "&micro;";
                    r["182"] = "&para;";
                    r["183"] = "&middot;";
                    r["184"] = "&cedil;";
                    r["185"] = "&sup1;";
                    r["186"] = "&ordm;";
                    r["187"] = "&raquo;";
                    r["188"] = "&frac14;";
                    r["189"] = "&frac12;";
                    r["190"] = "&frac34;";
                    r["191"] = "&iquest;";
                    r["192"] = "&Agrave;";
                    r["193"] = "&Aacute;";
                    r["194"] = "&Acirc;";
                    r["195"] = "&Atilde;";
                    r["196"] = "&Auml;";
                    r["197"] = "&Aring;";
                    r["198"] = "&AElig;";
                    r["199"] = "&Ccedil;";
                    r["200"] = "&Egrave;";
                    r["201"] = "&Eacute;";
                    r["202"] = "&Ecirc;";
                    r["203"] = "&Euml;";
                    r["204"] = "&Igrave;";
                    r["205"] = "&Iacute;";
                    r["206"] = "&Icirc;";
                    r["207"] = "&Iuml;";
                    r["208"] = "&ETH;";
                    r["209"] = "&Ntilde;";
                    r["210"] = "&Ograve;";
                    r["211"] = "&Oacute;";
                    r["212"] = "&Ocirc;";
                    r["213"] = "&Otilde;";
                    r["214"] = "&Ouml;";
                    r["215"] = "&times;";
                    r["216"] = "&Oslash;";
                    r["217"] = "&Ugrave;";
                    r["218"] = "&Uacute;";
                    r["219"] = "&Ucirc;";
                    r["220"] = "&Uuml;";
                    r["221"] = "&Yacute;";
                    r["222"] = "&THORN;";
                    r["223"] = "&szlig;";
                    r["224"] = "&agrave;";
                    r["225"] = "&aacute;";
                    r["226"] = "&acirc;";
                    r["227"] = "&atilde;";
                    r["228"] = "&auml;";
                    r["229"] = "&aring;";
                    r["230"] = "&aelig;";
                    r["231"] = "&ccedil;";
                    r["232"] = "&egrave;";
                    r["233"] = "&eacute;";
                    r["234"] = "&ecirc;";
                    r["235"] = "&euml;";
                    r["236"] = "&igrave;";
                    r["237"] = "&iacute;";
                    r["238"] = "&icirc;";
                    r["239"] = "&iuml;";
                    r["240"] = "&eth;";
                    r["241"] = "&ntilde;";
                    r["242"] = "&ograve;";
                    r["243"] = "&oacute;";
                    r["244"] = "&ocirc;";
                    r["245"] = "&otilde;";
                    r["246"] = "&ouml;";
                    r["247"] = "&divide;";
                    r["248"] = "&oslash;";
                    r["249"] = "&ugrave;";
                    r["250"] = "&uacute;";
                    r["251"] = "&ucirc;";
                    r["252"] = "&uuml;";
                    r["253"] = "&yacute;";
                    r["254"] = "&thorn;";
                    r["255"] = "&yuml;"
                }
                if (u !== "ENT_NOQUOTES") {
                    r["34"] = "&quot;"
                }
                if (u === "ENT_QUOTES") {
                    r["39"] = "&#39;"
                }
                r["60"] = "&lt;";
                r["62"] = "&gt;";
                for (i in r) {
                    if (r.hasOwnProperty(i)) {
                        n[String.fromCharCode(i)] = r[i]
                    }
                }
                return n
            };
            exports.echo = function () {
                var isNode = typeof module !== "undefined" && module.exports && typeof global !== "undefined" && {}.toString.call(global) ==
                    "[object global]";
                if (isNode) {
                    var args = Array.prototype.slice.call(arguments);
                    return console.log(args.join(" "))
                }
                var arg = "",
                    argc = arguments.length,
                    argv = arguments,
                    i = 0,
                    holder, win = this.window,
                    d = win.document,
                    ns_xhtml = "http://www.w3.org/1999/xhtml",
                    ns_xul = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
                var stringToDOM = function (e, t, r, n) {
                    var i = "";
                    if (r === ns_xul) {
                        i = ' xmlns:html="' + ns_xhtml + '"'
                    }
                    var o = "<" + n + ' xmlns="' + r + '"' + i + ">" + e + "</" + n + ">";
                    var s = win.DOMImplementationLS,
                        a = win.DOMParser,
                        u = win.ActiveXObject;
                    if (s && s.createLSInput && s.createLSParser) {
                        var c = s.createLSInput();
                        c.stringData = o;
                        var l = s.createLSParser(1, null);
                        return l.parse(c)
                            .firstChild
                    } else if (a) {
                        try {
                            var f = (new a)
                                .parseFromString(o, "text/xml");
                            if (f && f.documentElement && f.documentElement.localName !== "parsererror" && f.documentElement.namespaceURI !==
                                "http://www.mozilla.org/newlayout/xml/parsererror.xml") {
                                return f.documentElement.firstChild
                            }
                        } catch (e) {}
                    } else if (u) {
                        var p = new u("MSXML2.DOMDocument");
                        p.loadXML(e);
                        return p.documentElement
                    }
                    if (d.createElementNS && (d.documentElement.namespaceURI || d.documentElement.nodeName.toLowerCase() !== "html" ||
                            d.contentType && d.contentType !== "text/html")) {
                        holder = d.createElementNS(r, n)
                    } else {
                        holder = d.createElement(n)
                    }
                    holder.innerHTML = e;
                    while (holder.firstChild) {
                        t.appendChild(holder.firstChild)
                    }
                    return false
                };
                var ieFix = function (e) {
                    if (e.nodeType === 1) {
                        var t = d.createElement(e.nodeName);
                        var r, n;
                        if (e.attributes && e.attributes.length > 0) {
                            for (r = 0, n = e.attributes.length; r < n; r++) {
                                t.setAttribute(e.attributes[r].nodeName, e.getAttribute(e.attributes[r].nodeName))
                            }
                        }
                        if (e.childNodes && e.childNodes.length > 0) {
                            for (r = 0, n = e.childNodes.length; r < n; r++) {
                                t.appendChild(ieFix(e.childNodes[r]))
                            }
                        }
                        return t
                    } else {
                        return d.createTextNode(e.nodeValue)
                    }
                };
                var replacer = function (s, m1, m2) {
                    if (m1 !== "\\") {
                        return m1 + eval(m2)
                    } else {
                        return s
                    }
                };
                this.php_js = this.php_js || {};
                var phpjs = this.php_js,
                    ini = phpjs.ini,
                    obs = phpjs.obs;
                for (i = 0; i < argc; i++) {
                    arg = argv[i];
                    if (ini && ini["phpjs.echo_embedded_vars"]) {
                        arg = arg.replace(/(.?)\{?\$(\w*?\}|\w*)/g, replacer)
                    }
                    if (!phpjs.flushing && obs && obs.length) {
                        obs[obs.length - 1].buffer += arg;
                        continue
                    }
                    if (d.appendChild) {
                        if (d.body) {
                            if (win.navigator.appName === "Microsoft Internet Explorer") {
                                d.body.appendChild(stringToDOM(ieFix(arg)))
                            } else {
                                var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, "div")
                                    .cloneNode(true);
                                if (unappendedLeft) {
                                    d.body.appendChild(unappendedLeft)
                                }
                            }
                        } else {
                            d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, "description"))
                        }
                    } else if (d.write) {
                        d.write(arg)
                    }
                }
            };
            exports.htmlspecialchars = function (e, t, r, n) {
                var i = 0,
                    o = 0,
                    s = false;
                if (typeof t === "undefined" || t === null) {
                    t = 2
                }
                e = e.toString();
                if (n !== false) {
                    e = e.replace(/&/g, "&amp;")
                }
                e = e.replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                var a = {
                    ENT_NOQUOTES: 0,
                    ENT_HTML_QUOTE_SINGLE: 1,
                    ENT_HTML_QUOTE_DOUBLE: 2,
                    ENT_COMPAT: 2,
                    ENT_QUOTES: 3,
                    ENT_IGNORE: 4
                };
                if (t === 0) {
                    s = true
                }
                if (typeof t !== "number") {
                    t = [].concat(t);
                    for (o = 0; o < t.length; o++) {
                        if (a[t[o]] === 0) {
                            s = true
                        } else if (a[t[o]]) {
                            i = i | a[t[o]]
                        }
                    }
                    t = i
                }
                if (t & a.ENT_HTML_QUOTE_SINGLE) {
                    e = e.replace(/'/g, "&#039;")
                }
                if (!s) {
                    e = e.replace(/"/g, "&quot;")
                }
                return e
            };
            exports.htmlspecialchars_decode = function (e, t) {
                var r = 0,
                    n = 0,
                    i = false;
                if (typeof t === "undefined") {
                    t = 2
                }
                e = e.toString()
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">");
                var o = {
                    ENT_NOQUOTES: 0,
                    ENT_HTML_QUOTE_SINGLE: 1,
                    ENT_HTML_QUOTE_DOUBLE: 2,
                    ENT_COMPAT: 2,
                    ENT_QUOTES: 3,
                    ENT_IGNORE: 4
                };
                if (t === 0) {
                    i = true
                }
                if (typeof t !== "number") {
                    t = [].concat(t);
                    for (n = 0; n < t.length; n++) {
                        if (o[t[n]] === 0) {
                            i = true
                        } else if (o[t[n]]) {
                            r = r | o[t[n]]
                        }
                    }
                    t = r
                }
                if (t & o.ENT_HTML_QUOTE_SINGLE) {
                    e = e.replace(/&#0*39;/g, "'")
                }
                if (!i) {
                    e = e.replace(/&quot;/g, '"')
                }
                e = e.replace(/&amp;/g, "&");
                return e
            };
            exports.implode = function (e, t) {
                var r = "",
                    n = "",
                    i = "";
                if (arguments.length === 1) {
                    t = e;
                    e = ""
                }
                if (typeof t === "object") {
                    if (Object.prototype.toString.call(t) === "[object Array]") {
                        return t.join(e)
                    }
                    for (r in t) {
                        n += i + t[r];
                        i = e
                    }
                    return n
                }
                return t
            };
            exports.lcfirst = function (e) {
                e += "";
                var t = e.charAt(0)
                    .toLowerCase();
                return t + e.substr(1)
            };
            exports.levenshtein = function (e, t) {
                if (e == t) {
                    return 0
                }
                var r = e.length;
                var n = t.length;
                if (r === 0) {
                    return n
                }
                if (n === 0) {
                    return r
                }
                var i = false;
                try {
                    i = !"0" [0]
                } catch (e) {
                    i = true
                }
                if (i) {
                    e = e.split("");
                    t = t.split("")
                }
                var o = new Array(r + 1);
                var s = new Array(r + 1);
                var a = 0,
                    u = 0,
                    c = 0;
                for (a = 0; a < r + 1; a++) {
                    o[a] = a
                }
                var l = "",
                    f = "";
                for (u = 1; u <= n; u++) {
                    s[0] = u;
                    f = t[u - 1];
                    for (a = 0; a < r; a++) {
                        l = e[a];
                        c = l == f ? 0 : 1;
                        var p = o[a + 1] + 1;
                        var h = s[a] + 1;
                        var d = o[a] + c;
                        if (h < p) {
                            p = h
                        }
                        if (d < p) {
                            p = d
                        }
                        s[a + 1] = p
                    }
                    var g = o;
                    o = s;
                    s = g
                }
                return o[r]
            };
            exports.ltrim = function (e, t) {
                t = !t ? " \\s " : (t + "")
                    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, "$1");
                var r = new RegExp("^[" + t + "]+", "g");
                return (e + "")
                    .replace(r, "")
            };
            exports.metaphone = function (e, t) {
                var r = typeof e;
                if (r === "undefined" || r === "object" && e !== null) {
                    return null
                }
                if (r === "number") {
                    if (isNaN(e)) {
                        e = "NAN"
                    } else if (!isFinite(e)) {
                        e = "INF"
                    }
                }
                if (t < 0) {
                    return false
                }
                t = Math.floor(+t) || 0;
                var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    i = "AEIOU",
                    o = "EIY",
                    s = new RegExp("^[^" + n + "]+");
                e = typeof e === "string" ? e : "";
                e = e.toUpperCase()
                    .replace(s, "");
                if (!e) {
                    return ""
                }
                var a = function (e, t) {
                    return t !== "" && e.indexOf(t) !== -1
                };
                var u = 0,
                    c = e.charAt(0),
                    l = e.charAt(1),
                    f, p, h = e.length,
                    d = "",
                    g = true;
                switch (c) {
                case "A":
                    d += l === "E" ? l : c;
                    u += 1;
                    break;
                case "G":
                case "K":
                case "P":
                    if (l === "N") {
                        d += l;
                        u += 2
                    }
                    break;
                case "W":
                    if (l === "R") {
                        d += l;
                        u += 2
                    } else if (l === "H" || a(i, l)) {
                        d += "W";
                        u += 2
                    }
                    break;
                case "X":
                    d += "S";
                    u += 1;
                    break;
                case "E":
                case "I":
                case "O":
                case "U":
                    d += c;
                    u++;
                    break
                }
                for (; u < h && (t === 0 || d.length < t); u += 1) {
                    c = e.charAt(u);
                    l = e.charAt(u + 1);
                    p = e.charAt(u - 1);
                    f = e.charAt(u + 2);
                    if (c === p && c !== "C") {
                        continue
                    }
                    switch (c) {
                    case "B":
                        if (p !== "M") {
                            d += c
                        }
                        break;
                    case "C":
                        if (a(o, l)) {
                            if (l === "I" && f === "A") {
                                d += "X"
                            } else if (p !== "S") {
                                d += "S"
                            }
                        } else if (l === "H") {
                            d += !g && (f === "R" || p === "S") ? "K" : "X";
                            u += 1
                        } else {
                            d += "K"
                        }
                        break;
                    case "D":
                        if (l === "G" && a(o, f)) {
                            d += "J";
                            u += 1
                        } else {
                            d += "T"
                        }
                        break;
                    case "G":
                        if (l === "H") {
                            if (!(a("BDH", e.charAt(u - 3)) || e.charAt(u - 4) === "H")) {
                                d += "F";
                                u += 1
                            }
                        } else if (l === "N") {
                            if (a(n, f) && e.substr(u + 1, 3) !== "NED") {
                                d += "K"
                            }
                        } else if (a(o, l) && p !== "G") {
                            d += "J"
                        } else {
                            d += "K"
                        }
                        break;
                    case "H":
                        if (a(i, l) && !a("CGPST", p)) {
                            d += c
                        }
                        break;
                    case "K":
                        if (p !== "C") {
                            d += "K"
                        }
                        break;
                    case "P":
                        d += l === "H" ? "F" : c;
                        break;
                    case "Q":
                        d += "K";
                        break;
                    case "S":
                        if (l === "I" && a("AO", f)) {
                            d += "X"
                        } else if (l === "H") {
                            d += "X";
                            u += 1
                        } else if (!g && e.substr(u + 1, 3) === "CHW") {
                            d += "X";
                            u += 2
                        } else {
                            d += "S"
                        }
                        break;
                    case "T":
                        if (l === "I" && a("AO", f)) {
                            d += "X"
                        } else if (l === "H") {
                            d += "0";
                            u += 1
                        } else if (e.substr(u + 1, 2) !== "CH") {
                            d += "T"
                        }
                        break;
                    case "V":
                        d += "F";
                        break;
                    case "W":
                    case "Y":
                        if (a(i, l)) {
                            d += c
                        }
                        break;
                    case "X":
                        d += "KS";
                        break;
                    case "Z":
                        d += "S";
                        break;
                    case "F":
                    case "J":
                    case "L":
                    case "M":
                    case "N":
                    case "R":
                        d += c;
                        break
                    }
                }
                return d
            };
            exports.nl2br = function (e, t) {
                var r = t || typeof t === "undefined" ? "<br " + "/>" : "<br>";
                return (e + "")
                    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + r + "$2")
            };
            exports.number_format = function (e, t, r, n) {
                e = (e + "")
                    .replace(/[^0-9+\-Ee.]/g, "");
                var i = !isFinite(+e) ? 0 : +e,
                    o = !isFinite(+t) ? 0 : Math.abs(t),
                    s = typeof n === "undefined" ? "," : n,
                    a = typeof r === "undefined" ? "." : r,
                    u = "",
                    c = function (e, t) {
                        var r = Math.pow(10, t);
                        return "" + (Math.round(e * r) / r)
                            .toFixed(t)
                    };
                u = (o ? c(i, o) : "" + Math.round(i))
                    .split(".");
                if (u[0].length > 3) {
                    u[0] = u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, s)
                }
                if ((u[1] || "")
                    .length < o) {
                    u[1] = u[1] || "";
                    u[1] += new Array(o - u[1].length + 1)
                        .join("0")
                }
                return u.join(a)
            };
            exports.ord = function (e) {
                var t = e + "",
                    r = t.charCodeAt(0);
                if (55296 <= r && r <= 56319) {
                    var n = r;
                    if (t.length === 1) {
                        return r
                    }
                    var i = t.charCodeAt(1);
                    return (n - 55296) * 1024 + (i - 56320) + 65536
                }
                if (56320 <= r && r <= 57343) {
                    return r
                }
                return r
            };
            exports.parse_str = function (e, t) {
                var r = String(e)
                    .replace(/^&/, "")
                    .replace(/&$/, "")
                    .split("&"),
                    n = r.length,
                    i, o, s, a, u, c, l, f, p, h, d, g, y, v, m, b = function (e) {
                        return decodeURIComponent(e.replace(/\+/g, "%20"))
                    };
                if (!t) {
                    t = this.window
                }
                for (i = 0; i < n; i++) {
                    h = r[i].split("=");
                    d = b(h[0]);
                    g = h.length < 2 ? "" : b(h[1]);
                    while (d.charAt(0) === " ") {
                        d = d.slice(1)
                    }
                    if (d.indexOf("\0") > -1) {
                        d = d.slice(0, d.indexOf("\0"))
                    }
                    if (d && d.charAt(0) !== "[") {
                        v = [];
                        y = 0;
                        for (o = 0; o < d.length; o++) {
                            if (d.charAt(o) === "[" && !y) {
                                y = o + 1
                            } else if (d.charAt(o) === "]") {
                                if (y) {
                                    if (!v.length) {
                                        v.push(d.slice(0, y - 1))
                                    }
                                    v.push(d.substr(y, o - y));
                                    y = 0;
                                    if (d.charAt(o + 1) !== "[") {
                                        break
                                    }
                                }
                            }
                        }
                        if (!v.length) {
                            v = [d]
                        }
                        for (o = 0; o < v[0].length; o++) {
                            p = v[0].charAt(o);
                            if (p === " " || p === "." || p === "[") {
                                v[0] = v[0].substr(0, o) + "_" + v[0].substr(o + 1)
                            }
                            if (p === "[") {
                                break
                            }
                        }
                        c = t;
                        for (o = 0, m = v.length; o < m; o++) {
                            d = v[o].replace(/^['"]/, "")
                                .replace(/['"]$/, "");
                            l = o !== v.length - 1;
                            u = c;
                            if (d !== "" && d !== " " || o === 0) {
                                if (c[d] === f) {
                                    c[d] = {}
                                }
                                c = c[d]
                            } else {
                                s = -1;
                                for (a in c) {
                                    if (c.hasOwnProperty(a)) {
                                        if (+a > s && a.match(/^\d+$/g)) {
                                            s = +a
                                        }
                                    }
                                }
                                d = s + 1
                            }
                        }
                        u[d] = g
                    }
                }
            };
            exports.quoted_printable_decode = function (e) {
                var t = /=\r\n/gm,
                    r = /=([0-9A-F]{2})/gim,
                    n = function (e, t) {
                        return String.fromCharCode(parseInt(t, 16))
                    };
                return e.replace(t, "")
                    .replace(r, n)
            };
            exports.quoted_printable_encode = function (e) {
                var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
                    r = / \r\n|\r\n|[^!-<>-~ ]/gm,
                    n = function (e) {
                        if (e.length > 1) {
                            return e.replace(" ", "=20")
                        }
                        var r = e.charCodeAt(0);
                        return "=" + t[r >>> 4 & 15] + t[r & 15]
                    };
                RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g, RFC2045Encode2OUT = function (e) {
                    if (e.substr(e.length - 2) === "\r\n") {
                        return e
                    }
                    return e + "=\r\n"
                };
                e = e.replace(r, n)
                    .replace(RFC2045Encode2IN, RFC2045Encode2OUT);
                return e.substr(0, e.length - 3)
            };
            exports.quotemeta = function (e) {
                return (e + "")
                    .replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, "\\$1")
            };
            exports.rtrim = function (e, t) {
                t = !t ? " \\s " : (t + "")
                    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, "\\$1");
                var r = new RegExp("[" + t + "]+$", "g");
                return (e + "")
                    .replace(r, "")
            };
            exports.similar_text = function (e, t, r) {
                if (e === null || t === null || typeof e === "undefined" || typeof t === "undefined") {
                    return 0
                }
                e += "";
                t += "";
                var n = 0,
                    i = 0,
                    o = 0,
                    s = e.length,
                    a = t.length,
                    u, c, l, f;
                o = 0;
                for (u = 0; u < s; u++) {
                    for (c = 0; c < a; c++) {
                        for (l = 0; u + l < s && c + l < a && e.charAt(u + l) === t.charAt(c + l); l++);
                        if (l > o) {
                            o = l;
                            n = u;
                            i = c
                        }
                    }
                }
                f = o;
                if (f) {
                    if (n && i) {
                        f += this.similar_text(e.substr(0, n), t.substr(0, i))
                    }
                    if (n + o < s && i + o < a) {
                        f += this.similar_text(e.substr(n + o, s - n - o), t.substr(i + o, a - i - o))
                    }
                }
                if (!r) {
                    return f
                } else {
                    return f * 200 / (s + a)
                }
            };
            exports.soundex = function (e) {
                e = (e + "")
                    .toUpperCase();
                if (!e) {
                    return ""
                }
                var t = [0, 0, 0, 0],
                    r = {
                        B: 1,
                        F: 1,
                        P: 1,
                        V: 1,
                        C: 2,
                        G: 2,
                        J: 2,
                        K: 2,
                        Q: 2,
                        S: 2,
                        X: 2,
                        Z: 2,
                        D: 3,
                        T: 3,
                        L: 4,
                        M: 5,
                        N: 5,
                        R: 6
                    },
                    n = 0,
                    i, o = 0,
                    s, a;
                while ((s = e.charAt(n++)) && o < 4) {
                    if (i = r[s]) {
                        if (i !== a) {
                            t[o++] = a = i
                        }
                    } else {
                        o += n === 1;
                        a = 0
                    }
                }
                t[0] = e.charAt(0);
                return t.join("")
            };
            exports.sprintf = function () {
                var e = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
                var t = arguments;
                var r = 0;
                var n = t[r++];
                var i = function (e, t, r, n) {
                    if (!r) {
                        r = " "
                    }
                    var i = e.length >= t ? "" : new Array(1 + t - e.length >>> 0)
                        .join(r);
                    return n ? e + i : i + e
                };
                var o = function (e, t, r, n, o, s) {
                    var a = n - e.length;
                    if (a > 0) {
                        if (r || !o) {
                            e = i(e, n, s, r)
                        } else {
                            e = e.slice(0, t.length) + i("", a, "0", true) + e.slice(t.length)
                        }
                    }
                    return e
                };
                var s = function (e, t, r, n, s, a, u) {
                    var c = e >>> 0;
                    r = r && c && {
                        2: "0b",
                        8: "0",
                        16: "0x"
                    }[t] || "";
                    e = r + i(c.toString(t), a || 0, "0", false);
                    return o(e, r, n, s, u)
                };
                var a = function (e, t, r, n, i, s) {
                    if (n != null) {
                        e = e.slice(0, n)
                    }
                    return o(e, "", t, r, i, s)
                };
                var u = function (e, n, u, c, l, f, p) {
                    var h, d, g, y, v;
                    if (e === "%%") {
                        return "%"
                    }
                    var m = false;
                    var b = "";
                    var _ = false;
                    var w = false;
                    var C = " ";
                    var k = u.length;
                    for (var A = 0; u && A < k; A++) {
                        switch (u.charAt(A)) {
                        case " ":
                            b = " ";
                            break;
                        case "+":
                            b = "+";
                            break;
                        case "-":
                            m = true;
                            break;
                        case "'":
                            C = u.charAt(A + 1);
                            break;
                        case "0":
                            _ = true;
                            C = "0";
                            break;
                        case "#":
                            w = true;
                            break
                        }
                    }
                    if (!c) {
                        c = 0
                    } else if (c === "*") {
                        c = +t[r++]
                    } else if (c.charAt(0) == "*") {
                        c = +t[c.slice(1, -1)]
                    } else {
                        c = +c
                    }
                    if (c < 0) {
                        c = -c;
                        m = true
                    }
                    if (!isFinite(c)) {
                        throw new Error("sprintf: (minimum-)width must be finite")
                    }
                    if (!f) {
                        f = "fFeE".indexOf(p) > -1 ? 6 : p === "d" ? 0 : undefined
                    } else if (f === "*") {
                        f = +t[r++]
                    } else if (f.charAt(0) == "*") {
                        f = +t[f.slice(1, -1)]
                    } else {
                        f = +f
                    }
                    v = n ? t[n.slice(0, -1)] : t[r++];
                    switch (p) {
                    case "s":
                        return a(String(v), m, c, f, _, C);
                    case "c":
                        return a(String.fromCharCode(+v), m, c, f, _);
                    case "b":
                        return s(v, 2, w, m, c, f, _);
                    case "o":
                        return s(v, 8, w, m, c, f, _);
                    case "x":
                        return s(v, 16, w, m, c, f, _);
                    case "X":
                        return s(v, 16, w, m, c, f, _)
                            .toUpperCase();
                    case "u":
                        return s(v, 10, w, m, c, f, _);
                    case "i":
                    case "d":
                        h = +v || 0;
                        h = Math.round(h - h % 1);
                        d = h < 0 ? "-" : b;
                        v = d + i(String(Math.abs(h)), f, "0", false);
                        return o(v, d, m, c, _);
                    case "e":
                    case "E":
                    case "f":
                    case "F":
                    case "g":
                    case "G":
                        h = +v;
                        d = h < 0 ? "-" : b;
                        g = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(p.toLowerCase())];
                        y = ["toString", "toUpperCase"]["eEfFgG".indexOf(p) % 2];
                        v = d + Math.abs(h)[g](f);
                        return o(v, d, m, c, _)[y]();
                    default:
                        return e
                    }
                };
                return n.replace(e, u)
            };
            exports.sscanf = function (e, t) {
                var r = [],
                    n = 0,
                    i = /\S/,
                    o = arguments,
                    s = this,
                    a;
                var u = function (e) {
                    var n = t.slice(e)
                        .match(/%[cdeEufgosxX]/g);
                    if (n) {
                        var i = n.length;
                        while (i--) {
                            r.push(null)
                        }
                    }
                    return c()
                };
                var c = function () {
                    if (o.length === 2) {
                        return r
                    }
                    for (var e = 0; e < r.length; ++e) {
                        s.window[o[e + 2]] = r[e]
                    }
                    return e
                };
                var l = function (t, n, i) {
                    if (d) {
                        var o = e.slice(t);
                        var s = h ? o.substr(0, h) : o;
                        var u = n.exec(s);
                        var c = r[a !== undefined ? a : r.length] = u ? i ? i.apply(null, u) : u[0] : null;
                        if (c === null) {
                            throw "No match in string"
                        }
                        return t + u[0].length
                    }
                    return t
                };
                if (arguments.length < 2) {
                    throw "Not enough arguments passed to sscanf"
                }
                for (var f = 0, p = 0; f < t.length; f++) {
                    var h = 0,
                        d = true;
                    if (t.charAt(f) === "%") {
                        if (t.charAt(f + 1) === "%") {
                            if (e.charAt(p) === "%") {
                                ++f, ++p;
                                continue
                            }
                            return u(f + 2)
                        }
                        var g = new RegExp("^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)", "g");
                        var y = g.exec(t.slice(f + 1));
                        var v = a;
                        if (v && y[1] === undefined) {
                            throw "All groups in sscanf() must be expressed as numeric if any have already been used"
                        }
                        a = y[1] ? parseInt(y[1], 10) - 1 : undefined;
                        d = !y[2];
                        h = parseInt(y[3], 10);
                        var m = y[4];
                        f += g.lastIndex;
                        if (m) {
                            switch (m) {
                            case "h":
                            case "l":
                            case "L":
                                break;
                            default:
                                throw "Unexpected size specifier in sscanf()!";
                                break
                            }
                        }
                        try {
                            switch (t.charAt(f + 1)) {
                            case "F":
                                break;
                            case "g":
                                break;
                            case "G":
                                break;
                            case "b":
                                break;
                            case "i":
                                p = l(p, /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/, function (e, t, r, n, i) {
                                    return r ? parseInt(e, 16) : n ? parseInt(e, 8) : parseInt(e, 10)
                                });
                                break;
                            case "n":
                                r[a !== undefined ? a : r.length - 1] = p;
                                break;
                            case "c":
                                p = l(p, new RegExp(".{1," + (h || 1) + "}"));
                                break;
                            case "D":
                            case "d":
                                p = l(p, /([+-])?(?:0*)(\d+)/, function (e, t, r) {
                                    var n = parseInt((t || "") + r, 10);
                                    if (n < 0) {
                                        return n < -2147483648 ? -2147483648 : n
                                    } else {
                                        return n < 2147483647 ? n : 2147483647
                                    }
                                });
                                break;
                            case "f":
                            case "E":
                            case "e":
                                p = l(p, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function (e, t, r) {
                                    if (r === ".") {
                                        return null
                                    }
                                    return parseFloat((t || "") + r)
                                });
                                break;
                            case "u":
                                p = l(p, /([+-])?(?:0*)(\d+)/, function (e, t, r) {
                                    var n = parseInt(r, 10);
                                    if (t === "-") {
                                        return 4294967296 - n
                                    } else {
                                        return n < 4294967295 ? n : 4294967295
                                    }
                                });
                                break;
                            case "o":
                                p = l(p, /([+-])?(?:0([0-7]+))/, function (e, t, r) {
                                    return parseInt(e, 8)
                                });
                                break;
                            case "s":
                                p = l(p, /\S+/);
                                break;
                            case "X":
                            case "x":
                                p = l(p, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function (e, t, r) {
                                    return parseInt(e, 16)
                                });
                                break;
                            case "":
                                throw "Missing character after percent mark in sscanf() format argument";
                            default:
                                throw "Unrecognized character after percent mark in sscanf() format argument"
                            }
                        } catch (e) {
                            if (e === "No match in string") {
                                return u(f + 2)
                            }
                        }++f
                    } else if (t.charAt(f) !== e.charAt(p)) {
                        i.lastIndex = 0;
                        if (i.test(e.charAt(p)) || e.charAt(p) === "") {
                            return u(f + 1)
                        } else {
                            e = e.slice(0, p) + e.slice(p + 1);
                            f--
                        }
                    } else {
                        p++
                    }
                }
                return c()
            };
            exports.str_getcsv = function (e, t, r, n) {
                var i, o, s = [];
                var a = function (e) {
                    return e.split("")
                        .reverse()
                        .join("")
                };
                var u = function (e) {
                    return String(e)
                        .replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<\>\|\:])/g, "\\$1")
                };
                t = t || ",";
                r = r || '"';
                n = n || "\\";
                var c = u(r);
                var l = u(n);
                e = e.replace(new RegExp("^\\s*" + c), "")
                    .replace(new RegExp(c + "\\s*$"), "");
                e = a(e)
                    .split(new RegExp(c + "\\s*" + u(t) + "\\s*" + c + "(?!" + l + ")", "g"))
                    .reverse();
                for (i = 0, o = e.length; i < o; i++) {
                    s.push(a(e[i])
                        .replace(new RegExp(l + c, "g"), r))
                }
                return s
            };
            exports.str_ireplace = function (e, t, r) {
                var n, i = "";
                var o = 0;
                var s;
                var a = function (e) {
                    return e.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, "\\$1")
                };
                e += "";
                o = e.length;
                if (Object.prototype.toString.call(t) !== "[object Array]") {
                    t = [t];
                    if (Object.prototype.toString.call(e) === "[object Array]") {
                        while (o > t.length) {
                            t[t.length] = t[0]
                        }
                    }
                }
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    e = [e]
                }
                while (e.length > t.length) {
                    t[t.length] = ""
                }
                if (Object.prototype.toString.call(r) === "[object Array]") {
                    for (i in r) {
                        if (r.hasOwnProperty(i)) {
                            r[i] = str_ireplace(e, t, r[i])
                        }
                    }
                    return r
                }
                o = e.length;
                for (n = 0; n < o; n++) {
                    s = new RegExp(a(e[n]), "gi");
                    r = r.replace(s, t[n])
                }
                return r
            };
            exports.str_pad = function (e, t, r, n) {
                var i = "",
                    o;
                var s = function (e, t) {
                    var r = "",
                        n;
                    while (r.length < t) {
                        r += e
                    }
                    r = r.substr(0, t);
                    return r
                };
                e += "";
                r = r !== undefined ? r : " ";
                if (n !== "STR_PAD_LEFT" && n !== "STR_PAD_RIGHT" && n !== "STR_PAD_BOTH") {
                    n = "STR_PAD_RIGHT"
                }
                if ((o = t - e.length) > 0) {
                    if (n === "STR_PAD_LEFT") {
                        e = s(r, o) + e
                    } else if (n === "STR_PAD_RIGHT") {
                        e = e + s(r, o)
                    } else if (n === "STR_PAD_BOTH") {
                        i = s(r, Math.ceil(o / 2));
                        e = i + e + i;
                        e = e.substr(0, t)
                    }
                }
                return e
            };
            exports.str_repeat = function (e, t) {
                var r = "";
                while (true) {
                    if (t & 1) {
                        r += e
                    }
                    t >>= 1;
                    if (t) {
                        e += e
                    } else {
                        break
                    }
                }
                return r
            };
            exports.str_replace = function (e, t, r, n) {
                var i = 0,
                    o = 0,
                    s = "",
                    a = "",
                    u = 0,
                    c = 0,
                    l = [].concat(e),
                    f = [].concat(t),
                    p = r,
                    h = Object.prototype.toString.call(f) === "[object Array]",
                    d = Object.prototype.toString.call(p) === "[object Array]";
                p = [].concat(p);
                if (n) {
                    this.window[n] = 0
                }
                for (i = 0, u = p.length; i < u; i++) {
                    if (p[i] === "") {
                        continue
                    }
                    for (o = 0, c = l.length; o < c; o++) {
                        s = p[i] + "";
                        a = h ? f[o] !== undefined ? f[o] : "" : f[0];
                        p[i] = s.split(l[o])
                            .join(a);
                        if (n && p[i] !== s) {
                            this.window[n] += (s.length - p[i].length) / l[o].length
                        }
                    }
                }
                return d ? p : p[0]
            };
            exports.str_rot13 = function (e) {
                return (e + "")
                    .replace(/[a-z]/gi, function (e) {
                        return String.fromCharCode(e.charCodeAt(0) + (e.toLowerCase() < "n" ? 13 : -13))
                    })
            };
            exports.str_shuffle = function (e) {
                if (arguments.length === 0) {
                    throw "Wrong parameter count for str_shuffle()"
                }
                if (e == null) {
                    return ""
                }
                e += "";
                var t = "",
                    r, n = e.length;
                while (n) {
                    r = Math.floor(Math.random() * n);
                    t += e.charAt(r);
                    e = e.substring(0, r) + e.substr(r + 1);
                    n--
                }
                return t
            };
            exports.str_split = function (e, t) {
                if (t === null) {
                    t = 1
                }
                if (e === null || t < 1) {
                    return false
                }
                e += "";
                var r = [],
                    n = 0,
                    i = e.length;
                while (n < i) {
                    r.push(e.slice(n, n += t))
                }
                return r
            };
            exports.strcasecmp = function (e, t) {
                var r = (e + "")
                    .toLowerCase();
                var n = (t + "")
                    .toLowerCase();
                if (r > n) {
                    return 1
                } else if (r == n) {
                    return 0
                }
                return -1
            };
            exports.strcmp = function (e, t) {
                return e == t ? 0 : e > t ? 1 : -1
            };
            exports.strcspn = function (e, t, r, n) {
                r = r ? r : 0;
                var i = n && r + n < e.length ? r + n : e.length;
                e: for (var o = r, s = 0; o < i; o++) {
                    for (var a = 0; a < t.length; a++) {
                        if (e.charAt(o)
                            .indexOf(t[a]) !== -1) {
                            continue e
                        }
                    }++s
                }
                return s
            };
            exports.strip_tags = function (e, t) {
                t = (((t || "") + "")
                        .toLowerCase()
                        .match(/<[a-z][a-z0-9]*>/g) || [])
                    .join("");
                var r = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                    n = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
                return e.replace(n, "")
                    .replace(r, function (e, r) {
                        return t.indexOf("<" + r.toLowerCase() + ">") > -1 ? e : ""
                    })
            };
            exports.stripos = function (e, t, r) {
                var n = (e + "")
                    .toLowerCase();
                var i = (t + "")
                    .toLowerCase();
                var o = 0;
                if ((o = n.indexOf(i, r)) !== -1) {
                    return o
                }
                return false
            };
            exports.stripslashes = function (e) {
                return (e + "")
                    .replace(/\\(.?)/g, function (e, t) {
                        switch (t) {
                        case "\\":
                            return "\\";
                        case "0":
                            return "\0";
                        case "":
                            return "";
                        default:
                            return t
                        }
                    })
            };
            exports.stristr = function (e, t, r) {
                var n = 0;
                e += "";
                n = e.toLowerCase()
                    .indexOf((t + "")
                        .toLowerCase());
                if (n == -1) {
                    return false
                } else {
                    if (r) {
                        return e.substr(0, n)
                    } else {
                        return e.slice(n)
                    }
                }
            };
            exports.strlen = function (e) {
                var t = e + "";
                var r = 0,
                    n = "",
                    i = 0;
                if (!this.php_js || !this.php_js.ini || !this.php_js.ini["unicode.semantics"] || this.php_js.ini["unicode.semantics"].local_value
                    .toLowerCase() !== "on") {
                    return e.length
                }
                var o = function (e, t) {
                    var r = e.charCodeAt(t);
                    var n = "",
                        i = "";
                    if (55296 <= r && r <= 56319) {
                        if (e.length <= t + 1) {
                            throw "High surrogate without following low surrogate"
                        }
                        n = e.charCodeAt(t + 1);
                        if (56320 > n || n > 57343) {
                            throw "High surrogate without following low surrogate"
                        }
                        return e.charAt(t) + e.charAt(t + 1)
                    } else if (56320 <= r && r <= 57343) {
                        if (t === 0) {
                            throw "Low surrogate without preceding high surrogate"
                        }
                        i = e.charCodeAt(t - 1);
                        if (55296 > i || i > 56319) {
                            throw "Low surrogate without preceding high surrogate"
                        }
                        return false
                    }
                    return e.charAt(t)
                };
                for (r = 0, i = 0; r < t.length; r++) {
                    if ((n = o(t, r)) === false) {
                        continue
                    }
                    i++
                }
                return i
            };
            exports.strnatcasecmp = function (e, t) {
                var r = (e + "")
                    .toLowerCase();
                var n = (t + "")
                    .toLowerCase();
                var i = function (e) {
                    return e.charCodeAt(0) <= 32
                };
                var o = function (e) {
                    var t = e.charCodeAt(0);
                    return t >= 48 && t <= 57
                };
                var s = function (e, t) {
                    var r = 0;
                    var n = 0;
                    var i = 0;
                    var s;
                    var a;
                    for (var u = 0; true; n++, i++) {
                        s = e.charAt(n);
                        a = t.charAt(i);
                        if (!o(s) && !o(a)) {
                            return r
                        } else if (!o(s)) {
                            return -1
                        } else if (!o(a)) {
                            return 1
                        } else if (s < a) {
                            if (r === 0) {
                                r = -1
                            }
                        } else if (s > a) {
                            if (r === 0) {
                                r = 1
                            }
                        } else if (s === "0" && a === "0") {
                            return r
                        }
                    }
                };
                var a = 0,
                    u = 0;
                var c = 0,
                    l = 0;
                var f, p;
                var h;
                while (true) {
                    c = l = 0;
                    f = r.charAt(a);
                    p = n.charAt(u);
                    while (i(f) || f === "0") {
                        if (f === "0") {
                            c++
                        } else {
                            c = 0
                        }
                        f = r.charAt(++a)
                    }
                    while (i(p) || p === "0") {
                        if (p === "0") {
                            l++
                        } else {
                            l = 0
                        }
                        p = n.charAt(++u)
                    }
                    if (o(f) && o(p)) {
                        if ((h = s(r.substring(a), n.substring(u))) !== 0) {
                            return h
                        }
                    }
                    if (f === "0" && p === "0") {
                        return c - l
                    }
                    if (f < p) {
                        return -1
                    } else if (f > p) {
                        return +1
                    }
                    if (a >= r.length && u >= n.length) return 0;
                    ++a;
                    ++u
                }
            };
            exports.strncasecmp = function (e, t, r) {
                var n, i = 0;
                var o = (e + "")
                    .toLowerCase()
                    .substr(0, r);
                var s = (t + "")
                    .toLowerCase()
                    .substr(0, r);
                if (o.length !== s.length) {
                    if (o.length < s.length) {
                        r = o.length;
                        if (s.substr(0, o.length) == o) {
                            return o.length - s.length
                        }
                    } else {
                        r = s.length;
                        if (o.substr(0, s.length) == s) {
                            return o.length - s.length
                        }
                    }
                } else {
                    r = o.length
                }
                for (n = 0, i = 0; i < r; i++) {
                    n = o.charCodeAt(i) - s.charCodeAt(i);
                    if (n !== 0) {
                        return n
                    }
                }
                return 0
            };
            exports.strncmp = function (e, t, r) {
                var n = (e + "")
                    .substr(0, r);
                var i = (t + "")
                    .substr(0, r);
                return n == i ? 0 : n > i ? 1 : -1
            };
            exports.strpbrk = function (e, t) {
                for (var r = 0, n = e.length; r < n; ++r) {
                    if (t.indexOf(e.charAt(r)) >= 0) {
                        return e.slice(r)
                    }
                }
                return false
            };
            exports.strpos = function (e, t, r) {
                var n = (e + "")
                    .indexOf(t, r || 0);
                return n === -1 ? false : n
            };
            exports.strrchr = function (e, t) {
                var r = 0;
                if (typeof t !== "string") {
                    t = String.fromCharCode(parseInt(t, 10))
                }
                t = t.charAt(0);
                r = e.lastIndexOf(t);
                if (r === -1) {
                    return false
                }
                return e.substr(r)
            };
            exports.strrev = function (e) {
                e = e + "";
                var t =
                    /(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
                e = e.replace(t, "$2$1");
                return e.split("")
                    .reverse()
                    .join("")
            };
            exports.strripos = function (e, t, r) {
                e = (e + "")
                    .toLowerCase();
                t = (t + "")
                    .toLowerCase();
                var n = -1;
                if (r) {
                    n = (e + "")
                        .slice(r)
                        .lastIndexOf(t);
                    if (n !== -1) {
                        n += r
                    }
                } else {
                    n = (e + "")
                        .lastIndexOf(t)
                }
                return n >= 0 ? n : false
            };
            exports.strrpos = function (e, t, r) {
                var n = -1;
                if (r) {
                    n = (e + "")
                        .slice(r)
                        .lastIndexOf(t);
                    if (n !== -1) {
                        n += r
                    }
                } else {
                    n = (e + "")
                        .lastIndexOf(t)
                }
                return n >= 0 ? n : false
            };
            exports.strspn = function (e, t, r, n) {
                var i;
                var o;
                var s;
                var a = 0;
                var u = 0;
                r = r ? r < 0 ? e.length + r : r : 0;
                n = n ? n < 0 ? e.length + n - r : n : e.length - r;
                e = e.substr(r, n);
                for (u = 0; u < e.length; u++) {
                    i = 0;
                    o = e.substring(u, u + 1);
                    for (a = 0; a <= t.length; a++) {
                        s = t.substring(a, a + 1);
                        if (o == s) {
                            i = 1;
                            break
                        }
                    }
                    if (i != 1) {
                        return u
                    }
                }
                return u
            };
            exports.strstr = function (e, t, r) {
                var n = 0;
                e += "";
                n = e.indexOf(t);
                if (n == -1) {
                    return false
                } else {
                    if (r) {
                        return e.substr(0, n)
                    } else {
                        return e.slice(n)
                    }
                }
            };
            exports.strtok = function (e, t) {
                this.php_js = this.php_js || {};
                if (t === undefined) {
                    t = e;
                    e = this.php_js.strtokleftOver
                }
                if (e.length === 0) {
                    return false
                }
                if (t.indexOf(e.charAt(0)) !== -1) {
                    return this.strtok(e.substr(1), t)
                }
                for (var r = 0; r < e.length; r++) {
                    if (t.indexOf(e.charAt(r)) !== -1) {
                        break
                    }
                }
                this.php_js.strtokleftOver = e.substr(r + 1);
                return e.substring(0, r)
            };
            exports.strtolower = function (e) {
                return (e + "")
                    .toLowerCase()
            };
            exports.strtoupper = function (e) {
                return (e + "")
                    .toUpperCase()
            };
            exports.substr = function (e, t, r) {
                var n = 0,
                    i = true,
                    o = 0,
                    s = 0,
                    a = 0,
                    u = "";
                e += "";
                var c = e.length;
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                switch (this.php_js.ini["unicode.semantics"] && this.php_js.ini["unicode.semantics"].local_value.toLowerCase()) {
                case "on":
                    for (n = 0; n < e.length; n++) {
                        if (/[\uD800-\uDBFF]/.test(e.charAt(n)) && /[\uDC00-\uDFFF]/.test(e.charAt(n + 1))) {
                            i = false;
                            break
                        }
                    }
                    if (!i) {
                        if (t < 0) {
                            for (n = c - 1, o = t += c; n >= o; n--) {
                                if (/[\uDC00-\uDFFF]/.test(e.charAt(n)) && /[\uD800-\uDBFF]/.test(e.charAt(n - 1))) {
                                    t--;
                                    o--
                                }
                            }
                        } else {
                            var l = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                            while (l.exec(e) != null) {
                                var f = l.lastIndex;
                                if (f - 2 < t) {
                                    t++
                                } else {
                                    break
                                }
                            }
                        }
                        if (t >= c || t < 0) {
                            return false
                        }
                        if (r < 0) {
                            for (n = c - 1, s = c += r; n >= s; n--) {
                                if (/[\uDC00-\uDFFF]/.test(e.charAt(n)) && /[\uD800-\uDBFF]/.test(e.charAt(n - 1))) {
                                    c--;
                                    s--
                                }
                            }
                            if (t > c) {
                                return false
                            }
                            return e.slice(t, c)
                        } else {
                            a = t + r;
                            for (n = t; n < a; n++) {
                                u += e.charAt(n);
                                if (/[\uD800-\uDBFF]/.test(e.charAt(n)) && /[\uDC00-\uDFFF]/.test(e.charAt(n + 1))) {
                                    a++
                                }
                            }
                            return u
                        }
                        break
                    }
                case "off":
                default:
                    if (t < 0) {
                        t += c
                    }
                    c = typeof r === "undefined" ? c : r < 0 ? r + c : r + t;
                    return t >= e.length || t < 0 || t > c ? !1 : e.slice(t, c)
                }
                return undefined
            };
            exports.substr_compare = function (e, t, r, n, i) {
                if (!r && r !== 0) {
                    throw "Missing offset for substr_compare()"
                }
                if (r < 0) {
                    r = e.length + r
                }
                if (n && n > e.length - r) {
                    return false
                }
                n = n || e.length - r;
                e = e.substr(r, n);
                t = t.substr(0, n);
                if (i) {
                    e = (e + "")
                        .toLowerCase();
                    t = (t + "")
                        .toLowerCase();
                    if (e == t) {
                        return 0
                    }
                    return e > t ? 1 : -1
                }
                return e == t ? 0 : e > t ? 1 : -1
            };
            exports.substr_count = function (e, t, r, n) {
                var i = 0;
                e += "";
                t += "";
                if (isNaN(r)) {
                    r = 0
                }
                if (isNaN(n)) {
                    n = 0
                }
                if (t.length == 0) {
                    return false
                }
                r--;
                while ((r = e.indexOf(t, r + 1)) != -1) {
                    if (n > 0 && r + t.length > n) {
                        return false
                    }
                    i++
                }
                return i
            };
            exports.substr_replace = function (e, t, r, n) {
                if (r < 0) {
                    r = r + e.length
                }
                n = n !== undefined ? n : e.length;
                if (n < 0) {
                    n = n + e.length - r
                }
                return e.slice(0, r) + t.substr(0, n) + t.slice(n) + e.slice(r + n)
            };
            exports.trim = function (e, t) {
                var r, n = 0,
                    i = 0;
                e += "";
                if (!t) {
                    r = " \n\r\t\f\v            ​\u2028\u2029　"
                } else {
                    t += "";
                    r = t.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, "$1")
                }
                n = e.length;
                for (i = 0; i < n; i++) {
                    if (r.indexOf(e.charAt(i)) === -1) {
                        e = e.substring(i);
                        break
                    }
                }
                n = e.length;
                for (i = n - 1; i >= 0; i--) {
                    if (r.indexOf(e.charAt(i)) === -1) {
                        e = e.substring(0, i + 1);
                        break
                    }
                }
                return r.indexOf(e.charAt(0)) === -1 ? e : ""
            };
            exports.ucfirst = function (e) {
                e += "";
                var t = e.charAt(0)
                    .toUpperCase();
                return t + e.substr(1)
            };
            exports.ucwords = function (e) {
                return (e + "")
                    .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function (e) {
                        return e.toUpperCase()
                    })
            };
            exports.wordwrap = function (e, t, r, n) {
                var i = arguments.length >= 2 ? arguments[1] : 75;
                var o = arguments.length >= 3 ? arguments[2] : "\n";
                var s = arguments.length >= 4 ? arguments[3] : false;
                var a, u, c, l, f;
                e += "";
                if (i < 1) {
                    return e
                }
                for (a = -1, c = (f = e.split(/\r\n|\n|\r/))
                    .length; ++a < c; f[a] += l) {
                    for (l = f[a], f[a] = ""; l.length > i; f[a] += l.slice(0, u) + ((l = l.slice(u))
                            .length ? o : "")) {
                        u = s == 2 || (u = l.slice(0, i + 1)
                            .match(/\S*(\s)?$/))[1] ? i : u.input.length - u[0].length || s == 1 && i || u.input.length + (u = l.slice(
                                i)
                            .match(/^\S*/))[0].length
                    }
                }
                return f.join("\n")
            };
            exports.base64_decode = function (e) {
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var r, n, i, o, s, a, u, c, l = 0,
                    f = 0,
                    p = "",
                    h = [];
                if (!e) {
                    return e
                }
                e += "";
                do {
                    o = t.indexOf(e.charAt(l++));
                    s = t.indexOf(e.charAt(l++));
                    a = t.indexOf(e.charAt(l++));
                    u = t.indexOf(e.charAt(l++));
                    c = o << 18 | s << 12 | a << 6 | u;
                    r = c >> 16 & 255;
                    n = c >> 8 & 255;
                    i = c & 255;
                    if (a == 64) {
                        h[f++] = String.fromCharCode(r)
                    } else if (u == 64) {
                        h[f++] = String.fromCharCode(r, n)
                    } else {
                        h[f++] = String.fromCharCode(r, n, i)
                    }
                } while (l < e.length);
                p = h.join("");
                return decodeURIComponent(escape(p.replace(/\0+$/, "")))
            };
            exports.base64_encode = function (e) {
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var r, n, i, o, s, a, u, c, l = 0,
                    f = 0,
                    p = "",
                    h = [];
                if (!e) {
                    return e
                }
                e = unescape(encodeURIComponent(e));
                do {
                    r = e.charCodeAt(l++);
                    n = e.charCodeAt(l++);
                    i = e.charCodeAt(l++);
                    c = r << 16 | n << 8 | i;
                    o = c >> 18 & 63;
                    s = c >> 12 & 63;
                    a = c >> 6 & 63;
                    u = c & 63;
                    h[f++] = t.charAt(o) + t.charAt(s) + t.charAt(a) + t.charAt(u)
                } while (l < e.length);
                p = h.join("");
                var d = e.length % 3;
                return (d ? p.slice(0, d - 3) : p) + "===".slice(d || 3)
            };
            exports.parse_url = function (e, t) {
                var r, n = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory",
                        "file", "query", "fragment"
                    ],
                    i = this.php_js && this.php_js.ini || {},
                    o = i["phpjs.parse_url.mode"] && i["phpjs.parse_url.mode"].local_value || "php",
                    s = {
                        php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    };
                var a = s[o].exec(e),
                    u = {},
                    c = 14;
                while (c--) {
                    if (a[c]) {
                        u[n[c]] = a[c]
                    }
                }
                if (t) {
                    return u[t.replace("PHP_URL_", "")
                        .toLowerCase()]
                }
                if (o !== "php") {
                    var l = i["phpjs.parse_url.queryKey"] && i["phpjs.parse_url.queryKey"].local_value || "queryKey";
                    s = /(?:^|&)([^&=]*)=?([^&]*)/g;
                    u[l] = {};
                    r = u[n[12]] || "";
                    r.replace(s, function (e, t, r) {
                        if (t) {
                            u[l][t] = r
                        }
                    })
                }
                delete u.source;
                return u
            };
            exports.rawurldecode = function (e) {
                return decodeURIComponent((e + "")
                    .replace(/%(?![\da-f]{2})/gi, function () {
                        return "%25"
                    }))
            };
            exports.rawurlencode = function (e) {
                e = (e + "")
                    .toString();
                return encodeURIComponent(e)
                    .replace(/!/g, "%21")
                    .replace(/'/g, "%27")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/\*/g, "%2A")
            };
            exports.urldecode = function (e) {
                return decodeURIComponent((e + "")
                    .replace(/%(?![\da-f]{2})/gi, function () {
                        return "%25"
                    })
                    .replace(/\+/g, "%20"))
            };
            exports.urlencode = function (e) {
                e = (e + "")
                    .toString();
                return encodeURIComponent(e)
                    .replace(/!/g, "%21")
                    .replace(/'/g, "%27")
                    .replace(/\(/g, "%28")
                    .replace(/\)/g, "%29")
                    .replace(/\*/g, "%2A")
                    .replace(/%20/g, "+")
            };
            exports.empty = function (e) {
                var t, r, n, i;
                var o = [t, null, false, 0, "", "0"];
                for (n = 0, i = o.length; n < i; n++) {
                    if (e === o[n]) {
                        return true
                    }
                }
                if (typeof e === "object") {
                    for (r in e) {
                        return false
                    }
                    return true
                }
                return false
            };
            exports.floatval = function (e) {
                return parseFloat(e) || 0
            };
            exports.intval = function (e, t) {
                var r;
                var n = typeof e;
                if (n === "boolean") {
                    return +e
                } else if (n === "string") {
                    r = parseInt(e, t || 10);
                    return isNaN(r) || !isFinite(r) ? 0 : r
                } else if (n === "number" && isFinite(e)) {
                    return e | 0
                } else {
                    return 0
                }
            };
            exports.is_array = function (e) {
                var t, r = function (e) {
                    var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                    if (!t) {
                        return "(Anonymous)"
                    }
                    return t[1]
                };
                _isArray = function (e) {
                    if (!e || typeof e !== "object" || typeof e.length !== "number") {
                        return false
                    }
                    var t = e.length;
                    e[e.length] = "bogus";
                    if (t !== e.length) {
                        e.length -= 1;
                        return true
                    }
                    delete e[e.length];
                    return false
                };
                if (!e || typeof e !== "object") {
                    return false
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                t = this.php_js.ini["phpjs.objectsAsArrays"];
                return _isArray(e) || (!t || parseInt(t.local_value, 10) !== 0 && (!t.local_value.toLowerCase || t.local_value.toLowerCase() !==
                    "off")) && (Object.prototype.toString.call(e) === "[object Object]" && r(e.constructor) === "Object")
            };
            exports.is_binary = function (e) {
                return typeof e === "string"
            };
            exports.is_bool = function (e) {
                return e === true || e === false
            };
            exports.is_buffer = function (e) {
                return typeof e === "string"
            };
            exports.is_callable = function (e, t, r) {
                var n = "",
                    i = {},
                    o = "";
                var s = function (e) {
                    var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                    if (!t) {
                        return "(Anonymous)"
                    }
                    return t[1]
                };
                if (typeof e === "string") {
                    i = this.window;
                    o = e;
                    n = e
                } else if (typeof e === "function") {
                    return true
                } else if (Object.prototype.toString.call(e) === "[object Array]" && e.length === 2 && typeof e[0] === "object" && typeof e[
                        1] === "string") {
                    i = e[0];
                    o = e[1];
                    n = (i.constructor && s(i.constructor)) + "::" + o
                } else {
                    return false
                }
                if (t || typeof i[o] === "function") {
                    if (r) {
                        this.window[r] = n
                    }
                    return true
                }
                return false
            };
            exports.is_float = function (e) {
                return +e === e && (!isFinite(e) || !!(e % 1))
            };
            exports.is_int = function (e) {
                return e === +e && isFinite(e) && !(e % 1)
            };
            exports.is_null = function (e) {
                return e === null
            };
            exports.is_numeric = function (e) {
                var t = " \n\r\t\f\v            ​\u2028\u2029　";
                return (typeof e === "number" || typeof e === "string" && t.indexOf(e.slice(-1)) === -1) && e !== "" && !isNaN(e)
            };
            exports.is_object = function (e) {
                if (Object.prototype.toString.call(e) === "[object Array]") {
                    return false
                }
                return e !== null && typeof e === "object"
            };
            exports.is_resource = function (e) {
                var t = function (e) {
                    var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                    if (!t) {
                        return "(Anonymous)"
                    }
                    return t[1]
                };
                return !(!e || typeof e !== "object" || !e.constructor || t(e.constructor) !== "PHPJS_Resource")
            };
            exports.is_scalar = function (e) {
                return /boolean|number|string/.test(typeof e)
            };
            exports.is_string = function (e) {
                return typeof e === "string"
            };
            exports.is_unicode = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                var t = [],
                    r = "([sS])",
                    n = "[\ud800-\udbff]",
                    i = "[\udc00-\udfff]",
                    o = new RegExp(n + r, "g"),
                    s = new RegExp(r + i, "g"),
                    a = new RegExp("^" + i + "$"),
                    u = new RegExp("^" + n + "$");
                while ((t = o.exec(e)) !== null) {
                    if (!t[1] || !t[1].match(a)) {
                        return false
                    }
                }
                while ((t = s.exec(e)) !== null) {
                    if (!t[1] || !t[1].match(u)) {
                        return false
                    }
                }
                return true
            };
            exports.isset = function () {
                var e = arguments,
                    t = e.length,
                    r = 0,
                    n;
                if (t === 0) {
                    throw new Error("Empty isset")
                }
                while (r !== t) {
                    if (e[r] === n || e[r] === null) {
                        return false
                    }
                    r++
                }
                return true
            };
            exports.serialize = function (e) {
                var t, r, n, i = "",
                    o = "",
                    s = 0,
                    a = function (e) {
                        var t = 0,
                            r = 0,
                            n = e.length,
                            i = "";
                        for (r = 0; r < n; r++) {
                            i = e.charCodeAt(r);
                            if (i < 128) {
                                t += 1
                            } else if (i < 2048) {
                                t += 2
                            } else {
                                t += 3
                            }
                        }
                        return t
                    };
                _getType = function (e) {
                    var t, r, n, i, o = typeof e;
                    if (o === "object" && !e) {
                        return "null"
                    }
                    if (o === "object") {
                        if (!e.constructor) {
                            return "object"
                        }
                        n = e.constructor.toString();
                        t = n.match(/(\w+)\(/);
                        if (t) {
                            n = t[1].toLowerCase()
                        }
                        i = ["boolean", "number", "string", "array"];
                        for (r in i) {
                            if (n == i[r]) {
                                o = i[r];
                                break
                            }
                        }
                    }
                    return o
                };
                type = _getType(e);
                switch (type) {
                case "function":
                    t = "";
                    break;
                case "boolean":
                    t = "b:" + (e ? "1" : "0");
                    break;
                case "number":
                    t = (Math.round(e) == e ? "i" : "d") + ":" + e;
                    break;
                case "string":
                    t = "s:" + a(e) + ':"' + e + '"';
                    break;
                case "array":
                case "object":
                    t = "a";
                    for (r in e) {
                        if (e.hasOwnProperty(r)) {
                            i = _getType(e[r]);
                            if (i === "function") {
                                continue
                            }
                            n = r.match(/^[0-9]+$/) ? parseInt(r, 10) : r;
                            o += this.serialize(n) + this.serialize(e[r]);
                            s++
                        }
                    }
                    t += ":" + s + ":{" + o + "}";
                    break;
                case "undefined":
                default:
                    t = "N";
                    break
                }
                if (type !== "object" && type !== "array") {
                    t += ";"
                }
                return t
            };
            exports.settype = function (e, t) {
                var r = function (e) {
                    return typeof e === "object" && typeof e.length === "number" && !e.propertyIsEnumerable("length") && typeof e.splice ===
                        "function"
                };
                var n, i, o, s;
                n = this[e] ? this[e] : e;
                try {
                    switch (t) {
                    case "boolean":
                        if (r(n) && n.length === 0) {
                            this[e] = false
                        } else if (n === "0") {
                            this[e] = false
                        } else if (typeof n === "object" && !r(n)) {
                            var a = false;
                            for (o in n) {
                                a = true
                            }
                            this[e] = a
                        } else {
                            this[e] = !!n
                        }
                        break;
                    case "integer":
                        if (typeof n === "number") {
                            this[e] = parseInt(n, 10)
                        } else if (typeof n === "string") {
                            i = n.match(/^([+\-]?)(\d+)/);
                            if (!i) {
                                this[e] = 0
                            } else {
                                this[e] = parseInt(n, 10)
                            }
                        } else if (n === true) {
                            this[e] = 1
                        } else if (n === false || n === null) {
                            this[e] = 0
                        } else if (r(n) && n.length === 0) {
                            this[e] = 0
                        } else if (typeof n === "object") {
                            this[e] = 1
                        }
                        break;
                    case "float":
                        if (typeof n === "string") {
                            i = n.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
                            if (!i) {
                                this[e] = 0
                            } else {
                                this[e] = parseFloat(n, 10)
                            }
                        } else if (n === true) {
                            this[e] = 1
                        } else if (n === false || n === null) {
                            this[e] = 0
                        } else if (r(n) && n.length === 0) {
                            this[e] = 0
                        } else if (typeof n === "object") {
                            this[e] = 1
                        }
                        break;
                    case "string":
                        if (n === null || n === false) {
                            this[e] = ""
                        } else if (r(n)) {
                            this[e] = "Array"
                        } else if (typeof n === "object") {
                            this[e] = "Object"
                        } else if (n === true) {
                            this[e] = "1"
                        } else {
                            this[e] += ""
                        }
                        break;
                    case "array":
                        if (n === null) {
                            this[e] = []
                        } else if (typeof n !== "object") {
                            this[e] = [n]
                        }
                        break;
                    case "object":
                        if (n === null) {
                            this[e] = {}
                        } else if (r(n)) {
                            for (o = 0, s = {}; o < n.length; o++) {
                                s[o] = n
                            }
                            this[e] = s
                        } else if (typeof n !== "object") {
                            this[e] = {
                                scalar: n
                            }
                        }
                        break;
                    case "null":
                        delete this[e];
                        break
                    }
                    return true
                } catch (e) {
                    return false
                }
            };
            exports.unserialize = function (e) {
                var t = this,
                    r = function (e) {
                        var t = e.charCodeAt(0);
                        if (t < 128) {
                            return 0
                        }
                        if (t < 2048) {
                            return 1
                        }
                        return 2
                    };
                error = function (e, r, n, i) {
                    throw new t.window[e](r, n, i)
                };
                read_until = function (e, t, r) {
                    var n = 2,
                        i = [],
                        o = e.slice(t, t + 1);
                    while (o != r) {
                        if (n + t > e.length) {
                            error("Error", "Invalid")
                        }
                        i.push(o);
                        o = e.slice(t + (n - 1), t + n);
                        n += 1
                    }
                    return [i.length, i.join("")]
                };
                read_chrs = function (e, t, n) {
                    var i, o, s;
                    s = [];
                    for (i = 0; i < n; i++) {
                        o = e.slice(t + (i - 1), t + i);
                        s.push(o);
                        n -= r(o)
                    }
                    return [s.length, s.join("")]
                };
                _unserialize = function (e, t) {
                    var r, n, i, o, s, a, u, c, l, f, p, h, d, g, y, v, m, b, _ = 0,
                        w = function (e) {
                            return e
                        };
                    if (!t) {
                        t = 0
                    }
                    r = e.slice(t, t + 1)
                        .toLowerCase();
                    n = t + 2;
                    switch (r) {
                    case "i":
                        w = function (e) {
                            return parseInt(e, 10)
                        };
                        l = read_until(e, n, ";");
                        _ = l[0];
                        c = l[1];
                        n += _ + 1;
                        break;
                    case "b":
                        w = function (e) {
                            return parseInt(e, 10) !== 0
                        };
                        l = read_until(e, n, ";");
                        _ = l[0];
                        c = l[1];
                        n += _ + 1;
                        break;
                    case "d":
                        w = function (e) {
                            return parseFloat(e)
                        };
                        l = read_until(e, n, ";");
                        _ = l[0];
                        c = l[1];
                        n += _ + 1;
                        break;
                    case "n":
                        c = null;
                        break;
                    case "s":
                        f = read_until(e, n, ":");
                        _ = f[0];
                        p = f[1];
                        n += _ + 2;
                        l = read_chrs(e, n + 1, parseInt(p, 10));
                        _ = l[0];
                        c = l[1];
                        n += _ + 2;
                        if (_ != parseInt(p, 10) && _ != c.length) {
                            error("SyntaxError", "String length mismatch")
                        }
                        break;
                    case "a":
                        c = {};
                        i = read_until(e, n, ":");
                        _ = i[0];
                        o = i[1];
                        n += _ + 2;
                        a = parseInt(o, 10);
                        s = true;
                        for (h = 0; h < a; h++) {
                            g = _unserialize(e, n);
                            y = g[1];
                            d = g[2];
                            n += y;
                            v = _unserialize(e, n);
                            m = v[1];
                            b = v[2];
                            n += m;
                            if (d !== h) s = false;
                            c[d] = b
                        }
                        if (s) {
                            u = new Array(a);
                            for (h = 0; h < a; h++) u[h] = c[h];
                            c = u
                        }
                        n += 1;
                        break;
                    default:
                        error("SyntaxError", "Unknown / Unhandled data type(s): " + r);
                        break
                    }
                    return [r, n - t, w(c)]
                };
                return _unserialize(e + "", 0)[2]
            };
            exports.xdiff_string_diff = function (e, t, r, n) {
                var i = 0,
                    o = 0,
                    s = 0,
                    a, u, c, l, f, p, h, d, g = Number.POSITIVE_INFINITY,
                    y = 0,
                    v = 3,
                    m = "@@ ",
                    b = " @@",
                    _ = "-",
                    w = "+",
                    C = ",",
                    k = " ",
                    A = "-",
                    E = "+",
                    x, S, j = "\n",
                    I = function (e) {
                        if (typeof e !== "string") {
                            throw new Error("String parameter required")
                        }
                        return e.replace(/(^\s*)|(\s*$)/g, "")
                    },
                    R = function (e) {
                        var t = arguments,
                            r = arguments.length,
                            n = ["number", "boolean", "string", "function", "object", "undefined"],
                            i, o, s, a = typeof e;
                        if (a !== "string" && a !== "function") {
                            throw new Error("Bad type parameter")
                        }
                        if (r < 2) {
                            throw new Error("Too few arguments")
                        }
                        if (a === "string") {
                            e = I(e);
                            if (e === "") {
                                throw new Error("Bad type parameter")
                            }
                            for (s = 0; s < n.length; s++) {
                                i = n[s];
                                if (i == e) {
                                    for (o = 1; o < r; o++) {
                                        if (typeof t[o] !== e) {
                                            throw new Error("Bad type")
                                        }
                                    }
                                    return
                                }
                            }
                            throw new Error("Bad type parameter")
                        }
                        for (o = 1; o < r; o++) {
                            if (!(t[o] instanceof e)) {
                                throw new Error("Bad type")
                            }
                        }
                    },
                    D = function (e, t) {
                        var r;
                        R(Array, e);
                        for (r = 0; r < e.length; r++) {
                            if (e[r] === t) {
                                return true
                            }
                        }
                        return false
                    },
                    F = function (e) {
                        var t = arguments,
                            r = arguments.length,
                            n = ["number", "boolean", "string", "function", "object", "undefined"],
                            i, o, s, a = typeof e;
                        if (a !== "string" && a !== "function") {
                            throw new Error("Bad type parameter")
                        }
                        if (r < 2) {
                            throw new Error("Too few arguments")
                        }
                        if (a === "string") {
                            e = I(e);
                            if (e === "") {
                                return false
                            }
                            for (s = 0; s < n.length; s++) {
                                i = n[s];
                                if (i == e) {
                                    for (o = 1; o < r; o++) {
                                        if (typeof t[o] != e) {
                                            return false
                                        }
                                    }
                                    return true
                                }
                            }
                            throw new Error("Bad type parameter")
                        }
                        for (o = 1; o < r; o++) {
                            if (!(t[o] instanceof e)) {
                                return false
                            }
                        }
                        return true
                    },
                    T = function (e, t) {
                        var r = [],
                            n;
                        R("number", e);
                        for (n = 0; n < e; n++) {
                            r.push(t)
                        }
                        return r
                    },
                    O = function (e) {
                        R("string", e);
                        if (e === "") {
                            return []
                        }
                        return e.split("\n")
                    },
                    L = function (e) {
                        return F(Array, e) && e.length === 0
                    },
                    B = function (e, t, r, n) {
                        if (!F(Array, e, t)) {
                            throw new Error("Array parameters are required")
                        }
                        if (L(e) || L(t)) {
                            return []
                        }
                        var i = function (e, t) {
                                var r, n, i, o = T(t.length + 1, 0);
                                for (r = 0; r < e.length; r++) {
                                    i = o.slice(0);
                                    for (n = 0; n < t.length; n++) {
                                        if (e[r] === t[n]) {
                                            o[n + 1] = i[n] + 1
                                        } else {
                                            o[n + 1] = Math.max(o[n], i[n + 1])
                                        }
                                    }
                                }
                                return o
                            },
                            s = function (e, t, r, n) {
                                var a, u, c, l, f, p, h, d, g, y = e.length,
                                    v = n.length;
                                if (y === 0) {
                                    return []
                                }
                                if (y === 1) {
                                    if (D(n, e[0])) {
                                        r[t] = true;
                                        return [e[0]]
                                    }
                                    return []
                                }
                                a = Math.floor(y / 2);
                                u = e.slice(0, a);
                                c = e.slice(a);
                                l = i(u, n);
                                f = i(c.slice(0)
                                    .reverse(), n.slice(0)
                                    .reverse());
                                p = 0;
                                h = 0;
                                for (o = 0; o <= v; o++) {
                                    if (l[o] + f[v - o] > h) {
                                        p = o;
                                        h = l[o] + f[v - o]
                                    }
                                }
                                d = n.slice(0, p);
                                g = n.slice(p);
                                return s(u, t, r, d)
                                    .concat(s(c, t + a, r, g))
                            };
                        s(e, 0, r, t);
                        return s(t, 0, n, e)
                    };
                if (F("string", e, t) === false) {
                    return false
                }
                if (e == t) {
                    return ""
                }
                if (typeof r !== "number" || r > g || r < y) {
                    r = v
                }
                x = O(e);
                S = O(t);
                var P = x.length,
                    N = S.length,
                    U = T(P, false),
                    M = T(N, false),
                    q = B(x, S, U, M)
                    .length,
                    H = "";
                if (q === 0) {
                    H = m + _ + (P > 0 ? "1" : "0") + C + P + " " + w + (N > 0 ? "1" : "0") + C + N + b;
                    for (i = 0; i < P; i++) {
                        H += j + A + x[i]
                    }
                    for (o = 0; o < N; o++) {
                        H += j + E + S[o]
                    }
                    return H
                }
                var Y = [],
                    G = [],
                    J = [],
                    $ = [],
                    W = function (e) {
                        if (e.length === 0 || r === 0) {
                            return []
                        }
                        var t = Math.max(e.length - r, 0);
                        return e.slice(t)
                    },
                    X = function (e) {
                        if (e.length === 0 || r === 0) {
                            return []
                        }
                        return e.slice(0, Math.min(r, e.length))
                    };
                while (i < P && U[i] === true && M[i] === true) {
                    Y.push(x[i]);
                    i++
                }
                o = i;
                s = i;
                a = i;
                u = o;
                c = i;
                l = o;
                while (i < P || o < N) {
                    while (i < P && U[i] === false) {
                        i++
                    }
                    c = i;
                    while (o < N && M[o] === false) {
                        o++
                    }
                    l = o;
                    G = [];
                    while (i < P && U[i] === true && o < N && M[o] === true) {
                        G.push(x[i]);
                        s++;
                        i++;
                        o++
                    }
                    if (s >= q || G.length >= 2 * r) {
                        if (G.length < 2 * r) {
                            G = [];
                            i = P;
                            o = N;
                            c = P;
                            l = N
                        }
                        J = W(Y);
                        $ = X(G);
                        a -= J.length;
                        u -= J.length;
                        c += $.length;
                        l += $.length;
                        f = a + 1;
                        p = u + 1;
                        h = c - a;
                        d = l - u;
                        H += m + _ + f + C + h + " " + w + p + C + d + b + j;
                        while (a < c || u < l) {
                            if (a < c && U[a] === true && M[u] === true) {
                                H += k + x[a] + j;
                                a++;
                                u++
                            } else if (a < c && U[a] === false) {
                                H += A + x[a] + j;
                                a++
                            } else if (u < l && M[u] === false) {
                                H += E + S[u] + j;
                                u++
                            }
                        }
                        a = i;
                        u = o;
                        Y = G
                    }
                }
                if (H.length > 0 && H.charAt(H.length) === j) {
                    H = H.slice(0, -1)
                }
                return H
            };
            exports.xdiff_string_patch = function (e, t, r, n) {
                var i = function (e) {
                        return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ?
                            "y" : "")
                    },
                    o = function (e, t) {
                        if (!(t instanceof RegExp)) {
                            return String.prototype.split.apply(e, arguments)
                        }
                        var r = String(e),
                            n = [],
                            o = 0,
                            s, a, u = Infinity,
                            c = t._xregexp,
                            l = new RegExp(t.source, i(t) + "g");
                        if (c) {
                            l._xregexp = {
                                source: c.source,
                                captureNames: c.captureNames ? c.captureNames.slice(0) : null
                            }
                        }
                        while (s = l.exec(r)) {
                            if (l.lastIndex > o) {
                                n.push(r.slice(o, s.index));
                                if (s.length > 1 && s.index < r.length) {
                                    Array.prototype.push.apply(n, s.slice(1))
                                }
                                a = s[0].length;
                                o = l.lastIndex;
                                if (n.length >= u) {
                                    break
                                }
                            }
                            if (l.lastIndex === s.index) {
                                l.lastIndex++
                            }
                        }
                        if (o === r.length) {
                            if (!l.test("") || a) {
                                n.push("")
                            }
                        } else {
                            n.push(r.slice(o))
                        }
                        return n.length > u ? n.slice(0, u) : n
                    },
                    s = 0,
                    a = 0,
                    u = [],
                    c = 0,
                    l = "",
                    f = /^@@\s+-(\d+),(\d+)\s+\+(\d+),(\d+)\s+@@$/,
                    p = /\r?\n/,
                    h = o(t.replace(/(\r?\n)+$/, ""), p),
                    d = o(e, p),
                    g = [],
                    y = 0,
                    v = "",
                    m = 0,
                    b = {
                        XDIFF_PATCH_NORMAL: 1,
                        XDIFF_PATCH_REVERSE: 2,
                        XDIFF_PATCH_IGNORESPACE: 4
                    };
                if (typeof e !== "string" || !t) {
                    return false
                }
                if (!r) {
                    r = "XDIFF_PATCH_NORMAL"
                }
                if (typeof r !== "number") {
                    r = [].concat(r);
                    for (s = 0; s < r.length; s++) {
                        if (b[r[s]]) {
                            m = m | b[r[s]]
                        }
                    }
                    r = m
                }
                if (r & b.XDIFF_PATCH_NORMAL) {
                    for (s = 0, a = h.length; s < a; s++) {
                        u = h[s].match(f);
                        if (u) {
                            c = y;
                            y = u[1] - 1;
                            while (c < y) {
                                g[g.length] = d[c++]
                            }
                            while (h[++s] && f.exec(h[s]) === null) {
                                l = h[s].charAt(0);
                                switch (l) {
                                case "-":
                                    ++y;
                                    break;
                                case "+":
                                    g[g.length] = h[s].slice(1);
                                    break;
                                case " ":
                                    g[g.length] = d[y++];
                                    break;
                                default:
                                    throw "Unrecognized initial character in unidiff line"
                                }
                            }
                            if (h[s]) {
                                s--
                            }
                        }
                    }
                    while (y > 0 && y < d.length) {
                        g[g.length] = d[y++]
                    }
                } else if (r & b.XDIFF_PATCH_REVERSE) {
                    for (s = 0, a = h.length; s < a; s++) {
                        u = h[s].match(f);
                        if (u) {
                            c = y;
                            y = u[3] - 1;
                            while (c < y) {
                                g[g.length] = d[c++]
                            }
                            while (h[++s] && f.exec(h[s]) === null) {
                                l = h[s].charAt(0);
                                switch (l) {
                                case "-":
                                    g[g.length] = h[s].slice(1);
                                    break;
                                case "+":
                                    ++y;
                                    break;
                                case " ":
                                    g[g.length] = d[y++];
                                    break;
                                default:
                                    throw "Unrecognized initial character in unidiff line"
                                }
                            }
                            if (h[s]) {
                                s--
                            }
                        }
                    }
                    while (y > 0 && y < d.length) {
                        g[g.length] = d[y++]
                    }
                }
                if (typeof n === "string") {
                    this.window[n] = v
                }
                return g.join("\n")
            };
            exports.utf8_decode = function (e) {
                var t = [],
                    r = 0,
                    n = 0,
                    i = 0,
                    o = 0,
                    s = 0,
                    a = 0;
                e += "";
                while (r < e.length) {
                    i = e.charCodeAt(r);
                    if (i <= 191) {
                        t[n++] = String.fromCharCode(i);
                        r++
                    } else if (i <= 223) {
                        o = e.charCodeAt(r + 1);
                        t[n++] = String.fromCharCode((i & 31) << 6 | o & 63);
                        r += 2
                    } else if (i <= 239) {
                        o = e.charCodeAt(r + 1);
                        s = e.charCodeAt(r + 2);
                        t[n++] = String.fromCharCode((i & 15) << 12 | (o & 63) << 6 | s & 63);
                        r += 3
                    } else {
                        o = e.charCodeAt(r + 1);
                        s = e.charCodeAt(r + 2);
                        a = e.charCodeAt(r + 3);
                        i = (i & 7) << 18 | (o & 63) << 12 | (s & 63) << 6 | a & 63;
                        i -= 65536;
                        t[n++] = String.fromCharCode(55296 | i >> 10 & 1023);
                        t[n++] = String.fromCharCode(56320 | i & 1023);
                        r += 4
                    }
                }
                return t.join("")
            };
            exports.utf8_encode = function (e) {
                if (e === null || typeof e === "undefined") {
                    return ""
                }
                var t = e + "";
                var r = "",
                    n, i, o = 0;
                n = i = 0;
                o = t.length;
                for (var s = 0; s < o; s++) {
                    var a = t.charCodeAt(s);
                    var u = null;
                    if (a < 128) {
                        i++
                    } else if (a > 127 && a < 2048) {
                        u = String.fromCharCode(a >> 6 | 192, a & 63 | 128)
                    } else if ((a & 63488) != 55296) {
                        u = String.fromCharCode(a >> 12 | 224, a >> 6 & 63 | 128, a & 63 | 128)
                    } else {
                        if ((a & 64512) != 55296) {
                            throw new RangeError("Unmatched trail surrogate at " + s)
                        }
                        var c = t.charCodeAt(++s);
                        if ((c & 64512) != 56320) {
                            throw new RangeError("Unmatched lead surrogate at " + (s - 1))
                        }
                        a = ((a & 1023) << 10) + (c & 1023) + 65536;
                        u = String.fromCharCode(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, a & 63 | 128)
                    }
                    if (u !== null) {
                        if (i > n) {
                            r += t.slice(n, i)
                        }
                        r += u;
                        n = i = s + 1
                    }
                }
                if (i > n) {
                    r += t.slice(n, o)
                }
                return r
            };
            exports.array_flip = function (e) {
                var t, r = {};
                if (e && typeof e === "object" && e.change_key_case) {
                    return e.flip()
                }
                for (t in e) {
                    if (!e.hasOwnProperty(t)) {
                        continue
                    }
                    r[e[t]] = t
                }
                return r
            };
            exports.array_merge_recursive = function (e, t) {
                var r = "";
                if (e && Object.prototype.toString.call(e) === "[object Array]" && t && Object.prototype.toString.call(t) ===
                    "[object Array]") {
                    for (r in t) {
                        e.push(t[r])
                    }
                } else if (e && e instanceof Object && (t && t instanceof Object)) {
                    for (r in t) {
                        if (r in e) {
                            if (typeof e[r] === "object" && typeof t === "object") {
                                e[r] = this.array_merge(e[r], t[r])
                            } else {
                                e[r] = t[r]
                            }
                        } else {
                            e[r] = t[r]
                        }
                    }
                }
                return e
            };
            exports.array_search = function (e, t, r) {
                var n = !!r,
                    i = "";
                if (t && typeof t === "object" && t.change_key_case) {
                    return t.search(e, r)
                }
                if (typeof e === "object" && e.exec) {
                    if (!n) {
                        var o = "i" + (e.global ? "g" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "");
                        e = new RegExp(e.source, o)
                    }
                    for (i in t) {
                        if (e.test(t[i])) {
                            return i
                        }
                    }
                    return false
                }
                for (i in t) {
                    if (n && t[i] === e || !n && t[i] == e) {
                        return i
                    }
                }
                return false
            };
            exports.array_slice = function (e, t, r, n) {
                var i = "";
                if (Object.prototype.toString.call(e) !== "[object Array]" || n && t !== 0) {
                    var o = 0,
                        s = {};
                    for (i in e) {
                        o += 1;
                        s[i] = e[i]
                    }
                    e = s;
                    t = t < 0 ? o + t : t;
                    r = r === undefined ? o : r < 0 ? o + r - t : r;
                    var a = {};
                    var u = false,
                        c = -1,
                        l = 0,
                        f = 0;
                    for (i in e) {
                        ++c;
                        if (l >= r) {
                            break
                        }
                        if (c == t) {
                            u = true
                        }
                        if (!u) {
                            continue
                        }++l;
                        if (this.is_int(i) && !n) {
                            a[f++] = e[i]
                        } else {
                            a[i] = e[i]
                        }
                    }
                    return a
                }
                if (r === undefined) {
                    return e.slice(t)
                } else if (r >= 0) {
                    return e.slice(t, t + r)
                } else {
                    return e.slice(t, r)
                }
            };
            exports.array_splice = function (e, t, r, n) {
                var i = function (e, t, r) {
                    if (e[t] !== undefined) {
                        var n = t;
                        t += 1;
                        if (t === r) {
                            t += 1
                        }
                        t = i(e, t, r);
                        e[t] = e[n];
                        delete e[n]
                    }
                    return t
                };
                if (n && typeof n !== "object") {
                    n = [n]
                }
                if (r === undefined) {
                    r = t >= 0 ? e.length - t : -t
                } else if (r < 0) {
                    r = (t >= 0 ? e.length - t : -t) + r
                }
                if (Object.prototype.toString.call(e) !== "[object Array]") {
                    var o = 0,
                        s = -1,
                        a = [],
                        u = {},
                        c = -1,
                        l = -1;
                    var f = true,
                        p = 0,
                        h = 0,
                        d = "";
                    for (d in e) {
                        o += 1
                    }
                    t = t >= 0 ? t : o + t;
                    for (d in e) {
                        s += 1;
                        if (s < t) {
                            if (this.is_int(d)) {
                                l += 1;
                                if (parseInt(d, 10) === l) {
                                    continue
                                }
                                i(e, l, d);
                                e[l] = e[d];
                                delete e[d]
                            }
                            continue
                        }
                        if (f && this.is_int(d)) {
                            a.push(e[d]);
                            u[p++] = e[d]
                        } else {
                            u[d] = e[d];
                            f = false
                        }
                        h += 1;
                        if (n && n[++c]) {
                            e[d] = n[c]
                        } else {
                            delete e[d]
                        }
                    }
                    return f ? a : u
                }
                if (n) {
                    n.unshift(t, r);
                    return Array.prototype.splice.apply(e, n)
                }
                return e.splice(t, r)
            };
            exports.array_walk = function (array, funcname, userdata) {
                var key, value, ini;
                if (!array || typeof array !== "object") {
                    return false
                }
                if (typeof array === "object" && array.change_key_case) {
                    if (arguments.length > 2) {
                        return array.walk(funcname, userdata)
                    } else {
                        return array.walk(funcname)
                    }
                }
                try {
                    if (typeof funcname === "function") {
                        for (key in array) {
                            if (arguments.length > 2) {
                                funcname(array[key], key, userdata)
                            } else {
                                funcname(array[key], key)
                            }
                        }
                    } else if (typeof funcname === "string") {
                        this.php_js = this.php_js || {};
                        this.php_js.ini = this.php_js.ini || {};
                        ini = this.php_js.ini["phpjs.no-eval"];
                        if (ini && (parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
                                "off"))) {
                            if (arguments.length > 2) {
                                for (key in array) {
                                    this.window[funcname](array[key], key, userdata)
                                }
                            } else {
                                for (key in array) {
                                    this.window[funcname](array[key], key)
                                }
                            }
                        } else {
                            if (arguments.length > 2) {
                                for (key in array) {
                                    eval(funcname + "(array[key], key, userdata)")
                                }
                            } else {
                                for (key in array) {
                                    eval(funcname + "(array[key], key)")
                                }
                            }
                        }
                    } else if (funcname && typeof funcname === "object" && funcname.length === 2) {
                        var obj = funcname[0],
                            func = funcname[1];
                        if (arguments.length > 2) {
                            for (key in array) {
                                obj[func](array[key], key, userdata)
                            }
                        } else {
                            for (key in array) {
                                obj[func](array[key], key)
                            }
                        }
                    } else {
                        return false
                    }
                } catch (e) {
                    return false
                }
                return true
            };
            exports.natcasesort = function (e) {
                var t = [],
                    r, n, i, o = this,
                    s = false,
                    a = {};
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                s = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                a = s ? e : a;
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        t.push([r, e[r]]);
                        if (s) {
                            delete e[r]
                        }
                    }
                }
                t.sort(function (e, t) {
                    return o.strnatcasecmp(e[1], t[1])
                });
                for (n = 0; n < t.length; n++) {
                    a[t[n][0]] = t[n][1]
                }
                return s || a
            };
            exports.pos = function (e) {
                return this.current(e)
            };
            exports.sizeof = function (e, t) {
                return this.count(e, t)
            };
            exports.bcadd = function (e, t, r) {
                var n = this._phpjs_shared_bc();
                var i, o, s;
                if (typeof r === "undefined") {
                    r = n.scale
                }
                r = r < 0 ? 0 : r;
                i = n.bc_init_num();
                o = n.bc_init_num();
                s = n.bc_init_num();
                i = n.php_str2num(e.toString());
                o = n.php_str2num(t.toString());
                s = n.bc_add(i, o, r);
                if (s.n_scale > r) {
                    s.n_scale = r
                }
                return s.toString()
            };
            exports.bccomp = function (e, t, r) {
                var n = this._phpjs_shared_bc();
                var i, o;
                if (typeof r === "undefined") {
                    r = n.scale
                }
                r = r < 0 ? 0 : r;
                i = n.bc_init_num();
                o = n.bc_init_num();
                i = n.bc_str2num(e.toString(), r);
                o = n.bc_str2num(t.toString(), r);
                return n.bc_compare(i, o, r)
            };
            exports.bcdiv = function (e, t, r) {
                var n = this._phpjs_shared_bc();
                var i, o, s;
                if (typeof r === "undefined") {
                    r = n.scale
                }
                r = r < 0 ? 0 : r;
                i = n.bc_init_num();
                o = n.bc_init_num();
                s = n.bc_init_num();
                i = n.php_str2num(e.toString());
                o = n.php_str2num(t.toString());
                s = n.bc_divide(i, o, r);
                if (s === -1) {
                    throw new Error(11, "(BC) Division by zero")
                }
                if (s.n_scale > r) {
                    s.n_scale = r
                }
                return s.toString()
            };
            exports.bcmul = function (e, t, r) {
                var n = this._phpjs_shared_bc();
                var i, o, s;
                if (typeof r === "undefined") {
                    r = n.scale
                }
                r = r < 0 ? 0 : r;
                i = n.bc_init_num();
                o = n.bc_init_num();
                s = n.bc_init_num();
                i = n.php_str2num(e.toString());
                o = n.php_str2num(t.toString());
                s = n.bc_multiply(i, o, r);
                if (s.n_scale > r) {
                    s.n_scale = r
                }
                return s.toString()
            };
            exports.bcround = function (e, t) {
                var r = this._phpjs_shared_bc();
                var n, i, o;
                var s;
                n = r.bc_init_num();
                n = r.php_str2num(e.toString());
                if (t >= n.n_scale) {
                    while (n.n_scale < t) {
                        n.n_value[n.n_len + n.n_scale] = 0;
                        n.n_scale++
                    }
                    return n.toString()
                }
                o = n.n_value[n.n_len + t];
                s = r.bc_init_num();
                s = r.bc_new_num(1, t);
                if (o >= 5) {
                    s.n_value[s.n_len + s.n_scale - 1] = 1;
                    if (n.n_sign == r.MINUS) {
                        s.n_sign = r.MINUS
                    }
                    i = r.bc_add(n, s, t)
                } else {
                    i = n
                }
                if (i.n_scale > t) {
                    i.n_scale = t
                }
                return i.toString()
            };
            exports.bcscale = function (e) {
                var t = this._phpjs_shared_bc();
                e = parseInt(e, 10);
                if (isNaN(e)) {
                    return false
                }
                if (e < 0) {
                    return false
                }
                t.scale = e;
                return true
            };
            exports.bcsub = function (e, t, r) {
                var n = this._phpjs_shared_bc();
                var i, o, s;
                if (typeof r === "undefined") {
                    r = n.scale
                }
                r = r < 0 ? 0 : r;
                i = n.bc_init_num();
                o = n.bc_init_num();
                s = n.bc_init_num();
                i = n.php_str2num(e.toString());
                o = n.php_str2num(t.toString());
                s = n.bc_sub(i, o, r);
                if (s.n_scale > r) {
                    s.n_scale = r
                }
                return s.toString()
            };
            exports.date_parse = function (e) {
                this.php_js = this.php_js || {};
                var t, r = this.php_js.warnings ? this.php_js.warnings.length : null,
                    n = this.php_js.errors ? this.php_js.errors.length : null;
                try {
                    this.php_js.date_parse_state = true;
                    t = this.strtotime(e);
                    this.php_js.date_parse_state = false
                } finally {
                    if (!t) {
                        return false
                    }
                }
                var i = new Date(t * 1e3);
                var o = {
                    warning_count: r !== null ? this.php_js.warnings.slice(r)
                        .length : 0,
                    warnings: r !== null ? this.php_js.warnings.slice(r) : [],
                    error_count: n !== null ? this.php_js.errors.slice(n)
                        .length : 0,
                    errors: n !== null ? this.php_js.errors.slice(n) : []
                };
                o.year = i.getFullYear();
                o.month = i.getMonth() + 1;
                o.day = i.getDate();
                o.hour = i.getHours();
                o.minute = i.getMinutes();
                o.second = i.getSeconds();
                o.fraction = parseFloat("0." + i.getMilliseconds());
                o.is_localtime = i.getTimezoneOffset() !== 0;
                return o
            };
            exports.gmdate = function (e, t) {
                var r = typeof t === "undefined" ? new Date : typeof t === "object" ? new Date(t) : new Date(t * 1e3);
                t = Date.parse(r.toUTCString()
                    .slice(0, -4)) / 1e3;
                return this.date(e, t)
            };
            exports.pathinfo = function (e, t) {
                var r = "",
                    n = "",
                    i = 0,
                    o = {},
                    s = 0,
                    a = 0;
                var u = false,
                    c = false,
                    l = false;
                if (!e) {
                    return false
                }
                if (!t) {
                    t = "PATHINFO_ALL"
                }
                var f = {
                    PATHINFO_DIRNAME: 1,
                    PATHINFO_BASENAME: 2,
                    PATHINFO_EXTENSION: 4,
                    PATHINFO_FILENAME: 8,
                    PATHINFO_ALL: 0
                };
                for (n in f) {
                    f.PATHINFO_ALL = f.PATHINFO_ALL | f[n]
                }
                if (typeof t !== "number") {
                    t = [].concat(t);
                    for (a = 0; a < t.length; a++) {
                        if (f[t[a]]) {
                            i = i | f[t[a]]
                        }
                    }
                    t = i
                }
                var p = function (e) {
                    var t = e + "";
                    var r = t.lastIndexOf(".") + 1;
                    return !r ? false : r !== t.length ? t.substr(r) : ""
                };
                if (t & f.PATHINFO_DIRNAME) {
                    var h = e.replace(/\\/g, "/")
                        .replace(/\/[^\/]*\/?$/, "");
                    o.dirname = h === e ? "." : h
                }
                if (t & f.PATHINFO_BASENAME) {
                    if (false === u) {
                        u = this.basename(e)
                    }
                    o.basename = u
                }
                if (t & f.PATHINFO_EXTENSION) {
                    if (false === u) {
                        u = this.basename(e)
                    }
                    if (false === c) {
                        c = p(u)
                    }
                    if (false !== c) {
                        o.extension = c
                    }
                }
                if (t & f.PATHINFO_FILENAME) {
                    if (false === u) {
                        u = this.basename(e)
                    }
                    if (false === c) {
                        c = p(u)
                    }
                    if (false === l) {
                        l = u.slice(0, u.length - (c ? c.length + 1 : c === false ? 0 : 1))
                    }
                    o.filename = l
                }
                s = 0;
                for (r in o) {
                    s++
                }
                if (s == 1) {
                    return o[r]
                }
                return o
            };
            exports.i18n_loc_get_default = function () {
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                return this.php_js.i18nLocale || (i18n_loc_set_default("en_US_POSIX"), "en_US_POSIX")
            };
            exports.setcookie = function (e, t, r, n, i, o) {
                return this.setrawcookie(e, encodeURIComponent(t), r, n, i, o)
            };
            exports.chop = function (e, t) {
                return this.rtrim(e, t)
            };
            exports.convert_uuencode = function (e) {
                var t = function (e) {
                    return String.fromCharCode(e)
                };
                if (!e || e === "") {
                    return t(0)
                } else if (!this.is_scalar(e)) {
                    return false
                }
                var r = 0,
                    n = 0,
                    i = 0,
                    o = 0;
                var s = "",
                    a = "",
                    u = "",
                    c = {};
                var l = function () {
                    c = e.substr(n, 45);
                    for (i in c) {
                        c[i] = c[i].charCodeAt(0)
                    }
                    if (c.length != 0) {
                        return c.length
                    } else {
                        return 0
                    }
                };
                while (l() !== 0) {
                    r = l();
                    n += 45;
                    s += t(r + 32);
                    for (i in c) {
                        a = c[i].charCodeAt(0)
                            .toString(2);
                        while (a.length < 8) {
                            a = "0" + a
                        }
                        u += a
                    }
                    while (u.length % 6) {
                        u = u + "0"
                    }
                    for (i = 0; i <= u.length / 6 - 1; i++) {
                        a = u.substr(o, 6);
                        if (a == "000000") {
                            s += t(96)
                        } else {
                            s += t(parseInt(a, 2) + 32)
                        }
                        o += 6
                    }
                    o = 0;
                    u = "";
                    s += "\n"
                }
                s += t(96) + "\n";
                return s
            };
            exports.crc32 = function (e) {
                e = this.utf8_encode(e);
                var t =
                    "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
                var r = 0;
                var n = 0;
                var i = 0;
                r = r ^ -1;
                for (var o = 0, s = e.length; o < s; o++) {
                    i = (r ^ e.charCodeAt(o)) & 255;
                    n = "0x" + t.substr(i * 9, 8);
                    r = r >>> 8 ^ n
                }
                return r ^ -1
            };
            exports.html_entity_decode = function (e, t) {
                var r = {},
                    n = "",
                    i = "",
                    o = "";
                i = e.toString();
                if (false === (r = this.get_html_translation_table("HTML_ENTITIES", t))) {
                    return false
                }
                delete r["&"];
                r["&"] = "&amp;";
                for (n in r) {
                    o = r[n];
                    i = i.split(o)
                        .join(n)
                }
                i = i.split("&#039;")
                    .join("'");
                return i
            };
            exports.htmlentities = function (e, t, r, n) {
                var i = this.get_html_translation_table("HTML_ENTITIES", t),
                    o = "";
                e = e == null ? "" : e + "";
                if (!i) {
                    return false
                }
                if (t && t === "ENT_QUOTES") {
                    i["'"] = "&#039;"
                }
                if (!!n || n == null) {
                    for (o in i) {
                        if (i.hasOwnProperty(o)) {
                            e = e.split(o)
                                .join(i[o])
                        }
                    }
                } else {
                    e = e.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (e, t, r) {
                        for (o in i) {
                            if (i.hasOwnProperty(o)) {
                                t = t.split(o)
                                    .join(i[o])
                            }
                        }
                        return t + r
                    })
                }
                return e
            };
            exports.join = function (e, t) {
                return this.implode(e, t)
            };
            exports.md5 = function (e) {
                var t;
                var r = function (e, t) {
                    return e << t | e >>> 32 - t
                };
                var n = function (e, t) {
                    var r, n, i, o, s;
                    i = e & 2147483648;
                    o = t & 2147483648;
                    r = e & 1073741824;
                    n = t & 1073741824;
                    s = (e & 1073741823) + (t & 1073741823);
                    if (r & n) {
                        return s ^ 2147483648 ^ i ^ o
                    }
                    if (r | n) {
                        if (s & 1073741824) {
                            return s ^ 3221225472 ^ i ^ o
                        } else {
                            return s ^ 1073741824 ^ i ^ o
                        }
                    } else {
                        return s ^ i ^ o
                    }
                };
                var i = function (e, t, r) {
                    return e & t | ~e & r
                };
                var o = function (e, t, r) {
                    return e & r | t & ~r
                };
                var s = function (e, t, r) {
                    return e ^ t ^ r
                };
                var a = function (e, t, r) {
                    return t ^ (e | ~r)
                };
                var u = function (e, t, o, s, a, u, c) {
                    e = n(e, n(n(i(t, o, s), a), c));
                    return n(r(e, u), t)
                };
                var c = function (e, t, i, s, a, u, c) {
                    e = n(e, n(n(o(t, i, s), a), c));
                    return n(r(e, u), t)
                };
                var l = function (e, t, i, o, a, u, c) {
                    e = n(e, n(n(s(t, i, o), a), c));
                    return n(r(e, u), t)
                };
                var f = function (e, t, i, o, s, u, c) {
                    e = n(e, n(n(a(t, i, o), s), c));
                    return n(r(e, u), t)
                };
                var p = function (e) {
                    var t;
                    var r = e.length;
                    var n = r + 8;
                    var i = (n - n % 64) / 64;
                    var o = (i + 1) * 16;
                    var s = new Array(o - 1);
                    var a = 0;
                    var u = 0;
                    while (u < r) {
                        t = (u - u % 4) / 4;
                        a = u % 4 * 8;
                        s[t] = s[t] | e.charCodeAt(u) << a;
                        u++
                    }
                    t = (u - u % 4) / 4;
                    a = u % 4 * 8;
                    s[t] = s[t] | 128 << a;
                    s[o - 2] = r << 3;
                    s[o - 1] = r >>> 29;
                    return s
                };
                var h = function (e) {
                    var t = "",
                        r = "",
                        n, i;
                    for (i = 0; i <= 3; i++) {
                        n = e >>> i * 8 & 255;
                        r = "0" + n.toString(16);
                        t = t + r.substr(r.length - 2, 2)
                    }
                    return t
                };
                var d = [],
                    g, y, v, m, b, _, w, C, k, A = 7,
                    E = 12,
                    x = 17,
                    S = 22,
                    j = 5,
                    I = 9,
                    R = 14,
                    D = 20,
                    F = 4,
                    T = 11,
                    O = 16,
                    L = 23,
                    B = 6,
                    P = 10,
                    N = 15,
                    U = 21;
                e = this.utf8_encode(e);
                d = p(e);
                _ = 1732584193;
                w = 4023233417;
                C = 2562383102;
                k = 271733878;
                t = d.length;
                for (g = 0; g < t; g += 16) {
                    y = _;
                    v = w;
                    m = C;
                    b = k;
                    _ = u(_, w, C, k, d[g + 0], A, 3614090360);
                    k = u(k, _, w, C, d[g + 1], E, 3905402710);
                    C = u(C, k, _, w, d[g + 2], x, 606105819);
                    w = u(w, C, k, _, d[g + 3], S, 3250441966);
                    _ = u(_, w, C, k, d[g + 4], A, 4118548399);
                    k = u(k, _, w, C, d[g + 5], E, 1200080426);
                    C = u(C, k, _, w, d[g + 6], x, 2821735955);
                    w = u(w, C, k, _, d[g + 7], S, 4249261313);
                    _ = u(_, w, C, k, d[g + 8], A, 1770035416);
                    k = u(k, _, w, C, d[g + 9], E, 2336552879);
                    C = u(C, k, _, w, d[g + 10], x, 4294925233);
                    w = u(w, C, k, _, d[g + 11], S, 2304563134);
                    _ = u(_, w, C, k, d[g + 12], A, 1804603682);
                    k = u(k, _, w, C, d[g + 13], E, 4254626195);
                    C = u(C, k, _, w, d[g + 14], x, 2792965006);
                    w = u(w, C, k, _, d[g + 15], S, 1236535329);
                    _ = c(_, w, C, k, d[g + 1], j, 4129170786);
                    k = c(k, _, w, C, d[g + 6], I, 3225465664);
                    C = c(C, k, _, w, d[g + 11], R, 643717713);
                    w = c(w, C, k, _, d[g + 0], D, 3921069994);
                    _ = c(_, w, C, k, d[g + 5], j, 3593408605);
                    k = c(k, _, w, C, d[g + 10], I, 38016083);
                    C = c(C, k, _, w, d[g + 15], R, 3634488961);
                    w = c(w, C, k, _, d[g + 4], D, 3889429448);
                    _ = c(_, w, C, k, d[g + 9], j, 568446438);
                    k = c(k, _, w, C, d[g + 14], I, 3275163606);
                    C = c(C, k, _, w, d[g + 3], R, 4107603335);
                    w = c(w, C, k, _, d[g + 8], D, 1163531501);
                    _ = c(_, w, C, k, d[g + 13], j, 2850285829);
                    k = c(k, _, w, C, d[g + 2], I, 4243563512);
                    C = c(C, k, _, w, d[g + 7], R, 1735328473);
                    w = c(w, C, k, _, d[g + 12], D, 2368359562);
                    _ = l(_, w, C, k, d[g + 5], F, 4294588738);
                    k = l(k, _, w, C, d[g + 8], T, 2272392833);
                    C = l(C, k, _, w, d[g + 11], O, 1839030562);
                    w = l(w, C, k, _, d[g + 14], L, 4259657740);
                    _ = l(_, w, C, k, d[g + 1], F, 2763975236);
                    k = l(k, _, w, C, d[g + 4], T, 1272893353);
                    C = l(C, k, _, w, d[g + 7], O, 4139469664);
                    w = l(w, C, k, _, d[g + 10], L, 3200236656);
                    _ = l(_, w, C, k, d[g + 13], F, 681279174);
                    k = l(k, _, w, C, d[g + 0], T, 3936430074);
                    C = l(C, k, _, w, d[g + 3], O, 3572445317);
                    w = l(w, C, k, _, d[g + 6], L, 76029189);
                    _ = l(_, w, C, k, d[g + 9], F, 3654602809);
                    k = l(k, _, w, C, d[g + 12], T, 3873151461);
                    C = l(C, k, _, w, d[g + 15], O, 530742520);
                    w = l(w, C, k, _, d[g + 2], L, 3299628645);
                    _ = f(_, w, C, k, d[g + 0], B, 4096336452);
                    k = f(k, _, w, C, d[g + 7], P, 1126891415);
                    C = f(C, k, _, w, d[g + 14], N, 2878612391);
                    w = f(w, C, k, _, d[g + 5], U, 4237533241);
                    _ = f(_, w, C, k, d[g + 12], B, 1700485571);
                    k = f(k, _, w, C, d[g + 3], P, 2399980690);
                    C = f(C, k, _, w, d[g + 10], N, 4293915773);
                    w = f(w, C, k, _, d[g + 1], U, 2240044497);
                    _ = f(_, w, C, k, d[g + 8], B, 1873313359);
                    k = f(k, _, w, C, d[g + 15], P, 4264355552);
                    C = f(C, k, _, w, d[g + 6], N, 2734768916);
                    w = f(w, C, k, _, d[g + 13], U, 1309151649);
                    _ = f(_, w, C, k, d[g + 4], B, 4149444226);
                    k = f(k, _, w, C, d[g + 11], P, 3174756917);
                    C = f(C, k, _, w, d[g + 2], N, 718787259);
                    w = f(w, C, k, _, d[g + 9], U, 3951481745);
                    _ = n(_, y);
                    w = n(w, v);
                    C = n(C, m);
                    k = n(k, b)
                }
                var M = h(_) + h(w) + h(C) + h(k);
                return M.toLowerCase()
            };
            exports.md5_file = function (e) {
                var t = "";
                t = this.file_get_contents(e);
                if (!t) {
                    return false
                }
                return this.md5(t)
            };
            exports.printf = function () {
                var e, t, r = this.window.document;
                var n = "";
                var i = "http://www.w3.org/1999/xhtml";
                e = r.getElementsByTagNameNS ? r.getElementsByTagNameNS(i, "body")[0] ? r.getElementsByTagNameNS(i, "body")[0] : r.documentElement
                    .lastChild : r.getElementsByTagName("body")[0];
                if (!e) {
                    return false
                }
                n = this.sprintf.apply(this, arguments);
                t = r.createTextNode(n);
                e.appendChild(t);
                return n.length
            };
            exports.setlocale = function (e, t) {
                var r = "",
                    n = [],
                    i = 0,
                    o = this.window.document;
                var s = function e(t) {
                    if (t instanceof RegExp) {
                        return new RegExp(t)
                    } else if (t instanceof Date) {
                        return new Date(t)
                    }
                    var r = {};
                    for (var n in t) {
                        if (typeof t[n] === "object") {
                            r[n] = e(t[n])
                        } else {
                            r[n] = t[n]
                        }
                    }
                    return r
                };
                var a = function (e) {
                    return 0
                };
                var u = function (e) {
                    return e !== 1 ? 1 : 0
                };
                var c = function (e) {
                    return e > 1 ? 1 : 0
                };
                var l = function (e) {
                    return e % 10 === 1 && e % 100 !== 11 ? 0 : 1
                };
                var f = function (e) {
                    return e % 10 === 1 && e % 100 !== 11 ? 0 : e !== 0 ? 1 : 2
                };
                var p = function (e) {
                    return e === 1 ? 0 : e === 2 ? 1 : 2
                };
                var h = function (e) {
                    return e === 1 ? 0 : e === 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2
                };
                var d = function (e) {
                    return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                };
                var g = function (e) {
                    return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                };
                var y = function (e) {
                    return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2
                };
                var v = function (e) {
                    return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                };
                var m = function (e) {
                    return e % 10 === 1 ? 0 : e % 10 === 2 ? 1 : 2
                };
                var b = function (e) {
                    return e % 100 === 1 ? 0 : e % 100 === 2 ? 1 : e % 100 === 3 || e % 100 === 4 ? 2 : 3
                };
                var _ = function (e) {
                    return e === 1 ? 0 : e === 0 || e % 100 && e % 100 <= 10 ? 1 : e % 100 >= 11 && e % 100 <= 19 ? 2 : 3
                };
                var w = function (e) {
                    return e === 1 ? 0 : e === 2 ? 1 : e >= 3 && e <= 6 ? 2 : e >= 7 && e <= 10 ? 3 : 4
                };
                var C = function (e) {
                    return e === 0 ? 5 : e === 1 ? 0 : e === 2 ? 1 : e % 100 >= 3 && e % 100 <= 10 ? 2 : e % 100 >= 11 && e % 100 <= 99 ?
                        3 : 4
                };
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                var k = this.php_js;
                if (!k.locales) {
                    k.locales = {};
                    k.locales.en = {
                        LC_COLLATE: function (e, t) {
                            return e == t ? 0 : e > t ? 1 : -1
                        },
                        LC_CTYPE: {
                            an: /^[A-Za-z\d]+$/g,
                            al: /^[A-Za-z]+$/g,
                            ct: /^[\u0000-\u001F\u007F]+$/g,
                            dg: /^[\d]+$/g,
                            gr: /^[\u0021-\u007E]+$/g,
                            lw: /^[a-z]+$/g,
                            pr: /^[\u0020-\u007E]+$/g,
                            pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
                            sp: /^[\f\n\r\t\v ]+$/g,
                            up: /^[A-Z]+$/g,
                            xd: /^[A-Fa-f\d]+$/g,
                            CODESET: "UTF-8",
                            lower: "abcdefghijklmnopqrstuvwxyz",
                            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        },
                        LC_TIME: {
                            a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
                                "November", "December"
                            ],
                            c: "%a %d %b %Y %r %Z",
                            p: ["AM", "PM"],
                            P: ["am", "pm"],
                            r: "%I:%M:%S %p",
                            x: "%m/%d/%Y",
                            X: "%r",
                            alt_digits: "",
                            ERA: "",
                            ERA_YEAR: "",
                            ERA_D_T_FMT: "",
                            ERA_D_FMT: "",
                            ERA_T_FMT: ""
                        },
                        LC_MONETARY: {
                            int_curr_symbol: "USD",
                            currency_symbol: "$",
                            mon_decimal_point: ".",
                            mon_thousands_sep: ",",
                            mon_grouping: [3],
                            positive_sign: "",
                            negative_sign: "-",
                            int_frac_digits: 2,
                            frac_digits: 2,
                            p_cs_precedes: 1,
                            p_sep_by_space: 0,
                            n_cs_precedes: 1,
                            n_sep_by_space: 0,
                            p_sign_posn: 3,
                            n_sign_posn: 0
                        },
                        LC_NUMERIC: {
                            decimal_point: ".",
                            thousands_sep: ",",
                            grouping: [3]
                        },
                        LC_MESSAGES: {
                            YESEXPR: "^[yY].*",
                            NOEXPR: "^[nN].*",
                            YESSTR: "",
                            NOSTR: ""
                        },
                        nplurals: u
                    };
                    k.locales.en_US = s(k.locales.en);
                    k.locales.en_US.LC_TIME.c = "%a %d %b %Y %r %Z";
                    k.locales.en_US.LC_TIME.x = "%D";
                    k.locales.en_US.LC_TIME.X = "%r";
                    k.locales.en_US.LC_MONETARY.int_curr_symbol = "USD ";
                    k.locales.en_US.LC_MONETARY.p_sign_posn = 1;
                    k.locales.en_US.LC_MONETARY.n_sign_posn = 1;
                    k.locales.en_US.LC_MONETARY.mon_grouping = [3, 3];
                    k.locales.en_US.LC_NUMERIC.thousands_sep = "";
                    k.locales.en_US.LC_NUMERIC.grouping = [];
                    k.locales.en_GB = s(k.locales.en);
                    k.locales.en_GB.LC_TIME.r = "%l:%M:%S %P %Z";
                    k.locales.en_AU = s(k.locales.en_GB);
                    k.locales.C = s(k.locales.en);
                    k.locales.C.LC_CTYPE.CODESET = "ANSI_X3.4-1968";
                    k.locales.C.LC_MONETARY = {
                        int_curr_symbol: "",
                        currency_symbol: "",
                        mon_decimal_point: "",
                        mon_thousands_sep: "",
                        mon_grouping: [],
                        p_cs_precedes: 127,
                        p_sep_by_space: 127,
                        n_cs_precedes: 127,
                        n_sep_by_space: 127,
                        p_sign_posn: 127,
                        n_sign_posn: 127,
                        positive_sign: "",
                        negative_sign: "",
                        int_frac_digits: 127,
                        frac_digits: 127
                    };
                    k.locales.C.LC_NUMERIC = {
                        decimal_point: ".",
                        thousands_sep: "",
                        grouping: []
                    };
                    k.locales.C.LC_TIME.c = "%a %b %e %H:%M:%S %Y";
                    k.locales.C.LC_TIME.x = "%m/%d/%y";
                    k.locales.C.LC_TIME.X = "%H:%M:%S";
                    k.locales.C.LC_MESSAGES.YESEXPR = "^[yY]";
                    k.locales.C.LC_MESSAGES.NOEXPR = "^[nN]";
                    k.locales.fr = s(k.locales.en);
                    k.locales.fr.nplurals = c;
                    k.locales.fr.LC_TIME.a = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
                    k.locales.fr.LC_TIME.A = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
                    k.locales.fr.LC_TIME.b = ["jan", "fév", "mar", "avr", "mai", "jun", "jui", "aoû", "sep", "oct", "nov", "déc"];
                    k.locales.fr.LC_TIME.B = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre",
                        "octobre", "novembre", "décembre"
                    ];
                    k.locales.fr.LC_TIME.c = "%a %d %b %Y %T %Z";
                    k.locales.fr.LC_TIME.p = ["", ""];
                    k.locales.fr.LC_TIME.P = ["", ""];
                    k.locales.fr.LC_TIME.x = "%d.%m.%Y";
                    k.locales.fr.LC_TIME.X = "%T";
                    k.locales.fr_CA = s(k.locales.fr);
                    k.locales.fr_CA.LC_TIME.x = "%Y-%m-%d"
                }
                if (!k.locale) {
                    k.locale = "en_US";
                    var A = "http://www.w3.org/1999/xhtml";
                    var E = "http://www.w3.org/XML/1998/namespace";
                    if (o.getElementsByTagNameNS && o.getElementsByTagNameNS(A, "html")[0]) {
                        if (o.getElementsByTagNameNS(A, "html")[0].getAttributeNS && o.getElementsByTagNameNS(A, "html")[0].getAttributeNS(
                                E, "lang")) {
                            k.locale = o.getElementsByTagName(A, "html")[0].getAttributeNS(E, "lang")
                        } else if (o.getElementsByTagNameNS(A, "html")[0].lang) {
                            k.locale = o.getElementsByTagNameNS(A, "html")[0].lang
                        }
                    } else if (o.getElementsByTagName("html")[0] && o.getElementsByTagName("html")[0].lang) {
                        k.locale = o.getElementsByTagName("html")[0].lang
                    }
                }
                k.locale = k.locale.replace("-", "_");
                if (!(k.locale in k.locales)) {
                    if (k.locale.replace(/_[a-zA-Z]+$/, "") in k.locales) {
                        k.locale = k.locale.replace(/_[a-zA-Z]+$/, "")
                    }
                }
                if (!k.localeCategories) {
                    k.localeCategories = {
                        LC_COLLATE: k.locale,
                        LC_CTYPE: k.locale,
                        LC_MONETARY: k.locale,
                        LC_NUMERIC: k.locale,
                        LC_TIME: k.locale,
                        LC_MESSAGES: k.locale
                    }
                }
                if (t === null || t === "") {
                    t = this.getenv(e) || this.getenv("LANG")
                } else if (Object.prototype.toString.call(t) === "[object Array]") {
                    for (i = 0; i < t.length; i++) {
                        if (!(t[i] in this.php_js.locales)) {
                            if (i === t.length - 1) {
                                return false
                            }
                            continue
                        }
                        t = t[i];
                        break
                    }
                }
                if (t === "0" || t === 0) {
                    if (e === "LC_ALL") {
                        for (r in this.php_js.localeCategories) {
                            n.push(r + "=" + this.php_js.localeCategories[r])
                        }
                        return n.join(";")
                    }
                    return this.php_js.localeCategories[e]
                }
                if (!(t in this.php_js.locales)) {
                    return false
                }
                if (e === "LC_ALL") {
                    for (r in this.php_js.localeCategories) {
                        this.php_js.localeCategories[r] = t
                    }
                } else {
                    this.php_js.localeCategories[e] = t
                }
                return t
            };
            exports.sha1 = function (e) {
                var t = function (e, t) {
                    var r = e << t | e >>> 32 - t;
                    return r
                };
                var r = function (e) {
                    var t = "";
                    var r;
                    var n;
                    for (r = 7; r >= 0; r--) {
                        n = e >>> r * 4 & 15;
                        t += n.toString(16)
                    }
                    return t
                };
                var n;
                var i, o;
                var s = new Array(80);
                var a = 1732584193;
                var u = 4023233417;
                var c = 2562383102;
                var l = 271733878;
                var f = 3285377520;
                var p, h, d, g, y;
                var v;
                e = this.utf8_encode(e);
                var m = e.length;
                var b = [];
                for (i = 0; i < m - 3; i += 4) {
                    o = e.charCodeAt(i) << 24 | e.charCodeAt(i + 1) << 16 | e.charCodeAt(i + 2) << 8 | e.charCodeAt(i + 3);
                    b.push(o)
                }
                switch (m % 4) {
                case 0:
                    i = 2147483648;
                    break;
                case 1:
                    i = e.charCodeAt(m - 1) << 24 | 8388608;
                    break;
                case 2:
                    i = e.charCodeAt(m - 2) << 24 | e.charCodeAt(m - 1) << 16 | 32768;
                    break;
                case 3:
                    i = e.charCodeAt(m - 3) << 24 | e.charCodeAt(m - 2) << 16 | e.charCodeAt(m - 1) << 8 | 128;
                    break
                }
                b.push(i);
                while (b.length % 16 != 14) {
                    b.push(0)
                }
                b.push(m >>> 29);
                b.push(m << 3 & 4294967295);
                for (n = 0; n < b.length; n += 16) {
                    for (i = 0; i < 16; i++) {
                        s[i] = b[n + i]
                    }
                    for (i = 16; i <= 79; i++) {
                        s[i] = t(s[i - 3] ^ s[i - 8] ^ s[i - 14] ^ s[i - 16], 1)
                    }
                    p = a;
                    h = u;
                    d = c;
                    g = l;
                    y = f;
                    for (i = 0; i <= 19; i++) {
                        v = t(p, 5) + (h & d | ~h & g) + y + s[i] + 1518500249 & 4294967295;
                        y = g;
                        g = d;
                        d = t(h, 30);
                        h = p;
                        p = v
                    }
                    for (i = 20; i <= 39; i++) {
                        v = t(p, 5) + (h ^ d ^ g) + y + s[i] + 1859775393 & 4294967295;
                        y = g;
                        g = d;
                        d = t(h, 30);
                        h = p;
                        p = v
                    }
                    for (i = 40; i <= 59; i++) {
                        v = t(p, 5) + (h & d | h & g | d & g) + y + s[i] + 2400959708 & 4294967295;
                        y = g;
                        g = d;
                        d = t(h, 30);
                        h = p;
                        p = v
                    }
                    for (i = 60; i <= 79; i++) {
                        v = t(p, 5) + (h ^ d ^ g) + y + s[i] + 3395469782 & 4294967295;
                        y = g;
                        g = d;
                        d = t(h, 30);
                        h = p;
                        p = v
                    }
                    a = a + p & 4294967295;
                    u = u + h & 4294967295;
                    c = c + d & 4294967295;
                    l = l + g & 4294967295;
                    f = f + y & 4294967295
                }
                v = r(a) + r(u) + r(c) + r(l) + r(f);
                return v.toLowerCase()
            };
            exports.sha1_file = function (e) {
                var t = this.file_get_contents(e);
                return this.sha1(t)
            };
            exports.split = function (e, t) {
                return this.explode(e, t)
            };
            exports.strchr = function (e, t, r) {
                return this.strstr(e, t, r)
            };
            exports.strnatcmp = function (e, t, r) {
                var n = 0;
                if (r == undefined) {
                    r = false
                }
                var i = function (e) {
                    var t = [];
                    var r = "";
                    var n = "";
                    var i = 0,
                        o = 0;
                    var s = true;
                    o = e.length;
                    for (i = 0; i < o; i++) {
                        n = e.substring(i, i + 1);
                        if (n.match(/\d/)) {
                            if (s) {
                                if (r.length > 0) {
                                    t[t.length] = r;
                                    r = ""
                                }
                                s = false
                            }
                            r += n
                        } else if (s == false && n === "." && i < e.length - 1 && e.substring(i + 1, i + 2)
                            .match(/\d/)) {
                            t[t.length] = r;
                            r = ""
                        } else {
                            if (s == false) {
                                if (r.length > 0) {
                                    t[t.length] = parseInt(r, 10);
                                    r = ""
                                }
                                s = true
                            }
                            r += n
                        }
                    }
                    if (r.length > 0) {
                        if (s) {
                            t[t.length] = r
                        } else {
                            t[t.length] = parseInt(r, 10)
                        }
                    }
                    return t
                };
                var o = i(e + "");
                var s = i(t + "");
                var a = o.length;
                var u = true;
                var c = -1;
                var l = 0;
                if (a > s.length) {
                    a = s.length;
                    c = 1
                }
                for (n = 0; n < a; n++) {
                    if (isNaN(o[n])) {
                        if (isNaN(s[n])) {
                            u = true;
                            if ((l = this.strcmp(o[n], s[n])) != 0) {
                                return l
                            }
                        } else if (u) {
                            return 1
                        } else {
                            return -1
                        }
                    } else if (isNaN(s[n])) {
                        if (u) {
                            return -1
                        } else {
                            return 1
                        }
                    } else {
                        if (u || r) {
                            if ((l = o[n] - s[n]) != 0) {
                                return l
                            }
                        } else {
                            if ((l = this.strcmp(o[n].toString(), s[n].toString())) != 0) {
                                return l
                            }
                        }
                        u = false
                    }
                }
                return c
            };
            exports.vprintf = function (e, t) {
                var r, n;
                var i = "",
                    o = this.window.document;
                var s = "http://www.w3.org/1999/xhtml";
                r = o.getElementsByTagNameNS ? o.getElementsByTagNameNS(s, "body")[0] ? o.getElementsByTagNameNS(s, "body")[0] : o.documentElement
                    .lastChild : o.getElementsByTagName("body")[0];
                if (!r) {
                    return false
                }
                i = this.sprintf.apply(this, [e].concat(t));
                n = o.createTextNode(i);
                r.appendChild(n);
                return i.length
            };
            exports.vsprintf = function (e, t) {
                return this.sprintf.apply(this, [e].concat(t))
            };
            exports.get_headers = function (e, t) {
                var r = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
                if (!r) {
                    throw new Error("XMLHttpRequest not supported")
                }
                var n, i, o, s, a = 0;
                r.open("HEAD", e, false);
                r.send(null);
                if (r.readyState < 3) {
                    return false
                }
                n = r.getAllResponseHeaders();
                n = n.split("\n");
                n = this.array_filter(n, function (e) {
                    return e.substring(1) !== ""
                });
                i = t ? {} : [];
                for (var s in n) {
                    if (t) {
                        o = n[s].split(":");
                        i[o.splice(0, 1)] = o.join(":")
                            .substring(1)
                    } else {
                        i[a++] = n[s]
                    }
                }
                return i
            };
            exports.get_meta_tags = function (e) {
                var t = "";
                if (false) {
                    t = '<meta name="author" content="name">' + '<meta name="keywords" content="php documentation">' +
                        '<meta name="DESCRIPTION" content="a php manual">' + '<meta name="geo.position" content="49.33;-86.59">' +
                        "</head>"
                } else {
                    t = this.file_get_contents(e)
                        .match(/^[\s\S]*<\/head>/i)
                }
                var r = /<meta[^>]*?>/gim;
                var n = /<meta\s+.*?name\s*=\s*(['"]?)(.*?)\1\s+.*?content\s*=\s*(['"]?)(.*?)\3/gim;
                var i = /<meta\s+.*?content\s*=\s*(['"?])(.*?)\1\s+.*?name\s*=\s*(['"]?)(.*?)\3/gim;
                var o, s, a, u = {};
                while ((o = r.exec(t)) !== null) {
                    while ((s = n.exec(o)) !== null) {
                        a = s[2].replace(/\W/g, "_")
                            .toLowerCase();
                        u[a] = s[4]
                    }
                    while ((s = i.exec(o)) !== null) {
                        a = s[4].replace(/\W/g, "_")
                            .toLowerCase();
                        u[a] = s[2]
                    }
                }
                return u
            };
            exports.http_build_query = function (e, t, r) {
                var n, i, o = [],
                    s = this;
                var a = function (e, t, r) {
                    var n, i = [];
                    if (t === true) {
                        t = "1"
                    } else if (t === false) {
                        t = "0"
                    }
                    if (t != null) {
                        if (typeof t === "object") {
                            for (n in t) {
                                if (t[n] != null) {
                                    i.push(a(e + "[" + n + "]", t[n], r))
                                }
                            }
                            return i.join(r)
                        } else if (typeof t !== "function") {
                            return s.urlencode(e) + "=" + s.urlencode(t)
                        } else {
                            throw new Error("There was an error processing for http_build_query().")
                        }
                    } else {
                        return ""
                    }
                };
                if (!r) {
                    r = "&"
                }
                for (i in e) {
                    n = e[i];
                    if (t && !isNaN(i)) {
                        i = String(t) + i
                    }
                    var u = a(i, n, r);
                    if (u !== "") {
                        o.push(u)
                    }
                }
                return o.join(r)
            };
            exports.doubleval = function (e) {
                return this.floatval(e)
            };
            exports.gettype = function (e) {
                var t = typeof e,
                    r;
                var n = function (e) {
                    var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                    if (!t) {
                        return "(Anonymous)"
                    }
                    return t[1]
                };
                if (t === "object") {
                    if (e !== null) {
                        if (typeof e.length === "number" && !e.propertyIsEnumerable("length") && typeof e.splice === "function") {
                            t = "array"
                        } else if (e.constructor && n(e.constructor)) {
                            r = n(e.constructor);
                            if (r === "Date") {
                                t = "date"
                            } else if (r === "RegExp") {
                                t = "regexp"
                            } else if (r === "PHPJS_Resource") {
                                t = "resource"
                            }
                        }
                    } else {
                        t = "null"
                    }
                } else if (t === "number") {
                    t = this.is_float(e) ? "double" : "integer"
                }
                return t
            };
            exports.is_double = function (e) {
                return this.is_float(e)
            };
            exports.is_integer = function (e) {
                return this.is_int(e)
            };
            exports.is_long = function (e) {
                return this.is_float(e)
            };
            exports.is_real = function (e) {
                return this.is_float(e)
            };
            exports.print_r = function (e, t) {
                var r = "",
                    n = " ",
                    i = 4,
                    o = this.window.document,
                    s = function (e) {
                        var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                        if (!t) {
                            return "(Anonymous)"
                        }
                        return t[1]
                    };
                repeat_char = function (e, t) {
                    var r = "";
                    for (var n = 0; n < e; n++) {
                        r += t
                    }
                    return r
                };
                formatArray = function (e, t, r, n) {
                    if (t > 0) {
                        t++
                    }
                    var i = repeat_char(r * t, n);
                    var o = repeat_char(r * (t + 1), n);
                    var a = "";
                    if (typeof e === "object" && e !== null && e.constructor && s(e.constructor) !== "PHPJS_Resource") {
                        a += "Array\n" + i + "(\n";
                        for (var u in e) {
                            if (Object.prototype.toString.call(e[u]) === "[object Array]") {
                                a += o + "[" + u + "] => " + formatArray(e[u], t + 1, r, n)
                            } else {
                                a += o + "[" + u + "] => " + e[u] + "\n"
                            }
                        }
                        a += i + ")\n"
                    } else if (e === null || e === undefined) {
                        a = ""
                    } else {
                        a = e.toString()
                    }
                    return a
                };
                r = formatArray(e, 0, i, n);
                if (t !== true) {
                    if (o.body) {
                        this.echo(r)
                    } else {
                        try {
                            o = XULDocument;
                            this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + r + "</pre>")
                        } catch (e) {
                            this.echo(r)
                        }
                    }
                    return true
                }
                return r
            };
            exports.var_dump = function () {
                var e = "",
                    t = " ",
                    r = 4,
                    n = 0,
                    i = 0;
                var o = function (e) {
                    var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                    if (!t) {
                        return "(Anonymous)"
                    }
                    return t[1]
                };
                var s = function (e, t) {
                    var r = "";
                    for (var n = 0; n < e; n++) {
                        r += t
                    }
                    return r
                };
                var a = function (e, t) {
                    var r = "";
                    if (e === null) {
                        r = "NULL"
                    } else if (typeof e === "boolean") {
                        r = "bool(" + e + ")"
                    } else if (typeof e === "string") {
                        r = "string(" + e.length + ') "' + e + '"'
                    } else if (typeof e === "number") {
                        if (parseFloat(e) == parseInt(e, 10)) {
                            r = "int(" + e + ")"
                        } else {
                            r = "float(" + e + ")"
                        }
                    } else if (typeof e === "undefined") {
                        r = "undefined"
                    } else if (typeof e === "function") {
                        var n = e.toString()
                            .split("\n");
                        r = "";
                        for (var i = 0, o = n.length; i < o; i++) {
                            r += (i !== 0 ? "\n" + t : "") + n[i]
                        }
                    } else if (e instanceof Date) {
                        r = "Date(" + e + ")"
                    } else if (e instanceof RegExp) {
                        r = "RegExp(" + e + ")"
                    } else if (e.nodeName) {
                        switch (e.nodeType) {
                        case 1:
                            if (typeof e.namespaceURI === "undefined" || e.namespaceURI === "http://www.w3.org/1999/xhtml") {
                                r = 'HTMLElement("' + e.nodeName + '")'
                            } else {
                                r = 'XML Element("' + e.nodeName + '")'
                            }
                            break;
                        case 2:
                            r = "ATTRIBUTE_NODE(" + e.nodeName + ")";
                            break;
                        case 3:
                            r = "TEXT_NODE(" + e.nodeValue + ")";
                            break;
                        case 4:
                            r = "CDATA_SECTION_NODE(" + e.nodeValue + ")";
                            break;
                        case 5:
                            r = "ENTITY_REFERENCE_NODE";
                            break;
                        case 6:
                            r = "ENTITY_NODE";
                            break;
                        case 7:
                            r = "PROCESSING_INSTRUCTION_NODE(" + e.nodeName + ":" + e.nodeValue + ")";
                            break;
                        case 8:
                            r = "COMMENT_NODE(" + e.nodeValue + ")";
                            break;
                        case 9:
                            r = "DOCUMENT_NODE";
                            break;
                        case 10:
                            r = "DOCUMENT_TYPE_NODE";
                            break;
                        case 11:
                            r = "DOCUMENT_FRAGMENT_NODE";
                            break;
                        case 12:
                            r = "NOTATION_NODE";
                            break
                        }
                    }
                    return r
                };
                var u = function (e, t, r, i) {
                    var c = "";
                    if (t > 0) {
                        t++
                    }
                    var l = s(r * (t - 1), i);
                    var f = s(r * (t + 1), i);
                    var p = "";
                    var h = "";
                    if (typeof e === "object" && e !== null) {
                        if (e.constructor && o(e.constructor) === "PHPJS_Resource") {
                            return e.var_dump()
                        }
                        n = 0;
                        for (c in e) {
                            n++
                        }
                        p += "array(" + n + ") {\n";
                        for (var d in e) {
                            var g = e[d];
                            if (typeof g === "object" && g !== null && !(g instanceof Date) && !(g instanceof RegExp) && !g.nodeName) {
                                p += f + "[" + d + "] =>\n" + f + u(g, t + 1, r, i)
                            } else {
                                h = a(g, f);
                                p += f + "[" + d + "] =>\n" + f + h + "\n"
                            }
                        }
                        p += l + "}\n"
                    } else {
                        p = a(e, f)
                    }
                    return p
                };
                e = u(arguments[0], 0, r, t);
                for (i = 1; i < arguments.length; i++) {
                    e += "\n" + u(arguments[i], 0, r, t)
                }
                this.echo(e)
            };
            exports.var_export = function (e, t) {
                var r = "",
                    n = "",
                    i, o = 0,
                    s = [],
                    a = 0,
                    u = [],
                    c = arguments[2] || 2,
                    l = "",
                    f = "",
                    p = function (e) {
                        var t = /\W*function\s+([\w\$]+)\s*\(/.exec(e);
                        if (!t) {
                            return "(Anonymous)"
                        }
                        return t[1]
                    };
                _makeIndent = function (e) {
                    return new Array(e + 1)
                        .join(" ")
                };
                __getType = function (e) {
                    var t = 0,
                        r, n, i, o = typeof e;
                    if (o === "object" && (e && e.constructor) && p(e.constructor) === "PHPJS_Resource") {
                        return "resource"
                    }
                    if (o === "function") {
                        return "function"
                    }
                    if (o === "object" && !e) {
                        return "null"
                    }
                    if (o === "object") {
                        if (!e.constructor) {
                            return "object"
                        }
                        i = e.constructor.toString();
                        r = i.match(/(\w+)\(/);
                        if (r) {
                            i = r[1].toLowerCase()
                        }
                        n = ["boolean", "number", "string", "array"];
                        for (t = 0; t < n.length; t++) {
                            if (i === n[t]) {
                                o = n[t];
                                break
                            }
                        }
                    }
                    return o
                };
                type = __getType(e);
                if (type === null) {
                    r = "NULL"
                } else if (type === "array" || type === "object") {
                    f = _makeIndent(c - 2);
                    l = _makeIndent(c);
                    for (a in e) {
                        i = this.var_export(e[a], 1, c + 2);
                        i = typeof i === "string" ? i.replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;") : i;
                        s[o++] = l + a + " => " + (__getType(e[a]) === "array" ? "\n" : "") + i
                    }
                    n = s.join(",\n");
                    r = f + "array (\n" + n + "\n" + f + ")"
                } else if (type === "function") {
                    u = e.toString()
                        .match(/function .*?\((.*?)\) \{([\s\S]*)\}/);
                    r = "create_function ('" + u[1] + "', '" + u[2].replace(new RegExp("'", "g"), "\\'") + "')"
                } else if (type === "resource") {
                    r = "NULL"
                } else {
                    r = typeof e !== "string" ? e : "'" + e.replace(/(["'])/g, "\\$1")
                        .replace(/\0/g, "\\0") + "'"
                }
                if (!t) {
                    this.echo(r);
                    return null
                }
                return r
            };
            exports.arsort = function (e, t) {
                var r = [],
                    n = 0,
                    i, o, s, a, u = this,
                    c = false,
                    l = {};
                switch (t) {
                case "SORT_STRING":
                    a = function (e, t) {
                        return u.strnatcmp(t, e)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var f = this.i18n_loc_get_default();
                    a = this.php_js.i18nLocales[f].sorting;
                    break;
                case "SORT_NUMERIC":
                    a = function (e, t) {
                        return e - t
                    };
                    break;
                case "SORT_REGULAR":
                default:
                    a = function (e, t) {
                        var r = parseFloat(t),
                            n = parseFloat(e),
                            i = r + "" === t,
                            o = n + "" === e;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return t > e ? 1 : t < e ? -1 : 0
                    };
                    break
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                c = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                l = c ? e : l;
                for (i in e) {
                    if (e.hasOwnProperty(i)) {
                        r.push([i, e[i]]);
                        if (c) {
                            delete e[i]
                        }
                    }
                }
                r.sort(function (e, t) {
                    return a(e[1], t[1])
                });
                for (o = 0, n = r.length; o < n; o++) {
                    l[r[o][0]] = r[o][1]
                }
                return c || l
            };
            exports.asort = function (e, t) {
                var r = [],
                    n = 0,
                    i, o, s, a, u = this,
                    c = false,
                    l = {};
                switch (t) {
                case "SORT_STRING":
                    a = function (e, t) {
                        return u.strnatcmp(e, t)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var f = this.i18n_loc_get_default();
                    a = this.php_js.i18nLocales[f].sorting;
                    break;
                case "SORT_NUMERIC":
                    a = function (e, t) {
                        return e - t
                    };
                    break;
                case "SORT_REGULAR":
                default:
                    a = function (e, t) {
                        var r = parseFloat(e),
                            n = parseFloat(t),
                            i = r + "" === e,
                            o = n + "" === t;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return e > t ? 1 : e < t ? -1 : 0
                    };
                    break
                }
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                c = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                l = c ? e : l;
                for (i in e) {
                    if (e.hasOwnProperty(i)) {
                        r.push([i, e[i]]);
                        if (c) {
                            delete e[i]
                        }
                    }
                }
                r.sort(function (e, t) {
                    return a(e[1], t[1])
                });
                for (o = 0, n = r.length; o < n; o++) {
                    l[r[o][0]] = r[o][1]
                }
                return c || l
            };
            exports.krsort = function (e, t) {
                var r = {},
                    n = [],
                    i, o, s, a = this,
                    u = false,
                    c = {};
                switch (t) {
                case "SORT_STRING":
                    i = function (e, t) {
                        return a.strnatcmp(t, e)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var l = this.i18n_loc_get_default();
                    i = this.php_js.i18nLocales[l].sorting;
                    break;
                case "SORT_NUMERIC":
                    i = function (e, t) {
                        return t - e
                    };
                    break;
                case "SORT_REGULAR":
                default:
                    i = function (e, t) {
                        var r = parseFloat(t),
                            n = parseFloat(e),
                            i = r + "" === t,
                            o = n + "" === e;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return t > e ? 1 : t < e ? -1 : 0
                    };
                    break
                }
                for (s in e) {
                    if (e.hasOwnProperty(s)) {
                        n.push(s)
                    }
                }
                n.sort(i);
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                u = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                c = u ? e : c;
                for (o = 0; o < n.length; o++) {
                    s = n[o];
                    r[s] = e[s];
                    if (u) {
                        delete e[s]
                    }
                }
                for (o in r) {
                    if (r.hasOwnProperty(o)) {
                        c[o] = r[o]
                    }
                }
                return u || c
            };
            exports.ksort = function (e, t) {
                var r = {},
                    n = [],
                    i, o, s, a = this,
                    u = false,
                    c = {};
                switch (t) {
                case "SORT_STRING":
                    i = function (e, t) {
                        return a.strnatcmp(e, t)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var l = this.i18n_loc_get_default();
                    i = this.php_js.i18nLocales[l].sorting;
                    break;
                case "SORT_NUMERIC":
                    i = function (e, t) {
                        return e + 0 - (t + 0)
                    };
                    break;
                default:
                    i = function (e, t) {
                        var r = parseFloat(e),
                            n = parseFloat(t),
                            i = r + "" === e,
                            o = n + "" === t;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return e > t ? 1 : e < t ? -1 : 0
                    };
                    break
                }
                for (s in e) {
                    if (e.hasOwnProperty(s)) {
                        n.push(s)
                    }
                }
                n.sort(i);
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                u = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                c = u ? e : c;
                for (o = 0; o < n.length; o++) {
                    s = n[o];
                    r[s] = e[s];
                    if (u) {
                        delete e[s]
                    }
                }
                for (o in r) {
                    if (r.hasOwnProperty(o)) {
                        c[o] = r[o]
                    }
                }
                return u || c
            };
            exports.natsort = function (e) {
                var t = [],
                    r, n, i, o = this,
                    s = false,
                    a = {};
                this.php_js = this.php_js || {};
                this.php_js.ini = this.php_js.ini || {};
                s = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                a = s ? e : a;
                for (r in e) {
                    if (e.hasOwnProperty(r)) {
                        t.push([r, e[r]]);
                        if (s) {
                            delete e[r]
                        }
                    }
                }
                t.sort(function (e, t) {
                    return o.strnatcmp(e[1], t[1])
                });
                for (n = 0; n < t.length; n++) {
                    a[t[n][0]] = t[n][1]
                }
                return s || a
            };
            exports.rsort = function (e, t) {
                var r = [],
                    n = "",
                    i = 0,
                    o = false,
                    s = this,
                    a = false,
                    u = [];
                switch (t) {
                case "SORT_STRING":
                    o = function (e, t) {
                        return s.strnatcmp(t, e)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var c = this.i18n_loc_get_default();
                    o = this.php_js.i18nLocales[c].sorting;
                    break;
                case "SORT_NUMERIC":
                    o = function (e, t) {
                        return t - e
                    };
                    break;
                case "SORT_REGULAR":
                default:
                    o = function (e, t) {
                        var r = parseFloat(t),
                            n = parseFloat(e),
                            i = r + "" === t,
                            o = n + "" === e;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return t > e ? 1 : t < e ? -1 : 0
                    };
                    break
                }
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                this.php_js.ini = this.php_js.ini || {};
                a = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                u = a ? e : u;
                for (n in e) {
                    if (e.hasOwnProperty(n)) {
                        r.push(e[n]);
                        if (a) {
                            delete e[n]
                        }
                    }
                }
                r.sort(o);
                for (i = 0; i < r.length; i++) {
                    u[i] = r[i]
                }
                return a || u
            };
            exports.sort = function (e, t) {
                var r = [],
                    n = [],
                    i = "",
                    o = 0,
                    s = false,
                    a = this,
                    u = false,
                    c = [];
                switch (t) {
                case "SORT_STRING":
                    s = function (e, t) {
                        return a.strnatcmp(e, t)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var l = this.i18n_loc_get_default();
                    s = this.php_js.i18nLocales[l].sorting;
                    break;
                case "SORT_NUMERIC":
                    s = function (e, t) {
                        return e - t
                    };
                    break;
                case "SORT_REGULAR":
                default:
                    s = function (e, t) {
                        var r = parseFloat(e),
                            n = parseFloat(t),
                            i = r + "" === e,
                            o = n + "" === t;
                        if (i && o) {
                            return r > n ? 1 : r < n ? -1 : 0
                        } else if (i && !o) {
                            return 1
                        } else if (!i && o) {
                            return -1
                        }
                        return e > t ? 1 : e < t ? -1 : 0
                    };
                    break
                }
                try {
                    this.php_js = this.php_js || {}
                } catch (e) {
                    this.php_js = {}
                }
                this.php_js.ini = this.php_js.ini || {};
                u = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini[
                    "phpjs.strictForIn"].local_value !== "off";
                c = u ? e : c;
                for (i in e) {
                    if (e.hasOwnProperty(i)) {
                        r.push(e[i]);
                        if (u) {
                            delete e[i]
                        }
                    }
                }
                r.sort(s);
                for (o = 0; o < r.length; o++) {
                    c[o] = r[o]
                }
                return u || c
            };
            exports.ctype_alnum = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.an) !== -1
            };
            exports.ctype_alpha = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.al) !== -1
            };
            exports.ctype_cntrl = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.ct) !== -1
            };
            exports.ctype_digit = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1
            };
            exports.ctype_graph = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.gr) !== -1
            };
            exports.ctype_lower = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lw) !== -1
            };
            exports.ctype_print = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.pr) !== -1
            };
            exports.ctype_punct = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.pu) !== -1
            };
            exports.ctype_space = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.sp) !== -1
            };
            exports.ctype_upper = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.up) !== -1
            };
            exports.ctype_xdigit = function (e) {
                if (typeof e !== "string") {
                    return false
                }
                this.setlocale("LC_ALL", 0);
                return e.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1
            };
            exports.strftime = function (e, t) {
                this.php_js = this.php_js || {};
                this.setlocale("LC_ALL", 0);
                var r = this.php_js;
                var n = function (e, t, r) {
                    if (typeof r === "undefined") {
                        r = 10
                    }
                    for (; parseInt(e, 10) < r && r > 1; r /= 10) {
                        e = t.toString() + e
                    }
                    return e.toString()
                };
                var i = r.localeCategories.LC_TIME;
                var o = r.locales;
                var s = o[i].LC_TIME;
                var a = {
                    a: function (e) {
                        return s.a[e.getDay()]
                    },
                    A: function (e) {
                        return s.A[e.getDay()]
                    },
                    b: function (e) {
                        return s.b[e.getMonth()]
                    },
                    B: function (e) {
                        return s.B[e.getMonth()]
                    },
                    C: function (e) {
                        return n(parseInt(e.getFullYear() / 100, 10), 0)
                    },
                    d: ["getDate", "0"],
                    e: ["getDate", " "],
                    g: function (e) {
                        return n(parseInt(this.G(e) / 100, 10), 0)
                    },
                    G: function (e) {
                        var t = e.getFullYear();
                        var r = parseInt(a.V(e), 10);
                        var n = parseInt(a.W(e), 10);
                        if (n > r) {
                            t++
                        } else if (n === 0 && r >= 52) {
                            t--
                        }
                        return t
                    },
                    H: ["getHours", "0"],
                    I: function (e) {
                        var t = e.getHours() % 12;
                        return n(t === 0 ? 12 : t, 0)
                    },
                    j: function (e) {
                        var t = e - new Date("" + e.getFullYear() + "/1/1 GMT");
                        t += e.getTimezoneOffset() * 6e4;
                        var r = parseInt(t / 6e4 / 60 / 24, 10) + 1;
                        return n(r, 0, 100)
                    },
                    k: ["getHours", "0"],
                    l: function (e) {
                        var t = e.getHours() % 12;
                        return n(t === 0 ? 12 : t, " ")
                    },
                    m: function (e) {
                        return n(e.getMonth() + 1, 0)
                    },
                    M: ["getMinutes", "0"],
                    p: function (e) {
                        return s.p[e.getHours() >= 12 ? 1 : 0]
                    },
                    P: function (e) {
                        return s.P[e.getHours() >= 12 ? 1 : 0]
                    },
                    s: function (e) {
                        return Date.parse(e) / 1e3
                    },
                    S: ["getSeconds", "0"],
                    u: function (e) {
                        var t = e.getDay();
                        return t === 0 ? 7 : t
                    },
                    U: function (e) {
                        var t = parseInt(a.j(e), 10);
                        var r = 6 - e.getDay();
                        var i = parseInt((t + r) / 7, 10);
                        return n(i, 0)
                    },
                    V: function (e) {
                        var t = parseInt(a.W(e), 10);
                        var r = new Date("" + e.getFullYear() + "/1/1")
                            .getDay();
                        var i = t + (r > 4 || r <= 1 ? 0 : 1);
                        if (i === 53 && new Date("" + e.getFullYear() + "/12/31")
                            .getDay() < 4) {
                            i = 1
                        } else if (i === 0) {
                            i = a.V(new Date("" + (e.getFullYear() - 1) + "/12/31"))
                        }
                        return n(i, 0)
                    },
                    w: "getDay",
                    W: function (e) {
                        var t = parseInt(a.j(e), 10);
                        var r = 7 - a.u(e);
                        var i = parseInt((t + r) / 7, 10);
                        return n(i, 0, 10)
                    },
                    y: function (e) {
                        return n(e.getFullYear() % 100, 0)
                    },
                    Y: "getFullYear",
                    z: function (e) {
                        var t = e.getTimezoneOffset();
                        var r = n(parseInt(Math.abs(t / 60), 10), 0);
                        var i = n(t % 60, 0);
                        return (t > 0 ? "-" : "+") + r + i
                    },
                    Z: function (e) {
                        return e.toString()
                            .replace(/^.*\(([^)]+)\)$/, "$1")
                    },
                    "%": function (e) {
                        return "%"
                    }
                };
                var u = typeof t === "undefined" ? new Date : typeof t === "object" ? new Date(t) : new Date(t * 1e3);
                var c = {
                    c: "locale",
                    D: "%m/%d/%y",
                    F: "%y-%m-%d",
                    h: "%b",
                    n: "\n",
                    r: "locale",
                    R: "%H:%M",
                    t: "\t",
                    T: "%H:%M:%S",
                    x: "locale",
                    X: "locale"
                };
                while (e.match(/%[cDFhnrRtTxX]/)) {
                    e = e.replace(/%([cDFhnrRtTxX])/g, function (e, t) {
                        var r = c[t];
                        return r === "locale" ? s[t] : r
                    })
                }
                var l = e.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, function (e, t) {
                    var r = a[t];
                    if (typeof r === "string") {
                        return u[r]()
                    } else if (typeof r === "function") {
                        return r(u)
                    } else if (typeof r === "object" && typeof r[0] === "string") {
                        return n(u[r[0]](), r[1])
                    } else {
                        return t
                    }
                });
                return l
            };
            exports.strptime = function (e, t) {
                var r = {
                        tm_sec: 0,
                        tm_min: 0,
                        tm_hour: 0,
                        tm_mday: 0,
                        tm_mon: 0,
                        tm_year: 0,
                        tm_wday: 0,
                        tm_yday: 0,
                        unparsed: ""
                    },
                    n = 0,
                    i = this,
                    o = 0,
                    s = false,
                    a = function (e, t) {
                        var n, i = r,
                            o = e;
                        i.tm_sec = o.getUTCSeconds();
                        i.tm_min = o.getUTCMinutes();
                        i.tm_hour = o.getUTCHours();
                        i.tm_mday = t === 0 ? t : o.getUTCDate();
                        i.tm_mon = o.getUTCMonth();
                        i.tm_year = o.getUTCFullYear() - 1900;
                        i.tm_wday = t === 0 ? o.getUTCDay() > 0 ? o.getUTCDay() - 1 : 6 : o.getUTCDay();
                        n = new Date(Date.UTC(o.getUTCFullYear(), 0, 1));
                        i.tm_yday = Math.ceil((o - n) / (1e3 * 60 * 60 * 24))
                    },
                    u = function () {
                        var e = r;
                        return a(new Date(Date.UTC(e.tm_year + 1900, e.tm_mon, e.tm_mday || 1, e.tm_hour, e.tm_min, e.tm_sec)), e.tm_mday)
                    };
                var c = /\S/,
                    l = /\s/;
                var f = {
                    c: "locale",
                    D: "%m/%d/%y",
                    F: "%y-%m-%d",
                    r: "locale",
                    R: "%H:%M",
                    T: "%H:%M:%S",
                    x: "locale",
                    X: "locale"
                };
                var p = function (e) {
                    return (e + "")
                        .replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1")
                };
                this.php_js = this.php_js || {};
                this.setlocale("LC_ALL", 0);
                var h = this.php_js;
                var d = h.localeCategories.LC_TIME;
                var g = h.locales;
                var y = g[d].LC_TIME;
                while (t.match(/%[cDFhnrRtTxX]/)) {
                    t = t.replace(/%([cDFhnrRtTxX])/g, function (e, t) {
                        var r = f[t];
                        return r === "locale" ? y[t] : r
                    })
                }
                var v = function (t, r, n) {
                    if (typeof r === "string") {
                        r = new RegExp("^" + r, "i")
                    }
                    var i = e.slice(t);
                    var o = r.exec(i);
                    var s = o ? n.apply(null, o) : null;
                    if (s === null) {
                        throw "No match in string"
                    }
                    return t + o[0].length
                };
                var m = function (e, t, n) {
                    return v(e, i.array_map(p, y[t])
                        .join("|"),
                        function (e) {
                            var i = y[t].search(new RegExp("^" + p(e) + "$", "i"));
                            if (i) {
                                r[n] = i[0]
                            }
                        })
                };
                for (n = 0, j = 0; n < t.length; n++) {
                    if (t.charAt(n) === "%") {
                        var b = ["%", "n", "t"].indexOf(t.charAt(n + 1));
                        if (b !== -1) {
                            if (["%", "\n", "\t"].indexOf(e.charAt(j)) === b) {
                                ++n;
                                ++j;
                                continue
                            }
                            return false
                        }
                        var _ = t.charAt(n + 1);
                        try {
                            switch (_) {
                            case "a":
                            case "A":
                                j = m(j, _, "tm_wday");
                                break;
                            case "h":
                            case "b":
                                j = m(j, "b", "tm_mon");
                                u();
                                break;
                            case "B":
                                j = m(j, _, "tm_mon");
                                u();
                                break;
                            case "C":
                                j = v(j, /^\d?\d/, function (e) {
                                    var t = (parseInt(e, 10) - 19) * 100;
                                    r.tm_year = t;
                                    u();
                                    if (!r.tm_yday) {
                                        r.tm_yday = -1
                                    }
                                });
                                break;
                            case "d":
                            case "e":
                                j = v(j, _ === "d" ? /^(0[1-9]|[1-2]\d|3[0-1])/ : /^([1-2]\d|3[0-1]|[1-9])/, function (e) {
                                    var t = parseInt(e, 10);
                                    r.tm_mday = t;
                                    u()
                                });
                                break;
                            case "g":
                                break;
                            case "G":
                                break;
                            case "H":
                                j = v(j, /^([0-1]\d|2[0-3])/, function (e) {
                                    var t = parseInt(e, 10);
                                    r.tm_hour = t
                                });
                                break;
                            case "l":
                            case "I":
                                j = v(j, _ === "l" ? /^([1-9]|1[0-2])/ : /^(0[1-9]|1[0-2])/, function (e) {
                                    var t = parseInt(e, 10) - 1 + o;
                                    r.tm_hour = t;
                                    s = true
                                });
                                break;
                            case "j":
                                j = v(j, /^(00[1-9]|0[1-9]\d|[1-2]\d\d|3[0-6][0-6])/, function (e) {
                                    var t = parseInt(e, 10) - 1;
                                    r.tm_yday = t
                                });
                                break;
                            case "m":
                                j = v(j, /^(0[1-9]|1[0-2])/, function (e) {
                                    var t = parseInt(e, 10) - 1;
                                    r.tm_mon = t;
                                    u()
                                });
                                break;
                            case "M":
                                j = v(j, /^[0-5]\d/, function (e) {
                                    var t = parseInt(e, 10);
                                    r.tm_min = t
                                });
                                break;
                            case "P":
                                return false;
                            case "p":
                                j = v(j, /^(am|pm)/i, function (e) {
                                    o = /a/.test(e) ? 0 : 12;
                                    if (s) {
                                        r.tm_hour += o
                                    }
                                });
                                break;
                            case "s":
                                j = v(j, /^\d+/, function (e) {
                                    var t = parseInt(e, 10);
                                    var r = new Date(Date.UTC(t * 1e3));
                                    a(r)
                                });
                                break;
                            case "S":
                                j = v(j, /^[0-5]\d/, function (e) {
                                    var t = parseInt(e, 10);
                                    r.tm_sec = t
                                });
                                break;
                            case "u":
                            case "w":
                                j = v(j, /^\d/, function (e) {
                                    r.tm_wday = e - (_ === "u")
                                });
                                break;
                            case "U":
                            case "V":
                            case "W":
                                break;
                            case "y":
                                j = v(j, /^\d?\d/, function (e) {
                                    e = parseInt(e, 10);
                                    var t = e >= 69 ? e : e + 100;
                                    r.tm_year = t;
                                    u();
                                    if (!r.tm_yday) {
                                        r.tm_yday = -1
                                    }
                                });
                                break;
                            case "Y":
                                j = v(j, /^\d{1,4}/, function (e) {
                                    var t = parseInt(e, 10) - 1900;
                                    r.tm_year = t;
                                    u();
                                    if (!r.tm_yday) {
                                        r.tm_yday = -1
                                    }
                                });
                                break;
                            case "z":
                                break;
                            case "Z":
                                break;
                            default:
                                throw "Unrecognized formatting character in strptime()"
                            }
                        } catch (e) {
                            if (e === "No match in string") {
                                return false
                            }
                        }++n
                    } else if (t.charAt(n) !== e.charAt(j)) {
                        if (e.charAt(j)
                            .search(l) !== -1) {
                            j++;
                            n--
                        } else if (t.charAt(n)
                            .search(c) !== -1) {
                            return false
                        }
                    } else {
                        j++
                    }
                }
                r.unparsed = e.slice(j);
                return r
            };
            exports.sql_regcase = function (e) {
                this.setlocale("LC_ALL", 0);
                var t = 0,
                    r = "",
                    n = "",
                    i = 0,
                    o = "";
                r = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.upper;
                n = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.lower;
                for (t = 0; t < e.length; t++) {
                    if ((i = r.indexOf(e.charAt(t))) !== -1 || (i = n.indexOf(e.charAt(t))) !== -1) {
                        o += "[" + r.charAt(i) + n.charAt(i) + "]"
                    } else {
                        o += e.charAt(t)
                    }
                }
                return o
            };
            exports.localeconv = function () {
                var e = {},
                    t = "";
                this.setlocale("LC_ALL", 0);
                for (t in this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC].LC_NUMERIC) {
                    e[t] = this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC].LC_NUMERIC[t]
                }
                for (t in this.php_js.locales[this.php_js.localeCategories.LC_MONETARY].LC_MONETARY) {
                    e[t] = this.php_js.locales[this.php_js.localeCategories.LC_MONETARY].LC_MONETARY[t]
                }
                return e
            };
            exports.money_format = function (e, t) {
                if (typeof t !== "number") {
                    return null
                }
                var r = /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in%])/g;
                this.setlocale("LC_ALL", 0);
                var n = this.php_js.locales[this.php_js.localeCategories["LC_MONETARY"]]["LC_MONETARY"];
                var i = function (e, r, i, o, s, a, u, c, l) {
                    var f = "",
                        p = "";
                    if (l === "%") {
                        return "%"
                    }
                    var h = r && /=./.test(r) ? r.match(/=(.)/)[1] : " ";
                    var d = !r || r.indexOf("!") === -1;
                    o = parseInt(o, 10) || 0;
                    var g = t < 0;
                    t = t + "";
                    t = g ? t.slice(1) : t;
                    var y = t.indexOf(".");
                    var v = y !== -1 ? t.slice(0, y) : t;
                    var m = y !== -1 ? t.slice(y + 1) : "";
                    var b = function (e, t, r) {
                        var n = e.split("");
                        n.splice(t, 0, r);
                        return n.join("")
                    };
                    var _ = v.length;
                    a = parseInt(a, 10);
                    var w = _ < a;
                    if (w) {
                        var C = a - _;
                        v = new Array(C + 1)
                            .join(h) + v
                    }
                    if (r.indexOf("^") === -1) {
                        var k = n.mon_thousands_sep;
                        var A = n.mon_grouping;
                        if (A[0] < v.length) {
                            for (var E = 0, x = v.length; E < A.length; E++) {
                                x -= A[E];
                                if (x <= 0) {
                                    break
                                }
                                if (w && x < C) {
                                    k = h
                                }
                                v = b(v, x, k)
                            }
                        }
                        if (A[E - 1] > 0) {
                            while (x > A[E - 1]) {
                                x -= A[E - 1];
                                if (w && x < C) {
                                    k = h
                                }
                                v = b(v, x, k)
                            }
                        }
                    }
                    if (c === "0") {
                        f = v
                    } else {
                        var S = n.mon_decimal_point;
                        if (c === "" || c === undefined) {
                            c = l === "i" ? n.int_frac_digits : n.frac_digits
                        }
                        c = parseInt(c, 10);
                        if (c === 0) {
                            m = "";
                            S = ""
                        } else if (c < m.length) {
                            m = Math.round(parseFloat(m.slice(0, c) + "." + m.substr(c, 1))) + "";
                            if (c > m.length) {
                                m = new Array(c - m.length + 1)
                                    .join("0") + m
                            }
                        } else if (c > m.length) {
                            m += new Array(c - m.length + 1)
                                .join("0")
                        }
                        f = v + S + m
                    }
                    var j = "";
                    if (d) {
                        j = l === "i" ? n.int_curr_symbol : n.currency_symbol
                    }
                    var I = g ? n.n_sign_posn : n.p_sign_posn;
                    var R = g ? n.n_sep_by_space : n.p_sep_by_space;
                    var D = g ? n.n_cs_precedes : n.p_cs_precedes;
                    if (r.indexOf("(") !== -1) {
                        p = (D ? j + (R === 1 ? " " : "") : "") + f + (!D ? (R === 1 ? " " : "") + j : "");
                        if (g) {
                            p = "(" + p + ")"
                        } else {
                            p = " " + p + " "
                        }
                    } else {
                        var F = n.positive_sign;
                        var T = n.negative_sign;
                        var O = g ? T : F;
                        var L = g ? F : T;
                        var B = "";
                        if (I) {
                            B = new Array(L.length - O.length + 1)
                                .join(" ")
                        }
                        var P = "";
                        switch (I) {
                        case 0:
                            P = D ? j + (R === 1 ? " " : "") + f : f + (R === 1 ? " " : "") + j;
                            p = "(" + P + ")";
                            break;
                        case 1:
                            P = D ? j + (R === 1 ? " " : "") + f : f + (R === 1 ? " " : "") + j;
                            p = B + O + (R === 2 ? " " : "") + P;
                            break;
                        case 2:
                            P = D ? j + (R === 1 ? " " : "") + f : f + (R === 1 ? " " : "") + j;
                            p = P + (R === 2 ? " " : "") + O + B;
                            break;
                        case 3:
                            p = D ? B + O + (R === 2 ? " " : "") + j + (R === 1 ? " " : "") + f : f + (R === 1 ? " " : "") + O + B + (R ===
                                2 ? " " : "") + j;
                            break;
                        case 4:
                            p = D ? j + (R === 2 ? " " : "") + B + O + (R === 1 ? " " : "") + f : f + (R === 1 ? " " : "") + j + (R ===
                                2 ? " " : "") + O + B;
                            break
                        }
                    }
                    var N = o - p.length;
                    if (N > 0) {
                        N = new Array(N + 1)
                            .join(" ");
                        if (r.indexOf("-") !== -1) {
                            p += N
                        } else {
                            p = N + p
                        }
                    }
                    return p
                };
                return e.replace(r, i)
            };
            exports.nl_langinfo = function (e) {
                this.setlocale("LC_ALL", 0);
                var t = this.php_js.locales[this.php_js.localeCategories.LC_TIME];
                if (e.indexOf("ABDAY_") === 0) {
                    return t.LC_TIME.a[parseInt(e.replace(/^ABDAY_/, ""), 10) - 1]
                } else if (e.indexOf("DAY_") === 0) {
                    return t.LC_TIME.A[parseInt(e.replace(/^DAY_/, ""), 10) - 1]
                } else if (e.indexOf("ABMON_") === 0) {
                    return t.LC_TIME.b[parseInt(e.replace(/^ABMON_/, ""), 10) - 1]
                } else if (e.indexOf("MON_") === 0) {
                    return t.LC_TIME.B[parseInt(e.replace(/^MON_/, ""), 10) - 1]
                } else {
                    switch (e) {
                    case "AM_STR":
                        return t.LC_TIME.p[0];
                    case "PM_STR":
                        return t.LC_TIME.p[1];
                    case "D_T_FMT":
                        return t.LC_TIME.c;
                    case "D_FMT":
                        return t.LC_TIME.x;
                    case "T_FMT":
                        return t.LC_TIME.X;
                    case "T_FMT_AMPM":
                        return t.LC_TIME.r;
                    case "ERA":
                    case "ERA_YEAR":
                    case "ERA_D_T_FMT":
                    case "ERA_D_FMT":
                    case "ERA_T_FMT":
                        return t.LC_TIME[e]
                    }
                    t = this.php_js.locales[this.php_js.localeCategories.LC_MONETARY];
                    if (e === "CRNCYSTR") {
                        e = "CURRENCY_SYMBOL"
                    }
                    switch (e) {
                    case "INT_CURR_SYMBOL":
                    case "CURRENCY_SYMBOL":
                    case "MON_DECIMAL_POINT":
                    case "MON_THOUSANDS_SEP":
                    case "POSITIVE_SIGN":
                    case "NEGATIVE_SIGN":
                    case "INT_FRAC_DIGITS":
                    case "FRAC_DIGITS":
                    case "P_CS_PRECEDES":
                    case "P_SEP_BY_SPACE":
                    case "N_CS_PRECEDES":
                    case "N_SEP_BY_SPACE":
                    case "P_SIGN_POSN":
                    case "N_SIGN_POSN":
                        return t.LC_MONETARY[e.toLowerCase()];
                    case "MON_GROUPING":
                        return t.LC_MONETARY[e.toLowerCase()]
                    }
                    t = this.php_js.locales[this.php_js.localeCategories.LC_NUMERIC];
                    switch (e) {
                    case "RADIXCHAR":
                    case "DECIMAL_POINT":
                        return t.LC_NUMERIC[e.toLowerCase()];
                    case "THOUSEP":
                    case "THOUSANDS_SEP":
                        return t.LC_NUMERIC[e.toLowerCase()];
                    case "GROUPING":
                        return t.LC_NUMERIC[e.toLowerCase()]
                    }
                    t = this.php_js.locales[this.php_js.localeCategories.LC_MESSAGES];
                    switch (e) {
                    case "YESEXPR":
                    case "NOEXPR":
                    case "YESSTR":
                    case "NOSTR":
                        return t.LC_MESSAGES[e]
                    }
                    t = this.php_js.locales[this.php_js.localeCategories.LC_CTYPE];
                    if (e === "CODESET") {
                        return t.LC_CTYPE[e]
                    }
                    return false
                }
            };
            exports.strcoll = function (e, t) {
                this.setlocale("LC_ALL", 0);
                var r = this.php_js.locales[this.php_js.localeCategories.LC_COLLATE].LC_COLLATE;
                return r(e, t)
            };
            exports.strval = function (e) {
                var t = "";
                if (e === null) {
                    return ""
                }
                t = this.gettype(e);
                switch (t) {
                case "boolean":
                    if (e === true) {
                        return "1"
                    }
                    return "";
                case "array":
                    return "Array";
                case "object":
                    return "Object"
                }
                return e
            };
            exports.gmstrftime = function (e, t) {
                var r = typeof t === "undefined" ? new Date : typeof t === "object" ? new Date(t) : new Date(t * 1e3);
                t = Date.parse(r.toUTCString()
                    .slice(0, -4)) / 1e3;
                return this.strftime(e, t)
            };
            exports.str_word_count = function (e, t, r) {
                var n = e.length,
                    i = r && r.length,
                    o = "",
                    s = "",
                    a = 0,
                    u = "",
                    c = [],
                    l = 0,
                    f = {},
                    p = 0,
                    h = "",
                    d = false;
                var g = function (e) {
                    return (e + "")
                        .replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1")
                };
                _getWholeChar = function (e, t) {
                    var r = e.charCodeAt(t);
                    if (r < 55296 || r > 57343) {
                        return e.charAt(t)
                    }
                    if (55296 <= r && r <= 56319) {
                        if (e.length <= t + 1) {
                            throw "High surrogate without following low surrogate"
                        }
                        var n = e.charCodeAt(t + 1);
                        if (56320 > n || n > 57343) {
                            throw "High surrogate without following low surrogate"
                        }
                        return e.charAt(t) + e.charAt(t + 1)
                    }
                    if (t === 0) {
                        throw "Low surrogate without preceding high surrogate"
                    }
                    var i = e.charCodeAt(t - 1);
                    if (55296 > i || i > 56319) {
                        throw "Low surrogate without preceding high surrogate"
                    }
                    return false
                };
                if (i) {
                    h = "^(" + g(_getWholeChar(r, 0));
                    for (a = 1; a < i; a++) {
                        if ((o = _getWholeChar(r, a)) === false) {
                            continue
                        }
                        h += "|" + g(o)
                    }
                    h += ")$";
                    h = new RegExp(h)
                }
                for (a = 0; a < n; a++) {
                    if ((u = _getWholeChar(e, a)) === false) {
                        continue
                    }
                    d = this.ctype_alpha(u) || h && u.search(h) !== -1 || a !== 0 && a !== n - 1 && u === "-" || a !== 0 && u === "'";
                    if (d) {
                        if (s === "" && t === 2) {
                            p = a
                        }
                        s = s + u
                    }
                    if (a === n - 1 || !d && s !== "") {
                        if (t !== 2) {
                            c[c.length] = s
                        } else {
                            f[p] = s
                        }
                        s = "";
                        l++
                    }
                }
                if (!t) {
                    return l
                } else if (t === 1) {
                    return c
                } else if (t === 2) {
                    return f
                }
                throw "You have supplied an incorrect format"
            };
            exports.strtr = function (e, t, r) {
                var n = "",
                    i = 0,
                    o = 0,
                    s = 0,
                    a = 0,
                    u = false,
                    c = "",
                    l = "",
                    f = "";
                var p = [];
                var h = [];
                var d = "";
                var g = false;
                if (typeof t === "object") {
                    u = this.ini_set("phpjs.strictForIn", false);
                    t = this.krsort(t);
                    this.ini_set("phpjs.strictForIn", u);
                    for (n in t) {
                        if (t.hasOwnProperty(n)) {
                            p.push(n);
                            h.push(t[n])
                        }
                    }
                    t = p;
                    r = h
                }
                s = e.length;
                a = t.length;
                c = typeof t === "string";
                l = typeof r === "string";
                for (i = 0; i < s; i++) {
                    g = false;
                    if (c) {
                        f = e.charAt(i);
                        for (o = 0; o < a; o++) {
                            if (f == t.charAt(o)) {
                                g = true;
                                break
                            }
                        }
                    } else {
                        for (o = 0; o < a; o++) {
                            if (e.substr(i, t[o].length) == t[o]) {
                                g = true;
                                i = i + t[o].length - 1;
                                break
                            }
                        }
                    }
                    if (g) {
                        d += l ? r.charAt(o) : r[o]
                    } else {
                        d += e.charAt(i)
                    }
                }
                return d
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    53: [function (e, t, r) {
        (function (r) {
            phpjs = e("./build/npm");
            phpjs.registerGlobals = function () {
                for (var e in this) {
                    r[e] = this[e]
                }
            };
            t.exports = phpjs
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./build/npm": 52
    }],
    54: [function (e, t, r) {
        (function (e, r) {
            var n = function () {
                var t = e.env.RELAY_LOG_LEVEL || r.RELAY_LOG_LEVEL;
                var n;
                var i;
                var o = function () {
                    var e = Array.prototype.slice.call(arguments);
                    var t = [];
                    if (i) {
                        t.push("[" + i + "]")
                    }
                    return t.concat(e)
                };
                this.log = function () {
                    if (t === "debug" || t === "info") {
                        console.log.apply(null, o.apply(null, arguments))
                    }
                };
                this.debug = function () {
                    if (t === "debug") {
                        if (console.debug) {
                            console.debug.apply(null, o.apply(null, arguments))
                        } else {
                            console.log.apply(null, o.apply(null, arguments))
                        }
                    }
                };
                this.scopedDebug = function (e, r) {
                    var i = false;
                    if (t === "debug") {
                        if (typeof n !== "undefined") {
                            n.forEach(function (t) {
                                if (e.startsWith(t)) {
                                    i = true
                                }
                            })
                        }
                        if (!i) {
                            return
                        }
                        if (console.debug) {
                            console.debug.apply(null, o.apply(null, r))
                        } else {
                            console.log.apply(null, o.apply(null, r))
                        }
                    }
                };
                this.error = function () {
                    console.error.apply(null, o.apply(null, arguments))
                };
                this.SetLogLevel = function (e) {
                    t = e
                };
                this.SetCustomerId = function (e) {
                    i = e
                };
                this.AddScope = function (e) {
                    if (typeof n === "undefined") {
                        n = []
                    }
                    if (n.indexOf(e) === -1) {
                        n.push(e)
                    }
                };
                this.ClearScopes = function () {
                    n = undefined
                };
                return this
            };
            if (!r.RelayLog) {
                r.RelayLog = new n
            }
            t.exports = n
        })
        .call(this, e("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ?
            window : {})
    }, {
        _process: 2
    }],
    55: [function (e, t, r) {
        var n = e("./url");
        var i = e("socket.io-parser");
        var o = e("./manager");
        var s = e("debug")("socket.io-client");
        t.exports = r = u;
        var a = r.managers = {};

        function u(e, t) {
            if (typeof e === "object") {
                t = e;
                e = undefined
            }
            t = t || {};
            var r = n(e);
            var i = r.source;
            var u = r.id;
            var c = r.path;
            var l = a[u] && c in a[u].nsps;
            var f = t.forceNew || t["force new connection"] || false === t.multiplex || l;
            var p;
            if (f) {
                s("ignoring socket cache for %s", i);
                p = o(i, t)
            } else {
                if (!a[u]) {
                    s("new io instance for %s", i);
                    a[u] = o(i, t)
                }
                p = a[u]
            }
            if (r.query && !t.query) {
                t.query = r.query
            }
            return p.socket(r.path, t)
        }
        r.protocol = i.protocol;
        r.connect = u;
        r.Manager = e("./manager");
        r.Socket = e("./socket")
    }, {
        "./manager": 56,
        "./socket": 58,
        "./url": 59,
        debug: 60,
        "socket.io-parser": 64
    }],
    56: [function (e, t, r) {
        var n = e("engine.io-client");
        var i = e("./socket");
        var o = e("component-emitter");
        var s = e("socket.io-parser");
        var a = e("./on");
        var u = e("component-bind");
        var c = e("debug")("socket.io-client:manager");
        var l = e("indexof");
        var f = e("backo2");
        var p = Object.prototype.hasOwnProperty;
        t.exports = h;

        function h(e, t) {
            if (!(this instanceof h)) return new h(e, t);
            if (e && "object" === typeof e) {
                t = e;
                e = undefined
            }
            t = t || {};
            t.path = t.path || "/socket.io";
            this.nsps = {};
            this.subs = [];
            this.opts = t;
            this.reconnection(t.reconnection !== false);
            this.reconnectionAttempts(t.reconnectionAttempts || Infinity);
            this.reconnectionDelay(t.reconnectionDelay || 1e3);
            this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3);
            this.randomizationFactor(t.randomizationFactor || .5);
            this.backoff = new f({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            });
            this.timeout(null == t.timeout ? 2e4 : t.timeout);
            this.readyState = "closed";
            this.uri = e;
            this.connecting = [];
            this.lastPing = null;
            this.encoding = false;
            this.packetBuffer = [];
            var r = t.parser || s;
            this.encoder = new r.Encoder;
            this.decoder = new r.Decoder;
            this.autoConnect = t.autoConnect !== false;
            if (this.autoConnect) this.open()
        }
        h.prototype.emitAll = function () {
            this.emit.apply(this, arguments);
            for (var e in this.nsps) {
                if (p.call(this.nsps, e)) {
                    this.nsps[e].emit.apply(this.nsps[e], arguments)
                }
            }
        };
        h.prototype.updateSocketIds = function () {
            for (var e in this.nsps) {
                if (p.call(this.nsps, e)) {
                    this.nsps[e].id = this.generateId(e)
                }
            }
        };
        h.prototype.generateId = function (e) {
            return (e === "/" ? "" : e + "#") + this.engine.id
        };
        o(h.prototype);
        h.prototype.reconnection = function (e) {
            if (!arguments.length) return this._reconnection;
            this._reconnection = !!e;
            return this
        };
        h.prototype.reconnectionAttempts = function (e) {
            if (!arguments.length) return this._reconnectionAttempts;
            this._reconnectionAttempts = e;
            return this
        };
        h.prototype.reconnectionDelay = function (e) {
            if (!arguments.length) return this._reconnectionDelay;
            this._reconnectionDelay = e;
            this.backoff && this.backoff.setMin(e);
            return this
        };
        h.prototype.randomizationFactor = function (e) {
            if (!arguments.length) return this._randomizationFactor;
            this._randomizationFactor = e;
            this.backoff && this.backoff.setJitter(e);
            return this
        };
        h.prototype.reconnectionDelayMax = function (e) {
            if (!arguments.length) return this._reconnectionDelayMax;
            this._reconnectionDelayMax = e;
            this.backoff && this.backoff.setMax(e);
            return this
        };
        h.prototype.timeout = function (e) {
            if (!arguments.length) return this._timeout;
            this._timeout = e;
            return this
        };
        h.prototype.maybeReconnectOnOpen = function () {
            if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
                this.reconnect()
            }
        };
        h.prototype.open = h.prototype.connect = function (e, t) {
            c("readyState %s", this.readyState);
            if (~this.readyState.indexOf("open")) return this;
            c("opening %s", this.uri);
            this.engine = n(this.uri, this.opts);
            var r = this.engine;
            var i = this;
            this.readyState = "opening";
            this.skipReconnect = false;
            var o = a(r, "open", function () {
                i.onopen();
                e && e()
            });
            var s = a(r, "error", function (t) {
                c("connect_error");
                i.cleanup();
                i.readyState = "closed";
                i.emitAll("connect_error", t);
                if (e) {
                    var r = new Error("Connection error");
                    r.data = t;
                    e(r)
                } else {
                    i.maybeReconnectOnOpen()
                }
            });
            if (false !== this._timeout) {
                var u = this._timeout;
                c("connect attempt will timeout after %d", u);
                var l = setTimeout(function () {
                    c("connect attempt timed out after %d", u);
                    o.destroy();
                    r.close();
                    r.emit("error", "timeout");
                    i.emitAll("connect_timeout", u)
                }, u);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(l)
                    }
                })
            }
            this.subs.push(o);
            this.subs.push(s);
            return this
        };
        h.prototype.onopen = function () {
            c("open");
            this.cleanup();
            this.readyState = "open";
            this.emit("open");
            var e = this.engine;
            this.subs.push(a(e, "data", u(this, "ondata")));
            this.subs.push(a(e, "ping", u(this, "onping")));
            this.subs.push(a(e, "pong", u(this, "onpong")));
            this.subs.push(a(e, "error", u(this, "onerror")));
            this.subs.push(a(e, "close", u(this, "onclose")));
            this.subs.push(a(this.decoder, "decoded", u(this, "ondecoded")))
        };
        h.prototype.onping = function () {
            this.lastPing = new Date;
            this.emitAll("ping")
        };
        h.prototype.onpong = function () {
            this.emitAll("pong", new Date - this.lastPing)
        };
        h.prototype.ondata = function (e) {
            this.decoder.add(e)
        };
        h.prototype.ondecoded = function (e) {
            this.emit("packet", e)
        };
        h.prototype.onerror = function (e) {
            c("error", e);
            this.emitAll("error", e)
        };
        h.prototype.socket = function (e, t) {
            var r = this.nsps[e];
            if (!r) {
                r = new i(this, e, t);
                this.nsps[e] = r;
                var n = this;
                r.on("connecting", o);
                r.on("connect", function () {
                    r.id = n.generateId(e)
                });
                if (this.autoConnect) {
                    o()
                }
            }

            function o() {
                if (!~l(n.connecting, r)) {
                    n.connecting.push(r)
                }
            }
            return r
        };
        h.prototype.destroy = function (e) {
            var t = l(this.connecting, e);
            if (~t) this.connecting.splice(t, 1);
            if (this.connecting.length) return;
            this.close()
        };
        h.prototype.packet = function (e) {
            c("writing packet %j", e);
            var t = this;
            if (e.query && e.type === 0) e.nsp += "?" + e.query;
            if (!t.encoding) {
                t.encoding = true;
                this.encoder.encode(e, function (r) {
                    for (var n = 0; n < r.length; n++) {
                        t.engine.write(r[n], e.options)
                    }
                    t.encoding = false;
                    t.processPacketQueue()
                })
            } else {
                t.packetBuffer.push(e)
            }
        };
        h.prototype.processPacketQueue = function () {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var e = this.packetBuffer.shift();
                this.packet(e)
            }
        };
        h.prototype.cleanup = function () {
            c("cleanup");
            var e = this.subs.length;
            for (var t = 0; t < e; t++) {
                var r = this.subs.shift();
                r.destroy()
            }
            this.packetBuffer = [];
            this.encoding = false;
            this.lastPing = null;
            this.decoder.destroy()
        };
        h.prototype.close = h.prototype.disconnect = function () {
            c("disconnect");
            this.skipReconnect = true;
            this.reconnecting = false;
            if ("opening" === this.readyState) {
                this.cleanup()
            }
            this.backoff.reset();
            this.readyState = "closed";
            if (this.engine) this.engine.close()
        };
        h.prototype.onclose = function (e) {
            c("onclose");
            this.cleanup();
            this.backoff.reset();
            this.readyState = "closed";
            this.emit("close", e);
            if (this._reconnection && !this.skipReconnect) {
                this.reconnect()
            }
        };
        h.prototype.reconnect = function () {
            if (this.reconnecting || this.skipReconnect) return this;
            var e = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) {
                c("reconnect failed");
                this.backoff.reset();
                this.emitAll("reconnect_failed");
                this.reconnecting = false
            } else {
                var t = this.backoff.duration();
                c("will wait %dms before reconnect attempt", t);
                this.reconnecting = true;
                var r = setTimeout(function () {
                    if (e.skipReconnect) return;
                    c("attempting reconnect");
                    e.emitAll("reconnect_attempt", e.backoff.attempts);
                    e.emitAll("reconnecting", e.backoff.attempts);
                    if (e.skipReconnect) return;
                    e.open(function (t) {
                        if (t) {
                            c("reconnect attempt error");
                            e.reconnecting = false;
                            e.reconnect();
                            e.emitAll("reconnect_error", t.data)
                        } else {
                            c("reconnect success");
                            e.onreconnect()
                        }
                    })
                }, t);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(r)
                    }
                })
            }
        };
        h.prototype.onreconnect = function () {
            var e = this.backoff.attempts;
            this.reconnecting = false;
            this.backoff.reset();
            this.updateSocketIds();
            this.emitAll("reconnect", e)
        }
    }, {
        "./on": 57,
        "./socket": 58,
        backo2: 10,
        "component-bind": 13,
        "component-emitter": 14,
        debug: 60,
        "engine.io-client": 16,
        indexof: 48,
        "socket.io-parser": 64
    }],
    57: [function (e, t, r) {
        t.exports = n;

        function n(e, t, r) {
            e.on(t, r);
            return {
                destroy: function () {
                    e.removeListener(t, r)
                }
            }
        }
    }, {}],
    58: [function (e, t, r) {
        var n = e("socket.io-parser");
        var i = e("component-emitter");
        var o = e("to-array");
        var s = e("./on");
        var a = e("component-bind");
        var u = e("debug")("socket.io-client:socket");
        var c = e("parseqs");
        var l = e("has-binary2");
        t.exports = r = h;
        var f = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        };
        var p = i.prototype.emit;

        function h(e, t, r) {
            this.io = e;
            this.nsp = t;
            this.json = this;
            this.ids = 0;
            this.acks = {};
            this.receiveBuffer = [];
            this.sendBuffer = [];
            this.connected = false;
            this.disconnected = true;
            this.flags = {};
            if (r && r.query) {
                this.query = r.query
            }
            if (this.io.autoConnect) this.open()
        }
        i(h.prototype);
        h.prototype.subEvents = function () {
            if (this.subs) return;
            var e = this.io;
            this.subs = [s(e, "open", a(this, "onopen")), s(e, "packet", a(this, "onpacket")), s(e, "close", a(this, "onclose"))]
        };
        h.prototype.open = h.prototype.connect = function () {
            if (this.connected) return this;
            this.subEvents();
            this.io.open();
            if ("open" === this.io.readyState) this.onopen();
            this.emit("connecting");
            return this
        };
        h.prototype.send = function () {
            var e = o(arguments);
            e.unshift("message");
            this.emit.apply(this, e);
            return this
        };
        h.prototype.emit = function (e) {
            if (f.hasOwnProperty(e)) {
                p.apply(this, arguments);
                return this
            }
            var t = o(arguments);
            var r = {
                type: (this.flags.binary !== undefined ? this.flags.binary : l(t)) ? n.BINARY_EVENT : n.EVENT,
                data: t
            };
            r.options = {};
            r.options.compress = !this.flags || false !== this.flags.compress;
            if ("function" === typeof t[t.length - 1]) {
                u("emitting packet with ack id %d", this.ids);
                this.acks[this.ids] = t.pop();
                r.id = this.ids++
            }
            if (this.connected) {
                this.packet(r)
            } else {
                this.sendBuffer.push(r)
            }
            this.flags = {};
            return this
        };
        h.prototype.packet = function (e) {
            e.nsp = this.nsp;
            this.io.packet(e)
        };
        h.prototype.onopen = function () {
            u("transport is open - connecting");
            if ("/" !== this.nsp) {
                if (this.query) {
                    var e = typeof this.query === "object" ? c.encode(this.query) : this.query;
                    u("sending connect packet with query %s", e);
                    this.packet({
                        type: n.CONNECT,
                        query: e
                    })
                } else {
                    this.packet({
                        type: n.CONNECT
                    })
                }
            }
        };
        h.prototype.onclose = function (e) {
            u("close (%s)", e);
            this.connected = false;
            this.disconnected = true;
            delete this.id;
            this.emit("disconnect", e)
        };
        h.prototype.onpacket = function (e) {
            if (e.nsp !== this.nsp) return;
            switch (e.type) {
            case n.CONNECT:
                this.onconnect();
                break;
            case n.EVENT:
                this.onevent(e);
                break;
            case n.BINARY_EVENT:
                this.onevent(e);
                break;
            case n.ACK:
                this.onack(e);
                break;
            case n.BINARY_ACK:
                this.onack(e);
                break;
            case n.DISCONNECT:
                this.ondisconnect();
                break;
            case n.ERROR:
                this.emit("error", e.data);
                break
            }
        };
        h.prototype.onevent = function (e) {
            var t = e.data || [];
            u("emitting event %j", t);
            if (null != e.id) {
                u("attaching ack callback to event");
                t.push(this.ack(e.id))
            }
            if (this.connected) {
                p.apply(this, t)
            } else {
                this.receiveBuffer.push(t)
            }
        };
        h.prototype.ack = function (e) {
            var t = this;
            var r = false;
            return function () {
                if (r) return;
                r = true;
                var i = o(arguments);
                u("sending ack %j", i);
                t.packet({
                    type: l(i) ? n.BINARY_ACK : n.ACK,
                    id: e,
                    data: i
                })
            }
        };
        h.prototype.onack = function (e) {
            var t = this.acks[e.id];
            if ("function" === typeof t) {
                u("calling ack %s with %j", e.id, e.data);
                t.apply(this, e.data);
                delete this.acks[e.id]
            } else {
                u("bad ack %s", e.id)
            }
        };
        h.prototype.onconnect = function () {
            this.connected = true;
            this.disconnected = false;
            this.emit("connect");
            this.emitBuffered()
        };
        h.prototype.emitBuffered = function () {
            var e;
            for (e = 0; e < this.receiveBuffer.length; e++) {
                p.apply(this, this.receiveBuffer[e])
            }
            this.receiveBuffer = [];
            for (e = 0; e < this.sendBuffer.length; e++) {
                this.packet(this.sendBuffer[e])
            }
            this.sendBuffer = []
        };
        h.prototype.ondisconnect = function () {
            u("server disconnect (%s)", this.nsp);
            this.destroy();
            this.onclose("io server disconnect")
        };
        h.prototype.destroy = function () {
            if (this.subs) {
                for (var e = 0; e < this.subs.length; e++) {
                    this.subs[e].destroy()
                }
                this.subs = null
            }
            this.io.destroy(this)
        };
        h.prototype.close = h.prototype.disconnect = function () {
            if (this.connected) {
                u("performing disconnect (%s)", this.nsp);
                this.packet({
                    type: n.DISCONNECT
                })
            }
            this.destroy();
            if (this.connected) {
                this.onclose("io client disconnect")
            }
            return this
        };
        h.prototype.compress = function (e) {
            this.flags.compress = e;
            return this
        };
        h.prototype.binary = function (e) {
            this.flags.binary = e;
            return this
        }
    }, {
        "./on": 57,
        "component-bind": 13,
        "component-emitter": 14,
        debug: 60,
        "has-binary2": 45,
        parseqs: 50,
        "socket.io-parser": 64,
        "to-array": 70
    }],
    59: [function (e, t, r) {
        (function (r) {
            var n = e("parseuri");
            var i = e("debug")("socket.io-client:url");
            t.exports = o;

            function o(e, t) {
                var o = e;
                t = t || r.location;
                if (null == e) e = t.protocol + "//" + t.host;
                if ("string" === typeof e) {
                    if ("/" === e.charAt(0)) {
                        if ("/" === e.charAt(1)) {
                            e = t.protocol + e
                        } else {
                            e = t.host + e
                        }
                    }
                    if (!/^(https?|wss?):\/\//.test(e)) {
                        i("protocol-less url %s", e);
                        if ("undefined" !== typeof t) {
                            e = t.protocol + "//" + e
                        } else {
                            e = "https://" + e
                        }
                    }
                    i("parse %s", e);
                    o = n(e)
                }
                if (!o.port) {
                    if (/^(http|ws)$/.test(o.protocol)) {
                        o.port = "80"
                    } else if (/^(http|ws)s$/.test(o.protocol)) {
                        o.port = "443"
                    }
                }
                o.path = o.path || "/";
                var s = o.host.indexOf(":") !== -1;
                var a = s ? "[" + o.host + "]" : o.host;
                o.id = o.protocol + "://" + a + ":" + o.port;
                o.href = o.protocol + "://" + a + (t && t.port === o.port ? "" : ":" + o.port);
                return o
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        debug: 60,
        parseuri: 51
    }],
    60: [function (e, t, r) {
        arguments[4][25][0].apply(r, arguments)
    }, {
        "./debug": 61,
        _process: 2,
        dup: 25
    }],
    61: [function (e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {
        dup: 26,
        ms: 62
    }],
    62: [function (e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {
        dup: 27
    }],
    63: [function (e, t, r) {
        (function (t) {
            var n = e("isarray");
            var i = e("./is-buffer");
            var o = Object.prototype.toString;
            var s = typeof t.Blob === "function" || o.call(t.Blob) === "[object BlobConstructor]";
            var a = typeof t.File === "function" || o.call(t.File) === "[object FileConstructor]";
            r.deconstructPacket = function (e) {
                var t = [];
                var r = e.data;
                var n = e;
                n.data = u(r, t);
                n.attachments = t.length;
                return {
                    packet: n,
                    buffers: t
                }
            };

            function u(e, t) {
                if (!e) return e;
                if (i(e)) {
                    var r = {
                        _placeholder: true,
                        num: t.length
                    };
                    t.push(e);
                    return r
                } else if (n(e)) {
                    var o = new Array(e.length);
                    for (var s = 0; s < e.length; s++) {
                        o[s] = u(e[s], t)
                    }
                    return o
                } else if (typeof e === "object" && !(e instanceof Date)) {
                    var o = {};
                    for (var a in e) {
                        o[a] = u(e[a], t)
                    }
                    return o
                }
                return e
            }
            r.reconstructPacket = function (e, t) {
                e.data = c(e.data, t);
                e.attachments = undefined;
                return e
            };

            function c(e, t) {
                if (!e) return e;
                if (e && e._placeholder) {
                    return t[e.num]
                } else if (n(e)) {
                    for (var r = 0; r < e.length; r++) {
                        e[r] = c(e[r], t)
                    }
                } else if (typeof e === "object") {
                    for (var i in e) {
                        e[i] = c(e[i], t)
                    }
                }
                return e
            }
            r.removeBlobs = function (e, t) {
                function r(e, c, l) {
                    if (!e) return e;
                    if (s && e instanceof Blob || a && e instanceof File) {
                        o++;
                        var f = new FileReader;
                        f.onload = function () {
                            if (l) {
                                l[c] = this.result
                            } else {
                                u = this.result
                            }
                            if (!--o) {
                                t(u)
                            }
                        };
                        f.readAsArrayBuffer(e)
                    } else if (n(e)) {
                        for (var p = 0; p < e.length; p++) {
                            r(e[p], p, e)
                        }
                    } else if (typeof e === "object" && !i(e)) {
                        for (var h in e) {
                            r(e[h], h, e)
                        }
                    }
                }
                var o = 0;
                var u = e;
                r(u);
                if (!o) {
                    t(u)
                }
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./is-buffer": 65,
        isarray: 68
    }],
    64: [function (e, t, r) {
        var n = e("debug")("socket.io-parser");
        var i = e("component-emitter");
        var o = e("./binary");
        var s = e("isarray");
        var a = e("./is-buffer");
        r.protocol = 4;
        r.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"];
        r.CONNECT = 0;
        r.DISCONNECT = 1;
        r.EVENT = 2;
        r.ACK = 3;
        r.ERROR = 4;
        r.BINARY_EVENT = 5;
        r.BINARY_ACK = 6;
        r.Encoder = u;
        r.Decoder = h;

        function u() {}
        var c = r.ERROR + '"encode error"';
        u.prototype.encode = function (e, t) {
            n("encoding packet %j", e);
            if (r.BINARY_EVENT === e.type || r.BINARY_ACK === e.type) {
                p(e, t)
            } else {
                var i = l(e);
                t([i])
            }
        };

        function l(e) {
            var t = "" + e.type;
            if (r.BINARY_EVENT === e.type || r.BINARY_ACK === e.type) {
                t += e.attachments + "-"
            }
            if (e.nsp && "/" !== e.nsp) {
                t += e.nsp + ","
            }
            if (null != e.id) {
                t += e.id
            }
            if (null != e.data) {
                var i = f(e.data);
                if (i !== false) {
                    t += i
                } else {
                    return c
                }
            }
            n("encoded %j as %s", e, t);
            return t
        }

        function f(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return false
            }
        }

        function p(e, t) {
            function r(e) {
                var r = o.deconstructPacket(e);
                var n = l(r.packet);
                var i = r.buffers;
                i.unshift(n);
                t(i)
            }
            o.removeBlobs(e, r)
        }

        function h() {
            this.reconstructor = null
        }
        i(h.prototype);
        h.prototype.add = function (e) {
            var t;
            if (typeof e === "string") {
                t = d(e);
                if (r.BINARY_EVENT === t.type || r.BINARY_ACK === t.type) {
                    this.reconstructor = new y(t);
                    if (this.reconstructor.reconPack.attachments === 0) {
                        this.emit("decoded", t)
                    }
                } else {
                    this.emit("decoded", t)
                }
            } else if (a(e) || e.base64) {
                if (!this.reconstructor) {
                    throw new Error("got binary data when not reconstructing a packet")
                } else {
                    t = this.reconstructor.takeBinaryData(e);
                    if (t) {
                        this.reconstructor = null;
                        this.emit("decoded", t)
                    }
                }
            } else {
                throw new Error("Unknown type: " + e)
            }
        };

        function d(e) {
            var t = 0;
            var i = {
                type: Number(e.charAt(0))
            };
            if (null == r.types[i.type]) {
                return v("unknown packet type " + i.type)
            }
            if (r.BINARY_EVENT === i.type || r.BINARY_ACK === i.type) {
                var o = "";
                while (e.charAt(++t) !== "-") {
                    o += e.charAt(t);
                    if (t == e.length) break
                }
                if (o != Number(o) || e.charAt(t) !== "-") {
                    throw new Error("Illegal attachments")
                }
                i.attachments = Number(o)
            }
            if ("/" === e.charAt(t + 1)) {
                i.nsp = "";
                while (++t) {
                    var a = e.charAt(t);
                    if ("," === a) break;
                    i.nsp += a;
                    if (t === e.length) break
                }
            } else {
                i.nsp = "/"
            }
            var u = e.charAt(t + 1);
            if ("" !== u && Number(u) == u) {
                i.id = "";
                while (++t) {
                    var a = e.charAt(t);
                    if (null == a || Number(a) != a) {
                        --t;
                        break
                    }
                    i.id += e.charAt(t);
                    if (t === e.length) break
                }
                i.id = Number(i.id)
            }
            if (e.charAt(++t)) {
                var c = g(e.substr(t));
                var l = c !== false && (i.type === r.ERROR || s(c));
                if (l) {
                    i.data = c
                } else {
                    return v("invalid payload")
                }
            }
            n("decoded %s as %j", e, i);
            return i
        }

        function g(e) {
            try {
                return JSON.parse(e)
            } catch (e) {
                return false
            }
        }
        h.prototype.destroy = function () {
            if (this.reconstructor) {
                this.reconstructor.finishedReconstruction()
            }
        };

        function y(e) {
            this.reconPack = e;
            this.buffers = []
        }
        y.prototype.takeBinaryData = function (e) {
            this.buffers.push(e);
            if (this.buffers.length === this.reconPack.attachments) {
                var t = o.reconstructPacket(this.reconPack, this.buffers);
                this.finishedReconstruction();
                return t
            }
            return null
        };
        y.prototype.finishedReconstruction = function () {
            this.reconPack = null;
            this.buffers = []
        };

        function v(e) {
            return {
                type: r.ERROR,
                data: "parser error: " + e
            }
        }
    }, {
        "./binary": 63,
        "./is-buffer": 65,
        "component-emitter": 14,
        debug: 66,
        isarray: 68
    }],
    65: [function (e, t, r) {
        (function (e) {
            t.exports = o;
            var r = typeof e.Buffer === "function" && typeof e.Buffer.isBuffer === "function";
            var n = typeof e.ArrayBuffer === "function";
            var i = function () {
                if (n && typeof e.ArrayBuffer.isView === "function") {
                    return e.ArrayBuffer.isView
                } else {
                    return function (t) {
                        return t.buffer instanceof e.ArrayBuffer
                    }
                }
            }();

            function o(t) {
                return r && e.Buffer.isBuffer(t) || n && (t instanceof e.ArrayBuffer || i(t))
            }
        })
        .call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    66: [function (e, t, r) {
        arguments[4][25][0].apply(r, arguments)
    }, {
        "./debug": 67,
        _process: 2,
        dup: 25
    }],
    67: [function (e, t, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {
        dup: 26,
        ms: 69
    }],
    68: [function (e, t, r) {
        arguments[4][46][0].apply(r, arguments)
    }, {
        dup: 46
    }],
    69: [function (e, t, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {
        dup: 27
    }],
    70: [function (e, t, r) {
        t.exports = n;

        function n(e, t) {
            var r = [];
            t = t || 0;
            for (var n = t || 0; n < e.length; n++) {
                r[n - t] = e[n]
            }
            return r
        }
    }, {}],
    71: [function (e, t, r) {
        "use strict";
        var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
            i = 64,
            o = {},
            s = 0,
            a = 0,
            u;

        function c(e) {
            var t = "";
            do {
                t = n[e % i] + t;
                e = Math.floor(e / i)
            } while (e > 0);
            return t
        }

        function l(e) {
            var t = 0;
            for (a = 0; a < e.length; a++) {
                t = t * i + o[e.charAt(a)]
            }
            return t
        }

        function f() {
            var e = c(+new Date);
            if (e !== u) return s = 0, u = e;
            return e + "." + c(s++)
        }
        for (; a < i; a++) o[n[a]] = a;
        f.encode = c;
        f.decode = l;
        t.exports = f
    }, {}]
}, {}, [5]);
