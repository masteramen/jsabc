const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('./axios')
const jquery = require('jquery')
const ts = require('./translation');
const fs = require('fs');

console.log(
    "$9.99  €8.47".match(/(?<=\$)\d+(\.\d*)?/) // Matches "9.99"
);
console.log(
    '<kdkfjdf>adafd</kdkfjdf>dfjdfj</kdkfjdf>'.replace(/(?<=<).*?(?=>)/g,'')

);
//console.log( ts.translate("hello"));
(async()=>{
    let url = "https://blog.csdn.net/oscar999/article/details/55261446";
    url="https://blog.csdn.net/mengshaoye1/article/details/79540272";
    let response = await axios.get(url);
    //console.log(response.data);
    let $ = jquery(new JSDOM(response.data).window);
    $('link,script,.info-box').remove();
    let showContent = true;
    for(let items=$('#article_content .htmledit_views p').toArray(),i=0;i<items.length;i++){
        let el = $(items[i]);
        let fromText = el.text();
        if(fromText.match(/[\u4e00-\u9fa5]+/)){
            console.log(fromText);
            let toText = await ts.translate(fromText,'en');
            el.text(toText);
            console.log(toText);
        }
    }

    if(showContent){
        let content = $("#article_content .htmledit_views").html();
        let trimContent = content.replace(/(?<=<).*?(?=>)/g,'');
        let matches = trimContent.match(/([a-z]\s)*[\u4e00-\u9fa5][^<>\n。]*[。]/gi);
        for(let i=0;matches && i<matches.length;i++){
            let s = matches[i].trim();
            console.log(s);
            let t = await ts.translate(s,'en');
            content = content.replace(new RegExp(s,"g"),' '+t);
            console.log(t);
        }
        //console.log(content);
        fs.writeFile('index.html', content, function(err) {
            if (err) {
                console.log('出现错误!')
            }
            console.log('已输出至index.html中')
        })
    }

})();


