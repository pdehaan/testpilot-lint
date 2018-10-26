module.exports = {
  type: "object",
  properties: {
    addon_id: { type: "string" },
    android_url: { type: "string", format: "uri" },
    bug_report_url: { type: "string" },
    changelog_url: { type: "string" },
    completed: { type: "string", format: "date-time" },
    contribute_url: { type: "string" },
    contributors: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            display_name: { type: "string" },
            avatar: { type: "string" },
            title: { type: "string" }
          },
          required: ["display_name", "avatar"]
        }
      ],
      minItems: 1
    },
    contributors_extra: { type: "string" },
    contributors_extra_url: { type: "string", format: "uri" },
    created: { type: "string", format: "date-time" },
    description: { type: "string" },
    description_l10nsuffix: { type: "string" },
    details: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            image: { type: "string" },
            copy: { type: "string" }
          },
          required: ["image", "copy"]
        }
      ]
    },
    dev: { type: "boolean" },
    discourse_url: { type: "string" },
    eol_warning: { type: "string" },
    gradient_center: { type: "string" },
    gradient_start: { type: "string" },
    gradient_stop: { type: "string" },
    graduation_url: { type: "string", format: "uri" },
    id: { type: "integer" },
    image_facebook: { type: ["string", "null"] },
    image_twitter: { type: ["string", "null"] },
    introduction: { type: "string" },
    incompatible: { type: "object" },
    introduction_l10nsuffix: { type: "string" },
    ios_url: { type: "string", format: "uri" },
    is_featured: { type: "boolean" },
    launch_date: { type: "string", format: "date-time" },
    legal_notice: { type: "string" },
    legal_notice_l10nsuffix: { type: "string" },
    locales: { type: "array", items: { type: "string" } },
    locale_blocklist: { type: "array", items: { type: "string" } },
    locale_grantlist: { type: "array", items: { type: "string" } },
    measurements: {
      type: "array",
      items: [{ type: "string" }]
    },
    max_release: { type: "integer" },
    measurements_l10nsuffix: { type: "string" },
    min_release: { type: ["integer", "null"] },
    modified: { type: "string", format: "date-time" },
    news_updates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          link: { type: "string", format: "uri" },
          created: { instanceof: "Date" },
          published: { instanceof: "Date" },
          dev: { type: "boolean" },
          content: { type: "string" }
        },
        required: [
          "slug",
          "title",
          "link",
          "created",
          "published",
          "content",
          "dev"
        ]
      }
    },
    order: { type: "integer" },
    platforms: {
      type: "array",
      items: [{ type: "string", enum: ["addon", "android", "ios", "web"] }],
      minItems: 1,
      uniqueItems: true
    },
    pre_feedback_copy: { type: ["string", "null"] },
    pre_feedback_image: { type: ["string", "null"] },
    privacy_notice_url: { type: "string", format: "uri" },
    privacy_preamble: { type: "string" },
    slug: { type: "string" },
    subtitle: { type: "string" },
    testpilot_options: {
      type: "object",
      properties: {
        ratings: { type: "string", enum: ["disabled"] }
      }
    },
    thumbnail: { type: "string" },
    title: { type: "string" },
    tour_steps: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            copy: { type: "string" },
            image: { type: "string" }
          }
        }
      ]
    },
    uninstalled: {
      type: "string",
      format: "date-time"
    },
    video_url: {
      type: "string",
      format: "uri"
    },
    warning: { type: "string" },
    warning_l10nsuffix: { type: "string" },
    web_url: { type: "string", format: "uri" },
    xpi_url: {
      type: "string",
      format: "uri"
    }
  },
  additionalProperties: false,
  required: ["id", "order", "image_facebook", "image_twitter", "slug", "title"]
};
