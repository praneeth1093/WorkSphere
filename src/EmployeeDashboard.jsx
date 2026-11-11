
import { useState } from 'react'
import './Dashboard.css'

const menuGroups = [
  {
    title: 'MAIN MENU',
    items: [['overview', 'Overview', '⌂']],
  },
  {
    title: 'MY WORK',
    items: [
      ['my-projects', 'My Projects', '▣'],
      ['my-tasks', 'My Tasks', '☑'],
      ['daily-updates', 'Daily Work Updates', '✎'],
    ],
  },
  {
    title: 'TIME MANAGEMENT',
    items: [
      ['attendance', 'My Attendance', '◷'],
      ['leave', 'Leave Management', '▦'],
    ],
  },
  {
    title: 'MY PERFORMANCE',
    items: [
      ['performance', 'My Performance', '↗'],
      ['reports', 'My Reports', '▤'],
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      ['profile', 'My Profile', '♙'],
      ['salary', 'My Salary', '₹'],
      ['settings', 'Settings', '⚙'],
    ],
  },
]

const moduleNames = Object.fromEntries(
  menuGroups.flatMap(group => group.items.map(([id, name]) => [id, name]))
)

const sections = {
  'my-projects': [
    ['project-list', 'Project List', 'View all projects assigned to you.'],
    ['project-details', 'Project Details', 'Review project information and responsibilities.'],
    ['project-progress', 'Project Progress', 'Track your project completion percentage.'],
    ['project-deadlines', 'Project Deadlines', 'Review upcoming delivery dates.'],
  ],
  'my-tasks': [
    ['all-tasks', 'All Tasks', 'View all tasks assigned to you.'],
    ['pending-tasks', 'Pending Tasks', 'Review tasks waiting to be started.'],
    ['active-tasks', 'In-progress Tasks', 'Monitor your current work.'],
    ['completed-tasks', 'Completed Tasks', 'Review your completed tasks.'],
    ['task-details', 'Task Details', 'View detailed task information.'],
  ],
  'daily-updates': [
    ['submit-update', 'Submit Daily Update', 'Share the work you completed today.'],
    ['previous-updates', 'Previous Updates', 'View your previous work submissions.'],
    ['update-history', 'Update History', 'Review your submitted work history.'],
  ],
  attendance: [
    ['today-attendance', "Today's Attendance", 'Manage your check-in and check-out.'],
    ['attendance-history', 'Attendance History', 'View your previous attendance records.'],
    ['monthly-attendance', 'Monthly Summary', 'Review your monthly attendance statistics.'],
  ],
  leave: [
    ['apply-leave', 'Apply for Leave', 'Submit a new leave application.'],
    ['leave-balance', 'Leave Balance', 'View your available leave days.'],
    ['leave-history', 'Leave History', 'Review your previous leave requests.'],
    ['pending-leave', 'Pending Requests', 'Track leave applications awaiting approval.'],
  ],
  performance: [
    ['performance-overview', 'Performance Overview', 'Review your overall performance score.'],
    ['my-goals', 'My Goals', 'Track your professional goals.'],
    ['achievements', 'My Achievements', 'Review your completed milestones.'],
    ['feedback', 'Manager Feedback', 'View feedback from your manager.'],
  ],
  reports: [
    ['attendance-report', 'Attendance Report', 'View your personal attendance report.'],
    ['task-report', 'Task Report', 'Review your task completion report.'],
    ['project-report', 'Project Report', 'Review your project progress report.'],
    ['performance-report', 'Performance Report', 'View your performance report.'],
  ],
  profile: [
    ['personal-details', 'Personal Details', 'View your personal information.'],
    ['contact-details', 'Contact Information', 'Review your registered contact details.'],
    ['job-details', 'Job Information', 'View your designation and employment details.'],
  ],
  salary: [
    ['salary-overview', 'Salary Overview', 'View your monthly salary summary.'],
    ['salary-breakdown', 'Salary Breakdown', 'Review your earnings and deductions.'],
    ['payslips', 'My Payslips', 'Access your individual monthly payslips.'],
    ['salary-history', 'Salary History', 'Review your previous salary records.'],
  ],
  settings: [
    ['account-preferences', 'Account Preferences', 'Manage your workspace preferences.'],
    ['notification-settings', 'Notifications', 'Manage your notification preferences.'],
    ['security-settings', 'Security', 'Review your account security settings.'],
  ],
}

const sectionNames = Object.fromEntries(
  Object.values(sections).flat().map(([id, name]) => [id, name])
)

const initialProjects = [
  {
    id: 1,
    name: 'WorkSphere Website',
    manager: 'Rahul Sharma',
    deadline: '20 Nov 2026',
    progress: 78,
    status: 'In Progress',
    description: 'Development of the WorkSphere company website.',
  },
  {
    id: 2,
    name: 'Employee Portal',
    manager: 'Priya Reddy',
    deadline: '28 Nov 2026',
    progress: 55,
    status: 'In Progress',
    description: 'Development of the employee self-service portal.',
  },
  {
    id: 3,
    name: 'HR Analytics System',
    manager: 'Rahul Sharma',
    deadline: '05 Dec 2026',
    progress: 30,
    status: 'In Progress',
    description: 'Development of the HR analytics dashboard.',
  },
]

