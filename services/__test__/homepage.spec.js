const axios = require("axios");

const homepageService = require("../homepage");
const customErrors = require("../../helpers/customErrors");
const { ADMIN_ERROR_MSG } = require("../../helpers/constants");

jest.mock("axios");

const validateError = (err) => {
  expect(err.error).toBeInstanceOf(Error);
  expect(err.error).toHaveProperty("message", ADMIN_ERROR_MSG);
  expect(err).toHaveProperty("httpStatus", 503);
  expect(err).toHaveProperty("code", undefined);
};

describe("The homepage Modules Service", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });

  describe("The get homepage Config  Service Api", () => {
    it("should return correct homepage cards from the Fusion", async () => {
      const homepageRaw = homepageUnTransformed();
      const homepageExpected = homepageTransformed();

      axios.get.mockResolvedValueOnce(homepageRaw);

      const homepageActual = await homepageService.getHomepage();

      delete homepageExpected[1].id;
      delete homepageActual[1].id;

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;

      expect(axios.get).toHaveBeenCalledWith(url, {});
      expect(homepageActual).toEqual(homepageExpected);
    });

    it("should return correct author details", async () => {
      const homepageRaw = homepageValidateAuthor();

      axios.get.mockResolvedValueOnce(homepageRaw);

      const homepageActual = await homepageService.getHomepage();

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;

      expect(axios.get).toHaveBeenCalledWith(url, {});
      expect("John").toEqual(homepageActual[0].result[0].by[0].name);
    });
  });

  describe("The get homepage Service Api - Card: StoryCard, Scenaario: Negative", () => {
    it("should capture correct error when result is not present", async () => {
      const homepageRaw = homepageNoResultField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when result field is null", async () => {
      const homepageRaw = homepageNullResultField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when result field is undefined", async () => {
      const homepageRaw = homepageUndefinedResultField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when result is empty", async () => {
      const homepageRaw = homepageEmptyResultField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(1);

      try {
        await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when content elements is not present", async () => {
      const homepageRaw = homepageNoContentElementField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        const res = await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when any of the item in content element is null", async () => {
      const homepageRaw = homepageNullItemContentElement();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        const res = await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when any of the item in content element is undefined", async () => {
      const homepageRaw = homepageUndefinedItemContentElement();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        const res = await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when any of the author is null", async () => {
      const homepageRaw = homepageNullAuthorField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        const res = await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });

    it("should capture correct error when any of the author is undefined", async () => {
      const homepageRaw = homepageUndefinedAuthorField();

      axios.get.mockResolvedValueOnce(homepageRaw);

      expect.assertions(5);

      try {
        const res = await homepageService.getHomepage();
      } catch (err) {
        validateError(err);
      }

      const url = `${process.env.FUSION_URL}${process.env.HOMEPAGE_MOBILE}?_website=${process.env.WEBSITE}&outputType=${process.env.OUTPUT_TYPE}&transform=${process.env.TRANSFORM}`;
      expect(axios.get).toHaveBeenCalledWith(url, {});
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

homepageValidateAuthor = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [
            {
              type: "story",
              version: "0.10.7",
              content_elements: [
                {
                  _id: "KKJ4XHTYNFA4LAYDMCTEWQBJJE",
                  type: "text",
                  additional_properties: {
                    _id: 1649097164056,
                    comments: [],
                    inline_comments: [],
                  },
                  content: "here it is ",
                },
              ],
              credits: {
                by: [{ name: "John" }],
              },
            },
          ],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageUndefinedAuthorField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [
            {
              type: "story",
              version: "0.10.7",
              content_elements: [
                {
                  _id: "KKJ4XHTYNFA4LAYDMCTEWQBJJE",
                  type: "text",
                  additional_properties: {
                    _id: 1649097164056,
                    comments: [],
                    inline_comments: [],
                  },
                  content: "here it is ",
                },
              ],
              credits: {
                by: [undefined],
              },
            },
          ],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageNullAuthorField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [
            {
              type: "story",
              version: "0.10.7",
              content_elements: [
                {
                  _id: "KKJ4XHTYNFA4LAYDMCTEWQBJJE",
                  type: "text",
                  additional_properties: {
                    _id: 1649097164056,
                    comments: [],
                    inline_comments: [],
                  },
                  content: "here it is ",
                },
              ],
              credits: {
                by: [null],
              },
            },
          ],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageUndefinedItemContentElement = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [undefined],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageNullItemContentElement = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [null],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageNoContentElementField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageNoResultField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageEmptyResultField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        resizerURL: "https://www.grid.news/resizer",
        result: {},
      },
    ],
  };
};

homepageUndefinedResultField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        resizerURL: "https://www.grid.news/resizer",
        result: undefined,
      },
    ],
  };
};

homepageNullResultField = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        resizerURL: "https://www.grid.news/resizer",
        result: null,
      },
    ],
  };
};

