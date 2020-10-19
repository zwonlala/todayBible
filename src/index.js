const URL = "https://sum.su.or.kr:8888/bible/today";

const request = require("request");
const cheerio = require("cheerio");

const todayBibleObj = {};
/*
{
    date: String; //2020.10.18(일)
    title: String; //간구하는 소리를 들으소서
    todayScripture: String; //시편(Psalm) 28:1 ~ 28:9
    biblicalVerses: String[]; //1. 여호와여 내가 ~
}
*/

const getData = () => {
  request(URL, function (error, response, html) {
    if (error) console.error(error);
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);

      const date = $("div#dailybible_info").text().trim();
      const title = $("div#bible_text").text().trim();
      const todayScripture = $("div#bibleinfo_box").text().trim();
      //const biblicalVerses = $("#body_list").text().trim().replace(/\t/g, "");

      const scriptures = [];
      $("#body_list")
        .find("li")
        .each((index, element) => {
          //console.log($(element).find(".num").text());
          //console.log($(element).find(".info").text());
          const verse = $(element).find(".num").text();
          const content = $(element).find(".info").text();

          const obj = { verse, content };
          scriptures.push(obj);
        });

      console.log(date);
      console.log(title);
      console.log(todayScripture);
      console.log(scriptures);
    }

    todayBibleObj = {
      date,
      title,
      todayScripture,
      scriptures,
    };
  });
};

getData();

//todayScripture 부분에 ")" 후에 개행 넣는 함수 생성

// const dateContainer = document.getElementsByClassName("date");
// const titleContainer = document.getElementsByClassName("title");
// const todayScriptureContainer = document.getElementsByClassName(
//   "todayScripture"
// );
// const versesContainer = document.getElementsByClassName("verses");

// console.log(todayBibleObj);
// dateContainer.text = todayBibleObj.text;
// titleContainer.text = todayBibleObj.title;
// todayScriptureContainer.text = todayBibleObj.todayScripture;
// versesContainer.text = todayBibleObj.scriptures;
