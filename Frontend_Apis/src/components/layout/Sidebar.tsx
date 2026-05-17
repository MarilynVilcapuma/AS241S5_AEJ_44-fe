import { NavLink } from 'react-router-dom'

const navItems = [
  {
    section: 'Detector IA',
    links: [
      { to: '/detector', icon: 'pi pi-search', label: 'Detector IA' },
    ],
  },
  {
    section: 'Instagram',
    links: [
      { to: '/profiles', icon: 'pi pi-users',  label: 'Perfiles'  },
      { to: '/media',    icon: 'pi pi-images', label: 'Media'     },
      { to: '/explore',  icon: 'pi pi-compass', label: 'Explorar'  },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <i className="pi pi-th-large" />
        </div>
        <div>
          <div className="sidebar-logo-text">Panel Unificado</div>
          <div className="sidebar-logo-sub">Detector · Instagram</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div className="sidebar-divider" />}
            <div className="sidebar-section-label">{group.section}</div>
            {group.links.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
              >
                <i className={`${item.icon} sidebar-link-icon`} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
