'use client'
import {Button} from "@nextui-org/react";
import {logout} from "@/app/(login)/actions";

export default function Dashboard() {
  return (
    <div
      className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        DASHBOARD
        <Button onClick={async () => logout()}>Logout</Button>
      </main>

    </div>
  );
}
