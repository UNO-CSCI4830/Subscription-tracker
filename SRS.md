GitHub Project URL: <https://github.com/UNO-CSCI4830/Subscription-tracker/issues>

Team: #6

Project Title: SubTracked (Subscription Tracker)

Members:

- Gege Zhao
- Nicholas Tran
- Maggie Slusher
- Matt Kolster
- Violet Moore
- Jared Forsberg

| **Meetings date** | **Participants**                              |
| ----------------- | --------------------------------------------- |
| 02/22/2026        | Zhao, Tran, Slusher, Kolster, Moore, Forsberg |
| 02/27/2026        | Zhao, Tran, Slusher, Kolster, Moore, Forsberg |

| **Stakeholders** | **Requirements**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Users            | FR1: Add subscription<br><br>FR2: Validate user input<br><br>FR3: Edit Subscription<br><br>FR4: Delete Subscription<br><br>FR5: Dashboard<br><br>FR6. Sort subscriptions records<br><br>FR7. Display upcoming renewals (highlighting)<br><br>FR8. Email reminder notifications<br><br>FR9. Persist subscription data<br><br>FR11. Create user account<br><br>FR12. User login / logout<br><br>FR13. Guest mode<br><br>FR14. Calculate monthly cost<br><br>FR15. Configure Email notification enrollment<br><br>FR16. Configure notification timing preferences |
| Database         | FR10. Data security<br><br>NFR3: Privacy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| All              | NFR1: Data Security<br><br>NFR2: Performance<br><br>NFR4: Usability<br><br>NFR5: Reliability<br><br>NFR6: Maintainability<br><br>NFR7: Portability<br><br>NFR8: Aesthetics                                                                                                                                                                                                                                                                                                                                                                                     |


FR1. Add subscription
Goal: The app will allow the user to actively add new subscriptions with billing details.
Stakeholders: Users
The app shall provide a form for users to add a subscription. The form shall allow users to enter
the subscription's name, cost, billing cycles, categories, and optional notes. The app will validate
required fields before saving, and after successful submission, the subscription will appear on the
dashboard.
Origin: Based on initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR2. Validate user input
Goal: The app will validate the user's input before saving and displaying.
Stakeholders: Users
When user inputs, the app shall reject invalid values, including missing required fields, invalid
dates, and invalid characters. After rejection, the app shall display a message indicating which field
must be corrected.
Origin: To prevent bugs caused by invalid input.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR3. Edit Subscription
Goal: The app will allow the user to edit an existing subscription and modify its details.
Stakeholders: Users
The app shall allow the user to select an existing subscription from the list and re-modify its
information. After saving, the updated values shall appear in the list.
Origin: Users may need to update subscription prices and dates.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR4. Delete Subscription
Goal: The app will allow users to delete a subscription record.
Stakeholders: Users
The app shall allow the user to delete a subscription record. Before deletion, the app shall ask for
confirmation to prevent accidental deletions. After confirmation, the subscription records will be
removed.
Origin: Included in initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR5. Dashboard
Goal: The app will display all saved subscription records in a dashboard list.
Stakeholders: Users
The app shall display saved subscriptions in a dashboard list. Each displayed item shall include at
least its name, cost, and next billing date.
Origin: Included in initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR6. Sort subscriptions records
Goal: The app will allow users to sort the subscription list.
Stakeholders: Users
The app shall allow the user to sort subscriptions by next charge date, cost, or alphabet.
Origin: Included in initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR7. Display upcoming renewals (highlighting)
Goal: The app shall display subscription records differently based on their renewal dates.
Stakeholders: Users
The dashboard list shall highlight upcoming renewals using different colors and, by default, move
them to the top of the list for clarity.
Origin: Derived from practical usage consideration.
Version: 1.0 Date: 02/22/2026 Priority: 1

