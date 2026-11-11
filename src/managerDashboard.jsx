
import { useState } from 'react'
import './Dashboard.css'

const groups = [
  { title: 'MAIN MENU', items: [['overview', 'Overview', '⌂']] },
  {
    title: 'TEAM MANAGEMENT',
    items: [
      ['team', 'My Team', '♙'],
      ['allocation', 'Team Allocation', '♧']
    ]
  },
  {
    title: 'WORK MANAGEMENT',
    items: [
      ['projects', 'Projects', '▣'],
      ['project-assigned', 'Project Assigned', '▤'],
      ['tasks', 'Tasks', '✓']
    ]
  },
  {
    title: 'TIME MANAGEMENT',
    items: [
      ['attendance', 'Attendance', '◷'],
      ['leave', 'Leave Management', '▤']
    ]
  },
  {
    title: 'PERFORMANCE',
    items: [
      ['performance', 'Team Performance', '▥'],
      ['reports', 'Reports', '▧']
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      ['profile', 'My Profile', '♙'],
      ['settings', 'Settings', '⚙']
    ]
  }
]

const initialProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'TechNova Solutions',
    members: 12,
    progress: 85,
    status: 'On Track',
    deadline: '25 Nov 2026'
  },
  {
    id: 2,
    name: 'Mobile Application',
    client: 'CloudTech',
    members: 8,
    progress: 65,
    status: 'In Progress',
    deadline: '30 Nov 2026'
  },
  {
    id: 3,
    name: 'CRM Integration',
    client: 'Business Hub',
    members: 6,
    progress: 45,
    status: 'In Progress',
    deadline: '10 Dec 2026'
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    client: 'Growth Partners',
    members: 6,
    progress: 92,
    status: 'On Track',
    deadline: '20 Nov 2026'
  }
]

const initialTeam = [
  {
    id: 'WS-EMP-101',
    name: 'Rahul Sharma',
    role: 'Frontend Developer',
    department: 'Development',
    email: 'rahul@worksphere.com',
    project: 'Website Redesign',
    status: 'Active',
    performance: 94
  },
  {
    id: 'WS-EMP-102',
    name: 'Priya Reddy',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'priya@worksphere.com',
    project: 'Mobile Application',
    status: 'Active',
    performance: 91
  },
  {
    id: 'WS-EMP-103',
    name: 'Arjun Kumar',
    role: 'Backend Developer',
    department: 'Development',
    email: 'arjun@worksphere.com',
    project: 'CRM Integration',
    status: 'Active',
    performance: 88
  },
  {
    id: 'WS-EMP-104',
    name: 'Sneha Patel',
    role: 'Marketing Executive',
    department: 'Marketing',
    email: 'sneha@worksphere.com',
    project: 'Marketing Campaign',
    status: 'Active',
    performance: 86
  },
  {
    id: 'WS-EMP-105',
    name: 'Karthik Rao',
    role: 'QA Engineer',
    department: 'Testing',
    email: 'karthik@worksphere.com',
    project: 'Website Redesign',
    status: 'On Leave',
    performance: 82
  },
  {
    id: 'WS-EMP-106',
    name: 'Ananya Das',
    role: 'Product Designer',
    department: 'Design',
    email: 'ananya@worksphere.com',
    project: 'Mobile Application',
    status: 'Active',
    performance: 89
  }
]

const initialTasks = [
  {
    id: 1,
    title: 'Homepage UI Development',
    employee: 'Rahul Sharma',
    project: 'Website Redesign',
    priority: 'High',
    due: '18 Nov 2026',
    status: 'Completed'
  },
  {
    id: 2,
    title: 'Mobile Dashboard Design',
    employee: 'Priya Reddy',
    project: 'Mobile Application',
    priority: 'Medium',
    due: '20 Nov 2026',
    status: 'In Progress'
  },
  {
    id: 3,
    title: 'API Integration',
    employee: 'Arjun Kumar',
    project: 'CRM Integration',
    priority: 'High',
    due: '19 Nov 2026',
    status: 'Pending'
  },
  {
    id: 4,
    title: 'Campaign Content',
    employee: 'Sneha Patel',
    project: 'Marketing Campaign',
    priority: 'Low',
    due: '22 Nov 2026',
    status: 'In Progress'
  },
  {
    id: 5,
    title: 'Application Testing',
    employee: 'Karthik Rao',
    project: 'Website Redesign',
    priority: 'Medium',
    due: '17 Nov 2026',
    status: 'Pending'
  }
]

const initialLeaves = [
  {
    id: 1,
    employee: 'Karthik Rao',
    type: 'Sick Leave',
    from: '12 Nov 2026',
    to: '13 Nov 2026',
    days: 2,
    reason: 'Not feeling well',
    status: 'Pending'
  },
  {
    id: 2,
    employee: 'Ananya Das',
    type: 'Casual Leave',
    from: '15 Nov 2026',
    to: '16 Nov 2026',
    days: 2,
    reason: 'Personal work',
    status: 'Pending'
  },
  {
    id: 3,
    employee: 'Rahul Sharma',
    type: 'Earned Leave',
    from: '05 Nov 2026',
    to: '06 Nov 2026',
    days: 2,
    reason: 'Family function',
    status: 'Approved'
  },
  {
    id: 4,
    employee: 'Sneha Patel',
    type: 'Casual Leave',
    from: '02 Nov 2026',
    to: '02 Nov 2026',
    days: 1,
    reason: 'Personal work',
    status: 'Rejected'
  }
]

const initialActivities = [
  ['Task completed', 'Rahul completed the homepage design', '10 min ago', '✓'],
  ['New task assigned', 'A new development task was assigned', '35 min ago', '▣'],
  ['Leave request', 'An employee submitted a leave request', '1 hour ago', '◷'],
  ['Project updated', 'Mobile Application progress updated', '2 hours ago', '▥']
]

const initialAllocations = [
  {
    id: 1,
    employee: 'Rahul Sharma',
    project: 'Website Redesign',
    responsibility: 'Frontend Development',
    status: 'Active'
  },
  {
    id: 2,
    employee: 'Priya Reddy',
    project: 'Mobile Application',
    responsibility: 'UI/UX Design',
    status: 'Active'
  },
  {
    id: 3,
    employee: 'Arjun Kumar',
    project: 'CRM Integration',
    responsibility: 'Backend Development',
    status: 'Active'
  }
]

function ManagerDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('overview')
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [detail, setDetail] = useState(null)

  const [team] = useState(initialTeam)
  const [projects, setProjects] = useState(initialProjects)
  const [tasks, setTasks] = useState(initialTasks)
  const [leaves, setLeaves] = useState(initialLeaves)
  const [allocations, setAllocations] = useState(initialAllocations)

  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showAllocationForm, setShowAllocationForm] = useState(false)
  const [showProfileEdit, setShowProfileEdit] = useState(false)

  const [taskForm, setTaskForm] = useState({
    title: '',
    employee: initialTeam[0].name,
    project: initialProjects[0].name,
    priority: 'Medium',
    due: ''
  })

  const [allocationForm, setAllocationForm] = useState({
    employee: initialTeam[0].name,
    project: initialProjects[0].name,
    responsibility: ''
  })

  const [profile, setProfile] = useState({
    name: 'Manager User',
    role: 'Team Manager',
    department: 'Development',
    email: 'manager@worksphere.com',
    phone: '+91 98765 43210',
    employeeId: 'WS-MGR-1001'
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskNotifications: true,
    leaveNotifications: true,
    darkMode: false
  })

  const pageTitle = groups.flatMap(group => group.items)
    .find(item => item[0] === activePage)?.[1] || 'Overview'

  const openDetail = (title, description, records = []) => {
    setDetail({ title, description, records })
  }

  const closeDetail = () => setDetail(null)

  const handlePageChange = (id) => {
    setActivePage(id)
    setSearch('')
    setDetail(null)
    setNotificationsOpen(false)
    setShowTaskForm(false)
    setShowAllocationForm(false)
    setShowProfileEdit(false)
  }

  const handleAddTask = (e) => {
    e.preventDefault()

    if (!taskForm.title.trim() || !taskForm.due) {
      alert('Please enter the task title and due date.')
      return
    }

    setTasks(previous => [
      ...previous,
      {
        ...taskForm,
        id: Date.now(),
        due: new Date(taskForm.due).toLocaleDateString('en-IN'),
        status: 'Pending'
      }
    ])

    setTaskForm({
      title: '',
      employee: initialTeam[0].name,
      project: initialProjects[0].name,
      priority: 'Medium',
      due: ''
    })

    setShowTaskForm(false)
    alert('Task assigned successfully!')
  }

  const handleAllocation = (e) => {
    e.preventDefault()

    if (!allocationForm.responsibility.trim()) {
      alert('Please enter the employee responsibility.')
      return
    }

    setAllocations(previous => [
      ...previous,
      {
        ...allocationForm,
        id: Date.now(),
        status: 'Active'
      }
    ])

    setShowAllocationForm(false)
    setAllocationForm({
      employee: initialTeam[0].name,
      project: initialProjects[0].name,
      responsibility: ''
    })

    alert('Employee allocated successfully!')
  }

  const handleLeaveAction = (id, status) => {
    setLeaves(previous =>
      previous.map(leave =>
        leave.id === id ? { ...leave, status } : leave
      )
    )
  }

  const handleTaskStatus = (id, status) => {
    setTasks(previous =>
      previous.map(task =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  const handleProjectProgress = (id, progress) => {
    setProjects(previous =>
      previous.map(project =>
        project.id === id
          ? {
              ...project,
              progress,
              status: progress === 100 ? 'Completed' : 'In Progress'
            }
          : project
      )
    )
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    setShowProfileEdit(false)
    alert('Profile updated successfully!')
  }

  const exportReport = (name) => {
    const report = [
      'WorkSphere Manager Report',
      `Report: ${name}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `Team Members: ${team.length}`,
      `Projects: ${projects.length}`,
      `Tasks: ${tasks.length}`,
      `Completed Tasks: ${tasks.filter(task => task.status === 'Completed').length}`,
      `Pending Leaves: ${leaves.filter(leave => leave.status === 'Pending').length}`,
      '',
      'PROJECTS',
      ...projects.map(project =>
        `${project.name}, ${project.client}, ${project.progress}%, ${project.status}`
      ),
      '',
      'TEAM MEMBERS',
      ...team.map(member =>
        `${member.name}, ${member.role}, ${member.department}`
      ),
      '',
      'TASKS',
      ...tasks.map(task =>
        `${task.title}, ${task.employee}, ${task.status}`
      )
    ].join('\n')

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${name.toLowerCase().replaceAll(' ', '-')}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const openEmployee = (member) => {
    openDetail(
      member.name,
      'Employee profile and work information.',
      [
        ['Employee ID', member.id],
        ['Role', member.role],
        ['Department', member.department],
        ['Email', member.email],
        ['Project', member.project],
        ['Status', member.status],
        ['Performance', `${member.performance}%`]
      ]
    )
  }

  const openProject = (project) => {
    const projectTasks = tasks.filter(task => task.project === project.name)
    const projectAllocations = allocations.filter(item => item.project === project.name)

    openDetail(
      project.name,
      'Complete project information, assigned employees and related tasks.',
      [
        ['Project ID', `PRJ-${project.id}`],
        ['Client', project.client],
        ['Team Size', `${project.members} Members`],
        ['Progress', `${project.progress}%`],
        ['Status', project.status],
        ['Deadline', project.deadline],
        ['Assigned Employees', projectAllocations.map(item => item.employee).join(', ') || 'No additional allocations'],
        ['Related Tasks', projectTasks.map(task => task.title).join(', ') || 'No tasks']
      ]
    )
  }

  const openTask = (task) => {
    openDetail(
      task.title,
      'Task information and current assignment.',
      [
        ['Task ID', task.id],
        ['Assigned Employee', task.employee],
        ['Project', task.project],
        ['Priority', task.priority],
        ['Due Date', task.due],
        ['Status', task.status]
      ]
    )
  }

  const openLeave = (leave) => {
    openDetail(
      `${leave.employee} - ${leave.type}`,
      'Leave application details.',
      [
        ['Employee', leave.employee],
        ['Leave Type', leave.type],
        ['From', leave.from],
        ['To', leave.to],
        ['Days', leave.days],
        ['Reason', leave.reason],
        ['Status', leave.status]
      ]
    )
  }

  const openAllocation = (allocation) => {
    openDetail(
      allocation.employee,
      'Employee project allocation details.',
      [
        ['Employee', allocation.employee],
        ['Project', allocation.project],
        ['Responsibility', allocation.responsibility],
        ['Status', allocation.status]
      ]
    )
  }

  const openRecords = (title, description, records) => {
    openDetail(title, description, records)
  }

  const attendanceRecords = team.map((member, index) => ({
    id: member.id,
    name: member.name,
    department: member.department,
    checkIn: index === 4 ? '--' : index === 2 ? '09:18 AM' : '09:00 AM',
    checkOut: index === 4 ? '--' : '06:00 PM',
    status: index === 4 ? 'On Leave' : index === 2 ? 'Late' : 'Present'
  }))

  attendanceRecords.push({
    id: 'WS-EMP-107',
    name: 'Vikram Singh',
    department: 'Development',
    checkIn: '--',
    checkOut: '--',
    status: 'Absent'
  })

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
          <div className="ws-avatar">M</div>
          <div className="ws-sidebar-label">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
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
                  onClick={() => handlePageChange(id)}
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
            <p className="ws-eyebrow">WORKSPHERE / MANAGER</p>
            <h2>{detail ? detail.title : pageTitle}</h2>
          </div>

          <div className="ws-top-actions">
            <input
              className="ws-search"
              placeholder="Search anything..."
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setDetail(null)
              }}
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
                  <p>{tasks.filter(task => task.status === 'Pending').length} tasks are pending.</p>
                  <p>{leaves.filter(leave => leave.status === 'Pending').length} leave requests are waiting.</p>
                  <p>1 project deadline is approaching.</p>
                </div>
              )}
            </div>

            <div className="ws-top-profile">
              <div className="ws-avatar">M</div>
              <div>
                <strong>{profile.name}</strong>
                <small>{profile.role}</small>
              </div>
            </div>
          </div>
        </header>

        <div className="ws-page-content" key={`${activePage}-${detail?.title || 'main'}`}>
          {detail ? (
            <DetailPage detail={detail} onBack={closeDetail} />
          ) : (
            <>
              {activePage === 'overview' && (
                <ManagerOverview
                  team={team}
                  projects={projects}
                  tasks={tasks}
                  leaves={leaves}
                  onOpenProject={openProject}
                  onOpenEmployee={openEmployee}
                  onOpenTask={openTask}
                  onOpenLeave={openLeave}
                  onOpenPage={handlePageChange}
                />
              )}

              {activePage === 'team' && (
                <TeamPage
                  team={team}
                  search={search}
                  onOpenEmployee={openEmployee}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'allocation' && (
                <AllocationPage
                  team={team}
                  projects={projects}
                  allocations={allocations}
                  search={search}
                  showForm={showAllocationForm}
                  setShowForm={setShowAllocationForm}
                  form={allocationForm}
                  setForm={setAllocationForm}
                  onSubmit={handleAllocation}
                  onOpenAllocation={openAllocation}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'projects' && (
                <ProjectsPage
                  projects={projects}
                  search={search}
                  onProgress={handleProjectProgress}
                  onOpenProject={openProject}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'project-assigned' && (
                <ProjectAssignedPage
                  team={team}
                  projects={projects}
                  allocations={allocations}
                  search={search}
                  onOpenAllocation={openAllocation}
                  onOpenProject={openProject}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'tasks' && (
                <TasksPage
                  tasks={tasks}
                  search={search}
                  showForm={showTaskForm}
                  setShowForm={setShowTaskForm}
                  form={taskForm}
                  setForm={setTaskForm}
                  team={team}
                  projects={projects}
                  onSubmit={handleAddTask}
                  onStatus={handleTaskStatus}
                  onOpenTask={openTask}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'attendance' && (
                <AttendancePage
                  records={attendanceRecords}
                  search={search}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'leave' && (
                <LeavePage
                  leaves={leaves}
                  search={search}
                  onAction={handleLeaveAction}
                  onOpenLeave={openLeave}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'performance' && (
                <PerformancePage
                  team={team}
                  search={search}
                  onOpenEmployee={openEmployee}
                  onOpenRecords={openRecords}
                />
              )}

              {activePage === 'reports' && (
                <ReportsPage
                  onExport={exportReport}
                  onOpenRecords={openRecords}
                  team={team}
                  projects={projects}
                  tasks={tasks}
                  leaves={leaves}
                />
              )}

              {activePage === 'profile' && (
                <ProfilePage
                  profile={profile}
                  setProfile={setProfile}
                  showEdit={showProfileEdit}
                  setShowEdit={setShowProfileEdit}
                  onSave={handleProfileSave}
                />
              )}

              {activePage === 'settings' && (
                <SettingsPage
                  settings={settings}
                  setSettings={setSettings}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

/* =========================================
   REUSABLE DETAIL PAGE
========================================= */

function DetailPage({ detail, onBack }) {
  return (
    <div className="ws-content">
      <PageIntro
        title={detail.title}
        description={detail.description}
        action="← Back"
        onAction={onBack}
      />

      {detail.records?.length ? (
        <section className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Detailed Information</h3>
              <p>Complete information for this selection.</p>
            </div>
            <span className="ws-pill">DETAIL VIEW</span>
          </div>

          <div className="ws-detail-list">
            {detail.records.map((record, index) => (
              <div className="ws-detail-item" key={`${record[0]}-${index}`}>
                <span>{record[0]}</span>
                <strong>{record[1] ?? 'Not available'}</strong>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="glass-panel ws-empty-state">
          <h3>No records available</h3>
          <p>There are currently no records in this section.</p>
        </div>
      )}

      <div className="ws-form-actions">
        <button type="button" className="ws-primary-button" onClick={onBack}>
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

/* =========================================
   MANAGER OVERVIEW
========================================= */

function ManagerOverview({
  team,
  projects,
  tasks,
  leaves,
  onOpenProject,
  onOpenEmployee,
  onOpenTask,
  onOpenLeave,
  onOpenPage
}) {
  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const pendingTasks = tasks.filter(task => task.status !== 'Completed').length
  const pendingLeaves = leaves.filter(leave => leave.status === 'Pending').length

  const stats = [
    ['My Team Members', team.length, '+4 this month', '♙', 'team'],
    ['Active Projects', projects.filter(p => p.status !== 'Completed').length, 'Across departments', '▣', 'projects'],
    ['Tasks Completed', completedTasks, '+18 this week', '✓', 'tasks'],
    ['Pending Tasks', pendingTasks, 'Needs attention', '◷', 'tasks']
  ]

  return (
    <div className="ws-content">
      <section className="ws-welcome glass-panel">
        <div>
          <span className="ws-pill">MANAGER WORKSPACE</span>
          <h1>Welcome back, Manager <span>✦</span></h1>
          <p>Here is your team's progress and activity overview.</p>
        </div>
        <div className="ws-welcome-date">TEAM CONTROL CENTRE</div>
      </section>

      <section className="ws-stat-grid">
        {stats.map(([title, value, change, icon, page]) => (
          <button
            className="ws-stat-card glass-panel"
            type="button"
            key={title}
            onClick={() => onOpenPage(page)}
          >
            <div className="ws-stat-top">
              <span>{title}</span>
              <span className="ws-stat-icon">{icon}</span>
            </div>
            <h2>{value}</h2>
            <p><b>{change}</b><span> in your team</span></p>
            <small>Open Section ↗</small>
          </button>
        ))}
      </section>

      <section className="ws-two-columns">
        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Team Performance</h3>
              <p>Monthly productivity overview</p>
            </div>
            <span className="ws-pill">THIS YEAR</span>
          </div>

          <div className="ws-chart">
            {[48, 62, 55, 76, 68, 85, 72, 92, 78, 88, 75, 95].map((value, index) => (
              <div className="ws-chart-column" key={index}>
                <div style={{ height: `${value}%` }} />
                <small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</small>
              </div>
            ))}
          </div>
          <button className="ws-text-button" type="button" onClick={() => onOpenPage('performance')}>
            Open Performance ↗
          </button>
        </article>

        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Team Attendance</h3>
              <p>Today's attendance summary</p>
            </div>
            <span className="ws-pill">TODAY</span>
          </div>

          <div className="ws-attendance-number">
            <strong>87.5%</strong>
            <span>Attendance rate</span>
          </div>

          <div className="ws-progress-track">
            <div style={{ width: '87.5%' }} />
          </div>

          <div className="ws-attendance-list">
            <span><i className="dot present" /> Present <b>28</b></span>
            <span><i className="dot late" /> Late <b>3</b></span>
            <span><i className="dot absent" /> Absent <b>2</b></span>
            <span><i className="dot leave" /> On Leave <b>2</b></span>
          </div>
          <button className="ws-text-button" type="button" onClick={() => onOpenPage('attendance')}>
            Open Attendance ↗
          </button>
        </article>
      </section>

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div>
            <h3>Project Progress</h3>
            <p>Projects handled by your team</p>
          </div>
          <span className="ws-pill">{projects.length} PROJECTS</span>
        </div>

        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                <th>PROJECT</th>
                <th>TEAM SIZE</th>
                <th>PROGRESS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.members} Members</td>
                  <td>
                    <div className="ws-table-progress">
                      <div><span style={{ width: `${project.progress}%` }} /></div>
                      {project.progress}%
                    </div>
                  </td>
                  <td><StatusBadge value={project.status} /></td>
                  <td>
                    <button className="ws-text-button" type="button" onClick={() => onOpenProject(project)}>
                      Open Section ↗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="ws-text-button" type="button" onClick={() => onOpenPage('projects')}>
          View All Projects ↗
        </button>
      </section>

      <section className="ws-two-columns">
        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div>
              <h3>Task Overview</h3>
              <p>Current team task status</p>
            </div>
          </div>
          <div className="ws-finance-row">
            <span>Total Tasks</span><strong>{tasks.length}</strong>
          </div>
          <div className="ws-finance-row">
            <span>Completed</span><strong className="ws-profit">{completedTasks}</strong>
          </div>
          <div className="ws-finance-row">
            <span>Pending</span><strong>{pendingTasks}</strong>
          </div>
          <div className="ws-progress-track">
            <div style={{ width: `${Math.round((completedTasks / Math.max(tasks.length, 1)) * 100)}%` }} />
          </div>
          <button className="ws-text-button" type="button" onClick={() => onOpenPage('tasks')}>
            Open Tasks ↗
          </button>
        </article>

        <article className="glass-panel ws-panel">
          <div className="ws-panel-heading">
            <div><h3>Team Highlights</h3><p>Employee distribution</p></div>
          </div>
          {[
            ['Development', 14, 85],
            ['Design', 8, 65],
            ['Marketing', 6, 50],
            ['Other', 4, 35]
          ].map(department => (
            <div className="ws-department" key={department[0]}>
              <div><span>{department[0]}</span><b>{department[1]} members</b></div>
              <div className="ws-progress-track"><div style={{ width: `${department[2]}%` }} /></div>
            </div>
          ))}
          <button className="ws-text-button" type="button" onClick={() => onOpenPage('team')}>
            Open Team ↗
          </button>
        </article>
      </section>

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div><h3>Recent Team Activities</h3><p>Latest updates from your team</p></div>
          <span className="ws-pill">ACTIVITY FEED</span>
        </div>

        <div className="ws-activity-list">
          {initialActivities.map(activity => (
            <div className="ws-activity" key={activity[0]}>
              <span className="ws-activity-icon">{activity[3]}</span>
              <div><strong>{activity[0]}</strong><p>{activity[1]}</p></div>
              <small>{activity[2]}</small>
            </div>
          ))}
          <button className="ws-text-button" type="button" onClick={() => onOpenPage('leave')}>
            {pendingLeaves} Leave Requests Waiting — Review ↗
          </button>
          {team.slice(0, 2).map(member => (
            <button
              className="ws-text-button"
              type="button"
              key={member.id}
              onClick={() => onOpenEmployee(member)}
            >
              View {member.name}'s Profile ↗
            </button>
          ))}
          {tasks.slice(0, 2).map(task => (
            <button
              className="ws-text-button"
              type="button"
              key={task.id}
              onClick={() => onOpenTask(task)}
            >
              View Task: {task.title} ↗
            </button>
          ))}
          {leaves.filter(leave => leave.status === 'Pending').map(leave => (
            <button
              className="ws-text-button"
              type="button"
              key={leave.id}
              onClick={() => onOpenLeave(leave)}
            >
              Review {leave.employee}'s Leave ↗
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

/* =========================================
   REUSABLE PAGE COMPONENTS
========================================= */

function PageIntro({ title, description, action, onAction }) {
  return (
    <section className="glass-panel ws-module-intro">
      <div>
        <span className="ws-pill">MANAGER WORKSPACE</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && (
        <button type="button" className="ws-primary-button" onClick={onAction}>
          {action}
        </button>
      )}
    </section>
  )
}

function MetricCards({ items, onOpen }) {
  return (
    <section className="ws-metric-grid">
      {items.map((item, index) => (
        <button
          type="button"
          className="glass-panel ws-metric-card"
          key={index}
          onClick={() => onOpen?.(item)}
        >
          <span>{item.label}</span>
          <h2>{item.value}</h2>
          <small>{item.note}</small>
          {onOpen && <small>Open Section ↗</small>}
        </button>
      ))}
    </section>
  )
}

function StatusBadge({ value }) {
  const className = String(value).toLowerCase().replaceAll(' ', '-')
  return <span className={`ws-status ${className}`}>{value}</span>
}

function SearchableTable({ columns, rows, emptyMessage = 'No records found.' }) {
  if (!rows.length) {
    return (
      <div className="glass-panel ws-empty-state">
        <h3>No records found</h3>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="glass-panel ws-panel">
      <div className="ws-table-wrap">
        <table className="ws-table">
          <thead>
            <tr>{columns.map(column => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id || index}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PageToolbar({ children }) {
  return <div className="ws-toolbar"><div className="ws-toolbar-left">{children}</div></div>
}

/* =========================================
   MY TEAM
========================================= */

function TeamPage({ team, search, onOpenEmployee, onOpenRecords }) {
  const filtered = team.filter(member =>
    `${member.name} ${member.id} ${member.role} ${member.department} ${member.email}`
      .toLowerCase().includes(search.toLowerCase())
  )

  const active = team.filter(member => member.status === 'Active')
  const onLeave = team.filter(member => member.status === 'On Leave')

  return (
    <div className="ws-content">
      <PageIntro title="My Team" description="View your team members, their roles, departments, project assignments and individual performance." />

      <MetricCards
        items={[
          { label: 'Total Team Members', value: team.length, note: 'All displayed employees', records: team },
          { label: 'Active Employees', value: active.length, note: 'Currently working', records: active },
          { label: 'On Leave', value: onLeave.length, note: 'Currently on leave', records: onLeave },
          { label: 'Departments', value: new Set(team.map(m => m.department)).size, note: 'Across your team', records: team }
        ]}
        onOpen={item => onOpenRecords(item.label, `Records for ${item.label}.`, item.records.map(m => [m.name, `${m.role} · ${m.department} · ${m.status}`]))}
      />

      <PageToolbar><h3>Employee Directory</h3><span className="ws-pill">{filtered.length} MEMBERS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'EMPLOYEE ID', 'ROLE', 'DEPARTMENT', 'PROJECT', 'PERFORMANCE', 'STATUS', 'ACTION']}
        rows={filtered.map(member => ({
          id: member.id,
          cells: [
            <strong>{member.name}</strong>,
            member.id,
            member.role,
            member.department,
            member.project,
            `${member.performance}%`,
            <StatusBadge value={member.status} />,
            <button type="button" className="ws-text-button" onClick={() => onOpenEmployee(member)}>View Profile ↗</button>
          ]
        }))}
      />

      <section className="ws-profile-grid">
        {filtered.map(member => (
          <article className="glass-panel ws-profile-card" key={member.id}>
            <div className="ws-profile-avatar">{member.name.charAt(0)}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="ws-detail-list">
              <div className="ws-detail-item"><span>Employee ID</span><strong>{member.id}</strong></div>
              <div className="ws-detail-item"><span>Department</span><strong>{member.department}</strong></div>
              <div className="ws-detail-item"><span>Performance</span><strong>{member.performance}%</strong></div>
              <div className="ws-detail-item"><span>Email</span><strong>{member.email}</strong></div>
            </div>
            <button type="button" className="ws-primary-button" onClick={() => onOpenEmployee(member)}>Open Section ↗</button>
          </article>
        ))}
      </section>
    </div>
  )
}

/* =========================================
   TEAM ALLOCATION
========================================= */

function AllocationPage({
  team,
  projects,
  allocations,
  search,
  showForm,
  setShowForm,
  form,
  setForm,
  onSubmit,
  onOpenAllocation,
  onOpenRecords
}) {
  const filtered = allocations.filter(item =>
    `${item.employee} ${item.project} ${item.responsibility}`
      .toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ws-content">
      <PageIntro
        title="Team Allocation"
        description="Allocate employees to projects, define responsibilities and monitor how work is distributed."
        action={showForm ? 'Close Form' : '+ New Allocation'}
        onAction={() => setShowForm(!showForm)}
      />

      <MetricCards
        items={[
          { label: 'Allocated Employees', value: allocations.length, note: 'Current allocations', records: allocations },
          { label: 'Available Employees', value: Math.max(team.length - allocations.length, 0), note: 'Based on demo allocations', records: team.filter(m => !allocations.some(a => a.employee === m.name)) },
          { label: 'Active Projects', value: projects.length, note: 'Current projects', records: projects },
          { label: 'Departments', value: new Set(team.map(m => m.department)).size, note: 'Team departments', records: team }
        ]}
        onOpen={item => onOpenRecords(item.label, `Detailed ${item.label.toLowerCase()} information.`, item.records.map(record => [record.name || record.employee || record.project, record.responsibility || record.status || record.client || record.department || 'Available']))}
      />

      {showForm && (
        <section className="glass-panel ws-panel ws-form-container">
          <div className="ws-panel-heading">
            <div><h3>Allocate Employee</h3><p>Assign an employee to a project and responsibility.</p></div>
          </div>

          <form className="ws-form" onSubmit={onSubmit}>
            <div className="ws-form-grid">
              <FormField label="Employee">
                <select className="ws-field" value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })}>
                  {team.map(member => <option key={member.id} value={member.name}>{member.name}</option>)}
                </select>
              </FormField>

              <FormField label="Project">
                <select className="ws-field" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}>
                  {projects.map(project => <option key={project.id} value={project.name}>{project.name}</option>)}
                </select>
              </FormField>

              <FormField label="Responsibility">
                <input className="ws-field" placeholder="e.g. Frontend Development" value={form.responsibility} onChange={e => setForm({ ...form, responsibility: e.target.value })} required />
              </FormField>
            </div>

            <div className="ws-form-actions">
              <button className="ws-primary-button" type="submit">Save Allocation</button>
              <button className="ws-secondary-button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <PageToolbar><h3>Project-wise Employee Allocation</h3><span className="ws-pill">{filtered.length} ALLOCATIONS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'PROJECT', 'RESPONSIBILITY', 'STATUS', 'ACTION']}
        rows={filtered.map(item => ({
          id: item.id,
          cells: [
            <strong>{item.employee}</strong>,
            item.project,
            item.responsibility,
            <StatusBadge value={item.status} />,
            <button type="button" className="ws-text-button" onClick={() => onOpenAllocation(item)}>Open Section ↗</button>
          ]
        }))}
      />

      <section className="glass-panel ws-panel">
        <h3>Workload Distribution</h3>
        {[
          ['Development Team', 85],
          ['Design Team', 65],
          ['Marketing Team', 55],
          ['Testing Team', 45]
        ].map(item => (
          <div className="ws-department" key={item[0]}>
            <div><span>{item[0]}</span><b>{item[1]}%</b></div>
            <div className="ws-progress-track"><div style={{ width: `${item[1]}%` }} /></div>
          </div>
        ))}
      </section>
    </div>
  )
}

/* =========================================
   PROJECTS
========================================= */

function ProjectsPage({ projects, search, onProgress, onOpenProject, onOpenRecords }) {
  const filtered = projects.filter(project =>
    `${project.name} ${project.client} ${project.status}`.toLowerCase().includes(search.toLowerCase())
  )

  const completed = projects.filter(p => p.status === 'Completed')
  const ongoing = projects.filter(p => p.status !== 'Completed')

  return (
    <div className="ws-content">
      <PageIntro title="Projects" description="Monitor projects managed by your team, their clients, progress, team size and delivery deadlines." />

      <MetricCards
        items={[
          { label: 'Total Projects', value: projects.length, note: 'Projects under management', records: projects },
          { label: 'Ongoing Projects', value: ongoing.length, note: 'Currently in progress', records: ongoing },
          { label: 'Completed Projects', value: completed.length, note: 'Successfully delivered', records: completed },
          { label: 'Team Members', value: projects.reduce((sum, p) => sum + p.members, 0), note: 'Allocated across projects', records: projects }
        ]}
        onOpen={item => onOpenRecords(item.label, `Project records: ${item.label}.`, item.records.length ? item.records.map(p => [p.name, `${p.client} · ${p.progress}% · ${p.status} · ${p.deadline}`]) : [])}
      />

      <PageToolbar><h3>Project Directory</h3><span className="ws-pill">{filtered.length} PROJECTS</span></PageToolbar>

      <section className="ws-report-grid">
        {filtered.map(project => (
          <article className="glass-panel ws-report-card" key={project.id}>
            <div className="ws-panel-heading">
              <div>
                <span className="ws-pill">PROJECT #{project.id}</span>
                <h3>{project.name}</h3>
                <p>{project.client}</p>
              </div>
              <StatusBadge value={project.status} />
            </div>

            <div className="ws-detail-list">
              <div className="ws-detail-item"><span>Team Size</span><strong>{project.members} Members</strong></div>
              <div className="ws-detail-item"><span>Deadline</span><strong>{project.deadline}</strong></div>
            </div>

            <div className="ws-department">
              <div><span>Project Progress</span><b>{project.progress}%</b></div>
              <div className="ws-progress-track"><div style={{ width: `${project.progress}%` }} /></div>
            </div>

            <FormField label="Update Progress">
              <select className="ws-field" value={project.progress} onChange={e => onProgress(project.id, Number(e.target.value))}>
                <option value="0">0%</option>
                <option value="25">25%</option>
                <option value="50">50%</option>
                <option value="65">65%</option>
                <option value="75">75%</option>
                <option value="85">85%</option>
                <option value="92">92%</option>
                <option value="100">100% - Completed</option>
              </select>
            </FormField>

            <button type="button" className="ws-primary-button" onClick={() => onOpenProject(project)}>
              Open Section ↗
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

/* =========================================
   PROJECT ASSIGNED
========================================= */

function ProjectAssignedPage({ team, projects, allocations, search, onOpenAllocation, onOpenProject, onOpenRecords }) {
  const assignments = allocations.map((item, index) => ({
    ...item,
    id: item.id || index,
    role: item.responsibility,
    allocation: 'Full Time'
  }))

  const filtered = assignments.filter(item =>
    `${item.employee} ${item.project} ${item.role}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ws-content">
      <PageIntro title="Project Assigned" description="Review projects assigned to your team, employee responsibilities, allocation type and assignment status." />

      <MetricCards
        items={[
          { label: 'Assigned Projects', value: new Set(assignments.map(a => a.project)).size, note: 'Projects with assignments', records: assignments },
          { label: 'Active Assignments', value: assignments.filter(a => a.status === 'Active').length, note: 'Currently active', records: assignments.filter(a => a.status === 'Active') },
          { label: 'Completed Assignments', value: assignments.filter(a => a.status === 'Completed').length, note: 'Finished allocations', records: assignments.filter(a => a.status === 'Completed') },
          { label: 'Team Members', value: team.length, note: 'Displayed in this demo', records: team }
        ]}
        onOpen={item => onOpenRecords(item.label, `Detailed ${item.label.toLowerCase()} information.`, item.records.map(record => [record.employee || record.name || record.project, record.role || record.responsibility || record.department || record.status]))}
      />

      <PageToolbar><h3>Employee Project Assignments</h3><span className="ws-pill">{filtered.length} RECORDS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'PROJECT', 'RESPONSIBILITY', 'ALLOCATION', 'STATUS', 'ACTION']}
        rows={filtered.map(item => ({
          id: item.id,
          cells: [
            <strong>{item.employee}</strong>,
            item.project,
            item.role,
            item.allocation,
            <StatusBadge value={item.status} />,
            <button type="button" className="ws-text-button" onClick={() => onOpenAllocation(item)}>Open Section ↗</button>
          ]
        }))}
      />

      <section className="glass-panel ws-panel">
        <h3>Project Responsibilities</h3>
        <p className="ws-muted">Overview of the major responsibilities distributed across your team.</p>
        {assignments.map(item => (
          <div className="ws-finance-row" key={item.id}>
            <span>{item.role} <small> · {item.project}</small></span>
            <button className="ws-text-button" type="button" onClick={() => onOpenAllocation(item)}>{item.employee} ↗</button>
          </div>
        ))}
      </section>

      <section className="glass-panel ws-panel">
        <h3>Managed Projects</h3>
        {projects.map(project => (
          <div className="ws-finance-row" key={project.id}>
            <span>{project.name}</span>
            <button className="ws-text-button" type="button" onClick={() => onOpenProject(project)}>Open Project ↗</button>
          </div>
        ))}
      </section>
    </div>
  )
}

/* =========================================
   TASK MANAGEMENT
========================================= */

function TasksPage({
  tasks,
  search,
  showForm,
  setShowForm,
  form,
  setForm,
  team,
  projects,
  onSubmit,
  onStatus,
  onOpenTask,
  onOpenRecords
}) {
  const filtered = tasks.filter(task =>
    `${task.title} ${task.employee} ${task.project} ${task.priority} ${task.status}`
      .toLowerCase().includes(search.toLowerCase())
  )

  const completed = tasks.filter(t => t.status === 'Completed')
  const progress = tasks.filter(t => t.status === 'In Progress')
  const pending = tasks.filter(t => t.status === 'Pending')

  return (
    <div className="ws-content">
      <PageIntro
        title="Task Management"
        description="Create and assign tasks, set priorities, monitor deadlines and track completion across your team."
        action={showForm ? 'Close Form' : '+ Assign New Task'}
        onAction={() => setShowForm(!showForm)}
      />

      <MetricCards
        items={[
          { label: 'Total Tasks', value: tasks.length, note: 'Tasks in this demo', records: tasks },
          { label: 'Completed', value: completed.length, note: 'Successfully finished', records: completed },
          { label: 'In Progress', value: progress.length, note: 'Currently being worked on', records: progress },
          { label: 'Pending', value: pending.length, note: 'Awaiting work', records: pending }
        ]}
        onOpen={item => onOpenRecords(item.label, `Tasks with status: ${item.label}.`, item.records.map(t => [t.title, `${t.employee} · ${t.project} · ${t.status}`]))}
      />

      {showForm && (
        <section className="glass-panel ws-panel ws-form-container">
          <div className="ws-panel-heading">
            <div><h3>Assign New Task</h3><p>Provide task details and select the responsible employee.</p></div>
          </div>

          <form className="ws-form" onSubmit={onSubmit}>
            <div className="ws-form-grid">
              <FormField label="Task Title">
                <input className="ws-field" placeholder="Enter task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </FormField>

              <FormField label="Assign Employee">
                <select className="ws-field" value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })}>
                  {team.map(member => <option key={member.id} value={member.name}>{member.name}</option>)}
                </select>
              </FormField>

              <FormField label="Project">
                <select className="ws-field" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}>
                  {projects.map(project => <option key={project.id} value={project.name}>{project.name}</option>)}
                </select>
              </FormField>

              <FormField label="Priority">
                <select className="ws-field" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </FormField>

              <FormField label="Due Date">
                <input className="ws-field" type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} required />
              </FormField>
            </div>

            <div className="ws-form-actions">
              <button className="ws-primary-button" type="submit">Assign Task</button>
              <button className="ws-secondary-button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <PageToolbar><h3>Team Tasks</h3><span className="ws-pill">{filtered.length} TASKS</span></PageToolbar>

      <SearchableTable
        columns={['TASK', 'EMPLOYEE', 'PROJECT', 'PRIORITY', 'DUE DATE', 'STATUS', 'UPDATE', 'ACTION']}
        rows={filtered.map(task => ({
          id: task.id,
          cells: [
            <strong>{task.title}</strong>,
            task.employee,
            task.project,
            <StatusBadge value={task.priority} />,
            task.due,
            <StatusBadge value={task.status} />,
            <select className="ws-field" value={task.status} onChange={e => onStatus(task.id, e.target.value)}>
              <option>Pending</option><option>In Progress</option><option>Completed</option>
            </select>,
            <button className="ws-text-button" type="button" onClick={() => onOpenTask(task)}>Open Section ↗</button>
          ]
        }))}
      />
    </div>
  )
}

