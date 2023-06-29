const homepageController = require("../homepage");
const homepageService = require("../../services/homepage");

jest.mock("../../services/homepage", () => ({
  ...jest.mock("../../services/homepage"),
  getHomepage: jest.fn(),
}));

describe("The Email prefs Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });

  describe("Get Homepage Controller Api", () => {
    it("should return correct Homepage Response from the service layer", () => {
      process.env.API_KEY = "JKRTUVMICBKWRZTUC";
      const expectedRes = getHomepageExpected();
      const res = {};
      homepageService.getHomepage.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        console.log("response data: ", JSON.stringify(res));
        expect(res.data).toBe(expectedRes);
        console.log("Get Homepage Response");
      };
      return homepageController
        .ctrlGetHomepage(
          {
            headers: {
              apikey:
                "$2a$04$sb02uCM/hK/R4Bq7DdCP5eUXLYF58z.hdNlrovH4LcgdWM6Inb.8O",
            },
          },
          res,
          cb
        )
        .then(() => {
          expect(homepageService.getHomepage).toHaveBeenCalledTimes(1);
        });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

getHomepageExpected = () => {
  return [
    {
      title: "Latest",
      cardsType: "StoryCard-1",
      alignment: "vertical",
      sectionId: "",
      result: [
        {
          headline: "Testingsd",
          img: {
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "asdf",
          description: "test",
          by: [
            {
              name: "Mae Decena",
              id: "mae.decena",
            },
          ],
          publish_date: "2022-04-06T15:02:55.028Z",
          display_date: "2022-04-06T15:02:55.028Z",
          _id: "V3LQIZUMLVANVF2KXIPX3YBIYY",
          website_url: "/story/technology/2022/04/06/testingsd/",
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

        {
          headline:
            "Wonk or shill? How the lines between informed guidance and undue influence become blurred",
          img: {
            url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/A4HAVCWPNNCJNPXC2HQUMPH7J4.jpg",
            resized_params: {
              "84x56":
                "VlpSa9QhnodP_GcPKpzA_LCHWQQ=filters:format(jpg):quality(100)/",
              "105x70":
                "3BwaqG0zWgPD4JpFwNRLB312mfY=filters:format(jpg):quality(100)/",
              "158x105":
                "FBuo4kTYMLy0kfLKk4GCDhORZ-U=filters:format(jpg):quality(100)/",
              "274x183":
                "KUw63GTuTbGBH56DqxMWQoVW5f8=filters:format(jpg):quality(100)/",
              "377x251":
                "UhmV-_E-8lqUFg0KP3yfVOemch8=filters:format(jpg):quality(100)/",
              "400x267":
                "iwRpqTIKJ_hu78x_HFwsYoCft0Y=filters:format(jpg):quality(100)/",
              "600x400":
                "WOl2g4JnuxeSakDn8k3Qi-QXFzY=filters:format(jpg):quality(100)/",
              "768x512":
                "fgnvD3Ijex6ovtQvCV7pZ-g-QNw=filters:format(jpg):quality(100)/",
              "800x533":
                "toMRSbH1nI92VYUiLnFDMn2DjIU=filters:format(jpg):quality(100)/",
              "1024x683":
                "D4tJHR9EEViucCnP9SbmtbXmxLI=filters:format(jpg):quality(100)/",
              "1440x960":
                "6M51XidP3ik52UJx2YxWrnVmzm8=filters:format(jpg):quality(100)/",
              "1600x1067":
                "A_HhjI8qgvrbBGY3zMYOcfqZc94=filters:format(jpg):quality(100)/",
              "84x63":
                "5d1fIITqB1qNE8eU7Y-Xj6DhlGI=filters:format(jpg):quality(100)/",
              "105x79":
                "E1Q_CNy8NKPIL0jfLlk1eJHQJiI=filters:format(jpg):quality(100)/",
              "158x119":
                "u73Jb62Hr9aJeEljpfgx5iLGXMw=filters:format(jpg):quality(100)/",
              "274x206":
                "XHevW4kb2xXrIn_Bu0i61ffAijk=filters:format(jpg):quality(100)/",
              "377x283":
                "-zjqpQWWt7xQ3MSWAeBAOJjWsZE=filters:format(jpg):quality(100)/",
              "400x300":
                "lBKc45J85fbeiQqs49gnwb9nqfs=filters:format(jpg):quality(100)/",
              "600x450":
                "5drN_zjefyqxGnHM0EafBCcvRsw=filters:format(jpg):quality(100)/",
              "768x576":
                "wN8NCyqxgZsh8pS0J4N2ms-S7ew=filters:format(jpg):quality(100)/",
              "800x600":
                "NI-Tzjp3_v1mC7QpVCcndxpThvI=filters:format(jpg):quality(100)/",
              "1024x768":
                "I085lzNeki-fADnWbnncxIMZu74=filters:format(jpg):quality(100)/",
              "1440x1080":
                "ldCxtG8Lo1deuYlZWFFWCa7wtAA=filters:format(jpg):quality(100)/",
              "1600x1200":
                "Lh0to_Rp_i_SAav_Z94rF4_3Gzw=filters:format(jpg):quality(100)/",
              "84x47":
                "5eQSik4CWuOHrV1AofzbboVLrFE=filters:format(jpg):quality(100)/",
              "105x59":
                "2V-a6MBrE2MxoJ-yChQS4Rc_KLI=filters:format(jpg):quality(100)/",
              "158x89":
                "qMw4ObAks2sWoBHSXqD2XzeM0T8=filters:format(jpg):quality(100)/",
              "274x154":
                "TRnq9aOnXxFr7cTcBsoKZA2trgo=filters:format(jpg):quality(100)/",
              "377x212":
                "3U2FRCFqy3Xfv6riHXg6ZF0voKo=filters:format(jpg):quality(100)/",
              "400x225":
                "77Jjn0VBo2OFPROxq9uxlWDntB8=filters:format(jpg):quality(100)/",
              "600x338":
                "icWHUqDA-upEVRShb_9hePoAKoQ=filters:format(jpg):quality(100)/",
              "768x432":
                "PQtGTsIIzcXhtoBjq2m2khRzcx8=filters:format(jpg):quality(100)/",
              "800x450":
                "911JKsDUjcWXmmD_fW6HBOB8tkc=filters:format(jpg):quality(100)/",
              "1024x576":
                "45Y_9_lq4o4SM0lF2JGOr6kJccU=filters:format(jpg):quality(100)/",
              "1440x810":
                "ZPoSaw3OO5RoCEguxIploh5T3JI=filters:format(jpg):quality(100)/",
              "1600x900":
                "u6DYDiq4zjYZJUjYZwfQHHER_oc=filters:format(jpg):quality(100)/",
              "84x84":
                "XEAHDSpGYO6S4kpFZ-rLPm7LJXE=filters:format(jpg):quality(100)/",
              "105x105":
                "dAFbdpf7aUwSsx5-OiaZRkiDJYk=filters:format(jpg):quality(100)/",
              "158x158":
                "ogS16ZFa1Ic-EInDluZG_4dsplc=filters:format(jpg):quality(100)/",
              "274x274":
                "cemvsC8k75TFUauH_gW1xmmH6uA=filters:format(jpg):quality(100)/",
              "377x377":
                "hx7tnVu84gQHqFyvIwas7zepqd4=filters:format(jpg):quality(100)/",
              "400x400":
                "OUYx0rzk76NEfEzthNnty8la724=filters:format(jpg):quality(100)/",
              "600x600":
                "c-T9KlR0Jy1iY0MGOtq7GgZN4gg=filters:format(jpg):quality(100)/",
              "768x768":
                "d60s-SDQW1ENUDlRA8O-D7P6PfM=filters:format(jpg):quality(100)/",
              "800x800":
                "GaZsb4Rg6WmbQfUl_aVds0A8kuc=filters:format(jpg):quality(100)/",
              "1024x1024":
                "GB7BOlufc2vCkg0CdX-CM6aoNIQ=filters:format(jpg):quality(100)/",
              "1440x1440":
                "0bLamI321Vsaj9YK2kwXyNdhBDY=filters:format(jpg):quality(100)/",
              "1600x1600":
                "9ny1pDwkivFrJih3pi5607MMKFg=filters:format(jpg):quality(100)/",
              "84x32":
                "BY8xkR7yxvsm24NT6_eY3WQOYXQ=filters:format(jpg):quality(100)/",
              "105x39":
                "xT7TE9B4iGSxN3lEc2GF__Tbm4s=filters:format(jpg):quality(100)/",
              "158x59":
                "MkXy8nWG1PTmy10uV9pUN_GCM5c=filters:format(jpg):quality(100)/",
              "274x103":
                "S5uGMO1YKE_3B0ZvuKSCrVStexY=filters:format(jpg):quality(100)/",
              "377x141":
                "2uSPzHhBj-AN6cN14YXEuKrMZ6A=filters:format(jpg):quality(100)/",
              "400x150":
                "FgBQI5WzED-PIA8Hv5vnbOw9RDs=filters:format(jpg):quality(100)/",
              "600x225":
                "0iBZB9cB7AH1hMw2WQvU6-ADu8o=filters:format(jpg):quality(100)/",
              "768x288":
                "VPobor0S3PaitTD7Y_o1UHVUhBU=filters:format(jpg):quality(100)/",
              "800x300":
                "EnSkm9Y6GErn0zGoaecRnK_96bI=filters:format(jpg):quality(100)/",
              "1024x384":
                "NaicmOeKSDGgZR78hR1irJPIoLU=filters:format(jpg):quality(100)/",
              "1440x540":
                "NV2S-V1C6W1W6wz0qVesYj3lij4=filters:format(jpg):quality(100)/",
              "1600x600":
                "AW8SfZsTGYn5IxZ5b_zVW2EJpSc=filters:format(jpg):quality(100)/",
              "84x0":
                "Foie1SI1tfroqZ_ZjTh8ubRzxdU=filters:format(jpg):quality(100)/",
              "105x0":
                "cf_wfUILjDaieugI9d0XV5pqQm4=filters:format(jpg):quality(100)/",
              "158x0":
                "9N0qg6q44RauxWSiR4-cfeREUkk=filters:format(jpg):quality(100)/",
              "274x0":
                "3vmK7mMo67k75r8AT1Kk0cj6YIw=filters:format(jpg):quality(100)/",
              "377x0":
                "1mOmVPj7nNiT2Xm2JaqpVu-oSxI=filters:format(jpg):quality(100)/",
              "400x0":
                "qLLMzmJSsQ32UfaebJg3Bk_Fwho=filters:format(jpg):quality(100)/",
              "600x0":
                "-wHxfK9NYKUd-l4NnjfecBMDGOE=filters:format(jpg):quality(100)/",
              "768x0":
                "0VrJUCrI2pedqS5m4lx1RJ86dJE=filters:format(jpg):quality(100)/",
              "800x0":
                "9v26MIH2u5NNMfOINGm4aav6rNs=filters:format(jpg):quality(100)/",
              "1024x0":
                "jP00tUdCT7xpasqaqmUgHLrqNVk=filters:format(jpg):quality(100)/",
              "1440x0":
                "suze6smiUXkILOf9P3bt69yVCvI=filters:format(jpg):quality(100)/",
              "1600x0":
                "R4DrBh0SSbCnEDJssKc9lgVhXQY=filters:format(jpg):quality(100)/",
            },
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline:
            "By the middle of June the parties at the house in Carlton Terrace were as frequent and as large as ever.",
          description:
            "She was so far successful that nobody thought of despising her parties. It was quite the thing to go to the Duchess's, whether at Richmond or in London. But people abused her and laughed at her. They said that she intrigued to get political support for her husband,—and, worse than that, they said that she failed.",
          by: [
            {
              name: "Guest Author",
            },
          ],
          publish_date: "2022-04-08T17:42:53.228Z",
          display_date: "2022-02-23T15:55:13.983Z",
          _id: "M76B3RVBDBGB3NGBSJHIJOVCQY",
          website_url:
            "/story/politics/2021/12/13/wonk-or-shill-how-the-lines-between-informed-guidance-and-undue-influence-become-blurred/",
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
          tags: [
            {
              description:
                "dedicated tag for hero stories to be excluded from data feeds on the HomePage",
              slug: "hero-home",
              text: "hero-home",
            },
          ],
          included_media_type: "",
          label: {},
        },
        {
          headline: "data vis test for baha",
          img: {
            url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/UBY27ZNCTFHUZMOZZPWKVGES7U.png",
            resized_params: {
              "84x56":
                "uRlhWmiXGuCbXSjiQN5qKbiqtcA=filters:format(png):quality(100)/",
              "105x70":
                "sKF71KUW4EgdoBohVl9AivgiAAo=filters:format(png):quality(100)/",
              "158x105":
                "pL8WBFd9XhQ7_tjB8EgdCaHDhjs=filters:format(png):quality(100)/",
              "274x183":
                "Iw1IUyw8Eh00DTO4fuE9vZZ4j5E=filters:format(png):quality(100)/",
              "377x251":
                "w_EJtA1FmFnw2tB-hghAIOu10lE=filters:format(png):quality(100)/",
              "400x267":
                "cTycIPZbgYPIwPoSmnX4LE_CZJo=filters:format(png):quality(100)/",
              "600x400":
                "kiFgU5domSDf2DSvKN9oOFbfesU=filters:format(png):quality(100)/",
              "768x512":
                "d_31JNjA3Mv7JUutu2-U0DLvQnw=filters:format(png):quality(100)/",
              "800x533":
                "BLVexXHc7vXy64m4nwmavxiqF6k=filters:format(png):quality(100)/",
              "1024x683":
                "svnUCcwuGpJnoF1neYuaufmNCyM=filters:format(png):quality(100)/",
              "1440x960":
                "51qzKNuzvgaeywyM7wKprW3rGaE=filters:format(png):quality(100)/",
              "1600x1067":
                "eLutifJtm9Ze-cGt7u5oHenHfiE=filters:format(png):quality(100)/",
              "84x63":
                "bIByn7pEahD7SqFviLQmerVPBnk=filters:format(png):quality(100)/",
              "105x79":
                "axeGxa_j0y3FrQo6gzJKUDUcmaU=filters:format(png):quality(100)/",
              "158x119":
                "vzYDZa_x__6pkZ38zAT4Z6dsUqU=filters:format(png):quality(100)/",
              "274x206":
                "IjgtwC6pWUZs-oEIYVVkPlUHB_U=filters:format(png):quality(100)/",
              "377x283":
                "ItIFkfbBYq0CStGK3WXr_2sVQX0=filters:format(png):quality(100)/",
              "400x300":
                "bVUnnymraUPiTqFz7uyMjAicLi0=filters:format(png):quality(100)/",
              "600x450":
                "6aUPWa9TdLfGt-VVrGF6HAkHqaw=filters:format(png):quality(100)/",
              "768x576":
                "tJWT1UU5FRgebOR4BcWBgl_-wiA=filters:format(png):quality(100)/",
              "800x600":
                "tX4HeV8yQInKi1jwc2JTeRVc-Yw=filters:format(png):quality(100)/",
              "1024x768":
                "5huH4ZRY058hNndXRV76YKqQZzE=filters:format(png):quality(100)/",
              "1440x1080":
                "Pj95ucd40BiCOwj8LnwpM9TBOeI=filters:format(png):quality(100)/",
              "1600x1200":
                "oaPg8vEDIko0EzXrDiIKkka37q8=filters:format(png):quality(100)/",
              "84x47":
                "gNnr4IuvDPm4MoVNwnJ88ui2o6k=filters:format(png):quality(100)/",
              "105x59":
                "qAbgJ6Gm4rw9UiOQECFI5zjJr0k=filters:format(png):quality(100)/",
              "158x89":
                "0yzbCvttNxUZB0YPDm1CxbInpAU=filters:format(png):quality(100)/",
              "274x154":
                "kJyqEqHw81fM_ZfVEie-2RYqey8=filters:format(png):quality(100)/",
              "377x212":
                "FJr12mVg1UEu41qjhZeOJCoHcB8=filters:format(png):quality(100)/",
              "400x225":
                "4etzz6rCu7xAL-HDFJusZjf8Nac=filters:format(png):quality(100)/",
              "600x338":
                "R2rz2b3u_YAEQxTEfxj83QfRTyA=filters:format(png):quality(100)/",
              "768x432":
                "Y7QBW47ikVmeSW7YHZCbZaRyrfM=filters:format(png):quality(100)/",
              "800x450":
                "J2lZmflMRuwaocBsvJ8pPEIY_Lo=filters:format(png):quality(100)/",
              "1024x576":
                "I5WN9AeQtDuzus00k3XTbXLjvuI=filters:format(png):quality(100)/",
              "1440x810":
                "OGIOHokYn6sEVKj_68CmPrI_v7s=filters:format(png):quality(100)/",
              "1600x900":
                "xWZ-nHauh8Z0PDCKwkJnVnLTdY0=filters:format(png):quality(100)/",
              "84x84":
                "WPME7GWFH5xdb-khz7iPjHWljq4=filters:format(png):quality(100)/",
              "105x105":
                "KjA8O_tG4skTUj6JMijHSITLgW0=filters:format(png):quality(100)/",
              "158x158":
                "MbwLxQRHYauE4SDjTSVjZjM8L6k=filters:format(png):quality(100)/",
              "274x274":
                "l2SREm8ZxYQJGmmo-ADMZLzBoFY=filters:format(png):quality(100)/",
              "377x377":
                "aQ0JO-FmX7VK3h-rIa7HvmcbBuc=filters:format(png):quality(100)/",
              "400x400":
                "L3lBhQoh0E_6kka1Is9ujdeUlUM=filters:format(png):quality(100)/",
              "600x600":
                "gRIG0wzRH705G9sO8ejWEFh2mrY=filters:format(png):quality(100)/",
              "768x768":
                "gy7PEawdE4GKyLLkJyfJ26ekt_E=filters:format(png):quality(100)/",
              "800x800":
                "V2ZTDyzdQLgYuBOHC7YydHYJhsA=filters:format(png):quality(100)/",
              "1024x1024":
                "SAahFHisszcgcP4ic2x0L7oyJH4=filters:format(png):quality(100)/",
              "1440x1440":
                "DSNPwrx9qu6RcZ4xB-Lh-N4VSvg=filters:format(png):quality(100)/",
              "1600x1600":
                "5ptf8shZQAgqtyu_QK02vdqNFB4=filters:format(png):quality(100)/",
              "84x32":
                "yYfCssPO1gVn3BbrgCCuk4x7Hps=filters:format(png):quality(100)/",
              "105x39":
                "2GCrR-cu86hkNIKQCgxB9qOaPcg=filters:format(png):quality(100)/",
              "158x59":
                "xK99dgB4y_GGRcSDVOp0Ao56d-A=filters:format(png):quality(100)/",
              "274x103":
                "8ylc_dfLBZzuaxqM6v_Ab9egHI8=filters:format(png):quality(100)/",
              "377x141":
                "hlXUqwrB_ayD0v4pruD-U3_Hwyw=filters:format(png):quality(100)/",
              "400x150":
                "cFT_D0rWEg5ZcHtABunbmTw0vsk=filters:format(png):quality(100)/",
              "600x225":
                "lseKAJxaOlXxK1j3Q8Az8yochVM=filters:format(png):quality(100)/",
              "768x288":
                "ZToZlIz8zCyXlMnnfXqLq3QAcLo=filters:format(png):quality(100)/",
              "800x300":
                "6KdDLygP4Rx6m_FC_fkfcTrCh7o=filters:format(png):quality(100)/",
              "1024x384":
                "AHHUwa9Wfi1Op1fT2nzVqKkYGq8=filters:format(png):quality(100)/",
              "1440x540":
                "2eaYsyzLFDT9WlKqtVB3dDnSxx8=filters:format(png):quality(100)/",
              "1600x600":
                "qKkhBYjgmL9IsIg4u0k13ODen80=filters:format(png):quality(100)/",
              "84x0":
                "n1abJ38GkmaiZj9fbwYQiHYguaA=filters:format(png):quality(100)/",
              "105x0":
                "HaFdDSnSM1b1IlUjXYRoGBdbBmg=filters:format(png):quality(100)/",
              "158x0":
                "l2QkjXdjU2eA1sKOalZ3FTiYw0U=filters:format(png):quality(100)/",
              "274x0":
                "rkV9nZcjlx3WxNhzUy-0r2vVA3I=filters:format(png):quality(100)/",
              "377x0":
                "WKr64pcjky9gld3iGI9bWS2R_xs=filters:format(png):quality(100)/",
              "400x0":
                "fju95SJhwohHbfP5ryuROlp_K2Q=filters:format(png):quality(100)/",
              "600x0":
                "XWu298xpUyrS4bMwTTVq663Y9L0=filters:format(png):quality(100)/",
              "768x0":
                "cIh_6j5-CR3CG5guyapUDPbtN8Y=filters:format(png):quality(100)/",
              "800x0":
                "7Bq6RMcVlbH9ep5jbIcfqjOeGhU=filters:format(png):quality(100)/",
              "1024x0":
                "8VNX1hjiejGxZhTabyVjn2XL3KU=filters:format(png):quality(100)/",
              "1440x0":
                "naHcZbZjgZaPAg39V5eoJtyjOiI=filters:format(png):quality(100)/",
              "1600x0":
                "OsoNXT58HaI-m8jEHmcYhouSdZI=filters:format(png):quality(100)/",
            },
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "",
          description: "description",
          by: [
            {
              name: "Tom Nagorski",
              id: "tom.nagorski",
            },
            {
              name: "Nikhil Kumar",
              id: "nikhil.kumar",
            },
            {
              name: "Kaila Philo",
              id: "kaila.philo",
            },
            {
              name: "Joshua Keating",
              id: "joshua.keating",
            },
          ],
          publish_date: "2022-03-15T17:15:14.597Z",
          display_date: "2022-02-03T16:13:28.541Z",
          _id: "YYLINW36JJAM7ICCKFT4NCLVVA",
          website_url: "/story/360-Debrief/2022/02/03/data-vis-test-for-baha/",
          primary_section: {
            _id: "/360-Debrief",
            _website: "the-summit",
            type: "section",
            version: "0.6.0",
            name: "360",
            description: "",
            path: "/360-Debrief",
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
      id: "32c5c0a789af1582c9f40b5a68f061373223be88648a98b3c7c0c8e5ec2646ec",
    },
    {
      cardsType: "EmailSubscriptionDropCard",
      alignment: "vertical",
      id: "1649768228592",
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
      result: [
        {
          headline: "Testingsd",
          img: {
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "asdf",
          description: "test",
          by: [
            {
              name: "Mae Decena",
              id: "mae.decena",
            },
          ],
          publish_date: "2022-04-06T15:02:55.028Z",
          display_date: "2022-04-06T15:02:55.028Z",
          _id: "V3LQIZUMLVANVF2KXIPX3YBIYY",
          website_url: "/story/technology/2022/04/06/testingsd/",
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
        {
          headline: "Test headline",
          img: {
            url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/CFMOAFDR2NB6NJUE2AMZN2WQVA.jpg",
            resized_params: {
              "84x56":
                "usLVNwabmaLTauILOKefbqz9xZA=filters:format(jpg):quality(100)/",
              "105x70":
                "fyLqFE7fT8dQK01pOdG_5wWC1S4=filters:format(jpg):quality(100)/",
              "158x105":
                "2CvicXrktPW7-YBrdIoXvYuz-PU=filters:format(jpg):quality(100)/",
              "274x183":
                "wOrc1D1wmW2P-YrOQRcbdy6DV58=filters:format(jpg):quality(100)/",
              "377x251":
                "6gbkYgITgJ24pX2GaDtY7Np1vdw=filters:format(jpg):quality(100)/",
              "400x267":
                "uvBbAAI29SV1HAj4xxvL_4aRtC0=filters:format(jpg):quality(100)/",
              "600x400":
                "zxPs21KKGkeLv2GCF-vIxZ_qlJ0=filters:format(jpg):quality(100)/",
              "768x512":
                "pTgFt87vSKaZ2W7Y29XRwVknk2k=filters:format(jpg):quality(100)/",
              "800x533":
                "ybKSPEm7o-DCQ9McCzHa5tEcf3s=filters:format(jpg):quality(100)/",
              "1024x683":
                "evqMmhXV4U6bbVAiGxKXBrwLRE8=filters:format(jpg):quality(100)/",
              "1440x960":
                "q0_A1gWqS3sUsH15jy_dqndtg2s=filters:format(jpg):quality(100)/",
              "1600x1067":
                "b4fIXQsru8V8gRX-dOoBl39eEfM=filters:format(jpg):quality(100)/",
              "84x63":
                "mqHnMuKny8wnuSqnBWpMQDXMP9E=filters:format(jpg):quality(100)/",
              "105x79":
                "f3BDa_Gbhb-bY5FAVQATW9sIPak=filters:format(jpg):quality(100)/",
              "158x119":
                "nUH3Ie0AK9HCS2DNauFB-ZUooH0=filters:format(jpg):quality(100)/",
              "274x206":
                "ReJxibqdMbmDPyXEQJ9uDjTYp-0=filters:format(jpg):quality(100)/",
              "377x283":
                "tNVn53B0ajOGE4rwRoCHEg-zxg0=filters:format(jpg):quality(100)/",
              "400x300":
                "lGX-fJGyuPBCUu3ABQ-f_fXPkyY=filters:format(jpg):quality(100)/",
              "600x450":
                "kM0MaRJuj8S9iDGPoPBxAsvvWeM=filters:format(jpg):quality(100)/",
              "768x576":
                "GlWU3DgfSDpjX6__c1x-uoi8Duo=filters:format(jpg):quality(100)/",
              "800x600":
                "mbcCFBHAvDtVg-WvtRglYlGoozI=filters:format(jpg):quality(100)/",
              "1024x768":
                "t9iRpC5h6GsIi3QARcVYUvi0tko=filters:format(jpg):quality(100)/",
              "1440x1080":
                "4ZzhXg--hfSJ6YPp5dnNQ7Jaejk=filters:format(jpg):quality(100)/",
              "1600x1200":
                "b2QFt87TVVgu5UheQjerBq72nQU=filters:format(jpg):quality(100)/",
              "84x47":
                "1Pwvg6Z8fzM5mpCgxtfed9IEFOY=filters:format(jpg):quality(100)/",
              "105x59":
                "UbL-qaii7ZpIkhmggW9mMFo-UUw=filters:format(jpg):quality(100)/",
              "158x89":
                "z8cq_4kDfVhW8LYYFpqa0v0MbCo=filters:format(jpg):quality(100)/",
              "274x154":
                "mTgvtyhvDE_kGZT5LW4020fdGG0=filters:format(jpg):quality(100)/",
              "377x212":
                "tf1JjYlS86E-aIJ3SiPzBh39_pQ=filters:format(jpg):quality(100)/",
              "400x225":
                "17RfYqbiNBEglmz2ALa7rt18LEY=filters:format(jpg):quality(100)/",
              "600x338":
                "PbARXqyGKqjTbW5oBwrF2Q0K9YE=filters:format(jpg):quality(100)/",
              "768x432":
                "_jiV7QhUdaorCn6sizpRrBkZZW0=filters:format(jpg):quality(100)/",
              "800x450":
                "MaWTGNuf9y6mmZDGTKYMmNXajuU=filters:format(jpg):quality(100)/",
              "1024x576":
                "4OeQ0EUw1arFu8mN__UU2AmDuXg=filters:format(jpg):quality(100)/",
              "1440x810":
                "agt7_w1WlYgmnUrocOoQsgUMhdQ=filters:format(jpg):quality(100)/",
              "1600x900":
                "ErSX-GPII0jEJo5PyBivGrc6ObU=filters:format(jpg):quality(100)/",
              "84x84":
                "JGpKkZpXdwqz8cG8erlv6yumtn8=filters:format(jpg):quality(100)/",
              "105x105":
                "hsZy21YmRK4FM2wkQ9ySdhlJVwc=filters:format(jpg):quality(100)/",
              "158x158":
                "q-7T2M17PtbfNumnG-M4PwBEbk0=filters:format(jpg):quality(100)/",
              "274x274":
                "iHexkX_ZwVL47v6yL1MmxFzcMCA=filters:format(jpg):quality(100)/",
              "377x377":
                "iZcK0503Dtb3DUBwEM59etjuJ8o=filters:format(jpg):quality(100)/",
              "400x400":
                "n2z3GrrulpQfXP4BYPZlwDGiOCc=filters:format(jpg):quality(100)/",
              "600x600":
                "_44Kd0bE9to04S-x8R_8oXobFMU=filters:format(jpg):quality(100)/",
              "768x768":
                "PAW-cjur9KjdNAc_qmubXyybZuE=filters:format(jpg):quality(100)/",
              "800x800":
                "KB1awViGVkGpfnqDZG58ymK-ouA=filters:format(jpg):quality(100)/",
              "1024x1024":
                "7b38t0RguDkhob1K1Hcru22sdfs=filters:format(jpg):quality(100)/",
              "1440x1440":
                "MvzUKvTsLSf7uSesmqeV7GgItZU=filters:format(jpg):quality(100)/",
              "1600x1600":
                "xMwWLtirLLO8r8a-0edE9vYjCUY=filters:format(jpg):quality(100)/",
              "84x32":
                "pWaOhm9RPDhEpwb_OlgEYp15Hpk=filters:format(jpg):quality(100)/",
              "105x39":
                "nx12F-R5cacKOSF6NWjt5ddBv2A=filters:format(jpg):quality(100)/",
              "158x59":
                "VYtjh8dtvDtwdNXYf8v6Vjq2G78=filters:format(jpg):quality(100)/",
              "274x103":
                "xaSvby_vYYSGKULc3sM5180Qecc=filters:format(jpg):quality(100)/",
              "377x141":
                "Tl5VWN64LEzOvsciYQZGpPDgzEk=filters:format(jpg):quality(100)/",
              "400x150":
                "MwejYUpibHRzTeYzmz3aYYPWfC8=filters:format(jpg):quality(100)/",
              "600x225":
                "o79d8EnKCCo602ogf3ZMHRRjxaE=filters:format(jpg):quality(100)/",
              "768x288":
                "02SUc1M3dxMttICqDZVALQBakW8=filters:format(jpg):quality(100)/",
              "800x300":
                "ei2an-AEM1HcFh3iKL-gCrHDAUo=filters:format(jpg):quality(100)/",
              "1024x384":
                "GFdlgsHjVX_CRT1PqXN3iQP5R70=filters:format(jpg):quality(100)/",
              "1440x540":
                "knJUyAnN7Hf0ExPAY3vAnTre5ng=filters:format(jpg):quality(100)/",
              "1600x600":
                "tJgJ4dQjWyTcF8G9Uyptw0YrDXE=filters:format(jpg):quality(100)/",
              "84x0":
                "G7WylCXe4Qc1XXCd31e3DFHGvtk=filters:format(jpg):quality(100)/",
              "105x0":
                "alyBUdFCkjvsz52b5peesEqg9gU=filters:format(jpg):quality(100)/",
              "158x0":
                "Mw4BBq1FqN6nx9QEmcsCrjUcV5o=filters:format(jpg):quality(100)/",
              "274x0":
                "wI0rco9DU7LYU4B_4GYd10Nxf2M=filters:format(jpg):quality(100)/",
              "377x0":
                "AjUnCVQUpxvNOHeZx8M7ErYlT3E=filters:format(jpg):quality(100)/",
              "400x0":
                "dY3IVuZ3pjWIztQTqnZsXHs4mfs=filters:format(jpg):quality(100)/",
              "600x0":
                "-t3sIQRrt0-iLlX7CiwEywIuBnM=filters:format(jpg):quality(100)/",
              "768x0":
                "E3GeMrwQgOUS3zNMutC-ZVgyQ1k=filters:format(jpg):quality(100)/",
              "800x0":
                "U4Z4uEVG1Fm4l5Qdec3f2rmJCpw=filters:format(jpg):quality(100)/",
              "1024x0":
                "Zaash1MP-MXmFeSvR38NXw1YJUs=filters:format(jpg):quality(100)/",
              "1440x0":
                "kt_95EbfIcPYaVxyslcxmcD83G0=filters:format(jpg):quality(100)/",
              "1600x0":
                "W3lNAruB1RLpn40OjM_bDvbdKVI=filters:format(jpg):quality(100)/",
            },
            resizerURL: "https://www.grid.news/resizer",
          },
          subheadline: "Subheadline",
          description: "description",
          by: [
            {
              name: "Dominique Lee",
              id: "dom.lee",
            },
            {
              name: "Morgan Richardson",
              id: "morgan.richardson",
            },
          ],
          publish_date: "2022-04-08T16:42:25.574Z",
          display_date: "2021-12-28T21:32:22.076Z",
          _id: "JNBGL4TZS5ALNH32X27KYBIKLI",
          website_url: "/story/technology/2021/12/28/test-headline-2/",
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
          tags: [
            {
              description: "Biden Administration",
              slug: "biden-administration",
              text: "Biden Administration",
            },
            {
              description: "Afghanistan",
              slug: "afghanistan",
              text: "Afghanistan",
            },
          ],
          included_media_type: "",
          label: {},
        },
      ],
      id: "01055e33fd23f154d8260fb22ee85794e28586e8e66461854cb87ffbb743259e",
    },
  ];
};
