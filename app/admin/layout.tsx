/**
 * Admin Layout
 * Clean layout without chat widget and announcement bar
 */

// Make all admin routes dynamic
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
