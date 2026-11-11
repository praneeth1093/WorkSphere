

import { useState } from 'react'
import Dashboard from './Dashboard'
import ManagerDashboard from './ManagerDashboard'
import EmployeeDashboard from './EmployeeDashboard'
import './App.css'

const roles = [
  {
    id: 'admin',
    name: 'Super Admin',
    description: 'Take full control. Manage your organization with ease.',
    image: '/images/admin.png',
    symbol: '♛',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Lead your team. Track progress and achieve goals.',
    image: '/images/manager.png',
    symbol: '♧',
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Be productive. Collaborate and grow with WorkSphere.',
    image: '/images/employee.png',
    symbol: '♙',
  },
]

const features = [
  {
    icon: '♧',
    title: 'Employee Management',
    description: 'Organise your workforce efficiently.',
  },
  {
    icon: '▣',
    title: 'Project Management',
    description: 'Plan, track and deliver projects.',
  },
  {
    icon: '▦',
    title: 'Attendance Tracking',
    description: 'Monitor attendance in real time.',
  },
  {
    icon: '✉',
    title: 'Leave Management',
    description: 'Manage leave requests seamlessly.',
  },
  {
    icon: '▥',
    title: 'Performance Analytics',
    description: 'Measure and improve performance.',
  },
  {
    icon: '₹',
    title: 'Finance & Costings',
    description: 'Track expenses and manage budgets.',
  },
]

function App() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [activeDashboard, setActiveDashboard] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // LOGOUT AND RETURN TO LANDING PAGE
  const handleLogout = () => {
    setActiveDashboard(null)
    setSelectedRole(null)
    setEmail('')
    setPassword('')
    setLoginOpen(false)
  }

  // OPEN SELECTED DASHBOARD
  if (activeDashboard === 'admin') {
    return <Dashboard onLogout={handleLogout} />
  }

  if (activeDashboard === 'manager') {
    return <ManagerDashboard onLogout={handleLogout} />
  }

  if (activeDashboard === 'employee') {
    return <EmployeeDashboard onLogout={handleLogout} />
  }

  // OPEN LOGIN MODAL
  const openLogin = (role = null) => {
    setSelectedRole(role)
    setEmail('')
    setPassword('')
    setLoginOpen(true)
  }

  // CLOSE LOGIN MODAL
  const closeLogin = () => {
    setLoginOpen(false)
    setSelectedRole(null)
    setEmail('')
    setPassword('')
  }

  // FRONTEND DEMO LOGIN
  const handleLogin = (event) => {
    event.preventDefault()

    if (!selectedRole) {
      alert('Please choose your workspace first.')
      return
    }

    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.')
      return
    }

    if (['admin', 'manager', 'employee'].includes(selectedRole.id)) {
      setLoginOpen(false)
      setActiveDashboard(selectedRole.id)
    }
  }

  // CONTACT FORM
  const handleContact = (event) => {
    event.preventDefault()
    alert('Thank you for contacting WorkSphere!')
    event.target.reset()
  }

  return (
    <div className="worksphere">

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-symbol">W</span>
          <span>WorkSphere</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <button
          className="nav-login"
          type="button"
          onClick={() => openLogin()}
        >
          Login <span>↗</span>
        </button>
      </header>

      {/* HERO */}
      <main>
        <section className="hero section-container" id="home">
          <div className="hero-content">
            <span className="eyebrow">✦ THE ART OF ORGANIZED WORK ✦</span>

            <h1>
              Every role has a purpose.
              <br />
              Every action creates <span>impact.</span>
            </h1>

            <p>
              Bring people, teams and workplace operations into one
              organised platform — designed for clarity, accountability
              and progress.
            </p>

            <div className="hero-actions">
              <a href="#about" className="primary-button">
                Explore WorkSphere <span>→</span>
              </a>

              <a href="#workspace" className="glass-button">
                Choose Your Workspace <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>
            <div className="hero-glass">
              <span>W</span>
            </div>
            <div className="floating-bubble bubble-one"></div>
            <div className="floating-bubble bubble-two"></div>
          </div>
        </section>

        {/* WORKSPACE */}
        <section className="workspace section-container" id="workspace">
          <div className="section-heading">
            <span className="eyebrow">YOUR WORKSPACE</span>
            <h2>Choose Your Workspace</h2>
            <p>One platform. Three distinct roles. A seamless way to work.</p>
          </div>

          <div className="role-grid">
            {roles.map((role) => (
              <article className="role-card" key={role.id}>
                <div className="role-image">
                  <img src={role.image} alt={role.name} />
                  <span className="role-symbol">{role.symbol}</span>
                </div>

                <div className="role-info">
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>

                  <button
                    type="button"
                    className="role-access"
                    onClick={() => openLogin(role)}
                  >
                    Access <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="about section-container" id="about">
          <div className="about-visual">
            <div className="about-glass-orbit"></div>
            <div className="about-symbol">W</div>
          </div>

          <div className="about-content glass-panel">
            <span className="eyebrow">✦ ABOUT WORKSPHERE</span>

            <h2>
              Designed to Bring Work <span>Together.</span>
            </h2>

            <p>
              WorkSphere connects people, projects and workplace
              operations in one organised digital environment.
              From employee management to project progress,
              everything comes together in one place.
            </p>

            <a href="#features" className="primary-button">
              Learn More <span>→</span>
            </a>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features section-container" id="features">
          <div className="section-heading">
            <span className="eyebrow">POWERFUL TOOLS</span>
            <h2>Everything Your Workplace Needs.</h2>
            <p>A complete suite of tools to manage, analyse and grow.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>

                <span className="feature-arrow">›</span>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section-container" id="contact">
          <div className="contact-content">
            <span className="eyebrow">✦ GET IN TOUCH</span>

            <h2>
              Let's Build a More Productive Workplace <span>Together.</span>
            </h2>

            <p>Have questions? We'd love to hear from you.</p>
          </div>

          <form className="contact-form" onSubmit={handleContact}>
            <div className="contact-inputs">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>

            <textarea
              placeholder="Your Message"
              rows="4"
              required
            />

            <button type="submit" className="primary-button">
              Send Message <span>→</span>
            </button>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer section-container">
        <div className="footer-brand">
          <a href="#home" className="brand">
            <span className="brand-symbol">W</span>
            <span>WorkSphere</span>
          </a>

          <p>
            The complete workplace management platform
            for a smarter, more productive tomorrow.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>✉ hello@worksphere.com</p>
          <p>☎ +91 98765 43210</p>
          <p>⌖ India</p>
        </div>

        <div className="footer-bottom">
          © 2026 WorkSphere. All rights reserved.
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="modal-overlay" onClick={closeLogin}>
          <div
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeLogin}
              aria-label="Close login"
            >
              ×
            </button>

            <span className="eyebrow">WORKSPHERE ACCESS</span>

            <h2>Welcome Back</h2>

            <p>
              {selectedRole
                ? `Sign in to your ${selectedRole.name} workspace.`
                : 'Choose a workspace to continue.'}
            </p>

            {!selectedRole && (
              <div className="modal-role-options">
                {roles.map((role) => (
                  <button
                    type="button"
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role.name} →
                  </button>
                ))}
              </div>
            )}

            {selectedRole && (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button type="submit" className="primary-button">
                  Sign In →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App
