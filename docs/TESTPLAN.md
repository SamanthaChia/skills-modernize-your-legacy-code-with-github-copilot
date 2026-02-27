# Test Plan for COBOL Account Management System

This document outlines test cases for the existing business logic.  Use it
for stakeholder validation and later to guide unit/integration tests during a
Node.js port.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------------------|----------|
| TC-001 | View balance the first time | App initialized, balance at default (1000.00) | 1. Start program
2. Choose option 1 | Displays "Current balance: 1000.00" |  |  |  |
| TC-002 | Credit account with valid amount | Balance known (e.g. 1000.00) | 1. Start program
2. Choose option 2
3. Enter amount 200 | Balance increased by 200; new balance shown as 1200.00 |  |  |  |
| TC-003 | Debit account with sufficient funds | Balance at 1200.00 (after credit) | 1. Start program
2. Choose option 3
3. Enter amount 500 | Balance decreased by 500; new balance shown as 700.00 |  |  |  |
| TC-004 | Debit account with insufficient funds | Balance at 700.00 | 1. Start program
2. Choose option 3
3. Enter amount 1000 | Message "Insufficient funds for this debit." displayed; balance remains unchanged |  |  |  |
| TC-005 | Invalid menu selection | Any state | 1. Start program
2. Enter choice 9 | Message "Invalid choice, please select 1-4." displayed; program loops |  |  |  |
| TC-006 | Exit program | Any state | 1. Start program
2. Choose option 4 | Program displays exit message and terminates |  |  |  |


Notes:
- Actual Result and Status columns are left blank for stakeholders to fill
  during validation sessions.
- Additional scenarios (e.g. sequence of operations, zero/negative amounts,
  handling of non-numeric input) can be added later when expanding test
  coverage.
