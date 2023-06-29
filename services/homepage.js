require("dotenv").config();

const forEach = require("lodash/forEach");
const map = require("lodash/map");
const isEqual = require("lodash/isEqual");

const axios = require("axios");
const customErrors = require("../helpers/customErrors");
const {
  ADMIN_ERROR_MSG,
  CARDS_TYPE,
  CARDS_ALIGNMENT,
  SECTION,
  THE_DROP_AM_PM,
  IMAGE,
} = require("../helpers/constants");

const extractImage = (storyObject) => {
  if (IMAGE === storyObject?.promo_items?.basic?.type)
    return {
      url: storyObject?.promo_items?.basic?.url || "",
      resized_params: storyObject?.promo_items?.basic?.resized_params || {},
    };
};

const transformNewsLetterCard = (card) => {
  let transformedCard = {
    cardsType: card.cardsType,
    title: card.title,
    subheadline: card.subheadline,
    alignment: CARDS_ALIGNMENT.VERTICAL,
    id: Date.now().toString(),
    result: [
      {
        headline: card.headline,
        description: card.description,
        subheadline: card.subheadline,
        primary_section: {
          type: SECTION,
          name: THE_DROP_AM_PM,
        },
        img: {
          resizerURL: card.resizerURL,
          resized_params: card.result || {},
          url: card.imageURL,
        },
      },
    ],
  };
  card = transformedCard;
  return card;
};

const transformStoryCard = (card) => {
  card.id = card.result._id;
  card.name = card.result.name;
 
  //Conditional logs for debugging - error
  console.log("FOR DEBUGGING transformStoryCard card ", card);
  //condition for no transform, when transformed code is coming due to cache at ARC
  if(card.result._id == undefined)
  {
    return;
  }

  card.result = card.result.content_elements.map((item) => {
    const { additional_properties, ...primary_section } =
      item.taxonomy?.primary_section || {};
    return {
      headline: item.headlines?.basic,
      img: {
        ...extractImage(item),
        resizerURL: card.resizerURL,
      },
      subheadline: item?.subheadlines?.basic,
      description: item?.description?.basic,
      by: map(item?.credits?.by, (author) => ({
        name: author.name,
        id: author._id,
      })),
      publish_date: item.publish_date,
      display_date: item.display_date,
      _id: item._id,
      website_url: item.website_url,
      primary_section,
      tags: item.taxonomy?.tags || [],
      included_media_type: item.label?.included_media_type?.text || "",
      label: item.label,
    };
  });
  delete card.resizerURL;
};

const transformResponse = (cards) => {
  let transformedCards = [];

  forEach(cards, function (card) {
    if (isEqual(card.cardsType, CARDS_TYPE.EmailSubscriptionDropCard)) {
      card = transformNewsLetterCard(card);
    } else {
      transformStoryCard(card);
    }
    transformedCards.push(card);
  });
  return transformedCards;
};

const callHompepageArcApi = async (id) => {
  try {
    const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
    console.log("FOR DEBUGGING - Homepage recievedfrom Fusion: ", url);
    const response = await axios.get(url, {});
    const transformedResponse = transformResponse(response?.data);
    return transformedResponse;
  } catch (err) {
    console.error(
      "callHompepageArcApi - Error in getting Homepage from Fusion: ",
      err
    );
    throw err;
  }
};

exports.getHomepage = async () => {
  let homepage;
  try {
    homepage = await callHompepageArcApi();
  } catch (error) {
    console.error(
      "getHomepage - Error in getting Homepage from Fusion - Custom Error 503"
    );
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
  return homepage;
};