/* =========================================
   TEAM ATTENDANCE
========================================= */

function AttendancePage({ records, search, onOpenRecords }) {
  const filtered = records.filter(record =>
    `${record.name} ${record.id} ${record.department} ${record.status}`.toLowerCase().includes(search.toLowerCase())
  )

  const statuses = ['Present', 'Late', 'Absent', 'On Leave']

  const openAttendanceStatus = (status) => {
    const matching = records.filter(record => record.status === status)
    onOpenRecords(`${status} Attendance`, `Employees marked as ${status.toLowerCase()}.`, matching.map(record => [record.name, `${record.id} · ${record.department} · ${record.checkIn} · ${record.checkOut}`]))
  }

  const openReport = (name, selected) => {
    onOpenRecords(name, 'Attendance report details for your team.', selected.map(record => [record.name, `${record.department} · ${record.checkIn} · ${record.checkOut} · ${record.status}`]))
  }

  return (
    <div className="ws-content">
      <PageIntro title="Team Attendance" description="Monitor daily attendance, check-in and check-out timings, late arrivals and employee attendance history." />

      <MetricCards
        items={statuses.map(status => ({
          label: status === 'On Leave' ? 'On Leave' : status === 'Late' ? 'Late Arrivals' : status,
          value: records.filter(record => record.status === status).length,
          note: `Employees marked ${status.toLowerCase()}`
        }))}
        onOpen={item => openAttendanceStatus(item.label === 'Late Arrivals' ? 'Late' : item.label)}
      />

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div><h3>Attendance Summary</h3><p>Today's team attendance rate</p></div>
          <span className="ws-pill">87.5%</span>
        </div>
        <div className="ws-attendance-number"><strong>87.5%</strong><span>Overall attendance</span></div>
        <div className="ws-progress-track"><div style={{ width: '87.5%' }} /></div>
      </section>

      <PageToolbar><h3>Daily Attendance Register</h3><span className="ws-pill">{filtered.length} RECORDS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'EMPLOYEE ID', 'DEPARTMENT', 'CHECK IN', 'CHECK OUT', 'STATUS', 'ACTION']}
        rows={filtered.map(record => ({
          id: record.id,
          cells: [
            <strong>{record.name}</strong>,
            record.id,
            record.department,
            record.checkIn,
            record.checkOut,
            <StatusBadge value={record.status} />,
            <button className="ws-text-button" type="button" onClick={() => openReport(`${record.name} Attendance`, [record])}>View Details ↗</button>
          ]
        }))}
      />

      <section className="ws-two-columns">
        <article className="glass-panel ws-panel">
          <h3>Attendance Overview</h3>
          {statuses.map(status => {
            const count = records.filter(record => record.status === status).length
            return (
              <div className="ws-department" key={status}>
                <div><span>{status}</span><b>{count}</b></div>
                <div className="ws-progress-track"><div style={{ width: `${count / Math.max(records.length, 1) * 100}%` }} /></div>
              </div>
            )
          })}
        </article>

        <article className="glass-panel ws-panel">
          <h3>Attendance Reports</h3>
          <p className="ws-muted">Review attendance information for your team.</p>
          <div className="ws-finance-row">
            <span>Daily Attendance</span>
            <button className="ws-text-button" type="button" onClick={() => openReport('Daily Attendance Report', records)}>View ↗</button>
          </div>
          <div className="ws-finance-row">
            <span>Monthly Attendance</span>
            <button className="ws-text-button" type="button" onClick={() => openReport('Monthly Attendance Report', records)}>View ↗</button>
          </div>
          <div className="ws-finance-row">
            <span>Late Arrival Report</span>
            <button className="ws-text-button" type="button" onClick={() => openReport('Late Arrival Report', records.filter(r => r.status === 'Late'))}>View ↗</button>
          </div>
        </article>
      </section>
    </div>
  )
}

