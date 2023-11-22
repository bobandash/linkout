import axios from 'axios';
import { useRef, FC, useState } from 'react';

interface ProfilePicFormProps {
  profilePic: string;
}

const ProfilePicForm: FC<ProfilePicFormProps> = ({ profilePic }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [pfpFile, setPfpFile] = useState<File | null>(null);

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }

  async function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setPfpFile(target.files[0]);
    await axios.put('api/users/user/pfp', target.files[0]);
  }

  /*   async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('hi');
    console.log(pfpFile);
    if (pfpFile !== null) {
      await axios.put('api/users/user/pfp', pfpFile);
    }
  } */

  return (
    <form
      encType="multipart/form-data"
      ref={formRef}
      className="flex flex-col items-center"
    >
      <div className="relative aspect-square max-w-[80px] overflow-hidden rounded-full border-2 bg-white md:max-w-[100px]">
        <img src={`api/${profilePic}`} alt="profile picture" />
        <input
          ref={inputRef}
          type="file"
          className="absolute left-0 top-0 h-full w-full opacity-0 hover:cursor-pointer"
          accept="image/png, image/jpeg"
          onChange={async (e) => await handleOnChange(e)}
        />
      </div>
      <button onClick={handleClick} className="text-white">
        Change Picture
      </button>
    </form>
  );
};

export default ProfilePicForm;
