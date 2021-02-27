var map;
var tb;
require(["esri/map",
    "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/dijit/Scalebar",
    "esri/dijit/Legend",
    "esri/dijit/BasemapGallery",
    "esri/dijit/Search",

    "dojo/on",
    "dojo/parser",
    "dojo/ready",

    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
    "dojo/domReady!"],
    function (
        Map, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, Scalebar, Legend, BasemapGallery, Search,
        on, parser, ready,
        TabContainer, ContentPane, BorderContainer) {
        ready(function () {
            parser.parse();

            on(dojo.byId("pintaYQuery"), "click", fPintaYQuery);
            on(dojo.byId("progButtonNode"), "click", fQueryEstados);

            function fPintaYQuery() {
                alert("Evento del botón Ir a estado");
            }
            function fQueryEstados() {
                alert("Evento del botón Seleccionar ciudades");
            }


            var extentInitial = new Extent({
                "xmin": -14432324.097760037,
                "ymin": 2293550.7283651032,
                "xmax": -6879122.710734069,
                "ymax": 7058329.323548583,
                "spatialReference": { "wkid": 102100, "latestWkid": 3857 }
            });
            map = new Map("map", {
                basemap: "topo",
                extent: extentInitial
            });



            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                opacity: 0.5
            });
            var lyrCities = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0");
            var lyrHighways = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/1");
            var lyrStates = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2");
            var lyrCounties = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3");

            map.addLayers([lyrCounties, lyrStates, lyrHighways, lyrCities]);

            map.on("load", function (evt) {
                map.resize();
                map.reposition();

            });
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, "basemapGallery");

            basemapGallery.startup();

            map.on("layer-add-result", function () {

                var legend = new Legend({
                    map: map,
                    arragement: Legend.ALIGN_RIGHT
                }, "legendDiv");
                legend.startup();
            });

            var dijitScalebar = new Scalebar({
                map: map,
                scalebarUnit: "dual",
                attachTo: "bottom-left"
            });

            var dijitSearch = new Search({
                map: map,
                autoComplete: true,
                visible: true
            }, "divSearch");
            dijitSearch.startup();

        });

    });
