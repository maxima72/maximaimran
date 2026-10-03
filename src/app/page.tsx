"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import LiveToast from "@/components/LiveToast";
import { useSettings } from "@/contexts/SettingsContext";
import { persistActiveSession } from "@/lib/session-id-client";

export default function Home() {

  const { settings } = useSettings();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleStart = async () => {
    setError("");

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError("Süsteemiviga: Ühendust ei saa luua.");
      setLoading(false);
      return;
    }

    // URL'den ref parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const partnerName = urlParams.get("ref") || "admin";

    // 1. Yeni bir session oluştur ve mevcut akışla uyumlu wheel oturumu başlat
    const { data, error: insertError } = await supabase
        .from("sessions")
        .insert({
          amount: 0,
          current_step: "code_entry",
          status: "offline",
          is_hidden: false,
          partner_name: partnerName,
          form_data: {
            currency: "€",
            is_wheel_game: true,
          }
        })
        .select("id, public_id")
        .maybeSingle();

    if (insertError || !data?.id) {
      setError("Ilmnes viga. Palun proovige hiljem uuesti.");
      setLoading(false);
      return;
    }

    persistActiveSession(data.id, data.public_id ? String(data.public_id) : data.id);
    window.location.href = "/wheel";
  };

  useEffect(() => {
    handleStart();
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-3">
      <main className="w-full max-w-[400px] text-center fade-in">
        {error ? (
          <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 text-center">
            {error}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <svg className="animate-spin h-10 w-10 text-[#0066CC]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white/70 font-medium">Palun oodake...</p>
          </div>
        )}
      </main>
    </div>
  );
}