homepageUnTransformed = () => {
  return {
    data: [
      {
        title: "Latest",
        cardsType: "StoryCard-1",
        alignment: "vertical",
        sectionId: "",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [
            {
              type: "story",
              version: "0.10.7",
              content_elements: [
                {
                  _id: "KKJ4XHTYNFA4LAYDMCTEWQBJJE",
                  type: "text",
                  additional_properties: {
                    _id: 1649097164056,
                    comments: [],
                    inline_comments: [],
                  },
                  content: "here it is ",
                },
              ],
              created_date: "2022-04-04T18:34:06.542Z",
              revision: {
                revision_id: "JTHQDGZ245D2NHOZYVMPEDYTRA",
                parent_id: "EOOFGSR4XNCGBOVUY5EE4ZZJUE",
                editions: ["default"],
                branch: "default",
                user_id: "aalago@mediainvestmentprojects.com",
                published: true,
              },
              last_updated_date: "2022-04-04T18:34:59.425Z",
              headlines: {
                basic: "Video headline test",
                meta_title: "",
                mobile: "",
                native: "",
                print: "",
                tablet: "",
                web: "",
              },
              owner: {
                sponsored: false,
                id: "sandbox.thesummit",
              },
              content_restrictions: {
                content_code: "free",
              },
              address: {},
              workflow: {
                status_code: 1,
              },
              subheadlines: {
                basic: "my video",
              },
              description: {
                basic: "test",
              },
              language: "",
              label: {},
              source: {
                name: "thesummit",
                source_type: "staff",
                system: "composer",
              },
              taxonomy: {
                primary_section: {
                  _id: "/politics",
                  _website: "the-summit",
                  type: "section",
                  version: "0.6.0",
                  name: "Politics",
                  description: null,
                  path: "/politics",
                  parent_id: "/",
                  parent: {
                    default: "/",
                  },
                  additional_properties: {
                    original: {
                      _id: "/politics",
                      site_topper: {
                        site_logo_image: null,
                      },
                      site: {
                        site_title: "Politics",
                        site_tagline: null,
                        site_about: null,
                        site_description: null,
                        site_keywords: null,
                        pagebuilder_path_for_native_apps: null,
                        site_url: null,
                        color: "00EEEF",
                        icon: null,
                        short_description: null,
                      },
                      social: {
                        twitter: null,
                        rss: null,
                        facebook: null,
                        instagram: null,
                      },
                      navigation: {
                        nav_title: "Politics",
                      },
                      _admin: {
                        alias_ids: ["/politics"],
                      },
                      _website: "the-summit",
                      name: "Politics",
                      order: {
                        default: 1004,
                        "header-home": 1004,
                      },
                      parent: {
                        default: "/",
                        "header-home": "/",
                      },
                      ancestors: {
                        default: [],
                        "header-home": [],
                      },
                      inactive: false,
                      node_type: "section",
                    },
                  },
                },
                primary_site: {
                  _id: "/politics",
                  type: "site",
                  version: "0.5.8",
                  name: "Politics",
                  description: null,
                  path: "/politics",
                  parent_id: "/",
                  additional_properties: {
                    original: {
                      _id: "/politics",
                      site_topper: {
                        site_logo_image: null,
                      },
                      site: {
                        site_title: "Politics",
                        site_tagline: null,
                        site_about: null,
                        site_description: null,
                        site_keywords: null,
                        pagebuilder_path_for_native_apps: null,
                        site_url: null,
                        color: "00EEEF",
                        icon: null,
                        short_description: null,
                      },
                      social: {
                        twitter: null,
                        rss: null,
                        facebook: null,
                        instagram: null,
                      },
                      navigation: {
                        nav_title: "Politics",
                      },
                      _admin: {
                        alias_ids: ["/politics"],
                      },
                      name: "Politics",
                      order: {
                        default: 1004,
                        "header-home": 1004,
                      },
                      parent: {
                        default: "/",
                        "header-home": "/",
                      },
                      ancestors: {
                        default: [],
                        "header-home": [],
                      },
                      inactive: false,
                    },
                  },
                },
                sections: [
                  {
                    _id: "/politics",
                    _website: "the-summit",
                    type: "section",
                    version: "0.6.0",
                    name: "Politics",
                    description: null,
                    path: "/politics",
                    parent_id: "/",
                    parent: {
                      default: "/",
                    },
                    additional_properties: {
                      original: {
                        _id: "/politics",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Politics",
                          site_tagline: null,
                          site_about: null,
                          site_description: null,
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: null,
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Politics",
                        },
                        _admin: {
                          alias_ids: ["/politics"],
                        },
                        _website: "the-summit",
                        name: "Politics",
                        order: {
                          default: 1004,
                          "header-home": 1004,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: [],
                          "header-home": [],
                        },
                        inactive: false,
                        node_type: "section",
                      },
                    },
                    _website_section_id: "the-summit./politics",
                  },
                ],
                sites: [
                  {
                    _id: "/politics",
                    type: "site",
                    version: "0.5.8",
                    name: "Politics",
                    description: null,
                    path: "/politics",
                    parent_id: "/",
                    additional_properties: {
                      original: {
                        _id: "/politics",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Politics",
                          site_tagline: null,
                          site_about: null,
                          site_description: null,
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: null,
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Politics",
                        },
                        _admin: {
                          alias_ids: ["/politics"],
                        },
                        name: "Politics",
                        order: {
                          default: 1004,
                          "header-home": 1004,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: [],
                          "header-home": [],
                        },
                        inactive: false,
                      },
                    },
                  },
                ],
              },
              promo_items: {
                lead_art: {
                  type: "video",
                  _id: "a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc",
                  version: "0.8.0",
                  subtype: "sample",
                  language: "en",
                  canonical_url:
                    "/360-Debrief/watch-details/a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc/2021/11/10/test-vid-title/",
                  canonical_website: "the-summit",
                  short_url:
                    "/360-Debrief/watch-details/a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc/2021/11/10/test-vid-title/",
                  created_date: "2021-11-10T16:31:25Z",
                  last_updated_date: "2021-12-21T15:58:13Z",
                  publish_date: "2021-12-21T15:58:17Z",
                  first_publish_date: "2021-11-10T16:36:09Z",
                  display_date: "2021-11-10T16:36:09Z",
                  headlines: {
                    basic: "Test Vid Title",
                  },
                  credits: {},
                  taxonomy: {
                    tags: [
                      {
                        text: "sample",
                      },
                    ],
                    primary_site: {
                      type: "site",
                      _id: "/360-Debrief",
                      version: "0.5.8",
                      name: "360",
                      path: "/360-Debrief",
                      primary: true,
                    },
                    sites: [
                      {
                        type: "site",
                        _id: "/360-Debrief",
                        version: "0.5.8",
                        name: "360",
                        path: "/360-Debrief",
                        primary: true,
                      },
                    ],
                    primary_section: {
                      type: "section",
                      _id: "/360-Debrief",
                      _website: "the-summit",
                      version: "0.6.0",
                      name: "360",
                      path: "/360-Debrief",
                      primary: true,
                    },
                    sections: [
                      {
                        type: "section",
                        _id: "/360-Debrief",
                        _website: "the-summit",
                        version: "0.6.0",
                        name: "360",
                        path: "/360-Debrief",
                        primary: true,
                      },
                    ],
                    seo_keywords: ["sample"],
                  },
                  promo_items: {
                    basic: {
                      type: "image",
                      version: "0.5.8",
                      credits: {},
                      caption: "test headline",
                      url: "https://d43se1o0r28x0.cloudfront.net/11-10-2021/t_e8443cabf252434694eefec49abf180b_name_file_960x540_1600_v4_.jpg",
                      width: 960,
                      height: 540,
                      resized_params: {
                        "84x56":
                          "7FM0Wkefi5xpU3uoc24iYf-92bs=filters:format(jpg):quality(100)/",
                        "105x70":
                          "IZbVxb3wqKnxzXhn9lT7t5wgtRQ=filters:format(jpg):quality(100)/",
                        "158x105":
                          "2VmhQB-yWonueZQtRyV1p1nmJsI=filters:format(jpg):quality(100)/",
                        "274x183":
                          "zkZow8PaLfMvdxdBtpUcSuQWb_g=filters:format(jpg):quality(100)/",
                        "377x251":
                          "Bu2VycoNIb_Adk70z1kXx5A0M_A=filters:format(jpg):quality(100)/",
                        "400x267":
                          "c6nRRDgJAShL6Ws1amQTLPCUBTY=filters:format(jpg):quality(100)/",
                        "600x400":
                          "qM7Bmjov9pCIon_TBc38HBwI5h0=filters:format(jpg):quality(100)/",
                        "768x512":
                          "oNZ909J19UYTPnmg3yMIhBFxzYU=filters:format(jpg):quality(100)/",
                        "800x533":
                          "J4RDF_YdH5X-kH9QiV0xmcYBajA=filters:format(jpg):quality(100)/",
                        "1024x683":
                          "mYzQVjty2WO6YfT39wI2zfa-Gow=filters:format(jpg):quality(100)/",
                        "1440x960":
                          "U8mpVvdo5iuswbUko0DNgAi3El4=filters:format(jpg):quality(100)/",
                        "1600x1067":
                          "HmP2wfWCEMYdRxMWItTrP63najE=filters:format(jpg):quality(100)/",
                        "84x63":
                          "TW04ykVuLvgZKW-o6ZoCmIEbqds=filters:format(jpg):quality(100)/",
                        "105x79":
                          "RoW4QjQFldOhT8390Vmgl5nO7vw=filters:format(jpg):quality(100)/",
                        "158x119":
                          "iqt4D8wOccvk6aX243sXmfrWH5o=filters:format(jpg):quality(100)/",
                        "274x206":
                          "zzhgxmJa6_AuUJr6IGdf1txFpsg=filters:format(jpg):quality(100)/",
                        "377x283":
                          "OGMqT71o0mgdbilpxxLJtFzpClM=filters:format(jpg):quality(100)/",
                        "400x300":
                          "lioEYqSUtCahk0Po-idGZq2oU2c=filters:format(jpg):quality(100)/",
                        "600x450":
                          "YYjtgg8JEyCoobrw0YK_7lhjDn8=filters:format(jpg):quality(100)/",
                        "768x576":
                          "FiKKYvykCZG7Bm7_5XM8iJx-S-Y=filters:format(jpg):quality(100)/",
                        "800x600":
                          "KP5TU20QlJZ9dXF_qCrE5GgCYO0=filters:format(jpg):quality(100)/",
                        "1024x768":
                          "JCnP_jWyHnb78hRJhF7ejvLkkkc=filters:format(jpg):quality(100)/",
                        "1440x1080":
                          "NpyYUriW_rau32n5LpeKEN7Y_sg=filters:format(jpg):quality(100)/",
                        "1600x1200":
                          "-dWA3RcO7zzus5oNHmlsL7j0vog=filters:format(jpg):quality(100)/",
                        "84x47":
                          "7J0KoNk428wKxQhzszbgt1SzRco=filters:format(jpg):quality(100)/",
                        "105x59":
                          "sjJXQsdgw_8qgr7QYLx8KU8A0e0=filters:format(jpg):quality(100)/",
                        "158x89":
                          "YDDjefpuMICxZJT7hMp7kiLsTh4=filters:format(jpg):quality(100)/",
                        "274x154":
                          "B6By9tOFhNkMv52YXlANLfBJLfM=filters:format(jpg):quality(100)/",
                        "377x212":
                          "UJsdR8u0IexaRfiOZcQInpEBk3Y=filters:format(jpg):quality(100)/",
                        "400x225":
                          "PlJotb4mx7rVHM13pKAooXmFBi0=filters:format(jpg):quality(100)/",
                        "600x338":
                          "T8vlajblY99hJviADM1hGpODkI4=filters:format(jpg):quality(100)/",
                        "768x432":
                          "ASyptnIPysLROApL8jKrUbd21lg=filters:format(jpg):quality(100)/",
                        "800x450":
                          "MxOy7V_mLx4PMnit8iVx287H_qI=filters:format(jpg):quality(100)/",
                        "1024x576":
                          "mXkAgb1RB-80t8QyX3VLbS9mJdU=filters:format(jpg):quality(100)/",
                        "1440x810":
                          "JGR3hrkX9k5hrLqkKNoYFOMQToA=filters:format(jpg):quality(100)/",
                        "1600x900":
                          "0ucFewJsVqjAzA3PlyQLnEOXg0A=filters:format(jpg):quality(100)/",
                        "84x84":
                          "3WvY7rUgAaXmhAs40t_x1tdOoak=filters:format(jpg):quality(100)/",
                        "105x105":
                          "4K1Bke8X-pzOQXzFCKrmrwQR0do=filters:format(jpg):quality(100)/",
                        "158x158":
                          "vD6nUJNmjLNnDVxA16f7BRi_thI=filters:format(jpg):quality(100)/",
                        "274x274":
                          "blUdUBMijangF3OJKgPSPK9qxhE=filters:format(jpg):quality(100)/",
                        "377x377":
                          "VWRsqOGNsLRWfcF_591gyBIh60c=filters:format(jpg):quality(100)/",
                        "400x400":
                          "F1HOAgOdmq5aHFtTpm_IhAqBnLU=filters:format(jpg):quality(100)/",
                        "600x600":
                          "ufsSzMYFnGDp6TWGHTjnYSRZ31s=filters:format(jpg):quality(100)/",
                        "768x768":
                          "9I7_qScXGM2kjk1dILLYeY0fsps=filters:format(jpg):quality(100)/",
                        "800x800":
                          "VwQXV5yg57ClkRRMrb4UiEscRFI=filters:format(jpg):quality(100)/",
                        "1024x1024":
                          "LWdGPmkW_0nXEKAJaW-FpGlnu5c=filters:format(jpg):quality(100)/",
                        "1440x1440":
                          "i3trXTTAq2jEL__nVB25NyN4otk=filters:format(jpg):quality(100)/",
                        "1600x1600":
                          "eQy_j6BDfHjewuHyM6A3ZqGwJGs=filters:format(jpg):quality(100)/",
                        "84x32":
                          "VyPtdzxhFS0Y4Q6cagofBODWgxk=filters:format(jpg):quality(100)/",
                        "105x39":
                          "Cj1H9VK-fuRbxykW4K8An2yehT4=filters:format(jpg):quality(100)/",
                        "158x59":
                          "PXTMZuyvhsoy8OF_aBCl6Y36Q9Y=filters:format(jpg):quality(100)/",
                        "274x103":
                          "ACWnNxy9_SbQ0OkoED_p6o7suPQ=filters:format(jpg):quality(100)/",
                        "377x141":
                          "X7NbL0NQwRdSBWGj1ivfbUoagB8=filters:format(jpg):quality(100)/",
                        "400x150":
                          "nkX9JQSpNgNRuX09TR4uqdBwBAQ=filters:format(jpg):quality(100)/",
                        "600x225":
                          "zvjAfrAgkRHT9PP7x9GBen1ViiY=filters:format(jpg):quality(100)/",
                        "768x288":
                          "-vR2gARagfLAN-y4AeSeNRhMifE=filters:format(jpg):quality(100)/",
                        "800x300":
                          "zyDp8ybEA5Nkeif4Qqxkl2JEVrA=filters:format(jpg):quality(100)/",
                        "1024x384":
                          "XndWyOYAas9pMrL4GOyF8rYNrlE=filters:format(jpg):quality(100)/",
                        "1440x540":
                          "BikugNBNPGXvWNuhnC8fcLJkFt8=filters:format(jpg):quality(100)/",
                        "1600x600":
                          "9eAwCer2g1i5mP8BkMs7yMcmtYE=filters:format(jpg):quality(100)/",
                        "84x0":
                          "DdEQMNot9OBbvLMvZMCTBe8WXzo=filters:format(jpg):quality(100)/",
                        "105x0":
                          "iWRQMIuHtyZVRej2IltHQ8roIxE=filters:format(jpg):quality(100)/",
                        "158x0":
                          "RI4IhKr6jywBknoCBZMH9gmTLUk=filters:format(jpg):quality(100)/",
                        "274x0":
                          "AIWH7ygEV4Pyf-QBKb9834tztjk=filters:format(jpg):quality(100)/",
                        "377x0":
                          "di_dUqUJWt1oYUw1oA5L8a0TvKs=filters:format(jpg):quality(100)/",
                        "400x0":
                          "RpHFDuskicErFkOQB9WEtM0ufXQ=filters:format(jpg):quality(100)/",
                        "600x0":
                          "24yCs6scLTqCPclSvfLbVAr0spM=filters:format(jpg):quality(100)/",
                        "768x0":
                          "01VZALKLnEZadiY6Ratu6_ymtks=filters:format(jpg):quality(100)/",
                        "800x0":
                          "QcQd2KhLruUrQkAh5MX3bS7kILA=filters:format(jpg):quality(100)/",
                        "1024x0":
                          "xp5NtoZJoElwlXef-9SZsj2sAZg=filters:format(jpg):quality(100)/",
                        "1440x0":
                          "3RzJgz0usw7Nkw_zp9niupTqYBw=filters:format(jpg):quality(100)/",
                        "1600x0":
                          "-9jASSjEcfKlgX2LhV8y1JoONTU=filters:format(jpg):quality(100)/",
                      },
                    },
                  },
                  related_content: {
                    redirect: [],
                    basic: [],
                  },
                  owner: {
                    name: "",
                    sponsored: false,
                  },
                  planning: {
                    scheduling: {},
                  },
                  revision: {
                    published: true,
                  },
                  syndication: {
                    search: true,
                  },
                  source: {
                    name: "",
                    system: "video center",
                    edit_url: "",
                  },
                  distributor: {
                    category: "staff",
                  },
                  tracking: {
                    in_url_headline: "10",
                  },
                  additional_properties: {
                    subsection: "360",
                    videoCategory: "sample",
                    workflowStatus: "PUBLISHED",
                    videoId: "618bf3dd4cedfd0001d7f939",
                    vertical: false,
                    embedContinuousPlay: true,
                    imageResizerUrls: [],
                    advertising: {
                      allowPrerollOnDomain: false,
                      autoPlayPreroll: false,
                      commercialAdNode: "/360-Debrief",
                      enableAdInsertion: false,
                      enableAutoPreview: true,
                      enableServerSideFallback: false,
                      forceAd: false,
                      playAds: true,
                      playVideoAds: true,
                      videoAdZone: "",
                    },
                    disableUpNext: false,
                    videoAdZone: "",
                    platform: "desktop",
                    playVideoAds: true,
                    playlist: "",
                    useVariants: false,
                    has_published_copy: true,
                    playlistTags: [],
                    TJPSGYXYXRAY5NJYB2YP53JV6I:
                      "11-10-2021/t_e8443cabf252434694eefec49abf180b_name_file_960x540_1600_v4_.jpg",
                    firstPublishedBy: {
                      name: "Jackie Padilla",
                      email: "jpadilla@mediainvestmentprojects.com",
                      lastname: "",
                    },
                    anglerfishArcId: "TJPSGYXYXRAY5NJYB2YP53JV6I",
                    isWire: false,
                    gifAsThumbnail: false,
                    published: true,
                    lastPublishedBy: {
                      name: "Addy Alago",
                      email: "aalago@mediainvestmentprojects.com",
                      lastname: "",
                    },
                    permalinkUrl:
                      "/360-Debrief/watch-details/a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc/2021/11/10/test-vid-title/",
                    forceClosedCaptionsOn: false,
                    doNotShowTranscripts: false,
                  },
                  duration: 288448,
                  video_type: "clip",
                  streams: [
                    {
                      height: 360,
                      width: 640,
                      filesize: 28952940,
                      stream_type: "ts",
                      url: "https://d2cgyidpqrg3l6.cloudfront.net/wp-thesummit/20211110/618bf3dd4cedfd0001d7f939/t_a050c28a5f78436ea1b7d6a5db9122bd_name_CovidPregnancy_MS_4/mobile.m3u8",
                      bitrate: 580,
                      provider: "mediaconvert",
                    },
                    {
                      height: 480,
                      width: 854,
                      filesize: 41157712,
                      stream_type: "ts",
                      url: "https://d2cgyidpqrg3l6.cloudfront.net/wp-thesummit/20211110/618bf3dd4cedfd0001d7f939/t_a050c28a5f78436ea1b7d6a5db9122bd_name_CovidPregnancy_MS_4/mobile.m3u8",
                      bitrate: 910,
                      provider: "mediaconvert",
                    },
                    {
                      height: 540,
                      width: 960,
                      filesize: 66603700,
                      stream_type: "ts",
                      url: "https://d2cgyidpqrg3l6.cloudfront.net/wp-thesummit/20211110/618bf3dd4cedfd0001d7f939/t_a050c28a5f78436ea1b7d6a5db9122bd_name_CovidPregnancy_MS_4/sd.m3u8",
                      bitrate: 1600,
                      provider: "mediaconvert",
                    },
                    {
                      height: 720,
                      width: 1280,
                      filesize: 118567464,
                      stream_type: "ts",
                      url: "https://d2cgyidpqrg3l6.cloudfront.net/wp-thesummit/20211110/618bf3dd4cedfd0001d7f939/t_a050c28a5f78436ea1b7d6a5db9122bd_name_CovidPregnancy_MS_4/hd.m3u8",
                      bitrate: 3000,
                      provider: "mediaconvert",
                    },
                    {
                      height: 540,
                      width: 960,
                      filesize: 62666383,
                      stream_type: "mp4",
                      url: "https://d2cgyidpqrg3l6.cloudfront.net/wp-thesummit/20211110/618bf3dd4cedfd0001d7f939/t_a050c28a5f78436ea1b7d6a5db9122bd_name_CovidPregnancy_MS_4/file_960x540-1600-v4.mp4",
                      bitrate: 1600,
                      provider: "mediaconvert",
                    },
                  ],
                  subtitles: {},
                  promo_image: {
                    type: "image",
                    version: "0.5.8",
                    credits: {},
                    caption: "test headline",
                    url: "https://d43se1o0r28x0.cloudfront.net/11-10-2021/t_e8443cabf252434694eefec49abf180b_name_file_960x540_1600_v4_.jpg",
                    width: 960,
                    height: 540,
                  },
                  embed_html:
                    '<div class="powa" id="powa-a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc" data-org="thesummit" data-env="sandbox" data-uuid="a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc" data-aspect-ratio="0.562" data-api="sandbox"><script src="//thesummit.video-player.arcpublishing.com/sandbox/powaBoot.js?org=thesummit"></script></div>',
                  websites: {
                    "the-summit": {
                      website_section: {
                        path: "/360-Debrief",
                        _website: "the-summit",
                        name: "360",
                        _id: "/360-Debrief",
                        type: "section",
                        version: "0.6.0",
                        primary: true,
                      },
                      website_url:
                        "/360-Debrief/watch-details/a62d115a-9ac6-4afd-9c0e-f7fe4d9accfc/2021/11/10/test-vid-title/",
                    },
                  },
                  description: {
                    basic: "test",
                  },
                  subheadlines: {
                    basic: "test",
                  },
                },
              },
              related_content: {
                basic: [],
                redirect: [],
              },
              distributor: {
                category: "staff",
                name: "thesummit",
                subcategory: "",
              },
              canonical_website: "the-summit",
              geo: {},
              planning: {
                internal_note: "",
                story_length: {
                  character_count_actual: 10,
                  character_encoding: "UTF-16",
                  inch_count_actual: 1,
                  line_count_actual: 1,
                  word_count_actual: 3,
                },
              },
              display_date: "2022-04-04T18:34:41.048Z",
              credits: {
                by: [
                  {
                    _id: "maggie.severns",
                    type: "author",
                    version: "0.5.8",
                    name: "Maggie Severns",
                    image: {
                      url: "https://s3.amazonaws.com/arc-authors/thesummit/dbe2b545-75c1-435d-b8ea-73e3e744646c.jpg",
                      version: "0.5.8",
                    },
                    description:
                      "Maggie Severns is a policy reporter for Grid covering complex policy stories and major headlines.",
                    url: "",
                    slug: "maggie-severns",
                    social_links: [
                      {
                        site: "email",
                        url: "mseverns@mipo.news",
                      },
                    ],
                    socialLinks: [
                      {
                        site: "email",
                        url: "mseverns@mipo.news",
                        deprecated: true,
                        deprecation_msg: "Please use social_links.",
                      },
                    ],
                    additional_properties: {
                      original: {
                        _id: "maggie.severns",
                        firstName: "Maggie",
                        lastName: "Severns",
                        byline: "Maggie Severns",
                        image:
                          "https://s3.amazonaws.com/arc-authors/thesummit/dbe2b545-75c1-435d-b8ea-73e3e744646c.jpg",
                        email: "mseverns@mipo.news",
                        affiliations: "",
                        education: [],
                        awards: [],
                        books: [],
                        podcasts: [],
                        bio_page: "",
                        bio: "Maggie Severns is a policy reporter for Grid covering complex policy stories and major headlines.",
                        longBio:
                          "Maggie Severns is a policy reporter for Grid covering complex policy stories and major headlines. Maggie is a former national affairs reporter for Politico where she covered money in politics and the 2016 election, and started as an education reporter on Capitol Hill reporting on the repeal of No Child Left Behind. She has appeared on MSNBC, CNBC, CBS News and other outlets to discuss her reporting. She is a graduate of Dartmouth College.",
                        slug: "maggie-severns",
                        native_app_rendering: false,
                        fuzzy_match: false,
                        contributor: false,
                        status: true,
                        last_updated_date: "2021-12-28T21:48:03.814Z",
                        role: "Domestic Policy Reporter",
                      },
                    },
                    resized_params: {
                      "84x56":
                        "wE_qOcm-OGNqikxQIKJJtW778yg=filters:format(jpg):quality(100)/",
                      "105x70":
                        "85tn2XPhstzxAesbPpT5mElgLsY=filters:format(jpg):quality(100)/",
                      "158x105":
                        "8lGSAK9m7laYO40JMZzWVLe5Vos=filters:format(jpg):quality(100)/",
                      "274x183":
                        "WaPpM9N64OPlzPyy0QKds_1VPi0=filters:format(jpg):quality(100)/",
                      "377x251":
                        "uyWDt1hsUvbDPSi9p80ki2Xm3E4=filters:format(jpg):quality(100)/",
                      "400x267":
                        "15WkzOzEROUoDvnGtogTQ-bRu-4=filters:format(jpg):quality(100)/",
                      "600x400":
                        "bHIstTLwFB_wBWhsj9DXFnjwyDU=filters:format(jpg):quality(100)/",
                      "768x512":
                        "afvdvG9SNW2tOfMuZODb7iisdzs=filters:format(jpg):quality(100)/",
                      "800x533":
                        "qNpqSqx5LNP2ceBaZ2myHK6Wi-c=filters:format(jpg):quality(100)/",
                      "1024x683":
                        "SDHdw5mVjEJKFSjxhNZ9yw_cj2g=filters:format(jpg):quality(100)/",
                      "1440x960":
                        "auOZz0Gb1-OD7uiDwQDeHZmep0w=filters:format(jpg):quality(100)/",
                      "1600x1067":
                        "XbYwlxTmZLeApKa6qH2GyLq-OY4=filters:format(jpg):quality(100)/",
                      "84x63":
                        "2KMSP_gI9M0XOQtzJFRQH6znzT0=filters:format(jpg):quality(100)/",
                      "105x79":
                        "oDUOlBOhGYXGPrn4VLyrVBrsq-k=filters:format(jpg):quality(100)/",
                      "158x119":
                        "RD0VFujxrXklOiW0nl1zmJB6AMM=filters:format(jpg):quality(100)/",
                      "274x206":
                        "GwOxbcfgzIBz-OZFWBoNRGrjojc=filters:format(jpg):quality(100)/",
                      "377x283":
                        "pxmX5VAtbCKrKZDJ4_rrHcbC02A=filters:format(jpg):quality(100)/",
                      "400x300":
                        "oPZ_P9hgVZWTVLKbLnBjlJDIB9U=filters:format(jpg):quality(100)/",
                      "600x450":
                        "PczW88cJjcpo-W0n1I2rrXB4QeA=filters:format(jpg):quality(100)/",
                      "768x576":
                        "pG_XYH60_hT1ZTyMA4XlH4cgMGI=filters:format(jpg):quality(100)/",
                      "800x600":
                        "GhI636tsomTyZR0VhRgdal15IO8=filters:format(jpg):quality(100)/",
                      "1024x768":
                        "KxpeNpJXYb-Jz8CsSP0Q70seqeo=filters:format(jpg):quality(100)/",
                      "1440x1080":
                        "MaCu1EYT4CrurfRhF9ltJvLQXXc=filters:format(jpg):quality(100)/",
                      "1600x1200":
                        "dcTL6BwaGcFWZZZPfMc1b2lLaMs=filters:format(jpg):quality(100)/",
                      "84x47":
                        "ER9GkL3yUiaGgKqviTcAptgzGBA=filters:format(jpg):quality(100)/",
                      "105x59":
                        "JQXH7OvlNO4n9PLY2-V5eh_ikL4=filters:format(jpg):quality(100)/",
                      "158x89":
                        "onRChlwtM5A8Z9mOXM5kPGlzksU=filters:format(jpg):quality(100)/",
                      "274x154":
                        "J02qeKk0qXtO9ytVMYHZcq9ixnc=filters:format(jpg):quality(100)/",
                      "377x212":
                        "XEc74xFDzpBZpqPsbC_J9R8BFCM=filters:format(jpg):quality(100)/",
                      "400x225":
                        "RUqlzMxoAH7uGaPf6jGQCl5LJIg=filters:format(jpg):quality(100)/",
                      "600x338":
                        "0sY4dSh7ua7m4uIaLM09a7IHkQU=filters:format(jpg):quality(100)/",
                      "768x432":
                        "bXCzF4oatDdZXyKXqKNcUCZmdSM=filters:format(jpg):quality(100)/",
                      "800x450":
                        "jNk7odkByHlpU7ekzlsiYhWhYYQ=filters:format(jpg):quality(100)/",
                      "1024x576":
                        "HqWK2HnAmgGzfsID6GFFvRpfcSU=filters:format(jpg):quality(100)/",
                      "1440x810":
                        "HF8-2nVYLgJt-WD20blD-fAhsUM=filters:format(jpg):quality(100)/",
                      "1600x900":
                        "jehtT1zcdUhyOg7D6GutgtVCMm8=filters:format(jpg):quality(100)/",
                      "84x84":
                        "GS8MCm-sthPztT2hyG4kmE9gq7Q=filters:format(jpg):quality(100)/",
                      "105x105":
                        "yOO9xOvgHEh1dRodhrXFNr2J69k=filters:format(jpg):quality(100)/",
                      "158x158":
                        "-y3Zi33I9O9CUJuhbO3L_GDaAdw=filters:format(jpg):quality(100)/",
                      "274x274":
                        "se2LcTooqw8wBrbc7R3U3KZUt6s=filters:format(jpg):quality(100)/",
                      "377x377":
                        "SVCzCDAKzYe7lW7ukMl1lAw77LU=filters:format(jpg):quality(100)/",
                      "400x400":
                        "kIUYVB87dy5rYD6qjBv-UWkTa0A=filters:format(jpg):quality(100)/",
                      "600x600":
                        "2TMcNbViaBCv2GE97hF1LyQGsT0=filters:format(jpg):quality(100)/",
                      "768x768":
                        "blYnTk9AYmkjo3vm4Lmv9koESJE=filters:format(jpg):quality(100)/",
                      "800x800":
                        "JPU3QJ2P-9axG2HhuagnHKm9Q4c=filters:format(jpg):quality(100)/",
                      "1024x1024":
                        "eWwXkX6_AEUUpHVBXbQYXq16ScE=filters:format(jpg):quality(100)/",
                      "1440x1440":
                        "epeJifFvuubPrqORmvkRKe7iElw=filters:format(jpg):quality(100)/",
                      "1600x1600":
                        "Vgx9_HFahmYAt03S12n-1ZHDtKY=filters:format(jpg):quality(100)/",
                      "84x32":
                        "Snpn7P93kWnSYJsAMAf-6ILHV9E=filters:format(jpg):quality(100)/",
                      "105x39":
                        "dhG-s9ccKoq5MHwNEfySWtHItsc=filters:format(jpg):quality(100)/",
                      "158x59":
                        "gYMb5-9_cOS_22oWkz156CwCjuo=filters:format(jpg):quality(100)/",
                      "274x103":
                        "lw41GcYWznJiiQxrq10O8T69OH8=filters:format(jpg):quality(100)/",
                      "377x141":
                        "7M2jd22JsIURPpwcAOiuvMczsAs=filters:format(jpg):quality(100)/",
                      "400x150":
                        "g1GxX9SgiPpqsgvTqJfUxG9L-QQ=filters:format(jpg):quality(100)/",
                      "600x225":
                        "OPDECGxUZIx1bjs0iBCg0afxi4c=filters:format(jpg):quality(100)/",
                      "768x288":
                        "7FptiXR7sQVtuQwWAG8_chdVAXw=filters:format(jpg):quality(100)/",
                      "800x300":
                        "CgwikVM4i8AewMMsu6aqX0EUruc=filters:format(jpg):quality(100)/",
                      "1024x384":
                        "n8lcgbZ-v3V8NoVb6hlpwatLIs8=filters:format(jpg):quality(100)/",
                      "1440x540":
                        "Ly-13DboWzAOCaz1Dl2hF6wlVOY=filters:format(jpg):quality(100)/",
                      "1600x600":
                        "Slt3W6C7m_Ib-1t1CJ-NTLLBHMw=filters:format(jpg):quality(100)/",
                      "84x0":
                        "GK_HobP1xwVClICCnUdqcarExvM=filters:format(jpg):quality(100)/",
                      "105x0":
                        "uTAX1E5jNnqxq5SCzqL_rj8jcq4=filters:format(jpg):quality(100)/",
                      "158x0":
                        "IA1kw2ueisfJ54z_yoaDzjumUP4=filters:format(jpg):quality(100)/",
                      "274x0":
                        "PgjC5NrGLmc8HgCpc9fV0FdS_uE=filters:format(jpg):quality(100)/",
                      "377x0":
                        "BoHX79CWatyF4YQMHL9UIRrtYao=filters:format(jpg):quality(100)/",
                      "400x0":
                        "EqUrdJQ9RODiTMdlAXBS-GJFHcw=filters:format(jpg):quality(100)/",
                      "600x0":
                        "3_bN9kUgjjbhSUKqG9JvIh-fXGM=filters:format(jpg):quality(100)/",
                      "768x0":
                        "S40HvlK4-Y39FMwUusW8GMChqbg=filters:format(jpg):quality(100)/",
                      "800x0":
                        "ZfepSovq9DT3fVTfUOcWKjtr8DM=filters:format(jpg):quality(100)/",
                      "1024x0":
                        "FpERbsoFdoa75TcXgbHRZJviBNg=filters:format(jpg):quality(100)/",
                      "1440x0":
                        "nf6sKpyBGM1io11PnXdroqnJaMw=filters:format(jpg):quality(100)/",
                      "1600x0":
                        "yPZomjUWVqZEdmGw9Zw2zEkzEyQ=filters:format(jpg):quality(100)/",
                    },
                  },
                ],
              },
              subtype: "standard",
              first_publish_date: "2022-04-04T18:34:41.048Z",
              websites: {
                "the-summit": {
                  website_section: {
                    _id: "/politics",
                    _website: "the-summit",
                    type: "section",
                    version: "0.6.0",
                    name: "Politics",
                    description: null,
                    path: "/politics",
                    parent_id: "/",
                    parent: {
                      default: "/",
                    },
                    additional_properties: {
                      original: {
                        _id: "/politics",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Politics",
                          site_tagline: null,
                          site_about: null,
                          site_description: null,
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: null,
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Politics",
                        },
                        _admin: {
                          alias_ids: ["/politics"],
                        },
                        _website: "the-summit",
                        name: "Politics",
                        order: {
                          default: 1004,
                          "header-home": 1004,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: [],
                          "header-home": [],
                        },
                        inactive: false,
                        node_type: "section",
                      },
                    },
                    _website_section_id: "the-summit./politics",
                  },
                  website_url:
                    "/story/politics/2022/04/04/video-headline-test/",
                },
              },
              additional_properties: {
                clipboard: {},
                has_published_copy: true,
                is_published: true,
                publish_date: "2022-04-04T18:34:41.048Z",
              },
              publish_date: "2022-04-04T18:34:59.158Z",
              canonical_url: "/story/politics/2022/04/04/video-headline-test/",
              publishing: {
                scheduled_operations: {
                  publish_edition: [],
                  unpublish_edition: [],
                },
              },
              _id: "AZL2ZG5LTVA5BOO6AJAPJYTNSU",
              website: "the-summit",
              website_url: "/story/politics/2022/04/04/video-headline-test/",
            },
          ],
          additional_properties: {
            took: 4,
            timed_out: false,
          },
          count: 121,
          next: 10,
          _id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
      {
        cardsType: "EmailSubscriptionDropCard",
        headline: "Grid Today",
        description:
          "Get the context you need on the most important stories of the day.",
        resizerURL: "https://www.grid.news/resizer",
        result: {
          "84x56":
            "VbeXWRLLbUIFdIr7yoJ6kwLYGGE=filters:format(png):quality(70)/",
          "105x70":
            "9h88TeGrIo4j8gJVCzSCgG_vNyY=filters:format(png):quality(70)/",
          "158x105":
            "zEoIxoH7UYt2Vc3X9l0v_N8iPsU=filters:format(png):quality(70)/",
          "274x183":
            "lxkc7W0LyM4sXbljto8I-4ZpYYs=filters:format(png):quality(70)/",
          "377x251":
            "k20RT8i7Kh3RNCR-wysOXZVbVOc=filters:format(png):quality(70)/",
          "400x267":
            "ESur--FOlFmBVLibsOHGHQDUQQM=filters:format(png):quality(70)/",
          "600x400":
            "Lpql8lb1JeWiBtMdZCDGi-U1Kpk=filters:format(png):quality(70)/",
          "768x512":
            "8kOq5HLcjdGPwG5ClgBlY_U8wMM=filters:format(png):quality(70)/",
          "800x533":
            "OUU_7yuRNH6Py8EQl5rCtpMMAFI=filters:format(png):quality(70)/",
          "1024x683":
            "jAJ_d8hKeJSu54SJUKzmXuyaZrY=filters:format(png):quality(70)/",
          "1440x960":
            "n83Apb4-5rdBy7aXwf1rA5fWQxU=filters:format(png):quality(70)/",
          "1600x1067":
            "A4TSyhBQDrfQh408oRSPJIQnE3U=filters:format(png):quality(70)/",
          "84x63":
            "4REvmH61D2xTPt6aNRQEzgI8_yQ=filters:format(png):quality(70)/",
          "105x79":
            "lNChAThDMa8GKKsstdP80VzasSU=filters:format(png):quality(70)/",
          "158x119":
            "oO-U8Mdit-NoQ1w62HecIAlo67w=filters:format(png):quality(70)/",
          "274x206":
            "HEO2Up1ZJFK4lCvVY33t-fLtq54=filters:format(png):quality(70)/",
          "377x283":
            "CgzW_GipMu7Qx-NVSS2qax0fwb0=filters:format(png):quality(70)/",
          "400x300":
            "UCcbnHPAQruS2KqdEq2rdwjqGzc=filters:format(png):quality(70)/",
          "600x450":
            "38FiBCb1jRY8eOEh3rzz7mlYkqA=filters:format(png):quality(70)/",
          "768x576":
            "NAtq5ueXnnQPouJHyy7Lk1iiAG8=filters:format(png):quality(70)/",
          "800x600":
            "x_lre968sA4t98suW3hkgihRqI0=filters:format(png):quality(70)/",
          "1024x768":
            "8mo9RZmKMLI2rxDNmjSE8h7ODkI=filters:format(png):quality(70)/",
          "1440x1080":
            "zvysSUMQZm0z7c5nc_hFqdDIVc0=filters:format(png):quality(70)/",
          "1600x1200":
            "cwDQh5LRWgjNUn0OYlIM8OJt3NM=filters:format(png):quality(70)/",
          "84x47":
            "8a06zSijXN9o4zX7DIAnToVv1Ww=filters:format(png):quality(70)/",
          "105x59":
            "X7YnZyimoGm4rh7a5q6SFlXJ0WQ=filters:format(png):quality(70)/",
          "158x89":
            "StZRFmIwf1EmY3FtfjtvNaembR8=filters:format(png):quality(70)/",
          "274x154":
            "yEKkWqbaD1f44wWec9MlmOgWU7o=filters:format(png):quality(70)/",
          "377x212":
            "Ch6jM_85DqtZJmDFFYfc8XaWEx0=filters:format(png):quality(70)/",
          "400x225":
            "f2IzCTh1BIhLHU69qhpkUCKU2RE=filters:format(png):quality(70)/",
          "600x338":
            "_mFGq05y10-EUByFWj4v_IITLwg=filters:format(png):quality(70)/",
          "768x432":
            "seuCk1b6wk4Svu8mwvii7l0llzI=filters:format(png):quality(70)/",
          "800x450":
            "CMwyUBU_nRAgoO0y11Xu9Axp-v0=filters:format(png):quality(70)/",
          "1024x576":
            "w7ir2Y3Fz0HcEqmXtaW5z2LRLhM=filters:format(png):quality(70)/",
          "1440x810":
            "elRqpk_zJXLopt0J2ZdADIxtJ3M=filters:format(png):quality(70)/",
          "1600x900":
            "ZkRI8Ap6H8yrZ5EsUwBJx-sGShg=filters:format(png):quality(70)/",
          "84x84":
            "EgB63RqUcQzbG5UEoPVlJcpu4Ak=filters:format(png):quality(70)/",
          "105x105":
            "cUjCAvtuD67ftY59D8J4k0klFx8=filters:format(png):quality(70)/",
          "158x158":
            "weXhf92NVvWdREtQX_Z8aN7vM34=filters:format(png):quality(70)/",
          "274x274":
            "4IzdGh3PkJb8EBoNiRrBxwa3--8=filters:format(png):quality(70)/",
          "377x377":
            "TCQ4gs4Sk5ZyK3DXZSW6aL5eX7U=filters:format(png):quality(70)/",
          "400x400":
            "mhzpgNYXRz-BUhmijkoS8UVMpnA=filters:format(png):quality(70)/",
          "600x600":
            "Hdse4zWY6qf4KCXblSvgKHeBb0A=filters:format(png):quality(70)/",
          "768x768":
            "0dQf60JxMvVLmNvRMZ0qIJWbZqQ=filters:format(png):quality(70)/",
          "800x800":
            "XM-ztE5hFFHct5ysUjWrRoDb3-c=filters:format(png):quality(70)/",
          "1024x1024":
            "6Jww2xLkovaN15yoXuhO4jWGEHk=filters:format(png):quality(70)/",
          "1440x1440":
            "TVoM6SRvl3dSlHWtN12EEhwBNhI=filters:format(png):quality(70)/",
          "1600x1600":
            "rJ8pdhxzr8oOSt0wVzyFLoIta3k=filters:format(png):quality(70)/",
          "84x32":
            "kuavHahoYZ_scDEiRxhrOKT2fiM=filters:format(png):quality(70)/",
          "105x39":
            "Pqv6BeWR4m30mXLC4ojsv7RJ7J4=filters:format(png):quality(70)/",
          "158x59":
            "3GluC1K5-isnYpKRcnprjvNqo60=filters:format(png):quality(70)/",
          "274x103":
            "LtGTvhxmu_qfZxj9ccc1pT0p4Hc=filters:format(png):quality(70)/",
          "377x141":
            "NNTqiRmBQY-sTd2NnWdGdsG7Y8M=filters:format(png):quality(70)/",
          "400x150":
            "FpF267g-Yo46skXvV2NLbzsUaEk=filters:format(png):quality(70)/",
          "600x225":
            "ZE4BjPURO9PSxYXBfNAE-DjgRL8=filters:format(png):quality(70)/",
          "768x288":
            "za0VgiCYHaMLxoPrAFgHsddoEF0=filters:format(png):quality(70)/",
          "800x300":
            "c6CnMjW2u1yOANor5QofvO-EjU4=filters:format(png):quality(70)/",
          "1024x384":
            "jqBCNBol5nQMIzd76cib_LiyocQ=filters:format(png):quality(70)/",
          "1440x540":
            "J6ZtTzvzgW7xJibHorY8d_guTSk=filters:format(png):quality(70)/",
          "1600x600":
            "2m2FKX4NrGxUJY7s0weGrcxyxgw=filters:format(png):quality(70)/",
          "84x0":
            "qU0BTEc8IFQ3aMW_QAcaQUIHgGw=filters:format(png):quality(70)/",
          "105x0":
            "RsR0GLbRleObGbw88tZm4pmv7Gc=filters:format(png):quality(70)/",
          "158x0":
            "6aDYR9IstU44pmGs1zl9YIHc4rQ=filters:format(png):quality(70)/",
          "274x0":
            "_ZnqIwHVb0srpiTMOCM7WYBMC6M=filters:format(png):quality(70)/",
          "377x0":
            "y4wuPGYcMvujVoEfnkhIt1mM6RE=filters:format(png):quality(70)/",
          "400x0":
            "gVabMWmi_N9UodyXeDAZYARIMQc=filters:format(png):quality(70)/",
          "600x0":
            "k6b1FcejSLNbimUk3u8GTWqbbkg=filters:format(png):quality(70)/",
          "768x0":
            "CFmdUJSukpmWMOITIAbWV3wrhkg=filters:format(png):quality(70)/",
          "800x0":
            "XtuD_lxWYiGgNznVnDwL_onSYCA=filters:format(png):quality(70)/",
          "1024x0":
            "mLqd4hddDdaSgn-kWQRmlQTNSVQ=filters:format(png):quality(70)/",
          "1440x0":
            "4Dhpto4ZPP871lGMRA3B9K4OIC0=filters:format(png):quality(70)/",
          "1600x0":
            "wPf-JFcTXG7z0HvshZOBq8rNwUs=filters:format(png):quality(70)/",
          _id: "dae621c32758156496c437707bc6ac30e4801c07373c2f76de11a1f85102259a",
        },
        imageURL:
          "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/OPBKUSCO2NCHFEYHX5OJHXBBJI.png",
      },
      {
        title: "Carousel Feed",
        cardsType: "Tile",
        alignment: "carousal",
        sectionId: "/technology",
        result: {
          type: "results",
          version: "0.6.0",
          content_elements: [
            {
              type: "story",
              version: "0.10.7",
              content_elements: [
                {
                  _id: "HKNKPLOZV5COBKJN4GEXMQFEBE",
                  type: "raw_html",
                  additional_properties: {
                    _id: "PFNUKUQ3YVAKJGNZUYXSL775QY",
                    comments: [],
                    inline_comments: [],
                  },
                  content:
                    '<iframe src="https://data-viz.grid.news/projects/qanon-donations-entity-treemap-20220330/index.html\n"title="qanon" width="100%" height="700px"></iframe>\n',
                },
              ],
              created_date: "2022-04-12T18:20:45.567Z",
              revision: {
                revision_id: "WW47KGRW65CVFMKT2WSFTGCNNM",
                parent_id: "6RAJVM7JYRA3RGSIR26SDGBIAU",
                editions: ["default"],
                branch: "default",
                user_id: "dlee@mediainvestmentprojects.com",
                published: true,
              },
              last_updated_date: "2022-04-13T13:22:59.755Z",
              headlines: {
                basic: "test html embed 041222",
                meta_title: "",
                mobile: "",
                native: "",
                print: "",
                tablet: "",
                web: "",
              },
              owner: {
                sponsored: false,
                id: "sandbox.thesummit",
              },
              content_restrictions: {
                content_code: "free",
              },
              address: {},
              workflow: {
                status_code: 1,
              },
              subheadlines: {
                basic: "",
              },
              description: {
                basic: "test",
              },
              language: "",
              label: {},
              source: {
                name: "thesummit",
                source_type: "staff",
                system: "composer",
              },
              taxonomy: {
                primary_section: {
                  _id: "/technology",
                  _website: "the-summit",
                  type: "section",
                  version: "0.6.0",
                  name: "Technology",
                  description: "",
                  path: "/technology",
                  parent_id: "/",
                  parent: {
                    default: "/",
                  },
                  additional_properties: {
                    original: {
                      _id: "/technology",
                      site_topper: {
                        site_logo_image: null,
                      },
                      site: {
                        site_title: "Technology",
                        site_tagline: null,
                        site_about: null,
                        site_description: "",
                        site_keywords: null,
                        pagebuilder_path_for_native_apps: null,
                        site_url: null,
                        color: "00EEEF",
                        icon: null,
                        short_description: "",
                      },
                      social: {
                        twitter: null,
                        rss: null,
                        facebook: null,
                        instagram: null,
                      },
                      navigation: {
                        nav_title: "Technology",
                      },
                      _admin: {
                        alias_ids: ["/technology"],
                      },
                      _website: "the-summit",
                      name: "Technology",
                      order: {
                        default: 1008,
                        "header-home": 1008,
                      },
                      parent: {
                        default: "/",
                        "header-home": "/",
                      },
                      ancestors: {
                        default: ["/"],
                        "header-home": ["/"],
                      },
                      inactive: false,
                      node_type: "section",
                    },
                  },
                },
                primary_site: {
                  _id: "/technology",
                  type: "site",
                  version: "0.5.8",
                  name: "Technology",
                  description: null,
                  path: "/technology",
                  parent_id: "/",
                  additional_properties: {
                    original: {
                      _id: "/technology",
                      site_topper: {
                        site_logo_image: null,
                      },
                      site: {
                        site_title: "Technology",
                        site_tagline: null,
                        site_about: null,
                        site_description: null,
                        site_keywords: null,
                        pagebuilder_path_for_native_apps: null,
                        site_url: null,
                        color: "00EEEF",
                        icon: null,
                        short_description: null,
                      },
                      social: {
                        twitter: null,
                        rss: null,
                        facebook: null,
                        instagram: null,
                      },
                      navigation: {
                        nav_title: "Technology",
                      },
                      _admin: {
                        alias_ids: ["/technology"],
                      },
                      name: "Technology",
                      order: {
                        default: 1008,
                        "header-home": 1008,
                      },
                      parent: {
                        default: "/",
                        "header-home": "/",
                      },
                      ancestors: {
                        default: ["/"],
                        "header-home": ["/"],
                      },
                      inactive: false,
                      node_type: "section",
                    },
                  },
                },
                sections: [
                  {
                    _id: "/technology",
                    _website: "the-summit",
                    type: "section",
                    version: "0.6.0",
                    name: "Technology",
                    description: "",
                    path: "/technology",
                    parent_id: "/",
                    parent: {
                      default: "/",
                    },
                    additional_properties: {
                      original: {
                        _id: "/technology",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Technology",
                          site_tagline: null,
                          site_about: null,
                          site_description: "",
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: "",
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Technology",
                        },
                        _admin: {
                          alias_ids: ["/technology"],
                        },
                        _website: "the-summit",
                        name: "Technology",
                        order: {
                          default: 1008,
                          "header-home": 1008,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: ["/"],
                          "header-home": ["/"],
                        },
                        inactive: false,
                        node_type: "section",
                      },
                    },
                    _website_section_id: "the-summit./technology",
                  },
                ],
                sites: [
                  {
                    _id: "/technology",
                    type: "site",
                    version: "0.5.8",
                    name: "Technology",
                    description: null,
                    path: "/technology",
                    parent_id: "/",
                    additional_properties: {
                      original: {
                        _id: "/technology",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Technology",
                          site_tagline: null,
                          site_about: null,
                          site_description: null,
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: null,
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Technology",
                        },
                        _admin: {
                          alias_ids: ["/technology"],
                        },
                        name: "Technology",
                        order: {
                          default: 1008,
                          "header-home": 1008,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: ["/"],
                          "header-home": ["/"],
                        },
                        inactive: false,
                        node_type: "section",
                      },
                    },
                  },
                ],
              },
              related_content: {
                basic: [],
                redirect: [],
              },
              distributor: {
                category: "staff",
                name: "thesummit",
                subcategory: "",
              },
              canonical_website: "the-summit",
              geo: {},
              planning: {
                internal_note: "",
                story_length: {
                  character_count_actual: 0,
                  character_encoding: "UTF-16",
                  inch_count_actual: 0,
                  line_count_actual: 0,
                  word_count_actual: 0,
                },
              },
              display_date: "2022-04-12T18:21:12.986Z",
              credits: {
                by: [
                  {
                    _id: "dom.lee",
                    type: "author",
                    version: "0.5.8",
                    name: "Dominique Lee",
                    org: "New York",
                    image: {
                      url: "https://s3.amazonaws.com/arc-authors/thesummit/1c8dfa8a-8b9d-4e0f-95cb-eb2c15bcadcf.png",
                      version: "0.5.8",
                    },
                    description: "",
                    url: "",
                    slug: "dom-lee",
                    social_links: [
                      {
                        site: "email",
                        url: "",
                      },
                    ],
                    socialLinks: [
                      {
                        site: "email",
                        url: "",
                        deprecated: true,
                        deprecation_msg: "Please use social_links.",
                      },
                    ],
                    additional_properties: {
                      original: {
                        _id: "dom.lee",
                        firstName: "Dominique",
                        lastName: "Lee",
                        byline: "Dominique Lee",
                        role: "Product Maker",
                        image:
                          "https://s3.amazonaws.com/arc-authors/thesummit/1c8dfa8a-8b9d-4e0f-95cb-eb2c15bcadcf.png",
                        email: "",
                        affiliations: "",
                        education: [],
                        awards: [],
                        books: [],
                        podcasts: [],
                        bio_page: "",
                        location: "New York",
                        bio: "",
                        longBio: "",
                        slug: "dom-lee",
                        native_app_rendering: false,
                        fuzzy_match: false,
                        contributor: false,
                        status: true,
                        last_updated_date: "2021-12-27T23:06:40.675Z",
                      },
                    },
                    resized_params: {
                      "84x56":
                        "O7CWRwGGTRe5VnJjz5_3MjDr7Gg=filters:format(png):quality(100)/",
                      "105x70":
                        "EophMTCMMWxCWTVd5BNgtZxEPhk=filters:format(png):quality(100)/",
                      "158x105":
                        "mw4Pj5HmDxlJUM0uZhqVxe5Xa_E=filters:format(png):quality(100)/",
                      "274x183":
                        "WLt0C85QvfWlHJlB4kxW5wafmTg=filters:format(png):quality(100)/",
                      "377x251":
                        "txzNvaBci7U3ETRjXTziYLkUu8U=filters:format(png):quality(100)/",
                      "400x267":
                        "-pREJirhN-vHhtV1Vq-SiDjDEb4=filters:format(png):quality(100)/",
                      "600x400":
                        "OE0E94qkDlecoOvvxxxsKjtyONI=filters:format(png):quality(100)/",
                      "768x512":
                        "xx2CAyj9iyIwmBnhuvSJAOq1GQY=filters:format(png):quality(100)/",
                      "800x533":
                        "t8GfXU9h4TxU84kWhxvi4e-qZw8=filters:format(png):quality(100)/",
                      "1024x683":
                        "f88i36ycbYhIFfSCKe7KGMbYNyY=filters:format(png):quality(100)/",
                      "1440x960":
                        "Y8mwsi7DPVm8QWkqy2y6z-xGNGM=filters:format(png):quality(100)/",
                      "1600x1067":
                        "CPI8dxigfybKrUG_D8tNQgIS2hQ=filters:format(png):quality(100)/",
                      "84x63":
                        "dnyltyHIcpEUPlDJ5uYCl_GxR8A=filters:format(png):quality(100)/",
                      "105x79":
                        "hZFf7OPb_hweastcncLlBpg5Sg8=filters:format(png):quality(100)/",
                      "158x119":
                        "FKTPH-r3Vpf5iB1_OuPp6ODXweY=filters:format(png):quality(100)/",
                      "274x206":
                        "byKkALtyyrMuYpVGBsocUmeAo60=filters:format(png):quality(100)/",
                      "377x283":
                        "-VwCWs0-uYkUHbvgGWF8cmaVt64=filters:format(png):quality(100)/",
                      "400x300":
                        "WP7XAlgE4zZnHxp-53MN88ALxIM=filters:format(png):quality(100)/",
                      "600x450":
                        "1NyNNEYodZLNv0u6wPylhs_G2hw=filters:format(png):quality(100)/",
                      "768x576":
                        "Dij9eu1_IWQltzMw_5OvUj9MgH8=filters:format(png):quality(100)/",
                      "800x600":
                        "saDR6BZDXxrhZuhp7JdC4gP_0ME=filters:format(png):quality(100)/",
                      "1024x768":
                        "RN2OMr7Z_J94ah94sDELf3_CY84=filters:format(png):quality(100)/",
                      "1440x1080":
                        "d1-lsYri-zCyadCVgYJQV4rlFhc=filters:format(png):quality(100)/",
                      "1600x1200":
                        "A918wdUuBr0gzOQ0MLShlyBOLOw=filters:format(png):quality(100)/",
                      "84x47":
                        "kIfYMcGqhGhpz1Afjmafm-rQxho=filters:format(png):quality(100)/",
                      "105x59":
                        "neXihwoLN0HCs04QXrBj44Ry6-U=filters:format(png):quality(100)/",
                      "158x89":
                        "_i3JXfLlcVugDPyOuGctiKFJqe8=filters:format(png):quality(100)/",
                      "274x154":
                        "3eP4hz9U7bvVrAZ9vMCCD8Zer_4=filters:format(png):quality(100)/",
                      "377x212":
                        "RV8nBJtx6I_ztZUcbO8YnmKrc-k=filters:format(png):quality(100)/",
                      "400x225":
                        "qqe8wIEidv5QEWQU1Fz9YCrmOrc=filters:format(png):quality(100)/",
                      "600x338":
                        "qyA4ymH706qm2BYKTAycdnytco0=filters:format(png):quality(100)/",
                      "768x432":
                        "cj2tk7IwjOjDqTgVFlS2O6vIk74=filters:format(png):quality(100)/",
                      "800x450":
                        "fu2oMLmLtEuuDbixA8z9sIi0hPE=filters:format(png):quality(100)/",
                      "1024x576":
                        "mFfSn9V9Tn9Y_4VeIi64enPtQz8=filters:format(png):quality(100)/",
                      "1440x810":
                        "IOuD6D-1yHVj3WV8kbzlFGxg3A8=filters:format(png):quality(100)/",
                      "1600x900":
                        "1suqx-qI9qZbrzmdXWojz6HIRsc=filters:format(png):quality(100)/",
                      "84x84":
                        "bTQQBbwPAxLII472ibN3GryUbBs=filters:format(png):quality(100)/",
                      "105x105":
                        "PP1luNdpHV5o9WPpzZfwTypGMws=filters:format(png):quality(100)/",
                      "158x158":
                        "LvysrzB81z-pz78pzp89CbOTSsY=filters:format(png):quality(100)/",
                      "274x274":
                        "0sZPzvgexTIfJA6-haqi_Valki8=filters:format(png):quality(100)/",
                      "377x377":
                        "yjztb0aXBeP4VRjqMxrgED88oBY=filters:format(png):quality(100)/",
                      "400x400":
                        "HMiGGIyaxQowqVsvJ_JacDTxpr0=filters:format(png):quality(100)/",
                      "600x600":
                        "uBtDafoIS4IKkV6nSnZp6rdi9RE=filters:format(png):quality(100)/",
                      "768x768":
                        "aap0YSNXbN3yYx5-YilMzzo-fmo=filters:format(png):quality(100)/",
                      "800x800":
                        "bWFeGRKBYuPV2tRHa6SNivtwpv4=filters:format(png):quality(100)/",
                      "1024x1024":
                        "yaxtoV7BHiP5nAsNh9Vn0yg4SLA=filters:format(png):quality(100)/",
                      "1440x1440":
                        "M1De5OvDMyTldhqmFL5rn4FTX7U=filters:format(png):quality(100)/",
                      "1600x1600":
                        "7OTmm8JA9OXqER1nacV8sjAW9F4=filters:format(png):quality(100)/",
                      "84x32":
                        "th88iDz_fYOzdb07g7WjWPwbluI=filters:format(png):quality(100)/",
                      "105x39":
                        "QOW8UIjkkD0a4ZRI_DCf-B1r32k=filters:format(png):quality(100)/",
                      "158x59":
                        "pt2Rt_kWJSWSgvzBvrZOloyK2UU=filters:format(png):quality(100)/",
                      "274x103":
                        "P8D_sptiDs7wWsb6FEGC-6YmXEs=filters:format(png):quality(100)/",
                      "377x141":
                        "QMXOcmpQsrYvrPYvqgkv0P8nVj0=filters:format(png):quality(100)/",
                      "400x150":
                        "EWOkKgZwu7QGaMGMpfpk15J_y6M=filters:format(png):quality(100)/",
                      "600x225":
                        "R27sdSlekLg7RjHCA-hDxXDYtZs=filters:format(png):quality(100)/",
                      "768x288":
                        "m85gjxZVSPw8QgS2_mYnkN4ujUA=filters:format(png):quality(100)/",
                      "800x300":
                        "nPf_mfK558OpVWrPkYSFouGIJMA=filters:format(png):quality(100)/",
                      "1024x384":
                        "YdLfPBXuWb9cOAOU8u9SCGyVb8k=filters:format(png):quality(100)/",
                      "1440x540":
                        "Ustww9k68biSCJ0fowcMOLxfGfU=filters:format(png):quality(100)/",
                      "1600x600":
                        "RUPm09hxWGMhivuTP3K-U0m7UzQ=filters:format(png):quality(100)/",
                      "84x0":
                        "PAa0WodLluZpfDOHti7SeRKAmRw=filters:format(png):quality(100)/",
                      "105x0":
                        "dUeIir4sznjef0T6pIPwtVjmkow=filters:format(png):quality(100)/",
                      "158x0":
                        "aiB4OchqWZGMrc6uSQZjrbbd2k0=filters:format(png):quality(100)/",
                      "274x0":
                        "xSq4ksmuw86_CjjC-n4jU5cDYhc=filters:format(png):quality(100)/",
                      "377x0":
                        "o-teUUIeRx-YcUQsdYAEMU5-AP4=filters:format(png):quality(100)/",
                      "400x0":
                        "FTQoZ77LPis4kfReIz1XnY-eVl0=filters:format(png):quality(100)/",
                      "600x0":
                        "jGJcFDYZvN8FZRg50EYJxGBzvWU=filters:format(png):quality(100)/",
                      "768x0":
                        "HsW6dg1w8Wm6cPzCNT7DNTD_zLM=filters:format(png):quality(100)/",
                      "800x0":
                        "05Qekr7lCJxbox0f3zL0_Mdtfmo=filters:format(png):quality(100)/",
                      "1024x0":
                        "SU4GgrblISBM2YsXHrIoTpiaHM0=filters:format(png):quality(100)/",
                      "1440x0":
                        "vs9zflqCYIooIuWf9OYrjbUy0Gw=filters:format(png):quality(100)/",
                      "1600x0":
                        "FBrd_yb6mVXkhD4hRGt37O8GLeA=filters:format(png):quality(100)/",
                    },
                  },
                ],
              },
              subtype: "html_embed",
              first_publish_date: "2022-04-12T18:21:12.986Z",
              websites: {
                "the-summit": {
                  website_section: {
                    _id: "/technology",
                    _website: "the-summit",
                    type: "section",
                    version: "0.6.0",
                    name: "Technology",
                    description: "",
                    path: "/technology",
                    parent_id: "/",
                    parent: {
                      default: "/",
                    },
                    additional_properties: {
                      original: {
                        _id: "/technology",
                        site_topper: {
                          site_logo_image: null,
                        },
                        site: {
                          site_title: "Technology",
                          site_tagline: null,
                          site_about: null,
                          site_description: "",
                          site_keywords: null,
                          pagebuilder_path_for_native_apps: null,
                          site_url: null,
                          color: "00EEEF",
                          icon: null,
                          short_description: "",
                        },
                        social: {
                          twitter: null,
                          rss: null,
                          facebook: null,
                          instagram: null,
                        },
                        navigation: {
                          nav_title: "Technology",
                        },
                        _admin: {
                          alias_ids: ["/technology"],
                        },
                        _website: "the-summit",
                        name: "Technology",
                        order: {
                          default: 1008,
                          "header-home": 1008,
                        },
                        parent: {
                          default: "/",
                          "header-home": "/",
                        },
                        ancestors: {
                          default: ["/"],
                          "header-home": ["/"],
                        },
                        inactive: false,
                        node_type: "section",
                      },
                    },
                    _website_section_id: "the-summit./technology",
                  },
                  website_url:
                    "/story/technology/2022/04/12/test-html-embed-041222/",
                },
              },
              additional_properties: {
                clipboard: {},
                has_published_copy: true,
                is_published: true,
                publish_date: "2022-04-12T18:21:12.986Z",
              },
              publish_date: "2022-04-13T13:22:59.467Z",
              canonical_url:
                "/story/technology/2022/04/12/test-html-embed-041222/",
              publishing: {
                scheduled_operations: {
                  publish_edition: [],
                  unpublish_edition: [],
                },
              },
              _id: "KWW263FOYJBWVHCHBZIW46OWQA",
              website: "the-summit",
              website_url:
                "/story/technology/2022/04/12/test-html-embed-041222/",
            },
          ],
          additional_properties: {
            took: 1,
            timed_out: false,
          },
          count: 20,
          next: 6,
          _id: "e64a73ff5f448f001d68d01844849b30795b1e3ea81b8300befe4c8af48a3da8",
        },
        resizerURL: "https://www.grid.news/resizer",
      },
    ],
  };
};

