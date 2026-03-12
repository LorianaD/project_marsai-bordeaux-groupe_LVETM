import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Field, TextInput, TextArea, Select } from "./Field";
import TagInput from "./TagInput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ModalShell({ open, title, children, onClose, closeAriaLabel }) {
  const { t } = useTranslation("participation");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label={closeAriaLabel || t("countryPicker.closeAria")}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-6 py-4">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-neutral-900">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
          >
            {t("countryPicker.close")}
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function VideoUploadForm({ formRef, onCanProceedChange }) {
  const { t, i18n } = useTranslation("participation");
  const navigate = useNavigate();
  const DRAFT_KEY = "videoUploadDraft";

  // ref interne vers le vrai <form>
  const internalFormRef = useRef(null);

  const [files, setFiles] = useState({
    video: null,
    cover: null,
    stills: [null, null, null],
    subtitles: [],
  });

  const [form, setForm] = useState({
    youtube_video_id: "",
    title: "",
    title_en: "",
    synopsis: "",
    synopsis_en: "",
    language: "",
    country: "",
    duration: "",
    tech_resume: "",
    ai_tech: "",
    creative_resume: "",
    email: "",
    director_name: "",
    director_lastname: "",
    director_gender: "Mr",
    birthday: "",
    mobile_number: "",
    home_number: "",
    address: "",
    director_country: "",
    discovery_source: "",
  });

  const [tags, setTags] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("video_tags") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesErr, setCountriesErr] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successInfo, setSuccessInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // anti double ouverture / double clic
  const submitRequestedRef = useRef(false);

  // évite d’écraser le draft par un état vide au montage
  const restoredRef = useRef(false);

  useEffect(() => {
    let alive = true;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesErr("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
        );
        const data = await res.json();

        const list = Array.isArray(data)
          ? data
              .map((c) => c?.name?.common)
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b, i18n.language))
          : [];

        if (alive) setCountries(list);
      } catch {
        if (alive) setCountriesErr(t("upload.fields.country.errorMsg"));
      } finally {
        if (alive) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      alive = false;
    };
  }, [i18n.language, t]);

  // restore draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const d = JSON.parse(savedDraft);
        if (d?.form) setForm((f) => ({ ...f, ...d.form }));
        if (Array.isArray(d?.tags)) setTags(d.tags);
      } catch {}
    }
    restoredRef.current = true;
  }, []);

  // autosave draft (après restore)
  useEffect(() => {
    if (!restoredRef.current) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, tags }));
  }, [form, tags]);

  // pré-remplissage depuis directorProfile
  useEffect(() => {
    const saved = localStorage.getItem("directorProfile");
    if (!saved) return;

    try {
      const p = JSON.parse(saved);

      setForm((f) => ({
        ...f,
        email: p.email || f.email,
        director_name: p.firstName || f.director_name,
        director_lastname: p.lastName || f.director_lastname,
        director_gender: p.gender || f.director_gender,
        birthday: p.birthday || f.birthday,
        address: p.address || f.address,
        director_country: p.director_country || f.director_country,
        discovery_source: p.discovery_source || f.discovery_source,
        mobile_number: p.mobile_number || f.mobile_number,
        home_number: p.home_number || f.home_number,
      }));
    } catch {}
  }, []);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function updateFile(e) {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "subtitles") {
      setFiles((f) => ({ ...f, subtitles: Array.from(inputFiles) }));
    } else {
      setFiles((f) => ({ ...f, [name]: inputFiles[0] }));
    }
  }

  function updateStill(index, file) {
    setFiles((f) => {
      const next = [...f.stills];
      next[index] = file || null;
      return { ...f, stills: next };
    });
  }

  function getFreshOwnership() {
    try {
      return JSON.parse(localStorage.getItem("ownership") || "{}");
    } catch {
      return {};
    }
  }

  //  step 2 uniquement (pour autoriser Step2 -> Step3)
  function computeCanProceedStep3() {
    const durationNum = Number(form.duration);

    return (
      form.title.trim() &&
      form.title_en.trim() &&
      form.synopsis.trim() &&
      form.synopsis_en.trim() &&
      form.language.trim() &&
      form.country.trim() &&
      Number.isFinite(durationNum) &&
      durationNum > 0 &&
      form.tech_resume.trim() &&
      form.ai_tech.trim() &&
      form.creative_resume.trim() &&
      form.email.trim() &&
      form.director_name.trim() &&
      form.director_lastname.trim() &&
      (form.director_gender === "Mr" || form.director_gender === "Mrs") &&
      form.birthday.trim() &&
      form.address.trim() &&
      form.director_country.trim() &&
      form.discovery_source.trim() &&
      form.mobile_number.trim() &&
      files.video &&
      files.cover &&
      files.stills[0] &&
      files.subtitles.length > 0
    );
  }

  //  Informe le parent pour activer/désactiver le bouton "SUIVANT →"
  useEffect(() => {
    onCanProceedChange?.(!!computeCanProceedStep3());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, files, tags, onCanProceedChange]);

  //  calcule canSubmit (final) avec ownership fresh à chaque render
  function computeCanSubmit(ownershipObj) {
    const termsOk = !!ownershipObj?.termsAccepted;
    const ageOk = !!ownershipObj?.ageConfirmed;
    const robotOk = !!ownershipObj?.recaptchaToken;

    return computeCanProceedStep3() && termsOk && ageOk && robotOk;
  }

  const canSubmit = computeCanSubmit(getFreshOwnership());

  //  expose API au parent (step 3)
  useEffect(() => {
    if (!formRef) return;

    formRef.current = {
      openConfirm: () => {
        if (uploading) return;
        if (submitRequestedRef.current) return;

        const okNow = computeCanSubmit(getFreshOwnership());
        if (!okNow) {
          setErrorMsg(t("upload.missingValidations"));
          return;
        }

        submitRequestedRef.current = true;
        setConfirmOpen(true);
      },
      requestSubmit: () => internalFormRef.current?.requestSubmit?.(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef, uploading, form, files, t]);

  const inputClass =
    "bg-[#E9E9EA] text-neutral-900 placeholder:text-neutral-500 " +
    "focus:bg-[#E9E9EA] focus:text-neutral-900 " +
    "dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 " +
    "dark:focus:bg-neutral-800 dark:focus:text-white";

  const help = "mt-2 text-xs italic text-neutral-500 dark:text-neutral-300";

  async function doUpload() {
    if (uploading) return;

    const ownershipFresh = getFreshOwnership();
    const canSubmitNow = computeCanSubmit(ownershipFresh);

    if (!canSubmitNow) {
      setErrorMsg(t("upload.missingValidations"));
      submitRequestedRef.current = false;
      return;
    }

    setErrorMsg("");
    setUploading(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
      });

      const safeTags = Array.isArray(tags) ? tags : [];
      localStorage.setItem("video_tags", JSON.stringify(safeTags));
      fd.append("tags", JSON.stringify(safeTags));

      let contributors = [];
      try {
        const saved = JSON.parse(localStorage.getItem("contributors") || "[]");
        contributors = Array.isArray(saved) ? saved : [];
      } catch {}

      fd.append("contributors", JSON.stringify(contributors));
      fd.append(
        "ownership_certified",
        ownershipFresh?.ownershipCertified ? "1" : "0",
      );
      fd.append("promo_consent", ownershipFresh?.promoConsent ? "1" : "0");
      fd.append("terms_accepted", ownershipFresh?.termsAccepted ? "1" : "0");
      fd.append("age_confirmed", ownershipFresh?.ageConfirmed ? "1" : "0");

      const recaptchaToken = ownershipFresh?.recaptchaToken || "";
      if (!recaptchaToken) throw new Error("Captcha missing");
      fd.append("recaptcha_token", recaptchaToken);

      fd.append("video", files.video);
      fd.append("cover", files.cover);

      files.stills.forEach((f) => {
        if (f) fd.append("stills", f);
      });

      files.subtitles.forEach((f) => fd.append("subtitles", f));

      const res = await fetch(`${API_URL}/api/videos`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.details ||
            data?.error ||
            `${t("upload.uploadError")} (${res.status})`,
        );
      }

      setSuccessInfo(t("upload.uploadOk", { id: data?.videoId || "—" }));
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err?.message || t("upload.uploadError"));
      submitRequestedRef.current = false;
    } finally {
      setUploading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (uploading) return;

    if (submitRequestedRef.current) return;

    const okNow = computeCanSubmit(getFreshOwnership());
    if (!okNow) {
      setErrorMsg(t("upload.missingValidations"));
      return;
    }

    submitRequestedRef.current = true;
    setConfirmOpen(true);
  }

  return (
    <>
      <ModalShell
        open={confirmOpen}
        title={t("upload.confirm.title")}
        onClose={() => {
          if (uploading) return;
          setConfirmOpen(false);
          submitRequestedRef.current = false;
        }}
      >
        <div className="space-y-4 text-sm text-neutral-800">
          <p>{t("upload.confirm.text")}</p>
          <p className="text-xs text-neutral-500">{t("upload.confirm.hint")}</p>

          {errorMsg ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
              {errorMsg}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (uploading) return;
                setConfirmOpen(false);
                submitRequestedRef.current = false;
              }}
              className="rounded-xl border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              disabled={uploading}
            >
              {t("upload.confirm.cancel")}
            </button>
            <button
              type="button"
              onClick={async () => {
                setConfirmOpen(false);
                await doUpload();
              }}
              className="rounded-xl bg-[#7C3AED] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              disabled={uploading}
            >
              {uploading
                ? t("upload.confirm.sending")
                : t("upload.confirm.yes")}
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        open={successOpen}
        title={t("upload.success.title")}
        onClose={() => {
          setSuccessOpen(false);
          navigate("/", { replace: true });
        }}
      >
        <div className="space-y-4 text-sm text-neutral-800">
          <div className="rounded-xl bg-green-50 p-3 text-green-700 ring-1 ring-green-100">
             {successInfo || t("upload.uploadOkFallback")}
          </div>
          <p className="text-xs text-neutral-500">{t("upload.success.hint")}</p>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                setSuccessOpen(false);
                navigate("/", { replace: true });
              }}
              className="rounded-xl bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
            >
              {t("upload.success.ok")}
            </button>
          </div>
        </div>
      </ModalShell>

      <form ref={internalFormRef} onSubmit={submit} className="w-full">
        <div className="space-y-12 text-neutral-900 dark:text-white">
          <h2 className="text-center text-2xl font-semibold">
            {t("upload.title")}
          </h2>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">
              {t("upload.sections.identity")}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label={t("upload.fields.title.label")} required>
                <TextInput
                  name="title"
                  value={form.title}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.title.help")}</div>
              </Field>

              <Field label={t("upload.fields.titleEn.label")} required>
                <TextInput
                  name="title_en"
                  value={form.title_en}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.titleEn.help")}</div>
              </Field>

              <Field label={t("upload.fields.language.label")} required>
                <Select
                  name="language"
                  value={form.language}
                  onChange={update}
                  className={inputClass}
                >
                  <option value="">{t("upload.fields.language.choose")}</option>
                  {[
                    "fr",
                    "en",
                    "es",
                    "it",
                    "de",
                    "pt",
                    "ar",
                    "nl",
                    "ru",
                    "zh",
                    "ja",
                    "ko",
                  ].map((code) => (
                    <option key={code} value={code}>
                      {t(`upload.fields.language.options.${code}`)}
                    </option>
                  ))}
                </Select>
                <div className={help}>{t("upload.fields.language.help")}</div>
              </Field>

              <Field label={t("upload.fields.country.label")} required>
                <Select
                  name="country"
                  value={form.country}
                  onChange={update}
                  disabled={countriesLoading || !!countriesErr}
                  className={inputClass}
                >
                  <option value="">
                    {countriesLoading
                      ? t("upload.fields.country.loading")
                      : countriesErr
                        ? t("upload.fields.country.error")
                        : t("upload.fields.country.choose")}
                  </option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>

                {countriesErr ? (
                  <div className="mt-2 text-xs text-red-500 dark:text-red-200">
                    {countriesErr}
                  </div>
                ) : null}

                <div className={help}>{t("upload.fields.country.help")}</div>
              </Field>

              <Field label={t("upload.fields.duration.label")} required>
                <TextInput
                  name="duration"
                  value={form.duration}
                  onChange={update}
                  placeholder={t("upload.fields.duration.placeholder")}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.duration.help")}</div>
              </Field>

              <Field label={t("upload.fields.youtube.label")}>
                <TextInput
                  name="youtube_video_id"
                  value={form.youtube_video_id}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.youtube.help")}</div>
              </Field>
            </div>

            <Field label={t("upload.fields.tags.label")}>
              <TagInput value={tags} onChange={setTags} />
              <div className={help}>{t("upload.fields.tags.help")}</div>
            </Field>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label={t("upload.fields.synopsis.label")} required>
                <TextArea
                  name="synopsis"
                  value={form.synopsis}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.synopsis.help")}</div>
              </Field>

              <Field label={t("upload.fields.synopsisEn.label")} required>
                <TextArea
                  name="synopsis_en"
                  value={form.synopsis_en}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.synopsisEn.help")}</div>
              </Field>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">
              {t("upload.sections.ai")}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label={t("upload.fields.techResume.label")} required>
                <TextArea
                  name="tech_resume"
                  value={form.tech_resume}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>{t("upload.fields.techResume.help")}</div>
              </Field>

              <Field label={t("upload.fields.creativeResume.label")} required>
                <TextArea
                  name="creative_resume"
                  value={form.creative_resume}
                  onChange={update}
                  className={inputClass}
                />
                <div className={help}>
                  {t("upload.fields.creativeResume.help")}
                </div>
              </Field>
            </div>

            <Field label={t("upload.fields.aiTech.label")} required>
              <TextInput
                name="ai_tech"
                value={form.ai_tech}
                onChange={update}
                className={inputClass}
              />
              <div className={help}>{t("upload.fields.aiTech.help")}</div>
            </Field>
          </section>

          <section className="space-y-6">
            <h3 className="font-semibold text-purple-500">
              {t("upload.sections.files")}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label={t("upload.fields.video.label")} required>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.video.help")}</div>
              </Field>

              <Field label={t("upload.fields.cover.label")} required>
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.cover.help")}</div>
              </Field>

              <Field label={t("upload.fields.still1.label")} required>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(0, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.still1.help")}</div>
              </Field>

              <Field label={t("upload.fields.still2.label")}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(1, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.still2.help")}</div>
              </Field>

              <Field label={t("upload.fields.still3.label")}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateStill(2, e.target.files?.[0])}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.still3.help")}</div>
              </Field>

              <Field label={t("upload.fields.subtitles.label")} required>
                <input
                  type="file"
                  name="subtitles"
                  accept=".srt"
                  multiple
                  onChange={updateFile}
                  disabled={uploading}
                  className={[
                    "w-full rounded-2xl p-4 text-sm outline-none transition",
                    "bg-[#E9E9EA] text-neutral-700",
                    "dark:bg-neutral-800 dark:text-white",
                    uploading ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                />
                <div className={help}>{t("upload.fields.subtitles.help")}</div>
              </Field>
            </div>
          </section>

          <div className="flex justify-center pt-2">
            <button type="submit" className="hidden" disabled={uploading}>
              SEND
            </button>
          </div>

          {errorMsg ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
              {errorMsg}
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}
