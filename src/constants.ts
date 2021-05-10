
const group_plan_schema = require('./schema/GP-SCHEMA.json');
const group_plan_uischema = require('./schema/GP-UISCHEMA.json');
const group_schema = require('./schema/GROUP-SCHEMA.json');
const group_uischema = require('./schema/GROUP-UISCHEMA.json');
const banners_schema = require('./schema/GB-SCHEMA.json');
const banners_uischema = require('./schema/GB-UISCHEMA.json');
const benefits_schema = require('./schema/SI-SCHEMA.json');
const benefits_uischema = require('./schema/SI-UISCHEMA.json');
const subscription_schema = require('./schema/US-SCHEMA.json');
const subscription_uischema = require('./schema/US-UISCHEMA.json');
const transaction_schema = require('./schema/UST-SCHEMA.json');
const transaction_uischema = require('./schema/UST-UISCHEMA.json');

export const QueryDefinations: { [key: string]: string } = {
  group: `query GetAllGroup($skip:Int, $take:Int) {
        GetAllGroup(skip:$skip, take: $take) {
          code
          message
          count
          response {
            _id
            name
            start_date
            end_date
            is_active
            readable_id
          }
        }
      }`,
  group_plan: `query GetAllGroupPlan($skip:Int, $take:Int) {
        GetAllGroupPlan(skip:$skip, take: $take) {
          code
          message
          count
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
            readable_id
            group{
              _id
              name
            }
          }
        }
      }`,
  banners: `query GetAllGroupBanners($skip:Int, $take:Int) {
        GetAllGroupBanners(skip:$skip, take: $take) {
          code
          message
          count
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
  benefits: `query GetAllSubscriptionInclusions($skip:Int, $take:Int) {
        GetAllSubscriptionInclusions(skip:$skip, take: $take) {
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
            priority
          }
        }
      }`,
  subscriptions:`query GetAllUserSubscriptions($skip:Int, $take:Int){
    GetAllUserSubscriptions(skip:$skip, take:$take) {
      code
      success
      message
      count
      response{
        _id
        mobile_number
        status
        start_date
        end_date
        expires_in
        payment_reference
        deactivation_date
        transaction_date_time
        order_id
        group_plan_id
        plan_id
        source_meta_data
        sub_plan_id
        
      }
    }
  }`,
  transactions:`query GetAllUserSubscriptionTransactions($skip:Int, $take:Int){
    GetAllUserSubscriptionTransactions(skip:$skip, take:$take) {
      code
      success
      message
      count
      response{
        _id
        mobile_number
        amount
        source_transaction_indentifier
        transaction_type
        transaction_date
        payment_reference
        created_at
        updated_at
        version
      }
    }
  }`,
  search_group_by_name: `query GetAllGroupsMatchingName($pattern:String!, $skip:Int, $take:Int){
    GetAllGroupsMatchingName(pattern:$pattern, skip:$skip, take: $take) {
      code
      message
      count
      response {
        _id
        name
        start_date
        end_date
        is_active
      }
    }
  }`,
  search_group_plan_by_planId: `query GetAllGroupPlansMatchingPlanId($pattern:String!, $skip:Int, $take:Int){
    GetAllGroupPlansMatchingPlanId(pattern:$pattern, skip:$skip, take: $take) {
      code
          message
          count
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
  search_subscriptions_by_mobile:`query GetAllUserSubscriptionsByMobile($skip:Int, $take:Int, $pattern:String!){
    GetAllUserSubscriptionsByMobile(skip:$skip, take:$take, pattern:$pattern){
      code
      success
      message
      count
      response{
        _id
        mobile_number
        status
        start_date
        end_date
        expires_in
        payment_reference
        created_at
        updated_at
        deactivation_date
        transaction_date_time
        order_id
        version
        plan_id
        group_plan_id
      }
    }
  }`,
  search_transactions_by_mobile:`query GetAllUserSubscriptionTransactionsByMobile($skip:Int, $take:Int, $pattern:String!){
    GetAllUserSubscriptionTransactionsByMobile(skip:$skip, take:$take, pattern:$pattern){
      code
      success
      message
      count
      response{
        _id
        mobile_number
        amount
        source_transaction_indentifier
        transaction_type
        transaction_date
        payment_reference
        created_at
        updated_at
        version
      }
    }
  }`,
  get_subscription_count_by_status:`query GetSubscriptionCountByStatus{
    GetSubscriptionCountByStatus{
      code
      success
      response
    }
  }`
};

export const QueryMetaMapper: { [key: string]: any } = {
  group: {
    response: "GetAllGroup",
    headers: ["name", "start_date", "end_date", "is_active"],
    uischema: group_uischema,
    schema: group_schema,
    search: {
      label: "Name",
      helperText: "Enter Group Name",
      searchBy: "search_group_by_name"
    }
  },
  search_group_by_name:{
    response: "GetAllGroupsMatchingName"
  },
  group_plan: {
    response: "GetAllGroupPlan",
    headers: ["name", "plan_id", "plan_selling_type", "one_apollo_mapping"],
    uischema: group_plan_uischema,
    schema: group_plan_schema,
    search: {
      label: "Plan ID",
      helperText: "Enter PlanID",
      searchBy: "search_group_plan_by_planId"
    }
  },
  search_group_plan_by_planId:{
    response: "GetAllGroupPlansMatchingPlanId"
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
    uischema: banners_uischema,
    schema: banners_schema,
    search: {
      label: "Banner",
      helperText: "Enter Banner Name"
    }
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
    uischema: benefits_uischema,
    schema: benefits_schema,
    search: {
      label: "Attribute",
      helperText: "Enter Attribute Name"
    }
  },
  subscriptions:{
    response: "GetAllUserSubscriptions",
    headers: [
      "plan_id",
      "mobile_number",
      "status",
      "start_date",
      "expires_in",
      "sub_plan_id"
    ],
    uischema:subscription_uischema,
    schema:subscription_schema,
    search:{
      label: "Mobile",
      helperText: "Enter mobile number",
      searchBy:"search_subscriptions_by_mobile"
    }

  },
  search_subscriptions_by_mobile:{
    response: "GetAllUserSubscriptionsByMobile"
  },
  transactions:{
    response: "GetAllUserSubscriptionTransactions",
    headers:[
      "mobile_number",
      "amount",
      "source_transaction_indentifier",
      "transaction_type",
      "transaction_date",
      "payment_reference"
    ],
    uischema:transaction_uischema,
    schema:transaction_schema,
    search:{
      label: "Mobile",
      helperText: "Enter mobile number",
      searchBy: "search_transactions_by_mobile"
    }
  },
  search_transactions_by_mobile:{
    response: "GetAllUserSubscriptionTransactionsByMobile"
  },
  get_subscription_count_by_status:{
    response: `GetSubscriptionCountByStatus`
  }
};

export const queries = Object.keys(QueryDefinations);