/* =========================================
   LEAVE MANAGEMENT
========================================= */

function LeavePage({ leaves, search, onAction, onOpenLeave, onOpenRecords }) {
  const filtered = leaves.filter(leave =>
    `${leave.employee} ${leave.type} ${leave.reason} ${leave.status}`.toLowerCase().includes(search.toLowerCase())
  )

  const openStatus = (status) => {
    const selected = leaves.filter(leave => leave.status === status)
    onOpenRecords(`${status} Leave Requests`, `Leave applications marked ${status.toLowerCase()}.`, selected.map(leave => [leave.employee, `${leave.type} · ${leave.from} to ${leave.to} · ${leave.days} days`]))
  }

  return (
    <div className="ws-content">
      <PageIntro title="Leave Management" description="Review leave applications submitted by your team members and manage approval decisions." />

      <MetricCards
        items={[
          { label: 'Pending Requests', value: leaves.filter(l => l.status === 'Pending').length, note: 'Awaiting your review' },
          { label: 'Approved Leaves', value: leaves.filter(l => l.status === 'Approved').length, note: 'Approved applications' },
          { label: 'Rejected Requests', value: leaves.filter(l => l.status === 'Rejected').length, note: 'Rejected applications' },
          { label: 'Total Applications', value: leaves.length, note: 'Available demo records' }
        ]}
        onOpen={item => openStatus(item.label.startsWith('Pending') ? 'Pending' : item.label.startsWith('Approved') ? 'Approved' : item.label.startsWith('Rejected') ? 'Rejected' : 'All')}
      />

      <PageToolbar><h3>Team Leave Requests</h3><span className="ws-pill">{filtered.length} REQUESTS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'LEAVE TYPE', 'FROM', 'TO', 'DAYS', 'REASON', 'STATUS', 'ACTION', 'DETAILS']}
        rows={filtered.map(leave => ({
          id: leave.id,
          cells: [
            <strong>{leave.employee}</strong>,
            leave.type,
            leave.from,
            leave.to,
            leave.days,
            leave.reason,
            <StatusBadge value={leave.status} />,
            leave.status === 'Pending' ? (
              <div className="ws-form-actions">
                <button className="ws-primary-button" type="button" onClick={() => onAction(leave.id, 'Approved')}>Approve</button>
                <button className="ws-secondary-button" type="button" onClick={() => onAction(leave.id, 'Rejected')}>Reject</button>
              </div>
            ) : <span className="ws-muted">Reviewed</span>,
            <button type="button" className="ws-text-button" onClick={() => onOpenLeave(leave)}>View Details ↗</button>
          ]
        }))}
      />

      <section className="glass-panel ws-panel">
        <h3>Leave Management Guidelines</h3>
        <div className="ws-detail-list">
          <div className="ws-detail-item"><span>Casual Leave</span><strong>Personal requirements</strong></div>
          <div className="ws-detail-item"><span>Sick Leave</span><strong>Health-related leave</strong></div>
          <div className="ws-detail-item"><span>Earned Leave</span><strong>Planned time off</strong></div>
        </div>
      </section>
    </div>
  )
}

