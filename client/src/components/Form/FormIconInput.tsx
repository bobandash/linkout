const FormIconInput = () => {
  return (
    <div className="relative aspect-square max-w-[80px] overflow-hidden rounded-full border-2 bg-white md:max-w-[100px]">
      <img alt="profile picture" />
      <input
        type="file"
        className="absolute left-0 top-0 h-full w-full opacity-0 hover:cursor-pointer"
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default FormIconInput;
