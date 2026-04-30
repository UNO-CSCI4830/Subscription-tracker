# Software Requirements Specification (SRS)

**GitHub Project URL:** <https://github.com/UNO-CSCI4830/Subscription-tracker/issues>  

**Team:** #6  

**Project Title:** SubTracked (Subscription Tracker)

## Members
- Gege Zhao
- Nicholas Tran
- Maggie Slusher
- Matt Kolster
- Violet Moore
- Jared Forsberg

## Meeting Dates

| **Meeting Date** | **Participants** |
|------------------|------------------|
| 02/22/2026 | Zhao, Tran, Slusher, Kolster, Moore, Forsberg |
| 02/27/2026 | Zhao, Tran, Slusher, Kolster, Moore, Forsberg |

## Stakeholders and Requirements Summary

| **Stakeholders** | **Requirements** |
|------------------|------------------|
| Users | FR1–FR15 |
| Database | FR10, NFR3 |
| All | NFR1–NFR8 |

---

## FR1. Add Subscription

**Goal:**  
The app will allow the user to actively add new subscriptions with billing details.

**Stakeholders:**  
Users

**Description:**  
The app shall provide a form for users to add a subscription. The form shall allow users to enter the subscription's name, cost, billing cycles, categories, and optional notes. The app will validate required fields before saving, and after successful submission, the subscription will appear on the dashboard.

**Origin:**  
Based on initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR2. Validate User Input

**Goal:**  
The app will validate the user's input before saving and displaying.

**Stakeholders:**  
Users

**Description:**  
When user inputs, the app shall reject invalid values, including missing required fields, invalid dates, and invalid characters. After rejection, the app shall display a message indicating which field must be corrected.

**Origin:**  
To prevent bugs caused by invalid input.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR3. Edit Subscription

**Goal:**  
The app will allow the user to edit an existing subscription and modify its details.

**Stakeholders:**  
Users

**Description:**  
The app shall allow the user to select an existing subscription from the list and re-modify its information. After saving, the updated values shall appear in the list.

**Origin:**  
Users may need to update subscription prices and dates.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR4. Delete Subscription

**Goal:**  
The app will allow users to delete a subscription record.

**Stakeholders:**  
Users

**Description:**  
The app shall allow the user to delete a subscription record. Before deletion, the app shall ask for confirmation to prevent accidental deletions. After confirmation, the subscription records will be removed.

**Origin:**  
Included in initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR5. Dashboard

**Goal:**  
The app will display all saved subscription records in a dashboard list.

**Stakeholders:**  
Users

**Description:**  
The app shall display saved subscriptions in a dashboard list. Each displayed item shall include at least its name, cost, and next billing date.

**Origin:**  
Included in initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR6. Sort Subscription Records

**Goal:**  
The app will allow users to sort the subscription list.

**Stakeholders:**  
Users

**Description:**  
The app shall allow the user to sort subscriptions by next charge date, cost, or alphabet.

**Origin:**  
Included in initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR7. Display Upcoming Renewals (Highlighting)

**Goal:**  
The app shall display subscription records differently based on their renewal dates.

**Stakeholders:**  
Users

**Description:**  
The dashboard list shall highlight upcoming renewals using different colors and, by default, move them to the top of the list for clarity.

**Origin:**  
Derived from practical usage consideration.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 1

---

## FR8. Email Reminder Notifications

**Goal:**  
The app will send reminder emails before a subscription renews.

**Stakeholders:**  
Users

**Description:**  
The app shall send reminder emails to the user based on the user's configured preference. If the email server is down, the system shall queue the email and retry every hour on the hour.

**Origin:**  
Included in initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR9. Persist Subscription Data

**Goal:**  
The app will save user data so it is retained after the app is closed.

**Stakeholders:**  
Users

**Description:**  
When the application starts, the app shall load the user's saved subscriptions from persistent storage. The app shall not lose data when the application or browser is closed.

**Origin:**  
Included in initial project proposal.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR10. Create User Account

**Goal:**  
The app will allow users to create an account.

**Stakeholders:**  
Users

**Description:**  
The app shall allow users to create an account by entering an email address and password. During registration, the app shall validate that the email/password format is valid and required fields are not empty. After account creation, the app shall display a success message and ask whether the user wants to log in.

