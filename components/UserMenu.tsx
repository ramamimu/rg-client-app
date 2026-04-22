"use client";

import { createClient } from "@/lib/init/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) =>
      setUser(session?.user ?? null),
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  if (!user) return null;
  return <p>{user.email}</p>;
}
