const router = require("express").Router();
const { healthCheck } = require("../apis/business").businessCtrl;
const appConfigRoutes = require("./app-config");
const webhookOptinmonsterRoutes = require("../routes/webhook-optinmonster");
const followedSectionssRoutes = require("../routes/followed-sections");
const newsletterRoutes = require("../routes/newsletter");
const newsletterSubsRoutes = require("./newsletter-subs");
const popularTopicsRoutes = require("../routes/popular-topics");
const articleBookmarkRoutes = require("../routes/artcles-bookmark");
const mockRoutes = require("../routes/mocks");
const attendEventRoutes = require("../routes/attend-event");
const recommendedVideosRoutes = require("../routes/recommended-videos");
const listRoutes = require("../routes/list");
const emailprefsRoutes = require("../routes/email-prefs");
const eventRoutes = require("../routes/events");
const userRoutes = require("../routes/user");
const notifPrefsRoutes = require("../routes/notif-prefs");
const webhookNotificationRoutes = require("./webhook-notification");
const webhookMailchimpRoutes = require("./webhook-mailchimp");
const newsTipRoutes = require("./newstip");
const adminStatsRoutes = require("./admin-stats");

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
router.use("/news-letter", newsletterSubsRoutes);
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
router.use("/webhook-notification", webhookNotificationRoutes);
router.use("/webhook-mailchimp", webhookMailchimpRoutes);
router.use("/newstip", newsTipRoutes);
router.use("/admin-stats", adminStatsRoutes);

module.exports = router;
