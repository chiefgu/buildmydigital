'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="bg-black rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                    <img
                      src="/logo.svg"
                      alt="BUILDMYDIGITAL Logo"
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold text-gray-900">Analytics</h1>
                    <p className="text-xs text-gray-500">BUILDMYDIGITAL</p>
                  </div>
                </div>
              ) : (
                <div className="bg-black rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                  <img
                    src="/logo.svg"
                    alt="BUILDMYDIGITAL Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <NavItem
              href="/admin"
              icon={HomeIcon}
              label="Overview"
              active={pathname === '/admin'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/attribution"
              icon={FunnelIcon}
              label="Attribution"
              active={pathname === '/admin/attribution'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/heatmap"
              icon={MapIcon}
              label="Heatmaps"
              active={pathname === '/admin/heatmap'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/intent"
              icon={TargetIcon}
              label="Intent Signals"
              active={pathname === '/admin/intent'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/performance"
              icon={LightningIcon}
              label="Performance"
              active={pathname === '/admin/performance'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/enquiries"
              icon={EnvelopeIcon}
              label="Enquiries"
              active={pathname === '/admin/enquiries'}
              collapsed={sidebarCollapsed}
            />
            <NavItem
              href="/admin/chat"
              icon={ChatIcon}
              label="Live Chat"
              active={pathname === '/admin/chat'}
              collapsed={sidebarCollapsed}
            />
            <div className="pt-4 mt-4 border-t border-gray-200">
              <NavItem
                href="/"
                icon={GlobeIcon}
                label="Back to Website"
                collapsed={sidebarCollapsed}
                external
              />
            </div>
          </nav>

          {/* System Status */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs font-medium text-gray-700 mb-2">System Status</div>
              <div className="space-y-1">
                <StatusDot label="All Systems" status="operational" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active = false,
  collapsed = false,
  external = false,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  external?: boolean;
}) {
  const className = `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    active
      ? 'bg-[#F0F1FF] text-[#6366F1]'
      : 'text-gray-700 hover:bg-gray-100'
  } ${collapsed ? 'justify-center' : ''}`;

  return (
    <Link href={href} className={className} title={collapsed ? label : undefined}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {external && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </>
      )}
    </Link>
  );
}

function StatusDot({ label, status }: { label: string; status: 'operational' | 'degraded' }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}
