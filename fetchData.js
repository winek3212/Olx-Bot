import axios from "axios";
import cheerio from "cheerio";

export const fetchOlx = async url => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data); 
    const firstOffer = $(
      "#offers_table > tbody > tr:nth-child(3) > td > div > table > tbody > tr:nth-child(1)"
    );
    const offerTitle = firstOffer
      .find("td.title-cell > div > h3 > a > strong")
      .text();
    const offerPrice = firstOffer
      .find("td.wwnormal.tright.td-price > div > p > strong")
      .text();
    const offerImage = firstOffer.find("td.photo-cell > a > img").attr("src");
    const offerUrl = firstOffer
      .find("td.title-cell > div > h3 > a")
      .attr("href");

    return {
      title: offerTitle,
      price: offerPrice,
      image: offerImage,
      url: offerUrl,
    };
  } catch (err) {
    console.log(err);
  }
};
