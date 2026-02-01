function Newsletter() {
  return (
    <form className="flex flex-1 flex-col items-center justify-center gap-[25px] p-[41px] rounded-[40px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.05)]">
      <h2 className="text-[24px] font-bold leading-[24px] tracking-[-1.2px] uppercase text-left w-full">
        <span>RESTEZ</span>
        <span className="block">CONNECTÉ</span>
      </h2>

      <div className="flex items-start gap-[10px] self-stretch">
        <input
          type="email"
          placeholder="Email Signal"
          className="flex h-[54px] flex-1 items-center px-[24px] py-[16px] rounded-[16px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.05)] placeholder:text-[rgba(0,0,0,0.50)] dark:placeholder:text-[rgba(255,255,255,0.50)] placeholder:text-[14px] placeholder:font-normal"
        />

        <button
          type="submit"
          className="flex w-[68.406px] h-[54px] items-center justify-center rounded-[16px] bg-[linear-gradient(270deg,#3B82F6_-0.39%,#C27AFF_100.48%)] text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase text-white"
        >
          OK
        </button>
      </div>
    </form>
  );
}

export default Newsletter;
