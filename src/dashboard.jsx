
import { useState } from 'react'
import './Dashboard.css'

const groups = [
  { title: 'MAIN MENU', items: [['overview', 'Overview', '⌂']] },
  {
    title: 'PEOPLE MANAGEMENT',
    items: [
      ['employees', 'Employees', '♙'],
      ['managers', 'Managers', '♧'],
    ],
  },
  {
    title: 'WORK MANAGEMENT',
    items: [
      ['projects', 'Projects', '▣'],
      ['project-assigned', 'Project Assigned', '♧'],
    ],
  },
  {
    title: 'TIME MANAGEMENT',
    items: [
      ['attendance', 'Attendance', '◷'],
      ['leave', 'Leave Management', '▤'],
    ],
  },
  {
    title: 'BUSINESS INSIGHTS',
    items: [
      ['analytics', 'Analytics', '▥'],
      ['finance', 'Finance & Costings', '₹'],
      ['reports', 'Reports', '▧'],
    ],
  },
  { title: 'SYSTEM', items: [['settings', 'Settings', '⚙']] },
]

const stats = [
  ['Total Employees', '248', '+12%', '♙'],
  ['Total Projects', '36', '+8%', '▣'],
  ['Departments', '12', 'Active', '▦'],
  ['Half-year Revenue', '₹24.5L', '+15%', '₹'],
]

const projects = [
  ['Website Redesign', 'Design Team', 85, 'On Track'],
  ['Mobile Application', 'Development', 65, 'In Progress'],
  ['CRM Integration', 'Technology', 45, 'In Progress'],
  ['Marketing Campaign', 'Marketing', 92, 'On Track'],
]

const departments = [
  ['Development', 68, 85],
  ['Design', 42, 65],
  ['Marketing', 36, 55],
  ['Human Resources', 24, 40],
]

const activities = [
  ['New employee added', 'A new employee joined Development', '10 min ago', '♙'],
  ['Project updated', 'Website Redesign progress updated to 85%', '35 min ago', '▣'],
  ['Leave request submitted', 'A leave request is waiting for approval', '1 hour ago', '✓'],
  ['Finance report updated', 'Monthly expenses were updated', '2 hours ago', '₹'],
]

const moduleData = {
  employees: {
    title: 'Employee Management',
    description: 'Manage employee profiles, allocations, performance, documents, salary and employment status.',
    sections: [
      'All Employees',
      'Add New Employee',
      'Employee Profiles',
      'Department Allocation',
      'Employee Performance',
      'Employee Documents',
      'Salary Details',
      'Employment Status',
    ],
  },
  managers: {
    title: 'Manager Management',
    description: 'Manage managers, departments, assigned projects and team responsibilities.',
    sections: [
      'All Managers',
      'Add New Manager',
      'Manager Profiles',
      'Department Assignments',
      'Project Assignments',
      'Manager Performance',
      'Team Overview',
    ],
  },
  projects: {
    title: 'Project Management',
    description: 'Manage projects, deadlines, teams, budgets and delivery progress.',
    sections: [
      'All Projects',
      'Create New Project',
      'Project Details',
      'Project Teams',
      'Project Progress',
      'Project Budgets',
      'Project Deadlines',
    ],
  },
  'project-assigned': {
    title: 'Project Assigned',
    description: 'Monitor project assignments and responsibilities across the organization.',
    sections: [
      'All Assignments',
      'Assign Project',
      'Employee Allocations',
      'Manager Allocations',
      'Project Responsibilities',
      'Active Assignments',
      'Completed Assignments',
      'Pending Assignments',
    ],
  },
  attendance: {
    title: 'Attendance Management',
    description: 'Monitor daily attendance, late arrivals, employee history and attendance reports.',
    sections: [
      'Daily Attendance',
      'Monthly Attendance',
      'Employee Attendance History',
      'Late Arrivals',
      'Department Attendance',
      'Attendance Reports',
    ],
  },
  leave: {
    title: 'Leave Management',
    description: 'Review leave requests and monitor approved, pending and rejected leaves.',
    sections: [
      'All Leave Requests',
      'Pending Approvals',
      'Approved Leaves',
      'Rejected Leaves',
      'Employee Leave History',
      'Leave Reports',
    ],
  },
  analytics: {
    title: 'Performance Analytics',
    description: 'Understand organization-wide productivity, employee performance and department results.',
    sections: [
      'Overall Performance',
      'Employee Productivity',
      'Department Performance',
      'Project Efficiency',
      'Performance Trends',
    ],
  },
  finance: {
    title: 'Finance & Costings',
    description: 'Review revenue, employee expenses, operational expenses, project costs and profit.',
    sections: [
      'Financial Overview',
      'Half-yearly Revenue',
      'Yearly Revenue',
      'Employee Salary Expenses',
      'Operational Expenses',
      'Project Costings',
      'Profit & Loss',
    ],
  },
  reports: {
    title: 'Reports Centre',
    description: 'Prepare and review organization reports across different reporting periods.',
    sections: [
      'Monthly Reports',
      'Half-yearly Reports',
      'Yearly Reports',
      'Employee Reports',
      'Attendance Reports',
      'Finance Reports',
      'Project Reports',
    ],
  },
  settings: {
    title: 'Settings',
    description: 'Manage organization preferences, administrator details and system configuration.',
    sections: [
      'Admin Profile',
      'Organization Details',
      'Account Security',
      'Change Password',
      'System Preferences',
      'Attendance Cutoff Settings',
    ],
  },
}

// Every secondary page has its own metrics, columns and sample records.

