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
            // Not neccessary anymore. This is handele by webpack
            // {
            //     name: "app",
            //     location: packagePath + "/app"
            // },
            // We still need this, because the widgets load content relative to themself outside webpack
            {
                name: "ttwidgets",
                location: packagePath + "/assets/libs/widgets"
            }
        ]
    };
    window["dojoConfig"] = config;
})();
