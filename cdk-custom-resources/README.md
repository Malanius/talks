---
title: CDK Custom Resources
author: Malanius
date: 2025-10-15
theme:
    name: catppuccin-mocha
    # name: catppuccin-latte
options:
  end_slide_shorthand: true
#   incremental_lists: true
---

## Refresher - CloudFormation Custom Resources

- for defining resources with complex workflows or resources not supported by CloudFormation natively
- defined with `Custom::<name>` or `AWS::CloudFormation::CustomResource`
- requires Lambda function or SNS topic that CFN invokes with service token
- provider must handle `Create`, `Update`, `Delete` events and respond to presigned S3 URL

```json
{
   "RequestType" : "Create",
   "ResponseURL" : "http://pre-signed-S3-url-for-response",
   "StackId" : "arn:aws:cloudformation:us-west-2:123456789012:stack/mystack/5b918d10-cd98-11ea-90d5-0a9cd3354c10",
   "RequestId" : "unique id for this create request",
   "ResourceType" : "Custom::TestResource",
   "LogicalResourceId" : "MyTestResource",
   "ResourceProperties" : {
      "Name" : "Value",
      "List" : [ "1", "2", "3" ]
   }
}
```

- default timeout is 1 hour, but can be configured with `Timeout` property
- [CFN docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html)

---

## CDK Custom Resources
