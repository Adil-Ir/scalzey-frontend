import { Outlet, NavLink } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="hidden md:flex w-72 flex-col bg-[#050816] border-r border-slate-800 px-5 py-6">
        {/* Logo and menu icon */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-sky-400/90 flex items-center justify-center text-slate-950 font-semibold text-base">
              CO
            </div>
            <span className="text-xl font-semibold tracking-tight">techy</span>
          </div>
          <button
            type="button"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-[3px]">
              <span className="block h-[2px] w-4 rounded-full bg-slate-200" />
              <span className="block h-0.5 w-3 rounded-full bg-slate-400" />
              <span className="block h-0.5 w-5 rounded-full bg-slate-200" />
            </span>
          </button>
        </div>

        <div className="flex-1 space-y-7 text-xs text-slate-400">
          {/* General */}
          <section className="space-y-3">
            <p className="uppercase tracking-[0.16em] text-[10px] text-slate-500">
              General
            </p>
            <nav className="space-y-1 text-sm">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-200 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-400/60 text-sky-400">
                  {/* home icon */}
                  <span className="h-3 w-3 border-b-2 border-l-2 border-current rotate-45 translate-y-[1px]" />
                </span>
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  ▦
                </span>
                <span>Dasboard</span>
              </NavLink>
              <NavLink
                to="/events-workshops"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  ─
                </span>
                <span>Events &amp; Workshops</span>
              </NavLink>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  🗓
                </span>
                <span>Calender</span>
              </NavLink>
            </nav>
          </section>

          <hr className="border-slate-800" />

          {/* Courses */}
          <section className="space-y-3">
            <p className="uppercase tracking-[0.16em] text-[10px] text-slate-500">
              Courses
            </p>
            <div className="space-y-1 text-sm">
              <NavLink
                to="/courses/explore"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  🔍
                </span>
                <span>Explore</span>
              </NavLink>
              <NavLink
                to="/courses/enrolled"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  ⟳
                </span>
                <span>Enrolled</span>
              </NavLink>
              <NavLink
                to="/courses/results"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  ✔
                </span>
                <span>Results</span>
              </NavLink>
            </div>
          </section>

          <hr className="border-slate-800" />

          {/* Community */}
          <section className="space-y-3">
            <p className="uppercase tracking-[0.16em] text-[10px] text-slate-500">
              Community
            </p>
            <div className="space-y-1 text-sm">
              <NavLink
                to="/community/explore"
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span>Explore</span>
                <span className="text-[11px] text-slate-500">234+</span>
              </NavLink>
              <NavLink
                to="/community/geki-learn"
                className={({ isActive }) =>
                  `w-full flex items-center justify-between rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span>Geki Learn</span>
                <span className="text-base">👥</span>
              </NavLink>
              <NavLink
                to="/community/product-visuals"
                className={({ isActive }) =>
                  `w-full flex items-center justify-between rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span>Product Visuals</span>
                <span className="text-base">👥</span>
              </NavLink>
              <NavLink
                to="/community/dev-crown"
                className={({ isActive }) =>
                  `w-full flex items-center justify-between rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span>Dev Crown</span>
                <span className="text-base">👥</span>
              </NavLink>
            </div>
          </section>

          <hr className="border-slate-800" />

          {/* Direct Messages */}
          <section className="space-y-3">
            <p className="uppercase tracking-[0.16em] text-[10px] text-slate-500">
              Direct Messages (3)
            </p>
            <div className="space-y-1 text-sm">
              <NavLink
                to="/messages/chats"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                  💬
                </span>
                <span>Chats</span>
              </NavLink>

              <NavLink
                to="/messages/savannah-nguyen"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs">
                  S
                </span>
                <span>Savannah Nguyen</span>
              </NavLink>

              <NavLink
                to="/messages/jenny-wilson"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs">
                  J
                </span>
                <span>Jenny Wilson</span>
              </NavLink>

              <NavLink
                to="/messages/guy-hawkins"
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-xs">
                  G
                </span>
                <span>Guy Hawkins</span>
              </NavLink>
            </div>
          </section>

          <hr className="border-slate-800" />

          {/* Updates */}
          <section className="space-y-3">
            <p className="uppercase tracking-[0.16em] text-[10px] text-slate-500">
              Update &amp; Announcements
            </p>
            <NavLink
              to="/updates"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 rounded-full px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-sky-500/10 text-sky-400"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 text-xs">
                🗓
              </span>
              <span>Updates</span>
            </NavLink>
          </section>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-slate-500">
          <NavLink to="/login" className="hover:text-slate-100">
            Log out
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
          <h1 className="text-sm font-medium tracking-tight">
            Dashboard Overview
          </h1>
          <div className="inline-flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Live</span>
          </div>
        </header>
        <section className="flex-1 p-4 md:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

