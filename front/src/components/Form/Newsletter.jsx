function Newsletter() {
  return (
    <form className="w-full">
      <h2 className="text-lg font-semibold leading-6 text-white">
        RESTEZ
        <br />
        CONNECTÉ
      </h2>

      <div className="mt-6 flex w-full min-w-0 items-center gap-3">
        <input
          type="email"
          placeholder="Email Signal"
          className="h-10 min-w-0 flex-1 rounded-full bg-white/10 px-5 text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/15 backdrop-blur transition focus:ring-2 focus:ring-fuchsia-500"
        />

        <button
          type="submit"
          className="h-10 w-14 shrink-0 rounded-full bg-white text-[11px] font-semibold uppercase tracking-wider text-black transition hover:bg-fuchsia-500 hover:text-white"
        >
          OK
        </button>
      </div>
    </form>
  );
}

export default Newsletter;
