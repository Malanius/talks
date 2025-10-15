# OWASP Top 10

## #5

## Broken access control

------

# Description

Broken or missing access control allows users to act outside of their intended permissions.

This can lead to unauthorized information disclosure, modification or destruction of data or users performing actions outside their limits.

------

# Common access control vulnerabilities

---

## Bypassing access control checks

- by modifying URL
- app state  
- HTML page
- using API attack tool

---

## Changing primary key

to another user's record, permitting view or modification of someone else's account

---

## Privilege escalation

acting as user without login, or as admin as a regular user

---

## Metadata manipulation

- tampering JWT or access controls tokens
- modifying cookies
- manipulating hidden field
- abusing JWT invalidation

---

## CORS misconfiguration

allowing unauthorized API access

---

## Force browsing

to authenticated pages as an unauthenticated user or to privileged pages as a standard user

---

## Accessing unprotected API

with missing access controls for POST, PUT and DELETE.

------

# Examples

---

## Bank account URL

```
https://safe.bank/dashboard.py?accountId=4462
```

### Returns

```json
{"AccountID": 4462, "Balance": "$123,456.78"}
```

---

## With changed parameter

```
https://safe.bank/dashboard.py?accountId=4463
```

### Returns

```json
{"AccountID": 4463, "Balance": "$167,183.09"}
```

---

## Code comment revealing function

```javascript
JQuery to perform several actions:
• Load account balance data
• Load transaction data
• If user is customer support a search field will appear. 
  o Queries /customer_search.py
  o Parameters (optional): accountID, customerID, transactionDate
```

---

```
https://safe.bank/customer_search.py?limit=5
```

### Returns

```json
[
  "CustomerID": 10, {"AccountID": 4462, "Balance": "$1502.00"}, 
  "CustomerID": 11, {"AccountID": 4463, "Balance": "$167,183.09"}, 
  "CustomerID": 12, {"AccountID": 4464, "Balance": "$500,023.09"}, 
  "CustomerID": 13, {"AccountID": 4465, "Balance": "$167,183.09"},
  "CustomerID": 14, {"AccountID": 4466, "Balance": "$167,183.09", "AccountID": 4470, "Balance": "$1,054.32"}
]
```

------

# Prevention

---

## With the exception of public resources, deny by default

---

## Implement access control mechanisms once

re-use them throughout the application, including minimizing CORS usage

---

## Enforce record ownership

Model access controls should enforce record ownership, rather than accepting that the user can create, read, update, or delete any record.

---

## Log access control failures

---

## Rate limit API and controller access

prevents using automated tooling for attack

---

## JWT tokens should be invalidated on the server after logout

------

# Useful resources

---

## OWASP documentation

- <https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A5-Broken_Access_Control>
- <https://owasp.org/www-project-proactive-controls/v3/en/c7-enforce-access-controls>
- <https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include.html>

---

## Example apps to try

- <http://www.dvwa.co.uk/>
- <https://github.com/bkimminich/juice-shop>
- <https://github.com/rapid7/metasploitable3/>

------

# DEMO TIME