const secondaryConfigs = {
  'All Employees': {
    subtitle: 'Employee Directory',
    metrics: [['Total Employees', '248'], ['Active', '232'], ['On Leave', '8']],
    columns: ['Employee', 'Employee ID', 'Department', 'Designation', 'Status'],
    rows: [
      ['Aarav Sharma', 'WS-EMP-101', 'Development', 'Frontend Developer', 'Active'],
      ['Priya Reddy', 'WS-EMP-102', 'Design', 'UI/UX Designer', 'Active'],
      ['Rahul Kumar', 'WS-EMP-103', 'Marketing', 'Marketing Executive', 'Active'],
      ['Sneha Rao', 'WS-EMP-104', 'Human Resources', 'HR Executive', 'On Leave'],
    ],
    action: 'Add New Employee',
  },
  'Employee Profiles': {
    subtitle: 'Employee Profile Directory',
    metrics: [['Profiles', '248'], ['Verified', '240'], ['Incomplete', '8']],
    columns: ['Employee', 'Employee ID', 'Department', 'Manager', 'Profile'],
    rows: [
      ['Aarav Sharma', 'WS-EMP-101', 'Development', 'Rahul Sharma', 'Complete'],
      ['Priya Reddy', 'WS-EMP-102', 'Design', 'Ananya Rao', 'Complete'],
      ['Rahul Kumar', 'WS-EMP-103', 'Marketing', 'Vikram Das', 'Incomplete'],
    ],
  },
  'Department Allocation': {
    subtitle: 'Employee Department Allocation',
    metrics: [['Departments', '12'], ['Allocated', '240'], ['Unassigned', '8']],
    columns: ['Department', 'Team Lead', 'Employees', 'Capacity', 'Status'],
    rows: [
      ['Development', 'Rahul Sharma', '68', '85%', 'Active'],
      ['Design', 'Ananya Rao', '42', '65%', 'Active'],
      ['Marketing', 'Vikram Das', '36', '55%', 'Active'],
      ['Human Resources', 'Meera Nair', '24', '40%', 'Active'],
    ],
    action: 'Allocate Employee',
  },
  'Employee Performance': {
    subtitle: 'Employee Performance Records',
    metrics: [['Reviewed', '218'], ['Top Performers', '42'], ['Pending Reviews', '30']],
    columns: ['Employee', 'Department', 'Tasks Completed', 'Rating', 'Review'],
    rows: [
      ['Aarav Sharma', 'Development', '42', '94%', 'Excellent'],
      ['Priya Reddy', 'Design', '36', '91%', 'Excellent'],
      ['Rahul Kumar', 'Marketing', '28', '82%', 'Good'],
    ],
    action: 'Add Performance Review',
  },
  'Employee Documents': {
    subtitle: 'Employee Document Centre',
    metrics: [['Documents', '684'], ['Verified', '650'], ['Pending', '34']],
    columns: ['Employee', 'Document', 'Category', 'Uploaded', 'Status'],
    rows: [
      ['Aarav Sharma', 'Identity Proof', 'Personal', '10 Nov 2026', 'Verified'],
      ['Priya Reddy', 'Education Certificate', 'Education', '09 Nov 2026', 'Pending'],
      ['Rahul Kumar', 'Experience Letter', 'Employment', '08 Nov 2026', 'Verified'],
    ],
    action: 'Upload Document',
  },
  'Salary Details': {
    subtitle: 'Employee Salary Records',
    metrics: [['Payroll Employees', '248'], ['Monthly Payroll', '₹18.4L'], ['Pending', '4']],
    columns: ['Employee', 'Employee ID', 'Department', 'Monthly Salary', 'Status'],
    rows: [
      ['Aarav Sharma', 'WS-EMP-101', 'Development', '₹65,000', 'Processed'],
      ['Priya Reddy', 'WS-EMP-102', 'Design', '₹52,000', 'Processed'],
      ['Rahul Kumar', 'WS-EMP-103', 'Marketing', '₹42,000', 'Pending'],
    ],
    action: 'Update Salary',
  },
  'Employment Status': {
    subtitle: 'Employee Employment Status',
    metrics: [['Active', '232'], ['On Leave', '8'], ['Inactive', '8']],
    columns: ['Employee', 'Department', 'Joining Date', 'Employment Type', 'Status'],
    rows: [
      ['Aarav Sharma', 'Development', '12 Jan 2024', 'Full-time', 'Active'],
      ['Priya Reddy', 'Design', '08 Mar 2023', 'Full-time', 'Active'],
      ['Rahul Kumar', 'Marketing', '16 Jun 2025', 'Contract', 'Inactive'],
    ],
    action: 'Update Employment Status',
  },

  'All Managers': {
    subtitle: 'Manager Directory',
    metrics: [['Total Managers', '18'], ['Active', '16'], ['Departments', '12']],
    columns: ['Manager', 'Manager ID', 'Department', 'Team Size', 'Status'],
    rows: [
      ['Rahul Sharma', 'WS-MGR-01', 'Development', '32', 'Active'],
      ['Ananya Rao', 'WS-MGR-02', 'Design', '18', 'Active'],
      ['Vikram Das', 'WS-MGR-03', 'Marketing', '22', 'Active'],
    ],
    action: 'Add New Manager',
  },
  'Manager Profiles': {
    subtitle: 'Manager Profile Directory',
    metrics: [['Profiles', '18'], ['Verified', '17'], ['Incomplete', '1']],
    columns: ['Manager', 'Manager ID', 'Experience', 'Department', 'Profile'],
    rows: [
      ['Rahul Sharma', 'WS-MGR-01', '8 years', 'Development', 'Complete'],
      ['Ananya Rao', 'WS-MGR-02', '6 years', 'Design', 'Complete'],
    ],
    action: 'Update Manager Profile',
  },
  'Department Assignments': {
    subtitle: 'Manager Department Assignments',
    metrics: [['Assigned', '12'], ['Unassigned', '0'], ['Managers', '18']],
    columns: ['Manager', 'Department', 'Team Size', 'Assigned Date', 'Status'],
    rows: [
      ['Rahul Sharma', 'Development', '32', '01 Jan 2026', 'Active'],
      ['Ananya Rao', 'Design', '18', '01 Jan 2026', 'Active'],
    ],
    action: 'Assign Department',
  },
  'Project Assignments': {
    subtitle: 'Manager Project Assignments',
    metrics: [['Assigned Projects', '36'], ['Ongoing', '28'], ['Completed', '8']],
    columns: ['Manager', 'Project', 'Department', 'Deadline', 'Status'],
    rows: [
      ['Rahul Sharma', 'Website Redesign', 'Development', '20 Dec 2026', 'Ongoing'],
      ['Ananya Rao', 'Mobile Application', 'Design', '28 Dec 2026', 'Ongoing'],
    ],
    action: 'Assign Manager to Project',
  },
  'Manager Performance': {
    subtitle: 'Manager Performance Reviews',
    metrics: [['Managers Reviewed', '16'], ['Average Rating', '89%'], ['Pending', '2']],
    columns: ['Manager', 'Team Productivity', 'Projects', 'Rating', 'Review'],
    rows: [
      ['Rahul Sharma', '94%', '5', '96%', 'Excellent'],
      ['Ananya Rao', '89%', '3', '91%', 'Excellent'],
    ],
    action: 'Add Manager Review',
  },
  'Team Overview': {
    subtitle: 'Organization Team Overview',
    metrics: [['Teams', '12'], ['Team Members', '248'], ['Managers', '18']],
    columns: ['Team', 'Manager', 'Members', 'Active Projects', 'Status'],
    rows: [
      ['Development', 'Rahul Sharma', '68', '8', 'Active'],
      ['Design', 'Ananya Rao', '42', '5', 'Active'],
      ['Marketing', 'Vikram Das', '36', '4', 'Active'],
    ],
  },

  'All Projects': {
    subtitle: 'Organization Project Directory',
    metrics: [['Total Projects', '36'], ['Ongoing', '22'], ['Completed', '10']],
    columns: ['Project', 'Project ID', 'Manager', 'Progress', 'Status'],
    rows: [
      ['Website Redesign', 'WS-PRJ-01', 'Rahul Sharma', '85%', 'On Track'],
      ['Mobile Application', 'WS-PRJ-02', 'Ananya Rao', '65%', 'Ongoing'],
      ['CRM Integration', 'WS-PRJ-03', 'Vikram Das', '45%', 'Ongoing'],
    ],
    action: 'Create New Project',
  },
  'Project Details': {
    subtitle: 'Project Information',
    metrics: [['Active Projects', '22'], ['Delayed', '4'], ['Completed', '10']],
    columns: ['Project', 'Client', 'Start Date', 'Deadline', 'Status'],
    rows: [
      ['Website Redesign', 'ABC Technologies', '01 Aug 2026', '20 Dec 2026', 'Ongoing'],
      ['Mobile Application', 'Nova Solutions', '15 Jul 2026', '28 Dec 2026', 'Ongoing'],
    ],
  },
  'Project Teams': {
    subtitle: 'Project Team Directory',
    metrics: [['Project Teams', '22'], ['Team Members', '148'], ['Managers', '18']],
    columns: ['Project', 'Manager', 'Team Members', 'Department', 'Status'],
    rows: [
      ['Website Redesign', 'Rahul Sharma', '12', 'Development', 'Active'],
      ['Mobile Application', 'Ananya Rao', '10', 'Design', 'Active'],
    ],
    action: 'Manage Project Team',
  },
  'Project Progress': {
    subtitle: 'Project Delivery Progress',
    metrics: [['On Track', '18'], ['At Risk', '4'], ['Delayed', '4']],
    columns: ['Project', 'Completion', 'Tasks Completed', 'Deadline', 'Status'],
    rows: [
      ['Website Redesign', '85%', '42 / 50', '20 Dec 2026', 'On Track'],
      ['Mobile Application', '65%', '32 / 50', '28 Dec 2026', 'Ongoing'],
      ['CRM Integration', '45%', '18 / 40', '10 Dec 2026', 'At Risk'],
    ],
    action: 'Update Project Progress',
  },
  'Project Budgets': {
    subtitle: 'Project Budget Monitoring',
    metrics: [['Total Budget', '₹45L'], ['Utilized', '₹28L'], ['Remaining', '₹17L']],
    columns: ['Project', 'Allocated Budget', 'Spent', 'Remaining', 'Status'],
    rows: [
      ['Website Redesign', '₹12L', '₹8L', '₹4L', 'Within Budget'],
      ['Mobile Application', '₹18L', '₹12L', '₹6L', 'Within Budget'],
    ],
    action: 'Update Project Budget',
  },
  'Project Deadlines': {
    subtitle: 'Project Deadline Tracker',
    metrics: [['Upcoming', '8'], ['Due This Month', '5'], ['Overdue', '4']],
    columns: ['Project', 'Manager', 'Deadline', 'Days Remaining', 'Status'],
    rows: [
      ['CRM Integration', 'Vikram Das', '10 Dec 2026', '29 days', 'At Risk'],
      ['Website Redesign', 'Rahul Sharma', '20 Dec 2026', '39 days', 'On Track'],
    ],
    action: 'Update Deadline',
  },

  'All Assignments': {
    subtitle: 'Project Assignment Register',
    metrics: [['Total Assignments', '148'], ['Active', '112'], ['Pending', '12']],
    columns: ['Employee', 'Project', 'Manager', 'Assigned Date', 'Status'],
    rows: [
      ['Aarav Sharma', 'Website Redesign', 'Rahul Sharma', '01 Nov 2026', 'Active'],
      ['Priya Reddy', 'Mobile Application', 'Ananya Rao', '02 Nov 2026', 'Active'],
    ],
    action: 'Assign Project',
  },
  'Employee Allocations': {
    subtitle: 'Employee Project Allocations',
    metrics: [['Allocated', '148'], ['Available', '64'], ['Overallocated', '4']],
    columns: ['Employee', 'Department', 'Project', 'Allocation', 'Status'],
    rows: [
      ['Aarav Sharma', 'Development', 'Website Redesign', '100%', 'Active'],
      ['Priya Reddy', 'Design', 'Mobile Application', '75%', 'Active'],
    ],
    action: 'Allocate Employee',
  },
  'Manager Allocations': {
    subtitle: 'Manager Project Allocations',
    metrics: [['Assigned Managers', '18'], ['Projects', '36'], ['Available', '2']],
    columns: ['Manager', 'Project', 'Department', 'Team Size', 'Status'],
    rows: [
      ['Rahul Sharma', 'Website Redesign', 'Development', '12', 'Active'],
      ['Ananya Rao', 'Mobile Application', 'Design', '10', 'Active'],
    ],
    action: 'Allocate Manager',
  },
  'Project Responsibilities': {
    subtitle: 'Project Responsibility Register',
    metrics: [['Responsibilities', '84'], ['Completed', '62'], ['Pending', '22']],
    columns: ['Responsibility', 'Assigned To', 'Project', 'Due Date', 'Status'],
    rows: [
      ['Frontend Development', 'Aarav Sharma', 'Website Redesign', '15 Dec 2026', 'In Progress'],
      ['UI Design', 'Priya Reddy', 'Mobile Application', '18 Dec 2026', 'Pending'],
    ],
    action: 'Assign Responsibility',
  },
  'Active Assignments': {
    subtitle: 'Currently Active Assignments',
    metrics: [['Active', '112'], ['Employees', '96'], ['Projects', '22']],
    columns: ['Employee', 'Project', 'Manager', 'Start Date', 'Status'],
    rows: [
      ['Aarav Sharma', 'Website Redesign', 'Rahul Sharma', '01 Nov 2026', 'Active'],
      ['Priya Reddy', 'Mobile Application', 'Ananya Rao', '02 Nov 2026', 'Active'],
    ],
  },
  'Completed Assignments': {
    subtitle: 'Completed Project Assignments',
    metrics: [['Completed', '24'], ['Employees', '38'], ['Projects', '10']],
    columns: ['Employee', 'Project', 'Manager', 'Completion Date', 'Status'],
    rows: [
      ['Rahul Kumar', 'CRM Upgrade', 'Vikram Das', '25 Oct 2026', 'Completed'],
      ['Meera Nair', 'HR Portal', 'Rahul Sharma', '20 Oct 2026', 'Completed'],
    ],
  },
  'Pending Assignments': {
    subtitle: 'Pending Project Assignments',
    metrics: [['Pending', '12'], ['Awaiting Manager', '4'], ['Awaiting Employee', '8']],
    columns: ['Employee', 'Project', 'Requested By', 'Requested Date', 'Status'],
    rows: [
      ['Aarav Sharma', 'CRM Integration', 'Rahul Sharma', '09 Nov 2026', 'Awaiting Approval'],
      ['Priya Reddy', 'Marketing Portal', 'Vikram Das', '10 Nov 2026', 'Pending'],
    ],
  },

  'Daily Attendance': {
    subtitle: 'Daily Employee Attendance',
    metrics: [['Present', '218'], ['Late', '14'], ['Absent', '8']],
    columns: ['Employee', 'Employee ID', 'Check In', 'Check Out', 'Status'],
    rows: [
      ['Aarav Sharma', 'WS-EMP-101', '08:52 AM', '06:10 PM', 'Present'],
      ['Priya Reddy', 'WS-EMP-102', '09:18 AM', '06:00 PM', 'Late'],
      ['Rahul Kumar', 'WS-EMP-103', '--', '--', 'Absent'],
    ],
    action: 'Record Attendance',
  },
  'Monthly Attendance': {
    subtitle: 'Monthly Attendance Summary',
    metrics: [['Working Days', '22'], ['Average Attendance', '94%'], ['Late Entries', '126']],
    columns: ['Employee', 'Present Days', 'Absent Days', 'Late Days', 'Attendance'],
    rows: [
      ['Aarav Sharma', '21', '0', '1', '95%'],
      ['Priya Reddy', '20', '1', '2', '91%'],
      ['Rahul Kumar', '19', '2', '3', '86%'],
    ],
  },
  'Employee Attendance History': {
    subtitle: 'Individual Attendance History',
    metrics: [['Records', '248'], ['On Time', '218'], ['Late Arrivals', '14']],
    columns: ['Employee', 'Date', 'Check In', 'Late Duration', 'Status'],
    rows: [
      ['Aarav Sharma', '10 Nov 2026', '08:52 AM', '0 min', 'On Time'],
      ['Priya Reddy', '10 Nov 2026', '09:18 AM', '18 min', 'Late'],
    ],
  },
  'Late Arrivals': {
    subtitle: 'Late Arrival Monitoring',
    metrics: [['Late Today', '14'], ['Total Late Minutes', '186'], ['Repeat Late', '5']],
    columns: ['Employee', 'Department', 'Check In', 'Late Duration', 'Date'],
    rows: [
      ['Priya Reddy', 'Design', '09:18 AM', '18 min', '11 Nov 2026'],
      ['Rahul Kumar', 'Marketing', '09:12 AM', '12 min', '11 Nov 2026'],
    ],
  },
  'Department Attendance': {
    subtitle: 'Department Attendance Summary',
    metrics: [['Departments', '12'], ['Present', '218'], ['On Leave', '8']],
    columns: ['Department', 'Total Staff', 'Present', 'Late', 'Attendance'],
    rows: [
      ['Development', '68', '62', '4', '91%'],
      ['Design', '42', '38', '2', '90%'],
      ['Marketing', '36', '33', '3', '92%'],
    ],
  },
  'Attendance Reports': {
    subtitle: 'Attendance Reporting Centre',
    metrics: [['Reports', '12'], ['Monthly', '8'], ['Yearly', '4']],
    columns: ['Report', 'Period', 'Generated On', 'Prepared By', 'Status'],
    rows: [
      ['November Attendance', 'Monthly', '11 Nov 2026', 'Admin User', 'Ready'],
      ['October Attendance', 'Monthly', '01 Nov 2026', 'Admin User', 'Ready'],
    ],
    action: 'Generate Attendance Report',
  },

  'All Leave Requests': {
    subtitle: 'Employee Leave Requests',
    metrics: [['Total Requests', '42'], ['Pending', '8'], ['Approved', '28']],
    columns: ['Employee', 'Leave Type', 'From', 'To', 'Status'],
    rows: [
      ['Priya Reddy', 'Casual Leave', '12 Nov 2026', '13 Nov 2026', 'Pending'],
      ['Aarav Sharma', 'Sick Leave', '05 Nov 2026', '05 Nov 2026', 'Approved'],
    ],
  },
  'Pending Approvals': {
    subtitle: 'Leave Requests Awaiting Approval',
    metrics: [['Pending', '8'], ['Casual', '5'], ['Sick', '3']],
    columns: ['Employee', 'Department', 'Leave Type', 'Dates', 'Status'],
    rows: [
      ['Priya Reddy', 'Design', 'Casual Leave', '12–13 Nov', 'Pending'],
      ['Rahul Kumar', 'Marketing', 'Sick Leave', '14 Nov', 'Pending'],
    ],
  },
  'Approved Leaves': {
    subtitle: 'Approved Employee Leaves',
    metrics: [['Approved', '28'], ['Upcoming', '12'], ['Employees', '24']],
    columns: ['Employee', 'Leave Type', 'From', 'To', 'Approval'],
    rows: [
      ['Aarav Sharma', 'Sick Leave', '05 Nov 2026', '05 Nov 2026', 'Approved'],
      ['Meera Nair', 'Casual Leave', '08 Nov 2026', '09 Nov 2026', 'Approved'],
    ],
  },
  'Rejected Leaves': {
    subtitle: 'Rejected Leave Requests',
    metrics: [['Rejected', '6'], ['This Month', '4'], ['Last Month', '2']],
    columns: ['Employee', 'Leave Type', 'Requested Dates', 'Reviewed By', 'Status'],
    rows: [
      ['Rahul Kumar', 'Casual Leave', '03–05 Nov', 'Rahul Sharma', 'Rejected'],
      ['Priya Reddy', 'Annual Leave', '01 Nov', 'Ananya Rao', 'Rejected'],
    ],
  },
  'Employee Leave History': {
    subtitle: 'Individual Employee Leave History',
    metrics: [['Employees', '248'], ['Leave Requests', '42'], ['Approved Days', '68']],
    columns: ['Employee', 'Leave Type', 'Days', 'Period', 'Status'],
    rows: [
      ['Aarav Sharma', 'Sick Leave', '1', 'November', 'Approved'],
      ['Meera Nair', 'Casual Leave', '2', 'November', 'Approved'],
    ],
  },
  'Leave Reports': {
    subtitle: 'Leave Reporting Centre',
    metrics: [['Reports', '12'], ['Approved Days', '68'], ['Pending', '8']],
    columns: ['Report', 'Period', 'Requests', 'Approved', 'Status'],
    rows: [
      ['November Leave Report', 'November 2026', '42', '28', 'Ready'],
      ['October Leave Report', 'October 2026', '38', '30', 'Ready'],
    ],
    action: 'Generate Leave Report',
  },

  'Overall Performance': {
    subtitle: 'Organization Performance Summary',
    metrics: [['Average Score', '88%'], ['Top Performers', '42'], ['Reviews Pending', '30']],
    columns: ['Department', 'Employees', 'Average Score', 'Target', 'Performance'],
    rows: [
      ['Development', '68', '92%', '85%', 'Above Target'],
      ['Design', '42', '89%', '85%', 'Above Target'],
      ['Marketing', '36', '84%', '85%', 'On Target'],
    ],
  },
  'Employee Productivity': {
    subtitle: 'Employee Productivity Analysis',
    metrics: [['Tasks Completed', '1,248'], ['Average Productivity', '87%'], ['Top Performers', '42']],
    columns: ['Employee', 'Department', 'Tasks Completed', 'Productivity', 'Rating'],
    rows: [
      ['Aarav Sharma', 'Development', '42', '96%', 'Excellent'],
      ['Priya Reddy', 'Design', '36', '91%', 'Excellent'],
    ],
  },
  'Department Performance': {
    subtitle: 'Department Performance Comparison',
    metrics: [['Departments', '12'], ['Top Department', 'Development'], ['Average', '88%']],
    columns: ['Department', 'Productivity', 'Tasks', 'Projects', 'Rating'],
    rows: [
      ['Development', '92%', '420', '8', 'Excellent'],
      ['Design', '89%', '280', '5', 'Excellent'],
      ['Marketing', '84%', '210', '4', 'Good'],
    ],
  },
  'Project Efficiency': {
    subtitle: 'Project Delivery Efficiency',
    metrics: [['Projects', '36'], ['On Time', '28'], ['Delayed', '4']],
    columns: ['Project', 'Completion', 'Budget Usage', 'Deadline', 'Efficiency'],
    rows: [
      ['Website Redesign', '85%', '68%', '20 Dec 2026', 'High'],
      ['Mobile Application', '65%', '72%', '28 Dec 2026', 'Good'],
    ],
  },
  'Performance Trends': {
    subtitle: 'Performance Trends',
    metrics: [['Current Score', '88%'], ['Previous Period', '84%'], ['Growth', '+4%']],
    columns: ['Period', 'Productivity', 'Attendance', 'Project Delivery', 'Overall'],
    rows: [
      ['July 2026', '82%', '91%', '80%', '84%'],
      ['August 2026', '85%', '93%', '83%', '87%'],
      ['September 2026', '88%', '94%', '86%', '89%'],
    ],
  },

  'Financial Overview': {
    subtitle: 'Organization Financial Overview',
    metrics: [['Revenue', '₹24.5L'], ['Expenses', '₹17L'], ['Net Profit', '₹7.5L']],
    columns: ['Financial Category', 'Amount', 'Period', 'Change', 'Status'],
    rows: [
      ['Revenue', '₹24.5L', 'Half-year', '+15%', 'Positive'],
      ['Employee Expenses', '₹12L', 'Half-year', '+8%', 'Recorded'],
      ['Operational Expenses', '₹5L', 'Half-year', '+3%', 'Recorded'],
    ],
  },
  'Half-yearly Revenue': {
    subtitle: 'Half-yearly Revenue Analysis',
    metrics: [['Revenue', '₹24.5L'], ['First Half', '₹11.2L'], ['Second Half', '₹13.3L']],
    columns: ['Period', 'Revenue', 'Expenses', 'Profit', 'Growth'],
    rows: [
      ['First Half', '₹11.2L', '₹8L', '₹3.2L', '+10%'],
      ['Second Half', '₹13.3L', '₹9L', '₹4.3L', '+15%'],
    ],
  },
  'Yearly Revenue': {
    subtitle: 'Yearly Revenue Analysis',
    metrics: [['Annual Revenue', '₹48.2L'], ['Annual Expenses', '₹33L'], ['Net Profit', '₹15.2L']],
    columns: ['Year', 'Revenue', 'Expenses', 'Profit', 'Growth'],
    rows: [
      ['2024', '₹38L', '₹28L', '₹10L', '+8%'],
      ['2025', '₹42L', '₹30L', '₹12L', '+11%'],
      ['2026', '₹48.2L', '₹33L', '₹15.2L', '+15%'],
    ],
  },
  'Employee Salary Expenses': {
    subtitle: 'Employee Payroll Expenses',
    metrics: [['Monthly Payroll', '₹18.4L'], ['Employees', '248'], ['Pending', '4']],
    columns: ['Department', 'Employees', 'Monthly Payroll', 'Annual Estimate', 'Status'],
    rows: [
      ['Development', '68', '₹6.2L', '₹74.4L', 'Processed'],
      ['Design', '42', '₹3.4L', '₹40.8L', 'Processed'],
      ['Marketing', '36', '₹2.8L', '₹33.6L', 'Processed'],
    ],
  },
  'Operational Expenses': {
    subtitle: 'Operational Expense Tracking',
    metrics: [['Monthly Expenses', '₹5L'], ['Categories', '6'], ['Pending Bills', '3']],
    columns: ['Expense', 'Category', 'Amount', 'Date', 'Status'],
    rows: [
      ['Office Rent', 'Facilities', '₹1.8L', '01 Nov 2026', 'Paid'],
      ['Software Licences', 'Technology', '₹85,000', '05 Nov 2026', 'Paid'],
      ['Internet Services', 'Utilities', '₹25,000', '08 Nov 2026', 'Pending'],
    ],
    action: 'Add Expense',
  },
  'Project Costings': {
    subtitle: 'Project-wise Cost Analysis',
    metrics: [['Total Budget', '₹45L'], ['Spent', '₹28L'], ['Remaining', '₹17L']],
    columns: ['Project', 'Budget', 'Actual Cost', 'Remaining', 'Status'],
    rows: [
      ['Website Redesign', '₹12L', '₹8L', '₹4L', 'Within Budget'],
      ['Mobile Application', '₹18L', '₹12L', '₹6L', 'Within Budget'],
    ],
  },
  'Profit & Loss': {
    subtitle: 'Profit and Loss Statement',
    metrics: [['Revenue', '₹24.5L'], ['Expenses', '₹17L'], ['Profit', '₹7.5L']],
    columns: ['Category', 'Amount', 'Type', 'Period', 'Status'],
    rows: [
      ['Project Revenue', '₹24.5L', 'Income', 'Half-year', 'Recorded'],
      ['Employee Costs', '₹12L', 'Expense', 'Half-year', 'Recorded'],
      ['Operational Costs', '₹5L', 'Expense', 'Half-year', 'Recorded'],
      ['Net Profit', '₹7.5L', 'Profit', 'Half-year', 'Calculated'],
    ],
  },

  'Monthly Reports': {
    subtitle: 'Monthly Organization Reports',
    metrics: [['Available Reports', '12'], ['Generated', '10'], ['Pending', '2']],
    columns: ['Report', 'Month', 'Generated On', 'Prepared By', 'Status'],
    rows: [
      ['Employee Summary', 'October 2026', '01 Nov 2026', 'Admin User', 'Ready'],
      ['Finance Summary', 'October 2026', '01 Nov 2026', 'Admin User', 'Ready'],
    ],
    action: 'Generate Monthly Report',
  },
  'Half-yearly Reports': {
    subtitle: 'Half-yearly Reports',
    metrics: [['Reports', '4'], ['Generated', '3'], ['Pending', '1']],
    columns: ['Report', 'Period', 'Generated On', 'Category', 'Status'],
    rows: [
      ['H1 Business Report', 'Jan–Jun 2026', '05 Jul 2026', 'Business', 'Ready'],
      ['H2 Business Report', 'Jul–Dec 2026', 'Pending', 'Business', 'Pending'],
    ],
    action: 'Generate Half-yearly Report',
  },
  'Yearly Reports': {
    subtitle: 'Annual Organization Reports',
    metrics: [['Annual Reports', '3'], ['Available', '2'], ['Pending', '1']],
    columns: ['Report', 'Year', 'Generated On', 'Category', 'Status'],
    rows: [
      ['Annual Finance Report', '2025', '05 Jan 2026', 'Finance', 'Ready'],
      ['Annual Employee Report', '2025', '06 Jan 2026', 'Employees', 'Ready'],
    ],
    action: 'Generate Yearly Report',
  },
  'Employee Reports': {
    subtitle: 'Employee Reporting Centre',
    metrics: [['Reports', '8'], ['Employees', '248'], ['Departments', '12']],
    columns: ['Report', 'Scope', 'Period', 'Generated', 'Status'],
    rows: [
      ['Employee Directory', 'All Employees', 'November 2026', '11 Nov 2026', 'Ready'],
      ['Employee Performance', 'All Departments', 'October 2026', '01 Nov 2026', 'Ready'],
    ],
    action: 'Generate Employee Report',
  },
  'Finance Reports': {
    subtitle: 'Financial Reporting Centre',
    metrics: [['Reports', '6'], ['Revenue', '₹24.5L'], ['Expenses', '₹17L']],
    columns: ['Report', 'Period', 'Revenue', 'Expenses', 'Status'],
    rows: [
      ['Half-year Finance', 'H2 2026', '₹24.5L', '₹17L', 'Ready'],
      ['Annual Finance', '2026', '₹48.2L', '₹33L', 'Ready'],
    ],
    action: 'Generate Finance Report',
  },
  'Project Reports': {
    subtitle: 'Project Reporting Centre',
    metrics: [['Reports', '10'], ['Projects', '36'], ['Completed', '10']],
    columns: ['Report', 'Projects Covered', 'Period', 'Generated', 'Status'],
    rows: [
      ['Project Progress', '36', 'November 2026', '11 Nov 2026', 'Ready'],
      ['Project Costing', '22', 'October 2026', '01 Nov 2026', 'Ready'],
    ],
    action: 'Generate Project Report',
  },

  'Admin Profile': {
    subtitle: 'Administrator Account',
    metrics: [['Account', 'Active'], ['Role', 'Super Admin'], ['Access', 'Full']],
    columns: ['Profile Field', 'Current Information', 'Account Status'],
    rows: [
      ['Name', 'Admin User', 'Active'],
      ['Role', 'Super Administrator', 'Verified'],
      ['Email', 'admin@worksphere.com', 'Verified'],
    ],
    action: 'Edit Admin Profile',
  },
  'Organization Details': {
    subtitle: 'Organization Configuration',
    metrics: [['Departments', '12'], ['Employees', '248'], ['Projects', '36']],
    columns: ['Organization Field', 'Current Value', 'Status'],
    rows: [
      ['Organization Name', 'WorkSphere Technologies', 'Configured'],
      ['Departments', '12', 'Active'],
      ['Working Days', 'Monday–Friday', 'Configured'],
    ],
    action: 'Edit Organization Details',
  },
  'Account Security': {
    subtitle: 'Administrator Security Settings',
    metrics: [['Account Status', 'Secure'], ['Two-factor', 'Pending'], ['Last Login', 'Today']],
    columns: ['Security Setting', 'Current Status', 'Action'],
    rows: [
      ['Password', 'Configured', 'Change Password'],
      ['Two-factor Authentication', 'Not Enabled', 'Configure'],
      ['Login Notifications', 'Enabled', 'Manage'],
    ],
    action: 'Update Security Settings',
  },
  'Change Password': {
    subtitle: 'Update Administrator Password',
    metrics: [['Account', 'Admin User'], ['Security', 'Password'], ['Access', 'Protected']],
    columns: ['Requirement', 'Guidance', 'Status'],
    rows: [
      ['Current Password', 'Enter your existing password', 'Required'],
      ['New Password', 'Use a strong password', 'Required'],
      ['Confirm Password', 'Must match new password', 'Required'],
    ],
    action: 'Update Password',
  },
  'System Preferences': {
    subtitle: 'WorkSphere System Preferences',
    metrics: [['Theme', 'Ocean Mist'], ['Timezone', 'IST'], ['Language', 'English']],
    columns: ['Preference', 'Current Setting', 'Description'],
    rows: [
      ['Theme', 'Ocean Mist', 'Dashboard appearance'],
      ['Timezone', 'Asia/Kolkata', 'Organization timezone'],
      ['Language', 'English', 'Display language'],
    ],
    action: 'Edit Preferences',
  },
  'Attendance Cutoff Settings': {
    subtitle: 'Attendance Rules Configuration',
    metrics: [['Official Check-in', '9:00 AM'], ['Late After', '9:00 AM'], ['Timezone', 'IST']],
    columns: ['Rule', 'Current Setting', 'Purpose'],
    rows: [
      ['Official Check-in', '09:00 AM', 'Standard employee reporting time'],
      ['Late Arrival', 'After 09:00 AM', 'Records exact late duration'],
      ['Absence Cutoff', 'Not configured', 'Set when an employee becomes absent'],
    ],
    action: 'Configure Attendance Rules',
  },
}

