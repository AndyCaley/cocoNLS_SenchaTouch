var clientID = 'J4ICDDVP2PQWURTAA4NDIG4POPCTF2PNHFROMHYPE2KGRGNR';
var clientSecret = 'TIXUN2ABDUBTYNCUCNA1CI41UIBIGMTCPYEDQIHH3JNZCO21';

Ext.Ajax.defaultHeaders = {
        'Accept'         : 'application/json,application/xml',
        'Content-Type'   : 'application/json'
};

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        var dataList = new Ext.List({
            store: null,
            itemTpl: '{text}{name}<br/><small>{from_user}{url}</small>'
        });

        var ajaxPanel = new Ext.Panel({
            scroll: 'vertical',
            cls: 'card1 demo-data',
            styleHtmlContent: true,
            fullscreen : true,

            dockedItems: [
                {
                    dock : 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'Load Latest Twitter Trends',
                            handler: function() {

                                dataList.update('');
                                dataList.setLoading(true, true);

                                getTwitterTrends( function(tweets) {

                                    dataList.bindStore(tweets);
                                    dataList.scroller.scrollTo({x: 0, y: 0});
                                    dataList.setLoading(false);
                                });
                            }
                        },
                        {
                            text: 'Search for Cocollage Tweets',
                            handler: function() {
                                dataList.update('');
                                dataList.setLoading(true, true);

                                getTwitterHashSearch( function(tweets) {
                                    dataList.bindStore(tweets);
                                    dataList.scroller.scrollTo({x:0, y:0});
                                    dataList.setLoading(false);
                                });
                            }
                        }
                    ]
                }
            ],

            items: [dataList]
        });

    }
});

function getTwitterTrends(callback) {

            // create data model
   Ext.regModel("Tweet", {
            fields: [
                {name: "url", type: "string"},
                {name: "name", type: "string"},
            ]
        });

   Ext.regStore("trends", {
        model: 'Tweet',
        autoLoad: true,
        proxy: {
            // call Yelp to get business data
            type: 'scripttag',
            url: 'http://api.twitter.com/1/trends.json',
            reader: {
                type: 'json',
                root: 'trends'
            }
        },
        listeners: {
            // when the records load, fire the callback
            'load': function (store) {
                callback(store);
            }
        }
    })
}

function getTwitterHashSearch(callback) {
    Ext.regModel("Tweet", {
        fields: [
            {name:"text", type:"string"},
            {name:"from_user"}
        ]
    });

    Ext.regStore("tweets", {
        model:'Tweet',
        autoLoad: true,
        proxy: {
            type: 'scripttag',
            url: 'http://api.twitter.com/search.json?q=cocollage',
            reader: {
                type: 'json',
                root: 'results'
            }
        },
        listeners: {
            'load' : function (store) {
                callback(store);
            }
        }
    });

}