FR8. Email reminder notifications
Goal: The app will send reminder emails before a subscription renews.
Stakeholders: Users
The app shall send reminder emails to the user based on the user's configured preference. If the
email server is down, the system shall queue the email and retry every hour on the hour.
Origin: Included in initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR9. Persist subscription data
Goal: The app will save user data so it is retained after the app is closed.
Stakeholders: Users
When the application starts, the app shall load the user's saved subscriptions from a persistent
storage. The app shall not lose data when the application or browser is closed.
Origin: Included in initial project proposal.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR10. Create user account
Goal: The app will allow users to create an account.
Stakeholders: Users
The app shall allow users to create an account by entering an email address and password. During
registration, the app shall validate that the email/password format is valid and other required
fields are not empty. After account creation, the app shall display a success message and ask
whether the user wants to log in.
Origin: Derived from the need to distinguish and store data for different users in the backend. Also
from business aspects.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR11. User login / logout
Goal: The app will allow users to login or logout their account.
Stakeholders: Users
The app shall allow users to login and logout using email as username and a password. The app
shall validate user information, if failed, the app shall display an error message and shall not log in
the user. If the user enters their password 5 times incorrectly, they shall be locked out of their
account for 10 minutes.
Origin: Derived from the need for users to switch between different accounts.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR12. Guest mode
Goal: The app will provide a guest mode that allows users to use the app without creating an
account.
Stakeholders: Users
The app shall allow users to access core functions (adding, sorting etc.. ) in guest mode without
logging in. If a feature requires an account, the app shall display a message and direct users to log
in or create an account.
Origin: Derived from team discussions that user login is not required for some features.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR13. Calculate monthly cost
Goal: The app will calculate and display user's monthly spending on subscriptions.
Stakeholders: Users
The app shall calculate an estimated total monthly cost based on the user's saved subscriptions.
The dashboard list should display the monthly total in a visible section.
Origin: Aims to help users understand their spending and avoid waste.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR14. Configure Email notification enrollment
Goal: The app will allow users to configure whether email notifications are enabled and which
email address should receive them.
Stakeholders: Users
The app shall allow users to enable or disable email notifications. Also the app shall allow users to
enter and update the email address used for notification delivery.
Origin: In order to improve user experience, different users may have different notification
preferences, and the email to receive notification may be different from the user's registration
email.
Version: 1.0 Date: 02/22/2026 Priority: 2

FR15. Configure notification timing preferences
Goal: The app will allow users to configure when notification emails are sent.
Stakeholders: Users
The app shall support reminder timing options of 1 day, 3 days, and 7days before the renewal
date.
Origin: In order to improve user experiences.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR1. Data security
Goal: The app shall provide protection for user data.
Stakeholders: Users
The app shall encrypt and store user data to reduce unauthorized access. The app shall require
login to access saved user data. Login information shall be stored as a hash and never in plaintext.
Origin: Derived from user account protection considerations.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR2: Performance
Goal: The app shall provide fast responses and continue to perform acceptably under occasional
heavier workloads.
Stakeholders: All
Users are able to input more than 50 subscription records, and the system should load the
dashboard within 2 seconds under normal PC setup and normal network conditions. Sorting and
filtering operations shall update the display list under 1 seconds.
Origin: Team agreement on software should be lightweight and usable.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR3: Usability
Goal: The app should be easy to understand and use.
Stakeholders: All
A first time user should be able to understand and use the software immediately. The interface
should present clear labels for all required and un-required input fields (name, cost, cycle etc..).
Origin: Usability consideration
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR4: Privacy
Goal: The app shall protect user data privacy.
Stakeholders: All
Users cannot view or edit other user's data.
Origin: Derived from the client login feature.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR5: Reliability
Goal: The app should provide features reliably.
Stakeholders: All
The app shall save subscription changes reliably so that updates persist after page refresh and
browser restart. The app should send reminder emails reliably.
Origin: Added based on system reliability consideration. Reliable core features are essential for
the app to be usable in everyday situations.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR6: Maintainability
Goal: The app will be organized for future updates.
Stakeholders: All
The codebase should separate UI logic, functional logic, and login logic to support future updates.
The Code structure should be organized with clear documentations.
Origin: Derived from development and maintenance perspective.
Version: 1.0 Date: 02/22/2026 Priority: 2

NFR7: Portability
Goal: The app shall be accessible in different browser environments.
Stakeholders: All
The web interface shall be fully functional and visually consistent on the current version and two
previous major versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. If a
user accesses the site via an unsupported browser, the system shall display a graceful degradation
message advising the user to update their browser for a secure experience.
Origin: Derived from the need for broad user accessibility.
Version: 1.0 Date: 02/27/2026 Priority: 2

NFR8: Aesthetics
Goal: The app shall provide a visually appealing interface.
Stakeholders: All
The app shall use a clean, organized, and visually appealing interface design. The interface design
should improve overall user experience and not make the app harder to use or reducing system
performance.
Origin: Proposed by team during discussion.
Version: 1.0 Date: 02/27/2026 Priority:
