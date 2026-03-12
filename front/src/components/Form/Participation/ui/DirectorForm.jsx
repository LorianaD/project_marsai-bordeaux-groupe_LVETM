import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, TextInput, Select } from "./Field";

/* URL drapeau */
function flagUrl(code, size = 24) {
  const c = String(code || "").toLowerCase();
  return `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${c}.png`;
}

/* restcountries: idd = { root:"+33", suffixes:["1"] } => +331 */
function buildDialCode(idd) {
  if (!idd?.root) return "";
  const suffix =
    Array.isArray(idd?.suffixes) && idd.suffixes.length ? idd.suffixes[0] : "";
  return `${idd.root}${suffix}`;
}

function CountryPickerModal({ open, onClose, countries, onPick }) {
  const { t } = useTranslation("participation");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter((c) => {
      return (
        c.name.toLowerCase().includes(s) ||
        c.dial.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s)
      );
    });
  }, [countries, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label={t("countryPicker.closeAria")}
      />

      <div className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
            {t("countryPicker.title")}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-xl bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
          >
            {t("countryPicker.close")}
          </button>
        </div>

        <div className="p-5">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("countryPicker.searchPlaceholder")}
            className="w-full rounded-2xl bg-neutral-100 px-5 py-3 text-sm outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-blue-500/30"
          />

          <div className="mt-4 max-h-[55vh] overflow-auto rounded-2xl ring-1 ring-black/5">
            {filtered.map((c) => (
              <button
                key={`${c.code}-${c.dial}`}
                type="button"
                onClick={() => onPick(c)}
                className="flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left hover:bg-neutral-50"
              >
                <img
                  src={flagUrl(c.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="flex-1 text-sm font-semibold text-neutral-900">
                  {c.name}
                </span>
                <span className="text-sm font-bold text-neutral-700">
                  {c.dial}
                </span>
              </button>
            ))}
            {!filtered.length ? (
              <div className="px-4 py-6 text-center text-sm text-neutral-500">
                {t("countryPicker.noResults")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function calcAge(birthdayISO) {
  if (!birthdayISO) return null;
  const d = new Date(birthdayISO);
  if (Number.isNaN(d.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

// Petit parse pour récupérer dial + local depuis une string type "+33 6 12 34..."
function splitMobile(mobileStr) {
  const s = String(mobileStr || "").trim();
  if (!s) return { dial: "", local: "" };

  const m = s.match(/^(\+\d+)\s*(.*)$/);
  if (m) return { dial: m[1], local: (m[2] || "").trim() };

  return { dial: "", local: s };
}

export default function DirectorForm({ onNext }) {
  const { t, i18n } = useTranslation("participation");
  const DRAFT_KEY = "directorFormDraft";

  const inputClass =
    "bg-neutral-100 text-neutral-900 placeholder:text-neutral-400 " +
    "focus:bg-neutral-100 focus:text-neutral-900 " +
    "dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 " +
    "dark:focus:bg-neutral-900 dark:focus:text-white " +
    "[&:-webkit-autofill]:shadow-[0_0_0px_1000px_rgb(245,245,245)_inset] " +
    "[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(17,24,39)] " +
    "dark:[&:-webkit-autofill]:shadow-[0_0_0px_1000px_rgb(11,11,15)_inset] " +
    "dark:[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(255,255,255)]";

  const selectClass =
    "bg-neutral-100 text-neutral-900 " +
    "focus:bg-neutral-100 focus:text-neutral-900 " +
    "dark:bg-neutral-900 dark:text-white " +
    "dark:focus:bg-neutral-900 dark:focus:text-white";

  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  const [form, setForm] = useState({
    name: "",
    last_name: "",
    gender: "Mr",
    email: "",
    production_role: "Réalisateur",
    birthday: "",
    director_country: "",
    address: "",
    discovery_source: "",
    mobile_number: "",
    home_number: "",
  });

  const [countries, setCountries] = useState([]);
  const [phoneCountries, setPhoneCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState({
    code: "FR",
    name: "France",
    dial: "+33",
  });
  const [phoneLocal, setPhoneLocal] = useState("");

  const [ageError, setAgeError] = useState("");

  // ✅ Restore draft + pré-remplissage depuis directorProfile
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const d = JSON.parse(draft);
        if (d?.form) setForm((f) => ({ ...f, ...d.form }));
        if (d?.phoneLocal != null) setPhoneLocal(String(d.phoneLocal || ""));
        if (d?.phoneCountry?.dial && d?.phoneCountry?.code) {
          setPhoneCountry(d.phoneCountry);
        }
      } catch {}
    }

    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);

      setForm((prev) => ({
        ...prev,
        name: prev.name || p.firstName || "",
        last_name: prev.last_name || p.lastName || "",
        email: prev.email || p.email || "",
        gender: prev.gender || p.gender || "Mr",
        production_role:
          prev.production_role || p.production_role || "Réalisateur",
        birthday: prev.birthday || p.birthday || "",
        director_country: prev.director_country || p.director_country || "",
        address: prev.address || p.address || "",
        discovery_source: prev.discovery_source || p.discovery_source || "",
        home_number: prev.home_number || p.home_number || "",
        mobile_number: prev.mobile_number || p.mobile_number || "",
      }));

      const { dial, local } = splitMobile(p.mobile_number);
      if (local && !phoneLocal) setPhoneLocal(local);
      if (dial && (!phoneCountry?.dial || phoneCountry.dial === "+33")) {
        setPhoneCountry((pc) => ({ ...pc, dial }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autosave draft
  useEffect(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ form, phoneLocal, phoneCountry }),
    );
  }, [form, phoneLocal, phoneCountry]);

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        const namesOnly = list
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, i18n.language));

        const phoneList = list
          .map((c) => {
            const code = c?.cca2;
            const name = c?.name?.common;
            const dial = buildDialCode(c?.idd);
            if (!code || !name || !dial) return null;
            return { code, name, dial };
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name, i18n.language));

        if (!alive) return;

        setCountries(namesOnly);
        setPhoneCountries(phoneList);

        const fr = phoneList.find((x) => x.code === "FR");
        if (fr && !localStorage.getItem(DRAFT_KEY)) setPhoneCountry(fr);
      } catch {
        if (alive)
          setCountriesErr(t("director.fields.directorCountry.errorMsg"));
      } finally {
        if (alive) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, [i18n.language, t]);

  useEffect(() => {
    const full = `${phoneCountry.dial} ${phoneLocal}`.trim();
    setForm((f) => ({ ...f, mobile_number: full }));
  }, [phoneCountry, phoneLocal]);

  useEffect(() => {
    const age = calcAge(form.birthday);
    if (age == null) {
      setAgeError("");
      return;
    }
    if (age < 18) setAgeError(t("director.ageError"));
    else setAgeError("");
  }, [form.birthday, t]);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.last_name.trim() &&
      form.email.trim() &&
      (form.gender === "Mr" || form.gender === "Mrs") &&
      form.production_role.trim() &&
      form.birthday.trim() &&
      !ageError &&
      form.director_country.trim() &&
      form.address.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim()
    );
  }, [form, ageError]);

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(
      "directorProfile",
      JSON.stringify({
        firstName: form.name,
        lastName: form.last_name,
        email: form.email,
        gender: form.gender,
        production_role: form.production_role,
        birthday: form.birthday,
        director_country: form.director_country,
        address: form.address,
        discovery_source: form.discovery_source,
        mobile_number: form.mobile_number,
        home_number: form.home_number,
      }),
    );

    onNext?.();
  }

  return (
    <form onSubmit={submit} className="w-full">
      <CountryPickerModal
        open={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        countries={phoneCountries}
        onPick={(c) => {
          setPhoneCountry(c);
          setPhoneOpen(false);
        }}
      />

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:bg-black dark:border-neutral-800">
        <h2 className="text-center text-2xl font-semibold text-blue-600">
          {t("director.title")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label={t("director.fields.firstName.label")} required>
            <TextInput
              name="name"
              value={form.name}
              onChange={update}
              placeholder={t("director.fields.firstName.placeholder")}
              className={inputClass}
              autoComplete="given-name"
            />
            <div className={help}>{t("director.fields.firstName.help")}</div>
          </Field>

          <Field label={t("director.fields.lastName.label")} required>
            <TextInput
              name="last_name"
              value={form.last_name}
              onChange={update}
              placeholder={t("director.fields.lastName.placeholder")}
              className={inputClass}
              autoComplete="family-name"
            />
            <div className={help}>{t("director.fields.lastName.help")}</div>
          </Field>

          <Field label={t("director.fields.civility.label")} required>
            <Select
              name="gender"
              value={form.gender}
              onChange={update}
              className={selectClass}
            >
              <option value="Mr">{t("director.fields.civility.mr")}</option>
              <option value="Mrs">{t("director.fields.civility.mrs")}</option>
            </Select>
            <div className={help}>{t("director.fields.civility.help")}</div>
          </Field>

          <Field label={t("director.fields.email.label")} required>
            <TextInput
              name="email"
              value={form.email}
              onChange={update}
              placeholder={t("director.fields.email.placeholder")}
              type="email"
              className={inputClass}
              autoComplete="email"
            />
            <div className={help}>{t("director.fields.email.help")}</div>
          </Field>

          <Field label={t("director.fields.birthday.label")} required>
            <TextInput
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={update}
              className={inputClass}
              autoComplete="bday"
            />
            <div className={help}>{t("director.fields.birthday.help")}</div>
            {ageError ? (
              <div className="mt-2 text-sm text-red-600">{ageError}</div>
            ) : null}
          </Field>

          <Field label={t("director.fields.directorCountry.label")} required>
            <Select
              name="director_country"
              value={form.director_country}
              onChange={update}
              disabled={countriesLoading || !!countriesErr}
              className={selectClass}
            >
              <option value="">
                {countriesLoading
                  ? t("director.fields.directorCountry.loading")
                  : countriesErr
                    ? t("director.fields.directorCountry.error")
                    : t("director.fields.directorCountry.choose")}
              </option>

              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            {countriesErr ? (
              <div className="mt-2 text-xs text-red-500">{countriesErr}</div>
            ) : null}

            <div className={help}>
              {t("director.fields.directorCountry.help")}
            </div>
          </Field>

          <Field label={t("director.fields.discovery.label")} required>
            <TextInput
              name="discovery_source"
              value={form.discovery_source}
              onChange={update}
              placeholder={t("director.fields.discovery.placeholder")}
              className={inputClass}
              autoComplete="off"
            />
            <div className={help}>{t("director.fields.discovery.help")}</div>
          </Field>

          <Field label={t("director.fields.address.label")} required>
            <TextInput
              name="address"
              value={form.address}
              onChange={update}
              placeholder={t("director.fields.address.placeholder")}
              className={inputClass}
              autoComplete="street-address"
            />
            <div className={help}>{t("director.fields.address.help")}</div>
          </Field>

          <Field label={t("director.fields.mobile.label")} required>
            <div className="flex w-full items-center gap-3 rounded-2xl bg-neutral-100 px-5 py-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-blue-500/30 dark:bg-neutral-900 dark:ring-white/10">
              <button
                type="button"
                onClick={() => setPhoneOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/5 hover:bg-white dark:bg-white/10 dark:text-white dark:ring-white/10"
                aria-label={t("director.fields.mobile.ariaPickCountry")}
              >
                <img
                  src={flagUrl(phoneCountry.code, 24)}
                  alt=""
                  className="h-4 w-6 rounded-[2px] object-cover"
                  loading="lazy"
                  draggable="false"
                />
                <span className="font-bold">{phoneCountry.dial}</span>
                <span className="text-neutral-500">▾</span>
              </button>

              <input
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                placeholder={t("director.fields.mobile.placeholder")}
                inputMode="tel"
                className={
                  "w-full bg-transparent text-sm outline-none " +
                  "text-neutral-900 placeholder:text-neutral-500 " +
                  "dark:text-white dark:placeholder:text-neutral-400"
                }
                autoComplete="tel"
              />
            </div>

            <div className={help}>
              {t("director.fields.mobile.help", { dial: phoneCountry.dial })}
            </div>
          </Field>

          <Field label={t("director.fields.home.label")}>
            <TextInput
              name="home_number"
              value={form.home_number}
              onChange={update}
              placeholder={t("director.fields.home.placeholder")}
              className={inputClass}
            />
            <div className={help}>{t("director.fields.home.help")}</div>
          </Field>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-3 rounded-xl bg-[#7C3AED] px-10 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("director.next")} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </form>
  );
}