/* =========================================
   TEAM PERFORMANCE
========================================= */

function PerformancePage({ team, search, onOpenEmployee, onOpenRecords }) {
  const filtered = team.filter(member =>
    `${member.name} ${member.role} ${member.department}`.toLowerCase().includes(search.toLowerCase())
  )

  const average = Math.round(team.reduce((total, member) => total + member.performance, 0) / Math.max(team.length, 1))
  const top = team.reduce((best, member) => member.performance > best.performance ? member : best, team[0])

  const openPerformanceGroup = (group) => {
    const selected = group === 'Top Performer'
      ? team.filter(member => member.performance >= 90)
      : group === 'Active Members'
        ? team.filter(member => member.status === 'Active')
        : team

    onOpenRecords(group, `Employee performance records for ${group.toLowerCase()}.`, selected.map(member => [member.name, `${member.performance}% · ${member.role} · ${member.department}`]))
  }

  return (
    <div className="ws-content">
      <PageIntro title="Team Performance" description="Evaluate employee productivity, task completion, project contribution and overall team performance." />

      <MetricCards
        items={[
          { label: 'Average Performance', value: `${average}%`, note: 'Across displayed members' },
          { label: 'Top Performer', value: `${top.performance}%`, note: top.name },
          { label: 'Active Members', value: team.filter(m => m.status === 'Active').length, note: 'Currently active' },
          { label: 'Departments', value: new Set(team.map(m => m.department)).size, note: 'Performance distribution' }
        ]}
        onOpen={item => openPerformanceGroup(item.label)}
      />

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div><h3>Monthly Performance Trend</h3><p>Team productivity throughout the year</p></div>
          <span className="ws-pill">2026</span>
        </div>
        <div className="ws-chart">
          {[52, 58, 64, 61, 70, 75, 72, 80, 78, 85, 89, 94].map((value, index) => (
            <div className="ws-chart-column" key={index}>
              <div style={{ height: `${value}%` }} />
              <small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</small>
            </div>
          ))}
        </div>
      </section>

      <PageToolbar><h3>Employee Performance Details</h3><span className="ws-pill">{filtered.length} MEMBERS</span></PageToolbar>

      <SearchableTable
        columns={['EMPLOYEE', 'ROLE', 'DEPARTMENT', 'PERFORMANCE', 'RATING', 'ACTION']}
        rows={filtered.map(member => ({
          id: member.id,
          cells: [
            <strong>{member.name}</strong>,
            member.role,
            member.department,
            <div className="ws-table-progress">
              <div><span style={{ width: `${member.performance}%` }} /></div>
              {member.performance}%
            </div>,
            member.performance >= 90 ? 'Excellent' : member.performance >= 80 ? 'Good' : 'Needs Improvement',
            <button className="ws-text-button" type="button" onClick={() => onOpenEmployee(member)}>View Details ↗</button>
          ]
        }))}
      />

      <section className="glass-panel ws-panel">
        <h3>Department Performance</h3>
        {[
          ['Development', 92],
          ['Design', 88],
          ['Marketing', 86],
          ['Testing', 82]
        ].map(item => (
          <div className="ws-department" key={item[0]}>
            <div><span>{item[0]}</span><b>{item[1]}%</b></div>
            <div className="ws-progress-track"><div style={{ width: `${item[1]}%` }} /></div>
          </div>
        ))}
      </section>
    </div>
  )
}