**Origin:**  
Derived from the need to distinguish and store data for different users in the backend and business requirements.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR11. User Login / Logout

**Goal:**  
The app will allow users to log in or log out of their account.

**Stakeholders:**  
Users

**Description:**  
The app shall allow users to log in and log out using email as username and password. The app shall validate user information, display an error message if login fails, and lock the account for 10 minutes after 5 failed password attempts.

**Origin:**  
Derived from the need for users to switch between different accounts.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR12. Guest Mode

**Goal:**  
The app will provide a guest mode that allows users to use the app without creating an account.

**Stakeholders:**  
Users

**Description:**  
The app shall allow users to access core functions (adding, sorting, etc.) in guest mode without logging in. If a feature requires an account, the app shall display a message directing users to log in or create an account.

**Origin:**  
Derived from team discussions.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR13. Calculate Monthly Cost

**Goal:**  
The app will calculate and display the user's monthly spending on subscriptions.

**Stakeholders:**  
Users

**Description:**  
The app shall calculate an estimated total monthly cost based on saved subscriptions and display the monthly total in a visible dashboard section.

**Origin:**  
Aims to help users understand spending and avoid waste.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR14. Configure Email Notification Enrollment

**Goal:**  
The app will allow users to configure whether email notifications are enabled and which email address should receive them.

**Stakeholders:**  
Users

**Description:**  
The app shall allow users to enable or disable email notifications and update the destination email address for reminder delivery.

**Origin:**  
Improves user experience and flexibility.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## FR15. Configure Notification Timing Preferences

**Goal:**  
The app will allow users to configure when notification emails are sent.

**Stakeholders:**  
Users

**Description:**  
The app shall support reminder timing options of 1 day, 3 days, and 7 days before the renewal date.

**Origin:**  
Improves user experience.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR1. Data Security

**Goal:**  
The app shall provide protection for user data.

**Stakeholders:**  
Users

**Description:**  
The app shall encrypt and securely store user data to reduce unauthorized access. Login information shall be stored as hashed credentials and never plaintext.

**Origin:**  
Derived from account protection considerations.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR2. Performance

**Goal:**  
The app shall provide fast responses under normal and heavier workloads.

**Stakeholders:**  
All

**Description:**  
Users shall be able to input more than 50 subscription records, dashboard load time should remain under 2 seconds, and sorting/filtering should update within 1 second under normal conditions.

**Origin:**  
Team agreement on lightweight usability.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR3. Usability

**Goal:**  
The app should be easy to understand and use.

**Stakeholders:**  
All

**Description:**  
First-time users should immediately understand the software. The interface shall provide clear labels for all required and optional fields.

**Origin:**  
Usability consideration.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR4. Privacy

**Goal:**  
The app shall protect user privacy.

**Stakeholders:**  
All

**Description:**  
Users shall not be able to view or edit another user's data.

**Origin:**  
Derived from login feature requirements.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR5. Reliability

**Goal:**  
The app should reliably perform core functions.

**Stakeholders:**  
All

**Description:**  
Subscription changes must persist after refresh/browser restart, and reminder email systems should function consistently.

**Origin:**  
System reliability consideration.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR6. Maintainability

**Goal:**  
The app shall support future updates and maintenance.

**Stakeholders:**  
All

**Description:**  
The codebase should separate UI, logic, and authentication systems clearly with organized documentation.

**Origin:**  
Development and maintenance perspective.

**Version:** 1.0  
**Date:** 02/22/2026  
**Priority:** 2

---

## NFR7. Portability

**Goal:**  
The app shall function across multiple browsers.

**Stakeholders:**  
All

**Description:**  
The interface shall remain functional and visually consistent across current and previous major versions of Chrome, Firefox, Edge, and Safari.

**Origin:**  
Broad accessibility requirements.

**Version:** 1.0  
**Date:** 02/27/2026  
**Priority:** 2

---

## NFR8. Aesthetics

**Goal:**  
The app shall provide a visually appealing interface.

**Stakeholders:**  
All

**Description:**  
The app shall maintain a clean, organized, visually appealing design that improves user experience without reducing usability or performance.

**Origin:**  
Team discussion.

**Version:** 1.0  
**Date:** 02/27/2026  
**Priority:** 2
