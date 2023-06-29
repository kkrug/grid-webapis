const router = require("express").Router();
const { healthCheck } = require("..//apis/business").businessCtrl;
const webhookOptinmonsterRoutes = require("./webhook-optinmonster");
const followedSectionssRoutes = require("./followed-sections");
const newsletterRoutes = require("./newsletter");
const popularTopicsRoutes = require("./popular-topics");
const articleBookmarkRoutes = require("./artcles-bookmark");
const mockRoutes = require("./mocks");
const attendEventRoutes = require("./attend-event");
const recommendedVideosRoutes = require("./recommended-videos");
const listRoutes = require("./list");
const emailprefsRoutes = require("./email-prefs");
const eventRoutes = require("./events");
const appConfigRoutes = require("./app-config");
const userRoutes = require("./user");
const notifPrefsRoutes = require("./notif-prefs");

// Defined health route
router.route("/health").get(healthCheck);
/**
 * @swagger
 * tags: 
 *    name: Webhook Optinmaster - MailChimp 
 *    description: Webhook for Optinmaster
 */
 router.use("/webhook-optinmonster", webhookOptinmonsterRoutes);
/**
 * @swagger
 * tags: 
 *    name: Follow Sections
 *    description: Following the sections
 */
router.use("/followed-sections", followedSectionssRoutes);
/**
 * @swagger
 * tags: 
 *    name: News Letter
 *    description: News Letter Subscription
 */
router.use("/newsletter", newsletterRoutes);
/**
 * @swagger
 * tags: 
 *    name: Popular Topics
 *    description: Topics based on popularity
 */
router.use("/popularTopics", popularTopicsRoutes);
/**
 * @swagger
 * tags: 
 *    name: Article Bookmark
 *    description: User's Bookmarked Articles
 */
router.use("/article-bookmark", articleBookmarkRoutes);
/**
 * @swagger
 * tags: 
 *    name: Mocks
 *    description: Mock Api's
 */
router.use("/mock", mockRoutes);
/**
 * @swagger
 * tags: 
 *    name: Event Attend
 *    description: Events attended by user
 */
router.use("/event-attend", attendEventRoutes);
/**
 * @swagger
 * tags: 
 *    name: Recommended Videos
 *    description: Videos recommended based on popularity
 */
router.use("/recommended-videos", recommendedVideosRoutes);
/**
 * @swagger
 * tags: 
 *    name: List
 *    description: User's List
 */
router.use("/list", listRoutes);
/**
 * @swagger
 * tags: 
 *    name: Email Prefs
 *    description: User's Email Preferences
 */
router.use("/email-prefs", emailprefsRoutes);
/**
 * @swagger
 * tags: 
 *    name: Events
 *    description: Events
 */
router.use("/events", eventRoutes);
/**
 * @swagger
 * tags: 
 *    name: App Config
 *    description: Application level configurations
 */
router.use("/app-config", appConfigRoutes);
/**
 * @swagger
 * tags: 
 *    name: User
 *    description: User's preferences
 */
router.use("/user", userRoutes);
/**
 * @swagger
 * tags: 
 *    name: Notification Prefs
 *    description: User's Notification Preferences
 */
router.use("/notif-prefs", notifPrefsRoutes);

module.exports = router;