/* =========================================
   REPORTS
========================================= */

function ReportsPage({ onExport, onOpenRecords, team, projects, tasks, leaves }) {
  const reports = [
    ['Monthly Team Report', 'Employee activity and monthly productivity'],
    ['Project Progress Report', 'Project timelines, progress and delivery'],
    ['Task Completion Report', 'Completed, pending and overdue tasks'],
    ['Attendance Report', 'Daily and monthly team attendance'],
    ['Performance Report', 'Employee and department performance'],
    ['Leave Report', 'Team leave requests and approvals']
  ]

  const openReport = (name, description, records) => {
    onOpenRecords(name, description, records)
  }

  return (
    <div className="ws-content">
      <PageIntro title="Reports Centre" description="Access team, project, attendance, task and performance reports. Generate demo report files from your dashboard." />

      <MetricCards
        items={[
          { label: 'Report Categories', value: 6, note: 'Available report types' },
          { label: 'Reporting Period', value: 'Monthly', note: 'Current reporting view' },
          { label: 'Team Members', value: team.length, note: 'Under your management' },
          { label: 'Active Projects', value: projects.filter(p => p.status !== 'Completed').length, note: 'Currently running' }
        ]}
        onOpen={item => openReport(item.label, item.note, [[item.label, item.value]])}
      />

      <section className="ws-report-grid">
        {reports.map((report, index) => (
          <article className="glass-panel ws-report-card" key={report[0]}>
            <span className="ws-module-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{report[0]}</h3>
            <p>{report[1]}</p>
            <div className="ws-form-actions">
              <button type="button" className="ws-primary-button" onClick={() => {
                const records = index === 0
                  ? team.map(m => [m.name, `${m.role} · ${m.department}`])
                  : index === 1
                    ? projects.map(p => [p.name, `${p.progress}% · ${p.status} · ${p.deadline}`])
                    : index === 2
                      ? tasks.map(t => [t.title, `${t.employee} · ${t.status}`])
                      : index === 3
                        ? [['Attendance Report', 'Attendance data is available in the Attendance page.']]
                        : index === 4
                          ? team.map(m => [m.name, `${m.performance}% performance`])
                          : leaves.map(l => [l.employee, `${l.type} · ${l.status}`])

                openReport(report[0], report[1], records)
              }}>
                Open Section ↗
              </button>
              <button type="button" className="ws-secondary-button" onClick={() => onExport(report[0])}>Export ↓</button>
            </div>
          </article>
        ))}
      </section>

      <section className="glass-panel ws-panel">
        <h3>Reporting Periods</h3>
        <div className="ws-finance-row">
          <span>Monthly Reports</span>
          <button className="ws-text-button" type="button" onClick={() => onExport('Monthly Team Report')}>Generate ↗</button>
        </div>
        <div className="ws-finance-row">
          <span>Half-yearly Reports</span>
          <button className="ws-text-button" type="button" onClick={() => onExport('Half Yearly Report')}>Generate ↗</button>
        </div>
        <div className="ws-finance-row">
          <span>Yearly Reports</span>
          <button className="ws-text-button" type="button" onClick={() => onExport('Yearly Report')}>Generate ↗</button>
        </div>
      </section>
    </div>
  )
}

