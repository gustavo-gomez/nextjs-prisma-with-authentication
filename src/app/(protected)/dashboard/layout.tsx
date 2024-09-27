import {getUser} from "@/lib/auth/session";

export default async function DashBoardLayout({
                                                children,
                                              }: {
  children: React.ReactNode;
}) {
  await getUser();

  return (
    <div className="flex min-h-screen w-full">

      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}