const initialTasks = [
  {
    id: 1,
    name: 'Complete dashboard UI',
    project: 'WorkSphere Website',
    due: 'Today',
    priority: 'High',
    status: 'In Progress',
    description: 'Complete the assigned dashboard interface.',
  },
  {
    id: 2,
    name: 'Review employee profile page',
    project: 'Employee Portal',
    due: 'Tomorrow',
    priority: 'Medium',
    status: 'Pending',
    description: 'Review and improve the employee profile page.',
  },
  {
    id: 3,
    name: 'Submit weekly work report',
    project: 'HR Analytics System',
    due: '12 Nov 2026',
    priority: 'Low',
    status: 'Completed',
    description: 'Submit the weekly work progress report.',
  },
]

const initialLeaves = [
  {
    id: 1,
    type: 'Casual Leave',
    from: '02 Nov 2026',
    to: '02 Nov 2026',
    days: 1,
    reason: 'Personal work',
    status: 'Approved',
  },
  {
    id: 2,
    type: 'Sick Leave',
    from: '18 Oct 2026',
    to: '19 Oct 2026',
    days: 2,
    reason: 'Health reasons',
    status: 'Approved',
  },
  {
    id: 3,
    type: 'Casual Leave',
    from: '15 Nov 2026',
    to: '15 Nov 2026',
    days: 1,
    reason: 'Personal work',
    status: 'Pending',
  },
]

const initialUpdates = [
  {
    id: 1,
    date: '10 Nov 2026',
    description: 'Completed dashboard UI components.',
    hours: 7.5,
  },
  {
    id: 2,
    date: '09 Nov 2026',
    description: 'Worked on employee portal development.',
    hours: 8,
  },
]

const attendanceRecords = [
  { id: 1, date: '10 Nov 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9 hrs', status: 'Present' },
  { id: 2, date: '09 Nov 2026', checkIn: '08:55 AM', checkOut: '06:05 PM', hours: '9 hrs 10 min', status: 'Present' },
  { id: 3, date: '08 Nov 2026', checkIn: '09:12 AM', checkOut: '06:00 PM', hours: '8 hrs 48 min', status: 'Late' },
  { id: 4, date: '07 Nov 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9 hrs', status: 'Present' },
]

const employee = {
  name: 'Praneeth Kumar',
  designation: 'Frontend Developer',
  department: 'Development',
  employeeId: 'WS-EMP-1042',
  manager: 'Rahul Sharma',
  email: 'praneeth@worksphere.com',
  phone: '+91 98765 43210',
  joiningDate: '10 January 2025',
}

const notifications = [
  'Your project deadline is approaching.',
  'Your weekly work report is due.',
  'Your attendance was marked successfully.',
]

function ModulePage({ title, description, cards, onOpen, children }) {
  return (
    <div className="ws-module-page">
      <div className="ws-module-intro">
        <div>
          <span className="ws-eyebrow">EMPLOYEE WORKSPACE</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {cards && (
        <div className="ws-module-grid">
          {cards.map((card, index) => (
            <button
              type="button"
              className="ws-module-card"
              key={card.id}
              onClick={() => onOpen?.(card.id)}
            >
              <span className="ws-module-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="ws-open-label">OPEN SECTION ↗</span>
            </button>
          ))}
        </div>
      )}

      {children}
    </div>
  )
}

