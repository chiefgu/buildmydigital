/**
 * Admin Layout
 * Clean layout without chat widget and announcement bar
 */

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