/* =========================================
   MY PROFILE
========================================= */

function ProfilePage({ profile, setProfile, showEdit, setShowEdit, onSave }) {
  return (
    <div className="ws-content">
      <PageIntro
        title="My Profile"
        description="View and update your personal, professional and contact information."
        action={showEdit ? 'Close Edit' : 'Edit Profile'}
        onAction={() => setShowEdit(!showEdit)}
      />

      <section className="glass-panel ws-profile-card">
        <div className="ws-profile-avatar">{profile.name.charAt(0)}</div>
        <h2>{profile.name}</h2>
        <p>{profile.role}</p>
        <span className="ws-pill">{profile.department}</span>
      </section>

      {showEdit && (
        <section className="glass-panel ws-panel ws-form-container">
          <h3>Edit Manager Profile</h3>
          <form className="ws-form" onSubmit={onSave}>
            <div className="ws-form-grid">
              <FormField label="Full Name">
                <input className="ws-field" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
              </FormField>
              <FormField label="Job Role">
                <input className="ws-field" value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} required />
              </FormField>
              <FormField label="Department">
                <input className="ws-field" value={profile.department} onChange={e => setProfile({ ...profile, department: e.target.value })} required />
              </FormField>
              <FormField label="Email">
                <input className="ws-field" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} required />
              </FormField>
              <FormField label="Phone">
                <input className="ws-field" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </FormField>
            </div>
            <div className="ws-form-actions">
              <button className="ws-primary-button" type="submit">Save Profile</button>
              <button className="ws-secondary-button" type="button" onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <section className="glass-panel ws-panel">
        <h3>Professional Information</h3>
        <div className="ws-detail-list">
          <div className="ws-detail-item"><span>Employee ID</span><strong>{profile.employeeId}</strong></div>
          <div className="ws-detail-item"><span>Full Name</span><strong>{profile.name}</strong></div>
          <div className="ws-detail-item"><span>Designation</span><strong>{profile.role}</strong></div>
          <div className="ws-detail-item"><span>Department</span><strong>{profile.department}</strong></div>
          <div className="ws-detail-item"><span>Email</span><strong>{profile.email}</strong></div>
          <div className="ws-detail-item"><span>Phone</span><strong>{profile.phone}</strong></div>
        </div>
      </section>
    </div>
  )
}