function PageIntro({ title, description }) {
  return (
    <div className="ws-module-intro">
      <div>
        <span className="ws-eyebrow">EMPLOYEE WORKSPACE</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

function Panel({ title, description, children, action }) {
  return (
    <div className="ws-panel glass-panel">
      <div className="ws-panel-heading">
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

function MetricCards({ items }) {
  return (
    <div className="ws-stat-grid">
      {items.map((item, index) => (
        <div className="ws-stat-card glass-panel" key={index}>
          <div className="ws-stat-top">
            <span>{item.label}</span>
            <span className="ws-stat-icon">{item.icon || '▣'}</span>
          </div>
          <h2>{item.value}</h2>
          <p>{item.note}</p>
        </div>
      ))}
    </div>
  )
}

function Status({ value }) {
  return <span className="ws-status">{value}</span>
}

function DataTable({ columns, rows, empty = 'No records found.' }) {
  return (
    <div className="ws-table-wrap">
      <table className="ws-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{empty}</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row.id ?? index}>
                {columns.map(column => (
                  <td key={column.label}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div className="ws-form-group">
      <label>{label}</label>
      {children}
    </div>
  )
}

function EmployeeDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('overview')
  const [activeSection, setActiveSection] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)
  const [workUpdate, setWorkUpdate] = useState('')
  const [updates, setUpdates] = useState(initialUpdates)
  const [leaveType, setLeaveType] = useState('Casual Leave')
  const [leaveReason, setLeaveReason] = useState('')
  const [leaveFrom, setLeaveFrom] = useState('')
  const [leaveTo, setLeaveTo] = useState('')
  const [leaves, setLeaves] = useState(initialLeaves)
  const [tasksData, setTasksData] = useState(initialTasks)
  const [profile, setProfile] = useState(employee)
  const [settings, setSettings] = useState({
    email: true,
    tasks: true,
    projects: true,
    security: true,
  })
  const [toast, setToast] = useState('')

  const notify = message => {
    setToast(message)
    window.clearTimeout(notify.timer)
    notify.timer = window.setTimeout(() => setToast(''), 2500)
  }

  const handlePageChange = page => {
    setActivePage(page)
    setActiveSection(null)
    setSearch('')
    setNotificationOpen(false)
  }

  const openSection = section => {
    setActiveSection(section)
    setSearch('')
  }

  const backToModule = () => {
    setActiveSection(null)
    setSearch('')
  }

  const filtered = (items, fields) => {
    const query = search.trim().toLowerCase()
    if (!query) return items
    return items.filter(item =>
      fields.some(field =>
        String(item[field] ?? '').toLowerCase().includes(query)
      )
    )
  }

  const handleCheckIn = () => {
    if (checkedIn) return
    setCheckedIn(true)
    notify('Your check-in has been recorded.')
  }

  const handleCheckOut = () => {
    if (!checkedIn || checkedOut) return
    setCheckedOut(true)
    notify('Your check-out has been recorded.')
  }

  const handleLeaveSubmit = event => {
    event.preventDefault()

    if (!leaveReason.trim() || !leaveFrom || !leaveTo) {
      notify('Please complete all leave details.')
      return
    }

    if (new Date(leaveTo) < new Date(leaveFrom)) {
      notify('The end date cannot be before the start date.')
      return
    }

    const fromDate = new Date(`${leaveFrom}T00:00:00`)
    const toDate = new Date(`${leaveTo}T00:00:00`)
    const days = Math.round((toDate - fromDate) / 86400000) + 1

    setLeaves(prev => [
      ...prev,
      {
        id: Date.now(),
        type: leaveType,
        from: fromDate.toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        }),
        to: toDate.toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        }),
        days,
        reason: leaveReason,
        status: 'Pending',
      },
    ])

    setLeaveReason('')
    setLeaveFrom('')
    setLeaveTo('')
    notify('Leave request submitted successfully.')
    backToModule()
  }

  const handleUpdateSubmit = event => {
    event.preventDefault()

    if (!workUpdate.trim()) {
      notify('Please enter your work update.')
      return
    }

    setUpdates(prev => [
      {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        }),
        description: workUpdate,
        hours: 8,
      },
      ...prev,
    ])

    setWorkUpdate('')
    notify('Your daily work update has been submitted.')
    backToModule()
  }

  const updateTaskStatus = (id, status) => {
    setTasksData(prev => prev.map(task =>
      task.id === id ? { ...task, status } : task
    ))
    notify('Task status updated.')
  }

  const exportReport = title => {
    const rows = [
      ['WorkSphere Employee Report', title],
      ['Employee', profile.name],
      ['Employee ID', profile.employeeId],
      ['Generated', new Date().toLocaleDateString()],
      [],
      ['Task', 'Project', 'Due Date', 'Priority', 'Status'],
      ...tasksData.map(task => [
        task.name, task.project, task.due, task.priority, task.status,
      ]),
    ]

    const csv = rows.map(row =>
      row.map(value =>
        `"${String(value ?? '').replaceAll('"', '""')}"`
      ).join(',')
    ).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.toLowerCase().replaceAll(' ', '-')}.csv`
    link.click()
    URL.revokeObjectURL(url)
    notify('Report exported successfully.')
  }

  const projects = initialProjects
  const completedTasks = tasksData.filter(task => task.status === 'Completed').length
  const pendingTasks = tasksData.filter(task => task.status === 'Pending').length
  const activeTasks = tasksData.filter(task => task.status === 'In Progress').length
  const pendingLeaves = leaves.filter(leave => leave.status === 'Pending').length

  const moduleCards = (activePage === 'overview'
    ? []
    : sections[activePage] || []
  ).map(([id, title, description]) => ({ id, title, description }))

  const renderOverview = () => (
    <>
      <div className="ws-welcome">
        <div>
          <span className="ws-eyebrow">EMPLOYEE WORKSPACE</span>
          <h1>Welcome back, {profile.name.split(' ')[0]}! 👋</h1>
          <p>Here's what's happening with your work today.</p>
        </div>
        <div className="ws-pill">
          <span className="ws-status-dot"></span>
          {checkedOut ? 'Checked Out' : checkedIn ? 'Checked In' : 'Not Checked In'}
        </div>
      </div>

      <MetricCards items={[
        { label: 'My Projects', value: '03', note: 'Assigned projects', icon: '▣' },
        { label: 'My Tasks', value: tasksData.length, note: `${completedTasks} completed`, icon: '☑' },
        { label: 'Attendance', value: '22', note: 'Present days this month', icon: '◷' },
        { label: 'Leave Balance', value: '12', note: 'Available leave days', icon: '▦' },
      ]} />

      <div className="ws-two-columns">
        <Panel
          title="Today's Attendance"
          description="Manage your check-in and check-out"
        >
          <div className="ws-attendance-number">
            <h2>{checkedOut ? 'Completed' : checkedIn ? '09:00 AM' : '--:--'}</h2>
            <span>
              {checkedOut ? 'Workday completed' : checkedIn ? 'Check-in recorded' : 'Awaiting check-in'}
            </span>
          </div>

          <div className="ws-attendance-list">
            <div>
              <span className="ws-attendance-dot present"></span>
              Official check-in time: 9:00 AM
            </div>
            <div>
              <span className="ws-attendance-dot leave"></span>
              {checkedIn ? 'You have checked in today' : 'Remember to mark your attendance'}
            </div>
          </div>

          <div className="ws-attendance-actions">
            <button className="ws-primary-button" onClick={handleCheckIn} disabled={checkedIn}>
              {checkedIn ? 'Checked In' : 'Check In'}
            </button>
            <button className="ws-secondary-button" onClick={handleCheckOut} disabled={!checkedIn || checkedOut}>
              {checkedOut ? 'Checked Out' : 'Check Out'}
            </button>
          </div>
        </Panel>

        <Panel title="My Performance" description="Your monthly performance overview">
          <div className="ws-attendance-number">
            <h2>86%</h2>
            <span>Overall performance score</span>
          </div>
          <div className="ws-progress-track">
            <div style={{ width: '86%' }}></div>
          </div>
          <div className="ws-finance-row"><span>Task completion</span><strong>82%</strong></div>
          <div className="ws-finance-row"><span>Project contribution</span><strong>90%</strong></div>
          <div className="ws-finance-row"><span>Attendance score</span><strong>95%</strong></div>
        </Panel>
      </div>

      <Panel
        title="My Active Projects"
        description="Track your assigned project progress"
        action={
          <button className="ws-text-button" onClick={() => handlePageChange('my-projects')}>
            View All →
          </button>
        }
      >
        <DataTable
          columns={[
            { label: 'Project', key: 'name' },
            { label: 'Manager', key: 'manager' },
            { label: 'Deadline', key: 'deadline' },
            { label: 'Progress', render: row => (
              <div className="ws-table-progress">
                <div className="ws-progress-track">
                  <div style={{ width: `${row.progress}%` }}></div>
                </div>
                <span>{row.progress}%</span>
              </div>
            ) },
            { label: 'Status', render: row => <Status value={row.status} /> },
          ]}
          rows={projects}
        />
      </Panel>

      <div className="ws-two-columns">
        <Panel
          title="My Upcoming Tasks"
          description="Your current responsibilities"
          action={
            <button className="ws-text-button" onClick={() => handlePageChange('my-tasks')}>
              View All →
            </button>
          }
        >
          <div className="ws-activity-list">
            {tasksData.map(task => (
              <div className="ws-activity" key={task.id}>
                <div className="ws-activity-icon">✓</div>
                <div>
                  <strong>{task.name}</strong>
                  <p>{task.project} · {task.due}</p>
                  <Status value={task.status} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent Notifications" description="Your latest workplace updates">
          <div className="ws-activity-list">
            {notifications.map((item, index) => (
              <div className="ws-activity" key={index}>
                <div className="ws-activity-icon">♢</div>
                <div>
                  <strong>{item}</strong>
                  <p>{index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '2 days ago'}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )

  const renderProjectSection = section => {
    let rows = filtered(initialProjects, ['name', 'manager', 'status', 'deadline'])

    if (section === 'project-deadlines') {
      rows = [...rows].sort((a, b) => a.deadline.localeCompare(b.deadline))
    }

    if (section === 'project-progress') {
      return (
        <Panel title="Project Progress" description="Progress of your assigned projects">
          {projects.map(project => (
            <div className="ws-activity" key={project.id}>
              <div style={{ flex: 1 }}>
                <strong>{project.name}</strong>
                <div className="ws-progress-track">
                  <div style={{ width: `${project.progress}%` }}></div>
                </div>
                <p>{project.progress}% completed · {project.status}</p>
              </div>
            </div>
          ))}
        </Panel>
      )
    }

    const selected = initialProjects[0]

    if (section === 'project-details') {
      return (
        <Panel title={selected.name} description={selected.description}>
          <div className="ws-profile-details">
            <div><span>Project Name</span><strong>{selected.name}</strong></div>
            <div><span>Project Manager</span><strong>{selected.manager}</strong></div>
            <div><span>Deadline</span><strong>{selected.deadline}</strong></div>
            <div><span>Progress</span><strong>{selected.progress}%</strong></div>
            <div><span>Status</span><strong>{selected.status}</strong></div>
          </div>
        </Panel>
      )
    }

    return (
      <Panel title="Assigned Projects" description="Your current project allocations">
        <DataTable
          columns={[
            { label: 'Project', key: 'name' },
            { label: 'Manager', key: 'manager' },
            { label: 'Deadline', key: 'deadline' },
            { label: 'Progress', render: row => `${row.progress}%` },
            { label: 'Status', render: row => <Status value={row.status} /> },
          ]}
          rows={rows}
        />
      </Panel>
    )
  }

  const renderTaskSection = section => {
    let rows = filtered(tasksData, ['name', 'project', 'status', 'priority'])

    if (section === 'pending-tasks') rows = rows.filter(task => task.status === 'Pending')
    if (section === 'active-tasks') rows = rows.filter(task => task.status === 'In Progress')
    if (section === 'completed-tasks') rows = rows.filter(task => task.status === 'Completed')

    if (section === 'task-details') {
      const task = tasksData[0]
      return (
        <Panel title={task.name} description={task.description}>
          <div className="ws-profile-details">
            <div><span>Task</span><strong>{task.name}</strong></div>
            <div><span>Project</span><strong>{task.project}</strong></div>
            <div><span>Due Date</span><strong>{task.due}</strong></div>
            <div><span>Priority</span><strong>{task.priority}</strong></div>
            <div><span>Status</span><strong>{task.status}</strong></div>
          </div>
        </Panel>
      )
    }

    return (
      <Panel title="My Tasks" description="View your tasks and update their progress">
        <MetricCards items={[
          { label: 'Total Tasks', value: tasksData.length, note: 'Assigned to you' },
          { label: 'Completed', value: completedTasks, note: 'Finished tasks' },
          { label: 'In Progress', value: activeTasks, note: 'Currently working' },
          { label: 'Pending', value: pendingTasks, note: 'Waiting to start' },
        ]} />
        <DataTable
          columns={[
            { label: 'Task', key: 'name' },
            { label: 'Project', key: 'project' },
            { label: 'Due Date', key: 'due' },
            { label: 'Priority', key: 'priority' },
            {
              label: 'Status',
              render: row => (
                <select
                  value={row.status}
                  onChange={event => updateTaskStatus(row.id, event.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              ),
            },
          ]}
          rows={rows}
        />
      </Panel>
    )
  }

  const renderUpdatesSection = section => {
    if (section === 'submit-update') {
      return (
        <Panel title="Submit Today's Update" description="Describe the work you completed today">
          <form onSubmit={handleUpdateSubmit}>
            <FormField label="Work Description">
              <textarea
                rows="5"
                value={workUpdate}
                onChange={event => setWorkUpdate(event.target.value)}
                placeholder="Describe your work today..."
              />
            </FormField>
            <button type="submit" className="ws-primary-button ws-submit-work-button ws-glossy-action-button">
              <span className="ws-button-label">Submit Update</span>
            </button>
          </form>
        </Panel>
      )
    }

    return (
      <Panel
        title={section === 'update-history' ? 'Update History' : 'Previous Updates'}
        description="Your submitted daily work updates"
      >
        <DataTable
          columns={[
            { label: 'Date', key: 'date' },
            { label: 'Work Description', key: 'description' },
            { label: 'Hours Worked', render: row => `${row.hours} hours` },
            { label: 'Status', render: () => <Status value="Submitted" /> },
          ]}
          rows={updates}
        />
      </Panel>
    )
  }

  const renderAttendanceSection = section => {
    if (section === 'today-attendance') {
      return (
        <Panel title="Today's Attendance" description="Manage today's attendance">
          <div className="ws-attendance-number">
            <h2>{checkedOut ? 'Completed' : checkedIn ? '09:00 AM' : '--:--'}</h2>
            <span>{checkedOut ? 'Workday completed' : checkedIn ? 'Checked in successfully' : 'Not checked in yet'}</span>
          </div>
          <div className="ws-attendance-actions">
            <button className="ws-primary-button" onClick={handleCheckIn} disabled={checkedIn}>
              {checkedIn ? 'Checked In' : 'Check In'}
            </button>
            <button className="ws-secondary-button" onClick={handleCheckOut} disabled={!checkedIn || checkedOut}>
              {checkedOut ? 'Checked Out' : 'Check Out'}
            </button>
          </div>
        </Panel>
      )
    }

    if (section === 'monthly-attendance') {
      return (
        <>
          <MetricCards items={[
            { label: 'Present Days', value: '22', note: 'This month' },
            { label: 'Absent Days', value: '01', note: 'This month' },
            { label: 'Late Arrivals', value: '02', note: 'This month' },
            { label: 'Attendance Rate', value: '95%', note: 'Monthly attendance' },
          ]} />
          <Panel title="Monthly Attendance Summary">
            <div className="ws-progress-track"><div style={{ width: '95%' }}></div></div>
            <p>95% attendance rate for November 2026.</p>
          </Panel>
        </>
      )
    }

    return (
      <Panel title="Attendance History" description="Your previous attendance records">
        <DataTable
          columns={[
            { label: 'Date', key: 'date' },
            { label: 'Check In', key: 'checkIn' },
            { label: 'Check Out', key: 'checkOut' },
            { label: 'Working Hours', key: 'hours' },
            { label: 'Status', render: row => <Status value={row.status} /> },
          ]}
          rows={attendanceRecords}
        />
      </Panel>
    )
  }

  const renderLeaveSection = section => {
    if (section === 'apply-leave') {
      return (
        <Panel title="Apply for Leave" description="Submit a new leave application">
          <form onSubmit={handleLeaveSubmit}>
            <FormField label="Leave Type">
              <select value={leaveType} onChange={event => setLeaveType(event.target.value)}>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </FormField>
            <div className="ws-two-columns">
              <FormField label="From Date">
                <input type="date" value={leaveFrom} onChange={event => setLeaveFrom(event.target.value)} />
              </FormField>
              <FormField label="To Date">
                <input type="date" value={leaveTo} onChange={event => setLeaveTo(event.target.value)} />
              </FormField>
            </div>
            <FormField label="Reason">
              <textarea rows="4" value={leaveReason} onChange={event => setLeaveReason(event.target.value)} placeholder="Enter your leave reason..." />
            </FormField>
            <button className="ws-primary-button ws-glossy-action-button" type="submit">
              <span className="ws-button-label">Submit Leave Request</span>
            </button>
          </form>
        </Panel>
      )
    }

    if (section === 'leave-balance') {
      return (
        <>
          <MetricCards items={[
            { label: 'Casual Leave', value: '05', note: 'Days available' },
            { label: 'Sick Leave', value: '04', note: 'Days available' },
            { label: 'Earned Leave', value: '03', note: 'Days available' },
            { label: 'Total Balance', value: '12', note: 'Available leave days' },
          ]} />
          <Panel title="Leave Balance Details">
            <div className="ws-finance-row"><span>Casual Leave</span><strong>05 days</strong></div>
            <div className="ws-finance-row"><span>Sick Leave</span><strong>04 days</strong></div>
            <div className="ws-finance-row"><span>Earned Leave</span><strong>03 days</strong></div>
            <div className="ws-finance-row"><strong>Total Available</strong><strong>12 days</strong></div>
          </Panel>
        </>
      )
    }

    let rows = leaves
    if (section === 'pending-leave') rows = leaves.filter(leave => leave.status === 'Pending')

    return (
      <Panel title={section === 'pending-leave' ? 'Pending Leave Requests' : 'Leave History'} description="Your personal leave applications">
        <DataTable
          columns={[
            { label: 'Leave Type', key: 'type' },
            { label: 'From', key: 'from' },
            { label: 'To', key: 'to' },
            { label: 'Days', key: 'days' },
            { label: 'Reason', key: 'reason' },
            { label: 'Status', render: row => <Status value={row.status} /> },
          ]}
          rows={rows}
        />
      </Panel>
    )
  }

  const renderPerformanceSection = section => {
    if (section === 'my-goals') {
      return (
        <Panel title="My Goals" description="Your professional goals and targets">
          {[
            ['Complete assigned project tasks', 85],
            ['Improve frontend development skills', 70],
            ['Improve task delivery time', 90],
          ].map(([name, progress]) => (
            <div className="ws-activity" key={name}>
              <div style={{ flex: 1 }}>
                <strong>{name}</strong>
                <div className="ws-progress-track"><div style={{ width: `${progress}%` }}></div></div>
                <p>{progress}% completed</p>
              </div>
            </div>
          ))}
        </Panel>
      )
    }

    if (section === 'achievements') {
      return (
        <Panel title="My Achievements" description="Your work milestones">
          <div className="ws-activity-list">
            <div className="ws-activity"><div className="ws-activity-icon">★</div><div><strong>Project Milestone Completed</strong><p>Completed an assigned development milestone.</p></div></div>
            <div className="ws-activity"><div className="ws-activity-icon">✓</div><div><strong>Task Completion</strong><p>Successfully completed assigned tasks.</p></div></div>
          </div>
        </Panel>
      )
    }

    if (section === 'feedback') {
      return (
        <Panel title="Manager Feedback" description="Latest feedback from your manager">
          <p>"Good progress on assigned projects. Continue improving task delivery and communication."</p>
          <p className="ws-muted">— Rahul Sharma, Team Manager</p>
        </Panel>
      )
    }

    return (
      <>
        <MetricCards items={[
          { label: 'Overall Score', value: '86%', note: 'Monthly performance' },
          { label: 'Task Completion', value: '82%', note: 'Task score' },
          { label: 'Project Contribution', value: '90%', note: 'Project score' },
          { label: 'Attendance', value: '95%', note: 'Attendance score' },
        ]} />
        <Panel title="Performance Overview" description="Your monthly performance indicators">
          {[
            ['Task Completion', 82],
            ['Project Contribution', 90],
            ['Attendance', 95],
            ['Work Quality', 86],
          ].map(([name, value]) => (
            <div className="ws-finance-row" key={name}>
              <span>{name}</span>
              <strong>{value}%</strong>
            </div>
          ))}
        </Panel>
      </>
    )
  }

  const renderReportSection = section => {
    const titles = {
      'attendance-report': 'Attendance Report',
      'task-report': 'Task Completion Report',
      'project-report': 'Project Progress Report',
      'performance-report': 'Performance Report',
    }

    const title = titles[section]

    return (
      <Panel title={title} description="Your personal employee report">
        <div className="ws-report-card">
          <span className="ws-stat-icon">▤</span>
          <h3>{title}</h3>
          <p>Export your personal report as a CSV file.</p>
          <button className="ws-primary-button" onClick={() => exportReport(title)}>
            Export CSV Report
          </button>
        </div>
      </Panel>
    )
  }

  const renderProfileSection = section => {
    if (section === 'personal-details') {
      return (
        <Panel title="Personal Details" description="Your registered employee information">
          <div className="ws-profile-details">
            <div><span>Full Name</span><strong>{profile.name}</strong></div>
            <div><span>Employee ID</span><strong>{profile.employeeId}</strong></div>
          </div>
        </Panel>
      )
    }

    if (section === 'contact-details') {
      return (
        <Panel title="Contact Information" description="Your registered contact details">
          <div className="ws-profile-details">
            <div><span>Email</span><strong>{profile.email}</strong></div>
            <div><span>Phone</span><strong>{profile.phone}</strong></div>
          </div>
        </Panel>
      )
    }

    return (
      <Panel title="Job Information" description="Your employment details">
        <div className="ws-profile-details">
          <div><span>Designation</span><strong>{profile.designation}</strong></div>
          <div><span>Department</span><strong>{profile.department}</strong></div>
          <div><span>Reporting Manager</span><strong>{profile.manager}</strong></div>
          <div><span>Joining Date</span><strong>{profile.joiningDate}</strong></div>
        </div>
      </Panel>
    )
  }

  const renderSalarySection = section => {
    if (section === 'salary-breakdown') {
      return (
        <Panel title="Salary Breakdown" description="Your monthly earnings and deductions">
          <div className="ws-finance-row"><span>Basic Pay</span><strong>₹25,000</strong></div>
          <div className="ws-finance-row"><span>Allowances</span><strong>₹12,000</strong></div>
          <div className="ws-finance-row"><span>Deductions</span><strong>₹2,000</strong></div>
          <div className="ws-finance-row"><strong>Net Salary</strong><strong>₹35,000</strong></div>
        </Panel>
      )
    }

    if (section === 'payslips') {
      return (
        <Panel title="My Payslips" description="Your individual salary statements">
          <DataTable
            columns={[
              { label: 'Month', key: 'month' },
              { label: 'Year', key: 'year' },
              { label: 'Net Salary', key: 'salary' },
              {
                label: 'Payslip',
                render: () => (
                  <button className="ws-secondary-button" onClick={() => notify('Payslip download will be available after backend integration.')}>
                    View Payslip
                  </button>
                ),
              },
            ]}
            rows={['October', 'September', 'August'].map(month => ({
              id: month,
              month,
              year: '2026',
              salary: '₹35,000',
            }))}
          />
          <p className="ws-muted">Only your own payslips are displayed.</p>
        </Panel>
      )
    }

    if (section === 'salary-history') {
      return (
        <Panel title="Salary History" description="Your previous monthly salary records">
          <DataTable
            columns={[
              { label: 'Month', key: 'month' },
              { label: 'Year', key: 'year' },
              { label: 'Net Salary', key: 'salary' },
              { label: 'Status', render: () => <Status value="Paid" /> },
            ]}
            rows={['October', 'September', 'August'].map(month => ({
              id: month,
              month,
              year: '2026',
              salary: '₹35,000',
            }))}
          />
        </Panel>
      )
    }

    return (
      <>
        <Panel title="Monthly Salary Summary" description="Your personal salary details">
          <div className="ws-attendance-number">
            <span>Net Monthly Salary</span>
            <h2>₹35,000</h2>
          </div>
          <div className="ws-finance-row"><span>Basic Pay</span><strong>₹25,000</strong></div>
          <div className="ws-finance-row"><span>Allowances</span><strong>₹12,000</strong></div>
          <div className="ws-finance-row"><span>Deductions</span><strong>₹2,000</strong></div>
          <div className="ws-finance-row"><strong>Take-home Salary</strong><strong>₹35,000</strong></div>
          <p className="ws-muted">Only your own salary information is displayed here.</p>
        </Panel>
      </>
    )
  }

  const renderSettingsSection = section => {
    const options = section === 'account-preferences'
      ? [
          ['security', 'Personal Account Protection'],
        ]
      : section === 'notification-settings'
        ? [
            ['email', 'Email Notifications'],
            ['tasks', 'Task Notifications'],
            ['projects', 'Project Updates'],
          ]
        : [
            ['security', 'Account Security Notifications'],
          ]

    return (
      <Panel title={sectionNames[section]} description="Manage your personal workspace preferences">
        <div className="ws-activity-list">
          {options.map(([key, label]) => (
            <label className="ws-finance-row" key={key}>
              <span>{label}</span>
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={event => setSettings(prev => ({
                  ...prev,
                  [key]: event.target.checked,
                }))}
              />
            </label>
          ))}
        </div>
        <p className="ws-muted">Preferences are currently stored for this demo session.</p>
      </Panel>
    )
  }

  const renderSection = () => {
    switch (activePage) {
      case 'my-projects':
        return renderProjectSection(activeSection)
      case 'my-tasks':
        return renderTaskSection(activeSection)
      case 'daily-updates':
        return renderUpdatesSection(activeSection)
      case 'attendance':
        return renderAttendanceSection(activeSection)
      case 'leave':
        return renderLeaveSection(activeSection)
      case 'performance':
        return renderPerformanceSection(activeSection)
      case 'reports':
        return renderReportSection(activeSection)
      case 'profile':
        return renderProfileSection(activeSection)
      case 'salary':
        return renderSalarySection(activeSection)
      case 'settings':
        return renderSettingsSection(activeSection)
      default:
        return null
    }
  }

  const renderPage = () => {
    if (activePage === 'overview') return renderOverview()

    if (activeSection) {
      return (
        <div>
          <button className="ws-text-button" onClick={backToModule}>
            ← Back to {moduleNames[activePage]}
          </button>
          <PageIntro
            title={sectionNames[activeSection]}
            description={`Manage and review your ${sectionNames[activeSection]?.toLowerCase()} information.`}
          />
          {renderSection()}
        </div>
      )
    }

    return (
      <ModulePage
        title={moduleNames[activePage]}
        description={`Manage and review your ${moduleNames[activePage]?.toLowerCase()} information.`}
        cards={moduleCards}
        onOpen={openSection}
      />
    )
  }

  const filteredGroups = menuGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item[1].toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(group => group.items.length > 0)

  return (
    <div className="ws-dashboard">
      <aside
        className={`ws-sidebar ${expanded ? 'ws-expanded' : ''}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="ws-brand">
          <div className="ws-logo">W</div>
          {expanded && <span>WorkSphere</span>}
        </div>

        <div className="ws-admin-mini">
          <div className="ws-avatar">P</div>
          {expanded && (
            <div>
              <strong>{profile.name}</strong>
              <span>Employee</span>
            </div>
          )}
        </div>

        <nav className="ws-navigation">
          {filteredGroups.map(group => (
            <div className="ws-menu-group" key={group.title}>
              {expanded && <p className="ws-group-title">{group.title}</p>}
              {group.items.map(([id, label, icon]) => (
                <button
                  key={id}
                  className={`ws-menu-item ${activePage === id ? 'active' : ''}`}
                  onClick={() => handlePageChange(id)}
                  title={!expanded ? label : ''}
                >
                  <span className="ws-menu-icon">{icon}</span>
                  {expanded && <span>{label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <button className="ws-menu-item ws-logout" onClick={onLogout}>
          <span className="ws-menu-icon">↪</span>
          {expanded && <span>Logout</span>}
        </button>
      </aside>

      <main className="ws-main">
        <header className="ws-topbar">
          <div>
            <span className="ws-eyebrow">WORKSPACE / EMPLOYEE</span>
          </div>

          <div className="ws-top-actions">
            <div className="ws-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
            </div>

            <div className="ws-notification-wrap">
              <button
                className="ws-icon-button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                aria-label="Notifications"
              >
                ♧
                <span className="ws-notification-dot"></span>
              </button>

              {notificationOpen && (
                <div className="ws-notification-pop">
                  <h3>Notifications</h3>
                  {notifications.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="ws-top-profile">
              <div className="ws-avatar">P</div>
              <div>
                <strong>{profile.name}</strong>
                <span>Employee</span>
              </div>
            </div>
          </div>
        </header>

        <section className="ws-content">
          {renderPage()}
        </section>
      </main>

      {toast && <div className="ws-toast">{toast}</div>}
    </div>
  )
}

export default EmployeeDashboard
