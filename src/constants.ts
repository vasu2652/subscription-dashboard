
const group_plan_schema = require('./schema/GP-SCHEMA.json')
const group_plan_uischema = require('./schema/GP-UISCHEMA.json')
const group_schema = require('./schema/GROUP-SCHEMA.json');
const group_uischema = require('./schema/GROUP-UISCHEMA.json');
const banners_schema = require('./schema/GB-SCHEMA.json')
const banners_uischema = require('./schema/GB-UISCHEMA.json')
const benefits_schema = require('./schema/SI-SCHEMA.json')
const benefits_uischema = require('./schema/SI-UISCHEMA.json')
export const queries: { [key: string]: string } = {
  group: `query GetAllGroup {
        GetAllGroup {
          code
          message
          response {
            _id
            name
            start_date
            end_date
            is_active
          }
        }
      }`,
  group_plan: `query GetAllGroupPlan {
        GetAllGroupPlan {
          code
          message
          response {
            _id
            name
            plan_id
            plan_selling_type
            one_apollo_mapping
            activation_modes
            plan_summary
            status
            start_date
            end_date
            coupons
            group_id
            group{
              _id
              name
            }
          }
        }
      }`,
  banners: `query GetAllGroupBanners{
        GetAllGroupBanners{
          code
          message
          response {
            _id
            banner
            is_active
            cta_action_formated
            meta
            banner_context
            banner_template_info_formated
            banner_visibility_mode
            visible_duration
            priority
            start_date
            end_date
            meta
            group_id
          }
        }
      }`,
  benefits: `query GetAllSubscriptionInclusions{
        GetAllSubscriptionInclusions{
          code
          success
          response{
            _id
            attribute
            attribute_category
            attribute_type
            header_content
            description
            cta_label
            cta_action
            available_count
            refresh_frequency
            icon
            group_plan_id
          }
        }
      }`
};
export const mappings: { [key: string]: any } = {
  group: {
    response: "GetAllGroup",
    headers: ["name", "start_date", "end_date", "is_active"],
    uischema:group_uischema,
    schema:group_schema
  },
  group_plan: {
    response: "GetAllGroupPlan",
    headers: ["name", "plan_id", "plan_selling_type", "one_apollo_mapping"],
    uischema:group_plan_uischema,
    schema:group_plan_schema
  },
  banners: {
    response: "GetAllGroupBanners",
    headers: [
      "banner_context",
      "banner_visibility_mode",
      "is_active",
      "cta_action_formated",
      "banner_template_info_formated",
    ],
    uischema:banners_uischema,
    schema:banners_schema
  },
  benefits: {
    response: "GetAllSubscriptionInclusions",
    headers: [
      "attribute",
      "header_content",
      "description",
      //"attribute_category",
      "attribute_type",
      "cta_label",
      "cta_action",
      "available_count",
      "refresh_frequency",
    ],
    uischema:benefits_uischema,
    schema:benefits_schema
  },
};
