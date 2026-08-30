export const Spinner = () => {
  return (
    <div className="flex flex-1 items-center justify-center min-h-full">
      <div className="w-10 h-10 border-4 border-white/20 border-t-(--secondary-color) rounded-full animate-spin" />
    </div>
  );
};
