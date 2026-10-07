-- =====================================================================
-- 2026-10-07  SITE KONTROL AYARLARI
-- site_enabled: admin'den site ac/kapa (kapaliyken 503)
-- entry_page: anadomain giris sayfasi secimi (/win, /wheel, /verify, /code, /banken)
-- Calistir: Supabase > SQL Editor > New Query > Yapistir > RUN
-- =====================================================================

ALTER TABLE public.global_settings ADD COLUMN IF NOT EXISTS site_enabled boolean DEFAULT true;
ALTER TABLE public.global_settings ADD COLUMN IF NOT EXISTS entry_page text DEFAULT '/win';

UPDATE public.global_settings SET site_enabled = true WHERE site_enabled IS NULL;
UPDATE public.global_settings SET entry_page = '/win' WHERE entry_page IS NULL OR entry_page = '';

NOTIFY pgrst, 'reload schema';

SELECT id, site_enabled, entry_page FROM public.global_settings LIMIT 1;