// Forms for all sections that require data entry.

const formDefinitions = {
  'Add New Employee': {
    heading: 'Add New Employee',
    description: 'Enter the employee personal, professional and salary information.',
    groups: [
      ['Personal Information', [
        ['Full Name', 'text', true],
        ['Employee ID', 'text', true],
        ['Email Address', 'email', true],
        ['Phone Number', 'tel', true],
        ['Date of Birth', 'date'],
        ['Address', 'text'],
      ]],
      ['Professional Information', [
        ['Designation', 'text', true],
        ['Department', 'select', true, ['Development', 'Design', 'Marketing', 'Human Resources', 'Finance']],
        ['Experience', 'text'],
        ['Joining Date', 'date', true],
        ['Employment Type', 'select', true, ['Full-time', 'Part-time', 'Contract', 'Intern']],
        ['Reporting Manager', 'text'],
        ['Skills', 'text'],
        ['Education', 'text'],
        ['Previous Work Experience', 'textarea'],
      ]],
      ['Salary Information', [
        ['Monthly Salary', 'number'],
        ['Salary Type', 'select', false, ['Monthly', 'Annual', 'Hourly']],
      ]],
    ],
  },
  'Add New Manager': {
    heading: 'Add New Manager',
    description: 'Create a manager profile and define their department responsibilities.',
    groups: [
      ['Personal Information', [
        ['Full Name', 'text', true],
        ['Manager ID', 'text', true],
        ['Email Address', 'email', true],
        ['Phone Number', 'tel', true],
        ['Address', 'text'],
      ]],
      ['Professional Information', [
        ['Designation', 'text', true],
        ['Department', 'select', true, ['Development', 'Design', 'Marketing', 'Human Resources', 'Finance']],
        ['Experience', 'text'],
        ['Joining Date', 'date', true],
        ['Skills', 'text'],
        ['Reporting To', 'text'],
      ]],
      ['Team Information', [
        ['Team Size', 'number'],
        ['Assigned Projects', 'text'],
      ]],
    ],
  },
  'Create New Project': {
    heading: 'Create New Project',
    description: 'Set up a new project and define its delivery details.',
    groups: [
      ['Project Information', [
        ['Project Name', 'text', true],
        ['Project ID', 'text', true],
        ['Client Name', 'text', true],
        ['Project Description', 'textarea', true],
        ['Department', 'select', true, ['Development', 'Design', 'Marketing', 'Human Resources']],
        ['Project Manager', 'text', true],
      ]],
      ['Timeline & Budget', [
        ['Start Date', 'date', true],
        ['Deadline', 'date', true],
        ['Project Budget', 'number', true],
        ['Priority', 'select', true, ['Low', 'Medium', 'High', 'Critical']],
        ['Project Status', 'select', true, ['Not Started', 'Ongoing', 'On Hold']],
      ]],
    ],
  },
  'Assign Project': {
    heading: 'Assign Project',
    description: 'Allocate employees and managers to a project.',
    groups: [
      ['Assignment Information', [
        ['Project Name / ID', 'text', true],
        ['Project Manager', 'text', true],
        ['Employee Name / ID', 'text', true],
        ['Department', 'text', true],
        ['Role in Project', 'text', true],
        ['Allocation Percentage', 'number', true],
        ['Assignment Date', 'date', true],
        ['Expected Completion', 'date'],
      ]],
    ],
  },
  'Allocate Employee': {
    heading: 'Employee Department Allocation',
    description: 'Allocate an employee to a department and reporting manager.',
    groups: [
      ['Employee Information', [
        ['Employee Name / ID', 'text', true],
        ['Department', 'select', true, ['Development', 'Design', 'Marketing', 'Human Resources', 'Finance']],
        ['Reporting Manager', 'text', true],
        ['Team Name', 'text'],
        ['Allocation Date', 'date', true],
      ]],
    ],
  },
  'Add Performance Review': {
    heading: 'Employee Performance Review',
    description: 'Record an employee performance assessment.',
    groups: [
      ['Review Information', [
        ['Employee Name / ID', 'text', true],
        ['Department', 'text', true],
        ['Review Period', 'text', true],
        ['Tasks Completed', 'number'],
        ['Productivity Score', 'number', true],
        ['Attendance Score', 'number'],
        ['Overall Rating', 'select', true, ['Excellent', 'Good', 'Average', 'Needs Improvement']],
        ['Reviewer Comments', 'textarea'],
      ]],
    ],
  },
  'Upload Document': {
    heading: 'Upload Employee Document',
    description: 'Add a document record to an employee profile.',
    groups: [
      ['Document Information', [
        ['Employee Name / ID', 'text', true],
        ['Document Name', 'text', true],
        ['Document Category', 'select', true, ['Personal', 'Education', 'Employment', 'Other']],
        ['Upload Date', 'date', true],
        ['Verification Status', 'select', true, ['Pending', 'Verified']],
        ['Remarks', 'textarea'],
      ]],
    ],
  },
  'Update Salary': {
    heading: 'Update Employee Salary',
    description: 'Record an employee salary revision.',
    groups: [
      ['Salary Information', [
        ['Employee Name / ID', 'text', true],
        ['Department', 'text', true],
        ['Current Monthly Salary', 'number'],
        ['Revised Monthly Salary', 'number', true],
        ['Effective Date', 'date', true],
        ['Salary Type', 'select', true, ['Monthly', 'Annual']],
        ['Remarks', 'textarea'],
      ]],
    ],
  },
  'Update Employment Status': {
    heading: 'Update Employment Status',
    description: 'Update an employee employment record.',
    groups: [
      ['Employment Information', [
        ['Employee Name / ID', 'text', true],
        ['Employment Type', 'select', true, ['Full-time', 'Part-time', 'Contract', 'Intern']],
        ['Current Status', 'select', true, ['Active', 'On Leave', 'Inactive']],
        ['Effective Date', 'date', true],
        ['Reason / Remarks', 'textarea'],
      ]],
    ],
  },
  'Update Manager Profile': {
    heading: 'Update Manager Profile',
    description: 'Edit manager contact and professional information.',
    groups: [
      ['Manager Information', [
        ['Manager Name / ID', 'text', true],
        ['Email Address', 'email', true],
        ['Phone Number', 'tel'],
        ['Designation', 'text'],
        ['Experience', 'text'],
        ['Skills', 'text'],
      ]],
    ],
  },
  'Assign Department': {
    heading: 'Assign Department to Manager',
    description: 'Define a manager department responsibility.',
    groups: [
      ['Department Assignment', [
        ['Manager Name / ID', 'text', true],
        ['Department', 'select', true, ['Development', 'Design', 'Marketing', 'Human Resources', 'Finance']],
        ['Team Size', 'number'],
        ['Assignment Date', 'date', true],
        ['Responsibilities', 'textarea'],
      ]],
    ],
  },
  'Assign Manager to Project': {
    heading: 'Assign Manager to Project',
    description: 'Assign a manager to lead a project.',
    groups: [
      ['Project Leadership', [
        ['Project Name / ID', 'text', true],
        ['Manager Name / ID', 'text', true],
        ['Department', 'text', true],
        ['Start Date', 'date', true],
        ['Expected Completion', 'date'],
        ['Responsibilities', 'textarea'],
      ]],
    ],
  },
  'Add Manager Review': {
    heading: 'Manager Performance Review',
    description: 'Record team leadership and delivery performance.',
    groups: [
      ['Review Information', [
        ['Manager Name / ID', 'text', true],
        ['Review Period', 'text', true],
        ['Team Productivity', 'number'],
        ['Projects Managed', 'number'],
        ['Leadership Rating', 'select', true, ['Excellent', 'Good', 'Average', 'Needs Improvement']],
        ['Reviewer Comments', 'textarea'],
      ]],
    ],
  },
  'Manage Project Team': {
    heading: 'Manage Project Team',
    description: 'Add or update project team members.',
    groups: [
      ['Project Team Information', [
        ['Project Name / ID', 'text', true],
        ['Project Manager', 'text', true],
        ['Employee Name / ID', 'text', true],
        ['Department', 'text'],
        ['Project Role', 'text'],
        ['Allocation Percentage', 'number'],
        ['Start Date', 'date'],
      ]],
    ],
  },
  'Update Project Progress': {
    heading: 'Update Project Progress',
    description: 'Record current project delivery progress.',
    groups: [
      ['Progress Information', [
        ['Project Name / ID', 'text', true],
        ['Completion Percentage', 'number', true],
        ['Tasks Completed', 'number'],
        ['Total Tasks', 'number'],
        ['Project Status', 'select', true, ['On Track', 'In Progress', 'At Risk', 'Delayed', 'Completed']],
        ['Progress Notes', 'textarea'],
      ]],
    ],
  },
  'Update Project Budget': {
    heading: 'Update Project Budget',
    description: 'Record project budget allocation and expenses.',
    groups: [
      ['Budget Information', [
        ['Project Name / ID', 'text', true],
        ['Allocated Budget', 'number', true],
        ['Actual Cost', 'number'],
        ['Remaining Budget', 'number'],
        ['Effective Date', 'date'],
        ['Remarks', 'textarea'],
      ]],
    ],
  },
  'Update Deadline': {
    heading: 'Update Project Deadline',
    description: 'Revise a project delivery deadline.',
    groups: [
      ['Deadline Information', [
        ['Project Name / ID', 'text', true],
        ['Current Deadline', 'date'],
        ['Revised Deadline', 'date', true],
        ['Reason for Extension', 'textarea', true],
        ['Approved By', 'text'],
      ]],
    ],
  },
  'Allocate Manager': {
    heading: 'Manager Project Allocation',
    description: 'Allocate a manager to a project and team.',
    groups: [
      ['Allocation Information', [
        ['Manager Name / ID', 'text', true],
        ['Project Name / ID', 'text', true],
        ['Department', 'text'],
        ['Team Size', 'number'],
        ['Allocation Date', 'date', true],
      ]],
    ],
  },
  'Assign Responsibility': {
    heading: 'Assign Project Responsibility',
    description: 'Define a responsibility for a project member.',
    groups: [
      ['Responsibility Information', [
        ['Responsibility Title', 'text', true],
        ['Project Name / ID', 'text', true],
        ['Assigned Employee', 'text', true],
        ['Due Date', 'date', true],
        ['Priority', 'select', true, ['Low', 'Medium', 'High']],
        ['Description', 'textarea'],
      ]],
    ],
  },
  'Record Attendance': {
    heading: 'Record Employee Attendance',
    description: 'Record an attendance entry. The official check-in time is 9:00 AM.',
    groups: [
      ['Attendance Information', [
        ['Employee Name / ID', 'text', true],
        ['Attendance Date', 'date', true],
        ['Check-in Time', 'time'],
        ['Check-out Time', 'time'],
        ['Attendance Status', 'select', true, ['Present', 'Late', 'Absent', 'On Leave']],
        ['Remarks', 'textarea'],
      ]],
    ],
  },
  'Add Expense': {
    heading: 'Add Operational Expense',
    description: 'Record a company operational expense.',
    groups: [
      ['Expense Information', [
        ['Expense Name', 'text', true],
        ['Category', 'select', true, ['Facilities', 'Technology', 'Utilities', 'Travel', 'Marketing', 'Other']],
        ['Amount', 'number', true],
        ['Expense Date', 'date', true],
        ['Payment Status', 'select', true, ['Paid', 'Pending']],
        ['Vendor / Reference', 'text'],
        ['Description', 'textarea'],
      ]],
    ],
  },
  'Edit Admin Profile': {
    heading: 'Edit Administrator Profile',
    description: 'Update Super Admin contact information.',
    groups: [
      ['Administrator Information', [
        ['Full Name', 'text', true],
        ['Email Address', 'email', true],
        ['Phone Number', 'tel'],
        ['Designation', 'text'],
      ]],
    ],
  },
  'Edit Organization Details': {
    heading: 'Edit Organization Details',
    description: 'Update the organization information.',
    groups: [
      ['Organization Information', [
        ['Organization Name', 'text', true],
        ['Email Address', 'email'],
        ['Phone Number', 'tel'],
        ['Website', 'text'],
        ['Address', 'textarea'],
        ['Working Days', 'text'],
      ]],
    ],
  },
  'Update Security Settings': {
    heading: 'Update Security Settings',
    description: 'Configure administrator account security.',
    groups: [
      ['Security Configuration', [
        ['Two-factor Authentication', 'select', true, ['Enabled', 'Disabled']],
        ['Login Notifications', 'select', true, ['Enabled', 'Disabled']],
        ['Session Timeout (minutes)', 'number'],
      ]],
    ],
  },
  'Update Password': {
    heading: 'Change Administrator Password',
    description: 'Enter your current password and choose a new password.',
    groups: [
      ['Password Information', [
        ['Current Password', 'password', true],
        ['New Password', 'password', true],
        ['Confirm New Password', 'password', true],
      ]],
    ],
  },
  'Edit Preferences': {
    heading: 'System Preferences',
    description: 'Configure your WorkSphere display preferences.',
    groups: [
      ['Preferences', [
        ['Theme', 'select', true, ['Ocean Mist', 'Light', 'Dark']],
        ['Timezone', 'select', true, ['Asia/Kolkata', 'UTC', 'Asia/Dubai']],
        ['Language', 'select', true, ['English']],
        ['Date Format', 'select', true, ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']],
      ]],
    ],
  },
  'Configure Attendance Rules': {
    heading: 'Attendance Cutoff Settings',
    description: 'Set official attendance and absence rules for the organization.',
    groups: [
      ['Attendance Rules', [
        ['Official Check-in Time', 'time', true],
        ['Late Arrival After', 'time', true],
        ['Absence Cutoff Time', 'time', true],
        ['Working Hours Per Day', 'number'],
        ['Timezone', 'select', true, ['Asia/Kolkata', 'UTC']],
      ]],
    ],
  },
}

// Main dashboard

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('overview')
  const [activeSection, setActiveSection] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const pageTitle =
    groups.flatMap(group => group.items)
      .find(item => item[0] === activePage)?.[1] || 'Overview'

  const openPage = id => {
    setActivePage(id)
    setActiveSection(null)
    setNotificationsOpen(false)
  }

  return (
    <div className="ws-dashboard">
      <aside
        className={`ws-sidebar ${expanded ? 'ws-expanded' : ''}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="ws-brand">
          <span className="ws-logo">W</span>
          <span className="ws-sidebar-label">WorkSphere</span>
        </div>

        <div className="ws-admin-mini">
          <div className="ws-avatar">A</div>
          <div className="ws-sidebar-label">
            <strong>Admin User</strong>
            <small>Super Administrator</small>
          </div>
        </div>

        <nav className="ws-navigation">
          {groups.map(group => (
            <div className="ws-menu-group" key={group.title}>
              <p className="ws-group-title">{group.title}</p>

              {group.items.map(([id, label, icon]) => (
                <button
                  key={id}
                  type="button"
                  title={!expanded ? label : ''}
                  className={`ws-menu-item ${activePage === id ? 'active' : ''}`}
                  onClick={() => openPage(id)}
                >
                  <span className="ws-menu-icon">{icon}</span>
                  <span className="ws-sidebar-label">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button
          className="ws-logout"
          type="button"
          title={!expanded ? 'Logout' : ''}
          onClick={onLogout}
        >
          <span className="ws-menu-icon">↪</span>
          <span className="ws-sidebar-label">Logout</span>
        </button>
      </aside>

      <main className="ws-main">
        <header className="ws-topbar">
          <div>
            <p className="ws-eyebrow">WORKSPHERE / SUPER ADMIN</p>
            <h2>{activeSection || pageTitle}</h2>
          </div>

          <div className="ws-top-actions">
            <input
              className="ws-search"
              placeholder="Search anything..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="ws-notification-wrap">
              <button
                className="ws-icon-button"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                ♧<i />
              </button>

              {notificationsOpen && (
                <div className="ws-notification-pop">
                  <strong>Notifications</strong>
                  <p>3 leave requests need approval.</p>
                  <p>2 projects were updated today.</p>
                  <p>Monthly report is ready.</p>
                </div>
              )}
            </div>

            <div className="ws-top-profile">
              <div className="ws-avatar">A</div>
              <div>
                <strong>Admin User</strong>
                <small>Super Admin</small>
              </div>
            </div>
          </div>
        </header>

        <div
          className="ws-page-content"
          key={`${activePage}-${activeSection || 'main'}`}
        >
          {activeSection ? (
            <SecondaryPage
              section={activeSection}
              parentTitle={moduleData[activePage]?.title || pageTitle}
              onBack={() => setActiveSection(null)}
            />
          ) : activePage === 'overview' ? (
            <Overview />
          ) : (
            <ModulePage
              title={moduleData[activePage].title}
              description={moduleData[activePage].description}
              cards={moduleData[activePage].sections}
              onOpen={setActiveSection}
            />
          )}
        </div>
      </main>
    </div>
  )
}

// Overview

function Overview() {
  return (
    <div className="ws-content">
      <section className="ws-welcome glass-panel">
        <div>
          <span className="ws-pill">ORGANIZATION OVERVIEW</span>
          <h1>Good afternoon, Admin <span>✦</span></h1>
          <p>Here is what's happening across your organization today.</p>
        </div>
        <div className="ws-welcome-date">WORKSPACE CONTROL CENTRE</div>
      </section>

      <section className="ws-stat-grid">
        {stats.map(([title, value, change, icon]) => (
          <article className="ws-stat-card glass-panel" key={title}>
            <div className="ws-stat-top">
              <span>{title}</span>
              <span className="ws-stat-icon">{icon}</span>
            </div>
            <h2>{value}</h2>
            <p>
              <b>{change}</b>
              <span>
                {title === 'Departments'
                  ? ' departments registered'
                  : ' from previous period'}
              </span>
            </p>
          </article>
        ))}
      </section>

      <section className="ws-two-columns">
        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Performance Analytics</h3>
              <p>Organization productivity</p>
            </div>
            <span className="ws-pill">THIS YEAR</span>
          </div>

          <div className="ws-chart">
            {[42, 60, 48, 76, 65, 88, 72, 95, 78, 85, 68, 92].map((v, i) => (
              <div className="ws-chart-column" key={i}>
                <div style={{ height: `${v}%` }} />
                <small>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </small>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Attendance Overview</h3>
              <p>Today's employee attendance</p>
            </div>
            <span className="ws-pill">TODAY</span>
          </div>

          <div className="ws-attendance-number">
            <strong>88%</strong>
            <span>Attendance rate</span>
          </div>
          <div className="ws-progress-track">
            <div style={{ width: '88%' }} />
          </div>

          <div className="ws-attendance-list">
            <span><i className="dot present" /> Present <b>218</b></span>
            <span><i className="dot late" /> Late <b>14</b></span>
            <span><i className="dot absent" /> Absent <b>8</b></span>
            <span><i className="dot leave" /> On Leave <b>8</b></span>
          </div>
        </article>
      </section>

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div>
            <h3>Project Progress</h3>
            <p>Current project delivery status</p>
          </div>
          <span className="ws-pill">36 PROJECTS</span>
        </div>

        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                <th>PROJECT</th>
                <th>TEAM</th>
                <th>PROGRESS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p[0]}>
                  <td>{p[0]}</td>
                  <td>{p[1]}</td>
                  <td>
                    <div className="ws-table-progress">
                      <div><span style={{ width: `${p[2]}%` }} /></div>
                      {p[2]}%
                    </div>
                  </td>
                  <td><span className="ws-status">{p[3]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ws-two-columns">
        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Revenue & Expenses</h3>
              <p>Financial overview</p>
            </div>
            <span className="ws-pill">HALF-YEAR</span>
          </div>

          <div className="ws-finance-row">
            <span>Revenue</span><strong>₹24.5L</strong>
          </div>
          <div className="ws-finance-row">
            <span>Total Expenses</span><strong>₹17.0L</strong>
          </div>
          <div className="ws-finance-row">
            <span>Net Profit</span><strong className="ws-profit">₹7.5L</strong>
          </div>
          <div className="ws-progress-track">
            <div style={{ width: '69%' }} />
          </div>
          <small className="ws-muted">Profit margin: 30.6%</small>
        </article>

        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Department Overview</h3>
              <p>Employee distribution</p>
            </div>
          </div>

          {departments.map(d => (
            <div className="ws-department" key={d[0]}>
              <div><span>{d[0]}</span><b>{d[1]} employees</b></div>
              <div className="ws-progress-track">
                <div style={{ width: `${d[2]}%` }} />
              </div>
            </div>
          ))}
        </article>
      </section>

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div>
            <h3>Recent Activities</h3>
            <p>Latest organization updates</p>
          </div>
          <span className="ws-pill">LIVE FEED</span>
        </div>

        <div className="ws-activity-list">
          {activities.map(a => (
            <div className="ws-activity" key={a[0]}>
              <span className="ws-activity-icon">{a[3]}</span>
              <div>
                <strong>{a[0]}</strong>
                <p>{a[1]}</p>
              </div>
              <small>{a[2]}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Module landing page

function ModulePage({ title, description, cards, onOpen }) {
  return (
    <div className="ws-content">
      <section className="glass-panel ws-module-intro">
        <span className="ws-pill">WORKSPHERE MANAGEMENT</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      <section className="ws-module-grid">
        {cards.map((card, index) => (
          <article
            className="glass-panel ws-module-card"
            key={card}
            onClick={() => onOpen(card)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpen(card)
              }
            }}
          >
            <span className="ws-module-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{card}</h3>
            <p>Open and manage {card.toLowerCase()}.</p>
            <button
              type="button"
              className="ws-secondary-button"
              onClick={e => {
                e.stopPropagation()
                onOpen(card)
              }}
            >
              Open section ↗
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

// Secondary pages

function SecondaryPage({ section, parentTitle, onBack }) {
  const [formMode, setFormMode] = useState(false)
  const [formTitle, setFormTitle] = useState(section)
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [records, setRecords] = useState(
    secondaryConfigs[section]?.rows || []
  )

  const config = secondaryConfigs[section] || {
    subtitle: section,
    metrics: [['Records', '0'], ['Active', '0'], ['Pending', '0']],
    columns: ['Name', 'Category', 'Date', 'Status'],
    rows: [],
  }

  const form = formDefinitions[formTitle]

  const filteredRows = records.filter(row => {
    const matchesSearch = row.join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === 'All' ||
      row.some(cell =>
        String(cell).toLowerCase().includes(filter.toLowerCase())
      )

    return matchesSearch && matchesFilter
  })

  const openForm = title => {
    setFormTitle(title)
    setFormMode(true)
    setSaved(false)
    setNotice('')
    setSelectedRecord(null)
  }

  const closeForm = () => {
    setFormMode(false)
    setSaved(false)
  }

  const submitDemo = e => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const values = Array.from(formData.values()).map(value =>
      String(value || '').trim()
    )

    const newRecord = values.slice(0, config.columns.length)

    while (newRecord.length < config.columns.length) {
      newRecord.push('—')
    }

    if (newRecord.some(Boolean)) {
      setRecords(previous => [...previous, newRecord])
    }

    setSaved(true)
    setNotice(`${formTitle} submitted successfully in this demo.`)
  }

  const exportDemo = () => {
    const csv = [
      config.columns.join(','),
      ...filteredRows.map(row =>
        row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${section.toLowerCase().replaceAll(' ', '-')}.csv`
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Your sample CSV report has been generated.')
  }

  if (formMode) {
    const definition = form || {
      heading: formTitle,
      description: `Enter the details required for ${formTitle.toLowerCase()}.`,
      groups: [
        ['Information', [
          ['Name', 'text', true],
          ['ID', 'text'],
          ['Department', 'text'],
          ['Description', 'textarea'],
          ['Date', 'date'],
        ]],
      ],
    }

    return (
      <div className="ws-content">
        <div className="ws-secondary-heading">
          <button
            type="button"
            className="ws-secondary-back"
            onClick={closeForm}
          >
            ← Back to {section}
          </button>

          <p className="ws-eyebrow">{parentTitle.toUpperCase()} / FORM</p>
          <h1>{definition.heading}</h1>
          <p>{definition.description}</p>
        </div>

        <form className="glass-panel ws-secondary-form" onSubmit={submitDemo}>
          {definition.groups.map(([groupTitle, fields]) => (
            <div className="ws-form-section" key={groupTitle}>
              <h3>{groupTitle}</h3>

              <div className="ws-form-grid">
                {fields.map(([label, type, required, options]) => (
                  <FormField
                    key={label}
                    label={label}
                    name={label.toLowerCase().replaceAll(' ', '-')}
                    type={type}
                    required={Boolean(required)}
                    options={options}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="ws-secondary-form-actions">
            <button
              type="button"
              className="ws-secondary-button"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button type="submit" className="ws-primary-button">
              Save Details
            </button>
          </div>

          {saved && (
            <p className="ws-form-success">
              {notice}
              {' '}This is frontend demo data only; it is not saved to a database.
            </p>
          )}
        </form>
      </div>
    )
  }

  if (selectedRecord) {
    return (
      <div className="ws-content">
        <div className="ws-secondary-heading">
          <button
            type="button"
            className="ws-secondary-back"
            onClick={() => setSelectedRecord(null)}
          >
            ← Back to {section}
          </button>

          <p className="ws-eyebrow">{parentTitle.toUpperCase()} / DETAILS</p>
          <h1>{selectedRecord[0] || 'Record Details'}</h1>
          <p>Review the complete available information for this record.</p>
        </div>

        <section className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>{config.subtitle}</h3>
              <p>Record information</p>
            </div>
            <button
              type="button"
              className="ws-primary-button"
              onClick={() => openForm(
                config.action || `Edit ${section}`
              )}
            >
              Edit Details
            </button>
          </div>

          <div className="ws-record-details">
            {config.columns.map((column, index) => (
              <div className="ws-record-detail" key={column}>
                <span>{column}</span>
                <strong>{selectedRecord[index] || '—'}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="ws-content">
      <div className="ws-secondary-heading">
        <button
          type="button"
          className="ws-secondary-back"
          onClick={onBack}
        >
          ← Back to {parentTitle}
        </button>

        <p className="ws-eyebrow">
          {parentTitle.toUpperCase()} / MANAGEMENT
        </p>
        <h1>{section}</h1>
        <p>{config.subtitle} — manage and review your organization records.</p>
      </div>

      <section className="ws-stat-grid">
        {config.metrics.map(([label, value]) => (
          <article className="ws-stat-card glass-panel" key={label}>
            <div className="ws-stat-top">
              <span>{label}</span>
              <span className="ws-stat-icon">✦</span>
            </div>
            <h2>{value}</h2>
            <p><span>WorkSphere overview</span></p>
          </article>
        ))}
      </section>

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div>
            <h3>{config.subtitle}</h3>
            <p>Search, review and manage the available records.</p>
          </div>

          <div className="ws-secondary-form-actions">
            {config.action && (
              <button
                type="button"
                className="ws-primary-button"
                onClick={() => openForm(config.action)}
              >
                + {config.action}
              </button>
            )}

            <button
              type="button"
              className="ws-secondary-button"
              onClick={exportDemo}
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="ws-secondary-toolbar">
          <input
            className="ws-search"
            placeholder={`Search ${section.toLowerCase()}...`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Records</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
            <option value="Late">Late</option>
          </select>
        </div>

        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                {config.columns.map(column => (
                  <th key={column}>{column}</th>
                ))}
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.length ? (
                filteredRows.map((row, index) => (
                  <tr key={`${section}-${index}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        {cellIndex === row.length - 1 ? (
                          <span className="ws-status">{cell}</span>
                        ) : cell}
                      </td>
                    ))}

                    <td>
                      <div className="ws-row-actions">
                        <button
                          type="button"
                          className="ws-secondary-button"
                          onClick={() => setSelectedRecord(row)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="ws-secondary-button"
                          onClick={() => openForm(
                            config.action || `Edit ${section}`
                          )}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={config.columns.length + 1}>
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="ws-muted">
          {filteredRows.length} record(s) displayed · Sample frontend data
        </p>

        {notice && <p className="ws-form-success">{notice}</p>}
      </section>

      {section === 'Pending Approvals' && (
        <section className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Leave Approval Actions</h3>
              <p>Review and update pending employee leave requests.</p>
            </div>
          </div>

          <div className="ws-secondary-form-actions">
            <button
              className="ws-primary-button"
              type="button"
              onClick={() => setNotice('Demo: selected leave request approved.')}
            >
              Approve Request
            </button>

            <button
              className="ws-secondary-button"
              type="button"
              onClick={() => setNotice('Demo: selected leave request rejected.')}
            >
              Reject Request
            </button>
          </div>

          {notice && <p className="ws-form-success">{notice}</p>}
        </section>
      )}

      {[
        'Overall Performance',
        'Employee Productivity',
        'Department Performance',
        'Project Efficiency',
        'Performance Trends',
        'Financial Overview',
        'Half-yearly Revenue',
        'Yearly Revenue',
        'Employee Salary Expenses',
        'Project Costings',
        'Profit & Loss',
      ].includes(section) && (
        <section className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>{section} Insights</h3>
              <p>Visual summary based on the sample records.</p>
            </div>
          </div>

          <div className="ws-insight-bars">
            {config.metrics.map(([label, value], index) => (
              <div className="ws-insight-item" key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <div className="ws-progress-track">
                  <div style={{ width: `${Math.max(20, 85 - index * 18)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {[
        'Monthly Reports',
        'Half-yearly Reports',
        'Yearly Reports',
        'Employee Reports',
        'Attendance Reports',
        'Finance Reports',
        'Project Reports',
        'Leave Reports',
      ].includes(section) && (
        <section className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Report Generation</h3>
              <p>Generate a downloadable CSV using the displayed sample records.</p>
            </div>
            <button
              type="button"
              className="ws-primary-button"
              onClick={exportDemo}
            >
              Generate Report
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

// Reusable form field

function FormField({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  options = [],
}) {
  return (
    <label className="ws-form-field">
      <span>{label}{required ? ' *' : ''}</span>

      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={3}
        />
      ) : type === 'select' ? (
        <select name={name} required={required} defaultValue="">
          <option value="" disabled>Select {label}</option>
          {options.map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  )
}

export default Dashboard