/* =========================================
   SETTINGS
========================================= */

function SettingsPage({ settings, setSettings }) {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  const updateSetting = (key) => {
    setSettings(previous => ({ ...previous, [key]: !previous[key] }))
  }

  const options = [
    ['emailNotifications', 'Email Notifications', 'Receive important updates through email.'],
    ['taskNotifications', 'Task Notifications', 'Get notified about new and updated tasks.'],
    ['leaveNotifications', 'Leave Notifications', 'Receive notifications for leave requests.'],
    ['darkMode', 'Dark Mode Preference', 'Enable your preferred display setting.']
  ]

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    if (passwords.next.length < 6) {
      alert('New password must contain at least 6 characters.')
      return
    }

    if (passwords.next !== passwords.confirm) {
      alert('New password and confirmation do not match.')
      return
    }

    alert('Demo password form validated. Actual password changes require backend authentication.')
    setPasswords({ current: '', next: '', confirm: '' })
    setShowPasswordForm(false)
  }

  return (
    <div className="ws-content">
      <PageIntro title="Settings" description="Manage your manager account preferences, notification settings and dashboard experience." />

      <section className="glass-panel ws-panel">
        <div className="ws-panel-heading">
          <div><h3>Notification Preferences</h3><p>Choose which notifications you want to receive.</p></div>
        </div>

        {options.map(option => (
          <div className="ws-finance-row" key={option[0]}>
            <div><strong>{option[1]}</strong><p className="ws-muted">{option[2]}</p></div>
            <button type="button" className={`ws-secondary-button ${settings[option[0]] ? 'active' : ''}`} onClick={() => updateSetting(option[0])}>
              {settings[option[0]] ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </section>

      <section className="glass-panel ws-panel">
        <h3>Account Information</h3>
        <div className="ws-detail-list">
          <div className="ws-detail-item"><span>Account Role</span><strong>Team Manager</strong></div>
          <div className="ws-detail-item"><span>Dashboard</span><strong>Manager Workspace</strong></div>
          <div className="ws-detail-item"><span>Account Status</span><StatusBadge value="Active" /></div>
        </div>
      </section>

      <section className="glass-panel ws-panel">
        <h3>Security</h3>
        <p className="ws-muted">Manage your password settings. Actual password changes will be connected to backend authentication later.</p>

        <button type="button" className="ws-secondary-button" onClick={() => setShowPasswordForm(!showPasswordForm)}>
          {showPasswordForm ? 'Close Password Form' : 'Change Password'}
        </button>

        {showPasswordForm && (
          <form className="ws-form ws-form-container" onSubmit={handlePasswordSubmit}>
            <FormField label="Current Password">
              <input className="ws-field" type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} required />
            </FormField>
            <FormField label="New Password">
              <input className="ws-field" type="password" value={passwords.next} onChange={e => setPasswords({ ...passwords, next: e.target.value })} required />
            </FormField>
            <FormField label="Confirm New Password">
              <input className="ws-field" type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
            </FormField>
            <div className="ws-form-actions">
              <button type="submit" className="ws-primary-button">Validate Password</button>
              <button type="button" className="ws-secondary-button" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

/* =========================================
   FORM FIELD
========================================= */

function FormField({ label, children }) {
  return (
    <label className="ws-form-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export default ManagerDashboard
