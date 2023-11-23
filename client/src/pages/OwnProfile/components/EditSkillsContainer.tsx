// TO-DO: Figure out how to style and add functionality
const EditSkillsContainer = () => {
  return (
    <div className="relative mt-4 w-full">
      <label
        htmlFor={'skills'}
        className="text-outline bg-color_3 absolute left-0 top-0 -translate-x-1 -translate-y-1/2 pb-1 pr-2 font-play text-xl uppercase text-white"
      >
        Skills
      </label>
      <div className="border-2">
        <button className="mx-auto block">Add a Skill</button>
      </div>
    </div>
  );
};

export default EditSkillsContainer;
