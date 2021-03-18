(function () {
    var _a = window.location,
        pathname = _a.pathname,
        search = _a.search;
    var packagePath = pathname.substring(0, pathname.lastIndexOf("/"));
    var localeUrlParamRegex = /locale=([\w-]+)/;
    var dojoLocale = search.match(localeUrlParamRegex) ?
        RegExp.$1 :
        undefined;
    var config = {
        async: true,
        locale: dojoLocale,
        has: {
            "esri-promise-compatibility-deprecation-warnings": 0 
        },
        packages: [
            {
                name: "app",
                location: packagePath + "/app"
            }
        ]
    };
    window["dojoConfig"] = config;
})();
