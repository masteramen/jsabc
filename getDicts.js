const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios')
const jquery = require('jquery')
const request = require('request');
const ts = require('./translation');
request.get('http://www.baidu.com');

//console.log(ts.translate("hello"));
(async()=>{
    let url = "https://howtodoinjava.com/spring5/";
    let response = await axios.get(url);
    let $ = jquery(new JSDOM(response.data).window);
    let list = $('h2 a').toArray();
    for(let i=0;i<list.length;i++){
        let el = $(list[i]);
        console.log(el.text());
        let cnTitle = await ts.translate(el.text());
        console.log(cnTitle);
        let response = await axios.get(el[0].href);
        let $2 = jquery(new JSDOM(response.data).window);
        let content = $2('.entry-content').html();
        console.log(content);

    }

})();