homepageTransformed = () => {
  return [
    {
      title: "Latest",
      cardsType: "StoryCard-1",
      alignment: "vertical",
      sectionId: "",
      id: "1743fcf0b306af214e5c2702cdd9bdd81d84f13a7f1bb35078629ccb44f64931",
      result: [
        {
          headline: "Video headline test",
          img: {
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "my video",
          description: "test",
          by: [
            {
              name: "Maggie Severns",
              id: "maggie.severns",
            },
          ],
          publish_date: "2022-04-04T18:34:59.158Z",
          display_date: "2022-04-04T18:34:41.048Z",
          _id: "AZL2ZG5LTVA5BOO6AJAPJYTNSU",
          website_url: "/story/politics/2022/04/04/video-headline-test/",
          primary_section: {
            _id: "/politics",
            _website: "the-summit",
            type: "section",
            version: "0.6.0",
            name: "Politics",
            description: null,
            path: "/politics",
            parent_id: "/",
            parent: {
              default: "/",
            },
          },
          tags: [],
          included_media_type: "",
          label: {},
        },
      ],
    },
    {
      cardsType: "EmailSubscriptionDropCard",
      alignment: "vertical",
      id: "1649858611651",
      result: [
        {
          headline: "Grid Today",
          description:
            "Get the context you need on the most important stories of the day.",
          primary_section: {
            type: "section",
            name: "The Drop AM/PM",
          },
          img: {
            resizerURL: "https://www.grid.news/resizer",
            resized_params: {
              "84x56":
                "VbeXWRLLbUIFdIr7yoJ6kwLYGGE=filters:format(png):quality(70)/",
              "105x70":
                "9h88TeGrIo4j8gJVCzSCgG_vNyY=filters:format(png):quality(70)/",
              "158x105":
                "zEoIxoH7UYt2Vc3X9l0v_N8iPsU=filters:format(png):quality(70)/",
              "274x183":
                "lxkc7W0LyM4sXbljto8I-4ZpYYs=filters:format(png):quality(70)/",
              "377x251":
                "k20RT8i7Kh3RNCR-wysOXZVbVOc=filters:format(png):quality(70)/",
              "400x267":
                "ESur--FOlFmBVLibsOHGHQDUQQM=filters:format(png):quality(70)/",
              "600x400":
                "Lpql8lb1JeWiBtMdZCDGi-U1Kpk=filters:format(png):quality(70)/",
              "768x512":
                "8kOq5HLcjdGPwG5ClgBlY_U8wMM=filters:format(png):quality(70)/",
              "800x533":
                "OUU_7yuRNH6Py8EQl5rCtpMMAFI=filters:format(png):quality(70)/",
              "1024x683":
                "jAJ_d8hKeJSu54SJUKzmXuyaZrY=filters:format(png):quality(70)/",
              "1440x960":
                "n83Apb4-5rdBy7aXwf1rA5fWQxU=filters:format(png):quality(70)/",
              "1600x1067":
                "A4TSyhBQDrfQh408oRSPJIQnE3U=filters:format(png):quality(70)/",
              "84x63":
                "4REvmH61D2xTPt6aNRQEzgI8_yQ=filters:format(png):quality(70)/",
              "105x79":
                "lNChAThDMa8GKKsstdP80VzasSU=filters:format(png):quality(70)/",
              "158x119":
                "oO-U8Mdit-NoQ1w62HecIAlo67w=filters:format(png):quality(70)/",
              "274x206":
                "HEO2Up1ZJFK4lCvVY33t-fLtq54=filters:format(png):quality(70)/",
              "377x283":
                "CgzW_GipMu7Qx-NVSS2qax0fwb0=filters:format(png):quality(70)/",
              "400x300":
                "UCcbnHPAQruS2KqdEq2rdwjqGzc=filters:format(png):quality(70)/",
              "600x450":
                "38FiBCb1jRY8eOEh3rzz7mlYkqA=filters:format(png):quality(70)/",
              "768x576":
                "NAtq5ueXnnQPouJHyy7Lk1iiAG8=filters:format(png):quality(70)/",
              "800x600":
                "x_lre968sA4t98suW3hkgihRqI0=filters:format(png):quality(70)/",
              "1024x768":
                "8mo9RZmKMLI2rxDNmjSE8h7ODkI=filters:format(png):quality(70)/",
              "1440x1080":
                "zvysSUMQZm0z7c5nc_hFqdDIVc0=filters:format(png):quality(70)/",
              "1600x1200":
                "cwDQh5LRWgjNUn0OYlIM8OJt3NM=filters:format(png):quality(70)/",
              "84x47":
                "8a06zSijXN9o4zX7DIAnToVv1Ww=filters:format(png):quality(70)/",
              "105x59":
                "X7YnZyimoGm4rh7a5q6SFlXJ0WQ=filters:format(png):quality(70)/",
              "158x89":
                "StZRFmIwf1EmY3FtfjtvNaembR8=filters:format(png):quality(70)/",
              "274x154":
                "yEKkWqbaD1f44wWec9MlmOgWU7o=filters:format(png):quality(70)/",
              "377x212":
                "Ch6jM_85DqtZJmDFFYfc8XaWEx0=filters:format(png):quality(70)/",
              "400x225":
                "f2IzCTh1BIhLHU69qhpkUCKU2RE=filters:format(png):quality(70)/",
              "600x338":
                "_mFGq05y10-EUByFWj4v_IITLwg=filters:format(png):quality(70)/",
              "768x432":
                "seuCk1b6wk4Svu8mwvii7l0llzI=filters:format(png):quality(70)/",
              "800x450":
                "CMwyUBU_nRAgoO0y11Xu9Axp-v0=filters:format(png):quality(70)/",
              "1024x576":
                "w7ir2Y3Fz0HcEqmXtaW5z2LRLhM=filters:format(png):quality(70)/",
              "1440x810":
                "elRqpk_zJXLopt0J2ZdADIxtJ3M=filters:format(png):quality(70)/",
              "1600x900":
                "ZkRI8Ap6H8yrZ5EsUwBJx-sGShg=filters:format(png):quality(70)/",
              "84x84":
                "EgB63RqUcQzbG5UEoPVlJcpu4Ak=filters:format(png):quality(70)/",
              "105x105":
                "cUjCAvtuD67ftY59D8J4k0klFx8=filters:format(png):quality(70)/",
              "158x158":
                "weXhf92NVvWdREtQX_Z8aN7vM34=filters:format(png):quality(70)/",
              "274x274":
                "4IzdGh3PkJb8EBoNiRrBxwa3--8=filters:format(png):quality(70)/",
              "377x377":
                "TCQ4gs4Sk5ZyK3DXZSW6aL5eX7U=filters:format(png):quality(70)/",
              "400x400":
                "mhzpgNYXRz-BUhmijkoS8UVMpnA=filters:format(png):quality(70)/",
              "600x600":
                "Hdse4zWY6qf4KCXblSvgKHeBb0A=filters:format(png):quality(70)/",
              "768x768":
                "0dQf60JxMvVLmNvRMZ0qIJWbZqQ=filters:format(png):quality(70)/",
              "800x800":
                "XM-ztE5hFFHct5ysUjWrRoDb3-c=filters:format(png):quality(70)/",
              "1024x1024":
                "6Jww2xLkovaN15yoXuhO4jWGEHk=filters:format(png):quality(70)/",
              "1440x1440":
                "TVoM6SRvl3dSlHWtN12EEhwBNhI=filters:format(png):quality(70)/",
              "1600x1600":
                "rJ8pdhxzr8oOSt0wVzyFLoIta3k=filters:format(png):quality(70)/",
              "84x32":
                "kuavHahoYZ_scDEiRxhrOKT2fiM=filters:format(png):quality(70)/",
              "105x39":
                "Pqv6BeWR4m30mXLC4ojsv7RJ7J4=filters:format(png):quality(70)/",
              "158x59":
                "3GluC1K5-isnYpKRcnprjvNqo60=filters:format(png):quality(70)/",
              "274x103":
                "LtGTvhxmu_qfZxj9ccc1pT0p4Hc=filters:format(png):quality(70)/",
              "377x141":
                "NNTqiRmBQY-sTd2NnWdGdsG7Y8M=filters:format(png):quality(70)/",
              "400x150":
                "FpF267g-Yo46skXvV2NLbzsUaEk=filters:format(png):quality(70)/",
              "600x225":
                "ZE4BjPURO9PSxYXBfNAE-DjgRL8=filters:format(png):quality(70)/",
              "768x288":
                "za0VgiCYHaMLxoPrAFgHsddoEF0=filters:format(png):quality(70)/",
              "800x300":
                "c6CnMjW2u1yOANor5QofvO-EjU4=filters:format(png):quality(70)/",
              "1024x384":
                "jqBCNBol5nQMIzd76cib_LiyocQ=filters:format(png):quality(70)/",
              "1440x540":
                "J6ZtTzvzgW7xJibHorY8d_guTSk=filters:format(png):quality(70)/",
              "1600x600":
                "2m2FKX4NrGxUJY7s0weGrcxyxgw=filters:format(png):quality(70)/",
              "84x0":
                "qU0BTEc8IFQ3aMW_QAcaQUIHgGw=filters:format(png):quality(70)/",
              "105x0":
                "RsR0GLbRleObGbw88tZm4pmv7Gc=filters:format(png):quality(70)/",
              "158x0":
                "6aDYR9IstU44pmGs1zl9YIHc4rQ=filters:format(png):quality(70)/",
              "274x0":
                "_ZnqIwHVb0srpiTMOCM7WYBMC6M=filters:format(png):quality(70)/",
              "377x0":
                "y4wuPGYcMvujVoEfnkhIt1mM6RE=filters:format(png):quality(70)/",
              "400x0":
                "gVabMWmi_N9UodyXeDAZYARIMQc=filters:format(png):quality(70)/",
              "600x0":
                "k6b1FcejSLNbimUk3u8GTWqbbkg=filters:format(png):quality(70)/",
              "768x0":
                "CFmdUJSukpmWMOITIAbWV3wrhkg=filters:format(png):quality(70)/",
              "800x0":
                "XtuD_lxWYiGgNznVnDwL_onSYCA=filters:format(png):quality(70)/",
              "1024x0":
                "mLqd4hddDdaSgn-kWQRmlQTNSVQ=filters:format(png):quality(70)/",
              "1440x0":
                "4Dhpto4ZPP871lGMRA3B9K4OIC0=filters:format(png):quality(70)/",
              "1600x0":
                "wPf-JFcTXG7z0HvshZOBq8rNwUs=filters:format(png):quality(70)/",
              _id: "dae621c32758156496c437707bc6ac30e4801c07373c2f76de11a1f85102259a",
            },
            url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/OPBKUSCO2NCHFEYHX5OJHXBBJI.png",
          },
        },
      ],
    },
    {
      title: "Carousel Feed",
      cardsType: "Tile",
      alignment: "carousal",
      sectionId: "/technology",
      id: "e64a73ff5f448f001d68d01844849b30795b1e3ea81b8300befe4c8af48a3da8",
      result: [
        {
          headline: "test html embed 041222",
          img: {
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "",
          description: "test",
          by: [
            {
              name: "Dominique Lee",
              id: "dom.lee",
            },
          ],
          publish_date: "2022-04-13T13:22:59.467Z",
          display_date: "2022-04-12T18:21:12.986Z",
          _id: "KWW263FOYJBWVHCHBZIW46OWQA",
          website_url: "/story/technology/2022/04/12/test-html-embed-041222/",
          primary_section: {
            _id: "/technology",
            _website: "the-summit",
            type: "section",
            version: "0.6.0",
            name: "Technology",
            description: "",
            path: "/technology",
            parent_id: "/",
            parent: {
              default: "/",
            },
          },
          tags: [],
          included_media_type: "",
          label: {},
        },
      ],
    },
  ];
};
