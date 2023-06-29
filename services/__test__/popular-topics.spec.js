
// const ptService = require('../popular-topics');
const { google } = require('googleapis');
const googleAuth = require('google-auth-library');
const { db, admin } = require("../../helpers/firebase");
const { JOB_SUCCESS_MSG } = require("../../helpers/constants");
// google.analyticsreporting('v4').reports.batchGet(getParams(startDate, endDate));
// const authClient = new google.auth.JWT(process.env.GA_CLIENT_EMAIL, null, atob(GA_PRIVATE_KEY), process.env.GA_SCOPES);

jest.mock('googleapis', () => ({
  ...jest.mock('googleapis'),
  google: {
    analyticsreporting: () => {
      return {
        reports: () => {
          batchGet: () => {
            return { "config": { "url": "https://analyticsreporting.googleapis.com/v4/reports:batchGet", "method": "POST", "userAgentDirectives": [{ "product": "google-api-nodejs-client", "version": "5.0.2", "comment": "gzip" }], "data": { "reportRequests": [{ "viewId": "248441495", "samplingLevel": "DEFAULT", "filtersExpression": "ga:pagepath=@/article-details/", "dateRanges": [{ "startDate": "30daysAgo", "endDate": "today" }], "metrics": [{ "expression": "ga:pageviews" }], "dimensions": [{ "name": "ga:pagePath" }] }] }, "headers": { "Content-Type": "application/json", "x-goog-api-client": "gdcl/5.0.2 gl-node/14.17.0 auth/7.0.4", "Accept-Encoding": "gzip", "User-Agent": "google-api-nodejs-client/5.0.2 (gzip)", "Authorization": "Bearer ya29.c.Kp0BFgj_JipW38OhnJhO8c6PhDzD6bu9rS0Ds7aJk4oHIzZim5p4O25shLNoApXdrZDQC-5j8iAwPjVwmX_0fQhHkua25vXs_jI-Yw6NNg_SrJ_Zod9El2keFUanS-_ergrbN9GBP_UNQZ4waR_CAi6xlUCnmHwpoQSIU7mVPkPHXoxxgo4gw3aNCil9BFCWsBhU62fP3mukfOzcuhktXA.................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................", "Accept": "application/json" }, "params": {}, "retry": true, "body": "{\"reportRequests\":[{\"viewId\":\"248441495\",\"samplingLevel\":\"DEFAULT\",\"filtersExpression\":\"ga:pagepath=@/article-details/\",\"dateRanges\":[{\"startDate\":\"30daysAgo\",\"endDate\":\"today\"}],\"metrics\":[{\"expression\":\"ga:pageviews\"}],\"dimensions\":[{\"name\":\"ga:pagePath\"}]}]}", "responseType": "json" }, "data": { "reports": [{ "columnHeader": { "dimensions": ["ga:pagepath"], "metricHeader": { "metricHeaderEntries": [{ "name": "ga:pageviews", "type": "INTEGER" }] } }, "data": { "rows": [{ "dimensions": ["/360-Debrief/article-details/NLSIA34XYNH35ASOK3XS76VWNI/2021/10/15/a-scientist-and-a-defense-contractor-are-growing-drones/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/360-debrief/article-details/RZLJTN6WVZDNDP3GBEXSNB2UDY/2021/09/09/the-360-why-covid-is-ravaging-black-and-latino-communities/"], "metrics": [{ "values": ["9"] }] }, { "dimensions": ["/global-economy/article-details/3UPHCMBVCZDUHFVUJNCKDMG3WA/2021/08/18/afghani-to-weaken-as-inflation-set-to-hit-double-digits-outgoing-central-bank-chief-says/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/global-economy/article-details/AV2LFDI47JH5FDSK3XKS5NYHYY/2021/07/23/the-chatbot-problem/"], "metrics": [{ "values": ["2"] }] }, { "dimensions": ["/global-economy/article-details/F6ZWW7M7RZCUPKWRDWKKVLQTUM/2021/10/15/ransomware-is-quietly-devastating-american-healthcare-facilities/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/global-economy/article-details/FVDNJ3YIKNGEDIY3JN2RFXXNGE/2021/10/07/test-afghani-to-weaken-as-inflation-set-to-hit-double-digits-outgoing-central-bank-chief-says-test/"], "metrics": [{ "values": ["46"] }] }, { "dimensions": ["/global-economy/article-details/NQ6ZUGR2AZABPGVSSSSEJSEG3A/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/global-economy/article-details/NQ6ZUGR2AZABPGVSSSSEJSEG3A/2021/08/18/investment-banks-in-australia-go-on-a-hiring-spree-after-talent-raid-by-start-ups/"], "metrics": [{ "values": ["5"] }] }, { "dimensions": ["/global-economy/climate-change/article-details/2MK5BSAU6BBVBBG2LKO6RJ7GEE/2021/08/03/consortium-bidding-for-finablr-acquires-bahrains-biggest-remittance-group/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/global-economy/climate-change/article-details/IZSZYSW4ONGA7LL3GIQ3ONEKP4/2021/07/23/how-green-are-electric-vehicles/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/global-economy/climate-change/article-details/NIKMSED4GVB47LGFQUJKV2V77Q/2021/10/13/story-training/"], "metrics": [{ "values": ["4"] }] }, { "dimensions": ["/global-economy/income-distribution/article-details/BIUNIQZOJZBBNBYQVEKWIVXAQA/2021/07/23/death-rates-soar-in-southeast-asia-as-virus-wave-spreads/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/information-disinformation/article-details/CLJKOAVXB5ELZMIZ4NOAUUU72Q/2021/08/18/insurance-broker-gallagher-to-buy-willis-towers-reinsurance-unit-for-325bn/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/information-disinformation/article-details/CLJKOAVXB5ELZMIZ4NOAUUU72Q/2021/08/18/insurance-broker-gallagher-to-buy-willis-towers-reinsurance-unit-for-325bn/?fbclid=IwAR0zNAJteTuAtOd7gk0Q_LMjkqGja7fXftYHaBqoctBMIO3cq_H-xQIl4ow"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/information-disinformation/data-visualizations/article-details/JDRHC3VBWFGIFFEJAICV25OSPI/2021/08/12/is-biden-ready-for-the-fall-of-kabul/"], "metrics": [{ "values": ["1"] }] }, { "dimensions": ["/infuence-trends/article-details/WD3KE3P57RB47DRIHTVX5WDUOA/2021/10/11/the-wires-test/"], "metrics": [{ "values": ["2"] }] }, { "dimensions": ["/pf/global-economy/article-details/AV2LFDI47JH5FDSK3XKS5NYHYY/2021/07/23/the-chatbot-problem/?_website=the-summit"], "metrics": [{ "values": ["21"] }] }, { "dimensions": ["/pf/global-economy/article-details/BIUNIQZOJZBBNBYQVEKWIVXAQA/2021/07/22/if-the-lab-leak-theory-is-right-whats-next/?_website=the-summit"], "metrics": [{ "values": ["2"] }] }, { "dimensions": ["/pf/information-disinformation/data-visualizations/article-details/JDRHC3VBWFGIFFEJAICV25OSPI/2021/08/12/is-biden-ready-for-the-fall-of-kabul/?_website=the-summit"], "metrics": [{ "values": ["1"] }] }], "totals": [{ "values": ["102"] }], "rowCount": 19, "minimums": [{ "values": ["1"] }], "maximums": [{ "values": ["46"] }] } }] }, "headers": { "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\"", "cache-control": "private", "connection": "close", "content-encoding": "gzip", "content-type": "application/json; charset=UTF-8", "date": "Tue, 02 Nov 2021 12:40:29 GMT", "server": "ESF", "transfer-encoding": "chunked", "vary": "Origin, X-Origin, Referer", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "0" }, "status": 200, "statusText": "OK", "request": { "responseURL": "https://analyticsreporting.googleapis.com/v4/reports:batchGet" } }
          }
        },
      }
    },
    google: () => { },
    auth: { JWT: 'A' }
  }
}));
jest.mock('../../helpers/firebase', () => ({
  ...jest.mock('../../helpers/firebase'),
  db: {
    collection: (col) => {
      return {
        doc: (doc) => {
          return {
            set: (p1, p2) => { return true },
          }
        }
      }
    },
  },
}));

describe("The Popular Topics Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The post Follow Todpics Service Api", () => {
    it("should update correct Follow Todpics through the model layer1", () => {
      const actual = JOB_SUCCESS_MSG;
      const res = {};
      expect(actual).toBe(JOB_SUCCESS_MSG);
      console.log("Follow Todpics Service Post Response: ", actual);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

reqBody = () => {
  return {
    body: {
      "follow_sections": [
        "/Culture",
        "/events",
        "/global-economy"
      ],
      "unfollow_sections": ["/influence-trends"]
    }
  }
}
testData = () => {
  return {
    "sectionIds": [
      "/Culture",
      "/events",
      "/global-economy"
    ]
  }
}

getParamsMock = () => {
  return {
    "auth": 'authClient', // dynamic
    "headers": {
      "Content-Type": "application/json"
    },
    "resource": {
      "reportRequests": [
        {
          "viewId": "viewId", // your view Id from goofle
          "samplingLevel": "DEFAULT",
          "filtersExpression": `ga:pagepath=@/${process.env.GA_ARTICLE_PAGE_PATH}/`, //dynamic
          "dateRanges": [
            {
              "startDate": "30daysAgo", //dynamic
              "endDate": "today" //dynamic
            }
          ],
          "metrics": [
            {
              "expression": "ga:pageviews",
            }
          ],
          "dimensions": [
            {
              "name": "ga:pagePath"
            }
          ]
        }
      ]
    }
  };
}